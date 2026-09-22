// 2023 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 77% correct.
// Amplitude is a magnitude, so the leading minus sign does not survive. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 16, C: 2, D: 3, E: 77 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = -\tfrac12\sin(3x+2\pi) = a\sin\bigl(n(x+b)\bigr)" />,
    reason: <>Compare with the general form: <Katex tex="a=-\tfrac12" /> and <Katex tex="n=3" />.</>,
  },
  {
    working: <Katex display tex="A = |a| = \left|-\tfrac12\right| = \tfrac12" />,
    reason: <>Amplitude is the distance from the centre line to a peak, so it is never negative. Three of the five options offer <Katex tex="-\tfrac12" />, which is the trap.</>,
  },
  {
    working: <Katex display tex="P = \frac{2\pi}{n} = \frac{2\pi}{3}" />,
    reason: <>The <Katex tex="+2\pi" /> inside is a translation of a full period, so it changes neither the amplitude nor the period — in fact <Katex tex="\sin(3x+2\pi)=\sin(3x)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \tfrac12, \quad P = \tfrac{2\pi}{3}}" />,
    reason: <>Option <b>E</b>. Option <b>D</b> pairs the right amplitude with the period of <Katex tex="\sin(6x)" />.</>,
  },
]

export default function MethodsQ1_2023() {
  return (
    <MCQShell
      question={
        <p>
          The amplitude, <Katex tex="A" />, and the period, <Katex tex="P" />, of the function{' '}
          <Katex tex="f(x)=-\tfrac12\sin(3x+2\pi)" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="A=-\tfrac12,\ P=\tfrac\pi3" /> },
        { letter: 'B', content: <Katex tex="A=-\tfrac12,\ P=\tfrac{2\pi}{3}" /> },
        { letter: 'C', content: <Katex tex="A=-\tfrac12,\ P=\tfrac{3\pi}{2}" /> },
        { letter: 'D', content: <Katex tex="A=\tfrac12,\ P=\tfrac\pi3" /> },
        { letter: 'E', content: <Katex tex="A=\tfrac12,\ P=\tfrac{2\pi}{3}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
