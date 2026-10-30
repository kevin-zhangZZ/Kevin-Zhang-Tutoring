// 2022 Specialist NHT — Exam 2, MCQ 12. The NHT report gives the answer key only, with no
// statistics. Vector kinematics: two particles collide when both components of position agree
// at the same time. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_A(t) = \underset{\sim}{r}_B(t)" />,
    reason: <>Colliding means being at the same place <em>at the same time</em>, so both the <Katex tex="\underset{\sim}{i}" /> and the <Katex tex="\underset{\sim}{j}" /> components must agree for one value of <Katex tex="t" />.</>,
    more: <>Paths that merely cross are not enough: the particles could pass through the same point at different times. That is why the same <Katex tex="t" /> goes into both position vectors.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{j}:\ \ 5t-6 &= t^2\\ t^2-5t+6 &= 0\\ (t-2)(t-3) &= 0\end{aligned}" />,
    reason: <>Start with the simpler component: the <Katex tex="\underset{\sim}{j}" /> equation is only a quadratic.</>,
  },
  {
    working: <Katex display tex="t=2 \ \text{ or } \ t=3" />,
    reason: <>These are the only times the particles are at the same height. Each must now be tested in the <Katex tex="\underset{\sim}{i}" /> components.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}t=2:\ \ & 7-\tfrac{25}{2}(2) = -18\\ & 2^3-\tfrac{13}{2}(2)^2 = -18 \ \checkmark\\[4pt] t=3:\ \ & 7-\tfrac{25}{2}(3) = -30.5\\ & 3^3-\tfrac{13}{2}(3)^2 = -31.5 \ \times\end{aligned}" />,
    reason: <>Each pair is A&rsquo;s <Katex tex="\underset{\sim}{i}" /> component, then B&rsquo;s. At <Katex tex="t=2" /> they agree too, so the particles are at the same point, <Katex tex="(-18,\,4)" />. At <Katex tex="t=3" /> they are at the same height but 1 unit apart horizontally.</>,
  },
  {
    working: <Katex display tex="\boxed{t=2}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Each wrong option satisfies only one component. Option <b>D</b>, 3, is the other root of the <Katex tex="\underset{\sim}{j}" /> equation, rejected above. Options <b>B</b> and <b>E</b>, 1 and 3.5, are the other roots of the <Katex tex="\underset{\sim}{i}" /> equation <Katex tex="2t^3-13t^2+25t-14=0" />, which factorises as <Katex tex="(t-1)(t-2)(2t-7)=0" />; at those times the particles are level horizontally but not vertically. Option <b>A</b>, 0, fails both: at <Katex tex="t=0" /> particle A is at <Katex tex="(7,-6)" /> and particle B is at the origin. Only <Katex tex="t=2" /> is a root of both equations.</>,
  },
]

export default function SpecialistQ12_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          The positions of two particles are given by{' '}
          <Katex tex="\underset{\sim}{r}_A(t)=\left(7-\dfrac{25}{2}t\right)\underset{\sim}{i}+(5t-6)\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{r}_B(t)=\left(t^3-\dfrac{13}{2}t^2\right)\underset{\sim}{i}+(t^2)\underset{\sim}{j}" /> at
          time <Katex tex="t" /> seconds, where <Katex tex="t\geq0" />.
          <br />
          The time, in seconds, at which the particles collide is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="3" /> },
        { letter: 'E', content: <Katex tex="3.5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
