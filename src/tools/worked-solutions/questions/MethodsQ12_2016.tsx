// 2016 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 52% correct.
// Tracking a square-root function's rule through a reflection then a dilation. Question
// text transcribed from the original paper (no diagram given — purely algebraic).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 19, C: 3, D: 52, E: 22 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\text{Reflect in the } x\text{-axis:} \\ &y = -\sqrt{2x-5} \end{aligned}" />,
    reason: <>A reflection in the <Katex tex="x" />-axis negates every <Katex tex="y" />-value, so the whole rule gets a minus sign in front.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{Dilate by } \tfrac12 \text{ from the } y\text{-axis:} \\ &(x,y)\to(X,Y)=\left(\tfrac{x}{2},\,y\right) \end{aligned}" />,
    reason: <>A dilation from the <Katex tex="y" />-axis scales the <Katex tex="x" />-coordinates: each one is halved, and <Katex tex="y" /> is unchanged.</>,
  },
  {
    working: <Katex display tex="x = 2X, \qquad y = Y" />,
    reason: <>Write the original coordinates in terms of the image coordinates, ready to substitute into <Katex tex="y=-\sqrt{2x-5}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} Y &= -\sqrt{2(2X)-5} \\ &= -\sqrt{4X-5} \end{aligned}" />,
    reason: <>Substitute: in effect <Katex tex="x" /> is replaced by <Katex tex="2x" /> in the reflected rule. Then drop the capitals to write <Katex tex="f(x)" />.</>,
    more: <>Check with one point: <Katex tex="(3,-1)" /> is on <Katex tex="y=-\sqrt{2x-5}" />, and halving its <Katex tex="x" />-coordinate gives <Katex tex="(1.5,-1)" />. Indeed <Katex tex="-\sqrt{4(1.5)-5}=-\sqrt1=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = -\sqrt{4x-5}}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option E (22%), <Katex tex="-\sqrt{4x-10}=-\sqrt{2(2x-5)}" />, multiplies the whole of <Katex tex="2x-5" /> by 2 instead of replacing <Katex tex="x" /> by <Katex tex="2x" />. Option B (19%) replaces <Katex tex="x" /> by <Katex tex="\tfrac{x}{2}" />, which is a dilation by factor <Katex tex="2" />, not <Katex tex="\tfrac12" />: a factor of <Katex tex="k" /> from the <Katex tex="y" />-axis replaces <Katex tex="x" /> by <Katex tex="\tfrac{x}{k}" />, and here <Katex tex="\tfrac{x}{1/2}=2x" />. Option A puts the minus sign inside the square root, <Katex tex="\sqrt{-(4x-5)}" />, which is not a reflection in the <Katex tex="x" />-axis: it changes the domain to <Katex tex="x\le\tfrac54" /> and leaves every <Katex tex="y" />-value non-negative, so nothing is flipped below the axis.</>,
  },
]

export default function MethodsQ12_2016() {
  return (
    <MCQShell
      question={
        <p>
          The graph of a function <Katex tex="f" /> is obtained from the graph of the function{' '}
          <Katex tex="g" /> with rule <Katex tex="g(x)=\sqrt{2x-5}" /> by a reflection in the{' '}
          <Katex tex="x" />-axis followed by a dilation from the <Katex tex="y" />-axis by a
          factor of <Katex tex="\tfrac12" />.
          <br />
          Which one of the following is the rule for the function <Katex tex="f" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=\sqrt{5-4x}" /> },
        { letter: 'B', content: <Katex tex="f(x)=-\sqrt{x-5}" /> },
        { letter: 'C', content: <Katex tex="f(x)=\sqrt{x+5}" /> },
        { letter: 'D', content: <Katex tex="f(x)=-\sqrt{4x-5}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="f(x)=-\sqrt{4x-10}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
