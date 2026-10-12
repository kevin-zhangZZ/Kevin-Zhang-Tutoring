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
    reason: <>Same direction, so the lines are parallel and the gap between them is the same everywhere.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\underset{\sim}{a_1} &= (1,3,1), \quad \underset{\sim}{a_2} = (-2,1,3)\\ \underset{\sim}{a_2}-\underset{\sim}{a_1} &= (-3,-2,2)\end{aligned}"
      />
    ),
    reason: <>Take one known point on each line (<Katex tex="s=0" />, <Katex tex="t=0" />) and the vector joining them.</>,
    more: (
      <>
        Any point on each line would do: moving along a line only adds a multiple of{' '}
        <Katex tex="\underset{\sim}{d}" />, which doesn’t change the perpendicular gap. But{' '}
        <Katex tex="\left|\underset{\sim}{a_2}-\underset{\sim}{a_1}\right|=\sqrt{17}" /> itself is <em>not</em> the
        answer — these two points are not directly opposite each other.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\times\underset{\sim}{d}\\ &= \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\-3 & -2 & 2\\1 & 1 & 1\end{vmatrix} = -4\underset{\sim}{i}+5\underset{\sim}{j}-\underset{\sim}{k}\end{aligned}"
      />
    ),
    reason: (
      <>
        To get the perpendicular gap, cross the joining vector with <Katex tex="\underset{\sim}{d}" />: its magnitude is{' '}
        <Katex tex="\left|\underset{\sim}{a_2}-\underset{\sim}{a_1}\right|\left|\underset{\sim}{d}\right|\sin\theta" />{' '}
        (<Katex tex="\theta" /> is the angle between them), and <Katex tex="\left|\underset{\sim}{a_2}-\underset{\sim}{a_1}\right|\sin\theta" /> is exactly that gap.
      </>
    ),
    more: (
      <>
        Picture the joining vector
        as the hypotenuse of a right-angled triangle: one side runs along the lines, the other (opposite{' '}
        <Katex tex="\theta" />) is the perpendicular distance. Components:{' '}
        <Katex tex="\underset{\sim}{i}:(-2)(1)-(2)(1)=-4" />,{' '}
        <Katex tex="\underset{\sim}{j}:-\big[(-3)(1)-(2)(1)\big]=5" />,{' '}
        <Katex tex="\underset{\sim}{k}:(-3)(1)-(-2)(1)=-1" />. The examiner’s report does the same with{' '}
        <Katex tex="\hat{\underset{\sim}{d}}" /> in place of <Katex tex="\underset{\sim}{d}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{distance} = \frac{\left|\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\times\underset{\sim}{d}\right|}{\left|\underset{\sim}{d}\right|} = \frac{\sqrt{16+25+1}}{\sqrt3}" />,
    reason: <>Dividing by <Katex tex="\left|\underset{\sim}{d}\right|=\sqrt3" /> leaves just the perpendicular gap.</>,
    more: (
      <>
        Check without the cross product, by Pythagoras. The component of{' '}
        <Katex tex="\underset{\sim}{a_2}-\underset{\sim}{a_1}" /> along the lines is its scalar resolute{' '}
        <Katex tex="\dfrac{(-3)+(-2)+2}{\sqrt3}=-\sqrt3" />, so the perpendicular part has length{' '}
        <Katex tex="\sqrt{17-3}=\sqrt{14}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{\sqrt{42}}{\sqrt3} = \sqrt{14}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: (
      <>
        Option <b>C</b>, <Katex tex="\sqrt{17}" /> (28%), is the distance between the two starting{' '}
        <em>points</em>, <Katex tex="\left|\underset{\sim}{a_2}-\underset{\sim}{a_1}\right|" />, which is longer than the
        perpendicular gap. Option <b>A</b>, 3, is{' '}
        <Katex tex="\left|\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\cdot\underset{\sim}{d}\right|" />
        , a dot product with the unnormalised <Katex tex="\underset{\sim}{d}" />: the along-the-line
        component’s size, <Katex tex="\sqrt3" />, scaled up by <Katex tex="\left|\underset{\sim}{d}\right|=\sqrt3" />. It is
        not the gap across the lines. Option <b>D</b> is the square of the answer.
      </>
    ),
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
