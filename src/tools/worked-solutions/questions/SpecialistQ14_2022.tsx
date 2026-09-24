// 2022 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 28% correct.
// The velocity halfway along, which is not the average of the two velocities. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Background } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 7, C: 49, D: 28, E: 7 },
  answer: 'D',
  comment: (
    <>
      <Katex tex="17^2=7^2+2as,\ as=120." /> Displacement at midpoint{' '}
      <Katex tex="=\dfrac s2" />.
      <br />
      <Katex tex="v^2=7^2+2a\times\dfrac s2=49+as=49+120=169,\ v=13" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v^2 = u^2+2as" />,
    reason: <>The constant-acceleration formula that links velocity to <em>distance</em> — the right tool, because the question is about a point halfway along <Katex tex="AB" />.</>,
  },
  {
    working: <Katex display tex="17^2 = 7^2+2as \implies 289 = 49+2as \implies 2as = 240" />,
    reason: <>Taking <Katex tex="s" /> as the whole distance <Katex tex="AB" />. Neither <Katex tex="a" /> nor <Katex tex="s" /> can be found separately, and neither needs to be.</>,
  },
  {
    working: <Katex display tex="as = 120" />,
    reason: <>This single product is all the information the question actually supplies.</>,
  },
  {
    working: <Katex display tex="v_M^2 = 7^2+2a\left(\frac s2\right) = 49+as" />,
    reason: <>Same formula, applied from <Katex tex="A" /> to the midpoint, where the distance travelled is <Katex tex="\tfrac s2" />.</>,
  },
  {
    working: <Katex display tex="v_M^2 = 49+120 = 169" />,
    reason: <>The unknown product drops straight in.</>,
  },
  {
    working: <Katex display tex="\boxed{v_M = 13\ \mathrm{ms^{-1}}}" />,
    reason: <>Matches option <b>D</b>. Option C, 12, is <em>not</em> the answer: <Katex tex="\tfrac{7+17}{2}=12" />: the particle spends longer in the slow half, so it is past halfway in time when it reaches halfway in distance, and has picked up more than half the extra speed.</>,
  },
]

export default function SpecialistQ14_2022() {
  return (
    <MCQShell
      question={
        <p>
          A particle moving in a straight line with constant acceleration has a velocity of{' '}
          <Katex tex="7\ \mathrm{ms^{-1}}" /> at point <Katex tex="A" /> and{' '}
          <Katex tex="17\ \mathrm{ms^{-1}}" /> at point <Katex tex="B" />.
          <br />
          The velocity of the particle, in metres per second, at the midpoint of <Katex tex="AB" /> is
        </p>
      }
      background={
        <Background title="Kinematics, not Mechanics">
          <p>
            No forces appear here — this is straight-line motion under constant acceleration,
            which is still part of Specialist Mathematics. The only equation needed,{' '}
            <Katex tex="v^2=u^2+2as" />, is on the formula sheet.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt{119}" /> },
        { letter: 'B', content: <Katex tex="11" /> },
        { letter: 'C', content: <Katex tex="12" /> },
        { letter: 'D', content: <Katex tex="13" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\sqrt{240}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
