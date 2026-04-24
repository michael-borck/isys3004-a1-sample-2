# Week 5 — Thinking Chat: API Choice

**Type:** Thinking (exploratory — no final code produced)
**Tool:** Claude.ai chat (or Claude Code)
**Purpose:** Choose an API and understand how data fetching works before writing any code.

---

> **Placeholder:** A real submission would contain the full exported conversation transcript. This file describes what a strong thinking chat for this week would cover.

---

## What this conversation explored

- What an API is: a URL you send a request to, that sends back structured data (usually JSON)
- What makes an API suitable for a static site: no authentication key required, CORS-enabled, reliable
- Why Open Library was chosen: free, no API key, returns cover images by ISBN, useful for a dev-themed portfolio
- What `async/await` does and how it relates to `fetch`
- What `response.ok` checks and why `fetch` doesn't throw on 404 or 500 errors
- What can go wrong: network failure, API down, rate limiting, malformed JSON
- What a loading state, error state, and success state look like in the UI
- Why `encodeURIComponent` is needed when putting user input in a URL

## Sample opening prompt

> "I want to add a live API feature to my portfolio — a bookshelf page that searches the Open Library API. Before I write any code, help me understand: (1) what `async/await` is doing mechanically, (2) why I need to check `response.ok` when `fetch` doesn't throw on HTTP errors, (3) what error scenarios I need to handle, and (4) what a good loading/error/success UI pattern looks like."

## What came out of this chat (carried into the build chat)

- Understanding that `fetch` rejects its promise only on network failure, not on 4xx/5xx responses — `res.ok` must be checked explicitly
- A three-state UI pattern: loading spinner → results or error message
- A decision to debounce the search input (wait 400 ms after the last keystroke before fetching)
- Understanding that cover images are available at `https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg`
- A plan for a curated "favourites" list hardcoded by ISBN, plus a live search below it
- A note to always escape user-generated or API-returned content before inserting it into innerHTML
