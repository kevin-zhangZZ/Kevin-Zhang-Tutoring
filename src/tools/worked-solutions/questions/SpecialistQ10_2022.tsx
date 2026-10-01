// 2022 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 21% correct.
// Implicit differentiation: for which m does the tangent at (1, m) have negative gradient —
// where (1, m) must itself lie on the curve. Question text transcribed from the original
// paper. Solution is original.
// Interactive: spec-2022-mcq10-on-curve (slide (1, m) along x = 1: the gradient formula is negative
// for a whole interval of m, but the point is only on the curve at m = -1 +/- sqrt(11)).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const OnCurveWidget = lazyWidget(() => import('../interactives/spec-2022-mcq10-on-curve'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 38, B: 7, C: 23, D: 10, E: 21 },
  answer: 'E',
  comment: (
    <>
      At <Katex tex="(1,m)" />, <Katex tex="5m-3m+m^2=10,\quad m=-1\pm\sqrt{11}" />.
      <br />
      Both of these, with <Katex tex="x=1" /> lead to a negative value of{' '}
      <Katex tex="\dfrac{dy}{dx}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex tex="(1,m)" /> is on the curve:
        <Katex display tex="5(1)^2m - 3(1)m + m^2 = 10" />
      </>
    ),
    reason: (
      <>
        A tangent &quot;at the point <Katex tex="(1,m)" />&quot; only exists if <Katex tex="(1,m)" /> is on the curve.
        So <Katex tex="m" /> is not free: it must satisfy the curve&apos;s equation. Do this before differentiating,
        because it limits which values of <Katex tex="m" /> are possible at all.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="m^2+2m-10=0" />
        <Katex display tex="m = \frac{-2\pm\sqrt{4+40}}{2} = -1\pm\sqrt{11}" />
      </>
    ),
    reason: (
      <>
        Quadratic formula, with <Katex tex="\sqrt{44}=2\sqrt{11}" />. So there are only <b>two</b> possible points,{' '}
        <Katex tex="m=\sqrt{11}-1" /> and <Katex tex="m=-\sqrt{11}-1" />, not a whole interval of <Katex tex="m" />.
      </>
    ),
  },
  {
    working: <Katex display tex="10xy + 5x^2\frac{dy}{dx} - 3y - 3x\frac{dy}{dx} + 2y\frac{dy}{dx} = 0" />,
    reason: (
      <>
        Differentiate both sides with respect to <Katex tex="x" />. Use the product rule on <Katex tex="5x^2y" /> and{' '}
        <Katex tex="3xy" />, and the chain rule on <Katex tex="y^2" /> to get <Katex tex="2y\frac{dy}{dx}" />. The
        right side, <Katex tex="10" />, differentiates to <Katex tex="0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{3y-10xy}{5x^2-3x+2y}" />,
    reason: (
      <>
        Keep the <Katex tex="\frac{dy}{dx}" /> terms on the left, move the rest to the right, then factorise and
        divide.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{At } (1,m):\quad \frac{dy}{dx} = \frac{3m-10m}{5-3+2m} = \frac{-7m}{2(1+m)}" />,
    reason: (
      <>
        Substitute <Katex tex="x=1" /> and <Katex tex="y=m" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="m=\sqrt{11}-1:\ \ 1+m=\sqrt{11}" />
        <Katex display tex="\frac{dy}{dx}=\frac{-7m}{2\sqrt{11}}<0" />
        <Katex display tex="m=-\sqrt{11}-1:\ \ 1+m=-\sqrt{11}" />
        <Katex display tex="\frac{dy}{dx}=\frac{-7m}{-2\sqrt{11}}<0" />
      </>
    ),
    reason: (
      <>
        Only the sign matters, and <Katex tex="1+m=\pm\sqrt{11}" /> makes it easy to see. For{' '}
        <Katex tex="m=\sqrt{11}-1>0" />, the numerator <Katex tex="-7m" /> is negative and the denominator positive. For{' '}
        <Katex tex="m=-\sqrt{11}-1<0" />, the numerator is positive and the denominator negative. Both gradients are
        negative (about <Katex tex="-2.44" /> and <Katex tex="-4.56" />).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{m=-\sqrt{11}-1 \text{ or } m=\sqrt{11}-1}" />,
    reason: (
      <>
        Matches option <b>E</b>. Option A (chosen by 38%) is where <Katex tex="\frac{-7m}{2(1+m)}<0" />, that is{' '}
        <Katex tex="m<-1" /> or <Katex tex="m>0" />. It treats <Katex tex="m" /> as free, but for every other value of{' '}
        <Katex tex="m" /> the point <Katex tex="(1,m)" /> is not on the curve, so there is no tangent. Option C is that
        set plus <Katex tex="m=-1" />, where the gradient is undefined. Options B and D each keep only one of the two
        points, but both give a negative gradient.
      </>
    ),
  },
]

export default function SpecialistQ10_2022() {
  return (
    <MCQShell
      question={
        <p>
          Consider the curve given by <Katex tex="5x^2y - 3xy + y^2 = 10" />.
          <br />
          The equation of the tangent to this curve at the point <Katex tex="(1,m)" />, where <Katex tex="m" /> is a
          real constant, will have a negative gradient when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="m\in R\setminus[-1,0]" /> },
        { letter: 'B', content: <Katex tex="m=-\sqrt{11}-1 \text{ only}" /> },
        { letter: 'C', content: <Katex tex="m\in R\setminus(-1,0]" /> },
        { letter: 'D', content: <Katex tex="m=\sqrt{11}-1 \text{ only}" /> },
        { letter: 'E', content: <Katex tex="m=-\sqrt{11}-1 \text{ or } m=\sqrt{11}-1" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Is (1, m) even on the curve? Only two values of m give a tangent at all">
          <OnCurveWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
