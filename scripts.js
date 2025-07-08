const photoInput = document.getElementById("photoInput");
const previewImage = document.getElementById("previewImage");
const diagnoseBtn = document.getElementById("diagnoseBtn");
const resultContainer = document.getElementById("result");
const animalImage = document.getElementById("animalImage");
const animalType = document.getElementById("animalType");
const animalDescription = document.getElementById("animalDescription");

const animalData = [
  {
    type: "ねこタイプ",
    description: "しなやかで気まぐれ、でも甘えん坊なあなたは「ねこ」タイプ！",
    image: "https://cdn.pixabay.com/photo/2021/03/23/08/36/cat-6116822_1280.png"
  },
  {
    type: "いぬタイプ",
    description: "忠実で元気いっぱい！誰とでも仲良くできる「いぬ」タイプ！",
    image: "https://cdn.pixabay.com/photo/2020/08/10/17/58/dog-5478480_1280.png"
  },
  {
    type: "うさぎタイプ",
    description: "おっとりマイペースで癒し系、そんなあなたは「うさぎ」タイプ！",
    image: "https://cdn.pixabay.com/photo/2021/03/09/05/46/rabbit-6078652_1280.png"
  },
  {
    type: "パンダタイプ",
    description: "のんびり屋で、周囲を和ませるあなたは「パンダ」タイプ！",
    image: "https://cdn.pixabay.com/photo/2022/06/14/07/38/panda-7261457_1280.png"
  },
  {
    type: "キツネタイプ",
    description: "賢くてミステリアスな雰囲気を持つあなたは「キツネ」タイプ！",
    image: "https://cdn.pixabay.com/photo/2021/07/04/13/26/fox-6386107_1280.png"
  },
  {
    type: "カワウソタイプ",
    description: "社交的で遊び好きなあなたは「カワウソ」タイプ！",
    image: "https://cdn.pixabay.com/photo/2023/04/24/12/02/otter-7948354_1280.png"
  }
];

photoInput.addEventListener("change", function () {
  const file = photoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

diagnoseBtn.addEventListener("click", function () {
  const file = photoInput.files[0];
  if (!file) {
    alert("先に写真をアップロードしてください！");
    return;
  }

  // 仮ロジック：ファイルサイズでタイプ判定
  const index = file.size % animalData.length;
  const result = animalData[index];

  animalImage.src = result.image;
  animalType.textContent = result.type;
  animalDescription.textContent = result.description;

  resultContainer.classList.remove("hidden");
});
