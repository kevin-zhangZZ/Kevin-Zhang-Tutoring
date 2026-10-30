// 2025 Mathematical Methods NHT — Exam 2, MCQ 3. The NHT report gives the answer key only, with
// no statistics. Calculus: properties of definite integrals — reversed terminals, linearity and
// the integral of a constant. Question text transcribed from the original paper (the 2025 NHT
// paper is image-only, so read from the rendered page). Solution is original; the answer D agrees
// with the report's key. Distractors checked: A = 6 + 3(b − a) (limits never reversed),
// B = −6 + 3(b − a) (only the f term reversed), C = 6 + 3(a − b) (only the constant term reversed).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_b^a\bigl(2f(x)+3\bigr)dx=2\int_b^a f(x)\,dx+\int_b^a 3\,dx" />,
    reason: <>Split the integral of a sum into a sum of integrals, and take the constant 2 outside.</>,
  },
  {
    working: <Katex display tex="\int_b^a f(x)\,dx=-\int_a^b f(x)\,dx=-3" />,
    reason: <>The terminals are the other way round from the given integral. Swapping the terminals changes the sign.</>,
  },
  {
    working: <Katex display tex="\int_b^a 3\,dx=\bigl[3x\bigr]_b^a=3a-3b" />,
    reason: <>Integrate the constant directly, upper terminal minus lower terminal. The upper terminal here is <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="2(-3)+3(a-b)=3(a-b)-6" />,
    reason: <>Put both pieces back into the split from the first line, then take out the common factor 3 to match the options.</>,
  },
  {
    working: <Katex display tex="\boxed{3(a-b-2)}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Both pieces must respect the reversed terminals. Reversing neither gives <Katex tex="6+3(b-a)=3(b-a+2)" />, option <b>A</b>. Reversing only the <Katex tex="f" /> term gives <Katex tex="-6+3(b-a)" />, option <b>B</b>; reversing only the constant term gives <Katex tex="6+3(a-b)" />, option <b>C</b>. A quick check with a concrete case: try <Katex tex="f(x)=1" /> on <Katex tex="[0,3]" />: <Katex tex="\int_3^0(2+3)\,dx=-15" />, and <Katex tex="3(0-3-2)=-15" />.</>,
  },
]

export default function MethodsQ3_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_a^b f(x)\,dx=3" />, then{' '}
          <Katex tex="\displaystyle\int_b^a\bigl(2f(x)+3\bigr)dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3(b-a+2)" /> },
        { letter: 'B', content: <Katex tex="3(b-a-2)" /> },
        { letter: 'C', content: <Katex tex="3(a-b+2)" /> },
        { letter: 'D', content: <Katex tex="3(a-b-2)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
