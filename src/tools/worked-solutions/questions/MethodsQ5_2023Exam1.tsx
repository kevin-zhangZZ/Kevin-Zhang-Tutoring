// 2023 Mathematical Methods — Exam 1 Question 5 (4 marks). An exact definite integral, then
// all values of a terminal that make a second integral match it. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original. Interactive diagram (§15): part b. steps n through the general
// solutions against the shaded domain −3π < k < 2π, with a toggle showing part a.'s cos slip
// giving sin(k) = 3/2 (interactives/meth-2023e1-q5b-crossings.tsx).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const CrossingsWidget = lazyWidget(() => import('../interactives/meth-2023e1-q5b-crossings'))

const EXAM_A: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      This question required students to evaluate a definite integral. Common errors were
      giving the antiderivative of <Katex tex="\sin(x)" /> as <Katex tex="\cos(x)" /> or
      stating <Katex tex="\cos\!\left(\tfrac\pi3\right)=\tfrac{\sqrt3}{2}" /> instead of{' '}
      <Katex tex="\tfrac12" />. Students are reminded that forms of common integrals are
      provided on the formula sheet.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [22, 17, 27, 35],
  average: 1.8,
  comment: (
    <>
      This question was presented as a 'hence, or otherwise' question and, although not
      essential, most students did well at using their answer from part 5a. Common errors were
      made when students were unable to determine an appropriate exact value ratio (implying
      that their answer from part 5a. was incorrect), and consequently they could not identify
      a reference angle. It is important to note that, since the range of{' '}
      <Katex tex="\sin(x)" /> lies within <Katex tex="[-1,1]" />, <Katex tex="\sin(k)" /> can
      never take a value outside of this range. Other approaches, such as trying to utilise the
      areas under graphs, were very rarely seen and tended to be unsuccessful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{\frac\pi3}\sin(x)\,dx = \Bigl[-\cos(x)\Bigr]_0^{\frac\pi3}" />,
    reason: <>The antiderivative of <Katex tex="\sin" /> is <Katex tex="-\cos" />, not <Katex tex="\cos" /> — the sign is on the formula sheet, and the report notes giving <Katex tex="\cos(x)" /> as a common error.</>,
  },
  {
    working: <Katex display tex="= -\cos\!\left(\frac\pi3\right)+\cos(0) = -\frac12+1" />,
    reason: <>Upper terminal minus lower: <Katex tex="-\cos\!\left(\tfrac\pi3\right)-\bigl(-\cos(0)\bigr)" />. Then <Katex tex="\cos\!\left(\tfrac\pi3\right)=\tfrac12" /> (it is <Katex tex="\sin\!\left(\tfrac\pi3\right)" /> that is <Katex tex="\tfrac{\sqrt3}{2}" />) and <Katex tex="\cos(0)=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac12}" />,
    reason: <><Katex tex="-\tfrac12+1=\tfrac12" />. Part b. uses this value.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\int_k^{\frac\pi2}\cos(x)\,dx = \Bigl[\sin(x)\Bigr]_k^{\frac\pi2} = \sin\!\left(\frac\pi2\right)-\sin(k)" />,
    reason: <>The antiderivative of <Katex tex="\cos" /> is <Katex tex="\sin" />. The unknown <Katex tex="k" /> is the <em>lower</em> terminal, so <Katex tex="\sin(k)" /> is the term subtracted.</>,
  },
  {
    working: <Katex display tex="= 1-\sin(k)" />,
    reason: <><Katex tex="\sin\!\left(\tfrac\pi2\right)=1" />.</>,
  },
  {
    working: <Katex display tex="1-\sin(k) = \frac12 \implies \sin(k) = \frac12" />,
    reason: <>The "hence": the left-hand integral is part a., which is <Katex tex="\tfrac12" />. Rearrange for <Katex tex="\sin(k)" />, then check the value is in <Katex tex="[-1,1]" />, the range of sine. If it isn't (using <Katex tex="\cos(x)" /> as the antiderivative in part a. gives <Katex tex="-\tfrac12" />, so <Katex tex="\sin(k)=\tfrac32" />), there is no solution, which means part a. needs fixing.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{Reference angle } \frac\pi6 \\ \sin(k)>0 \text{ in quadrants 1 and 2}\end{gathered}" />,
    reason: <>The reference angle is <Katex tex="\tfrac\pi6" /> because <Katex tex="\sin\!\left(\tfrac\pi6\right)=\tfrac12" /> is an exact value. Sine is positive, so <Katex tex="k" /> is in the 1st or 2nd quadrant: within one revolution, <Katex tex="k=\tfrac\pi6" /> and <Katex tex="k=\pi-\tfrac\pi6=\tfrac{5\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} k &= \frac\pi6+2n\pi \\ \text{or } k &= \frac{5\pi}{6}+2n\pi, \quad n\in Z\end{aligned}" />,
    reason: <>The general solutions: sine repeats every <Katex tex="2\pi" />, so adding or subtracting whole revolutions gives more solutions. The domain <Katex tex="-3\pi<k<2\pi" /> spans two and a half revolutions, so more than two answers are expected — that width is the hint.</>,
  },
  {
    working: <Katex display tex="n=0: \ \frac\pi6,\ \frac{5\pi}{6}; \qquad n=-1: \ -\frac{11\pi}{6},\ -\frac{7\pi}{6}" />,
    reason: <>Write the ends over 6: <Katex tex="-3\pi=-\tfrac{18\pi}{6}" /> and <Katex tex="2\pi=\tfrac{12\pi}{6}" />. <Katex tex="n=-1" /> subtracts <Katex tex="2\pi" /> from each, and both are still inside. <Katex tex="n=-2" /> gives <Katex tex="-\tfrac{23\pi}{6}" /> and <Katex tex="-\tfrac{19\pi}{6}" />, both less than <Katex tex="-\tfrac{18\pi}{6}" />; <Katex tex="n=1" /> gives <Katex tex="\tfrac{13\pi}{6}" /> and <Katex tex="\tfrac{17\pi}{6}" />, both more than <Katex tex="\tfrac{12\pi}{6}" />. So only <Katex tex="n=0" /> and <Katex tex="n=-1" /> work. (The extra half revolution, <Katex tex="-3\pi<k<-2\pi" />, adds nothing: sine is negative there.)</>,
  },
  {
    working: <Katex display tex="\boxed{k = -\frac{11\pi}{6},\ -\frac{7\pi}{6},\ \frac\pi6,\ \frac{5\pi}{6}}" />,
    reason: <>The four values in the report's answer. Check one: <Katex tex="\sin\!\left(-\tfrac{7\pi}{6}\right)=\tfrac12" />, so <Katex tex="1-\sin(k)=\tfrac12" /> ✓.</>,
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
        topic="Definite Integral"
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
        topic="Trig Equation"
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
        <Explore title="Two answers per revolution — so four values of k fit in −3π < k < 2π">
          <CrossingsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
