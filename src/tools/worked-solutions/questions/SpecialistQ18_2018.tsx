// 2018 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 62% correct.
// Recovering the population standard deviation from a confidence interval. Question text
// transcribed from the original paper; VCAA printed no diagram and neither does the stem
// here (guide §7). Value checked (13.6071; 13.6074 with z = invNorm(0.975)); agrees with
// itute (D). Distractors verified numerically: B = 4.445/1.96 = 2.2679 (σ/√n, the √36 left
// out), A = that cut off at two decimals, C = 13.607… cut off (or 2.267 × 6 = 13.602 from a
// truncated intermediate), E = the interval's midpoint 62.865. Solution is original.
//
// Interactive (extras): interactives/spec-2018-mcq18-fit-sigma — slide σ until the middle 95% of
// the distribution of the mean of 36 dogs, N(x̄, (σ/6)²), fills the given interval (σ ≈ 13.61),
// with one dog's much wider curve behind it. Its toggle builds the interval from σ with no √n,
// which fits at σ ≈ 2.27 (option B).
// WrongMethods: margin = 1.96σ (option B, 11%) and truncating 13.607… (option C, 18%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const FitSigma = lazyWidget(() => import('../interactives/spec-2018-mcq18-fit-sigma'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 11, C: 18, D: 62, E: 3 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Width} = 67.31 - 58.42 = 8.89" />,
    reason: <>How do I get at <Katex tex="\sigma" /> from an interval? Remember how the interval was built: <Katex tex="\bar x \pm 1.96\,\tfrac{\sigma}{\sqrt n}" />, a centre plus or minus a margin. The ends of the interval therefore tell us the margin, and the margin contains <Katex tex="\sigma" />.</>,
  },
  {
    working: <Katex display tex="\text{Margin of error} = \frac{8.89}{2} = 4.445" />,
    reason: <>The interval is symmetric about the sample mean <Katex tex="\bar x = 62.865" /> (its midpoint), so the margin of error is half the width.</>,
  },
  {
    working: <Katex display tex="\text{Margin of error} = z\,\frac{\sigma}{\sqrt n} = 1.96\times\frac{\sigma}{\sqrt{36}}" />,
    reason: <>For <Katex tex="95\%" />, <Katex tex="z=1.96" /> because <Katex tex="\Pr(-1.96<Z<1.96)=0.95" /> (on CAS, <Cas fn="invNorm">invNorm(0.975)</Cas> <Katex tex="\approx1.96" />). The <Katex tex="\sqrt{36}" /> is there because the interval is about the <em>average</em> of <Katex tex="36" /> dogs, and an average of <Katex tex="36" /> varies only <Katex tex="\tfrac{1}{\sqrt{36}}" /> as much as one dog does.</>,
  },
  {
    working: <Katex display tex="4.445 = \frac{1.96\,\sigma}{6}" />,
    reason: <><Katex tex="\sqrt{36}=6" />.</>,
  },
  {
    working: <Katex display tex="\sigma = \frac{4.445\times6}{1.96} = \frac{26.67}{1.96} = 13.6071\ldots" />,
    reason: <>Solve for <Katex tex="\sigma" />. Keep every decimal until the last step: two of the options differ only in the second decimal place.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 13.61}" />,
    reason: <>Matches option <b>D</b>. Option <b>C</b> <Katex tex="(13.60)" /> is <Katex tex="13.607\ldots" /> cut off at two decimals instead of rounded. Option <b>B</b> <Katex tex="(2.27)" /> is <Katex tex="\tfrac{4.445}{1.96}=2.2679\ldots" />: the <Katex tex="\sqrt{36}" /> is left out, so it is <Katex tex="\tfrac{\sigma}{\sqrt n}" />, the standard deviation of the <em>sample mean</em>, not of the dogs; option <b>A</b> <Katex tex="(2.26)" /> is that cut off. Option <b>E</b> <Katex tex="(62.87)" /> is the centre of the interval, <Katex tex="\bar x" />.</>,
  },
]

export default function SpecialistQ18_2018() {
  return (
    <MCQShell
      question={
        <p>
          A <Katex tex="95\%" /> confidence interval for the mean height <Katex tex="\mu" />,
          in centimetres, of a random sample of <Katex tex="36" /> Irish setter dogs is{' '}
          <Katex tex="58.42<\mu<67.31" />. The standard deviation of the height of the
          population of Irish setter dogs, in centimetres, correct to two decimal places, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2.26" /> },
        { letter: 'B', content: <Katex tex="2.27" /> },
        { letter: 'C', content: <Katex tex="13.60" /> },
        { letter: 'D', content: <Katex tex="13.61" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="62.87" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Running a confidence interval backwards">
          <p>
            The usual direction is sample <Katex tex="\to" /> interval. Here you are given the
            interval and asked for one of the inputs, so read the construction in reverse:
            half the width is the margin of error, and the margin of error is{' '}
            <Katex tex="1.96\,\tfrac{\sigma}{\sqrt n}" />.
          </p>
          <p>
            Two of the five options sit <Katex tex="0.01" /> apart, so this is also a rounding
            question — carry the full value of <Katex tex="\tfrac{26.67}{1.96}" /> before
            rounding at the last step. And note the question asks for the{' '}
            <em>population</em> standard deviation <Katex tex="\sigma" />, not the standard
            deviation of the sample mean; the small options are the latter.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Why the interval uses σ/6, not σ">
            <FitSigma />
          </Explore>
          <WrongMethod
            title="The margin of error is 1.96σ"
            source="11% chose B"
            working={<Katex display tex="4.445 = 1.96\,\sigma \implies \sigma \approx 2.27" />}
          >
            <p>
              <Katex tex="\mu \pm 1.96\sigma" /> is where about <Katex tex="95\%" /> of individual <em>dogs</em> lie. An
              interval for <Katex tex="\mu" /> is built from the mean of the <Katex tex="36" /> sampled dogs, whose standard
              deviation is <Katex tex="\tfrac{\sigma}{\sqrt{36}}=\tfrac{\sigma}{6}" />. So <Katex tex="2.27" /> is{' '}
              <Katex tex="\tfrac{\sigma}{6}" />, and <Katex tex="\sigma" /> is six times it. To catch it: every interval for a
              mean has <Katex tex="\sqrt n" /> in it, so if your working never used the <Katex tex="36" />, something is
              missing.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Two decimal places: stop after the second digit"
            source="18% chose C"
            working={<Katex display tex="\sigma = 13.607\ldots \to 13.60" />}
          >
            <p>
              Rounding looks at the <em>third</em> decimal: here it is <Katex tex="7" />, so <Katex tex="13.607\ldots" />{' '}
              rounds up to <Katex tex="13.61" />. Cutting off an intermediate value does the same damage: <Katex tex="\tfrac{\sigma}{6}=2.2678\ldots" />{' '}
              cut to <Katex tex="2.267" /> gives <Katex tex="2.267\times6=13.602" />. When two options sit{' '}
              <Katex tex="0.01" /> apart, keep the full calculator value to the end and round once.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
