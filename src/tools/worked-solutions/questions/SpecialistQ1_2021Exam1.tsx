// 2021 Specialist Mathematics — Exam 1 Question 1 (4 marks). Force and momentum wording
// over vector antidifferentiation. Question text transcribed from the original paper.
// Answers checked against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: (
    <>
      This question was answered well, with students recognising that they needed to use the
      formula <Katex tex="F=ma" />. Some students found the magnitude of acceleration.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 14, 66],
  average: 1.5,
  comment: (
    <>
      The majority of students were able to make some progress towards finding the velocity
      of the particle by either integration or use of a constant acceleration formula.
      Students are reminded to be careful with their working — it was common to see the
      final result written as{' '}
      <Katex tex="\underset{\sim}{v}(t)=\tfrac12t\underset{\sim}{i}-\tfrac95t\underset{\sim}{j}" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <>
      Some arithmetic errors were observed. A number of students gave the magnitude of the
      momentum.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{F} = m\underset{\sim}{a} \implies \underset{\sim}{a} = \frac{\underset{\sim}{F}}{m}" />,
    reason: 'Dividing a vector by a scalar — nothing more than scaling each component.',
  },
  {
    working: <Katex display tex="\underset{\sim}{a} = \frac{5\underset{\sim}{i}+12\underset{\sim}{j}}{10}" />,
    reason: 'The mass is 10 kg.',
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{a} = \tfrac12\underset{\sim}{i}+\tfrac65\underset{\sim}{j}\ \text{m s}^{-2}}" />,
    reason: <>A <em>vector</em>. Its magnitude would be <Katex tex="1.3" />, which is not what the question asks for.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = \int\underset{\sim}{a}\,dt = \underset{\sim}{a}t+\underset{\sim}{c}" />,
    reason: 'The acceleration is constant, so antidifferentiating is just multiplying by t.',
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(0) = -3\underset{\sim}{j} \implies \underset{\sim}{c} = -3\underset{\sim}{j}" />,
    reason: 'The initial velocity is the constant of integration.',
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = \left(\tfrac12\underset{\sim}{i}+\tfrac65\underset{\sim}{j}\right)t-3\underset{\sim}{j}" />,
    reason: 'Substituting.',
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{v}(t) = \tfrac12t\,\underset{\sim}{i}+\left(\tfrac65t-3\right)\underset{\sim}{j}\ \text{m s}^{-1}}" />,
    reason: <>The <Katex tex="-3" /> stays outside the <Katex tex="t" /> — combining it into <Katex tex="-\tfrac95t" /> is the report's named slip.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v}(2) = \tfrac12(2)\underset{\sim}{i}+\left(\tfrac65(2)-3\right)\underset{\sim}{j} = \underset{\sim}{i}-\tfrac35\underset{\sim}{j}" />,
    reason: <><Katex tex="\tfrac{12}{5}-3=-\tfrac35" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{p} = m\underset{\sim}{v} = 10\left(\underset{\sim}{i}-\tfrac35\underset{\sim}{j}\right)" />,
    reason: 'Momentum is mass times velocity — the units in the question give the formula away.',
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{p}(2) = 10\underset{\sim}{i}-6\underset{\sim}{j}\ \text{kg m s}^{-1}}" />,
    reason: <>Again a vector, not its magnitude <Katex tex="\sqrt{136}" />.</>,
  },
]

export default function SpecialistQ1_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
        <p>
          The net force acting on a body of mass 10 kg is{' '}
          <Katex tex="\underset{\sim}{F}=5\underset{\sim}{i}+12\underset{\sim}{j}" /> newtons.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6">
        <Background title="Force and momentum wording, vector calculus">
          <p>
            Mechanics is no longer an area of study in Specialist Mathematics, and this
            question uses two of its formulas: <Katex tex="F=ma" /> in part a. and{' '}
            <Katex tex="p=mv" /> in part c. Both are handed to you by the units printed in
            the question.
          </p>
          <p>
            Everything else — dividing a vector by a scalar, antidifferentiating a constant
            vector with an initial condition, and scaling the result — is current vector
            calculus, so the question is well worth doing.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Find the acceleration of the body in <Katex tex="\text{m s}^{-2}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            The initial velocity of the body is{' '}
            <Katex tex="-3\underset{\sim}{j}\ \text{m s}^{-1}" />. Find the velocity of the
            body, in <Katex tex="\text{m s}^{-1}" />, at any time <Katex tex="t" /> seconds.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={
          <>
            Find the momentum of the body, in <Katex tex="\text{kg m s}^{-1}" />, when{' '}
            <Katex tex="t=2" /> seconds.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
