// Toggle letter under photo
function toggleLetter(card) {
  card.classList.toggle("active");
}

// Fireworks animation (only for 5 sec)
const fwCanvas = document.getElementById("fireworks");
const fwCtx = fwCanvas.getContext("2d");
fwCanvas.width = innerWidth;
fwCanvas.height = innerHeight;

let fireworks = [];
function Firework(x, y) {
  this.x = x;
  this.y = y;
  this.particles = [];
  for (let i = 0; i < 30; i++) {
    this.particles.push({
      x: x, y: y,
      dx: Math.random()*4-2,
      dy: Math.random()*4-2,
      life: 100
    });
  }
}
Firework.prototype.update = function() {
  this.particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;
    fwCtx.fillStyle = "rgba(255,255,255,"+p.life/100+")";
    fwCtx.fillRect(p.x, p.y, 2, 2);
  });
};

function fireworksAnim() {
  fwCtx.clearRect(0,0,fwCanvas.width,fwCanvas.height);
  if(Math.random() < 0.05){
    fireworks.push(new Firework(Math.random()*fwCanvas.width, Math.random()*fwCanvas.height/2));
  }
  fireworks.forEach(f => f.update());
  requestAnimationFrame(fireworksAnim);
}
fireworksAnim();

setTimeout(() => {
  document.querySelector(".welcome-screen").style.display="none";
  document.querySelector(".container").classList.remove("hidden");
  fwCanvas.style.display="none";
}, 5000);

// Hearts background
const heartsCanvas = document.getElementById("hearts");
const hCtx = heartsCanvas.getContext("2d");
heartsCanvas.width = innerWidth;
heartsCanvas.height = innerHeight;

let hearts = [];
function drawHeart(x,y,size){
  hCtx.save();
  hCtx.translate(x,y);
  hCtx.scale(size,size);
  hCtx.beginPath();
  hCtx.moveTo(0,0);
  hCtx.bezierCurveTo(0,-3, -5,-3, -5,0);
  hCtx.bezierCurveTo(-5,3, 0,5, 0,8);
  hCtx.bezierCurveTo(0,5, 5,3, 5,0);
  hCtx.bezierCurveTo(5,-3,0,-3,0,0);
  hCtx.fillStyle = "rgba(255,0,100,0.5)";
  hCtx.fill();
  hCtx.restore();
}
function heartsAnim(){
  hCtx.clearRect(0,0,heartsCanvas.width,heartsCanvas.height);
  if(Math.random()<0.05){
    hearts.push({x:Math.random()*heartsCanvas.width, y:0, size:Math.random()*0.3+0.2, speed:Math.random()*2+1});
  }
  hearts.forEach(h=>{ h.y+=h.speed; drawHeart(h.x,h.y,h.size); });
  hearts = hearts.filter(h=>h.y<heartsCanvas.height);
  requestAnimationFrame(heartsAnim);
}
heartsAnim();

