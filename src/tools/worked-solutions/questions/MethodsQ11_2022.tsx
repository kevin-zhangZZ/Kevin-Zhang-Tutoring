// 2022 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 66% correct.
// Integration by recognition, from a given derivative. Question text transcribed from the
// original paper. Solution is original.
// Oct 2026: options A–E now keep the paper's x·sin(x) dot (it had been dropped in transcription).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 9, C: 66, D: 7, E: 5 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\bigl(x\sin(x)\bigr) = \sin(x)+x\cos(x)" />,
    reason: <>Start from the given derivative and read it backwards: <Katex tex="x\sin(x)" /> is an antiderivative of <Katex tex="\sin(x)+x\cos(x)" />, which contains the <Katex tex="x\cos(x)" /> you need.</>,
    more: (
      <>
        This is integration by recognition. Methods has no rule for antidifferentiating <Katex tex="x\cos(x)" />{' '}
        directly, so when a question hands you a derivative like this one, it is there to be antidifferentiated.
      </>
    ),
  },
  {
    working: <Katex display tex="\int\bigl(\sin(x)+x\cos(x)\bigr)dx = x\sin(x)+c" />,
    reason: <>Antidifferentiate both sides of the given result.</>,
  },
  {
    working: <Katex display tex="\int\sin(x)\,dx+\int x\cos(x)\,dx = x\sin(x)+c" />,
    reason: <>The integral of a sum is the sum of the integrals.</>,
  },
  {
    working: <Katex display tex="\int x\cos(x)\,dx = x\sin(x)-\int\sin(x)\,dx" />,
    reason: <>Subtract <Katex tex="\int\sin(x)\,dx" /> from both sides to get the integral you want on its own. Leave <Katex tex="\int\sin(x)\,dx" /> unevaluated, because every option keeps it that way. It carries its own constant, so no separate <Katex tex="+c" /> is needed on this line.</>,
    more: (
      <>
        <p>
          <Katex tex="\int\sin(x)\,dx" /> stands for the whole family <Katex tex="-\cos(x)+c" />, with{' '}
          <Katex tex="c" /> any real number. Adding another constant only gives another member of the same family,
          so the answer is the same with or without one. That is also why the options can end in{' '}
          <Katex tex="+c" /> rather than <Katex tex="+\tfrac{c}{k}" />: an unknown constant divided by{' '}
          <Katex tex="k" /> is still just an unknown constant.
        </p>
        <p>
          Check by evaluating it: <Katex tex="\int x\cos(x)\,dx=x\sin(x)+\cos(x)+c" />. Differentiating{' '}
          <Katex tex="x\sin(x)+\cos(x)" /> gives <Katex tex="\sin(x)+x\cos(x)-\sin(x)=x\cos(x)" />, as it should.
        </p>
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\frac{1}{k}\int x\cos(x)\,dx\\ &= \frac1k\left(x\sin(x)-\int\sin(x)\,dx\right)+c\end{aligned}"
      />
    ),
    reason: <>Multiply both sides by <Katex tex="\tfrac1k" />. It multiplies the <em>whole</em> right side, so the brackets are needed. The final <Katex tex="+c" /> only matches the form of the options; it is harmless.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac1k\left(x\sin(x)-\int\sin(x)\,dx\right)+c}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: (
      <>
        Option A multiplies by <Katex tex="k" /> instead of dividing by <Katex tex="k" />. Option B applies the{' '}
        <Katex tex="\tfrac1k" /> to the <Katex tex="x\sin(x)" /> term only. Option D replaces{' '}
        <Katex tex="\int\sin(x)\,dx" /> with <Katex tex="\sin(x)" />, but the antiderivative of{' '}
        <Katex tex="\sin(x)" /> is <Katex tex="-\cos(x)" />, not <Katex tex="\sin(x)" />. Option E puts{' '}
        <Katex tex="x\sin(x)" /> back inside an integral, but <Katex tex="x\sin(x)" /> is already the antiderivative.
      </>
    ),
  },
]

export default function MethodsQ11_2022() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\dfrac{d}{dx}\bigl(x\cdot\sin(x)\bigr)=\sin(x)+x\cdot\cos(x)" />,
          then <Katex tex="\dfrac1k\displaystyle\int x\cos(x)\,dx" /> is equal to
        </p>
      }
      options={[
        {
          letter: 'A',
          content: <Katex tex="k\left(x\cdot\sin(x)-\int\sin(x)\,dx\right)+c" />,
        },
        { letter: 'B', content: <Katex tex="\frac1kx\cdot\sin(x)-\int\sin(x)\,dx+c" /> },
        {
          letter: 'C',
          content: <Katex tex="\frac1k\left(x\cdot\sin(x)-\int\sin(x)\,dx\right)+c" />,
          isAnswer: true,
        },
        { letter: 'D', content: <Katex tex="\frac1k\bigl(x\cdot\sin(x)-\sin(x)\bigr)+c" /> },
        {
          letter: 'E',
          content: <Katex tex="\frac1k\left(\int x\cdot\sin(x)\,dx-\int\sin(x)\,dx\right)+c" />,
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
