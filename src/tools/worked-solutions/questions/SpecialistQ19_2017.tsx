// 2017 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 44% correct.
// How much bigger must the sample size be to shrink a confidence interval's width by 75%?
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 18, C: 19, D: 44, E: 9 },
  answer: 'D',
  noAnswer: 1,
  comment: 'The new width is 25% of the old width.',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} \propto \frac{1}{\sqrt n}" />,
    reason: <>A confidence interval has the form <Katex tex="\bar x \pm z\dfrac{\sigma}{\sqrt n}" /> — its width depends on <Katex tex="n" /> only through <Katex tex="1/\sqrt n" />.</>,
  },
  {
    working: <Katex display tex="\text{decrease the width by } 75\% \;\implies\; \text{new width} = 0.25 \times \text{old width}" />,
    reason: <>"Decrease <em>by</em> 75%" means only 25% of the original width is left.</>,
  },
  {
    working: <Katex display tex="\frac{1/\sqrt{n_{\text{new}}}}{1/\sqrt{n_{\text{old}}}} = 0.25" />,
    reason: 'Set the ratio of new to old width equal to 0.25.',
  },
  {
    working: (
      <>
        <Katex display tex="\sqrt{\frac{n_{\text{old}}}{n_{\text{new}}}} = 0.25" />
        <Katex display tex="\implies\; \frac{n_{\text{old}}}{n_{\text{new}}} = 0.0625" />
      </>
    ),
    reason: 'Square both sides to clear the square root.',
  },
  {
    working: <Katex display tex="\boxed{\frac{n_{\text{new}}}{n_{\text{old}}} = \frac{1}{0.0625} = 16}" />,
    reason: <>Matches option <b>D</b> — the sample size must be multiplied by <Katex tex="16" />, since halving the width alone would need a factor of 4, and this is a further halving again.</>,
  },
]

export default function SpecialistQ19_2017() {
  return (
    <MCQShell
      question={
        <p>
          A confidence interval is to be used to estimate the population mean <Katex tex="\mu" /> based on a
          sample mean <Katex tex="\bar x" />. To decrease the width of a confidence interval by 75%, the
          sample size must be multiplied by a factor of
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
      examinerReport={EXAMINER}
    />
  )
}
