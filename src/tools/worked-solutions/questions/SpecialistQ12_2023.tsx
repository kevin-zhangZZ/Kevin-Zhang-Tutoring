// 2023 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 54% correct.
// Acceleration as a function of velocity: separate dv/dt, do not use v dv/dx. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 54, B: 9, C: 12, D: 16, E: 8 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{dv}{dt} = 1+v" />,
    reason: <>The question links acceleration to <em>velocity</em> and asks about <em>time</em>, so this is the form to use — <Katex tex="v\tfrac{dv}{dx}" /> would bring in a displacement nobody asked for.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dv} = \frac{1}{1+v} \implies t = \int\frac{1}{1+v}\,dv = \log_e|1+v|+c" />,
    reason: <>Inverting and integrating. Since <Katex tex="v\ge0" /> here, the absolute value can be dropped.</>,
  },
  {
    working: <Katex display tex="t=0,\ v=0: \quad 0 = \log_e(1)+c \implies c = 0" />,
    reason: '"Starts from rest".',
  },
  {
    working: <Katex display tex="t = \log_e(1+v) \implies v = e^t-1" />,
    reason: 'Rearranging.',
  },
  {
    working: <Katex display tex="t = \log_e(e+1): \quad v = e^{\log_e(e+1)}-1 = (e+1)-1" />,
    reason: <>The exponential and the log undo each other exactly — which is why the question chose that time.</>,
  },
  {
    working: <Katex display tex="\boxed{v = e \ \mathrm{ms^{-1}}}" />,
    reason: <>Option <b>A</b>; about <Katex tex="2.72" />. Option <b>B</b> is what you get by forgetting the <Katex tex="-1" />.</>,
  },
]

export default function SpecialistQ12_2023() {
  return (
    <MCQShell
      question={
        <p>
          The acceleration, <Katex tex="a\ \mathrm{ms^{-2}}" />, of a particle that starts
          from rest and moves in a straight line is described by <Katex tex="a=1+v" />, where{' '}
          <Katex tex="v\ \mathrm{ms^{-1}}" /> is its velocity after <Katex tex="t" /> seconds.
          The velocity of the particle after <Katex tex="\log_e(e+1)" /> seconds is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="e" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="e+1" /> },
        { letter: 'C', content: <Katex tex="e^2+1" /> },
        { letter: 'D', content: <Katex tex="\log_e(1+e)+1" /> },
        { letter: 'E', content: <Katex tex="\log_e\bigl(\log_e(1+e)+1\bigr)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
