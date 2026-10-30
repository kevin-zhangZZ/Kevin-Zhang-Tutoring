// 2022 Specialist NHT — Exam 2, MCQ 2. The NHT report gives the answer key only, with no
// statistics. Functions: implied domain and range of y = sin(cos⁻¹(ax − 1)), choosing a so the two
// are equal. Question text transcribed from the original paper. Solution is original; the answer D
// agrees with the report's key (sympy: with a = 2, y = 2√(x(1 − x)) on [0, 1]).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le ax-1\le 1\implies 0\le ax\le 2" />,
    reason: <><Katex tex="\cos^{-1}" /> only accepts inputs from <Katex tex="-1" /> to <Katex tex="1" />, and that is the only restriction (sine accepts anything). Add <Katex tex="1" /> throughout.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\cos^{-1}(ax-1)\in[0,\pi]\\ \implies\ &\sin\!\left(\cos^{-1}(ax-1)\right)\in[0,1]\end{aligned}" />,
    reason: <>The range of <Katex tex="\cos^{-1}" /> is <Katex tex="[0,\pi]" />, and the sine of an angle in <Katex tex="[0,\pi]" /> runs from <Katex tex="0" /> up to <Katex tex="1" /> (at <Katex tex="\tfrac{\pi}{2}" />) and back. So the range is <Katex tex="[0,1]" />, whatever <Katex tex="a" /> is.</>,
    more: <>Sine is never negative in the first two quadrants, which is why the range starts at <Katex tex="0" />, not <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\text{domain}=[0,1]" />,
    reason: <>The question says the domain is the same as the range.</>,
  },
  {
    working: <Katex display tex="a>0:\ \ 0\le x\le \frac{2}{a}\implies \frac{2}{a}=1\implies a=2" />,
    reason: <>Divide <Katex tex="0\le ax\le2" /> by <Katex tex="a" />. If <Katex tex="a<0" /> the inequalities reverse, giving <Katex tex="\left[\tfrac2a,0\right]" />, an interval of <i>non-positive</i> numbers that can never be <Katex tex="[0,1]" />. So <Katex tex="a>0" />: the inequalities keep their direction and the domain is <Katex tex="\left[0,\tfrac2a\right]" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}a=2:\ \ y&=\sqrt{1-(2x-1)^2}\\ &=2\sqrt{x(1-x)},\quad 0\le x\le1\end{aligned}" />,
    reason: <>Check, using <Katex tex="\sin(\cos^{-1}t)=\sqrt{1-t^2}" /> for <Katex tex="-1\le t\le1" />: the domain is <Katex tex="[0,1]" />, and the maximum, at <Katex tex="x=\tfrac12" />, is <Katex tex="2\sqrt{\tfrac14}=1" />, so the range is <Katex tex="[0,1]" /> too.</>,
  },
  {
    working: <Katex display tex="\boxed{a=2}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option A, <Katex tex="a=-2" />, gives domain <Katex tex="[-1,0]" />: the right length, but on the wrong side of <Katex tex="0" />. Option C, <Katex tex="a=1" />, gives domain <Katex tex="[0,2]" />.</>,
  },
]

export default function SpecialistQ2_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          If the implied domain of <Katex tex="y=\sin\!\left(\cos^{-1}(ax-1)\right)" />, where{' '}
          <Katex tex="a\in R\setminus\{0\}" />, is the same as the range, then the value of <Katex tex="a" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-2" /> },
        { letter: 'B', content: <Katex tex="-1" /> },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="2" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
