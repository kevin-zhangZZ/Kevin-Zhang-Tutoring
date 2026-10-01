// 2022 Mathematical Methods — Exam 1 Question 5 (5 marks). An exponential equation, then
// the maximal domain of a log of a quadratic. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original. Part b (27% full marks) has an interactive, meth-2022e1-q5b-domain: drag x to see
// that the quadratic inside the log is positive only for x < −1 or x > 3, and a toggle shows
// why writing the two pieces with ∩ gives the empty set.

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
        Write both sides as powers of the same base, so no logarithms are needed.{' '}
        <Katex tex="100 = 10\times10 = 10^2" />, not <Katex tex="10^{10}" /> (a slip the examiners noted).
      </>
    ),
  },
  {
    working: <Katex display tex="3x-13 = 2" />,
    reason: <>Two powers of 10 are equal only when their exponents are equal (<Katex tex="y=10^u" /> is one-to-one).</>,
  },
  {
    working: <Katex display tex="3x = 15 \implies \boxed{x = 5}" />,
    reason: <>Add 13 to both sides, then divide by 3. Check: <Katex tex="10^{3(5)-13}=10^2=100" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Need } x^2-2x-3>0" />,
    reason: (
      <>
        The maximal domain is every <Katex tex="x" /> for which <Katex tex="f(x)" /> can be calculated.{' '}
        <Katex tex="\log_e" /> only accepts positive inputs, so the quadratic inside it must be strictly greater than
        zero: <Katex tex="\log_e(0)" /> is undefined too.
      </>
    ),
  },
  {
    working: <Katex display tex="x^2-2x-3 = (x-3)(x+1)" />,
    reason: <>Factorising: <Katex tex="-3\times1=-3" /> and <Katex tex="-3+1=-2" />.</>,
  },
  {
    working: <Katex display tex="(x-3)(x+1)>0 \iff x<-1 \text{ or } x>3" />,
    reason: (
      <>
        Sketch <Katex tex="y=(x-3)(x+1)" />: an upright parabola cutting the <Katex tex="x" />-axis at{' '}
        <Katex tex="-1" /> and <Katex tex="3" />. It is above the axis (positive) to the left of <Katex tex="-1" /> and
        to the right of <Katex tex="3" />, and below the axis between them. Test a point to be sure:{' '}
        <Katex tex="x=0" /> gives <Katex tex="(-3)(1)=-3<0" />, so the middle is excluded. At <Katex tex="x=-1" /> and{' '}
        <Katex tex="x=3" /> the quadratic equals 0, which is not greater than 0, so the roots are excluded too.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(-\infty,-1)\cup(3,\infty)}" />,
    reason: (
      <>
        Round brackets because <Katex tex="-1" /> and <Katex tex="3" /> are not included. The domain is every{' '}
        <Katex tex="x" /> in <em>either</em> piece, so join them with a union, <Katex tex="\cup" />. An
        intersection, <Katex tex="\cap" />, means &ldquo;in both at once&rdquo;, and no <Katex tex="x" /> is both less
        than <Katex tex="-1" /> and greater than 3, so <Katex tex="\cap" /> gives the empty set. Equivalently, the
        domain is <Katex tex="R\setminus[-1,3]" />.
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
