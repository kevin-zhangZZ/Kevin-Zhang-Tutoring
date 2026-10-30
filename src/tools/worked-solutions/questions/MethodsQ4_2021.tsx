// 2021 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 58% correct.
// The maximum of a function on a closed interval, which turns out to be at an endpoint. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 58, C: 9, D: 18, E: 4 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} h'(x) &= e^x+(x-2)e^x \\ &= (x-1)e^x \end{aligned}" />,
    reason: <>Product rule with <Katex tex="u=x-2" /> and <Katex tex="v=e^x" />, then take out the common factor <Katex tex="e^x" />.</>,
  },
  {
    working: <Katex display tex="h'(x) = 0 \implies x = 1 \ \left(e^x>0 \text{ always}\right)" />,
    reason: <><Katex tex="e^x" /> is never zero, so only the factor <Katex tex="x-1" /> can be. This is the only stationary point, and it lies inside <Katex tex="[0,2]" />.</>,
  },
  {
    working: <Katex display tex="h(1) = (1-2)e^1 = -e" />,
    reason: <>Since <Katex tex="e^x>0" />, <Katex tex="h'(x)" /> has the sign of <Katex tex="x-1" />: negative then positive, so <Katex tex="x=1" /> is a <em>minimum</em>, not the maximum.</>,
    more: <>To check the signs with numbers, test one point either side: <Katex tex="h'(0)=(0-1)e^0=-1<0" /> and <Katex tex="h'(2)=(2-1)e^2=e^2>0" />. So <Katex tex="h" /> decreases and then increases, and <Katex tex="x=1" /> is the bottom of the graph.</>,
  },
  {
    working: <Katex display tex="h(0) = (0-2)e^0 = -2, \quad h(2) = (2-2)e^2 = 0" />,
    reason: <>On a closed interval the maximum can be at an endpoint. The only stationary point is a minimum, so the maximum <em>must</em> be at an endpoint: evaluate both.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum} = 0}" />,
    reason: (
      <>
        Matches option <b>B</b>: the largest of <Katex tex="h(0)=-2" />,{' '}
        <Katex tex="h(1)=-e\approx-2.72" /> and <Katex tex="h(2)=0" />, reached at <Katex tex="x=2" />.
      </>
    ),
    more: (
      <>
        Option D, 2, is the <Katex tex="x" />-value where the maximum occurs, not the maximum value. On CAS,{' '}
        <Cas fn="fMax">fMax((x − 2)e^x, x) | 0 ≤ x ≤ 2</Cas> returns <Katex tex="x=2" />, which must then be
        substituted back into <Katex tex="h" />. Option A, <Katex tex="-e" />, is the value at the stationary
        point, which is the minimum. Option C, 1, is the <Katex tex="x" />-value of the stationary point, and
        option E, <Katex tex="e" />, is the minimum value with its sign dropped.
      </>
    ),
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
