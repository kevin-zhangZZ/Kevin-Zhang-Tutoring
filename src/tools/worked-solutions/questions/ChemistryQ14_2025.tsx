// 2025 Chemistry Exam, MCQ 14. VCAA examination report: 62% correct. Role of a catalyst in
// collision theory: an alternative pathway with lower activation energy, so a greater
// proportion of collisions are successful. Question text transcribed from the original paper
// (no diagram). Answer and comment from the VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 25, C: 62, D: 8 },
  answer: 'C',
  comment: (
    <>
      Catalysts reduce the activation energy for a reaction and therefore lower the energy required
      for a successful collision. Hence the proportion of particles with E &gt; Eₐ will increase.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A catalyst provides an <b>alternative reaction pathway with a lower activation energy</b>, <i>E</i>ₐ.</>,
    reason: <>The catalyst takes part in the reaction but is regenerated, so it appears above the arrow rather than as a reactant. It does not change the temperature, ΔH or the particles&rsquo; energies.</>,
  },
  {
    working: <>Lower <i>E</i>ₐ → a <b>greater proportion of collisions</b> have energy ≥ <i>E</i>ₐ → a greater proportion of particles react.</>,
    reason: <>Collision theory: a collision only succeeds if the particles have at least <i>E</i>ₐ (and the right orientation). On a Maxwell–Boltzmann distribution, moving <i>E</i>ₐ to the left puts more of the area under the curve beyond it — the distribution itself is unchanged.</>,
  },
  {
    working: <b>The catalyst increases the proportion of particles that react.</b>,
    reason: <>
      Matches option <b>C</b>. <b>B</b>, chosen by 25%, is the most common misconception: the{' '}
      <i>number</i> of collisions per unit time depends on concentration (or pressure) and
      temperature, which a catalyst does not change — it changes how many of those collisions{' '}
      <i>succeed</i>. <b>A</b> and <b>D</b> describe raising the <i>temperature</i>: a catalyst
      does not make particles move faster or increase their kinetic energy.
    </>,
  },
]

export default function ChemistryQ14_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The reaction to produce methanal, CH₂O, is shown below.</p>
          <p className="mb-3 pl-6">
            <Chem eq="2CH3OH(g) + O2(g)" />{' '}
            <span className="inline-flex flex-col items-center align-middle leading-none mx-1">
              <span className="text-[12px]">catalyst</span>
              <span>⟶</span>
            </span>{' '}
            <Chem eq="2CH2O(g) + 2H2O(g)" />
          </p>
          <p>The primary role of the catalyst in the production of CH₂O is to increase the</p>
        </>
      }
      options={[
        { letter: 'A', content: <>speed of all particles.</> },
        { letter: 'B', content: <>number of collisions per unit time.</> },
        { letter: 'C', content: <>proportion of particles that react.</>, isAnswer: true },
        { letter: 'D', content: <>overall kinetic energy of the system.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
