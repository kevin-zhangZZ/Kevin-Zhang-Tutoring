// 2014 Mathematical Methods (CAS) — Exam 1, Question 3 (2 marks). Solving 2cos(2x) = -sqrt3
// on a restricted domain. Question text transcribed from the original paper (no diagram
// given). Answers checked with sympy and against the VCAA examination report. Solution is
// original. This question has no lettered parts, so it uses the plain card layout rather
// than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [19, 27, 55],
  average: 1.4,
  comment: (
    <>
      Many students were unsure of exact values and did not ascertain the correct basic angle
      of <Katex tex="\tfrac\pi6" /> or produced solutions beyond the specified domain.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(2x) = -\frac{\sqrt3}{2}" />,
    reason: <>Divide by 2 first so the equation is in the standard <Katex tex="\cos(\square)=k" /> form.</>,
  },
  {
    working: <Katex display tex="0\le x\le\pi \implies 0\le 2x\le 2\pi" />,
    reason: <>The unknown inside the cosine is <Katex tex="2x" />, so double the domain: we need every <Katex tex="2x" /> in <Katex tex="[0,2\pi]" />, one full revolution.</>,
    more: <>Skipping this step is how solutions go missing or out of range. Solving only for <Katex tex="2x" /> in <Katex tex="[0,\pi]" /> finds just <Katex tex="\tfrac{5\pi}6" /> and loses <Katex tex="x=\tfrac{7\pi}{12}" />; listing <Katex tex="2x" /> values past <Katex tex="2\pi" /> gives <Katex tex="x" />-values outside <Katex tex="0\le x\le\pi" />. The report notes students who <em>produced solutions beyond the specified domain</em>.</>,
  },
  {
    working: <Katex display tex="\text{basic angle} = \tfrac\pi6 \quad\text{since } \cos\!\left(\tfrac\pi6\right) = \tfrac{\sqrt3}2" />,
    reason: <>Ignore the minus sign to find the basic (first-quadrant) angle: the exact value with cosine <Katex tex="\tfrac{\sqrt3}2" /> is <Katex tex="\tfrac\pi6" />.</>,
    more: <>The report says many students were unsure of exact values here. A common slip is <Katex tex="\tfrac\pi3" />, but <Katex tex="\cos\tfrac\pi3=\tfrac12" /> and <Katex tex="\sin\tfrac\pi3=\tfrac{\sqrt3}2" />. Another is taking <Katex tex="-\tfrac\pi6" />: the basic angle is always positive and acute, and the minus sign is handled by choosing quadrants in the next row.</>,
  },
  {
    working: <Katex display tex="\cos(2x) < 0 \implies 2x \text{ in quadrant 2 or 3}" />,
    reason: <>Cosine is the horizontal coordinate on the unit circle, negative on the left half, where the two angles sit <Katex tex="\tfrac\pi6" /> either side of <Katex tex="\pi" />. So <Katex tex="2x = \pi-\tfrac\pi6" /> or <Katex tex="2x = \pi+\tfrac\pi6" />.</>,
    more: <>The report's general comments name a unit circle as an invaluable aid for this question. Draw the vertical line through <Katex tex="-\tfrac{\sqrt3}2" /> on the horizontal axis: it cuts the circle at two points, one in quadrant 2 (angle <Katex tex="\pi-\tfrac\pi6" />) and one in quadrant 3 (angle <Katex tex="\pi+\tfrac\pi6" />), mirror images in the horizontal axis.</>,
  },
  {
    working: <Katex display tex="2x = \tfrac{5\pi}6,\ \tfrac{7\pi}6" />,
    reason: <>Both lie inside <Katex tex="[0,2\pi]" />. Adding or subtracting <Katex tex="2\pi" /> leaves that interval (e.g. <Katex tex="\tfrac{17\pi}6" />), so these are the only two.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac{5\pi}{12},\ \tfrac{7\pi}{12}}" />,
    reason: <>Halve each value of <Katex tex="2x" />. Both are in <Katex tex="[0,\pi]" /> ✓.</>,
    more: <>Check: <Katex tex="2\cos\tfrac{5\pi}6=2\left(-\tfrac{\sqrt3}2\right)=-\sqrt3" /> ✓ and <Katex tex="2\cos\tfrac{7\pi}6=-\sqrt3" /> ✓.</>,
  },
]

export default function MethodsQ3_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (2 marks)" always>
        <p>
          Solve <Katex tex="2\cos(2x)=-\sqrt3" /> for <Katex tex="x" />, where{' '}
          <Katex tex="0\le x\le\pi" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <ReportShelf stats={EXAM} maxMarks={2} />
    </div>
  )
}
