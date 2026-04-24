(function () {
  const NAV_HTML = `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <nav class="site-nav" aria-label="Main navigation">
      <a href="index.html" class="nav-logo">AC<span>.</span></a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="nav-menu" role="list">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="bookshelf.html">Bookshelf</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>`;

  const FOOTER_HTML = `
    <footer class="site-footer">
      <nav class="footer-links" aria-label="Footer navigation">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="bookshelf.html">Bookshelf</a>
        <a href="contact.html">Contact</a>
      </nav>
      <p>Built with vanilla HTML, CSS &amp; JavaScript &mdash; Alex Chen &copy; 2026</p>
      <p class="footer-disclaimer">
        <strong>Staff exemplar:</strong> Alex Chen is a fictional persona created for teaching purposes.
        This site was built with AI assistance (Claude, Anthropic) and human review and verification.
      </p>
    </footer>`;

  // Inject header
  const header = document.getElementById('site-header');
  if (header) header.innerHTML = NAV_HTML;

  // Inject footer
  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = FOOTER_HTML;

  // Set aria-current on active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Hamburger toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on link click (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
