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
    working: <Katex display tex="f(x) = -\tfrac12\sin(3x+2\pi) = -\tfrac12\sin\!\Bigl(3\bigl(x+\tfrac{2\pi}{3}\bigr)\Bigr)" />,
    reason: <>Factorise the coefficient of <Katex tex="x" /> out of the bracket so the rule matches the form <Katex tex="a\sin\bigl(n(x+b)\bigr)" />: here <Katex tex="a=-\tfrac12" />, <Katex tex="n=3" /> and <Katex tex="b=\tfrac{2\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="A = |a| = \left|-\tfrac12\right| = \tfrac12" />,
    reason: <>Amplitude is the distance from the centre line (here <Katex tex="y=0" />) to a maximum, so it is never negative. The minus sign only reflects the graph in the <Katex tex="x" />-axis.</>,
    more: <>The reflected graph still reaches <Katex tex="\tfrac12" /> above and <Katex tex="\tfrac12" /> below the centre line; it just goes down first instead of up. Reflecting a graph never changes how far it reaches from the centre line.</>,
  },
  {
    working: <Katex display tex="P = \frac{2\pi}{n} = \frac{2\pi}{3}" />,
    reason: <><Katex tex="\sin(nx)" /> completes one cycle as <Katex tex="nx" /> runs through <Katex tex="2\pi" />, that is, as <Katex tex="x" /> runs through <Katex tex="\tfrac{2\pi}{n}" />. The <Katex tex="+\tfrac{2\pi}{3}" /> inside is only a horizontal translation, which changes neither the amplitude nor the period.</>,
    more: <>In fact the translation is exactly one period, so <Katex tex="\sin(3x+2\pi)=\sin(3x)" /> and the graph is the same as <Katex tex="y=-\tfrac12\sin(3x)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \tfrac12, \quad P = \tfrac{2\pi}{3}}" />,
    reason: <>Matches option <b>E</b>; option <b>B</b> keeps the minus sign in the amplitude.</>,
    more: <>Option <b>B</b> was the most common wrong answer (16%): its period is right, so the only slip is the sign. Option <b>D</b> has the right amplitude, but its period <Katex tex="\tfrac{\pi}{3}=\tfrac{\pi}{n}" /> is the rule for <Katex tex="\tan(nx)" />, not <Katex tex="\sin(nx)" />. Options <b>A</b> and <b>C</b> pair the negative amplitude with a wrong period: <b>A</b> repeats <b>D</b>&rsquo;s <Katex tex="\tfrac{\pi}{3}" />, and <b>C</b>&rsquo;s <Katex tex="\tfrac{3\pi}{2}" /> swaps the 2 and the 3 in <Katex tex="\tfrac{2\pi}{3}" />.</>,
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
