// 2024 Specialist NHT — Exam 2, MCQ 16. The NHT report gives the answer key only, with no
// statistics. Vector calculus: velocity perpendicular to acceleration when their dot product is
// zero, giving an exponential equation. Question text transcribed from the original paper.
// Solution is original; the answer D agrees with the report's key. sympy solves v·a = 0 to
// t = log_e(2^(3/5)) = (3/5)log_e(2) ≈ 0.416.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const v = (s: string) => `\\underset{\\sim}{${s}}`
const I = v('i'), J = v('j'), R = v('r'), V = v('v'), A = v('a')

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex={`${V}(t)=\\dot{${R}}(t)=-4e^{-4t}${I}+e^{t}${J}`} />,
    reason: <>Velocity is the derivative of position, component by component. Chain rule on <Katex tex="e^{-4t}" /> brings down <Katex tex="-4" />.</>,
  },
  {
    working: <Katex display tex={`${A}(t)=\\dot{${V}}(t)=16e^{-4t}${I}+e^{t}${J}`} />,
    reason: <>Differentiate again: <Katex tex="-4\times-4=16" />.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}${V}\\cdot${A}&=(-4e^{-4t})(16e^{-4t})+(e^{t})(e^{t})\\\\ &=-64e^{-8t}+e^{2t}\\end{aligned}`} />,
    reason: <>Two non-zero vectors are perpendicular exactly when their scalar product is 0. Multiply matching components and add; exponents add when powers of <Katex tex="e" /> are multiplied.</>,
  },
  {
    working: <Katex display tex="e^{2t}=64e^{-8t}\implies e^{10t}=64" />,
    reason: <>Set the dot product to 0 and multiply both sides by <Katex tex="e^{8t}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}10t&=\log_e(64)=6\log_e(2)\\ t&=\frac{6}{10}\log_e(2)=\frac35\log_e(2)\end{aligned}" />,
    reason: <>Take natural logs, then use <Katex tex="64=2^6" /> and the log law <Katex tex="\log_e(a^n)=n\log_e(a)" /> to match the form of the options.</>,
    more: <>The value is about <Katex tex="0.416" />, which satisfies <Katex tex="t\ge0" />. Equivalently <Katex tex="t=\tfrac{1}{10}\log_e(64)" />; options A and E have this log but the wrong fraction in front.</>,
  },
  {
    working: <Katex display tex="\boxed{t=\frac35\log_e(2)}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function SpecialistQ16_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The position vector <Katex tex={`${R}(t)`} /> of a particle at time <Katex tex="t" /> is given
          by <Katex tex={`${R}(t)=e^{-4t}${I}+e^{t}${J},\\ t\\ge 0`} />.
          <br />
          The value of <Katex tex="t" /> when the particle&apos;s velocity is perpendicular to its acceleration is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac15\log_e(64)" /> },
        { letter: 'B', content: <Katex tex="\dfrac12\log_e(2)" /> },
        { letter: 'C', content: <Katex tex="\dfrac16\log_e(32)" /> },
        { letter: 'D', content: <Katex tex="\dfrac35\log_e(2)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac14\log_e(64)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
