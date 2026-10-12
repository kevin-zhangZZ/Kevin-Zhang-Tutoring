// 2024 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 70% correct.
// Splitting an integral, then pulling out the constant factor. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 70, C: 12, D: 9 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_a^{c}f(x)\,dx = \int_a^{b}f(x)\,dx+\int_b^{c}f(x)\,dx" />,
    reason: <>Since <Katex tex="a<b<c" />, the interval from <Katex tex="a" /> to <Katex tex="c" /> splits at <Katex tex="b" /> into two pieces; the second piece is the integral we want.</>,
    more: <>This is the additive property of definite integrals: integrating from <Katex tex="a" /> to <Katex tex="b" /> and then on from <Katex tex="b" /> to <Katex tex="c" /> covers <Katex tex="a" /> to <Katex tex="c" /> exactly once. It holds for signed area too, so it doesn't matter that one of the given integrals is negative (that just means more of the signed area between <Katex tex="a" /> and <Katex tex="b" /> lies below the <Katex tex="x" />-axis than above it). The same idea as a shortcut: <Katex tex="\int_b^{c}f(x)\,dx=\int_a^{c}f(x)\,dx-\int_a^{b}f(x)\,dx" />, the long one minus the short one.</>,
  },
  {
    working: <Katex display tex="3 = -5+\int_b^{c}f(x)\,dx" />,
    reason: <>Substituting the two given integrals.</>,
  },
  {
    working: <Katex display tex="\int_b^{c}f(x)\,dx = 8" />,
    reason: <>Adding 5 to both sides. Watch the sign — the first integral is <em>negative</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_b^{c}2f(x)\,dx = 2\times8 = 16}" />,
    reason: <>Matches option <b>B</b>. A constant factor pulls straight out of an integral, so double the 8.</>,
    more: <>Each wrong option comes from mishandling the signs in the middle step, then doubling. Option <b>A</b> (<Katex tex="-16" />): subtracting the wrong way round, <Katex tex="-5-3=-8" />. Option <b>C</b> (<Katex tex="-4" />, the most common wrong answer): adding the two given integrals, <Katex tex="-5+3=-2" />, or dropping the minus sign, <Katex tex="3=5+I" /> so <Katex tex="I=-2" />. Option <b>D</b> (<Katex tex="4" />): two sign errors at once, using <Katex tex="5" /> instead of <Katex tex="-5" /> and subtracting the wrong way round, <Katex tex="5-3=2" />. A quick check of 8: <Katex tex="-5+8=3" />, the given value of <Katex tex="\int_a^{c}f(x)\,dx" /> ✓.</>,
  },
]

export default function MethodsQ4_2024() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_a^{b}f(x)\,dx=-5" /> and{' '}
          <Katex tex="\displaystyle\int_a^{c}f(x)\,dx=3" />, where{' '}
          <Katex tex="a<b<c" />, then{' '}
          <Katex tex="\displaystyle\int_b^{c}2f(x)\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-16" /> },
        { letter: 'B', content: <Katex tex="16" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="-4" /> },
        { letter: 'D', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
