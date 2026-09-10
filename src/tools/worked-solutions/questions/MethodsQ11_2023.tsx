// 2023 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 22% correct — the
// hardest MCQ on this paper. Gradient of a product f(x)·g(x) at a point, given values of f,
// g and their derivatives there. Question text transcribed from the original paper. Solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 13, C: 8, D: 51, E: 22 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <Katex tex="\frac{d}{dx}[f(x)g(x)]\Big|_{x=-2} = f(-2)g'(-2)+g(-2)f'(-2) = (-7\times2)+(3\times8) = 10" />
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(-2)=-7,\quad g(-2)=8,\quad f'(-2)=3,\quad g'(-2)=2" />,
    reason: 'Given values.',
  },
  {
    working: <Katex display tex="\frac{d}{dx}\big[f(x)g(x)\big] = f'(x)g(x) + f(x)g'(x)" />,
    reason: 'Product rule.',
  },
  {
    working: <Katex display tex="\text{At } x=-2:\quad f'(-2)g(-2) + f(-2)g'(-2)" />,
    reason: 'Substitute the point of interest.',
  },
  {
    working: <Katex display tex="= (3)(8) + (-7)(2) = 24 - 14" />,
    reason: 'Substitute the given values.',
  },
  {
    working: <Katex display tex="\boxed{10}" />,
    reason: <>Matches option <b>E</b>. (Watch the pairing carefully — it's easy to accidentally multiply <Katex tex="f'" /> with <Katex tex="f" /> instead of <Katex tex="g" />, which is likely why this was the hardest question on the paper.)</>,
  },
]

export default function MethodsQ11_2023() {
  return (
    <MCQShell
      question={
        <p>
          Two functions, <Katex tex="f" /> and <Katex tex="g" />, are continuous and differentiable for all{' '}
          <Katex tex="x\in\mathbb{R}" />. It is given that <Katex tex="f(-2)=-7" />, <Katex tex="g(-2)=8" /> and{' '}
          <Katex tex="f'(-2)=3" />, <Katex tex="g'(-2)=2" />.
          <br />
          The gradient of the graph <Katex tex="y=f(x)\times g(x)" /> at the point where <Katex tex="x=-2" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-10" /> },
        { letter: 'B', content: <Katex tex="-6" /> },
        { letter: 'C', content: <Katex tex="0" /> },
        { letter: 'D', content: <Katex tex="6" /> },
        { letter: 'E', content: <Katex tex="10" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
