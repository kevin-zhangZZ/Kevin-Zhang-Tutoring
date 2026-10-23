// 2023 Specialist NHT — Exam 2, MCQ 14. The NHT report gives the answer key only, with no
// statistics. Vectors: the angle between i + 2j + k and the positive z-axis. Question text
// transcribed from the original paper. Solution is original; the answer D agrees with the report's
// key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}=\underset{\sim}{i}+2\underset{\sim}{j}+\underset{\sim}{k},\qquad \underset{\sim}{k}=0\underset{\sim}{i}+0\underset{\sim}{j}+1\underset{\sim}{k}" />,
    reason: <>The positive direction of the <Katex tex="z" />-axis is the unit vector <Katex tex="\underset{\sim}{k}" />.</>,
  },
  {
    working: <Katex display tex="\cos\theta=\frac{\underset{\sim}{a}\cdot\underset{\sim}{k}}{|\underset{\sim}{a}|\,|\underset{\sim}{k}|}=\frac{1}{\sqrt{1+4+1}\times1}=\frac{1}{\sqrt6}" />,
    reason: <>The angle between two vectors comes from <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" />. Dotting with <Katex tex="\underset{\sim}{k}" /> just picks out the <Katex tex="\underset{\sim}{k}" /> component, 1.</>,
    more: <>This is the direction cosine of <Katex tex="\underset{\sim}{a}" /> with the <Katex tex="z" />-axis: the <Katex tex="\underset{\sim}{k}" /> component divided by the magnitude.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta=\cos^{-1}\!\left(\frac{1}{\sqrt6}\right)}" />,
    reason: <>Matches option <b>D</b>. Sanity check: <Katex tex="\tfrac{1}{\sqrt6}\approx0.41" />, so <Katex tex="\theta\approx66^\circ" />: the vector leans well away from the <Katex tex="z" />-axis, as expected when its <Katex tex="\underset{\sim}{k}" /> component, 1, is small next to its length, <Katex tex="\sqrt6\approx2.45" />.</>,
    more: <>Options C and E can&apos;t be angles at all: <Katex tex="\tfrac{4}{\sqrt6}\approx1.63" /> is outside <Katex tex="[-1,1]" />, so <Katex tex="\cos^{-1}" /> of it (or its negative) is undefined. Options A and B would need <Katex tex="\cos\theta=\tfrac{1}{\sqrt2}" /> or <Katex tex="\tfrac12" />.</>,
  },
]

export default function SpecialistQ14_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The angle between the vector <Katex tex="\underset{\sim}{i}+2\underset{\sim}{j}+\underset{\sim}{k}" /> and the positive direction of
          the <Katex tex="z" />-axis is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\pi}{4}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{3}" /> },
        { letter: 'C', content: <Katex tex="\cos^{-1}\!\left(\dfrac{-4}{\sqrt6}\right)" /> },
        { letter: 'D', content: <Katex tex="\cos^{-1}\!\left(\dfrac{1}{\sqrt6}\right)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\cos^{-1}\!\left(\dfrac{4}{\sqrt6}\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
