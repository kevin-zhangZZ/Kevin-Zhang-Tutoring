// 2024 Mathematical Methods — Exam 2, Section B Question 5 (11 marks). The two compositions
// of sin(x) with sin(2x): turning points, ranges, the area between them, and when a
// restricted composition exists at all. Question text transcribed from the original paper
// (2024 papers are image-only, so read from rendered pages); the stem figure is a crop of
// VCAA's own artwork. Answers checked with sympy/scipy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
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
    reason: <><Katex tex="f" /> acts first, then <Katex tex="g" />: replace the <Katex tex="x" /> in <Katex tex="\sin(2x)" /> by <Katex tex="\sin(x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\sin\bigl(2\sin(x)\bigr) = 2\cos(x)\cos\bigl(2\sin(x)\bigr) = 0" />,
    reason: <>Chain rule (derivative of the inside, <Katex tex="2\cos(x)" />, times cosine of the inside), then set it to zero for stationary points.</>,
    more: <>On CAS you can also go straight to <Cas fn="fMax" /> on <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />; the working below shows why the answer is what it is.</>,
  },
  {
    working: <Katex display tex="\cos(x) = 0 \implies x = \tfrac{\pi}{2}" />,
    reason: <>The first factor gives the dip between the two dashed crests, where <Katex tex="y=\sin(2)\approx0.91" />: a local minimum, not the maximum we want.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\cos\bigl(2\sin(x)\bigr) = 0 \\ &\implies 2\sin(x) = \tfrac{\pi}{2} \\ &\implies \sin(x) = \tfrac{\pi}{4} \end{aligned}" />,
    reason: <>For <Katex tex="x\in\left[0,\tfrac{\pi}{2}\right]" />, <Katex tex="2\sin(x)\in[0,2]" />, and the only angle there with cosine 0 is <Katex tex="\tfrac{\pi}{2}" /> (the next, <Katex tex="\tfrac{3\pi}{2}\approx4.71" />, is too big).</>,
    more: <><Katex tex="\tfrac{\pi}{4}\approx0.785" /> is less than 1, so <Katex tex="\sin(x)=\tfrac{\pi}{4}" /> does have a solution. Compare part b.ii., where the matching equation needs a sine equal to <Katex tex="\tfrac{\pi}{2}" />, which is impossible.</>,
  },
  {
    working: <Katex display tex="x = \sin^{-1}\!\left(\tfrac{\pi}{4}\right) = 0.9033\ldots" />,
    reason: <>Inverse sine gives the solution lying in <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />.</>,
    more: <>The other solution of <Katex tex="\sin(x)=\tfrac{\pi}{4}" /> in <Katex tex="[0,2\pi]" /> is <Katex tex="\pi-0.9033=2.238" />, the second dashed crest. It lies outside <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />, so it is not asked for: the report notes some students gave the extra solution <Katex tex="(2.2,1)" />.</>,
  },
  {
    working: <Katex display tex="y = \sin\!\left(2\times\tfrac{\pi}{4}\right) = \sin\!\left(\tfrac{\pi}{2}\right) = 1" />,
    reason: <>Substitute back: at this <Katex tex="x" />, <Katex tex="2\sin(x)=\tfrac{\pi}{2}" /> exactly, so <Katex tex="y=1" /> exactly.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.9,\ 1.0)}" />,
    reason: <>One decimal place, as asked (the report also accepts <Katex tex="(0.9,1)" />).</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &x\in[0,2\pi] \\ &\implies \sin(x)\in[-1,1] \\ &\implies 2\sin(x)\in[-2,2] \end{aligned}" />,
    reason: <>Work from the inside out: first find every value the inside, <Katex tex="2\sin(x)" />, takes.</>,
  },
  {
    working: <Katex display tex="\left[-\tfrac{\pi}{2},\tfrac{\pi}{2}\right]\subset[-2,2]" />,
    reason: <>Since <Katex tex="\tfrac{\pi}{2}\approx1.571<2" />, the inside passes through <Katex tex="\tfrac{\pi}{2}" /> and <Katex tex="-\tfrac{\pi}{2}" />, where the outer sine equals <Katex tex="1" /> and <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(g\circ f) = [-1,1]}" />,
    reason: <>A sine never goes beyond <Katex tex="\pm1" />, and both are reached: square brackets, smaller number first.</>,
    more: <>Round brackets such as <Katex tex="(-1,1)" /> would say the endpoints are never reached, yet part a.i. found <Katex tex="y=1" /> at <Katex tex="x\approx0.9" />, and <Katex tex="[1,-1]" /> has the wrong order. <Katex tex="[0,1]" /> ignores the dashed curve going below the <Katex tex="x" />-axis on <Katex tex="(\pi,2\pi)" />, down to <Katex tex="-1" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="(f\circ g)(x) = f\bigl(g(x)\bigr) = \sin\bigl(\sin(2x)\bigr)" />,
    reason: <>The other order: <Katex tex="g" /> acts first, so replace the <Katex tex="x" /> in <Katex tex="\sin(x)" /> by <Katex tex="\sin(2x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\sin\bigl(\sin(2x)\bigr) = \cos\bigl(\sin(2x)\bigr)\times\frac{d}{dx}\sin(2x)" />,
    reason: <>Chain rule: cosine of the inside, times the derivative of the inside.</>,
  },
  {
    working: <Katex display tex="\boxed{(f\circ g)'(x) = 2\cos(2x)\cos\bigl(\sin(2x)\bigr)}" />,
    reason: <>Using <Katex tex="\frac{d}{dx}\sin(2x)=2\cos(2x)" />.</>,
    more: <>The report notes transcription errors, such as incorrect positioning of brackets and writing <Katex tex="x" /> instead of <Katex tex="2x" />. If you copy this from CAS, check every <Katex tex="2x" /> survived and that <Katex tex="\sin(2x)" /> sits inside the second cosine.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(\theta) = 0 \implies \theta = \tfrac{\pi}{2}+k\pi = \pm\tfrac{\pi}{2},\ \pm\tfrac{3\pi}{2},\ \ldots" />,
    reason: <>Every angle whose cosine is 0: <Katex tex="\tfrac{\pi}{2}" /> plus any whole number of half-turns.</>,
    more: <>The report notes many students were not able to find <Katex tex="\cos^{-1}(0)" />, giving <Katex tex="0" /> or <Katex tex="\pi" />. On the unit circle cosine is the <Katex tex="x" />-coordinate, which is 0 at the top and bottom of the circle, <Katex tex="\theta=\tfrac{\pi}{2}" /> and <Katex tex="\tfrac{3\pi}{2}" />. At <Katex tex="\theta=0" /> and <Katex tex="\pi" /> the cosine is <Katex tex="1" /> and <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{so we would need} \\ &\sin(2x) = \tfrac{\pi}{2} \ \text{ or } \ \tfrac{3\pi}{2},\ \ldots \\ &\text{(or their negatives)} \end{aligned}" />,
    reason: <>Put <Katex tex="\theta=\sin(2x)" />: a solution needs <Katex tex="\sin(2x)" /> to equal one of these angles.</>,
  },
  {
    working: <Katex display tex="\text{ran}\bigl(\sin(2x)\bigr) = [-1,1] \quad\text{but}\quad \left|\tfrac{\pi}{2}\right| \approx 1.571 > 1" />,
    reason: <>A sine never leaves <Katex tex="[-1,1]" />, yet even the smallest of these angles, <Katex tex="\pm\tfrac{\pi}{2}" />, is already outside it.</>,
  },
  {
    working: <Katex display tex="\boxed{\therefore \cos\bigl(\sin(2x)\bigr) = 0 \text{ has no real solutions}}" />,
    reason: <>No value of <Katex tex="x" /> can work. As required.</>,
    more: <>For both marks write both halves: the values <Katex tex="\sin(2x)" /> would need, and why it can't reach them. An equivalent argument: <Katex tex="\sin(2x)\in[-1,1]\subset\left(-\tfrac{\pi}{2},\tfrac{\pi}{2}\right)" />, where cosine is strictly positive, so <Katex tex="\cos\bigl(\sin(2x)\bigr)" /> never drops below <Katex tex="\cos(1)\approx0.54" />.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="(f\circ g)'(x) = 2\cos(2x)\cos\bigl(\sin(2x)\bigr) = 0" />,
    reason: <>Stationary points: set the derivative from part b.i. to zero.</>,
  },
  {
    working: <Katex display tex="\cos\bigl(\sin(2x)\bigr) \ne 0 \ \text{ (part b.ii.)} \implies \cos(2x) = 0" />,
    reason: <>Null factor law: one factor must be 0, and part b.ii. showed the second factor never is.</>,
    more: <>This is why b.ii. came first: it removes one factor entirely and leaves an ordinary trigonometric equation.</>,
  },
  {
    working: <Katex display tex="2x = \tfrac{\pi}{2},\ \tfrac{3\pi}{2},\ \tfrac{5\pi}{2},\ \tfrac{7\pi}{2} \quad (0\le 2x\le 4\pi)" />,
    reason: <><Katex tex="x\in[0,2\pi]" /> means <Katex tex="2x\in[0,4\pi]" />: two full cycles of cosine, so four solutions.</>,
    more: <>The report notes some students did not give four values. Check against the graph: the solid curve <Katex tex="f\circ g" /> has two crests and two troughs on <Katex tex="[0,2\pi]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac{\pi}{4},\ \tfrac{3\pi}{4},\ \tfrac{5\pi}{4},\ \tfrac{7\pi}{4}}" />,
    reason: <>Divide by 2. Exact values were required.</>,
    more: <>The report notes others gave approximate answers: <Katex tex="\tfrac{\pi}{4}" /> is exact, 0.785 is not.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="x\in[0,2\pi] \implies \sin(2x)\in[-1,1]" />,
    reason: <>The inside, <Katex tex="\sin(2x)" />, runs through two full cycles, so it takes every value in <Katex tex="[-1,1]" />.</>,
  },
  {
    working: <Katex display tex="\sin(\theta) \text{ is increasing on } [-1,1] \subset \left[-\tfrac{\pi}{2},\tfrac{\pi}{2}\right]" />,
    reason: <>Since <Katex tex="1<\tfrac{\pi}{2}" />, the outer sine only increases on <Katex tex="[-1,1]" />, so its least and greatest outputs come at the endpoints.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f\circ g) = \left[-\sin(1),\ \sin(1)\right]}" />,
    reason: <><Katex tex="\sin(-1)=-\sin(1)" />. Exact values, square brackets, smaller number first.</>,
    more: <>That is about <Katex tex="[-0.841,\,0.841]" />, so this composition never reaches 1, unlike <Katex tex="g\circ f" /> in part a.ii. Round brackets lose the mark because both endpoints are attained (at the stationary points <Katex tex="x=\tfrac{\pi}{4}" /> and <Katex tex="\tfrac{3\pi}{4}" /> from b.iii.), and <Katex tex="[\sin(1),-\sin(1)]" /> has the wrong order.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="(g\circ f)(x)-(f\circ g)(x) = 0 \text{ at } x = 0,\ \pi,\ 2\pi \text{ only}" />,
    reason: <>From the graph in the question, the two curves meet only three times, so the bounded region is two pieces.</>,
    more: <>To confirm on CAS, graph <Katex tex="y=\sin\bigl(2\sin(x)\bigr)-\sin\bigl(\sin(2x)\bigr)" /> on <Katex tex="[0,2\pi]" />: its only zeros are <Katex tex="0,\ \pi,\ 2\pi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{on } (0,\pi): \ g\circ f > f\circ g \\ &\text{on } (\pi,2\pi): \ f\circ g > g\circ f \end{aligned}" />,
    reason: <>The dashed curve <Katex tex="g\circ f" /> is on top for the first half and underneath for the second.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2\int_0^{\pi}\left[\sin\bigl(2\sin(x)\bigr)-\sin\bigl(\sin(2x)\bigr)\right]dx}" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="2\pi-x" /> negates both curves, so the graph has half-turn symmetry about <Katex tex="(\pi,0)" />: the two pieces are equal. Double the first. One integral, as required.</>,
    more: <>The symmetry: replacing <Katex tex="x" /> by <Katex tex="2\pi-x" /> flips the sign of both <Katex tex="\sin(x)" /> and <Katex tex="\sin(2x)" />, so both compositions satisfy <Katex tex="h(2\pi-x)=-h(x)" />. The report notes many students wrote two definite integrals; <Katex tex="\int_0^{\pi}+\int_{\pi}^{2\pi}" /> gives the right area but is not a single integral. The report also accepts <Katex tex="2\int_{\pi}^{2\pi}\left[(f\circ g)(x)-(g\circ f)(x)\right]dx" /> and <Katex tex="\int_0^{2\pi}\left|(g\circ f)(x)-(f\circ g)(x)\right|dx" />. An optional shortcut: on <Katex tex="[0,\pi]" />, <Katex tex="f\circ g" /> completes one full cycle, its hump above the axis cancelling its trough below, so <Katex tex="\int_0^{\pi}\sin\bigl(\sin(2x)\bigr)dx=0" /> and the area is also <Katex tex="2\int_0^{\pi}\sin\bigl(2\sin(x)\bigr)dx" />, i.e. <Katex tex="2\int_0^{\pi}(g\circ f)(x)\,dx" />, which is in the report's list of accepted answers too.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="2\int_0^{\pi}\left[\sin\bigl(2\sin(x)\bigr)-\sin\bigl(\sin(2x)\bigr)\right]dx" />,
    reason: <>No antiderivative can be found by hand, so evaluate the part c.i. integral numerically with <Cas fn="nInt" />.</>,
  },
  {
    working: <Katex display tex="= 2\times2.48455\ldots" />,
    reason: <>The integral over <Katex tex="[0,\pi]" /> is one piece; the factor 2 adds the other.</>,
    more: <>The report notes 2.48 was a common incorrect answer: the area of <em>one</em> piece only, i.e. the factor 2 was lost. Note also that <Katex tex="\int_0^{2\pi}\left[(g\circ f)(x)-(f\circ g)(x)\right]dx" /> without absolute value gives 0, because the two pieces cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{4.97 \text{ square units}}" />,
    reason: <><Katex tex="4.9691\ldots" /> to two decimal places, as asked.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f_1\circ g \text{ is defined} \iff \text{ran}(g)\subseteq\text{dom}(f_1)" />,
    reason: <>A composition needs every output of the inner function <Katex tex="g" /> to be an allowed input of the outer function <Katex tex="f_1" />.</>,
  },
  {
    working: <Katex display tex="\text{dom}(f_1) = (0,2\pi), \qquad g(x) = \sin(2x) \in [-1,1]" />,
    reason: <><Katex tex="f_1" /> accepts only inputs in <Katex tex="(0,2\pi)" />, but <Katex tex="\sin(2x)" /> can also be 0 or negative. So we must restrict the <Katex tex="x" />-values.</>,
    more: <>The restriction on <Katex tex="f_1" /> is the whole point: <Katex tex="\sin" /> is defined everywhere, but <Katex tex="f_1" /> is not. In the report's notation, <Katex tex="[-1,1]\not\subset(0,2\pi)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\sin(2x) \in (0,1] \\ &\text{(the overlap of } [-1,1] \\ &\text{with } (0,2\pi)) \end{aligned}" />,
    reason: <>Keep only the <Katex tex="x" /> whose output <Katex tex="\sin(2x)" /> lies in both sets: <Katex tex="0<\sin(2x)\le1" />.</>,
    more: <>The report notes many students knew that <Katex tex="\text{ran}(g)\subseteq\text{dom}(f_1)" /> but were unable to produce the intervals, and <Katex tex="(0,1]" /> was a common incorrect answer. <Katex tex="(0,1]" /> is the set of allowed <em>values</em> of <Katex tex="\sin(2x)" />, not the set of <Katex tex="x" />: the next step converts one into the other.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\sin(2x) > 0,\ \ 0<2x<4\pi \\ &\implies 2x \in (0,\pi)\cup(2\pi,3\pi) \end{aligned}" />,
    reason: <><Katex tex="x\in(0,2\pi)" /> means <Katex tex="2x\in(0,4\pi)" />: two cycles of sine, positive in the first half of each.</>,
  },
  {
    working: <Katex display tex="\boxed{x \in \left(0,\tfrac{\pi}{2}\right)\cup\left(\pi,\tfrac{3\pi}{2}\right)}" />,
    reason: <>Divide by 2. Round brackets, since at <Katex tex="x=\tfrac{\pi}{2},\ \pi,\ \tfrac{3\pi}{2}" /> the output <Katex tex="\sin(2x)=0" /> is not in <Katex tex="\text{dom}(f_1)" />.</>,
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
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="Two oscillating curves on the same axes from 0 to 2π: a dashed curve labelled y = (g∘f)(x) with flattened crests, and a solid curve labelled y = (f∘g)(x) completing two full cycles — from the original 2024 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <DetailOnly>
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
      </DetailOnly>

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
