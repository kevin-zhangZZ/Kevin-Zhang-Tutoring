// 2020 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 26% correct.
// A dilation and a translation, written as a matrix transformation. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 20, C: 38, D: 11, E: 5 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      The graph of <Katex tex="y=\cos(x)" /> is mapped to the graph of{' '}
      <Katex tex="y=\cos(2x+4)=\cos\bigl(2(x+2)\bigr)" />. There has been a dilation of factor{' '}
      <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis and then a translation of 2
      units to the left.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(2x+4) = \cos\bigl(2(x+2)\bigr)" />,
    reason: <>Factorising the argument is the whole question — it separates the dilation from the translation.</>,
  },
  {
    working: <Katex display tex="x' = \tfrac12 x - 2" />,
    reason: <>Reading <Katex tex="\cos\bigl(2(x'+2)\bigr)" /> backwards: the point at <Katex tex="x" /> on <Katex tex="\cos" /> ends up where <Katex tex="2(x'+2)=x" />, i.e. <Katex tex="x'=\tfrac x2-2" />. The <Katex tex="y" />-coordinate is unchanged.</>,
  },
  {
    working: <Katex display tex="\text{dilation factor } \tfrac12 \text{ from the } y\text{-axis, then translate } 2 \text{ left}" />,
    reason: <>Halving first and then shifting 2 left gives <Katex tex="\tfrac x2-2" /> ✓. Shifting 2 left first and then halving would give <Katex tex="\tfrac{x-2}{2}=\tfrac x2-1" /> ✗.</>,
  },
  {
    working: <Katex display tex="\begin{bmatrix}\tfrac12&0\\0&1\end{bmatrix}\left(\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-4\\0\end{bmatrix}\right) = \begin{bmatrix}\tfrac12 x-2\\y\end{bmatrix}" />,
    reason: <>Option A: the <Katex tex="-4" /> sits <em>inside</em> the brackets, so it is halved along with <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\text{B}: \ \tfrac12 x-4, \qquad \text{C}: \ \tfrac12 x-1" />,
    reason: <>Option B applies the <Katex tex="-4" /> after the dilation; option C halves a <Katex tex="-2" />. Only A lands on <Katex tex="\tfrac x2-2" /> — and C was the most popular choice at 38%.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{A}}" />,
    reason: <>Check with a point: <Katex tex="x=0" /> maps to <Katex tex="x'=-2" />, and <Katex tex="\cos\bigl(2(-2)+4\bigr)=\cos(0)=1" /> ✓.</>,
  },
]

export default function MethodsQ13_2020() {
  return (
    <MCQShell
      question={
        <p>
          The transformation <Katex tex="T:R^2\to R^2" /> that maps the graph of{' '}
          <Katex tex="y=\cos(x)" /> onto the graph of <Katex tex="y=\cos(2x+4)" /> is
        </p>
      }
      background={
        <Background title="Matrix wording, transformation mathematics">
          <p>
            Matrix representations of transformations are no longer part of the Methods study
            design. This question is still worth doing: every option is a diagonal matrix
            plus a shift, so it reads directly as "dilate, then translate" — and the ordering
            of those two steps is exactly what current Methods tests.
          </p>
          <p>
            The same treatment is applied to the matrix questions in 2016, 2017, 2018 and
            2019.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}\tfrac12&0\\0&1\end{bmatrix}\left(\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-4\\0\end{bmatrix}\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}\tfrac12&0\\0&1\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-4\\0\end{bmatrix}" /> },
        { letter: 'C', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}\tfrac12&0\\0&1\end{bmatrix}\left(\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-2\\0\end{bmatrix}\right)" /> },
        { letter: 'D', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}2&0\\0&1\end{bmatrix}\left(\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}2\\0\end{bmatrix}\right)" /> },
        { letter: 'E', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}2&0\\0&1\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}2\\0\end{bmatrix}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
