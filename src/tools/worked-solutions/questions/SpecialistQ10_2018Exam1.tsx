// 2018 Specialist Mathematics — Exam 1, Question 10 (5 marks). Arc length of a curve given
// by a position vector, reduced to a prescribed quadratic integrand. Question text
// transcribed from the original paper (no diagram given). Answer checked independently with
// sympy and against the VCAA examination report and itute (both a = −1, b = 0, c = 2).
//
// Arc length in PARAMETRIC form is current content; only the cartesian-form version was
// removed from the study design, so this question stays in (guide §13.7, and the skip
// guide's own note on the 2019 parametric case). Solution is original.
//
// Interactives: spec-2018e1-q10-area (y(t) is twice the area under the quarter circle from 0
// to t, a sector plus a triangle, which is why dy/dt collapses to 2√(1 − t²); a toggle drops
// the arcsin term and the triangle alone starts shrinking past t = 1/√2) and
// spec-2018e1-q10-speed (the velocity triangle with legs t² and 2√(1 − t²) and hypotenuse
// 2 − t², beside the speed–time graph whose area is the distance; a toggle shows t² − 2 sitting
// below the axis on the whole domain and giving −87/64). Common Mistake boxes: ignoring the
// arcsin term and taking √((t² − 2)²) = t² − 2, both named in the report.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const AreaWidget = lazyWidget(() => import('../interactives/spec-2018e1-q10-area'))
const SpeedWidget = lazyWidget(() => import('../interactives/spec-2018e1-q10-speed'))

const EXAM: SAExaminerStats = {
  marks: [35, 22, 24, 17, 0, 2],
  average: 1.3,
  comment: (
    <>
      Only a few students obtained full marks for this question. Most students recognised
      that the arc length formula needed to be applied, but some had difficultly
      differentiating <Katex tex="\arcsin(t)+t\sqrt{1-t^2}" />. A number of students applied
      the product and chain rule correctly to the <Katex tex="t\sqrt{1-t^2}" /> term and
      ignored the <Katex tex="\arcsin(t)" /> term. Many students had difficulty simplifying{' '}
      <Katex tex="\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2" /> and were
      unable to proceed further. Of those students who were able to find that{' '}
      <Katex tex="d=\displaystyle\int_0^{\frac34}\sqrt{\left(t^2-2\right)^2}\,dt" />, only a small
      number recognised the significance of the domain <Katex tex="0\le t\le1" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="d = \int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>&ldquo;Distance along the curve&rdquo; is arc length: add up speed &times; time. The speed is the length of the velocity vector, <Katex tex="\sqrt{\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2}" />, so <Katex tex="d=\int\text{speed}\,dt" />. The target <Katex tex="\int_0^{3/4}\left(at^2+bt+c\right)dt" /> has no square root, which tells you the sum of squares must come out as a perfect square. (The report notes the <Katex tex="dt" /> was frequently missing from integrals in this question, so write it.)</>,
  },
  {
    working: <Katex display tex="x = \frac{t^3}{3} \implies \frac{dx}{dt} = t^2" />,
    reason: <>Differentiate each component of <Katex tex="\underset{\sim}{r}(t)" /> separately. Here the power rule is enough.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dt}\bigl(\arcsin(t)\bigr) = \frac{1}{\sqrt{1-t^2}}" />,
    reason: <>Standard derivative from the formula sheet. Don&apos;t drop this term: the report notes a number of students differentiated <Katex tex="t\sqrt{1-t^2}" /> correctly and ignored the <Katex tex="\arcsin(t)" /> term.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dt}\left(t\sqrt{1-t^2}\right) = \sqrt{1-t^2} + t\cdot\frac{-t}{\sqrt{1-t^2}}" />,
    reason: <>Product rule with <Katex tex="u=t" /> and <Katex tex="v=\sqrt{1-t^2}" />, and the chain rule on <Katex tex="v" /> giving <Katex tex="\tfrac{-2t}{2\sqrt{1-t^2}}=\tfrac{-t}{\sqrt{1-t^2}}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\left(1-t^2\right)-t^2}{\sqrt{1-t^2}} = \frac{1-2t^2}{\sqrt{1-t^2}}" />,
    reason: <>Write <Katex tex="\sqrt{1-t^2}" /> as <Katex tex="\tfrac{1-t^2}{\sqrt{1-t^2}}" /> so everything is over <Katex tex="\sqrt{1-t^2}" />, the denominator the arcsin derivative already has. Aim for one fraction you can add to it.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dt} = \frac{1}{\sqrt{1-t^2}} + \frac{1-2t^2}{\sqrt{1-t^2}} = \frac{2-2t^2}{\sqrt{1-t^2}}" />,
    reason: <>Adding the two pieces. Both terms share the same denominator, so they combine immediately. The arcsin term is what turns <Katex tex="1-2t^2" /> into <Katex tex="2-2t^2" />, a multiple of <Katex tex="1-t^2" />.</>,
  },
  {
    working: <Katex display tex="= \frac{2\left(1-t^2\right)}{\sqrt{1-t^2}} = 2\sqrt{1-t^2}" />,
    reason: <>Cancel: <Katex tex="\tfrac{1-t^2}{\sqrt{1-t^2}}=\sqrt{1-t^2}" />, since <Katex tex="\tfrac{u}{\sqrt u}=\sqrt u" />. Simplify <em>before</em> squaring; the next step is then one line.</>,
    more: <>The first interactive below shows why the answer is this tidy.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 &= t^4 + 4\left(1-t^2\right)\\ &= t^4-4t^2+4\end{aligned}" />,
    reason: <>Square each: <Katex tex="\left(t^2\right)^2=t^4" /> and <Katex tex="\left(2\sqrt{1-t^2}\right)^2=4\left(1-t^2\right)" />, so the square root disappears. The report notes many students had difficulty simplifying this sum and were unable to proceed further.</>,
  },
  {
    working: <Katex display tex="t^4-4t^2+4 = \left(t^2-2\right)^2" />,
    reason: <>How to spot it: this is a quadratic in <Katex tex="t^2" />. With <Katex tex="u=t^2" /> it reads <Katex tex="u^2-4u+4=(u-2)^2" />. The answer form had already promised a perfect square, so look for one.</>,
  },
  {
    working: <Katex display tex="\sqrt{\left(t^2-2\right)^2} = \left|t^2-2\right| = 2-t^2 \quad \text{for } 0\le t\le1" />,
    reason: <>The square root sign means the non-negative root, so <Katex tex="\sqrt{u^2}=|u|" />, not <Katex tex="u" />. On the domain <Katex tex="t^2\le1" />, so <Katex tex="t^2-2\le-1" /> is negative and <Katex tex="\left|t^2-2\right|=-(t^2-2)=2-t^2" />. It has to be positive: it is the speed, the length of the velocity vector. The report says only a small number of the students who reached <Katex tex="\sqrt{\left(t^2-2\right)^2}" /> recognised the significance of the domain <Katex tex="0\le t\le1" />, and it lists not checking that the answer was reasonable as a weakness in this question.</>,
  },
  {
    working: <Katex display tex="d = \int_0^{3/4}\left(-t^2+0\cdot t+2\right)dt" />,
    reason: <>Write <Katex tex="2-t^2" /> as <Katex tex="-1\cdot t^2+0\cdot t+2" /> to read off the coefficients against <Katex tex="\int_0^{3/4}\left(at^2+bt+c\right)dt" />. The report gives its answer as <Katex tex="\int_0^{3/4}\left(2-t^2\right)dt" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -1, \quad b = 0, \quad c = 2}" />,
    reason: <>All integers, as required. State <Katex tex="b=0" /> too; the question asks for all three. Quick check: <Katex tex="d=\tfrac{87}{64}\approx1.36" /> m, positive as a distance must be (the wrong sign gives <Katex tex="-\tfrac{87}{64}" />). The mark table shows 17% of students on 3 marks, none on 4 and only 2% on full marks.</>,
  },
]

export default function SpecialistQ10_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 10 (5 marks)</p>
        <p className="mb-2">
          The position vector of a particle moving along a curve at time <Katex tex="t" />{' '}
          seconds is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\dfrac{t^3}{3}\,\underset{\sim}{i}+\left(\arcsin(t)+t\sqrt{1-t^2}\right)\underset{\sim}{j},\ 0\le t\le1" />,
          where distances are measured in metres.
        </p>
        <p>
          The distance <Katex tex="d" /> metres that the particle travels along the curve in
          three-quarters of a second is given by{' '}
          <Katex tex="d=\displaystyle\int_0^{3/4}\left(at^2+bt+c\right)dt" />. Find{' '}
          <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />, where{' '}
          <Katex tex="a,b,c\in Z" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The distance travelled along a curve is the integral of the speed:{' '}
            <Katex tex="d=\int_{t_1}^{t_2}\left|\underset{\sim}{\dot r}(t)\right|dt" />, where{' '}
            <Katex tex="\left|\underset{\sim}{\dot r}(t)\right|=\sqrt{\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2}" />.
            The speed is a length, so it is never negative.
          </p>
          <p>
            The question has already told you the answer&apos;s shape: a polynomial with no square
            root in sight. That is a strong hint that{' '}
            <Katex tex="\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2" /> is a
            perfect square, so if your expression does not simplify that way, the
            differentiation has gone wrong somewhere.
          </p>
          <p>
            The <Katex tex="y" /> component is designed to look worse than it is. Both terms
            differentiate to something over <Katex tex="\sqrt{1-t^2}" />, they add cleanly,
            and the result collapses to <Katex tex="2\sqrt{1-t^2}" />.
          </p>
          <p>
            One trap at the end: <Katex tex="\sqrt{u^2}=|u|" />, not <Katex tex="u" />. Here{' '}
            <Katex tex="t^2-2" /> is negative on the whole domain, so the square root is{' '}
            <Katex tex="2-t^2" />, which is why <Katex tex="a=-1" /> rather than{' '}
            <Katex tex="+1" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Why dy/dt collapses to 2√(1 − t²): y is twice an area">
          <AreaWidget />
        </Explore>
        <WrongMethod
          title="Differentiate only the t√(1 − t²) part of the j component"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\frac{dy}{dt}=\frac{1-2t^2}{\sqrt{1-t^2}}" />
              <Katex display tex="\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2=\frac{1-4t^2+5t^4-t^6}{1-t^2}" />
            </>
          }
        >
          That sum is not even a polynomial (<Katex tex="1-t^2" /> does not divide the numerator), so its
          square root can never be <Katex tex="at^2+bt+c" />. When the answer form promises a clean
          integrand and yours won&apos;t simplify, go back to the derivative. The missing{' '}
          <Katex tex="\tfrac{1}{\sqrt{1-t^2}}" /> from <Katex tex="\arcsin(t)" /> is exactly what turns{' '}
          <Katex tex="1-2t^2" /> into <Katex tex="2-2t^2" />.
        </WrongMethod>
        <Explore title="Why the speed is 2 − t², not t² − 2">
          <SpeedWidget />
        </Explore>
        <WrongMethod
          title="√((t² − 2)²) = t² − 2, so a = 1, b = 0, c = −2"
          source="Examiner's report"
          working={<Katex display tex="d=\int_0^{3/4}\left(t^2-2\right)dt=\frac{9}{64}-\frac{3}{2}=-\frac{87}{64}" />}
        >
          A distance can&apos;t be negative, and that is the check to make. The square root always gives the
          non-negative root, so <Katex tex="\sqrt{\left(t^2-2\right)^2}=\left|t^2-2\right|" />. Because{' '}
          <Katex tex="t^2\le1" /> on the domain, <Katex tex="t^2-2" /> is negative throughout and the square
          root is <Katex tex="2-t^2" />. Whenever you take the square root of a square, ask what sign the
          inside has on the domain.
        </WrongMethod>
        <SAExaminerReport stats={EXAM} maxMarks={5} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
