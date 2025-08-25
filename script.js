// Open/Close Letters
const photos = document.querySelectorAll('.photo');
photos.forEach(photo => {
  photo.addEventListener('click', () => {
    // Close all open letters
    document.querySelectorAll('.letter').forEach(letter => {
      letter.classList.add('hidden');
    });

    // Open the one below clicked photo
    const letter = photo.nextElementSibling;
    if (letter) letter.classList.remove('hidden');
  });
});

// Falling Hearts
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
setInterval(createHeart, 400);
