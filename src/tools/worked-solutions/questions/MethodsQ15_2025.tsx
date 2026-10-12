// 2025 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 44% correct. This
// year's paper used four options (A–D) rather than five. Finding a point on a transformed
// graph, given a known point on the original. Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 25, B: 44, C: 22, D: 8 },
  answer: 'B',
  comment: (
    <>
      <Katex tex="y=1-g(2x-3)=-g\left(2\left(x-\dfrac{3}{2}\right)\right)+1" />
      <br />
      Reflect <Katex tex="(1,3)" /> in the <Katex tex="x" />-axis gives <Katex tex="(1,-3)" />.
      <br />
      Dilate <Katex tex="(1,-3)" /> by a factor of <Katex tex="\dfrac{1}{2}" /> from the{' '}
      <Katex tex="y" />-axis gives <Katex tex="\left(\dfrac{1}{2},-3\right)" />.
      <br />
      Translate 1 unit up and <Katex tex="\dfrac{3}{2}" /> units to the right gives{' '}
      <Katex tex="(2,-2)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = 1-g(2x-3) = -g\!\left(2\left(x-\tfrac32\right)\right)+1" />,
    reason: <>Factor the 2 out of <Katex tex="2x-3" /> so the horizontal shift reads correctly: it is <Katex tex="\tfrac32" />, not 3.</>,
  },
  {
    working: <>Reading the transformed rule: reflect in the <Katex tex="x" />-axis, dilate by <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis, translate <Katex tex="\tfrac32" /> right, translate <Katex tex="1" /> up.</>,
    reason: <>Outside <Katex tex="g" /> acts on <Katex tex="y" /> as written (<Katex tex="-" />, then <Katex tex="+1" />); inside acts on <Katex tex="x" /> the opposite way (<Katex tex="\times2" /> halves, <Katex tex="-\tfrac32" /> shifts right). With the 2 factored out, halve first, then shift.</>,
    more: <>Order matters for the <Katex tex="x" />-coordinate: the new <Katex tex="x" /> satisfies <Katex tex="2\left(x-\tfrac32\right)=1" />, i.e. <Katex tex="x=\tfrac12+\tfrac32" />, so the halving comes <i>before</i> the shift. Shifting first and then halving would give <Katex tex="\tfrac12\left(1+\tfrac32\right)=\tfrac54" /> instead.</>,
  },
  {
    working: <Katex display tex="(1,3) \xrightarrow{\text{reflect in }x\text{-axis}} (1,-3)" />,
    reason: <>Negating <Katex tex="g" /> flips the sign of the <Katex tex="y" />-coordinate.</>,
  },
  {
    working: <Katex display tex="(1,-3) \xrightarrow{\text{dilate }\times\frac12\text{ from }y\text{-axis}} \left(\tfrac12,-3\right)" />,
    reason: <>Replacing <Katex tex="x" /> with <Katex tex="2x" /> halves <Katex tex="x" />-coordinates.</>,
  },
  {
    working: <Katex display tex="\left(\tfrac12,-3\right) \xrightarrow{\text{shift }\tfrac32\text{ right, }1\text{ up}} \left(\tfrac12+\tfrac32,\ -3+1\right)" />,
    reason: <>Apply the two translations.</>,
  },
  {
    working: <Katex display tex="\boxed{(2,-2)}" />,
    reason: <>Matches option <b>B</b>. Check: at <Katex tex="x=2" />, <Katex tex="1-g(2(2)-3)=1-g(1)=1-3=-2" />.</>,
    more: <>
      That check is also the fastest method. You know only <Katex tex="g(1)=3" />, so choose <Katex tex="x" /> to make the input to <Katex tex="g" /> equal 1: <Katex tex="2x-3=1" /> gives <Katex tex="x=2" />, and then <Katex tex="y=1-3=-2" />.
      <br />• <b>A</b> <Katex tex="(-1,-2)" /> (25%, the most common wrong answer) has <Katex tex="x=2(1)-3=-1" />: it pushes the old <Katex tex="x" /> through <Katex tex="2x-3" /> instead of solving <Katex tex="2x-3=1" />. Horizontal changes work the opposite way to the rule.
      <br />• <b>D</b> <Katex tex="(2,2)" /> has the right <Katex tex="x" /> but <Katex tex="y=3-1" />, missing the reflection: the minus sign in <Katex tex="1-g" /> flips the 3 before the 1 is added.
      <br />• <b>C</b> <Katex tex="(-1,2)" /> makes both mistakes.
    </>,
  },
]

export default function MethodsQ15_2025() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=g(x)" /> passes through the point <Katex tex="(1,3)" />.
          <br />
          The graph of <Katex tex="y = 1-g(2x-3)" /> must pass through the point
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-1,-2)" /> },
        { letter: 'B', content: <Katex tex="(2,-2)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(-1,2)" /> },
        { letter: 'D', content: <Katex tex="(2,2)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
