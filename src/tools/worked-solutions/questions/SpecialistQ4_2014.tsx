// 2014 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 90% correct.
// The domain of arcsin(2x − 1). Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 1, C: 90, D: 3, E: 4 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le 2x-1 \le 1" />,
    reason: <><Katex tex="\arcsin" /> only accepts inputs in <Katex tex="[-1,1]" />, so the domain is every <Katex tex="x" /> that puts <Katex tex="2x-1" /> there.</>,
  },
  {
    working: <Katex display tex="0 \le 2x \le 2" />,
    reason: <>Adding 1 throughout.</>,
  },
  {
    working: <Katex display tex="\boxed{[0,1]}" />,
    reason: <>Halving throughout. Matches option <b>C</b>.</>,
    more: <>Check the endpoints: <Katex tex="x=0" /> gives <Katex tex="\arcsin(-1)" /> and <Katex tex="x=1" /> gives <Katex tex="\arcsin(1)" />, the two ends of arcsin's domain ✓. Option A is arcsin's own domain handed back unchanged; option B subtracts 1 instead of adding it; option D drops the <Katex tex="-1" /> altogether and solves <Katex tex="-1 \le 2x \le 1" />. Option E stops at <Katex tex="x=\tfrac12" />, but <Katex tex="x=1" /> gives <Katex tex="\arcsin(1)=\tfrac{\pi}{2}" />, which exists, so E is too narrow.</>,
  },
]

export default function SpecialistQ4_2014() {
  return (
    <MCQShell
      question={<p>The domain of <Katex tex="\arcsin(2x-1)" /> is</p>}
      options={[
        { letter: 'A', content: <Katex tex="[-1,1]" /> },
        { letter: 'B', content: <Katex tex="[-1,0]" /> },
        { letter: 'C', content: <Katex tex="[0,1]" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\left[-\tfrac12,\tfrac12\right]" /> },
        { letter: 'E', content: <Katex tex="\left[0,\tfrac12\right]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
