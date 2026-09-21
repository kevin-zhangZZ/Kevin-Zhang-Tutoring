// 2019 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 55% correct. Which
// property is true for f(x) = x + sin(x). Question text transcribed from the original paper
// (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 6, C: 33, D: 55, E: 4 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 1+\cos(x)" />,
  },
  {
    working: <Katex display tex="-1\le\cos(x)\le1 \;\implies\; 0\le1+\cos(x)\le2" />,
  },
  {
    working: <Katex display tex="\boxed{f'(x)\ge0 \text{ for } x\in\mathbb{R}}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
  {
    working: <>Checking the others: <Katex tex="f(x)\to\pm\infty" /> as <Katex tex="x\to\pm\infty" /> (no asymptote, rules out A); <Katex tex="f" /> is non-decreasing and unbounded so <Katex tex="f(x)=4" /> has exactly one solution (rules out B); the <Katex tex="+x" /> term breaks periodicity (rules out C); <Katex tex="f'(x)=1+\cos(x)\ne\cos(x)" /> (rules out E).</>,
  },
]

export default function MethodsQ10_2019() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following statements is true for <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=x+\sin(x)" />?
        </p>
      }
      options={[
        { letter: 'A', content: <>The graph of <Katex tex="f" /> has a horizontal asymptote</> },
        { letter: 'B', content: <>There are infinitely many solutions to <Katex tex="f(x)=4" /></> },
        { letter: 'C', content: <><Katex tex="f" /> has a period of <Katex tex="2\pi" /></> },
        { letter: 'D', content: <><Katex tex="f'(x)\ge0" /> for <Katex tex="x\in\mathbb{R}" /></>, isAnswer: true },
        { letter: 'E', content: <><Katex tex="f'(x)=\cos(x)" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
