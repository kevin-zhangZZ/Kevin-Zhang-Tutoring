// 2022 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 73% correct.
// Matching a cubic to the shape of its derivative. Question text transcribed from the
// original paper; both figures are crops of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2022-mcq7-stem.png'
import optionsSrc from './meth-2022-mcq7-options.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 8, C: 10, D: 3, E: 73 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f \text{ has exactly two turning points}" />,
    reason: <>One local maximum near the origin, one local minimum to its right — so <Katex tex="f'" /> has exactly two zeros.</>,
  },
  {
    working: <Katex display tex="\text{degree of } f' = \text{degree of } f-1" />,
    reason: <>The graph rises to <Katex tex="+\infty" /> on the right and falls to <Katex tex="-\infty" /> on the left, so <Katex tex="f" /> is cubic-shaped and <Katex tex="f'" /> must be a parabola. That alone eliminates A, C and D.</>,
  },
  {
    working: <Katex display tex="f \text{ increasing} \implies f'>0; \quad f \text{ decreasing} \implies f'<0" />,
    reason: <>Between the two turning points <Katex tex="f" /> falls, so <Katex tex="f'" /> must be <em>below</em> the axis there.</>,
  },
  {
    working: <Katex display tex="\text{so } f' \text{ is a parabola opening } upwards" />,
    reason: <>Positive, negative, positive. Option B is a downward parabola, which would mean <Katex tex="f" /> falls, rises, falls.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}}" />,
    reason: <>An upward parabola with two zeros, matching the two turning points of <Katex tex="f" />.</>,
  },
]

export default function MethodsQ7_2022() {
  return (
    <MCQShell
      question={
        <>
          <p>The graph of <Katex tex="y=f(x)" /> is shown below.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit my-3">
            <img
              src={stemSrc}
              alt="A cubic-shaped curve rising from the lower left, crossing the x-axis, peaking just above it near the origin, dipping to a minimum below it, then rising steeply — from the original 2022 VCAA exam paper"
              className="w-full max-w-[230px]"
            />
          </div>
          <p>
            The graph of <Katex tex="y=f'(x)" />, the first derivative of{' '}
            <Katex tex="f(x)" /> with respect to <Katex tex="x" />, could be
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-3">
            <img
              src={optionsSrc}
              alt="Five candidate derivative graphs labelled A to E: A and C are cubics, B is a downward parabola, D is a hyperbola-like pair of branches, and E is an upward parabola with two x-intercepts — from the original 2022 VCAA exam paper"
              className="w-full max-w-[440px]"
            />
          </div>
        </>
      }
      options={[
        { letter: 'A', content: <>see the diagram</> },
        { letter: 'B', content: <>see the diagram</> },
        { letter: 'C', content: <>see the diagram</> },
        { letter: 'D', content: <>see the diagram</> },
        { letter: 'E', content: <>see the diagram</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
