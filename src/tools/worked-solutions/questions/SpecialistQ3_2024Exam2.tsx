// 2024 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). A pollutant
// spreading as a thin disc: maximum inflow rate, a related rate, an arctan integral by
// substitution, the limiting area, and the clean-up time. Question text transcribed from
// the original paper (2024 papers are image-only, so read from rendered pages). Answers
// checked with sympy/scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
}

const EXAM_B: SAExaminerStats = {
  marks: [35, 11, 17, 37],
  average: 1.6,
  comment: (
    <>
      Students who recognised this as a related rates question managed it well. Some students
      did not convert the depth measurement to metres.
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
      Many students skipped this question without making an attempt. As the depth of the pond
      is constant, the surface area can be found by dividing the volume by the depth.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [79, 17, 4],
  average: 0.3,
  comment: (
    <>
      Many students skipped this question without attempting to answer it. The most common
      error was not taking the five-day delay into account.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dt}\left(\frac{8t}{240+5t^4}\right) = \frac{8\left(240+5t^4\right)-8t\left(20t^3\right)}{\left(240+5t^4\right)^2}" />,
    reason: 'Quotient rule on the given rate — this is a maximum of the rate, not of the volume.',
  },
  {
    working: <Katex display tex="= \frac{8\left(240-15t^4\right)}{\left(240+5t^4\right)^2} = 0 \implies t^4 = 16" />,
    reason: <><Katex tex="1920 - 160t^4 = 8(240-15t^4)" />. The denominator is never zero.</>,
  },
  {
    working: <Katex display tex="t = 2 \ \text{ (rejecting } t=-2 \text{ and the complex roots)}" />,
    reason: 'Time is non-negative.',
  },
  {
    working: <Katex display tex="\boxed{\frac{dV}{dt} = \frac{16}{240+80} = \frac{16}{320} = 0.05 \ \text{m}^3\text{/day at } t=2}" />,
    reason: <>Worth noting for part e.: this maximum inflow of <Katex tex="0.05" /> m³/day is exactly the clean-up rate, so the pond can never lose ground once the clean-up starts.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{depth} = 1 \text{ mm} = 0.001 \text{ m}" />,
    reason: <>Everything else is in metres, so this conversion has to happen first — skipping it was the listed error.</>,
  },
  {
    working: <Katex display tex="V = \pi r^2 h = 0.001\pi r^2" />,
    reason: 'The pollutant is a thin disc of constant depth.',
  },
  {
    working: <Katex display tex="\frac{dV}{dr} = 0.002\pi r" />,
    reason: 'Differentiating with respect to the radius.',
  },
  {
    working: <Katex display tex="\frac{dr}{dt} = \frac{dV}{dt}\div\frac{dV}{dr} = \frac{dV}{dt}\times\frac{1}{0.002\pi r}" />,
    reason: 'The chain rule in related-rates form.',
  },
  {
    working: <Katex display tex="t = 4: \quad \frac{dV}{dt} = \frac{32}{240+5(256)} = \frac{32}{1520} = \frac{2}{95}" />,
    reason: 'Substituting into the given rate.',
  },
  {
    working: <Katex display tex="\frac{dr}{dt} = \frac{2}{95}\times\frac{1}{0.002\pi(6.54)} = 0.51232\ldots" />,
    reason: <>Using the given radius of 6.54 m. By <Cas fn="nSolve" /> or directly.</>,
  },
  {
    working: <Katex display tex="\boxed{0.51 \ \text{m/day}}" />,
    reason: 'Two decimal places, as asked.',
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="u = \sqrt5\,t^2 \implies \frac{du}{dt} = 2\sqrt5\,t \implies t\,dt = \frac{du}{2\sqrt5}" />,
    reason: <>The substitution is chosen so that <Katex tex="t\,dt" />, which is exactly what the numerator supplies, converts cleanly.</>,
  },
  {
    working: <Katex display tex="5t^4 = \left(\sqrt5\,t^2\right)^2 = u^2" />,
    reason: 'The point of the √5: it turns the quartic into a perfect square, which is what produces an arctan.',
  },
  {
    working: <Katex display tex="\int\frac{8t}{240+5t^4}\,dt = \int\frac{8}{240+u^2}\cdot\frac{du}{2\sqrt5}" />,
    reason: 'Substituting both pieces.',
  },
  {
    working: <Katex display tex="\boxed{\int\frac{4}{\sqrt5\left(240+u^2\right)}\,du}" />,
    reason: <>Equivalently <Katex tex="\tfrac{4}{\sqrt5}\int\tfrac{du}{240+u^2}" />, which is the standard <Katex tex="\tfrac{1}{a}\arctan\!\left(\tfrac{u}{a}\right)" /> form with <Katex tex="a=\sqrt{240}" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{4}{\sqrt5}\int\frac{du}{240+u^2} = \frac{4}{\sqrt5}\cdot\frac{1}{\sqrt{240}}\arctan\!\left(\frac{u}{\sqrt{240}}\right)+c" />,
    reason: <>The formula-sheet antiderivative, with <Katex tex="\sqrt{240}=4\sqrt{15}" />.</>,
  },
  {
    working: <Katex display tex="\frac{4}{\sqrt5\cdot4\sqrt{15}} = \frac{1}{\sqrt{75}} = \frac{1}{5\sqrt3}" />,
    reason: <><Katex tex="\sqrt5\times\sqrt{15}=\sqrt{75}=5\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\frac{u}{\sqrt{240}} = \frac{\sqrt5\,t^2}{4\sqrt{15}} = \frac{t^2}{4\sqrt3}" />,
    reason: <>Substituting back and simplifying <Katex tex="\tfrac{\sqrt5}{\sqrt{15}}=\tfrac{1}{\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="V(0) = 0 \implies c = 0" />,
    reason: 'The pond starts unpolluted, which is what fixes the constant.',
  },
  {
    working: <Katex display tex="\boxed{V = \frac{1}{5\sqrt3}\arctan\!\left(\frac{t^2}{4\sqrt3}\right)}" />,
    reason: <>Matching the requested form <Katex tex="\tfrac{1}{a\sqrt b}\arctan\!\left(\tfrac{t^c}{d\sqrt b}\right)" /> with <Katex tex="a=5,\ b=3,\ c=2,\ d=4" /> — all positive integers, as required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="t\to\infty \implies \frac{t^2}{4\sqrt3}\to\infty \implies \arctan\!\left(\frac{t^2}{4\sqrt3}\right)\to\frac{\pi}{2}" />,
    reason: <>The arctan is bounded, so the total volume of pollutant is finite — a limiting value, not an ever-growing one.</>,
  },
  {
    working: <Katex display tex="V\to\frac{1}{5\sqrt3}\cdot\frac{\pi}{2} = \frac{\pi}{10\sqrt3}" />,
    reason: 'The limiting volume in cubic metres.',
  },
  {
    working: <Katex display tex="\text{volume} = \text{surface area}\times\text{depth} \implies A = \frac{V}{0.001} = 1000V" />,
    reason: 'The depth is constant, so dividing by it converts the volume straight into an area.',
  },
  {
    working: <Katex display tex="A \to \frac{1000\pi}{10\sqrt3} = \frac{100\pi}{\sqrt3} = \frac{100\sqrt3\,\pi}{3}" />,
    reason: 'Rationalising.',
  },
  {
    working: <Katex display tex="\boxed{181.38 \ \text{m}^2}" />,
    reason: <>Two decimal places. About a 7.6 m radius — the slick stops spreading well short of any pond of reasonable size.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="V(5) = \frac{1}{5\sqrt3}\arctan\!\left(\frac{25}{4\sqrt3}\right) = 0.150163\ldots" />,
    reason: <>The volume already in the pond when the clean-up starts. Ignoring this five-day head start was the error the examiner named.</>,
  },
  {
    working: <Katex display tex="\text{net rate for } t>5: \quad \frac{8t}{240+5t^4}-0.05" />,
    reason: 'Inflow minus removal. The pollutant keeps arriving throughout.',
  },
  {
    working: <Katex display tex="V(5)+\int_5^{T}\left(\frac{8t}{240+5t^4}-0.05\right)dt = 0" />,
    reason: 'The pond is clear when the accumulated total reaches zero.',
  },
  {
    working: <Katex display tex="T = 8.4016\ldots" />,
    reason: <>By <Cas fn="nSolve" /> on the equation above. Note the inflow past <Katex tex="t=5" /> is well under 0.05 m³/day, so the net rate really is negative throughout.</>,
  },
  {
    working: <Katex display tex="\boxed{T-5 = 3.4 \ \text{days from the start of the clean-up}}" />,
    reason: <>The question asks for the time measured <em>from the start of the clean-up</em>, not from <Katex tex="t=0" /> — answering 8.4 loses the mark.</>,
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

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The depth is 1 <em>millimetre</em> and everything else is in metres. Converting it
            to 0.001 m before part b. and carrying that through to part d. is the single
            detail the whole question rests on.
          </p>
          <p>
            The <Katex tex="\sqrt5" /> in the substitution is not decoration. Writing{' '}
            <Katex tex="5t^4=\left(\sqrt5\,t^2\right)^2" /> turns the denominator into{' '}
            <Katex tex="240+u^2" />, which is the one shape that antidifferentiates to an
            arctan — and because arctan is bounded, the total pollutant is finite. That is
            what makes part d. answerable at all.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
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
        marks={3}
        statement={
          <>
            At what rate is the radius of the disc increasing after <Katex tex="t=4" /> days,
            where it may be assumed that the radius of the disc is 6.54 m? Give your answer in
            metres per day correct to two decimal places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
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
        marks={1}
        statement={
          <>
            Hence, or otherwise, find, in terms of <Katex tex="t" />, the total volume{' '}
            <Katex tex="V" /> m<Katex tex="^3" /> of pollutant that has entered the pond after{' '}
            <Katex tex="t" /> days. Give your answer in the form{' '}
            <Katex tex="\dfrac{1}{a\sqrt b}\arctan\!\left(\dfrac{t^c}{d\sqrt b}\right)" />,
            where <Katex tex="a,b,c,d\in\mathbb{Z}^+" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            What surface area of the pond would the coverage of the pollutant approach? Give
            your answer in square metres correct to two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={2}
        statement={
          <>
            The clean-up of the pond begins after five days, where the pollutant is removed at
            a constant rate of 0.05 cubic metres per day until the pond is free of pollutant.
            However, efforts to stem the flow are unsuccessful and the pollutant continues to
            enter the pond at a rate of <Katex tex="\dfrac{8t}{240+5t^4}" /> cubic metres per
            day. After how many days, from the start of the clean-up, will the pond be free of
            pollutant? Give your answer in days correct to one decimal place.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
