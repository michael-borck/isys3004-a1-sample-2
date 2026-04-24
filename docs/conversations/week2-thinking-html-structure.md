# Week 2 — Thinking Chat: HTML Structure

**Type:** Thinking (exploratory — no final code produced)
**Tool:** Claude.ai chat (or Claude Code)
**Purpose:** Work out the page structure, file plan, and semantic element choices before writing any HTML.

---

> **Placeholder:** A real submission would contain the full exported conversation transcript. This file describes what a strong thinking chat for this week would cover.

---

## What this conversation explored

- How many pages the site needs and what each one is responsible for
- Which semantic HTML elements to use: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` — and why each one, not just `<div>`
- How to structure the `<head>` element: `charset`, `viewport`, `description`, `title`
- What goes in the HTML vs what belongs in CSS (separation of concerns)
- How links between pages work with relative paths (`about.html`, not an absolute URL)
- What `<ul>` and `<li>` are for in a navigation menu vs a content list

## Sample opening prompt

> "I'm building a personal portfolio site with five pages: home, about, projects, bookshelf, and contact. Before I write any code, help me think through the HTML structure. What semantic elements should I use for the main regions? What should go in the `<head>` of each page? I want to understand the reasoning, not just the answer."

## What came out of this chat (carried into the build chat)

- A clear list of semantic elements and what each one communicates to browsers and assistive technology
- A decision on the file naming convention (`kebab-case.html`)
- Understanding that the `<nav>` element is for site navigation, not any list of links
- A note to add `lang="en"` to the `<html>` element for screen readers
- The decision to keep a shared nav structure rather than copy-pasting it into every page
