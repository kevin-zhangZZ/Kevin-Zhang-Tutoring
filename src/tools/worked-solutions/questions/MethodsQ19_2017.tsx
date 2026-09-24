// 2017 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 59% correct.
// A probability density function supported on an interval of width 1, solved for its left
// endpoint. Question text transcribed from the original paper; answer verified with sympy.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 17, C: 9, D: 59, E: 8 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_k^{k+1}\bigl(\cos(x)+1\bigr)dx = 1" />,
    reason: <>The defining property of a probability density function: the total area under it is <Katex tex="1" />. Outside <Katex tex="(k,k+1)" /> the function is zero, so only that interval contributes.</>,
  },
  {
    working: <Katex display tex="\Bigl[\sin(x)+x\Bigr]_k^{k+1} = 1" />,
    reason: <>Antidifferentiating.</>,
  },
  {
    working: <Katex display tex="\sin(k+1)+(k+1)-\sin(k)-k = 1" />,
    reason: <>Substituting the terminals.</>,
  },
  {
    working: <Katex display tex="\sin(k+1)-\sin(k) = 0" />,
    reason: <>The <Katex tex="k" /> terms cancel and the <Katex tex="+1" /> matches the right-hand side — which is the whole trick. The interval has width <Katex tex="1" />, so the "<Katex tex="+1" />" part of the density contributes exactly <Katex tex="1" /> on its own, leaving the cosine to contribute nothing.</>,
  },
  {
    working: <Katex display tex="\sin(k+1)=\sin(k)" />,
    reason: <>Two angles with the same sine are either equal (impossible, since they differ by <Katex tex="1" />) or supplementary.</>,
  },
  {
    working: <Katex display tex="k+1 = \pi-k" />,
    reason: <>The supplementary case (the general solution adds multiples of <Katex tex="2\pi" />, but only this one gives <Katex tex="0<k<2" />).</>,
  },
  {
    working: <Cas fn="solve">solve(∫(cos(x)+1, x, k, k+1) = 1, k) | 0&lt;k&lt;2</Cas>,
    reason: <>Or go straight there on CAS. The domain restriction matters — without it you get an infinite family of solutions.</>,
  },
  {
    working: <Katex display tex="2k = \pi-1 \implies \boxed{k=\frac{\pi-1}{2}}" />,
    reason: <>Matches option <b>D</b>, about <Katex tex="1.07" /> — comfortably inside the given <Katex tex="0<k<2" />. Option B, <Katex tex="\tfrac{3\pi-1}{2}\approx4.2" />, is another solution of <Katex tex="\sin(k+1)=\sin(k)" /> but lies outside that interval.</>,
  },
]

export default function MethodsQ19_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A probability density function <Katex tex="f" /> is given by
          </p>
          <div className="mb-2">
            <Katex
              display
              tex="f(x)=\begin{cases}\cos(x)+1 & k<x<(k+1)\\ 0 & \text{elsewhere}\end{cases}"
            />
          </div>
          <p className="mb-2">
            where <Katex tex="0<k<2" />.
          </p>
          <p>
            The value of <Katex tex="k" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="\dfrac{3\pi-1}{2}" /> },
        { letter: 'C', content: <Katex tex="\pi-1" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\pi-1}{2}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{\pi}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
