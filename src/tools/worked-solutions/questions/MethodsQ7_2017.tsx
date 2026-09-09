// 2017 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 32% correct —
// the fifth-hardest MCQ in the 2017-2018 Methods Exam 2 papers.
// Find the condition on p for a quadratic (in disguise) to have no real roots.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 32, C: 12, D: 29, E: 7 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="(p-1)x^2+4x=5-p \;\implies\; (p-1)x^2+4x-5+p=0" />. The discriminant is negative for no
      real solutions: <Katex tex="16-4(p-1)(p-5)<0 \;\implies\; -4p^2+24p-4<0" />. Divide by <Katex tex="-4" />{' '}
      and change the inequality: <Katex tex="p^2-6p+1>0" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="(p-1)x^2+4x=5-p" />
        <Katex display tex="\implies\; (p-1)x^2+4x+(p-5)=0" />
      </>
    ),
    reason: 'Rearrange into standard quadratic form ax² + bx + c = 0.',
  },
  {
    working: <Katex display tex="a=p-1, \quad b=4, \quad c=p-5" />,
  },
  {
    working: <Katex display tex="\begin{aligned} \Delta &= b^2-4ac \\ &= 16-4(p-1)(p-5) \end{aligned}" />,
    reason: 'No real roots requires a negative discriminant (this also needs a ≠ 0, i.e. p ≠ 1, which is automatically excluded once the inequality below is solved).',
  },
  {
    working: <Katex display tex="(p-1)(p-5) = p^2-6p+5" />,
  },
  {
    working: (
      <>
        <Katex display tex="16-4(p^2-6p+5) < 0" />
        <Katex display tex="\implies\; 16-4p^2+24p-20<0" />
        <Katex display tex="\implies\; -4p^2+24p-4<0" />
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{p^2-6p+1>0}" />,
    reason: <>Divide both sides by <Katex tex="-4" />, which flips the inequality. Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ7_2017() {
  return (
    <MCQShell
      question={
        <p>
          The equation <Katex tex="(p-1)x^2+4x=5-p" /> has no real roots when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="p^2-6p+6<0" /> },
        { letter: 'B', content: <Katex tex="p^2-6p+1>0" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="p^2-6p-6<0" /> },
        { letter: 'D', content: <Katex tex="p^2-6p+1<0" /> },
        { letter: 'E', content: <Katex tex="p^2-6p+6>0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
