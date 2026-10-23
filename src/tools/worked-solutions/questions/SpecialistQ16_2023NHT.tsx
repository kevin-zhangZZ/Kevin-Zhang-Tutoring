// 2023 Specialist NHT — Exam 2, MCQ 16. The NHT report gives the answer key only, with no
// statistics. Kinematics with F = ma: constant acceleration from a constant force, then distance
// travelled from rest in 3 seconds. Question text transcribed from the original paper. Solution is
// original; the answer D agrees with the report's key. Newton's second law is Mechanics, which the
// site otherwise treats as off the current study design; written up because the 2023 NHT paper is
// set on the current design.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a=\frac{F}{m}=\frac{10}{5}=2\text{ ms}^{-2}" />,
    reason: <>Newton&apos;s second law, <Katex tex="F=ma" />. The surface is smooth, so the 10 N force is the only horizontal force, and it is constant, so the acceleration is constant.</>,
  },
  {
    working: <Katex display tex="u=0,\quad a=2,\quad t=3,\quad s=\,?" />,
    reason: <>&ldquo;Sitting at rest&rdquo; gives the initial velocity <Katex tex="u=0" />. Constant acceleration means the constant-acceleration formulas apply.</>,
  },
  {
    working: <Katex display tex="s=ut+\tfrac12at^2=0+\tfrac12(2)(3)^2=9" />,
    reason: <>Use <Katex tex="s=ut+\tfrac12at^2" />, the formula that links <Katex tex="s" />, <Katex tex="u" />, <Katex tex="a" /> and <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\boxed{9\text{ m}}" />,
    reason: <>Matches option <b>D</b>. Check: after 3 s the speed is <Katex tex="v=2\times3=6" />, so the average speed is 3 and the distance <Katex tex="3\times3=9" /> ✓.</>,
    more: <>Option A, 2.25, inverts the law as <Katex tex="a=\tfrac{m}{F}=0.5" />. Option E, 45, uses the force 10 in place of the acceleration: <Katex tex="\tfrac12(10)(3)^2" />.</>,
  },
]

export default function SpecialistQ16_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          A mass of 5 kg sitting at rest on a smooth horizontal surface is acted on by a horizontal force of 10 N.
          <br />
          How far, in metres, will the mass move from its original position in 3 seconds?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2.25" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="4.5" /> },
        { letter: 'D', content: <Katex tex="9" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="45" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
