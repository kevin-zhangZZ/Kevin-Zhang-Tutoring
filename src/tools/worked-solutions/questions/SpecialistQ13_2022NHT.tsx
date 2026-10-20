// 2022 Specialist NHT — Exam 2, MCQ 13. The NHT report gives the answer key only, with no
// statistics. Vectors: cos θ from the scalar product, then the double-angle formula.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(\theta) = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{a}|\,|\underset{\sim}{b}|}" />,
    reason: <>The angle between two vectors comes from <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos(\theta)" />, rearranged for <Katex tex="\cos(\theta)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{a}\cdot\underset{\sim}{b} &= (1)(-2)+(-4)(-10)+(8)(11)\\ &= -2+40+88 = 126\end{aligned}" />,
  },
  {
    working: <Katex display tex="\begin{aligned}|\underset{\sim}{a}| &= \sqrt{1+16+64} = \sqrt{81} = 9\\ |\underset{\sim}{b}| &= \sqrt{4+100+121} = \sqrt{225} = 15\end{aligned}" />,
    reason: <>Both magnitudes are whole numbers, a sign the numbers were chosen to be worked by hand.</>,
  },
  {
    working: <Katex display tex="\cos(\theta) = \frac{126}{9\times15} = \frac{126}{135} = \frac{14}{15}" />,
  },
  {
    working: <Katex display tex="\begin{aligned}\cos(2\theta) &= 2\cos^2(\theta)-1\\ &= 2\left(\frac{14}{15}\right)^2-1\\ &= \frac{392}{225}-\frac{225}{225}\end{aligned}" />,
    reason: <>The question asks for <Katex tex="\cos(2\theta)" />, not <Katex tex="\cos(\theta)" />. Of the double-angle forms on the formula sheet, <Katex tex="2\cos^2(\theta)-1" /> is the one that uses only <Katex tex="\cos(\theta)" />, which is what we have.</>,
    more: <>No need to find <Katex tex="\theta" /> itself (it is about <Katex tex="21^\circ" />), and going through a rounded angle would only risk losing the exact fraction the options are written in.</>,
  },
  {
    working: <Katex display tex="\boxed{\cos(2\theta) = \frac{167}{225}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>E</b>, <Katex tex="\tfrac{14}{15}" />, is <Katex tex="\cos(\theta)" />: the right first stage, stopping before the double angle. Check: <Katex tex="\theta\approx21^\circ" />, so <Katex tex="2\theta\approx42^\circ" /> and <Katex tex="\cos(42^\circ)\approx0.74" />, which is <Katex tex="\tfrac{167}{225}\approx0.742" />.</>,
  },
]

export default function SpecialistQ13_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\theta" /> is the angle between the vectors{' '}
          <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}-4\underset{\sim}{j}+8\underset{\sim}{k}" /> and{' '}
          <Katex tex="\underset{\sim}{b}=-2\underset{\sim}{i}-10\underset{\sim}{j}+11\underset{\sim}{k}" />,{' '}
          <Katex tex="\cos(2\theta)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{46}{135}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{126}{299}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{167}{225}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{623}{729}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{14}{15}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
