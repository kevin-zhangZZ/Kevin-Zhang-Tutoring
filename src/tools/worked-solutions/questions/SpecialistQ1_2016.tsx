// 2016 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 61% correct.
// Convert a pair of parametric equations built from cosec and cot into a cartesian relation.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 12, C: 11, D: 4, E: 61 },
  answer: 'E',
  noAnswer: 0,
  comment: <>Write <Katex tex="\dfrac{x}{3}=\mathrm{cosec}^2(t)" />, <Katex tex="\dfrac{y+1}{4}=\cot(t)" />, then eliminate <Katex tex="t" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{x}{3} = \mathrm{cosec}^2(t), \qquad \frac{y+1}{4} = \cot(t)" />,
    reason: 'Isolate the two trig expressions from the given parametric equations.',
  },
  {
    working: <Katex display tex="\mathrm{cosec}^2(t) - \cot^2(t) = 1" />,
    reason: 'The Pythagorean identity that links cosec and cot — the natural way to eliminate t.',
  },
  {
    working: <Katex display tex="\frac{x}{3} - \left(\frac{y+1}{4}\right)^2 = 1" />,
    reason: 'Substitute both expressions in.',
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} \left(\frac{y+1}{4}\right)^2 &= \frac{x}{3} - 1 \\ &= \frac{x-3}{3} \end{aligned}" />
        <Katex display tex="\implies\; (y+1)^2 = 16\!\left(\frac{x-3}{3}\right)" />
      </>
    ),
    reason: <>Rearrange to isolate <Katex tex="(y+1)^2" />, then multiply through by <Katex tex="16" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(y+1)^2 = \dfrac{16(x-3)}{3}}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ1_2016() {
  return (
    <MCQShell
      question={
        <p>
          The cartesian equation of the relation given by <Katex tex="x=3\,\mathrm{cosec}^2(t)" /> and{' '}
          <Katex tex="y=4\cot(t)-1" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{(y+1)^2}{16} - \dfrac{x^2}{9} = 1" /> },
        { letter: 'B', content: <Katex tex="(y+1)^2 = \dfrac{16(x+3)}{3}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{x^2}{9} + \dfrac{(y+1)^2}{16} = 1" /> },
        { letter: 'D', content: <Katex tex="4x-3y=15" /> },
        { letter: 'E', content: <Katex tex="(y+1)^2 = \dfrac{16(x-3)}{3}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
