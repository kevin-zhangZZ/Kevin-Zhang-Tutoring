// 2019 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 76% correct. A 98%
// confidence interval for a population mean from a sample mean and known population standard
// deviation. Question text transcribed from the original paper (no diagram).
// Solution is original. Answer D checked with scipy: z = invNorm(0.99) = 2.32635, 65 ± 2.32635 × 4/6 =
// (63.449, 66.551). The VCAA report prints no comment for this question; itute agrees (D).
// Distractors verified with scipy: B (9%) is 65 ± invNorm(0.98) × 4/6 = (63.631, 66.369), a 96%
// interval; C is 65 ± 2.5758 × 4/6 = (63.283, 66.717), the 99% interval; A is 65 ± 2.3263 × 6 =
// (51.04, 78.96). E's slip is not identified, so it is not named.
// Interactive diagram (§15): interactives/spec-2019-mcq18-tails.tsx shades the middle 98% of the
// sample-mean distribution N(65, (4/6)²) with 1% in each tail, a confidence slider, and a toggle for
// option B's invNorm(0.98), which leaves 2% in each tail (a 96% interval). This site's own figure;
// VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const TailsWidget = lazyWidget(() => import('../interactives/spec-2019-mcq18-tails'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 9, C: 8, D: 76, E: 4 },
  noAnswer: 1,
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{x}\pm z\dfrac{\sigma}{\sqrt n}" />,
    reason: <>&ldquo;Confidence interval for the mean&rdquo; with the population standard deviation <em>known</em> tells you it is a <Katex tex="z" /> interval: sample mean plus or minus <Katex tex="z" /> standard deviations of the sample mean. Here <Katex tex="\overline{x}=65" />, <Katex tex="\sigma=4" />, <Katex tex="n=36" />.</>,
  },
  {
    working: <Katex display tex="98\%\text{ in the middle} \implies 1\%\text{ in each tail}" />,
    reason: <>Always sketch the bell first. The interval holds the middle <Katex tex="98\%" />, so <Katex tex="2\%" /> is left over, and by symmetry it splits evenly between the two tails.</>,
  },
  {
    working: <Katex display tex="z=\operatorname{invNorm}(0.99)\approx2.3263" />,
    reason: <><Katex tex="\operatorname{invNorm}" /> measures area to the <b>left</b>. Left of the upper cut-off sits the middle <Katex tex="98\%" /> plus the lower tail&apos;s <Katex tex="1\%" />, which is <Katex tex="99\%" />, not <Katex tex="98\%" />. On the calculator: <Cas fn="invNorm">invNorm(0.99, 0, 1)</Cas>.</>,
  },
  {
    working: <Katex display tex="\dfrac{\sigma}{\sqrt n}=\dfrac{4}{\sqrt{36}}=\dfrac{4}{6}\approx0.6667" />,
    reason: <>The interval is for the <em>mean</em>, so the spread that matters is that of the sample mean, not of individual athletes. Averaging <Katex tex="36" /> masses cancels out much of the variation, shrinking the standard deviation by a factor of <Katex tex="\sqrt{36}=6" />.</>,
  },
  {
    working: <Katex display tex="2.3263\times0.6667\approx1.5509" />,
    reason: <>The margin of error: how far the interval reaches either side of <Katex tex="\overline{x}" />.</>,
  },
  {
    working: <Katex display tex="65\pm1.5509\approx(63.449,\ 66.551)" />,
    reason: <>The interval is centred on the sample mean <Katex tex="65" />, the only estimate of <Katex tex="\mu" /> we have. Keep extra decimals until the final rounding.</>,
  },
  {
    working: <Katex display tex="\boxed{(63.4,\ 66.6)}" />,
    reason: <>Matches option <b>D</b>. Option <b>B</b>, <Katex tex="(63.6,\ 66.4)" />, is what <Katex tex="z=\operatorname{invNorm}(0.98)\approx2.054" /> gives, a <Katex tex="96\%" /> interval. Option <b>C</b>, <Katex tex="(63.3,\ 66.7)" />, uses <Katex tex="z\approx2.576" />, the <Katex tex="99\%" /> interval. Option <b>A</b>, <Katex tex="(51.0,\ 79.0)" />, is <Katex tex="65\pm2.3263\times6" />: it uses <Katex tex="\sqrt{36}=6" /> where <Katex tex="\tfrac{\sigma}{\sqrt n}=\tfrac46" /> belongs.</>,
    more: <>See the Common Mistake below for option B.</>,
  },
]

export default function SpecialistQ18_2019() {
  return (
    <MCQShell
      question={
        <p>
          The masses of a random sample of <Katex tex="36" /> track athletes have a mean of{' '}
          <Katex tex="65" /> kg. The standard deviation of the masses of all track athletes is
          known to be <Katex tex="4" /> kg.
          <br />
          A <Katex tex="98\%" /> confidence interval for the
          mean of the masses of all track athletes, correct to one decimal place, would be
          closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(51.0,\ 79.0)" /> },
        { letter: 'B', content: <Katex tex="(63.6,\ 66.4)" /> },
        { letter: 'C', content: <Katex tex="(63.3,\ 66.7)" /> },
        { letter: 'D', content: <Katex tex="(63.4,\ 66.6)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="(64.3,\ 65.7)" /> },
      ]}
      background={
        <Background title="Where a confidence interval comes from">
          <p>
            If individual values have mean <Katex tex="\mu" /> and standard deviation <Katex tex="\sigma" />, the mean{' '}
            <Katex tex="\overline{X}" /> of a random sample of <Katex tex="n" /> of them has mean <Katex tex="\mu" /> and
            standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" />, and for a large sample it is approximately normal.
          </p>
          <p>
            So in <Katex tex="98\%" /> of samples, <Katex tex="\overline{x}" /> lands within{' '}
            <Katex tex="z\tfrac{\sigma}{\sqrt n}" /> of <Katex tex="\mu" />, where <Katex tex="z" /> cuts off the middle{' '}
            <Katex tex="98\%" /> of the standard normal. Turn that around: the interval{' '}
            <Katex tex="\overline{x}\pm z\tfrac{\sigma}{\sqrt n}" /> built from <Katex tex="98\%" /> of samples will contain{' '}
            <Katex tex="\mu" />. That is what &ldquo;<Katex tex="98\%" /> confidence&rdquo; means.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why a 98% interval uses invNorm(0.99), not invNorm(0.98)">
            <TailsWidget />
          </Explore>
          <WrongMethod
            title="98% confidence, so z = invNorm(0.98)"
            source="9% chose B"
            working={
              <>
                <Katex display tex="z=\operatorname{invNorm}(0.98)\approx2.0537" />
                <Katex display tex="65\pm2.0537\times\tfrac46\approx(63.6,\ 66.4)" />
                <Katex display tex="\text{(option B)}" />
              </>
            }
          >
            <p>
              <Katex tex="\operatorname{invNorm}(0.98)" /> puts <Katex tex="98\%" /> of the area to the <em>left</em> of the
              upper cut-off, leaving <Katex tex="2\%" /> above it, and by symmetry another <Katex tex="2\%" /> below the lower
              cut-off. Only <Katex tex="96\%" /> is left in the middle, so this is a <Katex tex="96\%" /> interval.
            </p>
            <p>
              Check it against a case you know: a <Katex tex="95\%" /> interval uses <Katex tex="1.96" />, which is{' '}
              <Katex tex="\operatorname{invNorm}(0.975)" />, not <Katex tex="\operatorname{invNorm}(0.95)" />. The same rule
              applies here: half of what is left over goes in each tail.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
