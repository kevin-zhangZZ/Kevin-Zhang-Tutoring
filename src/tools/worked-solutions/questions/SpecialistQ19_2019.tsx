// 2019 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 75% correct. Finding
// coefficients in a linear combination of two independent random variables from its mean and
// variance. Question text transcribed from the original paper (no diagram).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 6, C: 75, D: 11, E: 3 },
  noAnswer: 1,
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="E(aX+bY) = aE(X)+bE(Y) = 4a+4b" />,
    reason: <>Expected value is linear — coefficients come straight out.</>,
  },
  {
    working: <Katex display tex="4a+4b = 8 \implies a+b = 2" />,
  },
  {
    working: <Katex display tex="\operatorname{Var}(aX+bY) = a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y) = 9a^2+9b^2" />,
    reason: <>Variances need <b>independence</b> (given) and the coefficients get <b>squared</b> — note they are added even though the combination may involve a subtraction.</>,
  },
  {
    working: <Katex display tex="9a^2+9b^2 = 90 \implies a^2+b^2 = 10" />,
  },
  {
    working: <Katex display tex="(a+b)^2 = a^2+2ab+b^2 \implies 4 = 10+2ab \implies ab = -3" />,
    reason: <>A neat way to combine the two conditions: square the first and substitute the second.</>,
  },
  {
    working: <Katex display tex="a+b=2 \text{ and } ab=-3 \implies a,b \text{ are roots of } t^2-2t-3=0" />,
    reason: <>Sum and product of roots.</>,
  },
  {
    working: <Katex display tex="(t-3)(t+1)=0 \implies t=3 \text{ or } t=-1" />,
  },
  {
    working: <Katex display tex="\boxed{a=3,\ b=-1}" />,
    reason: <>Matches option <b>C</b>. (<Katex tex="a=-1,\ b=3" /> works equally well by symmetry, but is not offered.) Quick check on option <b>A</b>: <Katex tex="a=b=1" /> gives a mean of <Katex tex="8" /> ✓ but a variance of only <Katex tex="18" /> ✗.</>,
  },
]

export default function SpecialistQ19_2019() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="X" /> and <Katex tex="Y" /> are independent random variables where each has
          a mean of <Katex tex="4" /> and a variance of <Katex tex="9" />. If the random variable{' '}
          <Katex tex="Z=aX+bY" /> has a mean of <Katex tex="8" /> and a variance of{' '}
          <Katex tex="90" />, possible values of <Katex tex="a" /> and <Katex tex="b" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a=1,\ b=1" /> },
        { letter: 'B', content: <Katex tex="a=4,\ b=-2" /> },
        { letter: 'C', content: <Katex tex="a=3,\ b=-1" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="a=1,\ b=3" /> },
        { letter: 'E', content: <Katex tex="a=-2,\ b=4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
