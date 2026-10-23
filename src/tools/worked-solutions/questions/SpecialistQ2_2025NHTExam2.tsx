// 2025 Specialist NHT — Exam 2, Section B Question 2 (10 marks). The NHT report gives a sample
// answer for each part only, with no statistics; for c.i. and d. it prints a one-line note with
// its sketch, which is transcribed as that part's report comment. The locus |z − 2i| = Im(z + i)
// (the parabola 6y = x² + 3), the tangent ray from the origin and its point of contact, the
// conjugate locus (its reflection 6y = −x² − 3), a perpendicular bisector |z| = |z − (c + id)|
// through −1 and 3 + 2i, and the area between that line and the parabola. Question text
// transcribed from the original paper (which has no text layer; read from the page images). The
// Argand diagram is the actual VCAA figure, cropped from page 14 of the original exam PDF at
// 300 dpi (spec-2025nhte2-q2b-argand.png); the answers to b., c.i. and d. are an SVG overlay on
// that crop (origin at (629, 532.5), 168 px per unit on Re(z) and 153.9 px per unit on Im(z),
// measured from the printed gridlines and checked with a PIL composite), and part e.ii.'s
// shaded region is this site's own explanatory overlay on the same crop. Answers checked with
// sympy and against the report's sample answers, which agree: c.ii. y = x/√3, x > 0;
// c.iii. √3 + i; e.i. c = −2/5, d = 4/5; e.ii. 3/4. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import argandSrc from './spec-2025nhte2-q2b-argand.png'

const OX = 629
const OY = 532.5
const SX = 168
const SY = 153.9
const px = (x: number) => OX + x * SX
const py = (y: number) => OY - y * SY
const ORANGE = '#f97316'
const BLUE = '#0ea5e9'
const LABEL = { fontSize: 44, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

function curve(fn: (x: number) => number, x0: number, x1: number, n = 120) {
  const pts: string[] = []
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n
    pts.push(`${px(x).toFixed(1)},${py(fn(x)).toFixed(1)}`)
  }
  return pts.join(' ')
}

const upper = (x: number) => (x * x + 3) / 6
const lower = (x: number) => -(x * x + 3) / 6
const chord = (x: number) => (x + 1) / 2
const S3 = Math.sqrt(3)

// Region between the line (above) and the parabola (below) for 0 ≤ x ≤ 3.
const REGION = `${curve(chord, 0, 3, 2)} ${curve(upper, 3, 0)}`

type Stage = 'b' | 'c' | 'd' | 'e'

const ALT: Record<Stage, string> = {
  b: "VCAA's Argand diagram with the answer drawn over it: the parabola 6y = x² + 3 for −3 ≤ Re(z) ≤ 3, lowest at i/2, with its endpoints labelled (−3, 2) and (3, 2)",
  c: "VCAA's Argand diagram with the parabola 6y = x² + 3 and the ray from the origin (an open circle at O) touching the parabola at √3 + i and continuing to the upper right",
  d: "VCAA's Argand diagram with the parabola 6y = x² + 3, the tangent ray from the origin, and below the real axis the reflected parabola 6y = −x² − 3 for −3 ≤ Re(z) ≤ 3, labelled with its equation",
  e: "This site's explanatory overlay on VCAA's Argand diagram: the line y = (x + 1)/2 through −1 and 3 + 2i cuts the parabola 6y = x² + 3 at i/2 and 3 + 2i, and the region between them, with the line on top, is shaded",
}

function ArgandAnswer({ stage }: { stage: Stage }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[440px]">
        <img loading="lazy" decoding="async" src={argandSrc} alt={ALT[stage]} className="w-full block" />
        <svg viewBox="0 0 1366 1010" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {stage === 'e' && (
            <g>
              <polygon points={REGION} fill={ORANGE} fillOpacity={0.3} stroke="none" />
              <polyline points={curve(chord, -3.4, 3.37, 2)} fill="none" stroke={BLUE} strokeWidth={7} />
            </g>
          )}
          <polyline points={curve(upper, -3, 3)} fill="none" stroke={ORANGE} strokeWidth={7} />
          {stage === 'b' && (
            <g>
              <circle cx={px(-3)} cy={py(2)} r={12} fill="#c2410c" />
              <circle cx={px(3)} cy={py(2)} r={12} fill="#c2410c" />
              <text x={px(-3) + 22} y={py(2) - 22} {...LABEL}>(−3, 2)</text>
              <text x={px(3) - 22} y={py(2) - 22} textAnchor="end" {...LABEL}>(3, 2)</text>
            </g>
          )}
          {(stage === 'c' || stage === 'd') && (
            <g>
              <line x1={px(0)} y1={py(0)} x2={px(3.3)} y2={py(3.3 / S3)} stroke={ORANGE} strokeWidth={7} />
              <circle cx={px(0)} cy={py(0)} r={13} fill="white" stroke={ORANGE} strokeWidth={6} />
            </g>
          )}
          {stage === 'd' && (
            <g>
              <polyline points={curve(lower, -3, 3)} fill="none" stroke={ORANGE} strokeWidth={7} />
              <text x={px(0.55)} y={py(-1.5)} {...LABEL}>6y = −x² − 3</text>
            </g>
          )}
          {stage === 'e' && (
            <g>
              <circle cx={px(0)} cy={py(0.5)} r={12} fill="#c2410c" />
              <circle cx={px(3)} cy={py(2)} r={12} fill="#c2410c" />
              <circle cx={px(-1)} cy={py(0)} r={12} fill={BLUE} />
              <text x={px(0) - 24} y={py(0.5) - 24} textAnchor="end" {...LABEL}>(0, ½)</text>
              <text x={px(3) - 24} y={py(2) - 28} textAnchor="end" {...LABEL}>(3, 2)</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

const REPORT_CI: SAExaminerStats = {
  comment: <>Tangential ray from the origin.</>,
}

const REPORT_D: SAExaminerStats = {
  comment: <>The graph of <Katex tex="6y=x^2+3" /> reflected across <Katex tex="x" />-axis with consistent equation.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} z-2i &= x+(y-2)i \\ z+i &= x+(y+1)i \end{aligned}" />,
    reason: <>Put <Katex tex="z=x+iy" /> and collect real and imaginary parts.</>,
  },
  {
    working: <Katex display tex="\sqrt{x^2+(y-2)^2}=y+1" />,
    reason: <>The left side is a modulus, <Katex tex="\sqrt{(\text{Re})^2+(\text{Im})^2}" />. The right side is just the imaginary part of <Katex tex="z+i" />, which is <Katex tex="y+1" />: no modulus, no square root.</>,
  },
  {
    working: <Katex display tex="x^2+y^2-4y+4=y^2+2y+1" />,
    reason: <>Square both sides and expand. The <Katex tex="y^2" /> terms will cancel, which is why the locus is a parabola rather than a circle.</>,
  },
  {
    working: <Katex display tex="\boxed{6y=x^2+3}" />,
    reason: <>Collect terms: <Katex tex="x^2+3=6y" />. As required.</>,
    more: <>Squaring can bring in extra points, so check: the original needs <Katex tex="y+1\ge0" /> (a modulus is never negative). On <Katex tex="6y=x^2+3" />, <Katex tex="y\ge\tfrac12" />, so this always holds and nothing extra was added.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="y=\frac{x^2+3}{6},\quad -3\le x\le3" />,
    reason: <>From part a., with <Katex tex="x=\text{Re}(z)" /> restricted as the question says. It is a parabola, symmetric about the imaginary axis, with its lowest point at <Katex tex="\left(0,\tfrac12\right)" />.</>,
  },
  {
    working: <Katex display tex="x=\pm3:\quad y=\frac{9+3}{6}=2" />,
    reason: <>The endpoints, which the question asks to be labelled.</>,
  },
  {
    working: <ArgandAnswer stage="b" />,
    reason: <>The parabola from <Katex tex="(-3,2)" /> to <Katex tex="(3,2)" />, with both endpoints labelled.</>,
    more: <>Make the curve pass through <Katex tex="\left(0,\tfrac12\right)" /> and, for accuracy, <Katex tex="\left(\pm1,\tfrac23\right)" /> and <Katex tex="\left(\pm2,\tfrac76\right)" />. The endpoints are closed, since <Katex tex="-3\le\text{Re}(z)\le3" /> includes them.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <ArgandAnswer stage="c" />,
    reason: <>A ray starts at <Katex tex="O" /> and goes one way only, here up to the right, just touching the parabola once (at the point found in part c.iii.) and carrying on beyond it.</>,
    more: <>VCAA&apos;s sample answer draws an open circle at <Katex tex="O" />, matching its <Katex tex="x>0" /> in part c.ii. The ray should touch the curve, not cut it: below the parabola on both sides of the contact point.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="y=mx,\quad m>0" />,
    reason: <>A ray from the origin into the region <Katex tex="\text{Re}(z)>0" /> that meets the parabola (which lies above the real axis) has positive gradient.</>,
  },
  {
    working: <Katex display tex="6mx=x^2+3 \implies x^2-6mx+3=0" />,
    reason: <>Substitute <Katex tex="y=mx" /> into <Katex tex="6y=x^2+3" /> to find where the line meets the parabola.</>,
  },
  {
    working: <Katex display tex="\Delta=(-6m)^2-4(1)(3)=36m^2-12=0" />,
    reason: <>Tangent means the line meets the curve exactly once: the quadratic has one repeated root, so its discriminant is zero.</>,
  },
  {
    working: <Katex display tex="m^2=\frac13 \implies m=\frac{1}{\sqrt3}" />,
    reason: <>Reject <Katex tex="m=-\tfrac{1}{\sqrt3}" />: that line touches the part of the parabola where <Katex tex="\text{Re}(z)<0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y=\frac{1}{\sqrt3}x,\quad x>0}" />,
    reason: <>The restriction makes it a ray rather than a whole line. This is VCAA&apos;s sample answer.</>,
    more: <>The gradient <Katex tex="\tfrac{1}{\sqrt3}=\tan\tfrac{\pi}{6}" />, so the ray makes an angle of <Katex tex="\tfrac{\pi}{6}" /> (30°) with the positive real axis.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} x^2-2\sqrt3x+3&=0 \\ \left(x-\sqrt3\right)^2&=0 \\ x&=\sqrt3 \end{aligned}" />,
    reason: <>The quadratic from part c.ii. with <Katex tex="m=\tfrac{1}{\sqrt3}" />, so <Katex tex="6m=2\sqrt3" />. Being a perfect square confirms the repeated root.</>,
  },
  {
    working: <Katex display tex="y=\frac{1}{\sqrt3}\times\sqrt3=1" />,
    reason: <>Substitute into the ray&apos;s equation.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt3+i}" />,
    reason: <>In the form <Katex tex="a+ib" /> with <Katex tex="a=\sqrt3" />, <Katex tex="b=1" />. Check it is on the parabola: <Katex tex="6(1)=6=\left(\sqrt3\right)^2+3" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \bar z-2i &= x-(y+2)i \\ \bar z+i &= x+(1-y)i \end{aligned}" />,
    reason: <><Katex tex="\bar z=x-iy" />. Collect the imaginary parts carefully: <Katex tex="-y-2" /> and <Katex tex="-y+1" />.</>,
  },
  {
    working: <Katex display tex="\sqrt{x^2+(y+2)^2}=1-y" />,
    reason: <>Modulus on the left, imaginary part on the right.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x^2+y^2+4y+4&=y^2-2y+1 \\ 6y&=-x^2-3 \end{aligned}" />,
    reason: <>Square both sides and simplify, exactly as in part a.</>,
  },
  {
    working: <ArgandAnswer stage="d" />,
    reason: <>The parabola <Katex tex="6y=-x^2-3" />, labelled with its equation: the part b. curve reflected in the real axis, highest point <Katex tex="\left(0,-\tfrac12\right)" />.</>,
    more: <>The reflection is no accident. Replacing <Katex tex="z" /> by <Katex tex="\bar z" /> sends every point <Katex tex="x+iy" /> to <Katex tex="x-iy" />, its mirror image in the real axis, so the new locus is the old one reflected. Drawn, like VCAA&apos;s sample answer, over the same interval <Katex tex="-3\le\text{Re}(z)\le3" />, ending at <Katex tex="(\pm3,-2)" />.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="|z|=|z-(c+id)|" />,
    reason: <>The points equidistant from <Katex tex="0" /> and <Katex tex="w=c+id" />: the perpendicular bisector of the segment from <Katex tex="O" /> to <Katex tex="w" />. So <Katex tex="w" /> is the reflection of <Katex tex="O" /> in the given line.</>,
  },
  {
    working: <Katex display tex="\text{gradient}=\frac{2-0}{3-(-1)}=\frac12 \implies y=\frac12(x+1)" />,
    reason: <>The line through <Katex tex="(-1,0)" /> and <Katex tex="(3,2)" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} y=-2x:\quad -2x=\frac12(x+1) \\ \implies x=-\frac15,\quad y=\frac25 \end{gathered}" />,
    reason: <>The segment from <Katex tex="O" /> to <Katex tex="w" /> is perpendicular to the line (gradient <Katex tex="-2" />, the negative reciprocal of <Katex tex="\tfrac12" />), and its midpoint lies on the line. Solving finds that midpoint.</>,
  },
  {
    working: <Katex display tex="w=2\left(-\frac15+\frac25i\right)=-\frac25+\frac45i" />,
    reason: <>The midpoint of <Katex tex="O" /> and <Katex tex="w" /> is <Katex tex="\tfrac w2" />, so double it.</>,
  },
  {
    working: <Katex display tex="\boxed{c=-\frac25,\quad d=\frac45}" />,
    reason: <>Both non-zero, as the question requires.</>,
    more: <>Check by algebra: <Katex tex="|z|^2=|z-w|^2" /> gives <Katex tex="2cx+2dy=c^2+d^2" />, which here is <Katex tex="-\tfrac45x+\tfrac85y=\tfrac45" />, that is <Katex tex="y=\tfrac12(x+1)" />. Both <Katex tex="-1" /> and <Katex tex="3+2i" /> satisfy it.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \frac{x+1}{2}&=\frac{x^2+3}{6} \\ x^2-3x&=0 \\ x=0 &\text{ or } x=3 \end{aligned}" />,
    reason: <>The region is bounded by the line <Katex tex="y=\tfrac12(x+1)" /> from part e.i. and the parabola <Katex tex="6y=x^2+3" />. First find where they cross: multiply through by 6, <Katex tex="3x+3=x^2+3" />.</>,
    more: <>So the line cuts the parabola at <Katex tex="\tfrac12 i" /> and at <Katex tex="3+2i" />, one of the two points it was defined through.</>,
  },
  {
    working: <ArgandAnswer stage="e" />,
    reason: <>Between <Katex tex="x=0" /> and <Katex tex="x=3" /> the line is above the parabola (at <Katex tex="x=1" />: <Katex tex="1>\tfrac23" />), so the area is the integral of line minus parabola.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} A&=\int_0^3\left(\frac{x+1}{2}-\frac{x^2+3}{6}\right)dx \\ &=\int_0^3\left(\frac x2-\frac{x^2}{6}\right)dx \end{aligned}" />,
    reason: <>Top minus bottom. The constants <Katex tex="\tfrac12" /> and <Katex tex="\tfrac36" /> cancel.</>,
  },
  {
    working: <Katex display tex="=\left[\frac{x^2}{4}-\frac{x^3}{18}\right]_0^3=\frac94-\frac{27}{18}" />,
    reason: <>Antidifferentiate, then substitute the terminals.</>,
  },
  {
    working: <Katex display tex="\boxed{A=\frac34 \ \text{square units}}" />,
    reason: <>Exact, as Section B requires unless told otherwise.</>,
    more: <>Plausible: the region is a thin sliver about 3 units long and at most <Katex tex="\tfrac38" /> high (at <Katex tex="x=\tfrac32" />), and <Katex tex="\tfrac23\times3\times\tfrac38=\tfrac34" />, the area of a parabolic segment.</>,
  },
]

export default function SpecialistQ2_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (10 marks)</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Read <Katex tex="|z-2i|=\text{Im}(z+i)" /> geometrically. The left side is the distance
              from <Katex tex="z" /> to the point <Katex tex="2i" />. The right side, <Katex tex="y+1" />,
              is the distance from <Katex tex="z" /> up from the horizontal line <Katex tex="y=-1" />.
              Points equally far from a fixed point and a fixed line form a parabola, with the point
              as its focus and the line as its directrix, so a parabola is exactly what part a. should
              produce.
            </p>
            <p>
              Part e. uses the other standard locus: <Katex tex="|z-z_1|=|z-z_2|" /> is the perpendicular
              bisector of the segment joining <Katex tex="z_1" /> and <Katex tex="z_2" />.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Cartesian Form"
        marks={1}
        statement={
          <>
            Show that the relation <Katex tex="|z-2i|=\text{Im}(z+i)" /> can be expressed in Cartesian form
            as <Katex tex="6y=x^2+3" />, where <Katex tex="z=x+iy" />, <Katex tex="x,y\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Locus"
        marks={1}
        statement={
          <>
            <p>
              Sketch the graph of the relation <Katex tex="|z-2i|=\text{Im}(z+i)" /> on the Argand diagram
              below for <Katex tex="-3\le\text{Re}(z)\le3" />.
              <br />
              Label the endpoints with their coordinates.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={argandSrc}
                alt="Blank Argand diagram from the original VCAA exam paper: Re(z) numbered from −3 to 3 and Im(z) from −2 to 2, with gridlines every 1 on the real axis and every 0.5 on the imaginary axis"
                className="w-full max-w-[440px]"
              />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
        <p>
          A ray from the origin <Katex tex="O" /> is tangential to the part of the curve where{' '}
          <Katex tex="\text{Re}(z)>0" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Tangent Ray"
        marks={1}
        statement={<>Sketch the ray on the Argand diagram above.</>}
        examinerReport={REPORT_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Tangent Ray"
        marks={2}
        statement={<>Find the equation of this ray in Cartesian form.</>}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Point of Contact"
        marks={1}
        statement={
          <>
            Find the point of intersection of the ray with the curve.
            <br />
            Express your answer in the form <Katex tex="a+ib" />, where <Katex tex="a,b\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Conjugate Locus"
        marks={1}
        statement={
          <>
            Sketch the graph of the relation <Katex tex="|\bar z-2i|=\text{Im}(\bar z+i)" />, where{' '}
            <Katex tex="z=x+iy" />, <Katex tex="x,y\in R" />, on the Argand diagram provided in{' '}
            <b>part b</b>, labelling it with its Cartesian equation.
          </>
        }
        examinerReport={REPORT_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e.i"
        topic="Perpendicular Bisector"
        marks={1}
        statement={
          <>
            The line that passes through the points <Katex tex="z_1=-1" /> and <Katex tex="z_2=3+2i" /> has
            the equation <Katex tex="|z|=|z-(c+id)|" />, where <Katex tex="c,d\in R\setminus\{0\}" />.
            <br />
            Find the values of <Katex tex="c" /> and <Katex tex="d" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area of the region enclosed by the curves <Katex tex="|z|=|z-(c+id)|" /> and{' '}
            <Katex tex="|z-2i|=\text{Im}(z+i)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>
    </div>
  )
}
