// 2025 Specialist NHT — Exam 2, MCQ 11. The NHT report gives the answer key only, with no
// statistics. Kinematics: constant acceleration −g from an initial upward speed u at height h;
// solve s = ut + ½at² for the positive time. No force analysis, so on the current study design.
// Question text transcribed from the original paper (read from the page image; the 2025 paper has
// no text layer). Solution is original; the answer D agrees with the report's key, and sympy's
// solve of h + ut − gt²/2 = 0 gives the two roots (u ± √(u² + 2gh))/g.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Background } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\text{Take up as positive, origin at the ground:}\\ &x_0=h,\quad v_0=u,\quad a=-g\end{aligned}" />,
    reason: <>Once the drone stops working, the only acceleration is gravity, <Katex tex="g" /> downwards. At that moment it is still moving <b>up</b> at <Katex tex="u" />, so it rises a little further before it falls.</>,
    more: <>The speed <Katex tex="u" /> doesn&apos;t vanish when the motor cuts out: the drone keeps its velocity, and gravity then slows it, stops it and brings it back down.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x &= h+ut-\tfrac12gt^2\\ 0 &= h+ut-\tfrac12gt^2\end{aligned}" />,
    reason: <>Constant acceleration, so use <Katex tex="s=ut+\tfrac12at^2" /> from the formula sheet, with the displacement measured from the ground. The drone lands when its height is <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}gt^2-2ut-2h&=0\\ t&=\frac{2u\pm\sqrt{4u^2+8gh}}{2g}\\ &=\frac{u\pm\sqrt{u^2+2gh}}{g}\end{aligned}" />,
    reason: <>Multiply by <Katex tex="-2" /> to get a quadratic in <Katex tex="t" />, then use the quadratic formula and take the factor 2 out of the square root.</>,
    more: <>Or <Cas fn="solve">solve(h + u·t − g·t²/2 = 0, t)</Cas> on CAS.</>,
  },
  {
    working: <Katex display tex="\sqrt{u^2+2gh}>u\implies t=\frac{u-\sqrt{u^2+2gh}}{g}<0" />,
    reason: <>Reject the minus root: it is negative, a time before the drone stopped working.</>,
  },
  {
    working: <Katex display tex="\boxed{t=\frac{u}{g}+\frac{\sqrt{u^2+2gh}}{g}}" />,
    reason: <>Matches option <b>D</b>. Check: with <Katex tex="u=0" /> it becomes <Katex tex="\sqrt{2gh}/g=\sqrt{2h/g}" />, the familiar time to drop from rest.</>,
    more: <>Option <b>C</b>, <Katex tex="-\tfrac ug+\tfrac{\sqrt{u^2+2gh}}{g}" />, is what you get if the drone is taken to be moving <b>down</b> at <Katex tex="u" /> when it stops: <Katex tex="h=ut+\tfrac12gt^2" />. That is shorter than the true time, because it skips the extra rise. Option <b>A</b> ignores <Katex tex="u" /> altogether. Option <b>B</b> adds <Katex tex="\tfrac{2u}{g}" />, the time to rise and come back down to height <Katex tex="h" />, to <Katex tex="\tfrac{\sqrt{2h}}{g}" />, but from height <Katex tex="h" /> the drone is then falling at <Katex tex="u" />, not starting from rest (and <Katex tex="\tfrac{\sqrt{2h}}{g}" /> is not even the time from rest, which is <Katex tex="\sqrt{2h/g}" />).</>,
  },
]

export default function SpecialistQ11_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          A drone is rising vertically. When it reaches a height of <Katex tex="h" /> metres above the ground it is
          travelling at a speed of <Katex tex="u" /> metres per second. At height <Katex tex="h" /> metres the drone stops
          working and it subsequently falls to the ground.
          <br />
          Assuming air resistance is negligible, the time, in seconds, taken for the drone to fall to the ground after it
          stops working is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\sqrt{2h}}{g}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\sqrt{2h}}{g}+\dfrac{2u}{g}" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{u}{g}+\dfrac{\sqrt{u^2+2gh}}{g}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{u}{g}+\dfrac{\sqrt{u^2+2gh}}{g}" />, isAnswer: true },
      ]}
      background={
        <Background title="Free fall is constant acceleration">
          <p>
            With air resistance ignored, anything moving freely near the ground has the same constant
            acceleration, <Katex tex="g\approx9.8\ \mathrm{ms^{-2}}" /> downwards, whether it is going up or
            coming down. So the constant-acceleration formulas apply from the moment the drone stops working.
            Choose one direction as positive and keep every quantity&apos;s sign consistent with it.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
