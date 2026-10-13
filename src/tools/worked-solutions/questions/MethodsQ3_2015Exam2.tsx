// 2015 Mathematical Methods (CAS) — Exam 2, Section 2 Question 3 (11 marks). A continuous pdf
// for medium-orange diameter (parts a, b), a normal model for large-orange juice volume (part c),
// and a binomial model for underweight lemons (part d). Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy/scipy and against the VCAA
// examination report. Solution is original. Integrals are done on CAS (Exam 2), with the by-hand
// expansion in `more` (no u-substitution: not a Methods technique).
// Interactive: d.ii only (35% full marks): dots of 1 - 0.97^n against n show why 22.76 rounds up to 23.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const SampleSizeWidget = lazyWidget(() => import('../interactives/meth-2015e2-q3dii-sample-size'))

const EXAM_AI: SAExaminerStats = {
  marks: [17, 3, 80],
  average: 1.7,
  comment: (
    <>
      Some students omitted the <Katex tex="dx" />. Some had incorrect terminals such as{' '}
      <Katex tex="\int_6^7 f(x)\,dx" />, <Katex tex="\int_{7.0001}^8 f(x)\,dx" /> or{' '}
      <Katex tex="\int_{6.9999}^8 f(x)\,dx" />. Others gave the answer without showing any
      working.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [40, 14, 47],
  average: 1.1,
  comment: (
    <>
      Many students were able to identify the binomial distribution with the correct{' '}
      <Katex tex="n" /> and <Katex tex="p" /> values. A common incorrect answer was{' '}
      <Katex tex="\tfrac{11}{16}\times\left(\tfrac5{16}\right)^2=\tfrac{275}{4096}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: (
    <>
      Some students worked out the median, solving{' '}
      <Katex tex="\int_6^8 f(x)\,dx=0.5" /> for <Katex tex="x" />, instead of the mean. Others
      evaluated <Katex tex="\int_6^8\bigl(f(x)\bigr)dx" />, leaving out <Katex tex="x" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [37, 13, 50],
  average: 1.1,
  comment: (
    <>
      Many students were able to recognise that the problem involved conditional probability.
      Some students evaluated <Katex tex="\tfrac{0.38918\ldots}{0.49999}" /> or{' '}
      <Katex tex="\tfrac{0.889188\ldots}{0.5}" />.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [39, 11, 50],
  average: 1.1,
  comment: (
    <>
      Some students wrote 3% as 0.3. Others had the incorrect value for <Katex tex="n" />,
      using <Katex tex="\text{Lemons}\sim\text{Bi}(3,0.03)" />. Some gave the answer without
      showing any working, while others attempted to use the normal distribution.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [52, 13, 35],
  average: 0.9,
  comment: (
    <>
      Some students rounded their answer to 22. Others did not state the minimum value, leaving
      their answer as <Katex tex="n>22.7566" />. Some students used the trial and error methods
      and this was acceptable. Some students did not show any working.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>7) = \int_7^8 \tfrac34(x-6)^2(8-x)\,dx" />,
    reason: <>A probability for a continuous variable is the area under the density over that region. Above 7 the density is non-zero only up to 8.</>,
    more: <>The report notes some students used terminals such as <Katex tex="\int_6^7" /> (that is <Katex tex="\Pr(X<7)" />, the wrong side) or nudged a terminal to 7.0001 or 6.9999. For a continuous variable <Katex tex="\Pr(X=7)=0" />, so <Katex tex="\Pr(X>7)=\Pr(X\ge7)" /> and the terminal is exactly 7. The upper terminal is 8, not <Katex tex="\infty" />, because <Katex tex="f(x)=0" /> beyond 8. Write the <Katex tex="dx" />: the report notes some students omitted it.</>,
  },
  {
    working: <Katex display tex="= 0.6875 = \tfrac{11}{16}" />,
    reason: <>On CAS, <Cas fn="nInt">nInt(3/4·(x-6)²·(8-x), x, 7, 8)</Cas> gives 0.6875. It terminates, so convert it exactly: <Katex tex="0.6875=\tfrac{6875}{10000}=\tfrac{11}{16}" />.</>,
    more: <>By hand: expand <Katex tex="(x-6)^2(8-x)=-x^3+20x^2-132x+288" />, antidifferentiate to <Katex tex="-\tfrac14x^4+\tfrac{20}3x^3-66x^2+288x" />, and its change from <Katex tex="x=7" /> to <Katex tex="x=8" /> is <Katex tex="\tfrac{11}{12}" />; times <Katex tex="\tfrac34" /> gives <Katex tex="\tfrac{11}{16}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>7) = \tfrac{11}{16}}" />,
    reason: <>Exact, though <Katex tex="0.6875" /> was also accepted. Keep it exact: part (a)(ii) needs a fraction.</>,
    more: <>Sense check: more than a half, which fits the density. It rises to a peak at <Katex tex="x=\tfrac{22}3\approx7.33" /> before falling to zero at 8, so most of its area lies above 7.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="Y \sim \operatorname{Bi}\!\left(3,\ \tfrac{11}{16}\right)" />,
    reason: <>Let <Katex tex="Y" /> be the number of the 3 oranges with diameter over 7 cm. Each independently has probability <Katex tex="\tfrac{11}{16}" />, from part (a)(i).</>,
    more: <>This is the binomial set-up: a fixed number of independent trials (3 randomly selected oranges), each a success (diameter over 7 cm) or not, with the same success probability each time. So <Katex tex="n=3" /> and <Katex tex="p=\tfrac{11}{16}" />, and the failure probability is <Katex tex="1-\tfrac{11}{16}=\tfrac5{16}" />.</>,
  },
  {
    working: <Katex display tex="\Pr(Y=1) = \binom31\left(\tfrac{11}{16}\right)^1\left(\tfrac{5}{16}\right)^2" />,
    reason: <>Binomial probability formula with exactly one success: one orange over 7 cm, two not.</>,
  },
  {
    working: <Katex display tex="= 3\cdot\frac{11}{16}\cdot\frac{25}{256} = \frac{825}{4096}" />,
    reason: <>The factor <Katex tex="\binom31=3" /> counts which of the three oranges is the one over 7 cm.</>,
    more: <>The three orders are (over, not, not), (not, over, not) and (not, not, over), each with probability <Katex tex="\tfrac{11}{16}\cdot\left(\tfrac5{16}\right)^2=\tfrac{275}{4096}" />. Leaving out the 3 gives the report's common incorrect answer <Katex tex="\tfrac{275}{4096}" />: the probability of one particular order only.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Y=1) = \dfrac{825}{4096}}" />,
    reason: <>In the form <Katex tex="\tfrac ab" />, as required. On CAS, <Cas fn="binomPdf">binomPdf(3, 11/16, 1)</Cas> gives the same value, about 0.201.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = \int_6^8 x\cdot\tfrac34(x-6)^2(8-x)\,dx" />,
    reason: <>The mean of a continuous random variable is <Katex tex="\int x f(x)\,dx" /> over its whole domain, here 6 to 8.</>,
    more: <>The report notes two errors. Some students left out the factor <Katex tex="x" /> and evaluated <Katex tex="\int_6^8 f(x)\,dx" />, which is always 1 for a density, so an answer of 1 cm should ring alarm bells. Others found the median instead, solving <Katex tex="\int_6^m f(x)\,dx=0.5" /> (the report prints the upper terminal as 8, but means a variable upper terminal): that gives <Katex tex="m\approx7.23" />, close to the mean here but a different quantity.</>,
  },
  {
    working: <Katex display tex="= 7.2" />,
    reason: <>On CAS, <Cas fn="nInt">nInt(x·3/4·(x-6)²·(8-x), x, 6, 8)</Cas>.</>,
    more: <>By hand: <Katex tex="x(x-6)^2(8-x)=-x^4+20x^3-132x^2+288x" />, with antiderivative <Katex tex="-\tfrac15x^5+5x^4-44x^3+144x^2" />. Its change from <Katex tex="x=6" /> to <Katex tex="x=8" /> is <Katex tex="\tfrac{48}5" />, and <Katex tex="\tfrac34\cdot\tfrac{48}5=\tfrac{36}5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = \tfrac{36}{5} = 7.2\text{ cm}}" />,
    reason: <>Exactly <Katex tex="\tfrac{36}{5}" />, in centimetres like the diameter <Katex tex="X" />.</>,
    more: <>Sense check: the mean lies between 6 and 8, a little below the median (about 7.23), because the density has a long tail on the left towards 6 and peaks at <Katex tex="x=\tfrac{22}3\approx7.33" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="O \sim N(74,\ 9^2)" />,
    reason: <>Let <Katex tex="O" /> be the juice volume (mL) of a large orange: normal, mean 74, standard deviation 9.</>,
  },
  {
    working: <Katex display tex="\Pr(O<85 \mid O>74) = \dfrac{\Pr(O<85\,\cap\,O>74)}{\Pr(O>74)}" />,
    reason: <>"Given that" means conditional probability: Pr(both) ÷ Pr(the given event).</>,
  },
  {
    working: <Katex display tex="= \dfrac{\Pr(74<O<85)}{\Pr(O>74)}" />,
    reason: <>Both events happen exactly when the volume is between 74 and 85 mL.</>,
    more: <>The report quotes an incorrect <Katex tex="\tfrac{0.889188\ldots}{0.5}" />. Its numerator, <Katex tex="0.889\ldots" />, is <Katex tex="\Pr(O<85)" /> on its own, not the overlap with <Katex tex="O>74" />, and the result, about 1.78, is bigger than 1, which no probability can be.</>,
  },
  {
    working: <Katex display tex="\Pr(O>74) = 0.5" />,
    reason: <>74 mL is the mean, and a normal curve is symmetric about its mean, so exactly half lies above it.</>,
    more: <>Use exactly 0.5. The report also quotes a denominator of 0.49999, which is not the value of <Katex tex="\Pr(O>74)" />. A value like that comes from a nudged or finite CAS bound (for example a lower bound of 74.0001, the same trap as in part (a)(i)); by symmetry the exact value is 0.5.</>,
  },
  {
    working: <Katex display tex="\Pr(74<O<85) = 0.38918\ldots" />,
    reason: <>On CAS, <Cas fn="normCdf">normCdf(74, 85, 74, 9)</Cas>.</>,
  },
  {
    working: <Katex display tex="\dfrac{0.38918\ldots}{0.5} = 0.77837\ldots" />,
    reason: <>Substitute the two values into the conditional-probability quotient.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(O<85\mid O>74) \approx 0.778}" />,
    reason: <>Correct to three decimal places, as asked.</>,
    more: <>Sense check: 85 mL is <Katex tex="\tfrac{85-74}9\approx1.22" /> standard deviations above the mean, so most of the upper half of the distribution lies below it.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="L \sim \operatorname{Bi}(4,\ 0.03)" />,
    reason: <>Let <Katex tex="L" /> be the number of underweight lemons among the 4 weighed. Each is independently underweight with probability 3% = 0.03.</>,
    more: <>The report notes some students wrote 3% as 0.3, used <Katex tex="n=3" /> (the three oranges belong to part (a)(ii); here four lemons are weighed), or tried a normal distribution. A count of successes in a fixed number of independent trials is binomial.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{load rejected}) = \Pr(L\ge1) = 1-\Pr(L=0)" />,
    reason: <>The load is rejected if one or more is underweight. The complement, none underweight, is a single easy term.</>,
  },
  {
    working: <Katex display tex="= 1-(0.97)^4 = 1-0.88529281 = 0.11470719" />,
    reason: <>None underweight means all four are fine, each with probability <Katex tex="1-0.03=0.97" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\text{rejected}) \approx 0.1147}" />,
    reason: <>Correct to four decimal places. On CAS, <Cas fn="binomCdf">1 − binomCdf(4, 0.03, 0, 0)</Cas>.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(L\ge1) = 1-(0.97)^n > 0.5" />,
    reason: <>Same complement as part (d)(i), now with <Katex tex="n" /> lemons weighed, so <Katex tex="L\sim\operatorname{Bi}(n,0.03)" />.</>,
  },
  {
    working: <Katex display tex="(0.97)^n < 0.5" />,
    reason: <>Subtract 1, then multiply by <Katex tex="-1" />, which flips the inequality.</>,
  },
  {
    working: <Katex display tex="n\log_e(0.97) < \log_e(0.5)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides (it is increasing, so the inequality keeps its direction), then bring the power down.</>,
  },
  {
    working: <Katex display tex="n > \dfrac{\log_e(0.5)}{\log_e(0.97)} = 22.7566\ldots" />,
    reason: <><Katex tex="\log_e(0.97)" /> is negative, so dividing by it flips the inequality.</>,
    more: <>On CAS, <Cas fn="solve">solve(1-0.97^n &gt; 0.5, n)</Cas> gives <Katex tex="n>22.7566\ldots" /> directly. The report notes trial and error was acceptable; if you use it, show <Katex tex="1-0.97^{22}" /> and <Katex tex="1-0.97^{23}" />, the two values either side of 0.5.</>,
  },
  {
    working: <Katex display tex="\boxed{n=23}" />,
    reason: <><Katex tex="n" /> must be a whole number greater than 22.76…, so round up. Check: <Katex tex="1-0.97^{22}\approx0.488" /> fails, <Katex tex="1-0.97^{23}\approx0.504" /> works.</>,
    more: <>The report notes two ways students lost marks here. Some rounded 22.7566… to 22, the nearest integer, but 22 falls short, as the check shows: when a sample size must reach a threshold, round up. Others left the answer as <Katex tex="n>22.7566" />, which describes every sample size that works; the question asks for the smallest one, a single value.</>,
  },
]

export default function MethodsQ3_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (11 marks)</p>
        <p className="mb-2">
          Mani is a fruit grower. After his oranges have been picked, they are sorted by a
          machine, according to size. Oranges classified as medium are sold to fruit shops and
          the remainder are made into orange juice.
        </p>
        <p className="mb-2">
          The distribution of the diameter, in centimetres, of medium oranges is modelled by a
          continuous random variable, <Katex tex="X" />, with probability density function
        </p>
        <Katex
          display
          tex="f(x) = \begin{cases} \tfrac34(x-6)^2(8-x) & 6\le x\le 8 \\ 0 & \text{otherwise} \end{cases}"
        />
      </div>

      <PartCard letter="a.i" topic="Continuous PDF" marks={2} statement={<>Find the probability that a randomly selected medium orange has a diameter greater than 7 cm.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            Mani randomly selects three medium oranges. Find the probability that exactly one of
            the oranges has a diameter greater than 7 cm. Express the answer in the form{' '}
            <Katex tex="\tfrac{a}{b}" />, where <Katex tex="a" /> and <Katex tex="b" /> are
            positive integers.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard letter="b" topic="Mean of PDF" marks={1} statement={<>Find the mean diameter of medium oranges, in centimetres.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        For oranges classified as large, the quantity of juice obtained from each orange is a
        normally distributed random variable with a mean of 74 mL and a standard deviation of 9
        mL.
      </div>

      <PartCard
        letter="c"
        topic="Normal Distribution"
        marks={2}
        statement={
          <>
            What is the probability, correct to three decimal places, that a randomly selected
            large orange produces less than 85 mL of juice, given that it produces more than 74
            mL of juice?
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Mani also grows lemons, which are sold to a food factory. When a truckload of lemons
        arrives at the food factory, the manager randomly selects and weighs four lemons from the
        load. If one or more of these lemons is underweight, the load is rejected. Otherwise it
        is accepted. It is known that 3% of Mani's lemons are underweight.
      </div>

      <PartCard letter="d.i" topic="Binomial Distribution" marks={2} statement={<>Find the probability that a particular load of lemons will be rejected. Express the answer correct to four decimal places.</>} examinerReport={EXAM_DI}>
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Minimum Sample Size"
        marks={2}
        statement={
          <>
            Suppose that instead of selecting only four lemons, <Katex tex="n" /> lemons are
            selected at random from a particular load. Find the smallest integer value of{' '}
            <Katex tex="n" /> such that the probability of at least one lemon being underweight
            exceeds 0.5.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
        <Explore title="Why 22.76 rounds up to 23, not down to 22">
          <SampleSizeWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
