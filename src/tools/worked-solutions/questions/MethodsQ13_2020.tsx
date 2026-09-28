// 2020 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 26% correct.
// A dilation and a translation, written as a matrix transformation. Question text transcribed from the original paper; solution is original.
// Answer A checked by composing each option's map and substituting into y = cos(x): only A gives
// y = cos(2x + 4); B gives cos(2x + 8), C cos(2x + 2), D cos(x/2 − 2), E cos(x/2 − 1). Agrees with
// the VCAA report (which reads it as dilate by ½, then 2 left) and itute (translate 4 left, then
// dilate by ½). Interactive diagram (§15): interactives/meth-2020e2-mcq13-order.tsx plays each
// option's two steps in order on y = cos(x), following the peak (0, 1), so the student sees C stop
// one unit short and A (and the report's order) land on the target. This site's own explanatory
// figure; VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const OrderWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq13-order'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 20, C: 38, D: 11, E: 5 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      The graph of <Katex tex="y=\cos(x)" /> is mapped to the graph of{' '}
      <Katex tex="y=\cos(2x+4)=\cos\bigl(2(x+2)\bigr)" />.
      <br />
      There has been a dilation of a factor of <Katex tex="\tfrac12" /> from the{' '}
      <Katex tex="y" />-axis and then a translation of 2 units to the left.
      <br />
      <Katex tex="T\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}\frac12&0\\0&1\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-2\\0\end{bmatrix}=\begin{bmatrix}\frac12&0\\0&1\end{bmatrix}\left(\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-4\\0\end{bmatrix}\right)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y=\cos(2x+4) = \cos\bigl(2(x+2)\bigr)" />,
    reason: <>Factorise the coefficient of <Katex tex="x" /> out of the bracket first. Then each number has one job: the <Katex tex="2" /> multiplying the bracket squashes the graph, and the <Katex tex="+2" /> added to <Katex tex="x" /> shifts it. In <Katex tex="2x+4" /> the <Katex tex="4" /> is tangled up with the squash, so it is not the size of the shift.</>,
  },
  {
    working: <Katex display tex="\cos(x) \xrightarrow{\ x\,\to\,2x\ } \cos(2x) \xrightarrow{\ x\,\to\,x+2\ } \cos\bigl(2(x+2)\bigr)" />,
    reason: <>Build the new rule from <Katex tex="\cos(x)" /> one step at a time. Replacing <Katex tex="x" /> by <Katex tex="2x" /> halves every <Katex tex="x" />-coordinate: a dilation by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis. Then replacing <Katex tex="x" /> by <Katex tex="x+2" /> moves the graph 2 units left. The other order fails: <Katex tex="\cos(x+2)" /> first, then <Katex tex="x\to2x" />, gives <Katex tex="\cos(2x+2)" />, because the squash also halves the shift.</>,
  },
  {
    working: <Katex display tex="x' = \tfrac12x-2, \qquad y' = y" />,
    reason: <>The same two steps as a rule for where each point goes: halve the <Katex tex="x" />-coordinate, then subtract 2. (Directly: a point <Katex tex="(x,y)" /> on <Katex tex="y=\cos(x)" /> must land on <Katex tex="y'=\cos(2x'+4)" /> with <Katex tex="y'=y" />, so <Katex tex="2x'+4=x" />, giving <Katex tex="x'=\tfrac{x-4}{2}" />.)</>,
  },
  {
    working: <Katex display tex="\text{A}: \ \tfrac12(x-4) = \tfrac12x-2 \ \checkmark" />,
    reason: <>Now expand each option's <Katex tex="x" />-row. The order of operations is the order of the transformations: without the outer bracket, the matrix multiplies <Katex tex="(x,y)" /> first (dilate) and the vector is added afterwards (translate); with the bracket, the vector is added first (translate) and then everything, the shift included, is multiplied (dilate). So A translates 4 left first, and the dilation after it halves that shift to 2: the same map as "dilate by <Katex tex="\tfrac12" />, then 2 left", which is the report's reading.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{B}: \ \tfrac12x-4, \qquad \text{C}: \ \tfrac12(x-2)=\tfrac12x-1" />
        <Katex display tex="\text{D}: \ 2(x+2)=2x+4, \qquad \text{E}: \ 2x+2" />
      </>
    ),
    reason: <>Expand each of the others and compare with <Katex tex="\tfrac12x-2" />. B halves and then moves 4 left; C moves 2 left and then halves, so the shift shrinks to 1; D and E multiply by 2, which stretches the graph away from the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{A}}" />,
    reason: <>Matches option <b>A</b>. Check with a point: the peak <Katex tex="(0,1)" /> goes to <Katex tex="x'=-2" />, and <Katex tex="\cos\bigl(2(-2)+4\bigr)=\cos(0)=1" /> ✓. Option <b>C</b> (38%) gives <Katex tex="y=\cos(2x+2)" /> and option <b>B</b> (20%) gives <Katex tex="y=\cos(2x+8)" /> (see the common mistakes below). Options <b>D</b> and <b>E</b> dilate by a factor of <Katex tex="2" />, stretching instead of compressing.</>,
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
      extras={
        <>
          <Explore title="Order matters: follow the peak through each option's two steps — only A lands on y = cos(2x + 4)">
            <OrderWidget />
          </Explore>
          <WrongMethod
            title="cos(2(x + 2)) has a + 2 inside, so translate 2 left and dilate by ½"
            source="38% chose C"
            working={
              <>
                <Katex display tex="\cos(x) \xrightarrow{\text{2 left}} \cos(x+2) \xrightarrow{\ x\,\to\,2x\ } \cos(2x+2)" />
                <Katex display tex="\cos(2x+2) \ne \cos(2x+4) \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              Both steps are right; the order is wrong. The <Katex tex="+2" /> in{' '}
              <Katex tex="\cos\bigl(2(x+2)\bigr)" /> is the shift that happens <em>after</em> the dilation. Shift first, and the
              dilation that follows halves the shift as well, leaving the graph only 1 unit left. Check with the peak:{' '}
              <Katex tex="(0,1)\to(-2,1)\to(-1,1)" />, but <Katex tex="\cos\bigl(2(-1)+4\bigr)=\cos(2)\ne1" />.
            </p>
            <p>
              To translate first you would need 4 left, which is option A. When the options differ only in order, test one point
              through each.
            </p>
          </WrongMethod>
          <WrongMethod
            title="2x + 4 has a + 4, so it's a translation of 4 to the left"
            source="20% chose B"
            working={
              <>
                <Katex display tex="\cos(x) \xrightarrow{\ x\,\to\,2x\ } \cos(2x) \xrightarrow{\text{4 left}} \cos\bigl(2(x+4)\bigr)" />
                <Katex display tex="=\cos(2x+8) \quad \text{(option B)}" />
              </>
            }
          >
            <p>
              A shift can only be read off once <Katex tex="x" /> stands alone inside the bracket. Replacing <Katex tex="x" /> by{' '}
              <Katex tex="x+4" /> in <Katex tex="\cos(2x)" /> puts the <Katex tex="4" /> inside the <Katex tex="2(\ldots)" />, so it
              doubles to <Katex tex="8" />. Factorise first, <Katex tex="2x+4=2(x+2)" />: after dilating, the shift is 2, not 4.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
