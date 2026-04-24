# Reflection

> **Note for students:** This is a placeholder showing the structure and quality a strong reflection should have — not fabricated content. A real reflection is 500–750 words written from your actual experience. It should be specific, not generic.

---

## What I carried from thinking chats into build chats

In the thinking chat for CSS (Week 3), I decided to use CSS custom properties for the colour palette before writing a single line of CSS. That decision shaped the entire build chat: instead of arriving and asking "how do I style this?", I arrived with a specific brief — here are the five colour variables I need, here is the dark background, here is the purple accent. The AI had clear constraints to work within, and the first output was already structured around those variables rather than using raw hex values everywhere.

Similarly, the thinking chat about JavaScript (Week 4) helped me understand the difference between `visibility: hidden` and `display: none` before I touched the nav code. When the mobile menu came out wrong the first time (the transition wasn't working), I already knew why — I had learned in the thinking session that transitions don't fire on `display` changes. I could ask a precise follow-up question rather than "why is my animation broken?"

---

## What surprised me

The accessibility work on the typing animation was genuinely surprising. My first instinct was to put `aria-live="polite"` on the typed text element so screen readers would announce the text. I ran the Lighthouse audit and it passed — but when I looked more carefully, I realised `aria-live` was announcing every single character as it appeared. A screen reader user would hear "W… e… b… D… e… v… e… l… o… p… e… r" one letter at a time.

The fix required two elements: the visible animated text marked `aria-hidden="true"` (so screen readers ignore it entirely), and a separate invisible element with `aria-live="polite"` that only updates when a full word is complete. The visual output and the accessible output are completely separate layers. That separation of concerns — the same principle as HTML/CSS/JS — applied at an even more granular level.

---

## Honest assessment

I understand the nav injection pattern end-to-end: why the IIFE is needed, how `innerHTML` populates the empty `<header>` and `<footer>` elements, how `aria-current` gets set by comparing the URL to the link's `href`. If someone asked me to rebuild it from scratch I could.

The Open Library API integration I understand at the usage level — I can explain what `async/await` does and why `res.ok` needs to be checked. What I'm less confident about is the underlying event loop: I know that `await` pauses execution until the promise resolves, but I could not clearly explain what "pauses execution" means without using a browser thread model I'm not sure I've fully grasped.

That gap is on my list. A specific prompt I've saved: "Walk me through what the JavaScript event loop actually does when an `await` is encountered, without using the words 'asynchronous' or 'non-blocking'."

---

*A strong reflection names specific features, honest gaps, and the actual decisions that carried from thinking to building. A weak reflection says "I learned HTML, CSS, and JavaScript." The difference is specificity.*
