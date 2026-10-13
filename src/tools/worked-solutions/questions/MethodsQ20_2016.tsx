// 2016 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 17% correct —
// the hardest question on the paper, and the most popular answer (C, 30%) was wrong.
// A transformation written as a matrix, applied to a definite integral. Matrices are off
// the current study design but the mathematics is a reflection, a dilation and a
// translation; the skip guide already lists this question as doable. Question text
// transcribed from the original paper; answer verified by hand. Solution is original.
// Interactive (17% correct, so it qualifies): meth-2016-mcq20-area-steps steps through reflect →
// dilate → translate on a sample f, showing the 5-by-3 rectangle the translation adds (the slip
// behind C). Row 5 uses the mirror-image argument rather than a u-substitution (not in Methods).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AreaSteps = lazyWidget(() => import('../interactives/meth-2016-mcq20-area-steps'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 23, C: 30, D: 18, E: 17 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      Reflect the graph of <Katex tex="f" /> in the <Katex tex="y" />-axis.
      <br />
      <Katex tex="\displaystyle\int_0^3 f(x)\,dx=\int_{-3}^{0}f(-x)\,dx=5" />
      <br />
      Then dilate the graph by a factor of 3 from the <Katex tex="x" />-axis.
      <br />
      <Katex tex="\displaystyle 3\int_{-3}^{0}f(-x)\,dx=15" />
      <br />
      Then translate the graph 5 units up.
      <br />
      <Katex tex="\displaystyle 3\int_{-3}^{0}\bigl(f(-x)\bigr)dx+3\times5=30" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x' = -x, \qquad y' = 3y+5" />,
    reason: <>Top row times <Katex tex="(x,y)" />: <Katex tex="x'=-1\cdot x+0\cdot y" />. Bottom row: <Katex tex="y'=0\cdot x+3\cdot y" />, plus the vector's <Katex tex="5" />. So reflect in the <Katex tex="y" />-axis, dilate by <Katex tex="3" /> from the <Katex tex="x" />-axis, then go up <Katex tex="5" />.</>,
    more: <>The <Katex tex="+5" /> is added after the tripling, so the order is dilate, then translate: the shift is <Katex tex="5" />, not <Katex tex="3\times5" />.</>,
  },
  {
    working: <Katex display tex="x = -x', \qquad y = \frac{y'-5}{3}" />,
    reason: <>Make the old <Katex tex="x" /> and <Katex tex="y" /> the subjects, so they can be substituted into <Katex tex="y=f(x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{y'-5}{3} = f(-x') \implies g(x) = 3f(-x)+5" />,
    reason: <>Substitute into <Katex tex="y=f(x)" />, make <Katex tex="y'" /> the subject, then drop the dashes.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\int_{-3}^{0}g(x)\,dx &= \int_{-3}^{0}\bigl(3f(-x)+5\bigr)dx\\ &= 3\int_{-3}^{0}f(-x)\,dx+\int_{-3}^{0}5\,dx\end{aligned}"
      />
    ),
    reason: <>Integrate the new rule over the interval asked, then split the integral into its two terms, taking the constant <Katex tex="3" /> outside.</>,
    more: <>The interval <Katex tex="[-3,0]" /> is no coincidence: it is <Katex tex="[0,3]" /> reflected in the <Katex tex="y" />-axis, so it is exactly where the transformed region sits.</>,
  },
  {
    working: <Katex display tex="\int_{-3}^{0}f(-x)\,dx = \int_{0}^{3}f(x)\,dx = 5" />,
    reason: <><Katex tex="y=f(-x)" /> is the mirror image of <Katex tex="y=f(x)" /> in the <Katex tex="y" />-axis, so every strip over <Katex tex="[0,3]" /> reappears over <Katex tex="[-3,0]" /> with the same height: the integral is unchanged.</>,
    more: <>A reflection in the <Katex tex="y" />-axis only moves strips sideways, so positive parts stay positive and negative parts stay negative. Only a reflection in the <Katex tex="x" />-axis would change the sign of the integral.</>,
  },
  {
    working: <Katex display tex="\int_{-3}^{0}5\,dx = 5\times3 = 15" />,
    reason: <>The translation adds a rectangle under the raised graph: height <Katex tex="5" />, width <Katex tex="3" />.</>,
    more: <>This is the step most students got wrong. Moving the graph up <Katex tex="5" /> raises every point by <Katex tex="5" />, across the whole width <Katex tex="0-(-3)=3" />, so the extra area is <Katex tex="5\times3=15" />, not <Katex tex="5" />. Adding just <Katex tex="5" /> was the most popular slip (option C below).</>,
  },
  {
    working: <Katex display tex="\boxed{3(5)+15 = 30}" />,
    reason: <>Matches option <b>E</b>: reflection keeps <Katex tex="5" />, the dilation makes it <Katex tex="15" />, the translation adds <Katex tex="15" />.</>,
    more: (
      <>
        <b>A</b> (<Katex tex="0" />) plausibly treats the reflection as negating the integral:{' '}
        <Katex tex="-15+15" />. <b>B</b> (<Katex tex="15" />) stops after the dilation and forgets the translation.{' '}
        <b>C</b> (<Katex tex="20" />), the most popular answer, adds <Katex tex="5" /> for the translation instead of{' '}
        <Katex tex="5\times3" />. <b>D</b> (<Katex tex="25" />) has no single obvious source; it may mix these
        slips. Only <b>E</b> applies all three effects correctly.
      </>
    ),
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
              tex="\begin{aligned}&T:R^2\to R^2,\\ &T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}-1&0\\0&3\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}0\\5\end{bmatrix}\end{aligned}"
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
            <Katex tex="(\text{shift})\times(\text{width})" />, not just the shift.
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
      extras={
        <Explore title="Reflect keeps the area, dilate triples it, translate adds a 5-by-3 rectangle">
          <AreaSteps />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
