// 2016 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 37% correct —
// the hardest MCQ on this paper.
// Parametric differentiation: find dy/dx in terms of the parameter t.
// Question text transcribed from the original paper; solution is original.
// Interactive (37% correct, qualifies): spec-2016-mcq7-slope-test — the curve is the parabola
// y = ½(1 − x²); the tangent's slope is compared with every option as t is dragged.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SlopeWidget = lazyWidget(() => import('../interactives/spec-2016-mcq7-slope-test'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 37, B: 8, C: 17, D: 16, E: 21 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <Katex
      display
      tex="\begin{aligned} \frac{dy}{dx} &= \frac{dy}{dt}\,\frac{dt}{dx} = \frac{\cos(2t)}{\cos(t)+\sin(t)} \\ &= \frac{\cos^2(t)-\sin^2(t)}{\cos(t)+\sin(t)} \\ &= \cos(t)-\sin(t) \end{aligned}"
    />
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = \cos(t)+\sin(t), \qquad \frac{dy}{dt} = \cos(2t)" />,
    reason: (
      <>
        Differentiate each with respect to <Katex tex="t" />; for <Katex tex="y" />, the chain-rule factor 2 cancels
        the <Katex tex="\tfrac12" />. Watch the sign:{' '}
        <Katex tex="\tfrac{d}{dt}\bigl(-\cos(t)\bigr)=+\sin(t)" />.
      </>
    ),
    more: (
      <>
        Getting{' '}
        <Katex tex="\tfrac{dx}{dt}=\cos(t)-\sin(t)" /> instead (the sign slip) leads straight to option E.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{dy}{dx} &= \frac{dy/dt}{dx/dt} \\ &= \frac{\cos(2t)}{\cos(t)+\sin(t)} \end{aligned}" />,
    reason: <>For a curve given parametrically, <Katex tex="\tfrac{dy}{dx}" /> is the ratio of the two <Katex tex="t" />-derivatives (chain rule).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \cos(2t) &= \cos^2(t)-\sin^2(t) \\ &= \bigl(\cos(t)-\sin(t)\bigr)\bigl(\cos(t)+\sin(t)\bigr) \end{aligned}" />,
    reason: <>Options A–D have no <Katex tex="\cos(2t)" />, so rewrite it as a difference of two squares: one factor is exactly the denominator.</>,
    more: (
      <>
        All three forms of <Katex tex="\cos(2t)" /> are equal, but only <Katex tex="\cos^2(t)-\sin^2(t)" /> puts
        the factor <Katex tex="\cos(t)+\sin(t)" /> on show; <Katex tex="2\cos^2(t)-1" /> and{' '}
        <Katex tex="1-2\sin^2(t)" /> hide it.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{\bigl(\cos(t)-\sin(t)\bigr)\bigl(\cos(t)+\sin(t)\bigr)}{\cos(t)+\sin(t)}" />,
    reason: <>Substitute the factorised numerator.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \cos(t)-\sin(t)}" />,
    reason: (
      <>
        Cancel <Katex tex="\cos(t)+\sin(t)" /> (valid wherever <Katex tex="\tfrac{dx}{dt}\neq0" />). Matches option{' '}
        <b>A</b>.
      </>
    ),
    more: (
      <>
        <p>
          <b>Option E (21%)</b> is the unsimplified answer with the sign slip from the first line in its
          denominator. It is not even an unsimplified A: it cancels to{' '}
          <Katex tex="\dfrac{\bigl(\cos(t)-\sin(t)\bigr)\bigl(\cos(t)+\sin(t)\bigr)}{\cos(t)-\sin(t)}=\cos(t)+\sin(t)" />,
          which is option <b>B</b>. B is also <Katex tex="\tfrac{dx}{dt}" /> itself.
        </p>
        <p>
          <b>Options C and D</b> are quickest to rule out by testing a value: at{' '}
          <Katex tex="t=\tfrac{\pi}{6}" /> the answer is{' '}
          <Katex tex="\tfrac{\sqrt3}{2}-\tfrac12\approx0.366" />, while C gives{' '}
          <Katex tex="\tfrac{2}{\sqrt3}+2\approx3.155" /> and D gives{' '}
          <Katex tex="\tfrac{2}{\sqrt3}-2\approx-0.845" />. (One test value can be unlucky: at{' '}
          <Katex tex="t=\tfrac{\pi}{4}" /> A and D are both <Katex tex="0" />.)
        </p>
        <p>
          <b>A check without parametric calculus:</b> squaring <Katex tex="x" /> gives{' '}
          <Katex tex="x^2=1-2\sin(t)\cos(t)=1-\sin(2t)=1-2y" />, so the curve is the parabola{' '}
          <Katex tex="y=\tfrac12(1-x^2)" />. Its slope is <Katex tex="-x=\cos(t)-\sin(t)" />, option A again.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ7_2016() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="x=\sin(t)-\cos(t)" /> and <Katex tex="y=\tfrac12\sin(2t)" />, then{' '}
          <Katex tex="\dfrac{dy}{dx}" /> in terms of <Katex tex="t" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\cos(t)-\sin(t)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\cos(t)+\sin(t)" /> },
        { letter: 'C', content: <Katex tex="\sec(t)+\mathrm{cosec}(t)" /> },
        { letter: 'D', content: <Katex tex="\sec(t)-\mathrm{cosec}(t)" /> },
        { letter: 'E', content: <Katex tex="\dfrac{\cos(2t)}{\cos(t)-\sin(t)}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="The curve is a parabola, and only option A matches its tangent at every t">
          <SlopeWidget />
        </Explore>
      }
    />
  )
}
