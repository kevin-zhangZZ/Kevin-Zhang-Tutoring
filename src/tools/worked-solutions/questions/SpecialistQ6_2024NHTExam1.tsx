// 2024 Specialist NHT — Exam 1, Question 6 (4 marks). The NHT report gives sample answers only,
// with no statistics. Known-σ 95% confidence intervals for a mean: n = 16 gives (24.5, 25.5); n = 25
// gives (24.6, 25.4), and the width falls from 1 to 0.8, a 20% reduction (the same 20% as the
// unrounded ratio √16/√25 = 4/5). Question text transcribed from the original paper (read from a
// rendered page image). Answers checked numerically and against the VCAA report's sample answers,
// which agree. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x=25,\quad\sigma=1,\quad n=16,\quad z=1.96" />,
    reason: <>The population standard deviation is known (1 gram), so the interval uses <Katex tex="\sigma" /> directly, with the <Katex tex="z" /> value the question gives.</>,
  },
  {
    working: <Katex display tex="\frac{\sigma}{\sqrt n}=\frac{1}{\sqrt{16}}=\frac14" />,
    reason: <>The standard deviation of the sample mean <Katex tex="\overline{X}" />: averaging 16 muffins makes the mean four times less variable than a single muffin.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\left(25-1.96\times\tfrac14,\ 25+1.96\times\tfrac14\right) \\ &=(25-0.49,\ 25+0.49)\end{aligned}" />,
    reason: <>The formula-sheet interval <Katex tex="\left(\bar x-z\tfrac{\sigma}{\sqrt n},\ \bar x+z\tfrac{\sigma}{\sqrt n}\right)" />. <Katex tex="1.96\div4=0.49" /> is easy by hand.</>,
  },
  {
    working: <Katex display tex="=(24.51,\ 25.49)\approx\boxed{(24.5,\ 25.5)}" />,
    reason: <>Subtract and add, then round each end to one decimal place, as asked.</>,
    more: <>Sanity check: the interval is centred on the sample mean 25 ✓, and its half-width (about 0.5 g) is small compared with the 1 g spread of single muffins, as it should be for the mean of 16 muffins.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{\sigma}{\sqrt n}=\frac{1}{\sqrt{25}}=\frac15" />,
    reason: <>Same population (<Katex tex="\sigma=1" />), same sample mean and same confidence level. Only <Katex tex="n" /> has changed, from 16 to 25.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\left(25-1.96\times\tfrac15,\ 25+1.96\times\tfrac15\right) \\ &=(24.608,\ 25.392) \\ &\approx(24.6,\ 25.4)\end{aligned}" />,
    reason: <><Katex tex="1.96\div5=0.392" />. Round each end to one decimal place, because the question says this interval was calculated that way, so its width comes from these rounded ends.</>,
  },
  {
    working: <Katex display tex="\text{widths: } 25.5-24.5=1,\qquad 25.4-24.6=0.8" />,
    reason: <>The width of an interval is its upper limit minus its lower limit.</>,
  },
  {
    working: <Katex display tex="\frac{1-0.8}{1}\times100\%=\boxed{20\%}" />,
    reason: <>Percentage reduction = (decrease ÷ original) × 100%, where the original is the width of the part a interval.</>,
    more: <>Without rounding the answer is the same: the width is <Katex tex="2\times1.96\tfrac{\sigma}{\sqrt n}" />, proportional to <Katex tex="\tfrac1{\sqrt n}" />, so the new width is <Katex tex="\tfrac{\sqrt{16}}{\sqrt{25}}=\tfrac45" /> of the old one: a 20% reduction. Note that 25 is about 56% more muffins than 16, yet the width only falls by 20%, because precision improves with <Katex tex="\sqrt n" />, not <Katex tex="n" />.</>,
  },
]

export default function SpecialistQ6_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Confidence Interval"
        marks={2}
        statement={
          <>
            <p>
              A café made a large batch of muffins. The masses of the muffins are normally distributed with a mean of{' '}
              <Katex tex="\mu" /> grams and a standard deviation of 1 gram.
            </p>
            <p className="mt-2">
              A random sample of 16 muffins was selected from the batch, and the sample mean was 25 grams.
            </p>
            <p className="mt-2">
              Find a 95% confidence interval <Katex tex="(z=1.96)" /> for <Katex tex="\mu" />. Give your answer correct to
              one decimal place.
            </p>
          </>
        }
      >
        <Background>
          <p>
            A sample mean <Katex tex="\bar x" /> estimates the unknown population mean <Katex tex="\mu" />. Because the
            sample mean varies from sample to sample with standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" />, an
            approximate 95% confidence interval reaches 1.96 of those standard deviations either side of{' '}
            <Katex tex="\bar x" />: <Katex tex="\left(\bar x-1.96\tfrac{\sigma}{\sqrt n},\ \bar x+1.96\tfrac{\sigma}{\sqrt n}\right)" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod title="Use σ instead of σ/√n" working={<Katex display tex="25\pm1.96\times1=(23.0,\ 27.0)" />}>
          That interval describes where about 95% of <b>individual muffins</b> lie, not where the mean is. The
          confidence interval for <Katex tex="\mu" /> uses the standard deviation of the sample mean,{' '}
          <Katex tex="\tfrac{\sigma}{\sqrt n}=\tfrac14" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Confidence Interval"
        marks={2}
        statement={
          <>
            <p>
              A different random sample of 25 muffins was selected from the batch. The mean mass of this new sample was
              25 grams, and a 95% confidence interval was calculated correct to one decimal place.
            </p>
            <p className="mt-2">
              By what percentage is the width of the new confidence interval reduced compared to the confidence interval
              calculated from the sample in <b>part a</b>?
            </p>
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
