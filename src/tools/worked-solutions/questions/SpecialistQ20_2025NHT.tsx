// 2025 Specialist NHT — Exam 2, MCQ 20. The NHT report gives the answer key only, with no
// statistics. Difference of two independent sample means: D = X̄₁ − X̄₂ ~ N(0, 32), then
// Pr(−5 < D < 5). Question text transcribed from the original paper (read from the page image;
// the 2025 paper has no text layer). Solution is original; the answer C agrees with the report's
// key. scipy: 0.62324…; the distractors were recomputed (B = 0.31162 one-sided, D = 0.78870 with
// sd 4, A = 0.14032 with sd √800).

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X}_1,\ \overline{X}_2\sim N\!\left(1000,\ \frac{20^2}{25}\right)=N(1000,\,16)" />,
    reason: <>The mean of a sample of size <Katex tex="n" /> from <Katex tex="N(\mu,\sigma^2)" /> is normal with mean <Katex tex="\mu" /> and variance <Katex tex="\tfrac{\sigma^2}{n}" />, so its standard deviation is <Katex tex="\tfrac{20}{\sqrt{25}}=4" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}D&=\overline{X}_1-\overline{X}_2\\ E(D)&=1000-1000=0\\ \operatorname{Var}(D)&=16+16=32\end{aligned}" />,
    reason: <>The two samples are independent, so <Katex tex="\operatorname{Var}(\overline{X}_1-\overline{X}_2)=(1)^2\operatorname{Var}(\overline{X}_1)+(-1)^2\operatorname{Var}(\overline{X}_2)" />: variances <b>add</b>, even for a difference.</>,
    more: <>A difference of two random quantities is more spread out than either one, never less: each brings its own variation.</>,
  },
  {
    working: <Katex display tex="D\sim N\!\left(0,\ 32\right),\quad\text{sd}(D)=\sqrt{32}=4\sqrt2" />,
  },
  {
    working: <Katex display tex="\Pr\left(|D|<5\right)=\Pr(-5<D<5)" />,
    reason: <>&ldquo;Differ by less than 5&rdquo; doesn&apos;t say which mean is bigger, so it is <Katex tex="|D|<5" />: both tails are excluded.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−5, 5, 0, √(32)) = 0.62324…</Cas>,
    reason: <><Cas fn="normCdf" /> takes the lower bound, upper bound, mean and standard deviation.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\left(|D|<5\right)\approx0.6232}" />,
    reason: <>Matches option <b>C</b>, correct to four decimal places.</>,
    more: <>Option <b>B</b>, 0.3116, is <Katex tex="\Pr(0<D<5)" />, only one of the two ways the means can differ by less than 5. Option <b>D</b>, 0.7887, uses standard deviation 4, the spread of one sample mean, forgetting to add the second variance. Option <b>A</b>, 0.1403, forgets to divide by the sample size: <Katex tex="\operatorname{Var}(D)=400+400" />.</>,
  },
]

export default function SpecialistQ20_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Certain electronic components have resistances that can be assumed to be normally distributed with a mean of
          1000 ohms and a standard deviation of 20 ohms. Two independent random samples of 25 of these components are
          taken and the sample mean for each is calculated.
          <br />
          What is the probability, correct to four decimal places, that the two sample means differ by less than 5 ohms?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.1403" /> },
        { letter: 'B', content: <Katex tex="0.3116" /> },
        { letter: 'C', content: <Katex tex="0.6232" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.7887" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
