// 2022 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 50% correct.
// A distance to the origin that collapses to a perfect square. Question text transcribed from the
// original paper; the diagram is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2022-mcq9-diagram.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 13, C: 23, D: 50, E: 7 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="d = \sqrt{x^2+y^2} \ \text{ with } y = \sqrt{2x+1}" />,
    reason: <>The distance from the origin to a general point on the curve.</>,
  },
  {
    working: <Katex display tex="y^2 = 2x+1 \implies d = \sqrt{x^2+2x+1}" />,
    reason: <>Squaring the square root removes it. Option A drops the outer square root; option C has the wrong sign on <Katex tex="2x" />.</>,
  },
  {
    working: <Katex display tex="x^2+2x+1 = (x+1)^2" />,
    reason: <>A perfect square, which is the point of the question.</>,
  },
  {
    working: <Katex display tex="\sqrt{(x+1)^2} = |x+1| = x+1 \ \text{ since } x\ge0" />,
    reason: <>The domain <Katex tex="[0,\infty)" /> makes the absolute value unnecessary.</>,
  },
  {
    working: <Katex display tex="\boxed{d = x+1}" />,
    reason: <>Matches option <b>D</b>. Check at <Katex tex="x=0" />: the point is <Katex tex="(0,1)" />, distance 1.</>,
  },
]

export default function MethodsQ9_2022() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img
              src={diagramSrc}
              alt="The graph of f rising from the y-axis, with a point (x, y) on it joined to the origin O by a dashed segment labelled d — from the original 2022 VCAA exam paper"
              className="w-full max-w-[260px]"
            />
          </div>
          <p>
          Let <Katex tex="f:[0,\infty)\to R" />, <Katex tex="f(x)=\sqrt{2x+1}" />.
          <br />
          The shortest distance, <Katex tex="d" />, from the origin to the point{' '}
          <Katex tex="(x,y)" /> on the graph of <Katex tex="f" /> is given by
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="d=x^2+2x+1" /> },
        { letter: 'B', content: <Katex tex="d=x^2+\sqrt{2x+1}" /> },
        { letter: 'C', content: <Katex tex="d=\sqrt{x^2-2x+1}" /> },
        { letter: 'D', content: <Katex tex="d=x+1" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="d=2x+1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
