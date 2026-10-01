// 2022 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 30% correct — the
// hardest MCQ on this paper. Probability a projectile clears a horizontal distance, given a
// normally distributed launch angle. Question text transcribed from the original paper.
// Solution is original.
// Checked with scipy: d > 40 ⇔ 26.565° < θ < 63.435° (for 0° < θ < 90°), and
// Pr(26.565 < θ < 63.435) = 0.96947 with σ = 8 (A). With σ = 64 (the variance used as the standard
// deviation) the same interval gives 0.22645 (C). Pr(θ < 26.565) = 0.02684 (E). B (0.937) and D
// (0.149) could not be traced to a single slip, so they are not explained.
// Interactive: meth-2022-mcq20-angle-band (d against θ above, the bell for θ below with the band
// shaded; a distance slider and a σ = 64 toggle for option C).

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const AngleBandWidget = lazyWidget(() => import('../interactives/meth-2022-mcq20-angle-band'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 24, C: 25, D: 13, E: 8 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      Solve <Katex tex="d(\theta)\ge40" /> for <Katex tex="\theta" /> or sketch the graphs.
      <br />
      <Katex tex="26.565\ldots\le\theta\le63.434\ldots" />
      <br />
      <Katex tex="X\sim\mathrm{N}\left(42^\circ,64^\circ\right)" />
      <br />
      <Katex tex="\Pr(26.56\le\theta\le63.43)=0.969" /> correct to three decimal places
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\theta \sim \mathrm{N}(42,\,8^2)" />,
    reason: <>The launch angle in degrees: mean <Katex tex="42" />, standard deviation <Katex tex="8" />. The variance is <Katex tex="8^2=64" />, but CAS asks for the standard deviation, <Katex tex="8" />.</>,
  },
  {
    working: <Katex display tex="50\sin(2\theta) > 40 \iff \sin(2\theta) > 0.8" />,
    reason: <>Turn the distance condition into a condition on <Katex tex="\theta" />, because <Katex tex="\theta" /> is the variable whose distribution we know. Divide both sides by <Katex tex="50" />.</>,
  },
  {
    working: <Katex display tex="0^\circ < \theta < 90^\circ \implies 0^\circ < 2\theta < 180^\circ" />,
    reason: <>An angle of elevation for a kick is between <Katex tex="0^\circ" /> and <Katex tex="90^\circ" />. (The normal model puts essentially no probability outside this range: <Katex tex="0^\circ" /> and <Katex tex="90^\circ" /> are more than 5 standard deviations from <Katex tex="42^\circ" />.)</>,
  },
  {
    working: (
      <>
        <Katex display tex="\sin^{-1}(0.8) < 2\theta < 180^\circ - \sin^{-1}(0.8)" />
        <Katex display tex="53.130^\circ < 2\theta < 126.870^\circ" />
      </>
    ),
    reason: <>On <Katex tex="0^\circ" /> to <Katex tex="180^\circ" />, sine rises to <Katex tex="1" /> at <Katex tex="90^\circ" /> and falls again, symmetrically. So it is above <Katex tex="0.8" /> on a middle interval, between the two angles where it equals <Katex tex="0.8" />. A kick that is too low <b>or</b> too high falls short, so there are two cut-offs. Use degree mode.</>,
  },
  {
    working: <Katex display tex="26.565^\circ < \theta < 63.435^\circ" />,
    reason: <>Halve throughout. On CAS, in degree mode, <Cas fn="solve">solve(50·sin(2θ) &gt; 40, θ) | 0 &lt; θ &lt; 90</Cas> gives this interval in one step.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(26.565 < \theta < 63.435)" />
        <Katex display tex="= \operatorname{normCdf}(26.565,\,63.435,\,42,\,8)" />
      </>
    ),
    reason: <>The event &ldquo;more than 40 m&rdquo; is the same as &ldquo;<Katex tex="\theta" /> in this interval&rdquo;, so their probabilities are equal. Enter <Katex tex="\sigma=8" />, not <Katex tex="64" /> (see <Cas fn="normCdf" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.969}" />,
    reason: <>Matches option <b>A</b>. Sanity check: the interval reaches about <Katex tex="1.9" /> standard deviations below the mean and <Katex tex="2.7" /> above it, so almost all of the probability is inside and the answer must be close to <Katex tex="1" />. Option <b>C</b>, <Katex tex="0.226" />, is what normCdf gives with <Katex tex="\sigma=64" />, the variance entered as the standard deviation. Option <b>E</b>, <Katex tex="0.027" />, is <Katex tex="\Pr(\theta<26.565)" />, the chance of kicking too low.</>,
  },
]

export default function MethodsQ20_2022() {
  return (
    <MCQShell
      question={
        <p>
          A soccer player kicks a ball with an angle of elevation of <Katex tex="\theta^\circ" />, where{' '}
          <Katex tex="\theta" /> is a normally distributed random variable with a mean of{' '}
          <Katex tex="42^\circ" /> and a standard deviation of <Katex tex="8^\circ" />.
          <br />
          The horizontal distance that the ball travels before landing is given by the function{' '}
          <Katex tex="d=50\sin(2\theta)" />.
          <br />
          The probability that the ball travels more than 40 m horizontally before landing is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.969" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="0.937" /> },
        { letter: 'C', content: <Katex tex="0.226" /> },
        { letter: 'D', content: <Katex tex="0.149" /> },
        { letter: 'E', content: <Katex tex="0.027" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="More than 40 m is a band of angles, and almost the whole bell sits inside it">
          <AngleBandWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
