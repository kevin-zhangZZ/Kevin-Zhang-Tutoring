// 2014 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 65% correct.
// Index laws with powers of i. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 6, C: 7, D: 65, E: 6 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="i^{2n+3} = i^{2n}\times i^3" />,
    reason: <>Split the index so that the part involving <Katex tex="n" /> can be written in terms of <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="i^{2n} = \left(i^n\right)^2 = p^2" />,
    reason: <>The power-of-a-power law. Note it is <Katex tex="\left(i^n\right)^2" />, not <Katex tex="\left(i^2\right)^n" /> — though either route works.</>,
  },
  {
    working: <Katex display tex="i^3 = i^2\times i = -i" />,
    reason: <>Using the given <Katex tex="i^2=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{i^{2n+3} = -ip^2}" />,
    reason: <>Matches option <b>D</b>. Option E drops the minus sign; options A and B add <Katex tex="i" /> instead of multiplying by it.</>,
  },
]

export default function SpecialistQ6_2014() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="i^n=p" /> and <Katex tex="i^2=-1" />, then{' '}
          <Katex tex="i^{2n+3}" /> in terms of <Katex tex="p" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="p^2-i" /> },
        { letter: 'B', content: <Katex tex="p^2+i" /> },
        { letter: 'C', content: <Katex tex="-p^2" /> },
        { letter: 'D', content: <Katex tex="-ip^2" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="ip^2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
