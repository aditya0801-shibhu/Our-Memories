// Popup Logic
const photos = document.querySelectorAll('.photo');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const closeBtn = document.querySelector('.close');

photos.forEach(photo => {
  photo.addEventListener('click', () => {
    popupText.innerText = photo.getAttribute('data-content');
    popup.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
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
