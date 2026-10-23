// 2025 Specialist NHT — Exam 2, MCQ 15. The NHT report gives the answer key only, with no
// statistics. Vector kinematics: the position vector is given, so solve the vertical component
// = 1.5 for the later (descending) time, then compare the horizontal component with the fielder's
// 60 m. Projectile scenario, but no force analysis: on the current study design. Question text
// transcribed from the original paper (read from the page image; the 2025 paper has no text
// layer). Solution is original; the answer C agrees with the report's key. sympy/numerics:
// t = 3.92195 s, x = 47.063 m, distance 12.937 m.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="19.6t-4.9t^2=1.5" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component of <Katex tex="\underset{\sim}{r}(t)" /> is the ball&apos;s height. Set it equal to the catching height, 1.5 m.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}4.9t^2-19.6t+1.5&=0\\ t&=\frac{19.6\pm\sqrt{354.76}}{9.8}\\ t&\approx0.0781\ \text{or}\ 3.9219\end{aligned}" />,
    reason: <>The ball passes 1.5 m twice: once just after it is hit (going up) and once on the way down. The question says the <b>descending</b> ball, so take the later time, <Katex tex="t\approx3.9219" />.</>,
    more: <>Or <Cas fn="solve">solve(19.6t − 4.9t² = 1.5, t)</Cas>. The vertical velocity <Katex tex="19.6-9.8t" /> is negative for <Katex tex="t>2" />, which confirms the ball is coming down at <Katex tex="t\approx3.92" />.</>,
  },
  {
    working: <Katex display tex="x=12t=12\times3.9219\ldots\approx47.06\ \text{m}" />,
    reason: <>The <Katex tex="\underset{\sim}{i}" /> component is the horizontal distance from <Katex tex="O" />, so this is where the catch happens.</>,
  },
  {
    working: <Katex display tex="60-47.06\approx12.94\ \text{m}" />,
    reason: <>The fielder starts at <Katex tex="60\underset{\sim}{i}" />, further along than the catch, so runs back <Katex tex="60-x" /> metres.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx13\ \text{m}}" />,
    reason: <>Matches option <b>C</b>. Plausible: the ball lands at <Katex tex="x=48" /> (when <Katex tex="t=4" />), so a catch just above the ground is just short of 48 m.</>,
    more: <>Option <b>B</b>, 12, catches the ball at ground level instead: <Katex tex="19.6t-4.9t^2=0" /> gives <Katex tex="t=4" />, <Katex tex="x=48" />, and <Katex tex="60-48=12" />.</>,
  },
]

export default function SpecialistQ15_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          A cricket ball is hit from an origin <Katex tex="O" /> at ground level, on a horizontal oval. Its position at
          time <Katex tex="t" /> seconds is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=12t\,\underset{\sim}{i}+\left(19.6t-4.9t^2\right)\underset{\sim}{j}" />, where{' '}
          <Katex tex="t\geq0" />, <Katex tex="\underset{\sim}{i}" /> is a unit vector in the forward direction and{' '}
          <Katex tex="\underset{\sim}{j}" /> is a unit vector vertically up. Displacement components are measured in
          metres.
          <br />
          A fielder is located at the position <Katex tex="60\underset{\sim}{i}" /> when the ball is hit.
          <br />
          The distance, in metres, the fielder must run to catch the descending ball at a height of 1.5 m above ground
          level is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="11" /> },
        { letter: 'B', content: <Katex tex="12" /> },
        { letter: 'C', content: <Katex tex="13" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="14" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
