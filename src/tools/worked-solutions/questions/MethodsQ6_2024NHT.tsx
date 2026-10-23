// 2024 Mathematical Methods NHT — Exam 2, MCQ 6. The NHT report gives the answer key only, with
// no statistics. Functions: the vertical asymptotes of y = tan(ax). Question text transcribed
// from the original paper. Solution is original; the answer C agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\tan(\theta)\ \text{undefined}\\ &\iff \theta=\frac{(2k+1)\pi}{2},\ \ k\in Z\end{aligned}" />,
    reason: <><Katex tex="\tan(\theta)=\tfrac{\sin(\theta)}{\cos(\theta)}" /> has a vertical asymptote wherever <Katex tex="\cos(\theta)=0" />: at the <b>odd</b> multiples of <Katex tex="\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="a\cdot\frac{\pi}{6}=\frac{(2k+1)\pi}{2}\ \Rightarrow\ a=3(2k+1)" />,
    reason: <>Here the angle is <Katex tex="\theta=ax" />, and it must be an odd multiple of <Katex tex="\tfrac{\pi}{2}" /> when <Katex tex="x=\tfrac{\pi}{6}" />. Multiply both sides by <Katex tex="\tfrac{6}{\pi}" />.</>,
  },
  {
    working: <Katex display tex="a\in\{\ldots,-9,-3,3,9,15,\ldots\}" />,
    reason: <><Katex tex="a" /> must be an odd multiple of <Katex tex="3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a=9}" />,
    reason: <>Matches option <b>C</b>, the only odd multiple of <Katex tex="3" /> among the options. Check: <Katex tex="9\times\tfrac{\pi}{6}=\tfrac{3\pi}{2}" />, where <Katex tex="\cos" /> is zero.</>,
    more: <>Options B and E fail differently from A and D: <Katex tex="6\times\tfrac{\pi}{6}=\pi" /> and <Katex tex="12\times\tfrac{\pi}{6}=2\pi" /> are where <Katex tex="\tan" /> is <b>zero</b>, so <Katex tex="x=\tfrac{\pi}{6}" /> would be an <Katex tex="x" />-intercept, not an asymptote. For <Katex tex="a=4" /> and <Katex tex="a=10" />, <Katex tex="a\cdot\tfrac{\pi}{6}" /> is <Katex tex="\tfrac{2\pi}{3}" /> or <Katex tex="\tfrac{5\pi}{3}" />, where <Katex tex="\tan" /> is simply a number.</>,
  },
]

export default function MethodsQ6_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\tan(ax)" /> has an asymptote with equation <Katex tex="x=\dfrac{\pi}{6}" />.
          <br />
          A possible value of <Katex tex="a" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="4" /> },
        { letter: 'B', content: <Katex tex="6" /> },
        { letter: 'C', content: <Katex tex="9" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="10" /> },
        { letter: 'E', content: <Katex tex="12" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
