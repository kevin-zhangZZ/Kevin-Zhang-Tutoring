// 2016 Mathematical Methods — Exam 2, Section B, Question 3 (16 marks).
// Laptops: a binomial, a conditional binomial, two normal probabilities, a binomial on a
// sample proportion, an inverse-normal, a geometric-style probability, a confidence
// interval, and a density function. Question text transcribed from the original paper (no
// diagram given). Answers verified with scipy. Solution is original.
//
// Note on part (h): VCAA's own report concedes that the given f is not quite a probability
// density function — the integral over [0, 210] is 0.99968, not 1. Answers to the nearest
// integer were accepted for the median. That is recorded in the working below.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [16, 8, 76],
  average: 1.6,
  comment: (
    <>
      This question was answered well. Most students recognised that it was binomial and
      gave the correct <Katex tex="n" /> and <Katex tex="p" /> values.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 27, 37],
  average: 1.0,
  comment: (
    <>
      Many students recognised that this was a conditional probability question but had the
      incorrect numerator or denominator. Some included <Katex tex="5" /> in their
      calculations, getting <Katex tex="0.9798" />. Others rounded too soon and gave{' '}
      <Katex tex="0.9312" /> as the answer.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [29, 23, 48],
  average: 1.2,
  comment: (
    <>
      Some students thought three hours and ten minutes was <Katex tex="3.1" /> hours and
      six minutes was <Katex tex="0.6" /> hours. Others had the standard deviation as{' '}
      <Katex tex="10" /> minutes. Some gave the answer without showing any working.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [46, 29, 4, 21],
  average: 1.0,
  comment: (
    <>
      Most students used the conditional probability formula but tried to use the normal
      distribution rather than the binomial distribution.
    </>
  ),
}

const EXAM_E: SAExaminerStats = { marks: [53, 14, 32], average: 0.8, comment: <>Students made some rounding errors.</> }

const EXAM_F: SAExaminerStats = { marks: [79, 21], average: 0.2, comment: <>Some students did not attempt this question.</> }

const EXAM_G: SAExaminerStats = {
  marks: [59, 41],
  average: 0.4,
  comment: (
    <>
      Students were not expected to write out the formula; the relevant computation could be
      done directly using technology. There were some rounding errors. A common incorrect
      interval was <Katex tex="(0.01,0.12)" />.
    </>
  ),
}

const EXAM_HI: SAExaminerStats = { marks: [33, 67], average: 0.7, comment: <>This question was answered well.</> }

const EXAM_HII: SAExaminerStats = {
  marks: [27, 15, 58],
  average: 1.3,
  comment: (
    <>
      <Katex tex="f" /> is not a probability density function, as{' '}
      <Katex tex="\int_0^{210}f(x)\,dx\ne1" />. It is a close approximation such that
      student calculations <Katex tex="\int_0^{m}f(x)\,dx=\tfrac12" /> and{' '}
      <Katex tex="\int_m^{210}f(x)\,dx=\tfrac12" /> both yielded <Katex tex="m=176" />{' '}
      correct to the nearest integer. Answers correct to the nearest integer were accepted.
      Some students solved <Katex tex="\int_0^{m}x\,f(x)\,dx=\tfrac12" /> by leaving the{' '}
      <Katex tex="x" /> in from the previous part, getting <Katex tex="75.58" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\mathrm{Bi}(22,\,0.1)" />,
    reason: <><Katex tex="22" /> students, each independently failing to plug in with probability <Katex tex="0.1" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge1) = 1-\Pr(X=0) = 1-0.9^{22}" />,
    reason: <>"At least one" via the complement.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.9015}" />,
    reason: <>Four decimal places. High, as expected: with <Katex tex="22" /> chances at <Katex tex="10\%" /> each, at least one slip is very likely.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<5\mid X\ge1) = \frac{\Pr(1\le X\le4)}{\Pr(X\ge1)}" />,
    reason: <>The intersection of "fewer than 5" and "at least 1" is <Katex tex="1\le X\le4" />. "Fewer than five" excludes <Katex tex="5" /> — including it gives the report's <Katex tex="0.9798" />.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(22, 0.1, 1, 4)</Cas>,
    reason: <>The numerator directly.</>,
  },
  {
    working: <Katex display tex="= \frac{0.83936\ldots}{0.90151\ldots}" />,
    reason: <>The denominator is part (a). Keep full precision — the report says rounding here produced <Katex tex="0.9312" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.9311}" />,
    reason: <>Four decimal places.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="Y\sim N\!\left(190,\,6^2\right) \text{ minutes}" />,
    reason: <>Convert everything to minutes first: three hours ten minutes is <Katex tex="190" />, not <Katex tex="3.1" />. That conversion slip is the report's first complaint.</>,
  },
  {
    working: <Katex display tex="\Pr(Y<180) = \Pr\!\left(Z<\frac{180-190}{6}\right) = \Pr(Z<-1.6\overline{6})" />,
    reason: <>Three hours is <Katex tex="180" /> minutes.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(-∞, 180, 190, 6)</Cas>,
    reason: <>Or standardise and use the standard normal.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.0478}" />,
    reason: <>About one laptop in twenty-one. Keep the unrounded value <Katex tex="0.047790\ldots" /> — part (d) needs it.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="X_2\sim\mathrm{Bi}(100,\,0.047790\ldots)" />,
    reason: <>Each of the <Katex tex="100" /> laptops independently has probability <Katex tex="0.04779" /> — part (c) — of lasting under three hours. The instruction "do not use a normal approximation" is what forces the binomial here.</>,
  },
  {
    working: <Katex display tex="\hat P\ge0.06 \iff X_2\ge6, \qquad \hat P\ge0.05 \iff X_2\ge5" />,
    reason: <>Multiply each proportion by <Katex tex="100" /> to turn it into a count.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\hat P\ge0.06\mid \hat P\ge0.05\right) = \frac{\Pr(X_2\ge6)}{\Pr(X_2\ge5)}" />,
    reason: <><Katex tex="\{X_2\ge6\}" /> sits entirely inside <Katex tex="\{X_2\ge5\}" />, so the intersection is the smaller event.</>,
  },
  {
    working: <Katex display tex="= \frac{0.34433\ldots}{0.52340\ldots}" />,
    reason: <>Both from <Katex tex="\texttt{binomCdf}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.658}" />,
    reason: <>Three decimal places this time — read the instruction.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="Y_2\sim N\!\left(180,\,\sigma^2\right), \qquad \Pr(Y_2>190) = 0.12" />,
    reason: <>The mean has dropped to three hours; <Katex tex="\sigma" /> is the unknown.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.88, 0, 1)</Cas>,
    reason: <>Working with the standard normal, since <Katex tex="\sigma" /> is what we are solving for. <Katex tex="\Pr(Z>z)=0.12" /> means <Katex tex="\Pr(Z<z)=0.88" />.</>,
  },
  {
    working: <Katex display tex="z = 1.17499\ldots" />,
    reason: <>Positive, because <Katex tex="190" /> is above the mean.</>,
  },
  {
    working: <Katex display tex="\frac{190-180}{\sigma} = 1.17499\ldots \implies \sigma = \frac{10}{1.17499\ldots}" />,
    reason: <>Rearranging the standardising formula.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 8.5107 \text{ minutes}}" />,
    reason: <>Four decimal places. Larger than the <Katex tex="6" /> minutes of a new laptop, which fits: older batteries are less predictable.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(Y_2<180) = \tfrac12" />,
    reason: <>The six-month mean <em>is</em> three hours, and the normal distribution is symmetric about its mean. No calculation needed — that is the whole question.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{first success on the third}) = \left(\tfrac12\right)\left(\tfrac12\right)\left(\tfrac12\right)" />,
    reason: <>Two failures then a success, in that order.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac18 = 0.125}" />,
    reason: <>Only <Katex tex="21\%" /> of students scored this mark, mostly because they did not notice that the probability was exactly a half.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \frac{6}{100} = 0.06, \qquad n = 100" />,
    reason: <>The sample proportion from this particular sample.</>,
  },
  {
    working: <Katex display tex="\hat p \pm 1.96\sqrt{\frac{\hat p(1-\hat p)}{n}} = 0.06\pm1.96\sqrt{\frac{0.06\times0.94}{100}}" />,
    reason: <>The <Katex tex="95\%" /> confidence-interval formula from the formula sheet, with <Katex tex="z=1.96" />.</>,
  },
  {
    working: <Katex display tex="= 0.06\pm0.04655" />,
    reason: <><Katex tex="\sqrt{0.000564}=0.02375" />, times <Katex tex="1.96" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.01,\ 0.11)}" />,
    reason: <>Two decimal places: <Katex tex="0.0134" /> and <Katex tex="0.1065" />. The report's common wrong interval <Katex tex="(0.01,0.12)" /> comes from rounding the upper end up rather than to nearest.</>,
  },
]

const ROWS_HI: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = \int_0^{210} x\,f(x)\,dx" />,
    reason: <>The definition of the mean of a continuous random variable. The terminals are the support of <Katex tex="f" />, where it is non-zero.</>,
  },
  {
    working: <Cas fn="nInt">nInt(x·(210-x)·e^((x-210)/20)/400, x, 0, 210)</Cas>,
    reason: <>No exact antiderivative is worth chasing here; this is the technology paper.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 170.01 \text{ minutes}}" />,
    reason: <>Two decimal places — a little under three hours, which is plausible for a battery whose density peaks around <Katex tex="190" /> minutes but has a long left tail.</>,
  },
]

const ROWS_HII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{m} f(x)\,dx = \frac12" />,
    reason: <>The median splits the area in half. Delete the <Katex tex="x" /> left over from part (h)(i) — the report says students who forgot got <Katex tex="75.58" />, which is nowhere near the mean and should have set off an alarm.</>,
  },
  {
    working: <Cas fn="solve">solve(∫((210-x)·e^((x-210)/20)/400, x, 0, m) = 0.5, m) | 0&lt;m&lt;210</Cas>,
    reason: <>Restrict to the support; without it the CAS returns a second root outside the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{m \approx 176.45 \text{ minutes}}" />,
    reason: <>About <Katex tex="176" /> minutes, or two hours and fifty-six — below the mean, which fits a left-skewed distribution.</>,
  },
  {
    working: <Katex display tex="\int_0^{210} f(x)\,dx = 0.99968\ldots \ne 1" />,
    reason: <>Worth knowing: VCAA's own report concedes the given <Katex tex="f" /> is not quite a probability density function. Solving from the right instead, <Katex tex="\int_m^{210}f=\tfrac12" />, gives <Katex tex="176.43" /> — a different answer to two decimal places. VCAA accepted anything correct to the nearest integer, <Katex tex="176" />.</>,
  },
]

export default function MethodsQ3_2016Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (16 marks)</p>
        <p>
          A school has a class set of <Katex tex="22" /> new laptops kept in a recharging
          trolley. Provided each laptop is correctly plugged into the trolley after use, its
          battery recharges. On a particular day, a class of <Katex tex="22" /> students uses
          the laptops. All laptop batteries are fully charged at the start of the lesson.
          Each student uses and returns exactly one laptop. The probability that a student
          does not correctly plug their laptop into the trolley at the end of the lesson is{' '}
          <Katex tex="10\%" />. The correctness of any student's plugging-in is independent
          of any other student's correctness.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Determine the probability that at least one of the laptops is not correctly
            plugged into the trolley at the end of the lesson. Give your answer correct to
            four decimal places.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            A teacher observes that at least one of the returned laptops is not correctly
            plugged into the trolley. Given this, find the probability that fewer than five
            laptops are not correctly plugged in. Give your answer correct to four decimal
            places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The time for which a laptop will work without recharging (the battery life) is
          normally distributed, with a mean of three hours and ten minutes and standard
          deviation of six minutes. Suppose that the laptops remain out of the recharging
          trolley for three hours.
        </p>
      </div>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            For any one laptop, find the probability that it will stop working by the end of
            these three hours. Give your answer correct to four decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="Work in minutes">
          <p>
            Three hours and ten minutes is <Katex tex="190" /> minutes, not{' '}
            <Katex tex="3.1" /> hours. Six minutes is <Katex tex="0.1" /> hours, not{' '}
            <Katex tex="0.6" />. Converting everything to one unit before starting — minutes
            here, since the standard deviation is given in minutes — removes both of the
            report's most common errors at a stroke.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A supplier of laptops decides to take a sample of <Katex tex="100" /> new laptops
          from a number of different schools. For samples of size <Katex tex="100" /> from
          the population of laptops with a mean battery life of three hours and ten minutes
          and standard deviation of six minutes, <Katex tex="\hat P" /> is the random
          variable of the distribution of sample proportions of laptops with a battery life
          of less than three hours.
        </p>
      </div>

      <PartCard
        letter="d"
        marks={3}
        statement={
          <>
            Find <Katex tex="\Pr\!\left(\hat P\ge0.06\mid \hat P\ge0.05\right)" />. Give your
            answer correct to three decimal places. Do not use a normal approximation.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          It is known that when laptops have been used regularly in a school for six months,
          their battery life is still normally distributed but the mean battery life drops to
          three hours. It is also known that only <Katex tex="12\%" /> of such laptops work
          for more than three hours and ten minutes.
        </p>
      </div>

      <PartCard
        letter="e"
        marks={2}
        statement={
          <>
            Find the standard deviation for the normal distribution that applies to the
            battery life of laptops that have been used regularly in a school for six
            months, correct to four decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={1}
        statement={
          <>
            Suppose the supplier tests the battery life of the laptops one at a time. Find
            the probability that the first laptop found to have a battery life of less than
            three hours is the third one.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The laptop supplier finds that, in a particular sample of <Katex tex="100" />{' '}
          laptops, six of them have a battery life of less than three hours.
        </p>
      </div>

      <PartCard
        letter="g"
        marks={1}
        statement={
          <>
            Determine the <Katex tex="95\%" /> confidence interval for the supplier's
            estimate of the proportion of interest. Give values correct to two decimal
            places.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          The supplier also provides laptops to businesses. The probability density function
          for battery life, <Katex tex="x" /> (in minutes), of a laptop after six months of
          use in a business is
        </p>
        <Katex
          display
          tex="f(x)=\begin{cases}\dfrac{(210-x)e^{\frac{x-210}{20}}}{400} & 0\le x\le210\\[8pt] 0 & \text{elsewhere}\end{cases}"
        />
      </div>

      <PartCard
        letter="h.i"
        marks={1}
        statement={
          <>
            Find the mean battery life, in minutes, of a laptop with six months of business
            use, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_HI}
      >
        <WorkingTable rows={ROWS_HI} />
      </PartCard>

      <PartCard
        letter="h.ii"
        marks={2}
        statement={
          <>
            Find the median battery life, in minutes, of a laptop with six months of business
            use, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_HII}
      >
        <Background title="A flaw worth knowing about">
          <p>
            The function VCAA printed is not quite a probability density function: its
            integral over <Katex tex="[0,210]" /> is <Katex tex="0.99968" />, not{' '}
            <Katex tex="1" />.
          </p>
          <p>
            That makes "the median" ambiguous to two decimal places — solving{' '}
            <Katex tex="\int_0^m f=\tfrac12" /> gives <Katex tex="176.45" />, while solving{' '}
            <Katex tex="\int_m^{210}f=\tfrac12" /> gives <Katex tex="176.43" />. VCAA's report
            acknowledges this and accepted any answer correct to the nearest integer.
          </p>
          <p>
            Do not let the discrepancy throw you in an exam: pick either equation, write it
            down clearly, and carry on.
          </p>
        </Background>
        <WorkingTable rows={ROWS_HII} />
      </PartCard>
    </div>
  )
}
