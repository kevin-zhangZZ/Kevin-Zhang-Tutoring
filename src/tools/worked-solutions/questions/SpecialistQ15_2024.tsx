// 2024 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 36% correct. This
// year's paper used four options (A–D) rather than five. Describing the motion of a body
// along a parabolic path traced out parametrically. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 36, B: 12, C: 44, D: 8 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="x=\sin(t)" /> period is <Katex tex="2\pi" />
      <br />
      <Katex tex="y=\cos(2t)" /> period is <Katex tex="\pi" />
      <br />
      <Katex tex="=1-2\sin^2(t)" />
      <br />
      <Katex tex="=1-2x^2" />
      <br />
      The motion has period <Katex tex="2\pi" />. Starting at <Katex tex="(0,1)" /> at{' '}
      <Katex tex="t=0" />, after visiting <Katex tex="(1,-1)" /> at{' '}
      <Katex tex="t=\dfrac{\pi}{2}" /> and <Katex tex="(-1,-1)" /> at{' '}
      <Katex tex="t=\dfrac{3\pi}{2}" />, the body returns to <Katex tex="(0,1)" /> at{' '}
      <Katex tex="t=2\pi" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{r}(t) &= \sin(t)\underset{\sim}{i} + \cos(2t)\underset{\sim}{j} \\ x &=\sin(t),\quad y=\cos(2t) \end{aligned}" />,
    reason: <>The <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components of the position vector are the body's <Katex tex="x" /> and <Katex tex="y" /> coordinates.</>,
  },
  {
    working: <Katex display tex="y = \cos(2t) = 1-2\sin^2(t) = 1-2x^2" />,
    reason: <>Write <Katex tex="\cos(2t)" /> in terms of <Katex tex="\sin(t)" /> (double-angle identity) so <Katex tex="t" /> can be replaced by <Katex tex="x" />. This rules out B and D.</>,
    more: <>Because <Katex tex="x=\sin(t)" />, the body only ever uses the arc of <Katex tex="y=1-2x^2" /> with <Katex tex="-1\le x\le 1" />, from <Katex tex="(-1,-1)" /> up to the vertex <Katex tex="(0,1)" /> and down to <Katex tex="(1,-1)" />. It cannot go further out, so it must turn back at the two ends of this arc.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Katex tex="t=0:\ (0,1)" /></span>
        <span><Katex tex="t=\tfrac{\pi}{2}:\ (1,-1)" /> — <Katex tex="x" /> has reached its maximum, so it must now decrease: <b>direction reverses</b>.</span>
        <span><Katex tex="t=\pi:\ (0,1)" /> — passing back through the start, still moving left.</span>
        <span><Katex tex="t=\tfrac{3\pi}{2}:\ (-1,-1)" /> — <Katex tex="x" /> reaches its minimum: <b>direction reverses again</b>.</span>
        <span><Katex tex="t=2\pi:\ (0,1)" /> — back to the start.</span>
      </div>
    ),
    reason: <>Substitute <Katex tex="t=0,\tfrac{\pi}{2},\pi,\tfrac{3\pi}{2},2\pi" />, where <Katex tex="x=\sin(t)" /> is at <Katex tex="0" /> or <Katex tex="\pm1" />. The body reverses where <Katex tex="x" /> stops increasing and starts decreasing (or vice versa).</>,
    more: <>The velocity confirms this: <Katex tex="\dot{\underset{\sim}{r}}(t)=\cos(t)\underset{\sim}{i}-2\sin(2t)\underset{\sim}{j}" />. At <Katex tex="t=\tfrac{\pi}{2}" /> and <Katex tex="t=\tfrac{3\pi}{2}" /> it is <Katex tex="\underset{\sim}{0}" /> and <Katex tex="\cos(t)" /> changes sign there, so the body stops and turns back. At <Katex tex="t=\pi" /> the velocity is <Katex tex="-\underset{\sim}{i}" />: the body passes through <Katex tex="(0,1)" /> without stopping, heading towards <Katex tex="(-1,-1)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{r}(t+\pi) &= -\sin(t)\underset{\sim}{i} + \cos(2t)\underset{\sim}{j} \\ &\neq \underset{\sim}{r}(t) \text{ in general} \end{aligned}" />,
    reason: <>
      At <Katex tex="t=\pi" /> the body is back at <Katex tex="(0,1)" /> after only one reversal. As <Katex tex="x=\sin(t)" /> has period <Katex tex="2\pi" />, both reversals and the return take <Katex tex="2\pi" /> seconds.
    </>,
    more: <>This is the trap behind C, chosen by 44% of students. C uses the period of <Katex tex="y=\cos(2t)" /> alone. Being at <Katex tex="(0,1)" /> again is not the same as repeating the motion: the working shows <Katex tex="\underset{\sim}{r}(t+\pi)\neq\underset{\sim}{r}(t)" />, and at <Katex tex="t=\pi" /> the body is heading left, whereas at <Katex tex="t=0" /> it headed right. It reaches <Katex tex="(-1,-1)" /> at <Katex tex="t=\tfrac{3\pi}{2}" />. The sequence in C (both reversals, then back to the start) takes <Katex tex="2\pi" /> seconds, not <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &y=1-2x^2,\ \text{start } (0,1), \\ &\text{reverse at } (1,-1)\text{, then } (-1,-1), \\ &\text{return to } (0,1) \text{ after } 2\pi\text{ s} \end{aligned}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <><b>B</b> and <b>D</b> have the wrong parabola and the wrong start: <Katex tex="\underset{\sim}{r}(0)=\sin(0)\underset{\sim}{i}+\cos(0)\underset{\sim}{j}" /> gives <Katex tex="(0,1)" />, not <Katex tex="(1,0)" />, and at <Katex tex="t=\tfrac{\pi}{2}" /> the point <Katex tex="(1,-1)" /> is not on <Katex tex="y=1-x^2" />. <b>C</b> has the right path and turning points but ends the cycle at the first return to <Katex tex="(0,1)" />, before the second reversal.</>,
  },
]

export default function SpecialistQ15_2024() {
  return (
    <MCQShell
      question={
        <p>
          The position of a moving body is given by <Katex tex="\underset{\sim}{r}(t) = \sin(t)\underset{\sim}{i} + \cos(2t)\underset{\sim}{j}" />, where{' '}
          <Katex tex="t" /> is measured in seconds, for <Katex tex="t\geq0" />.
          <br />
          The motion of the body can be described as moving along a parabolic path given by
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="y=1-2x^2" />, starting at (0, 1), reversing direction at (1, −1) and then again at (−1, −1), then returning to (0, 1) after 2π seconds.</>, isAnswer: true },
        { letter: 'B', content: <><Katex tex="y=1-x^2" />, starting at (1, 0), reversing direction at (−1, 0), then returning to (1, 0) after 2π seconds.</> },
        { letter: 'C', content: <><Katex tex="y=1-2x^2" />, starting at (0, 1), reversing direction at (1, −1) and then again at (−1, −1), then returning to (0, 1) after π seconds.</> },
        { letter: 'D', content: <><Katex tex="y=1-x^2" />, starting at (1, 0), reversing direction at (−1, 0), then returning to (1, 0) after π seconds.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
