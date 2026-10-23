// 2024 Specialist NHT — Exam 2, MCQ 13. The NHT report gives the answer key only, with no
// statistics. Kinematics: integrate a(t) to get v(t), solve v = 0 for the stopping time, then
// integrate v for the distance. Question text transcribed from the original paper. Solution is
// original; the answer B agrees with the report's key. Checked numerically: T = 3.33861…,
// distance = 198.766… m. Distractors verified: A (188) treats −(6t² + t) as the velocity drop,
// D (260) differentiates a instead of integrating, E (267) is 80T.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v(t)=\int-(6t^2+t)\,dt=-2t^3-\frac{t^2}{2}+c" />,
    reason: <>Velocity is the antiderivative of acceleration.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}v(0)=80&\implies c=80\\ v(t)&=80-2t^3-\frac{t^2}{2}\end{aligned}" />,
    reason: <>The car is doing <Katex tex="80" /> m s<sup>−1</sup> when the brakes go on at <Katex tex="t=0" />.</>,
  },
  {
    working: <Cas fn="solve">solve(80 − 2t³ − t²/2 = 0, t) | t ≥ 0  ⇒  t = 3.3386…</Cas>,
    reason: <>The car stops when <Katex tex="v=0" />. The cubic has no tidy root, so use CAS and keep the full value.</>,
    more: <>Call the stopping time <Katex tex="T" />. Since <Katex tex="v" /> decreases from 80 to 0 on <Katex tex="[0,T]" />, it never goes negative, so the car never reverses: distance equals displacement here.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}d&=\int_0^{T}\left(80-2t^3-\frac{t^2}{2}\right)dt\\ &=\left[80t-\frac{t^4}{2}-\frac{t^3}{6}\right]_0^{T}\end{aligned}" />,
    reason: <>Distance is the area under the velocity–time graph from the brakes going on to the stop.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}d&=80T-\frac{T^4}{2}-\frac{T^3}{6}\\ &=198.77\ldots\end{aligned}" />,
    reason: <>Substitute the unrounded <Katex tex="T" />.</>,
    more: <>Sanity check: if the car kept 80 m s<sup>−1</sup> for the whole <Katex tex="3.34" /> s it would cover about 267 m; it slows down, more sharply towards the end, so the true distance should be well under that but above half of it.</>,
  },
  {
    working: <Katex display tex="\boxed{d\approx 199\text{ m}}" />,
    reason: <>Matches option <b>B</b>, to the nearest metre.</>,
    more: <>Option <b>E</b>, 267, is <Katex tex="80T" />: the car&apos;s initial speed times the stopping time, as if it never slowed. Option <b>A</b>, 188, treats <Katex tex="-(6t^2+t)" /> as the amount taken off the velocity, <Katex tex="v=80-6t^2-t" />, instead of integrating it first. Option <b>D</b>, 260, differentiates the acceleration instead of integrating, <Katex tex="v=80-(12t+1)" />.</>,
  },
]

export default function SpecialistQ13_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          A racing car is travelling on a straight horizontal track at a velocity of <Katex tex="80\text{ m s}^{-1}" /> when
          the brakes are applied at time <Katex tex="t=0" /> seconds. From time <Katex tex="t=0" /> to the moment the car
          stops, the acceleration of the car is given by <Katex tex="a(t)=-(6t^2+t)\text{ m s}^{-2}" />.
          <br />
          During this time period, the distance the car travels, correct to the nearest metre, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="188" /> },
        { letter: 'B', content: <Katex tex="199" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="213" /> },
        { letter: 'D', content: <Katex tex="260" /> },
        { letter: 'E', content: <Katex tex="267" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
