// 2023 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 32% correct.
// Roots of opposite signs: the sign of the y-intercept p(0) does the work, not the discriminant.
// Question text transcribed from the original paper. Solution is original.
// Checked in sympy: Δ = 24k + 18; p(0) = 4k² − 9/4 < 0 gives −3/4 < k < 3/4 (D); at k = ±3/4 the
// equation has x = 0 as a root. Distractors computed: A is Δ > 0 alone (k = 1 is in A but gives roots
// −0.26 and −6.74); B is Δ ≥ 0 (lets in k = −3/4, where x² = 0); C (k > 3/4) gives two negative roots;
// E is exactly p(0) > 0, and for k < −3/4 there are no real roots.
// Interactive: meth-2023-mcq19-intercept (slider for k from k = 1; the y-intercept p(0) changes colour
// with its sign; chips show which options contain the current k and whether it works).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const InterceptWidget = lazyWidget(() => import('../interactives/meth-2023-mcq19-intercept'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 27, B: 11, C: 13, D: 32, E: 16 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="x^2+(4k+3)x+4k^2-\tfrac94=0" />
      <br />
      <Katex tex="\Delta=(4k+3)^2-4\left(4k^2-\tfrac94\right)>0" /> for two unique solutions.
      <br />
      <Katex tex="k>-\tfrac34" />
      <br />
      One solution has to be positive and the other negative.
      <br />
      Solve <Katex tex="x^2+(4k+3)x+4k^2-\tfrac94=0" /> for <Katex tex="k" />, when{' '}
      <Katex tex="x=0" /> and <Katex tex="k>-\tfrac34" />.
      <br />
      <Katex tex="k=\tfrac34" />
      <br />
      <Katex tex="-\tfrac34<k<\tfrac34" />
      <br />
      OR
      <br />
      Use the quadratic formula and solve:
      <br />
      <Katex tex="\tfrac{-b+\sqrt{b^2-4ac}}{2a}>0" /> and{' '}
      <Katex tex="\tfrac{-b-\sqrt{b^2-4ac}}{2a}<0" />
      <br />
      So solve{' '}
      <Katex tex="\dfrac{-4k-3+\sqrt{(4k+3)^2-4\left(4k^2-\frac94\right)}}{2}>0" />
      <br />
      and <Katex tex="\dfrac{-4k-3-\sqrt{(4k+3)^2-4\left(4k^2-\frac94\right)}}{2}<0" /> for{' '}
      <Katex tex="k" />
      <br />
      <Katex tex="-\tfrac34<k<\tfrac34" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p(x)=x^2+(4k+3)x+4k^2-\frac94" />,
    reason: (
      <>
        Call the left side <Katex tex="p(x)" />. Its graph is an upward parabola (the coefficient of{' '}
        <Katex tex="x^2" /> is <Katex tex="1>0" />), and the solutions of the equation are its{' '}
        <Katex tex="x" />-intercepts. Two conditions are needed: two real solutions, <b>and</b> one of each sign.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\Delta = (4k+3)^2-4\left(4k^2-\frac94\right)" />
        <Katex display tex="= 16k^2+24k+9-16k^2+9 = 24k+18" />
        <Katex display tex="\Delta>0 \implies k > -\frac34" />
      </>
    ),
    reason: (
      <>
        Two distinct real solutions need <Katex tex="\Delta=b^2-4ac>0" />. Expanding, the <Katex tex="16k^2" /> terms
        cancel, leaving <Katex tex="24k+18" />. This says nothing about the <b>signs</b> of the solutions, so it is only half the job.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="k=1:\ x^2+7x+\frac74=0" />
        <Katex display tex="x=\frac{-7\pm\sqrt{42}}{2}\approx -0.26,\ -6.74" />
      </>
    ),
    reason: (
      <>
        To see why <Katex tex="\Delta>0" /> is not enough, test a value in option A. With <Katex tex="k=1" />,{' '}
        <Katex tex="\Delta=42>0" /> and there are two real solutions, but both are negative ✗. Since{' '}
        <Katex tex="k=1" /> also lies in options <b>B</b>, <b>C</b> and <b>E</b>, this one test rules them out too.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{One positive, one negative} \iff p(0)<0" />,
    reason: (
      <>
        Look at the <Katex tex="y" />-intercept. An upward parabola is below the <Katex tex="x" />-axis exactly
        between its two <Katex tex="x" />-intercepts, so <Katex tex="x=0" /> lies between a negative and a positive
        solution exactly when <Katex tex="p(0)<0" />.
      </>
    ),
    more: (
      <>
        Why <Katex tex="p(0)<0" /> is enough on its own: the parabola is below the axis at <Katex tex="x=0" /> and
        opens upward, so it must climb back through the <Katex tex="x" />-axis once on each side of the{' '}
        <Katex tex="y" />-axis. So <Katex tex="p(0)<0" /> already guarantees two real solutions, and{' '}
        <Katex tex="\Delta>0" /> comes for free. Conversely, if the solutions are{' '}
        <Katex tex="\alpha<0<\beta" />, then <Katex tex="p(x)=(x-\alpha)(x-\beta)" />, so{' '}
        <Katex tex="p(0)=\alpha\beta" />, a negative times a positive, which is negative.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="p(0)=4k^2-\frac94<0" />
        <Katex display tex="k^2<\frac{9}{16}" />
        <Katex display tex="-\frac34<k<\frac34" />
      </>
    ),
    reason: (
      <>
        Substitute <Katex tex="x=0" />, then solve: <Katex tex="k^2<\tfrac{9}{16}" /> means <Katex tex="k" /> lies
        strictly between <Katex tex="-\tfrac34" /> and <Katex tex="\tfrac34" />.
      </>
    ),
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Katex tex="k=\tfrac34" />: <Katex tex="x^2+6x=0" />, so <Katex tex="x=0" /> or <Katex tex="x=-6" /> ✗</span>
        <span><Katex tex="k=-\tfrac34" />: <Katex tex="x^2=0" />, so <Katex tex="x=0" /> only ✗</span>
      </div>
    ),
    reason: (
      <>
        The endpoints are excluded: at both, <Katex tex="x=0" /> is a solution, and <Katex tex="0" /> is neither
        positive nor negative. Every <Katex tex="k" /> in <Katex tex="-\tfrac34<k<\tfrac34" /> also satisfies{' '}
        <Katex tex="k>-\tfrac34" />, so <Katex tex="\Delta>0" /> holds too.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{-\frac34 < k < \frac34}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: (
      <>
        <p>
          Spot-check <Katex tex="k=0" />: <Katex tex="x^2+3x-\tfrac94=0" /> gives{' '}
          <Katex tex="x=\tfrac{-3\pm3\sqrt2}{2}\approx 0.62,\ -3.62" />, one of each sign ✓.
        </p>
        <p>
          Where the other options come from. <b>A</b>, the most popular wrong answer (27%), is{' '}
          <Katex tex="\Delta>0" /> alone: two solutions, but not necessarily one of each sign (the <Katex tex="k=1" />{' '}
          test above). <b>B</b> is <Katex tex="\Delta\ge0" />, which also lets in <Katex tex="k=-\tfrac34" />, where the
          only solution is <Katex tex="x=0" />. <b>C</b> is the part of A where <Katex tex="p(0)>0" />: two real
          solutions, both negative. <b>E</b> is <Katex tex="p(0)>0" />, the sign condition the wrong way round: for{' '}
          <Katex tex="k>\tfrac34" /> both solutions are negative, and for <Katex tex="k<-\tfrac34" /> there are no real
          solutions.
        </p>
      </>
    ),
  },
]

export default function MethodsQ19_2023() {
  return (
    <MCQShell
      question={
        <p>
          Find all values of <Katex tex="k" />, such that the equation{' '}
          <Katex tex="x^2+(4k+3)x+4k^2-\dfrac94=0" /> has two real solutions for{' '}
          <Katex tex="x" />, one positive and one negative.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="k>-\frac34" /> },
        { letter: 'B', content: <Katex tex="k\ge-\frac34" /> },
        { letter: 'C', content: <Katex tex="k>\frac34" /> },
        { letter: 'D', content: <Katex tex="-\frac34<k<\frac34" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="k<-\frac34 \ \text{ or } \ k>\frac34" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="Δ > 0 isn't enough: the y-intercept must be below the axis">
          <InterceptWidget />
        </Explore>
      }
    />
  )
}
