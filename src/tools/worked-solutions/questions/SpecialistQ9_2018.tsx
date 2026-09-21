// 2018 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 69% correct.
// Separating a differential equation after applying a sum-to-product identity. Question text
// transcribed from the original paper; VCAA printed no diagram and neither does the stem
// here (guide §7). Identity confirmed in sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 8, C: 12, D: 69, E: 8 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(x+y) = \sin(x)\cos(y)+\cos(x)\sin(y)" />,
    reason: <>Compound angle expansion of the first term.</>,
  },
  {
    working: <Katex display tex="\sin(x-y) = \sin(x)\cos(y)-\cos(x)\sin(y)" />,
    reason: <>And of the second.</>,
  },
  {
    working: <Katex display tex="\sin(x+y)-\sin(x-y) = 2\cos(x)\sin(y)" />,
    reason: <>The <Katex tex="\sin(x)\cos(y)" /> terms cancel and the other two add. This is the whole trick: the denominator was written in a form that <em>looks</em> inseparable but factorises into a function of <Katex tex="x" /> times a function of <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{2}{2\cos(x)\sin(y)} = \frac{1}{\cos(x)\sin(y)}" />,
    reason: <>The <Katex tex="2" />s cancel.</>,
  },
  {
    working: <Katex display tex="\sin(y)\,dy = \frac{1}{\cos(x)}\,dx = \sec(x)\,dx" />,
    reason: <>Now separable: all the <Katex tex="y" />s on the left, all the <Katex tex="x" />s on the right.</>,
  },
  {
    working: <Katex display tex="\boxed{\int\sec(x)\,dx = \int\sin(y)\,dy}" />,
    reason: <>Matches option <b>D</b>. Option <b>E</b> has <Katex tex="\operatorname{cosec}(y)" /> where <Katex tex="\sin(y)" /> belongs — that is what comes of putting <Katex tex="\sin(y)" /> in the denominator on the wrong side. Option <b>C</b> has both functions inverted.</>,
  },
]

export default function SpecialistQ9_2018() {
  return (
    <MCQShell
      question={
        <p>
          A solution to the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx}=\dfrac{2}{\sin(x+y)-\sin(x-y)}" /> can be obtained from
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int 1\,dx = \int 2\sin(y)\,dy" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int \cos(y)\,dy = \int \operatorname{cosec}(x)\,dx" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int \cos(x)\,dx = \int \operatorname{cosec}(y)\,dy" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int \sec(x)\,dx = \int \sin(y)\,dy" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\displaystyle\int \sec(x)\,dx = \int \operatorname{cosec}(y)\,dy" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Make it separable first">
          <p>
            As written, <Katex tex="\sin(x+y)" /> mixes the two variables and nothing can be
            separated. The compound angle expansions turn that mixture into a clean product{' '}
            <Katex tex="2\cos(x)\sin(y)" />, and from there the equation splits in one line.
          </p>
          <p>
            Worth remembering as a pattern:{' '}
            <Katex tex="\sin(A+B)-\sin(A-B)=2\cos(A)\sin(B)" />. The difference of two
            compound sines always collapses like this, because the terms symmetric in{' '}
            <Katex tex="B" /> cancel.
          </p>
        </Background>
      }
    />
  )
}
