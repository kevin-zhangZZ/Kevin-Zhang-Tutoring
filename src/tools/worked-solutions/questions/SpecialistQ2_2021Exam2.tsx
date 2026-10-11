// 2021 Specialist Mathematics — Exam 2, Section B Question 2 (9 marks). A real cubic with a
// conjugate pair of roots, then a ray cutting a circle in the complex plane and the area of
// the minor segment. Question text transcribed from the original paper; the figure is this
// site's own matplotlib drawing of the answer, on VCAA's polar grid (circles r = 1 to 4,
// radial lines every 30°). Answers checked with sympy and against the VCAA
// examination report. Solution is original.
//
// Interactive widgets: part b (slide z along the ray: Arg(z − z₄) = 5π/6 for every z except z₄
// itself, where z − z₄ = 0 has no argument, hence the open circle; on VCAA's polar grid
// z₄ = 2cis(π/6) and the ray passes through 2i, two exact grid intersections), part c.ii (the
// segment built as sector − triangle: the radii to A = 2i and B = −√3/2 + 5i/2 and the chord AB
// are all 1, so the triangle is equilateral and θ = π/3; a toggle shows the too-thin sector that
// θ = π/6 would give). No widget for a.ii (23% full marks): it is pure algebra (the report's
// comment is about substituting into the expanded form), which nothing on a graph would show.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2021e2-q2-argand.png'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const RayWidget = lazyWidget(() => import('../interactives/spec-2021e2-q2b-ray'))
const SegmentWidget = lazyWidget(() => import('../interactives/spec-2021e2-q2cii-segment'))

const EXAM_AI: SAExaminerStats = { marks: [27, 73], average: 0.8 }

const EXAM_AII: SAExaminerStats = {
  marks: [28, 39, 10, 23],
  average: 1.3,
  comment: (
    <>
      Many students used <Katex tex="p(2)=-13" /> in the expanded form, which was less
      productive than using the factorised form directly.
      <br />
      An alternative solution involving purely real <Katex tex="z" /> values was possible
      yielding <Katex tex="\alpha=\tfrac35,\ \beta=-9,\ \gamma=-\tfrac{27}{5}" />.
      <br />
      Where working was correct and complete across Questions 2ai. and 2aii., these answers
      were accepted.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 28, 31],
  average: 0.9,
  comment: (
    <>
      Where drawn, the ray generally had the correct argument. The point of emanation is not
      part of required ray and should be shown as an open circle. This was not always shown
      or placed correctly, sometimes due to an apparent lack of precision rather than an
      obvious mathematical error.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = { marks: [25, 75], average: 0.8 }

const EXAM_CII: SAExaminerStats = {
  marks: [62, 16, 22],
  average: 0.6,
  comment: (
    <>
      Students who scored highly correctly applied a segment area formula. A smaller
      proportion correctly used a definite integral. Some students who used an area formula,
      either of segments or triangles, had difficulty determining the required angle.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\alpha,\beta,\gamma \in R, \quad z_1 \in R" />,
    reason: <>The coefficients of <Katex tex="p" /> are real, so its non-real roots come in conjugate pairs: if <Katex tex="w" /> is a root, so is <Katex tex="\overline{w}" />.</>,
    more: <>This is the conjugate root theorem. The question separates the real root <Katex tex="z_1" /> from <Katex tex="z_2,z_3\in C" />, signalling that <Katex tex="z_2" /> and <Katex tex="z_3" /> are that pair.</>,
  },
  {
    working: <Katex display tex="\boxed{z_3 = \overline{z_2}}" />,
    reason: <>Writing <Katex tex="z_2=\overline{z_3}" /> says the same thing.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="z_2 = a+bi, \quad z_3 = a-bi \quad (a,b\in R)" />,
    reason: <>From part a.i, <Katex tex="z_3=\overline{z_2}" />. Cartesian form turns the two modulus conditions into equations for <Katex tex="a" /> and <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\left|z_2+z_3\right| = |2a| = 0 \implies a = 0" />,
    reason: <>Adding conjugates cancels the imaginary parts. A modulus is 0 only for the number 0, so <Katex tex="z_2" /> and <Katex tex="z_3" /> are purely imaginary.</>,
  },
  {
    working: <Katex display tex="\left|z_2-z_3\right| = |2bi| = 2|b| = 6 \implies b = \pm 3" />,
    reason: <>Subtracting conjugates cancels the real parts, leaving <Katex tex="2bi" />, whose modulus is <Katex tex="2|b|" />.</>,
  },
  {
    working: <Katex display tex="z_2 = 3i, \quad z_3 = -3i" />,
    reason: <><Katex tex="b=-3" /> gives the same two roots with the labels swapped, which makes no difference to <Katex tex="p(z)" />.</>,
  },
  {
    working: <Katex display tex="p(2) = (2-z_1)(2-3i)(2+3i) = -13" />,
    reason: <>Substitute <Katex tex="z=2" /> into the <em>factorised</em> form: the only unknown left is <Katex tex="z_1" />.</>,
    more: <>The report notes many students used <Katex tex="p(2)=-13" /> in the expanded form, which was less productive: <Katex tex="8+4\alpha+2\beta+\gamma=-13" /> is one equation with three unknowns, whereas the factorised form already contains the two roots just found.</>,
  },
  {
    working: <Katex display tex="(2-3i)(2+3i) = 4-9i^2 = 13" />,
    reason: <>Difference of two squares, with <Katex tex="i^2=-1" />. A conjugate pair always multiplies to a real number.</>,
  },
  {
    working: <Katex display tex="13(2-z_1) = -13 \implies z_1 = 3" />,
    reason: <>Dividing by 13 gives <Katex tex="2-z_1=-1" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} p(z) &= (z-3)(z-3i)(z+3i) \\ &= (z-3)\left(z^2+9\right) \\ &= z^3-3z^2+9z-27 \end{aligned}"
      />
    ),
    reason: <>All three roots are now known, so rebuild <Katex tex="p(z)" /> from its factors. Again a difference of two squares: <Katex tex="(z-3i)(z+3i)=z^2-9i^2=z^2+9" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = -3, \quad \beta = 9, \quad \gamma = -27}" />,
    reason: <>Matching coefficients with <Katex tex="z^3+\alpha z^2+\beta z+\gamma" />. Check: <Katex tex="p(2)=8-12+18-27=-13" /> ✓.</>,
    more: <>The report also accepted a second answer. Real numbers are complex numbers too, so <Katex tex="z_2" /> and <Katex tex="z_3" /> could both be real. Then <Katex tex="|z_2+z_3|=0" /> gives <Katex tex="z_3=-z_2" />, and <Katex tex="|z_2-z_3|=|2z_2|=6" /> makes the roots <Katex tex="3" /> and <Katex tex="-3" />. Now <Katex tex="p(2)=(2-z_1)(2-3)(2+3)=-5(2-z_1)=-13" />, so <Katex tex="z_1=-\tfrac35" />, and <Katex tex="p(z)=\left(z+\tfrac35\right)\left(z^2-9\right)=z^3+\tfrac35z^2-9z-\tfrac{27}{5}" />: the report&apos;s <Katex tex="\alpha=\tfrac35,\ \beta=-9,\ \gamma=-\tfrac{27}{5}" />. It was accepted where the working across a.i and a.ii was correct and complete.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z_4 = \sqrt3+i = 2\operatorname{cis}\!\left(\tfrac{\pi}{6}\right)" />,
    reason: <>The grid is polar, so use polar form: <Katex tex="|z_4|=\sqrt{3+1}=2" />, and <Katex tex="\tan\theta=\tfrac{1}{\sqrt3}" /> in the first quadrant gives <Katex tex="\theta=\tfrac{\pi}{6}" />.</>,
    more: <>VCAA&apos;s grid has circles <Katex tex="r=1" /> to <Katex tex="4" /> and radial lines every <Katex tex="30^\circ" />, so <Katex tex="z_4" /> sits exactly where the circle <Katex tex="r=2" /> meets the <Katex tex="30^\circ" /> line, with no need to estimate <Katex tex="\sqrt3\approx1.73" />.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(z-z_4) = \tfrac{5\pi}{6} = 150^\circ" />,
    reason: <><Katex tex="z-z_4" /> is the arrow from <Katex tex="z_4" /> to <Katex tex="z" />, so every point of the ray lies in direction <Katex tex="150^\circ" /> from <Katex tex="z_4" />: up and to the left.</>,
    more: <>That is <Katex tex="30^\circ" /> above the negative real direction. Only that one direction counts (points in the opposite direction, <Katex tex="-30^\circ" /> from <Katex tex="z_4" />, have the wrong argument), so it is a ray starting at <Katex tex="z_4" />, not a whole line.</>,
  },
  {
    working: <Katex display tex="2i - z_4 = -\sqrt3+i = 2\operatorname{cis}\!\left(\tfrac{5\pi}{6}\right)" />,
    reason: <>A second exact point to rule through: the gradient is <Katex tex="\tan\tfrac{5\pi}{6}=-\tfrac{1}{\sqrt3}" />, so going <Katex tex="\sqrt3" /> left from <Katex tex="z_4" /> takes you 1 up, to <Katex tex="2i" />.</>,
    more: <><Katex tex="2i" /> is where the circle <Katex tex="r=2" /> meets the imaginary axis: a grid intersection.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={argandSrc}
          alt="On VCAA's polar grid: an orange ray leaving an open circle at z4 = √3 + i heading up and to the left at 150°, cutting the blue circle of radius 1 centred at 3i"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>At <Katex tex="z=z_4" />, <Katex tex="z-z_4=0" />, and <Katex tex="\operatorname{Arg}(0)" /> is undefined, so <Katex tex="z_4" /> itself is not on the ray: mark it with an open circle.</>,
    more: <>The report notes this starting point was not always shown or placed correctly, sometimes through a lack of precision. Ruling from <Katex tex="2\operatorname{cis}\left(\tfrac{\pi}{6}\right)" /> through <Katex tex="2i" /> avoids that.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="|z-3i| = 1: \text{ centre } 3i, \text{ radius } 1" />,
    reason: <><Katex tex="|z-3i|" /> is the distance from <Katex tex="z" /> to <Katex tex="3i" />, so these are all the points 1 unit from <Katex tex="3i" />: a circle.</>,
  },
  {
    working: <Katex display tex="\text{through } 2i,\ 4i,\ -1+3i,\ 1+3i" />,
    reason: <>One unit below, above, left and right of the centre: four exact points to draw it through. It is the blue circle in part b&apos;s figure.</>,
    more: <>The ray cuts a thin piece off the bottom-left of this circle: that piece is the minor segment of part c.ii.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{ray: } y = 2-\tfrac{x}{\sqrt3}, \quad x<\sqrt3" />,
    reason: <>The line through <Katex tex="z_4" /> and <Katex tex="2i" /> from part b (gradient <Katex tex="-\tfrac{1}{\sqrt3}" />, <Katex tex="y" />-intercept 2); the ray is the part left of <Katex tex="z_4" />.</>,
    more: <>The ends of the chord are where this meets the circle, so the plan is to solve it with the circle&apos;s Cartesian equation.</>,
  },
  {
    working: <Katex display tex="\text{circle: } x^2+(y-3)^2 = 1" />,
    reason: <>With <Katex tex="z=x+yi" />, <Katex tex="|z-3i|^2=|x+(y-3)i|^2=x^2+(y-3)^2" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} x^2+\left(-1-\tfrac{x}{\sqrt3}\right)^2 &= 1 \\ \tfrac43x^2+\tfrac{2}{\sqrt3}x &= 0 \\ x\left(\tfrac43x+\tfrac{2}{\sqrt3}\right) &= 0 \end{aligned}"
      />
    ),
    reason: <>From the ray, <Katex tex="y-3=2-\tfrac{x}{\sqrt3}-3=-1-\tfrac{x}{\sqrt3}" />. Substitute into the circle, expand, and the 1s on each side cancel. On CAS, <Cas fn="solve" /> the two equations together.</>,
    more: <>Expanding: <Katex tex="\left(-1-\tfrac{x}{\sqrt3}\right)^2=1+\tfrac{2x}{\sqrt3}+\tfrac{x^2}{3}" />, so <Katex tex="x^2+\tfrac{x^2}{3}=\tfrac43x^2" />, and the constant 1 cancels with the 1 on the right.</>,
  },
  {
    working: <Katex display tex="x = 0 \ \text{ or } \ x = -\tfrac{3}{2\sqrt3} = -\tfrac{\sqrt3}{2}" />,
    reason: <>Null factor law: <Katex tex="x=0" /> or <Katex tex="\tfrac43x=-\tfrac{2}{\sqrt3}" />. Both are less than <Katex tex="\sqrt3" />, so both points are on the ray itself, not on the other half of the line.</>,
  },
  {
    working: <Katex display tex="A = 2i, \quad B = -\tfrac{\sqrt3}{2}+\tfrac52i" />,
    reason: <>From <Katex tex="y=2-\tfrac{x}{\sqrt3}" />: <Katex tex="y=2" /> when <Katex tex="x=0" />, and <Katex tex="y=2+\tfrac12=\tfrac52" /> when <Katex tex="x=-\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: <Katex display tex="AB = \left|-\tfrac{\sqrt3}{2}+\tfrac12i\right| = \sqrt{\tfrac34+\tfrac14} = 1" />,
    reason: <>The length of the chord is <Katex tex="|B-A|" />.</>,
  },
  {
    working: <Katex display tex="\theta = \tfrac{\pi}{3}" />,
    reason: <>The segment formula needs <Katex tex="\theta" />, the angle at the centre <Katex tex="3i" /> between the radii to <Katex tex="A" /> and <Katex tex="B" />. Both radii and the chord are 1, so that triangle is equilateral: every angle is <Katex tex="\tfrac{\pi}{3}" />.</>,
    more: <>The report notes some students who used an area formula had difficulty determining the required angle. It is this angle at the centre, not an angle the ray makes with an axis: <Katex tex="\tfrac{\pi}{6}" /> is easy to grab here (the argument of <Katex tex="z_4" />, and the ray&apos;s <Katex tex="30^\circ" /> above the negative real direction), but a sector of angle <Katex tex="\tfrac{\pi}{6}" /> is too thin to reach both <Katex tex="A" /> and <Katex tex="B" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \text{Area} &= \tfrac12r^2\theta-\tfrac12r^2\sin\theta \\ &= \tfrac12\cdot\tfrac{\pi}{3}-\tfrac12\sin\tfrac{\pi}{3} \end{aligned}"
      />
    ),
    reason: <>Segment = sector − triangle, with <Katex tex="r=1" />: sector <Katex tex="\tfrac12r^2\theta" />, triangle <Katex tex="\tfrac12r^2\sin\theta" /> (two sides <Katex tex="r" /> with angle <Katex tex="\theta" /> between them). As <Katex tex="\theta<\pi" />, this is the minor segment.</>,
    more: <>The minor segment is the piece on the far side of the chord from the centre; with <Katex tex="\theta" /> less than <Katex tex="\pi" /> the triangle sits inside the sector, so subtracting it leaves exactly that piece.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac{\pi}{6}-\frac{\sqrt3}{4} = \frac{2\pi-3\sqrt3}{12}}" />,
    reason: <>About 0.091 square units: a thin sliver, as expected for the piece the ray cuts off.</>,
    more: <>The report notes a smaller proportion correctly used a definite integral instead. The segment lies between the chord (above) and the lower arc <Katex tex="y=3-\sqrt{1-x^2}" /> (below), for <Katex tex="-\tfrac{\sqrt3}{2}\le x\le 0" />, so <Katex tex="\text{Area}=\int_{-\sqrt3/2}^{0}\left[\left(2-\tfrac{x}{\sqrt3}\right)-\left(3-\sqrt{1-x^2}\right)\right]dx" />, which <Cas fn="nInt" /> evaluates to 0.0906, matching.</>,
  },
]

export default function SpecialistQ2_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (9 marks)</p>
        <p>
          The polynomial{' '}
          <Katex tex="p(z)=z^3+\alpha z^2+\beta z+\gamma" />, where <Katex tex="z\in C" />{' '}
          and <Katex tex="\alpha,\beta,\gamma\in R" />, can also be written as{' '}
          <Katex tex="p(z)=(z-z_1)(z-z_2)(z-z_3)" />, where <Katex tex="z_1\in R" /> and{' '}
          <Katex tex="z_2,z_3\in C" />.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Conjugate Roots"
        marks={1}
        statement={
          <>
            State the relationship between <Katex tex="z_2" /> and <Katex tex="z_3" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Cubic Coefficients"
        marks={3}
        statement={
          <>
            Determine the values of <Katex tex="\alpha" />, <Katex tex="\beta" /> and{' '}
            <Katex tex="\gamma" />, given that <Katex tex="p(2)=-13" />,{' '}
            <Katex tex="\left|z_2+z_3\right|=0" /> and <Katex tex="\left|z_2-z_3\right|=6" />.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Consider the point <Katex tex="z_4=\sqrt3+i" />.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Ray Locus"
        marks={2}
        statement={
          <>
            Sketch the ray given by{' '}
            <Katex tex="\operatorname{Arg}(z-z_4)=\tfrac{5\pi}{6}" /> on the Argand diagram below.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why z₄ is an open circle, and where exactly it goes on the polar grid">
          <RayWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The ray <Katex tex="\operatorname{Arg}(z-z_4)=\tfrac{5\pi}{6}" /> intersects the
          circle <Katex tex="|z-3i|=1" />, dividing it into a major and a minor segment.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Circle Locus"
        marks={1}
        statement={
          <>
            Sketch the circle <Katex tex="|z-3i|=1" /> on the Argand diagram in part b.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Segment Area"
        marks={2}
        statement={<>Find the area of the minor segment.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <Explore title="Segment = sector − triangle, and why the angle is π/3, not π/6">
          <SegmentWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
