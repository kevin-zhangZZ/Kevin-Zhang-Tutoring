// 2021 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 46% correct.
// Turning a scalar resolute back into a vector resolute. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 9, C: 14, D: 8, E: 46 },
  answer: 'E',
  comment: <Katex tex="-4\hat{\underset{\sim}{b}}=-4\left(-\underset{\sim}{i}\right)=4\underset{\sim}{i}" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{vector resolute} = (\text{scalar resolute})\,\hat{\underset{\sim}{b}}" />,
    reason: <>The scalar resolute <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}" /> is the <em>signed</em> length of <Katex tex="\underset{\sim}{a}" /> along <Katex tex="\underset{\sim}{b}" />. Multiplying it by the unit vector <Katex tex="\hat{\underset{\sim}{b}}" /> turns that length into a vector along <Katex tex="\underset{\sim}{b}" />. A negative scalar resolute means the vector resolute points <em>opposite</em> to <Katex tex="\underset{\sim}{b}" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{b} = -\sqrt3\underset{\sim}{i} \implies \hat{\underset{\sim}{b}} = \frac{-\sqrt3\underset{\sim}{i}}{\sqrt3} = -\underset{\sim}{i}" />,
    reason: <>Divide <Katex tex="\underset{\sim}{b}" /> by its magnitude <Katex tex="\left|\underset{\sim}{b}\right|=\sqrt3" />. The unit vector points in the <em>negative</em> <Katex tex="\underset{\sim}{i}" /> direction, so it carries its own minus sign.</>,
  },
  {
    working: <Katex display tex="-4\times\left(-\underset{\sim}{i}\right) = 4\underset{\sim}{i}" />,
    reason: <>A negative times a negative. Sense check: the scalar resolute is negative, so the answer points opposite to <Katex tex="\underset{\sim}{b}" />. Since <Katex tex="\underset{\sim}{b}" /> points along <Katex tex="-\underset{\sim}{i}" />, the answer points along <Katex tex="+\underset{\sim}{i}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{4\underset{\sim}{i}}" />,
    reason: <>Matches option <b>E</b>. Option A, <Katex tex="-4\underset{\sim}{i}" />, is what you get by using <Katex tex="\hat{\underset{\sim}{b}}=\underset{\sim}{i}" />, forgetting that <Katex tex="\underset{\sim}{b}" /> itself points in the negative <Katex tex="\underset{\sim}{i}" /> direction. It was the most popular wrong answer (22%).</>,
  },
]

export default function SpecialistQ13_2021() {
  return (
    <MCQShell
      question={
        <p>
          The scalar resolute of vector <Katex tex="\underset{\sim}{a}" /> in the direction
          of vector <Katex tex="\underset{\sim}{b}" /> is <Katex tex="-4" />.
          <br />
          If <Katex tex="\underset{\sim}{b}=-\sqrt3\underset{\sim}{i}" />, the vector resolute of{' '}
          <Katex tex="\underset{\sim}{a}" /> in the direction of{' '}
          <Katex tex="\underset{\sim}{b}" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-4\underset{\sim}{i}" /> },
        { letter: 'B', content: <Katex tex="-3\underset{\sim}{i}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{1}{\sqrt3}\underset{\sim}{i}" /> },
        { letter: 'D', content: <Katex tex="3\underset{\sim}{i}" /> },
        { letter: 'E', content: <Katex tex="4\underset{\sim}{i}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
