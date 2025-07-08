const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// 画像アップロード先
const upload = multer({ dest: "uploads/" });
app.use(express.static("public"));

// 動物タイプデータ（ローカル診断ロジック用）
const animalData = [
  { type: "ねこ", description: "気まぐれで甘えん坊", image: "/images/cat.png" },
  { type: "いぬ", description: "忠実で元気", image: "/images/dog.png" },
  { type: "うさぎ", description: "癒し系でおっとり", image: "/images/rabbit.png" },
  { type: "パンダ", description: "のんびり優しい", image: "/images/panda.png" },
  { type: "キツネ", description: "賢くてミステリアス", image: "/images/fox.png" },
  { type: "カワウソ", description: "社交的で遊び好き", image: "/images/otter.png" }
];

// 診断API
app.post("/api/diagnose", upload.single("photo"), (req, res) => {
  const file = req.file;
  const index = file.size % animalData.length;
  const result = animalData[index];

  const newEntry = {
    filename: file.filename,
    originalname: file.originalname,
    type: result.type,
    timestamp: new Date().toISOString()
  };

  // 保存
  const dbPath = "data.json";
  const existing = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : [];
  existing.push(newEntry);
  fs.writeFileSync(dbPath, JSON.stringify(existing, null, 2));

  res.json(result);
});

// 管理者用：アップロード画像と診断結果一覧
app.get("/api/admin", (req, res) => {
  const db = fs.existsSync("data.json") ? JSON.parse(fs.readFileSync("data.json")) : [];
  res.json(db);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
