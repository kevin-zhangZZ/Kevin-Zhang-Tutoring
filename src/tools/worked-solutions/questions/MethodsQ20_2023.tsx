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
    more: (
      <>
        You may have learned that <Katex tex="f\circ g" /> exists only when{' '}
        <Katex tex="\text{ran}(g)\subseteq\text{dom}(f)" />. Here <Katex tex="\text{ran}(g)=[-1,1]" /> is not inside{' '}
        <Katex tex="\text{dom}(f)=\left(-\tfrac{1}{\sqrt2},\infty\right)" />, so <Katex tex="f\circ g" /> can&apos;t
        use all of <Katex tex="g" />&apos;s domain. The question asks for the <Katex tex="x" />-values at which{' '}
        <Katex tex="(f\circ g)(x)" /> can still be calculated: that means cutting <Katex tex="g" />&apos;s domain down to
        the <Katex tex="x" />-values whose outputs <Katex tex="g(x)" /> land in <Katex tex="\text{dom}(f)" />. The same goes
        for <Katex tex="g\circ f" /> with the roles swapped.
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
        <Katex tex="\tfrac{1}{\sqrt2}" /> is <Katex tex="\tfrac{\pi}{4}" />: so <Katex tex="x=\pi+\tfrac{\pi}{4}=\tfrac{5\pi}{4}" />,
        and <Katex tex="x=-\tfrac{\pi}{4}" /> in quadrant 4 (the same as <Katex tex="\tfrac{7\pi}{4}" />, one period
        back), repeating every <Katex tex="2\pi" />.
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
        <Katex tex="-\tfrac{1}{\sqrt2}" /> in between. It then dips below until <Katex tex="\tfrac{7\pi}{4}" />, where
        the pattern repeats.
      </>
    ),
    more: (
      <>
        Check a point inside: <Katex tex="x=0" /> gives <Katex tex="\sin(0)=0>-\tfrac{1}{\sqrt2}" />. Using{' '}
        <Katex tex="-\tfrac{\pi}{4}" /> rather than <Katex tex="\tfrac{7\pi}{4}" /> for the fourth-quadrant solution is
        what lets the stretch above the line, which runs through <Katex tex="x=0" />, be written as the single interval{' '}
        <Katex tex="\left(-\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\right)" />.
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
        Now apply <Katex tex="x<5" />. The <Katex tex="k=0" /> piece ends at <Katex tex="\tfrac{5\pi}{4}\approx3.93<5" />,
        so it stays, and so does every piece to its left (<Katex tex="k" /> negative). The <Katex tex="k=1" /> piece would
        start at <Katex tex="\tfrac{7\pi}{4}\approx5.50" />, outside <Katex tex="g" />&apos;s domain, and later pieces lie
        further right still.
      </>
    ),
    more: (
      <>
        So <Katex tex="\text{dom}(f\circ g)" /> is <Katex tex="\left(-\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\right)" /> together
        with its copies to the left, one every <Katex tex="2\pi" />: <Katex tex="k=-1" /> gives{' '}
        <Katex tex="\left(-\tfrac{9\pi}{4},\ -\tfrac{3\pi}{4}\right)" />, <Katex tex="k=-2" /> gives{' '}
        <Katex tex="\left(-\tfrac{17\pi}{4},\ -\tfrac{11\pi}{4}\right)" />, and so on. The report writes these{' '}
        <Katex tex="k" />-values as <Katex tex="k\in Z^-\cup\{0\}" />.
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
        Both composites must exist at the same <Katex tex="x" />, so take the overlap of the two domains. Only the{' '}
        <Katex tex="k=0" /> piece of <Katex tex="\text{dom}(f\circ g)" /> reaches <Katex tex="x>-\tfrac{1}{\sqrt2}" />; on
        it, keep the larger left end, <Katex tex="-\tfrac{1}{\sqrt2}" /> (the left ends are close, so compare them as
        decimals), and the smaller right end, <Katex tex="\tfrac{5\pi}{4}" />.
      </>
    ),
    more: (
      <>
        The <Katex tex="k=-1" /> piece ends at <Katex tex="-\tfrac{3\pi}{4}\approx-2.36" />, and the pieces further left
        end further left still, so none of them overlaps <Katex tex="\text{dom}(g\circ f)" />. The <Katex tex="k=0" /> piece
        is where the question is decided: its left end <Katex tex="-\tfrac{\pi}{4}" /> and{' '}
        <Katex tex="g\circ f" />&apos;s left end <Katex tex="-\tfrac{1}{\sqrt2}" /> differ by only about{' '}
        <Katex tex="0.08" />, so <Katex tex="f\circ g" />&apos;s piece{' '}
        <Katex tex="\left(-\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\right)" />, option <b>C</b> and the most popular wrong answer,
        is easy to take as the answer on its own. But on the sliver <Katex tex="-\tfrac{\pi}{4}<x\le-\tfrac{1}{\sqrt2}" />,{' '}
        <Katex tex="x+\tfrac{1}{\sqrt2}\le0" />, so <Katex tex="f(x)" />, and with it <Katex tex="g(f(x))" />, doesn&apos;t
        exist. The interactive below zooms in on this gap.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\left(-\tfrac{1}{\sqrt2},\ \tfrac{5\pi}{4}\right)}" />,
    reason: (
      <>
        Matches option <b>A</b>; both ends are open, since each end gives <Katex tex="\log_e(0)" />.
      </>
    ),
    more: (
      <>
        Which composite fails at each end: at <Katex tex="x=-\tfrac{1}{\sqrt2}" /> it is <Katex tex="f(x)" /> that is{' '}
        <Katex tex="\log_e(0)" />, so <Katex tex="g\circ f" /> is undefined; at <Katex tex="x=\tfrac{5\pi}{4}" /> it
        is <Katex tex="f(g(x))" />, so <Katex tex="f\circ g" /> is undefined. Option <b>B</b> includes{' '}
        <Katex tex="x=-\tfrac{1}{\sqrt2}" />. Option <b>C</b> is <Katex tex="f\circ g" />&apos;s <Katex tex="k=0" /> piece
        alone, the trap described in the previous step. Option <b>D</b> is C with both ends closed, so it keeps the same
        gap and adds two points where <Katex tex="f\circ g" /> fails. Option <b>E</b> is the gap between the two left ends
        (ends included), where <Katex tex="g\circ f" /> doesn&apos;t exist at all.
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
