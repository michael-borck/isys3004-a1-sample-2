# Week 5 — Build Chat: API Integration

**Type:** Build (focused — arrived with a clear brief from the thinking chat)
**Tool:** Claude.ai chat (or Claude Code)
**Purpose:** Produce `js/bookshelf.js` and the bookshelf page with live Open Library search.

---

> **Placeholder:** A real submission would contain the full exported conversation transcript. This file describes what a strong build chat for this week would cover.

---

## What this conversation produced

- `js/bookshelf.js` — curated ISBN list, `bookCardHTML()` template function, `renderBookList()`, `searchBooks()` async function, debounced input handler
- `bookshelf.html` — curated favourites grid and live search section with accessible loading/error states
- Cover image fallback: `onerror` hides the broken image and shows a text placeholder

## Sample opening prompt

> "I need JavaScript for a bookshelf page using the Open Library API. Requirements:
> - A hardcoded array of 6 books (ISBN, title, author, year) rendered as cards on page load
> - Cover images from `https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg` with a text fallback if the image 404s
> - A search input that queries `https://openlibrary.org/search.json?q={query}&fields=title,author_name,cover_i,first_publish_year&limit=12`
> - Debounce the input: wait 400 ms after the last keystroke before fetching
> - Three UI states: loading spinner, results, error message
> - Escape all title and author text before inserting into innerHTML (prevent XSS)
> - Use `async/await` and check `res.ok`
> No jQuery. No frameworks."

## Follow-up corrections made

- First output inserted `${title}` directly into an HTML string — flagged the XSS risk and asked the AI to escape `&`, `<`, `>`, and `"` before insertion
- Initial debounce was 200 ms — asked to increase to 400 ms to reduce unnecessary requests
- The error message was generic ("Error") — asked for a user-friendly message with guidance ("Could not load results. Check your connection and try again.")

## Questions asked about the code

- "Why does `onerror` need to reference `this.nextElementSibling` — what does `nextElementSibling` do?"
- "What does `encodeURIComponent` actually change in a string? Can you show a before/after example?"
- "Why is the debounce timer stored in a variable outside the event listener?"
