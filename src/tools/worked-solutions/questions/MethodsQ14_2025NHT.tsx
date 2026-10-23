// 2025 Mathematical Methods NHT — Exam 2, MCQ 14. The NHT report gives the answer key only for
// this question, with no statistics or comment. Functions: the maximal domain of a product is the
// intersection of the two maximal domains. Question text transcribed from the original paper
// (image-only, read from the rendered page). Solution is original; the answer D agrees with the
// report's key ((x + 3)(x − 1) > 0 gives x < −3 or x > 1; 2x + 7 ≥ 0 gives x ≥ −7/2).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="d_h=d_f\cap d_g" />,
    reason: <><Katex tex="h(x)" /> exists only where both <Katex tex="f(x)" /> and <Katex tex="g(x)" /> do.</>,
  },
  {
    working: <Katex display tex="x^2+2x-3>0\ \Rightarrow\ (x+3)(x-1)>0" />,
    reason: <>A log needs a strictly positive input.</>,
  },
  {
    working: <Katex display tex="d_f=(-\infty,-3)\cup(1,\infty)" />,
    reason: <>An upright parabola with roots <Katex tex="-3" /> and <Katex tex="1" /> is positive outside its roots.</>,
  },
  {
    working: <Katex display tex="2x+7\ge0\ \Rightarrow\ d_g=\left[-\tfrac72,\infty\right)" />,
    reason: <>A square root needs a non-negative input; 0 is allowed, so the bracket is closed.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[-\tfrac72,-3\right)\cup(1,\infty)}" />,
    reason: <>The overlap: <Katex tex="-\tfrac72=-3.5" /> sits to the left of <Katex tex="-3" />, so a small piece of the left branch survives. Matches option <b>D</b>.</>,
    more: <>Option <b>A</b> is the domain of <Katex tex="f" /> alone, and option <b>C</b> is the domain of <Katex tex="g" /> alone. A number line with both domains shaded makes the overlap obvious, including the short interval from <Katex tex="-3.5" /> up to (but not including) <Katex tex="-3" />.</>,
  },
]

export default function MethodsQ14_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider the functions <Katex tex="f(x)=\log_e\left(x^2+2x-3\right)" /> and <Katex tex="g(x)=\sqrt{2x+7}" />, each
          defined over its maximal domain.
          <br />
          The maximal domain of the product function <Katex tex="h(x)=f(x)\,g(x)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-\infty,-3)\cup(1,\infty)" /> },
        { letter: 'B', content: <Katex tex="\left(1,\tfrac72\right)" /> },
        { letter: 'C', content: <Katex tex="\left[-\tfrac72,\infty\right)" /> },
        { letter: 'D', content: <Katex tex="\left[-\tfrac72,-3\right)\cup(1,\infty)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
