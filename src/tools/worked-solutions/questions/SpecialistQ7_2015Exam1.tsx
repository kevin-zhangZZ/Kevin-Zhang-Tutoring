// 2015 Specialist Mathematics — Exam 1, Question 7 (5 marks). Solving sin(2x) = sin(x), then
// the related cosec inequality. Question text transcribed from the original paper (no diagram
// given). Answers checked with sympy and against the VCAA examination report. Solution is
// original.
//
// Interactives (both parts qualify: 34% and 11% full marks): q7a shows the five meetings of
// y = sin(2x) and y = sin(x), and which three cancelling sin(x) loses; q7b graphs both cosecants
// and contrasts the true solution set with the x < π/3 that comes from cross-multiplying without
// checking signs.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const LostRoots = lazyWidget(() => import('../interactives/spec-2015e1-q7a-lost-roots'))
const CosecSigns = lazyWidget(() => import('../interactives/spec-2015e1-q7b-cosec-signs'))

const EXAM_A: SAExaminerStats = {
  marks: [7, 45, 14, 34],
  average: 1.8,
  comment: (
    <>
      This question divided the cohort, with some students answering it very well but a
      number having difficulty. The most common error was to use the double-angle formula
      for <Katex tex="\sin(2x)" /> but then cancel the <Katex tex="\sin(x)" /> term from both
      sides, which many students did, thereby losing a set of solutions. Some tried to use a
      graphical approach and missed solutions. Others solved the two equations they generated
      but got only two solutions for <Katex tex="\sin(x)=0" /> (usually 0 and{' '}
      <Katex tex="\pi" /> but occasionally 0 and <Katex tex="2\pi" />). Some were not able to solve{' '}
      <Katex tex="2\cos(x)=1" />. Errors were made with exact values.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [59, 30, 11],
  average: 0.5,
  comment: (
    <>
      High-scoring students used a graphical argument for this question. Typical errors
      included incorrect simplification with inequalities (multiplying by a term that could be
      negative but not changing the inequality), choosing the incorrect interval in the first
      quadrant – i.e. <Katex tex="\left(\tfrac\pi3,\pi\right)" /> – including endpoint(s) and
      giving single value answer(s) rather than intervals. A common incorrect response was{' '}
      <Katex tex="x<\tfrac\pi3" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(2x) = \sin(x)" />,
    reason: <>The equation to solve. The angles differ (<Katex tex="2x" /> and <Katex tex="x" />), so first rewrite both sides in terms of the same angle.</>,
  },
  {
    working: <Katex display tex="2\sin(x)\cos(x) = \sin(x)" />,
    reason: <>Double-angle formula <Katex tex="\sin(2x)=2\sin(x)\cos(x)" />, so both sides are now in terms of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="2\sin(x)\cos(x)-\sin(x) = 0" />,
    reason: <>Move everything to one side. Do <em>not</em> divide by <Katex tex="\sin(x)" />: that throws away every solution where <Katex tex="\sin(x)=0" />.</>,
    more: <>Dividing by <Katex tex="\sin(x)" /> is only allowed when <Katex tex="\sin(x)\neq0" />, so it silently assumes away the case <Katex tex="\sin(x)=0" />, which here gives three of the five answers. The report names cancelling <Katex tex="\sin(x)" /> from both sides as the most common error, losing a set of solutions.</>,
  },
  {
    working: <Katex display tex="\sin(x)\bigl(2\cos(x)-1\bigr) = 0" />,
    reason: <>Take out the common factor <Katex tex="\sin(x)" />. A product is zero exactly when one of its factors is zero, giving two equations.</>,
  },
  {
    working: <Katex display tex="\sin(x) = 0 \implies x = 0,\ \pi,\ 2\pi" />,
    reason: <><Katex tex="\sin(x)=0" /> at every multiple of <Katex tex="\pi" />. The domain <Katex tex="[0,2\pi]" /> is closed, so both endpoints <Katex tex="0" /> and <Katex tex="2\pi" /> count.</>,
    more: <>The report notes students who found only two solutions here, usually <Katex tex="0" /> and <Katex tex="\pi" />, occasionally <Katex tex="0" /> and <Katex tex="2\pi" />. List the multiples <Katex tex="\ldots,-\pi,0,\pi,2\pi,3\pi,\ldots" /> and keep every one inside the interval; square brackets mean the ends are included.</>,
  },
  {
    working: <Katex display tex="\cos(x) = \tfrac12 \implies x = \tfrac\pi3,\ \tfrac{5\pi}3" />,
    reason: <><Katex tex="2\cos(x)-1=0" /> gives <Katex tex="\cos(x)=\tfrac12" />, and <Katex tex="\cos\left(\tfrac\pi3\right)=\tfrac12" />. Cosine is also positive in the fourth quadrant: <Katex tex="2\pi-\tfrac\pi3=\tfrac{5\pi}3" />.</>,
    more: <>The report says some students could not solve <Katex tex="2\cos(x)=1" /> and that errors were made with exact values. The angle <Katex tex="\tfrac\pi3" /> comes from the equilateral-triangle exact values: <Katex tex="\cos\left(\tfrac\pi3\right)=\tfrac12" />, <Katex tex="\sin\left(\tfrac\pi3\right)=\tfrac{\sqrt3}2" />. The quadrant-two angle <Katex tex="\tfrac{2\pi}3" /> is wrong, since <Katex tex="\cos\left(\tfrac{2\pi}3\right)=-\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 0,\ \tfrac\pi3,\ \pi,\ \tfrac{5\pi}3,\ 2\pi}" />,
    reason: <>Five solutions in all: three from <Katex tex="\sin(x)=0" /> and two from <Katex tex="\cos(x)=\tfrac12" />.</>,
    more: <>Check one: at <Katex tex="x=\tfrac\pi3" />, <Katex tex="\sin\left(\tfrac{2\pi}3\right)=\tfrac{\sqrt3}2=\sin\left(\tfrac\pi3\right)" />. On a graph, the curves <Katex tex="y=\sin(2x)" /> and <Katex tex="y=\sin(x)" /> meet five times, and three of those meetings are on the <Katex tex="x" />-axis, two of them at the very ends of the domain. They are easy to overlook, which is why the report says some students who used a graphical approach missed solutions.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{cosec}(2x) < \operatorname{cosec}(x) \iff \frac{1}{\sin(2x)} < \frac{1}{\sin(x)}" />,
    reason: <>Rewrite in terms of sine. Don't cross-multiply yet: <Katex tex="\sin(2x)" /> changes sign at <Katex tex="x=\tfrac\pi2" />, so treat each half of the domain separately.</>,
    more: <>Multiplying both sides by <Katex tex="\sin(x)\sin(2x)" /> reverses the inequality wherever that product is negative, which is all of <Katex tex="\left(\tfrac\pi2,\pi\right)" />. The report lists multiplying by a term that could be negative, without changing the inequality, as a typical error. Doing that over the whole domain gives <Katex tex="\sin(x)<\sin(2x)" />, i.e. <Katex tex="\sin(x)<2\sin(x)\cos(x)" />, then (dividing by <Katex tex="\sin(x)>0" />) <Katex tex="\cos(x)>\tfrac12" />, and so <Katex tex="x<\tfrac\pi3" />, the common incorrect response. That chain is valid only on <Katex tex="\left(0,\tfrac\pi2\right)" />.</>,
  },
  {
    working: <Katex display tex="x\in\left(0,\tfrac\pi2\right):\quad \sin(x)>0,\ \sin(2x)>0" />,
    reason: <>Here <Katex tex="2x\in(0,\pi)" />, so both sines are positive and both cosecants are positive.</>,
  },
  {
    working: <Katex display tex="\frac{1}{\sin(2x)} < \frac{1}{\sin(x)} \iff \sin(2x) > \sin(x)" />,
    reason: <>For positive numbers, the larger number has the smaller reciprocal (<Katex tex="\tfrac12<\tfrac11" /> because <Katex tex="2>1" />), so the inequality reverses.</>,
  },
  {
    working: <Katex display tex="2\sin(x)\cos(x) > \sin(x) \iff \cos(x) > \tfrac12" />,
    reason: <>Double-angle formula, then divide by <Katex tex="2\sin(x)" />, which is allowed <em>without</em> reversing because <Katex tex="\sin(x)>0" /> on this interval.</>,
  },
  {
    working: <Katex display tex="x \in \left(0,\tfrac\pi3\right)" />,
    reason: <>On <Katex tex="\left(0,\tfrac\pi2\right)" />, <Katex tex="\cos(x)" /> decreases from 1 to 0, passing <Katex tex="\tfrac12" /> at <Katex tex="\tfrac\pi3" />, so <Katex tex="\cos(x)>\tfrac12" /> to the <em>left</em> of <Katex tex="\tfrac\pi3" />. The inequality is strict, so <Katex tex="\tfrac\pi3" /> is excluded.</>,
    more: <>The report lists choosing the incorrect interval in the first quadrant (it prints <Katex tex="\left(\tfrac\pi3,\pi\right)" />) and including endpoints as typical errors. The wrong first-quadrant side is <Katex tex="\left(\tfrac\pi3,\tfrac\pi2\right)" />: there <Katex tex="\cos(x)<\tfrac12" />, so <Katex tex="\sin(2x)<\sin(x)" /> and, both being positive, <Katex tex="\operatorname{cosec}(2x)>\operatorname{cosec}(x)" />, so the inequality fails. (The other half of the printed interval, <Katex tex="\left(\tfrac\pi2,\pi\right)" />, does satisfy it, as the next rows show.) At <Katex tex="\tfrac\pi3" /> the two cosecants are <em>equal</em> (it is a part a. solution), which is why that end is open. The bracket at <Katex tex="0" /> is round because <Katex tex="0" /> is not in the domain.</>,
  },
  {
    working: <Katex display tex="x\in\left(\tfrac\pi2,\pi\right):\quad \sin(x)>0\ \text{but}\ \sin(2x)<0" />,
    reason: <>Now <Katex tex="2x\in(\pi,2\pi)" />, where sine is negative.</>,
  },
  {
    working: <Katex display tex="\operatorname{cosec}(2x) < 0 < \operatorname{cosec}(x)" />,
    reason: <>A negative is always less than a positive, so the whole interval satisfies the inequality, with no algebra needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(0,\tfrac\pi3\right)\cup\left(\tfrac\pi2,\pi\right)}" />,
    reason: <>Combine the two halves. The answer is a union of two open intervals, not a list of values.</>,
    more: <>The common incorrect response <Katex tex="x<\tfrac\pi3" /> misses the whole of <Katex tex="\left(\tfrac\pi2,\pi\right)" />, and the report notes that single-value answers, rather than intervals, were another typical error. A sketch confirms the answer, and the report says high-scoring students argued graphically: on <Katex tex="\left(\tfrac\pi2,\pi\right)" /> the graph of <Katex tex="y=\operatorname{cosec}(2x)" /> lies below the <Katex tex="x" />-axis while <Katex tex="y=\operatorname{cosec}(x)" /> lies above it.</>,
  },
]

export default function SpecialistQ7_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Trig Equation"
        marks={3}
        statement={<>Solve <Katex tex="\sin(2x)=\sin(x)" />, <Katex tex="x\in[0,2\pi]" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="Cancelling sin(x) loses the three meetings on the x-axis">
          <LostRoots />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Trig Inequality"
        marks={2}
        statement={
          <>
            Find{' '}
            <Katex tex="\left\{x:\operatorname{cosec}(2x)<\operatorname{cosec}(x),\ x\in\left(0,\tfrac\pi2\right)\cup\left(\tfrac\pi2,\pi\right)\right\}" />
            .
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            <Katex tex="\operatorname{cosec}(\theta)=\dfrac{1}{\sin(\theta)}" /> is undefined wherever{' '}
            <Katex tex="\sin(\theta)=0" />, and it has the same sign as <Katex tex="\sin(\theta)" />. So{' '}
            <Katex tex="\operatorname{cosec}(2x)" /> has an asymptote at <Katex tex="x=\tfrac\pi2" /> (where{' '}
            <Katex tex="2x=\pi" />), which is why the domain leaves that point out.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="On the right half, cosec(2x) is negative, so it is always the smaller">
          <CosecSigns />
        </Explore>
      </PartCard>
    </div>
  )
}
