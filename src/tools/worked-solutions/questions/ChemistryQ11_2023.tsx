// 2023 Chemistry Exam, MCQ 11. VCAA examination report: 63% correct. Units of the initial rate
// of reaction read from a graph of product concentration against time. Question text
// transcribed from the original paper; the concentration–time graph is cropped from the
// original VCAA exam PDF. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2023-mcq11-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 15, C: 19, D: 3 },
  answer: 'A',
  comment: (
    <>
      Reaction rate is the change in the quantity of a reactant or product per unit time,
      <br />
      i.e.&nbsp; M / s &nbsp;= mol L<sup>−1</sup> / s = mol L<sup>−1</sup> s<sup>−1</sup>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>rate = (change in concentration of product) ÷ (change in time) = Δc / Δt</>,
    reason: <>The rate of a reaction is how fast a quantity changes <i>per unit time</i>. The graph plots <b>concentration</b> of product against time, so the rate read from it is a change in concentration divided by a time — the <b>gradient</b> of the curve.</>,
  },
  {
    working: <>Initial rate = gradient of the curve at <i>t</i> = 0 (the steep, straight first section).</>,
    reason: <>&ldquo;Initial&rdquo; just tells you <i>where</i> on the curve to take the gradient (at the start, where the reaction is fastest). It does not change the units: every gradient on this graph has the units of the <i>y</i>-axis divided by the units of the <i>x</i>-axis.</>,
  },
  {
    working: <>units of rate = units of <i>y</i>-axis ÷ units of <i>x</i>-axis = M ÷ s</>,
    reason: <>Read the units off the axis labels: concentration of product in M, time in s.</>,
  },
  {
    working: <>M = mol L<sup>−1</sup>, so M ÷ s = mol L<sup>−1</sup> ÷ s = mol L<sup>−1</sup> s<sup>−1</sup></>,
    reason: <>M (molar) is shorthand for mol L<sup>−1</sup>. Dividing by s adds s<sup>−1</sup>.</>,
  },
  {
    working: <b>Units of the initial rate: mol L<sup>−1</sup> s<sup>−1</sup></b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b>, mol s<sup>−1</sup>, is the unit of a rate measured as an <i>amount</i> (mol) per second — it would fit a graph of moles of product, but this graph plots <i>concentration</i>, so the L<sup>−1</sup> is needed. Option <b>B</b>, mol L<sup>−1</sup>, is just the unit of concentration — it leaves out the &ldquo;per unit time&rdquo; that makes something a rate. Option <b>D</b>, mol, is an amount, not a rate.</>,
  },
]

export default function ChemistryQ11_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A student conducted an experiment to determine the rate of a chemical reaction. The
            graph of the student&rsquo;s results is shown below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={graphSrc}
              alt="Graph of concentration of product (M) against time (s): the curve starts at the origin, rises steeply and almost linearly, then curves over and levels off to a horizontal line — from the original 2023 VCAA exam paper"
              className="w-full max-w-[340px]"
            />
          </div>
          <p>Which one of the following correctly shows the units of the initial rate of reaction?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>mol L<sup>−1</sup> s<sup>−1</sup></>, isAnswer: true },
        { letter: 'B', content: <>mol L<sup>−1</sup></> },
        { letter: 'C', content: <>mol s<sup>−1</sup></> },
        { letter: 'D', content: 'mol' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
