// 2023 Mathematical Methods — Exam 1 Question 5 (4 marks). An exact definite integral, then
// all values of a terminal that make a second integral match it. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      Common errors were giving the antiderivative of <Katex tex="\sin(x)" /> as{' '}
      <Katex tex="\cos(x)" />, or stating <Katex tex="\cos\!\left(\tfrac\pi3\right)=\tfrac{\sqrt3}{2}" />{' '}
      instead of <Katex tex="\tfrac12" />. Students are reminded that forms of common integrals
      are provided on the formula sheet.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [22, 17, 27, 35],
  average: 1.8,
  comment: (
    <>
      Common errors were made when students were unable to determine an appropriate exact
      value ratio, and consequently could not identify a reference angle. It is important to
      note that, since the range of <Katex tex="\sin(x)" /> lies within{' '}
      <Katex tex="[-1,1]" />, <Katex tex="\sin(k)" /> can never take a value outside this
      range.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{\frac\pi3}\sin(x)\,dx = \Bigl[-\cos(x)\Bigr]_0^{\frac\pi3}" />,
    reason: <>The antiderivative of <Katex tex="\sin" /> is <Katex tex="-\cos" />, not <Katex tex="\cos" /> — the sign is on the formula sheet and is the report's first named error.</>,
  },
  {
    working: <Katex display tex="= -\cos\!\left(\frac\pi3\right)+\cos(0) = -\frac12+1" />,
    reason: <><Katex tex="\cos\!\left(\tfrac\pi3\right)=\tfrac12" /> (it is <Katex tex="\sin\!\left(\tfrac\pi3\right)" /> that is <Katex tex="\tfrac{\sqrt3}{2}" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\frac12}" />,
    reason: 'A clean value, which part b. then has to match.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\int_k^{\frac\pi2}\cos(x)\,dx = \Bigl[\sin(x)\Bigr]_k^{\frac\pi2} = \sin\!\left(\frac\pi2\right)-\sin(k)" />,
    reason: <>The unknown is the <em>lower</em> terminal, so it appears with a minus sign.</>,
  },
  {
    working: <Katex display tex="= 1-\sin(k)" />,
    reason: 'One expression in k, which is all that is needed.',
  },
  {
    working: <Katex display tex="1-\sin(k) = \frac12 \implies \sin(k) = \frac12" />,
    reason: <>Using part a. — the "hence". A value outside <Katex tex="[-1,1]" /> here would mean an arithmetic slip, not a hard equation.</>,
  },
  {
    working: <Katex display tex="\text{Reference angle } \frac\pi6; \quad \sin>0 \text{ in the 1st and 2nd quadrants}" />,
    reason: <>So within one revolution, <Katex tex="k=\tfrac\pi6" /> and <Katex tex="k=\pi-\tfrac\pi6=\tfrac{5\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="\text{General solutions: } k = \frac\pi6+2n\pi \ \text{ or } \ k = \frac{5\pi}{6}+2n\pi, \ n\in\mathbb{Z}" />,
    reason: <>The domain <Katex tex="-3\pi<k<2\pi" /> spans two and a half revolutions, so more than two answers are expected — that width is the hint.</>,
  },
  {
    working: <Katex display tex="n=0: \ \frac\pi6,\ \frac{5\pi}{6}; \qquad n=-1: \ -\frac{11\pi}{6},\ -\frac{7\pi}{6}" />,
    reason: <>Subtracting <Katex tex="2\pi" /> from each. The next ones down, <Katex tex="-\tfrac{23\pi}{6}" />, and the next ones up, <Katex tex="\tfrac{13\pi}{6}" />, both fall outside the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -\frac{11\pi}{6},\ -\frac{7\pi}{6},\ \frac\pi6,\ \frac{5\pi}{6}}" />,
    reason: 'All four values are required for full marks.',
  },
]

export default function MethodsQ5_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The wide domain <Katex tex="-3\pi<k<2\pi" /> is the question telling you it wants
            more than the obvious answer. Solve for the reference angle, write the general
            solution, then step through the values of <Katex tex="n" /> until you leave the
            interval — checking both ends.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Evaluate <Katex tex="\displaystyle\int_0^{\frac\pi3}\sin(x)\,dx" />.
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
            Hence, or otherwise, find all values of <Katex tex="k" /> such that{' '}
            <Katex tex="\displaystyle\int_0^{\frac\pi3}\sin(x)\,dx=\int_k^{\frac\pi2}\cos(x)\,dx" />
            , where <Katex tex="-3\pi<k<2\pi" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
