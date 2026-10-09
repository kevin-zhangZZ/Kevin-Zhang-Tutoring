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
    working: <Katex display tex="d = \sqrt{x^2+y^2}" />,
    reason: <>The shortest distance between two points is the straight line joining them, so <Katex tex="d" /> is the length of the dashed segment from <Katex tex="O" /> to <Katex tex="(x,y)" />. By Pythagoras (horizontal side <Katex tex="x" />, vertical side <Katex tex="y" />) it is <Katex tex="\sqrt{x^2+y^2}" />.</>,
    more: <>The word &ldquo;shortest&rdquo; does not mean anything has to be minimised. It only says <Katex tex="d" /> is measured along the straight line, and <Katex tex="(x,y)" /> stands for any point on the graph. The options are all formulas in <Katex tex="x" />, so the job is just to write <Katex tex="d" /> in terms of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="y = \sqrt{2x+1} \implies y^2 = 2x+1" />,
    reason: <>The point is on the graph of <Katex tex="f" />, so <Katex tex="y=f(x)" />. Squaring removes the square root, and only <Katex tex="y^2" /> is needed.</>,
  },
  {
    working: <Katex display tex="d = \sqrt{x^2+2x+1}" />,
    reason: <>Substituting <Katex tex="y^2=2x+1" />.</>,
  },
  {
    working: <Katex display tex="x^2+2x+1 = (x+1)^2" />,
    reason: <><Katex tex="\sqrt{x^2+2x+1}" /> is not one of the options (C is close, but has <Katex tex="-2x" />), so try to simplify it. Under a square root, check for a perfect square: <Katex tex="x^2+2x+1" /> fits <Katex tex="a^2+2ab+b^2=(a+b)^2" /> with <Katex tex="a=x" /> and <Katex tex="b=1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}d &= \sqrt{(x+1)^2} = |x+1| \\ &= x+1 \ \text{ since } x\ge0\end{aligned}" />,
    reason: <>In general <Katex tex="\sqrt{u^2}=|u|" />, not <Katex tex="u" />. Here the domain of <Katex tex="f" /> is <Katex tex="[0,\infty)" />, so <Katex tex="x+1" /> is positive and the absolute value can be dropped.</>,
  },
  {
    working: <Katex display tex="\boxed{d = x+1}" />,
    reason: <>Matches option <b>D</b>. Check: at <Katex tex="x=4" /> the point is <Katex tex="(4,3)" />, a 3-4-5 triangle, so <Katex tex="d=5=4+1" />.</>,
    more: <>Option A is <Katex tex="d^2" /> (the square root left off), and E is <Katex tex="y^2" /> on its own. B is <Katex tex="x^2+y" />: it uses <Katex tex="y" /> where Pythagoras needs <Katex tex="y^2" />, and has no outer square root. C, the most common wrong answer, differs from <Katex tex="\sqrt{x^2+2x+1}" /> only in the sign of <Katex tex="2x" />, so it is easy to pick at a glance: check every sign before choosing an option that looks right. A test value catches all of these, but choose it carefully: <Katex tex="x=0" /> cannot separate the options (every one gives 1 there), but at <Katex tex="x=4" /> only D gives 5 (A gives 25, B gives 19, C gives 3 and E gives 9).</>,
  },
]

export default function MethodsQ9_2022() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img loading="lazy" decoding="async"
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
