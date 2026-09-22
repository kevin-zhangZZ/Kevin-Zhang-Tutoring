// 2023 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). Volume and curved
// surface area of a solid of revolution, then an invented "efficiency ratio" that forces you
// to remember the flat ends. Question text transcribed from the original paper. Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

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
      present in their integral expression in part a.i.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [13, 25, 62],
  average: 1.5,
  comment: <>This was quite well done. Of those who set up the integral correctly, most obtained the correct form.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      Incorrect rounding to <Katex tex="30.847" /> was a frequent final response. Students are
      reminded to set their calculators to display sufficient decimal places.
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
      Most students were successful in obtaining a value for <Katex tex="k" />. Omission of
      the ends of the solid, and ends with incorrect radii, were the most frequent errors.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx" />,
    reason: 'Rotation about the x-axis, straight off the formula sheet.',
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_2^5 (x-1)\,dx}" />,
    reason: <>The curve is given as <Katex tex="y^2=x-1" />, so <Katex tex="y^2" /> needs no work at all — no square roots, and no surface-area formula.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\left[\frac{(x-1)^2}{2}\right]_2^5 = \pi\left(\frac{16}{2}-\frac12\right)" />,
    reason: <><Katex tex="(5-1)^2=16" /> and <Katex tex="(2-1)^2=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{15\pi}{2} \ \text{cubic units}}" />,
    reason: <>About <Katex tex="23.56" />. Keep the <Katex tex="\pi" /> — dropping it between the integral and the answer was the report's named slip.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="S = 2\pi\int_a^b y\sqrt{1+\left(\frac{dy}{dx}\right)^2}\;dx" />,
    reason: 'The curved surface area of a solid of revolution about the x-axis.',
  },
  {
    working: <Katex display tex="y = \sqrt{x-1} \implies \frac{dy}{dx} = \frac{1}{2\sqrt{x-1}}" />,
    reason: 'Taking the positive root for the upper half, which is what generates the surface.',
  },
  {
    working: <Katex display tex="1+\left(\frac{dy}{dx}\right)^2 = 1+\frac{1}{4(x-1)} = \frac{4(x-1)+1}{4(x-1)} = \frac{4x-3}{4(x-1)}" />,
    reason: 'A common denominator makes the next cancellation visible.',
  },
  {
    working: <Katex display tex="y\sqrt{1+\left(\frac{dy}{dx}\right)^2} = \sqrt{x-1}\cdot\frac{\sqrt{4x-3}}{2\sqrt{x-1}} = \frac{\sqrt{4x-3}}{2}" />,
    reason: <>The <Katex tex="\sqrt{x-1}" /> cancels exactly — which is the whole reason the answer comes out in the given form.</>,
  },
  {
    working: <Katex display tex="\boxed{S = \pi\int_2^5\sqrt{4x-3}\;dx}" />,
    reason: <>With <Katex tex="a=2" />, <Katex tex="b=5" />, <Katex tex="A=4" />, <Katex tex="B=3" />, all positive integers as required.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\pi\int_2^5\sqrt{4x-3}\;dx = \pi\left[\frac{(4x-3)^{3/2}}{6}\right]_2^5" />,
    reason: <>Antidifferentiating: raise the index to <Katex tex="\tfrac32" />, divide by <Katex tex="\tfrac32" /> and by the inner derivative 4, giving a factor of <Katex tex="\tfrac16" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{6}\left(17^{3/2}-5^{3/2}\right) = \frac{\pi}{6}(70.0928-11.1803)" />,
    reason: <><Katex tex="4(5)-3=17" /> and <Katex tex="4(2)-3=5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{S \approx 30.846 \ \text{square units}}" />,
    reason: <>The unrounded value is <Katex tex="30.84649\ldots" />, so the third decimal is a 6 — the report notes many students wrote <Katex tex="30.847" /> from a truncated display.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{efficiency ratio} = \frac{\text{total surface area}}{\text{volume}}" />,
    reason: 'The definition the question supplies.',
  },
  {
    working: <Katex display tex="x=2: \ y = \sqrt{1} = 1; \qquad x=5: \ y = \sqrt{4} = 2" />,
    reason: <>The radii of the two flat ends. These are <Katex tex="y" /> values, not <Katex tex="x" /> values — the report's "incorrect radius" error.</>,
  },
  {
    working: <Katex display tex="\text{ends} = \pi(1)^2+\pi(2)^2 = 5\pi \approx 15.708" />,
    reason: 'Two circular discs.',
  },
  {
    working: <Katex display tex="\text{total SA} = 30.846+15.708 = 46.554" />,
    reason: 'Curved surface plus both ends — omitting them was the single most common loss of marks.',
  },
  {
    working: <Katex display tex="\boxed{\frac{46.554}{15\pi/2} = \frac{46.554}{23.562} \approx 1.98}" />,
    reason: 'Two decimal places.',
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\pi\int_2^k(x-1)\,dx = 24\pi \implies \frac{(k-1)^2}{2}-\frac12 = 24" />,
    reason: <>Same integral as part a., new upper terminal. The <Katex tex="\pi" /> cancels.</>,
  },
  {
    working: <Katex display tex="(k-1)^2 = 49 \implies k-1 = \pm7 \implies k = 8 \ \text{ (rejecting } k=-6)" />,
    reason: <>The solid runs from <Katex tex="x=2" />, so <Katex tex="k>2" />.</>,
  },
  {
    working: (
      <Cas fn="nInt">
        π·nInt(√(4x−3), x, 2, 8)
      </Cas>
    ),
    reason: 'The curved surface area over the longer interval, from part b.i.',
  },
  {
    working: <Katex display tex="S = \frac{\pi}{6}\left(29^{3/2}-5^{3/2}\right) \approx 75.916" />,
    reason: <><Katex tex="4(8)-3=29" />.</>,
  },
  {
    working: <Katex display tex="\text{ends} = \pi(1)^2+\pi\left(\sqrt7\right)^2 = 8\pi \approx 25.133" />,
    reason: <>At <Katex tex="x=8" /> the radius is <Katex tex="\sqrt{8-1}=\sqrt7" />, so that disc has area <Katex tex="7\pi" /> — squaring the radius undoes the square root.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{75.916+25.133}{24\pi} = \frac{101.049}{75.398} \approx 1.34}" />,
    reason: <>Lower than the <Katex tex="1.98" /> of part c., as it should be: a bigger solid has less surface per unit of volume.</>,
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
            two flat discs at <Katex tex="x=2" /> and at the far end. Their radii are the{' '}
            <Katex tex="y" /> values there, so squaring them undoes the square root: the disc
            at <Katex tex="x=k" /> has area <Katex tex="\pi(k-1)" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a.i"
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
        marks={1}
        statement={<>Find the volume of the solid of revolution.</>}
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b.i"
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
          areas of the two circular discs at each end. The "efficiency ratio" of a body is
          defined as its total surface area divided by the enclosed volume.
        </p>
      </div>

      <PartCard
        letter="c"
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
      </PartCard>

      <PartCard
        letter="d"
        marks={3}
        statement={
          <>
            Another solid of revolution is formed by rotating the curve given by{' '}
            <Katex tex="y^2=x-1" /> about the <Katex tex="x" />-axis for{' '}
            <Katex tex="2\le x\le k" />, where <Katex tex="k\in\mathbb{R}" />. This solid has
            a volume of <Katex tex="24\pi" />. Find the efficiency ratio for this solid,
            giving your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
