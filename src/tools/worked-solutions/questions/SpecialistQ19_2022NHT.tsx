// 2022 Specialist NHT — Exam 2, MCQ 19. The NHT report gives the answer key only, with no
// statistics. Statistical inference: sample versus population, the standard deviation of the
// sample mean, and a 99% confidence interval for μ. Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="n=100, \quad \bar{x}=6, \quad s=0.8" />,
    reason: <>Everything the question gives describes the <em>sample</em>. The population mean <Katex tex="\mu" /> and standard deviation <Katex tex="\sigma" /> of all the orchard&rsquo;s oranges are unknown, and &ldquo;necessarily correct&rdquo; means a statement must follow from this sample alone.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: }\ \mathrm{sd}(\overline{X}) &= \frac{\sigma}{\sqrt n} \approx \frac{0.8}{\sqrt{100}} = 0.08,\\ &\text{not}\ \frac{0.8}{100}\quad\times\end{aligned}" />,
    reason: <>The spread of sample means shrinks with the <em>square root</em> of the sample size. Option A divides by 100 itself.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B: }\ &90\%\ \text{uses}\ z\approx1.645;\\ &1.96\ \text{is for}\ 95\%\quad\times\end{aligned}" />,
    reason: <>A 90% interval leaves 5% in each tail, so <Katex tex="z" /> = <Cas fn="invNorm" />(0.95) ≈ 1.645.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{C: }\ &\bar{x}=6\ \text{is the sample mean,}\\ &\text{not}\ \mu\quad\times\end{aligned}" />,
    reason: <>Another 100 oranges would give a different sample mean; 6 cm is an estimate of <Katex tex="\mu" />, not its value.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{D: }\ &\sigma\ \text{is estimated by}\ s=0.8;\\ &\tfrac{0.8}{\sqrt{100}}\ \text{estimates}\ \mathrm{sd}(\overline{X})\quad\times\end{aligned}" />,
    reason: <>Option D mixes up the spread of individual oranges with the spread of sample means. And even 0.8 would only be an estimate of <Katex tex="\sigma" />, not a certainty.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.995) = 2.5758…</Cas>,
    reason: <>That leaves E, which needs checking: a 99% interval leaves 0.5% in each tail, so <Katex tex="z" /> is the point with 0.995 below it.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\bar{x}-z\frac{s}{\sqrt n} &= 6-2.5758\ldots\times\frac{0.8}{\sqrt{100}}\\ &= 6-0.2061\ldots = 5.7939\ldots\end{aligned}" />,
    reason: <>The smallest value in the interval is the lower endpoint. With <Katex tex="\sigma" /> unknown, the sample standard deviation stands in for it, as is usual for a sample this large.</>,
    more: <>Using the rounded <Katex tex="z\approx2.58" /> gives <Katex tex="6-0.2064=5.7936" />: still above 5.79, so the conclusion doesn&rsquo;t depend on how <Katex tex="z" /> is rounded.</>,
  },
  {
    working: <Katex display tex="\boxed{5.7939\ldots\geq5.79}" />,
    reason: <>Matches option <b>E</b>: the lower endpoint is not less than 5.79 cm.</>,
  },
]

export default function SpecialistQ19_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          A random sample of 100 oranges is selected from an orange orchard and their diameters are recorded. It is
          found, for the sample, the mean is 6 cm and the standard deviation is 0.8 cm.
          <br />
          Which one of the following statements is <b>necessarily</b> correct?
        </p>
      }
      options={[
        {
          letter: 'A',
          content: (
            <>
              The means of random samples of 100 oranges would be normally distributed with a standard deviation of{' '}
              <Katex tex="\dfrac{0.8}{100}" /> cm.
            </>
          ),
        },
        {
          letter: 'B',
          content: (
            <>
              To obtain a 90% confidence interval for <Katex tex="\mu" />, a standardised <Katex tex="z" /> value of 1.96
              is used.
            </>
          ),
        },
        { letter: 'C', content: <>The mean diameter of all oranges grown at the orchard is 6 cm.</> },
        {
          letter: 'D',
          content: (
            <>
              The standard deviation of the diameters of all oranges grown is <Katex tex="\dfrac{0.8}{\sqrt{100}}" /> cm.
            </>
          ),
        },
        {
          letter: 'E',
          content: (
            <>
              The smallest value in the 99% confidence interval for <Katex tex="\mu" /> would not be less than 5.79 cm.
            </>
          ),
          isAnswer: true,
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
