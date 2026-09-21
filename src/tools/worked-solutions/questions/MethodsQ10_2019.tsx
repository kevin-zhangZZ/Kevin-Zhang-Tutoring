// 2019 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 55% correct. Which
// property is true for f(x) = x + sin(x). Question text transcribed from the original paper.
// VCAA printed no diagram; the graph is this site's own explanatory figure (matplotlib), since
// every option is a claim about the shape of this curve. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2019-mcq10-xsinx.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 6, C: 33, D: 55, E: 4 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={graphSrc} alt="Graph of y = x + sin(x): an always-rising staircase-like curve that briefly flattens at x = ±π but never turns back down" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <><Katex tex="f" /> is a straight line <Katex tex="y=x" /> with a sine wave added on top — the line sets the overall upward drift and the sine only makes it wobble, never reverse.</>,
  },
  {
    working: <Katex display tex="f'(x) = 1+\cos(x)" />,
    reason: <>Differentiating term by term.</>,
  },
  {
    working: <Katex display tex="-1\le\cos(x)\le1 \implies 0\le 1+\cos(x)\le2" />,
    reason: <>Adding <Katex tex="1" /> to the whole range of <Katex tex="\cos" /> shifts it to <Katex tex="[0,2]" />, which never dips below zero.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x)\ge0 \text{ for all } x\in\mathbb{R}}" />,
    reason: <>Matches option <b>D</b>. The gradient touches zero at <Katex tex="x=\pm\pi,\pm3\pi,\dots" /> (where <Katex tex="\cos x=-1" />) — those are the flat spots visible on the graph — but it is never negative, so the curve never falls.</>,
  },
  {
    working: <>Checking the other four:</>,
  },
  {
    working: <><b>A</b> — a horizontal asymptote</>,
    reason: <>False: <Katex tex="f(x)\to\pm\infty" /> as <Katex tex="x\to\pm\infty" />, because the <Katex tex="x" /> term grows without bound. The curve never levels out.</>,
  },
  {
    working: <><b>B</b> — infinitely many solutions to <Katex tex="f(x)=4" /></>,
    reason: <>False: the flat spots are single points, not flat <em>intervals</em>, so <Katex tex="f" /> is strictly increasing overall and takes each value exactly once. <Katex tex="f(x)=4" /> has exactly one solution.</>,
  },
  {
    working: <><b>C</b> — period <Katex tex="2\pi" /></>,
    reason: <>False, and the most popular wrong answer at <Katex tex="33\%" />: <Katex tex="\sin(x)" /> repeats every <Katex tex="2\pi" />, but the <Katex tex="+x" /> keeps climbing, so <Katex tex="f(x+2\pi)=f(x)+2\pi\ne f(x)" />. A periodic function must return to the <em>same</em> value.</>,
  },
  {
    working: <><b>E</b> — <Katex tex="f'(x)=\cos(x)" /></>,
    reason: <>False: differentiating <Katex tex="x" /> leaves <Katex tex="1" /> behind, so the derivative is <Katex tex="1+\cos(x)" />, not <Katex tex="\cos(x)" />.</>,
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
      diagram={<img src={graphSrc} alt="Graph of y = x + sin(x): an always-rising curve that briefly flattens at x = ±π but never turns back down" className="w-full max-w-[300px]" />}
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
