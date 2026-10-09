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
    reason: <>The acceleration is given in terms of <em>velocity</em> and the question asks about <em>time</em>, so write <Katex tex="a" /> as <Katex tex="\tfrac{dv}{dt}" />.</>,
    more: (
      <>
        The other form of acceleration, <Katex tex="v\tfrac{dv}{dx}" />, links velocity to displacement{' '}
        <Katex tex="x" />, which this question never mentions. Use <Katex tex="v\tfrac{dv}{dx}" /> when <Katex tex="a" />{' '}
        is given in terms of <Katex tex="v" /> and the question asks about position or distance.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{dt}{dv} &= \frac{1}{1+v} \\ t &= \int\frac{1}{1+v}\,dv = \log_e|1+v|+c \end{aligned}" />,
    reason: <><Katex tex="1+v" /> is in terms of <Katex tex="v" />, not <Katex tex="t" />, so it can't be integrated with respect to <Katex tex="t" />. Flip both sides to get <Katex tex="\tfrac{dt}{dv}" />, a function of <Katex tex="v" /> alone, and integrate with respect to <Katex tex="v" />.</>,
    more: (
      <>
        Flipping is allowed because <Katex tex="\tfrac{dt}{dv}=1\div\tfrac{dv}{dt}" /> wherever{' '}
        <Katex tex="\tfrac{dv}{dt}\neq0" />, and here <Katex tex="\tfrac{dv}{dt}=1+v" /> is at least 1 for the
        whole motion (<Katex tex="v" /> starts at 0 and only increases, so <Katex tex="1+v\ge1" />). Every question that gives <Katex tex="a" /> as a function of <Katex tex="v" /> and asks
        about time starts this way.
      </>
    ),
  },
  {
    working: <Katex display tex="t=0,\ v=0: \quad 0 = \log_e(1)+c \implies c = 0" />,
    reason: <>"Starts from rest" means <Katex tex="v=0" /> when <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t &= \log_e(1+v) \\ 1+v &= e^t \\ v &= e^t-1 \end{aligned}" />,
    reason: <>The particle starts at rest, and while <Katex tex="v\ge0" /> the acceleration <Katex tex="a=1+v" /> is positive, so <Katex tex="v" /> only increases and <Katex tex="1+v>0" />: the absolute value can be dropped. Rearrange for <Katex tex="v" />.</>,
    more: (
      <>
        A check of the result: <Katex tex="v=e^t-1" /> gives <Katex tex="v(0)=0" />, and{' '}
        <Katex tex="\tfrac{dv}{dt}=e^t=1+v" />, as the question requires.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} t = \log_e(e+1): \quad v &= e^{\log_e(e+1)}-1 \\ &= (e+1)-1 \end{aligned}" />,
    reason: <><Katex tex="e^{\log_e(e+1)}=e+1" />, because the exponential and the log undo each other.</>,
    more: <>That is why the question chose such an odd-looking time: it makes the answer exact.</>,
  },
  {
    working: <Katex display tex="\boxed{v = e \ \mathrm{m\,s^{-1}}}" />,
    reason: <>Matches option <b>A</b> (about <Katex tex="2.72" />).</>,
    more: (
      <>
        Option <b>B</b>, <Katex tex="e+1" />, is what you get by forgetting the <Katex tex="-1" /> in{' '}
        <Katex tex="v=e^t-1" />: it is the value of <Katex tex="1+v" />, not of <Katex tex="v" />. Options{' '}
        <b>C</b>, <b>D</b> and <b>E</b> are not one slip away from this working. <b>D</b> and <b>E</b> still contain
        the given time <Katex tex="\log_e(1+e)" /> (<b>D</b> is just the time plus 1), but in the correct working
        the exponential cancels that log, so an answer that still contains it means{' '}
        <Katex tex="\tfrac{dv}{dt}=1+v" /> was not correctly solved for <Katex tex="v" /> before the time was
        substituted. <b>E</b> also fails a sign check:{' '}
        <Katex tex="\log_e(1+e)-1\approx0.31" /> is less than 1, so its log is negative (about{' '}
        <Katex tex="-1.16" />), but <Katex tex="v" /> starts at 0 and only increases.
      </>
    ),
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
