// 2023 Specialist Mathematics — Exam 1 Question 6 (4 marks). Adding three independent normal
// variables, then standardising a sample mean. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original. Oct 2026 Concise/Detailed review: reasons trimmed to what each line needs; the
// traps from the report, checks and alternatives sit in each row's `more` (Detailed only).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

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
    reason: <>Let <Katex tex="X" /> be the total time. The trip is the drive, then the wait, then the train ride, so the total is the sum of the three times.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(X) = 20+8+12 = 40" />,
    reason: <>The mean of a sum is the sum of the means.</>,
    more: <>This holds whether or not the variables are independent. Independence only matters for the variance, in the next line.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{Var}(X) &= 6^2+\left(\sqrt3\right)^2+5^2 \\ &= 36+3+25 = 64\end{aligned}" />,
    reason: <>For <strong>independent</strong> variables, the <strong>variances</strong> add. Each variance is the standard deviation squared, so square each sd first: <Katex tex="\left(\sqrt3\right)^2=3" />.</>,
    more: <>That is why the question tells you the three times are independent: without it, you could not simply add the variances.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(X) = \sqrt{64} = 8" />,
    reason: <>The standard deviation is the square root of the total variance.</>,
    more: (
      <>
        Adding the sds gives <Katex tex="6+\sqrt3+5=11+\sqrt3\approx12.7" />, the answer the report notes a
        large number of students gave. A square root does not split over a sum
        (<Katex tex="\sqrt{36+3+25}\ne\sqrt{36}+\sqrt3+\sqrt{25}" />), so the sd must come from the total
        variance; adding the sds overestimates the spread (12.7 instead of 8).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = 40, \quad \mathrm{sd}(X) = 8}" />,
    reason: <>Both in minutes. The question asks for the mean <em>and</em> the standard deviation, so state both.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X}_w \sim \mathrm{N}\!\left(8,\ \frac{\left(\sqrt3\right)^2}{12}\right) = \mathrm{N}\!\left(8,\ \frac{1}{4}\right)" />,
    reason: <>Let <Katex tex="\overline{X}_w" /> be Josie's average waiting time over <Katex tex="n=12" /> independent days. It is normal (an average of normal variables is normal), with the same mean, 8, but its <strong>variance</strong> is <Katex tex="\tfrac{\sigma_w^2}{n}" />: one day's variance divided by 12. In <Katex tex="\mathrm{N}(\mu,\sigma^2)" /> the second number is the variance.</>,
    more: (
      <>
        Where <Katex tex="\tfrac{\sigma_w^2}{n}" /> comes from here: the total of the 12 days' waits has variance{' '}
        <Katex tex="12\times3=36" /> (variances add for independent days). The average is that total divided by
        12, and dividing a variable by 12 divides its variance by <Katex tex="12^2=144" />, leaving{' '}
        <Katex tex="\tfrac{36}{144}=\tfrac14" />. Averaging smooths out the day-to-day variation, so the
        average is much less spread out than a single day's wait.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\overline{X}_w\right) = \sqrt{\frac14} = \frac12" />,
    reason: <>The standard deviation of the average is the square root of its variance. This is the sd you divide by when converting to <Katex tex="Z" /> below.</>,
    more: (
      <>
        In standard deviation form this is{' '}
        <Katex tex="\tfrac{\sigma_w}{\sqrt n}=\tfrac{\sqrt3}{\sqrt{12}}=\tfrac{\sqrt3}{2\sqrt3}=\tfrac12" />: divide
        the sd by <Katex tex="\sqrt{12}" />, not by 12. The report notes <Katex tex="\sqrt3" /> and{' '}
        <Katex tex="\tfrac{\sqrt3}{12}" /> were seen frequently. The first is one day's sd, used as if the
        average were as spread out as a single day; the second divides the sd by 12 instead of{' '}
        <Katex tex="\sqrt{12}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}7\ \text{min } 45\ \text{s} &= 7+\tfrac{45}{60} = 7.75 \\ 8\ \text{min } 30\ \text{s} &= 8+\tfrac{30}{60} = 8.5\end{aligned}" />,
    reason: <>The distribution is in minutes, so convert both times to minutes. There are 60 seconds in a minute.</>,
    more: <>Divide the seconds by 60, not 100: 45 seconds is <Katex tex="\tfrac34" /> of a minute, so 7 min 45 s is 7.75 minutes, not 7.45.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr\left(7.75<\overline{X}_w<8.5\right) \\ &= \Pr\left(\frac{7.75-8}{\tfrac12}<Z<\frac{8.5-8}{\tfrac12}\right) \\ &= \Pr\left(-\tfrac12<Z<1\right)\end{aligned}" />,
    reason: <>To turn <Katex tex="\overline{X}_w" /> into <Katex tex="Z" />, subtract its mean and divide by its standard deviation, <Katex tex="\tfrac12" />: <Katex tex="Z=\tfrac{\overline{X}_w-8}{1/2}" />. Do the same to both ends of the interval.</>,
    more: (
      <>
        Dividing by <Katex tex="\tfrac12" /> is the same as multiplying by 2: <Katex tex="-0.25\to-\tfrac12" /> and{' '}
        <Katex tex="0.5\to1" />. In words, 7.75 minutes is half a standard deviation (of the average) below the
        mean, and 8.5 minutes is one standard deviation above it.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a = -\frac12, \quad b = 1}" />,
    reason: <>Read <Katex tex="a" /> and <Katex tex="b" /> off the last line, matching it to <Katex tex="\Pr(a<Z<b)" />. The standard normal curve is symmetric about 0, so reflecting the interval in 0 gives the same probability: <Katex tex="a=-1" />, <Katex tex="b=\tfrac12" /> is also correct.</>,
    more: (
      <>
        The interval is not centred on the mean (it runs 0.25 below 8 and 0.5 above), so{' '}
        <Katex tex="a\ne-b" />. Reflecting <Katex tex="-\tfrac12<Z<1" /> in 0 gives{' '}
        <Katex tex="-1<Z<\tfrac12" />, an interval with the same area under the curve, so{' '}
        <Katex tex="\Pr\left(-\tfrac12<Z<1\right)=\Pr\left(-1<Z<\tfrac12\right)" />. That is the symmetric
        result the report notes was not often seen.
      </>
    ),
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Both parts rest on the rules for combining random variables. Means always add:{' '}
              <Katex tex="\mathrm{E}(X+Y)=\mathrm{E}(X)+\mathrm{E}(Y)" />. For{' '}
              <strong>independent</strong> variables, <strong>variances</strong> add:{' '}
              <Katex tex="\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)" />. Multiplying a
              variable by a constant multiplies its variance by the square of that constant:{' '}
              <Katex tex="\mathrm{Var}(kX)=k^2\,\mathrm{Var}(X)" />.
            </p>
            <p>
              Standard deviations do <em>not</em> add, so do the arithmetic on variances (each sd
              squared) and take the square root only at the end. For the average{' '}
              <Katex tex="\overline{X}" /> of <Katex tex="n" /> independent values, each with mean{' '}
              <Katex tex="\mu" /> and standard deviation <Katex tex="\sigma" />, these rules give a
              mean of <Katex tex="\mu" />, a variance of <Katex tex="\tfrac{\sigma^2}{n}" /> and a
              standard deviation of <Katex tex="\tfrac{\sigma}{\sqrt n}" />. A sum or average of
              independent normal variables is itself normal.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
