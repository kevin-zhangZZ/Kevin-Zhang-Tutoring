// 2025 Specialist NHT — Exam 1, Question 2 (3 marks). The NHT report gives sample answers only,
// with no statistics. A 95% confidence interval (52.65, 67.35) for a population mean from a sample
// of 16, using z = 2: the sample mean is the centre (60) and the margin of error 7.35 gives the
// population standard deviation σ = 14.7. Question text transcribed from the original paper (read
// from a rendered page image; the 2025 paper has no text layer). Answers checked by computer and
// against the report's sample answers, which agree. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x=\frac{52.65+67.35}{2}=\frac{120}{2}" />,
    reason: <>The interval <Katex tex="\left(\bar x-z\tfrac{\sigma}{\sqrt n},\ \bar x+z\tfrac{\sigma}{\sqrt n}\right)" /> is symmetric about the sample mean, so the sample mean is its midpoint: the average of the two endpoints.</>,
  },
  {
    working: <Katex display tex="\boxed{\bar x=60\text{ g}}" />,
    reason: <>Sanity check: 60 sits inside the interval, 7.35 from each end.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z\frac{\sigma}{\sqrt n}=67.35-60=7.35" />,
    reason: <>The margin of error is the distance from the centre to either end (half the width of the interval).</>,
  },
  {
    working: <Katex display tex="2\times\frac{\sigma}{\sqrt{16}}=7.35" />,
    reason: <>The question says to use <Katex tex="z=2" /> (rather than 1.96), and there are <Katex tex="n=16" /> samples.</>,
  },
  {
    working: <Katex display tex="\frac{2\sigma}{4}=7.35\implies\frac{\sigma}{2}=7.35" />,
    reason: <><Katex tex="\sqrt{16}=4" />, so the left side simplifies to <Katex tex="\tfrac{\sigma}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma=14.7\text{ g}}" />,
    reason: <>Sanity check: <Katex tex="60\pm2\times\tfrac{14.7}{4}=60\pm7.35" /> gives back <Katex tex="(52.65,\ 67.35)" /> ✓.</>,
  },
]

export default function SpecialistQ2_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          It may be assumed that the mass of precious metal found in a randomly selected cubic metre of soil is normally
          distributed throughout a mine.
        </p>
        <p>
          Sixteen samples are taken from random locations within the mine. Each sample consists of one cubic metre of
          soil, independently extracted and analysed. The number of grams of precious metal in each sample is then
          recorded.
        </p>
        <p>
          From the sample results, a 95% confidence interval of (52.65, 67.35) is calculated for the population mean
          using <Katex tex="z=2" />.
        </p>
      </div>

      <PartCard letter="a" topic="Sample Mean" marks={1} statement={<>Write down the sample mean.</>}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Confidence Interval"
        marks={2}
        statement={<>Find the population standard deviation used to calculate the confidence interval.</>}
      >
        <Background>
          <p>
            For a known population standard deviation <Katex tex="\sigma" />, the confidence interval for the population
            mean is <Katex tex="\left(\bar x-z\tfrac{\sigma}{\sqrt n},\ \bar x+z\tfrac{\sigma}{\sqrt n}\right)" />. The term{' '}
            <Katex tex="z\tfrac{\sigma}{\sqrt n}" /> is the margin of error: <Katex tex="\tfrac{\sigma}{\sqrt n}" /> is the
            standard deviation of the sample mean, and <Katex tex="z" /> (about 1.96, rounded here to 2) sets the 95% level.
            Knowing the interval, <Katex tex="z" /> and <Katex tex="n" />, we can work backwards to <Katex tex="\sigma" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Use the whole width as the margin of error"
          working={<Katex display tex="\begin{aligned} 2\times\frac{\sigma}{4}&=67.35-52.65=14.7 \\ \implies\sigma&=29.4 \end{aligned}" />}
        >
          The margin of error is added <i>and</i> subtracted, so the interval is twice as wide as it. Use half the width,
          7.35. Checking the answer by rebuilding the interval catches this: <Katex tex="60\pm2\times\tfrac{29.4}{4}" /> is{' '}
          <Katex tex="60\pm14.7" />, twice too wide.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
