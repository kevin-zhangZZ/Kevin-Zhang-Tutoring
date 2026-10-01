// 2021 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 51% correct.
// A linear scaling fixed by a mean and a variance. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 12, C: 24, D: 51, E: 8 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="S = mX+n \implies \mathrm{Var}(S) = m^2\mathrm{Var}(X)" />,
    reason: <>For a linear transformation, <Katex tex="\mathrm{Var}(aX+b) = a^2\,\mathrm{Var}(X)" />. Multiplying every score by <Katex tex="m" /> stretches the spread; adding <Katex tex="n" /> moves every score by the same amount, which does not change the spread. So the variances fix <Katex tex="m" /> on their own.</>,
  },
  {
    working: <Katex display tex="49 = 36m^2 \implies m^2 = \frac{49}{36} \implies m = \frac76" />,
    reason: <>The square root gives <Katex tex="m=\pm\frac76" />; reject <Katex tex="-\frac76" /> because the question says <Katex tex="m\in R^+" />. So <Katex tex="m" /> is the ratio of the standard deviations, <Katex tex="\frac{\sqrt{49}}{\sqrt{36}}=\frac76" /> — not the ratio of the variances, <Katex tex="\frac{49}{36}" />.</>,
  },
  {
    working: <Katex display tex="E(S) = mE(X)+n \implies 30 = \tfrac76(25)+n" />,
    reason: <>Using <Katex tex="E(aX+b) = aE(X)+b" />. With <Katex tex="m" /> known, the means fix <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="n = 30-\frac{175}{6} = \frac{180-175}{6} = \frac56" />,
    reason: <>Solving for <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}S &= \frac76(32)+\frac56 = \frac{224+5}{6}\\ &= \frac{229}{6} = 38.1\overline6\end{aligned}" />,
    reason: <>Substitute <Katex tex="X=32" />. The question defines <Katex tex="S" /> as the scaled score to the nearest integer, so <Katex tex="38.1\overline6" /> becomes 38.</>,
  },
  {
    working: <Katex display tex="\boxed{38}" />,
    reason: <>Matches option <b>D</b>. Option <b>C</b>, 36, comes from turning the ratio upside down (<Katex tex="m=\frac67" />, which gives exactly 36); option <b>E</b>, 40, from using the ratio of the variances, <Katex tex="m=\frac{49}{36}" /> (giving 39.53, which rounds to 40).</>,
  },
]

export default function SpecialistQ19_2021() {
  return (
    <MCQShell
      question={
        <p>
          The mean unscaled score for a certain assessment task is 25 and the variance is 36.
          The scores are scaled so that the mean score is 30 and the variance is 49. Let{' '}
          <Katex tex="S" /> be the scaled scores, to the nearest integer, and let{' '}
          <Katex tex="X" /> be the unscaled scores.
          <br />
          If the scaling function takes the form{' '}
          <Katex tex="S=mX+n" />, where <Katex tex="m\in R^+" /> and <Katex tex="n\in R" />,
          then a score of 32 would be scaled to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="22" /> },
        { letter: 'B', content: <Katex tex="34" /> },
        { letter: 'C', content: <Katex tex="36" /> },
        { letter: 'D', content: <Katex tex="38" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="40" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
