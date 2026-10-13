// 2014 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 75% correct.
// The sum of the roots of a cubic: real coefficients force a real sum; confirmed by factorising. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 4, C: 9, D: 4, E: 75 },
  answer: 'E',
  noAnswer: 0,
  comment: <>The sum of the roots must be a real number.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a+bi \text{ a root} \implies a-bi \text{ a root}" />,
    reason: <>Conjugate root theorem: every coefficient of the cubic is real, so non-real roots come in conjugate pairs.</>,
  },
  {
    working: <Katex display tex="(a+bi)+(a-bi) = 2a \in R" />,
    reason: <>The imaginary parts of each pair cancel, so the sum is real. That already rules out A, B, C and D.</>,
    more: <>This is the report's comment, and the fastest exam route. The rows below confirm the value by actually finding the roots.</>,
  },
  {
    working: <Katex display tex="P(1) = 1-5+11-7 = 0" />,
    reason: <>So <Katex tex="z-1" /> is a factor (factor theorem). Test the factors of the constant term, <Katex tex="\pm1,\pm7" />, starting with the easiest.</>,
  },
  {
    working: <Katex display tex="z^3-5z^2+11z-7 = (z-1)(z^2-4z+7)" />,
    reason: <>Match coefficients in <Katex tex="(z-1)(z^2+bz+7)" />: the <Katex tex="z^2" /> terms give <Katex tex="b-1=-5" />, so <Katex tex="b=-4" />.</>,
    more: <>The quadratic must start <Katex tex="z^2" /> (to give <Katex tex="z^3" />) and end <Katex tex="+7" /> (since <Katex tex="-1\times7=-7" />). Check the <Katex tex="z" /> terms: <Katex tex="7-b=7+4=11" /> ✓. Polynomial long division by <Katex tex="z-1" /> gives the same factor.</>,
  },
  {
    working: <Katex display tex="(z-2)^2 = -3 \implies z = 2\pm\sqrt3\, i" />,
    reason: <>Complete the square in <Katex tex="z^2-4z+7=0" />; the negative right side gives a conjugate pair, as the first row predicted.</>,
  },
  {
    working: <Katex display tex="1+(2+\sqrt3\, i)+(2-\sqrt3\, i) = 5" />,
    reason: <>Add all three roots; the <Katex tex="\pm\sqrt3\, i" /> cancel.</>,
    more: <>A quick check you may meet elsewhere: for a cubic, the sum of the roots equals minus the <Katex tex="z^2" /> coefficient divided by the <Katex tex="z^3" /> coefficient, here <Katex tex="-\tfrac{-5}{1}=5" />. That relation is not part of the Specialist study design, so use it only to check.</>,
  },
  {
    working: <Katex display tex="\boxed{5}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Options A to D (24% between them) are all non-real, so each fails the first test: a cubic with real coefficients can never have a non-real sum of roots. Option C, the most popular wrong answer, is <Katex tex="2(2-\sqrt3\, i)" />: one complex root counted twice instead of adding the conjugate pair.</>,
  },
]

export default function SpecialistQ7_2014() {
  return (
    <MCQShell
      question={
        <p>
          The sum of the roots of <Katex tex="z^3-5z^2+11z-7=0" />, where{' '}
          <Katex tex="z\in C" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1+2\sqrt3 i" /> },
        { letter: 'B', content: <Katex tex="5i" /> },
        { letter: 'C', content: <Katex tex="4-2\sqrt3 i" /> },
        { letter: 'D', content: <Katex tex="2\sqrt3 i" /> },
        { letter: 'E', content: <Katex tex="5" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
