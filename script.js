// INTRO REMOVE + FIREWORKS END
window.onload = () => {
  startFireworks();

  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("fireworks").style.display = "none"; // stop showing fireworks
  }, 5000); // 5 sec only
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

// FIREWORKS EFFECT
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function random(min, max) { return Math.random() * (max - min) + min; }

  let particles = [];
  function createFirework() {
    let x = random(100, canvas.width - 100);
    let y = canvas.height;
    let targetY = random(100, canvas.height / 2);
    let color = `hsl(${random(0,360)},100%,60%)`;
    particles.push({x, y, targetY, color, alpha: 1, size: 2});
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y -= 3;
      if (p.y < p.targetY) {
        for (let j=0;j<30;j++) {
          particles.push({
            x: p.x, y: p.y,
            size: random(1,3),
            color: p.color,
            alpha: 1,
            vx: random(-3,3),
            vy: random(-3,3)
          });
        }
        particles.splice(i,1);
      }
    });
    particles.forEach((p,i)=>{
      if (p.vx) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha <=0) particles.splice(i,1);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fill();
        ctx.globalAlpha=1;
      }
    });
    requestAnimationFrame(draw);
  }

  setInterval(createFirework, 600);
  draw();
}
