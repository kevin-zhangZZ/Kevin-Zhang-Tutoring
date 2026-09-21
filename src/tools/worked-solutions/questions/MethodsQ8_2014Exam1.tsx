// 2014 Mathematical Methods (CAS) — Exam 1, Question 8 (4 marks). The median of an
// exponential probability density function, then a conditional probability using it.
// Question text transcribed from the original paper (no diagram given). Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [32, 25, 43],
  average: 1.1,
  comment: (
    <>
      While most students knew to set up a definite integral involving <Katex tex="m" /> and
      equate it to <Katex tex="\tfrac12" />, errors with mishandling negatives in the
      antidifferentiation, or problems with algebraic skills in solving an indicial equation,
      worked against progress. Some students confused median with the mean or the law of
      total probability.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [48, 28, 24],
  average: 0.8,
  comment: (
    <>
      This question was not well handled. The most common error was assuming that the value
      of <Katex tex="m" /> obtained in part a. was equivalent to{' '}
      <Katex tex="\Pr(X\le m)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^m \tfrac15 e^{-x/5}\,dx = \tfrac12" />,
    reason: <>The median splits the distribution in half — half the probability lies below it.</>,
  },
  {
    working: <Katex display tex="\int \tfrac15 e^{-x/5}\,dx = -e^{-x/5}" />,
    reason: <>The chain rule brings out a factor of <Katex tex="-5" />, which cancels the <Katex tex="\tfrac15" />. The sign here is where the report says marks went.</>,
  },
  {
    working: <Katex display tex="\left[-e^{-x/5}\right]_0^m = -e^{-m/5}+1 = \tfrac12" />,
    reason: <>At the lower terminal <Katex tex="-e^0=-1" />.</>,
  },
  {
    working: <Katex display tex="e^{-m/5} = \tfrac12" />,
    reason: <>Rearranging.</>,
  },
  {
    working: <Katex display tex="-\tfrac m5 = \log_e\!\left(\tfrac12\right) = -\log_e(2)" />,
    reason: <>Taking logarithms of both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 5\log_e(2)}" />,
    reason: <>Equivalently <Katex tex="\log_e(32)" />. Numerically <Katex tex="3.47" />, which is indeed greater than 1 as part b. states.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<1\mid X\le m) = \frac{\Pr\bigl(X<1 \cap X\le m\bigr)}{\Pr(X\le m)}" />,
    reason: <>The conditional probability formula.</>,
  },
  {
    working: <Katex display tex="m > 1 \implies \Pr\bigl(X<1\cap X\le m\bigr) = \Pr(X<1)" />,
    reason: <>That is what the hint "<Katex tex="m" /> is a number greater than 1" is for: the event <Katex tex="X<1" /> sits entirely inside <Katex tex="X\le m" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\le m) = \tfrac12" />,
    reason: <>By the definition of the median — <em>not</em> the value of <Katex tex="m" /> itself, which is the report's headline error.</>,
  },
  {
    working: <Katex display tex="\Pr(X<1) = \int_0^1\tfrac15 e^{-x/5}\,dx = \left[-e^{-x/5}\right]_0^1 = 1-e^{-1/5}" />,
    reason: <>The same antiderivative as part a., with terminals 0 and 1.</>,
  },
  {
    working: <Katex display tex="\Pr(X<1\mid X\le m) = \frac{1-e^{-1/5}}{\tfrac12}" />,
    reason: <>Dividing by <Katex tex="\tfrac12" /> is multiplying by 2.</>,
  },
  {
    working: <Katex display tex="\boxed{2\left(1-e^{-1/5}\right)}" />,
    reason: <>About <Katex tex="0.363" /> — bigger than <Katex tex="\Pr(X<1)\approx0.181" />, as a conditional probability restricted to a smaller sample space should be.</>,
  },
]

export default function MethodsQ8_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (4 marks)</p>
        <p>
          A continuous random variable, <Katex tex="X" />, has a probability density function
          given by
        </p>
        <div>
          <Katex
            display
            tex="f(x)=\begin{cases}\tfrac15 e^{-x/5} & x\ge0\\ 0 & x<0\end{cases}"
          />
        </div>
        <p>
          The median of <Katex tex="X" /> is <Katex tex="m" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={<>Determine the value of <Katex tex="m" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            The value of <Katex tex="m" /> is a number greater than 1. Find{' '}
            <Katex tex="\Pr(X<1\mid X\le m)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
