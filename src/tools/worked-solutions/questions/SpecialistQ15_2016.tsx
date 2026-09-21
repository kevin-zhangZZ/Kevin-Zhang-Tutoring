// 2016 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 58% correct.
// Converting v = f(x) into an acceleration, then a force. The only mechanics is the
// single substitution F = ma; the rest is the standard a = v dv/dx conversion, which is
// current. The skip guide already lists this question as doable for that reason.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 23, C: 11, D: 58, E: 5 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="a=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)=2x^3-6x" />, and{' '}
      <Katex tex="F=3a" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a = v\frac{dv}{dx}" />,
    reason: <>Velocity is given as a function of <Katex tex="x" />, so this is the form of acceleration to use — no <Katex tex="t" /> appears anywhere in the question.</>,
  },
  {
    working: <Katex display tex="v = 3-x^2 \implies \frac{dv}{dx} = -2x" />,
    reason: <>Differentiating with respect to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="a = \left(3-x^2\right)(-2x) = 2x^3-6x" />,
    reason: <>Expanding. Equivalently <Katex tex="\tfrac{d}{dx}\!\left(\tfrac12v^2\right)=\tfrac{d}{dx}\!\left(\tfrac12(3-x^2)^2\right)" />, which gives the same thing.</>,
  },
  {
    working: <Katex display tex="F = ma = 3\left(2x^3-6x\right)" />,
    reason: <>The one piece of mechanics in the question: force is mass times acceleration. Stopping at the acceleration lands on option C.</>,
  },
  {
    working: <Katex display tex="\boxed{F = 6x^3-18x}" />,
    reason: <>Option D. Option B, <Katex tex="-6x" />, comes from using <Katex tex="\tfrac{dv}{dx}" /> as the acceleration and forgetting the factor of <Katex tex="v" />.</>,
  },
]

export default function SpecialistQ15_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A variable force of <Katex tex="F" /> newtons acts on a <Katex tex="3" /> kg mass
            so that it moves in a straight line. At time <Katex tex="t" /> seconds,{' '}
            <Katex tex="t\ge0" />, its velocity <Katex tex="v" /> metres per second and
            position <Katex tex="x" /> metres from the origin are given by{' '}
            <Katex tex="v=3-x^2" />.
          </p>
          <p>It follows that</p>
        </>
      }
      background={
        <p>
          <strong>On the mechanics.</strong> Force analysis is off the current study design,
          but this question needs only one substitution — force equals mass times
          acceleration — and everything else is the standard{' '}
          <Katex tex="a=v\tfrac{dv}{dx}" /> conversion from velocity-as-a-function-of-
          position to acceleration. The skip guide lists it as doable for that reason.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="F=-2x" /> },
        { letter: 'B', content: <Katex tex="F=-6x" /> },
        { letter: 'C', content: <Katex tex="F=2x^3-6x" /> },
        { letter: 'D', content: <Katex tex="F=6x^3-18x" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="F=9x-3x^3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
