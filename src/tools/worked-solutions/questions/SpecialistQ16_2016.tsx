// 2016 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 46% correct.
// Projectile range from an initial speed and angle. No forces are resolved — the motion
// is gravity-only in the vertical and constant in the horizontal — so the skip guide
// lists this one as doable. Question text transcribed from the original paper; solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 7, C: 28, D: 46, E: 3 },
  answer: 'D',
  noAnswer: 1,
  comment: <>It is simplest to consider vertical and horizontal components of velocity separately.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}u_x &= 20\cos(30^\circ) = 10\sqrt3 \\ u_y &= 20\sin(30^\circ) = 10\end{aligned}" />,
    reason: <>Split the initial velocity into horizontal and vertical components. Keep exact values — every option is exact.</>,
  },
  {
    working: <Katex display tex="\text{vertical: } y = 10t-\tfrac12gt^2" />,
    reason: <>Gravity acts only vertically, so the vertical motion has constant acceleration <Katex tex="-g" />: <Katex tex="y=u_yt-\tfrac12gt^2" />.</>,
  },
  {
    working: <Katex display tex="y = 0 \implies t\left(10-\tfrac{g}{2}t\right) = 0 \implies t = \frac{20}{g}" />,
    reason: <>The ball lands when it is back at ground level; <Katex tex="t=0" /> is the launch, so take the other root.</>,
    more: <>This flight time is option B (7%) — a time in seconds, not a distance.</>,
  },
  {
    working: <Katex display tex="\text{horizontal: } x = 10\sqrt3\,t" />,
    reason: <>No horizontal force, so the horizontal velocity stays <Katex tex="10\sqrt3" /> the whole flight.</>,
  },
  {
    working: <Katex display tex="x = 10\sqrt3\times\frac{20}{g}" />,
    reason: <>Substitute the flight time into the horizontal distance.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{200\sqrt3}{g}}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: (
      <>
        Check: with <Katex tex="g=9.8" /> this is about <Katex tex="35.3" /> m, a plausible
        hit. Option C (28%), <Katex tex="\tfrac{100\sqrt3}{g}" />, is exactly half the
        range: the horizontal distance to the highest point, reached at{' '}
        <Katex tex="t=\tfrac{10}{g}" /> when the vertical velocity is zero.
        Option A (14%),{' '}
        <Katex tex="\tfrac{10\sqrt3}{g}=\tfrac{20\sin(60^\circ)}{g}" />, is the remembered
        range formula <Katex tex="\tfrac{u^2\sin(2\theta)}{g}" /> with <Katex tex="u" /> not
        squared; a speed divided by <Katex tex="g" /> is a time, not a distance. Option E,{' '}
        <Katex tex="\tfrac{400}{g}=\tfrac{20^2}{g}" />, would be the range for a{' '}
        <Katex tex="45^\circ" /> launch, not <Katex tex="30^\circ" />.
      </>
    ),
  },
]

export default function SpecialistQ16_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A cricket ball is hit from the ground at an angle of <Katex tex="30^\circ" /> to
            the horizontal with a velocity of <Katex tex="20" /> m s<Katex tex="^{-1}" />.
            The ball is subject only to gravity and air resistance is negligible.
          </p>
          <p>
            Given that the field is level, the horizontal distance travelled by the ball, in
            metres, to the point of impact is
          </p>
        </>
      }
      background={
        <>
          <p>
            <strong>On the mechanics.</strong> No forces are resolved here: the vertical
            motion is ordinary constant acceleration under gravity, and the horizontal
            motion is constant velocity. The skip guide lists this question as doable as a
            challenge.
          </p>
          <p>
            The method is always the same. Treat the two directions as separate
            one-dimensional problems; the only thing they share is the time. Use the
            vertical motion to find the flight time, then feed that into the horizontal.
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{10\sqrt3}{g}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{20}{g}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{100\sqrt3}{g}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{200\sqrt3}{g}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{400}{g}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
