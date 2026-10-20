// 2022 Specialist NHT — Exam 2, MCQ 4. The NHT report gives the answer key only, with no
// statistics. Complex numbers: reading the centre and radius of the circle |z − 2 + 2√3i| = 4.
// Question text transcribed from the original paper. Solution is original; the answer D agrees
// with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z-(2-2\sqrt3\,i)|=4" />,
    reason: <>Write the relation as <Katex tex="|z-z_0|=r" />: group the constants after a minus sign, so <Katex tex="-2+2\sqrt3\,i=-(2-2\sqrt3\,i)" />.</>,
    more: <><Katex tex="|z-z_0|" /> is the distance from the point <Katex tex="z" /> to the fixed point <Katex tex="z_0" />, so <Katex tex="|z-z_0|=r" /> is every point at distance <Katex tex="r" /> from <Katex tex="z_0" />: a circle with centre <Katex tex="z_0" /> and radius <Katex tex="r" />.</>,
  },
  {
    working: <Katex display tex="z_0=2-2\sqrt3\,i\ \to\ (2,-2\sqrt3),\qquad r=4" />,
    reason: <>The centre is the point with real part <Katex tex="2" /> and imaginary part <Katex tex="-2\sqrt3" />; the radius is the number on the right, <Katex tex="4" /> itself (not its square root).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}|(x-2)+(y+2\sqrt3)i|&=4\\ (x-2)^2+(y+2\sqrt3)^2&=16\end{aligned}" />,
    reason: <>Check in Cartesian form: put <Katex tex="z=x+yi" />, take the modulus and square both sides. This is the circle with centre <Katex tex="(2,-2\sqrt3)" /> and radius <Katex tex="\sqrt{16}=4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(2,-2\sqrt3),\ 4}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option A takes the centre from the signs as printed in <Katex tex="z-2+2\sqrt3\,i" />, without first writing it as <Katex tex="z-(\ldots)" />; option E does the same and also halves the radius. Option C has the right centre but radius <Katex tex="2=\sqrt4" />, as if the <Katex tex="4" /> were <Katex tex="r^2" /> in a Cartesian equation.</>,
  },
]

export default function SpecialistQ4_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          The relation <Katex tex="\left|z-2+2\sqrt3\,i\right|=4" /> represents a circle with centre and radius respectively
          given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(-2,\,2\sqrt3\right),\ 4" /> },
        { letter: 'B', content: <Katex tex="\left(-2\sqrt3,\,2\right),\ 4" /> },
        { letter: 'C', content: <Katex tex="\left(2,\,-2\sqrt3\right),\ 2" /> },
        { letter: 'D', content: <Katex tex="\left(2,\,-2\sqrt3\right),\ 4" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\left(-2,\,2\sqrt3\right),\ 2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
