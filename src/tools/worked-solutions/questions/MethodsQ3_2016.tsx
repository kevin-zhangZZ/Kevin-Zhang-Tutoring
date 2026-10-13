// 2016 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 77% correct.
// Where a cubic is decreasing, read off its two labelled turning points. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2016-mcq3-cubic.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 3, C: 77, D: 10, E: 6 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)<0 \iff f \text{ is decreasing}" />,
    reason: <>The question is about the derivative, so look for where the curve runs downhill — not for where it is below the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\text{turning points at } x=-2 \text{ and } x=\tfrac13" />,
    reason: <>Read straight off the two labelled points. These are the only places the gradient can change sign.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&(-2,-9) \text{ is a minimum}\\ &\left(\tfrac13,\tfrac{100}{27}\right) \text{ is a maximum}\end{aligned}" />,
    reason: <>From the shape: the curve falls into the first, rises to the second, then falls again.</>,
  },
  {
    working: <Katex display tex="\boxed{x\in(-\infty,-2)\cup\left(\tfrac13,\infty\right)}" />,
    reason: <>Matches option <b>C</b> — downhill before the minimum and after the maximum.</>,
    more: <>The endpoints are open because <Katex tex="f'(-2)=f'(\tfrac13)=0" />, which is not negative. Option D (chosen by 10%) is where the cubic is <em>increasing</em>. Option B uses the <Katex tex="y" />-values of the turning points instead of their <Katex tex="x" />-values. Option E uses the <Katex tex="x" />-intercept <Katex tex="1" /> in place of the maximum's <Katex tex="x=\tfrac13" />, and wrongly includes <Katex tex="x=-2" />. Option A's first interval, <Katex tex="(-2,0)" />, is part of where the curve rises from the minimum.</>,
  },
]

export default function MethodsQ3_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Part of the graph <Katex tex="y=f(x)" /> of the polynomial function{' '}
            <Katex tex="f" /> is shown below.
          </p>
          <p>
            <Katex tex="f'(x)<0" /> for
          </p>
        </>
      }
      diagram={
        <img loading="lazy" decoding="async"
          src={diagramSrc}
          alt="Part of a cubic graph with x-intercepts at −3, −1/2 and 1, a local minimum at (−2, −9) and a local maximum at (1/3, 100/27), from the original 2016 VCAA exam paper"
          className="w-full max-w-[330px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="x\in(-2,0)\cup\left(\tfrac13,\infty\right)" /> },
        { letter: 'B', content: <Katex tex="x\in\left(-9,\tfrac{100}{27}\right)" /> },
        { letter: 'C', content: <Katex tex="x\in(-\infty,-2)\cup\left(\tfrac13,\infty\right)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="x\in\left(-2,\tfrac13\right)" /> },
        { letter: 'E', content: <Katex tex="x\in(-\infty,-2]\cup(1,\infty)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
