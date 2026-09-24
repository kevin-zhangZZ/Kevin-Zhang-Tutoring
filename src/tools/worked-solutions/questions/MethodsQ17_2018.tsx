// 2018 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 45% correct.
// Minimise the distance from the origin to the turning point of a parameterised parabola.
// Question text transcribed from the original paper; VCAA printed no diagram and neither does
// the stem here (guide §7). Answer checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 16, C: 45, D: 14, E: 8 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^2 - 2bx + 1 = (x-b)^2 + 1 - b^2" />,
    reason: <>Completing the square reads the turning point straight off, with no calculus needed.</>,
  },
  {
    working: <Katex display tex="\text{Turning point } \left(b,\ 1-b^2\right)" />,
    reason: <>As <Katex tex="b" /> varies, this point traces its own curve — the downward parabola <Katex tex="y=1-x^2" />. The question is which point on <em>that</em> curve is nearest the origin.</>,
  },
  {
    working: <Katex display tex="D^2 = b^2 + \left(1-b^2\right)^2" />,
    reason: <>Distance from the origin, squared. Minimising <Katex tex="D^2" /> instead of <Katex tex="D" /> gives the same <Katex tex="b" /> and avoids differentiating a square root — a standard and expected simplification.</>,
  },
  {
    working: <Katex display tex="D^2 = b^2 + 1 - 2b^2 + b^4 = b^4 - b^2 + 1" />,
    reason: <>Expanding. Only even powers survive, which is why the answer comes in a <Katex tex="\pm" /> pair.</>,
  },
  {
    working: <Katex display tex="\frac{d\left(D^2\right)}{db} = 4b^3 - 2b = 2b\left(2b^2-1\right)" />,
    reason: <>Differentiate with respect to <Katex tex="b" /> — the variable being chosen — not <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="2b\left(2b^2-1\right) = 0 \implies b = 0 \ \text{ or } \ b = \pm\frac{1}{\sqrt2}" />,
    reason: <>Three stationary values, so they must be compared rather than assumed.</>,
  },
  {
    working: <Katex display tex="b=0: D^2 = 1; \qquad b=\pm\tfrac{1}{\sqrt2}: D^2 = \tfrac14-\tfrac12+1 = \tfrac34" />,
    reason: <>Testing each. <Katex tex="b=0" /> is a local <em>maximum</em> of the distance, not a minimum — it puts the turning point at <Katex tex="(0,1)" />, one unit away, while the other two sit closer at <Katex tex="\sqrt{3}/2\approx0.87" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = -\frac{1}{\sqrt2} \ \text{ or } \ b = \frac{1}{\sqrt2}}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> <Katex tex="(b=0)" />, chosen by <Katex tex="17\%" />, is the stationary point that was never tested. Option <b>D</b> <Katex tex="\left(\pm\tfrac12\right)" /> comes from solving <Katex tex="2b^2-1=0" /> as <Katex tex="b^2=\tfrac12 \Rightarrow b=\tfrac12" />, forgetting the square root.</>,
  },
]

export default function MethodsQ17_2018() {
  return (
    <MCQShell
      question={
        <p>
          The turning point of the parabola <Katex tex="y=x^2-2bx+1" /> is closest to the
          origin when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="b=0" /> },
        { letter: 'B', content: <Katex tex="b=-1 \ \text{or} \ b=1" /> },
        { letter: 'C', content: <Katex tex="b=-\dfrac{1}{\sqrt2} \ \text{or} \ b=\dfrac{1}{\sqrt2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="b=\dfrac12 \ \text{or} \ b=-\dfrac12" /> },
        { letter: 'E', content: <Katex tex="b=\dfrac14 \ \text{or} \ b=-\dfrac14" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Two variables, and only one of them is being optimised">
          <p>
            There is an <Katex tex="x" /> in the equation and a <Katex tex="b" /> in the
            answer, and it matters which is which. For each fixed <Katex tex="b" /> the
            parabola has one turning point; <Katex tex="b" /> is then varied to move that
            point around. So the differentiation at the end is with respect to{' '}
            <Katex tex="b" />, after <Katex tex="x" /> has already been eliminated.
          </p>
          <p>
            Once three stationary values appear, they have to be compared. A derivative set
            to zero locates candidates; it does not tell you which is the minimum.
          </p>
        </Background>
      }
    />
  )
}
