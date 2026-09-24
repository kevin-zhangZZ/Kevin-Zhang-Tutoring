// 2024 Mathematical Methods — Exam 2, Section B Question 5 (11 marks). The two compositions
// of sin(x) with sin(2x): turning points, ranges, the area between them, and when a
// restricted composition exists at all. Question text transcribed from the original paper
// (2024 papers are image-only, so read from rendered pages); the stem figure is a crop of
// VCAA's own artwork. Answers checked with sympy/scipy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2024e2-q5-graph.png'

const EXAM_AI: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      This question was answered well. Some students gave an extra solution,{' '}
      <Katex tex="(2.2,1)" />.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [37, 63],
  average: 0.6,
  comment: (
    <>
      Many students wrote <Katex tex="[1,-1]" />. Others had incorrect brackets such as{' '}
      <Katex tex="(-1,1)" />. <Katex tex="[0,1]" /> was a common incorrect answer.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [18, 82],
  average: 0.8,
  comment: (
    <>
      There were some transcription errors, such as incorrect positioning of brackets and
      writing <Katex tex="x" /> instead of <Katex tex="2x" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [57, 9, 34],
  average: 0.8,
  comment: (
    <>
      This question was not answered well. It was a 'show that' question. Many students were not
      able to find <Katex tex="\cos^{-1}(0)" />, giving <Katex tex="\cos^{-1}(0)=0" /> or{' '}
      <Katex tex="\cos^{-1}(0)=\pi" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [53, 47],
  average: 0.5,
  comment: <>Some students did not give four values. Others gave approximate answers.</>,
}

const EXAM_BIV: SAExaminerStats = {
  marks: [66, 34],
  average: 0.4,
  comment: (
    <>
      Exact answers were required. Some students used round brackets. Others wrote{' '}
      <Katex tex="[\sin(1),-\sin(1)]" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [68, 32],
  average: 0.3,
  comment: <>A single definite integral was required. Many students wrote two definite integrals.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [55, 45],
  average: 0.5,
  comment: <>2.48 was a common incorrect answer.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [80, 11, 9],
  average: 0.3,
  comment: (
    <>
      Many students knew that <Katex tex="\text{ran}(g)\subseteq\text{dom}(f_1)" /> but were
      unable to produce the intervals. <Katex tex="(0,1]" /> was a common incorrect answer.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="(g\circ f)(x) = g\bigl(f(x)\bigr) = \sin\bigl(2\sin(x)\bigr)" />,
    reason: <>Substituting <Katex tex="\sin(x)" /> into <Katex tex="\sin(2x)" />. The inner amplitude 2 is what makes this composition interesting.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\sin\bigl(2\sin(x)\bigr) = 2\cos(x)\cos\bigl(2\sin(x)\bigr) = 0" />,
    reason: <>Chain rule, then set to zero.</>,
  },
  {
    working: <Katex display tex="\cos\bigl(2\sin(x)\bigr) = 0 \implies 2\sin(x) = \tfrac{\pi}{2} \implies \sin(x) = \tfrac{\pi}{4}" />,
    reason: <><Katex tex="\tfrac{\pi}{4}\approx0.785<1" />, so this is attainable — unlike in part b.ii., where the analogous equation has no solution.</>,
  },
  {
    working: <Katex display tex="x = \sin^{-1}\!\left(\tfrac{\pi}{4}\right) = 0.9033\ldots" />,
    reason: <>The other solution <Katex tex="\pi-0.9033=2.238" /> lies outside <Katex tex="\left[0,\tfrac{\pi}{2}\right]" /> — the report notes some students gave it as an extra solution.</>,
  },
  {
    working: <Katex display tex="y = \sin\!\left(2\times\tfrac{\pi}{4}\right) = \sin\!\left(\tfrac{\pi}{2}\right) = 1" />,
    reason: <>Exactly 1 — the composition reaches the full height of a sine curve.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.9,\ 1.0)}" />,
    reason: <>One decimal place, as asked.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="x\in[0,2\pi] \implies \sin(x)\in[-1,1] \implies 2\sin(x)\in[-2,2]" />,
    reason: <>Working outwards through the composition.</>,
  },
  {
    working: <Katex display tex="\left[-\tfrac{\pi}{2},\tfrac{\pi}{2}\right]\subset[-2,2]" />,
    reason: <>Because <Katex tex="\tfrac{\pi}{2}\approx1.571<2" />, the inner expression sweeps past both places where the outer sine peaks — so both <Katex tex="1" /> and <Katex tex="-1" /> are actually reached.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(g\circ f) = [-1,1]}" />,
    reason: <>Closed brackets, and in increasing order — the report notes many students wrote <Katex tex="[1,-1]" />. Part a.i. already produced the value 1 at <Katex tex="x=0.9" />, which confirms the upper end.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="(f\circ g)(x) = f\bigl(g(x)\bigr) = \sin\bigl(\sin(2x)\bigr)" />,
    reason: <>The other order of composition.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\sin\bigl(\sin(2x)\bigr) = \cos\bigl(\sin(2x)\bigr)\times\frac{d}{dx}\sin(2x)" />,
    reason: <>Chain rule, outer function first.</>,
  },
  {
    working: <Katex display tex="\boxed{(f\circ g)'(x) = 2\cos(2x)\cos\bigl(\sin(2x)\bigr)}" />,
    reason: <>Writing <Katex tex="\cos(x)" /> in place of <Katex tex="\cos(2x)" /> is a transcription slip the report notes.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(\theta) = 0 \implies \theta = \tfrac{\pi}{2}+k\pi = \pm\tfrac{\pi}{2},\ \pm\tfrac{3\pi}{2},\ \ldots" />,
    reason: <>The general solution. The report notes many students gave <Katex tex="\cos^{-1}(0)=0" /> or <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\text{so we would need } \sin(2x) = \tfrac{\pi}{2} \ \text{ or } \ \tfrac{3\pi}{2},\ \ldots \ \text{(or their negatives)}" />,
    reason: <>Setting <Katex tex="\theta=\sin(2x)" />.</>,
  },
  {
    working: <Katex display tex="\text{ran}\bigl(\sin(2x)\bigr) = [-1,1] \quad\text{but}\quad \left|\tfrac{\pi}{2}\right| \approx 1.571 > 1" />,
    reason: <>Every candidate value lies outside the range of a sine function — and the ones further out are further outside still.</>,
  },
  {
    working: <Katex display tex="\boxed{\therefore \cos\bigl(\sin(2x)\bigr) = 0 \text{ has no real solutions}}" />,
    reason: <>Equivalently: <Katex tex="\sin(2x)\in[-1,1]\subset\left(-\tfrac{\pi}{2},\tfrac{\pi}{2}\right)" />, on which the cosine is strictly positive — it never drops below <Katex tex="\cos(1)\approx0.54" />. As required.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="(f\circ g)'(x) = 2\cos(2x)\cos\bigl(\sin(2x)\bigr) = 0" />,
    reason: <>From part b.i.</>,
  },
  {
    working: <Katex display tex="\cos\bigl(\sin(2x)\bigr) \ne 0 \ \text{ (part b.ii.)} \implies \cos(2x) = 0" />,
    reason: <>This is why b.ii. came first — it removes one factor entirely and leaves an ordinary trigonometric equation.</>,
  },
  {
    working: <Katex display tex="2x = \tfrac{\pi}{2},\ \tfrac{3\pi}{2},\ \tfrac{5\pi}{2},\ \tfrac{7\pi}{2} \quad (0\le 2x\le 4\pi)" />,
    reason: <>Doubling the domain means four solutions, not two — the report notes some students did not give four values.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac{\pi}{4},\ \tfrac{3\pi}{4},\ \tfrac{5\pi}{4},\ \tfrac{7\pi}{4}}" />,
    reason: <>Exact values were required.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="x\in[0,2\pi] \implies \sin(2x)\in[-1,1]" />,
    reason: <>The inner function attains its full range, since <Katex tex="2x" /> covers two complete periods.</>,
  },
  {
    working: <Katex display tex="\sin(\theta) \text{ is increasing on } [-1,1] \subset \left[-\tfrac{\pi}{2},\tfrac{\pi}{2}\right]" />,
    reason: <>So the outer sine preserves the order of the endpoints — no turning point is met on the way.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f\circ g) = \left[-\sin(1),\ \sin(1)\right]}" />,
    reason: <>About <Katex tex="[-0.841,\,0.841]" />, so this composition never reaches 1 — unlike <Katex tex="g\circ f" /> in part a.ii. Exact values, square brackets, and in increasing order.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="(g\circ f)(x)-(f\circ g)(x) = 0 \text{ at } x = 0,\ \pi,\ 2\pi \text{ only}" />,
    reason: <>From the diagram: the two curves meet just three times, so the region has exactly two pieces.</>,
  },
  {
    working: <Katex display tex="\text{on } (0,\pi): \ g\circ f > f\circ g; \qquad \text{on } (\pi,2\pi): \ f\circ g > g\circ f" />,
    reason: <>The dashed curve is on top for the first half and underneath for the second — both curves are odd about <Katex tex="x=\pi" />, so the two pieces are congruent.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2\int_0^{\pi}\left[\sin\bigl(2\sin(x)\bigr)-\sin\bigl(\sin(2x)\bigr)\right]dx}" />,
    reason: <>A single integral, as required. The report notes many students wrote two definite integrals. The absolute-value form <Katex tex="\int_0^{2\pi}\left|(g\circ f)-(f\circ g)\right|dx" /> is equally acceptable.</>,
  },
  {
    working: <Katex display tex="\int_0^{\pi}\sin\bigl(\sin(2x)\bigr)dx = 0 \implies \text{Area} = 2\int_0^{\pi}\sin\bigl(2\sin(x)\bigr)dx" />,
    reason: <>A bonus simplification: over <Katex tex="[0,\pi]" /> the function <Katex tex="f\circ g" /> completes a full period and contributes nothing. VCAA accepted this shorter form too.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="2\int_0^{\pi}\left[\sin\bigl(2\sin(x)\bigr)-\sin\bigl(\sin(2x)\bigr)\right]dx" />,
    reason: <>Straight into <Cas fn="nInt" /> — there is no elementary antiderivative here.</>,
  },
  {
    working: <Katex display tex="= 2\times2.48455\ldots" />,
    reason: <>This inner value, 2.48, was the common wrong answer — it is the area of <em>one</em> of the two pieces.</>,
  },
  {
    working: <Katex display tex="\boxed{4.97 \text{ square units}}" />,
    reason: <>Two decimal places, as asked.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f_1\circ g \text{ is defined} \iff \text{ran}(g)\subseteq\text{dom}(f_1)" />,
    reason: <>The standard existence condition for a composition — the inner outputs must be legal inner inputs for the outer function.</>,
  },
  {
    working: <Katex display tex="\text{dom}(f_1) = (0,2\pi), \qquad g(x) = \sin(2x) \in [-1,1]" />,
    reason: <>The restriction on <Katex tex="f_1" /> is the whole point: <Katex tex="\sin" /> is defined everywhere, but <Katex tex="f_1" /> is not.</>,
  },
  {
    working: <Katex display tex="\sin(2x) \in (0,1] \quad \text{(the overlap of } [-1,1] \text{ with } (0,2\pi))" />,
    reason: <>Only the positive part survives. Stopping here and answering <Katex tex="(0,1]" /> was the common error — that is the set of <em>values</em>, not the set of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\sin(2x) > 0 \implies 2x \in (0,\pi)\cup(2\pi,3\pi) \quad (0<2x<4\pi)" />,
    reason: <>Where a sine is positive, over two full periods.</>,
  },
  {
    working: <Katex display tex="\boxed{x \in \left(0,\tfrac{\pi}{2}\right)\cup\left(\pi,\tfrac{3\pi}{2}\right)}" />,
    reason: <>Open brackets throughout, since <Katex tex="\sin(2x)=0" /> is excluded from <Katex tex="\text{dom}(f_1)" />.</>,
  },
]

export default function MethodsQ5_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (11 marks)</p>
        <p>
          The graph below shows the compositions <Katex tex="g\circ f" /> and{' '}
          <Katex tex="f\circ g" />, where <Katex tex="f(x)=\sin(x)" /> and{' '}
          <Katex tex="g(x)=\sin(2x)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="Two oscillating curves on the same axes from 0 to 2π: a dashed curve labelled y = (g∘f)(x) with flattened crests, and a solid curve labelled y = (f∘g)(x) completing two full cycles — from the original 2024 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The whole question is a contrast between the two orders of composition.{' '}
            <Katex tex="(g\circ f)(x)=\sin\bigl(2\sin x\bigr)" /> has inner values spanning{' '}
            <Katex tex="[-2,2]" />, which is wide enough to contain{' '}
            <Katex tex="\pm\tfrac{\pi}{2}" />, so it reaches the full height{' '}
            <Katex tex="\pm1" /> and has extra turning points.{' '}
            <Katex tex="(f\circ g)(x)=\sin\bigl(\sin 2x\bigr)" /> has inner values only in{' '}
            <Katex tex="[-1,1]" />, which never reaches <Katex tex="\tfrac{\pi}{2}" /> — so it
            peaks at only <Katex tex="\sin(1)" />, and the factor{' '}
            <Katex tex="\cos\bigl(\sin 2x\bigr)" /> in its derivative can never vanish.
          </p>
          <p>
            That one inequality, <Katex tex="1<\tfrac{\pi}{2}<2" />, drives parts a.ii., b.ii.
            and b.iv. alike.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a.i"
        topic="Composite Function"
        marks={1}
        statement={
          <>
            The graph of <Katex tex="y=(g\circ f)(x)" /> has a local maximum whose{' '}
            <Katex tex="x" />-value lies in the interval{' '}
            <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />.
            <br />
            Find the coordinates of this local maximum, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Range"
        marks={1}
        statement={
          <>
            State the range of <Katex tex="g\circ f" /> where <Katex tex="x\in[0,2\pi]" />.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard letter="b.i" topic="Chain Rule" marks={1} statement={<>Find the derivative of <Katex tex="f\circ g" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Trig Equation"
        marks={2}
        statement={
          <>
            Show that the equation <Katex tex="\cos\bigl(\sin(2x)\bigr)=0" /> has no real
            solutions.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Stationary Points"
        marks={1}
        statement={
          <>
            Find the <Katex tex="x" />-values of the stationary points of{' '}
            <Katex tex="f\circ g" /> where <Katex tex="x\in[0,2\pi]" />.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="b.iv"
        topic="Range"
        marks={1}
        statement={
          <>
            Find the range of <Katex tex="f\circ g" /> where <Katex tex="x\in[0,2\pi]" />.
          </>
        }
        examinerReport={EXAM_BIV}
      >
        <WorkingTable rows={ROWS_BIV} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Definite Integral"
        marks={1}
        statement={
          <>
            Write a single definite integral that gives the area bounded by the graphs of{' '}
            <Katex tex="y=(f\circ g)(x)" /> and <Katex tex="y=(g\circ f)(x)" /> in the interval{' '}
            <Katex tex="[0,2\pi]" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            Hence, state the area bounded by the graphs of <Katex tex="y=(f\circ g)(x)" /> and{' '}
            <Katex tex="y=(g\circ f)(x)" /> in the interval <Katex tex="[0,2\pi]" />, correct
            to two decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Composite Domain"
        marks={2}
        statement={
          <>
            Let <Katex tex="f_1:(0,2\pi)\to R" />, <Katex tex="f_1(x)=\sin(x)" />.
            <br />
            Find all values of <Katex tex="x" /> in the interval <Katex tex="(0,2\pi)" /> for which
            the composition <Katex tex="f_1\circ g" /> is defined.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
