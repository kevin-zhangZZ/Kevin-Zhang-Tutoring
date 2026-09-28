// 2020 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 53% correct.
// Maximising the area of a triangle under a parabola. Question text transcribed from the original
// paper; the figure is a crop of VCAA's own artwork; solution is original. Answer D checked with
// sympy (A′(m) = −3(m² − 3)/2, A(√3) = 3√3; A(1) = 4, A(2) = 5), against itute (D: "C(√3, 6), max
// area = 3√3") and the tutors' videos (LMK substitutes m = √3 back; Mr Nie warns not to forget to). The report
// prints no comment for this question. Option C (√3) is the value of m at the maximum; no clean slip
// was found for A, B or E, so they are not attributed.
// Interactive diagram (§15): interactives/meth-2020e2-mcq16-tradeoff.tsx drags C along the parabola
// beside a graph of A(m) against m, showing the base-versus-height trade-off, the zero area at both
// ends of (0, 3), and the peak (√3, 3√3) with its two coordinates labelled separately (where vs how
// much, the C-versus-D trap). This site's own explanatory figure; it is not the VCAA figure.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import triangleSrc from './meth-2020-mcq16-triangle.png'

const TradeOffWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq16-tradeoff'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 16, C: 17, D: 53, E: 6 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="OB = m, \qquad BC = 9-m^2" />,
    reason: (
      <>
        The right angle is at <Katex tex="B" />, so the two sides that meet there are the base and the height. The base
        runs along the <Katex tex="x" />-axis from <Katex tex="O" /> to <Katex tex="B(m,0)" />: length <Katex tex="m" />. The
        height runs straight up from <Katex tex="B" /> to the parabola, so it is the parabola&apos;s <Katex tex="y" />-value at{' '}
        <Katex tex="x=m" />: <Katex tex="9-m^2" />. (The domain stops at <Katex tex="m=3" /> because that is where the
        parabola meets the <Katex tex="x" />-axis.)
      </>
    ),
  },
  {
    working: <Katex display tex="A(m) = \tfrac12 m\left(9-m^2\right) = \tfrac12\left(9m-m^3\right)" />,
    reason: (
      <>
        Area <Katex tex="=\tfrac12\times\text{base}\times\text{height}" />, written as a function of <Katex tex="m" />, the one
        thing that changes. Before any calculus, think about the ends: near <Katex tex="m=0" /> the base vanishes, and near{' '}
        <Katex tex="m=3" /> the height vanishes, so the area is close to 0 at both ends. Moving <Katex tex="C" /> right
        lengthens the base but shortens the height, so somewhere in between the area must peak. Slide <Katex tex="C" /> in
        the diagram below to watch this trade-off.
      </>
    ),
  },
  {
    working: <Katex display tex="A'(m) = \tfrac12\left(9-3m^2\right)" />,
    reason: (
      <>
        At the top of a smooth hump the graph is momentarily flat, so its gradient is zero: that is why we differentiate
        and set <Katex tex="A'(m)=0" />. Expanding first makes this a one-line derivative, with no product rule.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\tfrac12\left(9-3m^2\right) = 0 \implies m^2 = 3" />
        <Katex display tex="\implies m = \sqrt3 \quad (m\in(0,3))" />
      </>
    ),
    reason: (
      <>
        <Katex tex="m=-\sqrt3" /> is rejected: it is outside <Katex tex="(0,3)" />, and a length can&apos;t be negative. On CAS,{' '}
        <Cas fn="fMax">fMax(0.5m(9 − m^2), m) | 0 &lt; m &lt; 3</Cas> gives <Katex tex="m=\sqrt3" /> in one step, but it
        returns the value of <Katex tex="m" />, not the area.
      </>
    ),
  },
  {
    working: <Katex display tex="A'(1) = 3 > 0, \qquad A'(2) = -\tfrac32 < 0" />,
    reason: (
      <>
        Confirm it is a maximum: the area is increasing just before <Katex tex="\sqrt3\approx1.73" /> and decreasing just
        after, so <Katex tex="m=\sqrt3" /> is the top of the hump, not the bottom of a dip. Together with the zero area at
        both ends, this is the largest area on the whole domain.
      </>
    ),
  },
  {
    working: <Katex display tex="A\!\left(\sqrt3\right) = \tfrac12\times\sqrt3\times\left(9-3\right) = \tfrac12\times\sqrt3\times6" />,
    reason: (
      <>
        Substitute back. <Katex tex="m=\sqrt3" /> says <em>where</em> the maximum happens; the question asks for the maximum{' '}
        <em>area</em>, which is <Katex tex="A(\sqrt3)" />. (The corner is then <Katex tex="C(\sqrt3,\,6)" />: base{' '}
        <Katex tex="\sqrt3" />, height 6.)
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{3\sqrt3}" />,
    reason: (
      <>
        Matches option <b>D</b>. Check: <Katex tex="3\sqrt3\approx5.20" />, a little above <Katex tex="A(2)=5" /> and{' '}
        <Katex tex="A(1)=4" />, which is just what the top of the hump should look like. Option <b>C</b> (
        <Katex tex="\sqrt3" />) is the value of <Katex tex="m" /> at the maximum, not the area (see below).
      </>
    ),
  },
]

export default function MethodsQ16_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A right-angled triangle, <Katex tex="OBC" />, is formed using the horizontal axis
            and the point <Katex tex="C\left(m,9-m^2\right)" />, where{' '}
            <Katex tex="m\in(0,3)" />, on the parabola <Katex tex="y=9-x^2" />, as shown
            below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={triangleSrc}
              alt="The parabola y = 9 − x² in the first quadrant with a shaded right-angled triangle from the origin O to B(m, 0) to C(m, 9 − m²) — from the original 2020 VCAA exam paper"
              className="w-full max-w-[330px]"
            />
          </div>
          <p>The maximum area of the triangle <Katex tex="OBC" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{\sqrt3}{3}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{2\sqrt3}{3}" /> },
        { letter: 'C', content: <Katex tex="\sqrt3" /> },
        { letter: 'D', content: <Katex tex="3\sqrt3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="9\sqrt3" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="A longer base means a shorter height: the area rises, peaks at m = √3, then falls, and the peak's height is the answer">
            <TradeOffWidget />
          </Explore>
          <WrongMethod
            title="A′(m) = 0 gives m = √3, so the answer is √3"
            source="17% chose C"
            working={
              <>
                <Katex display tex="A'(m) = 0 \implies m = \sqrt3" />
                <Katex display tex="\implies \text{maximum} = \sqrt3 \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              Solving <Katex tex="A'(m)=0" /> finds the <em>position</em> of the peak: how far along the <Katex tex="x" />
              -axis <Katex tex="B" /> is when the triangle is biggest. The maximum area is the <em>height</em> of the peak,{' '}
              <Katex tex="A(\sqrt3)=3\sqrt3" />. Substituting back is the easiest step to forget, because CAS&apos;s{' '}
              <Cas fn="fMax">fMax</Cas> stops at <Katex tex="m=\sqrt3" /> too.
            </p>
            <p>
              A quick check catches it: at <Katex tex="m=1" /> the triangle already has area{' '}
              <Katex tex="\tfrac12\times1\times8=4" />, which is bigger than <Katex tex="\sqrt3\approx1.73" />, so{' '}
              <Katex tex="\sqrt3" /> can&apos;t be the <em>maximum</em> area. Next time, ask what the question wants (an
              area, a length, a time) and make sure the final line is that quantity.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
