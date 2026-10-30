// 2025 Chemistry Exam, MCQ 21. VCAA examination report: 84% correct. The green chemistry
// principle "use of renewable feedstocks" — what it does (and does not) guarantee. Question text
// transcribed from the original paper. VCAA report only (no second source). Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 84, C: 6, D: 3 },
  answer: 'B',
  comment: (
    <>
      The use of renewable organic materials will always reduce the reliance on finite
      non-renewable sources of organics such as fossil fuels. The other three options are possible
      but not definite consequences in all scenarios.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A <b>renewable feedstock</b> is a raw material that can be replaced by natural processes on a human timescale — mainly plant-based material (sugar cane, corn, vegetable oils, wood waste).</>,
    reason: <>One of the green chemistry principles in the study design: raw materials should come from renewable (mainly plant-based) sources rather than from fossil fuels, whenever practicable.</>,
  },
  {
    working: <>The alternative it replaces is a <b>finite</b> feedstock — crude oil, natural gas and coal, which took millions of years to form and are being used up.</>,
    reason: <>So the one thing that is <i>always</i> true when a renewable feedstock is used is that less of a finite resource is consumed.</>,
  },
  {
    working: <>Test each option with &ldquo;is this <i>always</i> true just because the feedstock is renewable?&rdquo;<br />A — no: growing, harvesting and transporting crops still has an environmental impact (land, water, fertiliser, CO₂). &ldquo;Eliminate <i>any</i>&rdquo; is far too absolute.<br />B — yes: this is the definition of the advantage.<br />C — no: the number of by-products depends on the reaction pathway (its atom economy), not on where the raw material came from.<br />D — no: energy use depends on the process conditions (design for energy efficiency is a separate principle); a plant-based route can even need more energy, e.g. to distil ethanol out of a fermentation mixture.</>,
    reason: <>The question asks for a <i>key</i> advantage — one that follows from the feedstock being renewable in every case, not one that might happen in some processes.</>,
  },
  {
    working: <b>Using renewable feedstocks reduces reliance on finite natural resources.</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> overstates the benefit (no process has zero environmental impact); <b>C</b> describes high atom economy and <b>D</b> describes energy efficiency — different green chemistry principles that renewable feedstocks don&rsquo;t guarantee.</>,
  },
]

export default function ChemistryQ21_2025() {
  return (
    <MCQShell
      question={
        <p>
          A key advantage of using renewable feedstocks in the manufacture of organic compounds is
          that they
        </p>
      }
      options={[
        { letter: 'A', content: <>eliminate any associated environmental impact.</> },
        { letter: 'B', content: <>reduce reliance on finite natural resources.</>, isAnswer: true },
        { letter: 'C', content: <>lead to the production of fewer by-products.</> },
        { letter: 'D', content: <>reduce the energy requirements of the manufacturing process.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
