// 2025 Mathematical Methods NHT — Exam 2, MCQ 7. The NHT report gives the answer key only, with
// no statistics. Functions: the range of a polynomial on a closed interval — an interior maximum
// and an endpoint minimum. Question text transcribed from the original paper (the 2025 NHT paper
// is image-only, so read from the rendered page). Solution is original; the answer B agrees with
// the report's key (sympy: g′ has one real zero in the interval, x = −0.62362…, where
// g = 4.70861…; g(−1.1) = −0.06481, g(0) = 2). Distractor D checked: it is [g(−1.1), g(0)].

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(-1.1)=-0.06481,\qquad g(0)=2" />,
    reason: <>On a closed interval the smallest and largest values occur either at an endpoint or at a stationary point inside, so check the endpoints first.</>,
    more: <><Katex tex="g(-1.1)=(-1.1)^5-3(-1.1)^4+2(-1.1)^3+6.6+2=-1.61051-4.3923-2.662+8.6=-0.06481" />. A tiny negative value — easy to miss if you only look at a graph.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&g'(x)=5x^4-12x^3+6x^2-6=0,\\ &-1.1\le x\le0\end{aligned}" />,
    reason: <>Stationary points inside the interval: solve <Katex tex="g'(x)=0" /> on the domain.</>,
  },
  {
    working: <Cas fn="solve">solve(5x⁴ − 12x³ + 6x² − 6 = 0, x) | −1.1 ≤ x ≤ 0</Cas>,
    reason: <>A quartic with no nice factors, so this needs CAS.</>,
  },
  {
    working: <Katex display tex="x=-0.6236\ldots,\quad g(-0.6236\ldots)=4.7086\ldots" />,
    reason: <>The only stationary point in the interval. Its value is far above both endpoint values, so it is the maximum.</>,
    more: <>Alternatively, <Cas fn="fMax">fMax(g(x), x) | −1.1 ≤ x ≤ 0</Cas> and <Cas fn="fMin">fMin(g(x), x) | −1.1 ≤ x ≤ 0</Cas> return the <Katex tex="x" />-values of the maximum and minimum directly — fMin returning the endpoint <Katex tex="x=-1.1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{[-0.06,\ 4.71]}" />,
    reason: <>Matches option <b>B</b>. The minimum is at the left endpoint, the maximum at the turning point.</>,
    more: <>Option <b>D</b>, <Katex tex="[-0.06,\,2.00]" />, uses only the two endpoint values and misses the turning point in between. Option <b>C</b> has the right maximum but a minimum of 0, missing that the graph dips just below the axis at <Katex tex="x=-1.1" />.</>,
  },
]

export default function MethodsQ7_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="g:[-1.1,\,0]\to R,\ g(x)=x^5-3x^4+2x^3-6x+2" />.
          <br />
          The range of <Katex tex="g" />, correct to two decimal places, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[0.00,\ 2.00]" /> },
        { letter: 'B', content: <Katex tex="[-0.06,\ 4.71]" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="[0.00,\ 4.71]" /> },
        { letter: 'D', content: <Katex tex="[-0.06,\ 2.00]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
