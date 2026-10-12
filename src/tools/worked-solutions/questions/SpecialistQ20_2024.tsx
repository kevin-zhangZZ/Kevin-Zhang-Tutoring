// 2024 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 48% correct. This
// year's paper used four options (A–D) rather than five. Probability that the total edible
// flesh from four avocados exceeds a given mass, after a linear transformation of a normal
// variable. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 48, C: 25, D: 17 },
  answer: 'B',
  comment: (
    <>
      <Katex tex="M\sim\mathrm{N}(200,7.5^2)" />
      <br />
      <Katex tex="F=0.7M" />
      <br />
      <Katex tex="F\sim\mathrm{N}\left(200\times0.7,7.5^2\times0.7^2\right)" />
      <br />
      <Katex tex="F\sim\mathrm{N}(140,5.25^2)" />
      <br />
      4 avocados flesh{' '}
      <Katex tex="=F_1+F_2+F_3+F_4\sim\mathrm{N}\left(4\times140,4\times5.25^2\right)" />
      <br />
      <Katex tex="\Pr(F_1+F_2+F_3+F>570)=0.17045" /> where{' '}
      <Katex tex="F_1+F_2+F_3+F_4\sim\mathrm{N}(560,10.5^2)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="M \sim N(200,\ 7.5^2)" />,
    reason: <>Mass of one avocado.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}F &= 0.70M\\ \mathrm{E}(F) &= 0.70(200) = 140\\ \operatorname{Var}(F) &= 0.70^2(7.5^2) = 27.5625\end{aligned}" />,
    reason: <>Scaling by <Katex tex="0.70" />: the mean scales by <Katex tex="0.70" />, the variance by <Katex tex="0.70^2" />.</>,
    more: <>Variance is in squared units, so a factor <Katex tex="a" /> on the variable becomes <Katex tex="a^2" /> on the variance: <Katex tex="\operatorname{Var}(aX)=a^2\operatorname{Var}(X)" />. Equivalently the standard deviation scales by <Katex tex="0.70" />: <Katex tex="0.70\times7.5=5.25" />, and <Katex tex="5.25^2=27.5625" />. A linear function of a normal variable is still normal, so <Katex tex="F\sim N(140,\ 5.25^2)" />.</>,
  },
  {
    working: <Katex display tex="S = F_1+F_2+F_3+F_4" />,
    reason: <>Total flesh from four <em>separate</em> avocados — four independent copies of <Katex tex="F" />, not <Katex tex="4F" />.</>,
    more: <>
      <Katex tex="4F" /> would mean one avocado's flesh multiplied by four, so all four would be equally heavy or light together. Four different avocados vary independently and partly cancel each other out, which is why the total has a smaller spread than <Katex tex="4F" />.
    </>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{E}(S) &= 4(140) = 560\\ \operatorname{Var}(S) &= 4(27.5625) = 110.25\end{aligned}" />,
    reason: <>For independent variables, means add and variances add (never standard deviations). A sum of independent normals is normal, so <Katex tex="S\sim N(560,\ 110.25)" />.</>,
    more: <>
      Compare <Katex tex="\operatorname{Var}(4F)=4^2\operatorname{Var}(F)=441" />, four times bigger.
    </>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(S) = \sqrt{110.25} = 10.5" />,
    reason: <>Standard deviation of the total, needed for normCdf or standardising.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(S>570) &= \Pr\!\left(Z>\frac{570-560}{10.5}\right)\\ &= \Pr(Z>0.952)\end{aligned}" />,
    reason: <>"More than 570 grams" is the upper tail <Katex tex="S>570" />. Standardise to find how many standard deviations above the mean 570 is.</>,
    more: <>A quick check: <Katex tex="z\approx0.95" />, just under one standard deviation above the mean, and about 16% of a normal distribution lies more than one standard deviation above its mean, so an answer near 0.17 is reasonable.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(S>570) \approx 0.1705}" />,
    reason: <>
      On CAS, <Cas fn="normCdf">normCdf(570, ∞, 560, 10.5)</Cas> gives 0.17045, which rounds to 0.1705. Matches option <b>B</b>.
    </>,
    more: <>
      Each distractor is <Katex tex="\Pr(S>570)" /> with the wrong standard deviation. Option <b>D</b>, 0.3170: treating the total as <Katex tex="4F" />, so <Katex tex="\mathrm{sd}=4\times5.25=21" />. Option <b>C</b>, 0.2128 (25%, the most common wrong answer): scaling the variance by <Katex tex="0.70" /> instead of <Katex tex="0.70^2" />, so <Katex tex="\mathrm{sd}=\sqrt{4\times0.70\times7.5^2}\approx12.55" />. Option <b>A</b>, 0.0868: <Katex tex="\mathrm{sd}=2\times0.70^2\times7.5=7.35" />, the <Katex tex="0.70^2" /> factor (meant for the variance) applied to the standard deviation.
    </>,
  },
]

export default function SpecialistQ20_2024() {
  return (
    <MCQShell
      question={
        <p>
          The masses of avocados in a crop may be assumed to be normally distributed, with a mean of 200 grams
          and a standard deviation of 7.5 grams.
          <br />
          After an avocado of mass <Katex tex="M" /> grams is peeled and the stone is removed, the mass of edible
          flesh <Katex tex="F" /> grams is given by <Katex tex="F=0.70M" />. Four avocados are randomly selected
          from the crop.
          <br />
          What is the probability, correct to four decimal places, that a total of more than 570 grams of edible
          flesh is obtained?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0868" /> },
        { letter: 'B', content: <Katex tex="0.1705" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.2128" /> },
        { letter: 'D', content: <Katex tex="0.3170" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
