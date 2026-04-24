# Code Guide

A walkthrough of the key patterns in this codebase — written for students preparing for the viva, or anyone wanting to understand why the code is structured the way it is.

---

## The Three Layers

Every page is built from the same three layers:

| Layer | Files | Job |
|-------|-------|-----|
| Structure | `*.html` | What's on the page and what it means |
| Appearance | `css/*.css` | How it looks |
| Behaviour | `js/*.js` | What it does when you interact with it |

These layers are intentionally separate. Changing the purple accent colour touches only `css/base.css`. Changing the nav links touches only `js/nav.js`. That separation makes the site easier to reason about and easier to change.

---

## CSS Design Tokens (`css/base.css`, lines 1–15)

```css
:root {
  --accent-purple: #8b84ff;
  --bg-deep:       #0f0f1a;
  --nav-height:    64px;
}
```

`--` variables (custom properties) declared on `:root` are available on every element. Using `var(--accent-purple)` everywhere instead of the raw hex means you change the colour once and it updates site-wide. This is the same principle as constants in any programming language.

---

## Shared Nav and Footer (`js/nav.js`)

Every HTML page has an empty `<header id="site-header">` and `<footer id="site-footer">`. The nav script fills them in:

```js
(function () {
  const NAV_HTML = `<nav …>…</nav>`;
  document.getElementById('site-header').innerHTML = NAV_HTML;
})();
```

The `(function(){ … })()` is an **IIFE** (Immediately Invoked Function Expression). It runs once, immediately, and its variables don't leak into the global scope. The benefit: update the nav in one file and every page gets the change.

The script also sets `aria-current="page"` on the active link by comparing the current URL filename to each link's `href`.

---

## Mobile Navigation (CSS + JS working together)

The hamburger menu is a three-layer mechanism:

1. **CSS** hides the toggle button on wide screens and hides the link list on narrow screens using `visibility: hidden` (not `display: none`, so the transition still works)
2. **JS** adds/removes `.nav-open` on the `<nav>` when the button is clicked
3. **CSS** shows the link list when `.nav-open` is present

```js
const isOpen = nav.classList.toggle('nav-open');
toggle.setAttribute('aria-expanded', String(isOpen));
```

`aria-expanded` tells screen readers whether the menu is open or closed. Without it, a screen reader user clicking the button gets no feedback.

---

## Scroll Reveal (`js/home.js`)

Elements with class `reveal` start invisible (`opacity: 0; transform: translateY(20px)`) and animate in when they scroll into view:

```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

`IntersectionObserver` fires a callback when an element enters or leaves the viewport. It's more efficient than listening to the scroll event (which fires hundreds of times per scroll).

Users who prefer reduced motion get no animation — the CSS media query `prefers-reduced-motion: reduce` sets `opacity: 1; transform: none` immediately.

---

## Typing Animation and Accessibility (`js/home.js`)

The hero types out role titles character by character. The challenge: `aria-live` would read out every single character as it was added. The fix:

```html
<span aria-hidden="true"><span id="typed-text"></span></span>
<span class="sr-only" aria-live="polite" id="role-announcement"></span>
```

The visible animated text is hidden from assistive technology (`aria-hidden="true"`). The separate `#role-announcement` region — invisible on screen — announces only the completed word, giving screen reader users a clean, readable experience.

---

## Fetching Data from an API (`js/bookshelf.js`)

The bookshelf page fetches search results from Open Library:

```js
async function searchBooks(query) {
  const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // …render results
}
```

Key points:
- `async/await` makes asynchronous code read like synchronous code
- `res.ok` checks for HTTP errors (e.g. 404, 500) — `fetch` itself only rejects on network failure
- `encodeURIComponent` prevents user input from breaking the URL or causing injection

---

## Debouncing Search Input (`js/bookshelf.js`)

```js
searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => searchBooks(q), 400);
});
```

Without debouncing, every keystroke fires an API request. Debouncing waits 400 ms after the last keystroke before sending — so typing "javascript" fires one request, not eleven.

---

## Filter Tabs with ARIA (`js/projects.js`)

The Projects page has filter tabs (All / Week 1 / Week 2 …). Each button uses `aria-pressed`:

```js
btn.setAttribute('aria-pressed', String(btn === activeBtn));
```

`aria-pressed` is for toggle buttons with two states (on/off). It tells screen readers which filter is currently active — the visual styling alone (colour change) doesn't convey that to someone using assistive technology.

---

## Form Validation (`js/contact.js`)

The contact form validates inline without a page reload:

```js
field.setAttribute('aria-invalid', 'true');
field.setAttribute('aria-describedby', errorId);
```

`aria-invalid` marks the field as having an error. `aria-describedby` links it to the visible error message element — screen readers read both the field label and the error message when the user reaches that field. Without these, a screen reader user would fill in the form, submit it, and receive no useful feedback.

---

## Viva Questions to Prepare For

**HTML**
- Why use `<nav>`, `<main>`, `<article>`, `<footer>` instead of all `<div>` tags?
- What does `aria-current="page"` do and where is it set?

**CSS**
- What is a CSS custom property and why are they declared on `:root`?
- Why does the mobile nav use `visibility: hidden` rather than `display: none`?

**JavaScript**
- What is an IIFE and why does `nav.js` use one?
- What does `aria-expanded` communicate and when is it updated?
- What is debouncing and why is it needed on the search input?

**API**
- What does `async/await` do?
- Why check `res.ok` after `fetch`?
- What could go wrong if you skip `encodeURIComponent`?

**Accessibility**
- How does the typing animation avoid spamming screen readers with characters?
- What do `aria-invalid` and `aria-describedby` do together on the contact form?

---

## Prompts to Go Deeper

These are prompts you can use with any AI assistant to explore further:

- "Explain JavaScript closures using the IIFE pattern as an example."
- "What is the difference between `visibility: hidden` and `display: none` in CSS, and when does it matter?"
- "Walk me through what happens, step by step, when `fetch()` is called."
- "What is the CSS cascade and how does specificity work?"
- "Explain `IntersectionObserver` and how it differs from listening to the scroll event."
- "What is WCAG AA colour contrast and how is the 4.5:1 ratio calculated?"
