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

// ── Theme Toggle (dark ↔ light) ──
const darkToggle = document.getElementById('darkToggle');
const toggleIcon = document.getElementById('toggleIcon');

// Default is dark — toggle adds .light class
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  toggleIcon.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  toggleIcon.textContent = '🌙';
}