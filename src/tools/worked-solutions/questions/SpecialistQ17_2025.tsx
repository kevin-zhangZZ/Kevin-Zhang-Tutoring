// 2025 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 52% correct. This
// year's paper used four options (A–D) rather than five. Integrating an acceleration vector,
// starting from rest, to find velocity. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 17, C: 52, D: 7 },
  answer: 'C',
  comment: <>Care needs to be taken to include a constant vector of integration when integrating the acceleration, and to use the "starts from rest" condition to find it.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\vec a(t) = 4\cos(2t)\vec i+10\sin(2t)\vec j-6e^{-2t}\vec k" />,
    reason: 'Given acceleration vector.',
  },
  {
    working: <Katex display tex="v_x(t) = \int 4\cos(2t)\,dt = 2\sin(2t)+C_1" />,
    reason: 'Integrate each component separately.',
  },
  {
    working: <Katex display tex="v_x(0)=0 \;\implies\; 0+C_1=0 \;\implies\; C_1=0" />,
    reason: <>"Starts from rest" means <Katex tex="\vec v(0)=\vec 0" /> — use this to pin down each constant.</>,
  },
  {
    working: <Katex display tex="v_y(t) = \int 10\sin(2t)\,dt = -5\cos(2t)+C_2" />,
    reason: 'Integrate the j-component.',
  },
  {
    working: <Katex display tex="v_y(0)=0 \;\implies\; -5+C_2=0 \;\implies\; C_2=5 \;\implies\; v_y(t)=-5\big(\cos(2t)-1\big)" />,
    reason: 'Solve for the constant and factor.',
  },
  {
    working: <Katex display tex="v_z(t) = \int -6e^{-2t}\,dt = 3e^{-2t}+C_3" />,
    reason: 'Integrate the k-component.',
  },
  {
    working: <Katex display tex="v_z(0)=0 \;\implies\; 3+C_3=0 \;\implies\; C_3=-3 \;\implies\; v_z(t)=3\big(e^{-2t}-1\big)" />,
    reason: 'Solve for the constant and factor.',
  },
  {
    working: <Katex display tex="\boxed{\vec v(t) = 2\sin(2t)\vec i - 5\big(\cos(2t)-1\big)\vec j+3\big(e^{-2t}-1\big)\vec k}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function SpecialistQ17_2025() {
  return (
    <MCQShell
      question={
        <p>
          The acceleration vector of a particle that starts from rest is given by{' '}
          <Katex tex="\vec a(t) = 4\cos(2t)\vec i+10\sin(2t)\vec j-6e^{-2t}\vec k" />, where <Katex tex="t\geq0" />.
          <br />
          The velocity vector of the particle, <Katex tex="\vec v(t)" />, is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\sin(2t)\vec i-5\cos(2t)\vec j+3e^{-2t}\vec k" /> },
        { letter: 'B', content: <Katex tex="2\sin(2t)\vec i-5\big(\cos(2t)+1\big)\vec j+3\big(e^{-2t}+1\big)\vec k" /> },
        { letter: 'C', content: <Katex tex="2\sin(2t)\vec i-5\big(\cos(2t)-1\big)\vec j+3\big(e^{-2t}-1\big)\vec k" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-8\sin(2t)\vec i+20\cos(2t)\vec j+12e^{-2t}\vec k" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
