// 2023 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 33% correct.
// A reduction formula for ∫(1−x)ⁿeˣdx via integration by parts. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 33, B: 10, C: 23, D: 7, E: 25 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="u=(1-x)^n" />, <Katex tex="\tfrac{dv}{dx}=e^x" />
      <br />
      <Katex tex="\tfrac{du}{dx}=-n(1-x)^{n-1}" />, <Katex tex="v=e^x" />
      <br />
      <Katex tex="\int_0^1\left((1-x)^ne^x\right)dx=\left[(1-x)^ne^x\right]_0^1-\int_0^1\left(-n(1-x)^{n-1}e^x\right)dx" />
      <br />
      <Katex tex="=\left(0\times e^1\right)-\left(1\times e^0\right)+n\int_0^1\left((1-x)^{n-1}e^x\right)dx" />
      <br />
      <Katex tex="=-1+nI_{n-1}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="I_n = \int_0^1 (1-x)^n e^x\,dx" />,
    reason: <>The given integral, for n ≥ 1.</>,
  },
  {
    working: <Katex display tex="u=(1-x)^n,\quad dv=e^x\,dx \;\implies\; du=-n(1-x)^{n-1}dx,\quad v=e^x" />,
    reason: <>Set up integration by parts, differentiating the polynomial factor.</>,
  },
  {
    working: <Katex display tex="I_n = \Big[(1-x)^ne^x\Big]_0^1 - \int_0^1 e^x\cdot\big(-n(1-x)^{n-1}\big)dx" />,
    reason: <>IBP formula <Katex tex="\int u\,dv = uv - \int v\,du" />.</>,
  },
  {
    working: <Katex display tex="\Big[(1-x)^ne^x\Big]_0^1 = (1-1)^ne^1 - (1-0)^ne^0 = 0-1=-1" />,
    reason: <>Since <Katex tex="n\geq1" />, the upper limit vanishes because of the <Katex tex="(1-x)^n" /> factor.</>,
  },
  {
    working: <Katex display tex="I_n = -1 + n\int_0^1(1-x)^{n-1}e^x\,dx = -1+nI_{n-1}" />,
    reason: <>The remaining integral is exactly the definition of <Katex tex="I_{n-1}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{I_n = -1+nI_{n-1}}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ10_2023() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="I_n = \displaystyle\int_0^1 (1-x)^n e^x\,dx" />, where <Katex tex="n\in N" />, then for{' '}
          <Katex tex="n\geq1" />, <Katex tex="I_n" /> equals
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-1+nI_{n-1}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="nI_{n-1}" /> },
        { letter: 'C', content: <Katex tex="-1-nI_{n-1}" /> },
        { letter: 'D', content: <Katex tex="-nI_{n-1}" /> },
        { letter: 'E', content: <Katex tex="(1-x)^ne^x+nI_{n-1}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
