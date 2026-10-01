// 2022 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 66% correct.
// Linear dependence of three vectors: write c as a combination of a and b, then match components. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 66, B: 6, C: 15, D: 8, E: 4 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{c} = m\underset{\sim}{a}+n\underset{\sim}{b} \ \text{ for some } m,n\in R" />,
    reason: <>Three vectors are linearly dependent when one of them can be written as a combination of the other two. Here <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> can never be parallel (their <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components, <Katex tex="2,\,-3" /> and <Katex tex="1,\,2" />, are not in proportion), so it must be <Katex tex="\underset{\sim}{c}" /> that is the combination.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \ 2m+n = -3; \qquad \underset{\sim}{j}: \ -3m+2n = 2" />,
    reason: <>Matching components. The <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components do not involve <Katex tex="p" /> or <Katex tex="q" />, so these two equations fix <Katex tex="m" /> and <Katex tex="n" /> on their own.</>,
  },
  {
    working: <Katex display tex="m = -\frac{8}{7}, \qquad n = -\frac{5}{7}" />,
    reason: <>Doubling the first equation, <Katex tex="4m+2n=-6" />, then subtracting <Katex tex="-3m+2n=2" /> gives <Katex tex="7m=-8" />. Then <Katex tex="n=-3-2m=-\tfrac57" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{k}: \ 5 = mp+n(-q) = -\frac{8p}{7}+\frac{5q}{7}" />,
    reason: <>The <Katex tex="\underset{\sim}{k}" /> components must match too. This is the only equation involving <Katex tex="p" /> and <Katex tex="q" />, so it is the condition the question asks for.</>,
  },
  {
    working: <Katex display tex="35 = -8p+5q" />,
    reason: <>Multiplying through by 7.</>,
  },
  {
    working: <Katex display tex="\boxed{8p = 5q-35}" />,
    reason: <>Matches option <b>A</b>. Option <b>C</b> is what you get if the minus sign in <Katex tex="-q\underset{\sim}{k}" /> is lost: the <Katex tex="q" /> term changes sign, giving <Katex tex="8p=-5q-35" />.</>,
  },
]

export default function SpecialistQ11_2022() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors{' '}
          <Katex tex="\underset{\sim}{a}=2\underset{\sim}{i}-3\underset{\sim}{j}+p\underset{\sim}{k}" />,{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+2\underset{\sim}{j}-q\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{c}=-3\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}" />
          , where <Katex tex="p" /> and <Katex tex="q" /> are real numbers.
          <br />
          If these vectors are linearly <b>dependent</b>, then
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="8p=5q-35" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="5p=8q-35" /> },
        { letter: 'C', content: <Katex tex="8p=-5q-35" /> },
        { letter: 'D', content: <Katex tex="8p=5q+35" /> },
        { letter: 'E', content: <Katex tex="5p=8q+35" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
