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
    reason: <>Sine never goes below <Katex tex="-1" />, so the smallest value of <Katex tex="h" /> comes from <Katex tex="\sin = -1" />. No calculus needed.</>,
    more: <>Differentiating also works, but the report says students who did so tended to make careless errors — the range of sine gets there in one line. Another error the report lists is evaluating <Katex tex="h(10)" />: that is just the depth at 4 pm (<Katex tex="18" /> m), not the smallest depth.</>,
  },
  {
    working: <Katex display tex="h_{\min} = 14+8\times(-1) = 6" />,
    reason: <>Midline <Katex tex="14" /> minus amplitude <Katex tex="8" />. It is reached in the domain: <Katex tex="\tfrac{\pi t}{12}=\tfrac{3\pi}{2}" /> at <Katex tex="t=18" /> (midnight).</>,
    more: <>Check the sign of your answer: the report lists <Katex tex="8-14" /> (a negative depth) as a common error, and its general comments point out that a negative height is not feasible here. A depth must come out positive.</>,
  },
  {
    working: <Katex display tex="\boxed{6 \text{ metres}}" />,
    reason: <>The question asks for a depth, so give the units.</>,
    more: <>The other error the report lists is giving the maximum, <Katex tex="14+8=22" /> m (at <Katex tex="t=6" />, noon), instead of the minimum.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="14+8\sin\!\left(\frac{\pi t}{12}\right) = 10" />,
    reason: <>Set the model equal to the required depth.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\frac{\pi t}{12}\right) = -\frac12" />,
    reason: <>Subtract <Katex tex="14" />, then divide by <Katex tex="8" />.</>,
  },
  {
    working: <Katex display tex="0\le t\le24 \implies 0\le\frac{\pi t}{12}\le2\pi" />,
    reason: <>Transform the domain before solving — it tells you how many solutions to expect. One full revolution: sine takes each value between <Katex tex="-1" /> and <Katex tex="1" /> twice, so expect two.</>,
  },
  {
    working: <Katex display tex="\frac{\pi t}{12} = \pi+\frac{\pi}{6} \;\text{ or }\; 2\pi-\frac{\pi}{6}" />,
    reason: <>Since <Katex tex="\sin\tfrac{\pi}{6}=\tfrac12" />, the base angle is <Katex tex="\tfrac{\pi}{6}" />. Sine is negative in the third and fourth quadrants.</>,
    more: <>The report notes that some students did not recognise the base angle of <Katex tex="\tfrac{\pi}{6}" /> — it comes from the exact-value triangle, ignoring the minus sign. The angle <Katex tex="-\tfrac{\pi}{6}" /> also has sine <Katex tex="-\tfrac12" />, but it lies outside <Katex tex="[0,\,2\pi]" />; <Katex tex="2\pi-\tfrac{\pi}{6}" /> is the same position one revolution on.</>,
  },
  {
    working: <Katex display tex="\frac{\pi t}{12} = \frac{7\pi}{6} \;\text{ or }\; \frac{11\pi}{6}" />,
    reason: <>Simplify each angle.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 14 \text{ and } t = 22}" />,
    reason: <>Multiply each by <Katex tex="\tfrac{12}{\pi}" />. Both lie in <Katex tex="[0,\,24]" />.</>,
    more: <>Check: <Katex tex="h(14)=14+8\sin\tfrac{7\pi}{6}=14-4=10" />, and likewise <Katex tex="h(22)=14+8\sin\tfrac{11\pi}{6}=10" />. In context, <Katex tex="t" /> is measured from 6 am, so these are 8 pm and 4 am.</>,
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
