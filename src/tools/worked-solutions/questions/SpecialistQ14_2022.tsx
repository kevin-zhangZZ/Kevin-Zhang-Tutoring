// 2022 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 28% correct.
// The velocity halfway along, which is not the average of the two velocities. Question text transcribed from the original paper.
// Solution is original.
// Interactive: spec-2022-mcq14-halfway (a velocity–time graph with the distance covered shaded:
// halfway through the time v = 12 but only 9.5 of 24 m is covered; the midpoint comes at 60% of
// the time, where v = 13).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Background } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const HalfwayWidget = lazyWidget(() => import('../interactives/spec-2022-mcq14-halfway'))

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
    reason: <>The constant-acceleration formula that links velocity to <em>distance</em>. It is the right tool because the question is about a point halfway along <Katex tex="AB" />, and no time is given or asked for.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}17^2 &= 7^2+2as\\ 2as &= 289-49 = 240\end{aligned}" />,
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
    reason: <>Substitute <Katex tex="as=120" />. Take the positive root: the velocity rises steadily from 7 to 17, so it is positive all the way from <Katex tex="A" /> to <Katex tex="B" />.</>,
  },
  {
    working: <Katex display tex="\boxed{v_M = 13\ \mathrm{ms^{-1}}}" />,
    reason: <>Matches option <b>D</b>. Option C, <Katex tex="\tfrac{7+17}{2}=12" />, is the velocity halfway through the <em>time</em>, because velocity grows evenly with time. But the particle moves slowly at first, so the first half of <Katex tex="AB" /> takes more than half the time. By the midpoint it has been speeding up for longer, so its velocity is more than 12.</>,
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
      extras={
        <Explore title="Halfway through the time is not halfway along AB">
          <HalfwayWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
