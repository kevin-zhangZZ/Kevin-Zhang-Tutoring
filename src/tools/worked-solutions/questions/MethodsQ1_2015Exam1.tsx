// 2015 Mathematical Methods (CAS) — Exam 1, Question 1 (4 marks).
// A chain rule, then a quotient rule with a logarithm. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>Most students correctly applied the chain rule. The most common errors were arithmetical.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [10, 18, 72],
  average: 1.6,
  comment: (
    <>
      The majority of students used the quotient rule and this was the most direct method.
      Many students experienced difficulty in simplifying their derived expressions, to the
      point where some final answers involved fractions within a fraction.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: (
    <>
      This question was well handled. However, some students who correctly identified the
      required derivative in Question 1b.i. could not evaluate{' '}
      <Katex tex="2\log_e(1)=2(0)=0" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = 7(5x+1)^6\times5" />,
    reason: <>Chain rule: bring the power down, reduce it by one, then multiply by the derivative of the inside, <Katex tex="5x+1" />.</>,
    more: (
      <>
        The report says the common errors were arithmetical. The usual slips: forgetting the
        factor of <Katex tex="5" /> from the inside, or dropping the power to <Katex tex="5" /> instead
        of <Katex tex="6" />. Check: the power falls by exactly one, and the constant out the front
        is <Katex tex="7\times5" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 35(5x+1)^6}" />,
    reason: <><Katex tex="7\times5=35" />. Leave it factorised — expanding a sixth power gains nothing and loses time.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="u = \log_e(x), \quad v = x^2 \implies u' = \frac1x, \quad v' = 2x" />,
    reason: <><Katex tex="f" /> is one function divided by another, so use the quotient rule. Name the top <Katex tex="u" /> and the bottom <Katex tex="v" />, and differentiate each.</>,
    more: (
      <>
        The product rule on <Katex tex="\log_e(x)\cdot x^{-2}" /> also works, giving{' '}
        <Katex tex="\frac1x\cdot x^{-2} - 2x^{-3}\log_e(x)" />, the same answer, but it leaves negative
        indices to tidy. The report calls the quotient rule the most direct method.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = \frac{x^2\cdot\frac1x-\log_e(x)\cdot2x}{x^4}" />,
    reason: <>Bottom times derivative of top, minus top times derivative of bottom, all over the bottom squared.</>,
  },
  {
    working: <Katex display tex="= \frac{x-2x\log_e(x)}{x^4} = \frac{x\bigl(1-2\log_e(x)\bigr)}{x^4}" />,
    reason: <>Tidy the numerator first: <Katex tex="x^2\cdot\frac1x = x" />. Then both terms share a factor of <Katex tex="x" />, so take it out.</>,
    more: (
      <>
        The report says some final answers were left as a fraction within a fraction. That happens when the
        numerator still contains a <Katex tex="\frac1x" />, e.g. leaving{' '}
        <Katex tex="x^2\cdot\frac1x" /> unsimplified on top of <Katex tex="x^4" />. Simplify the numerator to whole terms, factor, then
        cancel — the final answer should be one fraction.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{1-2\log_e(x)}{x^3}}" />,
    reason: <>Cancel one factor of <Katex tex="x" /> from top and bottom: <Katex tex="\frac{x}{x^4}=\frac1{x^3}" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(1) = \frac{1-2\log_e(1)}{1^3}" />,
    reason: <>Substitute <Katex tex="x=1" /> into the simplified derivative from part b.i.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(1) = 1}" />,
    reason: <><Katex tex="\log_e(1)=0" /> because <Katex tex="e^0=1" />, so the numerator is <Katex tex="1-0=1" />.</>,
    more: (
      <>
        The report notes some students with the right derivative could not evaluate{' '}
        <Katex tex="2\log_e(1)" />. Remember <Katex tex="\log_e(1)=0" /> (not <Katex tex="1" />, which
        is <Katex tex="\log_e(e)" />). Sense check: <Katex tex="f(1)=0" />, and for <Katex tex="x" /> slightly
        bigger than <Katex tex="1" />, <Katex tex="\log_e(x)>0" /> so <Katex tex="f(x)>0" />. The graph
        is going up at <Katex tex="x=1" />, so a positive gradient makes sense.
      </>
    ),
  },
]

export default function MethodsQ1_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Chain Rule"
        marks={1}
        statement={
          <>
            Let <Katex tex="y=(5x+1)^7" />. Find <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Quotient Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="f(x)=\dfrac{\log_e(x)}{x^2}" />. Find <Katex tex="f'(x)" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" topic="Evaluate Derivative" marks={1} statement={<>Evaluate <Katex tex="f'(1)" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
