// 2023 Mathematical Methods — Exam 1 Question 5 (4 marks). An exact definite integral, then
// all values of a terminal that make a second integral match it. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original. Interactive diagram (§15): part b. steps n through the general
// solutions against the shaded domain −3π < k < 2π, with a toggle showing part a.'s cos slip
// giving sin(k) = 3/2 (interactives/meth-2023e1-q5b-crossings.tsx). Part a. (66% full marks)
// doesn't qualify for one. Part b.'s Background (the sin(k) = c method) sits in its card.

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
    reason: <>The antiderivative of <Katex tex="\sin" /> is <Katex tex="-\cos" />, not <Katex tex="\cos" /> — check the sign on the formula sheet.</>,
    more: <>Giving <Katex tex="\cos(x)" /> as the antiderivative is one of the two common errors in the report. It costs more than this mark: part b. uses this answer, and the slip turns <Katex tex="\tfrac12" /> into <Katex tex="-\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="= -\cos\!\left(\frac\pi3\right)+\cos(0) = -\frac12+1" />,
    reason: <>Upper terminal minus lower: <Katex tex="-\cos\!\left(\tfrac\pi3\right)-\bigl(-\cos(0)\bigr)" />. Then <Katex tex="\cos\!\left(\tfrac\pi3\right)=\tfrac12" /> and <Katex tex="\cos(0)=1" />.</>,
    more: <>Don't swap the exact values: it is <Katex tex="\sin\!\left(\tfrac\pi3\right)" /> that equals <Katex tex="\tfrac{\sqrt3}{2}" />. Stating <Katex tex="\cos\!\left(\tfrac\pi3\right)=\tfrac{\sqrt3}{2}" /> is the report's other common error. If unsure, picture the unit circle: the point at <Katex tex="\tfrac\pi3" /> (60°) is <Katex tex="\left(\tfrac12,\tfrac{\sqrt3}{2}\right)" />, and cosine is the <Katex tex="x" />-coordinate.</>,
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
    more: <>Evaluate the integral with the antiderivative rather than reasoning about the area under the graph: <Katex tex="k" /> could be anywhere from <Katex tex="-3\pi" /> to <Katex tex="2\pi" />, so the region would cross several humps above and below the axis, and the parts below count as negative. The report notes that approaches using areas under graphs were very rarely seen and tended to be unsuccessful.</>,
  },
  {
    working: <Katex display tex="= 1-\sin(k)" />,
    reason: <><Katex tex="\sin\!\left(\tfrac\pi2\right)=1" />.</>,
  },
  {
    working: <Katex display tex="1-\sin(k) = \frac12 \implies \sin(k) = \frac12" />,
    reason: <>The "hence": the left-hand integral is part a., which is <Katex tex="\tfrac12" />. Rearrange for <Katex tex="\sin(k)" />, then check the value is in <Katex tex="[-1,1]" />, the range of sine: <Katex tex="\tfrac12" /> is, so there are solutions.</>,
    more: <>This check catches the <Katex tex="\cos(x)" /> slip from part a. Using <Katex tex="\cos(x)" /> as the antiderivative there gives <Katex tex="-\tfrac12" />, so this line becomes <Katex tex="1-\sin(k)=-\tfrac12" />, i.e. <Katex tex="\sin(k)=\tfrac32" />, which is impossible because sine is never more than 1. A value outside <Katex tex="[-1,1]" /> means go back and fix part a., not hunt for an angle. It can't catch every slip: the other part a. error, <Katex tex="\cos\!\left(\tfrac\pi3\right)=\tfrac{\sqrt3}{2}" />, gives <Katex tex="\sin(k)=\tfrac{\sqrt3}{2}" />, which is in range but leads to the wrong angles; only checking part a. itself catches that. This fits the report's comment that students whose part a. was wrong could not find an appropriate exact-value ratio, and so could not identify a reference angle.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{Reference angle } \frac\pi6 \\ \sin(k)>0 \text{ in quadrants 1 and 2}\end{gathered}" />,
    reason: <>The reference angle is the acute angle whose sine is <Katex tex="\tfrac12" />: <Katex tex="\tfrac\pi6" />, since <Katex tex="\sin\!\left(\tfrac\pi6\right)=\tfrac12" /> is an exact value. Sine is positive, so <Katex tex="k" /> is in the 1st or 2nd quadrant: within one revolution, <Katex tex="k=\tfrac\pi6" /> and <Katex tex="k=\pi-\tfrac\pi6=\tfrac{5\pi}{6}" />.</>,
    more: <>In general the reference angle comes from the size of the ratio, ignoring its sign: for <Katex tex="\sin(k)=-\tfrac12" /> it would still be <Katex tex="\tfrac\pi6" />, and the negative sign would send <Katex tex="k" /> to the 3rd and 4th quadrants instead. The 2nd-quadrant angle is <Katex tex="\pi" /> minus the reference angle because <Katex tex="\sin(\pi-\theta)=\sin(\theta)" />: on the unit circle, the points at <Katex tex="\theta" /> and <Katex tex="\pi-\theta" /> are mirror images across the <Katex tex="y" />-axis, at the same height.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} k &= \frac\pi6+2n\pi \\ \text{or } k &= \frac{5\pi}{6}+2n\pi, \quad n\in Z\end{aligned}" />,
    reason: <>Sine repeats every <Katex tex="2\pi" />, so adding or subtracting whole revolutions gives the other solutions. The domain <Katex tex="-3\pi<k<2\pi" /> is two and a half revolutions wide, so expect more than two answers.</>,
  },
  {
    working: <Katex display tex="n=0: \ \frac\pi6,\ \frac{5\pi}{6}; \qquad n=-1: \ -\frac{11\pi}{6},\ -\frac{7\pi}{6}" />,
    reason: <>Write the ends over 6: <Katex tex="-3\pi=-\tfrac{18\pi}{6}" /> and <Katex tex="2\pi=\tfrac{12\pi}{6}" />. <Katex tex="n=-1" /> subtracts <Katex tex="2\pi=\tfrac{12\pi}{6}" />: <Katex tex="\tfrac\pi6-\tfrac{12\pi}{6}=-\tfrac{11\pi}{6}" /> and <Katex tex="\tfrac{5\pi}{6}-\tfrac{12\pi}{6}=-\tfrac{7\pi}{6}" />, both greater than <Katex tex="-\tfrac{18\pi}{6}" />, so inside. The next values out, <Katex tex="n=-2" /> (<Katex tex="-\tfrac{23\pi}{6}" />, <Katex tex="-\tfrac{19\pi}{6}" />) and <Katex tex="n=1" /> (<Katex tex="\tfrac{13\pi}{6}" />, <Katex tex="\tfrac{17\pi}{6}" />), are past the ends, so only <Katex tex="n=0" /> and <Katex tex="n=-1" /> work.</>,
    more: <>Why two and a half revolutions give four answers, not five: the extra half revolution <Katex tex="-3\pi<k<-2\pi" /> is the same part of the unit circle as <Katex tex="\pi<k<2\pi" /> (quadrants 3 and 4), where sine is negative, so <Katex tex="\sin(k)=\tfrac12" /> has no solution there. Stopping at <Katex tex="n=0" /> finds only two of the four values. The diagram below steps <Katex tex="n" /> through both families against the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -\frac{11\pi}{6},\ -\frac{7\pi}{6},\ \frac\pi6,\ \frac{5\pi}{6}}" />,
    reason: <>Check one: <Katex tex="\sin\!\left(-\tfrac{7\pi}{6}\right)=\tfrac12" />, so <Katex tex="1-\sin(k)=\tfrac12" /> ✓.</>,
    more: <>These are the four values in the report's answer. The check works because <Katex tex="-\tfrac{7\pi}{6}+2\pi=\tfrac{5\pi}{6}" />: the same point on the unit circle, in the 2nd quadrant, where sine is positive.</>,
  },
]

export default function MethodsQ5_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
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
        <Background>
          <p>
            Once the integral is evaluated, part b. is a trig equation{' '}
            <Katex tex="\sin(k)=c" /> on an interval. The roadmap for the rows below: range
            check (<Katex tex="c" /> in <Katex tex="[-1,1]" />) → reference angle → quadrants from
            the sign of <Katex tex="c" /> → add whole revolutions (<Katex tex="2n\pi" />) until the
            answers leave the interval at both ends.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Both n = 0 and n = −1 land inside −3π < k < 2π: four values of k, not two">
          <CrossingsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
