// 2026 Specialist NHT — Exam 2, MCQ 8. The NHT report gives the answer key and a short comment
// only, with no statistics. Calculus: dy/dx for a parametric curve x = sin(t), y = sec(t), then
// solving tan(t) sec²(t) = 4√3 exactly. Question text transcribed from the original paper.
// Solution is original; the answer C agrees with the report's key (sympy: dy/dx = sin(t)/cos³(t),
// equal to 4√3 at t = π/3).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      <Katex tex="\dfrac{dy}{dx}=\dfrac{dy}{dt}\div\dfrac{dx}{dt}" />
      <br />
      Be careful to use exact values.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt}=\cos(t),\qquad \frac{dy}{dt}=\sec(t)\tan(t)" />,
    reason: <>Differentiate each coordinate with respect to the parameter. <Katex tex="\sec(t)=(\cos t)^{-1}" />, so by the chain rule <Katex tex="\tfrac{d}{dt}\sec(t)=\tfrac{\sin t}{\cos^2t}=\sec(t)\tan(t)" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=\frac{dy/dt}{dx/dt}=\frac{\sec(t)\tan(t)}{\cos(t)}=\tan(t)\sec^2(t)" />,
    reason: <>For a parametric curve, <Katex tex="\tfrac{dy}{dx}=\tfrac{dy}{dt}\div\tfrac{dx}{dt}" />. Dividing by <Katex tex="\cos t" /> is multiplying by <Katex tex="\sec t" />. (<Katex tex="\cos t\neq0" /> on <Katex tex="-\tfrac{\pi}{2}<t<\tfrac{\pi}{2}" />.)</>,
  },
  {
    working: <Katex display tex="\tan(t)\left(1+\tan^2(t)\right)=4\sqrt3" />,
    reason: <>Use <Katex tex="\sec^2t=1+\tan^2t" /> so the equation is in one trig function. With <Katex tex="T=\tan t" />: <Katex tex="T+T^3=4\sqrt3" />.</>,
    more: <>Or by CAS: <Cas fn="solve">solve(tan(t)·(1/cos(t))² = 4√3, t) | −π/2 &lt; t &lt; π/2</Cas>, in radian mode, gives <Katex tex="t=\tfrac{\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="T=\sqrt3:\ \ \sqrt3+3\sqrt3=4\sqrt3\ \checkmark" />,
    reason: <>Try the obvious surd: <Katex tex="T=\sqrt3" /> works. It is the only real solution, because <Katex tex="T+T^3" /> is strictly increasing.</>,
  },
  {
    working: <Katex display tex="\tan(t)=\sqrt3,\ \ -\tfrac{\pi}{2}<t<\tfrac{\pi}{2}\implies t=\frac{\pi}{3}" />,
    reason: <>On this interval <Katex tex="\tan" /> takes each value exactly once, so there is one solution.</>,
  },
  {
    working: <Katex display tex="\boxed{t=\frac{\pi}{3}}" />,
    reason: <>Matches option <b>C</b>. The question asks for the <b>exact</b> value.</>,
    more: <>Option <b>B</b>, 1.047, is <Katex tex="\tfrac{\pi}{3}" /> rounded to three decimal places, a decimal approximation, not exact. Option <b>D</b>, <Katex tex="\tan^{-1}(4\sqrt3)" />, is the angle the tangent line makes with the <Katex tex="x" />-axis, not the parameter value <Katex tex="t" />. At <Katex tex="t=\tfrac{\pi}{6}" /> (option <b>A</b>), <Katex tex="\tfrac{dy}{dx}=\tfrac{1}{\sqrt3}\cdot\tfrac43=\tfrac{4}{3\sqrt3}" />, not <Katex tex="4\sqrt3" />.</>,
  },
]

export default function SpecialistQ8_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          A curve is described parametrically by <Katex tex="x=\sin(t)" />, <Katex tex="y=\sec(t)" />, where{' '}
          <Katex tex="-\dfrac{\pi}{2}<t<\dfrac{\pi}{2}" />.
          <br />
          The exact value of <Katex tex="t" />, where <Katex tex="\dfrac{dy}{dx}=4\sqrt3" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\pi}{6}" /> },
        { letter: 'B', content: <Katex tex="1.047" /> },
        { letter: 'C', content: <Katex tex="\dfrac{\pi}{3}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\tan^{-1}\!\left(4\sqrt3\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
