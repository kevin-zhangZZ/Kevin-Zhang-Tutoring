// 2026 Specialist NHT — Exam 2, Section B Question 3 (10 marks). The NHT report gives sample
// answers only, with no statistics, plus notes on a.ii and b.i. A curve defined parametrically by
// dx/dt = 1, x(0) = 0 and dy/dt = y + 1, y(0) = 0: dy/dx, the Cartesian rule y = eˣ − 1 by
// integration, a volume of revolution that fixes k (k² − 4k + 3 = 0, k = 3), then the arc length and
// the area of the surface formed by rotating the curve about the y-axis, both as parametric integrals
// in t. Question text transcribed from the original paper (no diagram). Answers checked with
// sympy/scipy and against the VCAA report's sample answers: a.i y + 1; b.ii k = 3;
// c.i ∫₀^{logₑ5} √(1 + e^{2t}) dt (a = 1, b = 2); c.ii 4.4 (4.3674…); d.i 2π∫₀^{logₑ5} t√(1 + e^{2t}) dt;
// d.ii 26.9 (26.860…). The arc length is asked for in the parametric form (dt), so it is kept under
// the "parametric arc length is current" ruling. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const REPORT_AII: SAExaminerStats = {
  comment: <>Sufficient working must be shown for a &lsquo;show that&rsquo; question.</>,
}

const REPORT_BI: SAExaminerStats = {
  comment: (
    <>
      &lsquo;Use calculus&rsquo; indicates that the antiderivative must be shown in the solution.
      <br />
      Integrate and equate to the given volume.
      <br />
      The antiderivative needed to be included in the square brackets.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{dy}{dt}\div\frac{dx}{dt} = \frac{y+1}{1}" />,
    reason: <>The chain rule for a parametric curve: <Katex tex="\tfrac{dy}{dx}=\tfrac{dy/dt}{dx/dt}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = y+1}" />,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dy} = \frac{1}{y+1} \implies x = \int\frac{1}{y+1}\,dy" />,
    reason: <>The derivative in part a.i depends only on <Katex tex="y" />, so invert it and integrate with respect to <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="x = \log_e(y+1) + c" />,
    reason: <>No modulus needed: the curve starts at <Katex tex="y=0" /> and <Katex tex="\tfrac{dy}{dt}=y+1>0" /> there, so <Katex tex="y" /> only increases and <Katex tex="y+1" /> stays positive.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} t=0:\ x=0,\ y=0 \\ \implies 0 = \log_e(1)+c \implies c=0 \end{gathered}" />,
    reason: <>The initial conditions: at <Katex tex="t=0" /> the curve is at the origin.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} x = \log_e(y+1) \implies y+1 = e^x \\ \boxed{y = e^x-1} \end{gathered}" />,
    reason: <>As required.</>,
    more: <>The report notes sufficient working must be shown: the antiderivative, the constant found from the initial condition, and the rearrangement. VCAA also accepts the definite-integral version <Katex tex="\int_0^y\tfrac{1}{y+1}\,dy=\int_0^x1\,dx" />, which builds the initial condition into the terminals. Another route: <Katex tex="\tfrac{dx}{dt}=1" /> with <Katex tex="x(0)=0" /> gives <Katex tex="x=t" />, and <Katex tex="\tfrac{dy}{dt}=y+1" /> gives <Katex tex="y=e^t-1" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} V &= \pi\int_0^{\log_e(k)}\left(e^x-1\right)^2dx \\ &= \pi\int_0^{\log_e(k)}\left(e^{2x}-2e^x+1\right)dx \end{aligned}" />,
    reason: <>Rotating about the <Katex tex="x" />-axis, each disc has radius <Katex tex="y" />, so <Katex tex="V=\pi\int y^2\,dx" />. Expand the square to integrate term by term.</>,
  },
  {
    working: <Katex display tex="V = \pi\left[\tfrac12e^{2x}-2e^x+x\right]_0^{\log_e(k)}" />,
    reason: <>The antiderivative, shown in the square brackets: the report says &lsquo;use calculus&rsquo; means it must appear.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} V = \pi\Big[&\left(\tfrac12k^2-2k+\log_e(k)\right) \\ &-\left(\tfrac12-2+0\right)\Big] \end{aligned}" />,
    reason: <>Upper terminal: <Katex tex="e^{2\log_e(k)}=k^2" /> and <Katex tex="e^{\log_e(k)}=k" />. Lower terminal: <Katex tex="e^0=1" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \pi\left(\tfrac12k^2-2k+\log_e(k)+\tfrac32\right) \\ = \pi\log_e(k) \end{gathered}" />,
    reason: <>Equate to the given volume.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \tfrac12k^2-2k+\tfrac32 = 0 \\ \boxed{k^2-4k+3=0} \end{gathered}" />,
    reason: <>Divide by <Katex tex="\pi" />, cancel <Katex tex="\log_e(k)" /> from both sides, and multiply by 2. As required.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="(k-1)(k-3) = 0 \implies k=1 \text{ or } k=3" />,
  },
  {
    working: <Katex display tex="\boxed{k=3}" />,
    reason: <><Katex tex="k=1" /> is rejected because <Katex tex="k>1" /> (it would give the interval <Katex tex="[0,0]" /> and a volume of 0).</>,
    more: <>Check: <Katex tex="\pi\left(\tfrac92-6+\log_e(3)+\tfrac32\right)=\pi\log_e(3)" />, as required.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="x = t,\qquad y = e^t-1" />,
    reason: <><Katex tex="\tfrac{dx}{dt}=1" /> with <Katex tex="x(0)=0" /> gives <Katex tex="x=t" />, so the curve <Katex tex="y=e^x-1" /> is <Katex tex="y=e^t-1" />, and <Katex tex="0\le x\le\log_e(5)" /> becomes <Katex tex="0\le t\le\log_e(5)" />.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = 1,\qquad \frac{dy}{dt} = y+1 = e^t" />,
    reason: <>Both derivatives come straight from the given rules.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} L &= \int_0^{\log_e(5)}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt \\ &= \int_0^{\log_e(5)}\sqrt{1^2+\left(e^t\right)^2}\,dt \end{aligned}" />,
    reason: <>The arc-length formula for a parametric curve.</>,
  },
  {
    working: <Katex display tex="\boxed{L = \int_0^{\log_e(5)}\sqrt{1+e^{2t}}\,dt}" />,
    reason: <>So <Katex tex="a=1" />, <Katex tex="b=2" />, <Katex tex="t_1=0" />, <Katex tex="t_2=\log_e(5)" />.</>,
    more: <>The terminals are values of <Katex tex="t" />, not <Katex tex="x" />. Here they happen to coincide because <Katex tex="x=t" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">nInt(√(1 + e^(2t)), t, 0, ln(5))</Cas>,
    reason: <>Evaluate the integral from part c.i numerically.</>,
  },
  {
    working: <Katex display tex="L = 4.3674\ldots \implies \boxed{L \approx 4.4}" />,
    reason: <>Correct to one decimal place.</>,
    more: <>Check: the straight line from <Katex tex="(0,0)" /> to <Katex tex="(\log_e5,\ 4)" /> has length <Katex tex="\sqrt{(\log_e5)^2+16}\approx4.31" />. The curve must be a little longer than that chord, and it is.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="A = 2\pi\int r\,ds, \qquad r = x = t" />,
    reason: <>Rotating about the <Katex tex="y" />-axis, each small piece of curve of length <Katex tex="ds" /> sweeps out a thin band of radius equal to its distance from the <Katex tex="y" />-axis, which is <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 2\pi\int_0^{\log_e(5)} t\sqrt{1+e^{2t}}\,dt}" />,
    reason: <><Katex tex="ds=\sqrt{1+e^{2t}}\,dt" /> from part c.i, over the same <Katex tex="t" />-interval.</>,
    more: <>Radius <Katex tex="x" /> (not <Katex tex="y" />) because the axis of rotation is the <Katex tex="y" />-axis. The report also accepts the Cartesian versions <Katex tex="2\pi\int_0^{\log_e(5)}x\sqrt{1+(e^x)^2}\,dx" /> and <Katex tex="2\pi\int_0^4\log_e(y+1)\sqrt{1+\left(\tfrac{1}{y+1}\right)^2}\,dy" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">2π·nInt(t·√(1 + e^(2t)), t, 0, ln(5))</Cas>,
    reason: <>The integral from part d.i has no antiderivative you could find by hand, so evaluate it numerically.</>,
  },
  {
    working: <Katex display tex="A = 26.860\ldots \implies \boxed{A \approx 26.9}" />,
    reason: <>Correct to one decimal place.</>,
    more: <>Check: every radius is between 0 and <Katex tex="\log_e5\approx1.61" />, so <Katex tex="A" /> must be less than <Katex tex="2\pi\times1.61\times4.37\approx44" />. Most of the length is on the steep upper part, where the radius is over 1, so a value around 27 is reasonable.</>,
  },
]

export default function SpecialistQ3_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>A curve is defined parametrically by</p>
        <p>
          <Katex tex="\dfrac{dx}{dt}=1,\ x(0)=0" /> and <Katex tex="\dfrac{dy}{dt}=y+1,\ y(0)=0" />, where{' '}
          <Katex tex="t\ge0" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The curve is given only through rates of change, so part a. turns them into an
              ordinary rule, <Katex tex="y=e^x-1" />. Notice also that <Katex tex="x=t" />: the
              parameter is just <Katex tex="x" /> under another name, which is what lets parts c. and
              d. write everything in terms of <Katex tex="t" />.
            </p>
            <p>
              The rest uses three formulas. Volume about the <Katex tex="x" />-axis:{' '}
              <Katex tex="\pi\int y^2\,dx" />. Arc length:{' '}
              <Katex tex="\int\sqrt{\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2}\,dt" />.
              Surface area: <Katex tex="2\pi\int(\text{radius})\,ds" />, with the radius measured to
              the axis of rotation.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a.i"
        topic="Parametric Derivative"
        marks={1}
        statement={<>Write down an expression for <Katex tex="\dfrac{dy}{dx}" />.</>}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Differential Equation"
        marks={1}
        statement={<>Using integration, show that <Katex tex="y=e^x-1" />.</>}
        examinerReport={REPORT_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          The graph of <Katex tex="y=e^x-1" /> where <Katex tex="0\le x\le\log_e(k)" />, for constant{' '}
          <Katex tex="k>1" />, is rotated about the <Katex tex="x" />-axis to form a solid of
          revolution.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Volume of Revolution"
        marks={2}
        statement={
          <>
            Given that the volume of the solid of revolution is <Katex tex="\pi\times\log_e(k)" />, use
            calculus to show that <Katex tex="k" /> satisfies the equation <Katex tex="k^2-4k+3=0" />.
          </>
        }
        examinerReport={REPORT_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={<>Hence, find the value of <Katex tex="k" />.</>}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Arc Length"
        marks={2}
        statement={
          <>
            Express the length of the curve given by <Katex tex="y=e^x-1" /> for{' '}
            <Katex tex="0\le x\le\log_e(5)" /> in the form{' '}
            <Katex tex="\displaystyle\int_{t_1}^{t_2}\sqrt{a+e^{bt}}\,dt" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Arc Length"
        marks={1}
        statement={
          <>
            Find the length of the curve given by <Katex tex="y=e^x-1" /> for{' '}
            <Katex tex="0\le x\le\log_e(5)" />.
            <br />
            Give your answer correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          The curve given by <Katex tex="y=e^x-1" /> for <Katex tex="0\le x\le\log_e(5)" /> is now
          rotated about the <Katex tex="y" />-axis to form a surface of revolution.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Surface Area"
        marks={1}
        statement={
          <>
            Write down a definite integral that, when evaluated, will give the area of this surface.
          </>
        }
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Surface Area"
        marks={1}
        statement={<>Find the area of this surface correct to one decimal place.</>}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
