// 2020 Specialist Mathematics — Exam 1 Question 9 (5 marks). A parametric curve whose arc
// length integrand collapses to a perfect square. Question text transcribed from the
// original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [16, 35, 49],
  average: 1.3,
  comment: (
    <>
      Students needed to find <Katex tex="\tfrac{dy}{dt}" /> and then square the result. As
      the result was given, students needed to show relevant working rather than just writing
      the answer.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 40, 5, 14],
  average: 0.9,
  comment: (
    <>
      Many students could correctly substitute <Katex tex="\tfrac{dx}{dt}" /> and{' '}
      <Katex tex="\tfrac{dy}{dt}" /> into the formula for the arc length of a curve defined
      parametrically, which is given on the formula sheet. Most students who successfully
      answered this question were able to identify the perfect square, which allowed the
      square root in the integrand to be removed. Few students who tried to write the term
      inside the square root as a single algebraic fraction were able to see the problem
      through to the conclusion. Some students confused{' '}
      <Katex tex="1-t^2" /> with <Katex tex="(1-t)^2" />, which led to incorrect results.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \log_e(1+t)+\tfrac14\log_e(1-t)" />,
    reason: <>Two logs, each needing the chain rule.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dt} = \frac{1}{1+t}+\frac14\cdot\frac{-1}{1-t} = \frac{1}{1+t}-\frac{1}{4(1-t)}" />,
    reason: <>The inner derivative of <Katex tex="1-t" /> is <Katex tex="-1" />, which supplies the minus sign.</>,
  },
  {
    working: <Katex display tex="\left(\frac{dy}{dt}\right)^2 = \frac{1}{(1+t)^2}-2\cdot\frac{1}{1+t}\cdot\frac{1}{4(1-t)}+\frac{1}{16(1-t)^2}" />,
    reason: <>Expanding <Katex tex="(P-Q)^2" /> term by term rather than combining into one fraction first — the target form is already three separate fractions.</>,
  },
  {
    working: <Katex display tex="\frac{2}{4(1+t)(1-t)} = \frac{1}{2\left(1-t^2\right)}" />,
    reason: <>The cross term: <Katex tex="(1+t)(1-t)=1-t^2" />. Note this is <Katex tex="1-t^2" />, not <Katex tex="(1-t)^2" /> — the confusion the report singles out.</>,
  },
  {
    working: <Katex display tex="\left(\frac{dy}{dt}\right)^2 = \frac{1}{(1+t)^2}-\frac{1}{2\left(1-t^2\right)}+\frac{1}{16(1-t)^2}" />,
    reason: <>Assembled.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 1, \quad b = -2, \quad c = 16} \ \checkmark" />,
    reason: <>Matching against <Katex tex="\tfrac{1}{a(1+t)^2}+\tfrac{1}{b\left(1-t^2\right)}+\tfrac{1}{c(1-t)^2}" />: the minus sign is absorbed into <Katex tex="b=-2" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x = \arcsin(t) \implies \frac{dx}{dt} = \frac{1}{\sqrt{1-t^2}} \implies \left(\frac{dx}{dt}\right)^2 = \frac{1}{1-t^2}" />,
    reason: <>The other half of the arc length integrand.</>,
  },
  {
    working: <Katex display tex="s = \int_0^{1/2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>The parametric arc length formula, straight off the formula sheet.</>,
  },
  {
    working: <Katex display tex="\frac{1}{1-t^2}-\frac{1}{2\left(1-t^2\right)} = \frac{1}{2\left(1-t^2\right)}" />,
    reason: <>The two <Katex tex="1-t^2" /> terms combine — and crucially the sign flips from minus to plus, which is what makes a perfect square possible.</>,
  },
  {
    working: <Katex display tex="\text{integrand}^2 = \frac{1}{(1+t)^2}+\frac{1}{2\left(1-t^2\right)}+\frac{1}{16(1-t)^2}" />,
    reason: <>Three terms, all positive.</>,
  },
  {
    working: <Katex display tex="\left(\frac{1}{1+t}+\frac{1}{4(1-t)}\right)^2 = \frac{1}{(1+t)^2}+\frac{2}{4\left(1-t^2\right)}+\frac{1}{16(1-t)^2}" />,
    reason: <>Recognising the perfect square. Do not combine into a single fraction first — the report says almost no one who did got through.</>,
  },
  {
    working: <Katex display tex="s = \int_0^{1/2}\left(\frac{1}{1+t}+\frac{1}{4(1-t)}\right)dt" />,
    reason: <>Both pieces are positive on <Katex tex="\left[0,\tfrac12\right]" />, so the square root is the bracket itself, not its absolute value.</>,
  },
  {
    working: <Katex display tex="= \left[\log_e(1+t)-\tfrac14\log_e(1-t)\right]_0^{1/2}" />,
    reason: <>The <Katex tex="-\tfrac14" /> comes from the inner derivative of <Katex tex="1-t" /> again.</>,
  },
  {
    working: <Katex display tex="= \log_e\!\left(\tfrac32\right)-\tfrac14\log_e\!\left(\tfrac12\right)-0" />,
    reason: <>At <Katex tex="t=\tfrac12" />: <Katex tex="1+t=\tfrac32" /> and <Katex tex="1-t=\tfrac12" />. Both logs vanish at <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{s = \log_e\!\left(\tfrac32\right)+\tfrac14\log_e(2)}" />,
    reason: <><Katex tex="-\log_e\tfrac12=\log_e2" />. So <Katex tex="m=\tfrac32" />, <Katex tex="n=\tfrac14" />, <Katex tex="p=2" />, all rational ✓. About 0.579.</>,
  },
]

export default function SpecialistQ9_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (5 marks)</p>
        <p>Consider the curve defined parametrically by</p>
        <p className="py-1">
          <Katex display tex="x = \arcsin(t)" />
        </p>
        <p className="py-1">
          <Katex display tex="y = \log_e(1+t)+\tfrac14\log_e(1-t)" />
        </p>
        <p>
          where <Katex tex="t\in[0,1)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            <Katex tex="\left(\dfrac{dy}{dt}\right)^2" /> can be written in the form{' '}
            <Katex tex="\dfrac{1}{a(1+t)^2}+\dfrac{1}{b\left(1-t^2\right)}+\dfrac{1}{c(1-t)^2}" />
            , where <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are real
            numbers. Show that <Katex tex="a=1" />, <Katex tex="b=-2" /> and{' '}
            <Katex tex="c=16" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={3}
        statement={
          <>
            Find the arc length, <Katex tex="s" />, of the curve from <Katex tex="t=0" /> to{' '}
            <Katex tex="t=\tfrac12" />. Give your answer in the form{' '}
            <Katex tex="s=\log_e(m)+n\log_e(p)" />, where <Katex tex="m,n,p\in Q" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
