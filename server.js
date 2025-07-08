const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Basic認証ミドルウェア
function basicAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('認証が必要です');
  }
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic') return res.status(400).send('Bad Request');
  const buff = Buffer.from(encoded, 'base64');
  const [user, pass] = buff.toString().split(':');

  // 管理者のユーザ名・パスワードをここで設定
  if (user === 'admin' && pass === 'password123') {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('認証に失敗しました');
  }
}

const upload = multer({ dest: "uploads/" });
app.use(express.static("public"));
app.use(express.json());

// 動物タイプデータ（ローカル診断ロジック）
const animalData = [
  { type: "ねこ", description: "気まぐれで甘えん坊", image: "/images/cat.png" },
  { type: "いぬ", description: "忠実で元気", image: "/images/dog.png" },
  { type: "うさぎ", description: "癒し系でおっとり", image: "/images/rabbit.png" },
  { type: "パンダ", description: "のんびり優しい", image: "/images/panda.png" },
  { type: "キツネ", description: "賢くてミステリアス", image: "/images/fox.png" },
  { type: "カワウソ", description: "社交的で遊び好き", image: "/images/otter.png" }
];

// 画像アップロード・診断API
app.post("/api/diagnose", upload.single("photo"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "ファイルがありません" });

  // 簡易診断ロジック：ファイルサイズで決定
  const index = file.size % animalData.length;
  const result = animalData[index];

  // 診断結果をdata.jsonに追記保存
  const newEntry = {
    filename: file.filename,
    originalname: file.originalname,
    type: result.type,
    description: result.description,
    timestamp: new Date().toISOString()
  };

  const dbPath = "data.json";
  let existing = [];
  if (fs.existsSync(dbPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(dbPath));
    } catch {
      existing = [];
    }
  }
  existing.push(newEntry);
  fs.writeFileSync(dbPath, JSON.stringify(existing, null, 2));

  // クライアントに返す結果（画像はpublic/images配下のイラスト）
  res.json({
    type: result.type,
    description: result.description,
    image: result.image
  });
});

// 管理画面ページ（Basic認証必須）
app.get("/admin", basicAuth, (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "admin.html"));
});

// 管理用API（診断結果一覧）も認証必須
app.get("/api/admin", basicAuth, (req, res) => {
  const dbPath = "data.json";
  let data = [];
  if (fs.existsSync(dbPath)) {
    try {
      data = JSON.parse(fs.readFileSync(dbPath));
    } catch {
      data = [];
    }
  }
  res.json(data);
});

// アップロード画像の配信（認証必須）
app.get("/uploads/:filename", basicAuth, (req, res) => {
  const filename = req.params.filename;
  const filepath = path.resolve(__dirname, "uploads", filename);
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).send("画像が見つかりません");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
