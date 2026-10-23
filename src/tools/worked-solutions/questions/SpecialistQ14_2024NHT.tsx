// 2024 Specialist NHT — Exam 2, MCQ 14. The NHT report gives the answer key only, with no
// statistics. Vectors: the scalar product of two head-to-tail sides of an equilateral triangle,
// where the angle between the vectors is 120°, not 60°. Question text transcribed from the
// original paper; the triangle is cropped from the original VCAA exam PDF. Solution is original;
// the answer B agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import triangleSrc from './spec-2024nht-mcq14-triangle.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={triangleSrc}
      alt="An equilateral triangle: vector a runs from the bottom-left corner up to the top vertex, vector b runs from the top vertex down to the bottom-right corner, and vector c runs along the base from bottom-left to bottom-right. From the original 2024 NHT VCAA exam paper"
      className="w-full max-w-[300px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|\underset{\sim}{a}|=|\underset{\sim}{b}|=|\underset{\sim}{c}|" />,
    reason: <>The triangle is equilateral, so all three sides have the same length.</>,
  },
  {
    working: <Katex display tex="\theta=180^\circ-60^\circ=120^\circ" />,
    reason: <>The angle in a scalar product is measured between the vectors placed <b>tail to tail</b>. Here <Katex tex="\underset{\sim}{a}" /> ends where <Katex tex="\underset{\sim}{b}" /> starts (head to tail), so the angle between them is the exterior angle at the top vertex, not the interior <Katex tex="60^\circ" />.</>,
    more: <>Slide <Katex tex="\underset{\sim}{b}" /> back so it starts at the bottom-left corner too: <Katex tex="\underset{\sim}{a}" /> points up-right at <Katex tex="60^\circ" /> above the base and <Katex tex="\underset{\sim}{b}" /> points down-right at <Katex tex="60^\circ" /> below it, so they are <Katex tex="120^\circ" /> apart.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos 120^\circ=|\underset{\sim}{a}|^2\left(-\tfrac12\right)" />,
    reason: <>Use <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" /> with <Katex tex="|\underset{\sim}{b}|=|\underset{\sim}{a}|" />.</>,
    more: <>Check with the vectors themselves: <Katex tex="\underset{\sim}{a}+\underset{\sim}{b}=\underset{\sim}{c}" />, so <Katex tex="|\underset{\sim}{c}|^2=|\underset{\sim}{a}|^2+2\,\underset{\sim}{a}\cdot\underset{\sim}{b}+|\underset{\sim}{b}|^2" />. With all lengths equal this gives <Katex tex="|\underset{\sim}{a}|^2=2|\underset{\sim}{a}|^2+2\,\underset{\sim}{a}\cdot\underset{\sim}{b}" />, so <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=-\tfrac12|\underset{\sim}{a}|^2" />. A negative answer makes sense: <Katex tex="\underset{\sim}{a}" /> goes up and <Katex tex="\underset{\sim}{b}" /> comes down, so they point in partly opposite directions.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{a}\cdot\underset{\sim}{b}=-\frac12|\underset{\sim}{a}|^2}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>A</b> uses the interior angle <Katex tex="60^\circ" />, which would be right only if the two vectors started at the same point. Option <b>D</b> uses <Katex tex="\sin 60^\circ" /> in place of the cosine.</>,
  },
]

export default function SpecialistQ14_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          An equilateral triangle is spanned by the vectors <Katex tex="\underset{\sim}{a}" />, <Katex tex="\underset{\sim}{b}" /> and{' '}
          <Katex tex="\underset{\sim}{c}" />, as shown below.
          <br />
          The scalar product <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}" /> is equivalent to
        </p>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{1}{2}|\underset{\sim}{a}|^2" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{1}{2}|\underset{\sim}{a}|^2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="|\underset{\sim}{a}|^2" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\sqrt3}{2}|\underset{\sim}{a}|^2" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{\sqrt3}{2}|\underset{\sim}{a}|^2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
