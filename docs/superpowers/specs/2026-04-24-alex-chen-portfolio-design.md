# Design Spec: Alex Chen Web Portfolio (Staff Exemplar)

**Date:** 2026-04-24  
**Purpose:** Staff model answer for Assessment 1: Web Fundamentals Portfolio  
**Course:** Web Fundamentals (Curtin University)

---

## 1. Overview

A professional, fully-functional portfolio website for a fictional student persona ("Alex Chen") that serves as the staff exemplar answer for Assessment 1. Demonstrates every checkpoint requirement in a single cohesive site, hosted on GitHub Pages.

### Persona

**Alex Chen** — mid-20s career changer. Former marketing coordinator, pivoting into web development. Studies part-time. Voice is honest, reflective, slightly self-deprecating: acknowledges mistakes, celebrates small wins. The portfolio reads like a genuine learning journey, not a polished tech-bro showcase.

---

## 2. Technical Constraints

- **Vanilla only**: HTML5, CSS3, JavaScript (ES6+) — no frameworks, no bundlers, no preprocessors
- **No templates**: All code written from scratch
- **Version control**: Meaningful incremental commits throughout build
- **Hosting**: GitHub Pages (public repository: `michaelborck/web-portfolio` or similar)
- **Deployment**: GitHub Pages from `main` branch, root directory
- **No build step**: Files served as-is

---

## 3. Visual Design

### Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#0f0f1a` | Page background |
| `--bg-card` | `#1a1a2e` | Card/section backgrounds |
| `--bg-border` | `#2a2a4a` | Borders, dividers |
| `--text-primary` | `#e0e0ff` | Headings, primary text |
| `--text-secondary` | `#a0a0d0` | Body text |
| `--text-muted` | `#666` | Captions, metadata |
| `--accent-purple` | `#6c63ff` | Primary accent, Week 1 |
| `--accent-coral` | `#ff6584` | Secondary accent, Week 5 |
| `--gradient` | `linear-gradient(135deg, #6c63ff, #ff6584)` | Name, CTAs, timeline |

Checkpoint cards use a colour progression purple → coral across weeks 1–5:
- Week 1: `#6c63ff`
- Week 2: `#9c8fff`
- Week 3: `#c063b0`
- Week 4: `#e0656a`
- Week 5: `#ff6584`

### Typography

- Font stack: `system-ui, -apple-system, 'Segoe UI', sans-serif`
- Base size: `16px`
- Scale: 12, 13, 14, 16, 18, 24, 36px
- Headings: `font-weight: 800`

### Motion

- Scroll reveal: `IntersectionObserver` with `opacity 0→1` + `translateY 20px→0`, `transition: 0.5s ease`
- Typing animation: character-by-character interval loop cycling through 3 role strings
- All animations respect `prefers-reduced-motion`

---

## 4. File Structure

```
web-portfolio/
├── index.html
├── about.html
├── projects.html
├── checkpoint-1.html      ← Week 1 detail page
├── checkpoint-2.html      ← Week 2 detail page
├── checkpoint-3.html      ← Week 3 detail page
├── checkpoint-4.html      ← Week 4 detail page
├── checkpoint-5.html      ← Week 5 detail page
├── bookshelf.html
├── contact.html
├── css/
│   ├── base.css           ← CSS custom properties, reset, nav, footer, utilities
│   ├── home.css
│   ├── about.css
│   ├── projects.css
│   ├── checkpoint.css     ← shared styles for all 5 detail pages
│   ├── bookshelf.css
│   └── contact.css
├── js/
│   ├── nav.js             ← injects nav + footer HTML, sets active link
│   ├── home.js            ← typing animation, scroll reveal
│   ├── projects.js        ← filter tabs, scroll reveal
│   ├── bookshelf.js       ← Open Library API, search, render cards
│   └── contact.js         ← form validation, success/error state
├── docs/
│   └── superpowers/specs/
│       └── 2026-04-24-alex-chen-portfolio-design.md
├── .gitignore
└── README.md
```

---

## 5. Pages

### 5.1 Home (`index.html`)

**Sections:**
1. **Nav** — logo `AC.` left, links right, hamburger on mobile (toggled by `nav.js`)
2. **Hero** — availability badge, gradient name heading, typing animation (cycles: "Web Developer", "HTML & CSS Learner", "Career Changer"), brief tagline, two CTA buttons ("View My Work" → projects, "About Me" → about)
3. **Skills strip** — HTML5, CSS3, JavaScript, APIs, a11y — five small labelled badges
4. **Featured section** — 3 cards: latest checkpoint, bookshelf teaser, contact CTA
5. **Footer** — name, nav links, GitHub link, "Built with vanilla HTML/CSS/JS"

**JS features used:** typing animation, scroll reveal on featured cards

### 5.2 About (`about.html`)

**Sections:**
1. Profile block — initials avatar (CSS-only), name, role
2. Story — 3 paragraphs as Alex: marketing background, why tech, what web dev means
3. Skills grid — visual progress bars (CSS width, no JS) for HTML, CSS, JS, APIs, Git
4. Timeline — 3 milestones: "Started unit", "First deployed site", "Passed accessibility audit"
5. Acknowledgements — lists AI tools used (Claude, ChatGPT), tutorials referenced (MDN, CSS-Tricks)

### 5.3 Projects (`projects.html`)

**Sections:**
1. Header — "My Learning Journey", subtitle
2. Filter tabs — All / Week 1 / Week 2 / Week 3 / Week 4 / Week 5 (JS-driven)
3. Timeline — vertical line, 5 checkpoint cards (purple→coral gradient)
4. Each card — week label, checkpoint badge, title, 2–3 sentence narrative, skill tags, "View Details →" link to checkpoint detail page

**JS:** filter tabs toggle `data-week` visibility; scroll reveal on cards

### 5.4 Checkpoint Detail Pages (`checkpoint-1.html` through `checkpoint-5.html`)

Shared layout via `checkpoint.css`. Each page contains:

1. **Breadcrumb** — Home > Projects > Week N
2. **Header** — week number (large), checkpoint title, badge
3. **What I built** — description of the work done
4. **What I learned** — 3–4 bullet reflections, written in Alex's voice
5. **Code highlight** — a `<pre><code>` block showing a representative snippet
6. **Challenge & fix** — one specific problem encountered and how it was solved
7. **Skills gained** — tag list
8. **Navigation** — ← Previous checkpoint / Next checkpoint →

| Page | Title | Key content |
|------|-------|-------------|
| checkpoint-1 | Laying the Foundation | Semantic HTML, nav structure, heading hierarchy |
| checkpoint-2 | Style & Responsiveness | CSS custom properties, flexbox, mobile-first media queries |
| checkpoint-3 | Making Things Move | DOM manipulation, event listeners, IntersectionObserver |
| checkpoint-4 | Connecting to the World | Fetch API, async/await, Open Library integration |
| checkpoint-5 | Building for Everyone | Lighthouse audit results, ARIA fixes, contrast improvements, before/after score |

### 5.5 Bookshelf (`bookshelf.html`)

**Sections:**
1. Header — "Dev Bookshelf", subtitle ("Books shaping my thinking as I learn to code")
2. **Curated favourites** — 6 hardcoded books (ISBN list below), covers fetched from Open Library Covers API on page load, rendered as cards
3. **Search** — input field, debounced search via Open Library Search API, results rendered below
4. Loading/error states — spinner while fetching, graceful "no results" message

**Curated ISBNs:**
- 9780596517748 — JavaScript: The Good Parts
- 9781491950296 — You Don't Know JS (Up & Going)
- 9780321965516 — HTML & CSS (Duckett)
- 9781430216070 — The Principles of Beautiful Web Design
- 9780137081073 — Clean Code
- 9781449331818 — Learning Web Design (Robbins)

**Open Library endpoints:**
- Covers: `https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg`
- Search: `https://openlibrary.org/search.json?q={query}&fields=title,author_name,cover_i,first_publish_year&limit=12`

**JS:** `bookshelf.js` — `fetchFavourites()` on load, `searchBooks(query)` debounced 400ms on input

### 5.6 Contact (`contact.html`)

**Sections:**
1. Header — "Get In Touch"
2. Form — Name (required), Email (required, validated), Message (required, min 10 chars), Submit button
3. Validation — inline error messages, `aria-describedby` on each field pointing to error span
4. Success state — replaces form with thank-you message after submit (no actual backend — `preventDefault()`, simulate with timeout)
5. Social links — GitHub icon link, LinkedIn icon link (both `aria-label`-ed)

---

## 6. Shared Components

### Navigation (`nav.js`)

Injected into every page via:
```html
<header id="site-header"></header>
...
<footer id="site-footer"></footer>
<script src="js/nav.js"></script>
```

`nav.js` sets `innerHTML` on `#site-header` and `#site-footer`, then sets `aria-current="page"` on the matching link by comparing `location.pathname`.

Hamburger toggles `.nav-open` class on `<nav>` — CSS handles the mobile menu appearance.

### CSS Custom Properties (`base.css`)

All design tokens defined on `:root`. All pages import `base.css` first, then their own stylesheet. No `@import` chains — two `<link>` tags per page.

---

## 7. Accessibility Requirements

- Lighthouse accessibility score ≥ 95 (target, not floor)
- All images have descriptive `alt` text; decorative images use `alt=""`
- All form inputs have associated `<label>` elements
- ARIA: `aria-label` on icon-only links, `aria-current="page"` on active nav link, `aria-live="polite"` on search results region, `aria-describedby` on form fields with errors
- Colour contrast: all text meets WCAG AA (4.5:1 for body, 3:1 for large text) — verified against the dark palette
- Keyboard navigation: full tab order, visible focus rings (`:focus-visible` CSS)
- Skip link: "Skip to main content" anchor at top of every page, visible on focus
- Semantic structure: one `<h1>` per page, logical heading hierarchy, `<main>`, `<nav>`, `<footer>`, `<article>` on checkpoint cards

---

## 8. Responsiveness

- Mobile-first: base styles target 320px+
- Breakpoints: `48rem` (tablet), `64rem` (desktop)
- Nav collapses to hamburger below `48rem`
- Timeline cards stack single-column on mobile, remain single-column on all sizes (timeline is inherently vertical)
- Bookshelf grid: 1 col mobile → 2 col tablet → 3 col desktop
- Featured cards: 1 col mobile → 3 col desktop

---

## 9. GitHub & Deployment

- Repo name: `web-portfolio` (public)
- GitHub Pages: Settings → Pages → Source: `main` branch, root `/`
- `.gitignore`: includes `.superpowers/`, `.DS_Store`, `*.log`
- `README.md`: describes the project, notes AI assistance, links to live site
- Commit cadence: one meaningful commit per page/feature built — mirrors what a student should do

---

## 10. Out of Scope

- No backend, no form submission endpoint
- No dark/light mode toggle (dark only)
- No animations beyond scroll reveal and typing effect
- No images directory (covers from API, avatar is CSS initials)
- No JavaScript minification or bundling
