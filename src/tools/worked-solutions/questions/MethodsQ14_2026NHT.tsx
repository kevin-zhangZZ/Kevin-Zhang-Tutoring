// 2026 Mathematical Methods NHT — Exam 2, MCQ 14. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Algebra: a 2×2 linear system with no solution, plus a known point on the second line.
// Question text transcribed from the original paper. Solution is original; the answer A agrees with
// the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      Given that the system of 2 equations has no solutions, the 2 lines must be parallel so their gradients must be equal.
      <br />
      <Katex tex="\dfrac{b}{a}=-\dfrac{3}{2}" />
      <br />
      Given that <Katex tex="x=1" /> and <Katex tex="y=2" /> is a solution to the second equation,
      <br />
      <Katex tex="a(1)+b(2)=2" />
      <br />
      Solving these 2 equations for <i>a</i> and <i>b</i> gives <Katex tex="a=-1" /> and <Katex tex="b=\dfrac{3}{2}" />.
      <br />
      Equation 2 becomes <Katex tex="-x+\dfrac{3y}{2}=2" />.
      <br />
      Substituting <Katex tex="x=4" /> gives <Katex tex="y=4" />, so Option A is correct.
      <br />
      (None of the other 3 pairs of <Katex tex="x" /> and <Katex tex="y" /> values satisfy Equation 2.)
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\text{Eq 1: }&y=\tfrac{2}{3}x-\tfrac13,\quad m_1=\tfrac23\\\text{Eq 2: }&y=-\tfrac{a}{b}x+\tfrac{2}{b},\quad m_2=-\tfrac{a}{b}\end{aligned}" />,
    reason: <>Each equation is a straight line. Two lines with <b>no</b> common point must be parallel (and distinct), so first get both gradients.</>,
    more: <><Katex tex="b" /> can&apos;t be 0: then equation 2 would be a vertical line, which always crosses the non-vertical line of equation 1.</>,
  },
  {
    working: <Katex display tex="-\frac{a}{b}=\frac{2}{3}\ \Rightarrow\ 3a=-2b" />,
    reason: <>Parallel lines have equal gradients. (VCAA writes the same condition as <Katex tex="\tfrac{b}{a}=-\tfrac32" />.)</>,
  },
  {
    working: <Katex display tex="a(1)+b(2)=2\ \Rightarrow\ a+2b=2" />,
    reason: <>The point <Katex tex="(1,2)" /> lies on line 2.</>,
  },
  {
    working: <Katex display tex="a=-1,\quad b=\tfrac32\qquad\text{Eq 2: }-x+\tfrac32y=2" />,
    reason: <>Substitute <Katex tex="a=-\tfrac23b" /> into <Katex tex="a+2b=2" />: <Katex tex="\tfrac43b=2" />, so <Katex tex="b=\tfrac32" /> and <Katex tex="a=-1" />.</>,
    more: <>Check the lines really are distinct: doubling gives <Katex tex="2x-3y=-4" />, the same left side as equation 1 but a different right side (<Katex tex="-4" /> versus <Katex tex="1" />). Same gradient, different line, so there is no solution, as the question says.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: }&-4+\tfrac32(4)=2\ \checkmark\\\text{B: }&-4+0=-4\\\text{C: }&-3+\tfrac{15}{2}=\tfrac92\\\text{D: }&-5+\tfrac92=-\tfrac12\end{aligned}" />,
    reason: <>Test each point in equation 2.</>,
  },
  {
    working: <Katex display tex="\boxed{x=4,\ y=4}" />,
    reason: <>Matches option <b>A</b>. Sanity check: <Katex tex="(4,4)" /> and <Katex tex="(1,2)" /> give gradient <Katex tex="\tfrac{4-2}{4-1}=\tfrac23" />, the gradient line 2 must have.</>,
  },
]

export default function MethodsQ14_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Consider the system of two linear equations below, where <Katex tex="a" /> and <Katex tex="b" /> are real numbers.
          </p>
          <Katex display tex="\begin{aligned}&\text{Equation 1:}\quad 2x-3y=1\\&\text{Equation 2:}\quad ax+by=2\end{aligned}" />
          <p>The system of two equations has no real solutions.</p>
          <p>
            If <Katex tex="x=1" /> and <Katex tex="y=2" /> satisfies equation 2, it must be true that
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <><Katex tex="x=4" /> and <Katex tex="y=4" /> satisfies equation 2</>, isAnswer: true },
        { letter: 'B', content: <><Katex tex="x=4" /> and <Katex tex="y=0" /> satisfies equation 2</> },
        { letter: 'C', content: <><Katex tex="x=3" /> and <Katex tex="y=5" /> satisfies equation 2</> },
        { letter: 'D', content: <><Katex tex="x=5" /> and <Katex tex="y=3" /> satisfies equation 2</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
