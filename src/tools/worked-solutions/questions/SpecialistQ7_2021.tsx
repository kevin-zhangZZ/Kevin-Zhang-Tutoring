// 2021 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 39% correct.
// Shortest distance along a parametrically-defined circle between two given points. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 18, C: 10, D: 23, E: 39 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x(t) = 5\cos(2t)+1,\qquad y(t)=5\sin(2t)-1" />,
    reason: <>A circle of radius <Katex tex="5" /> centred at <Katex tex="(1,-1)" />, traced with angular speed <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="A(6,-1):\ \cos(2t)=1,\ \sin(2t)=0 \;\implies\; 2t=0 \;\implies\; t=0" />,
    reason: <>Find the parameter value at <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="B(1,4):\ \cos(2t)=0,\ \sin(2t)=1 \;\implies\; 2t=\tfrac{\pi}{2} \;\implies\; t=\tfrac{\pi}{4}" />,
    reason: <>Find the parameter value at <Katex tex="B" />.</>,
  },
  {
    working: <Katex display tex="\Delta(2t) = \tfrac{\pi}{2} - 0 = \tfrac{\pi}{2}" />,
    reason: <>The angle swept around the circle's centre going directly from <Katex tex="A" /> to <Katex tex="B" /> — a quarter of a full revolution.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{arc length} = r\times\Delta(2t) = 5\times\tfrac{\pi}{2} = \tfrac{5\pi}{2}}" />,
    reason: <>A quarter of the circle's circumference is shorter than going the other way round (three-quarters) — matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ7_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">A relation is defined parametrically by</p>
          <p className="mb-2">
            <Katex tex="x(t) = 5\cos(2t)+1 \qquad y(t) = 5\sin(2t)-1" />
          </p>
          <p>
            If <Katex tex="A(6,-1)" /> and <Katex tex="B(1,4)" /> are two points that lie on the graph of the relation,
            then the shortest distance along the graph from <Katex tex="A" /> to <Katex tex="B" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{\pi}{4}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{\pi}{2}" /> },
        { letter: 'C', content: <Katex tex="\pi" /> },
        { letter: 'D', content: <Katex tex="\tfrac{5\pi}{4}" /> },
        { letter: 'E', content: <Katex tex="\tfrac{5\pi}{2}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
