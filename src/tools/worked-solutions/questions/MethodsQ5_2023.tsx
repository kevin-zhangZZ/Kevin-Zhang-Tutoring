// 2023 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 62% correct.
// Which fractional power leaves a derivative that is zero rather than undefined at the origin. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 16, C: 8, D: 62, E: 4 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^{p} \implies \frac{dy}{dx} = p\,x^{p-1}" />,
    reason: <>A horizontal tangent at <Katex tex="(0,0)" /> needs two things: the curve passes through the origin, and its gradient there is <Katex tex="0" />. So differentiate each option with the power rule and substitute <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\text{A: } y = x^{-\frac13} = \frac{1}{x^{\frac13}}" />,
    reason: <>At <Katex tex="x=0" /> this is <Katex tex="\tfrac10" />, which is undefined, so <Katex tex="(0,0)" /> is not even on the curve. Option <b>A</b> is out.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B: } \frac{dy}{dx} &= \tfrac13x^{-\frac23} = \frac{1}{3x^{\frac23}}\\ \text{C: } \frac{dy}{dx} &= \tfrac23x^{-\frac13} = \frac{2}{3x^{\frac13}}\end{aligned}" />,
    reason: <>Both curves pass through the origin, since <Katex tex="0^{\frac13}=0^{\frac23}=0" />. But subtracting <Katex tex="1" /> from an index less than <Katex tex="1" /> leaves a negative index, which puts <Katex tex="x" /> in the denominator. So the gradient is undefined at <Katex tex="x=0" /> and grows without bound as <Katex tex="x\to0" />: the graph gets steeper and steeper, not flatter. Option <b>B</b> has a vertical tangent at the origin; option <b>C</b> comes to a sharp point there (a cusp) whose two sides both become vertical.</>,
  },
  {
    working: <Katex display tex="\text{E: } \frac{dy}{dx} = \tfrac34x^{-\frac14} = \frac{3}{4x^{\frac14}}" />,
    reason: <>The same problem: undefined at <Katex tex="x=0" /> and growing without bound as <Katex tex="x\to0^+" />, so option <b>E</b> also has a vertical tangent at the origin. (A fourth root is involved, so <Katex tex="y=x^{\frac34}" /> is only defined for <Katex tex="x\ge0" />.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{D: } \frac{dy}{dx} &= \tfrac43x^{\frac13}\\ \left.\frac{dy}{dx}\right|_{x=0} &= \tfrac43\times0 = 0\end{aligned}" />,
    reason: <>This time the index after differentiating, <Katex tex="\tfrac13" />, is positive, so substituting <Katex tex="x=0" /> works and gives a gradient of <Katex tex="0" />. Also <Katex tex="0^{\frac43}=0" />, so the origin is on the curve.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x^{\frac43}}" />,
    reason: <>Matches option <b>D</b>. The rule of thumb: for <Katex tex="p>0" />, <Katex tex="y=x^p" /> has a horizontal tangent at the origin exactly when <Katex tex="p>1" />, because only then is the new index <Katex tex="p-1" /> positive. D is the only option with <Katex tex="p>1" />.</>,
  },
]

export default function MethodsQ5_2023() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following functions has a horizontal tangent at{' '}
          <Katex tex="(0,0)" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=x^{-\frac13}" /> },
        { letter: 'B', content: <Katex tex="y=x^{\frac13}" /> },
        { letter: 'C', content: <Katex tex="y=x^{\frac23}" /> },
        { letter: 'D', content: <Katex tex="y=x^{\frac43}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="y=x^{\frac34}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
