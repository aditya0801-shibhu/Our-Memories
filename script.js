// Firework animation
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = innerWidth;
canvas.height = innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2;
    this.speedX = (Math.random() - 0.5) * 5;
    this.speedY = (Math.random() - 0.5) * 5;
    this.life = 100;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    this.draw();
  }
}

function fireworks() {
  requestAnimationFrame(fireworks);
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach((p,i)=>{
    p.update();
    if(p.life<=0) particles.splice(i,1);
  });
}

setInterval(()=>{
  let x = Math.random()*canvas.width;
  let y = Math.random()*canvas.height/2;
  let color = `hsl(${Math.random()*360},100%,50%)`;
  for(let i=0;i<50;i++){
    particles.push(new Particle(x,y,color));
  }
},500);

fireworks();

// Play sound when typing starts
setTimeout(()=>{
  document.getElementById('fireworkSound').play();
},500);

// After 5 sec, hide intro and show memories
setTimeout(()=>{
  document.getElementById('intro').style.display="none";
  window.scrollTo(0,0);
},5000);

// Scroll animation
const memories = document.querySelectorAll('.memory');
window.addEventListener('scroll',()=>{
  memories.forEach(m=>{
    const rect = m.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      m.classList.add('show');
    }
  })
});
