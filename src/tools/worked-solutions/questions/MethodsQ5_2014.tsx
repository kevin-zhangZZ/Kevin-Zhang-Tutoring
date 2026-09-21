// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 5. VCAA examination report: 58% correct.
// Standardising a normal probability. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 11, C: 58, D: 8, E: 10 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="Z = \frac{X-\mu}{\sigma} = \frac{X-12}{0.5}" />,
    reason: <>The standardising formula. Dividing by <Katex tex="\sigma=0.5" /> is multiplying by 2, which is easy to get backwards.</>,
  },
  {
    working: <Katex display tex="X = 11.5 \implies Z = \frac{11.5-12}{0.5} = \frac{-0.5}{0.5} = -1" />,
    reason: <><Katex tex="11.5" /> is one standard deviation below the mean — not half of one, which is option B.</>,
  },
  {
    working: <Katex display tex="\Pr(X<11.5) = \Pr(Z<-1)" />,
    reason: <>The inequality direction carries over unchanged, since <Katex tex="\sigma>0" />.</>,
  },
  {
    working: <Katex display tex="\Pr(Z<-1) = \Pr(Z>1)" />,
    reason: <>The standard normal is symmetric about 0, so the left tail below <Katex tex="-1" /> matches the right tail above <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Z>1)}" />,
    reason: <>Option C. Option A, <Katex tex="\Pr(Z>-1)" />, is the complement — about <Katex tex="0.84" /> instead of <Katex tex="0.16" />.</>,
  },
]

export default function MethodsQ5_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The random variable <Katex tex="X" /> has a normal distribution with mean 12 and
            standard deviation 0.5.
          </p>
          <p>
            If <Katex tex="Z" /> has the standard normal distribution, then the probability
            that <Katex tex="X" /> is less than 11.5 is equal to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\Pr(Z>-1)" /> },
        { letter: 'B', content: <Katex tex="\Pr(Z<-0.5)" /> },
        { letter: 'C', content: <Katex tex="\Pr(Z>1)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\Pr(Z\ge0.5)" /> },
        { letter: 'E', content: <Katex tex="\Pr(Z<1)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
