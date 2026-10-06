// 2023 Specialist Mathematics — Exam 1 Question 6 (4 marks). Adding three independent normal
// variables, then standardising a sample mean. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

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
    reason: <>The mean of a sum is the sum of the means. This holds whether or not the variables are independent.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{Var}(X) &= 6^2+\left(\sqrt3\right)^2+5^2 \\ &= 36+3+25 = 64\end{aligned}" />,
    reason: <>For <strong>independent</strong> variables, <strong>variances</strong> add — that is why the question tells you the three times are independent. Each variance is the standard deviation squared, so square each one first. Note <Katex tex="\left(\sqrt3\right)^2=3" />, not 9.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(X) = \sqrt{64} = 8" />,
    reason: <>The standard deviation is the square root of the variance. Standard deviations do <em>not</em> add: <Katex tex="6+\sqrt3+5=11+\sqrt3\approx12.7" /> is the answer the report notes a large number of students gave. A square root does not split over a sum (<Katex tex="\sqrt{36+3+25}\ne\sqrt{36}+\sqrt3+\sqrt{25}" />), so the sd must come from the total variance. Adding the sds always gives too big a value.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = 40, \quad \mathrm{sd}(X) = 8}" />,
    reason: <>Both in minutes. The question asks for the mean <em>and</em> the standard deviation, so state both.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X}_w \sim \mathrm{N}\!\left(8,\ \frac{\left(\sqrt3\right)^2}{12}\right) = \mathrm{N}\!\left(8,\ \frac{1}{4}\right)" />,
    reason: <>Let <Katex tex="\overline{X}_w" /> be Josie's average (sample mean) waiting time over <Katex tex="n=12" /> independent days. Its mean is still 8, but its <strong>variance</strong> is <Katex tex="\tfrac{\sigma^2}{n}" />: the total of 12 independent days has variance <Katex tex="12\times3" /> (variances add), and dividing that total by 12 divides the variance by <Katex tex="12^2" />, leaving <Katex tex="\tfrac{12\times3}{144}=\tfrac{3}{12}=\tfrac14" />. It is normal because each day's wait is normal. In <Katex tex="\mathrm{N}(\mu,\sigma^2)" /> the second number is the variance.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\overline{X}_w\right) = \sqrt{\frac14} = \frac12" />,
    reason: <>Square-root the variance. In standard deviation form this is <Katex tex="\tfrac{\sigma}{\sqrt n}=\tfrac{\sqrt3}{\sqrt{12}}=\tfrac{\sqrt3}{2\sqrt3}=\tfrac12" />: divide the sd by <Katex tex="\sqrt{12}" />, not by 12. The report notes <Katex tex="\sqrt3" /> and <Katex tex="\tfrac{\sqrt3}{12}" /> were seen frequently — the first uses one day's sd unchanged, the second divides the sd by 12 instead of <Katex tex="\sqrt{12}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}7\ \text{min } 45\ \text{s} &= 7+\tfrac{45}{60} = 7.75 \\ 8\ \text{min } 30\ \text{s} &= 8+\tfrac{30}{60} = 8.5\end{aligned}" />,
    reason: <>The distribution is in minutes, so convert the times to minutes first — seconds over 60, not over 100 (7 min 45 s is not 7.45).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr\left(7.75<\overline{X}_w<8.5\right) \\ &= \Pr\left(\frac{7.75-8}{\tfrac12}<Z<\frac{8.5-8}{\tfrac12}\right) \\ &= \Pr\left(-\tfrac12<Z<1\right)\end{aligned}" />,
    reason: <>To turn <Katex tex="\overline{X}_w" /> into <Katex tex="Z" />, subtract its mean and divide by its standard deviation: <Katex tex="Z=\tfrac{\overline{X}_w-8}{1/2}" />. Use the sd of the <em>average</em>, <Katex tex="\tfrac12" />, not one day's <Katex tex="\sqrt3" />. Do the same to both ends of the interval. Dividing by <Katex tex="\tfrac12" /> doubles: <Katex tex="-0.25\to-\tfrac12" /> and <Katex tex="0.5\to1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\frac12, \quad b = 1}" />,
    reason: <>The interval is not centred on the mean (it runs 0.25 below 8 and 0.5 above), so <Katex tex="a\ne-b" />. Because the standard normal curve is symmetric about 0, <Katex tex="\Pr\left(-\tfrac12<Z<1\right)=\Pr\left(-1<Z<\tfrac12\right)" />, so <Katex tex="a=-1" />, <Katex tex="b=\tfrac12" /> is equally valid — the report notes that symmetric result was not often seen.</>,
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
              One rule drives both parts: for independent variables, <strong>variances</strong> add;
              standard deviations do not. So work with variances (each sd squared) and take the
              square root only at the end. In part a. that gives <Katex tex="36+3+25=64" />, so the
              sd is 8; in part b. the average of 12 days has variance{' '}
              <Katex tex="\tfrac{3}{12}=\tfrac14" />, so its sd is <Katex tex="\tfrac12" />.
              Answers like <Katex tex="6+\sqrt3+5" />, or <Katex tex="\sqrt3" /> divided by 12,
              come from doing the arithmetic on the standard deviations instead.
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
