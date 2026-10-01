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
    working: <Katex display tex="\begin{gathered}\text{Continuous at } x=2\pi:\\ \tan\!\left(\frac{2\pi}{2}\right) = \sin(2\pi a)\end{gathered}" />,
    reason: <>Continuous means no jump: the value the left branch approaches as <Katex tex="x\to2\pi" /> must equal <Katex tex="f(2\pi)" />, which comes from the right branch. The left branch has no asymptote on its interval (<Katex tex="\tfrac x2" /> runs from 2 to <Katex tex="\pi" />, and tan's asymptote at <Katex tex="\tfrac\pi2\approx1.57" /> is below 2), so substitute <Katex tex="x=2\pi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\sin(2\pi a) &= \tan(\pi) = 0\\ 2\pi a &= k\pi\\ a &= \frac k2, \ k\in Z\end{aligned}" />,
    reason: <><Katex tex="\sin" /> is zero exactly at the integer multiples of <Katex tex="\pi" />. Continuity alone leaves infinitely many candidates, including every option except <Katex tex="-\tfrac\pi2" />, so it cannot decide the question on its own.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{Smooth at } x=2\pi:\\ \frac{d}{dx}\tan\!\left(\frac x2\right) = \frac{d}{dx}\sin(ax)\end{gathered}" />,
    reason: <>Smooth means no corner: the gradients from the two sides must match at the join too. This is the second condition.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{d}{dx}\tan\!\left(\frac x2\right) &= \frac{1}{2\cos^2\!\left(\frac x2\right)}\\ \text{At } x=2\pi: \quad \frac{1}{2\cos^2(\pi)} &= \frac12\end{aligned}" />,
    reason: <>Left gradient. The formula sheet gives the derivative of <Katex tex="\tan(bx)" /> as <Katex tex="\tfrac{b}{\cos^2(bx)}" />, here with <Katex tex="b=\tfrac12" />. <Katex tex="\cos(\pi)=-1" />, and squaring makes it 1.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{d}{dx}\sin(ax) &= a\cos(ax)\\ \text{At } x=2\pi: \quad a\cos(2\pi a) &= \frac12\end{aligned}" />,
    reason: <>Right gradient, set equal to the left gradient of <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="a = \frac k2: \quad \frac k2\cos(k\pi) = \frac12 \implies k(-1)^k = 1" />,
    reason: <>Only the continuity candidates need testing. <Katex tex="\cos(k\pi)=(-1)^k" />: it is 1 at even multiples of <Katex tex="\pi" /> and <Katex tex="-1" /> at odd ones. Since <Katex tex="(-1)^k" /> is <Katex tex="\pm1" />, the equation needs <Katex tex="k=\pm1" />, and <Katex tex="k=1" /> gives <Katex tex="-1" />, so <Katex tex="k=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\frac12}" />,
    reason: <>Matches option <b>C</b>. Check: <Katex tex="\sin(-\pi)=0" /> ✓ and <Katex tex="-\tfrac12\cos(-\pi)=\tfrac12" /> ✓. Option <b>D</b>, <Katex tex="\tfrac12" />, is continuous but its gradient at <Katex tex="x=2\pi" /> is <Katex tex="\tfrac12\cos(\pi)=-\tfrac12" />, not <Katex tex="\tfrac12" />: the graph turns a corner, so the join is not smooth. Options <b>A</b> and <b>E</b>, <Katex tex="-2" /> and 2, are also continuous, but their gradients there are <Katex tex="-2" /> and 2. Option <b>B</b> fails even continuity: <Katex tex="\sin(-\pi^2)\approx0.43\ne0" />.</>,
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
