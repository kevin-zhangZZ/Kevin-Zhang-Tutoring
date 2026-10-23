// 2025 Mathematical Methods NHT — Exam 2, MCQ 9. The NHT report gives the answer key only, with
// no statistics. Functions: where a turning point goes under y = g(−2x), and why a reflection in
// the y-axis keeps a minimum a minimum. Question text transcribed from the original paper (the
// 2025 NHT paper is image-only, so read from the rendered page). Solution is original; the answer
// A agrees with the report's key. Distractors checked: B multiplies the x-coordinate by −2; C does
// that and also turns the minimum into a maximum; D applies −2 to the y-coordinate.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-2x=2\ \Rightarrow\ x=-1" />,
    reason: <><Katex tex="y=g(-2x)" /> takes the value <Katex tex="g(2)=1" /> where its input <Katex tex="-2x" /> equals 2, so the turning point moves to <Katex tex="x=-1" />.</>,
    more: <>In mapping language: a dilation by factor <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis and a reflection in the <Katex tex="y" />-axis, <Katex tex="(x,y)\to\left(-\tfrac{x}{2},\,y\right)" />. Changes inside the brackets act on <Katex tex="x" /> the &ldquo;opposite&rdquo; way: multiplying <Katex tex="x" /> by <Katex tex="-2" /> inside divides the <Katex tex="x" />-coordinates by <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="(2,1)\to(-1,1)" />,
    reason: <>The <Katex tex="y" />-values are untouched: only the input was changed.</>,
  },
  {
    working: <Katex display tex="\text{local minimum stays a local minimum}" />,
    reason: <>The heights of the graph don&apos;t change — the picture is only squashed sideways and flipped left-to-right. A point lower than its neighbours is still lower than its neighbours.</>,
    more: <>Only a reflection in the <Katex tex="x" />-axis (a minus sign <b>outside</b>, <Katex tex="-g(x)" />) would turn a minimum into a maximum.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{local minimum at } (-1,\,1)}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>B</b> multiplies the <Katex tex="x" />-coordinate by <Katex tex="-2" /> instead of dividing. Option <b>C</b> does the same and also treats the reflection as turning the minimum upside down. Option <b>D</b> applies the <Katex tex="-2" /> to the <Katex tex="y" />-coordinate instead of the <Katex tex="x" />-coordinate.</>,
  },
]

export default function MethodsQ9_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Given that the graph of <Katex tex="y=g(x)" /> has a local minimum at{' '}
          <Katex tex="(2,\,1)" />, the graph of <Katex tex="y=g(-2x)" /> must have
        </p>
      }
      options={[
        { letter: 'A', content: <>a local minimum at <Katex tex="(-1,\,1)" />.</>, isAnswer: true },
        { letter: 'B', content: <>a local minimum at <Katex tex="(-4,\,1)" />.</> },
        { letter: 'C', content: <>a local maximum at <Katex tex="(-4,\,1)" />.</> },
        { letter: 'D', content: <>a local maximum at <Katex tex="(2,\,-2)" />.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
