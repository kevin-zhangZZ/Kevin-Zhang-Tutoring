// 2024 Mathematical Methods NHT — Exam 2, MCQ 2. The NHT report gives the answer key only, with
// no statistics. Probability: the addition rule for two independent events. Question text
// transcribed from the original paper. Solution is original; the answer A agrees with the
// report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A\cup B)=\Pr(A)+\Pr(B)-\Pr(A\cap B)" />,
    reason: <>The addition rule. Adding <Katex tex="\Pr(A)" /> and <Katex tex="\Pr(B)" /> counts the overlap twice, so it is subtracted once.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cap B)=\Pr(A)\Pr(B)=0.6p" />,
    reason: <>For independent events the probability of both is the product. Let <Katex tex="p=\Pr(B)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}0.92&=0.6+p-0.6p\\0.32&=0.4p\\p&=0.8\end{aligned}" />,
    reason: <>Substitute the given values and solve the linear equation.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(B)=\tfrac45}" />,
    reason: <>Matches option <b>A</b>. Check: <Katex tex="0.6+0.8-0.6\times0.8=0.92" />.</>,
    more: <>Option D, <Katex tex="\tfrac{8}{25}=0.32" />, is <Katex tex="0.92-0.6" />: it treats <Katex tex="A" /> and <Katex tex="B" /> as mutually exclusive, which is not the same as independent. Option C, <Katex tex="\tfrac{8}{15}" />, divides <Katex tex="0.32" /> by <Katex tex="0.6" /> instead of by <Katex tex="1-0.6" />. Option E, <Katex tex="\tfrac15" />, adds <Katex tex="\Pr(A\cap B)" /> instead of subtracting it (<Katex tex="0.32=1.6p" />).</>,
  },
]

export default function MethodsQ2_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          For two independent events, <Katex tex="A" /> and <Katex tex="B" />, it is known that <Katex tex="\Pr(A)=0.6" /> and <Katex tex="\Pr(A\cup B)=0.92" />.
          <br />
          <Katex tex="\Pr(B)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac45" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{4}{15}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{8}{15}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{8}{25}" /> },
        { letter: 'E', content: <Katex tex="\dfrac15" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
