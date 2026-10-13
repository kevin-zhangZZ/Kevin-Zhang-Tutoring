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
      <Katex tex="a=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)=2x^3-6x,\quad F=3a" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a = v\frac{dv}{dx}" />,
    reason: <>Velocity is given as a function of position <Katex tex="x" />, not time, so use this form of acceleration.</>,
    more: <>Acceleration is <Katex tex="\tfrac{dv}{dt}" />, but with <Katex tex="v" /> in terms of <Katex tex="x" /> the chain rule gives <Katex tex="\tfrac{dv}{dt}=\tfrac{dv}{dx}\cdot\tfrac{dx}{dt}=v\tfrac{dv}{dx}" />.</>,
  },
  {
    working: <Katex display tex="v = 3-x^2 \implies \frac{dv}{dx} = -2x" />,
    reason: <>Differentiate with respect to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="a = \left(3-x^2\right)(-2x) = 2x^3-6x" />,
    reason: <>Multiply by <Katex tex="v" /> and expand.</>,
    more: <>The examiners' version, <Katex tex="a=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)=\tfrac{d}{dx}\!\left(\tfrac12(3-x^2)^2\right)" />, is the same formula written another way and gives the same result.</>,
  },
  {
    working: <Katex display tex="F = ma = 3\left(2x^3-6x\right)" />,
    reason: <>The question asks for force, not acceleration: force is mass times acceleration, with <Katex tex="m=3" /> kg.</>,
  },
  {
    working: <Katex display tex="\boxed{F = 6x^3-18x}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: (
      <>
        Option B (23%), <Katex tex="-6x" />, is <Katex tex="3\tfrac{dv}{dx}" />: the right mass
        but <Katex tex="\tfrac{dv}{dx}" /> used as the acceleration, missing the factor of{' '}
        <Katex tex="v" />. Option A, <Katex tex="-2x" />, is <Katex tex="\tfrac{dv}{dx}" /> alone.
        Option C (11%) is the correct acceleration with the mass left out. Option E,{' '}
        <Katex tex="9x-3x^3=3x\left(3-x^2\right)" />, is <Katex tex="3xv" />, which is not
        an acceleration at all.
      </>
    ),
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
          <Katex tex="a=v\tfrac{dv}{dx}" /> conversion from velocity in terms of position
          to acceleration. The skip guide lists it as doable for that reason.
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
