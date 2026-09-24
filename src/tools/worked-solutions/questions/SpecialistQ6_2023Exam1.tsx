// 2023 Specialist Mathematics — Exam 1 Question 6 (4 marks). Adding three independent normal
// variables, then standardising a sample mean. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [6, 19, 75],
  average: 1.7,
  comment: (
    <>
      While many students correctly found the mean, a large number of students gave the
      standard deviation as <Katex tex="11+\sqrt3" /> (the sum of the standard deviations of
      the random variables).
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [47, 13, 40],
  average: 0.9,
  comment: (
    <>
      The symmetric result, <Katex tex="a=-1" /> and <Katex tex="b=\tfrac12" />, was not often
      seen.
      <br />
      This question was not answered well. A common error was to use an incorrect standard
      deviation: <Katex tex="\sqrt3" /> and <Katex tex="\tfrac{\sqrt3}{12}" /> were seen
      frequently.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X = X_c+X_w+X_t" />,
    reason: <>The total journey is the sum of the three independent legs.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(X) = 20+8+12 = 40 \ \text{minutes}" />,
    reason: <>Means always add, independent or not.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(X) = 6^2+\left(\sqrt3\right)^2+5^2 = 36+3+25 = 64" />,
    reason: <><strong>Variances</strong> add — and only because the three times are independent, which the question states explicitly. Note <Katex tex="\left(\sqrt3\right)^2=3" />, not 9.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(X) = \sqrt{64} = 8 \ \text{minutes}}" />,
    reason: <>The deliberately clean answer. Adding the standard deviations gives <Katex tex="6+\sqrt3+5=11+\sqrt3\approx12.7" />, which the report notes a large number of students gave. It is always too big.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X}_w \sim \mathrm{N}\!\left(8,\ \frac{\left(\sqrt3\right)^2}{12}\right) = \mathrm{N}\!\left(8,\ \frac{3}{12}\right)" />,
    reason: <>The distribution of a <em>sample mean</em> of 12 days: the variance is divided by <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\overline{X}_w\right) = \sqrt{\frac14} = \frac12" />,
    reason: <>Equivalently <Katex tex="\tfrac{\sqrt3}{\sqrt{12}}=\tfrac{\sqrt3}{2\sqrt3}=\tfrac12" />. The report notes <Katex tex="\sqrt3" /> and <Katex tex="\tfrac{\sqrt3}{12}" /> were seen frequently — not dividing by <Katex tex="\sqrt{12}" /> at all, and dividing by 12 instead.</>,
  },
  {
    working: <Katex display tex="7\ \text{min } 45\ \text{s} = 7.75, \qquad 8\ \text{min } 30\ \text{s} = 8.5" />,
    reason: <>Convert the times to minutes first — seconds over 60, not over 100.</>,
  },
  {
    working: <Katex display tex="Z = \frac{\overline{X}_w-8}{\tfrac12}" />,
    reason: <>Standardising.</>,
  },
  {
    working: <Katex display tex="a = \frac{7.75-8}{\tfrac12} = \frac{-0.25}{0.5}, \qquad b = \frac{8.5-8}{\tfrac12} = \frac{0.5}{0.5}" />,
    reason: <>Both endpoints through the same transformation.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\frac12, \quad b = 1}" />,
    reason: <>The interval is not symmetric about the mean, so <Katex tex="a\ne-b" />. By the symmetry of <Katex tex="Z" />, <Katex tex="a=-1" />, <Katex tex="b=\tfrac12" /> is equally valid — the report notes that symmetric result was not often seen.</>,
  },
]

export default function SpecialistQ6_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (4 marks)</p>
        <p>
          Josie travels from home to work in the city. She drives a car to a train station,
          waits, and then rides on a train to the city. The time, <Katex tex="X_c" /> minutes,
          taken to drive to the station is normally distributed with a mean of 20 minutes (
          <Katex tex="\mu_c=20" />) and standard deviation of 6 minutes (
          <Katex tex="\sigma_c=6" />). The waiting time, <Katex tex="X_w" /> minutes, for a
          train is normally distributed with a mean of 8 minutes (<Katex tex="\mu_w=8" />) and
          standard deviation of <Katex tex="\sqrt3" /> minutes (
          <Katex tex="\sigma_w=\sqrt3" />). The time, <Katex tex="X_t" /> minutes, taken to
          ride on a train to the city is also normally distributed with a mean of 12 minutes (
          <Katex tex="\mu_t=12" />) and standard deviation of 5 minutes (
          <Katex tex="\sigma_t=5" />). The three times are independent of each other.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            One rule covers both parts: <strong>variances</strong> add, standard deviations do
            not. In part a. that turns <Katex tex="36+3+25" /> into a tidy{' '}
            <Katex tex="\sqrt{64}=8" />; in part b. it turns{' '}
            <Katex tex="\tfrac{3}{12}" /> into <Katex tex="\tfrac12" />. Any answer involving{' '}
            <Katex tex="6+\sqrt3+5" /> has added the wrong things.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Sum of Normals"
        marks={2}
        statement={
          <>
            Find the mean and standard deviation of the total time, in minutes, it takes for
            Josie to travel from home to the city.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sample Mean"
        marks={2}
        statement={
          <>
            Josie's waiting time for a train on each work day is independent of her waiting
            time for a train on any other work day. The probability that, for 12 randomly
            chosen work days, Josie's average waiting time is between 7 minutes 45 seconds and
            8 minutes 30 seconds is equivalent to <Katex tex="\Pr(a<Z<b)" />, where{' '}
            <Katex tex="Z\sim\mathrm{N}(0,1)" /> and <Katex tex="a" /> and <Katex tex="b" />{' '}
            are real numbers.
            <br />
            Find the values of <Katex tex="a" /> and <Katex tex="b" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
