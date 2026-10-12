// 2024 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 58% correct.
// Signed area under a velocity-time graph gives displacement, not distance. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2024-mcq11-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 58, C: 12, D: 16 },
  answer: 'B',
  comment: (
    <>
      Area above the <Katex tex="t" />-axis <Katex tex="=\dfrac{4000}{3}" /> metres travelled east
      <br />
      Area below the <Katex tex="t" />-axis <Katex tex="=\dfrac{2500}{3}" /> metres travelled west
      <br />
      <Katex tex="\therefore" /> Distance east <Katex tex="=\dfrac{4000}{3}-\dfrac{2500}{3}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{displacement} = \int_0^{150}v\,dt" />,
    reason: <>"How far east of <Katex tex="O" />" asks for displacement, the signed area under the graph: area above the <Katex tex="t" />-axis counts as positive (east), area below as negative (west).</>,
    more: <>Velocity is negative below the axis, so the particle is moving west there and that area takes it back towards <Katex tex="O" />. Adding every area as a positive gives the total distance travelled instead — see the last row.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}v &= 40-\tfrac35 t \\ v = 0 &\implies t = \tfrac{200}{3}\end{aligned}" />,
    reason: <>The first segment joins <Katex tex="(0,40)" /> and <Katex tex="(100,-20)" />, so it has gradient <Katex tex="-\tfrac{60}{100}=-\tfrac35" />. Setting <Katex tex="v=0" /> finds where it crosses the <Katex tex="t" />-axis.</>,
    more: <>The crossing is not on a grid line (<Katex tex="t\approx66.7" />), so it must come from the equation rather than be read off the graph. That crossing splits the first segment into a triangle above the axis and a triangle below.</>,
  },
  {
    working: <Katex display tex="A_1 = \tfrac12\times\tfrac{200}{3}\times40 = \tfrac{4000}{3}" />,
    reason: <>Triangle above the axis: base from <Katex tex="t=0" /> to <Katex tex="t=\tfrac{200}{3}" />, height 40. This is eastward travel.</>,
  },
  {
    working: <Katex display tex="A_2 = \tfrac12\times\left(100-\tfrac{200}{3}\right)\times20 = \tfrac{1000}{3}" />,
    reason: <>Triangle below the axis: base from <Katex tex="t=\tfrac{200}{3}" /> to <Katex tex="t=100" />, depth 20. Westward travel.</>,
  },
  {
    working: <Katex display tex="A_3 = \tfrac12\times50\times20 = 500" />,
    reason: <>The second segment, from <Katex tex="(100,-20)" /> to <Katex tex="(150,0)" />: base 50, depth 20, also below the axis, so also westward.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{4000}{3}-\tfrac{1000}{3}-500 = 500 \ \text{m}}" />,
    reason: <>Matches option <b>B</b>: <Katex tex="\tfrac{4000}{3}" /> m east, then <Katex tex="A_2+A_3=\tfrac{2500}{3}" /> m back west.</>,
    more: <>Option <b>D</b> (16%), <Katex tex="\tfrac{4000}{3}+\tfrac{2500}{3}=\tfrac{6500}{3}" />, is the total distance travelled — every area counted as positive. Option <b>C</b> (12%), 1000, is the displacement at <Katex tex="t=100" />, <Katex tex="\tfrac{4000}{3}-\tfrac{1000}{3}" />: it leaves out the second segment. Option <b>A</b> (13%), 450, is what you get by estimating the crossing as <Katex tex="t=65" /> instead of solving for it: <Katex tex="1300-350-500=450" />.</>,
  },
]

export default function SpecialistQ11_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The velocity–time graph of a particle moving along an east–west line with velocity{' '}
            <Katex tex="v" /> m s<Katex tex="^{-1}" /> at time <Katex tex="t" /> seconds,
            starting from a fixed origin <Katex tex="O" />, is shown below. The graph
            comprises two straight line segments.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={graphSrc}
              alt="A velocity-time graph falling in a straight line from (0, 40) through the t-axis to (100, −20), then rising in a straight line to (150, 0) — from the original 2024 VCAA exam paper"
              className="w-full max-w-[440px]"
            />
          </div>
          <p>
            The initial velocity of the particle is 40 m s<Katex tex="^{-1}" /> to the east.
            <br />
            How far, in metres, is the particle to the east of <Katex tex="O" />, 150 seconds
            later?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="450" /> },
        { letter: 'B', content: <Katex tex="500" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1000" /> },
        { letter: 'D', content: <Katex tex="\frac{6500}{3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
