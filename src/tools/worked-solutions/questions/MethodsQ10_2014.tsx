// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 10. VCAA examination report: 66% correct.
// Which rule is its own inverse. Question text transcribed from the original paper; solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 10, C: 11, D: 6, E: 66 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(f(x)) = x \iff f \text{ is its own inverse}" />,
    reason: <>Test each option: compute <Katex tex="f(f(x))" /> and see which simplifies to <Katex tex="x" /> for every <Katex tex="x" />.</>,
    more: <>Applying <Katex tex="f" /> twice returns you to the start, so <Katex tex="f" /> undoes itself — it is its own inverse. Geometrically, the graph of <Katex tex="f^{-1}" /> is the reflection of the graph of <Katex tex="f" /> in the line <Katex tex="y=x" />, so a function that is its own inverse has a graph symmetric about <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="\text{E: } f(x) = 2-x \implies f(f(x)) = 2-(2-x)" />,
    reason: <>Substituting <Katex tex="2-x" /> wherever <Katex tex="x" /> appears.</>,
  },
  {
    working: <Katex display tex="= 2-2+x = x \ \checkmark" />,
    reason: <>So option E works for every real <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{A: }& f(f(x)) = 2(2x) = 4x \\ \text{D: }& f(f(x)) = (x-2)-2 = x-4 \end{aligned}" />,
    reason: <>Neither returns <Katex tex="x" />: doubling twice gives <Katex tex="4x" />, and subtracting 2 twice gives <Katex tex="x-4" />.</>,
    more: <>Both are one-to-one, so they do have inverses — <Katex tex="\tfrac x2" /> and <Katex tex="x+2" /> — but those are different functions from <Katex tex="2x" /> and <Katex tex="x-2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{B: }& f(f(x)) = \left(x^2\right)^2 = x^4 \\ \text{C: }& f(f(x)) = 2\sqrt{2\sqrt x} \end{aligned}" />,
    reason: <>Neither returns <Katex tex="x" /> — at <Katex tex="x=2" />, B gives 16 and C gives <Katex tex="2\sqrt{2\sqrt2}\approx3.4" />, not 2.</>,
    more: <>Neither could work "for every real number" anyway: <Katex tex="x^2" /> is not one-to-one on <Katex tex="R" /> (both <Katex tex="\pm x" /> give the same output, so no inverse exists), and <Katex tex="2\sqrt x" /> is not even defined for <Katex tex="x<0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 2-x}" />,
    reason: <>Matches option <b>E</b> — the only rule that returns <Katex tex="x" />.</>,
    more: <>The graph agrees: <Katex tex="y=2-x" /> is a line of gradient <Katex tex="-1" />, perpendicular to <Katex tex="y=x" />, so reflecting it in <Katex tex="y=x" /> maps it onto itself. Any rule <Katex tex="f(x)=c-x" /> has this property.</>,
  },
]

export default function MethodsQ10_2014() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following functions satisfies the functional equation{' '}
          <Katex tex="f\bigl(f(x)\bigr)=x" /> for every real number <Katex tex="x" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=2x" /> },
        { letter: 'B', content: <Katex tex="f(x)=x^2" /> },
        { letter: 'C', content: <Katex tex="f(x)=2\sqrt x" /> },
        { letter: 'D', content: <Katex tex="f(x)=x-2" /> },
        { letter: 'E', content: <Katex tex="f(x)=2-x" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
