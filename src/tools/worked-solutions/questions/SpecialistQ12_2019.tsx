// 2019 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 62% correct. Which
// set of equations expresses a given vector resolute condition. Question text transcribed from
// the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 62, B: 12, C: 12, D: 9, E: 5 },
  noAnswer: 1,
  answer: 'A',
  comment: (
    <>
      Option A gives the set of equations that can be used to obtain the values of{' '}
      <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="p" />. Explicit solution would result
      in a null set as it is not possible for a result of a vector to be of greater magnitude
      than the vector itself.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Vector resolute of } \underset{\sim}{a} \text{ in the direction of } \underset{\sim}{b} = \left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}} = \dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\,\underset{\sim}{b}" />,
    reason: <>The projection of one vector onto another. Writing it with <Katex tex="\left|\underset{\sim}{b}\right|^2" /> avoids square roots, since <Katex tex="\hat{\underset{\sim}{b}}" /> appears twice.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}=\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}, \qquad \underset{\sim}{b}=m\underset{\sim}{i}+n\underset{\sim}{j}+p\underset{\sim}{k}" />,
    reason: <>Naming the two vectors in the question.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = m+n-p, \qquad \left|\underset{\sim}{b}\right|^2 = m^2+n^2+p^2" />,
    reason: <>The dot product and the squared magnitude.</>,
  },
  {
    working: <Katex display tex="\dfrac{m+n-p}{m^2+n^2+p^2}\left(m\underset{\sim}{i}+n\underset{\sim}{j}+p\underset{\sim}{k}\right) = 2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" />,
    reason: <>Set the resolute equal to the given vector.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{m(m+n-p)}{m^2+n^2+p^2}=2" />
        <Katex display tex="\dfrac{n(m+n-p)}{m^2+n^2+p^2}=-3" />
        <Katex display tex="\dfrac{p(m+n-p)}{m^2+n^2+p^2}=1" />
      </>
    ),
    reason: <>Equate components one at a time.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option A}}" />,
    reason: <>Matches option <b>A</b>. Option <b>B</b> puts the components of <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" /> on the right instead of the resolute's, and options <b>C</b>, <b>D</b> and <b>E</b> drop the division by <Katex tex="\left|\underset{\sim}{b}\right|^2" />, so they do not describe the vector resolute. Note the question only asks which equations you would <em>solve</em>, not for the solution. As the report points out, this system actually has no solution (the report's "result of a vector" means the resolute): the resolute <Katex tex="2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" /> has magnitude <Katex tex="\sqrt{14}\approx3.7" />, but a projection can never be longer than the original vector <Katex tex="\underset{\sim}{a}" />, whose magnitude is only <Katex tex="\sqrt3\approx1.7" />.</>,
  },
]

export default function SpecialistQ12_2019() {
  return (
    <MCQShell
      question={
        <p>
          The vector resolute of <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" /> in
          the direction of <Katex tex="m\underset{\sim}{i}+n\underset{\sim}{j}+p\underset{\sim}{k}" /> is{' '}
          <Katex tex="2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" />, where{' '}
          <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="p" /> are real constants.
          <br />
          The values of <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="p" /> can be found by
          solving the equations
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{m(m+n-p)}{m^2+n^2+p^2}=2,\ \tfrac{n(m+n-p)}{m^2+n^2+p^2}=-3 \text{ and } \tfrac{p(m+n-p)}{m^2+n^2+p^2}=1" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\tfrac{m(m+n-p)}{m^2+n^2+p^2}=1,\ \tfrac{n(m+n-p)}{m^2+n^2+p^2}=1 \text{ and } \tfrac{p(m+n-p)}{m^2+n^2+p^2}=-1" /> },
        { letter: 'C', content: <Katex tex="m+n-p=6,\ m+n-p=-9 \text{ and } m+n-p=-3" /> },
        { letter: 'D', content: <Katex tex="m+n-p=3m,\ m+n-p=3n \text{ and } m+n-p=-3p" /> },
        { letter: 'E', content: <Katex tex="m+n-p=2\sqrt3,\ m+n-p=-3\sqrt3 \text{ and } m+n-p=\sqrt3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
