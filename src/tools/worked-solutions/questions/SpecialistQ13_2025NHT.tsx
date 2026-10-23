// 2025 Specialist NHT — Exam 2, MCQ 13. The NHT report gives the answer key only, with no
// statistics. Vectors: the scalar resolute is |a|cos θ, so |a| = 8 and m = √51. Question text
// transcribed from the original paper (read from the page image; the 2025 paper has no text
// layer). Solution is original; the answer B agrees with the report's key and with sympy.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}=|\underset{\sim}{a}|\cos\theta" />,
    reason: <>The scalar resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of <Katex tex="\underset{\sim}{b}" /> is <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}" />. Since <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" />, dividing by <Katex tex="|\underset{\sim}{b}|" /> leaves <Katex tex="|\underset{\sim}{a}|\cos\theta" />: the length of the shadow <Katex tex="\underset{\sim}{a}" /> casts along <Katex tex="\underset{\sim}{b}" />.</>,
    more: <>That is why an &ldquo;arbitrary&rdquo; <Katex tex="\underset{\sim}{b}" /> is enough: only its direction matters, and the angle tells us everything we need about the direction.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}|\underset{\sim}{a}|\cos\tfrac{\pi}{3}&=4\\ \tfrac12|\underset{\sim}{a}|&=4\\ |\underset{\sim}{a}|&=8\end{aligned}" />,
    reason: <><Katex tex="\cos\tfrac{\pi}{3}=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\sqrt{(-2)^2+3^2+m^2}&=8\\ 13+m^2&=64\\ m^2&=51\end{aligned}" />,
    reason: <>Write the magnitude from the components and square both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{m=\sqrt{51}}" />,
    reason: <>Matches option <b>B</b>. Reject <Katex tex="-\sqrt{51}" />, since <Katex tex="m\in R^+" />. Check: <Katex tex="|\underset{\sim}{a}|=\sqrt{64}=8" /> and <Katex tex="8\times\tfrac12=4" />.</>,
    more: <>Option <b>A</b>, <Katex tex="\tfrac{5\sqrt3}{3}" />, comes from using <Katex tex="\cos\tfrac{\pi}{3}=\tfrac{\sqrt3}{2}" /> (that is <Katex tex="\sin\tfrac{\pi}{3}" />): then <Katex tex="|\underset{\sim}{a}|=\tfrac{8}{\sqrt3}" />, <Katex tex="m^2=\tfrac{64}{3}-13=\tfrac{25}{3}" />.</>,
  },
]

export default function SpecialistQ13_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider two vectors, <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />, where{' '}
          <Katex tex="\underset{\sim}{a}=-2\underset{\sim}{i}+3\underset{\sim}{j}+m\underset{\sim}{k}" />,{' '}
          <Katex tex="m\in R^+" /> and <Katex tex="\underset{\sim}{b}" /> is an arbitrary non-zero vector.
          <br />
          The angle between <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> is{' '}
          <Katex tex="\dfrac{\pi}{3}" /> and the scalar resolute of <Katex tex="\underset{\sim}{a}" /> in the direction
          of <Katex tex="\underset{\sim}{b}" /> is 4 units.
          <br />
          The value of <Katex tex="m" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{5\sqrt3}{3}" /> },
        { letter: 'B', content: <Katex tex="\sqrt{51}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{8\sqrt3-3}{3}" /> },
        { letter: 'D', content: <Katex tex="2\sqrt2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
