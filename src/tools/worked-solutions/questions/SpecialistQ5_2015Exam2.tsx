// 2015 Specialist Mathematics — Exam 2, Section 2 Question 5, part (d) only (7 of 12 marks).
// Parts (a), (b) and (c) are Mechanics (resolving the weight force on a ramp) and are omitted;
// part (d) starts from the differential equation printed above it and is ordinary
// current-syllabus work. Question text transcribed from the original paper (the ramp diagram
// belongs to the omitted parts). Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

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
    reason: <>The target involves <Katex tex="\tfrac{dx}{dv}" />, so choose the form of acceleration that relates <Katex tex="v" /> and <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dv} = \frac{v}{1.4(7-v)} \implies 1.4\frac{dx}{dv} = \frac{v}{7-v}" />,
    reason: <>Inverting both sides and multiplying by <Katex tex="1.4" />.</>,
  },
  {
    working: <Katex display tex="\frac{v}{7-v} = \frac{-(7-v)+7}{7-v}" />,
    reason: <>The step the report says was most often skipped: rewrite the numerator so the fraction splits. (Long division of <Katex tex="v" /> by <Katex tex="7-v" /> gives the same thing.)</>,
  },
  {
    working: <Katex display tex="\boxed{1.4\frac{dx}{dv} = -1+\frac{7}{7-v}}" />,
    reason: <>As required — and now the right-hand side is something that can actually be antidifferentiated.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="1.4x = \int\left(-1+\frac{7}{7-v}\right)dv" />,
    reason: <>Integrating part d(i) with respect to <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="1.4x = -v-7\log_e|7-v|+c" />,
    reason: <>The derivative of <Katex tex="7-v" /> is <Katex tex="-1" />, which is where the minus sign in front of the logarithm comes from.</>,
  },
  {
    working: <Katex display tex="x=0,\ v=0:\quad 0 = 0-7\log_e(7)+c" />,
    reason: <>The trailer "sinks vertically from rest", so it starts at zero depth with zero speed. The report says the marks were lost for skipping exactly this evaluation.</>,
  },
  {
    working: <Katex display tex="c = 7\log_e(7)" />,
    reason: <>Solving for the constant.</>,
  },
  {
    working: <Katex display tex="\boxed{1.4x = -v-7\log_e(7-v)+7\log_e(7)}" />,
    reason: <>The modulus can be dropped: the trailer never reaches <Katex tex="v=7" /> (that is the terminal velocity), so <Katex tex="7-v>0" /> throughout.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="v = 5:\quad 1.4D = -5-7\log_e(2)+7\log_e(7)" />,
    reason: <>Substituting the given descent rate. It is <Katex tex="+5" />, not <Katex tex="-5" /> — <Katex tex="v" /> was defined as <Katex tex="\tfrac{dx}{dt}" /> with <Katex tex="x" /> measured <em>downwards</em> as a depth.</>,
  },
  {
    working: <Katex display tex="1.4D = -5+7\log_e\!\left(\tfrac72\right) = -5+8.769\ldots" />,
    reason: <>Combining the logarithms.</>,
  },
  {
    working: <Katex display tex="D = \frac{3.769\ldots}{1.4} = 2.692\ldots" />,
    reason: <>Dividing.</>,
  },
  {
    working: <Katex display tex="\boxed{D \approx 2.7\ \text{metres}}" />,
    reason: <>To one decimal place.</>,
  },
]

const ROWS_DIV: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dv}{dt} = 1.4(7-v) \implies \frac{dt}{dv} = \frac{1}{1.4(7-v)}" />,
    reason: <>For a time, go back to <Katex tex="\tfrac{dv}{dt}" /> rather than reusing the <Katex tex="x" />-<Katex tex="v" /> relation.</>,
  },
  {
    working: <Katex display tex="t = \int_0^5\frac{1}{1.4(7-v)}\,dv" />,
    reason: <>A <em>definite</em> integral in <Katex tex="v" />: the trailer reaches depth <Katex tex="D" /> exactly when its speed reaches <Katex tex="5" />, so the velocity terminals do the job — which is why part d(iii) came first.</>,
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
    reason: <>To one decimal place. Only 12% of students scored full marks here.</>,
  },
]

export default function SpecialistQ5_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (12 marks) — part d. only</p>
        <p>
          Parts a., b. and c. of this question resolve the weight force on a 250 kg trailer
          held on a ramp inclined at <Katex tex="10^\circ" />. Mechanics is no longer an area
          of study in VCE Specialist Mathematics, so those three parts are omitted here.
        </p>
        <p>
          Part d. stands on its own: it begins from a differential equation the paper prints
          in full, and everything after that is ordinary separable-equation work.
        </p>
        <p>
          When the trailer rolls into the water, it stops, then sinks vertically from rest so
          that its depth <Katex tex="x" /> metres after <Katex tex="t" /> seconds is given by
          the differential equation
        </p>
        <div>
          <Katex display tex="\frac{d^2x}{dt^2} = 1.4\left(7-\frac{dx}{dt}\right)" />
        </div>
      </div>

      <PartCard
        letter="d.i"
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
      </PartCard>
    </div>
  )
}
