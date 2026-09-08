// 2016 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 17% correct —
// the second-hardest MCQ in the 2014-2016 Methods Exam 2 papers.
// A linear transformation maps f onto g; relate a definite integral of g back to one of f.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow } from '../QuestionParts'

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="T\!\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}-1&0\\0&3\end{pmatrix}\!\begin{pmatrix}x\\y\end{pmatrix}+\begin{pmatrix}0\\5\end{pmatrix} = \begin{pmatrix}-x\\3y+5\end{pmatrix}" />,
    reason: 'Write out what the transformation actually does to a point (x, y).',
  },
  {
    working: <Katex display tex="\text{if } y=f(x): \quad x'=-x, \qquad y'=3y+5 = 3f(x)+5" />,
    reason: <>A point <Katex tex="(x,f(x))" /> on the graph of <Katex tex="f" /> maps to <Katex tex="(x',y')" /> on the graph of <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="x=-x' \;\implies\; g(x') = 3f(-x')+5, \quad \text{i.e.} \quad g(x)=3f(-x)+5" />,
    reason: <>Substitute <Katex tex="x=-x'" /> to write <Katex tex="g" /> as a function of <Katex tex="x'" />, then rename <Katex tex="x'\to x" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\int_{-3}^{0} g(x)\,dx = \int_{-3}^{0}\bigl[3f(-x)+5\bigr]dx = 3\int_{-3}^{0} f(-x)\,dx + 5(3)"
      />
    ),
    reason: <>Split the integral; the constant term integrates to <Katex tex="5\times(\text{width } 3)" />.</>,
  },
  {
    working: <Katex display tex="u=-x \;\implies\; \int_{-3}^{0} f(-x)\,dx = \int_{3}^{0} f(u)(-du) = \int_0^3 f(u)\,du = 5" />,
    reason: <>Substitute <Katex tex="u=-x" />; the limits flip and the two sign flips cancel. Uses the given value <Katex tex="\int_0^3 f(x)\,dx=5" />.</>,
  },
  {
    working: <Katex display tex="\int_{-3}^{0} g(x)\,dx = 3(5)+15 = 30" />,
  },
  {
    working: <Katex display tex="\boxed{\int_{-3}^{0} g(x)\,dx = 30}" />,
    reason: <>Matches option <b>E</b>. Geometrically: reflect <Katex tex="f" /> in the <Katex tex="y" />-axis (area unchanged, still 5), dilate by factor 3 from the <Katex tex="x" />-axis (area <Katex tex="\times 3 = 15" />), then translate up 5 (adds <Katex tex="5\times 3=15" /> more) — total <Katex tex="30" />.</>,
  },
]

export default function MethodsQ20_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the transformation <Katex tex="T" />, defined as</p>
          <Katex
            display
            tex="T : \mathbb{R}^2 \to \mathbb{R}^2, \quad T\!\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}-1&0\\0&3\end{pmatrix}\!\begin{pmatrix}x\\y\end{pmatrix}+\begin{pmatrix}0\\5\end{pmatrix}"
            className="my-2"
          />
          <p className="mt-2">
            The transformation <Katex tex="T" /> maps the graph of <Katex tex="y=f(x)" /> onto the graph of{' '}
            <Katex tex="y=g(x)" />.
          </p>
          <p className="mt-2">
            If <Katex tex="\displaystyle\int_0^3 f(x)\,dx = 5" />, then <Katex tex="\displaystyle\int_{-3}^0 g(x)\,dx" /> is equal to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '0' },
        { letter: 'B', content: '15' },
        { letter: 'C', content: '20' },
        { letter: 'D', content: '25' },
        { letter: 'E', content: '30', isAnswer: true },
      ]}
      rows={ROWS}
    />
  )
}
