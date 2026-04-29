/* ============================================
   cursor.js — Clean version, links work properly
   ============================================ */

const curLabel = document.getElementById('curLabel');

// ── Cursor label on data-cursor elements ──
document.querySelectorAll('[data-cursor]').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    curLabel.textContent = el.getAttribute('data-cursor');
  });
  el.addEventListener('mousemove', (e) => {
    curLabel.style.left = e.clientX + 'px';
    curLabel.style.top  = e.clientY + 'px';
  });
  el.addEventListener('mouseleave', () => {
    curLabel.textContent = '';
  });
});

// ── Ripple on click — skip links so they open normally ──
document.addEventListener('click', (e) => {
  if (e.target.closest('a')) return; // ✅ let links work!

  const ripple = document.createElement('div');
  ripple.className = 'click-ripple';
  ripple.style.left = e.clientX + 'px';
  ripple.style.top  = e.clientY + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});
