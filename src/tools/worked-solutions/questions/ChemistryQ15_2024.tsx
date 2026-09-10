// 2024 Chemistry Exam, MCQ 15 — BONUS: a VCAA-flagged question with two accepted answers (A and
// D). VCAA's report explains the ambiguity directly: option D's wording could be read a second,
// genuinely-true way. Question text transcribed from the original paper (rendered from page
// images — the 2024 exam PDF has no extractable text). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 21, C: 19, D: 43 },
  answer: ['A', 'D'],
  flawed: (
    <>
      Given that the wording for option D could have been interpreted as stating that, no matter
      how the temperature of an equilibrium is altered, the sum of n(SO₂) and n(SO₃) will always
      equal the same value, this response was subsequently awarded as being correct in addition
      to option A.
    </>
  ),
  comment: (
    <>
      2SO₃(g) ⇌ 2SO₂(g) + O₂(g). When this system reaches equilibrium at any temperature, the
      only facts we can establish are: [SO₂] will be twice as high as [O₂]; therefore, n(SO₂)
      will be twice as high as n(O₂); therefore, m(SO₂) will be four times as high as m(O₂), due
      to Mr(SO₂) = 64 and Mr(O₂) = 32.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The reaction is <Chem eq="2SO3(g) <=> 2SO2(g) + O2(g)" />, starting from <b>pure SO₃</b> in a sealed, empty container — no SO₂ or O₂ present at the start.</>,
    reason: 'Because everything starts as SO₃, every mole of SO₂ and O₂ that ever appears comes from the same decomposition reaction, in the fixed 2:2:1 ratio the equation demands.',
  },
  {
    working: <>For every 2 mol of SO₃ that decomposes, exactly 2 mol of SO₂ and 1 mol of O₂ are produced — so <b>n(SO₂) = 2 × n(O₂)</b>, always, regardless of temperature or how far the reaction proceeds.</>,
    reason: 'This ratio comes purely from reaction stoichiometry starting from pure SO₃ — it holds no matter what K happens to be at a given temperature.',
  },
  {
    working: <>Converting to mass: m(SO₂) = n(SO₂) × 64 g mol⁻¹, and m(O₂) = n(O₂) × 32 g mol⁻¹ = (n(SO₂)/2) × 32 g mol⁻¹ = n(SO₂) × 16 g mol⁻¹. So m(SO₂)/m(O₂) = 64/16 = <b>4.0</b>.</>,
    reason: 'A: "the mass of SO₂(g) is 4.0 times the mass of O₂(g)" — true at every temperature. This is the answer VCAA originally intended.',
  },
  {
    working: <>B: the fraction of SO₃ that has decomposed changes with temperature (since <i>K</i> is temperature-dependent) — so the mass ratio of SO₂ to remaining SO₃ isn't fixed, and 80.0% is only one possible value among many.</>,
    reason: 'Not true at every temperature — the extent of decomposition genuinely varies with T. Ruled out.',
  },
  {
    working: <>C: n(SO₂) and n(O₂) are never equal — the 2:1 stoichiometric ratio between them is fixed by the balanced equation, and this ratio isn't 1:1.</>,
    reason: 'A basic stoichiometry mismatch. Ruled out.',
  },
  {
    working: <>D, read <b>literally</b> ("the amount in mol of SO₂ and SO₃ are the same"): this depends on how far the reaction has proceeded, which changes with temperature — so a literal reading makes D false, just like B.</>,
    reason: "Under the most natural, literal reading, D looks wrong — this is presumably why it wasn't the original intended answer.",
  },
  {
    working: <>D, read the way VCAA subsequently accepted: every mole of SO₃ that decomposes becomes exactly one mole of SO₂ (the 2SO₃ → 2SO₂ step is 1:1 for the sulfur-containing species) — so <b>n(SO₂) + n(SO₃)</b> stays fixed at the original moles of SO₃ placed in the container, no matter the temperature or extent of decomposition.</>,
    reason: 'Under this "total sulfur-containing species" reading, D expresses a genuinely true, always-true equilibrium fact — just not quite the literal words on the page. VCAA judged this reading defensible enough to accept D as correct too.',
  },
  {
    working: <b>A is true under any reading. D is false read literally, but true under a defensible alternative reading of its wording — VCAA accepted both.</b>,
    reason: 'A real case of ambiguous question wording being retroactively resolved by accepting two answers rather than one.',
  },
]

export default function ChemistryQ15_2024() {
  return (
    <MCQShell
      flawed={
        <p>
          VCAA's report explains this one directly: option D's wording could be read two ways —
          one false, one true — so both <b>A and D</b> were accepted as correct after review,
          alongside the originally-intended answer A. Both are marked below.
        </p>
      }
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
