// 2023 Specialist NHT — Exam 2, Section B Question 2 (11 marks). The NHT report gives sample
// answers only, with no statistics; its only note is on part a. (quoted). The circle
// |z + 2 − i√3| = 2√3: verifying the real-axis intercept −5 and finding the other (1), sketching it
// with its axis intercepts (−5, 1, √3 ± 2√2), the point z₀ = −8 − i√3 that makes the perpendicular
// bisector |z + 2 − i√3| = |z − z₀| the tangent at −5, the area of the segment below the real axis
// (4π − 3√3), and the circle |z̄ + 2 − i√3| = 2√3, its reflection in the real axis. Question text
// transcribed from the original paper. The Argand plane is VCAA's own figure, cropped from page 14
// of the original VCAA exam PDF at 300 dpi (spec-2023nhte2-q2b-argand.png); the answers to b. and
// e. and the part d. segment are SVG overlays on it, calibrated from the gridlines measured on the
// crop (origin at (822.5, 823.5), 109.83 px per unit horizontally and 103.08 px per unit
// vertically: VCAA's cells are not square) and checked with a PIL composite. Answers checked with
// sympy and against the report's sample answers, which agree. The report's lines for b. and e.
// ("The diagram below shows …", "Refer to the diagram in Question 2b.") only introduce its sample
// diagram, so they are described in the working rather than quoted. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import type { ReactNode } from 'react'
import argandSrc from './spec-2023nhte2-q2b-argand.png'

const REPORT_A: SAExaminerStats = {
  comment: <>Convincing working leading to the given result is required.</>,
}

// Calibration of VCAA's plane in the crop's own pixels (1775 × 1590).
const W = 1775
const H = 1590
const OX = 822.5
const OY = 823.5
const SX = 109.83
const SY = 103.08
const S3 = Math.sqrt(3)
const R = 2 * S3
const px = (x: number) => OX + x * SX
const py = (y: number) => OY - y * SY
const ORANGE = '#f97316'
const BLUE = '#0ea5e9'
const LABEL = { fontSize: 46, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

function arcPoints(cy: number, from: number, to: number, n = 120) {
  const pts: string[] = []
  for (let i = 0; i <= n; i++) {
    const t = from + ((to - from) * i) / n
    pts.push(`${px(-2 + R * Math.cos(t)).toFixed(1)},${py(cy + R * Math.sin(t)).toFixed(1)}`)
  }
  return pts
}

function Circle({ cy, color, width = 8 }: { cy: number; color: string; width?: number }) {
  return <ellipse cx={px(-2)} cy={py(cy)} rx={R * SX} ry={R * SY} fill="none" stroke={color} strokeWidth={width} />
}

function Dot({ x, y, color = ORANGE }: { x: number; y: number; color?: string }) {
  return <circle cx={px(x)} cy={py(y)} r={13} fill={color} />
}

function Plane({ alt, children }: { alt: string; children: ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[440px]">
        <img loading="lazy" decoding="async" src={argandSrc} alt={alt} className="w-full block" />
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
          {children}
        </svg>
      </div>
    </div>
  )
}

function InterceptLabels() {
  return (
    <>
      <Dot x={-5} y={0} />
      <Dot x={1} y={0} />
      <Dot x={0} y={S3 + 2 * Math.SQRT2} />
      <Dot x={0} y={S3 - 2 * Math.SQRT2} />
      <text x={px(-5) - 22} y={py(0) - 26} textAnchor="end" {...LABEL}>−5</text>
      <text x={px(1) + 24} y={py(0) - 26} {...LABEL}>1</text>
      <text x={px(0) + 26} y={py(S3 + 2 * Math.SQRT2) - 22} {...LABEL}>√3 + 2√2</text>
      <text x={px(0) + 26} y={py(S3 - 2 * Math.SQRT2) + 56} {...LABEL}>√3 − 2√2</text>
    </>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \text{LHS} &= \left|-5+2-i\sqrt3\right| \\ &= \left|-3-i\sqrt3\right| \\ &= \sqrt{(-3)^2+\left(-\sqrt3\right)^2} \\ &= \sqrt{12} = 2\sqrt3 \\ &= \text{RHS} \end{aligned}" />,
    reason: <>Substitute <Katex tex="z=-5" /> and simplify inside the modulus first. The modulus of <Katex tex="a+ib" /> is <Katex tex="\sqrt{a^2+b^2}" />, and <Katex tex="\sqrt{12}=\sqrt{4\times3}=2\sqrt3" />.</>,
    more: <>A &ldquo;verify&rdquo; needs every line shown: the substitution, the modulus as a square root, and the simplified surd matching the right-hand side.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} z=x: \ \left|(x+2)-i\sqrt3\right| = 2\sqrt3 \\ \implies (x+2)^2+3 = 12 \end{gathered}" />,
    reason: <>Every real-axis point is <Katex tex="z=x" /> with <Katex tex="x" /> real, so the real part inside is <Katex tex="x+2" /> and the imaginary part <Katex tex="-\sqrt3" />. Square both sides to clear the root.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} (x+2)^2 = 9 \implies x+2=\pm3 \\ \implies x=-5 \text{ or } x=1 \end{gathered}" />,
    reason: <>Two solutions, as a line through a circle should give: one is the <Katex tex="-5" /> just verified.</>,
  },
  {
    working: <Katex display tex="\boxed{z=1}" />,
    reason: <>The other real-axis intercept. A check: <Katex tex="|1+2-i\sqrt3|=\sqrt{9+3}=2\sqrt3" />.</>,
    more: <>Geometrically, both intercepts are 3 units either side of <Katex tex="x=-2" />, the real part of the centre: <Katex tex="-2\pm3" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{centre } \left(-2,\sqrt3\right), \quad \text{radius } 2\sqrt3\approx3.46" />,
    reason: <><Katex tex="|z-c|=r" /> is every point at distance <Katex tex="r" /> from <Katex tex="c" />. Here <Katex tex="z+2-i\sqrt3=z-\left(-2+i\sqrt3\right)" />, so <Katex tex="c=-2+i\sqrt3" />, matching the centre the question gives.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} z=iy: \ \left|2+i\left(y-\sqrt3\right)\right| = 2\sqrt3 \\ \implies 4+\left(y-\sqrt3\right)^2 = 12 \\ \implies \left(y-\sqrt3\right)^2 = 8 \\ \implies y = \sqrt3\pm2\sqrt2 \end{gathered}" />,
    reason: <>The imaginary-axis intercepts. On that axis <Katex tex="z=iy" />, so the real part inside is 2 and the imaginary part <Katex tex="y-\sqrt3" />. Square both sides, then take both square roots: <Katex tex="\sqrt8=\sqrt{4\times2}=2\sqrt2" />.</>,
    more: <>As decimals, <Katex tex="\sqrt3+2\sqrt2\approx4.56" /> and <Katex tex="\sqrt3-2\sqrt2\approx-1.10" />, which tells you where to put them on the grid.</>,
  },
  {
    working: (
      <Plane alt="VCAA's Argand plane with the answer drawn over it: a circle centred at (−2, √3) with radius 2√3, crossing the real axis at −5 and 1 and the imaginary axis at √3 + 2√2 and √3 − 2√2, each intercept marked and labelled">
        <Circle cy={S3} color={ORANGE} />
        <InterceptLabels />
      </Plane>
    ),
    reason: <>Plot the four intercepts from part a. and above and draw the circle through them, centred at <Katex tex="\left(-2,\sqrt3\right)" />. Label each intercept with its value, as asked.</>,
    more: <>The circle reaches about 5.2 at the top and about <Katex tex="-1.7" /> at the bottom (<Katex tex="\sqrt3\pm2\sqrt3" />), and from about <Katex tex="-5.5" /> to <Katex tex="1.5" /> across. VCAA&apos;s sample answer is the upper of its two circles, with the same four labels.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\left|z-\left(-2+i\sqrt3\right)\right| = \left|z-z_0\right|" />,
    reason: <>Points equidistant from two fixed points form the <em>perpendicular bisector</em> of the segment joining them: here, of the centre <Katex tex="c=-2+i\sqrt3" /> and <Katex tex="z_0" />.</>,
  },
  {
    working: <Katex display tex="-5 = \frac{c+z_0}{2}" />,
    reason: <>The tangent at <Katex tex="-5" /> passes through <Katex tex="-5" /> and is perpendicular to the radius from <Katex tex="c" /> to <Katex tex="-5" />. A perpendicular bisector of <Katex tex="c" /> and <Katex tex="z_0" /> is perpendicular to the line through them and passes through their midpoint, so <Katex tex="z_0" /> is on the line through <Katex tex="c" /> and <Katex tex="-5" />, with <Katex tex="-5" /> as the midpoint.</>,
    more: <>In other words, <Katex tex="z_0" /> is the reflection of the centre in the tangent line: go from <Katex tex="c" /> to <Katex tex="-5" />, then the same again.</>,
  },
  {
    working: <Katex display tex="z_0 = 2(-5)-\left(-2+i\sqrt3\right) = \boxed{-8-i\sqrt3}" />,
    reason: <>Rearrange the midpoint equation. A check: <Katex tex="|-5-c|=|-3-i\sqrt3|=2\sqrt3" /> and <Katex tex="|-5-z_0|=|3+i\sqrt3|=2\sqrt3" />, so <Katex tex="-5" /> is equidistant from both, and it lies on the line.</>,
    more: <>The step <Katex tex="c\to-5" /> is <Katex tex="-3-i\sqrt3" />; adding it again to <Katex tex="-5" /> lands on <Katex tex="-8-i\sqrt3" />, which is off the left edge of the printed grid.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} \cos\left(\tfrac{\theta}{2}\right) = \frac{\sqrt3}{2\sqrt3} = \frac12 \\ \implies \frac{\theta}{2}=\frac{\pi}{3} \implies \theta=\frac{2\pi}{3} \end{gathered}" />,
    reason: <>The real axis cuts off a chord from <Katex tex="-5" /> to <Katex tex="1" />. Join the centre to both ends: the centre is <Katex tex="\sqrt3" /> above the chord and each radius is <Katex tex="2\sqrt3" />, so half the angle <Katex tex="\theta" /> at the centre has cosine <Katex tex="\tfrac{\sqrt3}{2\sqrt3}" />.</>,
    more: <>Or use half the chord: <Katex tex="\sin\left(\tfrac\theta2\right)=\tfrac{3}{2\sqrt3}=\tfrac{\sqrt3}{2}" />, the same angle.</>,
  },
  {
    working: (
      <Plane alt="VCAA's Argand plane with the circle centred at (−2, √3) drawn over it. The part of the circle below the real axis, between −5 and 1, is shaded; dashed radii join the centre to −5 and to 1, with the angle 2π/3 marked between them at the centre">
        <Circle cy={S3} color={ORANGE} width={6} />
        <polygon
          points={[...arcPoints(S3, (7 * Math.PI) / 6, (11 * Math.PI) / 6)].join(' ')}
          fill={ORANGE}
          fillOpacity={0.35}
          stroke="none"
        />
        <line x1={px(-2)} y1={py(S3)} x2={px(-5)} y2={py(0)} stroke="#c2410c" strokeWidth={6} strokeDasharray="18 12" />
        <line x1={px(-2)} y1={py(S3)} x2={px(1)} y2={py(0)} stroke="#c2410c" strokeWidth={6} strokeDasharray="18 12" />
        <Dot x={-2} y={S3} color="#c2410c" />
        <text x={px(-2)} y={py(S3) + 120} textAnchor="middle" {...LABEL}>2π/3</text>
      </Plane>
    ),
    reason: <>The region is a <em>segment</em>: the sector cut out by the two radii, minus the triangle formed by the radii and the chord.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{Area} = {} &\frac12\left(2\sqrt3\right)^2\left(\frac{2\pi}{3}\right) \\ &- \frac12\left(2\sqrt3\right)\left(2\sqrt3\right)\sin\left(\frac{2\pi}{3}\right) \end{aligned}" />,
    reason: <>Sector area <Katex tex="\tfrac12r^2\theta" /> (with <Katex tex="\theta" /> in radians), minus triangle area <Katex tex="\tfrac12ab\sin(C)" /> with both sides equal to the radius.</>,
    more: <>The triangle can also be done as <Katex tex="\tfrac12\times\text{base}\times\text{height}=\tfrac12(6)\left(\sqrt3\right)=3\sqrt3" />: the chord is 6 long and the centre is <Katex tex="\sqrt3" /> above it.</>,
  },
  {
    working: <Katex display tex="= 6\cdot\frac{2\pi}{3} - 6\cdot\frac{\sqrt3}{2} = \boxed{4\pi-3\sqrt3}" />,
    reason: <>In the form <Katex tex="p\pi+q" /> with <Katex tex="p=4" />, <Katex tex="q=-3\sqrt3" />. Sanity check: <Katex tex="\approx7.37" />, a small slice of the whole circle&apos;s <Katex tex="12\pi\approx37.7" />, as the picture shows.</>,
    more: <>By calculus instead: the lower half of the circle is <Katex tex="y=\sqrt3-\sqrt{12-(x+2)^2}" />, and the area is <Katex tex="\int_{-5}^{1}\left(\sqrt{12-(x+2)^2}-\sqrt3\right)dx" />, which CAS also gives as <Katex tex="4\pi-3\sqrt3" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \left|\overline{z}+2-i\sqrt3\right| &= \left|\overline{\,\overline{z}+2-i\sqrt3\,}\right| \\ &= \left|z+2+i\sqrt3\right| \end{aligned}" />,
    reason: <>A complex number and its conjugate have the same modulus, <Katex tex="|w|=|\overline{w}|" />. Conjugating the inside turns <Katex tex="\overline z" /> back into <Katex tex="z" /> and flips the sign of the <Katex tex="i\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \left|z-\left(-2-i\sqrt3\right)\right| = 2\sqrt3 \\ \text{centre } \left(-2,-\sqrt3\right), \ \text{radius } 2\sqrt3 \end{gathered}" />,
    reason: <>Same radius, centre reflected in the real axis. So the second circle is the first one reflected in the real axis.</>,
    more: <>That makes sense: <Katex tex="\overline z" /> is the reflection of <Katex tex="z" /> in the real axis, so <Katex tex="z" /> is on the second circle exactly when its reflection <Katex tex="\overline z" /> is on the first. Reflection fixes the real axis, so the second circle also passes through <Katex tex="-5" /> and <Katex tex="1" />.</>,
  },
  {
    working: (
      <Plane alt="VCAA's Argand plane with both answers drawn over it: the part b. circle centred at (−2, √3) in blue, and the second circle centred at (−2, −√3) with the same radius in orange, its mirror image in the real axis; the two circles cross at −5 and 1">
        <Circle cy={S3} color={BLUE} width={6} />
        <Circle cy={-S3} color={ORANGE} />
        <Dot x={-5} y={0} color="#c2410c" />
        <Dot x={1} y={0} color="#c2410c" />
      </Plane>
    ),
    reason: <>The part b. circle (blue) with the new circle (orange) added on the same axes, as asked: centre <Katex tex="\left(-2,-\sqrt3\right)" />, crossing the real axis at the same two points <Katex tex="-5" /> and <Katex tex="1" />. No intercept labels are needed.</>,
    more: <>VCAA&apos;s sample answer draws both circles on one diagram (the part e. circle is its lower one). This circle&apos;s imaginary-axis intercepts would be <Katex tex="-\sqrt3\pm2\sqrt2" />, the reflections of part b.&apos;s.</>,
  },
]

export default function SpecialistQ2_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (11 marks)</p>
        <p>
          The circle given by <Katex tex="\left|z+2-i\sqrt3\right|=2\sqrt3" />, where{' '}
          <Katex tex="z\in C" />, has its centre at <Katex tex="\left(-2,\sqrt3\right)" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Two modulus facts carry this whole question. <Katex tex="|z-c|" /> is the distance from{' '}
              <Katex tex="z" /> to <Katex tex="c" />, so <Katex tex="|z-c|=r" /> is a circle, and{' '}
              <Katex tex="|z-c|=|z-z_0|" /> (equal distances from two points) is the perpendicular
              bisector of <Katex tex="c" /> and <Katex tex="z_0" />.
            </p>
            <p>
              Always rewrite the inside as <Katex tex="z-(\ldots)" /> before reading off the centre:{' '}
              <Katex tex="z+2-i\sqrt3=z-\left(-2+i\sqrt3\right)" />. Then sketch: parts c. and d. are much
              easier with the circle in front of you.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Circle Intercepts"
        marks={2}
        examinerReport={REPORT_A}
        statement={
          <>
            Verify by substitution that <Katex tex="z=-5" /> is a real axis intercept of the graph of{' '}
            <Katex tex="\left|z+2-i\sqrt3\right|=2\sqrt3" /> and find the other real axis intercept.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Circle"
        marks={3}
        statement={
          <>
            <p>
              Sketch the circle given by <Katex tex="\left|z+2-i\sqrt3\right|=2\sqrt3" /> on the Argand
              diagram below. Label the axes intercepts with their values.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={argandSrc}
                alt="Blank Argand diagram from the original VCAA exam paper: Re(z) and Im(z) each from −6 to 6, numbered every 2, with gridlines every 0.5"
                className="w-full max-w-[440px]"
              />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Perpendicular Bisector"
        marks={1}
        statement={
          <>
            The line given by <Katex tex="\left|z+2-i\sqrt3\right|=\left|z-z_0\right|" />, where{' '}
            <Katex tex="z,z_0\in C" />, is tangent to the circle given by{' '}
            <Katex tex="\left|z+2-i\sqrt3\right|=2\sqrt3" /> at <Katex tex="z=-5" />.
            <br />
            Find <Katex tex="z_0" /> in the form <Katex tex="a+ib" />, where <Katex tex="a,b\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Area of Segment"
        marks={3}
        statement={
          <>
            Find the area of the part of the circle given by{' '}
            <Katex tex="\left|z+2-i\sqrt3\right|=2\sqrt3" />, which lies below the real axis. Give your
            answer in the form <Katex tex="p\pi+q" />, where <Katex tex="p,q\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Conjugate Locus"
        marks={2}
        statement={
          <>
            A second circle is given by <Katex tex="\left|\overline{z}+2-i\sqrt3\right|=2\sqrt3" />, where{' '}
            <Katex tex="z\in C" />.
            <br />
            Sketch this circle on the axes provided in <b>part b.</b> You do not need to label the axes
            intercepts.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
