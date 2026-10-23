// 2026 Specialist NHT — Exam 2, MCQ 13. The NHT report gives the answer key and a short comment
// only, with no statistics. Kinematics: the particle changes direction where the velocity changes
// sign, here where tan(t) = 1, in 0 ≤ t ≤ 3π. Question text transcribed from the original paper.
// Solution is original; the answer C agrees with the report's key. sympy confirms
// v = e^(−t)(cos t − sin t) and zeros π/4, 5π/4, 9π/4 (13π/4 > 3π).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      Changes direction when velocity = 0.
      <br />
      <Katex tex="v(t)=(\cos(t)-\sin(t))\,e^{-t}" />
      <br />
      <Katex tex="v=0\ \text{when}\ t=\dfrac{\pi}{4},\ \dfrac{5\pi}{4},\ \dfrac{9\pi}{4}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}v(t)=x'(t)&=-e^{-t}\sin(t)+e^{-t}\cos(t)\\ &=e^{-t}\big(\cos(t)-\sin(t)\big)\end{aligned}" />,
    reason: <>A particle changes direction when its velocity changes sign, so first find <Katex tex="v=\tfrac{dx}{dt}" />. Product rule: <Katex tex="e^{-t}" /> times <Katex tex="\sin(t)" />.</>,
  },
  {
    working: <Katex display tex="v=0\iff\cos(t)=\sin(t)\iff\tan(t)=1" />,
    reason: <><Katex tex="e^{-t}" /> is never zero, so the velocity is zero only when the bracket is. Divide by <Katex tex="\cos(t)" /> (it can&apos;t be zero here, since then <Katex tex="\sin(t)=\pm1" /> too).</>,
  },
  {
    working: <Katex display tex="t=\frac{\pi}{4},\ \frac{5\pi}{4},\ \frac{9\pi}{4}\qquad\left(\tfrac{13\pi}{4}>3\pi\ \text{rejected}\right)" />,
    reason: <><Katex tex="\tan" /> repeats every <Katex tex="\pi" />, so the solutions are <Katex tex="\tfrac{\pi}{4}+k\pi" />. The next one, <Katex tex="\tfrac{13\pi}{4}" />, is past the end of the domain, <Katex tex="3\pi=\tfrac{12\pi}{4}" />.</>,
  },
  {
    working: <Katex display tex="\text{3 changes of direction, }\ \tfrac{5\pi}{4}-\tfrac{\pi}{4}=\tfrac{9\pi}{4}-\tfrac{5\pi}{4}=\pi" />,
    reason: <>At each of these the velocity really does change sign: <Katex tex="\cos(t)-\sin(t)=\sqrt2\cos\!\left(t+\tfrac{\pi}{4}\right)" /> crosses zero, rather than touching it, at every zero.</>,
    more: <>So the velocity is not just momentarily zero; the particle genuinely turns round. The <Katex tex="e^{-t}" /> factor shrinks each swing, but it never changes the sign of <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="\boxed{3,\ \pi}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>A</b> misses <Katex tex="t=\tfrac{9\pi}{4}" />, which is still inside <Katex tex="[0,3\pi]" /> (<Katex tex="\tfrac{9\pi}{4}\approx7.07" />, <Katex tex="3\pi\approx9.42" />). Options <b>B</b> and <b>D</b> take the spacing to be <Katex tex="2\pi" />, the period of <Katex tex="\sin(t)" />; but the turning points are the solutions of <Katex tex="\tan(t)=1" />, which repeat every <Katex tex="\pi" />.</>,
  },
]

export default function SpecialistQ13_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          A particle moves along a straight line. The position of the particle from a fixed point is given by{' '}
          <Katex tex="x(t)=e^{-t}\sin(t)" /> for <Katex tex="0\le t\le3\pi" />.
          <br />
          The number of times the particle changes direction and the duration of time between successive changes in
          direction are, respectively,
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2,\ \pi" /> },
        { letter: 'B', content: <Katex tex="2,\ 2\pi" /> },
        { letter: 'C', content: <Katex tex="3,\ \pi" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="3,\ 2\pi" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
