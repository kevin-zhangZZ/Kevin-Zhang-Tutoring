// 2022 Specialist NHT — Exam 2, MCQ 16. The NHT report gives the answer key only, with no
// statistics. Rectilinear motion: v = dx/dt given in terms of t and x, solved as a separable
// differential equation for x, then v rewritten in terms of t. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = te^{-x}" />,
    reason: <>Velocity is the rate of change of displacement, <Katex tex="v=\tfrac{dx}{dt}" />. Because <Katex tex="v" /> depends on <Katex tex="x" /> as well as <Katex tex="t" />, we can&rsquo;t just integrate with respect to <Katex tex="t" />: this is a differential equation for <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="e^{x}\,\frac{dx}{dt} = t \implies \int e^{x}\,dx = \int t\,dt" />,
    reason: <>The right side is a function of <Katex tex="t" /> times a function of <Katex tex="x" />, so the equation is separable. Multiply both sides by <Katex tex="e^{x}" /> to gather everything in <Katex tex="x" /> on the left.</>,
  },
  {
    working: <Katex display tex="e^{x} = \frac{t^2}{2}+c" />,
    reason: <>Keep the constant on one side only.</>,
  },
  {
    working: <Katex display tex="x(0)=0:\ \ e^{0} = 0+c \implies c=1" />,
    reason: <>The particle starts at the origin. Note <Katex tex="e^0=1" />, not 0, so the constant is 1.</>,
  },
  {
    working: <Katex display tex="e^{x} = \frac{t^2}{2}+1 = \frac{t^2+2}{2}" />,
  },
  {
    working: <Katex display tex="v = te^{-x} = \frac{t}{e^{x}} = t\times\frac{2}{t^2+2}" />,
    reason: <>No need to solve for <Katex tex="x" />: <Katex tex="v" /> only needs <Katex tex="e^{-x}=\tfrac{1}{e^{x}}" />, the reciprocal of what we just found.</>,
    more: <>Solving for <Katex tex="x" /> also works: <Katex tex="x=\log_e\!\left(\tfrac{t^2+2}{2}\right)" />, and differentiating with the chain rule gives <Katex tex="\tfrac{dx}{dt}=\tfrac{2t}{t^2+2}" />, the same answer. That doubles as a check.</>,
  },
  {
    working: <Katex display tex="\boxed{v = \frac{2t}{t^2+2}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>A</b>, <Katex tex="\tfrac2t" />, leaves out the constant (<Katex tex="e^x=\tfrac{t^2}{2}" />); it also blows up at <Katex tex="t=0" />, when the given rule says <Katex tex="v=0\times e^{0}=0" />. Option <b>D</b>, <Katex tex="\tfrac{t}{t^2+1}" />, drops the <Katex tex="\tfrac12" /> from <Katex tex="\int t\,dt" /> (<Katex tex="e^x=t^2+1" />). Options <b>C</b> and <b>E</b> multiply by <Katex tex="e^{x}" /> instead of dividing, that is, treat <Katex tex="e^{-x}" /> as <Katex tex="e^{x}" />: <Katex tex="t\left(\tfrac{t^2}{2}+1\right)" /> is C, and E is the same slip with the constant left out.</>,
  },
]

export default function SpecialistQ16_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          The velocity of a particle moving in a straight line at time <Katex tex="t" /> seconds when it is at a
          displacement of <Katex tex="x" /> metres from an origin <Katex tex="O" /> is given by{' '}
          <Katex tex="v=te^{-x}" />.
          <br />
          Given that <Katex tex="x(0)=0" />, the velocity, in <Katex tex="\mathrm{ms^{-1}}" />, of the particle in terms
          of <Katex tex="t" /> is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac2t" /> },
        { letter: 'B', content: <Katex tex="\dfrac{2t}{t^2+2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac12t^3+t" /> },
        { letter: 'D', content: <Katex tex="\dfrac{t}{t^2+1}" /> },
        { letter: 'E', content: <Katex tex="\dfrac12t^3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
