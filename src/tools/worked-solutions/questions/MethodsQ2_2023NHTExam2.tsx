// 2023 Mathematical Methods NHT — Exam 2, Section B Question 2 (13 marks). The NHT report gives
// sample answers only, with no statistics. Caffeine in Kim's body: the exponential decay
// C(t) = 65e^(−t/8) (amount, time to reach 10 mg, rate in exact form), then a hybrid model C₂ for
// a second espresso at t = 4 (strictly decreasing, not continuous, maximum, hybrid derivative,
// and when the amount falls by at least 8 mg per hour). Question text transcribed from the
// original paper (no diagram). The graph of C₂ in part e. is this site's own explanatory figure
// (matplotlib) of a function VCAA never drew. Answers checked with sympy and against the VCAA
// report's sample answers: a. 50.6 mg; b. 14 h 58 min; c. 65/(8√e); d. strictly decreasing;
// e. 65e^(−1/2) ≈ 39.4 ≠ 104.4; f. 104.4 mg at t = 4; g. as the report; h. (0, 0.1] ∪ (4, 7.9].
// The report has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, DetailOnly } from '../QuestionParts'
import jumpSrc from './meth-2023nhte2-q2e-jump.png'

const C2_TEX =
  'C_2(t) = \\begin{cases} 65e^{-\\frac{t}{8}} & 0 \\le t < 4 \\\\[4pt] 65\\left(\\dfrac{1-e}{1-\\sqrt{e}}\\right)e^{-\\frac{t}{8}} & t \\ge 4 \\end{cases}'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="C(2) = 65e^{-\frac{2}{8}} = 65e^{-\frac{1}{4}}" />,
    reason: <>Substitute <Katex tex="t=2" /> hours.</>,
  },
  {
    working: <Katex display tex="= 50.622\ldots" />,
  },
  {
    working: <Katex display tex="\boxed{50.6 \text{ mg}}" />,
    reason: <>Correct to one decimal place.</>,
    more: <>Plausible: the starting 65 mg has lost a little under a quarter after 2 hours, since <Katex tex="e^{-1/4}\approx0.78" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="65e^{-\frac{t}{8}} = 10" />,
    reason: <>Set the amount equal to 10 mg and solve for <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="e^{-\frac{t}{8}} = \frac{2}{13}" />,
    reason: <>Divide by 65: <Katex tex="\tfrac{10}{65}=\tfrac{2}{13}" />.</>,
  },
  {
    working: <Katex display tex="-\frac{t}{8} = \log_e\!\left(\frac{2}{13}\right) \implies t = 8\log_e\!\left(\frac{13}{2}\right)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides; <Katex tex="-\log_e\!\left(\tfrac{2}{13}\right)=\log_e\!\left(\tfrac{13}{2}\right)" />.</>,
    more: <>On CAS: <Cas fn="solve">solve(65e^(−t/8) = 10, t)</Cas></>,
  },
  {
    working: <Katex display tex="t = 14.974\ldots \text{ hours}" />,
  },
  {
    working: <Katex display tex="0.974\ldots \times 60 = 58.46\ldots \text{ minutes}" />,
    reason: <>Convert the decimal part of the hours to minutes, using the unrounded value.</>,
    more: <>Rounding to 14.97 first gives 58.2 minutes, which happens to round to the same minute here, but early rounding is how answers drift a minute off. VCAA works in minutes throughout: 898 minutes.</>,
  },
  {
    working: <Katex display tex="\boxed{14 \text{ hours } 58 \text{ minutes}}" />,
    reason: <>Correct to the nearest minute, in hours and minutes as asked.</>,
    more: <>Plausible: the amount halves every <Katex tex="8\log_e 2\approx5.5" /> hours, and 65 → 32.5 → 16.3 → 8.1 takes about three half-lives, so 10 mg arrives a little before 16.6 hours.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="C'(t) = 65 \times \left(-\frac{1}{8}\right)e^{-\frac{t}{8}} = -\frac{65}{8}e^{-\frac{t}{8}}" />,
    reason: <>Chain rule: the derivative of <Katex tex="e^{kt}" /> is <Katex tex="ke^{kt}" />, here with <Katex tex="k=-\tfrac18" />.</>,
  },
  {
    working: <Katex display tex="C'(4) = -\frac{65}{8}e^{-\frac{1}{2}} = -\frac{65}{8\sqrt{e}}" />,
    reason: <><Katex tex="e^{-\frac12}=\tfrac{1}{\sqrt e}" />, which gives the <Katex tex="\sqrt e" /> in the denominator that the required form has.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{65}{8\sqrt{e}} \text{ mg per hour}}" />,
    reason: <>The negative derivative says the amount is falling. The question asks the rate at which it is <em>decaying</em>, and requires <Katex tex="a" /> and <Katex tex="b" /> to be positive, so the rate is given as positive: <Katex tex="a=65" />, <Katex tex="b=8" />.</>,
    more: <>About 4.9 mg per hour. Sanity check: between <Katex tex="t=2" /> and <Katex tex="t=6" /> the amount drops from 50.6 to about 30.7 mg, roughly 5 mg per hour.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1-e}{1-\sqrt e} = \frac{(1-\sqrt e)(1+\sqrt e)}{1-\sqrt e} = 1+\sqrt e" />,
    reason: <>Both <Katex tex="1-e" /> and <Katex tex="1-\sqrt e" /> are negative, so the coefficient is positive. Writing <Katex tex="1-e" /> as a difference of two squares shows exactly what it is.</>,
  },
  {
    working: <Katex display tex="C_2(t) = 65\big(1+\sqrt e\big)e^{-\frac{t}{8}}, \quad t \ge 4" />,
    reason: <>A positive constant (about 172.2) times a decaying exponential.</>,
  },
  {
    working: <Katex display tex="C_2'(t) = -\frac{65\big(1+\sqrt e\big)}{8}e^{-\frac{t}{8}} < 0" />,
    reason: <>The exponential is always positive, so the derivative is negative for every <Katex tex="t>4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Strictly decreasing}}" />,
    reason: <>After the second espresso there is no further intake, so the caffeine only decays, as the model shows.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\lim_{t\to4^-} C_2(t) = 65e^{-\frac{4}{8}} = 65e^{-\frac{1}{2}} \approx 39.4" />,
    reason: <>Approaching <Katex tex="t=4" /> from the left uses the first rule.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} C_2(4) &= 65\left(\frac{1-e}{1-\sqrt e}\right)e^{-\frac{1}{2}} \\ &= 65e^{-\frac{1}{2}} + 65 \approx 104.4\end{aligned}" />,
    reason: <>At <Katex tex="t=4" /> itself the second rule applies (<Katex tex="t\ge4" />). Using <Katex tex="\tfrac{1-e}{1-\sqrt e}=1+\sqrt e" /> from part d., <Katex tex="65(1+\sqrt e)e^{-\frac12}=65e^{-\frac12}+65" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}65e^{-\frac{1}{2}} \ne 65\left(\frac{1-e}{1-\sqrt e}\right)e^{-\frac{1}{2}} \\ (39.4 \ne 104.4) \\ \text{so } C_2 \text{ is not continuous} \\ \text{at } t=4\end{gathered}}" />,
    reason: <>A function is continuous at a point only if the two pieces meet there. They differ by exactly 65 mg, the second espresso. Since <Katex tex="t=4" /> lies in <Katex tex="t>0" />, <Katex tex="C_2" /> is not continuous for <Katex tex="t>0" />. As required.</>,
    more: (
      <>
        The graph shows the jump: the first piece ends at an open circle near 39.4 and the second
        starts at the closed point 104.4.
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-2">
          <img loading="lazy" decoding="async"
            src={jumpSrc}
            alt="This site's own graph of C₂ for t from 0 to 16: a decaying curve from 65 at t = 0 down to an open circle at (4, 39.4), then a jump to a closed point at (4, 104.4) and a second decaying curve from there — not from the VCAA paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </>
    ),
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="0 \le t < 4: \quad C_2 \le C_2(0) = 65" />,
    reason: <>The first piece is decreasing, so its largest value is at the start.</>,
  },
  {
    working: <Katex display tex="t \ge 4: \quad C_2 \le C_2(4) = 104.42\ldots" />,
    reason: <>The second piece is strictly decreasing (part d.), so its largest value is at its left endpoint, which is included (<Katex tex="t\ge4" />).</>,
  },
  {
    working: <Katex display tex="\boxed{104.4 \text{ mg, at } t = 4 \text{ hours}}" />,
    reason: <>Compare the two pieces: <Katex tex="104.4>65" />. Correct to one decimal place, as asked.</>,
    more: <>There is no stationary point: <Katex tex="C_2'" /> is never zero. The maximum is at an endpoint of a piece, the moment the second espresso is consumed. Looking for <Katex tex="C_2'(t)=0" /> finds nothing.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dt}\left(Ae^{-\frac{t}{8}}\right) = -\frac{A}{8}e^{-\frac{t}{8}}" />,
    reason: <>Both pieces have the form <Katex tex="Ae^{-t/8}" />, so differentiate each piece separately with the same rule as part c.</>,
  },
  {
    working: <Katex display tex="\boxed{C_2'(t) = \begin{cases} -\dfrac{65}{8}e^{-\frac{t}{8}} & 0 < t < 4 \\[8pt] -\dfrac{65}{8}\left(\dfrac{1-e}{1-\sqrt e}\right)e^{-\frac{t}{8}} & t > 4 \end{cases}}" />,
    reason: <>Both domains are open. <Katex tex="C_2" /> is not continuous at <Katex tex="t=4" /> (part e.), so it is not differentiable there; and <Katex tex="t=0" /> is an endpoint of the domain, where only a one-sided gradient exists.</>,
    more: <>The second line can also be written <Katex tex="-\tfrac{65(1+\sqrt e)}{8}e^{-t/8}" />. Including <Katex tex="t=4" /> in either piece (<Katex tex="\le" /> or <Katex tex="\ge" />) contradicts part e.: a function has no derivative where it jumps.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="C_2'(t) \le -8" />,
    reason: <>&ldquo;Decreasing by at least 8 mg per hour&rdquo; means the rate of change is <Katex tex="-8" /> or more negative.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}0<t<4: \ \ -\frac{65}{8}e^{-\frac{t}{8}} \le -8 \\ \iff e^{-\frac{t}{8}} \ge \frac{64}{65} \\ \iff t \le 8\log_e\!\left(\frac{65}{64}\right) = 0.124\ldots\end{gathered}" />,
    reason: <>Multiply by <Katex tex="-\tfrac{8}{65}" />, which reverses the inequality, then take logs. The first piece only just exceeds 8 mg per hour: its steepest rate is <Katex tex="\tfrac{65}{8}=8.125" /> at <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}t>4: \ \ -\frac{65\big(1+\sqrt e\big)}{8}e^{-\frac{t}{8}} \le -8 \\ \iff t \le 8\log_e\!\left(\frac{65\big(1+\sqrt e\big)}{64}\right) \\ = 7.916\ldots\end{gathered}" />,
    reason: <>Same steps for the second piece, with coefficient <Katex tex="65(1+\sqrt e)" />.</>,
    more: <>On CAS, define <Katex tex="C_2'" /> as the hybrid from part g. and use <Cas fn="solve">solve(C2′(t) ≤ −8, t)</Cas></>,
  },
  {
    working: <Katex display tex="\boxed{(0,\ 0.1] \cup (4,\ 7.9]}" />,
    reason: <>Each piece&apos;s condition, intersected with that piece&apos;s domain from part g., with endpoints correct to one decimal place. The decrease is fastest just after each espresso and slows as the caffeine runs down, so each interval starts at the espresso.</>,
    more: <><Katex tex="t=4" /> is excluded because <Katex tex="C_2'(4)" /> does not exist, and <Katex tex="t=0" /> because part g.&apos;s first domain is open. The second interval is much longer because there is much more caffeine to decay after the second espresso.</>,
  },
]

export default function MethodsQ2_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (13 marks)</p>
        <p>
          The amount of caffeine present in Kim&apos;s body after they drink espresso coffee can be
          modelled mathematically.
        </p>
        <p>
          Students suggest that the amount of caffeine, <Katex tex="C" /> in milligrams, in
          Kim&apos;s body <Katex tex="t" /> hours after consuming an espresso coffee can be
          modelled by the function <Katex tex="C(t)=65e^{-\frac{t}{8}}" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              <Katex tex="65e^{-t/8}" /> is exponential decay: the amount at the start is 65 mg, and
              in each hour it is multiplied by the same factor <Katex tex="e^{-1/8}\approx0.88" />,
              losing about 12% of whatever is there. So it falls fastest at the start.
            </p>
            <p>
              The second model is a hybrid function. Each piece is easy on its own; the questions
              are about what happens where the pieces meet at <Katex tex="t=4" />: whether they
              join (continuity), whether the derivative exists there, and which piece holds the
              maximum.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Exponential Model"
        marks={1}
        statement={
          <>
            How much caffeine will be present in Kim&apos;s body 2 hours after they consume an
            espresso?
            <br />
            Give your answer in milligrams, correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Exponential Equation"
        marks={2}
        statement={
          <>
            How long will it take for the amount of caffeine in Kim&apos;s body to reach 10
            milligrams after drinking an espresso? Give your answer in hours and minutes, correct
            to the nearest minute.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Rate of Change"
        marks={2}
        statement={
          <>
            At what rate is the amount of caffeine in Kim&apos;s body decaying 4 hours after they
            drink an espresso? Give your answer in milligrams per hour in the form{' '}
            <Katex tex="\dfrac{a}{b\sqrt e}" />, where <Katex tex="a" /> and <Katex tex="b" /> are
            positive integers.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>Kim consumes another espresso coffee 4 hours after consuming the first.</p>
        <p>
          The students then suggest that a more appropriate model for the absorption of caffeine,
          in milligrams, in Kim&apos;s body <Katex tex="t" /> hours after they consume the first
          espresso is
        </p>
        <Katex display tex={C2_TEX} />
      </div>

      <PartCard
        letter="d"
        topic="Strictly Decreasing"
        marks={1}
        statement={
          <>
            When <Katex tex="t\ge4" />, is the function <Katex tex="C_2" /> strictly increasing,
            strictly decreasing or neither?
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Continuity"
        marks={1}
        statement={
          <>
            Show that the function <Katex tex="C_2" /> is not continuous for <Katex tex="t>0" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Maximum"
        marks={2}
        statement={
          <>
            Using <Katex tex="C_2" />, find the maximum amount of active caffeine in Kim&apos;s body
            and the time at which this level was reached. Give the maximum amount of caffeine, in
            milligrams, correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Hybrid Derivative"
        marks={2}
        statement={
          <>
            Find the derivative <Katex tex="C_2'(t)" />, giving your answer as a hybrid function
            that includes the relevant domains.
          </>
        }
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        topic="Derivative Inequality"
        marks={2}
        statement={
          <>
            Use the derivative <Katex tex="C_2'(t)" /> to find the times during which the amount of
            active caffeine is decreasing by at least 8 milligrams per hour. Express your answer in
            interval notation, correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>
    </div>
  )
}
