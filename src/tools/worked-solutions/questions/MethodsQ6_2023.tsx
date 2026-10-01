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
    reason: <>An integral over an interval can be split at any point inside it: the integral from <Katex tex="3" /> to <Katex tex="10" /> is the integral from <Katex tex="3" /> to <Katex tex="7" /> plus the integral from <Katex tex="7" /> to <Katex tex="10" />. Split at <Katex tex="7" /> because that is where <Katex tex="D" /> starts, and the leftover piece uses the same numbers as the integral asked for.</>,
  },
  {
    working: <Katex display tex="C = \int_3^{7}f(x)\,dx+D" />,
    reason: <>Substituting the two given values.</>,
  },
  {
    working: <Katex display tex="\int_3^{7}f(x)\,dx = C-D" />,
    reason: <>This is option <b>C</b>, which 41% of students chose. But the question asks for the integral from <Katex tex="7" /> to <Katex tex="3" />, with the terminals the other way round.</>,
  },
  {
    working: <Katex display tex="\int_7^{3}f(x)\,dx = -\int_3^{7}f(x)\,dx" />,
    reason: <>Swapping the terminals changes the sign. With an antiderivative <Katex tex="F" />, <Katex tex="\int_7^3 f(x)\,dx=F(3)-F(7)" />, which is the negative of <Katex tex="F(7)-F(3)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_7^{3}f(x)\,dx = D-C}" />,
    reason: <>Matches option <b>D</b>. A quick check with <Katex tex="f(x)=1" />: <Katex tex="C=10-3=7" /> and <Katex tex="D=10-7=3" />, while <Katex tex="\int_7^3 1\,dx=3-7=-4" />, which is <Katex tex="D-C" />, not <Katex tex="C-D" />.</>,
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
