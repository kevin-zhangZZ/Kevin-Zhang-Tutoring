// 2018 Mathematical Methods — Exam 1, Question 7 (5 marks). The point on y = 2x − 4 closest
// to the origin, then that distance in a prescribed surd form. Question text transcribed from
// the original paper (no diagram given). Answers checked independently with sympy and against
// the VCAA examination report, which presents the perpendicular-line method as Method 1.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [54, 5, 10, 30],
  average: 1.2,
  comment: (
    <>
      Line perpendicular to <Katex tex="y=2x-4" /> and passing through the origin is{' '}
      <Katex tex="y=-\tfrac{x}{2}" />. <Katex tex="P" /> is the point of intersection.
      Students who solved this problem using Method 1 were generally successful. Students who
      tackled this question by finding an expression for <Katex tex="OP" /> in terms of{' '}
      <Katex tex="x" />, then setting the derivative to zero, often had difficulty finding the
      derivative correctly, which ended up with an incorrect <Katex tex="x" /> value. However,
      most students calculated a <Katex tex="y" /> coordinate. Some students opted for a
      solution by working with similar triangles. A common incorrect response for{' '}
      <Katex tex="P" /> was <Katex tex="(2,0)" />, which is the point of intersection of the
      line <Katex tex="y=2x-4" /> and the <Katex tex="x" />-axis, while others incorrectly
      assumed the point <Katex tex="P" /> to be midway between the line segment formed by{' '}
      <Katex tex="y=2x-4" /> and its axial intercepts.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [45, 29, 27],
  average: 0.8,
  comment: (
    <>
      This question was attempted well. Some students misquoted the distance formula or made
      arithmetic errors in their calculations.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="m_{\text{line}} = 2 \implies m_{\perp} = -\frac12" />,
    reason: <>The shortest segment from a point to a line meets it at right angles, and perpendicular gradients multiply to <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="OP: \ y = -\frac{x}{2}" />,
    reason: <>The perpendicular through the origin — no intercept, since it passes through <Katex tex="(0,0)" />.</>,
  },
  {
    working: <Katex display tex="-\frac{x}{2} = 2x-4" />,
    reason: <>At <Katex tex="P" /> the two lines meet, so their <Katex tex="y" />-values agree.</>,
  },
  {
    working: <Katex display tex="-x = 4x-8 \implies 8 = 5x \implies x = \frac85" />,
    reason: <>Multiplying through by <Katex tex="2" /> first clears the fraction.</>,
  },
  {
    working: <Katex display tex="y = -\frac12\times\frac85 = -\frac45" />,
    reason: <>Substituting back into the easier of the two equations.</>,
  },
  {
    working: <Katex display tex="\boxed{P = \left(\frac85,\ -\frac45\right)}" />,
    reason: <>Check it lies on the original line: <Katex tex="2\left(\tfrac85\right)-4=\tfrac{16}{5}-\tfrac{20}{5}=-\tfrac45" /> ✓. The report's common wrong answer <Katex tex="(2,0)" /> is the line's <Katex tex="x" />-intercept — the nearest point to the origin <em>on the axis</em>, not the nearest point on the line.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="OP = \sqrt{(x_2-x_1)^2+(y_2-y_1)^2} = \sqrt{\left(\frac85-0\right)^2+\left(-\frac45-0\right)^2}" />,
    reason: <>Distance from the origin to <Katex tex="P" />. The report notes marks lost to a misquoted distance formula, so write it out before substituting.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{64}{25}+\frac{16}{25}} = \sqrt{\frac{80}{25}}" />,
    reason: <>A common denominator of <Katex tex="25" /> keeps the arithmetic exact.</>,
  },
  {
    working: <Katex display tex="= \frac{\sqrt{80}}{5} = \frac{4\sqrt{5}}{5}" />,
    reason: <><Katex tex="\sqrt{80}=\sqrt{16\times5}=4\sqrt5" />, and <Katex tex="\sqrt{25}=5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{OP = \frac{4\sqrt{5}}{5}}" />,
    reason: <>This is the required form <Katex tex="\tfrac{a\sqrt b}{b}" /> with <Katex tex="a=4" /> and <Katex tex="b=5" />, both positive integers — check the answer against the format the question prescribes before moving on. (<Katex tex="\tfrac{4\sqrt5}{5}\approx1.79" />, which is believable: the line passes about two units from the origin at its closest.)</>,
  },
]

export default function MethodsQ7_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (5 marks)</p>
        <p>
          Let <Katex tex="P" /> be a point on the straight line <Katex tex="y=2x-4" /> such
          that the length of <Katex tex="OP" />, the line segment from the origin{' '}
          <Katex tex="O" /> to <Katex tex="P" />, is a minimum.
        </p>
      </div>

      <PartCard letter="a" marks={3} statement={<>Find the coordinates of <Katex tex="P" />.</>} examinerReport={EXAM_A}>
        <Background>
          <p>
            "Minimise a distance" looks like a calculus problem, and it can be done that way:
            minimise <Katex tex="OP^2=x^2+(2x-4)^2" />, differentiate, set to zero. That route
            works and gives the same answer, but the report records that most students who
            took it mis-differentiated somewhere along the way.
          </p>
          <p>
            The geometry is shorter and safer. The closest point on a line to any given point
            is the foot of the perpendicular from it — so drop a perpendicular from the origin
            and find where it crosses. No calculus at all, which is exactly the kind of
            recognition Exam 1 rewards.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>Find the distance <Katex tex="OP" />. Express your answer in the form <Katex tex="\dfrac{a\sqrt{b}}{b}" />, where <Katex tex="a" /> and <Katex tex="b" /> are positive integers.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
