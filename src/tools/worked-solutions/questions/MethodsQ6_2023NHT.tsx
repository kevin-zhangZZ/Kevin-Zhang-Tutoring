// 2023 Mathematical Methods NHT — Exam 2, MCQ 6. The NHT report gives the answer key only, with
// no statistics. Functions: the range of a tangent function on a restricted domain. Question text
// transcribed from the original paper. Solution is original; the answer E agrees with the report's
// key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="0\leq x\leq\tfrac12\implies 0\leq\frac{\pi x}{2}\leq\frac{\pi}{4}" />,
    reason: <>Find what the angle inside the tangent does over the domain: multiply each part of the inequality by <Katex tex="\tfrac{\pi}{2}" />.</>,
    more: <>The interval <Katex tex="\left[0,\tfrac{\pi}{4}\right]" /> sits well inside <Katex tex="\left(-\tfrac{\pi}{2},\tfrac{\pi}{2}\right)" />, so there is no asymptote in the way and the tangent is continuous and increasing over the whole domain.</>,
  },
  {
    working: <Katex display tex="\tan(0)=0,\quad \tan\!\left(\tfrac{\pi}{4}\right)=1" />,
    reason: <>Tangent is strictly increasing on this interval, so its smallest and largest values come from the endpoints.</>,
  },
  {
    working: <Katex display tex="f(0)=2(0)=0,\quad f\!\left(\tfrac12\right)=2(1)=2" />,
    reason: <>Multiply by the coefficient 2. Both endpoints of the domain are included (square brackets), so both ends of the range are too.</>,
  },
  {
    working: <Katex display tex="\boxed{[0,2]}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option <b>C</b>, <Katex tex="[0,1]" />, is the range of <Katex tex="\tan\!\left(\tfrac{\pi x}{2}\right)" /> before the dilation by 2. Option <b>B</b>, <Katex tex="(0,2)" />, leaves out the endpoints even though <Katex tex="x=0" /> and <Katex tex="x=\tfrac12" /> are in the domain. Option <b>A</b>, <Katex tex="R" />, is the range of tangent over a whole branch, ignoring the restricted domain.</>,
  },
]

export default function MethodsQ6_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The range of the function <Katex tex="f:\left[0,\dfrac{1}{2}\right]\to R,\ f(x)=2\tan\left(\dfrac{\pi x}{2}\right)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="R" /> },
        { letter: 'B', content: <Katex tex="(0,2)" /> },
        { letter: 'C', content: <Katex tex="[0,1]" /> },
        { letter: 'D', content: <Katex tex="[-2,2]" /> },
        { letter: 'E', content: <Katex tex="[0,2]" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
