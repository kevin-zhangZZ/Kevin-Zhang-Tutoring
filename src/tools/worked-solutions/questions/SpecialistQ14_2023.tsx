// 2023 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 48% correct.
// Finding c·n for a unit vector n orthogonal to two given vectors. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 48, C: 16, D: 9, E: 19 },
  answer: 'B',
  comment: (
    <>
      <Katex tex="\underset{\sim}{n}=x\underset{\sim}{i}+y\underset{\sim}{j}+z\underset{\sim}{k},\ x+y=0,\ x-y=0\Rightarrow x=0,\ y=0" />
      <br />
      <Katex tex="\Rightarrow\underset{\sim}{n}=\pm\underset{\sim}{k},\ \left|\underset{\sim}{c}.\underset{\sim}{n}\right|=3" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{n} = x\underset{\sim}{i} + y\underset{\sim}{j} + z\underset{\sim}{k}" />,
    reason: <>Give the unknown vector unknown components; the two dot-product conditions will become equations in <Katex tex="x" />, <Katex tex="y" /> and <Katex tex="z" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{n} = x+y = 0 \qquad \underset{\sim}{b}\cdot\underset{\sim}{n} = x-y = 0" />,
    reason: <>Perpendicular (orthogonal) vectors have a dot product of zero. Dot <Katex tex="\underset{\sim}{n}" /> with <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}+\underset{\sim}{j}" /> and with <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-\underset{\sim}{j}" />.</>,
  },
  {
    working: <Katex display tex="x+y=0 \text{ and } x-y=0 \;\implies\; x=0,\ y=0" />,
    reason: <>Adding the equations gives <Katex tex="2x=0" />; subtracting them gives <Katex tex="2y=0" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{n} = z\underset{\sim}{k},\quad |\underset{\sim}{n}|=1 \;\implies\; z=\pm1" />,
    reason: <>Neither condition involves <Katex tex="z" />, so <Katex tex="z" /> is free and only the <Katex tex="\underset{\sim}{k}" /> component survives. Unit length means <Katex tex="\sqrt{z^2}=1" />, so <Katex tex="z=\pm1" /> and <Katex tex="\underset{\sim}{n}=\pm\underset{\sim}{k}" />.</>,
    more: (
      <>
        <p>
          This makes sense geometrically: <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> both
          lie flat in the <Katex tex="xy" />-plane (neither has a <Katex tex="\underset{\sim}{k}" /> component), so the only directions perpendicular to both are straight up or
          straight down.
        </p>
        <p>
          Another route: <Katex tex="\underset{\sim}{a}\times\underset{\sim}{b}" /> is perpendicular to both{' '}
          <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />. Here{' '}
          <Katex tex="\underset{\sim}{a}\times\underset{\sim}{b}=-2\underset{\sim}{k}" />, which has length 2, so dividing
          by 2 gives the unit vector <Katex tex="-\underset{\sim}{k}" />; its negative <Katex tex="\underset{\sim}{k}" />{' '}
          works too.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{c}\cdot\underset{\sim}{n} = \left(\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}\right)\cdot\left(\pm\underset{\sim}{k}\right) = \pm3" />,
    reason: <>Only the <Katex tex="\underset{\sim}{k}" /> component of <Katex tex="\underset{\sim}{c}" /> contributes. The sign depends on which of the two unit vectors is taken, which is why the question asks for the modulus.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{c}\cdot\underset{\sim}{n}\right| = 3}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: (
      <>
        Option <b>E</b>, the most common wrong answer (19%), is twice the answer. It comes from the cross-product
        route above with the division skipped: using <Katex tex="-2\underset{\sim}{k}" /> itself as{' '}
        <Katex tex="\underset{\sim}{n}" /> gives <Katex tex="\left|\underset{\sim}{c}\cdot(-2\underset{\sim}{k})\right|=6" />.
        Whenever a question asks for a{' '}
        <em>unit</em> vector, divide by the length before using it.
      </>
    ),
  },
]

export default function SpecialistQ14_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="\underset{\sim}{a} = \underset{\sim}{i}+\underset{\sim}{j}" />, <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{c} = \underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}" />.
          <br />
          If <Katex tex="\underset{\sim}{n}" /> is a unit vector such that <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{n}=0" /> and{' '}
          <Katex tex="\underset{\sim}{b}\cdot\underset{\sim}{n}=0" />, then <Katex tex="\left|\underset{\sim}{c}\cdot\underset{\sim}{n}\right|" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" /> },
        { letter: 'E', content: <Katex tex="6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
