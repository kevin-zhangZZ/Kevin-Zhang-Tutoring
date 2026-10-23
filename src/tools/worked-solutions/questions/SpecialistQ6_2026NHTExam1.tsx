// 2026 Specialist NHT — Exam 1, Question 6 (3 marks). The NHT report gives sample answers only,
// with no statistics, and no notes. An approximate 90% confidence interval (11.51, 18.09) for a mean
// with σ = 6 known: the sample mean is the midpoint, 14.8, and the half-width 3.29 = 1.645 × 6/√n
// gives n = 9. Question text transcribed from the original paper. Answers checked in Python and
// against the report's sample answers (14.8; n = 9). The report's part b. working prints
// "18.09 − 14.08 = 3.29", a slip for 18.09 − 14.8 (its result 3.29 is right). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x=\frac{11.51+18.09}{2}=\frac{29.60}{2}" />,
    reason: <>A confidence interval for <Katex tex="\mu" /> is <Katex tex="\bar x\pm z\tfrac{\sigma}{\sqrt n}" />, symmetric about the sample mean, so the sample mean is the midpoint of the interval.</>,
  },
  {
    working: <Katex display tex="\boxed{\bar x=14.8\text{ grams}}" />,
    reason: <>Sanity check: <Katex tex="14.8-11.51=3.29" /> and <Katex tex="18.09-14.8=3.29" />, the same distance either side ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z=1.645" />,
    reason: <>For 90% confidence, 5% is left in each tail, so we need <Katex tex="\Pr(-z<Z<z)=0.90" />, i.e. <Katex tex="\Pr(Z<z)=0.95" />. The question gives this value: <Katex tex="z=1.645" />.</>,
  },
  {
    working: <Katex display tex="14.8+1.645\times\frac{6}{\sqrt n}=18.09" />,
    reason: <>The upper end of the interval is <Katex tex="\bar x+z\tfrac{\sigma}{\sqrt n}" />, with <Katex tex="\bar x=14.8" /> from part a. and the population standard deviation <Katex tex="\sigma=6" />.</>,
  },
  {
    working: <Katex display tex="1.645\times\frac{6}{\sqrt n}=18.09-14.8=3.29" />,
    reason: <>The margin of error is 3.29, half the width of the interval.</>,
    more: <>The report&apos;s working prints this line as <Katex tex="18.09-14.08=3.29" />; the 14.08 is a slip for 14.8, and its 3.29 is right.</>,
  },
  {
    working: <Katex display tex="\frac{6}{\sqrt n}=\frac{3.29}{1.645}=2\implies\sqrt n=3" />,
    reason: <><Katex tex="3.29=2\times1.645" />, so the division is exact (no calculator needed). Then <Katex tex="\sqrt n=\tfrac62" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n=9}" />,
    reason: <>Sanity check: with <Katex tex="n=9" />, <Katex tex="\tfrac{\sigma}{\sqrt n}=\tfrac63=2" />, and <Katex tex="14.8\pm1.645\times2=14.8\pm3.29" /> gives back <Katex tex="(11.51,\ 18.09)" /> ✓.</>,
  },
]

export default function SpecialistQ6_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (3 marks)</p>
        <p>
          The masses of a particular variety of cherry tomato may be assumed to be normally distributed with a population
          standard deviation of 6 grams. A sample of size <Katex tex="n" /> is randomly selected from a large population of
          cherry tomatoes and an approximate 90% confidence interval for the population mean of the masses is calculated
          to be (11.51, 18.09).
        </p>
        <p>
          Use <Katex tex="\Pr(Z<1.645)=0.95" /> in your calculations.
        </p>
      </div>

      <PartCard letter="a" topic="Confidence Interval" marks={1} statement={<>Write down the sample mean.</>}>
        <Background>
          <p>
            With the population standard deviation <Katex tex="\sigma" /> known, an approximate confidence interval for
            the population mean is <Katex tex="\left(\bar x-z\tfrac{\sigma}{\sqrt n},\ \bar x+z\tfrac{\sigma}{\sqrt n}\right)" />.
            It is centred on the sample mean <Katex tex="\bar x" />, and its half-width <Katex tex="z\tfrac{\sigma}{\sqrt n}" /> is
            the margin of error. For 90% confidence, <Katex tex="z" /> cuts off 5% in each tail.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Sample Size" marks={2} statement={<>Calculate <Katex tex="n" />, the sample size.</>}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
