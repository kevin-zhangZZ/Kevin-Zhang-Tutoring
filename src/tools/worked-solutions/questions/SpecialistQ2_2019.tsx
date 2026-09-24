// 2019 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 86% correct. The
// asymptotes of a rational function whose numerator has higher degree than its denominator.
// Question text transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 9, C: 86, D: 1, E: 0 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2x-8=0 \implies x=4" />,
    reason: <>Vertical asymptote where the denominator vanishes (the numerator <Katex tex="4^2+1=17\ne0" /> there, so it really is an asymptote and not a hole).</>,
  },
  {
    working: <Katex display tex="\deg(\text{numerator}) = 2 > 1 = \deg(\text{denominator})" />,
    reason: <>Degree exactly one higher means there is an <b>oblique</b> (slanted) asymptote rather than a horizontal one. Find it by division.</>,
  },
  {
    working: <Katex display tex="x^2+1 = (2x-8)\left(\dfrac{x}{2}+2\right)+17" />,
    reason: <>Polynomial division. Check: <Katex tex="(2x-8)\left(\tfrac{x}{2}+2\right)=x^2+4x-4x-16=x^2-16" />, and <Katex tex="-16+17=1" /> ✓</>,
  },
  {
    working: <Katex display tex="f(x) = \dfrac{x}{2}+2+\dfrac{17}{2x-8}" />,
    reason: <>Dividing the identity above through by <Katex tex="2x-8" />.</>,
  },
  {
    working: <Katex display tex="\text{As } x\to\pm\infty: \ \dfrac{17}{2x-8}\to0 \implies f(x)\to\dfrac{x}{2}+2" />,
    reason: <>The remainder term dies away, leaving the straight line the curve hugs.</>,
  },
  {
    working: <Katex display tex="\boxed{x=4 \ \text{ and } \ y=\dfrac{x}{2}+2}" />,
    reason: <>Matches option <b>C</b>. Option <b>B</b> drops the <Katex tex="+2" /> — the result of dividing only the leading terms instead of doing the full division; <b>A</b> misses the oblique asymptote entirely; <b>D</b> and <b>E</b> put the vertical asymptote at <Katex tex="x=8" />, where the denominator is <Katex tex="8\ne0" />.</>,
  },
]

export default function SpecialistQ2_2019() {
  return (
    <MCQShell
      question={<p>The asymptote(s) of the graph of <Katex tex="f(x)=\dfrac{x^2+1}{2x-8}" /> has equation(s)</p>}
      options={[
        { letter: 'A', content: <Katex tex="x=4" /> },
        { letter: 'B', content: <Katex tex="x=4 \text{ and } y=\tfrac{x}{2}" /> },
        { letter: 'C', content: <Katex tex="x=4 \text{ and } y=\tfrac{x}{2}+2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="x=8 \text{ and } y=\tfrac{x}{2}" /> },
        { letter: 'E', content: <Katex tex="x=8 \text{ and } y=2x+2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
