// 2014 Specialist Mathematics — Exam 2, Section 2 Question 2 (13 marks). Polar form and the
// roots of z^3 = -24*sqrt(3), then a conjugate product that turns out to be a circle, and a
// tangent to it. Question text transcribed from the original paper; the Argand axes VCAA
// supplied for part b(iii) were blank, so the sketch is this site's own matplotlib figure.
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import circleSrc from './spec-2014e2-q2b-circle.png'

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
      Many students did not express their answer as an angle in the interval{' '}
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
      Most students could find the conjugate root, but a number could not obtain{' '}
      <Katex tex="-2\sqrt3" />, often omitting the negative sign. A number of students gave
      factors instead of the roots.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>The majority of students answered quite well. A number obtained incorrect answers involving <Katex tex="i" />.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [20, 24, 57],
  average: 1.4,
  comment: (
    <>
      Most students could express the relation in terms of <Katex tex="x" /> and{' '}
      <Katex tex="y" />, but a large number could not follow through with enough mathematical
      detail to show the given result. Some students substituted the incorrect forms{' '}
      <Katex tex="z=x-y" /> and <Katex tex="\bar z=x+y" />.
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
      equation of the circle implicitly, but ended up with too many variables.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="|z_1| = \sqrt{\left(\sqrt3\right)^2+(-3)^2} = \sqrt{12} = 2\sqrt3" />,
    reason: <>The modulus.</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = \frac{-3}{\sqrt3} = -\sqrt3" />,
    reason: <>Fourth quadrant: the real part is positive and the imaginary part negative.</>,
  },
  {
    working: <Katex display tex="\boxed{z_1 = 2\sqrt3\,\mathrm{cis}\!\left(-\tfrac\pi3\right)}" />,
    reason: <>Not <Katex tex="+\tfrac\pi3" /> — the point lies below the real axis. (<Katex tex="\tfrac{5\pi}3" /> is the same angle and was also accepted.)</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Arg}\!\left(z_1^4\right) = 4\times\left(-\tfrac\pi3\right) = -\tfrac{4\pi}{3}" />,
    reason: <>De Moivre multiplies the argument by the power.</>,
  },
  {
    working: <Katex display tex="-\tfrac{4\pi}{3} \notin (-\pi,\pi]" />,
    reason: <>So it is not yet the <em>principal</em> argument — the step the report says a third of students missed.</>,
  },
  {
    working: <Katex display tex="\boxed{-\tfrac{4\pi}{3}+2\pi = \tfrac{2\pi}{3}}" />,
    reason: <>Adding a full turn. The question asks only for the argument, not for <Katex tex="z_1^4" /> itself.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="z^3 = -24\sqrt3 = 24\sqrt3\,\mathrm{cis}(\pi)" />,
    reason: <>A negative real number sits on the negative real axis, argument <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\left|z\right| = \sqrt[3]{24\sqrt3} = 2\sqrt3" />,
    reason: <>Matching <Katex tex="|z_1|" /> from part a(i), as it must — all three roots lie on the same circle.</>,
  },
  {
    working: <Katex display tex="\text{the three roots are spaced } \tfrac{2\pi}{3} \text{ apart}" />,
    reason: <>So from <Katex tex="-\tfrac\pi3" /> the others are at <Katex tex="-\tfrac\pi3+\tfrac{2\pi}3=\tfrac\pi3" /> and <Katex tex="\tfrac\pi3+\tfrac{2\pi}3=\pi" />.</>,
  },
  {
    working: <Katex display tex="2\sqrt3\,\mathrm{cis}\!\left(\tfrac\pi3\right) = 2\sqrt3\left(\tfrac12+\tfrac{\sqrt3}2 i\right) = \sqrt3+3i" />,
    reason: <>The conjugate of <Katex tex="z_1" />, as expected for a real cubic.</>,
  },
  {
    working: <Katex display tex="2\sqrt3\,\mathrm{cis}(\pi) = -2\sqrt3" />,
    reason: <>The real root. Dropping its minus sign was the report's common error.</>,
  },
  {
    working: <Katex display tex="\boxed{z = \sqrt3+3i \quad\text{and}\quad z = -2\sqrt3}" />,
    reason: <>Check: the three roots sum to <Katex tex="\left(\sqrt3-3i\right)+\left(\sqrt3+3i\right)-2\sqrt3=0" />, as they must for a cubic with no <Katex tex="z^2" /> term ✓.</>,
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
    reason: <>Real, as a product of conjugates always is — answers containing <Katex tex="i" /> must be wrong.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="z = x+iy \implies \bar z = x-iy" />,
    reason: <>The standard substitution. <Katex tex="z=x-y" /> is not a thing — the report notes students writing that.</>,
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
    reason: <>Since <Katex tex="-i^2=+1" />. This is the line of detail the report says was usually missing.</>,
  },
  {
    working: <Katex display tex="\therefore\ (z+2i)\left(\bar z-2i\right) = 4 \iff x^2+(y+2)^2 = 4 \ \checkmark" />,
    reason: <>As required.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+(y+2)^2 = 4" />,
    reason: <>From part b(ii) — a circle in disguise.</>,
  },
  {
    working: <Katex display tex="\text{centre } (0,-2), \qquad \text{radius } 2" />,
    reason: <>Reading off the standard form. Note the circle passes through the origin, since the radius equals the distance from the centre to <Katex tex="(0,0)" />.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={circleSrc}
          alt="A circle of radius 2 centred at (0, −2) on an Argand diagram, passing through the origin and through (0, −4), (2, −2) and (−2, −2)"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>Four easy points to place accurately: <Katex tex="(0,0)" />, <Katex tex="(0,-4)" />, <Katex tex="(\pm2,-2)" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A = (k,-2), \qquad B = (0,-(2+k))" />,
    reason: <>The two given complex numbers as points. With <Katex tex="k<0" />, <Katex tex="A" /> sits left of the centre and <Katex tex="B" /> above it, each by <Katex tex="|k|" />.</>,
  },
  {
    working: <Katex display tex="m_{AB} = \frac{-(2+k)-(-2)}{0-k} = \frac{-k}{-k} = 1" />,
    reason: <>The gradient is 1 whatever <Katex tex="k" /> is — the observation the report says students needed.</>,
  },
  {
    working: <Katex display tex="y = x-(2+k) \implies x-y-(2+k) = 0" />,
    reason: <>Through <Katex tex="B(0,-(2+k))" /> with gradient 1.</>,
  },
  {
    working: <Katex display tex="d = \frac{\left|0-(-2)-(2+k)\right|}{\sqrt{1^2+(-1)^2}} = \frac{|-k|}{\sqrt2}" />,
    reason: <>Distance from the centre <Katex tex="(0,-2)" /> to the line.</>,
  },
  {
    working: <Katex display tex="\text{tangent} \iff d = 2 \implies \frac{|k|}{\sqrt2} = 2" />,
    reason: <>A line touches a circle exactly when its distance from the centre equals the radius.</>,
  },
  {
    working: <Katex display tex="|k| = 2\sqrt2" />,
    reason: <>Multiplying through.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -2\sqrt2}" />,
    reason: <>Negative, as the question specifies.</>,
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

      <PartCard letter="a.i" marks={2} statement={<>Express <Katex tex="z_1" /> in polar form.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard letter="a.ii" marks={1} statement={<>Find <Katex tex="\mathrm{Arg}\!\left(z_1^4\right)" />.</>} examinerReport={EXAM_AII}>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
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
      </PartCard>
    </div>
  )
}
