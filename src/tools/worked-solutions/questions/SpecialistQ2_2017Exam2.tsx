// 2017 Specialist Mathematics — Exam 2, Section B, Question 2 (10 marks).
// A skydiver: two seconds of free fall, then a = g − 0.01v². Terminal velocity, and the
// time and distance to reach 30 m/s. No force analysis is required anywhere — the
// acceleration is supplied — so the whole question is current differential-equation work
// and it is not in the skip guide. Question text transcribed from the original paper (no
// diagram given). Answers verified with scipy (closed forms and an ODE solve agree: 5.80 s,
// 120.0 m). itute agrees on every part. Solution is original.
//
// Interactive widgets: c — the v–t curve with a sliding tangent and gravity-vs-resistance
// bars, flattening onto v = 14√5 as a → 0 (spec-2017e2-q2c-terminal); d — the two phases on
// the v–t graph, target speed slider, 2 s + ∫_{19.6}^{V} (toggle: the model applied from the
// start, ∫_0^{30} ≈ 6.15 s) (spec-2017e2-q2d-two-phases); e — distance as area under the v–t
// graph, phase 2 sliced by speed so each strip has width Δv/a and area vΔv/a (toggle: ∫_0^{30}
// ≈ 125.3 m) (spec-2017e2-q2e-slices). WrongMethod boxes: c (decimal instead of exact), d.i
// and e (the report's two misreadings of where the model starts).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const TerminalWidget = lazyWidget(() => import('../interactives/spec-2017e2-q2c-terminal'))
const TwoPhasesWidget = lazyWidget(() => import('../interactives/spec-2017e2-q2d-two-phases'))
const SlicesWidget = lazyWidget(() => import('../interactives/spec-2017e2-q2e-slices'))

const EXAM_A: SAExaminerStats = {
  marks: [7, 5, 88],
  average: 1.8,
  comment: (
    <>
      Most students correctly used constant acceleration formulas. A smaller number of
      students started with an expression for acceleration and integrated correctly, either
      using definite integrals or evaluating the constant separately.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [7, 93],
  average: 1.0,
  comment: <>The majority of students were able to demonstrate the key steps required to show the correct value of <Katex tex="v" />.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [52, 48],
  average: 0.5,
  comment: (
    <>
      Correct solutions were generally obtained by setting <Katex tex="a=0" />. Some answers
      were not given in exact form.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [38, 44, 17],
  average: 0.8,
  comment: (
    <>
      This question was often misinterpreted by students, either by assuming that the model
      applied from the start of the skydiver's fall (integrating from <Katex tex="0" /> to{' '}
      <Katex tex="30" />) or by giving an answer that only gave the time after{' '}
      <Katex tex="2" /> seconds. Many students did not attempt this question.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = { marks: [75, 25], average: 0.3 }

const EXAM_E: SAExaminerStats = {
  marks: [52, 26, 6, 16],
  average: 0.9,
  comment: (
    <>
      While a variety of solutions was given, the errors apparent in Question 2d.i., as a
      result of not taking the first <Katex tex="2" /> seconds of motion into account, also
      appeared in responses to this question.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="a = g = 9.8,\qquad u = 0,\qquad t = 2" />,
    reason: <>Air resistance is negligible for the first two seconds, so the only acceleration is gravity — constant — and the constant-acceleration formulas apply. &ldquo;Falls from rest&rdquo; gives <Katex tex="u=0" />, and down is positive, so <Katex tex="a=+g" />.</>,
  },
  {
    working: <Katex display tex="s = ut+\tfrac12at^2 = 0+\tfrac12(9.8)(2)^2" />,
    reason: <>We know <Katex tex="u" />, <Katex tex="a" />, <Katex tex="t" /> and want <Katex tex="s" />, so pick the formula without <Katex tex="v" />. Or integrate twice from <Katex tex="\ddot x=9.8" /> with <Katex tex="\dot x(0)=x(0)=0" />; the report notes both routes were used successfully.</>,
  },
  {
    working: <Katex display tex="\boxed{s = 19.6 \text{ m}}" />,
    reason: <>Roughly the height of a six-storey building — plausible for two seconds of free fall.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="v = u+at = 0+9.8\times2" />,
    reason: <>Same constant acceleration, same two seconds; now we want <Katex tex="v" />, so use the formula with <Katex tex="v" /> in it. State the formula and the values you substitute — that line is the mark in a &ldquo;show that&rdquo;.</>,
  },
  {
    working: <Katex display tex="\boxed{v = 19.6 \text{ m s}^{-1}}" />,
    reason: <>Note <Katex tex="19.6 = 2g" />: this speed, and the <Katex tex="19.6" /> m from part a., are where the air-resistance model starts in parts d. and e. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="a = g-0.01v^2 = 0" />,
    reason: <>Terminal velocity is the speed the skydiver settles at, so it is the speed at which the speed stops changing: <Katex tex="\tfrac{dv}{dt}=0" />. Physically, the resistance <Katex tex="0.01v^2" /> has grown until it exactly cancels <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="0.01v^2 = 9.8 \implies v^2 = 980" />,
    reason: <>Dividing by <Katex tex="0.01" /> multiplies by <Katex tex="100" />. Take the positive root: down is positive and the skydiver is falling.</>,
  },
  {
    working: <Katex display tex="\boxed{v = \sqrt{980} = 14\sqrt5 \text{ m s}^{-1}}" />,
    reason: <>Since <Katex tex="980=196\times5" />. About <Katex tex="31.3" /> m s<Katex tex="^{-1}" />, or <Katex tex="113" /> km/h. Give the exact form — the report notes some answers were not given in exact form. Equivalently <Katex tex="10\sqrt{g}" />.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{dv}{dt} = g-0.01v^2" />,
    reason: <>List what you have and what you want: <Katex tex="a" /> is given in terms of <Katex tex="v" />, and a <em>time</em> is wanted. The form of acceleration that links <Katex tex="v" /> and <Katex tex="t" /> is <Katex tex="\tfrac{dv}{dt}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dv} = \frac{1}{9.8-0.01v^2}" />,
    reason: <>The right side has no <Katex tex="t" /> in it, so we cannot integrate with respect to <Katex tex="t" />. Flip both sides instead: now <Katex tex="\tfrac{dt}{dv}" /> is a function of <Katex tex="v" />, and integrating it from one speed to another gives the time that passes between those speeds. Each small speed step <Katex tex="\Delta v" /> takes <Katex tex="\Delta t\approx\tfrac{\Delta v}{a}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \int_{19.6}^{30}\frac{1}{9.8-0.01v^2}\,dv + 2}" />,
    reason: <>Two details carry the marks. The lower terminal is <Katex tex="19.6" />, not <Katex tex="0" />, because the model only starts once air resistance matters; and the <Katex tex="+2" /> adds back the first two seconds. The report says the question was often misinterpreted in exactly these two ways.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">nInt(1/(9.8-0.01v²), v, 19.6, 30) + 2</Cas>,
    reason: <>&ldquo;Hence&rdquo; means use the expression from part d.i., and &ldquo;nearest tenth&rdquo; tells you a numerical answer is expected, so numerical integration is fine. Type the whole expression, including the <Katex tex="+2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 5.8 \text{ seconds}}" />,
    reason: <>Nearest tenth. Sensible: <Katex tex="30" /> m s<Katex tex="^{-1}" /> is close to the terminal speed of <Katex tex="31.3" />, so the last stretch is slow going — without resistance it would take only <Katex tex="30/9.8\approx3.1" /> s.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="a = v\frac{dv}{dx} = g-0.01v^2" />,
    reason: <>Now a <em>distance</em> is wanted, and we know the speeds (<Katex tex="19.6" /> to <Katex tex="30" />), not the times. So use the form of acceleration that links <Katex tex="v" /> and <Katex tex="x" />. It comes from the chain rule: <Katex tex="\tfrac{dv}{dt}=\tfrac{dv}{dx}\cdot\tfrac{dx}{dt}=v\tfrac{dv}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dv} = \frac{v}{9.8-0.01v^2}" />,
    reason: <>Flip, as in part d. Compared with part d. there is an extra <Katex tex="v" /> on top, and it has a meaning: a speed step <Katex tex="\Delta v" /> takes time <Katex tex="\tfrac{\Delta v}{a}" />, and at speed <Katex tex="v" /> you fall <Katex tex="v\times\tfrac{\Delta v}{a}" /> in that time.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \int_{19.6}^{30}\frac{v}{9.8-0.01v^2}\,dv + 19.6}" />,
    reason: <>Same two details as before: start at <Katex tex="19.6" /> m s<Katex tex="^{-1}" />, because that is the speed when the model takes over, and add the <Katex tex="19.6" /> m already fallen in free fall (part a.). The report says this part repeated part d.i.&apos;s error of not taking the first 2 seconds into account.</>,
  },
  {
    working: <Cas fn="nInt">nInt(v/(9.8-0.01v²), v, 19.6, 30) + 19.6</Cas>,
    reason: <>The integral alone is about <Katex tex="100.4" /> m, the fall during the resistance phase.</>,
  },
  {
    working: <Katex display tex="\boxed{x \approx 120 \text{ m}}" />,
    reason: <>Nearest metre. A rough check: the average speed over the resisted stage is somewhere near <Katex tex="26" /> m s<Katex tex="^{-1}" /> over about <Katex tex="3.8" /> s, giving roughly <Katex tex="100" /> m, plus the <Katex tex="19.6" /> m from free fall.</>,
  },
]

export default function SpecialistQ2_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (10 marks)</p>
        <p>
          A helicopter is hovering at a constant height above a fixed location. A skydiver
          falls from rest for two seconds from the helicopter. The skydiver is subject only to
          gravitational acceleration and air resistance is negligible for the first two
          seconds. Let downward displacement be positive.
        </p>
      </div>

      <PartCard letter="a" topic="Displacement" marks={2} statement={<>Find the distance, in metres, fallen in the first two seconds.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Velocity"
        marks={1}
        statement={
          <>
            Show that the speed of the skydiver after two seconds is <Katex tex="19.6" /> m
            s<Katex tex="^{-1}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          After two seconds, air resistance is significant and the acceleration of the
          skydiver is given by <Katex tex="a = g-0.01v^2" />.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Terminal Velocity"
        marks={1}
        statement={
          <>
            Find the limiting (terminal) velocity, in m s<Katex tex="^{-1}" />, that the
            skydiver would reach.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why setting a = 0 finds the terminal velocity">
          <TerminalWidget />
        </Explore>
        <WrongMethod
          title="Give the terminal velocity as 31.3 m/s"
          source="Examiner's report"
          working={<Katex display tex="v=\sqrt{980}\approx 31.3" />}
        >
          The value is right but the form is not: the question gives no rounding instruction, so an
          exact answer is expected, and the report notes some answers were not given in exact form.
          When a surd like <Katex tex="\sqrt{980}" /> appears, simplify it (<Katex tex="980=196\times5" />)
          and stop at <Katex tex="14\sqrt5" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Time Integral"
        marks={2}
        statement={
          <>
            Write down an expression involving a definite integral that gives the time taken
            for the skydiver to reach a speed of <Katex tex="30" /> m s<Katex tex="^{-1}" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <Background title="Which form of acceleration, and where does the clock start?">
          <p>
            Acceleration can be written <Katex tex="\dfrac{dv}{dt}" /> (use it when you want
            a time), <Katex tex="v\dfrac{dv}{dx}" /> (use it when you want a distance in
            terms of speed), or <Katex tex="\dfrac{d}{dx}\!\left(\tfrac12v^2\right)" />. Parts
            d. and e. use the first two, and the only difference in the integrand is one
            factor of <Katex tex="v" />.
          </p>
          <p>
            The harder point is the bookkeeping. The model{' '}
            <Katex tex="a=g-0.01v^2" /> only applies <em>after</em> two seconds, by which
            time the skydiver is already at <Katex tex="19.6" /> m s<Katex tex="^{-1}" /> and{' '}
            <Katex tex="19.6" /> m down. So the integral starts at{' '}
            <Katex tex="v=19.6" />, and the <Katex tex="2" /> seconds (or{' '}
            <Katex tex="19.6" /> m) has to be added back on. The report says this part was often
            misinterpreted on exactly this point, and many students did not attempt it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DI} />
        <Explore title="The model only takes over at 2 s and 19.6 m/s — so the time comes in two pieces">
          <TwoPhasesWidget />
        </Explore>
        <WrongMethod
          title="Use the model from the moment the skydiver jumps"
          source="Examiner's report"
          working={<Katex display tex="t=\int_{0}^{30}\frac{1}{9.8-0.01v^2}\,dv\approx 6.1" />}
        >
          This integral describes a skydiver who meets air resistance from the start. Ours has none for
          the first 2 seconds, so starts faster and reaches <Katex tex="30" /> m s
          <Katex tex="^{-1}" /> sooner (<Katex tex="5.8" /> s). Before you write the lower terminal, ask:
          what is the speed at the moment this rule starts to apply? Here it is{' '}
          <Katex tex="19.6" />, from part b.
        </WrongMethod>
        <WrongMethod
          title="Give just the integral from 19.6 to 30"
          source="Examiner's report"
          working={<Katex display tex="t=\int_{19.6}^{30}\frac{1}{9.8-0.01v^2}\,dv\approx 3.8" />}
        >
          The lower terminal is right, but this is only the time spent <em>after</em> the first 2
          seconds. &ldquo;The time taken&rdquo; is measured from when the skydiver leaves the
          helicopter, so the 2 seconds of free fall must be added back on.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Time Integral"
        marks={1}
        statement={
          <>
            Hence, find the time, in seconds, taken to reach a speed of <Katex tex="30" /> m
            s<Katex tex="^{-1}" />, correct to the nearest tenth of a second.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Distance Integral"
        marks={3}
        statement={
          <>
            Write down an expression involving a definite integral that gives the distance
            through which the skydiver falls to reach a speed of <Katex tex="30" /> m
            s<Katex tex="^{-1}" />. Find this distance, giving your answer in metres, correct
            to the nearest metre.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="Distance is the area under the v–t graph — slice it by speed and the integrand appears">
          <SlicesWidget />
        </Explore>
        <WrongMethod
          title="Integrate from 0 to 30 again"
          source="Examiner's report"
          working={<Katex display tex="x=\int_{0}^{30}\frac{v}{9.8-0.01v^2}\,dv\approx 125" />}
        >
          The same misreading as in part d.i.: the first <Katex tex="19.6" /> m were fallen with{' '}
          <Katex tex="a=9.8" />, not <Katex tex="a=9.8-0.01v^2" />, so this integral describes a different
          fall. Adding <Katex tex="19.6" /> to it (about <Katex tex="145" /> m) counts the first two
          seconds twice.
        </WrongMethod>
        <WrongMethod
          title="Stop after the integral from 19.6 to 30"
          source="Examiner's report"
          working={<Katex display tex="x=\int_{19.6}^{30}\frac{v}{9.8-0.01v^2}\,dv\approx 100" />}
        >
          This is only the distance fallen after the first 2 seconds. The question asks how far the
          skydiver falls to reach <Katex tex="30" /> m s<Katex tex="^{-1}" />, measured from the
          helicopter, so add the <Katex tex="19.6" /> m from part a.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
