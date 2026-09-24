// 2021 Mathematical Methods — Exam 1 Question 7 (3 marks). A probability density function
// normalised to find k, then its mean. Question text transcribed from the original paper.
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [52, 48],
  average: 0.5,
  comment: (
    <>
      Most students could set up an integral, with correct terminals, equal to one.
      Occasionally the antiderivative was written as a logarithm, but generally students were
      able to correctly anti-differentiate the function. This was a 'show that' question and
      generally the solution process was clear, logical and well-explained. The{' '}
      <Katex tex="dx" /> was rarely missing.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [51, 10, 39],
  average: 0.9,
  comment: (
    <>
      This was generally well answered, although some formed the integral of{' '}
      <Katex tex="f(x)" /> rather than <Katex tex="xf(x)" />. Common errors involved not
      recognising <Katex tex="\log_e(1)=0" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-\infty}^{\infty}f(x)\,dx = 1" />,
    reason: <>The defining property of a probability density function.</>,
  },
  {
    working: <Katex display tex="\int_1^2\frac{k}{x^2}\,dx = 1" />,
    reason: <>The function is zero outside <Katex tex="[1,2]" />, so only that interval contributes.</>,
  },
  {
    working: <Katex display tex="\int_1^2 kx^{-2}\,dx = \left[-\frac{k}{x}\right]_1^2" />,
    reason: <>The power rule with index <Katex tex="-2" />, not a logarithm — that is only for <Katex tex="x^{-1}" />.</>,
  },
  {
    working: <Katex display tex="= -\frac{k}{2}+k = \frac{k}{2}" />,
    reason: <>Substituting the terminals.</>,
  },
  {
    working: <Katex display tex="\frac{k}{2} = 1 \implies \boxed{k = 2}" />,
    reason: <>As required — shown, not assumed. And <Katex tex="k=2>0" />, consistent with "<Katex tex="k" /> is a positive real number".</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = \int_1^2 x\,f(x)\,dx" />,
    reason: <>The extra factor of <Katex tex="x" /> is what makes this a mean rather than a total probability.</>,
  },
  {
    working: <Katex display tex="= \int_1^2 x\cdot\frac{2}{x^2}\,dx = \int_1^2\frac{2}{x}\,dx" />,
    reason: <>Now the integrand <em>is</em> a reciprocal, so the antiderivative is a logarithm after all.</>,
  },
  {
    working: <Katex display tex="= 2\left[\log_e(x)\right]_1^2 = 2\left(\log_e(2)-\log_e(1)\right)" />,
    reason: <><Katex tex="x>0" /> throughout, so no absolute value is needed.</>,
  },
  {
    working: <Katex display tex="\log_e(1) = 0" />,
    reason: <>The report lists not recognising <Katex tex="\log_e(1)=0" /> among the common errors.</>,
  },
  {
    working: <Katex display tex="\boxed{E(X) = 2\log_e(2) = \log_e(4)}" />,
    reason: <>About 1.386 — comfortably inside <Katex tex="[1,2]" />, and below the midpoint 1.5 because the density is heavier near <Katex tex="x=1" /> ✓.</>,
  },
]

export default function MethodsQ7_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (3 marks)</p>
        <p>
          A random variable <Katex tex="X" /> has the probability density function{' '}
          <Katex tex="f" /> given by
        </p>
        <p className="py-1">
          <Katex
            display
            tex="f(x)=\begin{cases}\dfrac{k}{x^2}, & 1\le x\le2\\[6pt] 0, & \text{elsewhere}\end{cases}"
          />
        </p>
        <p>
          where <Katex tex="k" /> is a positive real number.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Continuous PDF"
        marks={1}
        statement={<>Show that <Katex tex="k=2" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Mean of PDF" marks={2} statement={<>Find <Katex tex="E(X)" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
