// 2016 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 47% correct.
// Which candidate rule satisfies the given functional equation — test each option directly.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 14, C: 20, D: 47, E: 12 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\dfrac{dy}{dx}=2f(x)-f(y)=(y-x)f(xy)" />
      <br />
      <Katex tex="f(x)=\dfrac1x" />
      <br />
      <Katex tex="\text{LHS}=\dfrac1x-\dfrac1y" />
      <br />
      <Katex tex="\text{RHS}=(y-x)\times\dfrac1{xy}=\dfrac1x-\dfrac1y=\text{LHS}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)-f(y) = (y-x)f(xy) \quad \text{for all non-zero } x,y" />,
    reason: <>The condition every candidate rule must satisfy — with no obvious algebraic route to <Katex tex="f" />, testing each option directly is the fastest path.</>,
  },
  {
    working: <Katex display tex="\text{Try } f(x) = \frac1x:" />,
  },
  {
    working: <Katex display tex="\begin{aligned} f(x)-f(y) &= \frac1x-\frac1y \\ &= \frac{y-x}{xy} \end{aligned}" />,
    reason: <>The left-hand side of the condition, for this candidate rule.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} (y-x)f(xy) &= (y-x)\cdot\frac{1}{xy} \\ &= \frac{y-x}{xy} \end{aligned}" />,
    reason: <>The right-hand side, using the same rule evaluated at the product <Katex tex="xy" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{y-x}{xy} = \frac{y-x}{xy} \ \checkmark}" />,
    reason: <>Both sides agree for every non-zero <Katex tex="x,y" />. Matches option <b>D</b>. The others fail a single test: option C (20%), <Katex tex="x\log_e(x)" />, is not even defined for negative <Katex tex="x" />; option A with <Katex tex="x=1,\ y=2" /> gives <Katex tex="1-4=-3" /> on the left but <Katex tex="(2-1)\times4=4" /> on the right. (The report's comment opens with a stray line, <Katex tex="\tfrac{dy}{dx}=2f(x)-\dots" />, which looks like a typesetting slip; the rest of its working is the check above.)</>,
  },
]

export default function MethodsQ11_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The function <Katex tex="f" /> has the property <Katex tex="f(x)-f(y) = (y-x)f(xy)" /> for all
            non-zero real numbers <Katex tex="x" /> and <Katex tex="y" />.
          </p>
          <p>Which one of the following is a possible rule for the function?</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=x^2" /> },
        { letter: 'B', content: <Katex tex="f(x)=x^2+x^4" /> },
        { letter: 'C', content: <Katex tex="f(x)=x\log_e(x)" /> },
        { letter: 'D', content: <Katex tex="f(x)=\dfrac1x" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="f(x)=\dfrac{1}{x^2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
