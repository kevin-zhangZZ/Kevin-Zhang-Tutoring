// 2024 Mathematical Methods — Exam 2, Section B Question 4 (15 marks). Airport luggage: a
// continuous density for the mass of one bag, a compound discrete variable for the number of
// heavy bags per traveller, then sample proportions and confidence intervals. Question text
// transcribed from the original paper (2024 papers are image-only, so read from rendered
// pages). Answers checked with sympy/scipy and against the VCAA examination report. Solution
// is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      This question was answered well.{' '}
      <Katex tex="\int_0^{30}f(x)\,dx" />, <Katex tex="\int_0^{23}f(x)\,dx" /> and{' '}
      <Katex tex="\int_{23}^{\infty}f(x)\,dx" /> were common incorrect answers.
      <br />
      There were some transcription errors when students tried to write{' '}
      <Katex tex="\tfrac{1}{67\,500}x^2(30-x)" /> instead of writing <Katex tex="f(x)" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>This question was answered well.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [21, 9, 71],
  average: 1.5,
  comment: (
    <>
      Some students worked out the variance. Others did not square the mean in the first method
      shown above. Some did not show any working.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [31, 18, 52],
  average: 1.2,
  comment: (
    <>
      Some students evaluated <Katex tex="\tfrac{\Pr(X>18)}{\Pr(X>23)}=2.243" />, giving an
      answer greater than one. Others incorrectly used 0.5 in the denominator,{' '}
      <Katex tex="\tfrac{\Pr(X>18)}{0.5}=0.468" />. Some tried to use the normal distribution.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      This was a &lsquo;show that&rsquo; question. Adequate working needed to be shown.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [86, 3, 11],
  average: 0.3,
  comment: (
    <>
      This question was not answered well. Some students attempted a tree diagram but were unable
      to get the correct values. Others left the question blank.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [50, 18, 33],
  average: 0.9,
  comment: (
    <>
      <Katex tex="\Pr(Y\ge7)=0.743" /> was a common incorrect answer. Some students attempted
      to use the normal distribution.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [67, 15, 18],
  average: 0.5,
  comment: (
    <>
      Some students were able to find the standard deviation but then evaluated{' '}
      <Katex tex="\Pr\!\left(6<Y<10\right)" />. Others used the normal approximation.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [44, 56],
  average: 0.6,
  comment: (
    <>
      This question was done reasonably well. Some students attempted to do it by hand and
      were unsuccessful.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [92, 8],
  average: 0.1,
  comment: (
    <>
      Many students were able find the minimum value, 11, but not the maximum value. A common
      incorrect answer for the maximum value was 50. Others had 10 as the minimum and 40 as the
      maximum.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{heavy} \iff X>23" />,
    reason: <>"Heavy" means the mass exceeds 23 kg, so the probability wanted is <Katex tex="\Pr(X>23)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>23) = \int_{23}^{30}\frac{1}{67500}x^2(30-x)\,dx}" />,
    reason: <>Integrate the density from 23 up to 30, the end of the interval where the rule <Katex tex="\tfrac{1}{67500}x^2(30-x)" /> applies.</>,
    more: <>Writing <Katex tex="\int_{23}^{30}f(x)\,dx" /> is just as good, and safer: the report notes transcription errors when students wrote the rule out in full. Of the report's common incorrect answers, <Katex tex="\int_0^{30}f(x)\,dx" /> is the total probability (it equals 1) and <Katex tex="\int_0^{23}f(x)\,dx" /> is the probability a bag is <em>not</em> heavy. Keep the upper terminal at 30 rather than <Katex tex="\infty" />: beyond 30 the rule <Katex tex="x^2(30-x)" /> goes negative, so only the piecewise <Katex tex="f" /> is zero there. The integral's value, <Katex tex="0.2339\ldots" />, is the 0.234 used from part c on.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}E(X) &= \int_0^{30}x\,f(x)\,dx \\ &= \frac{1}{67500}\int_0^{30}\left(30x^3-x^4\right)dx\end{aligned}" />,
    reason: <>The mean of a continuous random variable is <Katex tex="\int x\,f(x)\,dx" /> over its domain. Here <Katex tex="x\cdot x^2(30-x)=30x^3-x^4" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= \frac{1}{67500}\left[\frac{30x^4}{4}-\frac{x^5}{5}\right]_0^{30} \\ &= \frac{1}{67500}\left(6\,075\,000-4\,860\,000\right)\end{aligned}" />,
    reason: <>Antidifferentiate term by term; the lower terminal 0 contributes nothing.</>,
    more: <>On Exam 2 you can skip the hand work: <Cas fn="nInt" /> (or the template integral) of <Katex tex="x\,f(x)" /> from 0 to 30 gives 18 directly. By hand, <Katex tex="\tfrac{30\times30^4}{4}=6\,075\,000" /> and <Katex tex="\tfrac{30^5}{5}=4\,860\,000" />.</>,
  },
  {
    working: <Katex display tex="\boxed{E(X) = \frac{1\,215\,000}{67\,500} = 18 \text{ kg}}" />,
    reason: <>The mean mass of a piece of luggage.</>,
    more: <>A quick sense check: 18 is above the midpoint 15 of <Katex tex="[0,30]" />, which fits a density whose peak is at <Katex tex="x=20" />, towards the heavy end.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Var}(X) = \int_0^{30}x^2f(x)\,dx - \left[E(X)\right]^2" />,
    reason: <>The variance formula <Katex tex="\text{Var}(X)=E(X^2)-[E(X)]^2" />, with <Katex tex="E(X^2)=\int x^2f(x)\,dx" />. The mean must be squared.</>,
    more: <>The report notes some students did not square the mean in this method: <Katex tex="360-18=342" /> is not the variance. The other form, <Katex tex="\text{Var}(X)=\int_0^{30}(x-18)^2f(x)\,dx" />, gives 36 too.</>,
  },
  {
    working: <Katex display tex="\int_0^{30}x^2f(x)\,dx = 360" />,
    reason: <>By <Cas fn="nInt" />.</>,
  },
  {
    working: <Katex display tex="\text{Var}(X) = 360-18^2 = 360-324 = 36" />,
    reason: <>Subtract the square of the mean from b.i. This is the variance, not yet the answer.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{sd}(X) = \sqrt{36} = 6 \text{ kg}}" />,
    reason: <>The standard deviation is the square root of the variance.</>,
    more: <>The report notes some students worked out the variance and stopped there, and that some did not show any working: this part is worth 2 marks, so write the variance line as well as the answer.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\Pr(X>23\mid X>18) &= \frac{\Pr(X>23 \cap X>18)}{\Pr(X>18)} \\ &= \frac{\Pr(X>23)}{\Pr(X>18)}\end{aligned}" />,
    reason: <>"More than the mean" is the given condition, <Katex tex="X>18" />. Every bag over 23 kg is also over 18 kg, so the intersection is just <Katex tex="X>23" />.</>,
    more: <>The given event always goes in the denominator. The report notes some students evaluated the fraction upside down, <Katex tex="\tfrac{\Pr(X>18)}{\Pr(X>23)}=2.243" />; a probability greater than 1 is the signal that something is wrong.</>,
  },
  {
    working: <Katex display tex="\Pr(X>23) = \int_{23}^{30}f(x)\,dx = 0.23392\ldots" />,
    reason: <>The integral from part a, evaluated with <Cas fn="nInt" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X>18) = \int_{18}^{30}f(x)\,dx = 0.52480" />,
    reason: <>Integrate from the mean to 30. It is not 0.5: the mean of a skewed distribution is not its median. (The report's 0.468 is <Katex tex="\Pr(X>23)/0.5" />.)</>,
    more: <>The report notes some students incorrectly used 0.5 in the denominator. Its printed example has a slip: the numerator should be <Katex tex="\Pr(X>23)" />, since <Katex tex="\tfrac{0.2339}{0.5}=0.468" /> while <Katex tex="\tfrac{0.5248}{0.5}=1.050" />. It also notes some tried to use the normal distribution: <Katex tex="X" /> is not normal — its density is given, so every probability comes from integrating <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{0.23392\ldots}{0.52480} = 0.446}" />,
    reason: <>Correct to three decimal places, as asked.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}W=2 \implies &\text{the traveller checked in two} \\ &\text{pieces, and both are heavy}\end{aligned}" />,
    reason: <>Two heavy pieces are impossible for the 10% and 40% groups, so only the two-piece group contributes.</>,
    more: <>Picture a two-stage tree diagram. The first branches are the number of pieces checked in (0, 1 or 2, with probabilities 0.1, 0.4 and 0.5); then each piece branches into heavy (0.234) or not heavy (0.766). <Katex tex="W=2" /> is the single path "two pieces, heavy, heavy". The same tree gives every entry in c.ii.</>,
  },
  {
    working: <Katex display tex="\Pr(W=2) = 0.5\times0.234\times0.234" />,
    reason: <>Multiply along that path: 0.5 for two pieces, then 0.234 for each heavy piece. The stem says the masses are independent of the number checked in.</>,
  },
  {
    working: <Katex display tex="= 0.5\times0.054756 = 0.027378" />,
    reason: <>Since <Katex tex="0.234^2=0.054756" />. Show this unrounded value: the answer itself was given.</>,
    more: <>The report notes this was a "show that" question and adequate working needed to be shown. Writing only 0.027 earns nothing, because 0.027 is printed in the question; the marker needs to see where it comes from.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(W=2) = 0.027 \ \text{(3 d.p.)}}" />,
    reason: <>As required.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\Pr(W=0) = {}&0.1\times1 + 0.4\times0.766 \\ &+ 0.5\times0.766^2\end{aligned}" />,
    reason: <>Three ways to check in no heavy bags: bring none, bring one that is not heavy, or bring two that are both not heavy. Here <Katex tex="1-0.234=0.766" />.</>,
    more: <>These are the paths of the c.i tree that end with no heavy pieces. The 10% who bring no luggage are easy to forget, but they certainly have <Katex tex="W=0" />, so their branch contributes <Katex tex="0.1\times1" />. The report notes some students attempted a tree diagram but were unable to get the correct values, and others left the question blank.</>,
  },
  {
    working: <Katex display tex="= 0.1+0.3064+0.293378 = 0.699778" />,
    reason: <>Adding the three branches.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(W=1) = {}&0.4\times0.234 \\ &+ 0.5\times2\times0.234\times0.766\end{aligned}" />,
    reason: <>Exactly one heavy bag: either the only bag is heavy, or one of two bags is. The <Katex tex="2" /> counts the two orders, heavy–light and light–heavy.</>,
    more: <>Leaving out the 2 gives <Katex tex="0.0936+0.089622=0.183222" />, and then the three probabilities add to only 0.910, a sign that a path is missing.</>,
  },
  {
    working: <Katex display tex="= 0.0936+0.179244 = 0.272844" />,
    reason: <>Adding the two branches.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(W=0) = 0.700, \qquad \Pr(W=1) = 0.273}" />,
    reason: <>Rounded to three decimal places, these fill the two blank cells of the table.</>,
    more: <>Check: <Katex tex="0.699778+0.272844+0.027378 = 1" /> exactly (and <Katex tex="0.700+0.273+0.027=1" />), so no path has been missed or counted twice.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="Y \sim \text{Bi}(35,\,0.234), \quad \hat{P} = \frac{Y}{35}" />,
    reason: <>Let <Katex tex="Y" /> be the number of heavy pieces in the sample. Each of the 35 pieces is independently heavy with probability 0.234, so <Katex tex="Y" /> is binomial.</>,
    more: <>A sample proportion question is a binomial question in disguise: turn the condition on <Katex tex="\hat{P}" /> into a condition on the count <Katex tex="Y" />, then use the exact binomial distribution. The report notes some students attempted to use the normal distribution; that is only an approximation here and gives about 0.683, not the exact answer.</>,
  },
  {
    working: <Katex display tex="\hat{P}>0.2 \iff Y > 7 \iff Y \ge 8" />,
    reason: <><Katex tex="0.2\times35 = 7" /> exactly, and <Katex tex="Y=7" /> gives <Katex tex="\hat{P}=0.2" />, which is <em>not</em> greater than 0.2. So <Katex tex="Y" /> starts at 8.</>,
    more: <>Including <Katex tex="Y=7" /> gives <Katex tex="\Pr(Y\ge7)=0.743" />, which the report notes was a common incorrect answer.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(Y\ge8) &= 1-\Pr(Y\le7) \\ &= 1-\text{binomCdf}(35,\,0.234,\,0,\,7)\end{aligned}" />,
    reason: <>By <Cas fn="binomCdf" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.595}" />,
    reason: <>Correct to three decimal places.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="E\!\left(\hat{P}\right) = p = 0.234" />,
    reason: <>The mean of a sample proportion is the population proportion <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{sd}\!\left(\hat{P}\right) &= \sqrt{\frac{p(1-p)}{n}} \\ &= \sqrt{\frac{0.234\times0.766}{35}} = 0.071563\end{aligned}" />,
    reason: <>The standard deviation of the sample proportion (formula sheet), with <Katex tex="n=35" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&0.234\pm0.071563 \\ &\implies 0.162437 < \hat{P} < 0.305563\end{aligned}" />,
    reason: <>One standard deviation either side of the mean. Keep the unrounded values.</>,
  },
  {
    working: <Katex display tex="\times 35: \quad 5.685 < Y < 10.695 \iff 6 \le Y \le 10" />,
    reason: <>Multiply by 35 to get counts. <Katex tex="Y" /> is a whole number, so the values inside are 6 through 10.</>,
    more: <>This is the crux. The strict inequalities belong to the real-number interval; once it is turned into whole numbers, both 6 and 10 lie inside it, so both are included. The report's second method reaches the same interval directly from <Katex tex="E(Y)=35\times0.234=8.19" /> and <Katex tex="\text{sd}(Y)=\sqrt{35\times0.234\times0.766}\approx2.505" />.</>,
  },
  {
    working: <Katex display tex="\Pr(6\le Y\le10) = \text{binomCdf}(35,\,0.234,\,6,\,10)" />,
    reason: <>By <Cas fn="binomCdf" />, which includes both bounds, so the bounds are 6 and 10.</>,
    more: <>The report notes some students found the standard deviation but then evaluated <Katex tex="\Pr(6<Y<10)" />, which leaves out 6 and 10 and gives 0.452.</>,
  },
  {
    working: <Katex display tex="\boxed{0.684}" />,
    reason: <>Correct to three decimal places, from the binomial distribution as instructed.</>,
    more: <>The report notes others used the normal approximation, which the question forbids. It gives about 0.683 (the familiar "68%" within one standard deviation) — close, but not the exact binomial answer.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\hat{p} = \frac{10}{50} = 0.2, \qquad n = 50" />,
    reason: <>The point estimate from this sample.</>,
  },
  {
    working: <Katex display tex="z = \text{invNorm}(0.95,0,1) = 1.6449" />,
    reason: <>For 90% confidence, 5% sits in each tail, so <Katex tex="z" /> has 95% of the standard normal below it. By <Cas fn="invNorm" />.</>,
    more: <>Using <Katex tex="1.96" /> would give a 95% interval instead.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&0.2 \pm 1.6449\sqrt{\frac{0.2\times0.8}{50}} \\ &= 0.2\pm1.6449\times0.056569\end{aligned}" />,
    reason: <>The approximate interval <Katex tex="\hat{p}\pm z\sqrt{\tfrac{\hat{p}(1-\hat{p})}{n}}" /> (formula sheet).</>,
    more: <>The margin is <Katex tex="1.6449\times0.056569=0.09305" />. Quicker and safer is the calculator's one-proportion <Katex tex="z" /> interval, with 10 successes, 50 trials and confidence level 0.9; the report notes some students attempted it by hand and were unsuccessful.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.107,\ 0.293)}" />,
    reason: <>Correct to three decimal places.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} = 2z\sqrt{\frac{\hat{p}(1-\hat{p})}{50}}" />,
    reason: <>Both samples have <Katex tex="n=50" /> and 90% confidence, so <Katex tex="z" /> and 50 are fixed. The width depends only on <Katex tex="\hat{p}(1-\hat{p})" />.</>,
  },
  {
    working: <Katex display tex="\hat{p}(1-\hat{p}) > 0.2\times0.8 = 0.16" />,
    reason: <>Wider than the first interval means a bigger product under the root than the first sample's.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\hat{p}(1-\hat{p}) \text{ is a parabola peaking at } \hat{p}=0.5 \\ &\implies 0.2<\hat{p}<0.8\end{aligned}" />,
    reason: <>The parabola is symmetric about 0.5: it equals 0.16 at both 0.2 and 0.8, and is bigger strictly between them.</>,
    more: <>That symmetry supplies the upper limit, which the report notes many students missed. A sample with many heavy pieces (say 39 of 50) gives as uncertain an estimate as one with few; only samples near <Katex tex="\hat{p}=0" /> or <Katex tex="\hat{p}=1" /> give narrow intervals. Solving <Katex tex="\hat{p}(1-\hat{p})>0.16" /> on the calculator confirms <Katex tex="0.2<\hat{p}<0.8" />.</>,
  },
  {
    working: <Katex display tex="0.2<\frac{k}{50}<0.8 \implies 10<k<40" />,
    reason: <>Let <Katex tex="k" /> be the number of heavy pieces, so <Katex tex="\hat{p}=\tfrac{k}{50}" />. Both ends are strict: <Katex tex="k=10" /> or 40 gives the same width, not a wider one.</>,
    more: <>The report notes others had 10 as the minimum and 40 as the maximum; those samples reproduce exactly the width from e.i.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum } 11, \qquad \text{maximum } 39}" />,
    reason: <>The whole numbers strictly between 10 and 40.</>,
    more: <>The report notes 50 was a common incorrect answer for the maximum. With <Katex tex="k=50" />, <Katex tex="\hat{p}=1" /> and the width is zero — the narrowest interval possible, not a wider one.</>,
  },
]

export default function MethodsQ4_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (15 marks)</p>
        <p>
          At an airport, luggage is weighed before it is checked in.
        </p>
        <p>
          The mass of each piece of luggage, in kilograms, is modelled by a continuous random variable{' '}
          <Katex tex="X" />, whose probability density function is
        </p>
        <div className="py-1">
          <Katex
            display
            tex="f(x)=\begin{cases}\dfrac{1}{67500}x^2(30-x) & 0\le x\le30\\[8pt] 0 & \text{elsewhere}\end{cases}"
          />
        </div>
        <p>A piece of luggage is labelled as heavy if its mass exceeds 23 kg.</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The question moves through three different objects that all describe the same
              luggage. <Katex tex="X" /> is the mass of <em>one</em> bag (continuous);{' '}
              <Katex tex="W" /> is the number of heavy bags <em>one traveller</em> checks in
              (discrete, and not binomial, because how many bags they bring is itself random);{' '}
              <Katex tex="\hat{P}" /> is the proportion of heavy bags in a <em>sample</em>{' '}
              (binomial, scaled). Deciding which one a part is about is most of the work.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Continuous PDF"
        marks={1}
        statement={
          <>
            Write a definite integral which gives the probability that a piece of luggage is
            labelled as heavy.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b.i" topic="Mean of PDF" marks={1} statement={<>Find the mean of <Katex tex="X" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" topic="Standard Deviation" marks={2} statement={<>Find the standard deviation of <Katex tex="X" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            Given that the mass of a piece of luggage is more than the mean, find the
            probability that it is labelled as heavy, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">
          Use the following information to answer parts c and d of this question.
        </p>
        <p>Of the travellers flying from the airport</p>
        <ul className="list-disc pl-6 flex flex-col gap-1">
          <li>10% do not check in any luggage</li>
          <li>40% check in exactly one piece of luggage</li>
          <li>50% check in exactly two pieces of luggage.</li>
        </ul>
        <p>
          Assume that the mass of each piece of luggage is independent of the number of pieces
          checked in by each traveller. Use the value of 0.234 for the probability that a piece
          of luggage is labelled as heavy.
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">c.</span> Let{' '}
          <Katex tex="W" /> be the discrete random variable that represents the number of
          pieces of luggage labelled as <b>heavy</b> checked in by each traveller.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Discrete Distribution"
        marks={1}
        statement={
          <>
            Show that <Katex tex="\Pr(W=2)=0.027" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Discrete Distribution"
        marks={2}
        statement={
          <>
            Complete the table below for the probability distribution <Katex tex="W" />,
            correct to three decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border-collapse">
            <tbody>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal">
                  <Katex tex="w" />
                </th>
                {[0, 1, 2].map((v) => (
                  <td key={v} className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center">{v}</td>
                ))}
              </tr>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal whitespace-nowrap">
                  <Katex tex="\Pr(W=w)" />
                </th>
                {['', '', '0.027'].map((v, i) => (
                  <td key={i} className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center">{v}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          On a particular day, a random sample of 35 pieces of luggage was selected at the
          airport.
          <br />
          Let <Katex tex="\hat{P}" /> be the random variable that represents the
          proportion of luggage labelled as heavy in random samples of 35.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Sample Proportion"
        marks={2}
        statement={
          <>
            Find <Katex tex="\Pr\!\left(\hat{P}>0.2\right)" />, correct to three decimal
            places.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Sample Proportion"
        marks={2}
        statement={
          <>
            Determine the probability that <Katex tex="\hat{P}" /> lies within one standard
            deviation of its mean, correct to three decimal places. Do <b>not</b> use a normal
            approximation.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e.i"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            In one random sample of 50 pieces of luggage, 10 are labelled as heavy.
            <br />
            Use this sample to find an approximate 90% confidence interval for <Katex tex="p" />, the
            population proportion of luggage labelled as heavy, correct to three decimal
            places.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            A second random sample of 50 pieces of luggage is selected. Using this sample, the
            approximate 90% confidence interval for <Katex tex="p" />, the population
            proportion of luggage labelled as heavy, is <b>wider</b> than the one obtained
            above in <b>part e.i</b>.
            <br />
            State the minimum and maximum possible number of pieces
            of luggage labelled as heavy in the second sample.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>
    </div>
  )
}
