// 2022 Specialist NHT — Exam 2, Section B Question 2 (9 marks). The NHT report gives a sample
// answer for each part only, with no statistics and no comments. The ray Arg(z − z₀) = θ from
// z₀ = √3 + i through the origin, its angle, the circle |z| = 2 through z₀, the other two of three
// equally spaced points on it, the cubic z³ − 8i with those roots, and the line through O and z₀
// written as a perpendicular bisector |z − i| = |z − z₃|. Question text transcribed from the
// original paper. The Argand plane is VCAA's own figure, cropped from page 16 of the original VCAA
// exam PDF at 300 dpi (spec-2022nhte2-q2a-argand.png); the part a. answer is an SVG overlay on it,
// calibrated from the gridlines measured on the crop (origin at (539.5, 564.5), 219 px per unit
// horizontally and 205.5 px per unit vertically: VCAA's cells are not square). Answers checked
// with sympy and against the report's sample answers, which agree. Part f.'s report sample answer
// is a labelled diagram with one explanatory line; it is the answer itself, not a comment, so it
// is described in the working rather than quoted. Solution is original.
//
// Interactive widget (in part e., after its working, so it doesn't give e. away): the part d.
// points built up a third of a turn at a time, then cubed (spec-2022nhte2-q2d-cube-roots).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import argandSrc from './spec-2022nhte2-q2a-argand.png'

const CubeRootsWidget = lazyWidget(() => import('../interactives/spec-2022nhte2-q2d-cube-roots'))

// Calibration of VCAA's plane in the crop's own pixels (1193 × 1064).
const OX = 539.5
const OY = 564.5
const SX = 219
const SY = 205.5
const S3 = Math.sqrt(3)
const px = (x: number) => OX + x * SX
const py = (y: number) => OY - y * SY
const ORANGE = '#f97316'
const LABEL = { fontSize: 44, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

function RayAnswer() {
  // The ray runs from z₀ through O and on to the left edge of the printed grid, x = −2.2.
  const x0 = px(S3)
  const y0 = py(1)
  const x1 = px(-2.2)
  const y1 = py(-2.2 / S3)
  const len = Math.hypot(x1 - x0, y1 - y0)
  const ux = (x1 - x0) / len
  const uy = (y1 - y0) / len
  const head = 44
  const half = 20
  const bx = x1 - ux * head
  const by = y1 - uy * head
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img loading="lazy" decoding="async" src={argandSrc}
          alt="VCAA's Argand plane with the answer drawn over it: a ray starting with an open circle at z₀ = √3 + i, running down to the left through the origin and on into the third quadrant, ending in an arrowhead"
          className="w-full block" />
        <svg viewBox="0 0 1193 1064" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1={x0} y1={y0} x2={bx} y2={by} stroke={ORANGE} strokeWidth={8} />
          <polygon
            points={`${x1},${y1} ${bx - uy * half},${by + ux * half} ${bx + uy * half},${by - ux * half}`}
            fill={ORANGE}
          />
          <circle cx={x0} cy={y0} r={15} fill="white" stroke={ORANGE} strokeWidth={7} />
          <text x={x0 - 8} y={y0 - 34} textAnchor="end" {...LABEL}>z₀</text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Arg}(z-z_0)=\theta: \ \text{ray starting at } z_0=\sqrt3+i" />,
    reason: <><Katex tex="z-z_0" /> is the arrow from <Katex tex="z_0" /> to <Katex tex="z" />, so the locus is every point reached by heading out from <Katex tex="z_0" /> in the one fixed direction <Katex tex="\theta" />.</>,
  },
  {
    working: <Katex display tex="z_0 \text{ excluded (open circle)}" />,
    reason: <>At <Katex tex="z=z_0" />, <Katex tex="z-z_0=0" />, and <Katex tex="0" /> has no argument, so the starting point itself is not on the ray.</>,
  },
  {
    working: <RayAnswer />,
    reason: <>Since the ray passes through the origin, it heads from <Katex tex="z_0" /> down to the left, through <Katex tex="O" />, and carries on indefinitely past it. Rule it to the edge of the grid and finish with an arrowhead.</>,
    more: <>Only one end continues: a ray, not a line. The part above and to the right of <Katex tex="z_0" /> is not drawn, because those points are in the opposite direction from <Katex tex="z_0" />. VCAA&apos;s sample answer shows the same open circle at <Katex tex="z_0" /> and arrowhead past the origin.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\theta = \operatorname{Arg}(0-z_0) = \operatorname{Arg}\left(-\sqrt3-i\right)" />,
    reason: <>The origin is on the ray, so <Katex tex="z=0" /> satisfies the equation: <Katex tex="\theta" /> is the argument of the arrow from <Katex tex="z_0" /> to <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="\tan(\alpha)=\frac{1}{\sqrt3} \implies \alpha=\frac{\pi}{6}, \quad \text{third quadrant}" />,
    reason: <>Real and imaginary parts are both negative, so the direction is in the third quadrant. The reference angle <Katex tex="\alpha" /> comes from the sizes of the parts.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = -\pi+\frac{\pi}{6} = -\frac{5\pi}{6}}" />,
    reason: <>The principal argument, in <Katex tex="(-\pi,\pi]" />: a third-quadrant angle is <Katex tex="-\pi+\alpha" />. A check: the ray in part a. points down and to the left, <Katex tex="30^\circ" /> below the negative real axis.</>,
    more: <>The trap is <Katex tex="\tfrac{\pi}{6}" />, which is <Katex tex="\operatorname{Arg}(z_0)" />: the direction from <Katex tex="O" /> to <Katex tex="z_0" />, exactly the opposite way. And <Katex tex="\tfrac{7\pi}{6}" /> is the right direction but not a principal value.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="r = |z_0| = \sqrt{\left(\sqrt3\right)^2+1^2} = \sqrt4 = 2" />,
    reason: <>The circle is centred at <Katex tex="O" />, so its radius is the distance from <Katex tex="O" /> to <Katex tex="z_0" />: the modulus.</>,
  },
  {
    working: <Katex display tex="\boxed{|z| = 2}" />,
    reason: <><Katex tex="|z|" /> is the distance from <Katex tex="O" /> to <Katex tex="z" />, so <Katex tex="|z|=2" /> is every point at distance 2 from the origin. The answer must be in terms of <Katex tex="z" />, as asked.</>,
    more: <>VCAA also accepts other forms, such as <Katex tex="\sqrt{z\overline{z}}=2" /> (since <Katex tex="z\overline{z}=|z|^2" />). The Cartesian <Katex tex="x^2+y^2=4" /> is the same circle but is not written in terms of <Katex tex="z" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="z_0 = 2\,\text{cis}\left(\frac{\pi}{6}\right)" />,
    reason: <>Modulus 2 from part c.; first quadrant with <Katex tex="\tan(\operatorname{Arg} z_0)=\tfrac{1}{\sqrt3}" />, so the argument is <Katex tex="\tfrac{\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="\text{spacing } \frac{2\pi}{3}" />,
    reason: <>Three equally spaced points on a circle split the full turn <Katex tex="2\pi" /> into three equal angles at the centre.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} z_1 &= 2\,\text{cis}\left(\frac{\pi}{6}+\frac{2\pi}{3}\right) = 2\,\text{cis}\left(\frac{5\pi}{6}\right) \\ z_2 &= 2\,\text{cis}\left(\frac{\pi}{6}-\frac{2\pi}{3}\right) = 2\,\text{cis}\left(-\frac{\pi}{2}\right) \end{aligned}" />,
    reason: <>Same modulus, argument a third of a turn either way from <Katex tex="z_0" />. Going the other way for <Katex tex="z_2" /> keeps its argument principal, in <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z_1 = -\sqrt3+i, \qquad z_2 = -2i}" />,
    reason: <><Katex tex="2\cos\left(\tfrac{5\pi}{6}\right)=-\sqrt3" />, <Katex tex="2\sin\left(\tfrac{5\pi}{6}\right)=1" />; <Katex tex="2\,\text{cis}\left(-\tfrac{\pi}{2}\right)" /> points straight down. A check: both have modulus 2.</>,
    more: <>VCAA accepts the polar forms <Katex tex="2\,\text{cis}\left(\tfrac{5\pi}{6}\right)" /> and <Katex tex="2\,\text{cis}\left(-\tfrac{\pi}{2}\right)" /> too. The three points form an equilateral triangle inscribed in the circle.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="f(z) = \bigl(z-z_0\bigr)\bigl(z-z_1\bigr)\bigl(z-z_2\bigr)" />,
    reason: <>By the factor theorem, each root <Katex tex="w" /> gives a factor <Katex tex="z-w" />. Three roots, so a cubic.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\bigl(z-\sqrt3-i\bigr)\bigl(z+\sqrt3-i\bigr) \\ &= \bigl((z-i)-\sqrt3\bigr)\bigl((z-i)+\sqrt3\bigr) \\ &= (z-i)^2-3 = z^2-2iz-4 \end{aligned}" />,
    reason: <>Pair the two roots with the same imaginary part: grouping <Katex tex="z-i" /> turns the product into a difference of two squares. <Katex tex="(z-i)^2=z^2-2iz+i^2=z^2-2iz-1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f(z) &= \bigl(z^2-2iz-4\bigr)(z+2i) \\ &= z^3+2iz^2-2iz^2-4i^2z-4z-8i \end{aligned}" />,
    reason: <>The third factor is <Katex tex="z-(-2i)=z+2i" />. Expand term by term, using <Katex tex="i^2=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(z) = z^3-8i}" />,
    reason: <>The <Katex tex="z^2" /> terms cancel and <Katex tex="4z-4z=0" />. A check: <Katex tex="z_0^3=\left(2\,\text{cis}\tfrac{\pi}{6}\right)^3=8\,\text{cis}\tfrac{\pi}{2}=8i" />, so <Katex tex="f(z_0)=0" />.</>,
    more: <>The quick route: equally spaced points on a circle centred at <Katex tex="O" /> are the cube roots of one number. By de Moivre, cubing <Katex tex="2\,\text{cis}(\varphi)" /> cubes the modulus and triples the argument, and <Katex tex="\tfrac{\pi}{6}" />, <Katex tex="\tfrac{5\pi}{6}" /> and <Katex tex="-\tfrac{\pi}{2}" /> all triple to <Katex tex="\tfrac{\pi}{2}" /> up to whole turns, so all three cube to <Katex tex="8i" /> and solve <Katex tex="z^3=8i" />. VCAA accepts any equivalent form, such as the factored product.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="|z-i| = |z-z_3|" />,
    reason: <>This is every point equidistant from <Katex tex="i" /> and <Katex tex="z_3" />: the perpendicular bisector of the segment joining them. So the line through <Katex tex="O" /> and <Katex tex="z_0" /> must be that bisector, and <Katex tex="z_3" /> is the mirror image of <Katex tex="i" /> in the line.</>,
  },
  {
    working: <Katex display tex="\text{line: } y = \frac{1}{\sqrt3}x" />,
    reason: <>Through <Katex tex="(0,0)" /> and <Katex tex="\left(\sqrt3,1\right)" />, so its gradient is <Katex tex="\tfrac{1}{\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &z_3=a+bi: \ \text{midpoint } \left(\frac a2,\ \frac{1+b}{2}\right) \\ &\text{on the line} \implies \frac{1+b}{2} = \frac{a}{2\sqrt3} \end{aligned}" />,
    reason: <>The perpendicular bisector passes through the midpoint of <Katex tex="(0,1)" /> and <Katex tex="(a,b)" />.</>,
  },
  {
    working: <Katex display tex="\frac{b-1}{a} = -\sqrt3" />,
    reason: <>The segment from <Katex tex="(0,1)" /> to <Katex tex="(a,b)" /> is perpendicular to the line, so its gradient is the negative reciprocal of <Katex tex="\tfrac{1}{\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} a &= \sqrt3(1+b) \\ b-1 &= -\sqrt3a = -3(1+b) \implies 4b=-2 \end{aligned}" />,
    reason: <>Make <Katex tex="a" /> the subject of the first equation and substitute into the second.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &b=-\frac12, \quad a=\sqrt3\left(\frac12\right)=\frac{\sqrt3}{2} \\ &\implies \boxed{z_3 = \frac{\sqrt3}{2}-\frac12 i} \end{aligned}" />,
    reason: <>In the form <Katex tex="a+bi" /> as asked. A check: <Katex tex="|z_3|=\sqrt{\tfrac34+\tfrac14}=1=|i|" />, as it must be, since <Katex tex="O" /> is on the bisector and so is equidistant from <Katex tex="i" /> and <Katex tex="z_3" />.</>,
    more: <>VCAA&apos;s sample answer reasons geometrically: <Katex tex="z_3" /> is the same perpendicular distance from the ray as <Katex tex="(0,1)" />. The line is at <Katex tex="30^\circ" /> to the real axis and <Katex tex="i" /> is <Katex tex="60^\circ" /> above the line, so its mirror image is <Katex tex="60^\circ" /> below the line, at <Katex tex="-30^\circ" />, still at distance 1 from <Katex tex="O" />: <Katex tex="a=\cos 30^\circ" />, <Katex tex="|b|=\sin 30^\circ" />. That is <Katex tex="\text{cis}\left(-\tfrac{\pi}{6}\right)=\tfrac{\sqrt3}{2}-\tfrac12i" /> again.</>,
  },
]

export default function SpecialistQ2_2022NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (9 marks)</p>
        <p>
          <Katex tex="\operatorname{Arg}(z-z_0)=\theta" /> defines a ray in the complex plane
          originating at point <Katex tex="z_0" />, where <Katex tex="z_0=\sqrt3+i" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Three kinds of locus appear here, and each has a picture. <Katex tex="\operatorname{Arg}(z-z_0)=\theta" /> is
              a ray: start at <Katex tex="z_0" /> and head off at angle <Katex tex="\theta" />.{' '}
              <Katex tex="|z|=r" /> is a circle of radius <Katex tex="r" /> centred at the origin.
              And <Katex tex="|z-w_1|=|z-w_2|" /> is the perpendicular bisector of the segment
              from <Katex tex="w_1" /> to <Katex tex="w_2" />, every point the same distance from both.
            </p>
            <p>
              Writing <Katex tex="z_0" /> in polar form, <Katex tex="2\,\text{cis}\left(\tfrac{\pi}{6}\right)" />,
              makes parts c. to e. short: the modulus is the circle&apos;s radius, adding{' '}
              <Katex tex="\tfrac{2\pi}{3}" /> to the argument steps round to the next point, and
              de Moivre&apos;s theorem says what happens when the points are cubed.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Ray Locus"
        marks={1}
        statement={
          <>
            <p>
              Sketch <Katex tex="\operatorname{Arg}(z-z_0)=\theta" /> on the Argand plane below,
              given that the ray passes through the origin.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={argandSrc}
                alt="Blank Argand plane from the original VCAA exam paper: Re(z) and Im(z) each from −2 to 2, with gridlines every 1"
                className="w-full max-w-[380px]"
              />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Argument" marks={1} statement={<>Find the angle <Katex tex="\theta" />.</>}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Circle Locus"
        marks={1}
        statement={
          <>
            Determine, in terms of <Katex tex="z" />, the equation of the circle with centre at the
            origin <Katex tex="O" /> that passes through <Katex tex="z_0" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Cube Roots"
        marks={2}
        statement={
          <>
            If <Katex tex="z_0" /> is one of three points equally spaced on the circle described in{' '}
            <b>part c.</b>, find the other two points, <Katex tex="z_1" /> and <Katex tex="z_2" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Factor Theorem"
        marks={2}
        statement={
          <>
            The points <Katex tex="z_0" />, <Katex tex="z_1" /> and <Katex tex="z_2" /> are the roots of
            the equation <Katex tex="f(z)=0" />.
            <br />
            Find <Katex tex="f(z)" /> in polynomial form.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="Equally spaced means a third of a turn apart, and cubing sends all three to 8i">
          <CubeRootsWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="f"
        topic="Line Locus"
        marks={2}
        statement={
          <>
            The line that passes through the origin and the point <Katex tex="z_0" /> can be expressed
            in the form <Katex tex="|z-i|=|z-z_3|" />.
            <br />
            Find <Katex tex="z_3" /> in the form <Katex tex="a+bi" />, where <Katex tex="a,b\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
