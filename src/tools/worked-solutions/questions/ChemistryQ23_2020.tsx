// 2020 Chemistry Exam, MCQ 23. VCAA examination report: 30% correct. Finding the concentration
// of citric acid, a triprotic acid, from an acid–base titration against standardised NaOH (3 : 1
// mole ratio). Question text transcribed from the original paper. VCAA report only. The report's
// "n(NaOH) = 0.0250 mol x 24.0x10⁻³" (mol for mol L⁻¹, no unit on the volume) is kept verbatim
// and explained in the working. Acid–base titration is Unit 2 in the current study design (Unit 4
// examines redox titrations by the same method). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 20, C: 32, D: 17 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      Since there are three carboxyl groups on each citric acid molecule, there will be 3 mol NaOH
      required for each 1 mol citric acid.
      <br />
      Equation for titration.
      <br />
      <Chem eq="C3H5O(COOH)3(aq) + 3NaOH(aq) -> C3H5O(COO)3Na3(aq) + 3H2O(l)" />
      <br />
      <i>n</i>(NaOH) = 0.0250 mol x 24.0x10⁻³
      <br />
      = 6.00x10⁻⁴ mol
      <br />
      <i>n</i>(citric acid) = <i>n</i>(NaOH) / 3
      <br />
      = 6.00x10⁻⁴ / 3
      <br />
      = 2.00x10⁻⁴ mol
      <br />
      <i>c</i>(citric acid) = 2.00x10⁻⁴ mol / 25.0x10⁻³ L
      <br />
      = 8.0x10⁻³ M (mol L⁻¹)
      <br />
      Alternative B is consistent with confusing aliquot and titre sizes.
      <br />
      Alternative C is consistent with not dividing by 3 and confusing aliquot and titre sizes.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="C3H5O(COOH)3(aq) + 3NaOH(aq) -> C3H5O(COONa)3(aq) + 3H2O(l)" />,
    reason: <>Citric acid has <b>three</b> –COOH groups, so it is <b>triprotic</b>: each molecule donates three H⁺ ions, and each H⁺ is neutralised by one OH⁻. Phenolphthalein changes colour only after all three have reacted, so the titre measures complete neutralisation. (The report writes the salt as <Chem eq="C3H5O(COO)3Na3" />; same compound.)</>,
  },
  {
    working: (
      <>
        <i>n</i>(NaOH) = <i>c</i> × <i>V</i>
        <br />
        <i>n</i>(NaOH) = 0.0250 mol L⁻¹ × 0.0240 L
        <br />
        <i>n</i>(NaOH) = 6.00 × 10⁻⁴ mol
      </>
    ),
    reason: <>The NaOH is in the burette, so its volume is the <b>titre</b>, 24.0 mL = 0.0240 L. Convert mL to L before multiplying by a concentration in mol L⁻¹ (M). The report&rsquo;s line writes the concentration&rsquo;s unit as &ldquo;mol&rdquo;; it means 0.0250 mol L⁻¹ × 24.0 × 10⁻³ L.</>,
  },
  {
    working: <><i>n</i>(citric acid) : <i>n</i>(NaOH) = 1 : 3</>,
    reason: <>The mole ratio from the coefficients in the balanced equation.</>,
  },
  {
    working: (
      <>
        <i>n</i>(citric acid) = <i>n</i>(NaOH) ÷ 3
        <br />
        <i>n</i>(citric acid) = 6.00 × 10⁻⁴ mol ÷ 3
        <br />
        <i>n</i>(citric acid) = 2.00 × 10⁻⁴ mol
      </>
    ),
    reason: <>Three times as much NaOH as citric acid is needed, so the amount of citric acid is one third of the NaOH.</>,
  },
  {
    working: (
      <>
        <i>c</i>(citric acid) = <i>n</i> ÷ <i>V</i>
        <br />
        <i>c</i>(citric acid) = 2.00 × 10⁻⁴ mol ÷ 0.0250 L
        <br />
        <i>c</i>(citric acid) = 8.00 × 10⁻³ M
      </>
    ),
    reason: <>The citric acid is the <b>aliquot</b> (pipetted into the conical flask), so divide by the aliquot volume, 25.0 mL = 0.0250 L — not the titre. Sanity check: the titre (24.0 mL) is a little less than the aliquot (25.0 mL), so the acid&rsquo;s H⁺ concentration, 3 × <i>c</i>(acid), should be a little <i>less</i> than <i>c</i>(NaOH): 3 × 0.00800 M = 0.0240 M, just under 0.0250 M ✓.</>,
  },
  {
    working: <b><i>c</i>(<Chem eq="C3H5O(COOH)3" />) = 8.0 × 10⁻³ M</b>,
    reason: <>Matches option <b>A</b>. Data are to 3 significant figures (0.0250 M, 24.0 mL, 25.0 mL), so 8.00 × 10⁻³ M, which the option prints as 8.0 × 10⁻³ M. The distractors, each checked: <b>B</b> (8.7 × 10⁻³ M) swaps the aliquot and titre volumes (0.0250 M × 0.0250 L ÷ 3 ÷ 0.0240 L = 8.68 × 10⁻³ M); <b>C</b> (2.6 × 10⁻² M, chosen by 32%) swaps the volumes <i>and</i> forgets to divide by 3 (0.0250 M × 0.0250 L = 6.25 × 10⁻⁴ mol, then ÷ 0.0240 L = 2.60 × 10⁻² M); <b>D</b> (7.2 × 10⁻² M) multiplies by 3 instead of dividing (6.00 × 10⁻⁴ mol × 3 ÷ 0.0250 L = 7.20 × 10⁻² M).</>,
  },
]

export default function ChemistryQ23_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 23 and 24.</p>
          <p className="mb-2">
            A solution of citric acid, <Chem eq="C3H5O(COOH)3" />, was analysed by titration.
          </p>
          <p className="mb-3">
            25.0 mL aliquots of the <Chem eq="C3H5O(COOH)3" /> solution were titrated against a
            standardised solution of 0.0250 M sodium hydroxide, NaOH. Phenolphthalein indicator was
            used and the average titre was found to be 24.0 mL.
          </p>
          <p>
            Based on the titration, the concentration of <Chem eq="C3H5O(COOH)3" /> in the solution
            was
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>8.0 × 10⁻³ M</>, isAnswer: true },
        { letter: 'B', content: <>8.7 × 10⁻³ M</> },
        { letter: 'C', content: <>2.6 × 10⁻² M</> },
        { letter: 'D', content: <>7.2 × 10⁻² M</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
