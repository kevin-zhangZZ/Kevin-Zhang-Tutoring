// 2015 Mathematical Methods (CAS) — Exam 1, Question 5 (3 marks).
// Minimum depth and the times at a given depth for a sinusoidal tide model. Question text
// transcribed from the original paper (no diagram given). Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      This question was generally well handled. Common errors included finding the maximum
      height rather than the minimum, negative heights (<Katex tex="8-14" />) and
      evaluating <Katex tex="h(10)" />. Students who used calculus to obtain a minimum value
      tended to make careless errors in the differentiation.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [25, 23, 53],
  average: 1.3,
  comment: (
    <>
      This question was well handled. Most students set up an equation that when solved
      would yield the two correct answers for the restricted domain. Some students did not
      recognise the base angle of <Katex tex="\tfrac{\pi}{6}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le\sin\!\left(\frac{\pi t}{12}\right)\le1" />,
    reason: <>No calculus needed — a sinusoid's extremes come straight from the amplitude.</>,
  },
  {
    working: <Katex display tex="h_{\min} = 14-8" />,
    reason: <>The minimum is the midline minus the amplitude. Reading it as <Katex tex="8-14" /> gives a negative depth, which the report notes as an error a quick sanity check would catch.</>,
  },
  {
    working: <Katex display tex="\boxed{6 \text{ metres}}" />,
    reason: <>And the maximum would be <Katex tex="22" /> m, for comparison.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="14+8\sin\!\left(\frac{\pi t}{12}\right) = 10" />,
    reason: <>Setting the model equal to the required depth.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\frac{\pi t}{12}\right) = -\frac12" />,
    reason: <>Subtract <Katex tex="14" />, divide by <Katex tex="8" />.</>,
  },
  {
    working: <Katex display tex="0\le t\le24 \implies 0\le\frac{\pi t}{12}\le2\pi" />,
    reason: <>Transform the domain before solving — that is what tells you how many solutions to expect. Here exactly one full revolution, so two.</>,
  },
  {
    working: <Katex display tex="\frac{\pi t}{12} = \pi+\frac{\pi}{6} = \frac{7\pi}{6} \quad\text{or}\quad 2\pi-\frac{\pi}{6} = \frac{11\pi}{6}" />,
    reason: <>Sine is negative in the third and fourth quadrants, with base angle <Katex tex="\tfrac{\pi}{6}" /> — the exact value the report says some students did not recognise.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 14 \text{ and } t = 22}" />,
    reason: <>Multiplying each by <Katex tex="\tfrac{12}{\pi}" />. In context: 8 pm and 4 am, since <Katex tex="t" /> is measured from 6 am.</>,
  },
]

export default function MethodsQ5_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (3 marks)</p>
        <p>
          On any given day, the depth of water in a river is modelled by the function{' '}
          <Katex tex="h(t)=14+8\sin\!\left(\dfrac{\pi t}{12}\right)" />,{' '}
          <Katex tex="0\le t\le24" />, where <Katex tex="h" /> is the depth of water, in
          metres, and <Katex tex="t" /> is the time, in hours, after 6 am.
        </p>
      </div>

      <PartCard letter="a" topic="Minimum Value" marks={1} statement={<>Find the minimum depth of the water in the river.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Trig Equation"
        marks={2}
        statement={
          <>
            Find the values of <Katex tex="t" /> for which <Katex tex="h(t)=10" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
