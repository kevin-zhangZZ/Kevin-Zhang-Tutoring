// 2019 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 72% correct. Which
// feature the graph of f(x) = eˣ/(x−1) does NOT have. Question text transcribed from the
// original paper. VCAA printed no diagram; the graph is this site's own explanatory figure
// (matplotlib), since every option is a claim about the shape of this curve.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2019-mcq1-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 2, C: 19, D: 4, E: 72 },
  answer: 'E',
  comment: <>There is a local minimum at <Katex tex="x=2" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={graphSrc} alt="Graph of y = eˣ/(x−1): a left branch hugging y = 0 and falling to −∞ at x = 1, and a right branch dropping from +∞ to a minimum at (2, e²) then rising" className="w-full max-w-[360px]" />
      </div>
    ),
    reason: <>Four of the five features are visible immediately; the question is which one is missing.</>,
  },
  {
    working: <><b>A — horizontal asymptote.</b> <Katex display tex="\lim_{x\to-\infty}\dfrac{e^x}{x-1} = 0" /></>,
    reason: <><Katex tex="e^x\to0" /> while the denominator grows without bound, so <Katex tex="y=0" /> is a horizontal asymptote on the left. <b>Has one.</b></>,
  },
  {
    working: <><b>B — vertical asymptote.</b> Denominator zero at <Katex tex="x=1" />, numerator <Katex tex="e^1\ne0" />.</>,
    reason: <>So <Katex tex="x=1" /> is a vertical asymptote. <b>Has one.</b></>,
  },
  {
    working: (
      <>
        <Katex display tex="f'(x) = \dfrac{e^x(x-1)-e^x}{(x-1)^2} = \dfrac{e^x(x-2)}{(x-1)^2}" />
        <Katex display tex="f'(x)=0 \implies x=2" />
      </>
    ),
    reason: <><b>C — local minimum.</b> The denominator is always positive and <Katex tex="e^x>0" />, so <Katex tex="f'" /> takes the sign of <Katex tex="(x-2)" />: negative before <Katex tex="x=2" />, positive after. That's a minimum, at <Katex tex="\left(2,e^2\right)" />. <b>Has one.</b></>,
  },
  {
    working: <><b>D — vertical axis intercept.</b> <Katex display tex="f(0) = \dfrac{e^0}{0-1} = -1" /></>,
    reason: <>The graph crosses the <Katex tex="y" />-axis at <Katex tex="(0,-1)" />. <b>Has one.</b></>,
  },
  {
    working: (
      <>
        <Katex display tex="f''(x) = \dfrac{e^x\left(x^2-4x+5\right)}{(x-1)^3}" />
        <Katex display tex="x^2-4x+5 = (x-2)^2+1 > 0 \ \text{ for all } x" />
      </>
    ),
    reason: <><b>E — point of inflection.</b> The numerator is never zero (its discriminant is <Katex tex="16-20<0" />), so <Katex tex="f''" /> is never zero. It changes sign only at <Katex tex="x=1" />, which is the asymptote and not a point on the curve. <b>No inflection point.</b></>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option E}}" />,
    reason: <>The only feature the graph does not have.</>,
  },
]

export default function SpecialistQ1_2019() {
  return (
    <MCQShell
      question={<p>The graph of <Katex tex="f(x)=\dfrac{e^x}{x-1}" /> does <b>not</b> have a</p>}
      diagram={<img src={graphSrc} alt="Graph of y = eˣ/(x−1)" className="w-full max-w-[300px]" />}
      options={[
        { letter: 'A', content: <>horizontal asymptote.</> },
        { letter: 'B', content: <>vertical asymptote.</> },
        { letter: 'C', content: <>local minimum.</> },
        { letter: 'D', content: <>vertical axis intercept.</> },
        { letter: 'E', content: <>point of inflection.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
