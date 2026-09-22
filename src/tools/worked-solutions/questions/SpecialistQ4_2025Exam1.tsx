// 2025 Specialist Mathematics — Exam 1 Question 4 (5 marks). A density needing partial
// fractions for its mean, then the distribution of a sample mean. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [32, 23, 9, 37],
  average: 1.5,
  comment: (
    <>
      This question required partial fractions to be applied. A significant number of
      responses were not awarded full marks because the initial expression missed the{' '}
      <Katex tex="t" /> on the numerator, or the coefficients for the partial fractions were
      incorrect, or the working towards the given answer was unclear.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [34, 17, 49],
  average: 1.2,
  comment: (
    <>
      Many students were able to find the mean and standard deviation of the sampling
      distribution. Some students drew a diagram to aid in identifying the required area
      under the standard normal curve.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(T) = \int_0^1 t\,f(t)\,dt = \frac{3}{2\log_e(2)}\int_0^1\frac{t}{(t+1)(2-t)}\,dt" />,
    reason: <>The <Katex tex="t" /> on the numerator is the whole difference between this and the total-probability integral — omitting it was the first listed error.</>,
  },
  {
    working: <Katex display tex="\frac{t}{(t+1)(2-t)} = \frac{A}{t+1}+\frac{B}{2-t} \implies t = A(2-t)+B(t+1)" />,
    reason: 'Partial fractions, because the numerator is not a multiple of the derivative of the denominator.',
  },
  {
    working: <Katex display tex="t=-1: \ -1 = 3A \implies A = -\tfrac13; \qquad t=2: \ 2 = 3B \implies B = \tfrac23" />,
    reason: 'Substituting the two roots picks off one coefficient at a time.',
  },
  {
    working: <Katex display tex="\int_0^1\left(\frac{-\tfrac13}{t+1}+\frac{\tfrac23}{2-t}\right)dt = \left[-\tfrac13\log_e(t+1)-\tfrac23\log_e(2-t)\right]_0^1" />,
    reason: <>The second antiderivative picks up a minus from the inner derivative <Katex tex="-1" />, which cancels against the <Katex tex="\tfrac23" />.</>,
  },
  {
    working: <Katex display tex="= \left(-\tfrac13\log_e2-0\right)-\left(0-\tfrac23\log_e2\right) = \tfrac13\log_e(2)" />,
    reason: <><Katex tex="\log_e(1)=0" /> kills two of the four terms.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(T) = \frac{3}{2\log_e(2)}\times\frac{\log_e(2)}{3} = \frac12}" />,
    reason: <>The awkward constant was chosen precisely so the logarithms cancel. Every line of this was needed for the "show that".</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{T} \sim \mathrm{N}\!\left(\mu,\ \frac{\sigma^2}{n}\right) \ \text{ approximately, with } \mu = \tfrac12, \ \sigma = 0.3, \ n = 25" />,
    reason: 'The central limit theorem, as the stem allows.',
  },
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\overline{T}\right) = \frac{0.3}{\sqrt{25}} = \frac{0.3}{5} = 0.06" />,
    reason: <>Dividing by <Katex tex="\sqrt{n}" />, not by <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(0.44<\overline{T}<0.5\right) = \Pr\!\left(\frac{0.44-0.5}{0.06}<Z<\frac{0.5-0.5}{0.06}\right)" />,
    reason: 'Standardising both endpoints.',
  },
  {
    working: <Katex display tex="= \Pr(-1<Z<0)" />,
    reason: <>The numbers are chosen so the lower endpoint lands exactly at <Katex tex="z=-1" /> and the upper one at the mean.</>,
  },
  {
    working: <Katex display tex="\Pr(-1<Z<0) = \Pr(0<Z<1) = \Pr(Z<1)-\tfrac12" />,
    reason: 'By the symmetry of the standard normal about zero — a quick sketch settles which area is wanted.',
  },
  {
    working: <Katex display tex="\boxed{0.84-0.5 = 0.34}" />,
    reason: <>Using the given <Katex tex="\Pr(Z<1)=0.84" />.</>,
  },
]

export default function SpecialistQ4_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (5 marks)</p>
        <p>
          The waiting time, <Katex tex="T" /> hours, to see a particular doctor at a clinic
          has a distribution with a probability density function <Katex tex="f" /> defined by
        </p>
        <div className="py-1">
          <Katex
            display
            tex="f(t)=\begin{cases}\dfrac{3}{2\log_e(2)}\left(\dfrac{1}{(t+1)(2-t)}\right) & 0<t\le1\\[10pt] 0 & \text{elsewhere}\end{cases}"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The mean integrand is <Katex tex="\tfrac{t}{(t+1)(2-t)}" />, and the numerator{' '}
            <Katex tex="t" /> is not a multiple of the derivative of the denominator — so
            there is no reverse-chain-rule shortcut and partial fractions are unavoidable.
            Knowing that from the first line is most of the question.
          </p>
          <p>
            The constant <Katex tex="\tfrac{3}{2\log_e 2}" /> looks forbidding but is chosen
            to cancel: the integral comes out as <Katex tex="\tfrac13\log_e 2" />, leaving{' '}
            <Katex tex="\tfrac12" /> exactly.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={<>Use integration to show that <Katex tex="\mathrm{E}(T)=\tfrac12" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            For random samples of 25 waiting times, it may be assumed that the sample means
            are approximately normally distributed. Find the probability that the average
            waiting time for a random sample of 25 patients is between 0.44 hours and 0.5
            hours. Use <Katex tex="\sigma=0.3" /> and <Katex tex="\Pr(Z<1)=0.84" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
