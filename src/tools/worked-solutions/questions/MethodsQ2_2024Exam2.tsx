// 2024 Mathematical Methods — Exam 2, Section B Question 2 (11 marks). Two models for the
// temperature of a heated room, then the energy used by the heater as an area under a
// piecewise power curve. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages); the power graph is a crop of VCAA's own artwork.
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import powerSrc from './meth-2024e2-q2f-power.png'

const EXAM_A: SAExaminerStats = {
  marks: [11, 41, 48],
  average: 1.4,
  comment: (
    <>
      Many students included <Katex tex="\tfrac13" /> in the domain.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      A common incorrect answer was <Katex tex="30\,^\circ\text{C/h}" /> where{' '}
      <Katex tex="\tfrac12" /> was substituted into <Katex tex="12+30t" />, giving{' '}
      <Katex tex="\tfrac{27-12}{\frac12}=30" />.
      <br />
      Some students incorrectly found the average value of the temperature.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [5, 95],
  average: 1.0,
  comment: <>This question was answered well.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      Some students gave the exact answer. There were some rounding errors:{' '}
      <Katex tex="t=0.298" /> and <Katex tex="t=0.300" /> were occasionally seen.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: (
    <>
      Some students incorrectly included <Katex tex="t=0" />, but <Katex tex="t\in(0,1)" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [71, 29],
  average: 0.3,
  comment: (
    <>
      A common incorrect answer was <Katex tex="\tfrac13" />, which is the time when{' '}
      <Katex tex="f(t)-g(t)" /> is a maximum. The maximum difference occurs when{' '}
      <Katex tex="g(t)-f(t)" /> is a maximum or{' '}
      <Katex tex="\left|f(t)-g(t)\right|=\left|g(t)-f(t)\right|" /> is a maximum.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      Most students substituted the correct values into the equation. Students must make sure
      they show adequate working for 'show that' questions.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [63, 37],
  average: 0.4,
  comment: (
    <>
      An exact answer was required. Some students solved <Katex tex="p(t)=0.5" /> for{' '}
      <Katex tex="t" /> or found <Katex tex="p(0.5)" />.
    </>
  ),
}

const EXAM_FIII: SAExaminerStats = {
  marks: [61, 11, 27],
  average: 0.7,
  comment: (
    <>
      Some students solved <Katex tex="p(t)=1" /> for <Katex tex="t" /> or found{' '}
      <Katex tex="p(1)" />. Others just gave the answer. For questions worth more than 1 mark,
      appropriate working must be shown. Some students transcribed <Katex tex="A" /> incorrectly
      into the function.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dt}(12+30t) = 30, \qquad \frac{d}{dt}(22) = 0" />,
    reason: <>Differentiate each branch separately — a linear rise and a constant.</>,
  },
  {
    working: <Katex display tex="\text{at } t=\tfrac13: \quad \text{left gradient } 30 \ne 0 \ \text{right gradient}" />,
    reason: <>The graph has a corner there, so <Katex tex="f'\!\left(\tfrac13\right)" /> does not exist and <Katex tex="t=\tfrac13" /> must be left out of both branches.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{f'(t)=\begin{cases}30 & 0\le t<\tfrac13\\[2pt] 0 & t>\tfrac13\end{cases}}"
      />
    ),
    reason: <>Starting the first branch at <Katex tex="0<t" /> instead of <Katex tex="0\le t" /> was also accepted.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate of change} = \frac{f\!\left(\tfrac12\right)-f(0)}{\tfrac12-0}" />,
    reason: <>The gradient of the chord — not the average value, and not the derivative at a point.</>,
  },
  {
    working: <Katex display tex="f(0) = 12, \qquad f\!\left(\tfrac12\right) = 22" />,
    reason: <>Careful with the branch: <Katex tex="\tfrac12>\tfrac13" />, so the second rule applies and the room has already reached 22 °C.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{22-12}{\tfrac12} = 20\ ^\circ\text{C/h}}" />,
    reason: <>Using <Katex tex="12+30\left(\tfrac12\right)=27" /> by mistake gives the popular wrong answer of 30 °C/h.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="g(t) = 22-10e^{-6t}" />,
    reason: <>The 22 differentiates to zero.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dt}\left(e^{-6t}\right) = -6e^{-6t}" />,
    reason: <>Chain rule on the exponential.</>,
  },
  {
    working: <Katex display tex="\boxed{g'(t) = -10\times\left(-6e^{-6t}\right) = 60e^{-6t}}" />,
    reason: <>Two negatives, so the rate is positive — the room is warming, as it should be.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="60e^{-6t} = 10" />,
    reason: <>Setting the derivative from c.i. equal to 10.</>,
  },
  {
    working: <Katex display tex="e^{-6t} = \tfrac16 \implies -6t = \log_e\!\left(\tfrac16\right) = -\log_e(6)" />,
    reason: <>Taking logs of both sides.</>,
  },
  {
    working: <Katex display tex="t = \frac{\log_e(6)}{6} = 0.298626\ldots" />,
    reason: <>Or straight to <Cas fn="solve" /> on <Katex tex="60e^{-6t}=10" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 0.299}" />,
    reason: <>Three decimal places, as asked. Truncating rather than rounding gives 0.298.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="t>\tfrac13: \quad 22 = 22-10e^{-6t} \implies e^{-6t}=0" />,
    reason: <>No solution — an exponential is never zero, so the two models can only agree on the first branch.</>,
  },
  {
    working: <Katex display tex="0<t\le\tfrac13: \quad 12+30t = 22-10e^{-6t}" />,
    reason: <>The equation to solve.</>,
  },
  {
    working: <Katex display tex="\text{solve} \implies t = 0 \ \text{ or } \ t = 0.265604\ldots" />,
    reason: <><Cas fn="nSolve" /> or <Cas fn="solve" />. Both models start at 12 °C, so <Katex tex="t=0" /> is always a root — and the question restricts <Katex tex="t\in(0,1)" />, so it is rejected.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 0.27}" />,
    reason: <>Two decimal places. This is the moment the exponential model, which starts faster, is overtaken by the linear one.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="d(t) = \left|f(t)-g(t)\right| = \left|30t-10+10e^{-6t}\right| \ \text{ on } 0<t\le\tfrac13" />,
    reason: <>On the second branch <Katex tex="f-g = 10e^{-6t}" />, which only decreases, so the greatest gap is on the first branch.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dt}\left(f-g\right) = 30-60e^{-6t} = 0 \implies e^{-6t}=\tfrac12" />,
    reason: <>A stationary point of the signed difference.</>,
  },
  {
    working: <Katex display tex="t = \frac{\log_e(2)}{6} = 0.115524\ldots" />,
    reason: <>Here <Katex tex="f-g = -1.534" />, so this is a <em>minimum</em> of <Katex tex="f-g" /> — which is exactly a maximum of the gap.</>,
  },
  {
    working: <Katex display tex="\left|f-g\right| = 1.534 \ \text{ here, versus } 1.353 \ \text{ at } t=\tfrac13" />,
    reason: <>Comparing against the other candidate. The report notes <Katex tex="\tfrac13" /> was a common incorrect answer — it maximises <Katex tex="f-g" />, not <Katex tex="\left|f-g\right|" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 0.12}" />,
    reason: <>Two decimal places.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="p \text{ continuous at } t=0.4 \implies \lim_{t\to0.4^-}p(t) = \lim_{t\to0.4^+}p(t)" />,
    reason: <>Continuity is the only condition available, and 0.4 is the only place the rule changes.</>,
  },
  {
    working: <Katex display tex="1.5 = 0.3+Ae^{-10(0.4)}" />,
    reason: <>Equating the two branches at the join.</>,
  },
  {
    working: <Katex display tex="Ae^{-4} = 1.2" />,
    reason: <>Subtracting 0.3. Each of these lines earns its place in a "show that".</>,
  },
  {
    working: <Katex display tex="\boxed{A = 1.2e^{4}}" />,
    reason: <>As required. Numerically <Katex tex="A\approx65.5" />, which is why the curve drops so sharply after <Katex tex="t=0.4" />.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{energy} = \int_0^{T}p(t)\,dt" />,
    reason: <>Energy in kilowatt hours is the area under the power curve, as the stem states.</>,
  },
  {
    working: <Katex display tex="\int_0^{0.4}1.5\,dt = 1.5\times0.4 = 0.6 > 0.5" />,
    reason: <>The first branch alone already supplies more than 0.5 kWh, so the answer lies inside it — no exponential needed.</>,
  },
  {
    working: <Katex display tex="1.5T = 0.5" />,
    reason: <>A rectangle of height 1.5 and width T.</>,
  },
  {
    working: <Katex display tex="\boxed{T = \tfrac13 \text{ hour}}" />,
    reason: <>An exact value was required, so <Katex tex="0.33" /> would not do. Solving <Katex tex="p(t)=0.5" /> answers a different question entirely.</>,
  },
]

const ROWS_FIII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{0.4}1.5\,dt = 0.6" />,
    reason: <>The first branch contributes 0.6 kWh, so 0.4 kWh still has to come from the second.</>,
  },
  {
    working: <Katex display tex="\int_{0.4}^{a}\left(0.3+1.2e^{4}e^{-10t}\right)dt = 0.4" />,
    reason: <>Setting up the remaining area, with A from part f.i.</>,
  },
  {
    working: <Katex display tex="\left[0.3t-0.12e^{4}e^{-10t}\right]_{0.4}^{a} = 0.3a-0.12e^{4-10a}-\left(0.12-0.12\right)" />,
    reason: <>The antiderivative of <Katex tex="1.2e^{4}e^{-10t}" /> is <Katex tex="-0.12e^{4}e^{-10t}" />; at <Katex tex="t=0.4" /> this is exactly <Katex tex="-0.12" />, which cancels the <Katex tex="0.3(0.4)" />.</>,
  },
  {
    working: <Katex display tex="0.3a - 0.12e^{4-10a} = 0.4" />,
    reason: <>Solve with <Cas fn="nSolve" />. By this point the exponential term is around <Katex tex="10^{-5}" />, so the answer is very close to <Katex tex="\tfrac{0.4}{0.3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 1.33 \text{ hours}}" />,
    reason: <>Two decimal places. Roughly 1 hour 20 minutes.</>,
  },
]

export default function MethodsQ2_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (11 marks)</p>
        <p>A model for the temperature in a room, in degrees Celsius, is given by</p>
        <div className="py-1">
          <Katex
            display
            tex="f(t)=\begin{cases}12+30t & 0\le t\le\tfrac13\\[4pt] 22 & t>\tfrac13\end{cases}"
          />
        </div>
        <p>
          where <Katex tex="t" /> represents time in hours after a heater is switched on.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The whole question runs on knowing which branch you are in. The join is at{' '}
            <Katex tex="t=\tfrac13" /> for the temperature and at <Katex tex="t=0.4" /> for the
            power, and using the wrong rule is the easiest way to go astray: part b. asks
            about <Katex tex="t=\tfrac12" />, which is past the join; part f.ii. asks for a
            time that turns out to be before it.
          </p>
          <p>
            Parts d. and e. sound similar and are not. Part d. is{' '}
            <Katex tex="f(t)=g(t)" />; part e. maximises <Katex tex="\left|f(t)-g(t)\right|" />.
            Because <Katex tex="f-g" /> is negative before they cross, the maximum <em>gap</em>{' '}
            occurs at a <em>minimum</em> of the signed difference — the sign trap behind the
            report's common incorrect answer to part e.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Hybrid Function"
        marks={2}
        statement={<>Express the derivative <Katex tex="f'(t)" /> as a hybrid function.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Average Rate"
        marks={1}
        statement={
          <>
            Find the average rate of change in temperature predicted by the model between{' '}
            <Katex tex="t=0" /> and <Katex tex="t=\tfrac12" />.
            <br />
            Give your answer in degrees Celsius per hour.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
        <p>
          Another model for the temperature in the room is given by{' '}
          <Katex tex="g(t)=22-10e^{-6t}" />, <Katex tex="t\ge0" />.
        </p>
      </div>

      <PartCard letter="c.i" topic="Derivative" marks={1} statement={<>Find the derivative <Katex tex="g'(t)" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Solve Equation"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="t" /> for which <Katex tex="g'(t)=10" />.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Intersections"
        marks={1}
        statement={
          <>
            Find the time <Katex tex="t\in(0,1)" /> when the temperatures predicted by the
            models <Katex tex="f" /> and <Katex tex="g" /> are equal.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Maximum Difference"
        marks={1}
        statement={
          <>
            Find the time <Katex tex="t\in(0,1)" /> when the difference between the
            temperatures predicted by the two models is the greatest.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">f.</p>
        <p>
          The amount of power, in kilowatts, used by the heater <Katex tex="t" /> hours after
          it is switched on, can be modelled by the continuous function <Katex tex="p" />,
          whose graph is shown below.
        </p>
        <div className="py-1">
          <Katex
            display
            tex="p(t)=\begin{cases}1.5 & 0\le t\le0.4\\[4pt] 0.3+Ae^{-10t} & t>0.4\end{cases}"
          />
        </div>
        <p>
          The amount of energy used by the heater, in kilowatt hours, can be estimated by
          evaluating the area between the graph of <Katex tex="y=p(t)" /> and the{' '}
          <Katex tex="t" />-axis.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={powerSrc}
            alt="A power-versus-time graph: flat at 1.5 kilowatts until t = 0.4 hours, then falling steeply and levelling out towards 0.3 kilowatts — from the original 2024 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="f.i"
        topic="Continuity"
        marks={1}
        statement={
          <>
            Given that <Katex tex="p(t)" /> is continuous for <Katex tex="t\ge0" />, show that{' '}
            <Katex tex="A=1.2e^{4}" />.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Area Under Curve"
        marks={1}
        statement={
          <>
            Find how long it takes, after the heater is switched on, until the heater has used
            0.5 kilowatt hours of energy.
            <br />
            Give your answer in hours.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>

      <PartCard
        letter="f.iii"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Find how long it takes, after the heater is switched on, until the heater has used
            1 kilowatt hour of energy.
            <br />
            Give your answer in hours, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_FIII}
      >
        <WorkingTable rows={ROWS_FIII} />
      </PartCard>
    </div>
  )
}
