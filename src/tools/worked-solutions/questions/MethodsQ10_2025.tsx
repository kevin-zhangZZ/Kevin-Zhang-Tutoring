// 2025 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 57% correct.
// A quadratic inequality in sin(x), clipped to the range of sine. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 15, C: 57, D: 17 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(f\circ g)(x) = f\bigl(\sin(x)\bigr) = 2\sin^2(x)+\sin(x)-1" />,
    reason: <>Substituting <Katex tex="\sin(x)" /> into <Katex tex="2x^2+x-1" />. Note the order: <Katex tex="g" /> goes inside.</>,
  },
  {
    working: <Katex display tex="\text{let } u = \sin(x): \quad 2u^2+u-1>0" />,
    reason: 'An ordinary quadratic inequality in u.',
  },
  {
    working: <Katex display tex="2u^2+u-1 = (2u-1)(u+1) > 0" />,
    reason: <>Roots <Katex tex="u=\tfrac12" /> and <Katex tex="u=-1" />.</>,
  },
  {
    working: <Katex display tex="\text{upward parabola} \implies u<-1 \ \text{ or } \ u>\tfrac12" />,
    reason: 'Positive outside the roots.',
  },
  {
    working: <Katex display tex="u = \sin(x) \in [-1,1] \implies u<-1 \text{ is impossible}" />,
    reason: <>And <Katex tex="u=-1" /> itself gives zero, not a positive value, so it is excluded too.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac12 < \sin(x) \le 1}" />,
    reason: <>Option <b>C</b>. The upper bound is closed because <Katex tex="\sin(x)=1" /> is attainable and gives <Katex tex="2+1-1=2>0" /> ✓.</>,
  },
]

export default function MethodsQ10_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            Consider <Katex tex="f:\mathbb{R}\to\mathbb{R}" />,{' '}
            <Katex tex="f(x)=2x^2+x-1" /> and <Katex tex="g:\mathbb{R}\to\mathbb{R}" />,{' '}
            <Katex tex="g(x)=\sin(x)" />.
          </p>
          <p>
            The inequality <Katex tex="(f\circ g)(x)>0" /> is satisfied when
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sin(x)\le-1" /> },
        { letter: 'B', content: <Katex tex="-1<\sin(x)<0" /> },
        { letter: 'C', content: <Katex tex="\tfrac12<\sin(x)\le1" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0<\sin(x)<\tfrac12" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
