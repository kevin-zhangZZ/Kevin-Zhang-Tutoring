// 2024 Mathematical Methods NHT — Exam 2, MCQ 10. The NHT report gives the answer key only, with
// no statistics. Probability: a trapezium-shaped probability density function whose total area
// must be 1. Question text transcribed from the original paper; the graph is cropped from the
// original VCAA exam PDF. Solution is original; the answer A agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2024nht-mcq10-graph.png'

const DIAGRAM = <img loading="lazy" decoding="async" src={graphSrc} alt="Graph of y = f(x) from the original 2024 NHT VCAA exam paper: zero for x below −2 and above 2, rising in a straight line from (−2, 0) to (−k, k), level from (−k, k) to (k, k), then falling in a straight line to (2, 0) — a trapezium on the x-axis" className="w-full max-w-[360px]" />

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-\infty}^{\infty}f(x)\,dx=1" />,
    reason: <>For a probability density function the total area under the graph is <Katex tex="1" />. Here <Katex tex="f(x)=0" /> outside <Katex tex="[-2,2]" />, so the area is just the trapezium&apos;s.</>,
  },
  {
    working: <Katex display tex="A=\tfrac12(a+b)h=\tfrac12\big(4+2k\big)k=k^2+2k" />,
    reason: <>The trapezium&apos;s parallel sides are the base from <Katex tex="-2" /> to <Katex tex="2" /> (length <Katex tex="4" />) and the top from <Katex tex="-k" /> to <Katex tex="k" /> (length <Katex tex="2k" />); its height is <Katex tex="k" />.</>,
    more: <>No integration is needed: the graph is made of straight lines, so the area is a known shape. Splitting it into a rectangle <Katex tex="2k\times k" /> and two triangles of base <Katex tex="2-k" /> and height <Katex tex="k" /> gives the same <Katex tex="2k^2+(2-k)k=k^2+2k" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}k^2+2k-1&=0\\ k&=\frac{-2\pm\sqrt{4+4}}{2}\\&=-1\pm\sqrt2\end{aligned}" />,
    reason: <>Set the area equal to <Katex tex="1" /> and solve the quadratic with the quadratic formula.</>,
  },
  {
    working: <Katex display tex="k=-1-\sqrt2<0\ \text{rejected}" />,
    reason: <><Katex tex="k" /> is the height of the graph, and a probability density can&apos;t be negative. That rejected root is option B.</>,
  },
  {
    working: <Katex display tex="\boxed{k=\sqrt2-1}" />,
    reason: <>Matches option <b>A</b>. Check: <Katex tex="k\approx0.41" /> lies between <Katex tex="0" /> and <Katex tex="2" />, so <Katex tex="(k,k)" /> really is inside the base as drawn, and <Katex tex="(\sqrt2-1)^2+2(\sqrt2-1)=3-2\sqrt2+2\sqrt2-2=1" />.</>,
    more: <>Option E, <Katex tex="\tfrac{\sqrt6}{2}-1" />, comes from forgetting the <Katex tex="\tfrac12" /> in the trapezium formula: <Katex tex="(4+2k)k=1" />. Option D, <Katex tex="\sqrt6-2" />, uses <Katex tex="k" /> instead of <Katex tex="2k" /> for the top side: <Katex tex="\tfrac12(4+k)k=1" />.</>,
  },
]

export default function MethodsQ10_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The graph for <Katex tex="y=f(x)" /> is shown below.
          <br />
          Find the value of <Katex tex="k" /> given that <Katex tex="f(x)" /> is a probability density function.
        </p>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\sqrt2-1" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-\sqrt2-1" /> },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="\sqrt6-2" /> },
        { letter: 'E', content: <Katex tex="\dfrac{\sqrt6}{2}-1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
