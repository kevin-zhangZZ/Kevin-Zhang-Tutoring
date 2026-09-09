// 2018 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 49% correct.
// Find cosec(-x) given cos(x) and cot(x), working entirely from trig identities (no calculator
// angle needed).
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 49, B: 22, C: 14, D: 12, E: 4 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(x) = -a, \qquad \cot(x) = \frac{\cos(x)}{\sin(x)} = b" />,
    reason: <>Both <Katex tex="a,b>0" /> are given as positive — the negative sign sits explicitly on <Katex tex="\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="\sin(x) = \frac{\cos(x)}{b} = \frac{-a}{b}" />,
    reason: <>Rearrange the definition of <Katex tex="\cot(x)" /> to isolate <Katex tex="\sin(x)" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{cosec}(x) = \frac{1}{\sin(x)} = \frac{1}{-a/b} = -\frac{b}{a}" />,
  },
  {
    working: <Katex display tex="\mathrm{cosec}(-x) = -\mathrm{cosec}(x)" />,
    reason: <>Cosecant is an odd function, since <Katex tex="\sin(-x)=-\sin(x)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{cosec}(-x) = -\left(-\frac{b}{a}\right) = \frac{b}{a}}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ4_2018() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\cos(x) = -a" /> and <Katex tex="\cot(x) = b" />, where <Katex tex="a,b>0" />, then{' '}
          <Katex tex="\mathrm{cosec}(-x)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{b}{a}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-\dfrac{b}{a}" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{a}{b}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{a}{b}" /> },
        { letter: 'E', content: <Katex tex="-ab" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
