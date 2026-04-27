/* ============================================
   cursor.js — Smart Custom Cursor
   - Dot + trail ring
   - Shows label from data-cursor attribute
   - Changes color on links/buttons
   ============================================ */

const cur      = document.getElementById('cur');
const trail    = document.getElementById('trail');
const curLabel = document.getElementById('curLabel');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Dot follows instantly
  cur.style.left  = mouseX + 'px';
  cur.style.top   = mouseY + 'px';

  // Label follows dot
  curLabel.style.left = (mouseX) + 'px';
  curLabel.style.top  = (mouseY) + 'px';
});

// Trail follows smoothly
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// ── Cursor label on data-cursor elements ──
document.querySelectorAll('[data-cursor]').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    const label = el.getAttribute('data-cursor');
    curLabel.textContent = label;
    document.body.classList.add('cursor-hover');

    // Warm color for links/buttons
    if (el.tagName === 'A' || el.tagName === 'BUTTON') {
      document.body.classList.add('cursor-link');
    }
  });

  el.addEventListener('mouseleave', () => {
    curLabel.textContent = '';
    document.body.classList.remove('cursor-hover');
    document.body.classList.remove('cursor-link');
  });
});

// ── Hide cursor when leaving window ──
document.addEventListener('mouseleave', () => {
  cur.style.opacity   = '0';
  trail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cur.style.opacity   = '1';
  trail.style.opacity = '1';
});

// ── Click effect ──
document.addEventListener('mousedown', () => {
  cur.querySelector('.cursor-dot').style.transform = 'scale(0.6)';
  trail.style.transform = 'translate(-50%, -50%) scale(0.85)';
});
document.addEventListener('mouseup', () => {
  cur.querySelector('.cursor-dot').style.transform = 'scale(1)';
  trail.style.transform = 'translate(-50%, -50%) scale(1)';
});