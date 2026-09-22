// 2022 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 74% correct.
// Constant acceleration from a distance and a time, then a change in momentum. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Background } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 6, C: 74, D: 14, E: 2 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="s = ut+\tfrac12at^2" />,
    reason: 'The constant-acceleration formula that uses distance and time, which is what the question gives.',
  },
  {
    working: <Katex display tex="30 = 3(6)+\tfrac12a(6)^2 = 18+18a" />,
    reason: <>Substituting <Katex tex="u=3" />, <Katex tex="t=6" />, <Katex tex="s=30" />.</>,
  },
  {
    working: <Katex display tex="a = \frac{12}{18} = \frac23\ \mathrm{ms^{-2}}" />,
    reason: 'A tidy value, which is a sign the substitutions were right.',
  },
  {
    working: <Katex display tex="v = u+at = 3+\frac23(6) = 7\ \mathrm{ms^{-1}}" />,
    reason: 'The final velocity after the 6 seconds.',
  },
  {
    working: <Katex display tex="\Delta p = mv-mu = m(v-u) = 7(7-3)" />,
    reason: <>Momentum is <Katex tex="mv" />; the change is the mass times the change in velocity.</>,
  },
  {
    working: <Katex display tex="\boxed{\Delta p = 28\ \mathrm{kg\,ms^{-1}}}" />,
    reason: <>Option <b>C</b>. Option <b>D</b>, <Katex tex="49=7\times7" />, is the final momentum rather than the change.</>,
  },
]

export default function SpecialistQ17_2022() {
  return (
    <MCQShell
      question={
        <p>
          A particle of mass 7 kg travels in a straight line with constant acceleration from
          an initial velocity of <Katex tex="3\ \mathrm{ms^{-1}}" />. The particle travels a
          distance of 30 m in 6 seconds. The change in momentum of the particle, in{' '}
          <Katex tex="\mathrm{kg\,ms^{-1}}" />, is
        </p>
      }
      background={
        <Background title="Momentum wording, kinematics mathematics">
          <p>
            Momentum belongs to Mechanics, which is no longer an area of study. But the units
            in the question give away <Katex tex="p=mv" />, and everything before that step is
            constant-acceleration kinematics — still current content, and both formulas needed
            are on the formula sheet.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="28" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="49" /> },
        { letter: 'E', content: <Katex tex="60" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
