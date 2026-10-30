// 2023 Chemistry Exam, MCQ 28. VCAA examination report: 45% correct. Galvanic cell from a given
// table of half-cell potentials in basic conditions: choosing the strongest oxidant and reductant
// present, calculating E°cell, and choosing an inert electrode for a half-cell of two aqueous ions.
// Question text and the table of half-equations transcribed from the original paper (table as
// HTML). The paper's −0.57 V half-equation omits the coefficient 2 on SO₃²⁻ (noted in the working). VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const td = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 align-middle'

const halfCells: [string, string][] = [
  ['Mn3+(aq) + e- <=> Mn2+(aq)', '+1.56'],
  ['SO₃²⁻(aq) + 3H2O(l) + 4e- <=> S₂O₃²⁻(aq) + 6OH-(aq)', '−0.57'],
  ['SO₄²⁻(aq) + H2O(l) + 2e- <=> SO₃²⁻(aq) + 2OH-(aq)', '−0.94'],
  ['Mn2+(aq) + 2e- <=> Mn(s)', '−1.18'],
]

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 45, C: 25, D: 11 },
  answer: 'B',
  comment: (
    <>
      The half-cell potentials relating to the cell are:
      <br />
      <Chem eq="Mn3+(aq) + e- <=> Mn2+(aq)" />
      <br />
      <span className="pl-12">+1.56 V</span>
      <br />
      <Chem eq="SO₄²⁻(aq) + H2O(l) + 2e- <=> SO₃²⁻(aq) + 2OH-(aq)" />
      <br />
      <span className="pl-12">−0.94 V</span>
      <br />
      The cell will produce 2.50 V as <Chem eq="SO₃²⁻(aq)" /> is oxidised to{' '}
      <Chem eq="SO₄²⁻(aq)" />, and <Chem eq="Mn3+(aq)" /> is reduced to <Chem eq="Mn2+(aq)" />.
      <br />
      In both half-cells and in each half-equation, the oxidising and reducing agents are ions in
      solution and the electrodes on both cells will be unreactive conductors, in this case Pt, an
      inert metal. Mn would be inappropriate in an <Chem eq="Mn3+(aq)" />/<Chem eq="Mn2+(aq)" />{' '}
      half-cell in any circumstance because it would be oxidised in the half-cell by{' '}
      <Chem eq="Mn3+(aq)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>In a galvanic cell the <b>strongest oxidising agent</b> present (left side, highest <i>E</i>°) is reduced at the cathode (+), and the <b>strongest reducing agent</b> present (right side, lowest <i>E</i>°) is oxidised at the anode (−).</>,
    reason: <>The table is ordered like the electrochemical series: oxidising agents on the left get stronger going up; reducing agents on the right get stronger going down. Only species that are actually present can react.</>,
  },
  {
    working: (
      <>
        Second half-cell: <Chem eq="Mn3+(aq)" /> and <Chem eq="Mn2+(aq)" />
        <br />
        Strongest oxidising agent: <Chem eq="Mn3+(aq)" /> (+1.56 V)
      </>
    ),
    reason: <><Chem eq="Mn3+" /> is on the left of the top half-equation, so it is the strongest oxidising agent in the whole table — it will be reduced to <Chem eq="Mn2+" />.</>,
  },
  {
    working: (
      <>
        First half-cell: <Chem eq="S₂O₃²⁻(aq)" />, <Chem eq="SO₃²⁻(aq)" />, <Chem eq="OH-(aq)" />
        <br />
        Reducing agents present: <Chem eq="S₂O₃²⁻" /> (right side, −0.57 V) and <Chem eq="SO₃²⁻" /> (right side, −0.94 V)
        <br />
        Strongest reducing agent: <Chem eq="SO₃²⁻(aq)" /> (−0.94 V)
      </>
    ),
    reason: <><Chem eq="SO₃²⁻" /> appears in two half-equations: on the left at −0.57 V (as an oxidising agent) and on the right at −0.94 V (as a reducing agent). Against <Chem eq="Mn3+" /> it acts as the reducing agent, and the −0.94 V couple is lower than the thiosulfate one, so <Chem eq="SO₃²⁻" /> is oxidised to <Chem eq="SO₄²⁻" />. (Using the −0.57 V couple would give 1.56 − (−0.57) = 2.13 V, which is not an option.) Note: the paper&rsquo;s −0.57 V equation is missing a coefficient — balanced, it is <Chem eq="2SO₃²⁻(aq) + 3H2O(l) + 4e- <=> S₂O₃²⁻(aq) + 6OH-(aq)" /> (two S atoms and a total charge of −8 on each side). This slip does not affect the answer.</>,
  },
  {
    working: (
      <>
        Cathode (+): <Chem eq="Mn3+(aq) + e- -> Mn2+(aq)" />
        <br />
        Anode (−): <Chem eq="SO₃²⁻(aq) + 2OH-(aq) -> SO₄²⁻(aq) + H2O(l) + 2e-" />
        <br />
        Overall (cathode × 2): <Chem eq="2Mn3+(aq) + SO₃²⁻(aq) + 2OH-(aq) -> 2Mn2+(aq) + SO₄²⁻(aq) + H2O(l)" />
      </>
    ),
    reason: <>The anode half-equation is the −0.94 V equation written in reverse (oxidation). The cell is in basic conditions, so it is balanced with <Chem eq="OH-" /> and <Chem eq="H2O" />, exactly as the table gives it. The cathode half-equation is doubled so that 2 electrons are gained for the 2 lost, then the two are added.</>,
  },
  {
    working: (
      <>
        <i>E</i>°<sub>cell</sub> = <i>E</i>°(cathode) − <i>E</i>°(anode)
        <br />
        <i>E</i>°<sub>cell</sub> = (+1.56 V) − (−0.94 V)
        <br />
        <i>E</i>°<sub>cell</sub> = <b>2.50 V</b>
      </>
    ),
    reason: <>Subtract the lower half-cell potential from the higher one, keeping the signs. The potentials are not doubled when the <Chem eq="Mn3+" /> half-equation is multiplied by 2 to balance electrons — <i>E</i>° does not depend on the amount.</>,
  },
  {
    working: <>Second half-cell needs an <b>inert electrode</b>, e.g. <b>Pt(s)</b>.</>,
    reason: <>Both the oxidising agent (<Chem eq="Mn3+" />) and its conjugate (<Chem eq="Mn2+" />) are ions in solution, so neither can be the electrode — an unreactive conductor is needed to carry the electrons. A Mn(s) electrode would be a strong reducing agent (−1.18 V) sitting in a solution of the strongest oxidising agent: it would react directly, <Chem eq="Mn(s) + 2Mn3+(aq) -> 3Mn2+(aq)" />, dissolving the electrode instead of sending electrons through the external circuit.</>,
  },
  {
    working: <><b>2.50 V, with a Pt(s) electrode in the second half-cell</b></>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> has the right voltage but uses Mn(s), which Mn³⁺ would oxidise directly (see the row above). Options <b>C</b> and <b>D</b> (1.75 V) cannot be right: 1.75 V is not the difference between <i>any</i> two potentials in the table (the possible differences are 0.24, 0.37, 0.61, 2.13, 2.50 and 2.74 V). It is 0.57 + 1.18 — the two lowest potentials with their minus signs dropped and added, a sign error — and neither of those couples involves the <Chem eq="Mn3+" /> cathode anyway.</>,
  },
]

export default function ChemistryQ28_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">Consider the half-cell equations and their half-cell potentials in the table below.</p>
          <div className="mb-3 overflow-x-auto">
            <table className="text-[13px] border border-gray-300 dark:border-gray-700 border-collapse">
              <tbody>
                <tr>
                  <td className={`${td} font-semibold text-center`}>Half-cell equations</td>
                  <td className={`${td} font-semibold text-center`}>Standard electrode potential (<i>E</i><sup>0</sup>) in volts at 25 °C</td>
                </tr>
                {halfCells.map(([eq, e]) => (
                  <tr key={eq}>
                    <td className={td}><Chem eq={eq} /></td>
                    <td className={`${td} text-center`}>{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-2">
            A galvanic cell contains <Chem eq="S₂O₃²⁻(aq)" />, <Chem eq="SO₃²⁻(aq)" /> and{' '}
            <Chem eq="OH-(aq)" /> with a platinum electrode in the first half-cell and{' '}
            <Chem eq="Mn3+(aq)" /> and <Chem eq="Mn2+(aq)" /> in the second half-cell. All solutions
            are 1M solutions and the cell is at SLC.
            <br />
            The galvanic cell will deliver
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>2.50 V if the electrode in the second half-cell is Mn(s).</> },
        { letter: 'B', content: <>2.50 V if the electrode in the second half-cell is Pt(s).</>, isAnswer: true },
        { letter: 'C', content: <>1.75 V if the electrode in the second half-cell is Mn(s).</> },
        { letter: 'D', content: <>1.75 V if the electrode in the second half-cell is Pt(s).</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
