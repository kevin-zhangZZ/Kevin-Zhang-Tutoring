// 2016 Mathematical Methods — Exam 2, Section B, Question 3 (16 marks).
// Laptops: a binomial, a conditional binomial, two normal probabilities, a binomial on a
// sample proportion, an inverse-normal, a geometric-style probability, a confidence
// interval, and a density function. Question text transcribed from the original paper (no
// diagram given). Answers verified with scipy. Solution is original.
//
// Note on part (h): VCAA's own report concedes that the given f is not quite a probability
// density function — the integral over [0, 210] is 0.99968, not 1. Answers to the nearest
// integer were accepted for the median. That is recorded in the working below.
//
// Interactives (qualifying parts, under 40% full marks): (b) Bi(22, 0.1) bars showing how "given
// at least one" removes the X = 0 bar, with the report's wrong numerators as toggles; (d) the
// Bi(100, 0.0478) bars behind P-hat against the normal approximation students used; (e) a sigma
// slider widening N(180, sigma^2) until the tail past 190 is 0.12. Skipped: (f), whose whole
// insight is a one-line symmetry fact (Pr below the mean is 1/2) that a picture would not add to.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const GivenBars = lazyWidget(() => import('../interactives/meth-2016e2-q3b-given-bars'))
const BinomialVsNormal = lazyWidget(() => import('../interactives/meth-2016e2-q3d-binomial-vs-normal'))
const FindSigma = lazyWidget(() => import('../interactives/meth-2016e2-q3e-find-sigma'))

const EXAM_A: SAExaminerStats = {
  marks: [16, 8, 76],
  average: 1.6,
  comment: (
    <>
      This question was answered well. Most students recognised that it was binomial and
      gave the correct <Katex tex="n" /> and <Katex tex="p" /> values. Some used{' '}
      <Katex tex="\Pr(X>1)" /> instead of <Katex tex="\Pr(X\ge1)" />.
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
      Some students thought 3 hours and 10 minutes was 3.1 hours and 6 minutes was 0.6
      hours. Others had the standard deviation as 10 minutes. Some gave the answer without
      showing any working. Students are reminded that some working must be shown for
      questions worth more than one mark. <Katex tex="\Pr(Y>180)=0.9522" /> was a common
      incorrect response.
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
      <Katex tex="f" /> is not a probability density function as{' '}
      <Katex tex="\int_0^{210}f(x)\,dx\ne1" />. It is a close approximation such that
      student calculations <Katex tex="\int_0^{m}f(x)\,dx=\tfrac12" /> and{' '}
      <Katex tex="\int_m^{210}f(x)\,dx=\tfrac12" /> both yielded values <Katex tex="m=176" />{' '}
      correct to the nearest integer. Answers that were correct to the nearest integer were
      accepted.
      <br />
      <br />
      Some students wrote down the correct formula but did not delete the <Katex tex="x" />{' '}
      on their technology from the previous computation for <Katex tex="\mathrm{E}(X)" />,
      solving <Katex tex="\int_0^{m}f(x)\,dx=\tfrac12" />, getting <Katex tex="m=75.58" />.
      Students should check their answers to see if they make sense as <Katex tex="75.58" />{' '}
      is very different from <Katex tex="170.01" />. The <Katex tex="dx" /> was often missing
      from students' working. Some students gave two solutions; they did not consider the
      domain.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\mathrm{Bi}(22,\,0.1)" />,
    reason: <>Let <Katex tex="X" /> count the laptops not plugged in: <Katex tex="22" /> independent students, each failing with probability <Katex tex="0.1" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge1) = 1-\Pr(X=0) = 1-0.9^{22}" />,
    reason: <>"At least one" is everything except "none", so use the complement.</>,
    more: <>"At least one" means <Katex tex="X\ge1" />, which includes <Katex tex="X=1" />. The report notes some students used <Katex tex="\Pr(X>1)" />, which leaves out exactly one laptop and gives <Katex tex="0.6608" /> instead.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.9015}" />,
    reason: <>Four decimal places. High, as expected: with <Katex tex="22" /> chances at <Katex tex="10\%" /> each, at least one slip is very likely.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<5\mid X\ge1) = \frac{\Pr(1\le X\le4)}{\Pr(X\ge1)}" />,
    reason: <>"Given" means conditional: <Katex tex="\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}" />. Both "fewer than five" and "at least one" hold when <Katex tex="1\le X\le4" />.</>,
    more: <>The given event <Katex tex="X\ge1" /> becomes the whole world: the denominator is its probability, and the numerator keeps only the part of "fewer than five" that lies inside it, so <Katex tex="X=0" /> drops out of the top. "Fewer than five" stops at <Katex tex="4" />; the report notes some students included <Katex tex="5" />, which gives <Katex tex="0.9798" />. Putting <Katex tex="\Pr(X\le4)" /> on top is another wrong numerator: it still contains <Katex tex="X=0" />, which the teacher has ruled out.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(22, 0.1, 1, 4)</Cas>,
    reason: <>The numerator: the probability that <Katex tex="X" /> is from <Katex tex="1" /> to <Katex tex="4" /> inclusive.</>,
  },
  {
    working: <Katex display tex="= \frac{0.83938\ldots}{0.90152\ldots}" />,
    reason: <>The denominator is part (a). Divide the unrounded values.</>,
    more: <>The report notes some students rounded too soon and gave <Katex tex="0.9312" />. For example, rounding both to three decimal places first gives <Katex tex="\tfrac{0.839}{0.901}=0.9312" />. Store the values on the calculator and divide those.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.9311}" />,
    reason: <>Four decimal places.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="Y\sim N\!\left(190,\,6^2\right) \text{ minutes}" />,
    reason: <>Work in minutes, the unit the standard deviation is given in: three hours ten minutes is <Katex tex="190" /> minutes, and <Katex tex="\sigma=6" />.</>,
    more: <>The report also notes some students took the standard deviation as <Katex tex="10" /> minutes. The <Katex tex="10" /> is the gap between the mean and three hours, not the spread; the question gives the spread directly as six minutes. It also lists two unit slips: three hours and ten minutes is not <Katex tex="3.1" /> hours, and six minutes is <Katex tex="0.1" /> hours, not <Katex tex="0.6" />. Working in minutes throughout avoids both.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(Y<180) &= \Pr\!\left(Z<\frac{180-190}{6}\right)\\ &=\Pr(Z<-1.6\overline{6})\end{aligned}" />,
    reason: <>A laptop stops by the end of three hours (<Katex tex="180" /> minutes) exactly when its battery life is less than <Katex tex="180" />.</>,
    more: <>The report notes <Katex tex="\Pr(Y>180)=0.9522" /> was a common incorrect response. That is the probability the laptop is <em>still working</em> after three hours, the opposite event. A quick check: <Katex tex="180" /> is below the mean of <Katex tex="190" />, so the answer must be less than <Katex tex="0.5" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(-∞, 180, 190, 6)</Cas>,
    reason: <>Write this line (or the standardised one above) as working: this part is worth two marks.</>,
    more: <>The report notes some students gave the answer without showing any working, and reminds students that some working must be shown for questions worth more than one mark.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.0478}" />,
    reason: <>About one laptop in twenty-one. Keep the unrounded value <Katex tex="0.047790\ldots" />: part (d) needs it.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="X_2\sim\mathrm{Bi}(100,\,0.047790\ldots)" />,
    reason: <>Let <Katex tex="X_2" /> count the sampled laptops lasting under three hours. Each does so independently with probability <Katex tex="0.04779" />, from part (c).</>,
    more: <>The question says "do not use a normal approximation", and the report notes most students tried to use the normal distribution anyway. The exact distribution of <Katex tex="\hat P" /> comes from the binomial. With <Katex tex="np\approx4.8" /> the binomial is skewed and lumpy, so the normal approximation gives about <Katex tex="0.618" />, well away from the exact <Katex tex="0.658" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\hat P\ge0.06 &\iff X_2\ge6\\ \hat P\ge0.05 &\iff X_2\ge5\end{aligned}" />,
    reason: <>Since <Katex tex="\hat P=\frac{X_2}{100}" />, multiply each proportion by <Katex tex="100" /> to turn it into a count.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\hat P\ge0.06\mid \hat P\ge0.05\right) = \frac{\Pr(X_2\ge6)}{\Pr(X_2\ge5)}" />,
    reason: <>Conditional probability. <Katex tex="\{X_2\ge6\}" /> sits entirely inside <Katex tex="\{X_2\ge5\}" />, so their intersection is just <Katex tex="X_2\ge6" />.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(100, p, 6, 100) ÷ binomCdf(100, p, 5, 100)</Cas>,
    reason: <>Here <Katex tex="p" /> is the stored, unrounded answer to part (c); <Katex tex="100" /> is the upper bound.</>,
  },
  {
    working: <Katex display tex="= \frac{0.34433\ldots}{0.52340\ldots}" />,
    reason: <>The two binomial probabilities.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.658}" />,
    reason: <>Three decimal places this time, as the question asks.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="Y_2\sim N\!\left(180,\,\sigma^2\right), \qquad \Pr(Y_2>190) = 0.12" />,
    reason: <>The mean is now three hours (<Katex tex="180" /> minutes), and <Katex tex="12\%" /> work for more than <Katex tex="190" /> minutes. <Katex tex="\sigma" /> is the unknown.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.88, 0, 1)</Cas>,
    reason: <>With <Katex tex="\sigma" /> unknown, find the <Katex tex="z" />-value first. <Katex tex="\Pr(Z>z)=0.12" /> means <Katex tex="\Pr(Z<z)=0.88" />.</>,
    more: <>Every normal distribution is the standard normal stretched by <Katex tex="\sigma" /> and shifted by <Katex tex="\mu" />. So <Katex tex="190" /> must sit the same number of standard deviations above the mean as the <Katex tex="z" /> that has <Katex tex="12\%" /> of the standard normal above it.</>,
  },
  {
    working: <Katex display tex="z = 1.17499\ldots" />,
    reason: <>Positive, because <Katex tex="190" /> is above the mean.</>,
  },
  {
    working: <Katex display tex="\frac{190-180}{\sigma} = 1.17499\ldots \implies \sigma = \frac{10}{1.17499\ldots}" />,
    reason: <>The standardising formula <Katex tex="z=\frac{x-\mu}{\sigma}" />, rearranged for <Katex tex="\sigma" />.</>,
    more: <>The report notes some rounding errors. Divide by the stored <Katex tex="z" />: using <Katex tex="z=1.17" /> gives <Katex tex="8.5470" />, and even <Katex tex="z=1.175" /> gives <Katex tex="8.5106" />, both wrong to four decimal places.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 8.5107 \text{ minutes}}" />,
    reason: <>Four decimal places. Larger than the <Katex tex="6" /> minutes of a new laptop, which fits: older batteries are less predictable.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(Y_2<180) = \tfrac12" />,
    reason: <>Part (f) follows the six-month information given before (e), so use those laptops: mean exactly three hours. A normal curve is symmetric, so half lie below. No <Katex tex="\sigma" /> needed.</>,
    more: <>Only <Katex tex="21\%" /> of students scored this mark, and the report notes some did not attempt it. The whole question turns on noticing that "less than three hours" is "below the mean", which is exactly half of any normal distribution. The stem of (f) does not repeat "six months", but it comes after the six-month information, and VCAA's answer of <Katex tex="\tfrac18" /> confirms it. Using the new-laptop value <Katex tex="0.0478" /> from (c) instead would give <Katex tex="0.9522^2\times0.0478\approx0.0433" />.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{first under 3 h is the third}) = \left(\tfrac12\right)\left(\tfrac12\right)\left(\tfrac12\right)" />,
    reason: <>The first two tested last at least three hours, then the third does not. The laptops are independent, so multiply.</>,
    more: <>This is not the binomial "exactly one in three": the order is fixed (not, not, under), so there is no <Katex tex="\binom{3}{1}" /> factor. Including one would give <Katex tex="\tfrac38" />, which also counts the short battery turning up first or second.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac18 = 0.125}" />,
    reason: <>Exact, and as a decimal.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \frac{6}{100} = 0.06, \qquad n = 100" />,
    reason: <>The proportion of interest is laptops lasting under three hours; this sample gives <Katex tex="\hat p=0.06" />.</>,
  },
  {
    working: <Katex display tex="\hat p \pm 1.96\sqrt{\frac{\hat p(1-\hat p)}{n}} = 0.06\pm1.96\sqrt{\frac{0.06\times0.94}{100}}" />,
    reason: <>The <Katex tex="95\%" /> confidence-interval formula from the formula sheet, with <Katex tex="z\approx1.96" />.</>,
    more: <>The report notes students were not expected to write out the formula; the CAS one-proportion confidence-interval command (<Katex tex="x=6" />, <Katex tex="n=100" />, level <Katex tex="0.95" />) gives the endpoints directly.</>,
  },
  {
    working: <Katex display tex="= 0.06\pm0.04655" />,
    reason: <><Katex tex="\sqrt{0.000564}=0.02375" />, times <Katex tex="1.96" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.01,\ 0.11)}" />,
    reason: <>The endpoints are <Katex tex="0.0135" /> and <Katex tex="0.1065" />, each rounded to two decimal places.</>,
    more: <>The report notes some rounding errors, and <Katex tex="(0.01,0.12)" /> as a common incorrect interval. The upper end <Katex tex="0.1065" /> rounds to <Katex tex="0.11" />, not <Katex tex="0.12" />.</>,
  },
]

const ROWS_HI: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = \int_0^{210} x\,f(x)\,dx" />,
    reason: <>The definition of the mean of a continuous random variable. The terminals are where <Katex tex="f" /> is non-zero.</>,
  },
  {
    working: <Cas fn="nInt">nInt(x·(210-x)·e^((x-210)/20)/400, x, 0, 210)</Cas>,
    reason: <>Evaluate numerically on the CAS; this is the technology paper.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 170.01 \text{ minutes}}" />,
    reason: <>Two decimal places: a little under three hours.</>,
    more: <>Plausible: <Katex tex="f" /> peaks at <Katex tex="x=190" /> (where <Katex tex="f'(x)=0" />) and has a long tail to the left, which drags the mean below the peak.</>,
  },
]

const ROWS_HII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{m} f(x)\,dx = \frac12" />,
    reason: <>The median <Katex tex="m" /> has half the probability below it. Integrate <Katex tex="f(x)" /> alone, without the extra <Katex tex="x" /> from part (h)(i).</>,
    more: <>The report notes some students left the <Katex tex="x" /> from the mean calculation on their technology, getting <Katex tex="75.58" />. A median of <Katex tex="75.58" /> next to a mean of <Katex tex="170.01" /> should have set off an alarm. The report also notes the <Katex tex="dx" /> was often missing from students' working.</>,
  },
  {
    working: <Cas fn="solve">solve(∫((210-x)·e^((x-210)/20)/400, x, 0, m) = 0.5, m) | 0&lt;m&lt;210</Cas>,
    reason: <>Restrict <Katex tex="m" /> to the domain <Katex tex="[0,210]" />; without it the CAS also returns a second root, about <Katex tex="225.36" />.</>,
    more: <>The report notes some students gave two solutions because they did not consider the domain. The CAS integrates the formula as if it applied beyond <Katex tex="210" />, where it goes negative, so the integral comes back down through <Katex tex="\tfrac12" /> at <Katex tex="m\approx225.36" />. But <Katex tex="f=0" /> there, so that root is meaningless.</>,
  },
  {
    working: <Katex display tex="\boxed{m \approx 176.45 \text{ minutes}}" />,
    reason: <>Two decimal places. Above the mean of <Katex tex="170.01" />, as expected: <Katex tex="f" /> peaks at <Katex tex="190" /> with a long left tail, which drags the mean down.</>,
  },
  {
    working: <Katex display tex="\int_0^{210} f(x)\,dx = 0.99968\ldots \ne 1" />,
    reason: <>The given <Katex tex="f" /> is not quite a probability density function, so <Katex tex="\int_m^{210}f=\tfrac12" /> gives <Katex tex="176.43" /> instead. VCAA accepted any answer correct to the nearest integer, <Katex tex="176" />.</>,
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
        topic="Binomial Distribution"
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
        topic="Conditional Binomial"
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
        <Explore title="Being told “at least one” removes the X = 0 bar">
          <GivenBars />
        </Explore>
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
        topic="Continuous PDF"
        marks={2}
        statement={
          <>
            For any one laptop, find the probability that it will stop working by the end of
            these three hours. Give your answer correct to four decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
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
        topic="Sample Proportion"
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
        <Explore title="The exact binomial and the normal approximation give different answers">
          <BinomialVsNormal />
        </Explore>
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
        topic="Normal Distribution"
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
        <Explore title="Widen the curve until 12% lies beyond 190 minutes">
          <FindSigma />
        </Explore>
      </PartCard>

      <PartCard
        letter="f"
        topic="First Success"
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
        topic="Confidence Interval"
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
        topic="Mean of PDF"
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
        topic="Median"
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
            Do not let the discrepancy throw you in an exam: pick either equation, write it
            down clearly, and carry on.
          </p>
        </Background>
        <WorkingTable rows={ROWS_HII} />
      </PartCard>
    </div>
  )
}
