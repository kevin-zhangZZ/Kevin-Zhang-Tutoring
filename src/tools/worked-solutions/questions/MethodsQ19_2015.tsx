// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 19. VCAA examination report: 68% correct.
// The fundamental theorem of calculus applied to an integral with a variable upper limit.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 7, C: 68, D: 14, E: 5 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \int_0^x\sqrt{t^2+4}\,dt" />,
    reason: <>An integral with a variable upper limit. There is no need to evaluate it — and no Methods technique could.</>,
  },
  {
    working: <Katex display tex="f'(x) = \sqrt{x^2+4}" />,
    reason: <>The fundamental theorem of calculus: differentiating an integral with a constant lower limit with respect to its upper limit substitutes that limit into the integrand.</>,
  },
  {
    working: <Katex display tex="f'(-2) = \sqrt{(-2)^2+4} = \sqrt8" />,
    reason: <>Note <Katex tex="(-2)^2=+4" />, so the answer is positive.</>,
  },
  {
    working: <Katex display tex="\boxed{2\sqrt2}" />,
    reason: <>Matches option <b>C</b>, since <Katex tex="\sqrt8=\sqrt4\sqrt2=2\sqrt2" />.</>,
    more: (
      <>
        Option D has the sign wrong. It is true that <Katex tex="f(-2)" /> itself is negative — the integral runs
        backwards from <Katex tex="0" /> to <Katex tex="-2" /> — but the question asks for <Katex tex="f'(-2)" />, which
        is just the integrand's value at <Katex tex="-2" />. <Katex tex="x^2+4" /> is always positive, so its square root is too: <Katex tex="f'(x)>0" />{' '}
        for every <Katex tex="x" />. Options A and B (<Katex tex="\pm\sqrt2" />) come from substituting{' '}
        <Katex tex="-2" /> without squaring it: <Katex tex="\sqrt{-2+4}=\sqrt2" />.
      </>
    ),
  },
]

export default function MethodsQ19_2015() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="f(x)=\displaystyle\int_0^x\sqrt{t^2+4}\,dt" />, then{' '}
          <Katex tex="f'(-2)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt2" /> },
        { letter: 'B', content: <Katex tex="-\sqrt2" /> },
        { letter: 'C', content: <Katex tex="2\sqrt2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-2\sqrt2" /> },
        { letter: 'E', content: <Katex tex="4\sqrt2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
