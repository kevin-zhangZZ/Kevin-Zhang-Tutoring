// 2021 Chemistry Exam, MCQ 10. VCAA examination report: 17% correct. The most valid way to
// test whether polishing the zinc electrode increases a galvanic cell's current — a question
// about controlling variables, where 80% chose the option that measures current directly but
// uses two different cells. Question text transcribed from the original paper. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 2, C: 17, D: 80 },
  answer: 'C',
  comment: (
    <>
      Based on the electrochemical series, in an Fe-Zn cell the expected half-equations are{' '}
      <Chem eq="Zn(s) -> Zn2+(aq) + 2e-" /> and <Chem eq="Fe2+(aq) + 2e- -> Fe(s)" />
      <br />
      The most valid methods of testing the hypothesis are those in which all variables except
      the independent and dependent variables are controlled.
      <br />
      The independent variable has the values the Zn electrode is not polished / the Zn
      electrode is polished. The impact on the dependent variable – change in mass of Fe
      electrode per unit time can only be validly assessed if all the other variables are
      controlled.
      <br />
      The change in mass per unit time of the Fe electrode is proportional to the current
      flowing and, if the hypothesis is valid, will be greater after the Zn electrode is
      polished.
      <br />
      In Option C, all other variables are controlled. The same cell is used, and the only
      difference is whether the Zn electrode is polished.
      <br />
      In Option D, a different cell is used so not all variables were controlled, so this is not
      a valid experiment. It is perhaps not surprising D was chosen because the words
      &lsquo;polishing the zinc&rsquo; and &lsquo;measuring current&rsquo; appeared in this item
      and in the stem, so it was an obvious selection when students were unsure.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Independent variable: whether the Zn electrode is polished. Dependent variable: the current the cell produces.</>,
    reason: <>A valid test changes only the independent variable, measures the dependent one, and keeps <i>everything else</i> the same — electrolyte concentrations, electrode sizes, temperature, the cell itself.</>,
  },
  {
    working: <>Anode: <Chem eq="Zn(s) -> Zn2+(aq) + 2e-" /> · Cathode: <Chem eq="Fe2+(aq) + 2e- -> Fe(s)" /></>,
    reason: <>Zn is lower on the electrochemical series, so it is oxidised; Fe²⁺ ions are reduced and iron is deposited on the Fe electrode.</>,
  },
  {
    working: <>Mass of Fe deposited per unit time ∝ electrons per unit time ∝ current.</>,
    reason: <>Faraday&rsquo;s laws: <i>Q</i> = <i>It</i> and <i>n</i>(e⁻) = <i>Q</i>/<i>F</i>, with one Fe formed per two electrons. So the rate at which the Fe electrode gains mass is a direct measure of the current.</>,
  },
  {
    working: <><b>C</b> — the same cell, before and after polishing, with the current measured through the rate of mass gain of the Fe electrode. Only the polishing changes.</>,
    reason: <>Every other variable is controlled because nothing else about the cell changes — exactly what a valid test needs.</>,
  },
  {
    working: <><b>D</b> — two <i>different</i> cells. Any difference in current could come from differences between the cells (concentrations, electrode size or spacing, temperature), not from the polishing.</>,
    reason: <>Measuring current directly looks like the better choice, which is why 80% chose it — but a direct measurement in an uncontrolled comparison is not a valid test.</>,
  },
  {
    working: <><b>A</b> — reading about the structure of polished Zn is not a test of this cell. <b>B</b> — the conductivity of a polished Zn electrode on its own, with nothing to compare it with, says nothing about the cell&rsquo;s current.</>,
    reason: <>Neither is an experiment that measures the dependent variable with and without the change.</>,
  },
  {
    working: <b>Measure the rate of mass change of the Fe electrode in the same cell, before and after the Zn electrode is polished.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b> measures the right quantity but fails to control the other variables; options <b>A</b> and <b>B</b> don&rsquo;t test the hypothesis at all.</>,
  },
]

export default function ChemistryQ10_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A student hypothesised that polishing the zinc, Zn, electrode in an Fe–Zn galvanic
            cell would increase the current produced by the cell.
          </p>
          <p>
            What would be the <b>most</b> valid method of testing this hypothesis?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'researching the scientific literature to determine how polishing changes the structure of Zn' },
        { letter: 'B', content: 'measuring the conductivity of a Zn electrode after polishing it' },
        { letter: 'C', content: 'measuring the change in mass per unit time of the Fe electrode in the same Fe–Zn galvanic cell before and after the Zn electrode was polished', isAnswer: true },
        { letter: 'D', content: 'measuring the current produced by two different Fe–Zn galvanic cells, one using a polished Zn electrode and the other using an unpolished Zn electrode' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
