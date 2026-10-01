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
    working: <Katex display tex="\begin{aligned} \frac{dt}{dv} &= \frac{1}{1+v} \\ t &= \int\frac{1}{1+v}\,dv = \log_e|1+v|+c \end{aligned}" />,
    reason: <><Katex tex="1+v" /> is in terms of <Katex tex="v" />, not <Katex tex="t" />, so it can't be integrated with respect to <Katex tex="t" />. Flip both sides to get <Katex tex="\tfrac{dt}{dv}" />, a function of <Katex tex="v" /> alone, and integrate with respect to <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="t=0,\ v=0: \quad 0 = \log_e(1)+c \implies c = 0" />,
    reason: <>"Starts from rest" means <Katex tex="v=0" /> when <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t &= \log_e(1+v) \\ 1+v &= e^t \\ v &= e^t-1 \end{aligned}" />,
    reason: <>The particle starts at <Katex tex="v=0" />, and while <Katex tex="v\ge0" /> the acceleration <Katex tex="a=1+v\ge1" /> is positive, so <Katex tex="v" /> keeps increasing and never becomes negative. Then <Katex tex="1+v>0" />, so the absolute value can be dropped. Rearrange for <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t = \log_e(e+1): \quad v &= e^{\log_e(e+1)}-1 \\ &= (e+1)-1 \end{aligned}" />,
    reason: <>The exponential and the log undo each other exactly — which is why the question chose that time.</>,
  },
  {
    working: <Katex display tex="\boxed{v = e \ \mathrm{m\,s^{-1}}}" />,
    reason: <>Matches option <b>A</b>; about <Katex tex="2.72" />. Option <b>B</b> is what you get by forgetting the <Katex tex="-1" />.</>,
  },
]

export default function SpecialistQ12_2023() {
  return (
    <MCQShell
      question={
        <p>
          The acceleration, <Katex tex="a\ \mathrm{m\,s^{-2}}" />, of a particle that starts
          from rest and moves in a straight line is described by <Katex tex="a=1+v" />, where{' '}
          <Katex tex="v\ \mathrm{m\,s^{-1}}" /> is its velocity after <Katex tex="t" /> seconds.
          <br />
          The velocity of the particle after <Katex tex="\log_e(e+1)" /> seconds is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="e" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="e+1" /> },
        { letter: 'C', content: <Katex tex="e^2+1" /> },
        { letter: 'D', content: <Katex tex="\log_e(1+e)+1" /> },
        { letter: 'E', content: <Katex tex="\log_e\bigl(\log_e(1+e)-1\bigr)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
