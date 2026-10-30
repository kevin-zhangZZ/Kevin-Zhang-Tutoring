// 2024 Chemistry Exam, MCQ 27 — BONUS: a VCAA-flagged question with no single correct answer.
// VCAA's report gives only "As a result of psychometric analysis and review, all four options
// were accepted as correct" — no further reasoning. Question text transcribed from the original
// paper (rendered from page images — the 2024 exam PDF has no extractable text). The analysis of
// each comparison (B and C reversed, A comparing two techniques that both fail, D the most
// defensible) is original, not VCAA's own — flagged clearly as such since VCAA gave no published
// explanation. Revised Oct 2026: earlier rows wrongly argued D was reversed and cited
// polarimetry (not in the study design). Data Book references are to the 2026 Data Book.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: ['A', 'B', 'C', 'D'],
  flawed: (
    <>
      VCAA's report gives no explanation beyond: "As a result of psychometric analysis and
      review, all four options were accepted as correct." All four options are marked below
      since VCAA accepted every one. The worked solution weighs each comparison as this
      site's own independent analysis — it is not VCAA's reasoning.
    </>
  ),
  comment: (
    <>
      As a result of psychometric analysis and review, all four options were accepted as correct.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Each option claims that technique X shows a feature <b>more clearly</b> than technique Y. Test each claim by asking what each technique actually measures.</>,
    reason: <>This is the right way to attack any &ldquo;which technique shows…&rdquo; question: match each technique to the information it gives, then compare. Everything below is this site&rsquo;s own analysis — VCAA published no reasoning for this question.</>,
  },
  {
    working: <>A: <b>volumetric analysis</b> (a titration) measures an <b>amount or concentration</b>; an <b>IR spectrum</b> shows <b>bond types</b>. Neither shows chirality — the two enantiomers of a chiral compound react the same way in a titration and give identical IR spectra.</>,
    reason: <>When neither technique shows the feature, &ldquo;more clearly&rdquo; has no clear meaning, so A can&rsquo;t be called correct — but it isn&rsquo;t cleanly false either. That vagueness is one plausible reason the question failed.</>,
  },
  {
    working: <>B: a <b>mass spectrum</b> shows chlorine directly — the molecular ion and fragment masses include Cl, and chlorine&rsquo;s two common isotopes, ³⁵Cl and ³⁷Cl (hence its relative atomic mass of 35.5), give pairs of peaks 2 mass units apart. A <b>¹³C NMR</b> spectrum shows only carbon environments; Cl appears only indirectly, by shifting the signal of the carbon it is bonded to.</>,
    reason: <>So the claim runs the wrong way: mass spectrometry shows chlorine more clearly than ¹³C NMR. On a straight reading, B is false.</>,
  },
  {
    working: <>C: <b>HPLC</b> gives a chromatogram (not a &ldquo;spectrum&rdquo;) of <b>retention times</b> and <b>peak areas</b> — which compounds are present and how much. It says nothing about how many C=C bonds a molecule has. In an <b>iodine test</b>, I₂ adds across each C=C, so the amount of iodine that reacts with a known amount of compound measures the number of C=C bonds.</>,
    reason: <>The claim runs the wrong way again: the iodine test shows the number of C=C bonds, HPLC does not. On a straight reading, C is false (and &ldquo;HPLC spectrum&rdquo; is itself loose wording).</>,
  },
  {
    working: <>D: in a <b>¹H NMR</b> spectrum a primary alcohol shows an <Chem eq="R–CH2–OH" /> signal at 3.3–4.5 ppm with an integration of <b>2</b> H (a secondary alcohol&rsquo;s <Chem eq="R2–CH–OH" /> gives only <b>1</b> H), plus its splitting. <b>Acidified KMnO₄</b> turns from purple to colourless with <b>both primary and secondary</b> alcohols (and not tertiary), so it shows an oxidisable group such as a primary or secondary –OH, but can&rsquo;t say it is <b>primary</b>.</>,
    reason: <>Data Book: ¹H-NMR data, R–CH₂–OH, R₂–CH–OH 3.3–4.5 ppm and R–OH 1–6 ppm (&ldquo;varies considerably&rdquo;); colours of oxidising agents, MnO₄⁻ intense purple → Mn²⁺ colourless (dilute). On this reading D is the most defensible statement, and may well have been the intended key. But the O–H signal itself is variable, and the CH₂ region overlaps other environments (R–CH₂–X is 3.0–4.5 ppm), so a case can be made against it too.</>,
  },
  {
    working: <b>VCAA accepted all four options: A, B, C and D.</b>,
    reason: <>No single option survived VCAA&rsquo;s review, and its report gives no reason. The analysis above — D the most defensible, B and C reversed, A comparing two techniques that both fail — is this site&rsquo;s own, not VCAA&rsquo;s. What to take away: MS for halogens (isotope peaks), chemical tests for C=C (bromine/iodine) and oxidisable –OH (acidified KMnO₄), ¹H NMR integration and splitting to tell a –CH₂–OH from a –CH–OH, and HPLC only for identity and amount.</>,
  },
]

export default function ChemistryQ27_2024() {
  return (
    <MCQShell
      flawed={
        <p>
          VCAA's report gives no explanation beyond: "As a result of psychometric analysis and
          review, all four options were accepted as correct." All four options are marked below
          since VCAA accepted every one. The worked solution weighs each comparison as this
          site's own independent analysis — it is not VCAA's reasoning.
        </p>
      }
      question={<p>Which one of the following statements is correct?</p>}
      options={[
        { letter: 'A', content: 'The presence of chiral carbons in a compound is shown more clearly by performing a volumetric analysis than by its IR spectrum.', isAnswer: true },
        { letter: 'B', content: 'The presence of chlorine in a compound is shown more clearly in its ¹³C NMR spectrum than in its mass spectrum.', isAnswer: true },
        { letter: 'C', content: 'The number of carbon–carbon double bonds in a compound is shown more clearly in its HPLC spectrum than by using an iodine test on the compound.', isAnswer: true },
        { letter: 'D', content: 'The presence of a primary hydroxyl group in a compound is shown more clearly in its ¹H NMR spectrum than by adding acidified potassium permanganate to the compound.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
