// 2026 Specialist NHT — Exam 2, MCQ 16. The NHT report gives the answer key and a short comment
// only, with no statistics. Vectors: tan θ = √3 gives θ = π/3; the dot-product angle formula then
// gives a quadratic in p. Question text transcribed from the original paper. Solution is original;
// the answer B agrees with the report's key. sympy: 19p² − 64p − 155 = 0 has roots 5 and −31/19
// (both satisfy the unsquared equation; −31/19 is not a positive integer); the angle for p = 5 is
// exactly π/3, and for p = 4, 6, 7 it is 1.004, 1.086, 1.119 rad.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      <Katex tex="\underset{\sim}{a}\cdot\left(\underset{\sim}{b}-\underset{\sim}{c}\right)=\sqrt{p^2+17}\sqrt{42}\cos(\theta)" />
      <br />
      <Katex tex="p-4+20=\sqrt{p^2+17}\sqrt{42}\times\dfrac{1}{2}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\tan\theta=\sqrt3,\ \ 0\le\theta\le\pi\\ &\implies\theta=\frac{\pi}{3},\ \ \cos\theta=\frac12\end{aligned}" />,
    reason: <>The angle between two vectors lies in <Katex tex="[0,\pi]" />, and in that interval <Katex tex="\tan\theta=\sqrt3" /> only at <Katex tex="\tfrac{\pi}{3}" />. The dot product works with cosine, so convert.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{b}-\underset{\sim}{c}&=(-2+3)\underset{\sim}{i}+4\underset{\sim}{j}+(1+4)\underset{\sim}{k}\\ &=\underset{\sim}{i}+4\underset{\sim}{j}+5\underset{\sim}{k}\end{aligned}" />,
    reason: <>Subtract component by component; <Katex tex="\underset{\sim}{c}" /> has no <Katex tex="\underset{\sim}{j}" /> component.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{a}\cdot\left(\underset{\sim}{b}-\underset{\sim}{c}\right)&=p(1)+(-1)(4)+4(5)=p+16\\ |\underset{\sim}{a}|&=\sqrt{p^2+1+16}=\sqrt{p^2+17}\\ |\underset{\sim}{b}-\underset{\sim}{c}|&=\sqrt{1+16+25}=\sqrt{42}\end{aligned}" />,
  },
  {
    working: <Katex display tex="p+16=\sqrt{p^2+17}\,\sqrt{42}\times\frac12" />,
    reason: <>Use <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{w}=|\underset{\sim}{a}||\underset{\sim}{w}|\cos\theta" /> with <Katex tex="\underset{\sim}{w}=\underset{\sim}{b}-\underset{\sim}{c}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}4(p+16)^2&=42(p^2+17)\\ 4p^2+128p+1024&=42p^2+714\\ 38p^2-128p-310&=0\\ 19p^2-64p-155&=0\\ (p-5)(19p+31)&=0\end{aligned}" />,
    reason: <>Double both sides and square to clear the square root, then collect terms. On CAS, <Cas fn="solve">solve(p+16 = √(p²+17)·√42/2, p)</Cas> does it in one step.</>,
    more: <>Squaring can introduce false solutions, so each root should be checked in the unsquared equation. Both pass here (the left side <Katex tex="p+16" /> is positive for each), but only one is a positive integer.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&p=5\\ &\left(p=-\tfrac{31}{19}\ \text{rejected: not a positive integer}\right)\end{aligned}" />,
  },
  {
    working: <Katex display tex="\boxed{p=5}" />,
    reason: <>Matches option <b>B</b>. Check: <Katex tex="\tfrac{5+16}{\sqrt{42}\sqrt{42}}=\tfrac{21}{42}=\tfrac12" />, so <Katex tex="\cos\theta=\tfrac12" /> exactly.</>,
    more: <>Substituting the options directly also works in a multiple-choice question: for <Katex tex="p=4,\,6,\,7" /> the angle is about 1.00, 1.09 and 1.12 radians, not <Katex tex="\tfrac{\pi}{3}\approx1.047" />.</>,
  },
]

export default function SpecialistQ16_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider vectors <Katex tex="\underset{\sim}{a}=p\underset{\sim}{i}-\underset{\sim}{j}+4\underset{\sim}{k}" />,{' '}
          <Katex tex="\underset{\sim}{b}=-2\underset{\sim}{i}+4\underset{\sim}{j}+\underset{\sim}{k}" /> and{' '}
          <Katex tex="\underset{\sim}{c}=-3\underset{\sim}{i}-4\underset{\sim}{k}" />, where <Katex tex="p" /> is a positive
          integer.
          <br />
          Given <Katex tex="\tan\theta=\sqrt3" />, where <Katex tex="\theta" /> is the angle between{' '}
          <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}-\underset{\sim}{c}" />, the value of{' '}
          <Katex tex="p" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="4" /> },
        { letter: 'B', content: <Katex tex="5" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="6" /> },
        { letter: 'D', content: <Katex tex="7" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
