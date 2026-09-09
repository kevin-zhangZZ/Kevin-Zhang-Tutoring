// 2016 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 55% correct.
// Three steps of Euler's method, starting from an initial condition given at x = 2.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 9, C: 55, D: 15, E: 16 },
  answer: 'C',
  noAnswer: 0,
  comment: <><Katex tex="y_0=0" />, <Katex tex="y_1=0.6" />, <Katex tex="y_2=1.272" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{dy}{dx} = 2x^2-x, \qquad y_0 = 0 \ \text{at} \ x_0=2" />,
    reason: <>The initial condition is given as <Katex tex="y(2)=0" />, so Euler's method starts stepping <em>forward</em> from <Katex tex="x=2" /> in steps of <Katex tex="0.1" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} y_1 &= y_0 + 0.1f(x_0) \\ &= 0 + 0.1f(2) \end{aligned}" />
        <Katex display tex="= 0.1\bigl(2(2)^2-2\bigr) = 0.1(6) = 0.6" />
      </>
    ),
    reason: <>Euler's formula: <Katex tex="y_{n+1}=y_n+0.1f(x_n)" />, at <Katex tex="x_1=2.1" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} y_2 &= y_1 + 0.1f(x_1) \\ &= 0.6 + 0.1f(2.1) \end{aligned}" />
        <Katex display tex="= 0.6 + 0.1\bigl(2(2.1)^2-2.1\bigr) = 0.6+0.672 = 1.272" />
      </>
    ),
    reason: <>One more step, at <Katex tex="x_2=2.2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} y_3 &= y_2 + 0.1f(x_2) \\ &= 1.272 + 0.1f(2.2) \end{aligned}" />,
    reason: <>The question asks for <Katex tex="y_3" /> itself — left in this unevaluated form, exactly as the options present it.</>,
  },
  {
    working: <Katex display tex="\boxed{y_3 = 1.272 + 0.1f(2.2)}" />,
    reason: <>Matches option <b>C</b>. (Evaluating it: <Katex tex="f(2.2)=2(2.2)^2-2.2=7.48" />, so <Katex tex="y_3=1.272+0.748=2.02" /> — the same number the wrong-step distractors D and E dress up incorrectly.)</>,
  },
]

export default function SpecialistQ9_2016() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="f(x) = \dfrac{dy}{dx} = 2x^2-x" />, where <Katex tex="y_0 = 0 = y(2)" />, then{' '}
          <Katex tex="y_3" /> using Euler's formula with step size <Katex tex="0.1" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.1f(2)" /> },
        { letter: 'B', content: <Katex tex="0.6 + 0.1f(2.1)" /> },
        { letter: 'C', content: <Katex tex="1.272 + 0.1f(2.2)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="2.02 + 0.1f(2.3)" /> },
        { letter: 'E', content: <Katex tex="2.02 + 0.1f(2.2)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
