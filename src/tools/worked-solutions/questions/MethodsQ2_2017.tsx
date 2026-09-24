// 2017 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 80% correct.
// Where a cubic is decreasing, read off its two stationary points. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2017-mcq2-cubic.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 5, C: 12, D: 80, E: 1 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)<0 \iff f \text{ is decreasing}" />,
    reason: <>The question is about the <em>derivative</em>, not the function. Read the graph for where the curve goes downhill, not for where it is below the axis.</>,
  },
  {
    working: <Katex display tex="\text{stationary at } x=-3 \text{ and } x=\tfrac53" />,
    reason: <>Straight from the two labelled points. These are the only places the gradient is zero, so they are the only places its sign can change.</>,
  },
  {
    working: <Katex display tex="(-3,36) \text{ is a maximum},\quad \left(\tfrac53,-\tfrac{400}{27}\right) \text{ is a minimum}" />,
    reason: <>From the shape of the graph: it rises to the first, falls to the second, then rises again.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x)<0 \text{ on } \left(-3,\tfrac53\right)}" />,
    reason: <>The stretch between the maximum and the minimum — the only part of the graph heading downhill. Matches option <b>D</b>. Option C (12%) is the complement, where the cubic is increasing; option B is where <Katex tex="f(x)" /> itself is negative (the cubic is <Katex tex="x(x+5)(x-3)" />).</>,
  },
]

export default function MethodsQ2_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Part of the graph of a cubic polynomial function <Katex tex="f" /> and the
            coordinates of its stationary points are shown below.
          </p>
          <p>
            <Katex tex="f'(x)<0" /> for the interval
          </p>
        </>
      }
      diagram={
        <img
          src={diagramSrc}
          alt="Part of a cubic graph with a local maximum at (−3, 36) and a local minimum at (5/3, −400/27), from the original 2017 VCAA exam paper"
          className="w-full max-w-[360px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="(0,3)" /> },
        { letter: 'B', content: <Katex tex="(-\infty,-5)\cup(0,3)" /> },
        { letter: 'C', content: <Katex tex="(-\infty,-3)\cup\left(\tfrac53,\infty\right)" /> },
        { letter: 'D', content: <Katex tex="\left(-3,\tfrac53\right)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\left(-\tfrac{400}{27},36\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
