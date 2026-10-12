// 2024 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 68% correct.
// Substitute the parametrised line into the plane and solve for the parameter. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 9, C: 14, D: 68 },
  answer: 'D',
  comment: (
    <>
      Need to find the value of <Katex tex="t" /> for which <Katex tex="\underset{\sim}{r}" /> is
      a point on the plane
      <br />
      <Katex tex="\therefore" /> Substitute <Katex tex="x=1-2t,\ y=1+t,\ z=-2+3t" /> into the
      equation of the plane
      <br />
      <Katex tex="3(1-2t)-2(1+t)+4(-2+3t)=5" />
      <br />
      Solve for <Katex tex="t" />
      <br />
      <Katex tex="t=3" />
      <br />
      Substitute into the equation of the line
      <br />
      Point <Katex tex="=\underset{\sim}{r}(3)" />
      <br />
      <Katex tex="=(1-6,1+3,-2+9)" />
      <br />
      <Katex tex="=(-5,4,7)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = 1-2t, \qquad y = 1+t, \qquad z = -2+3t" />,
    reason: <>Each component of the line: the constant from the point, plus <Katex tex="t" /> times the direction component.</>,
  },
  {
    working: <Katex display tex="3(1-2t)-2(1+t)+4(-2+3t) = 5" />,
    reason: <>The intersection point is on both, so its coordinates must satisfy the plane’s equation. This leaves one unknown, <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="3-6t-2-2t-8+12t = 4t-7" />,
    reason: <>Expand and collect: <Katex tex="t" /> terms <Katex tex="-6-2+12=4" />, constants <Katex tex="3-2-8=-7" />.</>,
  },
  {
    working: <Katex display tex="4t-7 = 5 \implies t = 3" />,
    reason: <>A single value, so the line meets the plane exactly once.</>,
    more: (
      <>
        If the <Katex tex="t" /> terms had cancelled completely, the line would be parallel to the plane: no
        intersection (a false statement like <Katex tex="-7=5" />) or lying in it (a true one).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{r}(3)=(1-6,\ 1+3,\ -2+9) = (-5,\,4,\,7)}" />,
    reason: (
      <>
        Substitute <Katex tex="t=3" /> back into the line. Matches option <b>D</b>.
      </>
    ),
    more: (
      <>
        Check it is on the plane: <Katex tex="3(-5)-2(4)+4(7) = -15-8+28 = 5" /> ✓. The point must be on{' '}
        <em>both</em> the line and the plane, and each distractor fails at least one. Option <b>B</b>,{' '}
        <Katex tex="(-1,2,1)" />, is on the line (<Katex tex="t=1" />) but not the plane:{' '}
        <Katex tex="3(-1)-2(2)+4(1)=-3" />. Option <b>C</b>, <Katex tex="(3,4,1)" />, is on the plane (
        <Katex tex="9-8+4=5" />) but not the line: <Katex tex="x=3" /> needs <Katex tex="t=-1" />, which gives{' '}
        <Katex tex="y=0" />. Option <b>A</b>, <Katex tex="(-5,-1,2)" />, is on neither:{' '}
        <Katex tex="3(-5)-2(-1)+4(2)=-5" />, and <Katex tex="x=-5" /> needs <Katex tex="t=3" />, which gives{' '}
        <Katex tex="y=4" />.
      </>
    ),
  },
]

export default function SpecialistQ18_2024() {
  return (
    <MCQShell
      question={
        <p>
          The point of intersection of the line{' '}
          <Katex tex="\underset{\sim}{r} = \underset{\sim}{i}+\underset{\sim}{j}-2\underset{\sim}{k}+t\left(-2\underset{\sim}{i}+\underset{\sim}{j}+3\underset{\sim}{k}\right)" />,
          where <Katex tex="t\in R" /> and the plane{' '}
          <Katex tex="3x-2y+4z=5" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-5,-1,2)" /> },
        { letter: 'B', content: <Katex tex="(-1,2,1)" /> },
        { letter: 'C', content: <Katex tex="(3,4,1)" /> },
        { letter: 'D', content: <Katex tex="(-5,4,7)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
