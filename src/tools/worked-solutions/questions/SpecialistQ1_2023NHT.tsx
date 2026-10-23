// 2023 Specialist NHT — Exam 2, MCQ 1. The NHT report gives the answer key only, with no
// statistics. Functions: implied domain and range of f(x) = sin(cos⁻¹(1 − 2x)) — the domain comes
// from the inner arccos, the range from sine on [0, π]. Question text transcribed from the original
// paper. Solution is original; the answer A agrees with the report's key. sympy simplifies f to
// 2√(x(1 − x)), confirming the range [0, 1].

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le 1-2x\le 1" />,
    reason: <><Katex tex="\cos^{-1}" /> only accepts inputs from <Katex tex="-1" /> to <Katex tex="1" />, and sine accepts anything, so the inner function is the only restriction.</>,
  },
  {
    working: <Katex display tex="-2\le -2x\le 0 \implies 0\le x\le 1" />,
    reason: <>Subtract 1, then divide by <Katex tex="-2" />, which reverses both inequality signs.</>,
  },
  {
    working: <Katex display tex="\text{domain} = [0,\,1]" />,
  },
  {
    working: <Katex display tex="\cos^{-1}(1-2x)\in[0,\,\pi]" />,
    reason: <>As <Katex tex="x" /> runs over <Katex tex="[0,1]" />, the input <Katex tex="1-2x" /> runs over all of <Katex tex="[-1,1]" />, so the arccos takes every angle in its range <Katex tex="[0,\pi]" />.</>,
  },
  {
    working: <Katex display tex="\sin\theta,\ \theta\in[0,\pi] \implies \sin\theta\in[0,\,1]" />,
    reason: <>Sine on <Katex tex="[0,\pi]" /> (the first and second quadrants) is never negative: it starts at 0, rises to 1 at <Katex tex="\tfrac{\pi}{2}" />, and falls back to 0.</>,
    more: <>Algebraically, <Katex tex="\sin(\cos^{-1}u)=\sqrt{1-u^2}" /> (the positive root, because the angle is in <Katex tex="[0,\pi]" />). With <Katex tex="u=1-2x" /> this is <Katex tex="2\sqrt{x(1-x)}" />, which is 0 at both ends and 1 at <Katex tex="x=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{[0,\,1] \text{ and } [0,\,1]}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option D takes the range of sine over <i>all</i> angles, <Katex tex="[-1,1]" />, forgetting that the angles here only come from <Katex tex="[0,\pi]" />. Options C and E give the domain as <Katex tex="R" />, which ignores the restriction on the input of <Katex tex="\cos^{-1}" />.</>,
  },
]

export default function SpecialistQ1_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The implied domain and range of <Katex tex="f(x)=\sin\left(\cos^{-1}(1-2x)\right)" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="[0,\,1]" /> and <Katex tex="[0,\,1]" /></>, isAnswer: true },
        { letter: 'B', content: <><Katex tex="[-1,\,0]" /> and <Katex tex="[0,\,1]" /></> },
        { letter: 'C', content: <><Katex tex="R" /> and <Katex tex="[-1,\,1]" /></> },
        { letter: 'D', content: <><Katex tex="[0,\,1]" /> and <Katex tex="[-1,\,1]" /></> },
        { letter: 'E', content: <><Katex tex="R" /> and <Katex tex="[0,\,1]" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
