// 2020 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 70% correct. The
// y-intercept of a rational function is also a stationary point. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 8, C: 6, D: 70, E: 11 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{(x-a)(x+3)}{x-2} = \frac{x^2+(3-a)x-3a}{x-2}" />,
    reason: <>Expanding the numerator first makes the quotient rule far less messy than differentiating the factorised form.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{(2x+3-a)(x-2)-\left(x^2+(3-a)x-3a\right)}{(x-2)^2}" />,
    reason: <>Quotient rule.</>,
  },
  {
    working: <Katex display tex="f'(0) = \frac{(3-a)(-2)-(-3a)}{4} = \frac{-6+2a+3a}{4}" />,
    reason: <>Only <Katex tex="x=0" /> is needed, so substitute straight away rather than simplifying the general expression.</>,
  },
  {
    working: <Katex display tex="\frac{5a-6}{4} = 0" />,
    reason: <>The y-intercept is a stationary point, so the derivative vanishes there.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac65}" />,
    reason: <>Matches option <b>D</b>. Check: <Katex tex="a=\tfrac65" /> puts the <Katex tex="y" />-intercept at <Katex tex="\left(0,\tfrac95\right)" />, safely away from the asymptote at <Katex tex="x=2" />. Option <b>B</b> has the sign wrong; the others do not make <Katex tex="5a-6" /> zero.</>,
  },
]

export default function SpecialistQ1_2020() {
  return (
    <MCQShell
      question={
        <p>
          The <Katex tex="y" />-intercept of the graph of <Katex tex="y=f(x)" />, where{' '}
          <Katex tex="f(x)=\dfrac{(x-a)(x+3)}{x-2}" />, is also a stationary point when{' '}
          <Katex tex="a" /> equals
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-2" /> },
        { letter: 'B', content: <Katex tex="-\tfrac65" /> },
        { letter: 'C', content: <Katex tex="0" /> },
        { letter: 'D', content: <Katex tex="\tfrac65" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
