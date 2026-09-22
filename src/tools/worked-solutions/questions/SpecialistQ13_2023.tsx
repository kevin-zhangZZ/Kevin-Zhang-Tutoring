// 2023 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 45% correct.
// A dropped object keeps the upward velocity of whatever it was dropped from. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 10, C: 22, D: 19, E: 45 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = +2.5\ \mathrm{ms^{-1}} \ \text{(upwards, with the balloon)}" />,
    reason: <>The phone is <em>dropped</em>, not thrown: it leaves with the balloon's velocity, so it first travels <em>up</em>. Taking <Katex tex="u=0" /> gives <Katex tex="4.04" /> s, option <b>D</b>.</>,
  },
  {
    working: <Katex display tex="a = -9.8\ \mathrm{ms^{-2}}, \qquad s = -80\ \mathrm{m}" />,
    reason: 'Taking up as positive throughout, so the displacement to the ground is negative.',
  },
  {
    working: <Katex display tex="s = ut+\tfrac12at^2 \implies -80 = 2.5t-4.9t^2" />,
    reason: 'The constant-acceleration formula linking displacement and time.',
  },
  {
    working: <Katex display tex="4.9t^2-2.5t-80 = 0" />,
    reason: 'Rearranged into standard form.',
  },
  {
    working: <Katex display tex="t = \frac{2.5\pm\sqrt{6.25+1568}}{9.8} = \frac{2.5\pm39.678}{9.8}" />,
    reason: <>The negative root <Katex tex="-3.79" /> is the time the phone would have left the ground had it been thrown; discard it.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 4.30 \ \text{seconds}}" />,
    reason: <>Option <b>E</b>. Longer than the <Katex tex="4.04" /> s of a straight drop, as it must be — the phone goes up before it comes down.</>,
  },
]

export default function SpecialistQ13_2023() {
  return (
    <MCQShell
      question={
        <p>
          A tourist in a hot air balloon, which is rising vertically at{' '}
          <Katex tex="2.5\ \mathrm{ms^{-1}}" />, accidentally drops a phone over the side when
          the phone is 80 metres above the ground. Assuming air resistance is negligible, how
          long in seconds, correct to two decimal places, does it take for the phone to hit
          the ground?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2.86" /> },
        { letter: 'B', content: <Katex tex="2.98" /> },
        { letter: 'C', content: <Katex tex="3.79" /> },
        { letter: 'D', content: <Katex tex="4.04" /> },
        { letter: 'E', content: <Katex tex="4.30" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
