// 2017 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 47% correct.
// A transformation written as a matrix, applied to y = 3sin(2(x + π/4)). Transformation
// matrices are no longer on the study design, but the mathematics here — dilations from
// the axes applied to a graph, and a sine-to-cosine shift — is entirely current, so the
// question is included with a note on reading the matrix. See the skip guide. Question
// text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 23, C: 6, D: 47, E: 14 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}2&0\\0&\tfrac13\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" />
      <br />
      <Katex tex="x'=2x,\ x=\tfrac{x'}{2}" />
      <br />
      <Katex tex="y'=\tfrac13y,\ y=3y'" />
      <br />
      <Katex tex="y=3\sin\!\left(2\left(x+\tfrac{\pi}{4}\right)\right)" />
      <br />
      <Katex tex="3y'=3\sin\!\left(2\left(\tfrac{x'}{2}+\tfrac{\pi}{4}\right)\right)" />
      <br />
      <Katex tex="y'=\sin\!\left(x'+\tfrac{\pi}{2}\right)" />
      <br />
      <Katex tex="y'=\cos(x')" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x'=2x, \qquad y'=\tfrac13y" />,
    reason: <>Reading the matrix row by row: the first row gives the new <Katex tex="x" />, the second the new <Katex tex="y" />. So this is a dilation by factor <Katex tex="2" /> from the <Katex tex="y" />-axis and by factor <Katex tex="\tfrac13" /> from the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="x=\frac{x'}{2}, \qquad y=3y'" />,
    reason: <>Invert, so the <em>old</em> variables are expressed in terms of the new ones. It is an easy step to get backwards — the substitution needs old in terms of new, not the other way round.</>,
  },
  {
    working: <Katex display tex="3y' = 3\sin\!\left(2\left(\frac{x'}{2}+\frac{\pi}{4}\right)\right)" />,
    reason: <>Substituting into <Katex tex="y=3\sin\!\left(2\left(x+\tfrac{\pi}{4}\right)\right)" />.</>,
  },
  {
    working: <Katex display tex="3y' = 3\sin\!\left(x'+\frac{\pi}{2}\right)" />,
    reason: <>Expanding the bracket: <Katex tex="2\times\tfrac{x'}{2}=x'" /> and <Katex tex="2\times\tfrac{\pi}{4}=\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="y' = \sin\!\left(x'+\frac{\pi}{2}\right)" />,
    reason: <>Dividing by <Katex tex="3" />, which is exactly what the vertical dilation was for.</>,
  },
  {
    working: <Katex display tex="\boxed{y=\cos(x)}" />,
    reason: <>Since <Katex tex="\sin\!\left(\theta+\tfrac{\pi}{2}\right)=\cos(\theta)" /> — a sine shifted a quarter-period left is a cosine. Matches option <b>D</b>. Option B (23%), <Katex tex="\sin\!\left(x-\tfrac{\pi}{2}\right)" />, shifts the wrong way; option E, <Katex tex="\cos\!\left(x-\tfrac{\pi}{2}\right)" />, is <Katex tex="\sin(x)" /> in disguise.</>,
  },
]

export default function MethodsQ10_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A transformation <Katex tex="T:R^2\to R^2" /> with rule{' '}
            <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}2&0\\0&\tfrac13\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" />{' '}
            maps the graph of{' '}
            <Katex tex="y=3\sin\!\left(2\left(x+\tfrac{\pi}{4}\right)\right)" />
          </p>
          <p>onto the graph of</p>
        </>
      }
      background={
        <>
          <p>
            <strong>On the matrix notation.</strong> Transformation matrices were dropped
            from Mathematical Methods, so you will not be asked to read one in a current
            exam. Everything else in this question is core material, which is why it is
            here rather than in the skip list.
          </p>
          <p>
            The matrix <Katex tex="\begin{bmatrix}2&0\\0&\tfrac13\end{bmatrix}" /> says
            nothing more than <Katex tex="x'=2x" /> and <Katex tex="y'=\tfrac13y" /> — a
            dilation of factor <Katex tex="2" /> from the <Katex tex="y" />-axis and a
            dilation of factor <Katex tex="\tfrac13" /> from the <Katex tex="x" />-axis. A
            current paper would describe those two dilations in words, and the working from
            there is identical.
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=\sin(x+\pi)" /> },
        { letter: 'B', content: <Katex tex="y=\sin\!\left(x-\tfrac{\pi}{2}\right)" /> },
        { letter: 'C', content: <Katex tex="y=\cos(x+\pi)" /> },
        { letter: 'D', content: <Katex tex="y=\cos(x)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="y=\cos\!\left(x-\tfrac{\pi}{2}\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
