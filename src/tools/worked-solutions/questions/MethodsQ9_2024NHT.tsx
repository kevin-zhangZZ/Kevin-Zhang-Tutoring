// 2024 Mathematical Methods NHT — Exam 2, MCQ 9. The NHT report gives the answer key only, with
// no statistics. Algebra: the discriminant condition for a quadratic to be positive for all x.
// Question text transcribed from the original paper. Solution is original; the answer D agrees
// with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Delta<0" />,
    reason: <>The parabola opens upwards (leading coefficient <Katex tex="3>0" />), so it is above the <Katex tex="x" />-axis everywhere exactly when it never meets the axis: no real roots, a negative discriminant.</>,
    more: <>If <Katex tex="\Delta=0" /> the vertex touches the axis, so <Katex tex="f(x)=0" /> at one point and &ldquo;<Katex tex="f(x)>0" /> for all <Katex tex="x" />&rdquo; fails. That is why the inequality is strict.</>,
  },
  {
    working: <Katex display tex="\Delta=(-2a)^2-4(3)(6)=4a^2-72" />,
    reason: <><Katex tex="\Delta=B^2-4AC" /> with <Katex tex="A=3" />, <Katex tex="B=-2a" />, <Katex tex="C=6" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}4a^2-72&<0\\ a^2&<18\\ -3\sqrt2<a&<3\sqrt2\end{aligned}" />,
    reason: <><Katex tex="a^2<18" /> means <Katex tex="a" /> is within <Katex tex="\sqrt{18}=3\sqrt2" /> of zero, on either side.</>,
  },
  {
    working: <Katex display tex="\boxed{\{a:-3\sqrt2<a<3\sqrt2\}}" />,
    reason: <>Matches option <b>D</b>. Check with <Katex tex="a=0" />: <Katex tex="f(x)=3x^2+6>0" /> for every <Katex tex="x" />.</>,
    more: <>Option E includes the endpoints, where <Katex tex="\Delta=0" /> and the graph touches the axis. Options B and C are the outside region, <Katex tex="\Delta>0" /> (or <Katex tex="\geq0" />): there the parabola cuts the axis and dips below it.</>,
  },
]

export default function MethodsQ9_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x)=3x^2-2ax+6" />, where <Katex tex="a\in R" />.
          <br />
          The set of values of <Katex tex="a" /> such that <Katex tex="f(x)>0" /> for all <Katex tex="x\in R" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\{a:a\geq3\sqrt2\}" /> },
        { letter: 'B', content: <Katex tex="\{a:a<-3\sqrt2\}\cup\{a:a>3\sqrt2\}" /> },
        { letter: 'C', content: <Katex tex="\{a:a\leq-3\sqrt2\}\cup\{a:a\geq3\sqrt2\}" /> },
        { letter: 'D', content: <Katex tex="\{a:-3\sqrt2<a<3\sqrt2\}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\{a:-3\sqrt2\leq a\leq3\sqrt2\}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
