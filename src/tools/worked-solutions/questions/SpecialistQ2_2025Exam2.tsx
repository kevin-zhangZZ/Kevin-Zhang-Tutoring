// 2025 Specialist Mathematics — Exam 2, Section B Question 2 (10 marks). A circle and a
// perpendicular bisector on the Argand plane, where they meet, a ray through two given points,
// and the area of the minor segment they cut off. Question text transcribed from the original
// paper; both polar Argand planes are the actual VCAA figures, cropped from the official exam
// PDF at 300 dpi, and the part a., b.ii. and c.ii. answers are drawn over VCAA's own plane
// (origin at (522, 562) in the crop, 151.17 px per unit, read from the tick marks). Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import argandSrc from './spec-2025e2-q2a-argand.png'
import pqSrc from './spec-2025e2-q2-pq.png'

const AX = 522
const AY = 562
const R = 151.17
const S3 = Math.sqrt(3)
const px = (x: number) => AX + x * R
const py = (y: number) => AY - y * R
const ORANGE = '#f97316'
const LABEL = { fontSize: 40, fill: '#c2410c', stroke: 'white', strokeWidth: 9, paintOrder: 'stroke' } as const

const ALT = {
  a: "VCAA's polar Argand plane with the answer drawn over it: the circle of radius 2 centred at the origin",
  b: "VCAA's polar Argand plane with the circle of radius 2 centred at the origin and the full line y = √3x through the origin at 60° to the real axis",
  c: "VCAA's polar Argand plane with the circle of radius 2 and the line y = √3x, their intersections labelled 1 + √3i in the first quadrant and −1 − √3i in the third",
} as const

function ArgandAnswer({ stage }: { stage: 'a' | 'b' | 'c' }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img loading="lazy" decoding="async" src={argandSrc} alt={ALT[stage]} className="w-full block" />
        <svg viewBox="0 0 1152 1073" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <circle cx={AX} cy={AY} r={2 * R} fill="none" stroke={ORANGE} strokeWidth={7} />
          {stage !== 'a' && (
            <line x1={px(-1.7)} y1={py(-1.7 * S3)} x2={px(1.7)} y2={py(1.7 * S3)} stroke={ORANGE} strokeWidth={7} />
          )}
          {stage === 'c' && (
            <g>
              <circle cx={px(1)} cy={py(S3)} r={13} fill="#c2410c" />
              <circle cx={px(-1)} cy={py(-S3)} r={13} fill="#c2410c" />
              <text x={px(1) + 30} y={py(S3) + 34} {...LABEL}>1 + √3i</text>
              <text x={px(-1) - 30} y={py(-S3) - 14} textAnchor="end" {...LABEL}>−1 − √3i</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [11.69, 88.31],
  average: 0.88,
  comment: <>Students must make sure their sketch is visible. The use of a highlighter or colour was useful.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [13.34, 12.21, 74.45],
  average: 1.61,
  comment: (
    <>
      This was a &lsquo;show that&rsquo; question which requires a full algebraic or a geometric
      approach to the question.
      <br />
      The algebraic approach is to equate the magnitudes of the complex expressions and then
      expand the brackets and simplify.
      <br />
      The geometric approach required finding the midpoint and the gradient of the line segment
      between <Katex tex="(0,2)" /> and <Katex tex="\left(\sqrt{3},1\right)" />.
      <br />
      The midpoint is <Katex tex="\left(\dfrac{\sqrt{3}}{2},\dfrac{3}{2}\right)" /> and the
      gradient is <Katex tex="\sqrt{3}" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [21.7, 78.3],
  average: 0.78,
  comment: <>Some students drew the line slightly off the correct angle of 60° with the Re(z) axis.</>,
}

const EXAM_CI: SAExaminerStats = {
  marks: [18.93, 10.88, 70.19],
  average: 1.51,
  comment: <>These points could be found by inspection of the graph or using simultaneous equations.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [26.11, 73.89],
  average: 0.73,
  comment: (
    <>
      Students need to take care when labelling the points on the graph. If they are using
      coordinates, they must not have <Katex tex="i" /> in the coordinate.
      <br />
      Some students did not record a response for this question.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [49.36, 50.64],
  average: 0.5,
  comment: (
    <>
      Many students stated the correct value for <Katex tex="z_0" /> but did not correctly
      identify the argument. Students are reminded that drawing the ray on the graph may have made
      it easier to identify the angle. Principal values were expected.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [23.49, 15.44, 61.07],
  average: 1.37,
  comment: (
    <>
      Most students were successful when applying the area formula of a segment. Some responses,
      however, used the incorrect angle and others did not include the answer in the required
      form.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="z\overline{z} = |z|^2" />,
    reason: <>The standard identity — a complex number times its conjugate is the square of its modulus.</>,
  },
  {
    working: <Katex display tex="|z|^2 = 4 \implies |z| = 2" />,
    reason: <>The modulus is never negative, so only the positive root survives.</>,
  },
  {
    working: <ArgandAnswer stage="a" />,
    reason: <>Drawn on the polar grid, which already carries circles of radius 1, 2 and 3 — so this is a matter of tracing the middle one clearly.</>,
    more: <>The report says the sketch must be visible. Because the answer sits exactly on a printed grid circle, a light pencil trace can be indistinguishable from the grid — go over it firmly or in colour (the report notes a highlighter or colour was useful).</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} z &= x+iy \\ |z-2i| &=\left|x+(y-2)i\right| \\ \left|z-\sqrt3-i\right| &= \left|\left(x-\sqrt3\right)+(y-1)i\right| \end{aligned}" />,
    reason: <>Put <Katex tex="z=x+iy" /> and group real and imaginary parts, so each modulus becomes <Katex tex="\sqrt{(\text{real})^2+(\text{imaginary})^2}" />.</>,
  },
  {
    working: <Katex display tex="x^2+(y-2)^2 = \left(x-\sqrt3\right)^2+(y-1)^2" />,
    reason: <>Squaring both sides removes the square roots — legal, since both moduli are non-negative.</>,
  },
  {
    working: <Katex display tex="x^2+y^2-4y+4 = x^2-2\sqrt3x+3+y^2-2y+1" />,
    reason: <>Expanding every bracket.</>,
  },
  {
    working: <Katex display tex="-4y+4 = -2\sqrt3x-2y+4" />,
    reason: <>The <Katex tex="x^2" /> and <Katex tex="y^2" /> terms cancel, which is what makes the locus a straight line.</>,
  },
  {
    working: <Katex display tex="-2y = -2\sqrt3x \implies \boxed{y = \sqrt3x}" />,
    reason: <>As required.</>,
    more: (
      <>
        The report accepts a geometric approach too. <Katex tex="|z-2i|=\left|z-\sqrt3-i\right|" /> says <Katex tex="z" /> is the same
        distance from <Katex tex="(0,2)" /> as from <Katex tex="\left(\sqrt3,1\right)" />, so the locus is the perpendicular bisector of the
        segment joining them. That segment has midpoint <Katex tex="\left(\tfrac{\sqrt3}{2},\tfrac32\right)" /> and gradient{' '}
        <Katex tex="\tfrac{1-2}{\sqrt3-0}=-\tfrac{1}{\sqrt3}" />, so the bisector has gradient <Katex tex="\sqrt3" /> (the negative
        reciprocal) and equation <Katex tex="y-\tfrac32=\sqrt3\left(x-\tfrac{\sqrt3}{2}\right)" />, which simplifies to{' '}
        <Katex tex="y=\sqrt3x" />. The <Katex tex="\sqrt3" /> the report quotes is the bisector's gradient; the segment's own gradient is{' '}
        <Katex tex="-\tfrac{1}{\sqrt3}" />. Either way, every step must be shown: this is a &lsquo;show that&rsquo;, so
        quoting <Katex tex="y=\sqrt3x" /> without the algebra or the midpoint-and-gradient argument does not earn the marks.
      </>
    ),
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{gradient } \sqrt3 = \tan\left(\frac{\pi}{3}\right) \implies \text{angle } \frac{\pi}{3} = 60^\circ" />,
    reason: <>The line <Katex tex="y=\sqrt3x" /> from b.i. passes through the origin, and its gradient is the tangent of the angle it makes with the positive real axis.</>,
  },
  {
    working: <ArgandAnswer stage="b" />,
    reason: <>Draw the whole line through the origin, into the third quadrant as well — it is a line, not a ray.</>,
    more: <>The report notes some students drew the line slightly off 60°. VCAA's polar grid has a spoke every 30°, so the line lies along the second spoke above the positive real axis (and the matching spoke in the third quadrant) — trace it with a ruler rather than estimating the angle. A check: it should cross the radius-2 circle at <Katex tex="1+\sqrt3i" />, the point found in part c.i.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+y^2 = 4 \quad \text{and} \quad y = \sqrt3x" />,
    reason: <>The circle from part a. and the line from part b.i., solved simultaneously.</>,
  },
  {
    working: <Katex display tex="x^2+3x^2 = 4 \implies 4x^2 = 4 \implies x = \pm1" />,
    reason: <>Substitute <Katex tex="y=\sqrt3x" /> into the circle, so <Katex tex="y^2=3x^2" />.</>,
  },
  {
    working: <Katex display tex="x = 1 \implies y = \sqrt3, \qquad x = -1 \implies y = -\sqrt3" />,
    reason: <>Back-substituting into the line.</>,
  },
  {
    working: <Katex display tex="\boxed{1+\sqrt3\,i \qquad \text{and} \qquad -1-\sqrt3\,i}" />,
    reason: <>In the form <Katex tex="a+ib" /> as asked.</>,
    more: <>The report notes these could also be found by inspection of the graph: the line is at angle <Katex tex="\tfrac{\pi}{3}" /> and the circle has radius 2, so the points are <Katex tex="2\operatorname{cis}\left(\tfrac{\pi}{3}\right)=1+\sqrt3i" /> and <Katex tex="2\operatorname{cis}\left(-\tfrac{2\pi}{3}\right)=-1-\sqrt3i" />. Either way, give both points, written as complex numbers rather than coordinates. A check: they are diametrically opposite, as they must be for a line through the centre.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\text{mark } 1+\sqrt3\,i \text{ and } -1-\sqrt3\,i \\ &\text{where the line meets the circle} \end{aligned}" />,
    reason: <>Both lie at distance 2 from the origin, at arguments π/3 and −2π/3.</>,
  },
  {
    working: <ArgandAnswer stage="c" />,
    reason: <>Labelled as complex numbers. Coordinates <Katex tex="\left(1,\sqrt3\right)" /> and <Katex tex="\left(-1,-\sqrt3\right)" /> are equally fine, but never mix the two: <Katex tex="\left(1,\sqrt3i\right)" /> is wrong.</>,
    more: <>The report warns that coordinates must not have <Katex tex="i" /> in them, and that some students did not answer this part at all. It is a free mark once c.i is done: put a dot at each intersection and write its value beside it.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Arg}(z-z_0) = \theta \text{ is a ray starting at } z_0" />,
    reason: <>The point subtracted is where the ray begins, and this ray originates at P — so <Katex tex="z_0" /> is P itself.</>,
  },
  {
    working: <Katex display tex="\boxed{z_0 = \frac{3}{2}+\frac{3\sqrt3}{2}i}" />,
    reason: <>P's coordinates from VCAA's figure, written as a complex number.</>,
  },
  {
    working: <Katex display tex="Q-P = 3-\left(\frac{3}{2}+\frac{3\sqrt3}{2}i\right) = \frac{3}{2}-\frac{3\sqrt3}{2}i" />,
    reason: <>The direction of the ray is from P towards Q, so subtract in that order.</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = \frac{-\frac{3\sqrt3}{2}}{\frac{3}{2}} = -\sqrt3, \quad \text{fourth quadrant}" />,
    reason: <>Positive real part, negative imaginary part: the ray heads down and to the right, so θ is in the fourth quadrant.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = -\frac{\pi}{3}}" />,
    reason: <>The principal value, in <Katex tex="(-\pi,\pi]" />. <Katex tex="\tfrac{5\pi}{3}" /> is the same direction but not a principal value.</>,
    more: (
      <>
        The report notes many students had <Katex tex="z_0" /> right but the wrong argument, that principal values were expected,
        and that drawing the ray would have helped. Drawn from P to Q, it slopes down at 60° below the horizontal, so{' '}
        <Katex tex="\theta=-\tfrac{\pi}{3}" />. The tempting wrong answers: <Katex tex="\tfrac{\pi}{3}" /> is <Katex tex="\operatorname{Arg}(P)" />,
        the direction from O to P, not from P to Q; <Katex tex="\tfrac{2\pi}{3}" /> is <Katex tex="\operatorname{Arg}(P-Q)" />, the
        ray pointing the other way, from Q through P. A check: <Katex tex="|OP|=|OQ|=3" /> and angle <Katex tex="POQ=\tfrac{\pi}{3}" />,
        so triangle <Katex tex="OPQ" /> is equilateral and PQ meets the real axis at 60°.
      </>
    ),
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} |P| &= \sqrt{\left(\frac{3}{2}\right)^2+\left(\frac{3\sqrt3}{2}\right)^2} = \sqrt{\frac94+\frac{27}{4}} = 3 \\ |Q| &= 3 \end{aligned}" />,
    reason: <>Both points lie on the circle <Katex tex="|z|=3" />, so the chord PQ really does cut a segment from it.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(P) = \frac{\pi}{3}, \qquad \operatorname{Arg}(Q) = 0" />,
    reason: <>P is in the first quadrant with <Katex tex="\tan\big(\operatorname{Arg}(P)\big)=\tfrac{3\sqrt3/2}{3/2}=\sqrt3" />; Q sits on the positive real axis.</>,
  },
  {
    working: <Katex display tex="\vartheta = \angle POQ = \frac{\pi}{3}-0 = \frac{\pi}{3}" />,
    reason: <>A minor segment's area depends on the angle its chord PQ subtends at the centre O, between OP and OQ; call it <Katex tex="\vartheta" />.</>,
    more: <>The report notes some responses used the incorrect angle. The ray's direction <Katex tex="-\tfrac{\pi}{3}" /> from part d. is not this angle (a negative angle gives a negative area), and the reflex angle <Katex tex="\tfrac{5\pi}{3}" /> gives the major segment, about 27.46, not the minor one.</>,
  },
  {
    working: <Katex display tex="A = \frac{1}{2}r^2\big(\vartheta-\sin(\vartheta)\big) = \frac{1}{2}(9)\left(\frac{\pi}{3}-\frac{\sqrt3}{2}\right)" />,
    reason: <>Segment = sector <Katex tex="\tfrac12r^2\vartheta" /> minus triangle <Katex tex="\tfrac12r^2\sin(\vartheta)" />, with <Katex tex="r=3" /> and <Katex tex="\vartheta=\tfrac{\pi}{3}" />.</>,
    more: <>A check without the formula: the sector is <Katex tex="\tfrac16" /> of the circle, <Katex tex="\tfrac16\pi(3)^2=\tfrac{3\pi}{2}" />, and triangle <Katex tex="OPQ" /> is equilateral with side 3 (see part d.), so its area is <Katex tex="\tfrac{\sqrt3}{4}(3)^2=\tfrac{9\sqrt3}{4}" />. Sector minus triangle: <Katex tex="A=\tfrac{3\pi}{2}-\tfrac{9\sqrt3}{4}" /> again.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{3\pi}{2}-\frac{9\sqrt3}{4}}" />,
    reason: <>In the form <Katex tex="c\pi+d" /> with <Katex tex="c=\tfrac32" /> and <Katex tex="d=-\tfrac{9\sqrt3}{4}" />, about 0.815 square units.</>,
    more: <>The report notes some answers were not in the required form. Leaving it as <Katex tex="\tfrac92\left(\tfrac{\pi}{3}-\tfrac{\sqrt3}{2}\right)" />, or giving only the decimal 0.815, does not answer &lsquo;in the form <Katex tex="c\pi+d" />&rsquo; — expand the bracket.</>,
  },
]

export default function SpecialistQ2_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (10 marks)</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Two loci meet here. <Katex tex="z\overline{z}=4" /> is a circle in disguise, since{' '}
              <Katex tex="z\overline{z}" /> is always <Katex tex="|z|^2" />. And an equation of
              the form <Katex tex="|z-w_1| = |z-w_2|" /> always describes the perpendicular
              bisector of the segment joining <Katex tex="w_1" /> and <Katex tex="w_2" /> — here
              both of those points are distance 2 from the origin (<Katex tex="|2i|=2" /> and{' '}
              <Katex tex="|\sqrt3+i|=\sqrt{3+1}=2" />), so the bisector runs
              through the centre of the circle.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Circle Locus"
        marks={1}
        statement={
          <>
            Sketch <Katex tex="\left\{z:z\overline{z}=4,\ z\in C\right\}" /> on the Argand plane
            below.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Line Locus"
        marks={2}
        statement={
          <>
            Show that <Katex tex="\left\{z:|z-2i|=\left|z-\sqrt3-i\right|,\ z\in C\right\}" />{' '}
            may be expressed as <Katex tex="y=\sqrt3x" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Sketch Loci"
        marks={1}
        statement={
          <>
            Sketch <Katex tex="\left\{z:|z-2i|=\left|z-\sqrt3-i\right|,\ z\in C\right\}" />{' '}
            on the Argand plane in <b>part a</b>.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Intersections"
        marks={2}
        statement={
          <>
            Find the points of intersection of the curves defined in <b>part a</b> and in{' '}
            <b>part b.i</b>, expressing your answers in the form <Katex tex="a+ib" />, where{' '}
            <Katex tex="a,b\in R" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Argand Diagram"
        marks={1}
        statement={<>Label these points on the Argand plane in <b>part a</b>.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Consider the points <Katex tex="P" /> and <Katex tex="Q" /> labelled on the Argand
          plane below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={pqSrc}
            alt="VCAA's polar Argand plane from −3 to 3 with the point P(3/2, 3√3/2) marked on the circle of radius 3 and the point Q(3, 0) marked on the positive real axis"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        topic="Ray Locus"
        marks={1}
        statement={
          <>
            A ray originating at point <Katex tex="P" /> and passing through point{' '}
            <Katex tex="Q" /> has the equation <Katex tex="\operatorname{Arg}(z-z_0)=\theta" />,
            where <Katex tex="\theta" /> is a radian measure.
            <br />
            Write down the values of <Katex tex="z_0" /> and <Katex tex="\theta" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Segment Area"
        marks={2}
        statement={
          <>
            Find the area of the minor segment bounded by the chord connecting the points{' '}
            <Katex tex="P" /> and <Katex tex="Q" /> and the circle given by{' '}
            <Katex tex="|z|=3" />.
            <br />
            Give your answer in the form <Katex tex="c\pi+d" />, where{' '}
            <Katex tex="c,d\in R" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
