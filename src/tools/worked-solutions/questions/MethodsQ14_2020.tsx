// 2020 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 44% correct.
// A normal distribution whose mean is tied to its standard deviation. Question text transcribed from the original paper; solution is original.
// Answer A checked with scipy: σ = 5.2/(2 + invNorm(0.1)) = 7.23782, and Pr(X > 5.2) = 0.9000 under
// N(14.4756, 7.2378²). Agrees with the VCAA report and itute. Distractors verified: D = 1.58462 from
// z = +1.2816 (the wrong tail); B = 14.4756 and E = 3.16923 are the means 2σ that go with A and D.
// No clean slip was found for C (3.327), so it is not attributed. Interactive diagram (§15):
// interactives/meth-2020e2-mcq14-ruler.tsx draws the standard normal curve with the X scale as a
// ruler beneath it (x = 2σ + σz): 0 is pinned two standard deviations below the mean, and a σ slider
// moves 5.2 until it cuts off the bottom 10%. This site's own explanatory figure; VCAA printed no
// diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const RulerWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq14-ruler'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 44, B: 8, C: 18, D: 18, E: 11 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="X\sim\mathrm{N}\left(2\sigma,\sigma^2\right)" />
      <br />
      <Katex tex="\Pr(X>5.2)=0.9" />
      <br />
      <Katex tex="\Pr\left(Z<\dfrac{5.2-2\sigma}{\sigma}\right)=0.1" />
      <br />
      Solve <Katex tex="\dfrac{5.2-2\sigma}{\sigma}=-1.281\ldots" />
      <br />
      <Katex tex="\sigma=7.238" /> correct to three decimal places
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\mathrm{N}\left(2\sigma,\sigma^2\right)" />,
    reason: <>"The mean is twice the standard deviation" means <Katex tex="\mu=2\sigma" />. That leaves one unknown instead of two, so the one probability we are given is enough to find it.</>,
  },
  {
    working: <Katex display tex="\Pr(X>5.2) = 0.9 > 0.5 \implies 5.2 < \mu" />,
    reason: <>Sketch before calculating. 90% of the area lies to the right of <Katex tex="5.2" />, which is more than half, so <Katex tex="5.2" /> must be to the <em>left</em> of the mean, and its <Katex tex="z" />-score is negative. This one line is what rules out option D.</>,
  },
  {
    working: <Katex display tex="\Pr(X>5.2)=0.9 \iff \Pr(X<5.2)=0.1" />,
    reason: <><Cas fn="invNorm" /> works with the area to the <em>left</em> of a value, so turn "90% to the right" into "10% to the left".</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.1, 0, 1) = −1.2815…</Cas>,
    reason: <>The standard normal value with 10% of the area to its left: <Katex tex="5.2" /> is <Katex tex="1.28" /> standard deviations below the mean. Negative, as the sketch said.</>,
  },
  {
    working: <Katex display tex="\frac{5.2-2\sigma}{\sigma} = -1.2815\ldots" />,
    reason: <>A <Katex tex="z" />-score counts standard deviations from the mean: <Katex tex="z=\tfrac{x-\mu}{\sigma}" />, with <Katex tex="\mu=2\sigma" />.</>,
  },
  {
    working: <Katex display tex="5.2 = 2\sigma-1.2815\ldots\sigma = 0.7184\ldots\sigma" />,
    reason: <>Multiply through by <Katex tex="\sigma" /> and collect. As a picture: <Katex tex="0" /> is always <Katex tex="2" /> standard deviations below the mean <Katex tex="2\sigma" />, and <Katex tex="5.2" /> is <Katex tex="1.28" /> below it, so the gap from <Katex tex="0" /> to <Katex tex="5.2" /> is <Katex tex="2-1.2815\ldots=0.7184\ldots" /> of a standard deviation.</>,
    more: <>The diagram below shows this.</>,
  },
  {
    working: <Katex display tex="\sigma = \frac{5.2}{0.7184\ldots} = 7.2378\ldots" />,
    reason: <>Keep the unrounded <Katex tex="z" /> until here. On CAS it is one line: <Cas fn="solve">solve(normCdf(5.2, ∞, 2s, s) = 0.9, s) | s &gt; 0</Cas> (the <Katex tex="s>0" /> stops it looking for a negative standard deviation).</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 7.238}" />,
    reason: <>Matches option <b>A</b>. Check: the mean is <Katex tex="2\sigma\approx14.476" />, and <Cas fn="normCdf">normCdf(5.2, ∞, 14.476, 7.238)</Cas> <Katex tex="\approx 0.900" /> ✓. Option <b>D</b>, <Katex tex="1.585" />, comes from using <Katex tex="z=+1.2815" />. Options <b>B</b> and <b>E</b> are the means <Katex tex="2\sigma" /> that go with A and D: <Katex tex="14.476=2\times7.238" /> is the mean, not the standard deviation, and <Katex tex="3.169=2\times1.585" />.</>,
    more: <>See the Common Mistake below.</>,
  },
]

export default function MethodsQ14_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The random variable <Katex tex="X" /> is normally distributed.</p>
          <p className="mb-2">
            The mean of <Katex tex="X" /> is twice the standard deviation of <Katex tex="X" />.
          </p>
          <p>
            If <Katex tex="\Pr(X>5.2)=0.9" />, then the standard deviation of{' '}
            <Katex tex="X" /> is closest to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="7.238" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="14.476" /> },
        { letter: 'C', content: <Katex tex="3.327" /> },
        { letter: 'D', content: <Katex tex="1.585" /> },
        { letter: 'E', content: <Katex tex="3.169" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The mean is 2σ, so 0 always sits two standard deviations below it — slide σ until 5.2 cuts off the bottom 10%">
            <RulerWidget />
          </Explore>
          <WrongMethod
            title="invNorm(0.9) = 1.2816, so the z-score of 5.2 is 1.2816"
            source="18% chose D"
            working={
              <>
                <Katex display tex="\frac{5.2-2\sigma}{\sigma} = 1.2815\ldots \implies 5.2 = 3.2815\ldots\sigma" />
                <Katex display tex="\sigma = 1.585 \quad \text{(option D)}" />
              </>
            }
          >
            <p>
              <Cas fn="invNorm" /> gives the value with the area to its <em>left</em>: <Katex tex="z=1.2816" /> has 90% of the curve
              below it and only 10% above. Put the answer back in and it fails: with <Katex tex="\sigma=1.585" /> the mean is{' '}
              <Katex tex="3.17" />, so <Katex tex="5.2" /> is <em>above</em> the mean and <Katex tex="\Pr(X>5.2)=0.1" />, not{' '}
              <Katex tex="0.9" />.
            </p>
            <p>
              A quick sketch catches it: more than half the area is to the right of <Katex tex="5.2" />, so <Katex tex="5.2" /> is
              below the mean and <Katex tex="z" /> must be negative.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
