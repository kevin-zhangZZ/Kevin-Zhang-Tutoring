// 2024 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 58% correct.
// Distance between parallel lines: one cross product, no simultaneous equations. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 58, C: 28, D: 6 },
  answer: 'B',
  comment: (
    <>
      If <Katex tex="\underset{\sim}{r}_1=\underset{\sim}{a}+s\underset{\sim}{d}" /> and <Katex tex="\underset{\sim}{r}_2=\underset{\sim}{b}+t\underset{\sim}{d}" />
      <br />
      Then shortest distance <Katex tex="=\left|\hat{\underset{\sim}{d}}\times(\underset{\sim}{a}-\underset{\sim}{b})\right|" />
      <br />
      <Katex tex="=\left|\dfrac{1}{\sqrt{3}}\left(\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}\right)\times\left(3\underset{\sim}{i}+2\underset{\sim}{j}-2\underset{\sim}{k}\right)\right|" />
      <br />
      <Katex tex="=\left|\dfrac{1}{\sqrt{3}}\left(-4\underset{\sim}{i}+5\underset{\sim}{j}-\underset{\sim}{k}\right)\right|" />
      <br />
      <Katex tex="=\sqrt{14}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{d} = \underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k} \ \text{ for both lines}" />,
    reason: <>They really are parallel, which is what makes the shortest distance the same from every point of one line to the other.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a_1} = (1,3,1), \quad \underset{\sim}{a_2} = (-2,1,3) \implies \underset{\sim}{a_2}-\underset{\sim}{a_1} = (-3,-2,2)" />,
    reason: <>Any point of each line will do.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\times\underset{\sim}{d} = \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\-3 & -2 & 2\\1 & 1 & 1\end{vmatrix} = -4\underset{\sim}{i}+5\underset{\sim}{j}-\underset{\sim}{k}"
      />
    ),
    reason: <>For <em>parallel</em> lines the cross product of the two directions is zero, so the formula uses <Katex tex="\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\times\underset{\sim}{d}" /> instead.</>,
  },
  {
    working: <Katex display tex="d = \frac{\left|\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\times\underset{\sim}{d}\right|}{\left|\underset{\sim}{d}\right|} = \frac{\sqrt{16+25+1}}{\sqrt3}" />,
    reason: <>The perpendicular component of the joining vector.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{\sqrt{42}}{\sqrt3} = \sqrt{14}}" />,
    reason: <>Matches option <b>B</b>; about <Katex tex="3.74" />. Option <b>C</b>, <Katex tex="\sqrt{17}" />, is just the distance between the two named <em>points</em>, <Katex tex="\left|\underset{\sim}{a_2}-\underset{\sim}{a_1}\right|" />; option <b>A</b>, 3, is <Katex tex="\left|\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\cdot\underset{\sim}{d}\right|" /> without dividing by <Katex tex="\left|\underset{\sim}{d}\right|" />; option <b>D</b> is the square of the answer.</>,
  },
]

export default function SpecialistQ17_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>Consider the following parallel lines.</p>
          <p>
            <Katex tex="L_1:\underset{\sim}{r_1} = \underset{\sim}{i}+3\underset{\sim}{j}+\underset{\sim}{k}+s\left(\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}\right)" />{' '}
            and{' '}
            <Katex tex="L_2:\underset{\sim}{r_2} = -2\underset{\sim}{i}+\underset{\sim}{j}+3\underset{\sim}{k}+t\left(\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}\right)" />{' '}
            where <Katex tex="s,t\in R" />.
          </p>
          <p>
            The shortest distance between <Katex tex="L_1" /> and <Katex tex="L_2" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="3" /> },
        { letter: 'B', content: <Katex tex="\sqrt{14}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\sqrt{17}" /> },
        { letter: 'D', content: <Katex tex="14" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
