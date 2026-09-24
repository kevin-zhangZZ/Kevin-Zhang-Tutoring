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
    working: <Katex display tex="(f\circ g)(x) = \log_e\left(\sqrt{1-x}\right)" />,
    reason: <>Substituting <Katex tex="g" /> into <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\text{Need } x\in\mathrm{dom}(g) \ \text{ and } \ g(x)\in\mathrm{dom}(f)" />,
    reason: <>Both conditions, in that order — the standard test for a composite to exist.</>,
  },
  {
    working: <Katex display tex="\mathrm{dom}(g) = (-\infty,1); \qquad \sqrt{1-x} > 0 \iff x < 1" />,
    reason: <>The log needs a strictly positive input, and <Katex tex="\sqrt{1-x}=0" /> only at <Katex tex="x=1" />, which is already excluded. Both conditions give the same interval.</>,
  },
  {
    working: <Katex display tex="\mathrm{dom}(f\circ g) = (-\infty,1)" />,
    reason: <>Option <b>B</b>'s closed bracket would need <Katex tex="\log_e(0)" /> to exist.</>,
  },
  {
    working: <Katex display tex="(f\circ g)'(x) = \frac{1}{\sqrt{1-x}}\cdot\frac{-1}{2\sqrt{1-x}} = \frac{-1}{2(1-x)}" />,
    reason: <>Differentiating. It is defined everywhere <Katex tex="x\ne1" />…</>,
  },
  {
    working: <Katex display tex="\boxed{x\in(-\infty,1)}" />,
    reason: <>…but a derivative can never have a larger domain than its function, so the answer is still <Katex tex="(-\infty,1)" />. Matches option <b>C</b>. Option <b>E</b>, <Katex tex="(0,1)" />, intersects the two given domains — but it is <Katex tex="g(x)" />, not <Katex tex="x" />, that must be positive.</>,
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
