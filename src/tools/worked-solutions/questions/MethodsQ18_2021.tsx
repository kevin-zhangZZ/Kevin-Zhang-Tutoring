// 2021 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 39% correct. The
// maximum number of solutions of f(x−k) = g(x) as the translation k varies, where f is a
// cubic and g is a single-humped curve. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const DIAGRAM = (
  <svg viewBox="0 0 260 180" className="w-full max-w-[300px]">
    <line x1="15" y1="140" x2="245" y2="140" stroke="currentColor" strokeWidth="1.2" className="text-gray-400" />
    <path d="M 60 165 C 90 165, 95 60, 130 60 C 160 60, 155 110, 190 40" fill="none" strokeWidth="2" className="stroke-gray-500 dark:stroke-gray-400" />
    <path d="M 25 170 C 55 120, 75 20, 100 20" fill="none" strokeWidth="2" strokeDasharray="4,3" className="stroke-sky-600 dark:stroke-sky-400" />
    <circle cx="83" cy="128" r="3" className="fill-sky-700 dark:fill-sky-300" />
    <circle cx="93" cy="79" r="3" className="fill-sky-700 dark:fill-sky-300" />
    <circle cx="98" cy="53" r="3" className="fill-sky-700 dark:fill-sky-300" />
    <text x="195" y="45" fontSize="10" className="fill-gray-500 dark:fill-gray-400">f(x−k)</text>
    <text x="30" y="15" fontSize="10" className="fill-sky-700 dark:fill-sky-300">g(x)</text>
  </svg>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 23, C: 22, D: 39, E: 6 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f(x-k)=g(x)" /> will have a maximum of three solutions if the graph of <Katex tex="f" /> is
      translated appropriately — e.g. <Katex tex="k=-1" /> gives three points of intersection.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (2x-1)(2x+1)(3x-1)" />,
    reason: <>A cubic with three distinct real roots — its graph dips down to a local minimum, then rises to a local maximum, then increases forever ("wiggles" once between its outer branches).</>,
  },
  {
    working: <Katex display tex="g(x) = x\log_e(-x),\quad x<0" />,
    reason: <>As <Katex tex="x\to0^-" />, <Katex tex="g(x)\to0" />; as <Katex tex="x\to-\infty" />, <Katex tex="g(x)\to-\infty" />; and <Katex tex="g" /> has a single maximum in between (at <Katex tex="x=-1/e" />, found by setting <Katex tex="g'(x)=\log_e(-x)+1=0" />) — a single "hump" shape.</>,
  },
  {
    working: <>Translating <Katex tex="f" /> horizontally by <Katex tex="k" /> (i.e. <Katex tex="f(x-k)" />) slides its wiggle left or right without changing its shape.</>,
    reason: <>Changing <Katex tex="k" /> is exactly how many times the shifted cubic can cross the fixed hump of <Katex tex="g" />.</>,
  },
  {
    working: DIAGRAM,
    reason: <>Sliding the cubic's oscillating middle section so it weaves through <Katex tex="g" />'s hump can produce up to <b>three</b> crossings — once on the way up, once through the trough/peak region, once more further along — but no more, since a cubic only has room for one full oscillation and <Katex tex="g" /> only has one hump.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum} = 3}" />,
    reason: <>Matches option <b>D</b> — confirmed by VCAA's own example at <Katex tex="k=-1" />, which produces exactly three intersection points.</>,
  },
]

export default function MethodsQ18_2021() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:\mathbb{R}\to\mathbb{R}" />, <Katex tex="f(x)=(2x-1)(2x+1)(3x-1)" /> and{' '}
          <Katex tex="g:(-\infty,0)\to\mathbb{R}" />, <Katex tex="g(x)=x\log_e(-x)" />.
          <br />
          The maximum number of solutions for the equation <Katex tex="f(x-k)=g(x)" />, where{' '}
          <Katex tex="k\in\mathbb{R}" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
