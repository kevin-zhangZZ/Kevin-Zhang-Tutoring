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
// Review, Oct 2026 (2014–2016 pass): Concise reasons tightened; report traps, CAS routes and checks
// in `more`. Interactives on the parts under 40% full marks: c(i) and c(ii) get the "slide the
// dip" widget (interactives/meth-2015e2-q5ci-dip.tsx, meth-2015e2-q5cii-dip.tsx). Part d skipped:
// the marks were lost in the algebra of substituting a into V (and a sign slip), which a picture
// does not show.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import sSketchSrc from './meth-2015e2-q5-s-sketch.png'

const DipCI = lazyWidget(() => import('../interactives/meth-2015e2-q5ci-dip'))
const DipCII = lazyWidget(() => import('../interactives/meth-2015e2-q5cii-dip'))

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
    reason: <>Substitute <Katex tex="t=0" />, using <Katex tex="e^0=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{S(0)=10}" />,
  },
  {
    working: <Katex display tex="\boxed{S(5) = 2e^{5/3}+8e^{-10/3}}" />,
    reason: <>Substitute <Katex tex="t=5" /> and leave it exact: no decimal accuracy was asked for.</>,
    more: <>The report notes students who gave a decimal here. As a check only, <Katex tex="S(5)\approx10.87" />, a little above <Katex tex="S(0)=10" />: the graph dips and then rises again past its starting height.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="S'(t) = \tfrac23e^{t/3} - \tfrac{16}{3}e^{-2t/3}" />,
    reason: <>A minimum inside the domain is a stationary point, so differentiate and solve <Katex tex="S'(t)=0" />.</>,
    more: <>Each term uses <Katex tex="\tfrac{d}{dt}e^{kt}=ke^{kt}" />: <Katex tex="2\times\tfrac13=\tfrac23" /> and <Katex tex="8\times\left(-\tfrac23\right)=-\tfrac{16}{3}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}S'(t)=0 &\implies \tfrac23e^{t/3} = \tfrac{16}{3}e^{-2t/3} \\ &\implies e^{t/3+2t/3} = 8\end{aligned}" />,
    reason: <>Multiply both sides by <Katex tex="\tfrac32e^{2t/3}" /> to collect the exponentials on one side.</>,
    more: <>On CAS, solving <Katex tex="S'(t)=0" /> for <Katex tex="t" /> gives <Katex tex="t=3\log_e(2)" />, which is the same number as <Katex tex="\log_e(8)" /> because <Katex tex="3\log_e(2)=\log_e(2^3)" />. The report quotes both forms.</>,
  },
  {
    working: <Katex display tex="e^{t} = 8 \;\implies\; t=\log_e(8)" />,
    reason: <>Matches the given form <Katex tex="t=\log_e(c)" /> directly.</>,
  },
  {
    working: <Katex display tex="\boxed{c=8}" />,
  },
  {
    working: <Katex display tex="\begin{aligned}S(\log_e 8) &= 2\cdot 8^{1/3} + 8\cdot 8^{-2/3} \\ &= 2(2)+8\left(\tfrac14\right) = 4+2\end{aligned}" />,
    reason: <><Katex tex="e^{\log_e(8)/3}=8^{1/3}=2" /> and <Katex tex="e^{-2\log_e(8)/3}=8^{-2/3}=\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum value of } S = 6}" />,
    reason: <>The question asks for both <Katex tex="c" /> and the minimum value.</>,
    more: <>The report says some students did not find the minimum value, stopping at <Katex tex="c" />. Check: 6 is below both endpoint values, 10 and about 10.87, as a minimum must be.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sSketchSrc}
          alt="This site's sketch, on VCAA's grid, of S falling from (0, 10) to a minimum at (log_e(8), 6) then rising to (5, 2e^(5/3)+8e^(-10/3)) — not a VCAA diagram"
          className="w-full max-w-[340px]"
        />
      </div>
    ),
    reason: (
      <>
        Graph <Katex tex="S" /> on CAS for the shape. Draw it only from <Katex tex="t=0" /> to{' '}
        <Katex tex="t=5" />, and label <Katex tex="(0,10)" />, <Katex tex="(\log_e(8),\,6)" /> and{' '}
        <Katex tex="(5,\ 2e^{5/3}+8e^{-10/3})" /> from parts (a)(i) and (a)(ii).
      </>
    ),
    more: (
      <>
        The report lists three ways marks were lost. Coordinates go as <Katex tex="(t,\,S)" />, so
        the minimum is <Katex tex="(\log_e(8),\,6)" />, not <Katex tex="(6,\,\log_e(8))" />. All three
        points must actually be labelled. And the curve must start at <Katex tex="t=0" /> and stop at{' '}
        <Katex tex="t=5" />, with closed endpoints, not run past them. For placing the points:{' '}
        <Katex tex="\log_e(8)\approx2.08" />, and the right endpoint is about 10.87, a little higher
        than the start.
      </>
    ),
  },
]

const ROWS_AIV: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\text{Average rate of change} \\ &\quad= \dfrac{S(\log_e(8))-S(0)}{\log_e(8) - 0} = \dfrac{6-10}{\log_e(8)}\end{aligned}" />,
    reason: <>Average rate of change is the gradient of the chord: change in <Katex tex="S" /> over change in <Katex tex="t" />, using parts (a)(i) and (a)(ii).</>,
    more: <>Two traps from the report. This is not the average value of the function, <Katex tex="\tfrac{1}{b-a}\int_a^b S(t)\,dt" />, which some students found instead. And the change in <Katex tex="S" /> goes on top: some students gave the upside-down <Katex tex="\tfrac{\log_e(8)-0}{6-10}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\dfrac{4}{\log_e(8)}}" />,
    reason: <>Negative, because <Katex tex="S" /> falls from 10 to 6 over this interval.</>,
    more: <>The report notes students who left the negative sign off. Equivalent form:<Katex tex="-\tfrac{4}{3\log_e(2)}\approx-1.92" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="V'(t) = \tfrac{d}{3}e^{t/3} - \tfrac{2(10-d)}{3}e^{-2t/3}" />,
    reason: <>Differentiate as in part (a)(ii), treating <Katex tex="d" /> as a constant.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&V'(\log_e(9))=0 \\ &\implies d\cdot 9^{1/3} = 2(10-d)\cdot9^{-2/3}\end{aligned}" />,
    reason: <>The minimum is a stationary point, so <Katex tex="V'(\log_e(9))=0" />. Then multiply by 3 and use <Katex tex="e^{\log_e(9)/3}=9^{1/3}" /> and <Katex tex="e^{-2\log_e(9)/3}=9^{-2/3}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\implies d\cdot 9 = 2(10-d) \\ &\implies 9d=20-2d \implies 11d=20\end{aligned}" />,
    reason: <>Multiply both sides by <Katex tex="9^{2/3}" /> to clear the fractional powers, since <Katex tex="9^{1/3}\cdot9^{2/3}=9" />.</>,
    more: (
      <>
        The report&apos;s method is to solve <Katex tex="V'(\log_e(9))=0" /> for <Katex tex="d" /> on CAS:{' '}
        <Cas fn="solve">solve(V′(ln(9))=0, d)</Cas>
        . The report also notes some students tried to solve by hand but were unsuccessful. By hand, the
        step that unlocks it is this one: multiplying by <Katex tex="9^{2/3}" /> turns the equation
        into a linear one in <Katex tex="d" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{d = \dfrac{20}{11}}" />,
    reason: <>This lies in the allowed interval <Katex tex="(0,10)" />.</>,
    more: <>Check: with <Katex tex="d=\tfrac{20}{11}" />, <Katex tex="10-d=\tfrac{90}{11}" />, and solving <Katex tex="V'(t)=0" /> gives <Katex tex="e^t=\tfrac{2(10-d)}{d}=\tfrac{180/11}{20/11}=9" />, so the stationary point is at <Katex tex="t=\log_e(9)" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}V'(t)=0 &\implies e^{t} = \dfrac{2(10-d)}{d} \\ &\implies t^* = \log_e\!\left(\dfrac{2(10-d)}{d}\right)\end{aligned}" />,
    reason: <>Solve <Katex tex="V'(t)=0" /> as in part (b), keeping <Katex tex="d" /> general: multiplying by <Katex tex="3e^{2t/3}" /> gives <Katex tex="de^t=2(10-d)" />. Call this stationary point <Katex tex="t^*" />.</>,
  },
  {
    working: <Katex display tex="V'(t) = \tfrac13e^{-2t/3}\left(d\,e^{t}-2(10-d)\right)" />,
    reason: <>The factor <Katex tex="\tfrac13e^{-2t/3}" /> is positive and the bracket increases with <Katex tex="t" />, so <Katex tex="V'" /> goes from negative to positive at <Katex tex="t^*" />: <Katex tex="V" /> falls, then rises.</>,
    more: <>So <Katex tex="t^*" /> is the only dip of <Katex tex="V" />, and on <Katex tex="[0,5]" /> the minimum is either the dip itself (if <Katex tex="t^*" /> lies inside) or the endpoint nearest to it (if it doesn&apos;t).</>,
  },
  {
    working: <Katex display tex="\text{Minimum on } [0,5] \text{ occurs at } t=0 \iff t^* \le 0" />,
    reason: <>If the dip is at or left of <Katex tex="t=0" />, <Katex tex="V" /> is increasing across all of <Katex tex="[0,5]" />, so its lowest point there is <Katex tex="t=0" />.</>,
    more: <>The equality case counts: if <Katex tex="t^*=0" /> exactly, then <Katex tex="V'(0)=0" /> and <Katex tex="V" /> increases after it, so the minimum is still at <Katex tex="t=0" />. The interactive below lets you slide <Katex tex="d" /> and watch the dip move across <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\log_e\!\left(\dfrac{2(10-d)}{d}\right) \le 0 \\ &\implies \dfrac{2(10-d)}{d}\le1 \\ &\implies 20-2d\le d \implies d\ge\dfrac{20}{3}\end{aligned}" />,
    reason: <>Exponentiate (<Katex tex="e^x" /> is increasing, so the inequality keeps its direction), then multiply by <Katex tex="d" />, which is positive.</>,
    more: <>The report&apos;s route: solve <Katex tex="V'(0)=0" /> for <Katex tex="d" /> to get the boundary value <Katex tex="d=\tfrac{20}{3}" />, then decide which side of it works. A larger <Katex tex="d" /> puts more weight on the rising term <Katex tex="d\,e^{t/3}" />, pushing the dip left, so it is <Katex tex="d" /> at or above <Katex tex="\tfrac{20}{3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{20}{3} \le d < 10}" />,
    reason: <>Combine with the given <Katex tex="d\in(0,10)" />: <Katex tex="\tfrac{20}{3}" /> is included, 10 is not.</>,
    more: <>Only 4% of students got full marks here. The report says many found <Katex tex="d=\tfrac{20}{3}" /> but did not consider the set of values. Of the two wrong inequalities it quotes, <Katex tex="\tfrac{20}{3}\le d\le10" /> includes 10, which the question rules out with <Katex tex="d\in(0,10)" />; <Katex tex="\tfrac{20}{3}<d<10" /> wrongly drops <Katex tex="\tfrac{20}{3}" /> (the equality case above).</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Minimum on } [0,5] \text{ occurs at } t=5 \iff t^* \ge 5" />,
    reason: <>As in part (c)(i), but now the dip must be at or right of <Katex tex="t=5" />, so <Katex tex="V" /> is decreasing across all of <Katex tex="[0,5]" />.</>,
    more: <>Again the equality case counts: if <Katex tex="t^*=5" />, <Katex tex="V" /> decreases right up to <Katex tex="t=5" />, so the minimum is at <Katex tex="t=5" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\log_e\!\left(\dfrac{2(10-d)}{d}\right) \ge 5 \\ &\implies \dfrac{2(10-d)}{d}\ge e^5\end{aligned}" />,
    reason: <>Exponentiate both sides; <Katex tex="e^x" /> is increasing, so the inequality keeps its direction.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\implies 20-2d \ge d\,e^5 \\ &\implies 20 \ge d(e^5+2) \\ &\implies d \le \dfrac{20}{e^5+2}\end{aligned}" />,
    reason: <>Multiply by <Katex tex="d" /> (positive), collect the <Katex tex="d" /> terms, then divide by <Katex tex="e^5+2" /> (positive).</>,
    more: <>The report&apos;s route: solve <Katex tex="V'(5)=0" /> for the boundary value <Katex tex="d=\tfrac{20}{2+e^5}" />, then decide which side works. A smaller <Katex tex="d" /> puts less weight on the rising term <Katex tex="d\,e^{t/3}" />, so the dip moves right: the values below the boundary.</>,
  },
  {
    working: <Katex display tex="\boxed{0 < d \le \dfrac{20}{e^5+2}}" />,
    reason: <>Combine with the given <Katex tex="d\in(0,10)" />: the boundary value is included, 0 is not.</>,
    more: <>The report says many students found <Katex tex="d=\tfrac{20}{2+e^5}" /> but did not consider the set of values, and some wrote the inequality incorrectly. For scale only, <Katex tex="\tfrac{20}{e^5+2}\approx0.133" />: a very small <Katex tex="d" /> is needed to push the dip past <Katex tex="t=5" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\text{Let } r = e^{a} = \dfrac{2(10-d)}{d}, \\ &\text{so } 10-d = \dfrac{rd}{2}\end{aligned}" />,
    reason: <>A local minimum is a stationary point, so <Katex tex="a" /> is <Katex tex="t^*" /> from part (c)(i). Naming <Katex tex="e^a" /> as <Katex tex="r" /> keeps the algebra short.</>,
    more: <>This is the report&apos;s <Katex tex="a=\log_e\!\left(\tfrac{20}{d}-2\right)" />, since <Katex tex="\tfrac{2(10-d)}{d}=\tfrac{20}{d}-2" />. The report says some students found <Katex tex="a" /> but did not substitute it into <Katex tex="V" />: finding <Katex tex="a" /> is only half the job, because <Katex tex="m" /> is the value <Katex tex="V(a)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}m = V(a) &= d\,r^{1/3} + (10-d)\,r^{-2/3} \\ &= d\,r^{1/3} + \tfrac{rd}{2}\cdot r^{-2/3}\end{aligned}" />,
    reason: <>Substitute <Katex tex="t=a" />: <Katex tex="e^{a/3}=r^{1/3}" /> and <Katex tex="e^{-2a/3}=r^{-2/3}" />. Then replace <Katex tex="10-d" /> using the line above.</>,
  },
  {
    working: <Katex display tex="= d\,r^{1/3} + \tfrac12 d\,r^{1/3} = \tfrac32\,d\,r^{1/3}" />,
    reason: <>Since <Katex tex="r\cdot r^{-2/3}=r^{1/3}" />, both terms are multiples of <Katex tex="d\,r^{1/3}" />.</>,
  },
  {
    working: <Katex display tex="r^{1/3} = \left(\dfrac{2(10-d)}{d}\right)^{1/3} = 2^{1/3}\,d^{-1/3}(10-d)^{1/3}" />,
    reason: <>Write <Katex tex="r^{1/3}" /> back in terms of <Katex tex="d" /> with index laws, aiming for the powers of <Katex tex="d" /> and <Katex tex="10-d" /> in the target form.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}m &= \tfrac32\cdot2^{1/3}\;d^{2/3}(10-d)^{1/3} \\ &= \frac{3\times2^{1/3}}{2}\,d^{2/3}(10-d)^{1/3}\end{aligned}" />,
    reason: <>Using <Katex tex="d\cdot d^{-1/3}=d^{2/3}" />. Compare with the given <Katex tex="m=\tfrac k2\,d^{2/3}(10-d)^{1/3}" />: the <Katex tex="\tfrac12" /> is already part of it.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 3\times2^{1/3} = 3\sqrt[3]{2}}" />,
    reason: <>Match the coefficients: <Katex tex="\tfrac k2=\tfrac{3\times2^{1/3}}{2}" />.</>,
    more: (
      <>
        On CAS, the report solves{' '}
        <Katex tex="V\!\left(\log_e\!\left(\tfrac{20}{d}-2\right)\right)=\tfrac k2\,d^{2/3}(10-d)^{1/3}" />{' '}
        for <Katex tex="k" />. Its quicker alternative: the formula holds for every allowed <Katex tex="a" />,
        so pick <Katex tex="a=0" />. Part (c)(i) gives <Katex tex="d=\tfrac{20}{3}" /> there, and{' '}
        <Katex tex="V(0)=d+(10-d)=10" />, so solve{' '}
        <Katex tex="10=\tfrac k2\left(\tfrac{20}{3}\right)^{2/3}\left(\tfrac{10}{3}\right)^{1/3}" />, giving
        the same <Katex tex="k\approx3.78" />. The report&apos;s common wrong answer,{' '}
        <Katex tex="k=-3\times2^{1/3}" />, can be ruled out at a glance: it would make <Katex tex="m" /> negative,
        but both terms of <Katex tex="V" /> are positive for <Katex tex="d\in(0,10)" />.
      </>
    ),
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
        <Explore title="Where the dip sits decides where the minimum on [0, 5] is">
          <DipCI />
        </Explore>
      </PartCard>

      <PartCard letter="c.ii" topic="Parameter Range" marks={2} statement={<>Find the set of possible values of <Katex tex="d" /> such that the minimum value of the function occurs when <Katex tex="t=5" />.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
        <Explore title="A small enough d pushes the dip past t = 5">
          <DipCII />
        </Explore>
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
