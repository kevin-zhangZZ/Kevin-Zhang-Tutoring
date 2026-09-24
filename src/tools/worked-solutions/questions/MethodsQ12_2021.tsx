// 2021 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 54% correct.
// The smallest sample size making a sample proportion precise enough. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 14, C: 23, D: 54, E: 2 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\hat P\right) = \sqrt{\frac{p(1-p)}{n}}" />,
    reason: <>The population proportion is known here, so use <Katex tex="p=\tfrac35" />, not a sample estimate.</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.6\times0.4}{n}} < 0.08 \implies \sqrt{\frac{0.24}{n}} < 0.08" />,
    reason: <><Katex tex="\tfrac35\times\tfrac25=\tfrac{6}{25}=0.24" />.</>,
  },
  {
    working: <Katex display tex="\frac{0.24}{n} < 0.0064 \implies n > \frac{0.24}{0.0064} = 37.5" />,
    reason: <>Squaring both sides is safe — both are positive.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 38}" />,
    reason: <>Round <em>up</em>: <Katex tex="n=37" /> gives a standard deviation of <Katex tex="0.0805" />, still too big. Matches option <b>D</b>. Option C takes 37.5 down instead of up.</>,
  },
]

export default function MethodsQ12_2021() {
  return (
    <MCQShell
      question={
        <p>
          For a certain species of bird, the proportion of birds with a crest is known to be{' '}
          <Katex tex="\tfrac35" />.
          <br />
          Let <Katex tex="\hat P" /> be the random variable representing the proportion of
          birds with a crest in samples of size <Katex tex="n" /> for this specific bird.
          <br />
          The smallest sample size for which the standard deviation of <Katex tex="\hat P" />{' '}
          is less than 0.08 is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="7" /> },
        { letter: 'B', content: <Katex tex="27" /> },
        { letter: 'C', content: <Katex tex="37" /> },
        { letter: 'D', content: <Katex tex="38" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="43" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
