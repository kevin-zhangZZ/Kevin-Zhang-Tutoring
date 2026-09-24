// 2019 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 57% correct. A point
// is put through a transformation written in matrix form; given its image is the origin,
// find the point. Question text transcribed from the original paper. VCAA printed no
// diagram, so the question stem here has none either (guide §7); the figure is this site's
// own explanatory sketch (matplotlib) and sits inside the worked solution.
//
// This question was left out when the rest of the 2019 Exam 2 MCQs were written, on the
// grounds that matrices are off the current study design. That was the wrong test: the
// matrix here is diagonal, so the statement is two independent one-line equations and the
// solution needs no matrix algebra whatsoever. The guide's rule (§13.7) is the question's
// mathematics, not its vocabulary. The skip guide carries the same reading.
//
// Answer verified independently with sympy: a = 1, b = -1. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2019-mcq9-transform.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 19, C: 8, D: 6, E: 57 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{bmatrix}\tfrac12 & 0\\[2pt] 0 & -2\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix} = \begin{bmatrix}\tfrac12 x\\[2pt] -2y\end{bmatrix}" />,
    reason: <>Multiply out the matrix product row by row. Because the matrix is <em>diagonal</em> — zeros off the main diagonal — the <Katex tex="x" /> and <Katex tex="y" /> never mix: each new coordinate depends only on the old one of the same name.</>,
  },
  {
    working: <Katex display tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}\tfrac12 x - \tfrac12\\[2pt] -2y-2\end{bmatrix} \implies \begin{cases} x' = \tfrac12 x - \tfrac12 \\[2pt] y' = -2y-2 \end{cases}" />,
    reason: <>Adding the translation column. The whole question is now two ordinary equations, and no further matrix work is needed.</>,
  },
  {
    working: <Katex display tex="T\!\left(\begin{bmatrix}a\\b\end{bmatrix}\right) = \begin{bmatrix}0\\0\end{bmatrix}" />,
    reason: <>The question gives you the <em>output</em> and asks for the input, so substitute <Katex tex="x'=0" /> and <Katex tex="y'=0" /> and solve backwards. The origin is the <em>image</em>, not the point being transformed.</>,
  },
  {
    working: <Katex display tex="\tfrac12 a - \tfrac12 = 0 \implies a = 1" />,
    reason: <>The <Katex tex="x" /> equation on its own.</>,
  },
  {
    working: <Katex display tex="-2b - 2 = 0 \implies b = -1" />,
    reason: <>The <Katex tex="y" /> equation on its own.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={graphSrc} alt="The point (1, −1) mapped by T to the origin: a dashed arrow runs from (1, −1) up and left to (0, 0)" className="w-full max-w-[300px]" />
      </div>
    ),
    reason: <>What the transformation is doing: the point sits in the fourth quadrant and <Katex tex="T" /> carries it to the origin. Halving the <Katex tex="x" /> then shifting left by <Katex tex="\tfrac12" /> takes <Katex tex="1" /> to <Katex tex="0" />; doubling-and-flipping the <Katex tex="y" /> then shifting down by <Katex tex="2" /> takes <Katex tex="-1" /> to <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(a,b) = (1,-1)}" />,
    reason: <>Matches option <b>E</b>. Check it forwards: <Katex tex="\tfrac12(1)-\tfrac12 = 0" /> ✓ and <Katex tex="-2(-1)-2 = 0" /> ✓. Option <b>B</b> <Katex tex="(-1,1)" />, the most popular wrong answer at <Katex tex="19\%" />, is this answer with both signs flipped — what you get if the translation column is added with the wrong signs (solving <Katex tex="\tfrac12a+\tfrac12=0" /> and <Katex tex="-2b+2=0" />).</>,
  },
]

export default function MethodsQ9_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The point <Katex tex="(a,b)" /> is transformed by</p>
          <p className="mb-2 text-center">
            <Katex display tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}\tfrac12 & 0\\[2pt] 0 & -2\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix} + \begin{bmatrix}-\tfrac12\\[2pt] -2\end{bmatrix}" />
          </p>
          <p>
            If the image of <Katex tex="(a,b)" /> is <Katex tex="(0,0)" />, then <Katex tex="(a,b)" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="(1,1)" /> },
        { letter: 'B', content: <Katex tex="(-1,1)" /> },
        { letter: 'C', content: <Katex tex="(-1,0)" /> },
        { letter: 'D', content: <Katex tex="(0,1)" /> },
        { letter: 'E', content: <Katex tex="(1,-1)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Reading a matrix transformation without matrices">
          <p>
            A transformation written as a matrix times{' '}
            <Katex tex="\begin{bmatrix}x\\y\end{bmatrix}" /> plus a column is just a compact
            way of writing two equations at once. Multiply the matrix out and you get one
            equation for the new <Katex tex="x" /> and one for the new <Katex tex="y" />;
            from there it is ordinary algebra.
          </p>
          <p>
            When the matrix is diagonal, as it is here, each equation involves only its own
            variable and the two never interact. In transformation language this one is:
            dilate by factor <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis, dilate
            by factor <Katex tex="2" /> from the <Katex tex="x" />-axis and reflect in the{' '}
            <Katex tex="x" />-axis, then translate <Katex tex="\tfrac12" /> left and{' '}
            <Katex tex="2" /> down. You do not need that description to answer the question,
            but it is what the matrix is saying.
          </p>
        </Background>
      }
    />
  )
}
