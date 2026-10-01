// 2021 Mathematical Methods — Exam 1 Question 1 (3 marks). A chain rule on an exponential,
// then a product rule with a square root evaluated at a point. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      This question was well answered. Most students accurately and confidently applied the
      chain rule and knew how to differentiate the exponential.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 28, 43],
  average: 1.2,
  comment: (
    <>
      Students generally handled this question well, applying the product rule to give the
      derivative. A common error was not differentiating the <Katex tex="2x" /> within{' '}
      <Katex tex="\sqrt{2x+1}" />. The evaluation of the derived function involved evaluating
      square roots and this caused problems for some.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = 2e^{-3x}" />,
    reason: (
      <>
        The 2 is a constant multiplier, so it just stays in front. The power of{' '}
        <Katex tex="e" /> is <Katex tex="-3x" />, not plain <Katex tex="x" />, so the chain rule
        applies: <Katex tex="e^{-3x}" /> differentiates to itself times the derivative of its
        power.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2\times(-3)e^{-3x}" />,
    reason: (
      <>
        The rule <Katex tex="\frac{d}{dx}e^{ax}=ae^{ax}" /> (on the formula sheet), with{' '}
        <Katex tex="a=-3" />, the derivative of the power <Katex tex="-3x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -6e^{-3x}}" />,
    reason: (
      <>
        <Katex tex="2\times(-3)=-6" />. The report also accepts the equivalent form{' '}
        <Katex tex="-\dfrac{6}{e^{3x}}" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x\sqrt{2x+1} = x(2x+1)^{\frac12}" />,
    reason: (
      <>
        <Katex tex="f" /> is <Katex tex="x" /> multiplied by <Katex tex="\sqrt{2x+1}" />: two
        functions of <Katex tex="x" /> multiplied together, so use the product rule (on the
        formula sheet). Rewriting the square root as a power of <Katex tex="\tfrac12" /> lets
        you differentiate it with the power rule.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="u=x,\quad v=(2x+1)^{\frac12}" />
        <Katex display tex="u'=1,\quad v'=\tfrac12(2x+1)^{-\frac12}\times 2" />
        <Katex display tex="v'=(2x+1)^{-\frac12}" />
      </>
    ),
    reason: (
      <>
        Name the two factors and differentiate each <em>before</em> substituting. Inside{' '}
        <Katex tex="v" /> is <Katex tex="2x+1" />, not plain <Katex tex="x" />, so use the chain
        rule: bring down the <Katex tex="\tfrac12" />, lower the power by 1, then multiply by
        the derivative of the inside, <Katex tex="2" />. The report notes a common error was not
        differentiating the <Katex tex="2x" /> within <Katex tex="\sqrt{2x+1}" />. Dropping
        that <Katex tex="\times2" /> leaves an extra <Katex tex="\tfrac12" /> in{' '}
        <Katex tex="v'" /> and leads to <Katex tex="\tfrac{11}{3}" /> instead of the correct
        answer.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="f'(x) = u'v+uv' = (2x+1)^{\frac12}+x(2x+1)^{-\frac12}" />
        <Katex display tex="= \sqrt{2x+1}+\frac{x}{\sqrt{2x+1}}" />
      </>
    ),
    reason: (
      <>
        The formula sheet writes the product rule as{' '}
        <Katex tex="u\frac{dv}{dx}+v\frac{du}{dx}" />, the same two terms in a different order.
        A power of <Katex tex="-\tfrac12" /> means one over the square root.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="= \frac{(2x+1)+x}{\sqrt{2x+1}}" />
        <Katex display tex="= \frac{3x+1}{\sqrt{2x+1}}" />
      </>
    ),
    reason: (
      <>
        An optional tidy-up, giving the form in the report. Put the first term over{' '}
        <Katex tex="\sqrt{2x+1}" /> too: multiply it top and bottom by{' '}
        <Katex tex="\sqrt{2x+1}" />, and a square root times itself is just what is inside,{' '}
        <Katex tex="2x+1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(4) = \frac{3(4)+1}{\sqrt{2(4)+1}} = \frac{13}{\sqrt9} = \frac{13}{3}" />,
    reason: (
      <>
        Work out the inside of the square root first: <Katex tex="2(4)+1=9" />, and{' '}
        <Katex tex="\sqrt9=3" /> exactly. The report says evaluating the square roots caused
        problems for some. Check with the untidied line instead:{' '}
        <Katex tex="\sqrt9+\tfrac{4}{\sqrt9}=3+\tfrac43=\tfrac{13}{3}" /> ✓.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'(4) = \tfrac{13}{3}}" />,
    reason: <>An exact value, as Exam 1 requires (not the decimal <Katex tex="4.33" />).</>,
  },
]

export default function MethodsQ1_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Chain Rule"
        marks={1}
        statement={
          <>
            Differentiate <Katex tex="y=2e^{-3x}" /> with respect to <Katex tex="x" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Product Rule"
        marks={2}
        statement={
          <>
            Evaluate <Katex tex="f'(4)" />, where <Katex tex="f(x)=x\sqrt{2x+1}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
