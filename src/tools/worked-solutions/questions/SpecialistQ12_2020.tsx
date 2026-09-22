// 2020 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 59% correct.
// Three steps of Euler's method, kept unevaluated. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 12, C: 59, D: 17, E: 9 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y_{n+1} = y_n+h\,f(x_n), \quad h = 0.1, \ f(x) = e^{\cos(x)}" />,
    reason: <>Euler uses the gradient at the <em>start</em> of each step, so the last <Katex tex="x" /> value that appears is <Katex tex="x_2" />, not <Katex tex="x_3" />.</>,
  },
  {
    working: <Katex display tex="y_1 = e+0.1\,e^{\cos(0)} = e+0.1e" />,
    reason: <><Katex tex="\cos(0)=1" />, so <Katex tex="e^{\cos(0)}=e" /> — not 1, which is where options A and B go wrong.</>,
  },
  {
    working: <Katex display tex="y_2 = y_1+0.1\,e^{\cos(0.1)} = e+0.1\left(e+e^{\cos(0.1)}\right)" />,
    reason: <>Stepping from <Katex tex="x_1=0.1" />.</>,
  },
  {
    working: <Katex display tex="y_3 = y_2+0.1\,e^{\cos(0.2)}" />,
    reason: <>Stepping from <Katex tex="x_2=0.2" />. Three steps take you from <Katex tex="x=0" /> to <Katex tex="x=0.3" />, but the gradient at 0.3 is never used.</>,
  },
  {
    working: <Katex display tex="\boxed{y_3 = e+0.1\left(e+e^{\cos(0.1)}+e^{\cos(0.2)}\right)}" />,
    reason: <>Three terms inside the bracket for three steps. Matches option <b>C</b>; options D and E add a fourth, <Katex tex="e^{\cos(0.3)}" />.</>,
  },
]

export default function SpecialistQ12_2020() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\dfrac{dy}{dx}=e^{\cos(x)}" /> and <Katex tex="y_0=e" /> when{' '}
          <Katex tex="x_0=0" />, then, using Euler's formula with step size 0.1,{' '}
          <Katex tex="y_3" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="e+0.1\left(1+e^{\cos(0.1)}\right)" /> },
        { letter: 'B', content: <Katex tex="e+0.1\left(1+e^{\cos(0.1)}+e^{\cos(0.2)}\right)" /> },
        {
          letter: 'C',
          content: <Katex tex="e+0.1\left(e+e^{\cos(0.1)}+e^{\cos(0.2)}\right)" />,
          isAnswer: true,
        },
        {
          letter: 'D',
          content: <Katex tex="e+0.1\left(e^{\cos(0.1)}+e^{\cos(0.2)}+e^{\cos(0.3)}\right)" />,
        },
        {
          letter: 'E',
          content: <Katex tex="e+0.1\left(e+e^{\cos(0.1)}+e^{\cos(0.2)}+e^{\cos(0.3)}\right)" />,
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
