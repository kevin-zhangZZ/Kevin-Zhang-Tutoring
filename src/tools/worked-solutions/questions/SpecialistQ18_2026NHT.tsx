// 2026 Specialist NHT — Exam 2, MCQ 18. The NHT report gives the answer key and a short comment
// only, with no statistics. Vectors: the angle between two planes from their normals; the normals
// meet at 2π/3, so the planes meet at the acute angle π/3. Question text transcribed from the
// original paper. Solution is original; the answer A agrees with the report's key (sympy: the
// normals' angle is 2π/3).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: <>Find angle between two normals and subtract from <Katex tex="\pi" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{n}_1=-\underset{\sim}{i}+\sqrt2\,\underset{\sim}{j}-\underset{\sim}{k},\qquad\underset{\sim}{n}_2=-\underset{\sim}{i}-\sqrt2\,\underset{\sim}{j}+\underset{\sim}{k}" />,
    reason: <>The coefficients of <Katex tex="x" />, <Katex tex="y" /> and <Katex tex="z" /> in a plane&apos;s Cartesian equation are the components of a normal to it. The angle between two planes is the angle between their normals (or its supplement).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{n}_1\cdot\underset{\sim}{n}_2&=(-1)(-1)+(\sqrt2)(-\sqrt2)+(-1)(1)\\ &=1-2-1=-2\\ |\underset{\sim}{n}_1|&=|\underset{\sim}{n}_2|=\sqrt{1+2+1}=2\end{aligned}" />,
  },
  {
    working: <Katex display tex="\cos\theta=\frac{-2}{2\times2}=-\frac12\implies\theta=\frac{2\pi}{3}" />,
    reason: <>This is the angle between the two normal <em>vectors</em>. It is obtuse because the normals happen to point partly away from each other.</>,
  },
  {
    working: <Katex display tex="\pi-\frac{2\pi}{3}=\frac{\pi}{3}" />,
    reason: <>Two intersecting planes make a pair of angles, <Katex tex="\theta" /> and <Katex tex="\pi-\theta" />, and &ldquo;the angle between the planes&rdquo; means the acute one. Reversing one normal (which describes the same plane) would have given <Katex tex="\cos\theta=+\tfrac12" /> directly.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{\pi}{3}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>The normals&apos; own angle, <Katex tex="\tfrac{2\pi}{3}" />, is not among the options; options <b>C</b> and <b>D</b> are obtuse, and an angle between planes is never more than <Katex tex="\tfrac{\pi}{2}" />. Option <b>B</b>, <Katex tex="\tfrac{\pi}{2}" />, would need <Katex tex="\underset{\sim}{n}_1\cdot\underset{\sim}{n}_2=0" />.</>,
  },
]

export default function SpecialistQ18_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          The angle between the planes given by <Katex tex="-x+\sqrt2y-z=2" /> and <Katex tex="-x-\sqrt2y+z=4" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\pi}{3}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{3\pi}{4}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{5\pi}{6}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
