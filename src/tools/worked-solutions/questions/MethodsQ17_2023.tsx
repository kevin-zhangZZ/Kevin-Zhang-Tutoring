// 2023 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 28% correct. Volume of
// a cylinder rolled from a rectangular sheet with two circular end-caps cut from it. Question
// text and diagram transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const DIAGRAM = (
  <svg viewBox="0 0 300 160" className="w-full max-w-[320px]">
    <rect x="20" y="20" width="260" height="100" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500 dark:text-gray-400" />
    <rect x="90" y="20" width="120" height="100" className="fill-gray-200 dark:fill-gray-700" />
    <line x1="90" y1="20" x2="90" y2="120" strokeDasharray="4,3" stroke="currentColor" strokeWidth="1.2" className="text-gray-500 dark:text-gray-400" />
    <line x1="210" y1="20" x2="210" y2="120" strokeDasharray="4,3" stroke="currentColor" strokeWidth="1.2" className="text-gray-500 dark:text-gray-400" />
    <circle cx="55" cy="70" r="25" fill="none" strokeDasharray="3,2" stroke="currentColor" strokeWidth="1.2" className="text-gray-500 dark:text-gray-400" />
    <circle cx="245" cy="70" r="25" fill="none" strokeDasharray="3,2" stroke="currentColor" strokeWidth="1.2" className="text-gray-500 dark:text-gray-400" />
    <line x1="245" y1="70" x2="245" y2="45" stroke="currentColor" strokeWidth="1.2" className="text-gray-600 dark:text-gray-300" />
    <text x="235" y="60" fontSize="11" className="fill-gray-600 dark:fill-gray-300">r</text>
    <text x="145" y="14" fontSize="11" className="fill-gray-500 dark:fill-gray-400">x</text>
    <text x="145" y="140" fontSize="11" className="fill-gray-500 dark:fill-gray-400">h</text>
    <text x="288" y="73" fontSize="11" className="fill-gray-500 dark:fill-gray-400">y</text>
  </svg>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 28, C: 26, D: 26, E: 13 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      The base of the cylinder has a circumference of <Katex tex="2\pi r" /> units, so <Katex tex="y=2\pi r" />,{' '}
      <Katex tex="r=y/(2\pi)" />; <Katex tex="h=x-4r" />; <Katex tex="V=\pi r^2h = \dfrac{\pi xy^2-2y^3}{4\pi^2}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: DIAGRAM,
    reason: <>The shaded middle strip (width <Katex tex="h" />, height <Katex tex="y" />) rolls up into the cylinder's curved surface; the two circles of radius <Katex tex="r" /> become its top and bottom.</>,
  },
  {
    working: <Katex display tex="y = 2\pi r \;\implies\; r = \frac{y}{2\pi}" />,
    reason: <>The height <Katex tex="y" /> of the sheet becomes the circumference of the circular cross-section once rolled.</>,
  },
  {
    working: <Katex display tex="h = x - 4r" />,
    reason: <>The two end circles (diameter <Katex tex="2r" /> each) are cut from the two ends of the length <Katex tex="x" />, leaving <Katex tex="h" /> for the middle strip.</>,
  },
  {
    working: <Katex display tex="h = x - \frac{4y}{2\pi} = x - \frac{2y}{\pi}" />,
    reason: 'Substitute r in terms of y.',
  },
  {
    working: <Katex display tex="V = \pi r^2 h = \pi\left(\frac{y}{2\pi}\right)^2\left(x-\frac{2y}{\pi}\right)" />,
    reason: 'Standard cylinder volume formula.',
  },
  {
    working: <Katex display tex="= \frac{y^2}{4\pi}\left(x - \frac{2y}{\pi}\right) = \frac{xy^2}{4\pi} - \frac{2y^3}{4\pi^2}" />,
    reason: 'Expand.',
  },
  {
    working: <Katex display tex="\boxed{V = \frac{\pi xy^2 - 2y^3}{4\pi^2}}" />,
    reason: <>Common denominator <Katex tex="4\pi^2" /> — matches option <b>B</b>.</>,
  },
]

export default function MethodsQ17_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A cylinder of height <Katex tex="h" /> and radius <Katex tex="r" /> is formed from a thin rectangular
            sheet of metal of length <Katex tex="x" /> and width <Katex tex="y" />, by cutting along the dashed
            lines shown below.
          </p>
          <div className="mb-3">{DIAGRAM}</div>
          <p>The volume of the cylinder, in terms of <Katex tex="x" /> and <Katex tex="y" />, is given by</p>
        </>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\pi x^2 y" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi xy^2-2y^3}{4\pi^2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{2y^3-\pi xy^2}{4\pi^2}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\pi xy-2y^2}{2\pi}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{2y^2-\pi xy}{2\pi}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
