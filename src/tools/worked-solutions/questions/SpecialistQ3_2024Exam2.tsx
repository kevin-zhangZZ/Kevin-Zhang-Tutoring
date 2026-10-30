// 2024 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). A pollutant
// spreading as a thin disc: maximum inflow rate, a related rate, an arctan integral by
// substitution, the limiting area, and the clean-up time. Question text transcribed from
// the original paper (2024 papers are image-only, so read from rendered pages). Answers
// checked with sympy/scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
}

const EXAM_B: SAExaminerStats = {
  marks: [35, 11, 17, 37],
  average: 1.6,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Students who recognised this as a related rates question managed this well.
        </li>
        <li>
          Some students did not convert the depth measurement to metres.
        </li>
      </ul>
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
}

const EXAM_CII: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: <>Students must be careful to write their answers in the required form.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [73, 10, 17],
  average: 0.5,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Many students skipped this question without making an attempt to answer it.
        </li>
        <li>
          As the depth of the pond is constant, the surface area can be found by dividing the
          volume by the depth.
        </li>
      </ul>
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [79, 17, 4],
  average: 0.3,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Many students skipped this question without attempting to answer it.
        </li>
        <li>
          The most common error was not taking the 5-day delay into account.
        </li>
      </ul>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dt}\left(\frac{8t}{240+5t^4}\right) = \frac{8\left(240+5t^4\right)-8t\left(20t^3\right)}{\left(240+5t^4\right)^2}" />,
    reason: <>The maximum of the <em>rate</em> <Katex tex="\tfrac{dV}{dt}" /> is where its own derivative is zero, so apply the quotient rule to the given rate.</>,
    more: <>This is a maximum of the inflow rate, not of the volume — the volume itself never stops increasing, because <Katex tex="\tfrac{dV}{dt}>0" /> for all <Katex tex="t>0" />.</>,
  },
  {
    working: <Katex display tex="= \frac{8\left(240-15t^4\right)}{\left(240+5t^4\right)^2} = 0 \implies t^4 = 16" />,
    reason: <><Katex tex="1920+40t^4-160t^4 = 1920-120t^4 = 8\left(240-15t^4\right)" />. The denominator is never zero, so set the numerator to zero.</>,
  },
  {
    working: <Katex display tex="t = 2 \ \text{ (rejecting } t=-2 \text{ and the complex roots)}" />,
    reason: <>Time is non-negative. The numerator <Katex tex="240-15t^4" /> goes from positive to negative at <Katex tex="t=2" />, so this is a maximum.</>,
    more: <>On the calculator, <Cas fn="fMax" /> applied to <Katex tex="\tfrac{8t}{240+5t^4}" /> with <Katex tex="t\ge0" /> returns <Katex tex="t=2" /> directly, which is enough for one mark; the derivative working above is the by-hand check.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{dV}{dt}\Big|_{t=2} &= \frac{16}{240+80} = \frac{16}{320} \\ &= \boxed{0.05 \ \text{m}^3\text{/day at } t=2}\end{aligned}" />,
    reason: <>Substitute <Katex tex="t=2" /> into the given rate. The question asks for two things — the maximum rate and when it occurs.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{depth} = 1 \text{ mm} = 0.001 \text{ m}" />,
    reason: <>Everything else is in metres, so convert the depth first.</>,
    more: <>The report notes some students did not convert the depth to metres. Using <Katex tex="h=1" /> gives <Katex tex="\tfrac{dr}{dt}\approx0.00051" />, out by a factor of 1000 — an implausibly slow spread for a slick whose radius is already 6.54 m after 4 days.</>,
  },
  {
    working: <Katex display tex="V = \pi r^2 h = 0.001\pi r^2" />,
    reason: <>The pollutant is a cylinder (a thin disc) of radius <Katex tex="r" /> and constant height <Katex tex="h=0.001" /> m.</>,
  },
  {
    working: <Katex display tex="\frac{dV}{dr} = 0.002\pi r" />,
    reason: <>Differentiating with respect to the radius; <Katex tex="h" /> is constant.</>,
  },
  {
    working: <Katex display tex="\frac{dr}{dt} = \frac{dV}{dt}\div\frac{dV}{dr} = \frac{dV}{dt}\times\frac{1}{0.002\pi r}" />,
    reason: <>We know <Katex tex="\tfrac{dV}{dt}" /> and want <Katex tex="\tfrac{dr}{dt}" />; the chain rule <Katex tex="\tfrac{dV}{dt}=\tfrac{dV}{dr}\cdot\tfrac{dr}{dt}" /> links them.</>,
  },
  {
    working: <Katex display tex="t = 4: \quad \frac{dV}{dt} = \frac{32}{240+5(256)} = \frac{32}{1520} = \frac{2}{95}" />,
    reason: <>Substituting <Katex tex="t=4" /> into the given rate.</>,
  },
  {
    working: <Katex display tex="\frac{dr}{dt} = \frac{2}{95}\times\frac{1}{0.002\pi(6.54)} = 0.51232\ldots" />,
    reason: <>Using the given radius <Katex tex="r=6.54" /> m at <Katex tex="t=4" />.</>,
    more: <>Where does 6.54 come from? It is the radius you get from part c.ii.: <Katex tex="V(4)\approx0.13419" /> m³, so <Katex tex="\pi r^2(0.001)=0.13419" /> gives <Katex tex="r\approx6.536" /> m. The question supplies it so that part b. can be done before part c.</>,
  },
  {
    working: <Katex display tex="\boxed{0.51 \ \text{m/day}}" />,
    reason: <>Two decimal places, as asked.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="u = \sqrt5\,t^2 \implies \frac{du}{dt} = 2\sqrt5\,t \implies t\,dt = \frac{du}{2\sqrt5}" />,
    reason: <>The substitution is chosen so that <Katex tex="t\,dt" />, which is exactly what the numerator supplies, converts cleanly.</>,
  },
  {
    working: <Katex display tex="5t^4 = \left(\sqrt5\,t^2\right)^2 = u^2" />,
    reason: <>The point of the √5: it turns the quartic into a perfect square, which is what produces an arctan.</>,
  },
  {
    working: <Katex display tex="\int\frac{8t}{240+5t^4}\,dt = \int\frac{8}{240+u^2}\cdot\frac{du}{2\sqrt5}" />,
    reason: <>Substituting both pieces: <Katex tex="8t\,dt=8\cdot\tfrac{du}{2\sqrt5}" /> and <Katex tex="5t^4=u^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int\frac{4}{\sqrt5\left(240+u^2\right)}\,du}" />,
    reason: <>Simplifying <Katex tex="\tfrac{8}{2\sqrt5}=\tfrac{4}{\sqrt5}" />. Only <Katex tex="u" /> remains, which is all c.i. asks — the integration itself is part c.ii.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\frac{4}{\sqrt5}\int\frac{du}{240+u^2} \\ &= \frac{4}{\sqrt5\,\sqrt{240}}\arctan\!\left(\frac{u}{\sqrt{240}}\right)+c\end{aligned}" />,
    reason: <>Formula sheet: <Katex tex="\int\tfrac{a}{a^2+u^2}\,du=\arctan\!\left(\tfrac{u}{a}\right)" />. Our integrand has 1 on top, not <Katex tex="a" />, so divide by <Katex tex="a" />: <Katex tex="\int\tfrac{1}{a^2+u^2}\,du=\tfrac{1}{a}\arctan\!\left(\tfrac{u}{a}\right)" />. Here <Katex tex="a^2=240" />, so <Katex tex="a=\sqrt{240}=4\sqrt{15}" />.</>,
  },
  {
    working: <Katex display tex="\frac{4}{\sqrt5\cdot4\sqrt{15}} = \frac{1}{\sqrt{75}} = \frac{1}{5\sqrt3}" />,
    reason: <><Katex tex="\sqrt5\times\sqrt{15}=\sqrt{75}=5\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\frac{u}{\sqrt{240}} = \frac{\sqrt5\,t^2}{4\sqrt{15}} = \frac{t^2}{4\sqrt3}" />,
    reason: <>Substituting back <Katex tex="u=\sqrt5\,t^2" /> (the answer must be in terms of <Katex tex="t" />) and simplifying <Katex tex="\tfrac{\sqrt5}{\sqrt{15}}=\tfrac{1}{\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="V(0) = 0 \implies c = 0" />,
    reason: <>The pond starts unpolluted, so <Katex tex="V(0)=0" />; since <Katex tex="\arctan(0)=0" />, the constant is zero.</>,
    more: <>The report instead writes <Katex tex="V=\int_0^t\frac{8x}{240+5x^4}\,dx" /> directly, which has the same effect: integrating from 0 builds in <Katex tex="V(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{1}{5\sqrt3}\arctan\!\left(\frac{t^2}{4\sqrt3}\right)}" />,
    reason: <>Matching the requested form <Katex tex="\tfrac{1}{a\sqrt b}\arctan\!\left(\tfrac{t^c}{d\sqrt b}\right)" /> with <Katex tex="a=5,\ b=3,\ c=2,\ d=4" /> — all positive integers, as required.</>,
    more: <>The report notes students must be careful to write their answers in the required form. An unsimplified version such as <Katex tex="\tfrac{1}{\sqrt{75}}\arctan\!\left(\tfrac{t^2}{\sqrt{48}}\right)" /> is equal in value but not in the form asked for, because <Katex tex="\sqrt{75}" /> and <Katex tex="\sqrt{48}" /> must first be split into <Katex tex="5\sqrt3" /> and <Katex tex="4\sqrt3" /> so the same <Katex tex="\sqrt b" /> appears in both places.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\text{As } t\to\infty,\ \ \frac{t^2}{4\sqrt3}\to\infty, \\ &\text{so } \arctan\!\left(\frac{t^2}{4\sqrt3}\right)\to\frac{\pi}{2}\end{aligned}" />,
    reason: <>"Approach" signals a limit as <Katex tex="t\to\infty" />. Arctan is bounded above by <Katex tex="\tfrac{\pi}{2}" />, so the volume tends to a finite value.</>,
    more: <>The report notes many students skipped this part without making an attempt. The idea is only two steps: the limiting volume from part c.ii., then volume divided by depth.</>,
  },
  {
    working: <Katex display tex="V\to\frac{1}{5\sqrt3}\cdot\frac{\pi}{2} = \frac{\pi}{10\sqrt3}" />,
    reason: <>The limiting volume in cubic metres.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&V = A\times\text{depth} \\ &\implies A = \frac{V}{0.001} = 1000V\end{aligned}" />,
    reason: <>The disc has constant depth 0.001 m, so dividing the volume by the depth gives the area it covers.</>,
  },
  {
    working: <Katex display tex="A \to \frac{1000\pi}{10\sqrt3} = \frac{100\pi}{\sqrt3}" />,
    reason: <>The exact limiting area; now evaluate it to two decimal places.</>,
  },
  {
    working: <Katex display tex="\boxed{181.38 \ \text{m}^2}" />,
    reason: <>Two decimal places, as asked.</>,
    more: <>Check: <Katex tex="\pi r^2=181.38" /> gives <Katex tex="r\approx7.6" /> m, a sensible final size given the radius was already 6.54 m at <Katex tex="t=4" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="V(5) = \frac{1}{5\sqrt3}\arctan\!\left(\frac{25}{4\sqrt3}\right) = 0.150163\ldots" />,
    reason: <>The clean-up only starts at <Katex tex="t=5" />, so first find the volume already in the pond then, using part c.ii.</>,
    more: <>The report notes the most common error was not taking the 5-day delay into account. Two things depend on it: the starting volume is <Katex tex="V(5)" />, not 0, and the removal of 0.05 m³/day only runs from <Katex tex="t=5" /> onward.</>,
  },
  {
    working: <Katex display tex="\text{net rate for } t>5: \quad \frac{8t}{240+5t^4}-0.05" />,
    reason: <>Inflow minus removal. The pollutant keeps arriving throughout, so both rates act together.</>,
  },
  {
    working: <Katex display tex="V(5)+\int_5^{T}\left(\frac{8t}{240+5t^4}-0.05\right)dt = 0" />,
    reason: <>Volume at time <Katex tex="T" /> = starting volume + net change from <Katex tex="t=5" /> to <Katex tex="T" />. The pond is clear when this is zero.</>,
    more: <>Equivalently, since the inflow integral from 5 to <Katex tex="T" /> is <Katex tex="V(T)-V(5)" />, the equation simplifies to <Katex tex="V(T)-0.05(T-5)=0" />: everything that has ever entered equals everything removed.</>,
  },
  {
    working: <Katex display tex="T = 8.4016\ldots" />,
    reason: <>By <Cas fn="nSolve" /> on the equation above, with <Katex tex="T>5" />.</>,
    more: <>There is only one solution. From part a., the inflow peaks at 0.05 m³/day at <Katex tex="t=2" /> and decreases after that, so for <Katex tex="t>5" /> it is below <Katex tex="\tfrac{40}{3365}\approx0.012" /> m³/day. The net rate is therefore always negative and the volume falls steadily to zero.</>,
  },
  {
    working: <Katex display tex="\boxed{T-5 = 3.4 \ \text{days from the start of the clean-up}}" />,
    reason: <>The question asks for the time measured <em>from the start of the clean-up</em>, not from <Katex tex="t=0" />, so subtract 5.</>,
    more: <>Giving 8.4 answers a different question — the time since the pollutant first entered the pond.</>,
  },
]

export default function SpecialistQ3_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          A pollutant, at time <Katex tex="t=0" /> days, begins to enter a pond of still,
          unpolluted water at a rate of{' '}
          <Katex tex="\dfrac{dV}{dt}=\dfrac{8t}{240+5t^4}" />, where <Katex tex="V" /> is the
          volume of pollutant, in cubic metres, in the pond after <Katex tex="t" /> days.
        </p>
        <p>
          The pollutant does not dissolve or mix, and spreads across the pond, maintaining
          the shape of a thin circular disc of radius <Katex tex="r(t)" /> metres and
          constant depth of 1 millimetre.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Maximum Rate"
        marks={1}
        statement={
          <>
            What is the maximum rate, in cubic metres per day, at which the pollutant will
            enter the pond, and for what value of <Katex tex="t" /> will this rate occur?
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Related Rates"
        marks={3}
        statement={
          <>
            At what rate is the radius of the disc increasing after <Katex tex="t=4" /> days,
            where it may be assumed that the radius of the disc is 6.54 m?
            <br />
            Give your answer in metres per day correct to two decimal places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Substitution"
        marks={1}
        statement={
          <>
            Use the substitution <Katex tex="u=\sqrt5\,t^2" /> to express{' '}
            <Katex tex="\displaystyle\int\frac{8t}{240+5t^4}\,dt" /> as an integral involving
            only the variable <Katex tex="u" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Arctan Integral"
        marks={1}
        statement={
          <>
            Hence, or otherwise, find, in terms of <Katex tex="t" />, the total volume{' '}
            <Katex tex="V" /> m<Katex tex="^3" /> of pollutant that has entered the pond after{' '}
            <Katex tex="t" /> days.
            <br />
            Give your answer in the form{' '}
            <Katex tex="\dfrac{1}{a\sqrt b}\arctan\!\left(\dfrac{t^c}{d\sqrt b}\right)" />,
            where <Katex tex="a,b,c,d\in Z^+" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Limiting Area"
        marks={2}
        statement={
          <>
            What surface area of the pond would the coverage of the pollutant approach?
            <br />
            Give your answer in square metres correct to two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Clean-Up Time"
        marks={2}
        statement={
          <>
            The clean-up of the pond begins after five days, where the pollutant is removed at
            a constant rate of 0.05 cubic metres per day until the pond is free of pollutant.
            However, efforts to stem the flow are unsuccessful and the pollutant continues to
            enter the pond at a rate of <Katex tex="\dfrac{8t}{240+5t^4}" /> cubic metres per
            day.
            <br />
            After how many days, from the start of the clean-up, will the pond be free of
            pollutant?
            <br />
            Give your answer in days correct to one decimal place.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
