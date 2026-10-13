// 2014 Mathematical Methods (CAS) — Exam 1, Question 8 (4 marks). The median of an
// exponential probability density function, then a conditional probability using it.
// Question text transcribed from the original paper (no diagram given). Answers checked with
// sympy and against the VCAA examination report. Solution is original.
// Interactive (Detailed only): part b. (24% full marks) — the conditional probability as a ratio of
// two areas, with a toggle for the report's common error of dividing by m. Part a. does not qualify.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const AreasWidget = lazyWidget(() => import('../interactives/meth-2014e1-q8b-areas'))

const EXAM_A: SAExaminerStats = {
  marks: [32, 25, 43],
  average: 1.1,
  comment: (
    <>
      While most students knew to set up a definite integral involving <Katex tex="m" />{' '}
      (median) and equating to <Katex tex="\tfrac12" />, errors with mishandling negatives in
      the anti-differentiation or problems with algebraic skills in solving an indicial
      equation worked against progress in obtaining the correct answer. Some students
      confused median with the mean or the law of total probability.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [48, 28, 24],
  average: 0.8,
  comment: (
    <>
      This question was not well handled. The most common error was assuming that the value
      of <Katex tex="m" /> (obtained in part a.) was equivalent to{' '}
      <Katex tex="\Pr(X\le m)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^m \tfrac15 e^{-x/5}\,dx = \tfrac12" />,
    reason: <>The median splits the distribution in half: the area under the density from 0 (where it starts) up to <Katex tex="m" /> is <Katex tex="\tfrac12" />.</>,
    more: <>The report notes some students confused the median with the mean or the law of total probability. The mean is <Katex tex="\int_0^\infty x\,f(x)\,dx" /> (here it is 5, a different number); the total-probability fact <Katex tex="\int_0^\infty f(x)\,dx=1" /> holds for every density and contains no <Katex tex="m" />, so it cannot find the median.</>,
  },
  {
    working: <Katex display tex="\int \tfrac15 e^{-x/5}\,dx = -e^{-x/5}" />,
    reason: <>An antiderivative of <Katex tex="e^{-x/5}" /> is <Katex tex="-5e^{-x/5}" /> (divide by <Katex tex="-\tfrac15" />, the coefficient of <Katex tex="x" /> in the power); times <Katex tex="\tfrac15" /> gives <Katex tex="-e^{-x/5}" />.</>,
    more: <>Check by differentiating: <Katex tex="\tfrac{d}{dx}\left(-e^{-x/5}\right)=\tfrac15e^{-x/5}" />. The report says marks were lost mishandling negatives in this antidifferentiation. Dropping the minus sign leads to <Katex tex="e^{-m/5}-1=\tfrac12" />, so <Katex tex="e^{-m/5}=\tfrac32" /> and <Katex tex="m=-5\log_e\!\left(\tfrac32\right)\approx-2.03" />, a negative median for a variable that is never negative. That should have flagged the error.</>,
  },
  {
    working: <Katex display tex="\left[-e^{-x/5}\right]_0^m = -e^{-m/5}+1 = \tfrac12" />,
    reason: <>Upper terminal minus lower: <Katex tex="-e^{-m/5}-\left(-e^{0}\right)=-e^{-m/5}+1" />, since <Katex tex="e^0=1" />.</>,
  },
  {
    working: <Katex display tex="e^{-m/5} = \tfrac12" />,
    reason: <>Subtract 1 from both sides, <Katex tex="-e^{-m/5}=-\tfrac12" />, then multiply by <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="-\tfrac m5 = \log_e\!\left(\tfrac12\right) = -\log_e(2)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides to bring the power down; <Katex tex="\log_e\!\left(\tfrac12\right)=-\log_e(2)" /> by the log law <Katex tex="\log_e\!\left(\tfrac1a\right)=-\log_e(a)" />.</>,
    more: <>The report's "indicial equation" means an equation with the unknown in the index (power), like <Katex tex="e^{-m/5}=\tfrac12" />. Logarithms are the tool that undoes the exponential.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 5\log_e(2)}" />,
    reason: <>Multiply both sides by <Katex tex="-5" />. Leave it exact, as Exam 1 is technology-free.</>,
    more: <>The report's sample answer also gives the equivalent forms <Katex tex="-5\log_e\!\left(\tfrac12\right)" /> and <Katex tex="\log_e(32)" /> (since <Katex tex="5\log_e(2)=\log_e(2^5)" />). Numerically <Katex tex="m\approx3.47" />, which is indeed greater than 1, as part b. states.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<1\mid X\le m) = \frac{\Pr\bigl(X<1 \cap X\le m\bigr)}{\Pr(X\le m)}" />,
    reason: <>The conditional probability formula <Katex tex="\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}" />, with <Katex tex="A" /> the event <Katex tex="X<1" /> and <Katex tex="B" /> the event <Katex tex="X\le m" />.</>,
  },
  {
    working: <Katex display tex="m > 1 \implies \Pr\bigl(X<1\cap X\le m\bigr) = \Pr(X<1)" />,
    reason: <>That is what the hint "<Katex tex="m" /> is a number greater than 1" is for: the event <Katex tex="X<1" /> sits entirely inside <Katex tex="X\le m" />.</>,
    more: <>Both events are intervals on the <Katex tex="x" />-axis: <Katex tex="[0,1)" /> lies inside <Katex tex="[0,m]" /> because <Katex tex="1<m" />. Had <Katex tex="m" /> been less than 1, the overlap would instead be <Katex tex="X\le m" /> and the answer would be 1.</>,
  },
  {
    working: <Katex display tex="\Pr(X\le m) = \tfrac12" />,
    reason: <>Half the probability lies below the median: the definition used in part a. The value of <Katex tex="m" /> is not needed here.</>,
    more: <>The report's most common error was taking <Katex tex="\Pr(X\le m)" /> to be <Katex tex="m" /> itself. But <Katex tex="m\approx3.47" /> is a value of <Katex tex="X" /> (a place on the <Katex tex="x" />-axis), while <Katex tex="\Pr(X\le m)" /> is an area under the density, always between 0 and 1. Dividing by <Katex tex="m" /> gives <Katex tex="\frac{1-e^{-1/5}}{5\log_e(2)}\approx0.052" />, which is smaller than <Katex tex="\Pr(X<1)=1-e^{-1/5}\approx0.181" /> (worked out in the next row): impossible, as the last row explains. The report's general comments also note many students did not extend the concepts of part a. to part b.; this row is exactly that link.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(X<1) &= \int_0^1\tfrac15 e^{-x/5}\,dx \\ &= \left[-e^{-x/5}\right]_0^1 \\ &= 1-e^{-1/5}\end{aligned}" />,
    reason: <>The same antiderivative as part a., with terminals 0 and 1: <Katex tex="-e^{-1/5}-(-e^0)" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X<1\mid X\le m) = \frac{1-e^{-1/5}}{\tfrac12}" />,
    reason: <>Substitute both into the formula. Dividing by <Katex tex="\tfrac12" /> is multiplying by 2.</>,
  },
  {
    working: <Katex display tex="\boxed{2\left(1-e^{-1/5}\right)}" />,
    reason: <>Exact answer, about <Katex tex="0.363" />. Equivalently <Katex tex="2-2e^{-1/5}" />.</>,
    more: <>Check: it is bigger than <Katex tex="\Pr(X<1)\approx0.181" />. Conditioning on <Katex tex="X\le m" /> shrinks the sample space to an event of probability <Katex tex="\tfrac12" />, so every probability inside it doubles. A conditional probability of an event inside <Katex tex="B" /> can never be smaller than its ordinary probability, so an answer below 0.181 signals an error.</>,
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
        topic="Median"
        marks={2}
        statement={<>Determine the value of <Katex tex="m" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Probability"
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
        <Explore title="A conditional probability is a ratio of two areas, and m is not an area">
          <AreasWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
