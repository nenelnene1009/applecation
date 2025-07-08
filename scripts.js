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
    image: "https://example.com/cat.png"
  },
  {
    type: "いぬタイプ",
    description: "忠実で元気いっぱい！誰とでも仲良くできる「いぬ」タイプ！",
    image: "https://example.com/dog.png"
  },
  {
    type: "うさぎタイプ",
    description: "おっとりマイペースで癒し系、そんなあなたは「うさぎ」タイプ！",
    image: "https://example.com/rabbit.png"
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
  // 仮のランダム診断（後でAI連携に置き換え）
  const result = animalData[Math.floor(Math.random() * animalData.length)];

  animalImage.src = result.image;
  animalType.textContent = result.type;
  animalDescription.textContent = result.description;

  resultContainer.classList.remove("hidden");
});
