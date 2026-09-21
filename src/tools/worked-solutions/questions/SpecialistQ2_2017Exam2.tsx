// 2017 Specialist Mathematics — Exam 2, Section B, Question 2 (10 marks).
// A skydiver: two seconds of free fall, then a = g − 0.01v². Terminal velocity, and the
// time and distance to reach 30 m/s. No force analysis is required anywhere — the
// acceleration is supplied — so the whole question is current differential-equation work
// and it is not in the skip guide. Question text transcribed from the original paper (no
// diagram given). Answers verified with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

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
    reason: <>Air resistance is negligible for the first two seconds, so the acceleration is constant and the standard formulas apply. Down is positive, so <Katex tex="g" /> is positive.</>,
  },
  {
    working: <Katex display tex="s = ut+\tfrac12at^2 = 0+\tfrac12(9.8)(2)^2" />,
    reason: <>Or integrate twice from <Katex tex="\ddot x=9.8" /> with <Katex tex="\dot x(0)=x(0)=0" />; both routes are one line.</>,
  },
  {
    working: <Katex display tex="\boxed{s = 19.6 \text{ m}}" />,
    reason: <>Roughly the height of a six-storey building — plausible for two seconds of free fall.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="v = u+at = 0+9.8\times2" />,
    reason: <>Same constant acceleration, same two seconds.</>,
  },
  {
    working: <Katex display tex="\boxed{v = 19.6 \text{ m s}^{-1}}" />,
    reason: <>As required. In a "show that", write the substitution line out — 93% of students did, and it is the only way to earn the mark.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="a = g-0.01v^2 = 0" />,
    reason: <>Terminal velocity is where the acceleration stops: the speed at which resistance exactly balances gravity, so the skydiver stops speeding up.</>,
  },
  {
    working: <Katex display tex="0.01v^2 = 9.8 \implies v^2 = 980" />,
    reason: <>Dividing by <Katex tex="0.01" /> multiplies by <Katex tex="100" />.</>,
  },
  {
    working: <Katex display tex="\boxed{v = \sqrt{980} = 14\sqrt5 \text{ m s}^{-1}}" />,
    reason: <>Since <Katex tex="980=196\times5" />. About <Katex tex="31.3" /> m s<Katex tex="^{-1}" />, or <Katex tex="113" /> km/h. Exact form was required — the report notes decimals losing the mark. Equivalently <Katex tex="10\sqrt{g}" />.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{dv}{dt} = g-0.01v^2" />,
    reason: <>A <em>time</em> is wanted, so use the form of acceleration that involves <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dv} = \frac{1}{9.8-0.01v^2}" />,
    reason: <>Inverting turns it into a straightforward integration with respect to <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \int_{19.6}^{30}\frac{1}{9.8-0.01v^2}\,dv + 2}" />,
    reason: <>Two details carry the marks. The lower terminal is <Katex tex="19.6" />, not <Katex tex="0" />, because the model only starts once air resistance matters; and the <Katex tex="+2" /> adds back the first two seconds. The report says most students missed one or the other.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">nInt(1/(9.8-0.01v²), v, 19.6, 30) + 2</Cas>,
    reason: <>Evaluating the expression from part (d)(i).</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 5.8 \text{ seconds}}" />,
    reason: <>Nearest tenth. Sensible: <Katex tex="30" /> m s<Katex tex="^{-1}" /> is close to the terminal speed of <Katex tex="31.3" />, so the last stretch is slow going — without resistance it would take only <Katex tex="30/9.8\approx3.1" /> s.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="a = v\frac{dv}{dx} = g-0.01v^2" />,
    reason: <>A <em>distance</em> as a function of speed, with no time in it, calls for this form of acceleration.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dv} = \frac{v}{9.8-0.01v^2}" />,
    reason: <>Inverting. Note the extra <Katex tex="v" /> on top compared with part (d) — that single factor is the whole difference between a time and a distance.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \int_{19.6}^{30}\frac{v}{9.8-0.01v^2}\,dv + 19.6}" />,
    reason: <>Same two details as before: start at <Katex tex="19.6" /> m s<Katex tex="^{-1}" />, and add the <Katex tex="19.6" /> m already fallen from part (a).</>,
  },
  {
    working: <Cas fn="nInt">nInt(v/(9.8-0.01v²), v, 19.6, 30) + 19.6</Cas>,
    reason: <>Evaluating.</>,
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

      <PartCard letter="a" marks={2} statement={<>Find the distance, in metres, fallen in the first two seconds.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
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
      </PartCard>

      <PartCard
        letter="d.i"
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
            (d) and (e) are the first two, and the only difference in the integrand is one
            factor of <Katex tex="v" />.
          </p>
          <p>
            The harder point is the bookkeeping. The model{' '}
            <Katex tex="a=g-0.01v^2" /> only applies <em>after</em> two seconds, by which
            time the skydiver is already at <Katex tex="19.6" /> m s<Katex tex="^{-1}" /> and{' '}
            <Katex tex="19.6" /> m down. So the integral starts at{' '}
            <Katex tex="v=19.6" />, and the <Katex tex="2" /> seconds (or{' '}
            <Katex tex="19.6" /> m) has to be added back on. That is where two-thirds of
            students lost marks.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
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
      </PartCard>
    </div>
  )
}
