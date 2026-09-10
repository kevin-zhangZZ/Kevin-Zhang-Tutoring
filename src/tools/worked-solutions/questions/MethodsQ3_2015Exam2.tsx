// 2015 Mathematical Methods — Exam 2, Section 2 Question 3 (11 marks).
// Mani the fruit grower: a continuous pdf for medium-orange diameter (parts a, b), a normal
// model for large-orange juice volume (part c), and a binomial model for underweight lemons
// (part d). Question text transcribed from the original paper (no diagram given — purely
// algebraic/probabilistic). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_AI: SAExaminerStats = {
  marks: [17, 3, 80],
  average: 1.7,
  comment: (
    <>
      Some students omitted the <Katex tex="dx" />. Some had incorrect terminals, or gave the
      answer without showing any working.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [40, 14, 47],
  average: 1.1,
  comment: (
    <>
      Many students were able to identify the binomial distribution with the correct{' '}
      <Katex tex="n" /> and <Katex tex="p" /> values.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: (
    <>
      Some students worked out the median (solving <Katex tex="\int_6^x f=0.5" />) instead of
      the mean. Others evaluated <Katex tex="\int_6^8 f(x)\,dx" />, leaving out the{' '}
      <Katex tex="x" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [37, 13, 50],
  average: 1.1,
  comment: <>Many students were able to recognise that the problem involved conditional probability.</>,
}

const EXAM_DI: SAExaminerStats = {
  marks: [39, 11, 50],
  average: 1.1,
  comment: (
    <>
      Some students wrote 3% as 0.3. Others used the incorrect value for <Katex tex="n" />.
      Some attempted to use the normal distribution instead.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [52, 13, 35],
  average: 0.9,
  comment: (
    <>
      Some students rounded their answer to 22 instead of rounding up. Trial-and-error methods
      were accepted, provided working was shown.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>7) = \int_7^8 \tfrac34(x-6)^2(8-x)\,dx" />,
    reason: <>Integrate the density over the region asked for.</>,
  },
  {
    working: <Katex display tex="u=x-6 \;\implies\; 8-x=2-u,\quad u: 1\to2" />,
    reason: <>Substitute to simplify — the integrand becomes a plain cubic in <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="= \tfrac34\int_1^2 u^2(2-u)\,du = \tfrac34\int_1^2 (2u^2-u^3)\,du = \tfrac34\left[\tfrac23u^3-\tfrac14u^4\right]_1^2" />,
  },
  {
    working: <Katex display tex="= \tfrac34\left[\left(\tfrac{16}{3}-4\right)-\left(\tfrac23-\tfrac14\right)\right] = \tfrac34\left(\tfrac43-\tfrac{5}{12}\right) = \tfrac34\cdot\tfrac{11}{12}" />,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>7) = \tfrac{11}{16}}" />,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="Y \sim \operatorname{Bi}\!\left(3,\ \tfrac{11}{16}\right)" />,
    reason: <>Each of the 3 oranges independently has diameter <Katex tex=">7" /> with probability <Katex tex="\tfrac{11}{16}" /> from part (a)(i).</>,
  },
  {
    working: <Katex display tex="\Pr(Y=1) = \binom31\left(\tfrac{11}{16}\right)^1\left(\tfrac{5}{16}\right)^2" />,
    reason: <>Binomial probability mass function, exactly one "success" out of 3.</>,
  },
  {
    working: <Katex display tex="= 3\cdot\frac{11}{16}\cdot\frac{25}{256} = \frac{825}{4096}" />,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Y=1) = \dfrac{825}{4096}}" />,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = \int_6^8 x\cdot\tfrac34(x-6)^2(8-x)\,dx" />,
    reason: <>The mean of a continuous random variable.</>,
  },
  {
    working: <Katex display tex="u=x-6 \;\implies\; x=u+6,\ 8-x=2-u,\quad u:0\to2" />,
    reason: <>Same substitution as part (a)(i), now with the extra factor of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="x(x-6)^2(8-x) = (u+6)u^2(2-u) = -u^4-4u^3+12u^2" />,
  },
  {
    working: <Katex display tex="\tfrac34\int_0^2(-u^4-4u^3+12u^2)\,du = \tfrac34\left[-\tfrac15u^5-u^4+4u^3\right]_0^2 = \tfrac34\left(-\tfrac{32}{5}-16+32\right)" />,
  },
  {
    working: <Katex display tex="= \tfrac34\cdot\tfrac{48}{5} = \tfrac{36}{5}" />,
  },
  {
    working: <Katex display tex="\boxed{E(X) = \tfrac{36}{5} = 7.2\text{ cm}}" />,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="O \sim N(74,\ 9^2)" />,
    reason: <>Juice volume for large oranges.</>,
  },
  {
    working: <Katex display tex="\Pr(O<85 \mid O>74) = \dfrac{\Pr(74<O<85)}{\Pr(O>74)}" />,
    reason: <>Conditional probability — restrict to the region <Katex tex="O>74" /> first, since that's the given condition.</>,
  },
  {
    working: <Katex display tex="\Pr(O>74) = 0.5" />,
    reason: <>74 mL is exactly the mean of the normal distribution.</>,
  },
  {
    working: <Katex display tex="\Pr(74<O<85) \approx 0.38918\ldots" />,
    reason: <>Evaluated directly (by CAS/normal CDF) — the region from the mean up to 85 mL.</>,
  },
  {
    working: <Katex display tex="\dfrac{0.38918\ldots}{0.5} \approx 0.77836\ldots" />,
  },
  {
    working: <Katex display tex="\boxed{\Pr(O<85\mid O>74) \approx 0.778}" />,
    reason: <>Correct to three decimal places.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Lemons} \sim \operatorname{Bi}(4,\ 0.03)" />,
    reason: <>4 lemons are checked from each load; each is independently underweight with probability 0.03.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{load rejected}) = \Pr(\text{at least 1 underweight}) = 1-\Pr(\text{none underweight})" />,
  },
  {
    working: <Katex display tex="= 1-(0.97)^4 = 1-0.88529281\ldots" />,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\text{rejected}) \approx 0.1147}" />,
    reason: <>Correct to four decimal places.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{at least 1 of } n \text{ underweight}) = 1-(0.97)^n > 0.5" />,
    reason: <>Same reasoning as part (d)(i), but now with a general sample size <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="(0.97)^n < 0.5" />,
  },
  {
    working: <Katex display tex="n > \dfrac{\ln(0.5)}{\ln(0.97)} \approx 22.7566\ldots" />,
    reason: <>Take logs — dividing by <Katex tex="\ln(0.97)" /> (negative) flips the inequality.</>,
  },
  {
    working: <Katex display tex="\boxed{n=23}" />,
    reason: <>The smallest integer strictly greater than <Katex tex="22.76\ldots" />.</>,
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

      <PartCard letter="a.i" marks={2} statement={<>Find the probability that a randomly selected medium orange has a diameter greater than 7 cm.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
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

      <PartCard letter="b" marks={1} statement={<>Find the mean diameter of medium oranges, in centimetres.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        For oranges classified as large, the quantity of juice obtained from each orange is a
        normally distributed random variable with a mean of 74 mL and a standard deviation of 9
        mL.
      </div>

      <PartCard
        letter="c"
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

      <PartCard letter="d.i" marks={2} statement={<>Find the probability that a particular load of lemons will be rejected. Express the answer correct to four decimal places.</>} examinerReport={EXAM_DI}>
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
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
      </PartCard>
    </div>
  )
}
