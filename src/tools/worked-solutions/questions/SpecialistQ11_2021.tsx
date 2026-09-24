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
    working: <Katex display tex="\text{S}30^\circ\text{W}: \ 30^\circ \text{ measured from due south, towards the west}" />,
    reason: <>So the displacement is mostly south with a smaller west part — the <Katex tex="\sin" /> goes with the east–west component, not the other way round.</>,
  },
  {
    working: <Katex display tex="5\left(-\sin(30^\circ)\underset{\sim}{i}-\cos(30^\circ)\underset{\sim}{j}\right) = -\tfrac52\underset{\sim}{i}-\tfrac{5\sqrt3}{2}\underset{\sim}{j}" />,
    reason: <>Both components negative: west is <Katex tex="-\underset{\sim}{i}" />, south is <Katex tex="-\underset{\sim}{j}" />.</>,
  },
  {
    working: <Katex display tex="\text{second leg: } 10\underset{\sim}{j}" />,
    reason: <>Due north, so no east–west change at all.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{a} = -\tfrac52\underset{\sim}{i}+\left(10-\tfrac{5\sqrt3}{2}\right)\underset{\sim}{j}}" />,
    reason: <>Adding the two displacements: about 2.5 km west and 5.67 km north of the start. Matches option <b>B</b>. Option A leaves out the second leg; option D swaps sine and cosine in the first.</>,
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
