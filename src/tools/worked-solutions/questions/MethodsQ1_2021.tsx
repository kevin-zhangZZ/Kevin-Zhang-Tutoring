// 2021 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 67% correct.
// The period of a tangent function. Question text transcribed from the
// original paper. Solution is original. Stem and options checked against the rendered paper
// page; period re-derived in sympy (tan(π(x+2)/2) = tan(πx/2)); the C and D slips recomputed
// (2π ÷ π/2 = 4, π ÷ 1/2 = 2π). The report has no comment on this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 67, C: 22, D: 6, E: 2 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period of } y=\tan(nx) \text{ is } \frac{\pi}{n}" />,
    reason: <>Tangent repeats every <Katex tex="\pi" />, not every <Katex tex="2\pi" /> like sine and cosine, so the period is <Katex tex="\pi" /> divided by the coefficient of <Katex tex="x" />.</>,
    more: <>Why <Katex tex="\pi" />: <Katex tex="\tan(x)=\frac{\sin(x)}{\cos(x)}" />, and adding <Katex tex="\pi" /> to <Katex tex="x" /> flips the sign of both <Katex tex="\sin(x)" /> and <Katex tex="\cos(x)" />, so the fraction is unchanged.</>,
  },
  {
    working: <Katex display tex="y = \tan\!\left(\frac{\pi}{2}\,x\right) \implies n = \frac{\pi}{2}" />,
    reason: <>Rewrite <Katex tex="\frac{\pi x}{2}" /> as <Katex tex="\frac{\pi}{2}\,x" /> so the coefficient of <Katex tex="x" /> is easy to read. The <Katex tex="\pi" /> is part of the coefficient, so <Katex tex="n" /> is not just <Katex tex="\frac12" />.</>,
    more: <>Leaving the <Katex tex="\pi" /> out and taking <Katex tex="n=\frac12" /> gives <Katex tex="\pi\div\frac12=2\pi" />, option D.</>,
  },
  {
    working: <Katex display tex="\text{period} = \pi\div\frac{\pi}{2} = \pi\times\frac{2}{\pi} = \boxed{2}" />,
    reason: <>Matches option <b>B</b>. The <Katex tex="\pi" />s cancel, so the period is a plain number.</>,
    more: <>Option C, the most popular wrong answer, uses the sine and cosine period <Katex tex="2\pi" /> in place of <Katex tex="\pi" />: <Katex tex="2\pi\div\frac{\pi}{2}=4" />. Option E makes both slips: <Katex tex="2\pi\div\frac12=4\pi" />. Check: <Katex tex="\tan\!\left(\frac{\pi(x+2)}{2}\right)=\tan\!\left(\frac{\pi x}{2}+\pi\right)=\tan\!\left(\frac{\pi x}{2}\right)" />, so the graph repeats every 2 units.</>,
  },
]

export default function MethodsQ1_2021() {
  return (
    <MCQShell
      question={
        <p>
          The period of the function with rule{' '}
          <Katex tex="y=\tan\!\left(\dfrac{\pi x}{2}\right)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="2\pi" /> },
        { letter: 'E', content: <Katex tex="4\pi" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
