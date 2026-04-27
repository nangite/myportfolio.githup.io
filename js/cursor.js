// Remove all custom cursor — use default browser cursor
// Only keep: label on hover + ripple on click

const curLabel = document.getElementById('curLabel');

// Label on data-cursor elements
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

// Simple ripple on click
document.addEventListener('click', (e) => {
  const ripple = document.createElement('div');
  ripple.className = 'click-ripple';
  ripple.style.left = e.clientX + 'px';
  ripple.style.top  = e.clientY + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
});