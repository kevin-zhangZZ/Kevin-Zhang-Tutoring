// 2015 Specialist Mathematics — Exam 1, Question 5 (3 marks). A volume of revolution about
// the y-axis. Question text transcribed from the original paper (no diagram given). Answer
// checked with sympy and against the VCAA examination report. Solution is original. This
// question has no lettered parts, so it uses the plain card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [24, 30, 9, 37],
  average: 1.6,
  comment: (
    <>
      This question divided the cohort, with several students answering it very well but
      others having some difficulty. Typical errors included finding an area rather than a
      volume and rotating about the incorrect axis. Several students who rotated about the
      correct axis integrated from 0 to 5 rather than –3 to 5. A number of students made
      mistakes when trying to put <Katex tex="x^2" /> in terms of <Katex tex="y" />. Many
      students made arithmetic and transcription errors in their calculation of the
      integrand. Others rotated about the wrong axis. Some omitted <Katex tex="\pi" /> or
      included <Katex tex="2\pi" /> instead of <Katex tex="\pi" />. There were many
      arithmetical slips in the final substitution and evaluation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_{y_1}^{y_2} x^2\,dy" />,
    reason: <>Rotation about the <Katex tex="y" />-axis, so the integral runs in <Katex tex="y" /> and needs <Katex tex="x^2" /> as a function of <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="y = 2x^2-3 \implies x^2 = \frac{y+3}{2}" />,
    reason: <>Rearranging. There is no need for <Katex tex="x" /> itself — only <Katex tex="x^2" /> appears, which is why the square root never has to be taken.</>,
  },
  {
    working: <Katex display tex="y\text{-intercept}:\ x=0 \implies y = -3" />,
    reason: <>The region is bounded on the left by the <Katex tex="y" />-axis, so the lower terminal is where the parabola meets it — at <Katex tex="y=-3" />, the vertex, not at <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_{-3}^{5}\frac{y+3}{2}\,dy" />,
    reason: <>Upper terminal <Katex tex="y=5" /> from the line, lower terminal <Katex tex="y=-3" /> from the vertex.</>,
  },
  {
    working: <Katex display tex="= \frac\pi2\left[\frac{(y+3)^2}{2}\right]_{-3}^{5}" />,
    reason: <>Antidifferentiating <Katex tex="y+3" /> as a linear chain keeps the arithmetic clean.</>,
  },
  {
    working: <Katex display tex="= \frac\pi2\left(\frac{64}{2}-0\right) = \frac\pi2\times32" />,
    reason: <>At <Katex tex="y=5" />, <Katex tex="(y+3)^2=64" />; at <Katex tex="y=-3" /> it is zero.</>,
  },
  {
    working: <Katex display tex="\boxed{V = 16\pi}" />,
    reason: <>A sanity check: the solid sits inside a cylinder of radius <Katex tex="x=2" /> (where <Katex tex="y=5" />) and height <Katex tex="8" />, volume <Katex tex="32\pi" /> — and this cone-like solid is exactly half of that.</>,
  },
]

export default function SpecialistQ5_2015Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 5 (3 marks)">
        <p>
          Find the volume generated when the region bounded by the graph of{' '}
          <Katex tex="y=2x^2-3" />, the line <Katex tex="y=5" /> and the{' '}
          <Katex tex="y" />-axis is rotated about the <Katex tex="y" />-axis.
        </p>
      </Background>
      <Background>
        <p>
          No diagram is given, so sketch one: the parabola has its vertex at{' '}
          <Katex tex="(0,-3)" /> and reaches <Katex tex="y=5" /> at <Katex tex="x=\pm2" />.
          The region described is the right-hand half, and the sketch is what tells you the
          terminals run from <Katex tex="-3" /> to <Katex tex="5" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
