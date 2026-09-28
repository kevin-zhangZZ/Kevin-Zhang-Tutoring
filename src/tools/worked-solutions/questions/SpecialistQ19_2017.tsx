// 2017 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 44% correct.
// How much bigger must the sample size be to shrink a confidence interval's width by 75%?
// Question text transcribed from the original paper; solution is original.
// Interactive (extras): spec-2017-mcq19-width — the width ratio 1/√k against the sample-size
// multiplier k, the 25% target line, and the old/new intervals as bars; a toggle draws the
// forgot-the-square-root curve 1/k. WrongMethod: width ∝ 1/n (18% chose B; 1/0.25 = 4 checked).
// Option C (9) has no clear single slip, so it isn't attributed. itute agrees (D).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const WidthWidget = lazyWidget(() => import('../interactives/spec-2017-mcq19-width'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 18, C: 19, D: 44, E: 9 },
  answer: 'D',
  noAnswer: 1,
  comment: 'The new width is 25% of the old width.',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} \propto \frac{1}{\sqrt n}" />,
    reason: <>The interval is <Katex tex="\bar x \pm z\dfrac{\sigma}{\sqrt n}" />, so its width is <Katex tex="2z\dfrac{\sigma}{\sqrt n}" />. The confidence level (so <Katex tex="z" />) and the population (so <Katex tex="\sigma" />) aren&apos;t changing, so the width depends on <Katex tex="n" /> only through <Katex tex="1/\sqrt n" />. Spotting that square root is the whole question.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{decrease the width by } 75\%" />
        <Katex display tex="\implies\; \text{new width} = 0.25 \times \text{old width}" />
      </>
    ),
    reason: <>&ldquo;Decrease <em>by</em> 75%&rdquo; means only 25% of the original width is left, just as $100 decreased by 75% leaves $25.</>,
  },
  {
    working: <Katex display tex="\frac{1/\sqrt{n_{\text{new}}}}{1/\sqrt{n_{\text{old}}}} = 0.25" />,
    reason: <>Set the ratio of new to old width equal to <Katex tex="0.25" />. The constant <Katex tex="2z\sigma" /> cancels, which is why it was safe to ignore.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\sqrt{\frac{n_{\text{old}}}{n_{\text{new}}}} = 0.25" />
        <Katex display tex="\implies\; \frac{n_{\text{old}}}{n_{\text{new}}} = 0.0625" />
      </>
    ),
    reason: <>Square both sides to clear the square root.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{n_{\text{new}}}{n_{\text{old}}} = \frac{1}{0.0625} = 16}" />,
    reason: <>Matches option <b>D</b>: the sample size must be multiplied by <Katex tex="16" />. Because of the square root, you square the factor you want: a width <Katex tex="\tfrac14" /> as big needs <Katex tex="4^2=16" /> times the sample. Option B, <Katex tex="4" />, is <Katex tex="1/0.25" /> without the squaring; multiplying <Katex tex="n" /> by 4 only halves the width.</>,
  },
]

export default function SpecialistQ19_2017() {
  return (
    <MCQShell
      question={
        <p>
          A confidence interval is to be used to estimate the population mean <Katex tex="\mu" /> based on a
          sample mean <Katex tex="\bar x" />.
          <br />
          To decrease the width of a confidence interval by 75%, the
          sample size must be multiplied by a factor of
        </p>
      }
      background={
        <p>
          An approximate confidence interval for <Katex tex="\mu" /> is{' '}
          <Katex tex="\left(\bar x - z\dfrac{\sigma}{\sqrt n},\ \bar x + z\dfrac{\sigma}{\sqrt n}\right)" />, where{' '}
          <Katex tex="z" /> depends only on the confidence level (<Katex tex="1.96" /> for 95%). Its width,{' '}
          <Katex tex="2z\dfrac{\sigma}{\sqrt n}" />, shrinks as the sample grows, but only like{' '}
          <Katex tex="1/\sqrt n" />.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="9" /> },
        { letter: 'D', content: <Katex tex="16" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="25" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Width shrinks like 1/√n, so a quarter of the width costs 16 times the sample">
            <WidthWidget />
          </Explore>
          <WrongMethod
            title="Width ∝ 1/n, so a quarter of the width needs 4 times the sample"
            source="18% chose B"
            working={<Katex display tex="\frac{n_{\text{new}}}{n_{\text{old}}}=\frac{1}{0.25}=4 \quad \text{(option B)}" />}
          >
            <p>
              This forgets that <Katex tex="n" /> sits under a square root in <Katex tex="\dfrac{\sigma}{\sqrt n}" />.
              With 4 times the sample the width becomes <Katex tex="\dfrac{1}{\sqrt4}=\dfrac12" /> of the old width,
              only a 50% decrease. Catch it by substituting back:{' '}
              <Katex tex="\dfrac{\sigma}{\sqrt{4n}}=\dfrac12\cdot\dfrac{\sigma}{\sqrt n}" />, not{' '}
              <Katex tex="\dfrac14" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
