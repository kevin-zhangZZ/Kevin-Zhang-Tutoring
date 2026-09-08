// 2015 Mathematical Methods — Exam 2, MCQ 17.
// f(x) = x^3 - 3x^2 + c has three distinct x-intercepts — find the set of possible c.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow } from '../QuestionParts'

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 3x^2-6x = 3x(x-2)" />,
    reason: <>Stationary points at <Katex tex="x=0" /> (local max) and <Katex tex="x=2" /> (local min).</>,
  },
  {
    working: <Katex display tex="f(0)=c, \qquad f(2)=8-12+c=c-4" />,
  },
  {
    working: <Katex display tex="c>0 \quad \text{and} \quad c-4<0" />,
    reason: 'Three distinct roots needs the local max above the axis and the local min below it (a positive cubic goes from −∞ to +∞, so it crosses three times only if it dips below zero and rises above zero at these turning points).',
  },
  {
    working: <Katex display tex="\boxed{c \in (0,4)}" />,
    reason: (
      <>
        Matches option <b>D</b> — open interval, since <Katex tex="c=0" /> or <Katex tex="c=4" /> would make
        a turning point touch the axis, giving a repeated (not distinct) root.
      </>
    ),
  },
]

export default function MethodsQ17_2015() {
  return (
    <MCQShell
      question={
        <>
          <p>
            A graph with rule <Katex tex="f(x) = x^3 - 3x^2 + c" />, where <Katex tex="c" /> is a real number,
            has three distinct <Katex tex="x" />-intercepts.
          </p>
          <p className="mt-2">The set of all possible values of <Katex tex="c" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\mathbb{R}" /> },
        { letter: 'B', content: <Katex tex="\mathbb{R}^+" /> },
        { letter: 'C', content: <Katex tex="\{0,4\}" /> },
        { letter: 'D', content: <Katex tex="(0,4)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="(-\infty,4)" /> },
      ]}
      rows={ROWS}
    />
  )
}
