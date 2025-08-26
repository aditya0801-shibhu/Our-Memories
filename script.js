// LOADING SCREEN REMOVE
window.onload = () => {
  setTimeout(() => document.getElementById("loading").style.display = "none", 3000);
};

// HEARTS FLOATING
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 25 + 15 + "px";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 400);

// MUSIC CONTROL
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");
btn.addEventListener("click", () => {
  if (music.paused) { music.play(); btn.innerText = "🔊"; }
  else { music.pause(); btn.innerText = "🔇"; }
});
