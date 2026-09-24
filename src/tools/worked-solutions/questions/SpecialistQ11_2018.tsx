// 2018 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 80% correct. The
// value of m making the acute angle between two vectors 30°. Question text transcribed from
// the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Both roots confirmed in sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 10, C: 80, D: 5, E: 2 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = m(1)+1(m) = 2m" />,
    reason: <>Dot product of <Katex tex="m\underset{\sim}{i}+\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{i}+m\underset{\sim}{j}" />: multiply matching components and add.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right| = \left|\underset{\sim}{b}\right| = \sqrt{m^2+1}" />,
    reason: <>The two vectors are reflections of one another in the line <Katex tex="y=x" />, so they have the same length — which keeps the algebra symmetric.</>,
  },
  {
    working: <Katex display tex="\cos(30^\circ) = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{a}\right|\left|\underset{\sim}{b}\right|} = \frac{2m}{m^2+1}" />,
    reason: <>The angle formula. The product of the two moduli is <Katex tex="\left(\sqrt{m^2+1}\right)^2=m^2+1" />, with no surd left.</>,
  },
  {
    working: <Katex display tex="\frac{\sqrt3}{2} = \frac{2m}{m^2+1} \implies \sqrt3\left(m^2+1\right) = 4m" />,
    reason: <>Cross-multiplying.</>,
  },
  {
    working: <Katex display tex="\sqrt3 m^2 - 4m + \sqrt3 = 0" />,
    reason: <>A quadratic in <Katex tex="m" /> with surd coefficients — awkward-looking but perfectly ordinary.</>,
  },
  {
    working: <Katex display tex="m = \frac{4\pm\sqrt{16-12}}{2\sqrt3} = \frac{4\pm2}{2\sqrt3}" />,
    reason: <>Quadratic formula; the discriminant is <Katex tex="16-4(\sqrt3)(\sqrt3)=16-12=4" />, a perfect square.</>,
  },
  {
    working: <Katex display tex="\boxed{m = \sqrt3 \ \text{ or } \ m = \frac{1}{\sqrt3}}" />,
    reason: <><Katex tex="\tfrac{6}{2\sqrt3}=\tfrac{3}{\sqrt3}=\sqrt3" /> and <Katex tex="\tfrac{2}{2\sqrt3}=\tfrac{1}{\sqrt3}" />. Matches option <b>C</b>. <em>Both</em> are valid — the two are reciprocals, which makes sense: swapping <Katex tex="m" /> for <Katex tex="\tfrac1m" /> just interchanges the roles of <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />, leaving the angle between them unchanged. Option <b>B</b> (<Katex tex="2\pm\sqrt3" />) makes <Katex tex="\tfrac{2m}{m^2+1}=\tfrac12" />, an angle of <Katex tex="60^\circ" /> — what using <Katex tex="\sin(30^\circ)" /> instead of <Katex tex="\cos(30^\circ)" /> gives.</>,
  },
]

export default function SpecialistQ11_2018() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors given by{' '}
          <Katex tex="\underset{\sim}{a}=m\underset{\sim}{i}+\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+m\underset{\sim}{j}" />, where{' '}
          <Katex tex="m\in R" />. If the acute angle between{' '}
          <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> is{' '}
          <Katex tex="30^\circ" />, then <Katex tex="m" /> equals
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt2\pm1" /> },
        { letter: 'B', content: <Katex tex="2\pm\sqrt3" /> },
        { letter: 'C', content: <Katex tex="\sqrt3,\ \dfrac{1}{\sqrt3}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{\sqrt3}{4-\sqrt3}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{\sqrt{39}}{13}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
