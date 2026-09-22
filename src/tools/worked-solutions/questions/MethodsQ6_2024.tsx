// 2024 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 50% correct.
// An inverse whose domain is the original range, not the original domain. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 31, B: 50, C: 7, D: 12 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{2x+1}{3-x} \implies y(3-x) = 2x+1" />,
    reason: 'Swap x and y at the end instead of at the start — either order works, this one keeps the algebra tidier.',
  },
  {
    working: <Katex display tex="3y-xy = 2x+1 \implies 3y-1 = 2x+xy = x(2+y)" />,
    reason: <>Collecting the <Katex tex="x" /> terms on one side.</>,
  },
  {
    working: <Katex display tex="x = \frac{3y-1}{y+2} \implies f^{-1}(x) = \frac{3x-1}{x+2}" />,
    reason: 'The rule of the inverse.',
  },
  {
    working: <Katex display tex="\text{ran}(f): \ \frac{2x+1}{3-x} = \frac{-2(3-x)+7}{3-x} = -2+\frac{7}{3-x} \implies y\ne-2" />,
    reason: <>The horizontal asymptote is <Katex tex="y=-2" />, so the range is <Katex tex="\mathbb{R}\setminus\{-2\}" /> — and the domain of the inverse is that range, not <Katex tex="\mathbb{R}\setminus\{3\}" />. Option <b>A</b> has the right rule with the wrong domain, which is why 31% chose it.</>,
  },
  {
    working: <Katex display tex="3-\frac{7}{x+2} = \frac{3(x+2)-7}{x+2} = \frac{3x-1}{x+2}" />,
    reason: 'Option B is the same rule written in the "asymptote" form.',
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = 3-\frac{7}{x+2}, \ \text{ domain } \mathbb{R}\setminus\{-2\}}" />,
    reason: <>Option <b>B</b>. Check: <Katex tex="f(0)=\tfrac13" /> and <Katex tex="f^{-1}\!\left(\tfrac13\right)=\tfrac{1-1}{\tfrac13+2}=0" /> ✓.</>,
  },
]

export default function MethodsQ6_2024() {
  return (
    <MCQShell
      question={
        <p>
          Consider the function <Katex tex="f(x)=\dfrac{2x+1}{3-x}" /> with domain{' '}
          <Katex tex="x\in\mathbb{R}\setminus\{3\}" />. The inverse of <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f^{-1}(x)=\frac{3x-1}{x+2} \ \text{ with domain } x\in\mathbb{R}\setminus\{3\}" /> },
        { letter: 'B', content: <Katex tex="f^{-1}(x)=3-\frac{7}{x+2} \ \text{ with domain } x\in\mathbb{R}\setminus\{-2\}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="f^{-1}(x)=3+\frac{5}{x+2} \ \text{ with domain } x\in\mathbb{R}\setminus\{-2\}" /> },
        { letter: 'D', content: <Katex tex="f^{-1}(x)=\frac{1-3x}{x+2} \ \text{ with domain } x\in\mathbb{R}\setminus\{-2\}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
