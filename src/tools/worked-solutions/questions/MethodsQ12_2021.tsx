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
    working: <Katex display tex="\mathrm{sd}\!\left(\hat P\right) = \sqrt{\frac{p(1-p)}{n}}, \quad p=\tfrac35" />,
    reason: <>The standard deviation of the sample proportion, from the formula sheet. The population proportion is known here, so use <Katex tex="p=\tfrac35" /> itself, not a sample estimate.</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.6\times0.4}{n}} < 0.08 \implies \sqrt{\frac{0.24}{n}} < 0.08" />,
    reason: <>Set up the condition in the question. <Katex tex="p(1-p)=\tfrac35\times\tfrac25=\tfrac{6}{25}=0.24" />.</>,
  },
  {
    working: <Katex display tex="\frac{0.24}{n} < 0.0064 \implies n > \frac{0.24}{0.0064} = 37.5" />,
    reason: <>Squaring both sides is safe because both are positive. Then multiply both sides by <Katex tex="n" /> (positive, so the sign stays) and divide by 0.0064.</>,
  },
  {
    working: <Katex display tex="\sqrt{\tfrac{0.24}{37}}\approx0.0805, \qquad \sqrt{\tfrac{0.24}{38}}\approx0.0795" />,
    reason: <>A sample size is a whole number, so the smallest one above 37.5 is 38. Checking the whole numbers on either side confirms it: for <Katex tex="n=37" /> the standard deviation is still above 0.08, and for <Katex tex="n=38" /> it is below.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 38}" />,
    reason: <>Matches option <b>D</b>. Option C rounds 37.5 down, but <Katex tex="n=37" /> leaves the standard deviation just above 0.08 (previous row). Option A puts <Katex tex="n" /> outside the square root: <Katex tex="\tfrac{\sqrt{0.24}}{n}<0.08" /> gives <Katex tex="n>6.1" />, so 7.</>,
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
