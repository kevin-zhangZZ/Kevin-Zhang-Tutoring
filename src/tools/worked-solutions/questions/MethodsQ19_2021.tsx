// 2021 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 35% correct. Which
// piecewise function is differentiable everywhere — testing both continuity and matching
// gradients at the join. Question text transcribed from the original paper. Solution is
// original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 13, C: 19, D: 20, E: 35 },
  answer: 'E',
  noAnswer: 1,
  comment: <>For <Katex tex="f(x)=\begin{cases}4x+1 & x<0\\(2x+1)^2 & x\geq0\end{cases}" />, both pieces meet with the same value <b>and</b> the same gradient at <Katex tex="x=0" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <>Every piecewise function here is defined by two smooth pieces, so the only place differentiability could fail is at the join, <Katex tex="x=0" />.</>,
    reason: <>To be differentiable at <Katex tex="x=0" />, a function must first be <i>continuous</i> there, then have matching left and right derivatives.</>,
  },
  {
    working: <Katex display tex="\text{A, B: } f(x)=\pm x \text{ either side of } 0" />,
    reason: <>Continuous (both give <Katex tex="0" /> at <Katex tex="x=0" />), but gradients are <Katex tex="+1" /> and <Katex tex="-1" /> — a corner, like <Katex tex="|x|" />. Not differentiable. (B also leaves <Katex tex="x=0" /> undefined entirely.)</>,
  },
  {
    working: <Katex display tex="\text{C: } 8(0)+4 = 4 \quad\text{vs}\quad (2(0)+1)^2=1" />,
    reason: <>Not even continuous at <Katex tex="x=0" /> (4 ≠ 1) — fails immediately.</>,
  },
  {
    working: <Katex display tex="\text{D: } 2(0)+1=1 = (2(0)+1)^2=1 \quad\checkmark \text{ continuous}" />,
    reason: 'Check continuity for D.',
  },
  {
    working: <Katex display tex="\text{D's gradients: } \frac{d}{dx}(2x+1)=2 \quad\text{vs}\quad \frac{d}{dx}(2x+1)^2\Big|_{x=0} = 4(2x+1)\big|_{x=0}=4" />,
    reason: <>Continuous, but gradients <Katex tex="2\neq4" /> — still a corner. Not differentiable.</>,
  },
  {
    working: <Katex display tex="\text{E: } 4(0)+1=1 = (2(0)+1)^2=1 \quad\checkmark \text{ continuous}" />,
    reason: 'Check continuity for E.',
  },
  {
    working: <Katex display tex="\text{E's gradients: } \frac{d}{dx}(4x+1)=4 \quad\text{vs}\quad 4(2x+1)\big|_{x=0}=4 \quad\checkmark" />,
    reason: <>Both continuous <i>and</i> matching gradients at <Katex tex="x=0" /> — genuinely smooth.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x)=\begin{cases}4x+1 & x<0\\(2x+1)^2 & x\geq0\end{cases}}" />,
    reason: <>Matches option <b>E</b> — the only one differentiable for all real <Katex tex="x" />.</>,
  },
]

export default function MethodsQ19_2021() {
  return (
    <MCQShell
      question={<p>Which one of the following functions is differentiable for all real values of <Katex tex="x" />?</p>}
      options={[
        { letter: 'A', content: <Katex tex="f(x)=\begin{cases}x & x<0\\-x & x\geq0\end{cases}" /> },
        { letter: 'B', content: <Katex tex="f(x)=\begin{cases}x & x<0\\-x & x>0\end{cases}" /> },
        { letter: 'C', content: <Katex tex="f(x)=\begin{cases}8x+4 & x<0\\(2x+1)^2 & x\geq0\end{cases}" /> },
        { letter: 'D', content: <Katex tex="f(x)=\begin{cases}2x+1 & x<0\\(2x+1)^2 & x\geq0\end{cases}" /> },
        { letter: 'E', content: <Katex tex="f(x)=\begin{cases}4x+1 & x<0\\(2x+1)^2 & x\geq0\end{cases}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
