// 2020 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 72% correct. The
// word "momentum" is dressing; the mathematics is subtracting two vectors and taking a
// magnitude. Question text transcribed from the original paper. Solution is original.
// Interactive: spec-2020-mcq19-change-arrow (Δv as the arrow from the tip of before to the tip of
// after; "knocked back" shows when 10 + 7 would be right). The report has no comment on this
// question; the WrongMethod rests on its option percentages (E 7%), with 0.02 × 17 = 0.34 exact.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ChangeArrowWidget = lazyWidget(() => import('../interactives/spec-2020-mcq19-change-arrow'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 72, C: 9, D: 8, E: 7 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Delta\underset{\sim}{p} = m\underset{\sim}{v}_{\text{after}}-m\underset{\sim}{v}_{\text{before}} = m\left(\underset{\sim}{v}_{\text{after}}-\underset{\sim}{v}_{\text{before}}\right)" />,
    reason: (
      <>
        Momentum is mass times velocity, so it is a vector, and a change is always after minus before. Factor the
        mass out first: it saves multiplying twice.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{v}_{\text{after}}-\underset{\sim}{v}_{\text{before}} &= \left(2\underset{\sim}{i}-7\underset{\sim}{j}\right)-\left(2\underset{\sim}{i}-10\underset{\sim}{j}\right)\\ &= 3\underset{\sim}{j}\end{aligned}" />,
    reason: (
      <>
        Subtract component by component, keeping the signs: <Katex tex="-7-(-10) = 3" />. The{' '}
        <Katex tex="\underset{\sim}{i}" /> components are identical, so only the vertical motion changes. Both{' '}
        <Katex tex="\underset{\sim}{j}" /> components are negative: the hit slowed the ball but didn&apos;t send it
        back.
      </>
    ),
  },
  {
    working: <Katex display tex="\Delta\underset{\sim}{p} = 0.02\times3\underset{\sim}{j} = 0.06\underset{\sim}{j}" />,
    reason: <>Scale by the mass in kilograms.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\Delta\underset{\sim}{p}\right| = 0.06}" />,
    reason: (
      <>
        Matches option <b>B</b>. Option <b>E</b>, <Katex tex="0.34=0.02\times17" />, comes from adding the{' '}
        <Katex tex="\underset{\sim}{j}" />-components (<Katex tex="10+7" />) instead of subtracting them.
      </>
    ),
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
          <Katex tex="2\underset{\sim}{i}-7\underset{\sim}{j}\text{ m s}^{-1}" />.
          <br />
          The magnitude of the change in momentum of the cricket ball, in{' '}
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
      extras={
        <>
          <Explore title="A change in velocity is the arrow from before to after">
            <ChangeArrowWidget />
          </Explore>
          <WrongMethod
            title="The ball was hit back, so the 10 and the 7 add: 17"
            source="7% chose E"
            working={<Katex display tex="0.02\times(10+7) = 0.34" />}
          >
            Adding is right only if the ball reverses direction. Here both velocities have a negative{' '}
            <Katex tex="\underset{\sim}{j}" />-component, so the ball is still travelling in the{' '}
            <Katex tex="-\underset{\sim}{j}" /> direction after the hit, just slower. Subtract the vectors and let
            the signs decide: <Katex tex="-7-(-10) = 3" />. In the diagram, &ldquo;Knocked back&rdquo; shows the
            case where 17 would be right.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
