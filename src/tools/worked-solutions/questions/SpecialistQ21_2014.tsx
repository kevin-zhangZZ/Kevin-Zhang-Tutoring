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
    reason: <>The question gives acceleration in terms of <em>displacement</em> and asks for speed at a displacement, so time never enters. This is the form of <Katex tex="a" /> to reach for.</>,
  },
  {
    working: <Katex display tex="\tfrac12v^2 = -2x^2+c" />,
    reason: <>Integrating with respect to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="x = 5,\ v = 0:\quad 0 = -50+c \implies c = 50" />,
    reason: <>"At rest" fixes the constant.</>,
  },
  {
    working: <Katex display tex="x = 3:\quad \tfrac12v^2 = -2(9)+50 = 32" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="v^2 = 64" />,
    reason: <>Doubling. Forgetting the <Katex tex="\tfrac12" /> gives <Katex tex="v^2=32" /> and option D, <Katex tex="4\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{8\ \text{ms}^{-1}}" />,
    reason: <>Option A. (The motion is simple harmonic with amplitude 5 and <Katex tex="n=2" />, so the maximum speed is <Katex tex="10" /> at the origin — and <Katex tex="8" /> at <Katex tex="x=3" /> fits the <Katex tex="3" />–<Katex tex="4" />–<Katex tex="5" /> pattern exactly.)</>,
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
