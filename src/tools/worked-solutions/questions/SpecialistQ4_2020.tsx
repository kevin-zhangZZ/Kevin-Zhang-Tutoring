// 2020 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 28% correct.
// Composite function f(g(x)) and its range. Question text transcribed from the original
// paper. Solution is original.
// Checked (Sept 2026) against the VCAA report (E), itute (E) and two tutors' video walk-throughs
// (E): no disagreements. sympy confirms f(g(x)) = ½sin(2x) on (0, π/2) with maximum ½ at x = π/4,
// and that f(u) = √(u − 1)/u has f′(u) = (2 − u)/(2u²√(u − 1)), so f peaks at u = 2 = g(π/4).
// Interactive diagrams (§15), both this site's own explanatory figures (VCAA printed no graph):
// interactives/spec-2020-mcq4-peak.tsx drags a point along y = ½sin(2x) with hollow excluded ends
// and a solid peak, carrying its height to a range bar, and a toggle shrinks the domain to (0, π/4)
// to show when the range really would be D's (0, ½); interactives/spec-2020-mcq4-inner.tsx runs
// f(g(x)) as a two-stage machine (x → u = cosec²x → √(u − 1)/u) to show the same range from g's
// range (1, ∞) and f's peak at u = 2. The WrongMethod box is the 50% option-D reasoning.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PeakWidget = lazyWidget(() => import('../interactives/spec-2020-mcq4-peak'))
const InnerWidget = lazyWidget(() => import('../interactives/spec-2020-mcq4-inner'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 4, C: 14, D: 50, E: 28 },
  answer: 'E',
  comment: (
    <>
      Options C, D and E have the correct rule but only option E has the correct range. The range must
      include <Katex tex="\tfrac12" /> as <Katex tex="\tfrac12\sin(2x)" /> is a maximum at <Katex tex="x=\tfrac{\pi}{4}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="x-1\ge0,\ x\ne0 \implies \operatorname{dom} f=[1,\infty)" />
        <Katex display tex="0<x<\tfrac{\pi}{2} \implies 0<\sin^2(x)<1" />
        <Katex display tex="\implies \operatorname{cosec}^2(x)>1 \implies \operatorname{ran} g=(1,\infty)" />
        <Katex display tex="\operatorname{ran} g\subseteq\operatorname{dom} f" />
        <Katex display tex="\implies \operatorname{dom}(f\circ g)=\big(0,\tfrac{\pi}{2}\big)" />
      </>
    ),
    reason: (
      <>
        <Katex tex="f\bigl(g(x)\bigr)" /> takes each output of <Katex tex="g" /> and feeds it into <Katex tex="f" />, so it only
        exists if every output of <Katex tex="g" /> is an input <Katex tex="f" /> accepts: range of <Katex tex="g" /> inside the
        domain of <Katex tex="f" />. <Katex tex="f" /> needs <Katex tex="x-1\ge0" /> for the square root (and <Katex tex="x\ne0" />,
        already covered). On <Katex tex="\big(0,\tfrac{\pi}{2}\big)" />, <Katex tex="\sin^2(x)" /> is strictly between 0 and 1, so its
        reciprocal <Katex tex="\operatorname{cosec}^2(x)" /> is always bigger than 1. The check passes, and the composite has{' '}
        <Katex tex="g" />&apos;s domain <Katex tex="\big(0,\tfrac{\pi}{2}\big)" />: the interval the range must be worked out over.
      </>
    ),
  },
  {
    working: <Katex display tex="f(g(x)) = \frac{\sqrt{g(x)-1}}{g(x)} = \frac{\sqrt{\operatorname{cosec}^2(x)-1}}{\operatorname{cosec}^2(x)}" />,
    reason: <>Substitute <Katex tex="g(x)=\operatorname{cosec}^2(x)" /> for every <Katex tex="x" /> in <Katex tex="f(x)=\dfrac{\sqrt{x-1}}{x}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\operatorname{cosec}^2(x)-1 = \cot^2(x)" />
        <Katex display tex="\implies \sqrt{\operatorname{cosec}^2(x)-1} = |\cot(x)| = \cot(x)" />
      </>
    ),
    reason: (
      <>
        <Katex tex="\operatorname{cosec}^2(x)-1" /> is the Pythagorean identity <Katex tex="1+\cot^2(x)=\operatorname{cosec}^2(x)" />{' '}
        rearranged, and it is what makes the square root go away. The square root of a square is the absolute value; for{' '}
        <Katex tex="0<x<\tfrac{\pi}{2}" /> both <Katex tex="\cos(x)" /> and <Katex tex="\sin(x)" /> are positive, so{' '}
        <Katex tex="\cot(x)>0" /> and the absolute value drops.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="f(g(x)) = \frac{\cot(x)}{\operatorname{cosec}^2(x)} = \frac{\cos(x)}{\sin(x)}\times\sin^2(x)" />
        <Katex display tex="= \sin(x)\cos(x) = \tfrac12\sin(2x)" />
      </>
    ),
    reason: (
      <>
        Dividing by <Katex tex="\operatorname{cosec}^2(x)" /> is multiplying by <Katex tex="\sin^2(x)" />. By the double-angle formula{' '}
        <Katex tex="\sin(2x)=2\sin(x)\cos(x)" />, <Katex tex="\sin(x)\cos(x)" /> and <Katex tex="\tfrac12\sin(2x)" /> are the same rule, so
        options C, D and E all have it; A and B have <Katex tex="g\bigl(f(x)\bigr)" />, the functions composed in the wrong order. The
        range decides between C, D and E.
      </>
    ),
  },
  {
    working: <Katex display tex="x\in\big(0,\tfrac{\pi}{2}\big) \;\implies\; 2x\in(0,\pi)" />,
    reason: <>Track the domain through to the angle <Katex tex="2x" /> that the sine actually acts on.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\sin(2x)\in(0,1]" />
        <Katex display tex="\sin(2x)=1 \text{ at } 2x=\tfrac{\pi}{2},\ x=\tfrac{\pi}{4}\in\big(0,\tfrac{\pi}{2}\big)" />
      </>
    ),
    reason: (
      <>
        Picture <Katex tex="\sin" /> on <Katex tex="(0,\pi)" />: it rises from 0, reaches its top value 1 at{' '}
        <Katex tex="\tfrac{\pi}{2}" />, and falls back to 0. So substituting the two endpoints is not enough; the largest value is in
        the middle. Each end of the range needs its own check. The value 0 would only happen at <Katex tex="x=0" /> or{' '}
        <Katex tex="x=\tfrac{\pi}{2}" />, both excluded, so 0 is approached but never reached: open bracket. The value 1 happens at{' '}
        <Katex tex="x=\tfrac{\pi}{4}" />, which <i>is</i> inside the open domain, so it is reached: square bracket. Drag P in the first
        diagram below.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f\bigl(g(x)\bigr)=\tfrac12\sin(2x),\quad \text{range } \big(0,\tfrac12\big]}" />,
    reason: (
      <>
        Matches option <b>E</b>: the range is half-open, including <Katex tex="\tfrac12" /> but not <Katex tex="0" />. Option{' '}
        <b>D</b>, the most popular choice (50%), has the right rule but excludes <Katex tex="\tfrac12" /> (see the common mistake
        below). Option <b>C</b> includes negative values, impossible here since <Katex tex="\sin(x)" /> and <Katex tex="\cos(x)" /> are
        both positive for <Katex tex="0<x<\tfrac{\pi}{2}" /> (<Katex tex="[-0.5,0.5]" /> is the range of <Katex tex="\sin(x)\cos(x)" />{' '}
        with no restriction on <Katex tex="x" />). Check from the original rules: <Katex tex="g\big(\tfrac{\pi}{4}\big)=\operatorname{cosec}^2\big(\tfrac{\pi}{4}\big)=2" />{' '}
        and <Katex tex="f(2)=\tfrac{\sqrt{1}}{2}=\tfrac12" /> ✓, so <Katex tex="\tfrac12" /> really is an output.
      </>
    ),
  },
]

export default function SpecialistQ4_2020() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x) = \dfrac{\sqrt{x-1}}{x}" /> over its implied domain and <Katex tex="g(x) = \operatorname{cosec}^2(x)" /> for{' '}
          <Katex tex="0<x<\tfrac{\pi}{2}" />.
          <br />
          The rule for <Katex tex="f\bigl(g(x)\bigr)" /> and the range, respectively, are given by
        </p>
      }
      background={
        <Background title="Two Ideas This Question Tests">
          <p>
            <b>A composite function</b> <Katex tex="f\bigl(g(x)\bigr)" /> runs <Katex tex="x" /> through <Katex tex="g" /> first and then
            through <Katex tex="f" />. It exists when every output of <Katex tex="g" /> is an allowed input of <Katex tex="f" />{' '}
            (<Katex tex="\operatorname{ran} g\subseteq\operatorname{dom} f" />), and then its domain is the domain of <Katex tex="g" />.
          </p>
          <p>
            <b>The range over an open interval.</b> The range is every <Katex tex="y" />-value the graph reaches. An excluded endpoint
            only loses a value if the graph reaches that value <i>nowhere else</i>. A maximum or minimum inside the interval is always
            reached, open brackets or not.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="f\bigl(g(x)\bigr)=\operatorname{cosec}^2\!\left(\dfrac{\sqrt{x-1}}{x}\right),\ [1,\infty)" /> },
        { letter: 'B', content: <Katex tex="f\bigl(g(x)\bigr)=\operatorname{cosec}^2\!\left(\dfrac{\sqrt{x-1}}{x}\right),\ [2,\infty)" /> },
        { letter: 'C', content: <Katex tex="f\bigl(g(x)\bigr)=\sin(x)\cos(x),\ [-0.5,0.5]\setminus\{0\}" /> },
        { letter: 'D', content: <Katex tex="f\bigl(g(x)\bigr)=\sin(x)\cos(x),\ \left(0,\tfrac12\right)" /> },
        { letter: 'E', content: <Katex tex="f\bigl(g(x)\bigr)=\tfrac12\sin(2x),\ \left(0,\tfrac12\right]" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="An open domain doesn't make an open range: the peak at x = π/4 is inside (0, π/2), so ½ is reached">
            <PeakWidget />
          </Explore>
          <WrongMethod
            title="The domain is open at both ends, so the range must be open at both ends too"
            source="50% chose D"
            working={
              <>
                <Katex display tex="0<x<\tfrac{\pi}{2} \implies 0<2x<\pi" />
                <Katex display tex="\implies 0<\sin(2x)<1" />
                <Katex display tex="\implies \text{range } \big(0,\tfrac12\big) \quad \text{(option D)}" />
              </>
            }
          >
            <p>
              The step from <Katex tex="0<2x<\pi" /> to <Katex tex="0<\sin(2x)<1" /> is where it breaks. Pushing an inequality through a
              function like that only works when the function is increasing over the whole interval, and <Katex tex="\sin" /> is not
              increasing on <Katex tex="(0,\pi)" />: it climbs to 1 at <Katex tex="\tfrac{\pi}{2}" />, which is <i>inside</i> the
              interval, and comes back down. So <Katex tex="\sin(2x)=1" /> does happen, at <Katex tex="x=\tfrac{\pi}{4}" />, and{' '}
              <Katex tex="\tfrac12" /> is in the range.
            </p>
            <p>
              Next time, sketch the graph over the domain before writing the range. Look for a turning point inside the interval: its
              value is always included. Only a value the graph reaches solely at an excluded endpoint (here, 0) is left out.
            </p>
          </WrongMethod>
          <Explore title="Another way to see the range: g hands f every number above 1, and f peaks at u = 2, which is one of them">
            <InnerWidget />
          </Explore>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
