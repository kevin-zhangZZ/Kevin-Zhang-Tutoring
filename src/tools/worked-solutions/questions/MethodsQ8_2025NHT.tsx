// 2025 Mathematical Methods NHT — Exam 2, MCQ 8. The NHT report gives the answer key only, with
// no statistics. Calculus: equal areas above and below the axis mean a signed integral of zero.
// Question text transcribed from the original paper (the 2025 NHT paper is image-only, so read
// from the rendered page); the graph is cropped from the original VCAA exam PDF. Solution is
// original; the answer C agrees with the report's key (sympy: ∫₀ᵃ (x³ − x) dx = 0 gives a = 0, ±√2;
// area A = 1/4).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2025nht-mcq8-graph.png'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\int_0^a f(x)\,dx&=\int_0^1 f(x)\,dx+\int_1^a f(x)\,dx\\&=-A+B\end{aligned}" />,
    reason: <>The curve crosses the axis at <Katex tex="x=1" /> (<Katex tex="x^3-x=x(x-1)(x+1)" />). A definite integral counts area below the axis as negative, so from 0 to <Katex tex="a" /> it gives <Katex tex="B-A" />.</>,
  },
  {
    working: <Katex display tex="A=B\ \Rightarrow\ \int_0^a (x^3-x)\,dx=0" />,
    reason: <>Equal areas cancel exactly, so the signed integral over the whole interval is zero — no need to find either area separately.</>,
  },
  {
    working: <Katex display tex="\left[\frac{x^4}{4}-\frac{x^2}{2}\right]_0^a=\frac{a^4}{4}-\frac{a^2}{2}=0" />,
  },
  {
    working: <Katex display tex="\frac{a^2}{4}\left(a^2-2\right)=0\ \Rightarrow\ a=0\ \text{or}\ a=\pm\sqrt2" />,
    reason: <>Factorise rather than divide, then filter: <Katex tex="a>0" /> rules out <Katex tex="0" /> and <Katex tex="-\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a=\sqrt2}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Check: area <Katex tex="A=-\int_0^1(x^3-x)\,dx=\tfrac14" />, and <Katex tex="B=\int_1^{\sqrt2}(x^3-x)\,dx=\left(1-1\right)-\left(\tfrac14-\tfrac12\right)=\tfrac14" />. So option <b>A</b>, <Katex tex="\tfrac14" />, is the area itself, not <Katex tex="a" />, and option <b>B</b>, 1, is where <Katex tex="A" /> ends and <Katex tex="B" /> begins. <Katex tex="\sqrt2\approx1.41" /> sits a little right of 1, which fits the picture: <Katex tex="B" /> is a thin, tall sliver.</>,
  },
]

export default function MethodsQ8_2025NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The graph of <Katex tex="y=f(x)" /> is shown below, where{' '}
            <Katex tex="f:R\to R,\ f(x)=x^3-x" />.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={graphSrc}
              alt="The graph of y = x³ − x with region A shaded between the curve and the x-axis below the axis from O to the curve's next x-intercept, and region B shaded above the axis from that intercept to the dashed line x = a — from the original 2025 NHT VCAA exam paper"
              className="w-full max-w-[340px]"
            />
          </div>
          <p>
            The area of the region marked <Katex tex="A" /> is the same as the area of the region
            marked <Katex tex="B" />.
            <br />
            Given that <Katex tex="a>0" />, the value of <Katex tex="a" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{1}{4}" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="\sqrt2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\sqrt3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
