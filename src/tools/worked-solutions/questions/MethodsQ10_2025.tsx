// 2025 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 57% correct.
// A quadratic inequality in sin(x), clipped to the range of sine. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 15, C: 57, D: 17 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f:R\to R,\ f(x)=2x^2+x-1" />
      <br />
      <Katex tex="g:R\to R,\ g(x)=\sin(x)" />
      <br />
      Let <Katex tex="a=\sin(x)" />.
      <br />
      <Katex tex="f\big(g(x)\big)=2\sin^2(x)+\sin(x)-1=2a^2+a-1" />
      <br />
      Solve <Katex tex="2a^2+a-1>0" /> and <Katex tex="-1\le a\le1" />.
      <br />
      <Katex tex="\dfrac{1}{2}<a\le1,\ \dfrac{1}{2}<\sin(x)\le1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(f\circ g)(x) = f\bigl(\sin(x)\bigr) = 2\sin^2(x)+\sin(x)-1" />,
    reason: <><Katex tex="f\circ g" /> means apply <Katex tex="g" /> first, so put <Katex tex="\sin(x)" /> in place of every <Katex tex="x" /> in <Katex tex="2x^2+x-1" />.</>,
  },
  {
    working: <Katex display tex="\text{let } u = \sin(x): \quad 2u^2+u-1>0" />,
    reason: <>Naming <Katex tex="\sin(x)" /> as <Katex tex="u" /> turns this into an ordinary quadratic inequality.</>,
  },
  {
    working: <Katex display tex="2u^2+u-1 = (2u-1)(u+1) > 0" />,
    reason: <>Factorise to find where the quadratic is zero: <Katex tex="u=\tfrac12" /> and <Katex tex="u=-1" />.</>,
  },
  {
    working: <Katex display tex="\text{upward parabola} \implies u<-1 \ \text{ or } \ u>\tfrac12" />,
    reason: <>The <Katex tex="u^2" /> coefficient is positive, so the parabola is above the axis outside its roots.</>,
  },
  {
    working: <Katex display tex="u = \sin(x) \in [-1,1] \implies u<-1 \text{ is impossible}" />,
    reason: <>Sine never goes below <Katex tex="-1" />, so the branch <Katex tex="u<-1" /> is empty.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac12 < \sin(x) \le 1}" />,
    reason: <>Matches option <b>C</b>; the upper bound is <Katex tex="\le" /> because <Katex tex="\sin(x)=1" /> is attainable.</>,
    more: <>
      Check the endpoint: <Katex tex="\sin(x)=1" /> gives <Katex tex="2+1-1=2>0" /> ✓, while{' '}
      <Katex tex="\sin(x)=\tfrac12" /> gives <Katex tex="0" />, so <Katex tex="\tfrac12" /> is excluded.
      Option <b>A</b> (10%) is the other branch <Katex tex="u<-1" /> without clipping to the range of sine:
      the only value it allows is <Katex tex="\sin(x)=-1" />, which makes the expression <Katex tex="0" />, not
      positive. Options <b>B</b> (15%) and <b>D</b> (17%) both lie between the roots, inside{' '}
      <Katex tex="-1<u<\tfrac12" />, where the quadratic is <em>negative</em>: they come from taking the wrong
      side of the parabola.
    </>,
  },
]

export default function MethodsQ10_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            Consider <Katex tex="f:R\to R" />,{' '}
            <Katex tex="f(x)=2x^2+x-1" /> and <Katex tex="g:R\to R" />,{' '}
            <Katex tex="g(x)=\sin(x)" />.
          </p>
          <p>
            The inequality <Katex tex="(f\circ g)(x)>0" /> is satisfied when
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sin(x)\le-1" /> },
        { letter: 'B', content: <Katex tex="-1<\sin(x)<0" /> },
        { letter: 'C', content: <Katex tex="\tfrac12<\sin(x)\le1" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0<\sin(x)<\tfrac12" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
