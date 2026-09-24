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
    reason: <>An integral splits at any interior point — here 7, because that is the number the other integral uses.</>,
  },
  {
    working: <Katex display tex="C = \int_3^{7}f(x)\,dx+D" />,
    reason: <>Substituting the two given values.</>,
  },
  {
    working: <Katex display tex="\int_3^{7}f(x)\,dx = C-D" />,
    reason: <>This is option <b>C</b>, which 41% of students chose — but the question asks for the integral from 7 to 3.</>,
  },
  {
    working: <Katex display tex="\int_7^{3}f(x)\,dx = -\int_3^{7}f(x)\,dx" />,
    reason: <>Swapping the terminals changes the sign.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_7^{3}f(x)\,dx = D-C}" />,
    reason: <>Matches option <b>D</b>. Read the terminals last as well as first.</>,
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
