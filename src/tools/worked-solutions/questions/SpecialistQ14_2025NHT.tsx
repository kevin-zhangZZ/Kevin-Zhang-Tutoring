// 2025 Specialist NHT — Exam 2, MCQ 14. The NHT report gives the answer key only, with no
// statistics. Vectors: parallel means one is a scalar multiple of the other, giving p² = 4.
// Question text transcribed from the original paper (read from the page image; the 2025 paper has
// no text layer). Solution is original; the answer B agrees with the report's key and with sympy
// (the cross product vanishes for p = ±2).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}=k\underset{\sim}{b}:\quad \underset{\sim}{i}-p\underset{\sim}{j}=k\left(p\underset{\sim}{i}-4\underset{\sim}{j}\right)" />,
    reason: <>Two vectors are parallel when one is a scalar multiple of the other, for some non-zero <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{i}:&\quad 1=kp\\ \underset{\sim}{j}:&\quad -p=-4k\implies p=4k\end{aligned}" />,
    reason: <>Equal vectors have equal components, so match the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> parts separately.</>,
  },
  {
    working: <Katex display tex="1=k(4k)=4k^2\implies k=\pm\tfrac12\implies p=\pm2" />,
    reason: <>Substitute <Katex tex="p=4k" /> into the first equation.</>,
    more: <>Quicker: parallel vectors have their components in the same ratio, <Katex tex="\tfrac{1}{p}=\tfrac{-p}{-4}" />, so <Katex tex="p^2=4" /> straight away.</>,
  },
  {
    working: <Katex display tex="\boxed{|p|=2}" />,
    reason: <>Matches option <b>B</b>. Both signs work, which is why the question asks for the magnitude of <Katex tex="p" />. Check with <Katex tex="p=2" />: <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}-2\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{b}=2\underset{\sim}{i}-4\underset{\sim}{j}=2\underset{\sim}{a}" />.</>,
    more: <>With <Katex tex="p=-2" />: <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}+2\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{b}=-2\underset{\sim}{i}-4\underset{\sim}{j}=-2\underset{\sim}{a}" />, parallel but pointing the opposite way.</>,
  },
]

export default function SpecialistQ14_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors
          <br />
          <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}-p\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{b}=p\underset{\sim}{i}-4\underset{\sim}{j}" />, where <Katex tex="p\in R" />, and{' '}
          <Katex tex="\underset{\sim}{a}" /> is parallel to <Katex tex="\underset{\sim}{b}" />.
          <br />
          The magnitude of <Katex tex="p" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
