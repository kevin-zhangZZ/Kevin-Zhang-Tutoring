// 2024 Mathematical Methods NHT — Exam 2, MCQ 3. The NHT report gives the answer key only, with
// no statistics. Algebra: combining logarithms with the log laws. Question text transcribed from
// the original paper. Solution is original; the answer D agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\log_5(a)+\log_5(b)=\log_5(ab)" />,
    reason: <>The sum of two logs with the same base is the log of the product.</>,
  },
  {
    working: <Katex display tex="2\log_5(c)=\log_5(c^2)" />,
    reason: <>A coefficient in front of a log becomes a power inside it: <Katex tex="c^2" />, not <Katex tex="2c" />.</>,
  },
  {
    working: <Katex display tex="\log_5(ab)=\log_5(c^2)\ \Rightarrow\ ab=c^2" />,
    reason: <>A log function is one-to-one, so equal logs to the same base mean equal arguments. All three numbers are positive, so every log is defined.</>,
  },
  {
    working: <Katex display tex="\boxed{a=\frac{c^2}{b}}" />,
    reason: <>Divide both sides of <Katex tex="ab=c^2" /> by <Katex tex="b" /> (allowed, since <Katex tex="b>0" />). Matches option <b>D</b>.</>,
    more: <>Option C writes <Katex tex="2\log_5(c)" /> as <Katex tex="\log_5(2c)" />. Options A and B turn the sum of logs into the log of a sum, <Katex tex="\log_5(a+b)" />, which is not a log law (A also uses <Katex tex="2c" /> in place of <Katex tex="c^2" />). Option E makes the <Katex tex="2c" /> slip and then divides the wrong way round.</>,
  },
]

export default function MethodsQ3_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>The positive real numbers <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> satisfy the equation</p>
          <Katex display tex="\log_5 a+\log_5 b=2\log_5 c" />
          <p>Therefore, it must be true that</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="a=2c-b" /> },
        { letter: 'B', content: <Katex tex="a=c^2-b" /> },
        { letter: 'C', content: <Katex tex="a=\dfrac{2c}{b}" /> },
        { letter: 'D', content: <Katex tex="a=\dfrac{c^2}{b}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="a=\dfrac{b}{2c}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
