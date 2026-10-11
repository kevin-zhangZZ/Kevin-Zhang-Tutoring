// 2021 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 35% correct. Which
// piecewise function is differentiable everywhere — testing both continuity and matching
// gradients at the join. Question text transcribed from the original paper. Solution is
// original. Widget: interactives/meth-2021-mcq19-zoom.tsx (zoom in on the join of each option —
// a corner never straightens out, only E's join does).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ZoomWidget = lazyWidget(() => import('../interactives/meth-2021-mcq19-zoom'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 13, C: 19, D: 20, E: 35 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f(x)=\begin{cases}4x+1 & x<0\\(2x+1)^2 & x\ge0\end{cases}" />
      <br />
      <Katex tex="\lim\limits_{x\to0^-}\bigl(f(x)\bigr)=\lim\limits_{x\to0^+}\bigl(f(x)\bigr)=1" />
      <br />
      The graph of <Katex tex="f" /> is continuous over the interval <Katex tex="(-\infty,\infty)" />.
      <br />
      <Katex tex="f'(x)=\begin{cases}4 & x<0\\8x+4 & x\ge0\end{cases}" />
      <br />
      <Katex tex="\lim\limits_{x\to0^-}\bigl(f'(x)\bigr)=\lim\limits_{x\to0^+}\bigl(f'(x)\bigr)=4" />
      <br />
      The graph of <Katex tex="f" /> is smooth at <Katex tex="x=0" />.
      <br />
      The function <Katex tex="f" /> where <Katex tex="f(x)=\begin{cases}4x+1 & x<0\\(2x+1)^2 & x\ge0\end{cases}" /> is differentiable for all real values of <Katex tex="x" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Test each option at the join <Katex tex="x=0" />: (1) do the two pieces meet? (2) do their gradients match?</>,
    reason: (
      <>
        Each piece is a polynomial, differentiable on its own interval, so only the join can fail. It must pass both
        tests: no gap (continuous) and no corner (matching gradients).
      </>
    ),
    more: (
      <>
        The rule changes at <Katex tex="x=0" />, and that is the only place a hybrid function built from polynomials
        can go wrong. &ldquo;No corner&rdquo; means the gradient the graph arrives with from the left equals the
        gradient it leaves with to the right. Test (1) comes first: if the pieces don&apos;t meet, there is no need to
        check gradients.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: }&0=-(0)\ \checkmark\\&\tfrac{d}{dx}(x)=1,\ \ \tfrac{d}{dx}(-x)=-1\ \ \times\end{aligned}" />,
    reason: (
      <>
        The pieces meet at the origin, so A is continuous, but the gradient changes from <Katex tex="1" /> to{' '}
        <Katex tex="-1" />: a corner. Not differentiable at <Katex tex="x=0" />.
      </>
    ),
    more: <>A is the graph of <Katex tex="y=-|x|" />, a sharp peak at the origin.</>,
  },
  {
    working: <Katex display tex="\text{B: } x=0 \text{ is in neither piece}" />,
    reason: (
      <>
        <Katex tex="x<0" /> and <Katex tex="x>0" /> both leave out <Katex tex="x=0" />, so <Katex tex="f(0)" /> doesn&apos;t
        exist, and a function can&apos;t be differentiable where it isn&apos;t defined.
      </>
    ),
    more: <>B is A&apos;s graph with the point at the origin removed. Even if <Katex tex="f(0)=0" /> were filled in, the gradients <Katex tex="1" /> and <Katex tex="-1" /> would still disagree.</>,
  },
  {
    working: <Katex display tex="\text{C: } 8(0)+4=4,\ \ (2(0)+1)^2=1\ \ \times" />,
    reason: (
      <>
        The left piece heads to <Katex tex="4" /> but <Katex tex="f(0)=1" />: a jump, so C isn&apos;t continuous and
        can&apos;t be differentiable. No need to check gradients.
      </>
    ),
    more: (
      <>
        Careful: <Katex tex="8x+4" /> is the <i>derivative</i> of <Katex tex="(2x+1)^2" />, so <Katex tex="8(0)+4=4" /> is
        the same number as the right piece&apos;s gradient at <Katex tex="x=0" />. Mixing up a value with a gradient
        makes C look as if it passes. Compare values with values: <Katex tex="4" /> vs <Katex tex="1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\tfrac{d}{dx}(2x+1)^2&=2(2x+1)\times2=4(2x+1)\\&=4(2(0)+1)=4\ \text{at}\ x=0\end{aligned}" />,
    reason: (
      <>
        D and E share the right piece <Katex tex="(2x+1)^2" />, so find its gradient at <Katex tex="x=0" /> once, by
        the chain rule. This is the gradient the graph leaves the join with.
      </>
    ),
    more: (
      <>
        Chain rule: bring down the power <Katex tex="2" />, keep the bracket, then multiply by <Katex tex="2" />, the
        derivative of the inside <Katex tex="2x+1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\text{D: }&2(0)+1=1=(2(0)+1)^2\ \checkmark\\&\tfrac{d}{dx}(2x+1)=2\neq4\ \ \times\end{aligned}" />,
    reason: (
      <>
        The pieces meet at <Katex tex="(0,1)" />, so D <i>is</i> continuous, but the gradient is <Katex tex="2" />{' '}
        arriving and <Katex tex="4" /> leaving: a corner. Continuous is not enough.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\text{E: }&4(0)+1=1=(2(0)+1)^2\ \checkmark\\&\tfrac{d}{dx}(4x+1)=4=4\ \ \checkmark\end{aligned}" />,
    reason: (
      <>
        No gap and no corner at <Katex tex="x=0" />, and each piece is differentiable on its own interval, so E is
        differentiable for every real <Katex tex="x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f(x)=\begin{cases}4x+1 & x<0\\(2x+1)^2 & x\geq0\end{cases}}" />,
    reason: <>Matches option <b>E</b>, the only one differentiable for all real <Katex tex="x" />.</>,
    more: (
      <>
        Only 35% chose E. D (20%) is the trap of stopping after the continuity test: its pieces meet, but with
        different gradients. C (19%) and A and B fail for the reasons in their rows.
      </>
    ),
  },
]

export default function MethodsQ19_2021() {
  return (
    <MCQShell
      question={<p>Which one of the following functions is differentiable for all real values of <Katex tex="x" />?</p>}
      options={[
        { letter: 'A', content: <Katex tex="f(x)=\begin{cases}x & x<0\\-x & x\geq0\end{cases}" /> },
        { letter: 'B', content: <Katex tex="f(x)=\begin{cases}x & x<0\\-x & x>0\end{cases}" /> },
        { letter: 'C', content: <Katex tex="f(x)=\begin{cases}8x+4 & x<0\\(2x+1)^2 & x\geq0\end{cases}" /> },
        { letter: 'D', content: <Katex tex="f(x)=\begin{cases}2x+1 & x<0\\(2x+1)^2 & x\geq0\end{cases}" /> },
        { letter: 'E', content: <Katex tex="f(x)=\begin{cases}4x+1 & x<0\\(2x+1)^2 & x\geq0\end{cases}" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Meeting at the join isn't enough: zoom in on the corner">
          <ZoomWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
