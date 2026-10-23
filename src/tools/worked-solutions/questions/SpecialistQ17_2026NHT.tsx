// 2026 Specialist NHT — Exam 2, MCQ 17. The NHT report gives the answer key and a short comment
// only, with no statistics. Vector kinematics: antidifferentiate each velocity, fix the constants
// from the initial positions, then the distance |r(2π) − s(2π)|. Question text transcribed from the
// original paper. Solution is original; the answer B agrees with the report's key. sympy gives
// r = (t + 1)i + sin(t)j + (1 − cos t)k, s = ti + sin(2t)j + (cos t − 2)k, distance √2; dropping both
// constants gives 2 (option C).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      <Katex tex="\underset{\sim}{r}(t)=(t+1)\underset{\sim}{i}+\big(\sin(t)\big)\underset{\sim}{j}+\big(1-\cos(t)\big)\underset{\sim}{k}" />
      <br />
      <Katex tex="\underset{\sim}{s}(t)=t\,\underset{\sim}{i}+\big(\sin(2t)\big)\underset{\sim}{j}+\big(\cos(t)-2\big)\underset{\sim}{k}" />
      <br />
      <Katex tex="\left|\underset{\sim}{r}(2\pi)-\underset{\sim}{s}(2\pi)\right|" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t)=t\,\underset{\sim}{i}+\sin(t)\,\underset{\sim}{j}-\cos(t)\,\underset{\sim}{k}+\underset{\sim}{c}_1" />,
    reason: <>Position is the antiderivative of velocity, one component at a time. The constant is a <em>vector</em>, since each component gets its own constant.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(0)=-\underset{\sim}{k}+\underset{\sim}{c}_1=\underset{\sim}{i}\implies\underset{\sim}{c}_1=\underset{\sim}{i}+\underset{\sim}{k}" />,
    reason: <>At <Katex tex="t=0" />: <Katex tex="\sin(0)=0" /> and <Katex tex="-\cos(0)=-1" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(t)=(t+1)\,\underset{\sim}{i}+\sin(t)\,\underset{\sim}{j}+\big(1-\cos(t)\big)\,\underset{\sim}{k}" />,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{s}(t)&=t\,\underset{\sim}{i}+\sin(2t)\,\underset{\sim}{j}+\cos(t)\,\underset{\sim}{k}+\underset{\sim}{c}_2\\ \underset{\sim}{s}(0)&=\underset{\sim}{k}+\underset{\sim}{c}_2=-\underset{\sim}{k}\implies\underset{\sim}{c}_2=-2\underset{\sim}{k}\end{aligned}" />,
    reason: <>The same for the second object: <Katex tex="\int2\cos(2t)\,dt=\sin(2t)" /> and <Katex tex="\int-\sin(t)\,dt=\cos(t)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{r}(2\pi)&=(2\pi+1)\underset{\sim}{i}+0\underset{\sim}{j}+0\underset{\sim}{k}\\ \underset{\sim}{s}(2\pi)&=2\pi\underset{\sim}{i}+0\underset{\sim}{j}-\underset{\sim}{k}\end{aligned}" />,
    reason: <>At <Katex tex="t=2\pi" />, every sine is 0 and every cosine is 1.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{r}(2\pi)-\underset{\sim}{s}(2\pi)&=\underset{\sim}{i}+\underset{\sim}{k}\\ \left|\underset{\sim}{i}+\underset{\sim}{k}\right|&=\sqrt{1^2+1^2}=\sqrt2\end{aligned}" />,
    reason: <>The distance between the objects is the magnitude of the vector from one position to the other.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt2}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>C</b>, 2, comes from leaving out both constants of integration: then <Katex tex="\underset{\sim}{r}(2\pi)-\underset{\sim}{s}(2\pi)=-2\underset{\sim}{k}" />. The initial positions are given precisely so the constants can be found.</>,
  },
]

export default function SpecialistQ17_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Two objects have velocities given by{' '}
          <Katex tex="\dot{\underset{\sim}{r}}(t)=\underset{\sim}{i}+\cos(t)\underset{\sim}{j}+\sin(t)\underset{\sim}{k}" /> and{' '}
          <Katex tex="\dot{\underset{\sim}{s}}(t)=\underset{\sim}{i}+2\cos(2t)\underset{\sim}{j}-\sin(t)\underset{\sim}{k}" />,
          where components are measured in <Katex tex="\mathrm{m\,s^{-1}}" />.
          <br />
          Given <Katex tex="\underset{\sim}{r}(0)=\underset{\sim}{i}" /> and{' '}
          <Katex tex="\underset{\sim}{s}(0)=-\underset{\sim}{k}" />, the distance, in metres, between the two objects when{' '}
          <Katex tex="t=2\pi" /> seconds is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="\sqrt2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="\sqrt5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
