// 2024 Chemistry Exam, MCQ 27 — BONUS: a VCAA-flagged question with no single correct answer.
// VCAA's report gives only "As a result of psychometric analysis and review, all four options
// were accepted as correct" — no further reasoning. Question text transcribed from the original
// paper (rendered from page images — the 2024 exam PDF has no extractable text). The analysis of
// why each comparison is independently questionable is original, not VCAA's own — flagged
// clearly as such since VCAA gave no published explanation for this one.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 48, C: 17, D: 22 },
  answer: ['A', 'B', 'C', 'D'],
  flawed: (
    <>
      VCAA's report gives no reasoning for this one beyond: "As a result of psychometric
      analysis and review, all four options were accepted as correct." The analysis in the
      Worked Solution tab is this site's own attempt to identify what's questionable about each
      of the four comparisons — clearly marked as independent reasoning rather than VCAA's own
      words.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Each option makes the same kind of claim: "technique X shows feature Y more clearly than technique Z". For the whole question to fall apart, every one of the four comparisons has to be independently questionable — not just one.</>,
    reason: 'A "which technique shows X more clearly" question only has one clean right answer if exactly one comparison holds and the other three clearly fail — here, all four turn out to be arguable.',
  },
  {
    working: <>A: chirality is properly detected by <b>polarimetry</b> (measuring optical rotation) — neither of the two techniques actually named, IR spectroscopy or volumetric analysis (titration), directly reveals chirality at all. Comparing two techniques that both fail to show the feature makes "more clearly" close to meaningless.</>,
    reason: "Neither named method is the standard tool for this — the comparison itself doesn't really have a clear winner.",
  },
  {
    working: <>B: mass spectrometry is the standard technique for detecting chlorine — Cl exists as ³⁵Cl and ³⁷Cl in roughly a 3:1 ratio, producing a very recognisable doubled M/M+2 peak pattern. ¹³C NMR can only show chlorine's presence indirectly, via a shift in a nearby carbon's chemical shift. The claim that ¹³C NMR shows chlorine "more clearly" than mass spectrometry runs opposite to how these two techniques are actually used.</>,
    reason: "This comparison looks backwards — mass spec's isotope pattern is the textbook giveaway for a halogen, not a subtle NMR shift change.",
  },
  {
    working: <>C: HPLC separates compounds by polarity — it doesn't directly reveal the <i>number</i> of C=C double bonds in a molecule at all. An iodine (or bromine) test directly and visibly shows unsaturation via decolourisation as the halogen adds across each double bond. Claiming HPLC shows C=C bonds "more clearly" than a chemical addition test misapplies what HPLC is actually for.</>,
    reason: 'HPLC is the wrong category of technique entirely for this feature — it answers a different question (what compounds are present) than the one asked (how many double bonds).',
  },
  {
    working: <>D: a primary hydroxyl group can be inferred from ¹H NMR chemical shifts and splitting patterns, but O–H signals are often broad and variable due to hydrogen exchange, making the classification indirect. Acidified KMnO₄ gives a direct, visible colour change (purple → colourless) specifically when a primary or secondary alcohol is oxidised, and the reaction product (carboxylic acid vs. ketone) can further distinguish primary from secondary — arguably a more definitive test than reading subtle NMR shifts.</>,
    reason: "This comparison plausibly runs backwards too — a colour-change reaction test is often the clearer, more direct way to classify an alcohol's substitution pattern.",
  },
  {
    working: <b>Every comparison names a technique that isn't actually the standard or most direct tool for detecting that feature — none of the four claims survives close inspection, consistent with there being no single defensibly correct option.</b>,
    reason: 'Independent reconstruction of why this question likely fell apart — VCAA itself gave no published reasoning for this one.',
  },
]

export default function ChemistryQ27_2024() {
  return (
    <MCQShell
      flawed={
        <p>
          VCAA's report gives no explanation beyond "as a result of psychometric analysis and
          review, all four options were accepted as correct". All four options are marked below
          since VCAA accepted every one. The Worked Solution tab is this site's own attempt to
          work out what's wrong with each comparison, clearly separate from anything VCAA
          actually published.
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
