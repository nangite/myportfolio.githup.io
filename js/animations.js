/* ============================================
   animations.js — Skill Bars, Nav, Theme Toggle
   ============================================ */

// ── Skill bars on scroll ──
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sk-bar-fill').forEach((b) => {
          b.style.animation = 'none';
          void b.offsetWidth;
          b.style.animation = '';
        });
      }
    });
  }, { threshold: 0.3 });
  barObs.observe(skillsSection);
}

// ── Nav shadow on scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 50
    ? '0 2px 24px rgba(99,179,237,0.08)'
    : 'none';
});

// ── Active nav link ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
const activeObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navLinks.forEach((l) => {
        l.style.color = l.getAttribute('href') === `#${id}` ? 'var(--neon)' : '';
      });
    }
  });
}, { threshold: 0.5 });
sections.forEach((s) => activeObs.observe(s));

// ── Theme Toggle — dark ↔ light ──
//  dark  → fa-moon (shown when in dark mode, click to go light)
//  light → fa-sun  (shown when in light mode, click to go dark)

const darkToggle = document.getElementById('darkToggle');
const toggleIcon = document.getElementById('toggleIcon');

function applyTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
  toggleIcon.innerHTML = theme === 'light'
    ? '<i class="fa-regular fa-lightbulb"  title="Light mode"></i>'
    : '<i class="fa-solid fa-moon" title="Dark mode"></i>';
  darkToggle.setAttribute('aria-label', theme === 'light' ? 'Light mode' : 'Dark mode');
  localStorage.setItem('theme', theme);
}

darkToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light');
  applyTheme(isLight ? 'dark' : 'light');
});

// Load saved theme on page load
applyTheme(localStorage.getItem('theme') || 'dark');
