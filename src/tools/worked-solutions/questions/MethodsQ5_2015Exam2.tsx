// 2015 Mathematical Methods — Exam 2, Section 2 Question 5 (15 marks).
// S(t) = 2e^(t/3) + 8e^(-2t/3) on [0,5] — endpoints, minimum, sketch, and average rate of
// change (part a); a generalised V(t) = d·e^(t/3) + (10-d)·e^(-2t/3) — solving for d given
// where the minimum occurs (parts b, c), then a general closed form for the minimum value
// itself (part d). Question text transcribed from the original paper; the sketch axes VCAA
// supplied for part (a)(iii) were blank (nothing pre-drawn to redraw), so the sketched
// curve is this site's own original content — plotted with matplotlib (real graphing
// software, exact, not hand-waypointed), not cropped from anything VCAA printed. Solution
// is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sSketchSrc from './meth-2015exam2-q5-s-sketch.png'

const EXAM_AI: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: <>Some students gave an approximate answer for <Katex tex="S(5)" /> when an exact answer was required.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [22, 27, 51],
  average: 1.3,
  comment: <>Some students did not find the minimum value, stopping once they had found <Katex tex="c" />.</>,
}

const EXAM_AIII: SAExaminerStats = {
  marks: [14, 23, 63],
  average: 1.5,
  comment: (
    <>
      Many students drew accurate graphs. Some had the coordinates the wrong way around, others
      did not put the coordinates on the graph, and some did not sketch the graph over the
      required domain.
    </>
  ),
}

const EXAM_AIV: SAExaminerStats = {
  marks: [45, 12, 43],
  average: 1.0,
  comment: (
    <>
      Some students worked out the average <em>value</em> of the function rather than the
      average rate of change. Others left the negative sign off their answer.
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
  comment: <>Many students found <Katex tex="d=\tfrac{20}{3}" /> but did not go on to consider the full set of values for <Katex tex="d" />.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [51, 46, 4],
  average: 0.6,
  comment: <>Many students found the boundary value of <Katex tex="d" /> but, again, did not consider the full set of values.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [82, 7, 11],
  average: 0.3,
  comment: (
    <>
      This question was not answered well. Some students were able to find{' '}
      <Katex tex="a=\ln_e\!\left(\tfrac{2(10-d)}{d}\right)" /> but did not substitute it back
      into <Katex tex="V" />.
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
    reason: <>An exact value is required — left in this form (numerically <Katex tex="\approx 10.874" />).</>,
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
    working: <Katex display tex="e^{t} = 8 \;\implies\; t=\ln_e(8)" />,
    reason: <>Matches the given form <Katex tex="t=\ln_e(c)" /> directly.</>,
  },
  {
    working: <Katex display tex="\boxed{c=8}" />,
  },
  {
    working: <Katex display tex="S(\ln_e 8) = 2\cdot 8^{1/3} + 8\cdot 8^{-2/3} = 2(2)+8\left(\tfrac14\right) = 4+2" />,
    reason: <><Katex tex="e^{\ln_e(8)/3}=8^{1/3}=2" /> and <Katex tex="e^{-2\ln_e(8)/3}=8^{-2/3}=\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum value of } S = 6}" />,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sSketchSrc}
          alt="S falling from (0,10) to a minimum at (log_e(8), 6) then rising to (5, 2e^(5/3)+8e^(-10/3)) — this site's own sketch, not a VCAA diagram"
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
    working: <Katex display tex="\text{Average rate of change} = \dfrac{S(\ln_e8)-S(0)}{\ln_e8 - 0} = \dfrac{6-10}{\ln_e8}" />,
    reason: <>Gradient of the chord between <Katex tex="t=0" /> and <Katex tex="t=\ln_e8" />, using the values from parts (a)(i) and (a)(ii).</>,
  },
  {
    working: <Katex display tex="\boxed{= -\dfrac{4}{\ln_e8}} \quad \left(=-\dfrac{4}{3\ln_e2} \approx -1.924\right)" />,
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
    working: <Katex display tex="V'(\ln_e9)=0 \;\implies\; d\cdot 9^{1/3} = 2(10-d)\cdot9^{-2/3}" />,
    reason: <>The minimum occurs at <Katex tex="t=\ln_e9" />, so <Katex tex="V'(\ln_e9)=0" />.</>,
  },
  {
    working: <Katex display tex="\;\implies\; d\cdot 9 = 2(10-d) \;\implies\; 9d=20-2d \;\implies\; 11d=20" />,
    reason: <>Multiply both sides by <Katex tex="9^{2/3}" />, since <Katex tex="9^{1/3}\cdot9^{2/3}=9" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d = \dfrac{20}{11}}" />,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="V'(t)=0 \;\implies\; e^{t} = \dfrac{2(10-d)}{d} \;\implies\; t^* = \ln_e\!\left(\dfrac{2(10-d)}{d}\right)" />,
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
    working: <Katex display tex="\ln_e\!\left(\dfrac{2(10-d)}{d}\right) \le 0 \;\implies\; \dfrac{2(10-d)}{d}\le1 \;\implies\; 20-2d\le d \;\implies\; d\ge\dfrac{20}{3}" />,
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
    working: <Katex display tex="\ln_e\!\left(\dfrac{2(10-d)}{d}\right) \ge 5 \;\implies\; \dfrac{2(10-d)}{d}\ge e^5" />,
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
    working: <Katex display tex="\text{Let } r = e^{t^*} = \dfrac{2(10-d)}{d}, \quad \text{so } 10-d = \dfrac{rd}{2}" />,
    reason: <>Work with the critical-point equation from part (c) in this rearranged form.</>,
  },
  {
    working: <Katex display tex="V(t^*) = d\,r^{1/3} + (10-d)\,r^{-2/3} = d\,r^{1/3} + \tfrac{rd}{2}\cdot r^{-2/3}" />,
    reason: <><Katex tex="e^{t^*/3}=r^{1/3}" /> and <Katex tex="e^{-2t^*/3}=r^{-2/3}" />.</>,
  },
  {
    working: <Katex display tex="= d\,r^{1/3} + \tfrac12 d\,r^{1/3} = \tfrac32\,d\,r^{1/3}" />,
  },
  {
    working: <Katex display tex="r^{1/3} = \left(\dfrac{2(10-d)}{d}\right)^{1/3} = 2^{1/3}\,d^{-1/3}(10-d)^{1/3}" />,
  },
  {
    working: <Katex display tex="m = \tfrac32\,d\cdot 2^{1/3}d^{-1/3}(10-d)^{1/3} = \tfrac32\cdot2^{1/3}\;d^{2/3}(10-d)^{1/3}" />,
  },
  {
    working: <Katex display tex="\boxed{k = \dfrac{3\sqrt[3]{2}}{2}} \quad \left(= \dfrac{3}{\sqrt[3]{4}} \approx 1.890\right)" />,
    reason: <>Matches the required form <Katex tex="m=k\,d^{2/3}(10-d)^{1/3}" />. (Cross-check with part (c)(i): at <Katex tex="a=0" />, <Katex tex="d=\tfrac{20}{3}" />, <Katex tex="V(0)=10" />; solving <Katex tex="10=k\left(\tfrac{20}{3}\right)^{2/3}\left(\tfrac{10}{3}\right)^{1/3}" /> gives the same <Katex tex="k" />.)</>,
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

      <PartCard letter="a.i" marks={1} statement={<>Find <Katex tex="S(0)" /> and <Katex tex="S(5)" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        marks={2}
        statement={<>The minimum value of <Katex tex="S" /> occurs when <Katex tex="t=\ln_e(c)" />. State the value of <Katex tex="c" /> and the minimum value of <Katex tex="S" />.</>}
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
        marks={2}
        statement={<>On the axes below, sketch the graph of <Katex tex="S" /> against <Katex tex="t" /> for <Katex tex="0\le t\le5" />. Label the end points and the minimum point with their coordinates.</>}
        examinerReport={EXAM_AIII}
      >
        <WorkingTable rows={ROWS_AIII} />
      </PartCard>

      <PartCard letter="a.iv" marks={2} statement={<>Find the average rate of change of the function <Katex tex="S" /> over the interval <Katex tex="[0,\ \ln_e(c)]" />.</>} examinerReport={EXAM_AIV}>
        <WorkingTable rows={ROWS_AIV} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Let <Katex tex="V:[0,5]\to\mathbb{R},\ V(t) = d\,e^{t/3} + (10-d)e^{-2t/3}" />, where{' '}
        <Katex tex="d" /> is a real number and <Katex tex="d\in(0,10)" />.
      </div>

      <PartCard letter="b" marks={2} statement={<>If the minimum value of the function occurs when <Katex tex="t=\ln_e(9)" />, find the value of <Katex tex="d" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c.i" marks={2} statement={<>Find the set of possible values of <Katex tex="d" /> such that the minimum value of the function occurs when <Katex tex="t=0" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard letter="c.ii" marks={2} statement={<>Find the set of possible values of <Katex tex="d" /> such that the minimum value of the function occurs when <Katex tex="t=5" />.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            If the function <Katex tex="V" /> has a local minimum <Katex tex="(a,m)" />, where{' '}
            <Katex tex="0<a<5" />, it can be shown that{' '}
            <Katex tex="m = k\,d^{2/3}(10-d)^{1/3}" />. Find the value of <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
