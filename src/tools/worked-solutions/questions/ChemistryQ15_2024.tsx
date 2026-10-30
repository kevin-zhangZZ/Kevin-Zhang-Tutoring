// 2024 Chemistry Exam, MCQ 15 — BONUS: a VCAA-flagged question with two accepted answers (A and
// D). VCAA's report explains the ambiguity directly: option D's wording could be read a second,
// genuinely-true way. Question text transcribed from the original paper (rendered from page
// images — the 2024 exam PDF has no extractable text). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const FLAWED = (
  <p>
    VCAA accepted two answers here. A was the intended answer, but the report explains that
    option D&rsquo;s wording could also be read as a true statement, so after review both{' '}
    <b>A and D</b> were accepted as correct. Both are marked below.
  </p>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 21, C: 19, D: 43 },
  answer: ['A', 'D'],
  flawed: FLAWED,
  comment: (
    <>
      <Chem eq="2SO3(g) <=> 2SO2(g) + O2(g)" />
      <br />
      When this system reaches equilibrium at any temperature, the only facts we can establish
      are:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>[SO₂] will be twice as high as [O₂]</li>
        <li>therefore, the <i>n</i>(SO₂) will be twice as high as <i>n</i>(O₂)</li>
        <li>
          therefore, the <i>m</i>(SO₂) will be four times as high as <i>m</i>(O₂) due to the
          M<sub>r</sub>(SO₂) = 64 and M<sub>r</sub>(O₂) = 32
        </li>
      </ul>
      Given that the wording for option D could have been interpreted as stating that, no matter
      how the temperature of an equilibrium is altered, the sum of <i>n</i>(SO₂) and <i>n</i>(SO₃)
      will always equal the same value, this response was subsequently awarded as being correct in
      addition to option A.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The reaction is <Chem eq="2SO3(g) <=> 2SO2(g) + O2(g)" />, starting from <b>pure SO₃</b> in a sealed, empty container — no SO₂ or O₂ present at the start.</>,
    reason: <>Because everything starts as SO₃, every mole of SO₂ and O₂ that ever appears comes from the same decomposition reaction, in the fixed 2:2:1 ratio the equation demands.</>,
  },
  {
    working: <>For every 2 mol of SO₃ that decomposes, exactly 2 mol of SO₂ and 1 mol of O₂ are produced — so <b><i>n</i>(SO₂) = 2 × <i>n</i>(O₂)</b>, always, regardless of temperature or how far the reaction proceeds.</>,
    reason: <>This ratio comes purely from reaction stoichiometry starting from pure SO₃ — it holds no matter what K happens to be at a given temperature.</>,
  },
  {
    working: (
      <>
        <i>m</i> = <i>n</i> × <i>M</i>, with <i>n</i>(O₂) = ½<i>n</i>(SO₂)
        <br />
        <i>m</i>(SO₂) / <i>m</i>(O₂) = [<i>n</i>(SO₂) × 64.1] / [½<i>n</i>(SO₂) × 32.0]
        <br />
        <i>m</i>(SO₂) / <i>m</i>(O₂) = 64.1 / 16.0
        <br />
        <i>m</i>(SO₂) / <i>m</i>(O₂) = 4.006 ≈ <b>4.0</b>
      </>
    ),
    reason: <>Data Book: <i>M</i>(S) = 32.1, <i>M</i>(O) = 16.0 g mol⁻¹, so <i>M</i>(SO₂) = 64.1 g mol⁻¹ and <i>M</i>(O₂) = 32.0 g mol⁻¹ (the report rounds these to 64 and 32). The <i>n</i>(SO₂) cancels, so the ratio is 4.0 whatever the extent of decomposition — option A is true at every temperature. This is the answer VCAA originally intended.</>,
  },
  {
    working: (
      <>
        B: <i>m</i>(SO₂) = 0.800 × <i>m</i>(SO₃)
        <br />
        <i>n</i>(SO₂) × 64.1 = 0.800 × <i>n</i>(SO₃) × 80.1
        <br />
        Since 64.1 / 80.1 = 0.800, this needs <i>n</i>(SO₂) = <i>n</i>(SO₃), i.e. exactly half the SO₃ decomposed.
      </>
    ),
    reason: <>How far the SO₃ decomposes depends on <i>K</i>, and <i>K</i> changes with temperature, so the SO₃ is exactly half decomposed at only one temperature at most. Not true at all temperatures. Ruled out.</>,
  },
  {
    working: <>C: <i>n</i>(SO₂) and <i>n</i>(O₂) are never equal — the 2:1 stoichiometric ratio between them is fixed by the balanced equation, and this ratio isn't 1:1.</>,
    reason: <>A basic stoichiometry mismatch. Ruled out.</>,
  },
  {
    working: <>D, read <b>literally</b> ("the amount in mol of SO₂ and SO₃ are the same"): this depends on how far the reaction has proceeded, which changes with temperature — so a literal reading makes D false, just like B.</>,
    reason: <>Read literally, D is false.</>,
  },
  {
    working: <>D, read the way VCAA subsequently accepted: every mole of SO₃ that decomposes becomes exactly one mole of SO₂ (the 2SO₃ → 2SO₂ step is 1:1 for the sulfur-containing species) — so <b><i>n</i>(SO₂) + <i>n</i>(SO₃)</b> stays fixed at the original moles of SO₃ placed in the container, no matter the temperature or extent of decomposition.</>,
    reason: <>Under this "total sulfur-containing species" reading, D expresses a genuinely true, always-true equilibrium fact — just not quite the literal words on the page. VCAA judged this reading defensible enough to accept D as correct too.</>,
  },
  {
    working: <b>A is true under any reading. D is false read literally, but true under a defensible alternative reading of its wording — VCAA accepted both.</b>,
    reason: <>Matches options <b>A</b> and <b>D</b>, both accepted by VCAA. Option <b>B</b> would need <i>n</i>(SO₂) = <i>n</i>(SO₃), and option <b>C</b> ignores the 2 : 1 mole ratio of SO₂ to O₂ in the equation.</>,
  },
]

export default function ChemistryQ15_2024() {
  return (
    <MCQShell
      flawed={FLAWED}
      question={
        <>
          <p className="mb-2">
            An example of a homogeneous equilibrium is the decomposition of sulfur trioxide,
            SO₃(g), to form sulfur dioxide, SO₂(g), and oxygen, O₂(g).
          </p>
          <p className="mb-2">Some SO₃(g) is placed in an empty container, which is then sealed.</p>
          <p>
            Which one of the following statements is true at all temperatures when the sealed
            system reaches equilibrium?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'The mass of SO₂(g) is 4.0 times the mass of O₂(g).', isAnswer: true },
        { letter: 'B', content: 'The mass of SO₂(g) is 80.0% of the mass of SO₃(g).' },
        { letter: 'C', content: 'The amount in mol of SO₂(g) and O₂(g) are the same.' },
        { letter: 'D', content: 'The amount in mol of SO₂(g) and SO₃(g) are the same.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
