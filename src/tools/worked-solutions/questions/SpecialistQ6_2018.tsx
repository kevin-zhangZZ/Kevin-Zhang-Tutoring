// 2018 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 58% correct. The
// area of the triangle with vertices z, iz and z+iz in the Argand plane. Question text
// transcribed from the original paper; VCAA printed no diagram and neither does the stem
// here (guide §7). Solution is original.
// Widget (interactives/spec-2018-mcq6-half-square.tsx): drag z; 0, z, z + iz, iz is always a
// square of side |z| and the triangle is half of it; a toggle draws the equilateral triangle on
// side z–iz, whose area √3|z|²/2 is option E. WrongMethod: assuming the triangle is equilateral
// (option E, 18%). The report has no comment on this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const HalfSquare = lazyWidget(() => import('../interactives/spec-2018-mcq6-half-square'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 9, C: 58, D: 10, E: 18 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|iz| = |i||z| = |z|" />,
    reason: (
      <>
        Every option is in terms of <Katex tex="|z|" /> alone, so the area can&apos;t depend on which way <Katex tex="z" /> points.
        That says: think about what multiplying by <Katex tex="i" /> does geometrically. First, it doesn&apos;t change the modulus,
        so <Katex tex="z" /> and <Katex tex="iz" /> are the same distance from the origin.
      </>
    ),
  },
  {
    working: <Katex display tex="\operatorname{Arg}(iz) = \operatorname{Arg}(z) + \frac{\pi}{2}" />,
    reason: (
      <>
        Multiplying adds arguments, and <Katex tex="\operatorname{Arg}(i) = \frac{\pi}{2}" />: a quarter turn anticlockwise. So{' '}
        <Katex tex="z" /> and <Katex tex="iz" /> are perpendicular arrows of <em>equal length</em>.
      </>
    ),
  },
  {
    working: <Katex display tex="0,\ z,\ z+iz,\ iz \ \text{ form a square of side } |z|" />,
    reason: (
      <>
        Adding tip-to-tail, <Katex tex="z+iz" /> is the fourth corner of the parallelogram on <Katex tex="z" /> and{' '}
        <Katex tex="iz" />. A parallelogram with two equal, perpendicular sides is a square.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Square area} = |z|^2" />,
    reason: <>Side squared.</>,
  },
  {
    working: <Katex display tex="\text{Triangle } z,\ iz,\ z+iz \ \text{ is half the square}" />,
    reason: (
      <>
        The square&apos;s diagonal from <Katex tex="z" /> to <Katex tex="iz" /> cuts it into two congruent triangles. One contains
        the origin; the other is the one asked about, with its right angle at <Katex tex="z+iz" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac{|z|^2}{2}}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>D</b>, <Katex tex="|z|^2" />, is the whole square: the halving is left out. Option{' '}
        <b>E</b> (<Katex tex="18\%" />) is the area an <em>equilateral</em> triangle would have if every side were{' '}
        <Katex tex="|z - iz| = \sqrt2|z|" />: <Katex tex="\tfrac{\sqrt3}{4}\left(\sqrt2|z|\right)^2 = \tfrac{\sqrt3|z|^2}{2}" />. But
        only that one side is <Katex tex="\sqrt2|z|" />; the other two are <Katex tex="|z|" />.
      </>
    ),
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
      extras={
        <>
          <Explore title="Multiplying by i turns z a quarter-turn, so the triangle is half a square">
            <HalfSquare />
          </Explore>
          <WrongMethod
            title="It looks like an equilateral triangle, so use √3/4 × side²"
            source="18% chose E"
            working={
              <>
                <Katex display tex="\text{side} = |z - iz| = \sqrt2\,|z|" />
                <Katex display tex="\text{Area} = \tfrac{\sqrt3}{4}\left(\sqrt2|z|\right)^2 = \tfrac{\sqrt3|z|^2}{2}" />
                <Katex display tex="\text{(option E)}" />
              </>
            }
          >
            <p>
              Only one side, from <Katex tex="z" /> to <Katex tex="iz" />, has length <Katex tex="\sqrt2|z|" />. The other two sides
              are copies of <Katex tex="iz" /> and <Katex tex="z" /> slid into place, so they have length <Katex tex="|z|" /> and meet
              at a right angle at <Katex tex="z+iz" />. Test <Katex tex="z = 1" /> to catch it: the triangle <Katex tex="1,\ i,\ 1+i" />{' '}
              is plainly right-angled, with area <Katex tex="\tfrac12" />, not <Katex tex="\tfrac{\sqrt3}{2}" />.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
