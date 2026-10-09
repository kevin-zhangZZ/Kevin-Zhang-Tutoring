// 2022 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). A separable
// differential equation whose solution involves tan⁻¹, its limiting behaviour, and a second
// particle chasing the first. Question text transcribed from the original paper; the sketch
// is this site's own matplotlib drawing of the answer, on VCAA's grid (t 0 to 10.5 with
// gridlines every 0.5; x 0 to 1.05 with gridlines every 0.05). Answers checked with sympy and
// against the VCAA examination report. Solution is original.
// Interactives: spec-2022e2-q3bi-capped (b.i — each layer of the rule is capped as t → ∞, so x
// is capped at log_e(π/2 + 1), and x = 1 fails) and spec-2022e2-q3bii-grid (b.ii — slide along
// the curve on VCAA's grid and read the gap to the asymptote in grid squares). Both b.i (23%
// full marks) and b.ii (31%) qualify; both widgets were audited 9 Oct 2026 and kept, numbers
// rechecked with sympy. Same review: report commentary, checks, alternatives and the traps moved
// into each row's `more` (Detailed only); part d.'s substitution route moved from a working row
// into `more`; CAS calls added (Define x1 in b.ii., reused in c. and e.); e.'s `more` explains
// the report's "variety of correct equivalent expressions" (its tan⁻¹(1/12) form of v1); the
// Background's fractions paragraph dropped (it repeated a.ii.'s `more`). Final review: e.'s v2
// reason now explains the outer log_e (u'/u) as well as the inner 3; b.ii.'s gradient-2 remark moved
// to `more`; b.ii.'s grid-square claim gives the square size; widget readout/Notice polish.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import sketchSrc from './spec-2022e2-q3b-sketch.png'
import { Explore, lazyWidget } from '../Explore'

const CappedWidget = lazyWidget(() => import('../interactives/spec-2022e2-q3bi-capped'))
const GridWidget = lazyWidget(() => import('../interactives/spec-2022e2-q3bii-grid'))

const EXAM_AI: SAExaminerStats = { marks: [15, 85], average: 0.9 }

const EXAM_AII: SAExaminerStats = {
  marks: [17, 10, 73],
  average: 1.6,
  comment: (
    <>
      This question was generally well responded to. Errors involving fractions in the initial
      integration were apparent.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [77, 23],
  average: 0.2,
  comment: (
    <>
      Relatively few students gave a correct response. Common incorrect responses were{' '}
      <Katex tex="x=1" /> or <Katex tex="y=\log_e\!\left(\tfrac\pi2+1\right)" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [19, 50, 31],
  average: 1.1,
  comment: <>A significant number of responses lacked the required precision.</>,
}

const EXAM_C: SAExaminerStats = { marks: [21, 79], average: 0.8 }

const EXAM_D: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: (
    <>
      Alternatively, many students correctly substituted <Katex tex="t=6" /> into the two
      expressions, quickly verifying the required result.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [27, 12, 50],
  average: 1.1,
  comment: <>A variety of correct equivalent expressions were seen depending on CAS tools used.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = \frac{2e^{-x}}{1+4t^2}" />,
    reason: <>Separable: the right-hand side is a function of <Katex tex="x" /> (<Katex tex="e^{-x}" />) multiplied by a function of <Katex tex="t" /> (<Katex tex="\tfrac{2}{1+4t^2}" />), so all the <Katex tex="x" /> terms can be moved to the left.</>,
  },
  {
    working: <Katex display tex="e^{x}\,\frac{dx}{dt} = \frac{2}{1+4t^2}" />,
    reason: <>Multiply both sides by <Katex tex="e^{x}" />, since <Katex tex="e^{x}\times e^{-x}=1" />. The negative index disappears from the right.</>,
  },
  {
    working: <Katex display tex="\boxed{\int e^{x}\,dx = \int\frac{2}{1+4t^2}\,dt}" />,
    reason: <>Integrate both sides with respect to <Katex tex="t" />; on the left, <Katex tex="\int e^{x}\tfrac{dx}{dt}\,dt=\int e^{x}\,dx" />. This is the form asked for, with <Katex tex="g(x)=e^{x}" /> and <Katex tex="f(t)=\tfrac{2}{1+4t^2}" />.</>,
    more: (
      <>
        Why the <Katex tex="dt" /> becomes <Katex tex="dx" /> on the left: it is the chain rule in reverse.
        Differentiating <Katex tex="e^{x}" /> with respect to <Katex tex="t" /> gives{' '}
        <Katex tex="e^{x}\tfrac{dx}{dt}" />, so integrating <Katex tex="e^{x}\tfrac{dx}{dt}" /> with respect
        to <Katex tex="t" /> gives back <Katex tex="e^{x}" />, which is exactly <Katex tex="\int e^{x}\,dx" />.
      </>
    ),
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\int e^{x}\,dx = \int\frac{2}{1+4t^2}\,dt" />,
    reason: <>From part a.i.</>,
  },
  {
    working: <Katex display tex="\frac{2}{1+4t^2} = \frac{\tfrac24}{\tfrac14+t^2} = \frac{\tfrac12}{\left(\tfrac12\right)^2+t^2}" />,
    reason: <>To use the formula sheet's <Katex tex="\int\tfrac{a}{a^2+t^2}\,dt=\tan^{-1}\!\left(\tfrac ta\right)+c" />, the <Katex tex="t^2" /> must have coefficient 1, so divide the top and bottom by 4. Then <Katex tex="a^2=\tfrac14" /> gives <Katex tex="a=\tfrac12" />, and the numerator <Katex tex="\tfrac24=\tfrac12" /> is exactly <Katex tex="a" />.</>,
    more: (
      <>
        The report notes errors involving fractions in the initial integration, and this rewrite is
        where they creep in. Two easy slips: taking <Katex tex="a=2" /> from the 4 in{' '}
        <Katex tex="4t^2" /> (but it is <Katex tex="a^2" /> that must equal <Katex tex="\tfrac14" />), and
        dividing only the bottom by 4 and forgetting the numerator 2. Writing the extra line out in full,
        as here, is the safeguard.
      </>
    ),
  },
  {
    working: <Katex display tex="\int\frac{\tfrac12}{\left(\tfrac12\right)^2+t^2}\,dt = \tan^{-1}\!\left(\frac{t}{\tfrac12}\right) = \tan^{-1}(2t)" />,
    reason: <>Formula sheet with <Katex tex="a=\tfrac12" />; dividing by <Katex tex="\tfrac12" /> is multiplying by 2.</>,
    more: (
      <>
        Check by differentiating, with the chain rule:{' '}
        <Katex tex="\tfrac{d}{dt}\tan^{-1}(2t)=\tfrac{2}{1+(2t)^2}=\tfrac{2}{1+4t^2}" />, the integrand. Spotting
        this from the start, by reading <Katex tex="1+4t^2" /> as <Katex tex="1+(2t)^2" />, is a quicker
        route that avoids the fractions altogether.
      </>
    ),
  },
  {
    working: <Katex display tex="e^{x} = \tan^{-1}(2t)+c" />,
    reason: <>The left side integrates to <Katex tex="e^{x}" />. One constant <Katex tex="c" /> is enough: the constants from the two sides combine into it.</>,
  },
  {
    working: <><Katex display tex="t=0,\ x=0: \quad e^{0} = \tan^{-1}(0)+c" /><Katex display tex="1 = 0+c \implies c = 1" /></>,
    reason: <>Use the initial condition <Katex tex="x=0" /> when <Katex tex="t=0" /> to find <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="e^{x} = \tan^{-1}(2t)+1" />,
    reason: <>Substitute <Katex tex="c=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \log_e\bigl(\tan^{-1}(2t)+1\bigr)}" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides, which undoes <Katex tex="e^{x}" />. As required.</>,
    more: (
      <>
        The log is defined for every <Katex tex="t\ge0" />: there <Katex tex="\tan^{-1}(2t)\ge0" />, so the
        bracket is at least 1.
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="t\to\infty \implies 2t\to\infty \implies \tan^{-1}(2t)\to\frac\pi2" />,
    reason: (
      <>
        A horizontal asymptote is the horizontal line the graph levels off towards as <Katex tex="t\to\infty" />{' '}
        (<Katex tex="t" /> is time, so this is the only end to check). The range of{' '}
        <Katex tex="\tan^{-1}" /> is <Katex tex="\left(-\tfrac\pi2,\tfrac\pi2\right)" />: as its input
        grows, <Katex tex="\tan^{-1}" /> gets as close as you like to <Katex tex="\tfrac\pi2" /> but never
        reaches it.
      </>
    ),
    more: (
      <>
        The report lists &ldquo;considering limiting behaviour of a function involving inverse
        tangent&rdquo; as an area of weakness, and this is that step. Picture{' '}
        <Katex tex="y=\tan^{-1}(u)" />: it is the graph of <Katex tex="\tan" /> on{' '}
        <Katex tex="\left(-\tfrac\pi2,\tfrac\pi2\right)" /> reflected in the line <Katex tex="y=u" />, so
        that graph&apos;s vertical asymptotes at <Katex tex="\pm\tfrac\pi2" /> become horizontal asymptotes{' '}
        <Katex tex="y=\pm\tfrac\pi2" />. In
        numbers: <Katex tex="\tan^{-1}(20)\approx1.5208" /> and{' '}
        <Katex tex="\tan^{-1}(2000)\approx1.5703" />, creeping up on{' '}
        <Katex tex="\tfrac\pi2\approx1.5708" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\tan^{-1}(2t)+1\to\frac\pi2+1 \implies x \to \log_e\!\left(\frac\pi2+1\right)" />,
    reason: <>Follow the limit through the rest of the rule: add 1, then take <Katex tex="\log_e" />. Both steps are increasing, so <Katex tex="x" /> creeps up towards <Katex tex="\log_e\!\left(\tfrac\pi2+1\right)" /> without reaching it.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \log_e\!\left(\frac\pi2+1\right)} \approx 0.944" />,
    reason: <>The vertical axis is <Katex tex="x" />, not <Katex tex="y" />, so the asymptote is the horizontal line &ldquo;<Katex tex="x=" /> constant&rdquo;.</>,
    more: (
      <>
        The report&apos;s common incorrect responses were <Katex tex="x=1" /> and{' '}
        <Katex tex="y=\log_e\!\left(\tfrac\pi2+1\right)" />. The <Katex tex="y" /> version has the right
        number but the wrong variable: here distance <Katex tex="x" /> is on the vertical axis and time{' '}
        <Katex tex="t" /> on the horizontal one, so a horizontal line is <Katex tex="x=\ldots" />. The line{' '}
        <Katex tex="x=1" /> does sit above the whole curve, but the curve never gets close to it: as{' '}
        <Katex tex="t\to\infty" /> the gap <Katex tex="1-x" /> only shrinks to{' '}
        <Katex tex="1-\log_e\!\left(\tfrac\pi2+1\right)\approx0.056" />, not to 0. An asymptote is the line
        the graph gets as close to as you like.
      </>
    ),
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="t=0: \ x = \log_e(0+1) = 0" />,
    reason: <>The curve starts at the origin, matching the initial condition.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = \frac{2}{\left(1+4t^2\right)\bigl(\tan^{-1}(2t)+1\bigr)} > 0" />,
    reason: <>From the differential equation, with <Katex tex="e^{-x}=\tfrac{1}{e^{x}}=\tfrac{1}{\tan^{-1}(2t)+1}" /> from part a.ii. Both brackets are positive, so the curve rises for all <Katex tex="t\ge0" />, staying below the asymptote it climbs towards.</>,
    more: (
      <>
        At <Katex tex="t=0" /> the gradient is <Katex tex="\tfrac{2}{(1)(1)}=2" />. On VCAA&apos;s grid one
        square is 0.5 across and 0.05 up, so a gradient of 2 climbs 20 squares for every square across: the
        curve leaves <Katex tex="O" /> almost vertically. By <Katex tex="t=1" /> it is
        already at <Katex tex="x\approx0.745" />, and by <Katex tex="t=2" /> at <Katex tex="x\approx0.844" />,
        only two squares under the asymptote. After that it is nearly flat.
      </>
    ),
  },
  {
    working: <Katex display tex="t=10: \ x = \log_e\bigl(\tan^{-1}(20)+1\bigr) = 0.9246\ldots" />,
    reason: <>The point the question asks to be plotted and labelled. On CAS, in radian mode, <Cas fn="define">Define x1(t)=ln(tan⁻¹(2t)+1)</Cas> and enter x1(10).</>,
  },
  {
    working: <><Katex display tex="\boxed{(10,\,0.92)} \ \text{plotted and labelled}" /><Katex display tex="\text{asymptote } x=\log_e\!\left(\tfrac\pi2+1\right) \text{ drawn}" /></>,
    reason: <>The question asks for both the asymptote and the labelled point. The point sits just <em>below</em> the asymptote: 0.9246 against 0.9442, a gap of about 0.02, which is less than half of one grid square (each is 0.05 high).</>,
    more: (
      <>
        The report says a significant number of responses lacked the required precision, and its general
        comments note that some students did not plot the required point. On this grid, precision
        means: the asymptote just under the 0.95 gridline (it is at 0.944), the point{' '}
        <Katex tex="(10,\,0.92)" /> about halfway between the 0.90 and 0.95 gridlines, and the curve passing
        through that point, under the dashed line, never on or above it.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="On VCAA's grid: the curve rising steeply from O and flattening towards the dashed horizontal asymptote x = log_e(π/2 + 1), with the point (10, 0.92) marked just below it"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>The curve starts at <Katex tex="O" />, rises steeply, then flattens towards the dashed asymptote without touching it. The asymptote is labelled with its equation and the point with its coordinates.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{speed} = \left|\frac{dx}{dt}\right| = \frac{2}{\left(1+4t^2\right)\bigl(\tan^{-1}(2t)+1\bigr)}" />,
    reason: <>Velocity is <Katex tex="\tfrac{dx}{dt}" />: substitute <Katex tex="e^{-x}=\tfrac{1}{\tan^{-1}(2t)+1}" /> (from part a.ii.) into the differential equation. It is positive, so the speed equals the velocity.</>,
    more: (
      <>
        Differentiating the rule from part a.ii. with the chain rule gives the same expression:{' '}
        <Katex tex="\tfrac{d}{dt}\log_e\bigl(\tan^{-1}(2t)+1\bigr)=\dfrac{\tfrac{2}{1+4t^2}}{\tan^{-1}(2t)+1}" />.
        Speed is the size of the velocity, so the absolute value only matters if{' '}
        <Katex tex="\tfrac{dx}{dt}" /> could be negative, which it cannot here.
      </>
    ),
  },
  {
    working: <Katex display tex="t=3: \quad \frac{2}{\left(1+36\right)\bigl(\tan^{-1}(6)+1\bigr)} = \frac{2}{37\times2.4056\ldots}" />,
    reason: <>Substitute <Katex tex="t=3" />, with <Katex tex="\tan^{-1}(6)\approx1.4056" /> in radians. On CAS, with x1 defined in part b.ii., <Cas fn="derivative">d/dt(x1(t)) | t=3</Cas> gives the value in one step.</>,
  },
  {
    working: <Katex display tex="\boxed{0.02 \ \mathrm{m\,s^{-1}}}" />,
    reason: <>The value is <Katex tex="0.02247\ldots" />, so two decimal places gives <Katex tex="0.02" />.</>,
    more: (
      <>
        A small answer is what you should expect. By <Katex tex="t=3" /> the particle is already at{' '}
        <Katex tex="x\approx0.878" />, about 93% of the way to the asymptote, so it has all but stopped:
        this is the flattening part of the graph in part b.ii.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e\bigl(\tan^{-1}(2t)+1\bigr) = \log_e\bigl(\tan^{-1}(3t-6)+1\bigr)" />,
    reason: <>Same distance from <Katex tex="O" /> means the same value of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\tan^{-1}(2t) = \tan^{-1}(3t-6) \implies 2t = 3t-6" />,
    reason: <>Both <Katex tex="\log_e" /> and <Katex tex="\tan^{-1}" /> are one-to-one (equal outputs only come from equal inputs), so they can be peeled off.</>,
  },
  {
    working: <Katex display tex="t = 6" />,
    reason: <>The distances are equal at <Katex tex="t=6" /> (and only then), as required.</>,
    more: (
      <>
        The quicker route, which the report notes many students took: substitute <Katex tex="t=6" /> into
        both rules. Since <Katex tex="2(6)=12" /> and <Katex tex="3(6)-6=12" />, both particles are at{' '}
        <Katex tex="x=\log_e\bigl(\tan^{-1}(12)+1\bigr)\approx0.9113" />, the same distance. Solving, as
        above, shows a little more: <Katex tex="t=6" /> is the <em>only</em> time they are level, which part
        e. relies on.
      </>
    ),
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="v_1 = \frac{dx_1}{dt} = \frac{2}{\left(1+4t^2\right)\bigl(\tan^{-1}(2t)+1\bigr)}" />,
    reason: <>The first particle, as in part c. It is positive, so it is also the speed.</>,
  },
  {
    working: <Katex display tex="v_2 = \frac{dx_2}{dt} = \frac{3}{\left(1+(3t-6)^2\right)\bigl(\tan^{-1}(3t-6)+1\bigr)}" />,
    reason: <>Differentiate the second particle&apos;s rule with the chain rule: <Katex tex="\tfrac{d}{dt}\log_e(u)=\tfrac{u'}{u}" />, with <Katex tex="u=\tan^{-1}(3t-6)+1" /> (the second bracket) and <Katex tex="u'=\tfrac{3}{1+(3t-6)^2}" />. The numerator is 3, not 2, because of the <Katex tex="3t" />. Positive, so it is also the speed.</>,
  },
  {
    working: <Katex display tex="t=6: \quad 2t = 12 \ \text{ and } \ 3t-6 = 12" />,
    reason: <>From part d., <Katex tex="t=6" /> is the only time the particles are the same distance from <Katex tex="O" />. Both <Katex tex="\tan^{-1}" /> terms are therefore identical.</>,
  },
  {
    working: <><Katex display tex="v_1 = \frac{2}{145\bigl(\tan^{-1}(12)+1\bigr)}" /><Katex display tex="v_2 = \frac{3}{145\bigl(\tan^{-1}(12)+1\bigr)}" /></>,
    reason: <><Katex tex="1+4(36)=145" /> and <Katex tex="1+12^2=145" />, so the denominators match exactly.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{v_1}{v_2} = \frac{2}{3}}" />,
    reason: <>Everything cancels except the chain-rule factors 2 and 3, so no decimals are needed at any point.</>,
    more: (
      <>
        <p>
          On CAS, <Cas fn="define">Define x2(t)=ln(tan⁻¹(3t−6)+1)</Cas> alongside x1 from part b.ii., then
          divide <Cas fn="derivative">d/dt(x1(t)) | t=6</Cas> by the same derivative of x2 at{' '}
          <Katex tex="t=6" />. In exact mode this returns <Katex tex="\tfrac23" />.
        </p>
        <p>
          Ask CAS for each speed on its own and the exact form you get depends on the CAS, as the report
          notes. The report&apos;s own working shows{' '}
          <Katex tex="v_1=\dfrac{-4}{145\left(2\tan^{-1}\!\left(\tfrac1{12}\right)-\pi-2\right)}" />, where{' '}
          <Katex tex="\tan^{-1}(12)" /> has been rewritten as{' '}
          <Katex tex="\tfrac\pi2-\tan^{-1}\!\left(\tfrac1{12}\right)" />, so the bracket is <Katex tex="-2\bigl(\tan^{-1}(12)+1\bigr)" /> and this is the same number as the
          form above. Whatever form the two speeds come out in, their ratio is <Katex tex="\tfrac23" />.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ3_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          A particle moves in a straight line so that its distance, <Katex tex="x" /> metres,
          from a fixed origin <Katex tex="O" /> after time <Katex tex="t" /> seconds is given
          by the differential equation{' '}
          <Katex tex="\dfrac{dx}{dt}=\dfrac{2e^{-x}}{1+4t^2}" />, where{' '}
          <Katex tex="x=0" /> when <Katex tex="t=0" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              A <Katex tex="1+4t^2" /> in a denominator usually integrates to a{' '}
              <Katex tex="\tan^{-1}" />, and <Katex tex="\tan^{-1}" /> is bounded: its values always
              lie between <Katex tex="-\tfrac\pi2" /> and <Katex tex="\tfrac\pi2" />. That single
              observation drives part b.: the particle can never travel further than{' '}
              <Katex tex="\log_e\!\left(\tfrac\pi2+1\right)\approx0.944" /> metres, no matter how
              long it runs, so its graph levels off and its speed dies away.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a.i"
        topic="Separable DE"
        marks={1}
        statement={
          <>
            Express the differential equation in the form{' '}
            <Katex tex="\displaystyle\int g(x)\,dx=\int f(t)\,dt" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Separable DE"
        marks={2}
        statement={
          <>
            Hence, show that <Katex tex="x=\log_e\bigl(\tan^{-1}(2t)+1\bigr)" />.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The graph of <Katex tex="x=\log_e\bigl(\tan^{-1}(2t)+1\bigr)" /> has a horizontal
          asymptote.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Asymptote"
        marks={1}
        statement={<>Write down the equation of this asymptote.</>}
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
        <Explore title="However large t gets, tan⁻¹(2t) stays below π/2 — so x stays below logₑ(π/2 + 1)">
          <CappedWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="x=\log_e\bigl(\tan^{-1}(2t)+1\bigr)" /> and the
            horizontal asymptote on the axes below. Using coordinates, plot and label the
            point where <Katex tex="t=10" />, giving the value of <Katex tex="x" /> correct to
            two decimal places.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <Explore title="On VCAA's grid, the point at t = 10 sits less than half a square below the asymptote">
          <GridWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="c"
        topic="Speed"
        marks={1}
        statement={
          <>
            Find the speed of the particle when <Katex tex="t=3" />. Give your answer in
            metres per second, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Two seconds after the first particle passed through <Katex tex="O" />, a second
          particle passes through <Katex tex="O" />.
          <br />
          Its distance <Katex tex="x" /> metres from <Katex tex="O" />, <Katex tex="t" /> seconds
          after the first particle passed through <Katex tex="O" />, is given by
          <br />
          <Katex tex="x=\log_e\bigl(\tan^{-1}(3t-6)+1\bigr)" />.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Verify Distance"
        marks={1}
        statement={
          <>
            Verify that the particles are the same distance from <Katex tex="O" /> when{' '}
            <Katex tex="t=6" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Speed Ratio"
        marks={2}
        statement={
          <>
            Find the ratio of the speed of the first particle to the speed of the second
            particle when the particles are at the same distance from <Katex tex="O" />. Give
            your answer as <Katex tex="\dfrac ab" /> in simplest form, where{' '}
            <Katex tex="a" /> and <Katex tex="b" /> are positive integers.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
