// 2018 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 49% correct.
// Set up the defining equation for the median of a given probability density function.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 9, C: 12, D: 19, E: 49 },
  answer: 'E',
  noAnswer: 1,
  comment: <>Solve <Katex tex="\displaystyle\int_0^m f(x)\,dx = 0.5" />: <Katex tex="4m^2-\tfrac{m^4}{4}=6 \implies m^4-16m^2+24=0" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{1}{12}\bigl(8x-x^3\bigr), \qquad 0\le x\le2" />,
    reason: 'The given density function.',
  },
  {
    working: <Katex display tex="\int_0^m f(x)\,dx = 0.5" />,
    reason: <>By definition, the median <Katex tex="m" /> splits the area under a pdf exactly in half.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_0^m \frac{1}{12}\bigl(8x-x^3\bigr)dx = \frac{1}{12}\left[4x^2-\frac{x^4}{4}\right]_0^m" />
        <Katex display tex="= \frac{1}{12}\left(4m^2-\frac{m^4}{4}\right)" />
      </>
    ),
    reason: 'Find the antiderivative and evaluate at the limits.',
  },
  {
    working: (
      <>
        <Katex display tex="\frac{1}{12}\left(4m^2-\frac{m^4}{4}\right) = 0.5" />
        <Katex display tex="\implies\; 4m^2-\frac{m^4}{4} = 6" />
      </>
    ),
    reason: 'Multiply both sides by 12.',
  },
  {
    working: (
      <>
        <Katex display tex="16m^2-m^4 = 24" />
        <Katex display tex="\implies\; m^4-16m^2+24=0" />
      </>
    ),
    reason: 'Multiply by 4, then rearrange into the standard form the options use.',
  },
  {
    working: <Katex display tex="\boxed{m^4-16m^2+24=0}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function MethodsQ15_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A probability density function, <Katex tex="f" />, is given by
          </p>
          <Katex display tex="f(x) = \begin{cases} \tfrac{1}{12}(8x-x^3) & 0\le x\le2 \\ 0 & \text{elsewhere} \end{cases}" className="my-2" />
          <p>The median, <Katex tex="m" />, of this function satisfies the equation</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="-m^4+16m^2-6=0" /> },
        { letter: 'B', content: <Katex tex="-m^4+4m^2-6=0" /> },
        { letter: 'C', content: <Katex tex="m^4-16m^2=0" /> },
        { letter: 'D', content: <Katex tex="m^4-16m^2+24=0.5" /> },
        { letter: 'E', content: <Katex tex="m^4-16m^2+24=0" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
