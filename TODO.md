# VCE Tools — to-do list

Running list of things to do on the site. Add items anywhere; tick them off (`- [x]`) or
delete them once they're live.

## Tablet and mobile UX

- [ ] **Optimise settings and navigation on tablet and phone.** Controls that sit in the page
      header on desktop disappear or move once a question is open on smaller screens, and each
      one has been patched separately. Work out one consistent home for them per screen size:
  - Concise / Detailed switch: on desktop it's in the page header; on tablet (640–1023px)
    it's now in the question's top bar (added 23 Oct 2026); on phone it's only inside the
    Questions sheet. Decide whether phones should have it on the page too.
  - Show / Hide answers: the same split, and it's still only in the Questions sheet on tablet.
  - Settings (part rail side, back bar, sidebar layout): reached through a gear on phones,
    but differently on tablet. Check what a tablet user can reach without opening the
    Questions sheet.
  - The fallback row for the tablet switch when the back bar is turned off in settings is
    untested.
  - Check tablet landscape (1024px+ switches to the desktop layout) and the change-over
    between the two layouts.

## Shipping

- [ ] Deploy (`npm run deploy`): the 2022–2026 NHT exams, sidebar headers, Inter font, Q5e
      warning and tablet switch were committed and pushed 23 Oct 2026 but not deployed.

## Content

- [ ] Look for other questions where the TI-Nspire can't solve the line as written (like
      2023 MM Exam 2 Q5e) and add a `WarningNote` to each.

## Videos

- [ ] Review the v3 AI walkthrough sample (`Website/ai-walkthroughs/v3`, outside this repo).
