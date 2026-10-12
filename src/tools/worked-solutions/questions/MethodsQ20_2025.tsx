// 2025 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 36% correct. This
// year's paper used four options (A–D) rather than five. Which sequence of transformations
// applied to f does NOT produce g — checking each option by applying its transformations in
// order. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 18, C: 36, D: 21 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f:R\to R,\ f(x)=a^x" /> and <Katex tex="g:R\to R,\ g(x)=a^{2x+2}" />
      <br />
      Dilation by a factor of <Katex tex="a" /> from the <Katex tex="x" />-axis gives{' '}
      <Katex tex="f_1(x)=a\times a^x=a^{x+1}" />.
      <br />
      Dilation by a factor of <Katex tex="\dfrac{1}{2}" /> from the <Katex tex="y" />-axis gives{' '}
      <Katex tex="f_2(x)=a^{2x+1}" />.
      <br />
      Translating by 1 unit in the positive direction of the <Katex tex="x" />-axis gives{' '}
      <Katex tex="f_3(x)=a^{2\left(x+\frac{1}{2}-1\right)}=a^{2\left(x-\frac{1}{2}\right)}=a^{2x-1}\ne a^{2x+2}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=a^x \qquad g(x)=a^{2x+2}" />,
    reason: <>Apply each option's steps in order, each to the function the previous step produced, and see which one doesn't reach <Katex tex="g" />.</>,
    more: <>
      The general rules: a dilation by factor <Katex tex="k" /> from the <Katex tex="x" />-axis takes <Katex tex="f(x)" /> to <Katex tex="kf(x)" />; a dilation by factor <Katex tex="b" /> from the <Katex tex="y" />-axis takes it to <Katex tex="f\left(\tfrac{x}{b}\right)" />; a translation <Katex tex="h" /> units right takes it to <Katex tex="f(x-h)" /> (left: <Katex tex="f(x+h)" />).
      <br />
      The idea behind options B, C and D is the index law <Katex tex="a^k\cdot a^x=a^{x+k}" />: for an exponential, a dilation by factor <Katex tex="a^k" /> from the <Katex tex="x" />-axis has the same effect as a translation of <Katex tex="k" /> units in the negative direction of the <Katex tex="x" />-axis.
    </>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{A: } a^x &\to a^{2x} \\ &\to a^{2(x+1)}=a^{2x+2}\ \checkmark \end{aligned}" />,
    reason: <>Dilating by <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis replaces <Katex tex="x" /> with <Katex tex="2x" />; translating 1 unit left then replaces every <Katex tex="x" /> with <Katex tex="x+1" />, so <Katex tex="2x" /> becomes <Katex tex="2(x+1)" />, not <Katex tex="2x+1" />. Produces <Katex tex="g" />.</>,
    more: <>Getting <Katex tex="a^{2x+1}" /> here makes option A look wrong — a likely reason A was the most popular wrong answer.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{B: } a^x &\to a^{2x} \\ &\to a^2\cdot a^{2x}=a^{2x+2}\ \checkmark \end{aligned}" />,
    reason: <>Replace <Katex tex="x" /> with <Katex tex="2x" />, then dilating by <Katex tex="a^2" /> from the <Katex tex="x" />-axis multiplies by <Katex tex="a^2" />; add the indices. Produces <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{D: } a^x &\to a^3\cdot a^x=a^{x+3} \\ &\to a^{(x-1)+3}=a^{x+2} \\ &\to a^{2x+2}\ \checkmark \end{aligned}" />,
    reason: <>Multiply by <Katex tex="a^3" />, replace <Katex tex="x" /> with <Katex tex="x-1" /> (1 unit right), then replace <Katex tex="x" /> with <Katex tex="2x" />. Produces <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\text{C: } a^x \to a\cdot a^x=a^{x+1}" />,
    reason: <>Dilating by <Katex tex="a" /> from the <Katex tex="x" />-axis multiplies by <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\to a^{2x+1}" />,
    reason: <>Dilating by <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis replaces <Katex tex="x" /> with <Katex tex="2x" />.</>,
  },
  {
    working: <Katex display tex="\to a^{2(x-1)+1} = a^{2x-1}" />,
    reason: <>Translating 1 unit right replaces <Katex tex="x" /> with <Katex tex="x-1" />.</>,
    more: <>The report writes this step as <Katex tex="a^{2\left(x+\frac{1}{2}-1\right)}" />: it first factorises <Katex tex="2x+1=2\left(x+\tfrac12\right)" />, then replaces <Katex tex="x" /> with <Katex tex="x-1" />. Same result. To reach <Katex tex="g" /> from <Katex tex="a^{2x+1}" />, the translation would need to be <Katex tex="\tfrac12" /> unit left, giving <Katex tex="a^{2\left(x+\frac12\right)+1}=a^{2x+2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a^{2x-1} \neq a^{2x+2} = g(x)}" />,
    reason: <>Matches option <b>C</b> — the only sequence that does <b>not</b> produce <Katex tex="g" />.</>,
  },
]

export default function MethodsQ20_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="a>1" />, and consider the functions <Katex tex="f" /> and <Katex tex="g" /> defined
            below.
          </p>
          <div className="mb-2 pl-5 flex flex-col gap-1">
            <Katex tex="f:R\to R,\ f(x)=a^x" />
            <Katex tex="g:R\to R,\ g(x)=a^{2x+2}" />
          </div>
          <p>
            Which one of the following sequences of transformations, when applied to <Katex tex="f(x)" />, does{' '}
            <b>not</b> produce <Katex tex="g(x)" />?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>dilation by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis, then<br />translation by 1 unit in the negative direction of the <Katex tex="x" />-axis</> },
        { letter: 'B', content: <>dilation by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis, then<br />dilation by a factor of <Katex tex="a^2" /> from the <Katex tex="x" />-axis</> },
        { letter: 'C', content: <>dilation by a factor of <Katex tex="a" /> from the <Katex tex="x" />-axis, then<br />dilation by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis, then<br />translation by 1 unit in the positive direction of the <Katex tex="x" />-axis</>, isAnswer: true },
        { letter: 'D', content: <>dilation by a factor of <Katex tex="a^3" /> from the <Katex tex="x" />-axis, then<br />translation by 1 unit in the positive direction of the <Katex tex="x" />-axis, then<br />dilation by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
