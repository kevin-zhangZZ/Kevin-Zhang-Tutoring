// 2020 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 72% correct. The
// word "momentum" is dressing; the mathematics is subtracting two vectors and taking a
// magnitude. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 72, C: 9, D: 8, E: 7 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Delta\underset{\sim}{p} = m\underset{\sim}{v}_{\text{after}}-m\underset{\sim}{v}_{\text{before}} = m\left(\underset{\sim}{v}_{\text{after}}-\underset{\sim}{v}_{\text{before}}\right)" />,
    reason: <>Factor the mass out first — it saves multiplying twice, and makes the cancellation in the next line obvious.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}_{\text{after}}-\underset{\sim}{v}_{\text{before}} = \left(2\underset{\sim}{i}-7\underset{\sim}{j}\right)-\left(2\underset{\sim}{i}-10\underset{\sim}{j}\right) = 3\underset{\sim}{j}" />,
    reason: <>The <Katex tex="\underset{\sim}{i}" /> components are identical, so only the vertical motion changes.</>,
  },
  {
    working: <Katex display tex="\Delta\underset{\sim}{p} = 0.02\times3\underset{\sim}{j} = 0.06\underset{\sim}{j}" />,
    reason: 'Scaling by the mass in kilograms.',
  },
  {
    working: <Katex display tex="\boxed{\left|\Delta\underset{\sim}{p}\right| = 0.06}" />,
    reason: <>Matches option <b>B</b>. Subtracting the <em>magnitudes</em> instead of the vectors, or taking the magnitude of each momentum separately, produces the distractors.</>,
  },
]

export default function SpecialistQ19_2020() {
  return (
    <MCQShell
      question={
        <p>
          A cricket ball of mass 0.02 kg, moving with velocity{' '}
          <Katex tex="2\underset{\sim}{i}-10\underset{\sim}{j}\text{ m s}^{-1}" />, is hit
          and after impact travels with velocity{' '}
          <Katex tex="2\underset{\sim}{i}-7\underset{\sim}{j}\text{ m s}^{-1}" />. The
          magnitude of the change in momentum of the cricket ball, in{' '}
          <Katex tex="\text{kg m s}^{-1}" />, is closest to
        </p>
      }
      background={
        <Background title="Momentum wording, vector mathematics">
          <p>
            Momentum belongs to the Mechanics area of study, which Specialist Mathematics no
            longer has. But <Katex tex="\underset{\sim}{p}=m\underset{\sim}{v}" /> is given
            away by the units in the question, and everything else is subtracting two
            vectors, scaling by a number, and taking a magnitude — all current content.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.04" /> },
        { letter: 'B', content: <Katex tex="0.06" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.10" /> },
        { letter: 'D', content: <Katex tex="0.24" /> },
        { letter: 'E', content: <Katex tex="0.34" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
