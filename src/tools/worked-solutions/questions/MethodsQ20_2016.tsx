// 2016 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 17% correct —
// the hardest question on the paper, and the most popular answer (C, 30%) was wrong.
// A transformation written as a matrix, applied to a definite integral. Matrices are off
// the current study design but the mathematics is a reflection, a dilation and a
// translation; the skip guide already lists this question as doable. Question text
// transcribed from the original paper; answer verified by hand. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 23, C: 30, D: 18, E: 17 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      Reflect the graph of <Katex tex="f" /> in the <Katex tex="y" />-axis:{' '}
      <Katex tex="\int_0^3 f(x)\,dx=\int_{-3}^{0}f(-x)\,dx=5" />. Then dilate by a factor of{' '}
      <Katex tex="3" /> from the <Katex tex="x" />-axis:{' '}
      <Katex tex="3\int_{-3}^{0}f(-x)\,dx=15" />. Then translate <Katex tex="5" /> units up:{' '}
      <Katex tex="3\int_{-3}^{0}f(-x)\,dx+3\times5=30" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x' = -x, \qquad y' = 3y+5" />,
    reason: <>Reading the transformation row by row: the matrix flips <Katex tex="x" /> and triples <Katex tex="y" />, then the vector lifts everything <Katex tex="5" /> units.</>,
  },
  {
    working: <Katex display tex="x = -x', \qquad y = \frac{y'-5}{3}" />,
    reason: <>Invert, so the old variables are in terms of the new ones.</>,
  },
  {
    working: <Katex display tex="\frac{y'-5}{3} = f(-x') \implies g(x) = 3f(-x)+5" />,
    reason: <>Substituting into <Katex tex="y=f(x)" /> and renaming. This explicit rule is what makes the rest routine.</>,
  },
  {
    working: <Katex display tex="\int_{-3}^{0}g(x)\,dx = \int_{-3}^{0}\bigl(3f(-x)+5\bigr)dx" />,
    reason: <>The new interval <Katex tex="[-3,0]" /> is the old <Katex tex="[0,3]" /> reflected, which is no coincidence.</>,
  },
  {
    working: <Katex display tex="\int_{-3}^{0}f(-x)\,dx = \int_{0}^{3}f(u)\,du = 5" />,
    reason: <>Substituting <Katex tex="u=-x" />: the reflection maps the region exactly onto the original, so the area is unchanged.</>,
  },
  {
    working: <Katex display tex="\int_{-3}^{0}5\,dx = 5\times3 = 15" />,
    reason: <>The translation adds a rectangle of height <Katex tex="5" /> and width <Katex tex="3" />. Forgetting this term gives <Katex tex="15" />, option B.</>,
  },
  {
    working: <Katex display tex="\boxed{3(5)+15 = 30}" />,
    reason: <>Option E. Three effects, in order: reflection changes nothing, the dilation multiplies by <Katex tex="3" />, the translation adds <Katex tex="15" />. Stopping after the dilation lands on option B; treating the translation as adding <Katex tex="5" /> rather than <Katex tex="5\times3" /> lands on option C, the most popular wrong answer.</>,
  },
]

export default function MethodsQ20_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the transformation <Katex tex="T" />, defined as</p>
          <div className="mb-2">
            <Katex
              display
              tex="T:R^2\to R^2,\quad T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}-1&0\\0&3\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}0\\5\end{bmatrix}"
            />
          </div>
          <p className="mb-2">
            The transformation <Katex tex="T" /> maps the graph of <Katex tex="y=f(x)" />{' '}
            onto the graph of <Katex tex="y=g(x)" />.
          </p>
          <p>
            If <Katex tex="\displaystyle\int_0^3 f(x)\,dx=5" />, then{' '}
            <Katex tex="\displaystyle\int_{-3}^{0}g(x)\,dx" /> is equal to
          </p>
        </>
      }
      background={
        <>
          <p>
            <strong>On the matrix notation.</strong> Transformation matrices were dropped
            from Mathematical Methods, so no current paper will ask you to read one.
            Everything else here — how a reflection, a dilation and a translation each
            change a definite integral — is core material, which is why the skip guide lists
            this question as doable.
          </p>
          <p>
            The matrix and vector say only this: reflect in the <Katex tex="y" />-axis,
            dilate by factor <Katex tex="3" /> from the <Katex tex="x" />-axis, then
            translate <Katex tex="5" /> units up.
          </p>
          <p>
            Each does something different to an area. Reflection leaves it alone. A vertical
            dilation multiplies it by the factor. A vertical translation adds{' '}
            <Katex tex="(\text{shift})\times(\text{width})" /> — and it is that width that
            most of the state forgot.
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="15" /> },
        { letter: 'C', content: <Katex tex="20" /> },
        { letter: 'D', content: <Katex tex="25" /> },
        { letter: 'E', content: <Katex tex="30" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
