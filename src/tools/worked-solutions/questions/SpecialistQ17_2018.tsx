// 2018 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 48% correct. A
// camera dropped from an ascending balloon — a constant-acceleration problem whose whole
// difficulty is the non-zero initial velocity.
//
// Motion under gravity is mechanics-flavoured but the mathematics is a quadratic in t from
// constant acceleration, with no force analysis at all. Guide §13.7, and the same reading
// the skip guide already applies to 2016 Exam 2 MCQ 16.
//
// Question text transcribed from the original paper; VCAA printed no diagram and neither
// does the stem here (guide §7). Root checked numerically (3.4050); agrees with itute (E).
// Distractors verified numerically: D = √(100/9.8) = 3.194 (from rest, the report's comment);
// C = root of 4.9t² + 2t − 50 = 0, 2.997 (u = 2 taken downwards); A = √(50/9.8) = 2.259 and
// B = root of 9.8t² − 2t − 50 = 0, 2.363 (the ½ in ½at² dropped). Solution is original.
//
// Interactive (extras): interactives/spec-2018-mcq17-up-then-down — height against time for the
// camera beside the balloon's line; the camera rises for 0.20 s, is back at 50 m heading down at
// 2 m/s at t ≈ 0.41 s, and lands at 3.40 s. Its toggle overlays the from-rest reading (3.19 s).
// WrongMethods: u = 0 (option D, the report's comment) and u = 2 downwards (option C, 19%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const UpThenDown = lazyWidget(() => import('../interactives/spec-2018-mcq17-up-then-down'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 7, C: 19, D: 21, E: 48 },
  answer: 'E',
  noAnswer: 1,
  comment: <>Option D ignores the initial upwards velocity.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = +2 \ \text{m s}^{-1} \ \text{(upwards)}, \qquad a = -9.8 \ \text{m s}^{-2}" />,
    reason: <>Take upwards as positive. Ask what the camera was doing a moment <em>before</em> it was let go: sitting in the tourist's hand, rising with the balloon at <Katex tex="2" /> m s<Katex tex="^{-1}" />. Letting go removes the hand, not the velocity, so <Katex tex="u=+2" />. After that only gravity acts, so <Katex tex="a=-9.8" /> (negative, because it points down).</>,
  },
  {
    working: <Katex display tex="s = -50 \ \text{m}" />,
    reason: <>Displacement is where the camera ends up relative to where it started, not the distance it travels. The ground is <Katex tex="50" /> m <em>below</em> the release point, so <Katex tex="s=-50" /> with upwards positive, even though the camera first rises a little.</>,
  },
  {
    working: <Katex display tex="s = ut + \tfrac12 at^2 \implies -50 = 2t - 4.9t^2" />,
    reason: <>We know <Katex tex="u" />, <Katex tex="a" /> and <Katex tex="s" />, want <Katex tex="t" />, and are told nothing about the final velocity <Katex tex="v" />. So choose the constant-acceleration formula that has no <Katex tex="v" /> in it.</>,
  },
  {
    working: <Katex display tex="4.9t^2 - 2t - 50 = 0" />,
    reason: <>Rearranged into standard quadratic form.</>,
  },
  {
    working: <Katex display tex="t = \frac{2\pm\sqrt{4+980}}{9.8} = \frac{2\pm\sqrt{984}}{9.8}" />,
    reason: <>Quadratic formula, or on CAS <Cas fn="solve">solve(−50 = 2t − 4.9t², t)</Cas>.</>,
  },
  {
    working: <Katex display tex="t = 3.4050\ldots \ \text{ or } \ t = -2.9968\ldots" />,
    reason: <>The negative root is rejected: it is a time before the camera was released.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 3.4 \text{ seconds}}" />,
    reason: <>Matches option <b>E</b>. Option <b>D</b> <Katex tex="(3.2)" /> is <Katex tex="\sqrt{\tfrac{2\times50}{9.8}}\approx3.19" />, the time for a camera released from rest: the report says it ignores the initial upwards velocity. Option <b>C</b> <Katex tex="(3.0)" /> is <Katex tex="2.997" />, the time with the <Katex tex="2" /> m s<Katex tex="^{-1}" /> taken as <em>downwards</em>. Options <b>A</b> and <b>B</b> drop the <Katex tex="\tfrac12" /> in <Katex tex="\tfrac12at^2" />: from rest that gives <Katex tex="\sqrt{\tfrac{50}{9.8}}\approx2.26" />, and with the <Katex tex="2t" /> kept, <Katex tex="9.8t^2-2t-50=0" /> gives <Katex tex="2.36" />. Sense check: a camera that goes up before it comes down must take <em>longer</em> than one released from rest, so the answer has to beat <Katex tex="3.19" />.</>,
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
      extras={
        <>
          <Explore title="The camera goes up before it comes down">
            <UpThenDown />
          </Explore>
          <WrongMethod
            title="“Drops” means it starts from rest, so u = 0"
            source="Examiner's report"
            working={<Katex display tex="-50 = -4.9t^2 \implies t = \sqrt{\tfrac{50}{4.9}} \approx 3.19" />}
          >
            <p>
              This is option D, and it is exactly what the report points to: the initial upwards velocity is ignored. The
              camera was moving up with the balloon, and letting go of it does not stop it. To catch it, ask what the
              object was doing just before release; that is its <Katex tex="u" />. A camera that rises first must take
              longer than one released from rest, so any answer at or below <Katex tex="3.19" /> is wrong.
            </p>
          </WrongMethod>
          <WrongMethod
            title="The camera falls, so its 2 m/s is downwards"
            source="19% chose C"
            working={<Katex display tex="50 = 2t + 4.9t^2 \implies t \approx 3.00" />}
          >
            <p>
              Taking down as positive is fine, but then the balloon's upward <Katex tex="2" /> m s<Katex tex="^{-1}" /> is{' '}
              <Katex tex="u=-2" />, not <Katex tex="+2" />. With <Katex tex="u=+2" /> downwards the camera has been{' '}
              <em>thrown</em> at the ground, and it lands even sooner than one released from rest. That is the check: the
              true answer must be longer than <Katex tex="3.19" />, never shorter.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
