// 2023 Specialist NHT — Exam 2, MCQ 12. The NHT report gives the answer key only, with no
// statistics. Vector kinematics: the maximum speed of r(t) = sin(3t)i − 2cos(3t)j. Question text
// transcribed from the original paper. Solution is original; the answer C agrees with the report's
// key, and sympy confirms speed² = 9 + 27sin²(3t).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(t)=3\cos(3t)\,\underset{\sim}{i}+6\sin(3t)\,\underset{\sim}{j}" />,
    reason: <>Velocity is the derivative of position. Differentiate each component, using the chain rule for the <Katex tex="3t" /> inside: <Katex tex="\tfrac{d}{dt}\sin(3t)=3\cos(3t)" /> and <Katex tex="\tfrac{d}{dt}\big({-2}\cos(3t)\big)=6\sin(3t)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}|\underset{\sim}{\dot r}(t)|&=\sqrt{9\cos^2(3t)+36\sin^2(3t)}\\ &=\sqrt{9+27\sin^2(3t)}\end{aligned}" />,
    reason: <>Speed is the magnitude of the velocity vector. Replace <Katex tex="9\cos^2(3t)" /> by <Katex tex="9-9\sin^2(3t)" /> so that only one trig function is left.</>,
  },
  {
    working: <Katex display tex="\sin^2(3t)=1:\quad |\underset{\sim}{\dot r}|_{\max}=\sqrt{9+27}=\sqrt{36}" />,
    reason: <><Katex tex="\sin^2(3t)" /> ranges from 0 to 1, so the speed is greatest when <Katex tex="\sin^2(3t)=1" />, at which point <Katex tex="\cos(3t)=0" />.</>,
    more: <>The path is the ellipse <Katex tex="x^2+\tfrac{y^2}{4}=1" />. <Katex tex="\sin(3t)=\pm1" /> puts the particle at <Katex tex="(\pm1,\,0)" />, the ends of the shorter axis, where its velocity is <Katex tex="\pm6\underset{\sim}{j}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{6}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option A, 3, is the <em>minimum</em> speed (<Katex tex="\sin(3t)=0" />). Option D, <Katex tex="3\sqrt5=\sqrt{9+36}" />, takes the largest value of each component at the same time, but <Katex tex="\cos(3t)" /> and <Katex tex="\sin(3t)" /> can&apos;t both be <Katex tex="\pm1" /> together. Option E, 9, adds the two component maxima, <Katex tex="3+6" />.</>,
  },
]

export default function SpecialistQ12_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The position of a particle at time <Katex tex="t" /> seconds is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\sin(3t)\,\underset{\sim}{i}-2\cos(3t)\,\underset{\sim}{j}" />, where displacement components
          are measured in metres.
          <br />
          The maximum speed of the particle, in <Katex tex="\text{ms}^{-1}" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3" /> },
        { letter: 'B', content: <Katex tex="3\sqrt3" /> },
        { letter: 'C', content: <Katex tex="6" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="3\sqrt5" /> },
        { letter: 'E', content: <Katex tex="9" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
