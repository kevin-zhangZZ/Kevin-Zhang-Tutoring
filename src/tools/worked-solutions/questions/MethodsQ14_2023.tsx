// 2023 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 29% correct. Number of
// distinct tangents to a quartic that pass through its own positive x-intercept. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 33, C: 22, D: 29, E: 10 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      Solving <Katex tex="y_T\!\left(\tfrac13\right)=0" /> for <Katex tex="a" /> gives{' '}
      <Katex tex="a = \tfrac{-\sqrt7-4}{3},\ \tfrac{\sqrt7-4}{3}\text{, or }\tfrac13" /> — three solutions.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x(3x-1)(x+3)(x+1)" />,
    reason: <>Roots at <Katex tex="x=0,\ \tfrac13,\ -3,\ -1" /> — the positive <Katex tex="x" />-intercept is <Katex tex="\tfrac13" />.</>,
  },
  {
    working: <Katex display tex="y = 3x^4+11x^3+5x^2-3x \qquad y' = 12x^3+33x^2+10x-3" />,
    reason: 'Expand the quartic and differentiate.',
  },
  {
    working: <Katex display tex="y_T(x) = y'(a)\,x + \big[y(a)-a\,y'(a)\big]" />,
    reason: <>Tangent line at a general point <Katex tex="x=a" /> on the curve.</>,
  },
  {
    working: <Katex display tex="y(a)-a\,y'(a) = -a^2\big(9a^2+22a+5\big)" />,
    reason: 'Simplify the y-intercept term (routine but lengthy algebra).',
  },
  {
    working: <>Want the tangent's <Katex tex="y" />-intercept-form value at <Katex tex="x=\tfrac13" /> to equal <Katex tex="0" /> (i.e. the tangent line passes through <Katex tex="\big(\tfrac13,0\big)" />).</>,
    reason: <>Substitute <Katex tex="x=\tfrac13" /> into <Katex tex="y_T(x)" /> and set it to zero — this becomes a quartic equation in <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="27a^4+54a^3-18a^2-10a+3 = 0" />,
    reason: 'After clearing denominators and simplifying.',
  },
  {
    working: <Katex display tex="= (3a-1)^2(3a^2+8a+3)" />,
    reason: <>Factors neatly — <Katex tex="a=\tfrac13" /> is a <i>double</i> root (the trivial tangent at the intercept itself counts once as a distinct line).</>,
  },
  {
    working: <Katex display tex="3a^2+8a+3=0 \;\implies\; a = \frac{-8\pm\sqrt{64-36}}{6} = \frac{-4\pm\sqrt7}{3}" />,
    reason: 'Solve the remaining quadratic factor.',
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac13,\ \ \tfrac{-4+\sqrt7}{3},\ \ \tfrac{-4-\sqrt7}{3}}" />,
    reason: <>Three distinct values of <Katex tex="a" />, so three distinct tangent lines pass through <Katex tex="\big(\tfrac13,0\big)" /> — matches option <b>D</b>.</>,
  },
]

export default function MethodsQ14_2023() {
  return (
    <MCQShell
      question={
        <p>
          A polynomial has the equation <Katex tex="y=x(3x-1)(x+3)(x+1)" />.
          <br />
          The number of tangents to this curve that pass through the positive <Katex tex="x" />-intercept is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
