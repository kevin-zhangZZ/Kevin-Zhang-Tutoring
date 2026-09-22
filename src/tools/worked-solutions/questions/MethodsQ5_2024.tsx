// 2024 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 52% correct.
// The range of a composite: find the inner range first, then feed it through. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 9, C: 21, D: 52 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2-4x = (x-2)^2-4 \ \text{ on } (1,\infty)" />,
    reason: 'Complete the square to locate the vertex at (2, −4).',
  },
  {
    working: <Katex display tex="\text{ran}(f) = [-4,\infty)" />,
    reason: <>The vertex <Katex tex="x=2" /> lies inside <Katex tex="(1,\infty)" />, so the minimum <Katex tex="-4" /> is attained. (At the open end <Katex tex="x=1" />, <Katex tex="f=-3" />, which is above it anyway.)</>,
  },
  {
    working: <Katex display tex="g(u) = e^{-u} \ \text{ on } u\in[-4,\infty)" />,
    reason: 'Now feed that range through the outer function.',
  },
  {
    working: <Katex display tex="e^{-u} \text{ is decreasing}: \ u=-4 \mapsto e^{4}; \quad u\to\infty \mapsto 0^+" />,
    reason: <>So the largest value <Katex tex="e^4" /> is attained and 0 is approached but never reached.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(0,\ e^4\right]}" />,
    reason: <>Option <b>D</b>. Both details matter: the bracket at <Katex tex="e^4" /> is closed because the vertex is in the domain, and the exponent is 4 (not 3, which is what using <Katex tex="f(1)=-3" /> as the minimum would give).</>,
  },
]

export default function MethodsQ5_2024() {
  return (
    <MCQShell
      question={
        <p>
          Consider the functions <Katex tex="f:(1,\infty)\to\mathbb{R}" />,{' '}
          <Katex tex="f(x)=x^2-4x" /> and <Katex tex="g:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="g(x)=e^{-x}" />. The range of the composite function{' '}
          <Katex tex="g\bigl(f(x)\bigr)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(0,e^3\right)" /> },
        { letter: 'B', content: <Katex tex="\left(0,e^3\right]" /> },
        { letter: 'C', content: <Katex tex="\left(0,e^4\right)" /> },
        { letter: 'D', content: <Katex tex="\left(0,e^4\right]" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
