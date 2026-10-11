// 2021 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 69% correct.
// A bearing turned into components, then a second leg added. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 69, C: 6, D: 14, E: 6 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{S}30^\circ\text{W}: \ 30^\circ \text{ from due south, towards the west}" />,
    reason: <>In a compass direction like S30°W, the first letter is the direction you measure from and the last letter is the direction you turn towards: face south, then turn 30° towards west.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{west part} &= 5\sin(30^\circ) = \tfrac52 \\ \text{south part} &= 5\cos(30^\circ) = \tfrac{5\sqrt3}{2} \end{aligned}" />,
    reason: <>In a right-angled triangle with hypotenuse 5 km and the 30° between the path and south, south is adjacent (<Katex tex="\cos" />) and west is opposite (<Katex tex="\sin" />).</>,
    more: <>Sketch it: the 5 km path is the hypotenuse, and the 30° angle sits at the start, between the path and the line pointing due south. Sense check: the path is only 30° off south, so the south part should be the bigger one, and <Katex tex="\tfrac{5\sqrt3}{2}\approx4.33" /> is bigger than <Katex tex="2.5" />.</>,
  },
  {
    working: <Katex display tex="\text{first leg: } -\tfrac52\underset{\sim}{i}-\tfrac{5\sqrt3}{2}\underset{\sim}{j}" />,
    reason: <>Both components negative: west is <Katex tex="-\underset{\sim}{i}" />, south is <Katex tex="-\underset{\sim}{j}" />.</>,
  },
  {
    working: <Katex display tex="\text{second leg: } 10\underset{\sim}{j}" />,
    reason: <>Due north, so no east–west change at all.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a} = \left(-\tfrac52\underset{\sim}{i}-\tfrac{5\sqrt3}{2}\underset{\sim}{j}\right)+10\underset{\sim}{j}" />,
    reason: <>The position vector relative to the start is the sum of the two displacements: add the <Katex tex="\underset{\sim}{i}" /> parts and the <Katex tex="\underset{\sim}{j}" /> parts separately.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{a} = -\tfrac52\underset{\sim}{i}+\left(10-\tfrac{5\sqrt3}{2}\right)\underset{\sim}{j}}" />,
    reason: <>Matches option <b>B</b>: about 2.5 km west and <Katex tex="10-4.33\approx5.67" /> km north of the start.</>,
    more: <>Option A is the first leg only, leaving out the walk north. Option D, the most common wrong choice, swaps sine and cosine in the first leg (measuring the 30° from west instead of south). Option C leaves out the first leg's south part. Option E reverses the first leg, as if the hikers had walked N30°E.</>,
  },
]

export default function SpecialistQ11_2021() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="\underset{\sim}{i}" /> be a unit vector pointing east and let{' '}
          <Katex tex="\underset{\sim}{j}" /> be a unit vector pointing north.
          <br />
          A group of hikers travels 5 km in the direction south 30° west and then north for 10
          km.
          <br />
          The position vector <Katex tex="\underset{\sim}{a}" /> of the group of hikers with
          respect to the starting point is
        </p>
      }
      options={[
        {
          letter: 'A',
          content: <Katex tex="\underset{\sim}{a}=-\tfrac52\underset{\sim}{i}-\tfrac{5\sqrt3}{2}\underset{\sim}{j}" />,
        },
        {
          letter: 'B',
          content: <Katex tex="\underset{\sim}{a}=-\tfrac52\underset{\sim}{i}+\left(10-\tfrac{5\sqrt3}{2}\right)\underset{\sim}{j}" />,
          isAnswer: true,
        },
        {
          letter: 'C',
          content: <Katex tex="\underset{\sim}{a}=-\tfrac52\underset{\sim}{i}+10\underset{\sim}{j}" />,
        },
        {
          letter: 'D',
          content: <Katex tex="\underset{\sim}{a}=-\tfrac{5\sqrt3}{2}\underset{\sim}{i}+\tfrac{15}{2}\underset{\sim}{j}" />,
        },
        {
          letter: 'E',
          content: <Katex tex="\underset{\sim}{a}=\tfrac52\underset{\sim}{i}+\left(10+\tfrac{5\sqrt3}{2}\right)\underset{\sim}{j}" />,
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
