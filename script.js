// Splash & Fireworks
window.onload = () => {
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    launchFireworks();
    setTimeout(() => {
      document.getElementById('fireworks').style.display = 'none';
      document.getElementById('main').classList.remove('hidden');
      setInterval(createHeart, 400);
    }, 5000); // 5 sec fireworks
  }, 3000); // 3 sec splash
};

// Fireworks
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

let particles = [];
function launchFireworks() {
  const interval = setInterval(() => {
    let x = random(100, canvas.width - 100);
    let y = random(100, canvas.height / 2);
    for (let i = 0; i < 100; i++) {
      particles.push({
        x, y,
        angle: Math.random() * 2 * Math.PI,
        speed: random(1, 5),
        radius: 2,
        life: 100
      });
    }
  }, 500);

  setTimeout(() => clearInterval(interval), 4000);
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.life--;
    if (p.life <= 0) particles.splice(i, 1);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${random(0,360)},100%,50%)`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}

// Falling hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}

// Letter show
function showLetter(photo, text) {
  const letter = photo.querySelector('.letter');
  if (letter.style.display === 'block') {
    letter.style.display = 'none';
  } else {
    letter.innerHTML = text;
    letter.style.display = 'block';
  }
}
