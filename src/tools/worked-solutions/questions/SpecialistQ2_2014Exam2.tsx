// 2014 Specialist Mathematics — Exam 2, Section 2 Question 2 (13 marks). Polar form and the
// roots of z^3 = -24*sqrt(3), then a conjugate product that turns out to be a circle, and a
// tangent to it. Question text transcribed from the original paper; the Argand axes VCAA
// supplied for part b(iii) were blank, so the sketch is this site's own matplotlib figure.
// Answers checked with sympy and against the VCAA examination report. Solution is original.
// Interactive: part c only (9% full marks) -- slide k to see the line keep gradient 1 and become a
// tangent when the centre is 2 from it. Other parts had at least 57% full marks, so no widget.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import circleSrc from './spec-2014e2-q2b-circle.png'
import { Explore, lazyWidget } from '../Explore'

const TangentWidget = lazyWidget(() => import('../interactives/spec-2014e2-q2c-tangent'))

const EXAM_AI: SAExaminerStats = {
  marks: [3, 17, 80],
  average: 1.8,
  comment: (
    <>
      Overall, most students answered this question well, but incorrect arguments such as{' '}
      <Katex tex="\tfrac\pi3" /> or <Katex tex="\tfrac\pi6" /> were common. The argument{' '}
      <Katex tex="\tfrac{5\pi}3" /> was also accepted.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      This question was answered reasonably well, but many students did not express their
      answer as an angle in the interval{' '}
      <Katex tex="(-\pi,\pi]" />. A number of students gave the entire expression for{' '}
      <Katex tex="z_1^4" /> as an answer.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [14, 20, 66],
  average: 1.6,
  comment: (
    <>
      This question was answered reasonably well. Most students could find the conjugate
      root, but a number could not obtain{' '}
      <Katex tex="-2\sqrt3" />, often omitting the negative sign. A number of students gave
      factors instead of the roots.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>The majority of students answered quite well. A number of students obtained incorrect answers involving <Katex tex="i" />.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [20, 24, 57],
  average: 1.4,
  comment: (
    <>
      This ‘show that’ question was only moderately well done. Most students could express
      the relation in terms of <Katex tex="x" /> and <Katex tex="y" />, but a large number could
      not follow through with enough mathematical detail to show the given result. Some
      students substituted the incorrect forms <Katex tex="z=x+y" /> and{' '}
      <Katex tex="\bar z=x-y" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [9, 10, 81],
  average: 1.7,
  comment: (
    <>
      Many students answered this question quite well, although some circles were drawn
      poorly. Some students drew circles with the incorrect centre, and others drew shapes
      other than circles.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [73, 14, 3, 9],
  average: 0.5,
  comment: (
    <>
      Most students struggled with this question. Students needed to equate the gradient of
      the tangent to 1 in order to proceed. Most students attempted to differentiate the
      equation to the circle implicitly, but ended up with too many variables. Other more
      successful attempts involved finding the equation of the tangent and equating
      expressions for the <Katex tex="y" />-intercept, and setting up to solve the line and
      circle equations simultaneously, then equating the discriminant to zero.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="|z_1| = \sqrt{\left(\sqrt3\right)^2+(-3)^2} = \sqrt{12} = 2\sqrt3" />,
    reason: <>The modulus is the distance from the origin, <Katex tex="\sqrt{x^2+y^2}" />.</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = \frac{-3}{\sqrt3} = -\sqrt3" />,
    reason: <>Imaginary part over real part. The point <Katex tex="\left(\sqrt3,-3\right)" /> is in the fourth quadrant, and <Katex tex="\tan\left(\tfrac\pi3\right)=\sqrt3" />, so <Katex tex="\theta=-\tfrac\pi3" />.</>,
    more: <>Sketch the point first, then use the exact-value triangle for the size of the angle and the quadrant for its sign. The report lists <Katex tex="\tfrac\pi3" /> and <Katex tex="\tfrac\pi6" /> as common wrong arguments. <Katex tex="\tfrac\pi3" /> ignores the quadrant (it points above the real axis); <Katex tex="\tfrac\pi6" /> is what you get with the fraction upside down (real over imaginary, <Katex tex="\tfrac{\sqrt3}{3}=\tfrac{1}{\sqrt3}" />).</>,
  },
  {
    working: <Katex display tex="\boxed{z_1 = 2\sqrt3\,\mathrm{cis}\!\left(-\tfrac\pi3\right)}" />,
    reason: <>Not <Katex tex="+\tfrac\pi3" /> — the point lies below the real axis. (<Katex tex="\tfrac{5\pi}3" /> is the same angle and was also accepted.)</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="z_1^4 = \left(2\sqrt3\right)^4\mathrm{cis}\!\left(4\times\left(-\tfrac\pi3\right)\right) = 144\,\mathrm{cis}\!\left(-\tfrac{4\pi}{3}\right)" />,
    reason: <>De Moivre: <Katex tex="\left(r\,\mathrm{cis}\,\theta\right)^n = r^n\,\mathrm{cis}(n\theta)" />, so the argument is multiplied by 4.</>,
  },
  {
    working: <Katex display tex="-\tfrac{4\pi}{3} \notin (-\pi,\pi]" />,
    reason: <><Katex tex="\mathrm{Arg}" /> with a capital A means the <em>principal</em> argument, in <Katex tex="(-\pi,\pi]" />. This angle is outside it.</>,
    more: <>The report notes many students did not express their answer as an angle in <Katex tex="(-\pi,\pi]" />, which is exactly this step.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}\!\left(z_1^4\right) = -\tfrac{4\pi}{3}+2\pi = \boxed{\tfrac{2\pi}{3}}" />,
    reason: <>Adding a full turn, <Katex tex="2\pi" />, points in the same direction and lands inside <Katex tex="(-\pi,\pi]" />.</>,
    more: <>So <Katex tex="z_1^4 = 144\,\mathrm{cis}\left(\tfrac{2\pi}3\right)" />. The report notes some students gave this whole expression: the question asks only for the argument, so the answer is <Katex tex="\tfrac{2\pi}3" /> alone.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="z^3 = -24\sqrt3 = 24\sqrt3\,\mathrm{cis}(\pi)" />,
    reason: <>A negative real number sits on the negative real axis, argument <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\left|z\right| = \sqrt[3]{24\sqrt3} = 2\sqrt3" />,
    reason: <>Since <Katex tex="\left(2\sqrt3\right)^3 = 8\times3\sqrt3 = 24\sqrt3" />. This matches <Katex tex="|z_1|" />: all three roots lie on the same circle.</>,
  },
  {
    working: <Katex display tex="\text{the three roots are spaced } \tfrac{2\pi}{3} \text{ apart}" />,
    reason: <>The <Katex tex="n" /> roots of <Katex tex="z^n=a" /> are equally spaced, <Katex tex="\tfrac{2\pi}{n}" /> apart. So from <Katex tex="-\tfrac\pi3" /> the others are at <Katex tex="\tfrac\pi3" /> and <Katex tex="\pi" />.</>,
    more: <>Equivalently, by De Moivre, <Katex tex="3\theta = \pi+2n\pi" /> gives <Katex tex="\theta = \tfrac\pi3+\tfrac{2n\pi}3" />, which is <Katex tex="-\tfrac\pi3,\ \tfrac\pi3,\ \pi" /> for <Katex tex="n=-1,0,1" />.</>,
  },
  {
    working: <Katex display tex="2\sqrt3\,\mathrm{cis}\!\left(\tfrac\pi3\right) = 2\sqrt3\left(\tfrac12+\tfrac{\sqrt3}2 i\right) = \sqrt3+3i" />,
    reason: <>The conjugate of <Katex tex="z_1" />, as expected for a real cubic.</>,
    more: <>Conjugate root theorem: a polynomial with real coefficients has its non-real roots in conjugate pairs. So <Katex tex="\bar z_1=\sqrt3+3i" /> could be written down straight away; the report says most students found this one.</>,
  },
  {
    working: <Katex display tex="2\sqrt3\,\mathrm{cis}(\pi) = -2\sqrt3" />,
    reason: <>The real root: <Katex tex="\mathrm{cis}(\pi)=-1" />, so it lies on the negative real axis.</>,
    more: <>The report notes a number of students could not obtain <Katex tex="-2\sqrt3" />, often omitting the negative sign. Check it: <Katex tex="\left(-2\sqrt3\right)^3=-24\sqrt3" /> ✓, whereas <Katex tex="\left(2\sqrt3\right)^3=+24\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = \sqrt3+3i \quad\text{and}\quad z = -2\sqrt3}" />,
    reason: <>Both in cartesian form, as asked.</>,
    more: <>Give the roots as values of <Katex tex="z" />, not as factors such as <Katex tex="z-\left(\sqrt3+3i\right)" />: the report notes some students gave factors instead of roots. Check: the three roots sum to <Katex tex="\left(\sqrt3-3i\right)+\left(\sqrt3+3i\right)-2\sqrt3=0" />, as they must for a cubic with no <Katex tex="z^2" /> term ✓.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="z_1 = \sqrt3-3i \implies \bar z_1 = \sqrt3+3i" />,
    reason: <>The conjugate flips the sign of the imaginary part.</>,
  },
  {
    working: <Katex display tex="(z_1+2i)\left(\bar z_1-2i\right) = \left(\sqrt3-i\right)\left(\sqrt3+i\right)" />,
    reason: <><Katex tex="-3i+2i=-i" /> and <Katex tex="3i-2i=+i" />: the two brackets are themselves conjugates.</>,
  },
  {
    working: <Katex display tex="= 3-i^2 = 3+1" />,
    reason: <>A difference of two squares, and <Katex tex="i^2=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{4}" />,
    reason: <>Real, as a product of conjugates always is: <Katex tex="w\bar w=|w|^2" />.</>,
    more: <>Here <Katex tex="w=\sqrt3-i" />, so <Katex tex="|w|^2 = 3+1 = 4" />. The report notes a number of incorrect answers involving <Katex tex="i" />; an answer with <Katex tex="i" /> in it means a sign went wrong in one of the brackets.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="z = x+iy \implies \bar z = x-iy" />,
    reason: <>Write <Katex tex="z" /> by its real and imaginary parts; the conjugate changes the sign of <Katex tex="iy" />.</>,
    more: <>The report notes some students substituted the incorrect forms <Katex tex="z=x+y" /> and <Katex tex="\bar z=x-y" />, which drop the <Katex tex="i" />.</>,
  },
  {
    working: <Katex display tex="z+2i = x+i(y+2), \qquad \bar z-2i = x-i(y+2)" />,
    reason: <>Grouping the imaginary parts shows these two are conjugates of each other.</>,
  },
  {
    working: <Katex display tex="(z+2i)\left(\bar z-2i\right) = \bigl(x+i(y+2)\bigr)\bigl(x-i(y+2)\bigr)" />,
    reason: <>Ready for the difference of two squares.</>,
  },
  {
    working: <Katex display tex="= x^2-i^2(y+2)^2 = x^2+(y+2)^2" />,
    reason: <>Difference of two squares, and <Katex tex="-i^2=+1" />. Show this line: it is the detail that earns the marks.</>,
    more: <>The report says most students could express the relation in terms of <Katex tex="x" /> and <Katex tex="y" />, but a large number could not follow through with enough mathematical detail. Jumping from the product straight to <Katex tex="x^2+(y+2)^2" /> skips the step being tested.</>,
  },
  {
    working: <Katex display tex="\therefore\ (z+2i)\left(\bar z-2i\right) = 4 \iff x^2+(y+2)^2 = 4" />,
    reason: <>Setting the expression equal to 4. As required.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+(y+2)^2 = 4" />,
    reason: <>From part b(ii) — a circle in disguise.</>,
  },
  {
    working: <Katex display tex="\text{centre } (0,-2), \qquad \text{radius } 2" />,
    reason: <>Compare with <Katex tex="(x-h)^2+(y-k)^2=r^2" />: <Katex tex="(y+2)^2=\left(y-(-2)\right)^2" />, so the centre is below the axis, and <Katex tex="r=\sqrt4=2" />.</>,
    more: <>The report notes some circles had the incorrect centre — the sign inside the bracket is the usual slip. Another way to see it: <Katex tex="\bar z-2i" /> is the conjugate of <Katex tex="z+2i" />, so the relation says <Katex tex="|z+2i|^2=4" />, i.e. <Katex tex="|z-(-2i)|=2" />: every point at distance 2 from <Katex tex="-2i" />.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img loading="lazy" decoding="async"
          src={circleSrc}
          alt="This site's sketch, on VCAA's −6 to 6 Argand grid, of the circle of radius 2 centred at (0, −2), passing through the origin and through (0, −4), (2, −2) and (−2, −2)"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>Four easy points to place accurately: <Katex tex="(0,0)" />, <Katex tex="(0,-4)" />, <Katex tex="(\pm2,-2)" /> — each 2 from the centre.</>,
    more: <>The report notes some circles were drawn poorly and some were not circles at all. Mark the centre and these four points on the grid first, then draw a smooth round curve through them. The circle passes through the origin because the centre is exactly 2 from it.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A = (k,-2), \qquad B = (0,-(2+k))" />,
    reason: <>The two complex numbers as points: <Katex tex="k-2i" /> has real part <Katex tex="k" />; <Katex tex="-(2+k)i" /> is purely imaginary, so it is on the imaginary axis.</>,
    more: <>With <Katex tex="k<0" />, <Katex tex="A" /> sits <Katex tex="|k|" /> to the left of the centre <Katex tex="(0,-2)" />, and <Katex tex="B" /> sits <Katex tex="|k|" /> above it, since <Katex tex="-2-k=-2+|k|" />. Sketch this before doing anything else.</>,
  },
  {
    working: <Katex display tex="m_{AB} = \frac{-(2+k)-(-2)}{0-k} = \frac{-k}{-k} = 1" />,
    reason: <>The <Katex tex="k" /> terms cancel: the gradient is 1 whatever <Katex tex="k" /> is, so every possible line is parallel to <Katex tex="y=x" />.</>,
    more: <>This is the key step the report flags: differentiating the circle instead leaves <Katex tex="x" />, <Katex tex="y" /> and <Katex tex="k" /> all unknown. Once you know the gradient is fixed, <Katex tex="k" /> only slides the line sideways, and the question becomes: how far must it slide to just touch the circle?</>,
  },
  {
    working: <Katex display tex="C = (0,-2): \quad CA = CB = -k" />,
    reason: <>From the centre <Katex tex="C" />, <Katex tex="CA" /> is horizontal and <Katex tex="CB" /> vertical, both of length <Katex tex="-k" />. So triangle <Katex tex="ACB" /> is right-angled isosceles, with <Katex tex="45^\circ" /> at <Katex tex="B" />.</>,
    more: <>The length is <Katex tex="-k" />, not <Katex tex="k" />, because <Katex tex="k<0" /> and a length must be positive.</>,
  },
  {
    working: <Katex display tex="\frac{2}{CB} = \cos(45^\circ) \implies \frac{2}{-k} = \frac{1}{\sqrt2}" />,
    reason: <>The tangent touches at <Katex tex="T" />, where radius <Katex tex="CT=2" /> is perpendicular to <Katex tex="AB" />. In right triangle <Katex tex="CTB" /> the angle at <Katex tex="B" /> is <Katex tex="45^\circ" />, so the angle at <Katex tex="C" /> is too, and <Katex tex="CT=CB\cos(45^\circ)" />.</>,
    more: <>This is the report's working. In other words, the perpendicular distance from the centre to the line is <Katex tex="\tfrac{-k}{\sqrt2}" />, and tangency means that distance equals the radius.</>,
  },
  {
    working: <Katex display tex="-k = 2\sqrt2" />,
    reason: <>Cross-multiplying.</>,
    more: <>
      The report mentions two other successful methods.{' '}
      <b>Discriminant:</b> the line through <Katex tex="B" /> with gradient 1 is <Katex tex="y=x-2-k" />. Substituting into <Katex tex="x^2+(y+2)^2=4" /> gives <Katex tex="x^2+(x-k)^2=4" />, i.e. <Katex tex="2x^2-2kx+k^2-4=0" />. A tangent meets the circle once, so <Katex tex="\Delta=4k^2-8\left(k^2-4\right)=32-4k^2=0" />, giving <Katex tex="k=\pm2\sqrt2" />.{' '}
      <b>Equating <Katex tex="y" />-intercepts:</b> a gradient-1 tangent <Katex tex="y=x+c" /> is 2 from <Katex tex="C" />, so (by the same <Katex tex="45^\circ" /> triangle) it crosses the imaginary axis <Katex tex="2\sqrt2" /> above or below <Katex tex="C" />: <Katex tex="c=-2\pm2\sqrt2" />; setting <Katex tex="c=-2-k" /> gives the same <Katex tex="k=\mp2\sqrt2" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{k = -2\sqrt2}" />,
    reason: <>Negative, as the question requires (<Katex tex="k<0" />).</>,
    more: <>Check: the line is then <Katex tex="y=x+2\sqrt2-2" />, which touches the circle at <Katex tex="\left(-\sqrt2,\sqrt2-2\right)" />: substituting, <Katex tex="2+2=4" /> ✓. The positive value <Katex tex="k=2\sqrt2" /> gives the parallel tangent on the other side of the circle (bottom right), which <Katex tex="k<0" /> rules out.</>,
  },
]

export default function SpecialistQ2_2014Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (13 marks)</p>
        <p>
          Consider the complex number <Katex tex="z_1=\sqrt3-3i" />.
        </p>
      </div>

      <PartCard letter="a.i" topic="Polar Form" marks={2} statement={<>Express <Katex tex="z_1" /> in polar form.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard letter="a.ii" topic="Argument" marks={1} statement={<>Find <Katex tex="\mathrm{Arg}\!\left(z_1^4\right)" />.</>} examinerReport={EXAM_AII}>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Cube Roots"
        marks={2}
        statement={
          <>
            Given that <Katex tex="z_1=\sqrt3-3i" /> is one root of the equation{' '}
            <Katex tex="z^3+24\sqrt3=0" />, find the other two roots, expressing your answers
            in cartesian form.
          </>
        }
        examinerReport={EXAM_AIII}
      >
        <WorkingTable rows={ROWS_AIII} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Conjugates"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="(z_1+2i)\left(\bar z_1-2i\right)" />, where{' '}
            <Katex tex="z_1=\sqrt3-3i" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Circle Locus"
        marks={2}
        statement={
          <>
            Show that the relation <Katex tex="(z+2i)\left(\bar z-2i\right)=4" /> can be
            expressed in cartesian form as <Katex tex="x^2+(y+2)^2=4" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Sketch Circle"
        marks={2}
        statement={
          <>
            Sketch <Katex tex="\left\{z:(z+2i)\left(\bar z-2i\right)=4\right\}" /> on the axes
            below.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Tangent to Circle"
        marks={3}
        statement={
          <>
            The line joining the points corresponding to <Katex tex="k-2i" /> and{' '}
            <Katex tex="-(2+k)i" />, where <Katex tex="k<0" />, is tangent to the curve given
            by <Katex tex="\left\{z:(z+2i)\left(\bar z-2i\right)=4\right\}" />. Find the value
            of <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Gradient 1 for every k: slide the line until it touches">
          <TangentWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
