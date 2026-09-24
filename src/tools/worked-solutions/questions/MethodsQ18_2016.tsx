// 2016 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 62% correct.
// Solving Pr(X < a) for a cosine density supported on [3π, 5π]. Question text transcribed
// from the original paper; answer verified with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 62, C: 17, D: 8, E: 5 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<a) = \int_{3\pi}^{a}\frac14\cos\!\left(\frac{x}{2}\right)dx" />,
    reason: <>The density is zero below <Katex tex="3\pi" />, so that is the lower terminal — not <Katex tex="-\infty" /> and not <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="= \left[\frac12\sin\!\left(\frac{x}{2}\right)\right]_{3\pi}^{a}" />,
    reason: <>Antidifferentiating: <Katex tex="\tfrac14\times2=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="= \frac12\sin\!\left(\frac{a}{2}\right)-\frac12\sin\!\left(\frac{3\pi}{2}\right) = \frac12\sin\!\left(\frac{a}{2}\right)+\frac12" />,
    reason: <>Since <Katex tex="\sin\!\left(\tfrac{3\pi}{2}\right)=-1" />.</>,
  },
  {
    working: <Katex display tex="\frac12\sin\!\left(\frac{a}{2}\right)+\frac12 = \frac{\sqrt3+2}{4}" />,
    reason: <>Setting it equal to the given probability.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\frac{a}{2}\right) = \frac{\sqrt3+2}{2}-1 = \frac{\sqrt3}{2}" />,
    reason: <>Multiply by <Katex tex="2" /> and subtract <Katex tex="1" />. A recognisable exact value, which is the sign the algebra is on track.</>,
  },
  {
    working: <Katex display tex="3\pi\le a\le5\pi \implies \frac{3\pi}{2}\le\frac{a}{2}\le\frac{5\pi}{2}" />,
    reason: <>Halving the domain gives the interval to search for <Katex tex="\tfrac{a}{2}" />. Skipping this is what puts the answer in the wrong revolution.</>,
  },
  {
    working: <Katex display tex="\frac{a}{2} = 2\pi+\frac{\pi}{3} = \frac{7\pi}{3}" />,
    reason: <>The only solution of <Katex tex="\sin\theta=\tfrac{\sqrt3}{2}" /> in that interval: the companion <Katex tex="2\pi+\tfrac{2\pi}{3}" /> is just past <Katex tex="\tfrac{5\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac{14\pi}{3}}" />,
    reason: <>Matches option <b>B</b>. Check it lies in <Katex tex="[3\pi,5\pi]=[9.42,15.71]" />: <Katex tex="\tfrac{14\pi}{3}\approx14.66" /> ✓.</>,
  },
]

export default function MethodsQ18_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The continuous random variable <Katex tex="X" /> has a probability density
            function given by
          </p>
          <div className="mb-2">
            <Katex
              display
              tex="f(x)=\begin{cases}\dfrac14\cos\!\left(\dfrac{x}{2}\right) & 3\pi\le x\le5\pi\\[6pt] 0 & \text{elsewhere}\end{cases}"
            />
          </div>
          <p>
            The value of <Katex tex="a" /> such that{' '}
            <Katex tex="\Pr(X<a)=\dfrac{\sqrt3+2}{4}" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{19\pi}{6}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{14\pi}{3}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{10\pi}{3}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{29\pi}{6}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{17\pi}{3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
