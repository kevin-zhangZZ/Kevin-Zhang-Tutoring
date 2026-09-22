// 2025 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 57% correct.
// Bayes with letters instead of numbers — the answer is still a ratio. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 57, B: 19, C: 16, D: 7 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="W: \text{walked}, \qquad L: \text{took at least 30 minutes}" />,
    reason: 'Naming the two events makes the conditional probability readable.',
  },
  {
    working: <Katex display tex="\text{walkers who were late} = 0.2m" />,
    reason: 'Counts, not proportions — there are m walkers in total.',
  },
  {
    working: <Katex display tex="\text{others who were late} = 0.4n" />,
    reason: 'The other branch.',
  },
  {
    working: <Katex display tex="\Pr(W\mid L) = \frac{0.2m}{0.2m+0.4n}" />,
    reason: 'Out of everyone who took at least 30 minutes, the fraction who walked.',
  },
  {
    working: <Katex display tex="\boxed{\frac{m}{m+2n}}" />,
    reason: <>Option <b>A</b>: divide numerator and denominator by 0.2. Option <b>B</b> is the complement <Katex tex="\Pr(\text{not }W\mid L)" />, and <b>C</b> is <Katex tex="\Pr(W\cap L)" /> without conditioning.</>,
  },
]

export default function MethodsQ9_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            One day, at a particular school, <Katex tex="m" /> students walked to school and
            the remaining <Katex tex="n" /> students travelled to school using a different
            form of transport.
          </p>
          <p>
            Of the <Katex tex="m" /> students who walked, 20% took at least 30 minutes to get
            to school. Of the <Katex tex="n" /> students who used a different form of
            transport, 40% took at least 30 minutes to get to school.
          </p>
          <p>
            Given that a randomly selected student took at least 30 minutes to get to school,
            the probability that they walked to school is given by
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{m}{m+2n}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\frac{2n}{m+2n}" /> },
        { letter: 'C', content: <Katex tex="\frac{m}{5(m+n)}" /> },
        { letter: 'D', content: <Katex tex="\frac13" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
