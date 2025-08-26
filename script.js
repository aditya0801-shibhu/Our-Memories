// Toggle Letters on Photo Click
const photos = document.querySelectorAll('.photo');

photos.forEach(photo => {
  photo.addEventListener('click', () => {
    const letter = photo.nextElementSibling;

    // Close others first
    document.querySelectorAll('.letter').forEach(l => {
      if (l !== letter) l.classList.add('hidden');
    });

    // Toggle current one
    letter.classList.toggle('hidden');
  });
});

// Falling Hearts Animation
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.getElementById("hearts-container").appendChild(heart);

  setTimeout(() => { heart.remove(); }, 6000);
}
setInterval(createHeart, 350);

