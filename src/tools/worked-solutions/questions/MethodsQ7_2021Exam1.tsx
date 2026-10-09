// 2021 Mathematical Methods — Exam 1 Question 7 (3 marks). A probability density function
// normalised to find k, then its mean. Question text transcribed from the original paper.
// Answers checked with sympy and against the VCAA examination report. Solution is original.
// Interactive (interactives/meth-2021e1-q7b-strips): b. E(X) as a sum of value × probability over
// thin strips — why E(X) needs the integral of x f(x), not f(x) (the report's slip).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const StripsWidget = lazyWidget(() => import('../interactives/meth-2021e1-q7b-strips'))

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
    reason: <>The defining property of a probability density function: the total area under it is 1 (the total probability).</>,
  },
  {
    working: <Katex display tex="\int_1^2\frac{k}{x^2}\,dx = 1" />,
    reason: <>The function is zero outside <Katex tex="[1,2]" />, so only that interval contributes.</>,
  },
  {
    working: <Katex display tex="\int_1^2 kx^{-2}\,dx = \left[-\frac{k}{x}\right]_1^2" />,
    reason: (
      <>
        Rewrite <Katex tex="\tfrac{k}{x^2}" /> as <Katex tex="kx^{-2}" /> and use the power rule: add 1 to the index
        and divide by the new index, <Katex tex="\tfrac{kx^{-1}}{-1} = -\tfrac{k}{x}" />. It is not a logarithm: a
        logarithm only comes from <Katex tex="x^{-1}" />, the one power the rule can&apos;t handle.
      </>
    ),
  },
  {
    working: <Katex display tex="= \left(-\frac{k}{2}\right)-\left(-\frac{k}{1}\right) = \frac{k}{2}" />,
    reason: <>Upper terminal minus lower terminal. Take care with the double negative: <Katex tex="-\tfrac{k}{2}+k=\tfrac{k}{2}" />.</>,
  },
  {
    working: <Katex display tex="\frac{k}{2} = 1 \implies k = 2" />,
    reason: (
      <>
        Solve for <Katex tex="k" />; the value{' '}
        <Katex tex="k=2" /> is positive, as the question requires. As required.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = \int_1^2 x\,f(x)\,dx" />,
    reason: (
      <>
        The mean of a continuous random variable is <Katex tex="\int x\,f(x)\,dx" /> over the interval where{' '}
        <Katex tex="f" /> is non-zero, here <Katex tex="[1,2]" />. It is the continuous version of{' '}
        <Katex tex="E(X)=\sum x\Pr(X=x)" />: each value <Katex tex="x" /> times its probability{' '}
        <Katex tex="f(x)\,dx" />. Don&apos;t drop the <Katex tex="x" />: <Katex tex="\int_1^2 f(x)\,dx" /> is just
        the total probability, 1, from part (a).
      </>
    ),
    more: (
      <>
        The diagram below shows why the <Katex tex="x" /> is needed.
      </>
    ),
  },
  {
    working: <Katex display tex="= \int_1^2 x\cdot\frac{2}{x^2}\,dx = \int_1^2\frac{2}{x}\,dx" />,
    reason: <>Use <Katex tex="f(x)=\tfrac{2}{x^2}" /> (<Katex tex="k=2" /> from part (a)) and cancel one <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="= 2\left[\log_e(x)\right]_1^2 = 2\left(\log_e(2)-\log_e(1)\right)" />,
    reason: (
      <>
        This time the integrand is <Katex tex="2x^{-1}" />, so the antiderivative <em>is</em> a logarithm:{' '}
        <Katex tex="\int \tfrac{1}{x}\,dx = \log_e(x)" /> for <Katex tex="x>0" />, which holds on{' '}
        <Katex tex="[1,2]" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= 2\left(\log_e(2)-0\right)" />,
    reason: (
      <>
        <Katex tex="\log_e(1)=0" /> because <Katex tex="e^0=1" />. The report lists not recognising{' '}
        <Katex tex="\log_e(1)=0" /> among the common errors.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{E(X) = 2\log_e(2) = \log_e(4)}" />,
    reason: (
      <>
        Either form is fine; <Katex tex="\log_e(4)" /> uses the log law <Katex tex="n\log_e(a)=\log_e(a^n)" />. Sense
        check: <Katex tex="\log_e(2)\approx0.69" />, so <Katex tex="E(X)\approx1.39" />. That is inside{' '}
        <Katex tex="[1,2]" /> and below the midpoint 1.5, as it should be: <Katex tex="f(1)=2" /> but{' '}
        <Katex tex="f(2)=0.5" />, so <Katex tex="X" /> is more likely to take values near 1.
      </>
    ),
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
        <Explore title="Why the mean needs the extra x: E(X) adds up value × probability, strip by strip">
          <StripsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
