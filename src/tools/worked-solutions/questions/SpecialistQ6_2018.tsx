// 2018 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 58% correct. The
// area of the triangle with vertices z, iz and z+iz in the Argand plane. Question text
// transcribed from the original paper; VCAA printed no diagram and neither does the stem
// here (guide §7). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 9, C: 58, D: 10, E: 18 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|iz| = |i||z| = |z|" />,
    reason: <>Multiplying by <Katex tex="i" /> does not change the modulus, so <Katex tex="z" /> and <Katex tex="iz" /> are the same distance from the origin.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(iz) = \operatorname{Arg}(z) + \frac{\pi}{2}" />,
    reason: <>Multiplying by <Katex tex="i" /> rotates by a quarter turn anticlockwise. So <Katex tex="z" /> and <Katex tex="iz" /> are perpendicular vectors of <em>equal length</em>.</>,
  },
  {
    working: <Katex display tex="0,\ z,\ z+iz,\ iz \ \text{ form a square of side } |z|" />,
    reason: <>Two perpendicular equal-length sides from the origin, with <Katex tex="z+iz" /> completing the parallelogram — which is therefore a square.</>,
  },
  {
    working: <Katex display tex="\text{Square area} = |z|^2" />,
    reason: <>Side squared.</>,
  },
  {
    working: <Katex display tex="\text{Triangle } z,\ iz,\ z+iz \ \text{ is half the square}" />,
    reason: <>The square's diagonal from <Katex tex="z" /> to <Katex tex="iz" /> cuts it into two congruent triangles. One contains the origin; the other is the one asked about.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac{|z|^2}{2}}" />,
    reason: <>Matches option <b>C</b>. Option <b>D</b> <Katex tex="\left(|z|^2\right)" /> is the whole square rather than the triangle. Option <b>E</b>, chosen by <Katex tex="18\%" />, is the area of an <em>equilateral</em> triangle of side <Katex tex="|z|" /> — but this triangle is right-angled and isosceles, not equilateral.</>,
  },
]

export default function SpecialistQ6_2018() {
  return (
    <MCQShell
      question={
        <p>
          The complex numbers <Katex tex="z" />, <Katex tex="iz" /> and{' '}
          <Katex tex="z+iz" />, where <Katex tex="z\in C\setminus\{0\}" />, are
          plotted in the Argand plane, forming the vertices of a triangle. The area of this
          triangle is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="|z|" /> },
        { letter: 'B', content: <Katex tex="|z|+|z|^2" /> },
        { letter: 'C', content: <Katex tex="\dfrac{|z|^2}{2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="|z|^2" /> },
        { letter: 'E', content: <Katex tex="\dfrac{\sqrt3\,|z|^2}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="What multiplying by i does">
          <p>
            Multiplying a complex number by <Katex tex="i" /> is a rotation of{' '}
            <Katex tex="90^\circ" /> anticlockwise about the origin, and nothing else — the
            length is unchanged. So <Katex tex="z" /> and <Katex tex="iz" /> are always two
            perpendicular arrows of the same length.
          </p>
          <p>
            That makes the answer independent of which <Katex tex="z" /> you pick, which is
            why the options are in terms of <Katex tex="|z|" /> alone. If it helps, test{' '}
            <Katex tex="z=1" />: the vertices are <Katex tex="1" />, <Katex tex="i" /> and{' '}
            <Katex tex="1+i" />, a right-angled triangle with legs of length <Katex tex="1" />{' '}
            and area <Katex tex="\tfrac12" /> ✓
          </p>
        </Background>
      }
    />
  )
}
