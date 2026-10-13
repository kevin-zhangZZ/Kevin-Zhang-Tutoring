// 2015 Specialist Mathematics — Exam 1, Question 5 (3 marks). A volume of revolution about
// the y-axis. Question text transcribed from the original paper (no diagram given). Answer
// checked with sympy and against the VCAA examination report. Solution is original. This
// question has no lettered parts, so it uses the plain card layout rather than PartCard.
// Qualifies for an interactive (37% full marks): spec-2015e1-q5-discs shows the disc slices and
// the report's "0 to 5" terminal error.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const DiscsWidget = lazyWidget(() => import('../interactives/spec-2015e1-q5-discs'))

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
    reason: <>Rotating about the <Katex tex="y" />-axis makes horizontal discs of radius <Katex tex="x" />, area <Katex tex="\pi x^2" />, so integrate with respect to <Katex tex="y" />.</>,
    more: <>The report lists finding an area instead of a volume, rotating about the wrong axis, and omitting <Katex tex="\pi" /> or using <Katex tex="2\pi" />. Each disc has area <Katex tex="\pi r^2" />: the <Katex tex="\pi" /> belongs to the circle's area, while <Katex tex="2\pi r" /> is its circumference. Rotating about the <Katex tex="x" />-axis would be <Katex tex="\pi\int y^2\,dx" />, a different solid. The plain area of the right-hand half of the region is <Katex tex="\tfrac{32}{3}" />, not a volume at all.</>,
  },
  {
    working: <Katex display tex="y = 2x^2-3 \implies x^2 = \frac{y+3}{2}" />,
    reason: <>Make <Katex tex="x^2" /> the subject: add 3, then divide by 2. Only <Katex tex="x^2" /> is needed, so no square root is taken.</>,
    more: <>The report notes many mistakes putting <Katex tex="x^2" /> in terms of <Katex tex="y" /> and copying the integrand. Check by substituting back: <Katex tex="2\cdot\tfrac{y+3}{2}-3 = y" />.</>,
  },
  {
    working: <Katex display tex="y\text{-intercept}:\ x=0 \implies y = -3" />,
    reason: <>The region is bounded by the <Katex tex="y" />-axis, so it starts where the parabola meets that axis: the vertex <Katex tex="y=-3" />, not <Katex tex="y=0" />.</>,
    more: <>The report says several students who rotated about the correct axis integrated from 0 to 5. That gives <Katex tex="\pi\int_0^5\tfrac{y+3}{2}\,dy = \tfrac{55\pi}{4}" />, missing the <Katex tex="\tfrac{9\pi}{4}" /> of solid made by the part of the region below the <Katex tex="x" />-axis. The question never mentions the <Katex tex="x" />-axis, so it is not a boundary.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_{-3}^{5}\frac{y+3}{2}\,dy" />,
    reason: <>Substitute <Katex tex="x^2" />; the discs stack from the vertex up to the line <Katex tex="y=5" />.</>,
  },
  {
    working: <Katex display tex="= \frac\pi2\left[\frac{(y+3)^2}{2}\right]_{-3}^{5}" />,
    reason: <>Take the constant <Katex tex="\tfrac12" /> outside; <Katex tex="y+3" /> antidifferentiates to <Katex tex="\tfrac{(y+3)^2}{2}" /> (the reverse chain rule for a linear inside).</>,
    more: <>Antidifferentiating term by term works too: <Katex tex="\left[\tfrac{y^2}{2}+3y\right]_{-3}^{5} = \tfrac{55}{2}-\left(-\tfrac92\right) = 32" />, the same value, but with a negative terminal to handle. The report notes many arithmetic slips in this final substitution, which the bracket form avoids.</>,
  },
  {
    working: <Katex display tex="= \frac\pi2\left(\frac{64}{2}-0\right) = \frac\pi2\times32" />,
    reason: <>At <Katex tex="y=5" />, <Katex tex="(y+3)^2=64" />; at <Katex tex="y=-3" /> it is zero.</>,
  },
  {
    working: <Katex display tex="\boxed{V = 16\pi}" />,
    reason: <>The exact volume, in cubic units.</>,
    more: <>A check: the solid fits inside a cylinder of radius 2 (the parabola meets <Katex tex="y=5" /> at <Katex tex="x=2" />) and height <Katex tex="5-(-3)=8" />, volume <Katex tex="\pi\cdot2^2\cdot8=32\pi" />. The solid is a paraboloid (a bowl shape), which fills exactly half its enclosing cylinder, so <Katex tex="16\pi" /> is right. A cone would fill only a third.</>,
  },
]

export default function SpecialistQ5_2015Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 5 (3 marks)" always>
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
          The region is the part above the parabola, below <Katex tex="y=5" /> and to the right
          of the <Katex tex="y" />-axis (the left-hand half spins into the same solid).
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="The stack of discs starts at the vertex y = −3, not at y = 0">
        <DiscsWidget />
      </Explore>
      <ReportShelf stats={EXAM} maxMarks={3} />
    </div>
  )
}
