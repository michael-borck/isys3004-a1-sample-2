# Known Issues

Documenting shortfalls is professional practice — it demonstrates that you tested against the requirements and understand what "done" looks like. These are the gaps in this exemplar and the reasons for them.

---

## 1. Conversation transcripts are placeholders

**Requirement:** Raw AI conversation transcripts showing thinking chats and build chats for each week.

**Actual:** `docs/conversations/` contains placeholder files describing what each conversation covered, not full exported transcripts.

**Why:** This site was built as a teaching demonstration using Claude Code (a CLI tool), not a standard chat interface. Full session logs from that environment aren't exportable in the same way as Claude.ai chat exports. The placeholder files model the structure and intent of each conversation.

**For a real submission:** Export and save full conversation transcripts. If using Claude.ai, use the share or export feature. If using Claude Code, copy the relevant session exchanges into the file.

---

## 2. Commit history is compressed

**Requirement:** Regular, meaningful commits across Weeks 2–6 showing incremental progress.

**Actual:** The repository has a clean commit history, but it was built in a concentrated session rather than spread across five weeks.

**Why:** Staff exemplars are built before the unit runs, not alongside it. The commit messages follow best practice (imperative mood, meaningful descriptions, logical groupings) and tell a coherent story, but the timestamps don't reflect week-by-week progress.

**For a real submission:** Commit at natural checkpoints — after each HTML page, after the CSS design tokens, after each JavaScript feature. Aim for 20+ commits. The history should read like a build diary.

---

## 3. Contact form does not send email

**Requirement:** A working contact page.

**Actual:** The form validates input client-side and shows a success state, but no message is sent.

**Why:** Sending email requires a server or a third-party service (e.g. Formspree, Netlify Forms). A vanilla HTML/CSS/JS site hosted on GitHub Pages has no server-side processing. The form demonstrates client-side validation, ARIA error messaging, and state management — all within the brief.

**Note:** This is a known limitation of static sites. A real contact form would integrate with a form backend service.

---

## 4. No real profile photo

**Requirement:** No explicit requirement for a photo, but a portfolio typically has one.

**Actual:** The about page uses a CSS-generated avatar placeholder rather than a photograph.

**Why:** Alex Chen is a fictional persona — there is no actual person to photograph. The avatar demonstrates how to structure an image area and apply CSS styling to it.

**For a real submission:** Use an actual photograph with a descriptive `alt` attribute. The `<img>` element and its accessibility attributes (`alt`, appropriate `role`) are the teaching point here.
