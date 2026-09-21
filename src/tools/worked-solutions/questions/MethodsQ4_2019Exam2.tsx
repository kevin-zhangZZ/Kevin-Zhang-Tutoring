// 2019 Mathematical Methods — Exam 2, Question 4 (17 marks).
// The Lorenz birdwing butterfly's life span (a continuous random variable, parts a-c), its
// wingspan (normally distributed, parts d-e), a binomial model for "very large" butterflies
// in a sample of 36 (part f), and a confidence interval used to back out a sample size from
// Town B (part g). Question text transcribed from the original paper (no diagram given).
// Cross-checked against the VCAA examination report and itute's independent solutions, and
// independently re-derived (every numeric part confirmed exactly by computer algebra/CAS).
// Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [17, 4, 78],
  average: 1.6,
  comment: (
    <>
      This question was done well. Some students worked out the median instead of the mean, or
      evaluated <Katex tex="\displaystyle\int_0^5\tfrac{4}{625}(5x^3-x^4)\,dx" /> (forgetting the{' '}
      <Katex tex="x" /> weighting). Other students gave an approximate answer. Some students
      tried to treat <Katex tex="f" /> as a discrete random variable.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [42, 4, 55],
  average: 1.2,
  comment: (
    <>
      Some students found the probability but did not multiply by <Katex tex="80" />. Other
      students used a discrete random variable or the normal distribution. Some students
      evaluated <Katex tex="\displaystyle80\int_0^2\tfrac{4}{625}(5x^3-x^4)\,dx" /> (the
      complementary region) and others rounded to <Katex tex="74" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 17, 57],
  average: 1.3,
  comment: (
    <>
      Many students used conditional probability correctly. Some students used{' '}
      <Katex tex="\Pr(X\ge2\mid X\ge4)" /> instead. Other students rounded their intermediate
      answers too early.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: <>This question was answered well. Some students rounded incorrectly, giving their answer as <Katex tex="0.1511" /> or <Katex tex="0.1516" />.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: <>This question was answered reasonably well. A common incorrect answer was <Katex tex="9.9" />.</>,
}

const EXAM_FI: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: <>This question was answered well.</>,
}

const EXAM_FII: SAExaminerStats = {
  marks: [58, 19, 23],
  average: 0.7,
  comment: <>A common incorrect answer was <Katex tex="n=6" />. Some students gave an answer without any working — trial and error is an acceptable method, but working must still be shown.</>,
}

const EXAM_FIII: SAExaminerStats = {
  marks: [45, 13, 42],
  average: 1.0,
  comment: <>Some students found <Katex tex="E(X)=36\times0.0527=1.8972" /> instead of <Katex tex="E(\hat P)" />. Many students were able to find the standard deviation.</>,
}

const EXAM_FIV: SAExaminerStats = {
  marks: [70, 11, 19],
  average: 0.5,
  comment: <>Many students were able to find the first interval (for <Katex tex="\hat P" />). Some students used the normal distribution instead. Others rounded their final answer to <Katex tex="0.738" />.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [69, 6, 25],
  average: 0.6,
  comment: <>Many students had the sample proportion as <Katex tex="0.0527" /> or <Katex tex="0.55" /> instead of <Katex tex="0.055" /> (the midpoint of the given interval). Others did not include the <Katex tex="1.96" />.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = \int_0^5 x\cdot\dfrac{4}{625}(5x^3-x^4)\,dx" />,
  },
  {
    working: <Katex display tex="\boxed{E(X) = \dfrac{10}{3} \text{ weeks}}" />,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>2) = \int_2^5 \dfrac{4}{625}(5x^3-x^4)\,dx \approx 0.91296" />,
  },
  {
    working: <Katex display tex="80\times0.91296 \approx 73.04" />,
  },
  {
    working: <Katex display tex="\boxed{73 \text{ butterflies}}" />,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge4\mid X\ge2) = \dfrac{\Pr(X\ge4)}{\Pr(X\ge2)} = \dfrac{\int_4^5\tfrac{4}{625}(5x^3-x^4)\,dx}{\int_2^5\tfrac{4}{625}(5x^3-x^4)\,dx}" />,
  },
  {
    working: <Katex display tex="= \dfrac{0.26272}{0.91296}" />,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.2878}" />,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Wingspan } L\sim N(14.1,\ 2.1^2)" />,
  },
  {
    working: <Katex display tex="\Pr(16<L<18)" />,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.1512}" />,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Smallest } 5\%\text{: solve } \Pr(L<l)=0.05" />,
  },
  {
    working: <Katex display tex="l \approx 10.6458" />,
  },
  {
    working: <Katex display tex="\boxed{l \approx 10.6 \text{ cm}}" />,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\operatorname{Bi}(36,\ 0.0527)" />,
    reason: <>Number of "very large" butterflies in the sample.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = 1-\Pr(X\le2)" />,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.2947}" />,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge6) \approx 0.01066 > 0.01" />,
  },
  {
    working: <Katex display tex="\Pr(X\ge7) \approx 0.00244 < 0.01" />,
  },
  {
    working: <Katex display tex="\boxed{n=7}" />,
  },
]

const ROWS_FIII: WorkingRow[] = [
  {
    working: <Katex display tex="E(\hat P) = p = \boxed{0.0527}" />,
  },
  {
    working: <Katex display tex="sd(\hat P) = \sqrt{\dfrac{p(1-p)}{n}} = \sqrt{\dfrac{0.0527(1-0.0527)}{36}}" />,
  },
  {
    working: <Katex display tex="\boxed{sd(\hat P) \approx 0.0372}" />,
  },
]

const ROWS_FIV: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P \in \bigl(0.0527-0.0372,\ 0.0527+0.0372\bigr) = (0.0155,\ 0.0899)" />,
    reason: <>One standard deviation either side of <Katex tex="0.0527" /> (part f.iii).</>,
  },
  {
    working: <Katex display tex="X = n\hat P \in \bigl(36\times0.0155,\ 36\times0.0899\bigr) \approx (0.56,\ 3.24)" />,
  },
  {
    working: <Katex display tex="\implies X\in\{1,2,3\} \quad (X \text{ is a whole number of butterflies})" />,
  },
  {
    working: <Katex display tex="\Pr(1\le X\le3)" />,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.7380}" />,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \dfrac{0.0234+0.0866}{2} = 0.055" />,
    reason: <>The confidence interval is symmetric about the sample proportion.</>,
  },
  {
    working: <Katex display tex="0.0866 = \hat p + 1.96\sqrt{\dfrac{\hat p(1-\hat p)}{n}}" />,
    reason: <>Standard 95% confidence interval for a proportion.</>,
  },
  {
    working: <Katex display tex="\text{Solve for } n \text{ (by CAS)}" />,
  },
  {
    working: <Katex display tex="\boxed{n = 200}" />,
  },
]

export default function MethodsQ4_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (17 marks)</p>
        <p>
          The Lorenz birdwing is the largest butterfly in Town A. The probability density
          function that describes its life span, <Katex tex="X" />, in weeks, is given by{' '}
          <Katex tex="f(x) = \dfrac{4}{625}(5x^3-x^4)" /> for <Katex tex="0\le x\le5" />, and{' '}
          <Katex tex="f(x)=0" /> elsewhere.
        </p>
      </div>

      <PartCard letter="a" marks={2} statement="Find the mean life span of the Lorenz birdwing butterfly." examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={2} statement="In a sample of 80 Lorenz birdwing butterflies, how many butterflies are expected to live longer than two weeks, correct to the nearest integer?" examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement="What is the probability that a Lorenz birdwing butterfly lives for at least four weeks, given that it lives for at least two weeks, correct to four decimal places?" examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The wingspans of Lorenz birdwing butterflies in Town A are normally distributed with a
          mean of <Katex tex="14.1" /> cm and a standard deviation of <Katex tex="2.1" /> cm.
        </p>
      </div>

      <PartCard letter="d" marks={1} statement="Find the probability that a randomly selected Lorenz birdwing butterfly in Town A has a wingspan between 16 cm and 18 cm, correct to four decimal places." examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={1} statement="A Lorenz birdwing butterfly is considered to be very small if its wingspan is in the smallest 5% of all the Lorenz birdwing butterflies in Town A. Find the greatest possible wingspan, in centimetres, for a very small Lorenz birdwing butterfly in Town A, correct to one decimal place." examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Each year, a detailed study is conducted on a random sample of <Katex tex="36" />{' '}
          Lorenz birdwing butterflies in Town A. A butterfly is considered very large if its
          wingspan is greater than <Katex tex="17.5" /> cm. The probability that the wingspan of
          any Lorenz birdwing butterfly in Town A is greater than <Katex tex="17.5" /> cm is{' '}
          <Katex tex="0.0527" />, correct to four decimal places.
        </p>
      </div>

      <PartCard letter="f.i" marks={1} statement="Find the probability that three or more of the butterflies, in a random sample of 36 Lorenz birdwing butterflies from Town A, are very large, correct to four decimal places." examinerReport={EXAM_FI}>
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard letter="f.ii" marks={2} statement="The probability that n or more butterflies, in a random sample of 36 Lorenz birdwing butterflies from Town A, are very large is less than 1%. Find the smallest value of n, where n is an integer." examinerReport={EXAM_FII}>
        <WorkingTable rows={ROWS_FII} />
      </PartCard>

      <PartCard letter="f.iii" marks={2} statement={<>For random samples of <Katex tex="36" /> Lorenz birdwing butterflies in Town A, <Katex tex="\hat P" /> is the random variable that represents the proportion of butterflies that are very large. Find the expected value and the standard deviation of <Katex tex="\hat P" />, correct to four decimal places.</>} examinerReport={EXAM_FIII}>
        <WorkingTable rows={ROWS_FIII} />
      </PartCard>

      <PartCard letter="f.iv" marks={2} statement="What is the probability that a sample proportion of butterflies that are very large lies within one standard deviation of 0.0527, correct to four decimal places? Do not use a normal approximation." examinerReport={EXAM_FIV}>
        <WorkingTable rows={ROWS_FIV} />
      </PartCard>

      <PartCard letter="g" marks={2} statement="The Lorenz birdwing butterfly also lives in Town B. In a particular sample of Lorenz birdwing butterflies from Town B, an approximate 95% confidence interval for the proportion of butterflies that are very large was calculated to be (0.0234, 0.0866), correct to four decimal places. Determine the sample size used in the calculation of this confidence interval." examinerReport={EXAM_G}>
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
