// 2019 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 75% correct. A definite
// integral of a linear combination of sin and cos. Question text transcribed from the
// original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 8, C: 75, D: 7, E: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int\bigl(a\sin(x)+b\cos(x)\bigr)dx = -a\cos(x)+b\sin(x)+c" />,
    reason: <>Antidifferentiate term by term: <Katex tex="\sin" /> integrates to <Katex tex="-\cos" /> and <Katex tex="\cos" /> integrates to <Katex tex="+\sin" />. The constants <Katex tex="a" /> and <Katex tex="b" /> just ride along. Getting that pair of signs the wrong way round is what most of the wrong options are built from.</>,
  },
  {
    working: <Katex display tex="\int_0^{\pi/6} = \Bigl[-a\cos(x)+b\sin(x)\Bigr]_0^{\pi/6} = \left(-a\cos\tfrac{\pi}{6}+b\sin\tfrac{\pi}{6}\right) - \left(-a\cos0+b\sin0\right)" />,
  },
  {
    working: <Katex display tex="\cos\tfrac{\pi}{6}=\dfrac{\sqrt3}{2}, \quad \sin\tfrac{\pi}{6}=\dfrac12, \quad \cos0=1, \quad \sin0=0" />,
    reason: <>Exact values from the unit circle — the presence of <Katex tex="\sqrt3" /> in every option confirms they're expected here.</>,
  },
  {
    working: <Katex display tex="= \left(-\dfrac{a\sqrt3}{2}+\dfrac{b}{2}\right) - \bigl(-a\bigr) = a-\dfrac{a\sqrt3}{2}+\dfrac{b}{2}" />,
  },
  {
    working: <Katex display tex="= \dfrac{2a-a\sqrt3+b}{2} = \dfrac{(2-\sqrt3)a+b}{2}" />,
    reason: <>Put everything over <Katex tex="2" />, then factor <Katex tex="a" /> out of the first two terms.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{(2-\sqrt3)a+b}{2}}" />,
    reason: <>Matches option <b>C</b>. Options <b>D</b> and <b>E</b> swap <Katex tex="a" /> and <Katex tex="b" /> — the result of mixing up which function integrates to which.</>,
  },
]

export default function MethodsQ4_2019() {
  return (
    <MCQShell
      question={<p><Katex tex="\displaystyle\int_0^{\pi/6}\bigl(a\sin(x)+b\cos(x)\bigr)\,dx" /> is equal to</p>}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{(2-\sqrt3)a-b}{2}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{b-(2-\sqrt3)a}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{(2-\sqrt3)a+b}{2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{(2-\sqrt3)b-a}{2}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{(2-\sqrt3)b+a}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
