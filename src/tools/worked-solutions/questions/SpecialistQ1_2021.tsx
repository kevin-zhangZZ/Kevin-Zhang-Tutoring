// 2021 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 66% correct.
// Counting the asymptotes of a reciprocal secant over an interval. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 66, C: 20, D: 5, E: 2 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f(x) &= \frac{1}{\frac{1}{\cos(3x)}+\frac32} \\ &= \frac{2\cos(3x)}{2+3\cos(3x)} \end{aligned}"
      />
    ),
    reason: <>Write <Katex tex="\sec(3x)=\tfrac{1}{\cos(3x)}" /> and multiply top and bottom by <Katex tex="2\cos(3x)" />. Now <Katex tex="f" /> can only shoot off to infinity where the denominator <Katex tex="2+3\cos(3x)" /> is zero: a vertical asymptote.</>,
    more: <>Only vertical asymptotes need counting: <Katex tex="f" /> is periodic (it repeats every <Katex tex="\tfrac{2\pi}{3}" />), so it never levels off towards a horizontal line.</>,
  },
  {
    working: <Katex display tex="2+3\cos(3x) = 0 \implies \cos(3x) = -\tfrac23" />,
    reason: <>Here the numerator is <Katex tex="2\cos(3x)=-\tfrac43\neq0" />, so these are genuine asymptotes. Where <Katex tex="\cos(3x)=0" />, <Katex tex="f" /> has only a hole, not an asymptote: there <Katex tex="\sec(3x)\to\pm\infty" />, so <Katex tex="f\to0" />.</>,
    more: <>At those points <Katex tex="\sec(3x)" /> is undefined, so <Katex tex="f" /> is too. But <Katex tex="f" /> stays close to 0 on both sides, so the graph just has one missing point there, at height 0, rather than shooting off to infinity.</>,
  },
  {
    working: <Katex display tex="-\tfrac\pi6 \le x \le \pi \implies -\tfrac\pi2 \le 3x \le 3\pi" />,
    reason: <>Solve for <Katex tex="3x" /> first, so multiply both ends of the interval by 3 to find the values <Katex tex="3x" /> covers.</>,
  },
  {
    working: <Katex display tex="3x \approx 2.30,\ 3.98,\ 8.58" />,
    reason: <>Cosine is negative in quadrants 2 and 3: <Katex tex="\cos^{-1}\!\left(-\tfrac23\right)\approx2.30" /> and <Katex tex="2\pi-2.30\approx3.98" />. Adding <Katex tex="2\pi" /> to <Katex tex="2.30" /> gives <Katex tex="8.58" />; no others lie in <Katex tex="\left[-\tfrac\pi2,\ 3\pi\right]" />.</>,
    more: <>Check both ends. The next solution, <Katex tex="3.98+2\pi\approx10.27" />, is past <Katex tex="3\pi\approx9.42" />. The one before <Katex tex="2.30" /> is <Katex tex="3.98-2\pi\approx-2.30" />, below <Katex tex="-\tfrac\pi2\approx-1.57" />. So exactly three solutions lie in the interval.</>,
  },
  {
    working: <Katex display tex="x \approx 0.77,\ 1.33,\ 2.86" />,
    reason: <>Divide each value of <Katex tex="3x" /> by 3; each is a vertical asymptote of <Katex tex="f" />. On CAS, <Cas fn="solve">solve(cos(3x) = −2/3, x) | −π/6 ≤ x ≤ π</Cas> lists these three directly.</>,
  },
  {
    working: <Katex display tex="\boxed{3 \text{ asymptotes}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option C (4) is the number of points in the interval where <Katex tex="\cos(3x)=0" />, namely <Katex tex="x=-\tfrac\pi6,\ \tfrac\pi6,\ \tfrac\pi2,\ \tfrac{5\pi}6" />. Those are the asymptotes of <Katex tex="\sec(3x)" />, but only holes of <Katex tex="f" />.</>,
  },
]

export default function SpecialistQ1_2021() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x)=\dfrac{1}{\sec(3x)+\tfrac32}" />.
          <br />
          The number of asymptotes
          that the graph of <Katex tex="f" /> has in the interval{' '}
          <Katex tex="\left[-\tfrac\pi6,\ \pi\right]" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" /> },
        { letter: 'E', content: <Katex tex="6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
