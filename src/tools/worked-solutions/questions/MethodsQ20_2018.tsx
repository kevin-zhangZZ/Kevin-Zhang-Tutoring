// 2018 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 20% correct —
// the second-hardest MCQ in the 2017-2018 Methods Exam 2 papers.
// A linear transformation maps one probability density function to another; find it from
// how it changes the median's slope. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 26, C: 21, D: 21, E: 11 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      Gradient <Katex tex="=m=4" />. Reflect in the <Katex tex="y" />-axis: <Katex tex="m=-4" />. Dilate by
      a factor of 2 from the <Katex tex="y" />-axis: <Katex tex="m=-\tfrac42=-2" />. Dilate by a factor of{' '}
      <Katex tex="\tfrac12" /> from the <Katex tex="x" />-axis: <Katex tex="m=-1" />. The matrix{' '}
      <Katex tex="\begin{bmatrix}-2&0\\0&\tfrac12\end{bmatrix}" /> represents this transformation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="T\!\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}a&0\\0&b\end{pmatrix}\!\begin{pmatrix}x\\y\end{pmatrix}" />
        <Katex display tex="\implies\; x'=ax,\ y'=by" />
      </>
    ),
    reason: <>Try a general diagonal (scaling) transformation and find what <Katex tex="a" /> and <Katex tex="b" /> must be.</>,
  },
  {
    working: <Katex display tex="g(x')=b\,f\!\left(\frac{x'}{a}\right)" />,
    reason: <>A point <Katex tex="(x,f(x))" /> maps to <Katex tex="(ax,\,bf(x))" />; writing <Katex tex="x=x'/a" /> gives the new curve <Katex tex="g" /> in terms of <Katex tex="f" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_{-\infty}^{\infty} g(x')\,dx' = |a|\,b\int_{-\infty}^{\infty} f(u)\,du" />
        <Katex display tex="= |a|\,b \;\overset{!}{=}\; 1" />
        <Katex display tex="\implies\; b=\frac{1}{|a|}" />
      </>
    ),
    reason: <>For <Katex tex="g" /> to remain a valid probability density (area 1, non-negative), substituting <Katex tex="u=x'/a" /> forces <Katex tex="|a|\,b=1" />; <Katex tex="b" /> itself must be positive.</>,
  },
  {
    working: (
      <>
        <Katex display tex="g'(x') = \frac{b}{a}f'\!\left(\frac{x'}{a}\right)" />
        <Katex display tex="\begin{aligned} \implies\; g'(0) &= \frac{b}{a}f'(0) \\ &= \frac{4}{a|a|} \end{aligned}" />
      </>
    ),
    reason: <>Chain rule, then evaluate at <Katex tex="x'=0" /> (median maps to median, since the transform fixes the origin) using <Katex tex="f'(0)=4" /> and <Katex tex="b=1/|a|" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\frac{4}{a|a|} = -1" />
        <Katex display tex="\implies\; a|a|=-4" />
      </>
    ),
    reason: <>Set equal to the given <Katex tex="g'(0)=-1" />. The right side is negative, so <Katex tex="a" /> must be negative (a reflection is needed).</>,
  },
  {
    working: (
      <>
        <Katex display tex="a=-k\ (k>0)" />
        <Katex display tex="\implies\; -k^2=-4" />
        <Katex display tex="\implies\; k=2" />
        <Katex display tex="\implies\; a=-2,\ b=\tfrac12" />
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{T\!\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}-2&0\\0&\tfrac12\end{pmatrix}\!\begin{pmatrix}x\\y\end{pmatrix}}" />,
    reason: <>Matches option <b>A</b> — a reflection-and-dilation in <Katex tex="x" /> (factor <Katex tex="-2" />) together with a dilation of factor <Katex tex="\tfrac12" /> in <Katex tex="y" />.</>,
  },
]

export default function MethodsQ20_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The differentiable function <Katex tex="f:\mathbb{R}\to\mathbb{R}" /> is a probability density
            function. It is known that the median of the probability density function <Katex tex="f" /> is
            at <Katex tex="x=0" /> and <Katex tex="f'(0)=4" />.
          </p>
          <p className="mb-2">
            The transformation <Katex tex="T:\mathbb{R}^2\to\mathbb{R}^2" /> maps the graph of <Katex tex="f" />{' '}
            to the graph of <Katex tex="g" />, where <Katex tex="g:\mathbb{R}\to\mathbb{R}" /> is a probability
            density function with a median at <Katex tex="x=0" /> and <Katex tex="g'(0)=-1" />.
          </p>
          <p>The transformation <Katex tex="T" /> could be given by</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="T\!\begin{pmatrix}x\\y\end{pmatrix} = \begin{bmatrix}-2&0\\0&\tfrac12\end{bmatrix}\!\begin{pmatrix}x\\y\end{pmatrix}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="T\!\begin{pmatrix}x\\y\end{pmatrix} = \begin{bmatrix}2&0\\0&-\tfrac12\end{bmatrix}\!\begin{pmatrix}x\\y\end{pmatrix}" /> },
        { letter: 'C', content: <Katex tex="T\!\begin{pmatrix}x\\y\end{pmatrix} = \begin{bmatrix}2&0\\0&\tfrac12\end{bmatrix}\!\begin{pmatrix}x\\y\end{pmatrix}" /> },
        { letter: 'D', content: <Katex tex="T\!\begin{pmatrix}x\\y\end{pmatrix} = \begin{bmatrix}-\tfrac12&0\\0&2\end{bmatrix}\!\begin{pmatrix}x\\y\end{pmatrix}" /> },
        { letter: 'E', content: <Katex tex="T\!\begin{pmatrix}x\\y\end{pmatrix} = \begin{bmatrix}\tfrac12&0\\0&-2\end{bmatrix}\!\begin{pmatrix}x\\y\end{pmatrix}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
