// 2023 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 30% correct. Largest
// interval on which both f∘g and g∘f exist, requiring both composite domains to be found and
// intersected. Question text transcribed from the original paper. Solution is original.
// Answer A checked numerically in Python (a fine grid over x ∈ [−15, 160]): f∘g exists on
// (−π/4 + 2πk, 5π/4 + 2πk), k = 0, −1, −2, … (the x < 5 restriction stops the k = 1 piece, which
// would start at 7π/4 ≈ 5.50); g∘f exists on (−1/√2, e⁵ − 1/√2); the overlap is (−1/√2, 5π/4).
// Distractors stated only as plain facts about what each option includes: B contains x = −1/√2
// (log_e(0)); C is the k = 0 piece of f∘g's domain alone; D is C with both ends closed (log_e(0)
// at −π/4 and 5π/4); E lies wholly in x ≤ −1/√2, where g∘f never exists.
// Interactive diagram (§15): interactives/meth-2023-mcq20-both-exist.tsx — drag x past y = sin(x)
// and the line y = −1/√2, with bars for where f∘g, g∘f and both exist, a zoom on the narrow gap
// between −π/4 and −1/√2, and snaps to the open endpoints. This site's own explanatory figure.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BothExistWidget = lazyWidget(() => import('../interactives/meth-2023-mcq20-both-exist'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 19, C: 26, D: 14, E: 9 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f(x)=\log_e\left(x+\tfrac{1}{\sqrt2}\right)" />,{' '}
      <Katex tex="g(x)=\sin(x)" /> where <Katex tex="x\in(-\infty,5)" />
      <br />
      <Katex tex="(f\circ g)(x)=\log_e\left(\sin(x)+\tfrac{1}{\sqrt2}\right)" />
      <br />
      <Katex tex="\sin(x)+\tfrac{1}{\sqrt2}>0" />
      <br />
      <Katex tex="\sin(x)=-\tfrac{1}{\sqrt2}" />, <Katex tex="x=\ldots-\tfrac\pi4,\tfrac{5\pi}{4}" /> as{' '}
      <Katex tex="x<5" />
      <br />
      <Katex tex="x\in\left(-\tfrac\pi4+2\pi k,\tfrac{5\pi}{4}+2\pi k\right),\ k\in Z^-\cup\{0\}" />
      <br />
      <Katex tex="(g\circ f)(x)=\sin\left(\log_e\left(x+\tfrac{1}{\sqrt2}\right)\right)" />
      <br />
      <Katex tex="\log_e\left(x+\tfrac{1}{\sqrt2}\right)<5" />,{' '}
      <Katex tex="x=e^5-\tfrac{1}{\sqrt2}" />
      <br />
      <Katex tex="x\in\left(-\tfrac{1}{\sqrt2},e^5-\tfrac{1}{\sqrt2}\right)" />
      <br />
      The largest interval of <Katex tex="x" /> values for which{' '}
      <Katex tex="(f\circ g)(x)" /> and <Katex tex="(g\circ f)(x)" /> both exist is
      <br />
      <Katex tex="\left(-\tfrac\pi4+2\pi k,\tfrac{5\pi}{4}+2\pi k\right)\cap\left(-\tfrac{1}{\sqrt2},e^5-\tfrac{1}{\sqrt2}\right)," />
      <br />
      <Katex tex="k\in Z^-\cup\{0\}" />
      <br />
      <Katex tex="=\left(-\tfrac{1}{\sqrt2},\tfrac{5\pi}{4}\right)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{dom}(f) = \left(-\tfrac{1}{\sqrt2},\ \infty\right) \qquad \text{dom}(g) = (-\infty,\ 5)" />,
    reason: (
      <>
        <Katex tex="\log_e" /> needs a positive input, so <Katex tex="x+\tfrac{1}{\sqrt2}>0" />. A composite such as{' '}
        <Katex tex="(f\circ g)(x)=f(g(x))" /> exists at <Katex tex="x" /> only when <Katex tex="x" /> is in the domain of
        the inside function <Katex tex="g" /> <i>and</i> the output <Katex tex="g(x)" /> is in the domain of the outside
        function <Katex tex="f" />. So find where each composite exists, then keep the <Katex tex="x" />-values where both do.
      </>
    ),
  },
  {
    working: <Katex display tex="(f\circ g)(x) = \log_e\!\left(\sin(x)+\tfrac{1}{\sqrt2}\right)" />,
    reason: (
      <>
        Needs <Katex tex="x<5" /> (so <Katex tex="g(x)" /> exists) and <Katex tex="\sin(x)+\tfrac{1}{\sqrt2}>0" /> (so
        the log has a positive input), i.e. <Katex tex="\sin(x) > -\tfrac{1}{\sqrt2}" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\sin(x) = -\tfrac{1}{\sqrt2}:\ \ x &= -\tfrac{\pi}{4}+2\pi k \\ \text{or}\ \ x &= \tfrac{5\pi}{4}+2\pi k,\ \ k\in Z\end{aligned}"
      />
    ),
    reason: (
      <>
        Solve the boundary equation first. Sine is negative in quadrants 3 and 4, and the reference angle for{' '}
        <Katex tex="\tfrac{1}{\sqrt2}" /> is <Katex tex="\tfrac{\pi}{4}" />: so <Katex tex="x=\pi+\tfrac{\pi}{4}=\tfrac{5\pi}{4}" />{' '}
        and <Katex tex="x=-\tfrac{\pi}{4}" />, repeating every <Katex tex="2\pi" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\sin(x) > -\tfrac{1}{\sqrt2} \\ \iff\ &x \in \left(-\tfrac{\pi}{4}+2\pi k,\ \tfrac{5\pi}{4}+2\pi k\right)\end{aligned}"
      />
    ),
    reason: (
      <>
        From <Katex tex="-\tfrac{\pi}{4}" /> the sine graph rises to its peak of 1 at <Katex tex="\tfrac{\pi}{2}" /> and comes
        back down to <Katex tex="-\tfrac{1}{\sqrt2}" /> at <Katex tex="\tfrac{5\pi}{4}" />, so it is above{' '}
        <Katex tex="-\tfrac{1}{\sqrt2}" /> in between (check <Katex tex="x=0" />: <Katex tex="\sin(0)=0>-\tfrac{1}{\sqrt2}" />
        ). It then dips below until <Katex tex="\tfrac{7\pi}{4}" />, where the pattern repeats.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\text{dom}(f\circ g)&: \ x \in \left(-\tfrac{\pi}{4}+2\pi k,\ \tfrac{5\pi}{4}+2\pi k\right), \\ &\phantom{:}\ \ k = 0,\ -1,\ -2,\ \ldots\end{aligned}"
      />
    ),
    reason: (
      <>
        Now apply <Katex tex="x<5" />. The <Katex tex="k=0" /> piece fits, since <Katex tex="\tfrac{5\pi}{4}\approx3.93<5" />,
        but the <Katex tex="k=1" /> piece would start at <Katex tex="\tfrac{7\pi}{4}\approx5.50" />, outside{' '}
        <Katex tex="g" />&apos;s domain. So the pieces are <Katex tex="\left(-\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\right)" />{' '}
        and the copies to its left: <Katex tex="\left(-\tfrac{9\pi}{4},\ -\tfrac{3\pi}{4}\right)" />, and so on.
      </>
    ),
  },
  {
    working: <Katex display tex="(g\circ f)(x) = \sin\!\left(\log_e\!\left(x+\tfrac{1}{\sqrt2}\right)\right)" />,
    reason: (
      <>
        Now the inside function is <Katex tex="f" />: needs <Katex tex="f(x)" /> to exist, <i>and</i> its output to lie
        in <Katex tex="g" />&apos;s domain <Katex tex="(-\infty,5)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x+\tfrac{1}{\sqrt2}>0 \;\implies\; x > -\tfrac{1}{\sqrt2}" />,
    reason: <>So that <Katex tex="f(x)" /> exists (positive input to the log).</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\log_e\!\left(x+\tfrac{1}{\sqrt2}\right) &< 5 \\ x+\tfrac{1}{\sqrt2} &< e^5 \\ x &< e^5-\tfrac{1}{\sqrt2}\end{aligned}"
      />
    ),
    reason: (
      <>
        So that the output <Katex tex="f(x)" /> lands in <Katex tex="g" />&apos;s domain. Raising <Katex tex="e" /> to the
        power of each side keeps the inequality the same way round, because <Katex tex="y=e^x" /> is increasing.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{dom}(g\circ f): \ \ x \in \left(-\tfrac{1}{\sqrt2},\ e^5-\tfrac{1}{\sqrt2}\right)" />,
    reason: (
      <>
        Both conditions together. Note <Katex tex="e^5-\tfrac{1}{\sqrt2}\approx147.7" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} -\tfrac{\pi}{4} \approx -0.785 &< -\tfrac{1}{\sqrt2} \approx -0.707 \\ \tfrac{5\pi}{4} \approx 3.93 &< e^5-\tfrac{1}{\sqrt2} \approx 147.7\end{aligned}"
      />
    ),
    reason: (
      <>
        Both composites must exist at the same <Katex tex="x" />, so the answer is the overlap of the two domains. The
        pieces of <Katex tex="\text{dom}(f\circ g)" /> with <Katex tex="k\le-1" /> end at{' '}
        <Katex tex="-\tfrac{3\pi}{4}\approx-2.36" /> or further left, so none of them reaches{' '}
        <Katex tex="x>-\tfrac{1}{\sqrt2}" />. On the <Katex tex="k=0" /> piece, take the tighter bound at each end: the
        larger left end, <Katex tex="-\tfrac{1}{\sqrt2}" /> (from <Katex tex="g\circ f" />), and the smaller right end,{' '}
        <Katex tex="\tfrac{5\pi}{4}" /> (from <Katex tex="f\circ g" />). The two left ends are close, so compare them as
        decimals.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\left(-\tfrac{1}{\sqrt2},\ \tfrac{5\pi}{4}\right)}" />,
    reason: (
      <>
        Matches option <b>A</b>. Both ends are open: at <Katex tex="x=-\tfrac{1}{\sqrt2}" />,{' '}
        <Katex tex="f(x)=\log_e(0)" />, and at <Katex tex="x=\tfrac{5\pi}{4}" />,{' '}
        <Katex tex="f(g(x))=\log_e(0)" />, both undefined. Option <b>B</b> includes <Katex tex="x=-\tfrac{1}{\sqrt2}" />.
        Option <b>C</b> is the <Katex tex="k=0" /> piece of <Katex tex="f\circ g" />&apos;s domain alone, so it leaves out{' '}
        <Katex tex="g\circ f" />&apos;s condition <Katex tex="x>-\tfrac{1}{\sqrt2}" />. Option <b>D</b> is C with both ends
        closed, where <Katex tex="f\circ g" /> fails. Option <b>E</b> is the gap between the two left ends, where{' '}
        <Katex tex="g\circ f" /> doesn&apos;t exist at all.
      </>
    ),
  },
]

export default function MethodsQ20_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x) = \log_e\!\left(x+\dfrac{1}{\sqrt2}\right)" />.
          <br />
          Let <Katex tex="g(x)=\sin(x)" /> where <Katex tex="x\in(-\infty,5)" />.
          <br />
          The largest interval of <Katex tex="x" /> values for which <Katex tex="(f\circ g)(x)" /> and{' '}
          <Katex tex="(g\circ f)(x)" /> both exist is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(-\tfrac{1}{\sqrt2},\ \tfrac{5\pi}{4}\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\left[-\tfrac{1}{\sqrt2},\ \tfrac{5\pi}{4}\right)" /> },
        { letter: 'C', content: <Katex tex="\left(-\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\right)" /> },
        { letter: 'D', content: <Katex tex="\left[-\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\right]" /> },
        { letter: 'E', content: <Katex tex="\left[-\tfrac{\pi}{4},\ -\tfrac{1}{\sqrt2}\right]" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="f∘g starts at −π/4, but g∘f only starts at −1/√2">
          <BothExistWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
