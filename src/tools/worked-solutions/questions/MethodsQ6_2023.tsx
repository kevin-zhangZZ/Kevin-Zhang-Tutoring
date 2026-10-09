// 2023 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 49% correct.
// Splitting an integral at an interior point, then reversing the terminals. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 4, C: 41, D: 49, E: 2 },
  answer: 'D',
  comment: (
    <>
      <Katex tex="\int_3^{10}f(x)\,dx=C" /> and <Katex tex="\int_7^{10}f(x)\,dx=D" />
      <br />
      <Katex tex="\int_3^{10}f(x)\,dx=\int_3^{7}f(x)\,dx+\int_7^{10}f(x)\,dx" />
      <br />
      <Katex tex="C=\int_3^{7}f(x)\,dx+D" />
      <br />
      <Katex tex="C-D=\int_3^{7}f(x)\,dx" />
      <br />
      <Katex tex="\int_7^{3}f(x)\,dx=D-C" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_3^{10}f(x)\,dx = \int_3^{7}f(x)\,dx+\int_7^{10}f(x)\,dx" />,
    reason: <>An integral can be split at any point inside its interval. Split at <Katex tex="7" />, where <Katex tex="D" /> starts, so the leftover piece runs between <Katex tex="3" /> and <Katex tex="7" />, the same two endpoints as the integral asked for.</>,
    more: <>If <Katex tex="f" /> is positive, think of it as area: the area under the curve from <Katex tex="3" /> to <Katex tex="10" /> is the area from <Katex tex="3" /> to <Katex tex="7" /> plus the area from <Katex tex="7" /> to <Katex tex="10" />. The same rule holds for any <Katex tex="f" />, since both sides equal <Katex tex="F(10)-F(3)" /> for an antiderivative <Katex tex="F" />.</>,
  },
  {
    working: <Katex display tex="C = \int_3^{7}f(x)\,dx+D" />,
    reason: <>Substituting the two given values.</>,
  },
  {
    working: <Katex display tex="\int_3^{7}f(x)\,dx = C-D" />,
    reason: <>Rearrange. This is the integral from <Katex tex="3" /> to <Katex tex="7" />, but the question asks for the integral from <Katex tex="7" /> to <Katex tex="3" />, with the terminals the other way round.</>,
  },
  {
    working: <Katex display tex="\int_7^{3}f(x)\,dx = -\int_3^{7}f(x)\,dx" />,
    reason: <>Swapping the terminals changes the sign. With an antiderivative <Katex tex="F" />, <Katex tex="\int_7^3 f(x)\,dx=F(3)-F(7)" />, which is the negative of <Katex tex="F(7)-F(3)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_7^{3}f(x)\,dx = D-C}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Stopping one line early, at <Katex tex="\int_3^7 f(x)\,dx=C-D" />, gives option <b>C</b>, which 41% of students chose: it misses the sign change from reversing the terminals. A quick check with <Katex tex="f(x)=1" />: <Katex tex="C=10-3=7" /> and <Katex tex="D=10-7=3" />, while <Katex tex="\int_7^3 1\,dx=3-7=-4" />, which is <Katex tex="D-C" />, not <Katex tex="C-D" />.</>,
  },
]

export default function MethodsQ6_2023() {
  return (
    <MCQShell
      question={
        <p>
          Suppose that <Katex tex="\displaystyle\int_3^{10}f(x)\,dx=C" /> and{' '}
          <Katex tex="\displaystyle\int_7^{10}f(x)\,dx=D" />. The value of{' '}
          <Katex tex="\displaystyle\int_7^{3}f(x)\,dx" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="C+D" /> },
        { letter: 'B', content: <Katex tex="C+D-3" /> },
        { letter: 'C', content: <Katex tex="C-D" /> },
        { letter: 'D', content: <Katex tex="D-C" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="CD-3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
