// 2021 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 58% correct.
// The maximum of a function on a closed interval, which turns out to be at an endpoint. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 58, C: 9, D: 18, E: 4 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = (x-2)e^x \implies h'(x) = e^x+(x-2)e^x = (x-1)e^x" />,
    reason: <>Product rule, then factor out the exponential.</>,
  },
  {
    working: <Katex display tex="h'(x) = 0 \implies x = 1 \ \left(e^x>0 \text{ always}\right)" />,
    reason: <>The only stationary point, and it lies inside the interval.</>,
  },
  {
    working: <Katex display tex="h(1) = (-1)e = -e" />,
    reason: <><Katex tex="h'(x)" /> changes from negative to positive at <Katex tex="x=1" />, so this is a <em>minimum</em>, not the maximum. Option A takes it as the answer.</>,
  },
  {
    working: <Katex display tex="h(0) = -2, \quad h(2) = 0" />,
    reason: <>On a closed interval the maximum can sit at an endpoint, so both must be checked. <Katex tex="h(2)=0" /> because the factor <Katex tex="(x-2)" /> vanishes.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum} = 0}" />,
    reason: <>Comparing <Katex tex="-2" />, <Katex tex="-e\approx-2.72" /> and <Katex tex="0" />. Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ4_2021() {
  return (
    <MCQShell
      question={
        <p>
          The maximum value of the function <Katex tex="h:[0,2]\to R" />,{' '}
          <Katex tex="h(x)=(x-2)e^x" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-e" /> },
        { letter: 'B', content: <Katex tex="0" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="2" /> },
        { letter: 'E', content: <Katex tex="e" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
