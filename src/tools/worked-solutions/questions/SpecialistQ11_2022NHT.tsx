// 2022 Specialist NHT — Exam 2, MCQ 11. The NHT report gives the answer key only, with no
// statistics. Vectors: match a given vector resolute to find the unknown n, then read off p.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{vector resolute} = \left(\frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\underset{\sim}{b}\cdot\underset{\sim}{b}}\right)\underset{\sim}{b}" />,
    reason: <>The vector resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of <Katex tex="\underset{\sim}{b}" /> is the part of <Katex tex="\underset{\sim}{a}" /> that points along <Katex tex="\underset{\sim}{b}" />: a scalar multiple of <Katex tex="\underset{\sim}{b}" /> itself.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{a}\cdot\underset{\sim}{b} &= n(1)+1(-\sqrt3)+(-1)(n) = -\sqrt3\\ \underset{\sim}{b}\cdot\underset{\sim}{b} &= 1+3+n^2 = n^2+4\end{aligned}" />,
    reason: <>Multiply matching components and add. The two <Katex tex="n" /> terms cancel, so the dot product doesn&rsquo;t depend on <Katex tex="n" /> at all.</>,
  },
  {
    working: <Katex display tex="\text{vector resolute} = \frac{-\sqrt3}{n^2+4}\left(\underset{\sim}{i}-\sqrt3\,\underset{\sim}{j}+n\underset{\sim}{k}\right)" />,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{j}:\ \ \frac{(-\sqrt3)(-\sqrt3)}{n^2+4} &= \frac{3}{6}\\ n^2+4 &= 6\\ n &= \sqrt2\end{aligned}" />,
    reason: <>Compare with the given <Katex tex="\tfrac16\left(-\sqrt3\,\underset{\sim}{i}+3\underset{\sim}{j}+p\underset{\sim}{k}\right)" />. The <Katex tex="\underset{\sim}{j}" /> component holds no unknown except <Katex tex="n" />, so it fixes <Katex tex="n" />. Reject <Katex tex="n=-\sqrt2" />: the question says <Katex tex="n" /> is positive.</>,
    more: <>The <Katex tex="\underset{\sim}{i}" /> component gives the same equation, <Katex tex="\tfrac{-\sqrt3}{n^2+4}=\tfrac{-\sqrt3}{6}" />, which is a useful check that the resolute really has the given form.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{k}:\ \ \frac{-\sqrt3}{6}\times\sqrt2 &= \frac{p}{6}\\ p &= -\sqrt3\times\sqrt2\end{aligned}" />,
    reason: <>Now <Katex tex="n" /> is known, the <Katex tex="\underset{\sim}{k}" /> components give <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p=-\sqrt6}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Sign check: <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}<0" />, so the resolute points <em>against</em> <Katex tex="\underset{\sim}{b}" />, and every component should have the opposite sign to <Katex tex="\underset{\sim}{b}" />&rsquo;s. <Katex tex="\underset{\sim}{b}" />&rsquo;s <Katex tex="\underset{\sim}{k}" /> component <Katex tex="\sqrt2" /> is positive, so <Katex tex="p" /> must be negative, which rules out option E straight away. Option <b>D</b>, <Katex tex="-\tfrac{\sqrt6}{6}" />, is the resolute&rsquo;s whole <Katex tex="\underset{\sim}{k}" /> component, <Katex tex="\tfrac p6" />, forgetting the factor <Katex tex="\tfrac16" /> sitting outside the bracket.</>,
  },
]

export default function SpecialistQ11_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="\underset{\sim}{a}=n\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" /> and{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-\sqrt3\,\underset{\sim}{j}+n\underset{\sim}{k}" />, where{' '}
          <Katex tex="n" /> is a positive real number. The vector resolute of <Katex tex="\underset{\sim}{a}" /> in the
          direction of <Katex tex="\underset{\sim}{b}" /> is{' '}
          <Katex tex="\dfrac16\left(-\sqrt3\,\underset{\sim}{i}+3\underset{\sim}{j}+p\underset{\sim}{k}\right)" />, where{' '}
          <Katex tex="p" /> is a real number.
          <br />
          The value of <Katex tex="p" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\sqrt6" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-\dfrac12" /> },
        { letter: 'C', content: <Katex tex="-3" /> },
        { letter: 'D', content: <Katex tex="-\dfrac{\sqrt6}{6}" /> },
        { letter: 'E', content: <Katex tex="\sqrt6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
