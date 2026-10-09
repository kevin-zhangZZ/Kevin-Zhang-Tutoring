// 2023 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 45% correct.
// A dropped object keeps the upward velocity of whatever it was dropped from. Question text transcribed from the original paper.
// Solution is original. The report's comment writes +½(9.8)t² for ½(−9.8)t² (a sign slip); kept
// verbatim and explained in the final row's `more`. Option B (2.98) matches no natural slip we
// could reconstruct, so it is not explained.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 10, C: 22, D: 19, E: 45 },
  answer: 'E',
  comment: (
    <>
      <Katex tex="s=ut+\tfrac12at^2" />, <Katex tex="-80=2.5t+\tfrac12(9.8)t^2" />,{' '}
      <Katex tex="t=4.30" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = +2.5\ \mathrm{m\,s^{-1}} \ \text{(upwards, with the balloon)}" />,
    reason: <>The phone is <em>dropped</em>, not thrown, so at the instant it is let go it is still moving with the balloon: <Katex tex="2.5\ \mathrm{m\,s^{-1}}" /> upwards.</>,
    more: (
      <>
        Letting go removes the hand&apos;s support, but it cannot change the phone&apos;s velocity instantly. Gravity then slows it down, so it keeps rising for a
        fraction of a second before it stops and starts to fall.
      </>
    ),
  },
  {
    working: <Katex display tex="a = -9.8\ \mathrm{m\,s^{-2}}, \qquad s = -80\ \mathrm{m}" />,
    reason: <>Take up as positive. Gravity pulls down, so <Katex tex="a=-9.8" />; the ground is 80 m <em>below</em> the release point, so the displacement is <Katex tex="s=-80" />.</>,
    more: (
      <>
        <Katex tex="s" /> is displacement (where the phone finishes relative to where it started), not distance
        travelled. Because the phone rises a little first, it travels slightly more than 80 m in total, but it ends
        80 m below its starting point. Any sign convention works as long as <Katex tex="u" />, <Katex tex="a" /> and{' '}
        <Katex tex="s" /> all use the same one: with down positive, <Katex tex="u=-2.5" />, <Katex tex="a=9.8" /> and{' '}
        <Katex tex="s=80" />, which leads to the same quadratic.
      </>
    ),
  },
  {
    working: <Katex display tex="s = ut+\tfrac12at^2 \implies -80 = 2.5t-4.9t^2" />,
    reason: <>We know <Katex tex="s" />, <Katex tex="u" /> and <Katex tex="a" /> and want <Katex tex="t" />, so use the constant-acceleration formula that has no <Katex tex="v" /> in it.</>,
  },
  {
    working: <Katex display tex="4.9t^2-2.5t-80 = 0" />,
    reason: <>Rearranged into standard form, ready for the quadratic formula (or <Cas fn="solve" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t &= \frac{2.5\pm\sqrt{2.5^2+4(4.9)(80)}}{2(4.9)} \\ &= \frac{2.5\pm\sqrt{1574.25}}{9.8} \\ &\approx 4.304 \ \text{ or } \ -3.794 \end{aligned}" />,
    reason: <><Katex tex="t" /> is the time <em>after</em> the drop, so <Katex tex="t \ge 0" />: reject <Katex tex="t\approx-3.794" />.</>,
    more: (
      <>
        Check by splitting the motion in two. Rising to the top takes <Katex tex="\tfrac{2.5}{9.8}\approx0.255" /> s
        and lifts the phone <Katex tex="\tfrac{2.5^2}{2(9.8)}\approx0.319" /> m. From there it falls{' '}
        <Katex tex="80.319" /> m from rest, which takes <Katex tex="\sqrt{\tfrac{2(80.319)}{9.8}}\approx4.049" /> s.
        In total, <Katex tex="0.255+4.049\approx4.30" /> s, the same answer.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{t \approx 4.30 \ \text{seconds}}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        <p>
          The two most popular wrong answers both use the wrong starting velocity. Treating the phone as starting from rest
          (<Katex tex="u=0" />) gives <Katex tex="4.9t^2=80" />, <Katex tex="t\approx4.04" />: option <b>D</b>,
          chosen by 19%. Taking the <Katex tex="2.5\ \mathrm{m\,s^{-1}}" /> as downward (<Katex tex="u=-2.5" />) gives{' '}
          <Katex tex="4.9t^2+2.5t-80=0" />, <Katex tex="t\approx3.79" />: option <b>C</b>, the most common wrong
          answer at 22%. That is the size of the root rejected above, because flipping the sign of <Katex tex="u" />{' '}
          flips the sign of both roots. Starting from rest <em>and</em> dropping the <Katex tex="\tfrac12" />{' '}
          (<Katex tex="9.8t^2=80" />) gives <Katex tex="t\approx2.86" />, option <b>A</b>.
        </p>
        <p>
          The examiner&apos;s report writes the equation as <Katex tex="-80=2.5t+\tfrac12(9.8)t^2" />. That is a sign
          slip: with up positive, <Katex tex="a=-9.8" />, so the last term is <Katex tex="\tfrac12(-9.8)t^2=-4.9t^2" />,
          as in the working above. (As printed, the equation has no real solution; the report&apos;s answer,{' '}
          <Katex tex="t=4.30" />, comes from the correct one.)
        </p>
      </>
    ),
  },
]

export default function SpecialistQ13_2023() {
  return (
    <MCQShell
      question={
        <p>
          A tourist in a hot air balloon, which is rising vertically at{' '}
          <Katex tex="2.5\ \mathrm{m\,s^{-1}}" />, accidentally drops a phone over the side when
          the phone is 80 metres above the ground.
          <br />
          Assuming air resistance is negligible, how
          long in seconds, correct to two decimal places, does it take for the phone to hit
          the ground?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2.86" /> },
        { letter: 'B', content: <Katex tex="2.98" /> },
        { letter: 'C', content: <Katex tex="3.79" /> },
        { letter: 'D', content: <Katex tex="4.04" /> },
        { letter: 'E', content: <Katex tex="4.30" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
