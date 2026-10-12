// 2025 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 57% correct.
// Bayes with letters instead of numbers — the answer is still a ratio. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 57, B: 19, C: 16, D: 7 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      Let <Katex tex="W" /> be the event that a randomly selected student walks to school, and{' '}
      <Katex tex="L" /> be the event that the student takes at least 30 minutes.
      <br />
      <Katex tex="\Pr(W\mid L)=\dfrac{\Pr(W\cap L)}{\Pr(L)}" />
      <br />
      <Katex tex="=\dfrac{\left(\dfrac{0.2m}{m+n}\right)}{\left(\dfrac{0.2m}{m+n}\right)+\left(\dfrac{0.4n}{m+n}\right)}" />
      <br />
      <Katex tex="=\dfrac{m}{m+2n}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="W: \text{walked}, \qquad L: \text{took at least 30 minutes}" />,
    reason: <>&ldquo;Given that &hellip; took at least 30 minutes&rdquo; means the answer is <Katex tex="\Pr(W\mid L)" />, with <Katex tex="L" /> as the condition.</>,
  },
  {
    working: <Katex display tex="\text{walkers in } L = 0.2m" />,
    reason: <>20% of the <Katex tex="m" /> walkers. Use counts, not percentages: the groups differ in size (<Katex tex="m" /> vs <Katex tex="n" />), so 20% and 40% can&rsquo;t simply be compared.</>,
  },
  {
    working: <Katex display tex="\text{non-walkers in } L = 0.4n" />,
    reason: <>40% of the <Katex tex="n" /> students who used other transport.</>,
  },
  {
    working: <Katex display tex="\Pr(W\mid L) = \frac{0.2m}{0.2m+0.4n}" />,
    reason: <>Only students in <Katex tex="L" /> count now: <Katex tex="0.2m+0.4n" /> of them, of whom <Katex tex="0.2m" /> walked.</>,
    more: <>A student is selected at random, so each probability is a count divided by the <Katex tex="m+n" /> students in total. This is the report&rsquo;s <Katex tex="\tfrac{\Pr(W\cap L)}{\Pr(L)}" /> written that way, with the <Katex tex="m+n" /> cancelling top and bottom.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{m}{m+2n}}" />,
    reason: <>Divide top and bottom by 0.2. Matches option <b>A</b>.</>,
    more: <>
      <b>B</b>, <Katex tex="\tfrac{2n}{m+2n}=\tfrac{0.4n}{0.2m+0.4n}" />, is the probability that a student in <Katex tex="L" /> did <em>not</em> walk.{' '}
      <b>C</b>, <Katex tex="\tfrac{m}{5(m+n)}=\tfrac{0.2m}{m+n}" />, is <Katex tex="\Pr(W\cap L)" />: it divides by all <Katex tex="m+n" /> students instead of only those in <Katex tex="L" />.{' '}
      <b>D</b>, <Katex tex="\tfrac13=\tfrac{0.2}{0.2+0.4}" />, uses the percentages alone, which is only right if the two groups are the same size (<Katex tex="m=n" />).
    </>,
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
            to school.
          </p>
          <p>
            Of the <Katex tex="n" /> students who used a different form of transport, 40% took
            at least 30 minutes to get to school.
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
