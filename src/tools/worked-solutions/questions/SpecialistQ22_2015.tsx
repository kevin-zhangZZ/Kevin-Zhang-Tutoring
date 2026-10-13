// 2015 Specialist Mathematics — Exam 2, MCQ 22. VCAA examination report: 42% correct.
// Time to maximum height under a velocity-dependent resistance — a tan^{-1} integral.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 23, C: 18, D: 42, E: 11 },
  answer: 'D',
  noAnswer: 2,
  comment: (
    <>
      <Katex tex="\tfrac{dt}{dv}=-\tfrac{1}{\left(9.8+0.1v^2\right)}" />,{' '}
      <Katex tex="t=-\tfrac{10}{\sqrt{98}}\tan^{-1}\!\left(\tfrac{v}{\sqrt{98}}\right)+c" />,{' '}
      <Katex tex="t=0" />, <Katex tex="v=0" />;{' '}
      <Katex tex="c=\tfrac{10}{\sqrt{98}}\times\tfrac\pi3" /> the required time, option D.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\ddot x = \frac{dv}{dt} = -\left(9.8+0.1v^2\right)" />,
    reason: <>The question asks for a <em>time</em>, so use the form of acceleration that involves <Katex tex="t" /> — not <Katex tex="v\tfrac{dv}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dv} = \frac{-1}{9.8+0.1v^2} = \frac{-10}{98+v^2}" />,
    reason: <>Inverting, then multiplying top and bottom by 10 to clear the decimals and expose the <Katex tex="\left(\sqrt{98}\right)^2+v^2" /> shape of the standard <Katex tex="\tan^{-1}" /> integral.</>,
  },
  {
    working: <Katex display tex="\int\frac{dv}{a^2+v^2} = \frac1a\tan^{-1}\!\left(\frac va\right)+c,\quad a = \sqrt{98}" />,
    reason: <>The standard form. <Katex tex="\sqrt{98}=7\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="t = -\frac{10}{\sqrt{98}}\tan^{-1}\!\left(\frac{v}{\sqrt{98}}\right)+c" />,
    reason: <>Antidifferentiating.</>,
  },
  {
    working: (
      <>
        <Katex display tex="t=0,\ v = 7\sqrt6:" />
        <Katex display tex="\frac{7\sqrt6}{7\sqrt2} = \sqrt3 \implies \tan^{-1}\!\left(\sqrt3\right) = \frac\pi3" />
      </>
    ),
    reason: <>The initial condition finds <Katex tex="c" />. The ratio simplifies to exactly <Katex tex="\sqrt3" />, an exact-value angle.</>,
  },
  {
    working: <Katex display tex="0 = -\frac{10}{\sqrt{98}}\times\frac\pi3+c \implies c = \frac{10}{\sqrt{98}}\times\frac\pi3" />,
    reason: <>Solving for the constant.</>,
  },
  {
    working: <Katex display tex="v = 0 \implies t = -\frac{10}{\sqrt{98}}\tan^{-1}(0)+c = c" />,
    reason: <>At the maximum height the ball is momentarily at rest, and <Katex tex="\tan^{-1}(0)=0" />, so the time is the constant itself.</>,
    more: <>The report's "<Katex tex="t=0" />, <Katex tex="v=0" />" compresses two separate conditions: <Katex tex="v=7\sqrt6" /> when <Katex tex="t=0" /> (which found <Katex tex="c" />), and <Katex tex="v=0" /> at the top (which shows the time taken is <Katex tex="c" />). The ball is not at rest at <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \frac{10\pi}{3\sqrt{98}} = \frac{10\pi}{21\sqrt2}}" />,
    reason: <>Matches option <b>D</b>, since <Katex tex="3\sqrt{98}=3\times7\sqrt2=21\sqrt2" />.</>,
    more: <>Check: numerically <Katex tex="t\approx1.06" /> s, under the <Katex tex="\tfrac{7\sqrt6}{9.8}\approx1.75" /> s it would take with no air resistance, as it must be. The most common wrong answer, B (23%), is exactly half the correct time: the usual slip is <Katex tex="\tan^{-1}\!\left(\sqrt3\right)=\tfrac\pi6" /> instead of <Katex tex="\tfrac\pi3" />, or losing a factor of 2 in <Katex tex="\tfrac{10}{\sqrt{98}}" /> (it comes from the 10 that cleared the decimals and the <Katex tex="\tfrac1a" /> in the standard form). Option A, <Katex tex="\tfrac\pi3" />, is the angle alone, with the factor <Katex tex="\tfrac{10}{\sqrt{98}}" /> dropped.</>,
  },
]

export default function SpecialistQ22_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A ball is thrown vertically up with an initial velocity of{' '}
            <Katex tex="7\sqrt6" /> ms<sup>−1</sup>, and is subject to gravity and air
            resistance. The acceleration of the ball is given by{' '}
            <Katex tex="\ddot x = -\left(9.8+0.1v^2\right)" />, where <Katex tex="x" /> metres
            is its vertical displacement, and <Katex tex="v" /> ms<sup>−1</sup> is its velocity
            at time <Katex tex="t" /> seconds.
          </p>
          <p>The time taken for the ball to reach its maximum height is</p>
        </>
      }
      background={
        <p>
          No forces are resolved here — the acceleration is handed to you, and everything after
          that is a separable differential equation whose integral is the standard{' '}
          <Katex tex="\tan^{-1}" /> form. Choosing <Katex tex="\tfrac{dv}{dt}" /> over{' '}
          <Katex tex="v\tfrac{dv}{dx}" /> is the one decision that matters: the other choice
          leads to a logarithm instead (the maximum <em>height</em> is{' '}
          <Katex tex="5\log_e(4)" /> metres), the kind of answer distractors C and E offer.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac\pi3" /> },
        { letter: 'B', content: <Katex tex="\dfrac{5\pi}{21\sqrt2}" /> },
        { letter: 'C', content: <Katex tex="\log_e(4)" /> },
        { letter: 'D', content: <Katex tex="\dfrac{10\pi}{21\sqrt2}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="10\log_e(4)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
