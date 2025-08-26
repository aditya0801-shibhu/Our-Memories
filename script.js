/***************
 * TYPE + FIREWORKS INTRO
 ***************/
const typeTarget = "I Am In Love With You";
const typeEl = document.getElementById("typeLine");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const fwCanvas = document.getElementById("fw");
const fwCtx = fwCanvas.getContext("2d");
const fwSound = document.getElementById("fwSound");
const soundBtn = document.getElementById("soundBtn");

// Fit canvas
function sizeCanvas(){
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);

// Mobile audio policy: try to play muted first; fall back to user tap
async function ensureSound(){
  try {
    await fwSound.play();
    soundBtn.style.display = "none";
  } catch(e){
    // needs user gesture
    soundBtn.style.display = "inline-flex";
  }
}
soundBtn.addEventListener("click", async () => {
  try { await fwSound.play(); soundBtn.style.display = "none"; } catch(e){}
});

// Typing over ~3000ms
async function typeIntro() {
  typeEl.textContent = "";
  const total = typeTarget.length;
  const duration = 3000; // 3s exact
  let startedFireworks = false;
  const start = performance.now();

  function step(now){
    const t = Math.min(1, (now - start)/duration);
    const count = Math.floor(t * total);
    typeEl.textContent = typeTarget.slice(0, count);

    if (!startedFireworks && count > 0){
      startedFireworks = true;
      startFireworks();        // start particles
      ensureSound();           // try play sound
    }
    if (t < 1){
      requestAnimationFrame(step);
    } else {
      // hold intro + fireworks for ~4–5 sec more, then exit
      setTimeout(endIntro, 4200);
    }
  }
  requestAnimationFrame(step);
}

// Classy fireworks (clean particle bursts)
let fwParticles = [];
let fwEmitter = null;
function burst(x, y, hue){
  const N = 100;
  for (let i=0;i<N;i++){
    const angle = Math.random()*Math.PI*2;
    const speed = 1.5 + Math.random()*3.5;
    fwParticles.push({
      x, y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed,
      life: 60+Math.random()*40,
      age: 0,
      hue,
      size: 1+Math.random()*1.8
    });
  }
}

function startFireworks(){
  // loop bursts during intro
  fwEmitter = setInterval(()=>{
    const x = 80 + Math.random()*(fwCanvas.width-160);
    const y = 80 + Math.random()*(fwCanvas.height*0.5 - 160) + 80;
    const hue = Math.floor(Math.random()*360);
    burst(x,y,hue);
    // try to sync sound (restart for snappy pop)
    try{
      fwSound.currentTime = 0;
      fwSound.play();
    }catch(e){}
  }, 550);
  animateFW();
}

function stopFireworks(){
  if (fwEmitter) { clearInterval(fwEmitter); fwEmitter = null; }
}

function animateFW(){
  // fade trail
  fwCtx.fillStyle = "rgba(0,0,0,0.25)";
  fwCtx.fillRect(0,0,fwCanvas.width,fwCanvas.height);

  // update + draw
  for (let i = fwParticles.length - 1; i >= 0; i--){
    const p = fwParticles[i];
    p.age++;
    p.x += p.vx;
    p.y += p.vy;
    // Gravity + slight drag
    p.vy += 0.015;
    p.vx *= 0.995; p.vy *= 0.995;

    const alpha = 1 - (p.age/p.life);
    if (alpha <= 0){ fwParticles.splice(i,1); continue; }

    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    fwCtx.fillStyle = `hsla(${p.hue},100%,60%,${alpha})`;
    fwCtx.fill();
  }
  if (intro.style.display !== "none") requestAnimationFrame(animateFW);
}

function endIntro(){
  stopFireworks();
  // fade intro out
  intro.style.transition = "opacity .6s ease";
  intro.style.opacity = "0";
  setTimeout(()=>{
    intro.style.display = "none";
    // show main with nice entrance
    main.classList.remove("hidden");
    main.style.animation = "fade-in .6s ease both";
  }, 600);
}

// kick things off
window.addEventListener("load", typeIntro);


/***************
 * (No further JS needed for gallery – pure CSS layout)
 ***************/

