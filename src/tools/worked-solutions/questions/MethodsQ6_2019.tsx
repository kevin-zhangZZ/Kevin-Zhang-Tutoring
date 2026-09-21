// 2019 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 63% correct. Maximising
// the volume of an open-top box folded from a cut-cornered rectangular sheet. Question text
// transcribed from the original paper; the diagram is cropped directly from the original VCAA
// exam PDF, not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2019-mcq6-cardboard.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 9, C: 7, D: 12, E: 8 },
  noAnswer: 1,
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V(x) = x(80-2x)(50-2x), \qquad 0<x<25" />,
    reason: <>Cutting an <Katex tex="x" />-cm square from each corner leaves a base <Katex tex="(80-2x)\times(50-2x)" /> and a height of <Katex tex="x" /> once the sides fold up.</>,
  },
  {
    working: <Katex display tex="\text{Maximise } V(x) \text{ on } (0,25) \text{ (by CAS)}" />,
  },
  {
    working: <Katex display tex="\boxed{x=10}" />,
    reason: <>Matches option <b>A</b> (the other stationary point, <Katex tex="x=\tfrac{100}{3}\approx33.3" />, lies outside the valid domain).</>,
  },
]

export default function MethodsQ6_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A rectangular sheet of cardboard has a length of <Katex tex="80" /> cm and a width of{' '}
            <Katex tex="50" /> cm. Squares, of side length <Katex tex="x" /> centimetres, are cut
            from each of the corners. A rectangular box with an open top is then constructed.
          </p>
          <p>The volume of the box is a maximum when <Katex tex="x" /> is equal to</p>
        </>
      }
      diagram={<img src={diagramSrc} alt="Rectangular 80cm by 50cm sheet with x cm squares cut from each corner, from the original 2019 VCAA exam paper" className="w-full max-w-[320px]" />}
      options={[
        { letter: 'A', content: <Katex tex="10" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="20" /> },
        { letter: 'C', content: <Katex tex="25" /> },
        { letter: 'D', content: <Katex tex="\dfrac{100}{3}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{200}{3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
