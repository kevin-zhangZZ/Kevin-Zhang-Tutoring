// 2023 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). Volume and curved
// surface area of a solid of revolution, then an invented "efficiency ratio" that forces you
// to remember the flat ends. Question text transcribed from the original paper. Answers
// checked with sympy and against the VCAA examination report. Solution is original.
// Interactives: part c. spec-2023e2-q3c-end-discs (the solid is open at both ends, so the total
// surface needs two discs: switch them off to see the curved-surface-only ratio); part d.
// spec-2023e2-q3d-end-radius (drag k: the end disc of radius √(k − 1) always fits the solid,
// while a radius of k − 1 overshoots it).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const EndDiscsWidget = lazyWidget(() => import('../interactives/spec-2023e2-q3c-end-discs'))
const EndRadiusWidget = lazyWidget(() => import('../interactives/spec-2023e2-q3d-end-radius'))

const EXAM_AI: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>Some students incorrectly applied a formula for surface area.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      Some students did not include <Katex tex="\pi" /> in their answer, despite it being
      present in their integral expression in Question 3ai.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [13, 25, 62],
  average: 1.5,
  comment: (
    <>
      This was quite well done. Of those students who set up the integral correctly, most
      obtained the correct form.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      Incorrect rounding to 30.847 was a frequent final response. Students are reminded to set
      their calculators to display sufficient decimal places.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [38, 24, 38],
  average: 1.0,
  comment: (
    <>
      Many students found the curved surface area only and did not include one or both ends.
      Of those who included two ends, errors with an incorrect radius were frequent.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [27, 27, 23, 24],
  average: 1.5,
  comment: (
    <>
      Most students were successful in obtaining a value for <Katex tex="k" />. Omission of the
      ends of the solid, and ends with incorrect radii, were the most frequent errors. Some
      errors in the final value appeared to be due to a lack of brackets when entering
      expressions into a calculator.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx" />,
    reason: <>The volume formula for rotation about the <Katex tex="x" />-axis. It is not on the formula sheet, so know where it comes from: each thin slice of the solid is a disc of radius <Katex tex="y" />, with area <Katex tex="\pi y^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_2^5 (x-1)\,dx}" />,
    reason: <>The curve is given as <Katex tex="y^2=x-1" />, so substitute it straight in: no square root is needed. The terminals are the given <Katex tex="x" /> values 2 and 5. This is a volume, so it uses <Katex tex="\pi y^2" />, not the surface-area formula. The report notes some students incorrectly applied a formula for surface area.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\left[\frac{(x-1)^2}{2}\right]_2^5 = \pi\left(\frac{16}{2}-\frac12\right)" />,
    reason: <>An antiderivative of <Katex tex="x-1" /> is <Katex tex="\tfrac{(x-1)^2}{2}" /> (or <Katex tex="\tfrac{x^2}{2}-x" />, which gives the same result). Then <Katex tex="(5-1)^2=16" /> and <Katex tex="(2-1)^2=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{15\pi}{2} \ \text{cubic units}}" />,
    reason: <>About <Katex tex="23.56" />. Keep the <Katex tex="\pi" /> — the report notes some students did not include it, despite it being in their integral.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="S = 2\pi\int_a^b y\sqrt{1+\left(\frac{dy}{dx}\right)^2}\;dx" />,
    reason: <>The curved surface area for rotation about the <Katex tex="x" />-axis, from the formula sheet. Unlike the volume, it needs <Katex tex="y" /> itself and <Katex tex="\tfrac{dy}{dx}" />, so first write <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="y = \sqrt{x-1} \implies \frac{dy}{dx} = \frac{1}{2\sqrt{x-1}}" />,
    reason: <>In the formula <Katex tex="y" /> is the radius of each thin band of the surface, so take the positive root (the upper half of the curve). The lower half, <Katex tex="y=-\sqrt{x-1}" />, sweeps out the same surface.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}1+\left(\frac{dy}{dx}\right)^2 &= 1+\frac{1}{4(x-1)} \\ &= \frac{4(x-1)+1}{4(x-1)} = \frac{4x-3}{4(x-1)}\end{aligned}" />,
    reason: <>Squaring <Katex tex="\tfrac{1}{2\sqrt{x-1}}" /> gives <Katex tex="\tfrac{1}{4(x-1)}" />. A common denominator turns the sum into one fraction, so its square root splits cleanly in the next line.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}y\sqrt{1+\left(\frac{dy}{dx}\right)^2} &= \sqrt{x-1}\cdot\frac{\sqrt{4x-3}}{2\sqrt{x-1}} \\ &= \frac{\sqrt{4x-3}}{2}\end{aligned}" />,
    reason: <>The square root of a fraction is the root of the top over the root of the bottom, and <Katex tex="\sqrt{4(x-1)}=2\sqrt{x-1}" />. The <Katex tex="\sqrt{x-1}" /> then cancels (it is not zero, since <Katex tex="x\ge2" />). This cancellation is why the answer comes out in the given form.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}S &= 2\pi\int_2^5\frac{\sqrt{4x-3}}{2}\;dx \\ &\boxed{S = \pi\int_2^5\sqrt{4x-3}\;dx}\end{aligned}" />,
    reason: <>The <Katex tex="2\pi" /> times the <Katex tex="\tfrac12" /> leaves <Katex tex="\pi" />. So <Katex tex="a=2" />, <Katex tex="b=5" />, <Katex tex="A=4" />, <Katex tex="B=3" />, all positive integers as required.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\pi\int_2^5\sqrt{4x-3}\;dx = \pi\left[\frac{(4x-3)^{3/2}}{6}\right]_2^5" />,
    reason: <>Antidifferentiating <Katex tex="(4x-3)^{1/2}" />: raise the index to <Katex tex="\tfrac32" />, then divide by <Katex tex="\tfrac32" /> and by the inner derivative 4, a factor of <Katex tex="\tfrac23\times\tfrac14=\tfrac16" />. (On CAS, <Katex tex="\pi" /> times the integral gives the same value.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= \frac{\pi}{6}\left(17^{3/2}-5^{3/2}\right) \\ &= \frac{\pi}{6}(70.0928-11.1803)\end{aligned}" />,
    reason: <><Katex tex="4(5)-3=17" /> and <Katex tex="4(2)-3=5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{S \approx 30.846 \ \text{square units}}" />,
    reason: <>The unrounded value is <Katex tex="30.84649\ldots" />. The fourth decimal place is 4, so it rounds down to <Katex tex="30.846" />. A calculator showing only six significant figures displays <Katex tex="30.8465" />, and rounding that again gives the wrong <Katex tex="30.847" />. The report notes incorrect rounding to <Katex tex="30.847" /> was a frequent final response.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{efficiency ratio} = \frac{\text{total surface area}}{\text{volume}}" />,
    reason: <>The definition the question supplies.</>,
  },
  {
    working: <Katex display tex="x=2: \ y = \sqrt{1} = 1; \qquad x=5: \ y = \sqrt{4} = 2" />,
    reason: <>The radii of the two flat ends. The radius of an end is the curve&apos;s height <Katex tex="y" /> there (its distance from the axis), not the <Katex tex="x" /> value and not <Katex tex="y^2" />. The report notes errors with an incorrect radius were frequent. Since <Katex tex="y=1" /> at <Katex tex="x=2" />, the left end is a disc too, not a point: the curve only reaches the axis at <Katex tex="x=1" />, outside the interval.</>,
  },
  {
    working: <Katex display tex="\text{ends} = \pi(1)^2+\pi(2)^2 = 5\pi \approx 15.708" />,
    reason: <>Each end is a circle, with area <Katex tex="\pi r^2" />.</>,
  },
  {
    working: <Katex display tex="\text{total SA} = 30.846+15.708 = 46.554" />,
    reason: <>Curved surface (part b.ii) plus both ends. The report notes many students found the curved surface area only and did not include one or both ends.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{46.554}{15\pi/2} = \frac{46.554}{23.562} \approx 1.98}" />,
    reason: <>Divide by the volume from part a.ii, <Katex tex="V=\tfrac{15\pi}{2}" />, and round to two decimal places as asked.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\pi\int_2^k(x-1)\,dx &= 24\pi \\ \frac{(k-1)^2}{2}-\frac12 &= 24\end{aligned}" />,
    reason: <>Same integral as part a.i, with upper terminal <Katex tex="k" /> instead of 5. Use the antiderivative <Katex tex="\tfrac{(x-1)^2}{2}" /> from part a.ii, then divide both sides by <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(k-1)^2 &= 49 \implies k-1 = \pm7 \\ k &= 8 \ \text{ (rejecting } k=-6)\end{aligned}" />,
    reason: <>Multiply by 2 and add 1. The solid runs from <Katex tex="x=2" /> to <Katex tex="x=k" />, so <Katex tex="k>2" />. (Solving on CAS gives the same two values.)</>,
  },
  {
    working: (
      <Cas fn="nInt">
        π·nInt(√(4x−3), x, 2, 8)
      </Cas>
    ),
    reason: <>The curved surface area integral from part b.i, with upper terminal 8 instead of 5.</>,
  },
  {
    working: <Katex display tex="S = \frac{\pi}{6}\left(29^{3/2}-5^{3/2}\right) \approx 75.916" />,
    reason: <><Katex tex="4(8)-3=29" />.</>,
  },
  {
    working: <Katex display tex="\text{ends} = \pi(1)^2+\pi\left(\sqrt7\right)^2 = 8\pi \approx 25.133" />,
    reason: <>The left end is still the disc of radius 1 from part c. At <Katex tex="x=8" /> the radius is the curve&apos;s height <Katex tex="y=\sqrt{8-1}=\sqrt7" /> (not 7 or 8), so that disc has area <Katex tex="\pi(\sqrt7)^2=7\pi" />: squaring the radius undoes the square root. The report notes omitting the ends, and ends with incorrect radii, were the most frequent errors.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{75.916+25.133}{24\pi} = \frac{101.049}{75.398} \approx 1.34}" />,
    reason: <>Total surface area divided by the volume <Katex tex="24\pi" />. On a calculator, put brackets around the whole numerator: <Katex tex="(75.916+8\pi)\div(24\pi)" />. Without them only <Katex tex="8\pi" /> is divided, giving about 76.25; the report notes some errors appeared to be due to a lack of brackets. The ratio is lower than the <Katex tex="1.98" /> of part c., a sensible check: this solid is bigger, and bigger solids have less surface per unit of volume.</>,
  },
]

export default function SpecialistQ3_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          The curve given by <Katex tex="y^2=x-1" />, where <Katex tex="2\le x\le5" />, is
          rotated about the <Katex tex="x" />-axis to form a solid of revolution.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Giving the curve as <Katex tex="y^2=x-1" /> is a kindness for the volume — the
              integrand is handed to you — and a trap for the surface area, where you do need{' '}
              <Katex tex="y" /> and <Katex tex="\tfrac{dy}{dx}" /> separately. The{' '}
              <Katex tex="\sqrt{x-1}" /> then cancels, which is why the answer is so clean.
            </p>
            <p>
              "Total surface area" in parts c. and d. means the curved surface <em>plus</em> the
              two flat discs at <Katex tex="x=2" /> and at the far end. The curve only meets the
              axis at <Katex tex="x=1" />, so neither end closes to a point. The discs&apos; radii
              are the <Katex tex="y" /> values there, so squaring them undoes the square root: the
              disc at <Katex tex="x=k" /> has area <Katex tex="\pi(k-1)" />.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a.i"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            Write down the definite integral, in terms of <Katex tex="x" />, for the volume of
            this solid of revolution.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={<>Find the volume of the solid of revolution.</>}
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Surface Area"
        marks={2}
        statement={
          <>
            Express the curved surface area of the solid in the form{' '}
            <Katex tex="\pi\displaystyle\int_a^b\sqrt{Ax-B}\;dx" />, where{' '}
            <Katex tex="a,b,A,B" /> are all positive integers.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Surface Area"
        marks={1}
        statement={
          <>
            Hence or otherwise, find the curved surface area of the solid correct to three
            decimal places.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The total surface area of the solid consists of the curved surface area plus the
          areas of the two circular discs at each end.
          <br />
          The 'efficiency ratio' of a body is defined as its total surface area divided by the
          enclosed volume.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Efficiency Ratio"
        marks={2}
        statement={
          <>
            Find the efficiency ratio of the solid of revolution correct to two decimal
            places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="The solid is open at both ends: its total surface needs two flat discs">
          <EndDiscsWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="d"
        topic="Volume of Revolution"
        marks={3}
        statement={
          <>
            Another solid of revolution is formed by rotating the curve given by{' '}
            <Katex tex="y^2=x-1" /> about the <Katex tex="x" />-axis for{' '}
            <Katex tex="2\le x\le k" />, where <Katex tex="k\in R" />. This solid has
            a volume of <Katex tex="24\pi" />.
            <br />
            Find the efficiency ratio for this solid, giving your answer correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title={'The end disc must fit the solid: radius √(k − 1), so area π(k − 1)'}>
          <EndRadiusWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
