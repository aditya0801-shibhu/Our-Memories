// Toggle Letters on Photo Click
const photos = document.querySelectorAll('.photo');
photos.forEach(photo => {
  photo.addEventListener('click', () => {
    const letter = photo.nextElementSibling;
    document.querySelectorAll('.letter').forEach(l => {
      if (l !== letter) l.classList.add('hidden');
    });
    letter.classList.toggle('hidden');
  });
});

// Floating Hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.getElementById("hearts-container").appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 400);

// Floating Stars
function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.width = star.style.height = Math.random() * 4 + 2 + "px";
  star.style.left = Math.random() * 100 + "vw";
  star.style.animationDuration = Math.random() * 4 + 4 + "s";
  document.getElementById("stars-container").appendChild(star);
  setTimeout(() => star.remove(), 6000);
}
setInterval(createStar, 500);
