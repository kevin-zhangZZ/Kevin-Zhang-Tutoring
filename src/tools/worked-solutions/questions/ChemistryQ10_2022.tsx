// 2022 Chemistry Exam, MCQ 10. VCAA examination report: 46% correct. Mass of water consumed in the
// hydrolysis of the triglyceride tripalmitin to give 65.0 g of glycerol (3 mol H₂O per mol
// glycerol). Question text transcribed from the original paper (no figures). VCAA report only (no
// second source). The report's working rounds n(C₃H₈O₃) to 0.707 mol but then writes 2.120 mol
// (3 × the unrounded value); kept verbatim and explained in the final row. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

// Chem renders a spaced " + " as a superscript charge, so split equations at " + " and print
// the plus signs as plain text.
const Eq = ({ eq }: { eq: string }) => (
  <>{eq.split(' + ').map((p, i) => <span key={i}>{i > 0 && ' + '}<Chem eq={p} /></span>)}</>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 46, C: 18, D: 17 },
  answer: 'B',
  comment: (
    <>
      Glycerol is one of the products of the hydrolysis of triglycerides – the other product(s) are
      fatty acids.
      <br />
      Hydrolysis of tripalmitin:
      <br />
      <Eq eq="C51H98O6 + 3H2O -> 3C15H31COOH + C3H8O3" />
      <br />
      n(<Chem eq="C3H8O3" />) = 65.0 g / 92.0 g mol⁻¹ = 0.707 mol
      <br />
      n(<Chem eq="H2O" />) = 3 x 0.707 = 2.120 mol
      <br />
      m(<Chem eq="H2O" />) = 2.120 mol x 18.0 g mol⁻¹
      <br />
      <span className="pl-12">= 38.2 g</span>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Making glycerol from a triglyceride is <b>hydrolysis</b>: water is a <b>reactant</b>, so water is <b>required</b>.</>,
    reason: <>A triglyceride is a triester of glycerol and three fatty acids. Hydrolysis breaks each ester link using one H₂O, giving back glycerol and the fatty acids. (The reverse — forming a triglyceride by condensation — is the reaction that <i>produces</i> water.) This rules out C and D.</>,
  },
  {
    working: <Eq eq="C51H98O6 + 3H2O -> 3C15H31COOH + C3H8O3" />,
    reason: <>Tripalmitin has <b>three ester links</b>, so 3 H₂O are needed, giving 3 palmitic acid (C₁₅H₃₁COOH; Data Book fatty acid table) + 1 glycerol. Balance check: C 51 = 3 × 16 + 3; H 98 + 6 = 104 = 3 × 32 + 8; O 6 + 3 = 9 = 3 × 2 + 3. ✓</>,
  },
  {
    working: <><i>n</i>(<Chem eq="C3H8O3" />) = <i>m</i> / <i>M</i></>,
    reason: <>Start from the substance whose mass is given.</>,
  },
  {
    working: <><i>n</i>(<Chem eq="C3H8O3" />) = 65.0 g / 92.0 g mol⁻¹</>,
    reason: <>The molar mass of glycerol, 92.0 g mol⁻¹, is given in the question.</>,
  },
  {
    working: <><i>n</i>(<Chem eq="C3H8O3" />) = 0.7065… mol</>,
    reason: <>Keep the unrounded value for the next step.</>,
  },
  {
    working: <><i>n</i>(<Chem eq="H2O" />) : <i>n</i>(<Chem eq="C3H8O3" />) = 3 : 1</>,
    reason: <>Mole ratio from the balanced equation: 3 H₂O are used for every 1 glycerol formed.</>,
  },
  {
    working: <><i>n</i>(<Chem eq="H2O" />) = 3 × 0.7065… mol = 2.1195… mol</>,
    reason: <>Multiply by 3 to convert mol of glycerol into mol of water.</>,
  },
  {
    working: <><i>m</i>(<Chem eq="H2O" />) = <i>n</i> × <i>M</i></>,
    reason: <>Convert the amount of water to a mass.</>,
  },
  {
    working: <><i>m</i>(<Chem eq="H2O" />) = 2.1195… mol × 18.0 g mol⁻¹</>,
    reason: <>Data Book: <i>M</i>(H) = 1.0 g mol⁻¹, <i>M</i>(O) = 16.0 g mol⁻¹, so <i>M</i>(H₂O) = 2(1.0) + 16.0 = 18.0 g mol⁻¹.</>,
  },
  {
    working: <><i>m</i>(<Chem eq="H2O" />) = 38.15… g ≈ <b>38.2 g of water required</b></>,
    reason: <>Three significant figures, set by the 65.0 g and 92.0 g mol⁻¹ data.</>,
  },
  {
    working: <b>Requires 38.2 g of water.</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> (12.7 g) uses a 1 : 1 ratio — 0.7065 mol × 18.0 g mol⁻¹ = 12.7 g — forgetting that each of the three ester links needs its own water molecule. Option <b>D</b> has the right mass but treats hydrolysis as if it released water (that is condensation, the reverse reaction); option <b>C</b> makes both mistakes. (The report&rsquo;s 2.120 mol is 3 × the unrounded 0.70652 mol; 3 × 0.707 would give 2.121 mol — either way the answer is 38.2 g.)</>,
  },
]

export default function ChemistryQ10_2022() {
  return (
    <MCQShell
      question={
        <>
          The molar mass of glycerol, <Chem eq="C3H8O3" />, is 92.0 g mol⁻¹.
          <br />
          The production of 65.0 g of <Chem eq="C3H8O3" /> from tripalmitin, <Chem eq="C51H98O6" />,
          which is a triglyceride
        </>
      }
      options={[
        { letter: 'A', content: <>requires 12.7 g of water.</> },
        { letter: 'B', content: <>requires 38.2 g of water.</>, isAnswer: true },
        { letter: 'C', content: <>produces 12.7 g of water.</> },
        { letter: 'D', content: <>produces 38.2 g of water.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
