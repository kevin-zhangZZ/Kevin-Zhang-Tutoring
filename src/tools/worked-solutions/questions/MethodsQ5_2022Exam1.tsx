// 2022 Mathematical Methods — Exam 1 Question 5 (5 marks). An exponential equation, then
// the maximal domain of a log of a quadratic. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original. Part b (27% full marks) has an interactive, meth-2022e1-q5b-domain: drag x to see
// that the quadratic inside the log is positive only for x < −1 or x > 3, and a toggle shows
// why writing the two pieces with ∩ gives the empty set. Concise/Detailed review (9 Oct 2026):
// widget kept (it shows exactly the report's two issues: reading the domain off the factors, and
// ∪ vs ∩); reasons trimmed to what a student needs, with the report's traps, checks and the
// "why log needs a positive input" explanation moved into each row's `more`. The report's "100
// as 1010" is VCAA's own typesetting of 10^10 and is kept verbatim. Final review (9 Oct): b's
// `more` no longer restates the report or the widget's sign Notice; widget tick labels −1/3 moved
// clear of the open circles and the ∩ Notice refers to the draggable point, not a dashed line.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const DomainWidget = lazyWidget(() => import('../interactives/meth-2022e1-q5b-domain'))

const EXAM_A: SAExaminerStats = {
  marks: [6, 18, 76],
  average: 1.7,
  comment: <>Generally, this question was well done but a number of students incorrectly wrote 100 as 1010.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 13, 30, 27],
  average: 1.6,
  comment: (
    <>
      Generally, this question was well done. Many students knew to factorise the quadratic to
      help them answer the question, but were not always able to use this to reason the
      correct domain. Those who sketched the parabola were usually able to determine the
      intervals. A common error was writing the interval as an intersection not a union,{' '}
      <Katex tex="(-\infty,-1)\cup(3,\infty)" />. Students need to practise using correct
      mathematical notation.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="10^{3x-13} = 100 = 10^2" />,
    reason: (
      <>
        Write both sides as powers of the same base, 10, so no logarithms are needed:{' '}
        <Katex tex="100 = 10\times10 = 10^2" />.
      </>
    ),
    more: (
      <>
        The report notes that some students wrote 100 as <Katex tex="10^{10}" />. But <Katex tex="10^{10}" /> is 10
        multiplied by itself ten times, a 1 followed by ten zeros. The power counts the zeros:{' '}
        <Katex tex="100" /> has two, so it is <Katex tex="10^2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="3x-13 = 2" />,
    reason: <>Two powers of 10 are equal only when their exponents are equal (<Katex tex="y=10^u" /> is one-to-one).</>,
  },
  {
    working: <Katex display tex="3x = 15 \implies \boxed{x = 5}" />,
    reason: <>Add 13 to both sides, then divide by 3.</>,
    more: (
      <>
        Check by substituting back: <Katex tex="10^{3(5)-13}=10^{2}=100" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Need } x^2-2x-3>0" />,
    reason: (
      <>
        The maximal domain is every <Katex tex="x" /> for which <Katex tex="f(x)" /> can be calculated.{' '}
        <Katex tex="\log_e" /> only accepts positive inputs (<Katex tex="\log_e(0)" /> is undefined too), so the
        quadratic inside it must be <Katex tex=">0" />.
      </>
    ),
    more: (
      <>
        Why only positive inputs? <Katex tex="\log_e(a)" /> is the power you raise <Katex tex="e" /> to in order to
        get <Katex tex="a" />. Every power of <Katex tex="e" /> is positive (<Katex tex="e^{y}>0" /> for every{' '}
        <Katex tex="y" />), so no power of <Katex tex="e" /> gives 0 or a negative number, and{' '}
        <Katex tex="\log_e(a)" /> has no value unless <Katex tex="a>0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x^2-2x-3 = (x-3)(x+1)" />,
    reason: (
      <>
        Find two numbers that multiply to <Katex tex="-3" /> and add to <Katex tex="-2" />: they are{' '}
        <Katex tex="-3" /> and <Katex tex="1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="(x-3)(x+1)>0 \iff x<-1 \text{ or } x>3" />,
    reason: (
      <>
        Sketch <Katex tex="y=(x-3)(x+1)" />: an upright parabola (the <Katex tex="x^2" /> term is positive) cutting
        the <Katex tex="x" />-axis at <Katex tex="-1" /> and <Katex tex="3" />. It is above the axis (positive) only to the left of{' '}
        <Katex tex="-1" /> and to the right of <Katex tex="3" />. At <Katex tex="-1" /> and <Katex tex="3" /> it
        equals 0, which is not greater than 0, so those two values are left out.
      </>
    ),
    more: (
      <>
        <p>
          This is the step the report says many students missed: they factorised, but couldn&apos;t turn the factors
          into the domain. The sketch is what does that.
        </p>
        <p>
          Check with a test point in each region. Middle: <Katex tex="x=0" /> gives{' '}
          <Katex tex="(0-3)(0+1)=-3<0" />, so the middle is excluded. Outside: <Katex tex="x=4" /> gives{' '}
          <Katex tex="(1)(5)=5>0" /> and <Katex tex="x=-2" /> gives <Katex tex="(-5)(-1)=5>0" />, so both outer
          pieces are included.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(-\infty,-1)\cup(3,\infty)}" />,
    reason: (
      <>
        Round brackets because <Katex tex="-1" /> and <Katex tex="3" /> are not included. The domain is every{' '}
        <Katex tex="x" /> in <em>either</em> piece, so the two pieces are joined with a union,{' '}
        <Katex tex="\cup" /> (&ldquo;or&rdquo;).
      </>
    ),
    more: (
      <>
        The common error in the report was writing an intersection, <Katex tex="\cap" />, instead (the interval the
        report prints, with <Katex tex="\cup" />, is the correct answer). But{' '}
        <Katex tex="\cap" /> means &ldquo;in both at once&rdquo;, and no <Katex tex="x" /> is both less than{' '}
        <Katex tex="-1" /> and greater than 3, so <Katex tex="(-\infty,-1)\cap(3,\infty)" /> is the empty set: it
        would say <Katex tex="f" /> has no domain at all. Another correct way to write the answer is{' '}
        <Katex tex="R\setminus[-1,3]" />, every real number except those from <Katex tex="-1" /> to 3 inclusive.
      </>
    ),
  },
]

export default function MethodsQ5_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Exponential Equation"
        marks={2}
        statement={
          <>
            Solve <Katex tex="10^{3x-13}=100" /> for <Katex tex="x" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Maximal Domain"
        marks={3}
        statement={
          <>
            Find the maximal domain of <Katex tex="f" />, where{' '}
            <Katex tex="f(x)=\log_e\left(x^2-2x-3\right)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="f only exists where the parabola is above the axis: two separate pieces, joined by ∪">
          <DomainWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
