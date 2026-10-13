// 2014 Specialist Mathematics — Exam 2, MCQ 21. VCAA examination report: 52% correct.
// Acceleration as a function of displacement, integrated to a speed. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 52, B: 14, C: 11, D: 17, E: 5 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\dfrac{d\left(\tfrac12v^2\right)}{dx}=-4x" />,{' '}
      <Katex tex="\tfrac12v^2=-2x^2+50" />, <Katex tex="x=3" />, speed <Katex tex="=8" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{d}{dx}\!\left(\tfrac12v^2\right) = -4x" />,
    reason: <>Acceleration is given in terms of <Katex tex="x" /> and speed is wanted at a value of <Katex tex="x" />, so use this form of <Katex tex="a" />: time never enters.</>,
    more: (
      <>
        Why this form works: by the chain rule,{' '}
        <Katex tex="a=\dfrac{dv}{dt}=\dfrac{dv}{dx}\cdot\dfrac{dx}{dt}=v\dfrac{dv}{dx}=\dfrac{d}{dx}\!\left(\tfrac12v^2\right)" />.
        The other forms, <Katex tex="\tfrac{dv}{dt}" /> or <Katex tex="\tfrac{d^2x}{dt^2}" />, would
        need <Katex tex="a" /> as a function of <Katex tex="t" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\tfrac12v^2 = -2x^2+c" />,
    reason: <>Integrating with respect to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="x = 5,\ v = 0:\quad 0 = -50+c \implies c = 50" />,
    reason: <>"At rest where <Katex tex="x=5" />" means <Katex tex="v=0" /> when <Katex tex="x=5" />, which fixes the constant.</>,
  },
  {
    working: <Katex display tex="x = 3:\quad \tfrac12v^2 = -2(9)+50 = 32" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="v^2 = 64" />,
    reason: <>Double both sides to clear the <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{8\ \text{ms}^{-1}}" />,
    reason: <>Matches option <b>A</b>; speed is the positive square root.</>,
    more: (
      <>
        The distractors: D (17%, the most popular wrong answer), <Katex tex="4\sqrt2" />, forgets
        the <Katex tex="\tfrac12" /> and takes <Katex tex="v^2=32" />. B, <Katex tex="8\sqrt2" />,
        antidifferentiates <Katex tex="-4x" /> as <Katex tex="-4x^2" /> (no halving), giving{' '}
        <Katex tex="\tfrac12v^2=-4x^2+100" /> and <Katex tex="v^2=128" />. E,{' '}
        <Katex tex="2\sqrt{34}" />, loses the minus sign when substituting: <Katex tex="\tfrac12v^2=2(9)+50=68" />.
        C, 12, matches no standard slip in the working; it is the size of the acceleration at{' '}
        <Katex tex="x=3" />, <Katex tex="|-4(3)|" />, not a speed.
        Sanity check: <Katex tex="v^2=4\left(25-x^2\right)" />, so the speed is 0 at{' '}
        <Katex tex="x=\pm5" /> and greatest, 10, at the origin — 8 at <Katex tex="x=3" /> sits
        sensibly between.
      </>
    ),
  },
]

export default function SpecialistQ21_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The acceleration, in ms<sup>−2</sup>, of a particle moving in a straight line is
            given by <Katex tex="-4x" />, where <Katex tex="x" /> metres is its displacement
            from a fixed origin <Katex tex="O" />.
          </p>
          <p>
            If the particle is at rest where <Katex tex="x=5" />, the speed of the particle,
            in ms<sup>−1</sup>, where <Katex tex="x=3" /> is
          </p>
        </>
      }
      background={
        <p>
          No forces appear here — the acceleration is handed to you as a function of
          displacement, and the whole question is choosing the right form of{' '}
          <Katex tex="a" /> and integrating once.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="8" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="8\sqrt2" /> },
        { letter: 'C', content: <Katex tex="12" /> },
        { letter: 'D', content: <Katex tex="4\sqrt2" /> },
        { letter: 'E', content: <Katex tex="2\sqrt{34}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
