// 2020 Mathematical Methods — Exam 2, Section B Question 2 (11 marks). A river between two
// cosine banks: distances north, east and minimum, two areas, and a dilation constraint.
// Question text transcribed from the original paper; the figure is a crop of VCAA's own
// artwork. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import riverSrc from './meth-2020e2-q2-river.png'

const EXAM_A: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>Some students used the distance formula, which was not an efficient approach.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [21, 27, 52],
  average: 1.3,
  comment: (
    <>
      Some students subtracted 30 instead of 50, giving <Katex tex="\tfrac{110}{3}" />. Others
      did not subtract at all, leaving <Katex tex="x=\tfrac{200}{3}" />. Exact answers were
      required; <Katex tex="16.7" /> was often seen.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [56, 11, 33],
  average: 0.8,
  comment: (
    <>
      Some found the <Katex tex="x" /> value but not the minimum distance. The distance
      formula was often set up correctly, but the incorrect <Katex tex="x" /> value was
      given.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
}

const EXAM_E: SAExaminerStats = {
  marks: [52, 19, 4, 26],
  average: 1,
  comment: (
    <>
      There were various approaches to this question. Appropriate working needed to be
      shown. Some students incorrectly used triangles.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [78, 15, 7],
  average: 0.3,
  comment: (
    <>
      Some students were able to set up an appropriate inequality. Some did not substitute
      either <Katex tex="x=0" /> or <Katex tex="x=200" />. A common incorrect approach was
      solving <Katex tex="kf_1(50)-f_2(50)\le20" />, giving <Katex tex="k\le\tfrac54" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f_1(x)-f_2(x) = 10 \text{ for every } x" />,
    reason: <>The two banks differ only in their constant term, so the river is exactly 10 m wide measured vertically, everywhere.</>,
  },
  {
    working: <Katex display tex="P(50,30) \text{ is on } f_2 \text{: } f_2(50) = 20\cos\!\left(\tfrac\pi2\right)+30 = 30 \ \checkmark" />,
    reason: <>The swimmer starts on the south bank.</>,
  },
  {
    working: <Katex display tex="\boxed{10\ \text{m}}" />,
    reason: <>Swimming north means moving straight up, so the distance is just <Katex tex="f_1(50)-30=40-30" />. No distance formula needed.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{swimming east from } P \implies y \text{ stays at } 30" />,
    reason: <>So find where the north bank is at height 30.</>,
  },
  {
    working: <Katex display tex="20\cos\!\left(\tfrac{\pi x}{100}\right)+40 = 30 \implies \cos\!\left(\tfrac{\pi x}{100}\right) = -\tfrac12" />,
    reason: <>Solving <Katex tex="f_1(x)=30" />.</>,
  },
  {
    working: <Cas fn="solve">solve(20cos(πx/100) + 40 = 30, x) | 50 ≤ x ≤ 100</Cas>,
    reason: <>Restricting to the east of <Katex tex="P" /> and before the bank turns back.</>,
  },
  {
    working: <Katex display tex="\tfrac{\pi x}{100} = \tfrac{2\pi}{3} \implies x = \tfrac{200}{3}" />,
    reason: <>The <Katex tex="x" />-coordinate of the landing point — not yet the distance.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{200}{3}-50 = \tfrac{50}{3}\ \text{m}}" />,
    reason: <>Subtract the starting <Katex tex="x" />-coordinate. Exact, as required: <Katex tex="16\tfrac23" /> m.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="d(x) = \sqrt{(x-50)^2+\bigl(f_1(x)-30\bigr)^2}" />,
    reason: <>The distance from <Katex tex="P(50,30)" /> to a general point <Katex tex="\bigl(x,f_1(x)\bigr)" /> on the north bank.</>,
  },
  {
    working: <Cas fn="fMin">fMin(√((x-50)² + (20cos(πx/100)+10)²), x) | 50 ≤ x ≤ 100</Cas>,
    reason: <>Minimising numerically. Minimising <Katex tex="d^2" /> instead gives the same <Katex tex="x" /> and avoids the square root.</>,
  },
  {
    working: <Katex display tex="x = 54.4769\ldots" />,
    reason: <>Just east of <Katex tex="P" /> — the shortest crossing leans slightly downstream because the bank is falling there.</>,
  },
  {
    working: <Katex display tex="d = 8.4752\ldots" />,
    reason: <>Substituting back. Note it is shorter than the 10 m due north, as it must be.</>,
  },
  {
    working: <Katex display tex="\boxed{8.5\ \text{m}}" />,
    reason: <>To one decimal place. The question asks for the distance, not the <Katex tex="x" /> value.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{area} = \int_0^{200}\bigl(f_1(x)-f_2(x)\bigr)dx" />,
    reason: <>Upper bank minus lower bank, across the whole width shown.</>,
  },
  {
    working: <Katex display tex="f_1(x)-f_2(x) = 10" />,
    reason: <>Constant, from part a. — so no integration is really needed.</>,
  },
  {
    working: <Katex display tex="\boxed{10\times200 = 2000\ \text{m}^2}" />,
    reason: <>A rectangle 200 m long and 10 m wide, bent into a wave — bending does not change the area.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the line } y = 30 \text{ cuts the banks where } f_1 = 30 \text{ and } f_2 = 30" />,
    reason: <>The "no swimming" zone is the part of the river below <Katex tex="y=30" />.</>,
  },
  {
    working: <Katex display tex="f_2(x) = 30 \implies x = 50 \text{ or } x = 150" />,
    reason: <><Katex tex="\cos\!\left(\tfrac{\pi x}{100}\right)=0" />; <Katex tex="P" /> itself is the first of these.</>,
  },
  {
    working: <Katex display tex="f_1(x) = 30 \implies x = \tfrac{200}{3} \text{ or } x = \tfrac{400}{3}" />,
    reason: <>From part b., plus its mirror image about <Katex tex="x=100" />.</>,
  },
  {
    working: <Katex display tex="A = 2\left[\int_{50}^{200/3}\bigl(30-f_2(x)\bigr)dx+\int_{200/3}^{100}\bigl(f_1(x)-f_2(x)\bigr)dx\right]" />,
    reason: <>Between <Katex tex="x=50" /> and <Katex tex="\tfrac{200}3" /> the zone is capped above by the line; beyond that the north bank has dropped below the line and caps it instead. The whole picture is symmetric about <Katex tex="x=100" />, so double one half.</>,
  },
  {
    working: <Cas fn="nInt">2(∫(30 - f₂(x), x, 50, 200/3) + ∫(f₁(x) - f₂(x), x, 200/3, 100))</Cas>,
    reason: <>Evaluating.</>,
  },
  {
    working: <Katex display tex="\boxed{837\ \text{m}^2}" />,
    reason: <>To the nearest square metre. A check: it is well under half of the river's 2000 m², which the picture agrees with.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{new width} = kf_1(x)-f_2(x)" />,
    reason: <>The north bank is dilated by <Katex tex="k" /> from the <Katex tex="x" />-axis; the south bank does not move.</>,
  },
  {
    working: <Katex display tex="= 20k\cos\!\left(\tfrac{\pi x}{100}\right)+40k-20\cos\!\left(\tfrac{\pi x}{100}\right)-30" />,
    reason: <>Expanding — noting the <Katex tex="-30" />, not <Katex tex="+30" />, which the report flags.</>,
  },
  {
    working: <Katex display tex="= 20(k-1)\cos\!\left(\tfrac{\pi x}{100}\right)+40k-30" />,
    reason: <>Since <Katex tex="k>1" />, the coefficient <Katex tex="20(k-1)" /> is positive, so the width is largest where the cosine is largest.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\tfrac{\pi x}{100}\right) = 1 \text{ at } x = 0 \text{ and } x = 200" />,
    reason: <>The ends of the stretch shown. "For all parts of the river" means the <em>maximum</em> width must be under 20 — testing <Katex tex="x=50" /> instead is the report's common error.</>,
  },
  {
    working: <Katex display tex="20(k-1)+40k-30 < 20 \implies 60k-50 < 20" />,
    reason: <>Substituting <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k \in \left(1,\tfrac76\right)}" />,
    reason: <><Katex tex="60k<70" /> gives <Katex tex="k<\tfrac76" />, combined with the given <Katex tex="k>1" />. Strictly less than 20, so the endpoint is excluded.</>,
  },
]

export default function MethodsQ2_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (11 marks)</p>
        <p>
          An area of parkland has a river running through it, as shown below. The north bank
          is modelled by{' '}
          <Katex tex="f_1:[0,200]\to R,\ f_1(x)=20\cos\!\left(\tfrac{\pi x}{100}\right)+40" />{' '}
          and the south bank by{' '}
          <Katex tex="f_2:[0,200]\to R,\ f_2(x)=20\cos\!\left(\tfrac{\pi x}{100}\right)+30" />
          . The horizontal axis points east and the vertical axis points north. All distances
          are measured in metres.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={riverSrc}
            alt="A shaded band of constant vertical width between two identical cosine curves running from x = 0 to x = 200, with the point P marked at (50, 30) on the lower curve — from the original 2020 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
        <p>
          A swimmer always starts at point <Katex tex="P" />, which has coordinates{' '}
          <Katex tex="(50,30)" />. Assume that no movement of water in the river affects the
          motion or path of the swimmer, which is always a straight line.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            The swimmer swims north from point <Katex tex="P" />. Find the distance, in
            metres, that the swimmer needs to swim to get to the north bank of the river.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            The swimmer swims east from point <Katex tex="P" />. Find the distance, in metres,
            that the swimmer needs to swim to get to the north bank of the river.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            On another occasion, the swimmer swims the minimum distance from point{' '}
            <Katex tex="P" /> to the north bank of the river. Find this minimum distance. Give
            your answer in metres, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            Calculate the surface area of the section of the river shown on the graph, in
            square metres.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={3}
        statement={
          <>
            A horizontal line is drawn through point <Katex tex="P" />. The section of the
            river that is south of the line is declared a "no swimming" zone. Find the area of
            the "no swimming" zone, correct to the nearest square metre.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={
          <>
            Scientists observe that the north bank of the river is moving further north from
            its current position. They model its predicted new location using the function
            with rule <Katex tex="y=kf_1(x)" />, where <Katex tex="k\ge1" />. Find the values
            of <Katex tex="k" /> for which the distance north across the river, for all parts
            of the river, is strictly less than 20 m.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
