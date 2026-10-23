// 2025 Specialist NHT — Exam 2, MCQ 16. The NHT report gives the answer key only, with no
// statistics. Vectors: b × a = −(a × b), so the expression is −|a × b|², and a ⊥ b makes
// |a × b| = |a||b|. Question text transcribed from the original paper (read from the page image;
// the 2025 paper has no text layer). Solution is original; the answer B agrees with the report's
// key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{b}\times\underset{\sim}{a}=-\left(\underset{\sim}{a}\times\underset{\sim}{b}\right)" />,
    reason: <>The cross product is <b>anti-commutative</b>: swapping the order reverses the direction (right-hand rule), keeping the length.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\left(\underset{\sim}{a}\times\underset{\sim}{b}\right)\cdot\left(\underset{\sim}{b}\times\underset{\sim}{a}\right)&=-\left(\underset{\sim}{a}\times\underset{\sim}{b}\right)\cdot\left(\underset{\sim}{a}\times\underset{\sim}{b}\right)\\ &=-\left|\underset{\sim}{a}\times\underset{\sim}{b}\right|^2\end{aligned}" />,
    reason: <>A vector dotted with itself is its magnitude squared: <Katex tex="\underset{\sim}{u}\cdot\underset{\sim}{u}=|\underset{\sim}{u}|^2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\underset{\sim}{a}\cdot\underset{\sim}{b}=0\implies\theta=\tfrac{\pi}{2}\\ &\left|\underset{\sim}{a}\times\underset{\sim}{b}\right|=|\underset{\sim}{a}||\underset{\sim}{b}|\sin\tfrac{\pi}{2}=|\underset{\sim}{a}||\underset{\sim}{b}|\end{aligned}" />,
    reason: <>Both vectors are non-zero and their dot product is 0, so they are perpendicular. The cross product&apos;s magnitude is <Katex tex="|\underset{\sim}{a}||\underset{\sim}{b}|\sin\theta" />, and <Katex tex="\sin\tfrac{\pi}{2}=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-|\underset{\sim}{a}|^2|\underset{\sim}{b}|^2}" />,
    reason: <>Matches option <b>B</b>. Sign check: the two cross products point in opposite directions, so their dot product must be negative.</>,
    more: <>Option <b>D</b> treats <Katex tex="\underset{\sim}{b}\times\underset{\sim}{a}" /> as equal to <Katex tex="\underset{\sim}{a}\times\underset{\sim}{b}" />, losing the minus sign. Options <b>A</b> and <b>C</b> forget that dotting a vector with itself gives the magnitude <b>squared</b>.</>,
  },
]

export default function SpecialistQ16_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider two vectors <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> such that{' '}
          <Katex tex="|\underset{\sim}{a}|>0" />, <Katex tex="|\underset{\sim}{b}|>0" /> and{' '}
          <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=0" />.
          <br />
          The expression <Katex tex="\left(\underset{\sim}{a}\times\underset{\sim}{b}\right)\cdot\left(\underset{\sim}{b}\times\underset{\sim}{a}\right)" /> is
          equivalent to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-|\underset{\sim}{a}||\underset{\sim}{b}|" /> },
        { letter: 'B', content: <Katex tex="-|\underset{\sim}{a}|^2|\underset{\sim}{b}|^2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="|\underset{\sim}{a}||\underset{\sim}{b}|" /> },
        { letter: 'D', content: <Katex tex="|\underset{\sim}{a}|^2|\underset{\sim}{b}|^2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
