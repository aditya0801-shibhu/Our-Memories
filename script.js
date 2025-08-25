/* Resize flicker guard on orientation changes */
let t;
addEventListener('resize', () => {
  clearTimeout(t);
  document.documentElement.classList.add('preload');
  t = setTimeout(()=> document.documentElement.classList.remove('preload'), 250);
});

/* Falling hearts — light on battery */
const heartsRoot = document.getElementById('hearts');

function spawnHeart() {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = '❤';

  // randomize
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = (Math.random() * 12 + 12) + 'px';
  h.style.animationDuration = (Math.random() * 3 + 3) + 's'; // 3–6s

  heartsRoot.appendChild(h);

  // cleanup
  const ttl = parseFloat(h.style.animationDuration) * 1000 + 200;
  setTimeout(() => h.remove(), ttl);
}

/* Adaptive density: fewer hearts on low-power devices */
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const baseInterval = prefersReducedMotion ? 900 : 450;
let heartTimer = setInterval(spawnHeart, baseInterval);

/* Pause hearts when tab hidden */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { clearInterval(heartTimer); }
  else { heartTimer = setInterval(spawnHeart, baseInterval); }
});
