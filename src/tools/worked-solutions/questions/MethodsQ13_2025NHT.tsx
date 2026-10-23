// 2025 Mathematical Methods NHT — Exam 2, MCQ 13. The NHT report gives the answer key only for
// this question, with no statistics or comment. Functions: the inverse of an exponential on a
// restricted domain — both the rule and the domain (the range of f). Question text transcribed
// from the original paper (image-only, read from the rendered page). Solution is original; the
// answer D agrees with the report's key (f⁻¹(f(x)) = x checked symbolically; f(0) = e⁴, f(½) = e⁵).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Swap: } x=e^{2y+4}" />,
    reason: <>For the inverse, swap <Katex tex="x" /> and <Katex tex="y" /> in <Katex tex="y=e^{2x+4}" />, then make <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="\log_e(x)=2y+4\ \Rightarrow\ y=\tfrac12\log_e(x)-2" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides, subtract 4, then halve. The 4 is halved too, giving <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="f(0)=e^{4},\quad f\!\left(\tfrac12\right)=e^{5}" />,
    reason: <>The domain of <Katex tex="f^{-1}" /> is the range of <Katex tex="f" />. <Katex tex="f" /> is increasing, so its range runs between these endpoint values, open at both ends like its domain.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x)=\tfrac12\log_e(x)-2,\quad x\in\left(e^4,e^5\right)}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>A</b> has the right rule with the maximal domain <Katex tex="(0,\infty)" />, ignoring the restriction on <Katex tex="f" />. Option <b>C</b> has the right domain but forgets to halve the 4.</>,
  },
]

export default function MethodsQ13_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x)=e^{2x+4}" />, where <Katex tex="x\in\left(0,\tfrac12\right)" />.
          <br />
          The inverse of <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="f^{-1}(x)=\tfrac12\log_e(x)-2" />, where <Katex tex="x\in(0,\infty)" /></> },
        { letter: 'B', content: <><Katex tex="f^{-1}(x)=2\log_e(x)+4" />, where <Katex tex="x\in(0,\infty)" /></> },
        { letter: 'C', content: <><Katex tex="f^{-1}(x)=\tfrac12\log_e(x)-4" />, where <Katex tex="x\in\left(e^4,e^5\right)" /></> },
        { letter: 'D', content: <><Katex tex="f^{-1}(x)=\tfrac12\log_e(x)-2" />, where <Katex tex="x\in\left(e^4,e^5\right)" /></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
