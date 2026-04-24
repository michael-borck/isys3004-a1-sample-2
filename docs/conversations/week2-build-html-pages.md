# Week 2 — Build Chat: HTML Pages

**Type:** Build (focused — arrived with a clear brief from the thinking chat)
**Tool:** Claude.ai chat (or Claude Code)
**Purpose:** Produce the HTML skeleton for all five pages.

---

> **Placeholder:** A real submission would contain the full exported conversation transcript. This file describes what a strong build chat for this week would cover.

---

## What this conversation produced

- HTML skeletons for `index.html`, `about.html`, `projects.html`, `bookshelf.html`, `contact.html`
- A consistent `<head>` block across all pages
- Semantic structure for each page with appropriate landmark elements
- Empty `<header id="site-header">` and `<footer id="site-footer">` to be filled by JavaScript later
- A basic `<nav>` inside the header as a starting point

## Sample opening prompt

> "I'm building a five-page portfolio site in vanilla HTML. I need the HTML skeleton for all five pages. Requirements:
> - Each page needs: `lang='en'`, viewport meta, descriptive `<title>`, link to `css/base.css`
> - Use semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`
> - The header should have `id='site-header'` and the footer `id='site-footer'` (JavaScript will inject content there later)
> - No inline styles. No `<div>` where a semantic element fits.
> - Each page's `<main>` should have `id='main-content'` for skip-link accessibility.
> Start with `index.html`."

## Follow-up corrections made

- The first output included `type="text/css"` on the `<link>` element — asked the AI to remove it (unnecessary in HTML5)
- Initial `<title>` was just "Portfolio" — asked for descriptive titles per page ("About — Alex Chen")
- Needed to add `<link rel="icon">` — asked the AI to explain what a favicon is and where to reference it

## Questions asked about the code

- "Why does `<main>` only appear once per page when `<div>` can appear anywhere?"
- "What's the difference between `id` and `class` in HTML?"
- "Why does the `<html>` tag need a `lang` attribute?"
