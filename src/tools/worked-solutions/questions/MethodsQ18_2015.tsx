// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 18. VCAA examination report: 48% correct.
// Testing a functional equation against five candidate rules. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 48, B: 20, C: 15, D: 10, E: 6 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      If <Katex tex="f(x)=x^2" />, then{' '}
      <Katex tex="\bigl|f(x+y)-f(x-y)\bigr| = \bigl|(x+y)^2-(x-y)^2\bigr| = |4xy| = 4\sqrt{x^2y^2} = 4\sqrt{f(x)f(y)}" />
      .
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2: \quad f(x+y)-f(x-y) = (x+y)^2-(x-y)^2" />,
    reason: <>Start with the simplest candidate. A difference of two squares is about to collapse.</>,
  },
  {
    working: <Katex display tex="= \bigl[(x+y)+(x-y)\bigr]\bigl[(x+y)-(x-y)\bigr] = (2x)(2y) = 4xy" />,
    reason: <>Using <Katex tex="a^2-b^2=(a+b)(a-b)" /> rather than expanding both squares.</>,
  },
  {
    working: <Katex display tex="\bigl|f(x+y)-f(x-y)\bigr| = |4xy| = 4|x||y|" />,
    reason: <>The modulus on the left is what makes the identity work for negative <Katex tex="x" /> or <Katex tex="y" /> too.</>,
  },
  {
    working: <Katex display tex="4\sqrt{f(x)f(y)} = 4\sqrt{x^2y^2} = 4|x||y|" />,
    reason: <><Katex tex="\sqrt{x^2}=|x|" />, not <Katex tex="x" /> — and that is exactly why both sides match.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x^2}" />,
    reason: <>Option A. A quick way to eliminate the rest: test <Katex tex="x=y=1" />. For <Katex tex="f(x)=e^x" />, the left side is <Katex tex="e^2-1\approx6.39" /> and the right is <Katex tex="4e\approx10.87" />; for <Katex tex="f(x)=x" />, <Katex tex="2" /> against <Katex tex="4" />; for <Katex tex="f(x)=x^3" />, <Katex tex="8" /> against <Katex tex="4" />.</>,
  },
]

export default function MethodsQ18_2015() {
  return (
    <MCQShell
      question={
        <p>
          For which one of the following functions is the equation{' '}
          <Katex tex="\bigl|f(x+y)-f(x-y)\bigr| = 4\sqrt{f(x)f(y)}" /> true for all{' '}
          <Katex tex="x\in R" /> and <Katex tex="y\in R" />?
        </p>
      }
      background={
        <p>
          With five candidates and one identity, testing a convenient pair of values first —{' '}
          <Katex tex="x=y=1" /> is usually enough — eliminates most options in seconds.
          Then verify the survivor algebraically, because "true for one pair" is not "true
          for all".
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=x^2" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="f(x)=|2x|" /> },
        { letter: 'C', content: <Katex tex="f(x)=e^x" /> },
        { letter: 'D', content: <Katex tex="f(x)=x^3" /> },
        { letter: 'E', content: <Katex tex="f(x)=x" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
