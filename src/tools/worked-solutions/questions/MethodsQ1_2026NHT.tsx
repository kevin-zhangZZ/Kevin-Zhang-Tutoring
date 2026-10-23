// 2026 Mathematical Methods NHT — Exam 2, MCQ 1. The NHT report gives the answer key only, with no
// statistics; its comment (just the interval) is transcribed below from the rendered report. Statistics: an approximate 95% confidence interval for a population proportion.
// Question text transcribed from the original paper. Solution is original; the answer B agrees with
// the report's key. Checked with scipy: p̂ = 23/30, se = 0.024419…, 1.96·se = 0.04786…, giving
// (0.7188, 0.8145). Distractors verified: A is the 90% interval (z = 1.645), D the 99% interval
// (z = 2.576), C uses n = 230 in the standard error.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: <Katex tex="(0.719,\ 0.815)" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p=\frac{230}{300}=\frac{23}{30}=0.7666\ldots" />,
    reason: <>The sample proportion is the point estimate the interval is centred on: the number with the attribute over the sample size.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{se}(\hat p)&=\sqrt{\frac{\hat p(1-\hat p)}{n}}\\&=\sqrt{\frac{\frac{23}{30}\times\frac{7}{30}}{300}}=0.024419\ldots\end{aligned}" />,
    reason: <>The standard error uses the <b>sample size</b> <Katex tex="n=300" /> in the denominator, and <Katex tex="\hat p" /> in place of the unknown population proportion — that is why the interval is only "approximate".</>,
  },
  {
    working: <Katex display tex="\left(\hat p-1.96\,\text{se},\ \hat p+1.96\,\text{se}\right)" />,
    reason: <>For 95% confidence, the multiplier is <Katex tex="z\approx1.96" />: the middle 95% of the standard normal lies between <Katex tex="-1.96" /> and <Katex tex="1.96" />.</>,
    more: <>On CAS, the one-proportion <Katex tex="z" /> interval (zInterval_1Prop with <Katex tex="x=230" />, <Katex tex="n=300" />, C Level 0.95) gives the interval in one step.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&0.7666\ldots\pm1.96\times0.024419\ldots\\&\quad=0.7666\ldots\pm0.04786\ldots\end{aligned}" />,
  },
  {
    working: <Katex display tex="\boxed{(0.719,\ 0.815)}" />,
    reason: <>Matches option <b>B</b>, correct to three decimal places. Check: the interval is centred on <Katex tex="\hat p\approx0.767" />, as every confidence interval for a proportion must be.</>,
    more: <>All four options are centred on <Katex tex="0.767" />, so the centre can&apos;t separate them — only the width can. Option <b>A</b> is the 90% interval (<Katex tex="z\approx1.645" />), and option <b>D</b> the 99% interval (<Katex tex="z\approx2.576" />). Option <b>C</b> divides by <Katex tex="230" /> instead of <Katex tex="300" /> inside the square root: <Katex tex="n" /> is the whole sample, not the number of successes.</>,
  },
]

export default function MethodsQ1_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>In a random sample of 300 builders, 230 had completed an apprenticeship in the last 10 years.</p>
          <p>
            Using this sample, an approximate 95% confidence interval for the population proportion of builders
            who have completed an apprenticeship in the last 10 years, correct to three decimal places, is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0.727,\ 0.807)" /> },
        { letter: 'B', content: <Katex tex="(0.719,\ 0.815)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(0.712,\ 0.821)" /> },
        { letter: 'D', content: <Katex tex="(0.704,\ 0.830)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
