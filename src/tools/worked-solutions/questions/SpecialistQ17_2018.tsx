// 2018 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 48% correct. A
// camera dropped from an ascending balloon — a constant-acceleration problem whose whole
// difficulty is the non-zero initial velocity.
//
// Motion under gravity is mechanics-flavoured but the mathematics is a quadratic in t from
// constant acceleration, with no force analysis at all. Guide §13.7, and the same reading
// the skip guide already applies to 2016 Exam 2 MCQ 16.
//
// Question text transcribed from the original paper; VCAA printed no diagram and neither
// does the stem here (guide §7). Root checked numerically (3.4050). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 7, C: 19, D: 21, E: 48 },
  answer: 'E',
  noAnswer: 1,
  comment: <>Option D ignores the initial upwards velocity.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = +2 \ \text{m s}^{-1} \ \text{(upwards)}, \qquad a = -9.8 \ \text{m s}^{-2}" />,
    reason: <>Take upwards as positive. The camera does not start at rest — it is moving with the balloon at the moment it is released, and keeping that <Katex tex="+2" /> is the entire question.</>,
  },
  {
    working: <Katex display tex="s = -50 \ \text{m}" />,
    reason: <>The ground is <Katex tex="50" /> m <em>below</em> the release point, so the displacement is negative in this sign convention.</>,
  },
  {
    working: <Katex display tex="s = ut + \tfrac12 at^2 \implies -50 = 2t - 4.9t^2" />,
    reason: <>The constant-acceleration displacement formula.</>,
  },
  {
    working: <Katex display tex="4.9t^2 - 2t - 50 = 0" />,
    reason: <>Rearranged into standard quadratic form.</>,
  },
  {
    working: <Katex display tex="t = \frac{2\pm\sqrt{4+980}}{9.8} = \frac{2\pm\sqrt{984}}{9.8}" />,
    reason: <>Quadratic formula.</>,
  },
  {
    working: <Katex display tex="t = 3.4050\ldots \ \text{ or } \ t = -2.9968\ldots" />,
    reason: <>The negative root is rejected: it corresponds to a time before the camera was released.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 3.4 \text{ seconds}}" />,
    reason: <>Matches option <b>E</b>. Option <b>D</b> <Katex tex="(3.2)" />, chosen by <Katex tex="21\%" />, is <Katex tex="\sqrt{\tfrac{2\times50}{9.8}}=3.19" /> — the answer if the camera were simply dropped from rest. The report says exactly this: it ignores the initial upwards velocity. The true time must be <em>longer</em>, since the camera first rises a little before falling.</>,
  },
]

export default function SpecialistQ17_2018() {
  return (
    <MCQShell
      question={
        <p>
          A tourist standing in the basket of a hot air balloon is ascending at{' '}
          <Katex tex="2" /> m s<Katex tex="^{-1}" />. The tourist drops a camera over the side
          when the balloon is <Katex tex="50" /> m above the ground. Neglecting air
          resistance, the time in seconds, correct to the nearest tenth of a second, taken for
          the camera to hit the ground is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2.3" /> },
        { letter: 'B', content: <Katex tex="2.4" /> },
        { letter: 'C', content: <Katex tex="3.0" /> },
        { letter: 'D', content: <Katex tex="3.2" /> },
        { letter: 'E', content: <Katex tex="3.4" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="&quot;Drops&quot; does not mean &quot;from rest&quot;">
          <p>
            The camera is travelling upwards at <Katex tex="2" /> m s<Katex tex="^{-1}" />{' '}
            with the balloon when it leaves the tourist's hand, and nothing about letting go
            changes that. It continues upwards briefly, stops, then falls — so it takes{' '}
            <em>longer</em> to reach the ground than a camera simply released from rest at the
            same height.
          </p>
          <p>
            Set a sign convention before substituting anything, and hold to it. With upwards
            positive: <Katex tex="u=+2" />, <Katex tex="a=-9.8" />, and the displacement to
            the ground is <Katex tex="-50" />, not <Katex tex="+50" />.
          </p>
        </Background>
      }
    />
  )
}
