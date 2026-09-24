// 2014 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 77% correct.
// Two conditions on two vectors, giving two unknowns. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 77, B: 11, C: 6, D: 4, E: 2 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="-8+mn+3=0" /> and <Katex tex="4^2+m^2+3^2=10^2" /> gives{' '}
      <Katex tex="m=5\sqrt3" />, <Katex tex="n=\tfrac1{\sqrt3}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right| = 10:\quad 4^2+m^2+(-3)^2 = 100" />,
    reason: <>Square the magnitude condition first — it involves only <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="m^2 = 100-16-9 = 75" />,
    reason: <>Note <Katex tex="(-3)^2=+9" />.</>,
  },
  {
    working: <Katex display tex="m = \sqrt{75} = 5\sqrt3" />,
    reason: <>Positive, since <Katex tex="m\in R^+" /> — which rules out option C.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 0:\quad 4(-2)+mn+(-3)(-1) = 0" />,
    reason: <>Perpendicular, so the dot product vanishes.</>,
  },
  {
    working: <Katex display tex="-8+mn+3 = 0 \implies mn = 5" />,
    reason: <>Collecting.</>,
  },
  {
    working: <Katex display tex="n = \frac{5}{5\sqrt3} = \frac{1}{\sqrt3} = \frac{\sqrt3}{3}" />,
    reason: <>Rationalising. Option B gives <Katex tex="\sqrt3" />, which is the reciprocal.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 5\sqrt3,\quad n = \tfrac{\sqrt3}{3}}" />,
    reason: <>Matches option <b>A</b>. Check: <Katex tex="16+75+9=100" /> ✓ and <Katex tex="-8+5\sqrt3\cdot\tfrac{1}{\sqrt3}+3=0" /> ✓.</>,
  },
]

export default function SpecialistQ16_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Two vectors are given by{' '}
            <Katex tex="\underset{\sim}{a}=4\underset{\sim}{i}+m\underset{\sim}{j}-3\underset{\sim}{k}" />{' '}
            and{' '}
            <Katex tex="\underset{\sim}{b}=-2\underset{\sim}{i}+n\underset{\sim}{j}-\underset{\sim}{k}" />
            , where <Katex tex="m,n\in R^+" />.
          </p>
          <p>
            If <Katex tex="\left|\underset{\sim}{a}\right|=10" /> and{' '}
            <Katex tex="\underset{\sim}{a}" /> is perpendicular to{' '}
            <Katex tex="\underset{\sim}{b}" />, then <Katex tex="m" /> and <Katex tex="n" />{' '}
            respectively are
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="5\sqrt3,\ \tfrac{\sqrt3}{3}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="5\sqrt3,\ \sqrt3" /> },
        { letter: 'C', content: <Katex tex="-5\sqrt3,\ \sqrt3" /> },
        { letter: 'D', content: <Katex tex="\sqrt{93},\ \tfrac{5\sqrt{93}}{93}" /> },
        { letter: 'E', content: <Katex tex="5,\ 1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
