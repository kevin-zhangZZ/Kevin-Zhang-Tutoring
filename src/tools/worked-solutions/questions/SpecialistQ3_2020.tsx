// 2020 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 68% correct. A
// piecewise velocity function read off a three-stage train journey. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 68, B: 20, C: 4, D: 5, E: 2 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="0\le t\le30: \ v \text{ rises from } 0 \text{ to } 10" />,
    reason: <>Constant acceleration from rest is a straight line through the origin.</>,
  },
  {
    working: <Katex display tex="v = \frac{10}{30}t = \frac{t}{3}" />,
    reason: <>Gradient <Katex tex="\tfrac{10}{30}" />, not 3 — options C and D invert it, which would reach 300 ms<sup>−1</sup> in 30 seconds.</>,
  },
  {
    working: <Katex display tex="30<t\le230: \ v = 10" />,
    reason: <>Two hundred seconds at the cruising speed, so the middle interval ends at 30 + 200 = 230.</>,
  },
  {
    working: <Katex display tex="230<t\le260: \ v \text{ falls from } 10 \text{ to } 0" />,
    reason: <>The whole trip is 260 seconds, so braking takes the last 30.</>,
  },
  {
    working: <Katex display tex="v = \frac{10}{30}(260-t) = \frac{260-t}{3}" />,
    reason: <>It must vanish at <Katex tex="t=260" />, so the bracket is <Katex tex="260-t" />. Option B uses <Katex tex="230-t" />, which is zero at the wrong end and negative for the whole braking phase.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{option A}}" />,
    reason: <>Matches option <b>A</b>; option <b>E</b> also gets the times wrong (the cruise ends at 230, not 200). Check the joins: <Katex tex="\tfrac{30}{3}=10" /> ✓ and <Katex tex="\tfrac{260-230}{3}=10" /> ✓, so the function is continuous.</>,
  },
]

const A = (
  <Katex tex="v(t)=\begin{cases}\tfrac13t, & 0\le t\le30\\ 10, & 30<t\le230\\ \tfrac13(260-t), & 230<t\le260\end{cases}" />
)
const B = (
  <Katex tex="v(t)=\begin{cases}\tfrac13t, & 0\le t\le30\\ 10, & 30<t\le230\\ \tfrac13(230-t), & 230<t\le260\end{cases}" />
)
const C = (
  <Katex tex="v(t)=\begin{cases}3t, & 0\le t\le30\\ 10, & 30<t\le230\\ 3(230-t), & 230<t\le260\end{cases}" />
)
const D = (
  <Katex tex="v(t)=\begin{cases}3t, & 0\le t\le30\\ 10, & 30<t\le230\\ 3(260-t), & 230<t\le260\end{cases}" />
)
const E = (
  <Katex tex="v(t)=\begin{cases}\tfrac13t, & 0\le t\le30\\ 10, & 30<t\le200\\ \tfrac13(230-t), & 200<t\le230\end{cases}" />
)

export default function SpecialistQ3_2020() {
  return (
    <MCQShell
      question={
        <p>
          A train is travelling from Station A to Station B. The train starts from rest at
          Station A and travels with constant acceleration for 30 seconds until it reaches a
          velocity of <Katex tex="10\text{ m s}^{-1}" />. It then travels at this velocity
          for 200 seconds. The train then slows down, with constant acceleration, and stops
          at Station B having travelled for 260 seconds in total. Let{' '}
          <Katex tex="v\text{ m s}^{-1}" /> be the velocity of the train at time{' '}
          <Katex tex="t" /> seconds.
          <br />
          The velocity <Katex tex="v" /> as a function of{' '}
          <Katex tex="t" /> is given by
        </p>
      }
      options={[
        { letter: 'A', content: A, isAnswer: true },
        { letter: 'B', content: B },
        { letter: 'C', content: C },
        { letter: 'D', content: D },
        { letter: 'E', content: E },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
