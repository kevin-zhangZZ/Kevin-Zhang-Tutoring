// 2025 Mathematical Methods NHT — Exam 2, MCQ 10. The NHT report gives the answer key and a
// worked comment only, with no statistics. Calculus: the chain rule for a composite, written back
// in terms of f. Question text transcribed from the original paper (the 2025 NHT paper is
// image-only, so read from the rendered page); the report's comment is transcribed from the
// rendered report page. Solution is original; the answer A agrees with the report's key (sympy:
// h′(x) − 4f(x)(f(x) + 1) = 0). Distractor B checked: g′(f(x)) = 2e^(2x+3) + 2, the chain rule
// without the f′(x) factor.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      <Katex tex="h(x)=g\big(f(x)\big)=\left(e^{2x+3}\right)^2+2\left(e^{2x+3}\right)-3" />
      <br />
      <Katex tex="h'(x)=2e^{2x+3}\times2\left(e^{2x+3}\right)+4e^{2x+3}" />
      <br />
      <Katex tex="\qquad\ =4e^{2x+3}\left(e^{2x+3}+1\right)" />
      <br />
      <Katex tex="\qquad\ =4f(x)\big(f(x)+1\big)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h'(x)=g'\big(f(x)\big)\times f'(x)" />,
    reason: <><Katex tex="h" /> is a function of a function, so use the chain rule: the derivative of the outer function, evaluated at the inner one, times the derivative of the inner one.</>,
  },
  {
    working: <Katex display tex="g'(x)=2x+2\ \Rightarrow\ g'\big(f(x)\big)=2f(x)+2" />,
    reason: <>Differentiate <Katex tex="g" />, then replace every <Katex tex="x" /> with <Katex tex="f(x)" /> to evaluate <Katex tex="g'" /> at the inner function.</>,
  },
  {
    working: <Katex display tex="f'(x)=2e^{2x+3}=2f(x)" />,
    reason: <>By the chain rule again, <Katex tex="\tfrac{d}{dx}e^{2x+3}=2e^{2x+3}" />, and <Katex tex="e^{2x+3}" /> is <Katex tex="f(x)" /> itself.</>,
    more: <>Writing <Katex tex="f'" /> in terms of <Katex tex="f" /> is the key move: every option is written in terms of <Katex tex="f" /> and <Katex tex="g" />, not <Katex tex="e" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}h'(x)&=\big(2f(x)+2\big)\cdot2f(x)\\&=4f(x)\big(f(x)+1\big)\end{aligned}" />,
    reason: <>Substitute both pieces into the chain rule, then take the common factor 2 out of the first bracket: <Katex tex="2f(x)+2=2\big(f(x)+1\big)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h'(x)=4f(x)\big(f(x)+1\big)}" />,
    reason: <>Matches option <b>A</b>. The report expands <Katex tex="h(x)" /> in <Katex tex="e^{2x+3}" /> first and differentiates term by term, reaching the same result.</>,
    more: <>Option <b>B</b>, <Katex tex="g'\big(f(x)\big)" />, is the chain rule with the inner derivative <Katex tex="f'(x)" /> left off. Check with numbers: at <Katex tex="x=-\tfrac32" />, <Katex tex="f=1" />, so <Katex tex="h'=4(1)(2)=8" />, while <Katex tex="g'(f)=4" /> — B is out by exactly the missing factor <Katex tex="f'=2" />.</>,
  },
]

export default function MethodsQ10_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x)=e^{2x+3}" />, <Katex tex="g(x)=x^2+2x-3" />, and{' '}
          <Katex tex="h(x)=g\big(f(x)\big)" />.
          <br />
          Then <Katex tex="h'(x)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="4f(x)\big(f(x)+1\big)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="g'\big(f(x)\big)" /> },
        { letter: 'C', content: <Katex tex="16f(2x)f(x)" /> },
        { letter: 'D', content: <Katex tex="4g(x)+4f(x)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
