// 2023 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 33% correct.
// A reduction formula for ∫(1−x)ⁿeˣdx via integration by parts. Question text transcribed
// from the original paper. Solution is original. Interactive: spec-2023-mcq10-gap (the area
// nIₙ₋₁ exceeds Iₙ by exactly 1, the boundary term; option C's sign slip gives a negative area).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const GapWidget = lazyWidget(() => import('../interactives/spec-2023-mcq10-gap'))

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
    reason: (
      <>
        The integrand is a product, and every option links <Katex tex="I_n" /> to <Katex tex="I_{n-1}" />, an
        integral with the power one lower. Integration by parts (on the formula sheet) is the tool that lowers a power
        like this.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}u&=(1-x)^n\\ \frac{du}{dx}&=-n(1-x)^{n-1}\\ \frac{dv}{dx}&=e^x,\quad v=e^x\end{aligned}"
      />
    ),
    reason: (
      <>
        Choose <Katex tex="u=(1-x)^n" /> because differentiating it drops the power to <Katex tex="n-1" />, which is
        what <Katex tex="I_{n-1}" /> needs, while <Katex tex="e^x" /> integrates to itself. Chain rule: the derivative
        of the inside, <Katex tex="1-x" />, is <Katex tex="-1" />, so <Katex tex="\tfrac{du}{dx}" /> carries a minus
        sign.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}I_n &= \Big[(1-x)^ne^x\Big]_0^1\\ &\quad - \int_0^1 e^x\big(-n(1-x)^{n-1}\big)\,dx\end{aligned}"
      />
    ),
    reason: (
      <>
        Integration by parts for a definite integral:{' '}
        <Katex tex="\int_a^b u\frac{dv}{dx}\,dx = \Big[uv\Big]_a^b - \int_a^b v\frac{du}{dx}\,dx" />. The{' '}
        <Katex tex="uv" /> term is evaluated at the terminals too.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\Big[(1-x)^ne^x\Big]_0^1 &= (1-1)^ne^1\\ &\quad - (1-0)^ne^0\\ &= 0-1=-1\end{aligned}" />,
    reason: (
      <>
        At <Katex tex="x=1" />, <Katex tex="(1-1)^n = 0" /> (this needs <Katex tex="n\geq1" />, as the question
        says). At <Katex tex="x=0" />, both factors are 1. The result is a number, as it must be:{' '}
        <Katex tex="I_n" /> is a definite integral, so it can&apos;t contain <Katex tex="x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="I_n = -1 + n\int_0^1(1-x)^{n-1}e^x\,dx = -1+nI_{n-1}" />,
    reason: (
      <>
        The two minus signs make a plus, and the constant <Katex tex="n" /> comes out of the integral. What is left is
        the definition of <Katex tex="I_n" /> with <Katex tex="n" /> replaced by <Katex tex="n-1" />, that is,{' '}
        <Katex tex="I_{n-1}" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Cas fn="nInt">nInt((1-x)*e^x, x, 0, 1)</Cas> <Katex tex="\approx 0.718" />,{' '}
        <Cas fn="nInt">nInt(e^x, x, 0, 1)</Cas> <Katex tex="\approx 1.718" />
        <Katex display tex="n=1:\quad -1+1\times1.718 = 0.718 = I_1\ \checkmark" />
      </>
    ),
    reason: (
      <>
        A quick check with <Katex tex="n=1" />: CAS gives <Katex tex="I_1" /> and <Katex tex="I_0" />, and only option A
        turns <Katex tex="I_0" /> into <Katex tex="I_1" /> (B gives 1.718, C gives <Katex tex="-2.718" />, D gives{' '}
        <Katex tex="-1.718" />).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{I_n = -1+nI_{n-1}}" />,
    reason: (
      <>
        Matches option <b>A</b>. Option E keeps <Katex tex="(1-x)^ne^x" /> without evaluating it at 0 and 1, so it
        still contains <Katex tex="x" />. Option C is what you get if <Katex tex="(1-x)^n" /> is differentiated
        as <Katex tex="n(1-x)^{n-1}" />, missing the chain rule&apos;s <Katex tex="-1" />. Option B drops the boundary
        term <Katex tex="-1" />, and D makes both slips. C and D are also impossible on sight: they are negative,
        but <Katex tex="I_n" /> is the area under a curve that lies above the x-axis for{' '}
        <Katex tex="0<x<1" />, so <Katex tex="I_n>0" />.
      </>
    ),
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
      extras={
        <Explore title="Why Iₙ is exactly 1 less than nIₙ₋₁, for every n">
          <GapWidget />
        </Explore>
      }
    />
  )
}
