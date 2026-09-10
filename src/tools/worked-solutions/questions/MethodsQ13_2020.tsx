// 2020 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 26% correct.
// Finding the matrix transformation that maps y = cos(x) onto y = cos(2x + 4). Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 20, C: 38, D: 11, E: 5 },
  answer: 'A',
  comment: (
    <>
      The graph of <Katex tex="y=\cos(x)" /> is mapped to the graph of{' '}
      <Katex tex="y=\cos(2x+4)=\cos\big(2(x+2)\big)" />: a dilation of factor <Katex tex="\tfrac12" /> from the{' '}
      <Katex tex="y" />-axis, then a translation 2 units left.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(2x+4) = \cos\big(2(x+2)\big)" />,
    reason: 'Factor the target function to expose the underlying transformation.',
  },
  {
    working: <>Try <Katex tex="Y=y" /> and find <Katex tex="X" /> so that <Katex tex="Y=\cos(2X+4)" /> holds whenever <Katex tex="y=\cos(x)" />.</>,
    reason: <>Look for a substitution <Katex tex="X=X(x)" /> that turns <Katex tex="\cos(2X+4)" /> back into plain <Katex tex="\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="2X+4 = x \;\implies\; X = \frac{x-4}{2} = \frac{x}{2}-2" />,
    reason: <>Solve so that <Katex tex="\cos(2X+4)=\cos(x)=y=Y" /> — this <Katex tex="X" /> is exactly the new <Katex tex="x" />-coordinate the transformation must produce.</>,
  },
  {
    working: <Katex display tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}\tfrac12 & 0\\0&1\end{bmatrix}\begin{bmatrix}x-4\\y\end{bmatrix}" />,
    reason: <>Write <Katex tex="X=\tfrac12(x-4)" />, <Katex tex="Y=y" /> as a matrix acting on the shifted vector.</>,
  },
  {
    working: <Katex display tex="\boxed{T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}\tfrac12 & 0\\0&1\end{bmatrix}\left(\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-4\\0\end{bmatrix}\right)}" />,
    reason: <>Rewrite <Katex tex="x-4" /> as <Katex tex="x+(-4)" /> to match the shift-then-scale form — matches option <b>A</b>.</>,
  },
]

export default function MethodsQ13_2020() {
  return (
    <MCQShell
      question={
        <p>
          The transformation <Katex tex="T:\mathbb{R}^2\to\mathbb{R}^2" /> that maps the graph of{' '}
          <Katex tex="y=\cos(x)" /> onto the graph of <Katex tex="y=\cos(2x+4)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}\tfrac12 & 0\\0&1\end{bmatrix}\left(\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-4\\0\end{bmatrix}\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}\tfrac12 & 0\\0&1\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-4\\0\end{bmatrix}" /> },
        { letter: 'C', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}\tfrac12 & 0\\0&1\end{bmatrix}\left(\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-2\\0\end{bmatrix}\right)" /> },
        { letter: 'D', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}2 & 0\\0&1\end{bmatrix}\left(\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}2\\0\end{bmatrix}\right)" /> },
        { letter: 'E', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}2 & 0\\0&1\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}2\\0\end{bmatrix}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
