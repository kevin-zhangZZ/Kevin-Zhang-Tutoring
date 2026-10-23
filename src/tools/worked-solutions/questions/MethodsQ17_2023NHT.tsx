// 2023 Mathematical Methods NHT — Exam 2, MCQ 17. The NHT report gives the answer key only, with
// no statistics. Algebra: the discriminant condition for a quadratic to have two real solutions.
// Question text transcribed from the original paper (its "the function … has more than one
// solution" means the equation f(x) = 0). Solution is original; the answer E agrees with the
// report's key, and sympy's solve of k² − 8 > 0 confirms it. Verified distractors: D is Δ ≥ 0,
// B is Δ < 0.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+kx+2=0" />,
    reason: <>A function doesn&apos;t have solutions; an equation does. The question means the equation <Katex tex="f(x)=0" />.</>,
  },
  {
    working: <Katex display tex="\Delta=b^2-4ac=k^2-4(1)(2)=k^2-8" />,
    reason: <>A quadratic has at most two solutions, so &ldquo;more than one&rdquo; means exactly two distinct real solutions: <Katex tex="\Delta>0" />, strictly.</>,
    more: <><Katex tex="\Delta=0" /> gives one repeated solution (the parabola just touches the <Katex tex="x" />-axis) and <Katex tex="\Delta<0" /> gives none.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}k^2-8>0\ \Rightarrow\ k^2>8\\ \Rightarrow\ k<-2\sqrt2\ \text{ or }\ k>2\sqrt2\end{gathered}" />,
    reason: <><Katex tex="k^2-8" /> is an upright parabola in <Katex tex="k" /> with zeros <Katex tex="\pm\sqrt8=\pm2\sqrt2" />, so it is positive outside the zeros. Both ends are excluded because the inequality is strict.</>,
  },
  {
    working: <Katex display tex="\boxed{k\in\left(-\infty,-2\sqrt2\right)\cup\left(2\sqrt2,\infty\right)}" />,
    reason: <>Matches option <b>E</b>. Check: <Katex tex="k=3" /> gives <Katex tex="x^2+3x+2=(x+1)(x+2)" />, two solutions; <Katex tex="k=2\sqrt2" /> gives <Katex tex="(x+\sqrt2)^2" />, only one.</>,
    more: <>Option <b>D</b> includes the endpoints, which is <Katex tex="\Delta\ge0" /> (&ldquo;at least one solution&rdquo;). Option <b>B</b> is <Katex tex="\Delta<0" />, the values giving no solutions. Option <b>C</b> includes only the left endpoint and option <b>A</b> keeps only the positive half and its endpoint.</>,
  },
]

export default function MethodsQ17_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f(x)=x^2+kx+2" /> has more than one solution when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="k\in\left[2\sqrt2,\infty\right)" /> },
        { letter: 'B', content: <Katex tex="k\in\left(-2\sqrt2,2\sqrt2\right)" /> },
        { letter: 'C', content: <Katex tex="k\in\left(-\infty,-2\sqrt2\right]\cup\left(2\sqrt2,\infty\right)" /> },
        { letter: 'D', content: <Katex tex="k\in\left(-\infty,-2\sqrt2\right]\cup\left[2\sqrt2,\infty\right)" /> },
        { letter: 'E', content: <Katex tex="k\in\left(-\infty,-2\sqrt2\right)\cup\left(2\sqrt2,\infty\right)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
