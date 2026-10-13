// 2015 Specialist Mathematics — Exam 2, Section 2 Question 5, part (d) only (7 of 12 marks).
// Parts (a), (b) and (c) are Mechanics (resolving the weight force on a ramp) and are omitted;
// part (d) starts from the differential equation printed above it and is ordinary
// current-syllabus work. Question text transcribed from the original paper (the ramp diagram
// belongs to the omitted parts). Answers checked with sympy and against the VCAA examination
// report. Solution is original.
//
// Interactives (qualifying parts d.i 30% and d.iv 12% full marks): d.iv has one, the time as the
// area under dt/dv between the speed limits 0 and 5. d.i skipped: its lost mark is an algebraic
// split of v/(7-v), which a picture does not explain.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const TimeArea = lazyWidget(() => import('../interactives/spec-2015e2-q5d4-time-area'))

const EXAM_DI: SAExaminerStats = {
  marks: [42, 29, 30],
  average: 0.9,
  comment: (
    <>
      Many students managed to get the correct form for acceleration and inverted, but omitted
      the step to establish the final form, which could have been division or another valid
      method.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      In this "show that" question, many students did not include the constant of integration
      or show its evaluation.
    </>
  ),
}

const EXAM_DIII: SAExaminerStats = {
  marks: [47, 53],
  average: 0.6,
  comment: (
    <>
      A number of students did not attempt this question. A few students incorrectly
      substituted <Katex tex="v=-5" />.
    </>
  ),
}

const EXAM_DIV: SAExaminerStats = {
  marks: [84, 3, 1, 12],
  average: 0.4,
  comment: (
    <>
      Only a small number of students attempted this question. Some attempted to find the
      time using direct integration instead of a definite integral.
    </>
  ),
}

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d^2x}{dt^2} = 1.4\left(7-\frac{dx}{dt}\right) = 1.4(7-v)" />,
    reason: <>Writing <Katex tex="v=\tfrac{dx}{dt}" /> as the question instructs.</>,
  },
  {
    working: <Katex display tex="v\frac{dv}{dx} = 1.4(7-v)" />,
    reason: <>The target links <Katex tex="x" /> and <Katex tex="v" /> only, so write the acceleration as <Katex tex="\tfrac{d^2x}{dt^2}=v\tfrac{dv}{dx}" />, the form with no <Katex tex="t" />.</>,
    more: <>Acceleration has three useful forms: <Katex tex="\tfrac{dv}{dt}" />, <Katex tex="v\tfrac{dv}{dx}" /> and <Katex tex="\tfrac{d}{dx}\bigl(\tfrac12v^2\bigr)" />. Pick by which two variables the answer involves: here <Katex tex="x" /> and <Katex tex="v" />, so <Katex tex="v\tfrac{dv}{dx}" />. Part d(iv) asks for a time, and there the <Katex tex="\tfrac{dv}{dt}" /> form is the right one.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dv} = \frac{v}{1.4(7-v)} \implies 1.4\frac{dx}{dv} = \frac{v}{7-v}" />,
    reason: <>Divide by <Katex tex="v" /> to get <Katex tex="\tfrac{dv}{dx}" />, invert to get <Katex tex="\tfrac{dx}{dv}" />, then multiply by <Katex tex="1.4" />.</>,
  },
  {
    working: <Katex display tex="\frac{v}{7-v} = \frac{-(7-v)+7}{7-v}" />,
    reason: <>The target is a constant plus a fraction, so rewrite the numerator <Katex tex="v" /> as <Katex tex="-(7-v)+7" /> to make the fraction split.</>,
    more: <>The report says many students omitted this step. It is what earns the second mark: stopping at <Katex tex="\tfrac{v}{7-v}" /> leaves the "show that" unfinished. Any valid method earns it, including long division of <Katex tex="v" /> by <Katex tex="-v+7" /> (quotient <Katex tex="-1" />, remainder <Katex tex="7" />). Check by recombining: <Katex tex="-1+\tfrac{7}{7-v}=\tfrac{-(7-v)+7}{7-v}=\tfrac{v}{7-v}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{1.4\frac{dx}{dv} = -1+\frac{7}{7-v}}" />,
    reason: <>Splitting the fraction. As required.</>,
    more: <>The point of this form is that each term can now be antidifferentiated with respect to <Katex tex="v" />, which is exactly what part d(ii) does next.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="1.4x = \int\left(-1+\frac{7}{7-v}\right)dv" />,
    reason: <>Part d(i) gives <Katex tex="\tfrac{d}{dv}(1.4x)" /> as a function of <Katex tex="v" /> alone, so antidifferentiate it with respect to <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="1.4x = -v-7\log_e|7-v|+c" />,
    reason: <>Using <Katex tex="\int\tfrac{1}{7-v}\,dv=-\log_e|7-v|" />: the derivative of <Katex tex="7-v" /> is <Katex tex="-1" />, hence the minus sign. Keep the <Katex tex="+c" />.</>,
    more: <>Check by differentiating: <Katex tex="\tfrac{d}{dv}\bigl(-7\log_e(7-v)\bigr)=-7\cdot\tfrac{-1}{7-v}=\tfrac{7}{7-v}" />. The report says many students did not include the constant of integration; without it the given answer, with its extra term <Katex tex="7\log_e(7)" />, cannot be reached honestly.</>,
  },
  {
    working: <Katex display tex="x=0,\ v=0:\quad 0 = 0-7\log_e(7)+c" />,
    reason: <>The trailer "sinks vertically from rest", with depth measured from where it starts: when <Katex tex="x=0" />, <Katex tex="v=0" />.</>,
    more: <>In a 1-mark "show that", this evaluation is the mark. The report says many students did not show the evaluation of the constant; writing the given answer straight after an unexplained <Katex tex="+c" /> earns nothing.</>,
  },
  {
    working: <Katex display tex="c = 7\log_e(7)" />,
    reason: <>Solving for the constant.</>,
  },
  {
    working: <Katex display tex="\boxed{1.4x = -v-7\log_e(7-v)+7\log_e(7)}" />,
    reason: <>The modulus can go: the speed rises from 0 towards 7 but never reaches it (the acceleration <Katex tex="1.4(7-v)" /> falls to 0 as <Katex tex="v" /> nears 7), so <Katex tex="7-v>0" />. As required.</>,
    more: <>So 7 m/s is the terminal velocity, approached but never reached. To see it explicitly, solving <Katex tex="\tfrac{dv}{dt}=1.4(7-v)" /> with <Katex tex="v(0)=0" /> gives <Katex tex="v=7\left(1-e^{-1.4t}\right)" />, which is always less than 7.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="v = 5:\quad 1.4D = -5-7\log_e(2)+7\log_e(7)" />,
    reason: <>Substitute <Katex tex="x=D" />, <Katex tex="v=5" /> into part d(ii). It is <Katex tex="+5" />: <Katex tex="x" /> is a depth, measured downwards, so sinking makes <Katex tex="v>0" />.</>,
    more: <>The report says a few students incorrectly substituted <Katex tex="v=-5" />, treating "descending" as the negative direction. Here the positive direction is down: the depth <Katex tex="x" /> increases as the trailer sinks, so <Katex tex="v=\tfrac{dx}{dt}" /> is positive. The <Katex tex="\log_e(2)" /> comes from <Katex tex="7-5=2" />.</>,
  },
  {
    working: <Katex display tex="1.4D = -5+7\log_e\!\left(\tfrac72\right) = -5+8.769\ldots" />,
    reason: <>Combining the logarithms: <Katex tex="7\log_e(7)-7\log_e(2)=7\log_e\!\left(\tfrac72\right)" />.</>,
  },
  {
    working: <Katex display tex="D = \frac{3.769\ldots}{1.4} = 2.692\ldots" />,
    reason: <>Dividing by <Katex tex="1.4" />.</>,
    more: <>On CAS, <Cas fn="solve">solve(1.4·x = −5 − 7·ln(7−5) + 7·ln(7), x)</Cas> gives the same <Katex tex="2.692\ldots" />. Exactly, <Katex tex="D=\tfrac{7\log_e(7/2)-5}{1.4}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{D \approx 2.7\ \text{metres}}" />,
    reason: <>To one decimal place.</>,
  },
]

const ROWS_DIV: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dv}{dt} = 1.4(7-v) \implies \frac{dt}{dv} = \frac{1}{1.4(7-v)}" />,
    reason: <>The question asks for a time, so use the acceleration form that contains <Katex tex="t" />, <Katex tex="\tfrac{dv}{dt}" />, and invert.</>,
    more: <>The other route, <Katex tex="t=\int_0^D\tfrac{1}{v}\,dx" />, needs <Katex tex="v" /> as a function of <Katex tex="x" />, and the equation from part d(ii) cannot be rearranged for <Katex tex="v" />. Working in <Katex tex="v" /> avoids that: <Katex tex="\tfrac{dt}{dv}" /> depends on <Katex tex="v" /> alone.</>,
  },
  {
    working: <Katex display tex="t = \int_0^5\frac{1}{1.4(7-v)}\,dv" />,
    reason: <>The variable is <Katex tex="v" />, so the limits are speeds: from rest (<Katex tex="v=0" />) to <Katex tex="v=5" />, the speed at depth <Katex tex="D" /> (part d(iii)).</>,
    more: <>This line is what "write down a definite integral" asks for, and it earns marks on its own. The report says some students attempted to find the time using direct integration instead of a definite integral, presumably finding <Katex tex="t" /> as a function of <Katex tex="v" /> with a constant and then substituting. That can reach 0.9, but it does not answer the question as set. A related slip is using <Katex tex="D\approx2.7" /> as the upper limit: <Katex tex="D" /> is a depth, not a speed, and that integral gives about 0.35 s, the time to reach a speed of 2.7 m/s.</>,
  },
  {
    working: <Cas fn="nInt">∫(1/(1.4(7-v)), v, 0, 5)</Cas>,
    reason: <>By hand: <Katex tex="\tfrac1{1.4}\bigl[-\log_e(7-v)\bigr]_0^5 = \tfrac1{1.4}\log_e\!\left(\tfrac72\right)" />.</>,
  },
  {
    working: <Katex display tex="t = 0.8948\ldots" />,
    reason: <>Evaluating.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 0.9\ \text{seconds}}" />,
    reason: <>To one decimal place.</>,
    more: <>Sense check: 2.7 m in about 0.9 s is an average speed of about 3 m/s, between the starting speed 0 and the final speed 5.</>,
  },
]

export default function SpecialistQ5_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (12 marks) — part d. only</p>
        <p>
          When the trailer rolls into the water, it stops, then sinks vertically from rest so
          that its depth <Katex tex="x" /> metres after <Katex tex="t" /> seconds is given by
          the differential equation
        </p>
        <div>
          <Katex display tex="\frac{d^2x}{dt^2} = 1.4\left(7-\frac{dx}{dt}\right)" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background title="Why only part d." always>
          <p>
            Parts a., b. and c. of this question resolve the weight force on a 250 kg trailer
            held on a ramp inclined at <Katex tex="10^\circ" />. Mechanics is no longer an area
            of study in VCE Specialist Mathematics, so those three parts are omitted here.
          </p>
          <p>
            Part d. stands on its own: it begins from a differential equation the paper prints
            in full, and everything after that is ordinary separable-equation work.
          </p>
        </Background>
      </div>

      <PartCard
        letter="d.i"
        topic="Acceleration Form"
        marks={2}
        statement={
          <>
            Show that the above differential equation can be written as{' '}
            <Katex tex="1.4\dfrac{dx}{dv} = -1+\dfrac{7}{7-v}" />, where{' '}
            <Katex tex="v=\tfrac{dx}{dt}" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Separable DE"
        marks={1}
        statement={
          <>
            Hence, show by integration that{' '}
            <Katex tex="1.4x = -v-7\log_e(7-v)+7\log_e(7)" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="d.iii"
        topic="Solve for Depth"
        marks={1}
        statement={
          <>
            When the trailer has sunk to a depth of <Katex tex="D" /> metres, it is descending
            at a rate of 5 ms<sup>−1</sup>. Find <Katex tex="D" />, correct to one decimal
            place.
          </>
        }
        examinerReport={EXAM_DIII}
      >
        <WorkingTable rows={ROWS_DIII} />
      </PartCard>

      <PartCard
        letter="d.iv"
        topic="Time Integral"
        marks={3}
        statement={
          <>
            Write down a definite integral for the time, in seconds, taken for the trailer to
            sink to the depth of <Katex tex="D" /> metres and evaluate this integral correct to
            one decimal place.
          </>
        }
        examinerReport={EXAM_DIV}
      >
        <WorkingTable rows={ROWS_DIV} />
        <Explore title="The time is the area under dt/dv between the starting and final speeds">
          <TimeArea />
        </Explore>
      </PartCard>
    </div>
  )
}
