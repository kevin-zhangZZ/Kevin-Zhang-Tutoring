// 2020 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 69% correct. The
// angle between two vectors, then a double-angle sine. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 10, C: 15, D: 69, E: 3 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (1)(2)+(2)(-4)+(2)(4) = 2" />,
    reason: 'The dot product.',
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right| = \sqrt{1+4+4} = 3, \quad \left|\underset{\sim}{b}\right| = \sqrt{4+16+16} = 6" />,
    reason: <>Both are clean: <Katex tex="\underset{\sim}{b}" /> is twice a 1–2–2 vector.</>,
  },
  {
    working: <Katex display tex="\cos\theta = \frac{2}{3\times6} = \frac19" />,
    reason: <>Positive, so <Katex tex="\theta" /> is acute as stated — no need to take an absolute value.</>,
  },
  {
    working: <Katex display tex="\sin\theta = \sqrt{1-\tfrac{1}{81}} = \sqrt{\tfrac{80}{81}} = \frac{4\sqrt5}{9}" />,
    reason: <><Katex tex="\sqrt{80}=4\sqrt5" />. Positive because <Katex tex="\theta" /> is acute.</>,
  },
  {
    working: <Katex display tex="\sin(2\theta) = 2\sin\theta\cos\theta = 2\cdot\frac{4\sqrt5}{9}\cdot\frac19" />,
    reason: <>The double-angle formula — the question asks for <Katex tex="\sin(2\theta)" />, not <Katex tex="\sin\theta" />, which is option B.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8\sqrt5}{81}}" />,
    reason: <>Matches option <b>D</b>. Option C drops the factor of 2.</>,
  },
]

export default function SpecialistQ16_2020() {
  return (
    <MCQShell
      question={
        <p>
          Let{' '}
          <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}+2\underset{\sim}{j}+2\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{b}=2\underset{\sim}{i}-4\underset{\sim}{j}+4\underset{\sim}{k}" />
          , where the acute angle between these vectors is <Katex tex="\theta" />. The value
          of <Katex tex="\sin(2\theta)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac19" /> },
        { letter: 'B', content: <Katex tex="\frac{4\sqrt5}{9}" /> },
        { letter: 'C', content: <Katex tex="\frac{4\sqrt5}{81}" /> },
        { letter: 'D', content: <Katex tex="\frac{8\sqrt5}{81}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\frac{2\sqrt{46}}{25}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
