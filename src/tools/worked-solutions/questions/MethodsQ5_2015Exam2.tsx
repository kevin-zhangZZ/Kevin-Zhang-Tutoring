// 2015 Mathematical Methods (CAS) — Exam 2, Section 2 Question 5 (15 marks).
// S(t) = 2e^(t/3) + 8e^(-2t/3) on [0,5] — endpoints, minimum, sketch, and average rate of
// change (part a); a generalised V(t) = d·e^(t/3) + (10-d)·e^(-2t/3) — solving for d given
// where the minimum occurs (parts b, c), then a closed form for the minimum value (part d).
// Question text transcribed from the original paper; VCAA supplied blank axes for part
// (a)(iii), so the sketch is this site's own matplotlib figure on VCAA's grid. Answers
// checked with sympy and against the VCAA examination report. Solution is original.
// Audit, Sept 2026: part d. had been transcribed as m = k·d^(2/3)(10−d)^(1/3) with 0 < a < 5;
// the paper has m = (k/2)·d^(2/3)(10−d)^(1/3) with 0 ≤ a ≤ 5, so k is 3∛2 (VCAA's answer),
// not the 3∛2/2 given before.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sSketchSrc from './meth-2015e2-q5-s-sketch.png'

const EXAM_AI: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: <>Some students gave an approximate answer for <Katex tex="S(5)" /> when an exact answer was required.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [22, 27, 51],
  average: 1.3,
  comment: <>Some students did not find the minimum value.</>,
}

const EXAM_AIII: SAExaminerStats = {
  marks: [14, 23, 63],
  average: 1.5,
  comment: (
    <>
      Many students drew accurate graphs. Some had the coordinates the wrong way around and
      others did not put the coordinates on the graph. Some did not sketch the graph over the
      required domain.
    </>
  ),
}

const EXAM_AIV: SAExaminerStats = {
  marks: [45, 12, 43],
  average: 1.0,
  comment: (
    <>
      Some students worked out the average value of the function and not the average rate of
      change. Others left the negative sign off their answer, writing{' '}
      <Katex tex="\tfrac{4}{\ln 8}" />. Some students gave{' '}
      <Katex tex="\tfrac{\log_e(8)-0}{6-10}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [35, 7, 58],
  average: 1.3,
  comment: <>This question was answered reasonably well. Some students tried to solve the equation by hand but were unsuccessful.</>,
}

const EXAM_CI: SAExaminerStats = {
  marks: [47, 48, 4],
  average: 0.6,
  comment: (
    <>
      Many students found <Katex tex="d=\tfrac{20}{3}" /> but did not consider the set of values
      for <Katex tex="d" />. Some had the inequality as{' '}
      <Katex tex="\tfrac{20}{3}\le d\le10" /> or <Katex tex="\tfrac{20}{3}<d<10" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [51, 46, 4],
  average: 0.6,
  comment: (
    <>
      Many students found <Katex tex="d=\tfrac{20}{2+e^5}" />, but did not consider the set of
      values for <Katex tex="d" />. Some had the inequality written incorrectly.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [82, 7, 11],
  average: 0.3,
  comment: (
    <>
      This question was not answered well. Some students were able to find{' '}
      <Katex tex="a=\log_e\!\left(\tfrac{20}{d}-2\right)" /> but did not substitute it into{' '}
      <Katex tex="V" />. A common incorrect response was <Katex tex="k=-3\times2^{1/3}" />.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="S(0) = 2e^0+8e^0 = 2+8" />,
  },
  {
    working: <Katex display tex="\boxed{S(0)=10}" />,
  },
  {
    working: <Katex display tex="\boxed{S(5) = 2e^{5/3}+8e^{-10/3}}" />,
    reason: <>An exact value is required — the report notes students who gave a decimal. (Numerically about 10.87, a little above <Katex tex="S(0)" />, consistent with the graph rising again after its minimum.)</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="S'(t) = \tfrac23e^{t/3} - \tfrac{16}{3}e^{-2t/3}" />,
    reason: <>Differentiate <Katex tex="S" /> to locate its stationary point.</>,
  },
  {
    working: <Katex display tex="S'(t)=0 \;\implies\; \tfrac23e^{t/3} = \tfrac{16}{3}e^{-2t/3} \;\implies\; e^{t/3+2t/3} = 8" />,
  },
  {
    working: <Katex display tex="e^{t} = 8 \;\implies\; t=\log_e(8)" />,
    reason: <>Matches the given form <Katex tex="t=\log_e(c)" /> directly.</>,
  },
  {
    working: <Katex display tex="\boxed{c=8}" />,
  },
  {
    working: <Katex display tex="S(\log_e 8) = 2\cdot 8^{1/3} + 8\cdot 8^{-2/3} = 2(2)+8\left(\tfrac14\right) = 4+2" />,
    reason: <><Katex tex="e^{\log_e(8)/3}=8^{1/3}=2" /> and <Katex tex="e^{-2\log_e(8)/3}=8^{-2/3}=\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum value of } S = 6}" />,
    reason: <>Both values are asked for — the report says some students stopped at <Katex tex="c" />. And 6 is below both endpoint values 10 and 10.87, as a minimum must be.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sSketchSrc}
          alt="This site's sketch, on VCAA's grid, of S falling from (0, 10) to a minimum at (log_e(8), 6) then rising to (5, 2e^(5/3)+8e^(-10/3)) — not a VCAA diagram"
          className="w-full max-w-[340px]"
        />
      </div>
    ),
    reason: (
      <>
        <Katex tex="S" /> falls from the left endpoint <Katex tex="(0,10)" /> down to the minimum{' '}
        <Katex tex="(\log_e(8),\,6)" />, then rises back up to the right endpoint{' '}
        <Katex tex="(5,\ 2e^{5/3}+8e^{-10/3})" /> — a smooth, single-dip curve over the whole
        domain, all three points explicitly labelled.
      </>
    ),
  },
]

const ROWS_AIV: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Average rate of change} = \dfrac{S(\log_e(8))-S(0)}{\log_e(8) - 0} = \dfrac{6-10}{\log_e(8)}" />,
    reason: <>Gradient of the chord between <Katex tex="t=0" /> and <Katex tex="t=\log_e(8)" />, using the values from parts (a)(i) and (a)(ii).</>,
  },
  {
    working: <Katex display tex="\boxed{-\dfrac{4}{\log_e(8)}}" />,
    reason: <>Negative, because <Katex tex="S" /> falls from 10 to 6 over this interval — the report notes students who dropped the sign. Equivalently <Katex tex="-\tfrac{4}{3\log_e(2)}\approx-1.92" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="V(t) = d\,e^{t/3} + (10-d)e^{-2t/3}" />,
  },
  {
    working: <Katex display tex="V'(t) = \tfrac{d}{3}e^{t/3} - \tfrac{2(10-d)}{3}e^{-2t/3}" />,
    reason: <>Same style of differentiation as part (a)(ii), now with the general coefficient <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="V'(\log_e(9))=0 \;\implies\; d\cdot 9^{1/3} = 2(10-d)\cdot9^{-2/3}" />,
    reason: <>The minimum occurs at <Katex tex="t=\log_e(9)" />, so <Katex tex="V'(\log_e(9))=0" />.</>,
  },
  {
    working: <Katex display tex="\;\implies\; d\cdot 9 = 2(10-d) \;\implies\; 9d=20-2d \;\implies\; 11d=20" />,
    reason: <>Multiply both sides by <Katex tex="9^{2/3}" />, since <Katex tex="9^{1/3}\cdot9^{2/3}=9" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d = \dfrac{20}{11}}" />,
    reason: <>In <Katex tex="(0,10)" /> ✓. Check with the general stationary point from part c.: <Katex tex="\tfrac{2(10-d)}{d}=\tfrac{2\times\frac{90}{11}}{\frac{20}{11}}=9" />, so <Katex tex="t=\log_e(9)" /> ✓.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="V'(t)=0 \;\implies\; e^{t} = \dfrac{2(10-d)}{d} \;\implies\; t^* = \log_e\!\left(\dfrac{2(10-d)}{d}\right)" />,
    reason: <>Same working as part (b), left in terms of general <Katex tex="d" /> — this is where <Katex tex="V" /> would have its unconstrained minimum.</>,
  },
  {
    working: <Katex display tex="V \text{ is decreasing before } t^* \text{ and increasing after it}" />,
    reason: <>As <Katex tex="t\to\pm\infty" />, <Katex tex="V(t)\to\infty" /> (for <Katex tex="0<d<10" />), so <Katex tex="V" /> is a single-dip curve with its only minimum at <Katex tex="t^*" />.</>,
  },
  {
    working: <Katex display tex="\text{Minimum on } [0,5] \text{ occurs at } t=0 \iff t^* \le 0" />,
    reason: <>If the unconstrained minimum sits at or before <Katex tex="t=0" />, then <Katex tex="V" /> is already increasing across the whole of <Katex tex="[0,5]" />, so the constrained minimum is the left endpoint.</>,
  },
  {
    working: <Katex display tex="\log_e\!\left(\dfrac{2(10-d)}{d}\right) \le 0 \;\implies\; \dfrac{2(10-d)}{d}\le1 \;\implies\; 20-2d\le d \;\implies\; d\ge\dfrac{20}{3}" />,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{20}{3} \le d < 10}" />,
    reason: <>Intersected with the given constraint <Katex tex="d\in(0,10)" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Minimum on } [0,5] \text{ occurs at } t=5 \iff t^* \ge 5" />,
    reason: <>By the same reasoning as part (c)(i), but now the unconstrained minimum needs to sit at or after the right endpoint, so <Katex tex="V" /> is still decreasing across the whole of <Katex tex="[0,5]" />.</>,
  },
  {
    working: <Katex display tex="\log_e\!\left(\dfrac{2(10-d)}{d}\right) \ge 5 \;\implies\; \dfrac{2(10-d)}{d}\ge e^5" />,
  },
  {
    working: <Katex display tex="\;\implies\; 20-2d \ge d\,e^5 \;\implies\; 20 \ge d(e^5+2) \;\implies\; d \le \dfrac{20}{e^5+2}" />,
  },
  {
    working: <Katex display tex="\boxed{0 < d \le \dfrac{20}{e^5+2}} \quad (\approx 0.133)" />,
    reason: <>Intersected with the given constraint <Katex tex="d\in(0,10)" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } r = e^{a} = \dfrac{2(10-d)}{d}, \quad \text{so } 10-d = \dfrac{rd}{2}" />,
    reason: <>The stationary point from part c.: <Katex tex="V'(a)=0" /> gives <Katex tex="e^{a}=\tfrac{2(10-d)}{d}" />, i.e. <Katex tex="a=\log_e\!\left(\tfrac{20}{d}-2\right)" /> as in the report.</>,
  },
  {
    working: <Katex display tex="m = V(a) = d\,r^{1/3} + (10-d)\,r^{-2/3} = d\,r^{1/3} + \tfrac{rd}{2}\cdot r^{-2/3}" />,
    reason: <><Katex tex="e^{a/3}=r^{1/3}" /> and <Katex tex="e^{-2a/3}=r^{-2/3}" />.</>,
  },
  {
    working: <Katex display tex="= d\,r^{1/3} + \tfrac12 d\,r^{1/3} = \tfrac32\,d\,r^{1/3}" />,
  },
  {
    working: <Katex display tex="r^{1/3} = \left(\dfrac{2(10-d)}{d}\right)^{1/3} = 2^{1/3}\,d^{-1/3}(10-d)^{1/3}" />,
  },
  {
    working: <Katex display tex="m = \tfrac32\cdot2^{1/3}\;d^{2/3}(10-d)^{1/3} = \frac{3\times2^{1/3}}{2}\,d^{2/3}(10-d)^{1/3}" />,
    reason: <>Now compare with the given form <Katex tex="m=\tfrac k2\,d^{2/3}(10-d)^{1/3}" /> — note the <Katex tex="\tfrac12" /> is already part of it.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 3\times2^{1/3} = 3\sqrt[3]{2}}" />,
    reason: <>Matching the coefficients of <Katex tex="\tfrac k2" /> and <Katex tex="\tfrac{3\times2^{1/3}}{2}" />. Cross-check with the report's alternative: at <Katex tex="a=0" />, part c.(i) gives <Katex tex="d=\tfrac{20}{3}" /> and <Katex tex="V(0)=10" />, and <Katex tex="10=\tfrac k2\left(\tfrac{20}{3}\right)^{2/3}\left(\tfrac{10}{3}\right)^{1/3}" /> gives the same <Katex tex="k\approx3.78" />. A negative <Katex tex="k" />, the report's common wrong answer, would make the minimum value negative — impossible for a sum of two positive exponential terms.</>,
  },
]

export default function MethodsQ5_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (15 marks)</p>
        <p>
          Let <Katex tex="S(t) = 2e^{t/3}+8e^{-2t/3}" />, where <Katex tex="0\le t\le5" />.
        </p>
      </div>

      <PartCard letter="a.i" topic="Function Value" marks={1} statement={<>Find <Katex tex="S(0)" /> and <Katex tex="S(5)" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Minimum Value"
        marks={2}
        statement={<>The minimum value of <Katex tex="S" /> occurs when <Katex tex="t=\log_e(c)" />. State the value of <Katex tex="c" /> and the minimum value of <Katex tex="S" />.</>}
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Sketch Graph"
        marks={2}
        statement={<>On the axes below, sketch the graph of <Katex tex="S" /> against <Katex tex="t" /> for <Katex tex="0\le t\le5" />. Label the end points and the minimum point with their coordinates.</>}
        examinerReport={EXAM_AIII}
      >
        <WorkingTable rows={ROWS_AIII} />
      </PartCard>

      <PartCard letter="a.iv" topic="Average Rate" marks={2} statement={<>Find the value of the average rate of change of the function <Katex tex="S" /> over the interval <Katex tex="[0,\ \log_e(c)]" />.</>} examinerReport={EXAM_AIV}>
        <WorkingTable rows={ROWS_AIV} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Let <Katex tex="V:[0,5]\to R,\ V(t) = d\,e^{t/3} + (10-d)e^{-2t/3}" />, where{' '}
        <Katex tex="d" /> is a real number and <Katex tex="d\in(0,10)" />.
      </div>

      <PartCard letter="b" topic="Find Parameter" marks={2} statement={<>If the minimum value of the function occurs when <Katex tex="t=\log_e(9)" />, find the value of <Katex tex="d" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c.i" topic="Parameter Range" marks={2} statement={<>Find the set of possible values of <Katex tex="d" /> such that the minimum value of the function occurs when <Katex tex="t=0" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard letter="c.ii" topic="Parameter Range" marks={2} statement={<>Find the set of possible values of <Katex tex="d" /> such that the minimum value of the function occurs when <Katex tex="t=5" />.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Local Minimum"
        marks={2}
        statement={
          <>
            If the function <Katex tex="V" /> has a local minimum <Katex tex="(a,m)" />, where{' '}
            <Katex tex="0\le a\le5" />, it can be shown that{' '}
            <Katex tex="m = \dfrac k2\,d^{\frac23}(10-d)^{\frac13}" />. Find the value of{' '}
            <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
