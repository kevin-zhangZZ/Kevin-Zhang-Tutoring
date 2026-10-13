// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 12. VCAA examination report: 60% correct.
// At least one red ball in three draws without replacement. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 7, C: 9, D: 13, E: 60 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{at least one red}) = 1-\Pr(\text{no red})" />,
    reason: <>"At least one" is the complement of "none". One case to compute instead of adding exactly one, two and three reds.</>,
  },
  {
    working: <Katex display tex="\Pr(BBB) = \frac38\times\frac27\times\frac16" />,
    reason: <>No red means all three are blue. Without replacement, each draw has one fewer ball in the box and one fewer blue.</>,
  },
  {
    working: <Katex display tex="= \frac{6}{336} = \frac{1}{56}" />,
    reason: <>Simplify.</>,
    more: <>The same result by counting selections: there are <Katex tex="\binom83=56" /> equally likely groups of three balls, and only <Katex tex="\binom33=1" /> of them is all blue.</>,
  },
  {
    working: <Katex display tex="\boxed{1-\frac{1}{56} = \frac{55}{56}}" />,
    reason: <>Matches option <b>E</b>, about <Katex tex="0.982" />.</>,
    more: <>Sensible: with five of the eight balls red, drawing three and getting no red at all would be remarkable. Option D, <Katex tex="\tfrac{15}{56}" />, is the probability of <em>exactly</em> one red, <Katex tex="\tfrac{\binom51\binom32}{56}" />: "at least one" also includes two and three reds.</>,
  },
]

export default function MethodsQ12_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A box contains five red balls and three blue balls. John selects three balls from
            the box, without replacing them.
          </p>
          <p>
            The probability that at least one of the balls that John selected is red is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac57" /> },
        { letter: 'B', content: <Katex tex="\dfrac{5}{14}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{7}{28}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{15}{56}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{55}{56}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
