// 2025 Mathematical Methods NHT — Exam 2, MCQ 15. The NHT report gives the answer key only for
// this question, with no statistics or comment. Calculus: product rule with a chain-rule factor,
// evaluated from given values. Question text transcribed from the original paper (image-only,
// read from the rendered page). Solution is original; the answer C agrees with the report's key
// (p′(2) = g′(2)g(4) + 2g(2)g′(4) = ba + 2ab).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p'(x)=g'(x)\,g(2x)+g(x)\cdot2g'(2x)" />,
    reason: <>Product rule. The second factor, <Katex tex="g(2x)" />, needs the chain rule: its derivative is <Katex tex="g'(2x)\times2" />.</>,
  },
  {
    working: <Katex display tex="p'(2)=g'(2)\,g(4)+2\,g(2)\,g'(4)" />,
    reason: <>Substitute <Katex tex="x=2" />, so <Katex tex="2x=4" />.</>,
  },
  {
    working: <Katex display tex="p'(2)=b\cdot a+2\cdot a\cdot b" />,
    reason: <>Use <Katex tex="g(2)=g(4)=a" /> and <Katex tex="g'(2)=g'(4)=b" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p'(2)=3ab}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>B</b>, <Katex tex="2ab" />, comes from leaving out the chain-rule factor of 2 on <Katex tex="g'(2x)" />.</>,
  },
]

export default function MethodsQ15_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="g" /> is differentiable over the domain <Katex tex="R" /> and satisfies{' '}
          <Katex tex="g(2)=g(4)=a" /> and <Katex tex="g'(2)=g'(4)=b" />.
          <br />
          Given that <Katex tex="p(x)=g(x)\,g(2x)" />, then <Katex tex="p'(2)" /> must be equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="ab" /> },
        { letter: 'B', content: <Katex tex="2ab" /> },
        { letter: 'C', content: <Katex tex="3ab" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="a^2+b^2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
