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
    reason: <>Write <Katex tex="\sec(3x)=\tfrac{1}{\cos(3x)}" /> and multiply top and bottom by <Katex tex="2\cos(3x)" /> to clear the fraction inside the fraction. Now the only way <Katex tex="f" /> can shoot off to infinity is for the denominator <Katex tex="2+3\cos(3x)" /> to reach zero, which makes a vertical asymptote. <Katex tex="f" /> is periodic (it repeats every <Katex tex="	frac{2pi}{3}" />), so it has no horizontal asymptote: only vertical ones are counted.</>,
  },
  {
    working: <Katex display tex="2+3\cos(3x) = 0 \implies \cos(3x) = -\tfrac23" />,
    reason: <>At these points the numerator is <Katex tex="2\cos(3x)=-\tfrac43\neq0" />, so they are genuine asymptotes. Where <Katex tex="\cos(3x)=0" /> instead, <Katex tex="\sec(3x)" /> is undefined so <Katex tex="f" /> is too, but <Katex tex="f\to0" /> there: the graph just has a hole (one missing point), not an asymptote.</>,
  },
  {
    working: <Katex display tex="-\tfrac\pi6 \le x \le \pi \implies -\tfrac\pi2 \le 3x \le 3\pi" />,
    reason: <>Solve for <Katex tex="3x" /> first, so multiply both ends of the interval by 3 to find the values <Katex tex="3x" /> covers.</>,
  },
  {
    working: <Katex display tex="3x \approx 2.30,\ 3.98,\ 8.58" />,
    reason: <>Cosine is negative in the second and third quadrants. <Katex tex="\cos^{-1}\!\left(-\tfrac23\right)\approx2.30" /> is the second-quadrant angle; the third-quadrant one is <Katex tex="2\pi-2.30\approx3.98" />; adding <Katex tex="2\pi" /> gives the next cycle's <Katex tex="8.58" /> and <Katex tex="10.27" />. Check both ends: <Katex tex="10.27" /> is past <Katex tex="3\pi\approx9.42" />, and the solution before <Katex tex="2.30" /> is <Katex tex="3.98-2\pi\approx-2.30" />, below <Katex tex="-\tfrac\pi2\approx-1.57" />. So exactly three solutions lie in the interval. On CAS, <Cas fn="solve">solve(cos(3x) = −2/3, x) | −π/6 ≤ x ≤ π</Cas> lists the three <Katex tex="x" />-values directly.</>,
  },
  {
    working: <Katex display tex="x \approx 0.77,\ 1.33,\ 2.86" />,
    reason: <>Divide each value of <Katex tex="3x" /> by 3. Each is a vertical asymptote of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\boxed{3 \text{ asymptotes}}" />,
    reason: <>Matches option <b>B</b>. Option C (4) is the number of points in the interval where <Katex tex="\cos(3x)=0" />, namely <Katex tex="x=-\tfrac\pi6,\ \tfrac\pi6,\ \tfrac\pi2,\ \tfrac{5\pi}6" />. Those are the asymptotes of <Katex tex="\sec(3x)" />, but on the graph of <Katex tex="f" /> they are holes, not asymptotes.</>,
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
