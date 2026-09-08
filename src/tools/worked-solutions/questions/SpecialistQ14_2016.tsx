// 2016 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 41% correct —
// the second-hardest MCQ in the 2014-2016 Specialist Exam 2 papers.
// A mass hangs in equilibrium from two strings of different lengths; find the tension ratio.
// Question text/diagram transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 41, C: 10, D: 7, E: 36 },
  answer: 'B',
  noAnswer: 1,
  comment: 'Draw a diagram showing forces. The ratio of force magnitudes is not the ratio of string lengths.',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="3^2+4^2=5^2" />,
    reason: <>The 3 m, 4 m and 5 m sides form a right-angled triangle — the angle at the mass, between the two strings, is <Katex tex="90°" />.</>,
  },
  {
    working: <Katex display tex="A=(0,0), \ B=(5,0), \ M=(x,-y): \quad x^2+y^2=9, \ (x-5)^2+y^2=16" />,
    reason: <>Set up coordinates with the bar along the top, <Katex tex="A" /> where the 3 m string attaches and <Katex tex="B" /> where the 4 m string attaches, mass at <Katex tex="M" />.</>,
  },
  {
    working: <Katex display tex="(x-5)^2-x^2 = 16-9 \;\implies\; -10x+25=7 \;\implies\; x=1.8, \quad y=2.4" />,
    reason: 'Subtract the two circle equations to solve for the position of the mass.',
  },
  {
    working: <Katex display tex="\hat{T_2} = \frac{A-M}{3} = (-0.6,\,0.8), \qquad \hat{T_1} = \frac{B-M}{4} = (0.8,\,0.6)" />,
    reason: <>Unit vectors along each string, pointing from the mass up to where it's tied — these give the direction each tension acts in.</>,
  },
  {
    working: <Katex display tex="\text{Horizontal equilibrium:} \quad 0.8\,T_1 - 0.6\,T_2 = 0" />,
    reason: 'The mass is stationary, so the horizontal components of the two tensions must balance each other exactly (nothing else acts horizontally).',
  },
  {
    working: <Katex display tex="\boxed{\dfrac{T_1}{T_2} = \dfrac{0.6}{0.8} = \dfrac{3}{4}}" />,
    reason: <>Matches option <b>B</b>. Note the ratio is the reverse of the string-length ratio <Katex tex="4:3" /> — the shorter string carries more of the horizontal pull, which is the trap this question sets.</>,
  },
]

export default function SpecialistQ14_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            Two light strings of length 4 m and 3 m connect a mass to a horizontal bar, as shown below. The
            strings are attached to the horizontal bar 5 m apart.
          </p>
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex justify-center">
            <StringsDiagram />
          </div>
          <p className="mt-3">
            Given the tension in the longer string is <Katex tex="T_1" /> and the tension in the shorter
            string is <Katex tex="T_2" />, the ratio of the tensions <Katex tex="\dfrac{T_1}{T_2}" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{3}{5}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{3}{4}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{4}{5}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{5}{4}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{4}{3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}

// Bar at top, mass hanging below joined by the 4 m string (right, T1) and 3 m string (left, T2),
// 5 m apart along the bar — matches the geometry in the original exam diagram.
function StringsDiagram() {
  return (
    <svg viewBox="0 0 280 200" width={260} height={186}>
      <line x1={30} y1={30} x2={250} y2={30} stroke="#111827" strokeWidth={2} className="dark:stroke-gray-200" />
      <text x={130} y={22} fontSize={12} className="fill-gray-700 dark:fill-gray-300">5 m</text>
      <line x1={30} y1={30} x2={130} y2={140} stroke="#0ea5e9" strokeWidth={2} />
      <line x1={250} y1={30} x2={130} y2={140} stroke="#f97316" strokeWidth={2} />
      <text x={62} y={90} fontSize={12} className="fill-sky-600 dark:fill-sky-400">3 m</text>
      <text x={175} y={90} fontSize={12} className="fill-orange-600 dark:fill-orange-400">4 m</text>
      <text x={78} y={72} fontSize={13} className="fill-sky-700 dark:fill-sky-300">T₂</text>
      <text x={168} y={65} fontSize={13} className="fill-orange-700 dark:fill-orange-300">T₁</text>
      <rect x={116} y={140} width={28} height={28} fill="none" stroke="#111827" strokeWidth={2} className="dark:stroke-gray-200" />
      <text x={95} y={188} fontSize={12} className="fill-gray-700 dark:fill-gray-300">mass</text>
    </svg>
  )
}
