// 2024 Specialist Mathematics — Exam 2, Section B Question 2 (10 marks). Complex-plane
// loci: a perpendicular bisector, a circle on a given diameter, a ray, and the area of the
// segment they cut. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages); the part c. and d.i. answers are our own
// drawings on VCAA's exact Argand grid (x from −2.46 to 5.4, y from −2.42 to 5.42, gridlines
// every 1). Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import circleSrc from './spec-2024e2-q2c-circle.png'
import raySrc from './spec-2024e2-q2d-ray.png'

const EXAM_A: SAExaminerStats = {
  marks: [13, 24, 63],
  average: 1.5,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          This question part was generally answered well.
        </li>
        <li>
          Some students did not provide sufficient working to gain both marks.
        </li>
        <li>
          Several students made sign errors when substituting into the distance formula.
        </li>
        <li>
          Students who used the perpendicular bisector method mostly found the gradient
          correctly. However, some of those students did not correctly use the coordinates of the
          midpoint to find the equation.
        </li>
      </ul>
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 26, 44],
  average: 1.2,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Students who showed working to find the midpoint and diameter usually answered the
          question successfully.
        </li>
        <li>
          Some students did not divide the diameter by 2 to find the radius.
        </li>
        <li>
          Several students did not use the midpoint formula accurately to find the centre of the
          circle.
        </li>
      </ul>
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [9, 17, 74],
  average: 1.7,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Students should be mindful that the circle should be drawn smoothly through the four
          extreme points and should not have a pointed shape.
        </li>
        <li>
          Most students correctly labelled the imaginary axis intercepts.
        </li>
      </ul>
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: <>The position of the ray was generally well done.</>,
}

const EXAM_DII: SAExaminerStats = {
  marks: [44, 56],
  average: 0.6,
  comment: (
    <>
      Most students who were successful in part d.i were able to find the correct equation for
      the ray.
      <br />
      The most common error was to quote the argument as <Katex tex="-\dfrac{\pi}{4}" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [27, 21, 52],
  average: 1.3,
  comment: (
    <>
      Most students were successful when applying the area formula of a segment. Some
      students used the incorrect angle.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}|z-z_1| = |z-z_2|\\ \iff \text{equidistant from}\\ (1,2) \text{ and } (4,0)\end{gathered}" />,
    reason: <>A modulus of a difference is a distance, so this is the perpendicular bisector of the segment joining them.</>,
  },
  {
    working: <Katex display tex="(x-1)^2+(y-2)^2 = (x-4)^2+y^2" />,
    reason: <>With <Katex tex="z=x+iy" />, <Katex tex="z-z_1=(x-1)+(y-2)i" /> and <Katex tex="z-z_2=(x-4)+yi" />. Square both moduli.</>,
    more: <>The report notes several students made sign errors when substituting into the distance formula. Subtracting <Katex tex="z_1=1+2i" /> takes 1 off the real part and 2 off the imaginary part, so both brackets carry minus signs; <Katex tex="z_2=4" /> has imaginary part 0, so its <Katex tex="y" /> term is just <Katex tex="y^2" />.</>,
  },
  {
    working: <Katex display tex="x^2-2x+1+y^2-4y+4 = x^2-8x+16+y^2" />,
    reason: <>The <Katex tex="x^2" /> and <Katex tex="y^2" /> terms cancel, which is why the locus is a straight line.</>,
  },
  {
    working: <Katex display tex="6x-4y = 11" />,
    reason: <>Moving the <Katex tex="x" /> terms left and the constants right: <Katex tex="-2x+8x-4y=16-5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{3}{2}x-\frac{11}{4}}" />,
    reason: <>Rearranged for <Katex tex="y" />, the form the question asks for.</>,
    more: <>The geometric route agrees: the segment from <Katex tex="(1,2)" /> to <Katex tex="(4,0)" /> has gradient <Katex tex="-\tfrac23" />, so the bisector has gradient <Katex tex="\tfrac32" /> and passes through the midpoint <Katex tex="\left(\tfrac{1+4}{2},\tfrac{2+0}{2}\right)=\left(\tfrac52,1\right)" />. Then <Katex tex="y-1=\tfrac32\left(x-\tfrac52\right)" /> gives the same line. The report says some students using this method found the gradient but did not correctly use the midpoint — the line must pass through the midpoint, not through <Katex tex="z_1" /> or <Katex tex="z_2" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z_c = \frac{z_1+z_2}{2} = \frac{(1+2i)+4}{2} = \frac{5}{2}+i" />,
    reason: <>The centre is the midpoint of any diameter: average the two endpoints.</>,
    more: <>The report says several students did not use the midpoint formula accurately. Average the real parts, <Katex tex="\tfrac{1+4}{2}=\tfrac52" />, and the imaginary parts, <Katex tex="\tfrac{2+0}{2}=1" /> — remembering that <Katex tex="z_2=4" /> has imaginary part 0.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}z_2-z_1 = 4-(1+2i) = 3-2i\\ |z_2-z_1| = \sqrt{9+4} = \sqrt{13}\end{gathered}" />,
    reason: <>The length of the diameter is the distance between its endpoints.</>,
  },
  {
    working: <Katex display tex="r = \frac{\sqrt{13}}{2}" />,
    reason: <>The radius is half the diameter.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|z-\left(\tfrac52+i\right)\right| = \frac{\sqrt{13}}{2}}" />,
    reason: <>Substituting <Katex tex="z_c" /> and <Katex tex="r" /> into <Katex tex="|z-z_c|=r" />.</>,
    more: <>Check: the distance from the centre to <Katex tex="z_2=4" /> is <Katex tex="\left|\tfrac32-i\right|=\sqrt{\tfrac94+1}=\tfrac{\sqrt{13}}{2}" /> ✓, so the endpoint of the diameter is on the circle.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="|z-(1+2i)| = 2 \implies \text{centre } (1,2), \ \text{radius } 2" />,
    reason: <>Read straight off the form <Katex tex="|z-z_c|=r" />.</>,
  },
  {
    working: <Katex display tex="\text{imaginary axis}: \ x = 0 \implies |{-1}+(y-2)i| = 2" />,
    reason: <>Points on the imaginary axis have real part zero, so put <Katex tex="z=0+yi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}1+(y-2)^2 &= 4\\ (y-2)^2 &= 3\\ y &= 2\pm\sqrt3\end{aligned}" />,
    reason: <>Squaring the modulus. Two intercepts, symmetric about the height of the centre.</>,
  },
  {
    working: <Katex display tex="\left(2+\sqrt3\right)i \ \text{ and } \ \left(2-\sqrt3\right)i" />,
    reason: <>About <Katex tex="3.73i" /> and <Katex tex="0.27i" />, which places them on the grid. Label the exact values.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={circleSrc}
          alt="The answer on VCAA's Argand grid (x and y from about −2.4 to 5.4): a circle of radius 2 centred at 1 + 2i, touching the real axis at 1 and crossing the imaginary axis at the labelled points (2 + √3)i and (2 − √3)i"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>A smooth circle through the four extreme points (the centre moved 2 left, right, down and up): <Katex tex="-1+2i" />, <Katex tex="3+2i" />, <Katex tex="1" /> and <Katex tex="1+4i" />.</>,
    more: <>The lowest point is <Katex tex="1" /> because the radius 2 equals the centre's height above the real axis, so the circle just touches the real axis there. Join the extreme points with a round curve, not straight or pointed sections.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{origin } 2-i \ \to \ \text{through } -2+3i" />,
    reason: <>A ray is a half-line: it starts at the first point (which is not itself included) and runs through the second, continuing indefinitely.</>,
  },
  {
    working: <Katex display tex="\text{direction} = (-2-2,\ 3-(-1)) = (-4,4)" />,
    reason: <>Through-point minus starting point: 4 left and 4 up, so the ray heads up and to the left at 45°.</>,
  },
  {
    working: <Katex display tex="\text{the ray lies on } x+y=1" />,
    reason: <>Gradient <Katex tex="\tfrac{4}{-4}=-1" /> through <Katex tex="(2,-1)" />: <Katex tex="y+1=-(x-2)" />. Check: <Katex tex="(-2,3)" /> satisfies it too.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={raySrc}
          alt="The part c. diagram with the answer added: a ray starting at an open circle at 2 − i and running up and to the left through −2 + 3i to the edge of the grid, crossing the circle at 1 and at −1 + 2i"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>The open circle marks that <Katex tex="2-i" /> itself is not on the ray, which continues past <Katex tex="-2+3i" /> to the edge of the grid.</>,
    more: <>A ray does not stop at the point it passes through, so stopping the line at <Katex tex="-2+3i" /> would draw a segment, not a ray. On its way the ray crosses the circle at <Katex tex="1" /> and <Katex tex="-1+2i" /> (found in part e.).</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Arg}(z-z_0) = \theta \ \text{ with } z_0 = 2-i" />,
    reason: <>The ray starts at <Katex tex="2-i" />, so that is the point subtracted.</>,
  },
  {
    working: <Katex display tex="\tan\theta = \frac{4}{-4} = -1" />,
    reason: <>From the direction vector <Katex tex="(-4,4)" /> found in part d.i. — rise over run.</>,
  },
  {
    working: <Katex display tex="(-4,4) \text{ is in the second quadrant} \implies \theta = \frac{3\pi}{4}" />,
    reason: <>The direction is left and up, so the angle is in the second quadrant: <Katex tex="\theta=\pi-\tfrac{\pi}{4}" />, not <Katex tex="-\tfrac{\pi}{4}" />.</>,
    more: <>The report says the most common error was to quote the argument as <Katex tex="-\tfrac{\pi}{4}" />. That is what <Katex tex="\tan^{-1}(-1)" /> returns, but it points down and to the right — the opposite direction, from <Katex tex="2-i" /> towards <Katex tex="3-2i" />. Always check the quadrant from the signs of the direction, not from <Katex tex="\tan^{-1}" /> alone.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Arg}\bigl(z-(2-i)\bigr) = \frac{3\pi}{4}}" />,
    reason: <>Within the principal range <Katex tex="(-\pi,\pi]" />, in radians as asked.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the ray lies on } x+y = 1 \implies y = 1-x" />,
    reason: <>From part d.i. To find where the ray cuts the circle, substitute this into the circle's Cartesian equation.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(x-1)^2+(y-2)^2&=4\\(x-1)^2+(-1-x)^2&=4\\2x^2+2&=4\\x&=\pm1\end{aligned}" />,
    reason: <>The circle <Katex tex="|z-(1+2i)|=2" /> is <Katex tex="(x-1)^2+(y-2)^2=4" />, and <Katex tex="y-2=-1-x" />.</>,
  },
  {
    working: <Katex display tex="\text{chord ends: } (1,0) \text{ and } (-1,2)" />,
    reason: <>Using <Katex tex="y=1-x" />. Both have <Katex tex="x<2" />, so they lie on the ray itself, not just on its line.</>,
    more: <>These are the points <Katex tex="1" /> and <Katex tex="-1+2i" />, where the ray crosses the circle in the part d.i. sketch.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(1,0)-(1,2)&=(0,-2)\\(-1,2)-(1,2)&=(-2,0)\end{aligned} \implies \theta=\frac{\pi}{2}" />,
    reason: <>From the centre, one radius points straight down and the other straight left, so the chord subtends a right angle at the centre. As <Katex tex="\tfrac{\pi}{2}<\pi" />, this gives the minor segment.</>,
    more: <>The report says some students used the incorrect angle. The <Katex tex="\theta" /> in the segment formula is the angle the chord subtends at the <b>centre of the circle</b>, in radians — not the ray's argument <Katex tex="\tfrac{3\pi}{4}" /> or its 45° slope.</>,
  },
  {
    working: <Katex display tex="A = \frac12 r^2\left(\theta-\sin\theta\right) = \frac12(4)\left(\frac{\pi}{2}-1\right)" />,
    reason: <>Segment = sector <Katex tex="\tfrac12r^2\theta" /> minus triangle <Katex tex="\tfrac12r^2\sin\theta" />, with <Katex tex="r=2" /> and <Katex tex="\theta=\tfrac{\pi}{2}" />.</>,
    more: <>Here it can be seen directly: the sector is a quarter of the circle, <Katex tex="\tfrac14\pi(2)^2=\pi" />, and the triangle is right-angled with both legs 2, area <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\pi-2 \ \text{ square units}}" />,
    reason: <>Exact, since no accuracy is specified.</>,
    more: <>About <Katex tex="1.14" />. As a check, it is less than the quarter-circle sector (area <Katex tex="\pi\approx3.14" />) it is cut from, and well under half the circle's area, <Katex tex="2\pi\approx6.28" />, as a minor segment must be.</>,
  },
]

export default function SpecialistQ2_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (10 marks)</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Each part is a standard complex locus read as ordinary geometry:{' '}
              <Katex tex="|z-z_1|=|z-z_2|" /> is a perpendicular bisector,{' '}
              <Katex tex="|z-z_c|=r" /> is a circle, and{' '}
              <Katex tex="\text{Arg}(z-z_0)=\theta" /> is a ray from <Katex tex="z_0" />.
              Recognising the shape first and calculating second keeps the algebra short.
            </p>
            <p>
              Two circles appear and they are different. Part b. builds one on the segment
              from <Katex tex="z_1" /> to <Katex tex="z_2" /> as a diameter (centre <Katex tex="\tfrac52+i" />, radius{' '}
              <Katex tex="\tfrac{\sqrt{13}}{2}" />); parts c. to e. use a second one, centred at{' '}
              <Katex tex="1+2i" /> with radius 2. Only the second one is drawn or cut.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Line Locus"
        marks={2}
        statement={
          <>
            Express the relation <Katex tex="|z-z_1|=|z-z_2|" /> in the form{' '}
            <Katex tex="y=mx+c" />, where <Katex tex="x,y,m,c\in R" />,
            <br />
            <Katex tex="z=x+iy" />, <Katex tex="z_1=1+2i" /> and <Katex tex="z_2=4" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Circle Locus"
        marks={2}
        statement={
          <>
            The line segment from <Katex tex="z_1=1+2i" /> to <Katex tex="z_2=4" /> is the
            diameter of a circle.
            <br />
            Find the equation of this circle in the form{' '}
            <Katex tex="|z-z_c|=r" />, where <Katex tex="z_c" /> is the centre of the circle
            and <Katex tex="r" /> is the radius.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Circle"
        marks={2}
        statement={
          <>
            A second circle is given by <Katex tex="|z-(1+2i)|=2" />.
            <br />
            Sketch this circle on the Argand diagram below, labelling the imaginary axis
            intercepts with their values.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A ray originating at the point <Katex tex="z=2-i" /> passes through the point{' '}
          <Katex tex="z=-2+3i" />, cutting the second circle into two segments.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Ray Locus"
        marks={1}
        statement={<>Sketch the ray on the Argand diagram provided in <b>part c</b>.</>}
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Ray Equation"
        marks={1}
        statement={
          <>
            Find the equation of the ray in the form{' '}
            <Katex tex="\text{Arg}(z-z_0)=\theta" /> where <Katex tex="z_0\in C" /> and{' '}
            <Katex tex="\theta" /> is measured in radians in terms of <Katex tex="\pi" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Segment Area"
        marks={2}
        statement={
          <>
            Find the area of the minor segment formed by the intersection of the ray and the
            circle.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
