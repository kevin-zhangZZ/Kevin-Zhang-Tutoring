// 2022 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 47% correct. Finding a
// from a binomial conditional-probability equation, by testing the given options. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 47, C: 14, D: 12, E: 8 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="X\sim\mathrm{Bi}(20,0.88)" />. Since <Katex tex="\{X\geq16\}\subseteq\{X\geq a\}" /> for every{' '}
      <Katex tex="a" /> in the options (all <Katex tex="\leq16" />),{' '}
      <Katex tex="\dfrac{\Pr(X\geq16)}{\Pr(X\geq a)}\approx0.9175 \;\implies\; a=12" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(20,0.88)" />,
    reason: 'Given distribution.',
  },
  {
    working: <Katex display tex="\Pr(X\geq16\mid X\geq a) = \frac{\Pr(X\geq16 \cap X\geq a)}{\Pr(X\geq a)}" />,
    reason: 'Definition of conditional probability.',
  },
  {
    working: <>Every option for <Katex tex="a" /> is at most <Katex tex="16" />, so <Katex tex="\{X\geq16\}" /> is always a <i>subset</i> of <Katex tex="\{X\geq a\}" />.</>,
    reason: <>This means <Katex tex="\{X\geq16\}\cap\{X\geq a\} = \{X\geq16\}" /> — the intersection simplifies away.</>,
  },
  {
    working: <Katex display tex="\Pr(X\geq16\mid X\geq a) = \frac{\Pr(X\geq16)}{\Pr(X\geq a)} = 0.9175" />,
    reason: 'Simplified equation to solve for a.',
  },
  {
    working: <>Try each candidate value of <Katex tex="a" /> on CAS, computing <Katex tex="\Pr(X\geq a)" /> from the binomial distribution and checking the ratio.</>,
    reason: <>With <Katex tex="\Pr(X\geq16)" /> fixed, only one value of <Katex tex="a" /> gives the required ratio.</>,
  },
  {
    working: <Katex display tex="\boxed{a=12}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ18_2022() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="X" /> is a binomial random variable where <Katex tex="n=20" />, <Katex tex="p=0.88" /> and{' '}
          <Katex tex="\Pr(X\geq16\mid X\geq a) = 0.9175" />, correct to four decimal places, then <Katex tex="a" /> is
          equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="11" /> },
        { letter: 'B', content: <Katex tex="12" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="13" /> },
        { letter: 'D', content: <Katex tex="14" /> },
        { letter: 'E', content: <Katex tex="15" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
