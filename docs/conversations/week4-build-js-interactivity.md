# Week 4 — Build Chat: JavaScript Interactivity

**Type:** Build (focused — arrived with a clear brief from the thinking chat)
**Tool:** Claude.ai chat (or Claude Code)
**Purpose:** Produce the JavaScript for nav injection, scroll reveal, and page interactivity.

---

> **Placeholder:** A real submission would contain the full exported conversation transcript. This file describes what a strong build chat for this week would cover.

---

## What this conversation produced

- `js/nav.js` — IIFE that injects nav and footer HTML into every page, sets `aria-current`, handles hamburger toggle
- `js/home.js` — Typing animation with accessible `aria-live` region, scroll reveal using `IntersectionObserver`
- `js/projects.js` — Filter tabs with `aria-pressed` state management

## Sample opening prompt

> "I need JavaScript for a shared nav injected into every page. Requirements:
> - Wrap everything in an IIFE so nothing pollutes global scope
> - Define `NAV_HTML` and `FOOTER_HTML` as template literal strings
> - Inject into `id='site-header'` and `id='site-footer'`
> - After injection, set `aria-current='page'` on the nav link whose href matches the current page filename
> - Add a hamburger toggle: clicking the button adds/removes `.nav-open` on the `<nav>`, and updates `aria-expanded` on the button
> - Close the mobile menu when any nav link is clicked
> No inline event handlers. Guard against missing elements."

## Follow-up corrections made

- First output used `window.onload` instead of wrapping in an IIFE — asked to restructure to IIFE
- The typing animation announced every character to screen readers — identified the issue (live region on the animated text itself) and asked the AI to explain the two-element fix (animated text `aria-hidden`, separate live region for completed words)
- Initial scroll reveal used a scroll event listener — asked to refactor to `IntersectionObserver`

## Questions asked about the code

- "Why does `String(isOpen)` need to be called — why not just `toggle.setAttribute('aria-expanded', isOpen)`?"
- "What does `unobserve` do in IntersectionObserver and when should I call it?"
- "Why does the active nav detection use `.split('/').pop()` on the pathname?"
