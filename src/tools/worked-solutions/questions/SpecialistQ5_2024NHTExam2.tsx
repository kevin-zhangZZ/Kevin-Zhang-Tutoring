// 2024 Specialist NHT — Exam 2, Section B Question 5 (10 marks). The NHT report gives sample
// answers only, with no statistics; its one note (part a., on other acceptable approaches) is
// copied verbatim. Points, lines and planes in three dimensions: A, B and C are not collinear, the
// Cartesian equation of the plane through them, a line parallel to a second plane, and the distance
// between them. Question text transcribed from the original paper (no diagram). Answers checked with
// sympy and against the VCAA report's sample answers: b. x − y + z = 0 (VCAA writes −7x + 7y − 7z = 0,
// "or any scalar multiple"); c. substituting gives 13 ≠ 1; d. 12/√14 = 6√14/7. In d. the report calls
// i − j + 3k "a vector from line to plane"; it runs from the plane's point (0, −1, 0) to the line's
// point (1, −2, 3), which makes no difference to the distance. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const I = '\\underset{\\sim}{i}'
const J = '\\underset{\\sim}{j}'
const K = '\\underset{\\sim}{k}'
const N = '\\underset{\\sim}{n}'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      Other combinations of vectors are suitable. Other correct approaches could include determining
      magnitudes of vectors, cross product or scalar product.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex={`\\begin{aligned}\\overrightarrow{AB} &= (0+1)${I}+(3-1)${J}+(3-2)${K} \\\\ &= ${I}+2${J}+${K}\\end{aligned}`} />,
    reason: <>A vector between two points is &ldquo;end minus start&rdquo;: <Katex tex="\overrightarrow{AB}=\overrightarrow{OB}-\overrightarrow{OA}" />.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}\\overrightarrow{BC} &= (3-0)${I}+(2-3)${J}+(-1-3)${K} \\\\ &= 3${I}-${J}-4${K}\\end{aligned}`} />,
    reason: <>The same &ldquo;end minus start&rdquo; rule, from <Katex tex="B" /> to <Katex tex="C" />.</>,
  },
  {
    working: <Katex display tex={`\\begin{gathered}\\overrightarrow{AB} = m\\,\\overrightarrow{BC} \\implies 1 = 3m,\\ \\ 2 = -m \\\\ \\implies m = \\tfrac13 \\text{ and } m = -2\\end{gathered}`} />,
    reason: <>If the three points were on one line, <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{BC}" /> would point along that line, so one would be a scalar multiple of the other. Test it component by component: the first two components already need different values of <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\overrightarrow{AB} \text{ is not parallel to } \overrightarrow{BC}, \\ \text{so } A, B, C \text{ are not collinear}\end{gathered}}" />,
    reason: <>The two vectors share the point <Katex tex="B" />, so if they were parallel the three points would lie on one line. They aren&apos;t, so the points do not. As required.</>,
    more: <>Saying &ldquo;not parallel&rdquo; is not enough on its own: show the scalar multiple failing. The report also accepts other routes, such as showing <Katex tex="\overrightarrow{AB}\times\overrightarrow{BC}\ne\underset{\sim}{0}" /> or that <Katex tex="AB+BC\ne AC" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex={`\\begin{aligned}\\overrightarrow{AB} &= ${I}+2${J}+${K} \\\\ \\overrightarrow{AC} &= (3+1)${I}+(2-1)${J}+(-1-2)${K} \\\\ &= 4${I}+${J}-3${K}\\end{aligned}`} />,
    reason: <>Two vectors in the plane: <Katex tex="\overrightarrow{AB}" /> from part a., and <Katex tex="\overrightarrow{AC}=\overrightarrow{OC}-\overrightarrow{OA}" />. Part a. showed the points are not collinear, so these two are not parallel.</>,
  },
  {
    working: <Katex display tex={`${N} = \\overrightarrow{AB}\\times\\overrightarrow{AC} = \\begin{vmatrix} ${I} & ${J} & ${K} \\\\ 1 & 2 & 1 \\\\ 4 & 1 & -3 \\end{vmatrix}`} />,
    reason: <>A normal to the plane is perpendicular to every vector in it; the cross product of two vectors in the plane is perpendicular to both.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}&= (2(-3)-1(1))${I}-(1(-3)-1(4))${J} \\\\ &\\quad+(1(1)-2(4))${K} \\\\ &= -7${I}+7${J}-7${K}\\end{aligned}`} />,
    reason: <>Expand along the top row; the middle term carries a minus sign.</>,
    more: <>Check perpendicularity: <Katex tex="(-7)(1)+7(2)+(-7)(1)=0" /> and <Katex tex="(-7)(4)+7(1)+(-7)(-3)=0" />. ✓</>,
  },
  {
    working: <Katex display tex={`\\text{take } ${N} = ${I}-${J}+${K}: \\quad x - y + z = d`} />,
    reason: <>Any non-zero multiple of a normal is still a normal; dividing by <Katex tex="-7" /> keeps the numbers small. The coefficients of <Katex tex="x,y,z" /> in the plane&apos;s equation are the components of the normal.</>,
  },
  {
    working: <Katex display tex="A(-1,1,2): \quad -1 - 1 + 2 = d \implies d = 0" />,
    reason: <>The plane passes through <Katex tex="A" />, so its coordinates satisfy the equation.</>,
  },
  {
    working: <Katex display tex="\boxed{x - y + z = 0}" />,
    reason: <>VCAA writes <Katex tex="-7x+7y-7z=0" /> &ldquo;(or any scalar multiple)&rdquo;: the same plane.</>,
    more: <>Check with the other two points: <Katex tex="B" />: <Katex tex="0-3+3=0" /> ✓; <Katex tex="C" />: <Katex tex="3-2-1=0" /> ✓. The plane passes through the origin.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x = 1+2t, \quad y = -2+t, \quad z = 3-t" />,
    reason: <>The coordinates of a general point on <Katex tex="L" />, read off the components of <Katex tex="\underset{\sim}{r}(t)" />.</>,
  },
  {
    working: <Katex display tex="2(1+2t)-(-2+t)+3(3-t) = 1" />,
    reason: <>A point of intersection would be a point of <Katex tex="L" /> whose coordinates satisfy the equation of <Katex tex="Q" />. Substitute and try to solve for <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="2 + 4t + 2 - t + 9 - 3t = 1 \implies 13 = 1" />,
    reason: <>The <Katex tex="t" /> terms cancel (<Katex tex="4t-t-3t=0" />), leaving a statement that is false.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}13 \ne 1, \text{ so no value of } t \text{ works:} \\ L \text{ does not intersect } Q\end{gathered}}" />,
    reason: <>No point of the line satisfies the plane&apos;s equation. As required.</>,
    more: (
      <>
        Why the <Katex tex="t" /> terms cancelled: the line&apos;s direction <Katex tex={`2${I}+${J}-${K}`} /> is
        perpendicular to the plane&apos;s normal <Katex tex={`2${I}-${J}+3${K}`} />,
        since <Katex tex="2(2)+1(-1)+(-1)(3)=0" />. So the line is parallel to the plane: it either lies in it
        entirely or never meets it. The point <Katex tex="(1,-2,3)" /> gives <Katex tex="13\ne1" />, so it is
        not in the plane, and the line never meets it.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex={`\\begin{gathered}${N} = 2${I}-${J}+3${K}, \\\\ \\left|${N}\\right| = \\sqrt{4+1+9} = \\sqrt{14}\\end{gathered}`} />,
    reason: <>A normal to <Katex tex="Q" />, from the coefficients of <Katex tex="2x-y+3z=1" />.</>,
  },
  {
    working: <Katex display tex="(1,-2,3) \text{ on } L, \qquad (0,-1,0) \text{ on } Q" />,
    reason: <>The line is parallel to the plane (part c.), so every point of <Katex tex="L" /> is the same distance from <Katex tex="Q" />: pick any one. For a point on <Katex tex="Q" />, set <Katex tex="x=z=0" />: <Katex tex="-y=1" />.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}\\underset{\\sim}{v} &= (1-0)${I}+(-2+1)${J}+(3-0)${K} \\\\ &= ${I}-${J}+3${K}\\end{aligned}`} />,
    reason: <>The vector from the point on the plane to the point on the line.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}\\text{distance} &= \\left|\\underset{\\sim}{v}\\cdot\\hat{${N}}\\right| \\\\ &= \\left|\\frac{(1)(2)+(-1)(-1)+(3)(3)}{\\sqrt{14}}\\right| \\\\ &= \\frac{12}{\\sqrt{14}}\\end{aligned}`} />,
    reason: <>The shortest distance is measured along the normal, so it is the length of the part of <Katex tex="\underset{\sim}{v}" /> in the normal direction: the scalar resolute of <Katex tex="\underset{\sim}{v}" /> onto the unit normal <Katex tex={`\\hat{${N}}=\\tfrac{1}{\\sqrt{14}}${N}`} />. Take its absolute value, since a distance can&apos;t be negative.</>,
    more: <>VCAA calls <Katex tex={`${I}-${J}+3${K}`} /> &ldquo;a vector from line to plane&rdquo;; strictly it runs from the plane to the line, but reversing it only flips the sign, which the absolute value removes.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{12}{\sqrt{14}} = \frac{6\sqrt{14}}{7}}" />,
    reason: <>Exact, since no rounding was asked for (<Katex tex="\approx3.21" /> units). VCAA leaves it as <Katex tex="\tfrac{12}{\sqrt{14}}" />.</>,
    more: <>Check: the line&apos;s point gives <Katex tex="2x-y+3z=13" /> against the plane&apos;s <Katex tex="1" />, a gap of 12 in the value of <Katex tex="2x-y+3z" />; moving one unit along the normal changes that value by <Katex tex="|\underset{\sim}{n}|=\sqrt{14}" />, so the distance is <Katex tex="\tfrac{12}{\sqrt{14}}" />.</>,
  },
]

export default function SpecialistQ5_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (10 marks)</p>
        <p>
          Consider the three points <Katex tex="A\,(-1,1,2)" />, <Katex tex="B\,(0,3,3)" /> and{' '}
          <Katex tex="C\,(3,2,-1)" />, which lie in the plane <Katex tex="P" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              A plane is fixed by one point on it and a normal vector (a vector perpendicular to the
              whole plane). The plane <Katex tex="ax+by+cz=d" /> has normal{' '}
              <Katex tex={`a${I}+b${J}+c${K}`} />, which is why part b. starts by finding a normal and part
              d. reads one straight off <Katex tex="Q" />&apos;s equation.
            </p>
            <p>
              A line and a plane either meet at exactly one point, or the line is parallel to the plane
              (its direction is perpendicular to the normal) and then it lies in the plane or misses it
              altogether. Part c. is the &ldquo;misses&rdquo; case, which is what makes a single distance in
              part d. meaningful.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Collinearity"
        marks={2}
        statement={<>Show that the points <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" /> do not lie on a straight line.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Equation of a Plane"
        marks={2}
        statement={<>Find the Cartesian equation of the plane <Katex tex="P" />.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Now consider the plane <Katex tex="Q" />, given by <Katex tex="2x-y+3z=1" />, and the line{' '}
          <Katex tex="L" />, given by{' '}
          <Katex tex={`\\underset{\\sim}{r}(t) = ${I}-2${J}+3${K}+t\\left(2${I}+${J}-${K}\\right),\\ t\\in R.`} />
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Line and Plane"
        marks={3}
        statement={<>Show that the line <Katex tex="L" /> does not intersect the plane <Katex tex="Q" />.</>}
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Show the line is parallel to the plane and stop there"
          working={<Katex display tex="\begin{gathered}(2\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k})\cdot(2\underset{\sim}{i}-\underset{\sim}{j}+3\underset{\sim}{k}) = 0 \\ \implies \text{no intersection}\end{gathered}" />}
        >
          A zero dot product only shows the line is parallel to the plane. A parallel line could lie
          entirely <em>inside</em> the plane, meeting it everywhere. You must also show one point of the
          line is not on the plane: <Katex tex="2(1)-(-2)+3(3)=13\ne1" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Distance to a Plane"
        marks={3}
        statement={<>Find the shortest distance from the line <Katex tex="L" /> to the plane <Katex tex="Q" />.</>}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
