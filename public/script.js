const photoInput = document.getElementById("photoInput");
const diagnoseBtn = document.getElementById("diagnoseBtn");

diagnoseBtn.addEventListener("click", async () => {
  const file = photoInput.files[0];
  if (!file) {
    alert("画像を選択してください");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch("/api/diagnose", {
    method: "POST",
    body: formData
  });

  const result = await res.json();

  // 結果を表示
  document.getElementById("animalType").textContent = result.type;
  document.getElementById("animalDescription").textContent = result.description;
  document.getElementById("animalImage").src = result.image;
  document.getElementById("result").classList.remove("hidden");
});
