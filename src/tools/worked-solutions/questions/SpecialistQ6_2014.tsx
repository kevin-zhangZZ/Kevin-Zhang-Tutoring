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
    reason: <>Index law <Katex tex="a^{m+k}=a^m\times a^k" />: split off the part involving <Katex tex="n" />, which can be written in terms of <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="i^{2n} = \left(i^n\right)^2 = p^2" />,
    reason: <>Power-of-a-power law, <Katex tex="a^{2n}=\left(a^n\right)^2" />, then substitute <Katex tex="i^n=p" />.</>,
    more: <>Writing <Katex tex="i^{2n}=\left(i^2\right)^n=(-1)^n" /> is also true, but it is not in terms of <Katex tex="p" />. Grouping as <Katex tex="\left(i^n\right)^2" /> lets the given <Katex tex="i^n=p" /> go straight in.</>,
  },
  {
    working: <Katex display tex="i^3 = i^2\times i = -i" />,
    reason: <>Using the given <Katex tex="i^2=-1" />, so <Katex tex="i^3=-i" />, not <Katex tex="-1" /> or <Katex tex="i" />.</>,
  },
  {
    working: <Katex display tex="\boxed{i^{2n+3} = -ip^2}" />,
    reason: <>Multiply the two pieces: <Katex tex="p^2\times(-i)" />. Matches option <b>D</b>.</>,
    more: <>The most common wrong answer, A (16%), is <Katex tex="p^2+i^3=p^2-i" />: adding the two pieces instead of multiplying them. Adding indices means multiplying powers, never adding them. Option B makes the same slip with <Katex tex="i^3" /> taken as <Katex tex="+i" />. Option C takes <Katex tex="i^3" /> as <Katex tex="-1" /> (confusing it with <Katex tex="i^2" />), and option E takes it as <Katex tex="+i" />. Check with <Katex tex="n=1" />: <Katex tex="p=i" />, <Katex tex="i^{5}=i" /> and <Katex tex="-ip^2=-i\cdot(-1)=i" /> ✓.</>,
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
