// 2023 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 42% correct.
// Continuous and smooth at a join: two conditions, one unknown. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 9, C: 42, D: 31, E: 10 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="f(x)=\begin{cases}\tan\left(\frac x2\right) & 4\le x<2\pi\\ \sin(ax) & 2\pi\le x\le8\end{cases}" />
      <br />
      For <Katex tex="f" /> to be continuous at <Katex tex="x=2\pi" />,
      <br />
      <Katex tex="\tan\left(\tfrac x2\right)=\sin(ax)" />
      <br />
      For <Katex tex="f" /> to be smooth at <Katex tex="x=2\pi" />,
      <br />
      <Katex tex="\tfrac{d}{dx}\tan\left(\tfrac x2\right)=\tfrac{d}{dx}\sin(ax)" />
      <br />
      So, solving <Katex tex="\tan\left(\tfrac x2\right)=\sin(ax)" /> and{' '}
      <Katex tex="\tfrac{d}{dx}\tan\left(\tfrac x2\right)=\tfrac{d}{dx}\sin(ax)" /> for{' '}
      <Katex tex="a" />,
      <br />
      <Katex tex="a=-\tfrac12" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Continuous at } x=2\pi: \quad \tan\!\left(\frac{2\pi}{2}\right) = \sin(2\pi a)" />,
    reason: <>The two branches must agree in value at the join.</>,
  },
  {
    working: <Katex display tex="\tan(\pi) = 0 \implies \sin(2\pi a) = 0 \implies 2\pi a = k\pi \implies a = \frac k2, \ k\in Z" />,
    reason: <>Continuity alone leaves infinitely many candidates, including every option except <Katex tex="-\tfrac\pi2" /> — so it cannot decide the question on its own.</>,
  },
  {
    working: <Katex display tex="\text{Smooth at } x=2\pi: \quad \frac{d}{dx}\tan\!\left(\frac x2\right) = \frac{d}{dx}\sin(ax)" />,
    reason: <>"Smooth" means the gradients match too — the second condition.</>,
  },
  {
    working: <Katex display tex="\frac12\sec^2\!\left(\frac{2\pi}{2}\right) = \frac12\sec^2(\pi) = \frac12" />,
    reason: <><Katex tex="\sec(\pi)=\tfrac{1}{\cos\pi}=-1" />, and squaring makes it 1.</>,
  },
  {
    working: <Katex display tex="a\cos(2\pi a) = \frac12 \ \text{ with } \ a = \frac k2 \implies \frac k2(-1)^k = \frac12" />,
    reason: <><Katex tex="\cos(k\pi)=(-1)^k" />. So <Katex tex="k(-1)^k=1" />, which forces <Katex tex="k=-1" /> — the positive <Katex tex="k=1" /> gives <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\frac12}" />,
    reason: <>Matches option <b>C</b>. Check: <Katex tex="\sin(-\pi)=0" /> ✓ and <Katex tex="-\tfrac12\cos(-\pi)=\tfrac12" /> ✓. Option <b>D</b>, <Katex tex="+\tfrac12" />, is continuous but has gradient <Katex tex="-\tfrac12" /> — a corner, not a smooth join.</>,
  },
]

export default function MethodsQ9_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>The function <Katex tex="f" /> is given by</p>
          <Katex
            display
            tex="f(x)=\begin{cases}\tan\!\left(\dfrac x2\right) & 4\le x<2\pi\\[6pt]\sin(ax) & 2\pi\le x\le8\end{cases}"
          />
          <p>
            The value of <Katex tex="a" /> for which <Katex tex="f" /> is continuous and
            smooth at <Katex tex="x=2\pi" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="-2" /> },
        { letter: 'B', content: <Katex tex="-\frac\pi2" /> },
        { letter: 'C', content: <Katex tex="-\frac12" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\frac12" /> },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
