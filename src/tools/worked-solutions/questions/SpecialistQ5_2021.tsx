// 2021 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 32% correct.
// Maximum |z| on a given circle in the Argand plane. Question text transcribed from the
// original paper; the diagram is cropped directly from the original VCAA exam PDF, not a
// redrawing. Solution is original.
// Interactive: spec-2021-mcq5-farthest-point (drag P round the circle; |z| vs Im(z), greatest |z| at the far
// end of the line from O through the centre).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Explore, lazyWidget } from '../Explore'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import circleSrc from './spec-2021-mcq5-argand-circle.png'

const FarthestWidget = lazyWidget(() => import('../interactives/spec-2021-mcq5-farthest-point'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 42, B: 6, C: 18, D: 32, E: 2 },
  answer: 'D',
  comment: <Katex tex="\sqrt{2^2+\left(\sqrt3\right)^2}+1=\sqrt7+1" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z - (2+\sqrt3i)| = 1" />,
    reason: (
      <>
        <Katex tex="|z-w|" /> is the distance from <Katex tex="z" /> to <Katex tex="w" />, so this is every point at
        distance <Katex tex="1" /> from <Katex tex="2+\sqrt3i" />: a circle with centre <Katex tex="C(2,\sqrt3)" /> and
        radius <Katex tex="1" />.
      </>
    ),
  },
  {
    working: <>For a point <Katex tex="P" /> on the circle, <Katex tex="|z| = OP" />.</>,
    reason: (
      <>
        <Katex tex="|z|" /> is the distance from the origin to <Katex tex="z" />, so we want the point of the circle{' '}
        <i>farthest from</i> <Katex tex="O" />, not the highest point.
      </>
    ),
  },
  {
    working: <Katex display tex="OC = \sqrt{2^2+(\sqrt3)^2} = \sqrt{4+3} = \sqrt7" />,
    reason: <>Distance from the origin to the centre, by Pythagoras.</>,
  },
  {
    working: <Katex display tex="OP \le OC + CP = \sqrt7 + 1" />,
    reason: (
      <>
        In triangle <Katex tex="OCP" />, side <Katex tex="OP" /> can&rsquo;t be longer than the other two sides
        together. It equals <Katex tex="OC+CP" /> only when the triangle flattens into a straight line with{' '}
        <Katex tex="C" /> between <Katex tex="O" /> and <Katex tex="P" />: the point where the line from{' '}
        <Katex tex="O" /> through the centre meets the circle on the far side.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{|z|_{\max} = \sqrt7 + 1}" />,
    reason: (
      <>
        Matches option <b>D</b>. Option A, <Katex tex="\sqrt3+1" />, is the greatest <em>imaginary part</em> on the
        circle (its top point, <Katex tex="2+(\sqrt3+1)i" />), where <Katex tex="|z| = \sqrt{8+2\sqrt3} \approx 3.39" />,
        less than <Katex tex="\sqrt7+1\approx3.65" />. Option B, <Katex tex="3" />, is the greatest <em>real part</em>.
      </>
    ),
  },
]

export default function SpecialistQ5_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graph of the circle given by <Katex tex="|z-2-\sqrt3i|=1" />, where <Katex tex="z\in C" />, is
            shown below.
          </p>
          <div className="mb-2 flex justify-center">
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img src={circleSrc} alt="Argand diagram showing a circle of radius 1 centred at (2, √3) — from the original 2021 VCAA exam paper" className="w-full max-w-[280px]" />
            </div>
          </div>
          <p>For points on this circle, the maximum value of <Katex tex="|z|" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt3+1" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="\sqrt{13}" /> },
        { letter: 'D', content: <Katex tex="\sqrt7+1" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="8" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="The farthest point is through the centre, not at the top">
          <FarthestWidget />
        </Explore>
      }
    />
  )
}
