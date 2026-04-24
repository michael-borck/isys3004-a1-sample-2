const tabs = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('.checkpoint-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-pressed', 'false'));
    tab.setAttribute('aria-pressed', 'true');
    const filter = tab.dataset.week;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.week === filter) {
        card.classList.remove('dimmed');
      } else {
        card.classList.add('dimmed');
      }
    });
  });
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
