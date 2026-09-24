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
    reason: <>Particle 1’s position.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v_1}(t) = -\sin(t)\underset{\sim}{i}+\cos(t)\underset{\sim}{j}+\frac{\cos(2t)}{\sqrt{\sin(2t)}}\underset{\sim}{k}" />,
    reason: <>Differentiate; the <Katex tex="\underset{\sim}{k}" /> component uses the chain rule on <Katex tex="\sqrt{\sin(2t)}" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r_2}(t) = \sin(t)\underset{\sim}{i}+\cos(t)\underset{\sim}{j}+\sqrt{\sin(2t)}\,\underset{\sim}{k}" />,
    reason: <>Particle 2’s position (same k-component as particle 1).</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v_1}\cdot\underset{\sim}{r_2} = -\sin^2(t)+\cos^2(t) + \frac{\cos(2t)}{\sqrt{\sin(2t)}}\cdot\sqrt{\sin(2t)}" />,
    reason: <>Dot product — the <Katex tex="\underset{\sim}{k}" /> components' square roots cancel neatly.</>,
  },
  {
    working: <Katex display tex="= \cos(2t) + \cos(2t) = 2\cos(2t)" />,
    reason: <>Using <Katex tex="\cos^2(t)-\sin^2(t)=\cos(2t)" />.</>,
  },
  {
    working: <Katex display tex="2\cos(2t)=0 \;\implies\; 2t = \tfrac{\pi}{2}+k\pi \;\implies\; t=\tfrac{\pi}{4}+\tfrac{k\pi}{2}" />,
    reason: <>Solve for perpendicularity.</>,
  },
  {
    working: <Katex display tex="\boxed{t\in\big(0,\tfrac{\pi}{2}\big) \;\implies\; \text{only } t=\tfrac{\pi}{4} \text{ works} \;\implies\; 1 \text{ time}}" />,
    reason: <>The next solution, <Katex tex="t=\tfrac{3\pi}{4}" />, falls outside the given interval. Matches option <b>A</b>.</>,
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
