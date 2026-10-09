// 2017 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 45% correct.
// Find the upper endpoint d so that all solutions of sin(2x)=√3/2 on [-π,d] sum to -π.
// Question text transcribed from the original paper; solution is original.
// Checked in sympy: running sums from -π are -5π/6, -3π/2, -4π/3, -π, π/6, 3π/2, so the sum is -π
// exactly for π/3 ≤ d < 7π/6 and C (3π/4) is the only option there — agreeing with the report and
// itute. Option sums: A -3π/2, B -4π/3, D π/6, E 3π/2. The slip 2x = π/3 + kπ (x = π/6 + kπ/2)
// gives -5π/6, -π/3, π/6 with sum -π at d = π/6: exactly option B (18%).
// Interactive: meth-2017-mcq12-window (drag d; solutions in [-π, d] light up with a running sum;
// the answer band [π/3, 7π/6) and the pair symmetry about each peak; a toggle shows the kπ slip).
// WrongMethod: option B via 2x = π/3 + kπ.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const WindowWidget = lazyWidget(() => import('../interactives/meth-2017-mcq12-window'))

const EXAMINER_COMMENT = (
  <>
    <Katex tex="\sin(2x)=\dfrac{\sqrt3}{2}" />
    <br />
    <Katex tex="2x=\dfrac{\pi}{3},\dfrac{2\pi}{3}\ldots" />
    <br />
    <Katex tex="x=\dfrac{\pi}{6},\dfrac{\pi}{3}\ldots" />
    <br />
    <Katex tex="x=-\dfrac{5\pi}{6},-\dfrac{2\pi}{3},\dfrac{\pi}{6},\dfrac{\pi}{3}" />
    <br />
    <Katex tex="\text{sum: }-\dfrac{5\pi}{6}+-\dfrac{2\pi}{3}+\dfrac{\pi}{6}+\dfrac{\pi}{3}=-\pi" />
  </>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 18, C: 45, D: 15, E: 11 },
  answer: 'C',
  noAnswer: 1,
  comment: EXAMINER_COMMENT,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(2x) = \frac{\sqrt3}{2}" />,
    reason: <><Katex tex="\tfrac{\sqrt3}{2}" /> is an exact value: <Katex tex="\sin\tfrac{\pi}{3}=\tfrac{\sqrt3}{2}" />, so the reference angle is <Katex tex="\tfrac{\pi}{3}" />. Solve for the angle <Katex tex="2x" /> first, then divide by <Katex tex="2" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="2x = \frac{\pi}{3}+2k\pi" />
        <Katex display tex="\text{or} \quad 2x = \frac{2\pi}{3}+2k\pi" />
        <Katex display tex="\implies x = \frac{\pi}{6}+k\pi" />
        <Katex display tex="\text{or} \quad x = \frac{\pi}{3}+k\pi" />
      </>
    ),
    reason: <>Sine is positive in the first and second quadrants, so <Katex tex="2x=\tfrac{\pi}{3}" /> or <Katex tex="\pi-\tfrac{\pi}{3}=\tfrac{2\pi}{3}" />, plus any whole number of turns <Katex tex="2k\pi" />. Dividing by <Katex tex="2" /> turns <Katex tex="2k\pi" /> into <Katex tex="k\pi" />: the solutions repeat every <Katex tex="\pi" />, the period of <Katex tex="\sin(2x)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x = -\frac{5\pi}{6},\ -\frac{2\pi}{3},\ \frac{\pi}{6},\ \frac{\pi}{3}," />
        <Katex display tex="\frac{7\pi}{6},\ \dots" />
      </>
    ),
    reason: <>The left end <Katex tex="-\pi" /> is fixed and only <Katex tex="d" /> moves, so list the solutions from <Katex tex="x=-\pi" /> upwards, taking <Katex tex="k=-1,0,1,\dots" /> in each family.</>,
  },
  {
    working: (
      <>
        <Katex display tex="-\frac{5\pi}{6}-\frac{2\pi}{3} = -\frac{3\pi}{2}" />
        <Katex display tex="-\frac{3\pi}{2}+\frac{\pi}{6} = -\frac{4\pi}{3}" />
        <Katex display tex="-\frac{4\pi}{3}+\frac{\pi}{3} = -\pi" />
      </>
    ),
    reason: <>Keep a running total, adding one solution at a time as <Katex tex="d" /> moves right. It first reaches <Katex tex="-\pi" /> once <Katex tex="\tfrac{\pi}{3}" /> is included. A check: the two solutions in each hump of <Katex tex="\sin(2x)" /> are symmetric about its peak (<Katex tex="x=-\tfrac{3\pi}{4}" /> and <Katex tex="x=\tfrac{\pi}{4}" />), so each pair adds to twice the peak: <Katex tex="-\tfrac{3\pi}{2}+\tfrac{\pi}{2}=-\pi" />.</>,
  },
  {
    working: <Katex display tex="\frac{\pi}{3} \le d < \frac{7\pi}{6}" />,
    reason: <>The interval must include <Katex tex="\tfrac{\pi}{3}" /> but stop before the next solution, <Katex tex="\tfrac{7\pi}{6}" /> — including it would make the sum <Katex tex="-\pi+\tfrac{7\pi}{6}=\tfrac{\pi}{6}" />. The question says <Katex tex="d" /> <em>could be</em>, so any value in this range works.</>,
  },
  {
    working: <Katex display tex="\boxed{d = \frac{3\pi}{4}}" />,
    reason: <>Matches option <b>C</b>, the only option in that range. Option B (18%), <Katex tex="\tfrac{\pi}{6}" />, stops one solution short (sum <Katex tex="-\tfrac{4\pi}{3}" />); option D, <Katex tex="\tfrac{7\pi}{6}" />, includes the fifth solution (sum <Katex tex="\tfrac{\pi}{6}" />).</>,
    more: <>See the Common Mistake below for the slip that makes option B look right.</>,
  },
]

export default function MethodsQ12_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The sum of the solutions of <Katex tex="\sin(2x) = \dfrac{\sqrt3}{2}" /> over the interval{' '}
            <Katex tex="[-\pi,\,d]" /> is <Katex tex="-\pi" />.
          </p>
          <p>The value of <Katex tex="d" /> could be</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{6}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{3\pi}{4}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{7\pi}{6}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{3\pi}{2}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Slide the window: when does the sum hit −π?">
            <WindowWidget />
          </Explore>
          <WrongMethod
            title="Add π each time: 2x = π/3 + kπ"
            source="18% chose B"
            working={
              <>
                <Katex display tex="x = \tfrac{\pi}{6}+\tfrac{k\pi}{2}" />
                <Katex display tex="x=-\tfrac{5\pi}{6},\ -\tfrac{\pi}{3},\ \tfrac{\pi}{6},\ \dots" />
                <Katex display tex="-\tfrac{5\pi}{6}-\tfrac{\pi}{3}+\tfrac{\pi}{6}=-\pi" />
              </>
            }
          >
            That list gives <Katex tex="-\pi" /> at <Katex tex="d=\tfrac{\pi}{6}" />, which is why B can look right. But
            adding <Katex tex="\pi" /> to <Katex tex="2x" /> goes to the opposite side of the unit circle, where
            sine has the opposite sign: <Katex tex="\sin\!\left(2\times-\tfrac{\pi}{3}\right)=-\tfrac{\sqrt3}{2}" />, so{' '}
            <Katex tex="-\tfrac{\pi}{3}" /> is not a solution, and the real solution <Katex tex="-\tfrac{2\pi}{3}" /> is
            missing. Sine repeats every <Katex tex="2\pi" />, so the general solution adds <Katex tex="2k\pi" /> to{' '}
            <Katex tex="2x" />, and the second solution comes from the second quadrant, <Katex tex="\pi-\tfrac{\pi}{3}" />.
            Substituting each listed <Katex tex="x" /> back into <Katex tex="\sin(2x)" /> catches it.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
