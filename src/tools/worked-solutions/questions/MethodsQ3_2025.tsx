// 2025 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 71% correct.
// A reflection in the y-axis followed by a vertical translation. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2025-mcq3-stem.png'
import optionsSrc from './meth-2025-mcq3-options.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 71, C: 12, D: 13 },
  answer: 'B',
  comment: (
    <>
      The graph of <Katex tex="f" /> has been reflected in the <Katex tex="y" />-axis and
      translated 2 units up.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = f(-x)+2" />,
    reason: <>Two transformations: <Katex tex="x\mapsto-x" /> is a reflection in the <Katex tex="y" />-axis, and <Katex tex="+2" /> lifts everything two units.</>,
  },
  {
    working: <Katex display tex="(x,y) \mapsto (-x,\ y+2)" />,
    reason: 'The mapping applied to every point of the original graph.',
  },
  {
    working: <Katex display tex="\text{local max } (0,1) \mapsto (0,3)" />,
    reason: <>A point on the <Katex tex="y" />-axis stays put horizontally, so it simply rises to 3. Options <b>C</b> and <b>D</b> put the central value at 1 and 3 respectively but have the wrong shape either side.</>,
  },
  {
    working: <Katex display tex="\text{deeper min near } x=2 \ \mapsto \ \text{near } x=-2" />,
    reason: <>The reflection swaps the two troughs: the deeper one (originally on the right) ends up on the left. This is the feature that separates <b>A</b> from <b>B</b>.</>,
  },
  {
    working: <Katex display tex="\text{right-hand end } f(-4)\approx0.3 \ \mapsto \ \text{value} \approx2.3 \text{ at } x=4" />,
    reason: 'Tracking the ends confirms the orientation.',
  },
  {
    working: <Katex display tex="\boxed{\text{Graph B}}" />,
    reason: <>Option <b>B</b>: high at the left, deep trough near <Katex tex="x=-2" />, peak of 3 at the origin, shallow trough near <Katex tex="x=2" />. Option <b>A</b> is the vertical shift without the reflection.</>,
  },
]

export default function MethodsQ3_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>The graph of <Katex tex="y=f(x)" /> is shown below.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={stemSrc}
              alt="A wavy curve with a shallow trough near x = −2, a local maximum of 1 at the origin, a deeper trough near x = 2, then rising to 2 at x = 4 — from the original 2025 VCAA exam paper"
              className="w-full max-w-[420px]"
            />
          </div>
          <p>
            Which one of the following options best represents the graph of{' '}
            <Katex tex="y=f(-x)+2" />?
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={optionsSrc}
              alt="Four candidate graphs labelled A to D, differing in whether the curve has been reflected and how far it has been lifted — from the original 2025 VCAA exam paper"
              className="w-full max-w-[620px]"
            />
          </div>
        </div>
      }
      options={[
        { letter: 'A', content: <>Graph A</> },
        { letter: 'B', content: <>Graph B</>, isAnswer: true },
        { letter: 'C', content: <>Graph C</> },
        { letter: 'D', content: <>Graph D</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
