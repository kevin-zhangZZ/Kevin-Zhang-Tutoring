// 2023 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 32% correct.
// Distance travelled, not displacement: the ball goes up before it comes down. Question text transcribed from the original paper.
// Solution is original.
// Widget (extras): interactives/spec-2023-mcq16-up-and-down.tsx — the height graph with "up" and
// "down" bars filling as the ball flies: the climb starts at 1.5 m (≈ 11.48 m, not 13), the fall is
// ≈ 12.98 m, distance adds them (D) while displacement subtracts them (A); a toggle shows E's 2 × 13.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const UpDownWidget = lazyWidget(() => import('../interactives/spec-2023-mcq16-up-and-down'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 13, C: 23, D: 32, E: 23 },
  answer: 'D',
  comment: (
    <>
      Max. height = 13 m; 2 × 13 = 26 m
      <br />
      Ball thrown from a height of 1.5 m (<Katex tex="t=0" />), so total vertical distance
      travelled is 26.0 − 1.5 = 24.5 m
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z(t) = 15t-4.9t^2+1.5" />,
    reason: (
      <>
        Call the <Katex tex="\underset{\sim}{k}" /> component <Katex tex="z(t)" />: it is the ball&apos;s height above the
        ground. Vertical distance depends only on height, and the <Katex tex="\underset{\sim}{i}" /> and{' '}
        <Katex tex="\underset{\sim}{j}" /> components (east and north) move the ball sideways without changing its height,
        so ignore them.
      </>
    ),
  },
  {
    working: <Katex display tex="z(0) = 1.5 \ \text{m}" />,
    reason: (
      <>
        <Katex tex="O" /> is at ground level, so the ball is released <Katex tex="1.5" /> m <b>above</b> the ground — it
        does not start at height <Katex tex="0" />. This is the detail that separates <b>D</b> from <b>E</b>.
      </>
    ),
  },
  {
    working: <Katex display tex="\dot z(t) = 15-9.8t = 0 \implies t = \frac{15}{9.8} \approx 1.531" />,
    reason: (
      <>
        At the top of its flight the ball stops rising and starts falling, so its vertical velocity{' '}
        <Katex tex="\dot z" /> is <Katex tex="0" /> there. Before this time <Katex tex="\dot z > 0" /> (rising, e.g.{' '}
        <Katex tex="\dot z(0) = 15" />); after it <Katex tex="\dot z < 0" /> (falling), so the ball goes up once and then
        comes down once.
      </>
    ),
  },
  {
    working: <Katex display tex="z_{\max} = z\!\left(\tfrac{15}{9.8}\right) \approx 12.98 \ \text{m}" />,
    reason: (
      <>
        Substitute this <Katex tex="t" /> (unrounded) back into <Katex tex="z(t)" /> to get the greatest height above the
        ground, about <Katex tex="13.0" /> m.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \text{up} &= 12.98-1.5 = 11.48 \ \text{m} \\ \text{down} &= 12.98-0 = 12.98 \ \text{m} \end{aligned}"
      />
    ),
    reason: (
      <>
        Going up, the ball rises from its release height <Katex tex="1.5" /> m to the top. Coming down, it falls from the
        top all the way to the ground, height <Katex tex="0" />. <b>Distance</b> travelled counts every metre moved,
        whichever direction, so the two legs are added; <b>displacement</b> (final height minus starting height) would
        let the fall cancel the climb.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{11.48+12.98 \approx 24.5 \ \text{m}}" />,
    reason: (
      <>
        Matches option <b>D</b>. Option <b>E</b>, <Katex tex="26.0" />, is <Katex tex="2\times13" />: it counts the climb
        as the full <Katex tex="13" /> m, which is only right for a ball released at ground level. <b>C</b>,{' '}
        <Katex tex="13.0" />, is the maximum height, which is the fall alone, and <b>B</b>, <Katex tex="11.5" />, is the
        climb alone. <b>A</b>, <Katex tex="1.5" />, is the size of the vertical displacement: the ball starts{' '}
        <Katex tex="1.5" /> m up and ends at <Katex tex="0" />, so <Katex tex="11.48-12.98=-1.5" />.
      </>
    ),
  },
]

export default function SpecialistQ16_2023() {
  return (
    <MCQShell
      question={
        <p>
          A student throws a ball for his dog to retrieve. The position vector of the ball,
          relative to an origin <Katex tex="O" /> at ground level <Katex tex="t" /> seconds
          after release, is given by{' '}
          <Katex tex="\underset{\sim}{r}_B(t)=5t\underset{\sim}{i}+7t\underset{\sim}{j}+\left(15t-4.9t^2+1.5\right)\underset{\sim}{k}" />
          . Displacement components are measured in metres, where{' '}
          <Katex tex="\underset{\sim}{i}" /> is a unit vector to the east,{' '}
          <Katex tex="\underset{\sim}{j}" /> is a unit vector to the north and{' '}
          <Katex tex="\underset{\sim}{k}" /> is a unit vector vertically up.
          <br />
          The total <b>vertical</b> distance, in metres, travelled by the ball before it hits
          the ground is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.5" /> },
        { letter: 'B', content: <Katex tex="11.5" /> },
        { letter: 'C', content: <Katex tex="13.0" /> },
        { letter: 'D', content: <Katex tex="24.5" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="26.0" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Distance adds the climb and the fall — and the climb starts 1.5 m up">
          <UpDownWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
