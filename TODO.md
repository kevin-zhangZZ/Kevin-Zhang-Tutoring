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

- [x] Deployed 23 Oct 2026 (index-D_Wn_Ei6.js): the 2022–2026 NHT exams, sidebar headers,
      Inter font, Q5e warning and tablet switch.

## Content

- [ ] Look for other questions where the TI-Nspire can't solve the line as written (like
      2023 MM Exam 2 Q5e) and add a `WarningNote` to each.
- [ ] **Chemistry 2020–2023: borderline study-design calls (Oct 2026 buildout).** Each is
      written up (most with a "Study Design Note" box) and kept in. Decide keep / skip for each;
      a skip means a "Not in the Current Study Design" box (or `omitted.ts` for a whole MCQ)
      plus a skip-guide row in `exam-skip-guide/audit.ts`. The agents' full reasoning for every
      item is in `scratch/chem-oct30-borderline.txt`.
  - 2020: MCQ 2 and 2022 MCQ 5 ("reliability", old SD term); MCQ 20 (HPLC operating
    parameters); MCQ 22 (ethyne named, no alkyne chemistry needed); MCQ 23, 24 and 2021 MCQ 23,
    2022 SAQ8 (acid–base titration, now Unit 2); MCQ 25 (hygroscopic, petrodiesel vs biodiesel);
    SAQ3e–f (secondary alcohol → ketone); SAQ5b.ii–iii (naming glucose/fructose, cellulose
    digestion); SAQ6b (ideal gas equation, Unit 2); SAQ7b.ii (flash point); SAQ8 (an ether,
    2-methoxypropene); SAQ10b (the "principle" marks for IR/NMR).
  - 2021: MCQ 3 (lactose intolerance, glycaemic index in option D); MCQ 8 (oxidative
    rancidity in option A); MCQ 15 (flash point); SAQ3d.ii (oleic vs linoleic melting point)
    and SAQ3e (amylose vs cellulose); SAQ7c.iii (mass spectrometry "ions must form");
    SAQ9a (aspartame — currently skipped, confirm); SAQ10a (glycaemic index, kept as rate of
    hydrolysis) and SAQ10b (CO–haemoglobin equilibria).
  - 2022: MCQ 17 (aspartame in the stem); MCQ 24 (HPLC with amino acid side groups);
    SAQ4a.ii (first mark is "essential amino acids"); SAQ5a (¹³C table also lists amides —
    report accepts only acid or ester); SAQ6b (bomb calorimeter), SAQ6d (GI — currently
    skipped, confirm) and SAQ6f (fatty-acid unsaturation → melting point); SAQ9a (flash point)
    and SAQ9b (Maxwell–Boltzmann).
  - 2023: MCQ 3 (fat saturation → melting point); MCQ 13 (cis/trans isomers); MCQ 19
    (omega-6); SAQ1b (oxidative rancidity — currently skipped, confirm); SAQ2a (glycosidic
    link); SAQ3b.ii (flash point); SAQ5c (Maxwell–Boltzmann); SAQ7d (why one molecule absorbs
    several IR frequencies).
  - 2024: SAQ4 (Kp in partial pressures — the report calls it novel).
  - Bond enthalpies: 2024 SAQ3c.iii is now skipped (30 Oct 2026). The skip guide's "not found"
    note still says bond-enthalpy calculations are new in the current study design — reword it
    to match. 2022 MCQ 29 (C–halogen bond strength) only reasons about bond strength, so it is
    kept.
- [ ] **Review the slips found in VCAA's examiner reports (Oct 2026 review).** Every page keeps
      the report text verbatim and explains the slip in its working, but some may deserve a
      clearer warning box. Lists: `scratch/chem-oct30-vcaa-concerns.txt` (119, Chemistry) and
      `scratch/ms-oct30-vcaa-concerns.txt` (104, Methods/Specialist). Worst ones: 2025 Chem Q1e
      (40.5 for 50.5 kJ g⁻¹), 2025 Chem Q3c (1.25³ for 1.25²), 2024 Chem Q3a (3.7 for 37), 2024
      MM Exam 2 Q4b.iii (0.468 is Pr(X>23)/0.5), 2022 MM Exam 1 Q3 (k = 5 for −5), 2023 SM MCQ 13
      (sign error in the report's equation).

## Videos

- [ ] Review the v3 AI walkthrough sample (`Website/ai-walkthroughs/v3`, outside this repo).
