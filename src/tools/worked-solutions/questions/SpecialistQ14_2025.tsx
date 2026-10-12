// 2025 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 48% correct. This
// year's paper used four options (A–D) rather than five. The angle between two vectors when
// their dot product equals the magnitude of their cross product. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 48, C: 30, D: 5 },
  answer: 'B',
  comment: (
    <>
      Use the definitions of vectors
      <br />
      <Katex tex="\underset{\sim}{a}\cdot \underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos(\theta)" />
      <br />
      <Katex tex="\underset{\sim}{a}\times \underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\sin(\theta)" />
      <br />
      <em>Equating gives</em>
      <br />
      <Katex tex="\cos(\theta)=|\sin(\theta)|" />
      <br />
      <Katex tex="\tan(\theta)=1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{a}\cdot\underset{\sim}{b} &= |\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta \\ |\underset{\sim}{a}\times\underset{\sim}{b}| &= |\underset{\sim}{a}||\underset{\sim}{b}|\sin\theta \end{aligned}" />,
    reason: <>Standard formulas, where <Katex tex="\theta\in[0,\pi]" /> is the angle between <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />, so <Katex tex="\sin\theta\geq0" />.</>,
    more: <>The report writes the second formula as <Katex tex="\underset{\sim}{a}\times\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\sin(\theta)" />, without the modulus bars on the left. The cross product is a vector, so it cannot equal a number: it is its <em>magnitude</em> <Katex tex="|\underset{\sim}{a}\times\underset{\sim}{b}|" /> that equals <Katex tex="|\underset{\sim}{a}||\underset{\sim}{b}|\sin\theta" />, which is exactly the quantity in the question.</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta = |\underset{\sim}{a}||\underset{\sim}{b}|\sin\theta" />,
    reason: <>Set the two given quantities equal.</>,
  },
  {
    working: <Katex display tex="\cos\theta = \sin\theta \;\implies\; \tan\theta = 1" />,
    reason: <>Cancel <Katex tex="|\underset{\sim}{a}||\underset{\sim}{b}|" /> (non-zero), then divide by <Katex tex="\cos\theta" />, which is non-zero: otherwise <Katex tex="\sin\theta=0" /> too, but <Katex tex="\sin^2\theta+\cos^2\theta=1" />.</>,
    more: <>The report writes <Katex tex="\cos(\theta)=|\sin(\theta)|" />. The modulus changes nothing here, because <Katex tex="\sin\theta\geq0" /> for every angle between two vectors (<Katex tex="0\leq\theta\leq\pi" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \tfrac{\pi}{4}}" />,
    reason: <>The only angle in <Katex tex="[0,\pi]" /> with <Katex tex="\tan\theta=1" /> (at <Katex tex="\tfrac{3\pi}{4}" />, <Katex tex="\tan\theta=-1" />). Matches option <b>B</b>.</>,
    more: (
      <>
        Checking each option against <Katex tex="\cos\theta=\sin\theta" />:
        <br />
        <b>A</b> (<Katex tex="0" />, 17%): parallel vectors, so <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|" /> but <Katex tex="|\underset{\sim}{a}\times\underset{\sim}{b}|=0" />.
        <br />
        <b>C</b> (<Katex tex="\tfrac{\pi}{2}" />, 30%, the most common wrong answer) is tempting because <Katex tex="\underset{\sim}{a}\times\underset{\sim}{b}" /> is perpendicular to both vectors, but that is its direction, not the angle between them. At <Katex tex="\tfrac{\pi}{2}" /> the vectors are perpendicular, so <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=0" /> but <Katex tex="|\underset{\sim}{a}\times\underset{\sim}{b}|=|\underset{\sim}{a}||\underset{\sim}{b}|" />. Here <Katex tex="\cos\theta=0" /> while <Katex tex="\sin\theta=1" />, so the two quantities are not equal.
        <br />
        <b>D</b> (<Katex tex="\tfrac{3\pi}{4}" />, 5%): <Katex tex="\cos\theta=-\tfrac{\sqrt2}{2}" /> makes the dot product negative, but a magnitude is never negative.
      </>
    ),
  },
]

export default function SpecialistQ14_2025() {
  return (
    <MCQShell
      question={
        <p>
          For non-zero vectors <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />, if{' '}
          <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = |\underset{\sim}{a}\times\underset{\sim}{b}|" />, then the angle between <Katex tex="\underset{\sim}{a}" /> and{' '}
          <Katex tex="\underset{\sim}{b}" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac{\pi}{4}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac{\pi}{2}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{3\pi}{4}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
