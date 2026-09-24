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
    reason: <>Adding <Katex tex="n" /> shifts but does not spread, so the variance fixes <Katex tex="m" /> on its own.</>,
  },
  {
    working: <Katex display tex="49 = 36m^2 \implies m = \frac76 \ \left(m\in R^+\right)" />,
    reason: <>Take the positive root, as the question specifies. Note this uses the <em>variances</em>, not the standard deviations directly — though <Katex tex="\tfrac76=\tfrac{\sqrt{49}}{\sqrt{36}}" /> either way.</>,
  },
  {
    working: <Katex display tex="E(S) = mE(X)+n \implies 30 = \tfrac76(25)+n" />,
    reason: <>Now the mean fixes the shift.</>,
  },
  {
    working: <Katex display tex="n = 30-\frac{175}{6} = \frac{180-175}{6} = \frac56" />,
    reason: <>A small positive shift.</>,
  },
  {
    working: <Katex display tex="S(32) = \frac76(32)+\frac56 = \frac{224+5}{6} = \frac{229}{6} = 38.1\overline6" />,
    reason: <>Substituting the score.</>,
  },
  {
    working: <Katex display tex="\boxed{38}" />,
    reason: <>"To the nearest integer", as the question says the scaled scores are. Matches option <b>D</b>.</>,
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
