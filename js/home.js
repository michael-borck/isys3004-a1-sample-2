// Typing animation
const roles = ['Web Developer', 'HTML & CSS Learner', 'Career Changer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');
const announcerEl = document.getElementById('role-announcement');

function type() {
  if (!typedEl) return;
  const current = roles[roleIndex];

  if (!isDeleting) charIndex++;
  else charIndex--;
  typedEl.textContent = current.slice(0, charIndex);

  if (!isDeleting && charIndex === current.length) {
    // Announce completed word to screen readers
    if (announcerEl) announcerEl.textContent = current;
    isDeleting = true;
    setTimeout(type, 1800);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 400);
    return;
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// Scroll reveal
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
