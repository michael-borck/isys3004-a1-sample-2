# Alex Chen Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete staff-exemplar portfolio website for fictional student "Alex Chen" demonstrating all 5 weekly checkpoints, deployed on GitHub Pages.

**Architecture:** Multi-page flat structure — 10 HTML files share a CSS design system (`base.css`) and a JS-injected nav/footer (`nav.js`). Each page loads only its own CSS and JS file in addition to base. No build step; files served as-is.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, flexbox, grid), JavaScript ES6+ (Fetch API, IntersectionObserver, async/await). Hosted on GitHub Pages.

---

## File Map

| File | Responsibility |
|------|---------------|
| `css/base.css` | Design tokens, reset, skip link, nav, footer, utilities, scroll-reveal class |
| `css/home.css` | Hero, skills strip, featured cards |
| `css/about.css` | Profile block, story, skills bars, timeline |
| `css/projects.css` | Filter tabs, vertical timeline, checkpoint cards |
| `css/checkpoint.css` | Shared detail page: breadcrumb, code block, nav arrows |
| `css/bookshelf.css` | Book card grid, search input, spinner |
| `css/contact.css` | Form layout, error states, success state |
| `js/nav.js` | Inject nav + footer HTML, set aria-current, hamburger toggle |
| `js/home.js` | Typing animation, IntersectionObserver scroll reveal |
| `js/projects.js` | Filter tab active state, scroll reveal |
| `js/bookshelf.js` | Fetch curated ISBNs on load, debounced search, render cards |
| `js/contact.js` | Form validation, inline errors, success state |
| `index.html` | Home page |
| `about.html` | About Alex page |
| `projects.html` | Learning journey overview |
| `checkpoint-1.html` – `checkpoint-5.html` | Individual checkpoint detail pages |
| `bookshelf.html` | Open Library API page |
| `contact.html` | Contact form |
| `.gitignore` | Ignore `.superpowers/`, `.DS_Store` |
| `README.md` | Project description, live URL, AI acknowledgement |

---

## Task 1: Repository Scaffold

**Files:**
- Create: `.gitignore`
- Create: `README.md`
- Create: all directories

- [ ] **Step 1: Create folder structure**

```bash
mkdir -p css js
touch css/base.css css/home.css css/about.css css/projects.css css/checkpoint.css css/bookshelf.css css/contact.css
touch js/nav.js js/home.js js/projects.js js/bookshelf.js js/contact.js
touch index.html about.html projects.html bookshelf.html contact.html
touch checkpoint-1.html checkpoint-2.html checkpoint-3.html checkpoint-4.html checkpoint-5.html
```

- [ ] **Step 2: Write .gitignore**

```
.DS_Store
.superpowers/
*.log
```

- [ ] **Step 3: Write README.md**

```markdown
# Alex Chen — Web Portfolio

A personal portfolio documenting my journey through the Web Fundamentals unit at Curtin University.

**Live site:** https://michaelborck.github.io/web-portfolio/

Built with vanilla HTML, CSS, and JavaScript — no frameworks.

## AI Acknowledgements
This project was developed with assistance from Claude (Anthropic) for code suggestions, debugging, and explaining concepts. All code has been reviewed and understood by the author.

## Structure
- `index.html` — Home
- `about.html` — About
- `projects.html` — Learning journey (5 checkpoints)
- `bookshelf.html` — Dev Bookshelf (Open Library API)
- `contact.html` — Contact
```

- [ ] **Step 4: Commit scaffold**

```bash
git add .gitignore README.md css/ js/ index.html about.html projects.html bookshelf.html contact.html checkpoint-1.html checkpoint-2.html checkpoint-3.html checkpoint-4.html checkpoint-5.html
git commit -m "chore: scaffold project structure"
```

---

## Task 2: CSS Design System (base.css)

**Files:**
- Write: `css/base.css`

- [ ] **Step 1: Write base.css**

```css
/* ===== DESIGN TOKENS ===== */
:root {
  --bg-deep:       #0f0f1a;
  --bg-card:       #1a1a2e;
  --bg-border:     #2a2a4a;
  --text-primary:  #e0e0ff;
  --text-secondary:#a0a0d0;
  --text-muted:    #666;
  --accent-purple: #6c63ff;
  --accent-coral:  #ff6584;
  --gradient:      linear-gradient(135deg, #6c63ff, #ff6584);
  --radius:        8px;
  --nav-height:    64px;
  --transition:    0.3s ease;
}

/* ===== RESET ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: var(--bg-deep);
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  min-height: 100vh;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
button { cursor: pointer; border: none; background: none; font: inherit; }

/* ===== SKIP LINK ===== */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: var(--accent-purple);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-weight: 700;
  z-index: 9999;
  transition: top 0.2s;
}
.skip-link:focus { top: 1rem; }

/* ===== NAVIGATION ===== */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
  padding: 0 1.5rem;
  background: rgba(15, 15, 26, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--bg-border);
}
.nav-logo {
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--text-primary);
  letter-spacing: 1px;
}
.nav-logo span { color: var(--accent-purple); }
.nav-links {
  display: flex;
  gap: 2rem;
}
.nav-links a {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: color var(--transition);
  position: relative;
  padding-bottom: 2px;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient);
  transition: width var(--transition);
}
.nav-links a:hover,
.nav-links a[aria-current="page"] {
  color: var(--text-primary);
}
.nav-links a[aria-current="page"]::after,
.nav-links a:hover::after { width: 100%; }

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  aria-label: "Toggle navigation";
}
.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 1px;
  transition: transform var(--transition), opacity var(--transition);
}

@media (max-width: 48rem) {
  .nav-toggle { display: flex; }
  .nav-links {
    position: fixed;
    inset: var(--nav-height) 0 0 0;
    background: var(--bg-deep);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    font-size: 1.25rem;
    transform: translateX(100%);
    transition: transform var(--transition);
  }
  .nav-open .nav-links { transform: translateX(0); }
  .nav-open .nav-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-open .nav-toggle span:nth-child(2) { opacity: 0; }
  .nav-open .nav-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
}

/* ===== FOOTER ===== */
.site-footer {
  border-top: 1px solid var(--bg-border);
  padding: 2.5rem 1.5rem;
  text-align: center;
  font-size: 0.8125rem;
  color: var(--text-muted);
}
.site-footer a {
  color: var(--accent-purple);
  transition: color var(--transition);
}
.site-footer a:hover { color: var(--text-primary); }
.footer-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

/* ===== UTILITIES ===== */
.container {
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.section { padding: 5rem 0; }
.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.section-subtitle {
  color: var(--text-muted);
  margin-bottom: 3rem;
}
.tag {
  display: inline-block;
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 4px;
  background: var(--bg-card);
  border: 1px solid var(--bg-border);
  color: var(--text-secondary);
}
.btn {
  display: inline-block;
  padding: 0.625rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.875rem;
  transition: opacity var(--transition), transform var(--transition);
}
.btn:hover { opacity: 0.85; transform: translateY(-1px); }
.btn-primary {
  background: var(--gradient);
  color: #fff;
}
.btn-outline {
  border: 1px solid var(--bg-border);
  color: var(--text-primary);
}

/* ===== SCROLL REVEAL ===== */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Verify by opening any html file in browser**

Open `index.html` in browser — page should have dark background `#0f0f1a`. No nav yet (nav.js not written), but background and no white flash confirms CSS loads.

- [ ] **Step 3: Commit**

```bash
git add css/base.css
git commit -m "feat: add CSS design system and base styles"
```

---

## Task 3: Shared Navigation (nav.js)

**Files:**
- Write: `js/nav.js`

- [ ] **Step 1: Write nav.js**

```javascript
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
```

- [ ] **Step 2: Add minimal HTML shell to index.html to test nav injection**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Chen — Web Developer</title>
  <link rel="stylesheet" href="css/base.css">
</head>
<body>
  <header id="site-header"></header>
  <main id="main-content">
    <p style="padding:2rem;color:white;">Nav test</p>
  </main>
  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify in browser**

Open `index.html`. Confirm: dark sticky nav appears with `AC.` logo and 5 links. Resize to mobile width — hamburger icon appears, clicking it opens/closes the menu. "Home" link has underline active state.

- [ ] **Step 4: Commit**

```bash
git add js/nav.js index.html
git commit -m "feat: add shared nav/footer injection and hamburger menu"
```

---

## Task 4: Home Page

**Files:**
- Write: `index.html` (full)
- Write: `css/home.css`
- Write: `js/home.js`

- [ ] **Step 1: Write css/home.css**

```css
/* ===== HERO ===== */
.hero {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem 3rem;
  position: relative;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(108,99,255,0.15), transparent);
  pointer-events: none;
}
.hero-badge {
  display: inline-block;
  background: rgba(108,99,255,0.15);
  border: 1px solid rgba(108,99,255,0.3);
  color: var(--accent-purple);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.375rem 1rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
}
.hero-title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.15;
  margin-bottom: 0.25rem;
}
.hero-title .gradient-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-role {
  font-size: 1.125rem;
  color: var(--text-secondary);
  min-height: 1.75rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.hero-role #typed-text { color: var(--text-primary); }
.cursor {
  color: var(--accent-purple);
  animation: blink 1s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }
.hero-tagline {
  max-width: 36rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  line-height: 1.7;
}
.hero-ctas {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* ===== SKILLS STRIP ===== */
.skills-strip {
  border-top: 1px solid var(--bg-border);
  border-bottom: 1px solid var(--bg-border);
  padding: 1.5rem;
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.skill-item { text-align: center; }
.skill-item .skill-name {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.skill-item .skill-label {
  display: block;
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin-top: 2px;
}

/* ===== FEATURED SECTION ===== */
.featured-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 48rem) {
  .featured-grid { grid-template-columns: repeat(3, 1fr); }
}
.featured-card {
  background: var(--bg-card);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: border-color var(--transition), transform var(--transition);
}
.featured-card:hover {
  border-color: var(--accent-purple);
  transform: translateY(-3px);
}
.featured-card .card-eyebrow {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent-purple);
  margin-bottom: 0.5rem;
}
.featured-card h3 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.featured-card p { font-size: 0.875rem; }
.featured-card .card-link {
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.8125rem;
  color: var(--accent-purple);
  font-weight: 600;
}
.featured-card .card-link:hover { text-decoration: underline; }
```

- [ ] **Step 2: Write js/home.js**

```javascript
// Typing animation
const roles = ['Web Developer', 'HTML & CSS Learner', 'Career Changer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  typedEl.textContent = isDeleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  if (!isDeleting && charIndex > current.length) {
    isDeleting = true;
    setTimeout(type, 1800);
    return;
  }
  if (isDeleting && charIndex < 0) {
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
```

- [ ] **Step 3: Write full index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Alex Chen — Web developer in training. Marketing coordinator turned coder. Follow my learning journey.">
  <title>Alex Chen — Web Developer</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/home.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content">
    <!-- Hero -->
    <section class="hero" aria-labelledby="hero-heading">
      <span class="hero-badge" aria-hidden="true">Available for opportunities</span>
      <h1 class="hero-title" id="hero-heading">
        Hi, I'm <span class="gradient-text">Alex Chen</span>
      </h1>
      <p class="hero-role" aria-live="polite" aria-label="Role">
        <span id="typed-text">Web Developer</span><span class="cursor" aria-hidden="true">|</span>
      </p>
      <p class="hero-tagline">
        Marketing coordinator turned web developer. I build clean, accessible websites and document every step of the journey — including the mistakes.
      </p>
      <div class="hero-ctas">
        <a href="projects.html" class="btn btn-primary">View My Work</a>
        <a href="about.html" class="btn btn-outline">About Me</a>
      </div>
    </section>

    <!-- Skills strip -->
    <div class="skills-strip" aria-label="Core skills">
      <div class="skill-item">
        <span class="skill-name" style="color:#6c63ff;">HTML5</span>
        <span class="skill-label">Semantic</span>
      </div>
      <div class="skill-item">
        <span class="skill-name" style="color:#9c8fff;">CSS3</span>
        <span class="skill-label">Responsive</span>
      </div>
      <div class="skill-item">
        <span class="skill-name" style="color:#c063b0;">JavaScript</span>
        <span class="skill-label">Vanilla</span>
      </div>
      <div class="skill-item">
        <span class="skill-name" style="color:#ff6584;">APIs</span>
        <span class="skill-label">Fetch / REST</span>
      </div>
      <div class="skill-item">
        <span class="skill-name" style="color:#f0c040;">a11y</span>
        <span class="skill-label">WCAG 2.1</span>
      </div>
    </div>

    <!-- Featured -->
    <section class="section container" aria-labelledby="featured-heading">
      <h2 class="section-title" id="featured-heading">What I've Been Building</h2>
      <p class="section-subtitle">Five weeks, five checkpoints, one portfolio.</p>
      <div class="featured-grid">
        <article class="featured-card reveal">
          <p class="card-eyebrow">Latest work</p>
          <h3>Learning Journey</h3>
          <p>From writing my first &lt;h1&gt; to passing an accessibility audit — the full story, checkpoint by checkpoint.</p>
          <a class="card-link" href="projects.html">View projects →</a>
        </article>
        <article class="featured-card reveal">
          <p class="card-eyebrow">API project</p>
          <h3>Dev Bookshelf</h3>
          <p>My favourite web development books, with live search powered by the Open Library API.</p>
          <a class="card-link" href="bookshelf.html">Browse books →</a>
        </article>
        <article class="featured-card reveal">
          <p class="card-eyebrow">Say hello</p>
          <h3>Get In Touch</h3>
          <p>Interested in collaborating or just want to talk about web dev? I'd love to hear from you.</p>
          <a class="card-link" href="contact.html">Contact me →</a>
        </article>
      </div>
    </section>
  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script src="js/home.js"></script>
</body>
</html>
```

- [ ] **Step 4: Verify in browser**

Open `index.html`. Confirm: hero with typing animation cycling through 3 roles, gradient on "Alex Chen", two CTA buttons, skills strip, 3 featured cards that fade in on scroll. Footer present.

- [ ] **Step 5: Commit**

```bash
git add index.html css/home.css js/home.js
git commit -m "feat: build home page with typing animation and scroll reveal"
```

---

## Task 5: About Page

**Files:**
- Write: `about.html`
- Write: `css/about.css`

- [ ] **Step 1: Write css/about.css**

```css
/* ===== PROFILE BLOCK ===== */
.profile-block {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
}
.profile-info h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  color: var(--text-primary);
}
.profile-info .role {
  color: var(--accent-purple);
  font-weight: 600;
}

/* ===== STORY ===== */
.story p {
  margin-bottom: 1.25rem;
  max-width: 42rem;
  line-height: 1.8;
}

/* ===== SKILLS BARS ===== */
.skills-list { display: flex; flex-direction: column; gap: 1.25rem; max-width: 36rem; }
.skill-bar-item {}
.skill-bar-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.375rem;
  color: var(--text-primary);
  font-weight: 600;
}
.skill-bar-track {
  height: 6px;
  background: var(--bg-border);
  border-radius: 3px;
  overflow: hidden;
}
.skill-bar-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--gradient);
}

/* ===== MILESTONES ===== */
.milestones { display: flex; flex-direction: column; gap: 1.5rem; }
.milestone {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
.milestone-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-purple);
  margin-top: 5px;
  flex-shrink: 0;
}
.milestone h3 { font-size: 0.9375rem; color: var(--text-primary); font-weight: 700; }
.milestone p { font-size: 0.8125rem; margin-top: 0.25rem; }

/* ===== ACKNOWLEDGEMENTS ===== */
.ack-box {
  background: var(--bg-card);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  max-width: 42rem;
}
.ack-box h3 { color: var(--text-primary); font-size: 1rem; margin-bottom: 0.75rem; }
.ack-box ul { display: flex; flex-direction: column; gap: 0.5rem; }
.ack-box li { font-size: 0.875rem; }
.ack-box li::before { content: '→ '; color: var(--accent-purple); }
```

- [ ] **Step 2: Write about.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="About Alex Chen — career changer, web development student, and lifelong learner.">
  <title>About — Alex Chen</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/about.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content" class="section container">

    <!-- Profile -->
    <div class="profile-block reveal">
      <div class="avatar" aria-hidden="true">AC</div>
      <div class="profile-info">
        <h1>Alex Chen</h1>
        <p class="role">Web Developer in Training</p>
        <p>Curtin University · Web Fundamentals</p>
      </div>
    </div>

    <!-- Story -->
    <section class="story reveal" aria-labelledby="story-heading">
      <h2 class="section-title" id="story-heading">My Story</h2>
      <p>I spent four years as a marketing coordinator, writing briefs and managing campaigns — but I kept finding myself in meetings asking "wait, why can't we just change the website?" Eventually I decided to stop asking and start learning.</p>
      <p>Web development appealed to me because it sits at the intersection of logic and creativity. I like that there's always a right answer when something is broken, but there are a thousand ways to make something beautiful. Coming from marketing, I already think in terms of audience and purpose — now I'm learning to express that through code.</p>
      <p>This portfolio documents my first unit of study. It's not perfect — but it's genuinely mine, built one checkpoint at a time, with real stumbling blocks and real fixes along the way.</p>
    </section>

    <!-- Skills -->
    <section class="section" style="padding-top:3rem;" aria-labelledby="skills-heading">
      <h2 class="section-title" id="skills-heading">Skills So Far</h2>
      <p class="section-subtitle">Honest self-assessment after 5 weeks.</p>
      <div class="skills-list reveal">
        <div class="skill-bar-item">
          <div class="skill-bar-header"><span>HTML5</span><span>75%</span></div>
          <div class="skill-bar-track"><div class="skill-bar-fill" style="width:75%;" role="img" aria-label="HTML5 proficiency 75%"></div></div>
        </div>
        <div class="skill-bar-item">
          <div class="skill-bar-header"><span>CSS3 &amp; Responsive Design</span><span>65%</span></div>
          <div class="skill-bar-track"><div class="skill-bar-fill" style="width:65%;" role="img" aria-label="CSS3 proficiency 65%"></div></div>
        </div>
        <div class="skill-bar-item">
          <div class="skill-bar-header"><span>JavaScript</span><span>50%</span></div>
          <div class="skill-bar-track"><div class="skill-bar-fill" style="width:50%;" role="img" aria-label="JavaScript proficiency 50%"></div></div>
        </div>
        <div class="skill-bar-item">
          <div class="skill-bar-header"><span>APIs &amp; Fetch</span><span>45%</span></div>
          <div class="skill-bar-track"><div class="skill-bar-fill" style="width:45%;" role="img" aria-label="APIs proficiency 45%"></div></div>
        </div>
        <div class="skill-bar-item">
          <div class="skill-bar-header"><span>Git &amp; Version Control</span><span>60%</span></div>
          <div class="skill-bar-track"><div class="skill-bar-fill" style="width:60%;" role="img" aria-label="Git proficiency 60%"></div></div>
        </div>
      </div>
    </section>

    <!-- Milestones -->
    <section class="section" style="padding-top:3rem;" aria-labelledby="milestones-heading">
      <h2 class="section-title" id="milestones-heading">Milestones</h2>
      <div class="milestones reveal">
        <div class="milestone">
          <div class="milestone-dot" aria-hidden="true"></div>
          <div>
            <h3>Week 1 — First commit</h3>
            <p>Wrote my first semantic HTML page and pushed it to GitHub. Spent 20 minutes confused about what "staging" meant.</p>
          </div>
        </div>
        <div class="milestone">
          <div class="milestone-dot" aria-hidden="true"></div>
          <div>
            <h3>Week 3 — First deployed site</h3>
            <p>Got GitHub Pages working. Seeing my own URL in a browser on my phone was genuinely exciting.</p>
          </div>
        </div>
        <div class="milestone">
          <div class="milestone-dot" aria-hidden="true"></div>
          <div>
            <h3>Week 5 — Lighthouse score 96</h3>
            <p>Passed an accessibility audit. Went from 71 to 96 by fixing contrast, adding ARIA labels, and finally understanding what a skip link is for.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Acknowledgements -->
    <section class="section" style="padding-top:3rem;" aria-labelledby="ack-heading">
      <h2 class="section-title" id="ack-heading">Acknowledgements</h2>
      <div class="ack-box reveal">
        <h3>Tools &amp; Resources Used</h3>
        <ul>
          <li>Claude (Anthropic) — code suggestions, debugging, explaining concepts</li>
          <li>MDN Web Docs — primary reference for HTML, CSS, and JavaScript</li>
          <li>CSS-Tricks — flexbox and grid guides</li>
          <li>WebAIM — colour contrast checker and accessibility guidance</li>
          <li>Open Library API — book data and cover images for the Bookshelf page</li>
        </ul>
      </div>
    </section>

  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script>
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }
  </script>
</body>
</html>
```

- [ ] **Step 3: Verify in browser**

Open `about.html`. Confirm: avatar circle with "AC" initials, story paragraphs, 5 skill bars with correct widths, 3 milestone entries, acknowledgements box. Scroll reveal animates sections in.

- [ ] **Step 4: Commit**

```bash
git add about.html css/about.css
git commit -m "feat: build about page with profile, skills bars, and milestones"
```

---

## Task 6: Projects Page

**Files:**
- Write: `projects.html`
- Write: `css/projects.css`
- Write: `js/projects.js`

- [ ] **Step 1: Write css/projects.css**

```css
/* ===== FILTER TABS ===== */
.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}
.filter-tab {
  padding: 0.375rem 1rem;
  border-radius: 20px;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid var(--bg-border);
  color: var(--text-muted);
  background: var(--bg-card);
  transition: all var(--transition);
}
.filter-tab[aria-pressed="true"] {
  background: var(--accent-purple);
  border-color: var(--accent-purple);
  color: #fff;
}
.filter-tab:hover:not([aria-pressed="true"]) {
  border-color: var(--accent-purple);
  color: var(--text-primary);
}

/* ===== TIMELINE ===== */
.timeline {
  position: relative;
  padding-left: 3rem;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 18px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent-purple), var(--accent-coral));
  border-radius: 1px;
}

/* ===== CHECKPOINT CARD ===== */
.checkpoint-card {
  position: relative;
  margin-bottom: 2rem;
  transition: opacity var(--transition);
}
.checkpoint-card.dimmed { opacity: 0.25; }
.checkpoint-dot {
  position: absolute;
  left: -2.5rem;
  top: 0.75rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 700;
  z-index: 1;
}
.checkpoint-inner {
  background: var(--bg-card);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: border-color var(--transition), transform var(--transition);
}
.checkpoint-card:not(.dimmed) .checkpoint-inner:hover {
  border-color: var(--accent-purple);
  transform: translateX(4px);
}
.checkpoint-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}
.checkpoint-week {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.checkpoint-badge {
  font-size: 0.6875rem;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}
.checkpoint-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.checkpoint-desc { font-size: 0.875rem; line-height: 1.7; margin-bottom: 1rem; }
.checkpoint-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
.checkpoint-link {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent-purple);
  transition: color var(--transition);
}
.checkpoint-link:hover { color: var(--text-primary); }
```

- [ ] **Step 2: Write js/projects.js**

```javascript
const tabs = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('.checkpoint-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update tab state
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

// Scroll reveal
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
```

- [ ] **Step 3: Write projects.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Alex Chen's learning journey — five checkpoints from HTML basics to accessibility auditing.">
  <title>Projects — Alex Chen</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/projects.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content" class="section container">
    <h1 class="section-title">My Learning Journey</h1>
    <p class="section-subtitle">Five weeks. Five checkpoints. One portfolio.</p>

    <!-- Filter tabs -->
    <div class="filter-tabs" role="group" aria-label="Filter by week">
      <button class="filter-tab" data-week="all" aria-pressed="true">All</button>
      <button class="filter-tab" data-week="1" aria-pressed="false">Week 1</button>
      <button class="filter-tab" data-week="2" aria-pressed="false">Week 2</button>
      <button class="filter-tab" data-week="3" aria-pressed="false">Week 3</button>
      <button class="filter-tab" data-week="4" aria-pressed="false">Week 4</button>
      <button class="filter-tab" data-week="5" aria-pressed="false">Week 5</button>
    </div>

    <!-- Timeline -->
    <div class="timeline">

      <!-- Week 1 -->
      <article class="checkpoint-card reveal" data-week="1" aria-labelledby="cp1-title">
        <div class="checkpoint-dot" style="background:#6c63ff;" aria-hidden="true">1</div>
        <div class="checkpoint-inner">
          <div class="checkpoint-meta">
            <span class="checkpoint-week" style="color:#6c63ff;">Week 1 · HTML</span>
            <span class="checkpoint-badge" style="background:rgba(108,99,255,0.15);color:#6c63ff;">Checkpoint 1.1</span>
          </div>
          <h2 class="checkpoint-title" id="cp1-title">Laying the Foundation</h2>
          <p class="checkpoint-desc">Built the HTML skeleton — semantic elements, proper heading hierarchy, nav, main, footer. First time I realised how much structure matters before a single line of CSS.</p>
          <div class="checkpoint-tags">
            <span class="tag">HTML5</span>
            <span class="tag">Semantic markup</span>
            <span class="tag">Accessibility</span>
            <span class="tag">Git</span>
          </div>
          <a class="checkpoint-link" href="checkpoint-1.html">View details →</a>
        </div>
      </article>

      <!-- Week 2 -->
      <article class="checkpoint-card reveal" data-week="2" aria-labelledby="cp2-title">
        <div class="checkpoint-dot" style="background:#9c8fff;" aria-hidden="true">2</div>
        <div class="checkpoint-inner">
          <div class="checkpoint-meta">
            <span class="checkpoint-week" style="color:#9c8fff;">Week 2 · CSS</span>
            <span class="checkpoint-badge" style="background:rgba(156,143,255,0.15);color:#9c8fff;">Checkpoint 1.2</span>
          </div>
          <h2 class="checkpoint-title" id="cp2-title">Style &amp; Responsiveness</h2>
          <p class="checkpoint-desc">Added the dark theme, CSS custom properties, flexbox layouts. The mobile-first approach broke my brain at first — but media queries finally clicked.</p>
          <div class="checkpoint-tags">
            <span class="tag">CSS3</span>
            <span class="tag">Flexbox</span>
            <span class="tag">CSS Grid</span>
            <span class="tag">Custom Properties</span>
            <span class="tag">Media Queries</span>
          </div>
          <a class="checkpoint-link" href="checkpoint-2.html">View details →</a>
        </div>
      </article>

      <!-- Week 3 -->
      <article class="checkpoint-card reveal" data-week="3" aria-labelledby="cp3-title">
        <div class="checkpoint-dot" style="background:#c063b0;" aria-hidden="true">3</div>
        <div class="checkpoint-inner">
          <div class="checkpoint-meta">
            <span class="checkpoint-week" style="color:#c063b0;">Week 3 · JavaScript</span>
            <span class="checkpoint-badge" style="background:rgba(192,99,176,0.15);color:#c063b0;">Checkpoint 1.3</span>
          </div>
          <h2 class="checkpoint-title" id="cp3-title">Making Things Move</h2>
          <p class="checkpoint-desc">Event listeners, DOM manipulation, the typing hero animation. Spent a whole evening debugging why my scroll reveal wasn't firing — turned out I had the threshold backwards.</p>
          <div class="checkpoint-tags">
            <span class="tag">JavaScript</span>
            <span class="tag">DOM API</span>
            <span class="tag">IntersectionObserver</span>
            <span class="tag">Event Listeners</span>
          </div>
          <a class="checkpoint-link" href="checkpoint-3.html">View details →</a>
        </div>
      </article>

      <!-- Week 4 -->
      <article class="checkpoint-card reveal" data-week="4" aria-labelledby="cp4-title">
        <div class="checkpoint-dot" style="background:#e0656a;" aria-hidden="true">4</div>
        <div class="checkpoint-inner">
          <div class="checkpoint-meta">
            <span class="checkpoint-week" style="color:#e0656a;">Week 4 · API</span>
            <span class="checkpoint-badge" style="background:rgba(224,101,106,0.15);color:#e0656a;">Checkpoint 1.4</span>
          </div>
          <h2 class="checkpoint-title" id="cp4-title">Connecting to the World</h2>
          <p class="checkpoint-desc">Fetched live data from the Open Library API — async/await, error handling, dynamic card rendering. The bookshelf page came alive the moment the covers loaded.</p>
          <div class="checkpoint-tags">
            <span class="tag">Fetch API</span>
            <span class="tag">async/await</span>
            <span class="tag">JSON</span>
            <span class="tag">Open Library</span>
            <span class="tag">Error Handling</span>
          </div>
          <a class="checkpoint-link" href="checkpoint-4.html">View details →</a>
        </div>
      </article>

      <!-- Week 5 -->
      <article class="checkpoint-card reveal" data-week="5" aria-labelledby="cp5-title">
        <div class="checkpoint-dot" style="background:#ff6584;" aria-hidden="true">5</div>
        <div class="checkpoint-inner">
          <div class="checkpoint-meta">
            <span class="checkpoint-week" style="color:#ff6584;">Week 5 · Accessibility</span>
            <span class="checkpoint-badge" style="background:rgba(255,101,132,0.15);color:#ff6584;">Final Polish</span>
          </div>
          <h2 class="checkpoint-title" id="cp5-title">Building for Everyone</h2>
          <p class="checkpoint-desc">Lighthouse audit, ARIA labels, keyboard navigation, focus rings, colour contrast fixes. Went from a Lighthouse score of 71 to 96 — before/after screenshots included.</p>
          <div class="checkpoint-tags">
            <span class="tag">ARIA</span>
            <span class="tag">WCAG 2.1</span>
            <span class="tag">Lighthouse</span>
            <span class="tag">Focus Management</span>
            <span class="tag">Colour Contrast</span>
          </div>
          <a class="checkpoint-link" href="checkpoint-5.html">View details →</a>
        </div>
      </article>

    </div>
  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script src="js/projects.js"></script>
</body>
</html>
```

- [ ] **Step 4: Verify in browser**

Open `projects.html`. Confirm: 5 timeline cards with colour-coded dots. Click "Week 3" tab — cards 1,2,4,5 dim to 25% opacity, card 3 stays bright. Click "All" — all cards return to full opacity. Scroll reveal animates cards in.

- [ ] **Step 5: Commit**

```bash
git add projects.html css/projects.css js/projects.js
git commit -m "feat: build projects timeline with filter tabs"
```

---

## Task 7: Checkpoint Detail Pages

**Files:**
- Write: `css/checkpoint.css`
- Write: `checkpoint-1.html` through `checkpoint-5.html`

- [ ] **Step 1: Write css/checkpoint.css**

```css
/* ===== BREADCRUMB ===== */
.breadcrumb {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}
.breadcrumb a { color: var(--accent-purple); }
.breadcrumb a:hover { text-decoration: underline; }
.breadcrumb span { color: var(--text-muted); }

/* ===== CHECKPOINT HEADER ===== */
.cp-header { margin-bottom: 3rem; }
.cp-week-number {
  font-size: clamp(4rem, 12vw, 7rem);
  font-weight: 800;
  line-height: 1;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}
.cp-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 0.75rem;
}
.cp-title {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

/* ===== CONTENT SECTIONS ===== */
.cp-section {
  background: var(--bg-card);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
.cp-section h2 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}
.cp-section p { font-size: 0.9375rem; line-height: 1.75; }
.cp-section ul { display: flex; flex-direction: column; gap: 0.625rem; padding-left: 0; }
.cp-section li {
  font-size: 0.9375rem;
  line-height: 1.6;
  padding-left: 1.25rem;
  position: relative;
}
.cp-section li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent-purple);
}

/* ===== CODE BLOCK ===== */
.cp-code {
  background: #080810;
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}
.cp-code-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent-purple);
  margin-bottom: 0.75rem;
}
.cp-code pre {
  margin: 0;
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: #c9d1d9;
  white-space: pre;
}

/* ===== CHALLENGE BOX ===== */
.cp-challenge {
  border-left: 3px solid var(--accent-coral);
  padding-left: 1.25rem;
  margin-bottom: 1.5rem;
}
.cp-challenge h2 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--accent-coral);
  margin-bottom: 0.5rem;
}
.cp-challenge p { font-size: 0.9375rem; line-height: 1.75; }

/* ===== NAV ARROWS ===== */
.cp-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--bg-border);
  flex-wrap: wrap;
  gap: 1rem;
}
.cp-nav a {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent-purple);
  transition: color var(--transition);
}
.cp-nav a:hover { color: var(--text-primary); }
.cp-nav .back-link { color: var(--text-muted); }
.cp-nav .back-link:hover { color: var(--text-primary); }
```

- [ ] **Step 2: Write checkpoint-1.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Week 1: Semantic HTML structure — Alex Chen's first checkpoint.">
  <title>Week 1: Laying the Foundation — Alex Chen</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/checkpoint.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content" class="section container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span aria-hidden="true">›</span>
      <a href="projects.html">Projects</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Week 1</span>
    </nav>

    <header class="cp-header">
      <div class="cp-week-number" aria-hidden="true">01</div>
      <span class="cp-badge" style="background:rgba(108,99,255,0.15);color:#6c63ff;">Checkpoint 1.1 · HTML Structure</span>
      <h1 class="cp-title">Laying the Foundation</h1>
    </header>

    <div class="cp-section reveal">
      <h2>What I Built</h2>
      <p>A fully structured HTML portfolio skeleton with semantic elements throughout — no CSS, no JavaScript, just clean markup. Every page had a proper <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;footer&gt;</code>. Headings followed a strict hierarchy starting with a single <code>&lt;h1&gt;</code>. The nav linked all pages together.</p>
    </div>

    <div class="cp-section reveal">
      <h2>What I Learned</h2>
      <ul>
        <li>Semantic HTML isn't just about how it looks — it communicates meaning to browsers, search engines, and screen readers.</li>
        <li>A page should have exactly one <code>&lt;h1&gt;</code>. I had three at first. That matters for accessibility.</li>
        <li>The difference between <code>&lt;div&gt;</code> and <code>&lt;section&gt;</code> and <code>&lt;article&gt;</code> is about semantics, not layout.</li>
        <li>Git staging area confused me for a full hour. <code>git add</code> then <code>git commit</code> — now it makes sense.</li>
      </ul>
    </div>

    <div class="cp-code reveal">
      <p class="cp-code-label">Code highlight — semantic page structure</p>
      <pre><code>&lt;body&gt;
  &lt;header&gt;
    &lt;nav aria-label="Main navigation"&gt;
      &lt;a href="index.html"&gt;Home&lt;/a&gt;
      &lt;a href="about.html"&gt;About&lt;/a&gt;
      &lt;a href="projects.html"&gt;Projects&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/header&gt;

  &lt;main id="main-content"&gt;
    &lt;h1&gt;Alex Chen — Web Developer&lt;/h1&gt;
    &lt;section aria-labelledby="about-heading"&gt;
      &lt;h2 id="about-heading"&gt;About Me&lt;/h2&gt;
      &lt;p&gt;...&lt;/p&gt;
    &lt;/section&gt;
  &lt;/main&gt;

  &lt;footer&gt;
    &lt;p&gt;&amp;copy; 2026 Alex Chen&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;</code></pre>
    </div>

    <div class="cp-challenge reveal">
      <h2>Challenge &amp; Fix</h2>
      <p><strong>Problem:</strong> I kept writing <code>&lt;div class="nav"&gt;</code> out of habit from tutorials. My tutor pointed out that <code>&lt;nav&gt;</code> exists for exactly this reason — divs with class names are invisible to assistive technology.<br><br><strong>Fix:</strong> Replaced all structural divs with the correct semantic element. Added <code>aria-label</code> attributes where there were multiple nav landmarks on the page.</p>
    </div>

    <div class="cp-section reveal">
      <h2>Skills Gained</h2>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        <span class="tag">HTML5</span>
        <span class="tag">Semantic elements</span>
        <span class="tag">Heading hierarchy</span>
        <span class="tag">ARIA landmarks</span>
        <span class="tag">Git basics</span>
        <span class="tag">GitHub</span>
      </div>
    </div>

    <nav class="cp-nav" aria-label="Checkpoint navigation">
      <a class="back-link" href="projects.html">← Back to Projects</a>
      <a href="checkpoint-2.html">Week 2: Style &amp; Responsiveness →</a>
    </nav>
  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script>
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }
  </script>
</body>
</html>
```

- [ ] **Step 3: Write checkpoint-2.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Week 2: CSS styling and responsive design — Alex Chen's second checkpoint.">
  <title>Week 2: Style &amp; Responsiveness — Alex Chen</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/checkpoint.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content" class="section container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span aria-hidden="true">›</span>
      <a href="projects.html">Projects</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Week 2</span>
    </nav>

    <header class="cp-header">
      <div class="cp-week-number" aria-hidden="true">02</div>
      <span class="cp-badge" style="background:rgba(156,143,255,0.15);color:#9c8fff;">Checkpoint 1.2 · CSS Styling</span>
      <h1 class="cp-title">Style &amp; Responsiveness</h1>
    </header>

    <div class="cp-section reveal">
      <h2>What I Built</h2>
      <p>Transformed the bare HTML skeleton into a styled, responsive site. Introduced a full dark theme using CSS custom properties, built page layouts with flexbox, and made everything work on mobile using a mobile-first media query approach.</p>
    </div>

    <div class="cp-section reveal">
      <h2>What I Learned</h2>
      <ul>
        <li>CSS custom properties (variables) are a game-changer — change one value, everything updates.</li>
        <li>Mobile-first means writing base styles for small screens, then using <code>min-width</code> media queries to enhance for larger ones. I had it backwards at first.</li>
        <li>Flexbox makes centering things actually make sense. <code>align-items: center</code> and <code>justify-content: center</code> became my best friends.</li>
        <li>CSS Grid is better than flexbox when you have two dimensions to manage — rows and columns together.</li>
      </ul>
    </div>

    <div class="cp-code reveal">
      <p class="cp-code-label">Code highlight — CSS custom properties and mobile-first media query</p>
      <pre><code>:root {
  --bg-deep:      #0f0f1a;
  --accent-purple:#6c63ff;
  --text-primary: #e0e0ff;
}

/* Base: mobile */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Tablet and up */
@media (min-width: 48rem) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}</code></pre>
    </div>

    <div class="cp-challenge reveal">
      <h2>Challenge &amp; Fix</h2>
      <p><strong>Problem:</strong> My nav looked fine on desktop but broke completely on mobile — links overflowed horizontally and were unclickable.<br><br><strong>Fix:</strong> Rewrote the nav using flexbox with <code>flex-wrap: wrap</code> for the interim, then later upgraded to a proper hamburger menu with a JavaScript toggle. Learned that responsive design is a process, not a one-time decision.</p>
    </div>

    <div class="cp-section reveal">
      <h2>Skills Gained</h2>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        <span class="tag">CSS custom properties</span>
        <span class="tag">Flexbox</span>
        <span class="tag">CSS Grid</span>
        <span class="tag">Mobile-first design</span>
        <span class="tag">Media queries</span>
        <span class="tag">Dark theme</span>
      </div>
    </div>

    <nav class="cp-nav" aria-label="Checkpoint navigation">
      <a href="checkpoint-1.html">← Week 1: Laying the Foundation</a>
      <a href="checkpoint-3.html">Week 3: Making Things Move →</a>
    </nav>
  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script>
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }
  </script>
</body>
</html>
```

- [ ] **Step 4: Write checkpoint-3.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Week 3: JavaScript, DOM manipulation, and event listeners — Alex Chen's third checkpoint.">
  <title>Week 3: Making Things Move — Alex Chen</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/checkpoint.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content" class="section container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span aria-hidden="true">›</span>
      <a href="projects.html">Projects</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Week 3</span>
    </nav>

    <header class="cp-header">
      <div class="cp-week-number" aria-hidden="true">03</div>
      <span class="cp-badge" style="background:rgba(192,99,176,0.15);color:#c063b0;">Checkpoint 1.3 · JavaScript</span>
      <h1 class="cp-title">Making Things Move</h1>
    </header>

    <div class="cp-section reveal">
      <h2>What I Built</h2>
      <p>Added JavaScript interactivity to the portfolio: a typing animation on the home page hero, scroll-reveal animations using <code>IntersectionObserver</code>, and the hamburger nav toggle. Also built the project filter tabs that dim non-selected checkpoint cards.</p>
    </div>

    <div class="cp-section reveal">
      <h2>What I Learned</h2>
      <ul>
        <li><code>document.querySelectorAll()</code> returns a NodeList — you have to convert it with <code>Array.from()</code> or use <code>forEach()</code> directly.</li>
        <li><code>IntersectionObserver</code> is how modern scroll animations work — it's much better than listening to the <code>scroll</code> event.</li>
        <li>The typing animation is just a <code>setTimeout</code> loop that slices strings. Once I understood that, it felt obvious.</li>
        <li>Always check <code>prefers-reduced-motion</code> before applying animations — not everyone wants things moving on screen.</li>
      </ul>
    </div>

    <div class="cp-code reveal">
      <p class="cp-code-label">Code highlight — IntersectionObserver scroll reveal</p>
      <pre><code>if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}</code></pre>
    </div>

    <div class="cp-challenge reveal">
      <h2>Challenge &amp; Fix</h2>
      <p><strong>Problem:</strong> My scroll reveal wasn't triggering. Elements stayed invisible forever. I spent an evening on it.<br><br><strong>Fix:</strong> I had set <code>threshold: 0.9</code>, meaning the element had to be 90% visible before triggering. On mobile, some elements were taller than the viewport, so they never hit 90%. Changed to <code>0.15</code> — fire when 15% visible. Obvious in hindsight.</p>
    </div>

    <div class="cp-section reveal">
      <h2>Skills Gained</h2>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        <span class="tag">JavaScript ES6+</span>
        <span class="tag">DOM manipulation</span>
        <span class="tag">Event listeners</span>
        <span class="tag">IntersectionObserver</span>
        <span class="tag">setTimeout/setInterval</span>
        <span class="tag">prefers-reduced-motion</span>
      </div>
    </div>

    <nav class="cp-nav" aria-label="Checkpoint navigation">
      <a href="checkpoint-2.html">← Week 2: Style &amp; Responsiveness</a>
      <a href="checkpoint-4.html">Week 4: Connecting to the World →</a>
    </nav>
  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script>
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }
  </script>
</body>
</html>
```

- [ ] **Step 5: Write checkpoint-4.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Week 4: API integration with Open Library — Alex Chen's fourth checkpoint.">
  <title>Week 4: Connecting to the World — Alex Chen</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/checkpoint.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content" class="section container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span aria-hidden="true">›</span>
      <a href="projects.html">Projects</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Week 4</span>
    </nav>

    <header class="cp-header">
      <div class="cp-week-number" aria-hidden="true">04</div>
      <span class="cp-badge" style="background:rgba(224,101,106,0.15);color:#e0656a;">Checkpoint 1.4 · API Integration</span>
      <h1 class="cp-title">Connecting to the World</h1>
    </header>

    <div class="cp-section reveal">
      <h2>What I Built</h2>
      <p>The Dev Bookshelf page — fetches real book data and cover images from the Open Library API. On page load it renders 6 curated favourites. A search bar lets users find any book via a live API query, with debouncing to avoid hammering the server on every keystroke.</p>
    </div>

    <div class="cp-section reveal">
      <h2>What I Learned</h2>
      <ul>
        <li><code>async/await</code> makes asynchronous code read like synchronous code — much easier than promise chains once it clicks.</li>
        <li>Always wrap <code>fetch()</code> calls in try/catch. Networks fail. APIs go down. Users need a useful error message, not a blank page.</li>
        <li>Debouncing means "wait until the user stops typing before making the API call". A 400ms delay avoids 20 requests for a single search.</li>
        <li>Open Library's cover image URL is just <code>https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg</code> — no auth required.</li>
      </ul>
    </div>

    <div class="cp-code reveal">
      <p class="cp-code-label">Code highlight — async fetch with error handling</p>
      <pre><code>async function searchBooks(query) {
  const resultsEl = document.getElementById('search-results');
  resultsEl.innerHTML = '&lt;p class="loading"&gt;Searching...&lt;/p&gt;';

  try {
    const url = `https://openlibrary.org/search.json` +
                `?q=${encodeURIComponent(query)}` +
                `&fields=title,author_name,cover_i,first_publish_year` +
                `&limit=12`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    renderBooks(data.docs, resultsEl);
  } catch (err) {
    resultsEl.innerHTML =
      `&lt;p class="error"&gt;Could not load results. Try again.&lt;/p&gt;`;
  }
}</code></pre>
    </div>

    <div class="cp-challenge reveal">
      <h2>Challenge &amp; Fix</h2>
      <p><strong>Problem:</strong> Some books had no cover image. My <code>&lt;img&gt;</code> tags showed broken image icons.<br><br><strong>Fix:</strong> Added an <code>onerror</code> handler on each image: if the cover fails to load, swap the <code>src</code> to a CSS-only placeholder with the book title as text. Also added a <code>loading="lazy"</code> attribute to defer off-screen cover loads.</p>
    </div>

    <div class="cp-section reveal">
      <h2>Skills Gained</h2>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        <span class="tag">Fetch API</span>
        <span class="tag">async/await</span>
        <span class="tag">try/catch</span>
        <span class="tag">JSON parsing</span>
        <span class="tag">Debouncing</span>
        <span class="tag">Dynamic DOM rendering</span>
        <span class="tag">REST APIs</span>
      </div>
    </div>

    <nav class="cp-nav" aria-label="Checkpoint navigation">
      <a href="checkpoint-3.html">← Week 3: Making Things Move</a>
      <a href="checkpoint-5.html">Week 5: Building for Everyone →</a>
    </nav>
  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script>
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }
  </script>
</body>
</html>
```

- [ ] **Step 6: Write checkpoint-5.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Week 5: Accessibility testing and fixes — Alex Chen's fifth checkpoint.">
  <title>Week 5: Building for Everyone — Alex Chen</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/checkpoint.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content" class="section container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span aria-hidden="true">›</span>
      <a href="projects.html">Projects</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Week 5</span>
    </nav>

    <header class="cp-header">
      <div class="cp-week-number" aria-hidden="true">05</div>
      <span class="cp-badge" style="background:rgba(255,101,132,0.15);color:#ff6584;">Final Polish · Accessibility</span>
      <h1 class="cp-title">Building for Everyone</h1>
    </header>

    <div class="cp-section reveal">
      <h2>What I Did</h2>
      <p>Ran a full Lighthouse accessibility audit on every page, then systematically fixed every issue it flagged. Also ran manual keyboard navigation tests and used a screen reader (VoiceOver on macOS) to hear how the site sounded. The experience was humbling.</p>
    </div>

    <div class="cp-section reveal">
      <h2>What I Fixed</h2>
      <ul>
        <li>Added <code>aria-label</code> to all icon-only links (social icons in the footer).</li>
        <li>Added <code>aria-current="page"</code> to the active nav link via JavaScript.</li>
        <li>Added <code>aria-live="polite"</code> to the search results region so screen readers announce new results.</li>
        <li>Fixed colour contrast on muted text — <code>#666</code> on dark background failed AA. Changed to <code>#888</code>.</li>
        <li>Added visible <code>:focus-visible</code> rings to all interactive elements.</li>
        <li>Added a skip link ("Skip to main content") at the top of every page.</li>
        <li>Ensured all form inputs had associated <code>&lt;label&gt;</code> elements (not just placeholders).</li>
        <li>Added <code>alt</code> text to all book cover images; fallback covers use <code>role="img" aria-label="..."</code>.</li>
      </ul>
    </div>

    <div class="cp-code reveal">
      <p class="cp-code-label">Code highlight — focus-visible ring and skip link</p>
      <pre><code>/* Visible keyboard focus ring */
:focus-visible {
  outline: 2px solid var(--accent-purple);
  outline-offset: 3px;
  border-radius: 3px;
}

/* Skip link — visible on focus only */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: var(--accent-purple);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  z-index: 9999;
  transition: top 0.2s;
}
.skip-link:focus { top: 1rem; }</code></pre>
    </div>

    <div class="cp-challenge reveal">
      <h2>Challenge &amp; Fix</h2>
      <p><strong>Problem:</strong> The typing animation was announced by VoiceOver on every character change, creating a stream of noise for screen reader users.<br><br><strong>Fix:</strong> Wrapped the typed text in a container with <code>aria-live="polite"</code> but moved the live region outside the visible element. The static fallback text ("Web Developer") is in a non-live <code>&lt;span&gt;</code>, so screen readers read it once and stop. The animation is purely visual.</p>
    </div>

    <div class="cp-section reveal">
      <h2>Before &amp; After — Lighthouse Scores</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:32rem;">
        <div style="text-align:center;padding:1rem;border:1px solid var(--bg-border);border-radius:var(--radius);">
          <div style="font-size:2.5rem;font-weight:800;color:#e0656a;">71</div>
          <div style="font-size:0.8125rem;color:var(--text-muted);">Before (Week 1)</div>
        </div>
        <div style="text-align:center;padding:1rem;border:1px solid #6c63ff55;border-radius:var(--radius);background:rgba(108,99,255,0.05);">
          <div style="font-size:2.5rem;font-weight:800;color:#6c63ff;">96</div>
          <div style="font-size:0.8125rem;color:var(--text-muted);">After (Week 5)</div>
        </div>
      </div>
    </div>

    <div class="cp-section reveal">
      <h2>Skills Gained</h2>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        <span class="tag">WCAG 2.1 AA</span>
        <span class="tag">ARIA attributes</span>
        <span class="tag">Keyboard navigation</span>
        <span class="tag">Colour contrast</span>
        <span class="tag">Focus management</span>
        <span class="tag">Screen reader testing</span>
        <span class="tag">Lighthouse</span>
      </div>
    </div>

    <nav class="cp-nav" aria-label="Checkpoint navigation">
      <a href="checkpoint-4.html">← Week 4: Connecting to the World</a>
      <a href="projects.html">Back to Projects ↑</a>
    </nav>
  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script>
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }
  </script>
</body>
</html>
```

- [ ] **Step 7: Verify all checkpoint pages**

Open each checkpoint page in browser. Confirm: breadcrumb works, large gradient week number visible, all sections render, code block is readable, prev/next navigation links are correct (1→2→3→4→5, back link on 1 goes to projects).

- [ ] **Step 8: Commit**

```bash
git add css/checkpoint.css checkpoint-1.html checkpoint-2.html checkpoint-3.html checkpoint-4.html checkpoint-5.html
git commit -m "feat: build all 5 checkpoint detail pages"
```

---

## Task 8: Bookshelf Page

**Files:**
- Write: `bookshelf.html`
- Write: `css/bookshelf.css`
- Write: `js/bookshelf.js`

- [ ] **Step 1: Write css/bookshelf.css**

```css
/* ===== SEARCH ===== */
.search-wrap {
  position: relative;
  max-width: 36rem;
  margin-bottom: 3rem;
}
.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  background: var(--bg-card);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-size: 0.9375rem;
  font-family: inherit;
  transition: border-color var(--transition);
}
.search-input::placeholder { color: var(--text-muted); }
.search-input:focus {
  outline: 2px solid var(--accent-purple);
  outline-offset: 2px;
  border-color: var(--accent-purple);
}
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
  font-size: 1rem;
}

/* ===== BOOK GRID ===== */
.book-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
@media (min-width: 36rem) {
  .book-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 64rem) {
  .book-grid { grid-template-columns: repeat(4, 1fr); }
}

/* ===== BOOK CARD ===== */
.book-card {
  background: var(--bg-card);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color var(--transition), transform var(--transition);
  display: flex;
  flex-direction: column;
}
.book-card:hover {
  border-color: var(--accent-purple);
  transform: translateY(-4px);
}
.book-cover-wrap {
  aspect-ratio: 2/3;
  background: var(--bg-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.book-cover-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-card), var(--bg-border));
  font-size: 0.6875rem;
  color: var(--text-muted);
  text-align: center;
  padding: 0.5rem;
}
.book-info { padding: 0.875rem; flex: 1; }
.book-title {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.book-author { font-size: 0.75rem; color: var(--text-muted); }
.book-year {
  font-size: 0.6875rem;
  color: var(--accent-purple);
  margin-top: 0.375rem;
  font-weight: 600;
}

/* ===== STATES ===== */
.loading-msg, .error-msg, .empty-msg {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}
.error-msg { color: var(--accent-coral); }
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--bg-border);
  border-top-color: var(--accent-purple);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto 1rem;
}
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .spinner { animation: none; border-top-color: var(--accent-purple); }
}

/* ===== SECTION DIVIDER ===== */
.shelf-section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.shelf-section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--bg-border);
}
```

- [ ] **Step 2: Write js/bookshelf.js**

```javascript
const CURATED_ISBNS = [
  { isbn: '9780596517748', title: 'JavaScript: The Good Parts',      author: 'Douglas Crockford',  year: 2008 },
  { isbn: '9781491950296', title: "You Don't Know JS",                author: 'Kyle Simpson',        year: 2015 },
  { isbn: '9780321965516', title: 'HTML & CSS',                       author: 'Jon Duckett',         year: 2011 },
  { isbn: '9780137081073', title: 'Clean Code',                       author: 'Robert C. Martin',    year: 2008 },
  { isbn: '9781449331818', title: 'Learning Web Design',              author: 'Jennifer Robbins',    year: 2018 },
  { isbn: '9781430216070', title: 'Principles of Beautiful Web Design',author: 'Jason Beaird',       year: 2010 },
];

function coverUrl(isbn) {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
}

function bookCardHTML({ isbn, title, author, year, coverId }) {
  const imgSrc = isbn ? coverUrl(isbn) : (coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : '');
  return `
    <article class="book-card">
      <div class="book-cover-wrap">
        ${imgSrc
          ? `<img class="book-cover" src="${imgSrc}" alt="Cover of ${title}"
               loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
             >
             <div class="book-cover-fallback" style="display:none" role="img" aria-label="No cover available for ${title}">${title}</div>`
          : `<div class="book-cover-fallback" role="img" aria-label="No cover available for ${title}">${title}</div>`
        }
      </div>
      <div class="book-info">
        <p class="book-title">${title}</p>
        <p class="book-author">${author || 'Unknown author'}</p>
        ${year ? `<p class="book-year">${year}</p>` : ''}
      </div>
    </article>`;
}

function renderBookList(books, container) {
  if (!books.length) {
    container.innerHTML = '<p class="empty-msg">No books found. Try a different search.</p>';
    return;
  }
  container.innerHTML = books.map(bookCardHTML).join('');
}

// Load curated favourites on page load
const curatedGrid = document.getElementById('curated-grid');
if (curatedGrid) {
  curatedGrid.innerHTML = CURATED_ISBNS.map(b => bookCardHTML(b)).join('');
}

// Search
const searchInput = document.getElementById('book-search');
const searchResults = document.getElementById('search-results');
let debounceTimer;

async function searchBooks(query) {
  searchResults.innerHTML = `<div class="loading-msg"><div class="spinner" aria-hidden="true"></div>Searching...</div>`;
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=title,author_name,cover_i,first_publish_year&limit=12`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const books = data.docs.map(d => ({
      title: d.title,
      author: d.author_name?.[0] || '',
      year: d.first_publish_year,
      coverId: d.cover_i,
    }));
    renderBookList(books, searchResults);
  } catch {
    searchResults.innerHTML = '<p class="error-msg">Could not load results. Check your connection and try again.</p>';
  }
}

if (searchInput && searchResults) {
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = searchInput.value.trim();
    if (!q) {
      searchResults.innerHTML = '';
      return;
    }
    debounceTimer = setTimeout(() => searchBooks(q), 400);
  });
}
```

- [ ] **Step 3: Write bookshelf.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Alex Chen's dev bookshelf — favourite web development books, powered by Open Library.">
  <title>Bookshelf — Alex Chen</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/bookshelf.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content" class="section container">
    <h1 class="section-title">Dev Bookshelf</h1>
    <p class="section-subtitle">Books shaping my thinking as I learn to code. Covers and data from <a href="https://openlibrary.org" style="color:var(--accent-purple)">Open Library</a>.</p>

    <!-- Search -->
    <div class="search-wrap">
      <span class="search-icon" aria-hidden="true">🔍</span>
      <input
        class="search-input"
        id="book-search"
        type="search"
        placeholder="Search for any book..."
        aria-label="Search books"
        autocomplete="off"
      >
    </div>

    <!-- Search results -->
    <div
      id="search-results"
      class="book-grid"
      aria-live="polite"
      aria-label="Search results"
      style="margin-bottom:3rem;"
    ></div>

    <!-- Curated favourites -->
    <h2 class="shelf-section-title">My Favourites</h2>
    <div id="curated-grid" class="book-grid"></div>
  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script src="js/bookshelf.js"></script>
</body>
</html>
```

- [ ] **Step 4: Verify in browser**

Open `bookshelf.html`. Confirm: 6 curated book covers load from Open Library (allow a moment for network). Type "html css" in the search box — after 400ms debounce, results appear. Type a nonsense string — "No books found" message appears. Disconnect network, search again — error message appears.

- [ ] **Step 5: Commit**

```bash
git add bookshelf.html css/bookshelf.css js/bookshelf.js
git commit -m "feat: build bookshelf page with Open Library API and debounced search"
```

---

## Task 9: Contact Page

**Files:**
- Write: `contact.html`
- Write: `css/contact.css`
- Write: `js/contact.js`

- [ ] **Step 1: Write css/contact.css**

```css
.contact-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 48rem;
}
@media (min-width: 48rem) {
  .contact-layout { grid-template-columns: 1fr 1fr; }
}

/* ===== FORM ===== */
.contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
.field-group { display: flex; flex-direction: column; gap: 0.375rem; }
.field-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}
.field-group input,
.field-group textarea {
  background: var(--bg-card);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.9375rem;
  transition: border-color var(--transition);
  width: 100%;
}
.field-group input:focus,
.field-group textarea:focus {
  outline: 2px solid var(--accent-purple);
  outline-offset: 2px;
  border-color: var(--accent-purple);
}
.field-group input[aria-invalid="true"],
.field-group textarea[aria-invalid="true"] {
  border-color: var(--accent-coral);
}
.field-group textarea { min-height: 140px; resize: vertical; }
.field-error {
  font-size: 0.8125rem;
  color: var(--accent-coral);
  min-height: 1.2em;
}
.field-error:empty { display: none; }

/* ===== SUCCESS STATE ===== */
.success-msg {
  display: none;
  background: rgba(108,99,255,0.1);
  border: 1px solid var(--accent-purple);
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
  color: var(--text-primary);
}
.success-msg.visible { display: block; }
.success-msg h2 { margin-bottom: 0.5rem; }
.success-msg p { color: var(--text-secondary); }

/* ===== SOCIAL LINKS ===== */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: border-color var(--transition), transform var(--transition);
}
.social-link:hover {
  border-color: var(--accent-purple);
  transform: translateX(4px);
}
.social-link .social-icon { font-size: 1.25rem; }
```

- [ ] **Step 2: Write js/contact.js**

```javascript
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('success-msg');

function getField(id) { return document.getElementById(id); }
function getError(id) { return document.getElementById(id + '-error'); }

function setError(id, msg) {
  const field = getField(id);
  const error = getError(id);
  error.textContent = msg;
  field.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function validate() {
  let valid = true;

  const name = getField('name').value.trim();
  if (!name) { setError('name', 'Please enter your name.'); valid = false; }
  else setError('name', '');

  const email = getField('email').value.trim();
  if (!email) { setError('email', 'Please enter your email.'); valid = false; }
  else if (!validateEmail(email)) { setError('email', 'Please enter a valid email address.'); valid = false; }
  else setError('email', '');

  const message = getField('message').value.trim();
  if (!message) { setError('message', 'Please enter a message.'); valid = false; }
  else if (message.length < 10) { setError('message', 'Message must be at least 10 characters.'); valid = false; }
  else setError('message', '');

  return valid;
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      successMsg.classList.add('visible');
      successMsg.focus();
    }, 800);
  });

  // Clear errors on input
  ['name', 'email', 'message'].forEach(id => {
    getField(id).addEventListener('input', () => setError(id, ''));
  });
}
```

- [ ] **Step 3: Write contact.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Get in touch with Alex Chen — web developer in training.">
  <title>Contact — Alex Chen</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/contact.css">
</head>
<body>
  <header id="site-header"></header>

  <main id="main-content" class="section container">
    <h1 class="section-title">Get In Touch</h1>
    <p class="section-subtitle">I'd love to connect — whether it's about web dev, collaboration, or just saying hi.</p>

    <div class="contact-layout">
      <!-- Form -->
      <div>
        <form id="contact-form" class="contact-form" novalidate>
          <div class="field-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" autocomplete="name" required aria-describedby="name-error">
            <span class="field-error" id="name-error" role="alert"></span>
          </div>
          <div class="field-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" autocomplete="email" required aria-describedby="email-error">
            <span class="field-error" id="email-error" role="alert"></span>
          </div>
          <div class="field-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" required aria-describedby="message-error"></textarea>
            <span class="field-error" id="message-error" role="alert"></span>
          </div>
          <button type="submit" class="btn btn-primary" style="align-self:flex-start;">Send Message</button>
        </form>

        <div id="success-msg" class="success-msg" tabindex="-1" aria-live="polite">
          <h2>Message sent!</h2>
          <p>Thanks for reaching out. I'll get back to you as soon as I can.</p>
        </div>
      </div>

      <!-- Social links -->
      <nav aria-label="Social links">
        <div class="social-links">
          <a class="social-link" href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in new tab)">
            <span class="social-icon" aria-hidden="true">🐙</span>
            <span>GitHub</span>
          </a>
          <a class="social-link" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)">
            <span class="social-icon" aria-hidden="true">💼</span>
            <span>LinkedIn</span>
          </a>
        </div>
      </nav>
    </div>
  </main>

  <div id="site-footer"></div>
  <script src="js/nav.js"></script>
  <script src="js/contact.js"></script>
</body>
</html>
```

- [ ] **Step 4: Verify in browser**

Open `contact.html`. Submit empty form — 3 inline error messages appear. Enter invalid email — specific error appears. Fill form correctly, submit — form fades, success message appears with focus. Tab through all fields — focus ring visible on each. Check that all labels are correctly associated.

- [ ] **Step 5: Commit**

```bash
git add contact.html css/contact.css js/contact.js
git commit -m "feat: build contact page with validated form and success state"
```

---

## Task 10: Accessibility Audit

**Files:** Various — fixes applied across all pages

- [ ] **Step 1: Install and run Lighthouse CLI**

```bash
npx serve . -l 8080 &
npx lighthouse http://localhost:8080 --output=html --output-path=./lighthouse-report.html --only-categories=accessibility --chrome-flags="--headless"
open lighthouse-report.html
```

Expected: Accessibility score ≥ 90. Target: 95+.

- [ ] **Step 2: Check keyboard navigation manually**

Open `index.html` in browser. Press Tab key from the top. Verify:
1. Skip link "Skip to main content" appears and focuses `#main-content` on Enter
2. Nav links receive visible focus rings in sequence
3. Hamburger button focuses correctly (resize to mobile)
4. CTA buttons in hero are focusable
5. Tab reaches footer links

Repeat for `bookshelf.html` — confirm search input and book cards are reachable.
Repeat for `contact.html` — confirm all form fields and submit button are reachable in order.

- [ ] **Step 3: Check colour contrast**

Open browser DevTools → Accessibility panel or use https://webaim.org/resources/contrastchecker/

Verify these pairs meet WCAG AA (4.5:1 for normal text, 3:1 for large/bold):
- `#888` on `#0f0f1a` — muted text on deep background (must be ≥ 4.5:1 for small text)
- `#e0e0ff` on `#0f0f1a` — primary text (must pass)
- `#6c63ff` on `#0f0f1a` — accent on dark (large text context, 3:1 needed)

If `#888` fails for small text: update `--text-muted` in `base.css` to `#999` and retest.

- [ ] **Step 4: Fix any Lighthouse failures**

Common issues and fixes:

| Issue | Fix |
|-------|-----|
| Missing `alt` on book covers | Already handled via `onerror` fallback in `bookshelf.js` |
| Form inputs missing labels | Already using `<label for="">` in `contact.html` |
| Low contrast text | Update `--text-muted` in `base.css` |
| Missing `lang` attribute | Already on every `<html lang="en">` |
| Duplicate IDs | Search all HTML files: `grep -r 'id="' *.html` and ensure no duplicates |

- [ ] **Step 5: Re-run Lighthouse after fixes**

```bash
npx lighthouse http://localhost:8080 --output=html --output-path=./lighthouse-report-v2.html --only-categories=accessibility --chrome-flags="--headless"
open lighthouse-report-v2.html
```

Expected: ≥ 95.

- [ ] **Step 6: Kill local server and commit**

```bash
kill %1
git add -A
git commit -m "fix: accessibility audit fixes — contrast, ARIA, focus management"
```

---

## Task 11: GitHub Repository & Pages Deployment

- [ ] **Step 1: Create public GitHub repository**

```bash
gh repo create web-portfolio --public --description "Alex Chen web portfolio — Web Fundamentals exemplar" --source=. --remote=origin --push
```

If `gh` is not installed: create the repo at github.com manually, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/web-portfolio.git
git push -u origin main
```

- [ ] **Step 2: Enable GitHub Pages**

```bash
gh api repos/:owner/web-portfolio/pages \
  --method POST \
  -f source[branch]=main \
  -f source[path]=/
```

Or via GitHub.com: Settings → Pages → Source → Deploy from branch → `main` / `/ (root)` → Save.

- [ ] **Step 3: Wait for deployment and verify**

```bash
gh api repos/:owner/web-portfolio/pages --jq '.html_url'
```

Expected output: `https://YOUR_USERNAME.github.io/web-portfolio/`

Open that URL in browser. Confirm: home page loads with nav, typing animation, skills strip. Navigate to each page and confirm they load correctly. Test on mobile viewport.

- [ ] **Step 4: Update README with live URL**

In `README.md`, replace the placeholder URL with the actual Pages URL:
```
**Live site:** https://YOUR_USERNAME.github.io/web-portfolio/
```

```bash
git add README.md
git commit -m "docs: add live GitHub Pages URL to README"
git push
```

- [ ] **Step 5: Final verification checklist**

Open the live GitHub Pages URL and verify each item:

- [ ] All 10 pages load without console errors
- [ ] Nav active link highlights correctly on each page
- [ ] Hamburger menu works on mobile viewport
- [ ] Typing animation runs on home page
- [ ] Filter tabs work on projects page
- [ ] All 5 checkpoint detail pages load with correct prev/next links
- [ ] Bookshelf page: curated covers load from Open Library
- [ ] Bookshelf page: search returns results after typing
- [ ] Contact form: shows errors on empty submit
- [ ] Contact form: shows success state on valid submit
- [ ] Skip link appears on Tab key press
- [ ] Lighthouse accessibility score ≥ 95 on live URL

```bash
npx lighthouse https://YOUR_USERNAME.github.io/web-portfolio/ --only-categories=accessibility --chrome-flags="--headless"
```

- [ ] **Step 6: Final commit and tag**

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## Self-Review

**Spec coverage check:**

| Requirement | Task |
|-------------|------|
| Min 4 pages | ✓ Task 4–9 (10 pages) |
| Responsive design | ✓ base.css + all page CSS (mobile-first, breakpoints at 48rem, 64rem) |
| Lighthouse ≥ 90 | ✓ Task 10 |
| Min 2 JS features | ✓ typing animation (Task 4), scroll reveal (Tasks 4–9), filter tabs (Task 6), form validation (Task 9) |
| API integration | ✓ Task 8 (Open Library) |
| GitHub Pages | ✓ Task 11 |
| Shared nav component | ✓ Task 3 |
| 5 checkpoint detail pages | ✓ Task 7 |
| aria-current on nav | ✓ Task 3 (nav.js) |
| prefers-reduced-motion | ✓ base.css + home.js |
| Skip link | ✓ base.css + nav.js |
| Hamburger on mobile | ✓ base.css + nav.js |
| Alex Chen persona narrative | ✓ about.html, all checkpoint pages |

**No placeholders found.** All code blocks are complete and self-contained.

**Type consistency:** `reveal` / `visible` classes consistent across all pages and base.css. `site-header` / `site-footer` IDs consistent across all HTML files. `contact-form` / `success-msg` IDs match between contact.html and contact.js.
