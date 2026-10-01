// 2021 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 81% correct.
// Combining two logarithms into one. Question text transcribed from the
// original paper. Solution is original. Stem and options checked against the rendered paper
// page; each option compared with the given rule in sympy (only C agrees for x > 0; B differs
// by log_e(2)). The report has no comment on this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 11, C: 81, D: 4, E: 1 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(x)+\log_e(2x) = \log_e(x\times 2x)" />,
    reason: <>Both logs have base <Katex tex="e" />, so the law <Katex tex="\log_e(a)+\log_e(b)=\log_e(ab)" /> combines them into one log. It turns a <em>sum</em> of logs into the log of a <em>product</em> — adding the insides instead gives <Katex tex="\log_e(3x)" />, option D.</>,
  },
  {
    working: <Katex display tex="= \boxed{\log_e\!\left(2x^2\right)}" />,
    reason: <>Matches option <b>C</b>. With <Katex tex="x>0" /> both rules have the same domain, so the graphs are identical. (That is why the question restricts <Katex tex="x" />: <Katex tex="\log_e\!\left(2x^2\right)" /> is also defined for negative <Katex tex="x" />, where <Katex tex="\log_e(x)" /> is not.) Option B is the most popular wrong answer: by the law <Katex tex="k\log_e(a)=\log_e\!\left(a^k\right)" />, <Katex tex="2\log_e(2x)=\log_e\!\left(4x^2\right)" />, which is out by a factor of 2 inside the log.</>,
  },
]

export default function MethodsQ2_2021() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\log_e(x)+\log_e(2x)" />, where <Katex tex="x>0" />, is
          identical, over the same domain, to the graph of
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=2\log_e\!\left(\tfrac12x\right)" /> },
        { letter: 'B', content: <Katex tex="y=2\log_e(2x)" /> },
        { letter: 'C', content: <Katex tex="y=\log_e\!\left(2x^2\right)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="y=\log_e(3x)" /> },
        { letter: 'E', content: <Katex tex="y=\log_e(4x)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
