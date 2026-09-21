// 2015 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 47% correct.
// Tracing a solution curve through a direction field. Question text transcribed from the
// original paper; the figure is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2015e2-mcq13-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 15, C: 26, D: 47, E: 6 },
  answer: 'D',
  noAnswer: 1,
  comment: <>The solution doesn't cross any gradient segments.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{start at } (-2.5,\ 1.5)" />,
    reason: <>A solution curve is <em>tangent</em> to the segment at every point it passes through, so it can never cut across one. That single rule is the whole method.</>,
  },
  {
    working: <Katex display tex="x \approx -2.5:\quad \frac{dy}{dx} \ll 0" />,
    reason: <>The segments on the left of the field are steeply negative, so the curve drops sharply as it moves right.</>,
  },
  {
    working: <Katex display tex="-1 \lesssim x \lesssim 1:\quad \frac{dy}{dx} \approx 0" />,
    reason: <>Through the middle band the segments lie almost flat, so the curve levels out — it neither climbs to <Katex tex="y=2" /> nor keeps plunging. Options A, B and E all sit <em>above</em> the starting height, which no falling curve can reach.</>,
  },
  {
    working: <Katex display tex="1.5 \lesssim x \le 3:\quad \frac{dy}{dx} < 0 \text{ again, steepening}" />,
    reason: <>On the right the segments tilt down once more, so the curve resumes falling all the way to <Katex tex="x=3" />.</>,
  },
  {
    working: <Katex display tex="\text{at } x = 3: \quad y < 1" />,
    reason: <>Having fallen twice and never risen, the curve must be well below its starting height of <Katex tex="1.5" /> — which rules out option C at <Katex tex="(3,1)" />: that would need the curve to have flattened far more than the field allows.</>,
  },
  {
    working: <Katex display tex="\boxed{(3,\ -0.5)}" />,
    reason: <>Option D — the only point both below the start and reachable by following the segments across the whole field.</>,
  },
]

export default function SpecialistQ13_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The direction field for a certain differential equation is shown below.</p>
          <p>
            The solution curve to the differential equation that passes through the point{' '}
            <Katex tex="(-2.5,\,1.5)" /> could also pass through
          </p>
        </>
      }
      diagram={
        <img
          src={fieldSrc}
          alt="A direction field on axes from x = -3.5 to 3.5 and y = -2.5 to 2: the line segments are steeply negative near the left and right edges, and almost horizontal in a band through the middle of the field — from the original 2015 VCAA exam paper"
          className="w-full max-w-[460px]"
        />
      }
      background={
        <p>
          You do not need the differential equation. A solution curve follows the segments,
          so the sign of <Katex tex="\tfrac{dy}{dx}" /> across the field tells you whether the
          curve is rising or falling — and here it never rises, which eliminates three of the
          five options before any tracing.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0,\,2)" /> },
        { letter: 'B', content: <Katex tex="(1,\,2)" /> },
        { letter: 'C', content: <Katex tex="(3,\,1)" /> },
        { letter: 'D', content: <Katex tex="(3,\,-0.5)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="(-0.5,\,2)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
