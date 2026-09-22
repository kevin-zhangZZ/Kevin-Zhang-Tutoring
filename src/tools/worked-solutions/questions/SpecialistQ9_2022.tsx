// 2022 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 66% correct.
// Euler's method run backwards to recover the step size. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 66, C: 13, D: 8, E: 6 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y_{n+1} = y_n + h\,f(x_n), \qquad f(x) = 2x^2" />,
    reason: <>Euler's method from the formula sheet. Here <Katex tex="f" /> depends only on <Katex tex="x" />, so each step is easy to write down.</>,
  },
  {
    working: <Katex display tex="y_1 = 2 + h\cdot2(1)^2 = 2+2h, \qquad x_1 = 1+h" />,
    reason: <>One step from <Katex tex="(x_0,y_0)=(1,2)" />.</>,
  },
  {
    working: <Katex display tex="y_2 = (2+2h)+h\cdot2(1+h)^2 = 2.976" />,
    reason: <>The second step uses <Katex tex="x_1=1+h" />, not <Katex tex="x_0" /> — forgetting to advance <Katex tex="x" /> is the usual slip.</>,
  },
  {
    working: <Katex display tex="2h^3+4h^2+4h+2 = 2.976" />,
    reason: 'Expanding. A cubic, but a CAS solves it instantly — or just test the five options.',
  },
  {
    working: <Katex display tex="h = 0.2: \ 2+0.4+0.4(1.2)^2 = 2+0.4+0.576 = 2.976 \ \checkmark" />,
    reason: 'Substituting is faster than solving and gives the same certainty.',
  },
  {
    working: <Katex display tex="\boxed{h = 0.2}" />,
    reason: <>Option <b>B</b>; the cubic's only real root.</>,
  },
]

export default function SpecialistQ9_2022() {
  return (
    <MCQShell
      question={
        <p>
          Euler's method is used to find an approximate solution to the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx}=2x^2" />. Given that <Katex tex="x_0=1" />,{' '}
          <Katex tex="y_0=2" /> and <Katex tex="y_2=2.976" />, the value of the step size{' '}
          <Katex tex="h" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.1" /> },
        { letter: 'B', content: <Katex tex="0.2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.3" /> },
        { letter: 'D', content: <Katex tex="0.4" /> },
        { letter: 'E', content: <Katex tex="0.5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
