// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 9. VCAA examination report: 76% correct.
// The inverse of 1/sqrt(x) + 4, domain included. Question text transcribed from the original
// paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 76, B: 2, C: 3, D: 4, E: 15 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Inverse: } x = \frac{1}{\sqrt y}+4" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then make the new <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x-4 = \frac{1}{\sqrt y} \implies \sqrt y = \frac{1}{x-4}" />,
    reason: <>Subtract 4, then take reciprocals of both sides.</>,
    more: <>Notice that <Katex tex="\sqrt y" /> is positive, so this line only makes sense when <Katex tex="x-4>0" />, i.e. <Katex tex="x>4" />. The domain of the inverse is already showing up in the algebra.</>,
  },
  {
    working: <Katex display tex="f^{-1}(x) = \frac{1}{(x-4)^2}" />,
    reason: <>Square both sides. The <Katex tex="+4" /> in <Katex tex="f" /> becomes <Katex tex="x-4" /> in the inverse.</>,
  },
  {
    working: <Katex display tex="x>0 \implies \frac{1}{\sqrt x} > 0 \implies f(x) > 4" />,
    reason: <>The range of <Katex tex="f" />: for <Katex tex="x>0" />, <Katex tex="\tfrac{1}{\sqrt x}" /> takes every positive value, so <Katex tex="f" /> takes every value above 4.</>,
    more: <>Picture the graph: <Katex tex="\tfrac{1}{\sqrt x}" /> is huge for <Katex tex="x" /> near 0 and shrinks towards 0 as <Katex tex="x" /> grows, never reaching it. Adding 4 lifts it so the horizontal asymptote is <Katex tex="y=4" /> — the graph sits entirely above that line and covers every height above it.</>,
  },
  {
    working: <Katex display tex="\text{domain of } f^{-1} = \text{range of } f = (4,\infty)" />,
    reason: <>Swapping <Katex tex="x" /> and <Katex tex="y" /> swaps the domain and range, so the inverse accepts exactly the values <Katex tex="f" /> produces.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}:(4,\infty)\to R,\ f^{-1}(x) = \tfrac{1}{(x-4)^2}}" />,
    reason: <>Matches option <b>A</b> — E has the same rule but the wrong domain.</>,
    more: <>
      Check: <Katex tex="f(1)=1+4=5" /> and <Katex tex="f^{-1}(5)=\tfrac{1}{1^2}=1" /> ✓. The distractors:
      <br />• <b>E</b> (15%, the most popular wrong answer) has the correct rule on <Katex tex="(-\infty,4)" />, but <Katex tex="f" /> never takes values below 4. There, <Katex tex="f\bigl(f^{-1}(x)\bigr)=|x-4|+4=8-x" />, not <Katex tex="x" />, so it is not an inverse at all.
      <br />• <b>D</b> has <Katex tex="x+4" /> where the inverse needs <Katex tex="x-4" /> — the translation undone the wrong way.
      <br />• <b>B</b> and <b>C</b> do not undo the steps of <Katex tex="f" /> in reverse order (undo the <Katex tex="+4" /> first, then the reciprocal square root), and their domain <Katex tex="R^+" /> is not the range of <Katex tex="f" />.
    </>,
  },
]

export default function MethodsQ9_2014() {
  return (
    <MCQShell
      question={
        <p>
          The inverse of the function <Katex tex="f:R^+\to R" />,{' '}
          <Katex tex="f(x)=\dfrac{1}{\sqrt x}+4" /> is
        </p>
      }
      background={
        <p>
          An inverse is not finished until its domain is stated, and that domain is the{' '}
          <em>range</em> of the original function. Here two options share the correct rule and
          differ only in the domain, so the range of <Katex tex="f" /> is what decides it.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f^{-1}:(4,\infty)\to R,\ f^{-1}(x)=\tfrac{1}{(x-4)^2}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="f^{-1}:R^+\to R,\ f^{-1}(x)=\tfrac{1}{x^2}+4" /> },
        { letter: 'C', content: <Katex tex="f^{-1}:R^+\to R,\ f^{-1}(x)=(x+4)^2" /> },
        { letter: 'D', content: <Katex tex="f^{-1}:(-4,\infty)\to R,\ f^{-1}(x)=\tfrac{1}{(x+4)^2}" /> },
        { letter: 'E', content: <Katex tex="f^{-1}:(-\infty,4)\to R,\ f^{-1}(x)=\tfrac{1}{(x-4)^2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
