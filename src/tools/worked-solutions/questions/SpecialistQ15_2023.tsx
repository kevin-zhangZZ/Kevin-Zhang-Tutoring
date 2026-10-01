// 2023 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 18% correct — the
// hardest MCQ on this paper. If the sum of two unit vectors is a unit vector, find the
// magnitude of their difference. Question text transcribed from the original paper. Solution
// is original. Interactive: spec-2023-mcq15-unit-sum (turn b until |a + b| = 1: only 120° works,
// and then |a − b| = √3; at 90°, option C's √2, the sum is √2 too).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import sumSrc from './spec-2023-mcq15-report-sum.png'
import diffSrc from './spec-2023-mcq15-report-diff.png'
import { Explore, lazyWidget } from '../Explore'

const UnitSumWidget = lazyWidget(() => import('../interactives/spec-2023-mcq15-unit-sum'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 24, C: 32, D: 18, E: 3 },
  answer: 'D',
  comment: (
    <>
      If the sum of two unit vectors is a unit vector, then an equilateral triangle will be
      formed, such as the one in this diagram.
      <img src={sumSrc} alt="The report's diagram: an equilateral triangle with sides a, b and a + b, and a 60° angle between a and b at the base" className="w-full max-w-[200px] mt-1" />
      The difference of the two vectors can be represented as
      <img src={diffSrc} alt="The report's diagram: a triangle formed by a and −b with a 120° angle between them, the third side being a − b" className="w-full max-w-[240px] mt-1" />
      By the cosine rule,{' '}
      <Katex tex="\left|\underset{\sim}{a}-\underset{\sim}{b}\right|=\sqrt{1^2+1^2-2(1)(1)\cos\left(120^\circ\right)}=\sqrt3" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|\underset{\sim}{a}| = |\underset{\sim}{b}| = |\underset{\sim}{a}+\underset{\sim}{b}| = 1" />,
    reason: (
      <>
        &ldquo;Unit vector&rdquo; means magnitude 1. We know only lengths, not components or the angle between the
        vectors, so we need a rule that links the length of a sum to the two vectors.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}|\underset{\sim}{a}+\underset{\sim}{b}|^2 &= (\underset{\sim}{a}+\underset{\sim}{b})\cdot(\underset{\sim}{a}+\underset{\sim}{b})\\ &= |\underset{\sim}{a}|^2+2\underset{\sim}{a}\cdot\underset{\sim}{b}+|\underset{\sim}{b}|^2\\ &= 2+2\underset{\sim}{a}\cdot\underset{\sim}{b}\end{aligned}"
      />
    ),
    reason: (
      <>
        That rule is the dot product: a vector dotted with itself is its magnitude squared,{' '}
        <Katex tex="\underset{\sim}{v}\cdot\underset{\sim}{v} = |\underset{\sim}{v}|^2" />. Expand like brackets
        (<Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = \underset{\sim}{b}\cdot\underset{\sim}{a}" />), then
        use <Katex tex="|\underset{\sim}{a}| = |\underset{\sim}{b}| = 1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="1 = 2+2\underset{\sim}{a}\cdot\underset{\sim}{b} \;\implies\; \underset{\sim}{a}\cdot\underset{\sim}{b} = -\tfrac12" />,
    reason: (
      <>
        Set equal to <Katex tex="|\underset{\sim}{a}+\underset{\sim}{b}|^2=1^2=1" /> and solve. Since{' '}
        <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = |\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta = \cos\theta" />,
        this says <Katex tex="\cos\theta=-\tfrac12" />, and since the angle between two vectors lies
        in <Katex tex="[0^\circ,180^\circ]" />, the angle between them is <Katex tex="120^\circ" />. (You don&apos;t
        actually need the angle: <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}" /> is enough for the next
        step.)
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}|\underset{\sim}{a}-\underset{\sim}{b}|^2 &= (\underset{\sim}{a}-\underset{\sim}{b})\cdot(\underset{\sim}{a}-\underset{\sim}{b})\\ &= |\underset{\sim}{a}|^2-2\underset{\sim}{a}\cdot\underset{\sim}{b}+|\underset{\sim}{b}|^2\\ &= 2-2\left(-\tfrac12\right) = 3\end{aligned}"
      />
    ),
    reason: <>The same expansion for the difference; only the sign of the middle term changes.</>,
  },
  {
    working: <Katex display tex="\boxed{|\underset{\sim}{a}-\underset{\sim}{b}| = \sqrt3}" />,
    reason: (
      <>
        Matches option <b>D</b> (a magnitude is never negative, so take the positive root). Option C,{' '}
        <Katex tex="\sqrt2" />, is the length of the difference of two <em>perpendicular</em> unit vectors, but their
        sum also has length <Katex tex="\sqrt2" />, not 1, so perpendicular vectors don&apos;t fit the question. Option
        A, 0, would need <Katex tex="\underset{\sim}{a}=\underset{\sim}{b}" />, and then the sum has length 2.
        Geometrically, as in the report: <Katex tex="\underset{\sim}{a}" />, <Katex tex="\underset{\sim}{b}" /> and{' '}
        <Katex tex="\underset{\sim}{a}+\underset{\sim}{b}" /> form an equilateral triangle, so{' '}
        <Katex tex="\underset{\sim}{a}" /> and <Katex tex="-\underset{\sim}{b}" /> meet at <Katex tex="120^\circ" />, and
        the cosine rule gives <Katex tex="\sqrt3" />.
      </>
    ),
  },
]

export default function SpecialistQ15_2023() {
  return (
    <MCQShell
      question={<p>If the sum of two unit vectors is a unit vector, then the magnitude of the difference of the two vectors is</p>}
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac{1}{\sqrt2}" /> },
        { letter: 'C', content: <Katex tex="\sqrt2" /> },
        { letter: 'D', content: <Katex tex="\sqrt3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\sqrt5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="Only a 120° angle makes the sum of two unit vectors a unit vector">
          <UnitSumWidget />
        </Explore>
      }
    />
  )
}
