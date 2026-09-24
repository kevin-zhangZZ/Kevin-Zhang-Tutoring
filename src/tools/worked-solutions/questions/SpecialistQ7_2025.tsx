// 2025 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 79% correct. This
// year's paper used four options (A–D) rather than five. Rewriting a trigonometric integral
// under the substitution u = cos(θ). Question text transcribed from the original paper.
// Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 11, C: 6, D: 79 },
  answer: 'D',
  comment: (
    <>
      <Katex tex="u=\cos(\theta)\ \Rightarrow\ \dfrac{du}{d\theta}=-\sin(\theta)" />
      <br />
      <Katex tex="\theta=\dfrac{\pi}{2}\ \Rightarrow\ u=0" />
      <br />
      <Katex tex="\theta=0\ \Rightarrow\ u=1" />
      <br />
      <Katex tex="\dfrac{1}{2}\displaystyle\int_0^{\frac{\pi}{2}}\frac{\sin(2\theta)}{1+\cos(\theta)}\,d\theta=-\frac{1}{2}\int_1^0\frac{2u}{1+u}\,du" />
      <br />
      <Katex tex="=\displaystyle\int_0^1\frac{u}{1+u}\,du" />
      <br />
      <Katex tex="=\displaystyle\int_0^1 1-\frac{1}{1+u}\,du" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(2\theta) = 2\sin(\theta)\cos(\theta)" />,
    reason: <>The double-angle formula, so that a factor of sin(θ) appears ready for the substitution.</>,
  },
  {
    working: <Katex display tex="\frac{1}{2}\int_0^{\pi/2}\frac{2\sin\theta\cos\theta}{1+\cos\theta}\,d\theta = \int_0^{\pi/2}\frac{\cos\theta}{1+\cos\theta}\,\sin\theta\,d\theta" />,
    reason: <>The one-half cancels the two. Everything except sin(θ) dθ is now a function of cos(θ).</>,
  },
  {
    working: <Katex display tex="u = \cos(\theta) \implies \frac{du}{d\theta} = -\sin(\theta) \implies \sin(\theta)\,d\theta = -du" />,
    reason: <>The substitution given in the question.</>,
  },
  {
    working: <Katex display tex="\theta = 0 \implies u = 1, \qquad \theta = \frac{\pi}{2} \implies u = 0" />,
    reason: <>Change the terminals too — options A and C keep the old ones, which is the error to avoid.</>,
  },
  {
    working: <Katex display tex="\int_1^{0}\frac{u}{1+u}\,(-du) = \int_0^{1}\frac{u}{1+u}\,du" />,
    reason: <>The minus sign is absorbed by swapping the terminals.</>,
  },
  {
    working: <Katex display tex="\frac{u}{1+u} = \frac{(1+u)-1}{1+u} = 1-\frac{1}{1+u}" />,
    reason: <>Dividing through, since the numerator has the same degree as the denominator.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{1}\left(1-\frac{1}{1+u}\right)du}" />,
    reason: <>Matches option <b>D</b>. It evaluates to <Katex tex="1-\log_e(2)" />, which matches the original integral.</>,
  },
]

export default function SpecialistQ7_2025() {
  return (
    <MCQShell
      question={
        <p>
          Using the substitution <Katex tex="u = \cos(\theta)" />,{' '}
          <Katex tex="\dfrac{1}{2}\displaystyle\int_0^{\frac{\pi}{2}}\dfrac{\sin(2\theta)}{1+\cos(\theta)}\,d\theta" />{' '}
          can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\int_0^{\frac{\pi}{2}} u\sqrt{\frac{1-u}{1+u}}\,du" /> },
        { letter: 'B', content: <Katex tex="\int_0^{1}\left(1+\frac{1}{1+u}\right)du" /> },
        { letter: 'C', content: <Katex tex="\int_0^{\frac{\pi}{2}}\left(1-\frac{1}{1+u}\right)du" /> },
        { letter: 'D', content: <Katex tex="\int_0^{1}\left(1-\frac{1}{1+u}\right)du" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
