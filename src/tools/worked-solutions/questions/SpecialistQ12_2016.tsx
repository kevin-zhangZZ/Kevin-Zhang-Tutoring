// 2016 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 72% correct.
// Finding m so that a − b is perpendicular to b. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 8, C: 72, D: 4, E: 11 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\underset{\sim}{a}-\underset{\sim}{b}=(m-2)\underset{\sim}{i}-2\underset{\sim}{j}+\underset{\sim}{k},\ \left(\underset{\sim}{a}-\underset{\sim}{b}\right)\cdot\underset{\sim}{b}=0" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}-\underset{\sim}{b} = (-2+m)\underset{\sim}{i}-2\underset{\sim}{j}+\underset{\sim}{k}" />,
    reason: <>Component by component: <Katex tex="-2-(-m)=m-2" />, <Katex tex="-1-1=-2" />, <Katex tex="3-2=1" />.</>,
  },
  {
    working: <Katex display tex="\left(\underset{\sim}{a}-\underset{\sim}{b}\right)\cdot\underset{\sim}{b} = 0" />,
    reason: <>Perpendicular vectors have zero dot product.</>,
  },
  {
    working: <Katex display tex="(m-2)(-m)+(-2)(1)+(1)(2) = 0" />,
    reason: <>Dotting with <Katex tex="\underset{\sim}{b}=-m\underset{\sim}{i}+\underset{\sim}{j}+2\underset{\sim}{k}" />.</>,
  },
  {
    working: <Katex display tex="-m^2+2m-2+2 = 0 \implies m(m-2) = 0" />,
    reason: <>The constants cancel, leaving a factorisable quadratic — no formula needed.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 0 \text{ or } m = 2}" />,
    reason: <>Matches option <b>C</b>. Both are valid: <Katex tex="m=0" /> is a genuine solution, not a degenerate one, since <Katex tex="\underset{\sim}{b}=\underset{\sim}{j}+2\underset{\sim}{k}" /> is still a non-zero vector. Options A and B each keep only one root.</>,
  },
]

export default function SpecialistQ12_2016() {
  return (
    <MCQShell
      question={
        <p>
          If{' '}
          <Katex tex="\underset{\sim}{a}=-2\underset{\sim}{i}-\underset{\sim}{j}+3\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{b}=-m\underset{\sim}{i}+\underset{\sim}{j}+2\underset{\sim}{k}" />
          , where <Katex tex="m" /> is a real constant, the vector{' '}
          <Katex tex="\underset{\sim}{a}-\underset{\sim}{b}" /> will be perpendicular to
          vector <Katex tex="\underset{\sim}{b}" /> where <Katex tex="m" /> equals
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="0" /> only</> },
        { letter: 'B', content: <><Katex tex="2" /> only</> },
        { letter: 'C', content: <><Katex tex="0" /> or <Katex tex="2" /></>, isAnswer: true },
        { letter: 'D', content: <Katex tex="4.5" /> },
        { letter: 'E', content: <><Katex tex="0" /> or <Katex tex="-2" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
