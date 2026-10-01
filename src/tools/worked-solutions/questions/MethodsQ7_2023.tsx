// 2023 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 60% correct.
// The domain of a composite, and why differentiating does not shrink it further here. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 12, C: 60, D: 7, E: 17 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(f\circ g)(x) = f\big(g(x)\big) = \log_e\left(\sqrt{1-x}\right)" />,
    reason: <>Substituting <Katex tex="g(x)" /> into <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="x<1 \implies 1-x>0 \implies \sqrt{1-x}>0" />,
    reason: <>To check the composite exists, first find the outputs of <Katex tex="g" />. On its domain <Katex tex="x<1" /> the expression under the root is positive, so the root is positive. It is never 0, since that would need <Katex tex="x=1" />, which is excluded.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g) = (0,\infty) = \text{dom}(f)" />,
    reason: <>As <Katex tex="x" /> approaches 1 the output shrinks towards 0, and as <Katex tex="x\to-\infty" /> it grows without bound, so every positive value is an output. <Katex tex="f\circ g" /> exists only if every output of <Katex tex="g" /> is an allowed input of <Katex tex="f" /> (<Katex tex="\text{ran}(g)\subseteq\text{dom}(f)" />). The log needs a strictly positive input, and <Katex tex="g" /> only ever outputs positive numbers, so this holds.</>,
  },
  {
    working: <Katex display tex="\text{dom}(f\circ g) = \text{dom}(g) = (-\infty,1)" />,
    reason: <>When <Katex tex="f\circ g" /> exists, its domain is the domain of <Katex tex="g" />, because <Katex tex="x" /> goes into <Katex tex="g" /> first.</>,
  },
  {
    working: <Katex display tex="(f\circ g)'(x) = \frac{1}{\sqrt{1-x}}\cdot\frac{-1}{2\sqrt{1-x}} = \frac{-1}{2(1-x)}" />,
    reason: <>Chain rule: <Katex tex="f'\big(g(x)\big)\,g'(x)" />, with <Katex tex="f'(u)=\tfrac1u" /> and <Katex tex="g'(x)=\tfrac{-1}{2\sqrt{1-x}}" />. On the open interval <Katex tex="(-\infty,1)" /> the graph is a smooth curve with no endpoints and no sharp corners, so the derivative exists at every point of it.</>,
  },
  {
    working: <Katex display tex="\boxed{x\in(-\infty,1)}" />,
    reason: <>Matches option <b>C</b>. The rule <Katex tex="\tfrac{-1}{2(1-x)}" /> would also give numbers for <Katex tex="x>1" />, but a derivative only exists where its function exists, and <Katex tex="(f\circ g)(x)" /> is undefined there. Option <b>E</b>, <Katex tex="(0,1)" />, is where the two given domains overlap, but it is the input to <Katex tex="f" />, namely <Katex tex="g(x)" />, that must be positive, not <Katex tex="x" /> itself. Option <b>D</b>, <Katex tex="(0,\infty)" />, is the domain of <Katex tex="f" />. Option <b>B</b> includes <Katex tex="x=1" />, which is outside the domain of <Katex tex="g" /> and would need <Katex tex="\log_e(0)" />.</>,
  },
]

export default function MethodsQ7_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x)=\log_e x" />, where <Katex tex="x>0" />, and{' '}
          <Katex tex="g(x)=\sqrt{1-x}" />, where <Katex tex="x<1" />.
          <br />
          The domain of the derivative of <Katex tex="(f\circ g)(x)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x\in R" /> },
        { letter: 'B', content: <Katex tex="x\in(-\infty,1]" /> },
        { letter: 'C', content: <Katex tex="x\in(-\infty,1)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="x\in(0,\infty)" /> },
        { letter: 'E', content: <Katex tex="x\in(0,1)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
