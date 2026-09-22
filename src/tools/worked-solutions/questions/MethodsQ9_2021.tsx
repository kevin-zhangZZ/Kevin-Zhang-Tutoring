// 2021 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 56% correct.
// The range of a composite function on a restricted domain. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 7, C: 4, D: 10, E: 56 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = f\bigl(g(x)\bigr) = (x+2)^2-4" />,
    reason: <>Substituting <Katex tex="g" /> into <Katex tex="f" /> — a parabola with vertex <Katex tex="(-2,-4)" />.</>,
  },
  {
    working: <Katex display tex="x \in [-5,-1) \implies x+2 \in [-3,1)" />,
    reason: 'Shifting the domain.',
  },
  {
    working: <Katex display tex="(x+2)^2: \ \text{minimum } 0 \text{ at } x=-2, \ \text{maximum } 9 \text{ at } x=-5" />,
    reason: <>Both are <em>attained</em>: <Katex tex="x=-2" /> is inside the domain and <Katex tex="x=-5" /> is its closed end. The open end <Katex tex="x\to-1^-" /> gives <Katex tex="(x+2)^2\to1" />, which is not an extreme.</>,
  },
  {
    working: <Katex display tex="(x+2)^2 \in [0,9] \implies h(x) \in [-4,5]" />,
    reason: <>Subtracting 4. Because the turning point sits inside the domain, the range is closed at <em>both</em> ends — the open bracket at <Katex tex="x=-1" /> does not carry over.</>,
  },
  {
    working: <Katex display tex="\boxed{[-4,\ 5]}" />,
    reason: <>Matches option <b>E</b>. Option D keeps an open left end, option A starts the parabola's minimum at the wrong place.</>,
  },
]

export default function MethodsQ9_2021() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="g(x)=x+2" /> and <Katex tex="f(x)=x^2-4" />. If <Katex tex="h" />{' '}
          is the composite function given by{' '}
          <Katex tex="h:[-5,-1)\to R,\ h(x)=f\bigl(g(x)\bigr)" />, then the range of{' '}
          <Katex tex="h" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-3,\ 5]" /> },
        { letter: 'B', content: <Katex tex="[-3,\ 5)" /> },
        { letter: 'C', content: <Katex tex="(-3,\ 5)" /> },
        { letter: 'D', content: <Katex tex="(-4,\ 5]" /> },
        { letter: 'E', content: <Katex tex="[-4,\ 5]" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
