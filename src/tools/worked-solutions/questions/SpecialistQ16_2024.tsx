// 2024 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 43% correct. This
// year's paper used four options (A–D) rather than five. How many times is the velocity of
// one particle perpendicular to the position of another, on a given interval. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 43, B: 30, C: 19, D: 7 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="\underset{\sim}{v}_1(t)=\dfrac{d}{dt}\underset{\sim}{r}_1(t)=-\sin(t)\underset{\sim}{i}+\cos(t)\underset{\sim}{j}+\dfrac{\cos(2t)}{\sqrt{\sin(2t)}}\underset{\sim}{k}" />
      <br />
      If perpendicular, then solve <Katex tex="\underset{\sim}{v}_1(t)\cdot \underset{\sim}{r}_2(t)=0" /> in domain{' '}
      <Katex tex="\left(0,\dfrac{\pi}{2}\right)" />
      <br />
      <Katex tex="\underset{\sim}{v}_1(t)\cdot \underset{\sim}{r}_2(t)=-\sin^2t+\cos^2t+\cos(2t)=2\cos(2t)=0" />
      <br />
      <Katex tex="2t=\dfrac{\pi}{2},\ t=\dfrac{\pi}{4}" /> is the only solution.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r_1}(t) = \cos(t)\underset{\sim}{i}+\sin(t)\underset{\sim}{j}+\sqrt{\sin(2t)}\,\underset{\sim}{k}" />,
    reason: <>Particle 1’s position. We need its <b>velocity</b>, so differentiate it.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v_1}(t) = -\sin(t)\underset{\sim}{i}+\cos(t)\underset{\sim}{j}+\frac{\cos(2t)}{\sqrt{\sin(2t)}}\underset{\sim}{k}" />,
    reason: (
      <>
        Differentiate each component; the <Katex tex="\underset{\sim}{k}" /> component uses the chain rule on{' '}
        <Katex tex="\sqrt{\sin(2t)}" />.
      </>
    ),
    more: (
      <>
        <Katex tex="\dfrac{d}{dt}\big(\sin(2t)\big)^{1/2}=\tfrac12\big(\sin(2t)\big)^{-1/2}\cdot 2\cos(2t)=\dfrac{\cos(2t)}{\sqrt{\sin(2t)}}" />.
        On <Katex tex="\big(0,\tfrac{\pi}{2}\big)" />, <Katex tex="\sin(2t)>0" />, so this is always defined (at the endpoints
        it would be undefined, as <Katex tex="\sin(2t)=0" /> there).
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{r_2}(t) = \sin(t)\underset{\sim}{i}+\cos(t)\underset{\sim}{j}+\sqrt{\sin(2t)}\,\underset{\sim}{k}" />,
    reason: <>Particle 2’s <b>position</b> is used as given — it is not differentiated.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\underset{\sim}{v_1}\cdot\underset{\sim}{r_2} &= -\sin^2(t)+\cos^2(t)\\ &\quad+ \frac{\cos(2t)}{\sqrt{\sin(2t)}}\cdot\sqrt{\sin(2t)}\end{aligned}"
      />
    ),
    reason: (
      <>
        Perpendicular means the dot product is zero. Multiply matching components; the{' '}
        <Katex tex="\underset{\sim}{k}" /> components’ square roots cancel.
      </>
    ),
  },
  {
    working: <Katex display tex="= \cos(2t) + \cos(2t) = 2\cos(2t)" />,
    reason: <>Using <Katex tex="\cos^2(t)-\sin^2(t)=\cos(2t)" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}2\cos(2t)=0 &\implies 2t = \tfrac{\pi}{2}+n\pi\\ &\implies t=\tfrac{\pi}{4}+\tfrac{n\pi}{2},\ n\in Z\end{aligned}"
      />
    ),
    reason: <>Set the dot product to zero; cosine is zero at odd multiples of <Katex tex="\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t=\tfrac{\pi}{4}\text{ only} \implies 1 \text{ time}}" />,
    reason: (
      <>
        Only <Katex tex="t=\tfrac{\pi}{4}" /> lies in <Katex tex="\big(0,\tfrac{\pi}{2}\big)" />; its neighbours{' '}
        <Katex tex="-\tfrac{\pi}{4}" /> and <Katex tex="\tfrac{3\pi}{4}" /> fall outside. Matches option <b>A</b>.
      </>
    ),
    more: (
      <>
        Equivalently, <Katex tex="2t\in(0,\pi)" />, and cosine is zero only once there, at{' '}
        <Katex tex="2t=\tfrac{\pi}{2}" />. The stem bolds <b>velocity</b> and <b>position</b> because mixing them up
        changes the count. Option <b>B</b> (2), the most common wrong answer, is the count if you dot the two{' '}
        <em>velocities</em>: <Katex tex="\underset{\sim}{v_1}\cdot\underset{\sim}{v_2}=\dfrac{\cos(4t)}{\sin(2t)}" />,
        which is zero at <Katex tex="t=\tfrac{\pi}{8}" /> and <Katex tex="\tfrac{3\pi}{8}" />. Dotting the two{' '}
        <em>positions</em> gives <Katex tex="2\sin(2t)" />, which is never zero on the interval.
      </>
    ),
  },
]

export default function SpecialistQ16_2024() {
  return (
    <MCQShell
      question={
        <p>
          Particle 1 has position vector <Katex tex="\underset{\sim}{r_1}(t)=\cos(t)\underset{\sim}{i}+\sin(t)\underset{\sim}{j}+\sqrt{\sin(2t)}\,\underset{\sim}{k}" />{' '}
          and Particle 2 has position vector <Katex tex="\underset{\sim}{r_2}(t)=\sin(t)\underset{\sim}{i}+\cos(t)\underset{\sim}{j}+\sqrt{\sin(2t)}\,\underset{\sim}{k}" />,
          where <Katex tex="t" /> is measured in seconds and <Katex tex="t\in\big(0,\tfrac{\pi}{2}\big)" />.
          <br />
          The number of times the <b>velocity</b> of Particle 1 is perpendicular to the <b>position</b> vector{' '}
          <Katex tex="\underset{\sim}{r_2}(t)" /> during the first <Katex tex="\tfrac{\pi}{2}" /> seconds is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
