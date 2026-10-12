// 2024 Specialist Mathematics — Exam 2, Section B Question 5 (10 marks). Lines and planes
// in three dimensions: a vector equation, a point-to-line distance, a plane through three
// points, and the triangle a plane cuts from the axes. Question text transcribed from the
// original paper (2024 papers are image-only, so read from rendered pages). Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      Some students did not use the correct notation. A common error was to write the vector{' '}
      <Katex tex="\overrightarrow{AB}" /> rather than the vector equation of the line.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [26, 11, 13, 50],
  average: 1.9,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Students used many different techniques to solve this problem.
        </li>
        <li>
          Some students used the wrong line equation, using their answer to part a rather than
          the one given.
        </li>
      </ul>
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [15, 3, 15, 67],
  average: 2.4,
  comment: (
    <>
      Most students answered this question very well. Students should be aware that their CAS
      technology can help them find cross products accurately.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
}

const EXAM_DII: SAExaminerStats = {
  marks: [44, 10, 46],
  average: 1.0,
  comment: (
    <>
      Common errors were:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          incorrectly determining the spanning vectors
        </li>
        <li>
          omitting the division of the cross product by 2 to find the area
        </li>
        <li>
          incorrectly assuming the triangle was either isosceles or right-angled.
        </li>
      </ul>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\overrightarrow{AB} &= (2-1)\underset{\sim}{i}+(-5-(-2))\underset{\sim}{j}+(-1-3)\underset{\sim}{k}\\ &= \underset{\sim}{i}-3\underset{\sim}{j}-4\underset{\sim}{k}\end{aligned}" />,
    reason: <>Subtract the position vectors to get a direction along the line.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r} = \underset{\sim}{a}+s\underset{\sim}{d}" />,
    reason: <>A line needs a point on it plus any multiple of a direction: position vector <Katex tex="\underset{\sim}{a}" />, direction <Katex tex="\underset{\sim}{d}" />, parameter <Katex tex="s" />.</>,
    more: <>The report's common error was to write the vector <Katex tex="\overrightarrow{AB}" /> rather than the vector equation of the line. <Katex tex="\overrightarrow{AB}" /> is only the direction: it fixes no point, so it fits every line parallel to this one, not this line.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}\underset{\sim}{r}(s) &= \underset{\sim}{i}-2\underset{\sim}{j}+3\underset{\sim}{k}\\ &\quad+s\left(\underset{\sim}{i}-3\underset{\sim}{j}-4\underset{\sim}{k}\right), \quad s\in R\end{aligned}}" />,
    reason: <>Point <Katex tex="A" /> as <Katex tex="\underset{\sim}{a}" />, direction <Katex tex="\overrightarrow{AB}" />, written in <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" />, <Katex tex="\underset{\sim}{k}" /> form as the question asks.</>,
    more: <>The report says many correct answers exist: it also lists <Katex tex="2\underset{\sim}{i}-5\underset{\sim}{j}-\underset{\sim}{k}+t\left(\underset{\sim}{i}-3\underset{\sim}{j}-4\underset{\sim}{k}\right)" />, which starts from <Katex tex="B" />. Any point of the line and any non-zero multiple of the direction work. The report also notes some students did not use the correct notation: write <Katex tex="\underset{\sim}{r}" /> (or <Katex tex="\underset{\sim}{r}(s)" />) equal to the expression, keep the parameter, and state <Katex tex="s\in R" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="L_1: \ P(2,1,-3), \qquad \underset{\sim}{d} = (-1,2,1)" />,
    reason: <>Read a point <Katex tex="P" /> (at <Katex tex="t=0" />) and the direction off the <em>given</em> line <Katex tex="L_1" /> — not the line from part a.</>,
    more: <>The report notes some students used their answer to part a rather than the line given. The word "different" in the stem is the warning: <Katex tex="L_1" /> does not pass through <Katex tex="A" /> or <Katex tex="B" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{AP} = (2,1,-3)-(1,-2,3) = (1,3,-6)" />,
    reason: <>Join <Katex tex="A" /> to <Katex tex="P" />. Any point on <Katex tex="L_1" /> works: the cross product next keeps only the part perpendicular to the line.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\overrightarrow{AP}\times\underset{\sim}{d} = \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\1 & 3 & -6\\-1 & 2 & 1\end{vmatrix} = 15\underset{\sim}{i}+5\underset{\sim}{j}+5\underset{\sim}{k}"
      />
    ),
    reason: <><Katex tex="\left|\overrightarrow{AP}\times\underset{\sim}{d}\right| = \left|\overrightarrow{AP}\right|\left|\underset{\sim}{d}\right|\sin\theta" />, with <Katex tex="\theta" /> the angle between <Katex tex="\overrightarrow{AP}" /> and the line, and <Katex tex="\left|\overrightarrow{AP}\right|\sin\theta" /> is the perpendicular distance from <Katex tex="A" /> to the line.</>,
    more: <>Components: <Katex tex="\underset{\sim}{i}" />: <Katex tex="3(1)-(-6)(2)=15" />; <Katex tex="\underset{\sim}{j}" />: <Katex tex="-\left[1(1)-(-6)(-1)\right]=5" />; <Katex tex="\underset{\sim}{k}" />: <Katex tex="1(2)-3(-1)=5" />. Why <Katex tex="\sin\theta" />: picture the right-angled triangle with hypotenuse <Katex tex="AP" /> and one side along the line. The side opposite <Katex tex="\theta" /> is the shortest distance, <Katex tex="\left|\overrightarrow{AP}\right|\sin\theta" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{distance} &= \frac{\left|\overrightarrow{AP}\times\underset{\sim}{d}\right|}{\left|\underset{\sim}{d}\right|}\\ &= \frac{\sqrt{225+25+25}}{\sqrt{1+4+1}} = \frac{\sqrt{275}}{\sqrt6}\end{aligned}" />,
    reason: <>Dividing by <Katex tex="\left|\underset{\sim}{d}\right|" /> leaves <Katex tex="\left|\overrightarrow{AP}\right|\sin\theta" />, the shortest distance.</>,
    more: <>The report says students used many different techniques. A common one avoids the cross product: the closest point <Katex tex="Q" /> on <Katex tex="L_1" /> makes <Katex tex="\overrightarrow{AQ}" /> perpendicular to <Katex tex="\underset{\sim}{d}" />. Here <Katex tex="\overrightarrow{AQ} = (1-t,\ 3+2t,\ -6+t)" />, and <Katex tex="\overrightarrow{AQ}\cdot\underset{\sim}{d} = 6t-1 = 0" /> gives <Katex tex="t=\tfrac16" />, so <Katex tex="\overrightarrow{AQ} = \left(\tfrac56,\ \tfrac{10}{3},\ -\tfrac{35}{6}\right)" /> with length <Katex tex="\tfrac{\sqrt{1650}}{6} = \tfrac{5\sqrt{66}}{6}" />, the same answer.</>,
  },
  {
    working: <Katex display tex="\frac{5\sqrt{11}}{\sqrt6} = \frac{5\sqrt{11}\sqrt6}{6} = \frac{5\sqrt{66}}{6}" />,
    reason: <><Katex tex="\sqrt{275}=\sqrt{25\times11}=5\sqrt{11}" />, then rationalise.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{5\sqrt{66}}{6}}" />,
    reason: <>In the form <Katex tex="\tfrac{a\sqrt b}{c}" /> with <Katex tex="a=5,\ b=66,\ c=6" /> — all positive integers, as required.</>,
    more: <>As a decimal this is about <Katex tex="6.77" />, a useful CAS check, but the answer must be left in the exact form asked for.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\overrightarrow{AB} &= (1,-3,-4)\\ \overrightarrow{AC} &= (0,2,-5)-(1,-2,3) = (-1,4,-8)\end{aligned}" />,
    reason: <>Two vectors joining points of the plane, so both lie in it.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\underset{\sim}{n} &= \overrightarrow{AB}\times\overrightarrow{AC}\\ &= \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\1 & -3 & -4\\-1 & 4 & -8\end{vmatrix}\\ &= 40\underset{\sim}{i}+12\underset{\sim}{j}+\underset{\sim}{k}\end{aligned}"
      />
    ),
    reason: <>The cross product is perpendicular to both, so it is a normal to the plane.</>,
    more: <>Components: <Katex tex="\underset{\sim}{i}" />: <Katex tex="(-3)(-8)-(-4)(4)=24+16" />; <Katex tex="\underset{\sim}{j}" />: <Katex tex="-\left[1(-8)-(-4)(-1)\right]=-(-8-4)" />; <Katex tex="\underset{\sim}{k}" />: <Katex tex="1(4)-(-3)(-1)=4-3" />. The report reminds students that CAS can find cross products accurately: on the TI-Nspire, crossP([1,-3,-4],[-1,4,-8]) returns [40, 12, 1]. A quick check on the normal: its dot product with each of <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AC}" /> is 0 (<Katex tex="40-36-4=0" /> and <Katex tex="-40+48-8=0" />).</>,
  },
  {
    working: <Katex display tex="40x+12y+z = d" />,
    reason: <>A plane with normal <Katex tex="a\underset{\sim}{i}+b\underset{\sim}{j}+c\underset{\sim}{k}" /> has equation <Katex tex="ax+by+cz=d" />; only <Katex tex="d" /> is still unknown.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&A(1,-2,3):\\ &40(1)+12(-2)+3 = 19\end{aligned}" />,
    reason: <>Substituting any one of the three points fixes the constant.</>,
  },
  {
    working: <Katex display tex="\boxed{40x+12y+z = 19}" />,
    reason: <>Check with <Katex tex="C" />: <Katex tex="0+24-5 = 19" /> ✓, and with <Katex tex="B" />: <Katex tex="80-60-1 = 19" /> ✓.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="y = z = 0: \quad 2x = 12 \implies x = 6" />,
    reason: <>Every point on the <Katex tex="x" />-axis has <Katex tex="y=z=0" />, so set them to zero and solve.</>,
  },
  {
    working: <Katex display tex="x = z = 0: \quad -3y = 12 \implies y = -4" />,
    reason: <>The <Katex tex="y" />-intercept, the same way. It is negative — keep the sign.</>,
  },
  {
    working: <Katex display tex="x = y = 0: \quad 4z = 12 \implies z = 3" />,
    reason: <>The <Katex tex="z" />-intercept.</>,
  },
  {
    working: <Katex display tex="\boxed{(6,0,0), \quad (0,-4,0), \quad (0,0,3)}" />,
    reason: <>Give each as a point with all three coordinates.</>,
    more: <>Dividing the equation by 12 gives the "intercept form" <Katex tex="\tfrac{x}{6}+\tfrac{y}{-4}+\tfrac{z}{3}=1" />, from which all three intercepts can be read at once.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{u} = (0,-4,0)-(6,0,0) = (-6,-4,0)" />,
    reason: <>Triangle area needs two sides from a common vertex. From <Katex tex="(6,0,0)" />, subtract to get the side to <Katex tex="(0,-4,0)" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v} = (0,0,3)-(6,0,0) = (-6,0,3)" />,
    reason: <>The other side from the <em>same</em> vertex.</>,
    more: <>The report lists incorrectly determining the spanning vectors among the common errors. The intercepts' position vectors, such as <Katex tex="(6,0,0)" /> and <Katex tex="(0,-4,0)" />, run from the origin, not along the triangle's sides; their cross product gives the area of a different triangle (one with a vertex at <Katex tex="O" />). Always subtract to get two sides that share a vertex.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\underset{\sim}{u}\times\underset{\sim}{v} = \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\-6 & -4 & 0\\-6 & 0 & 3\end{vmatrix} = -12\underset{\sim}{i}+18\underset{\sim}{j}-24\underset{\sim}{k}"
      />
    ),
    reason: <><Katex tex="\left|\underset{\sim}{u}\times\underset{\sim}{v}\right| = \left|\underset{\sim}{u}\right|\left|\underset{\sim}{v}\right|\sin\theta" />, with <Katex tex="\theta" /> the angle between them, is the area of the parallelogram the two sides span: twice the triangle.</>,
    more: <>Components: <Katex tex="\underset{\sim}{i}" />: <Katex tex="(-4)(3)-0(0)=-12" />; <Katex tex="\underset{\sim}{j}" />: <Katex tex="-\left[(-6)(3)-0(-6)\right]=18" />; <Katex tex="\underset{\sim}{k}" />: <Katex tex="(-6)(0)-(-4)(-6)=-24" />. On CAS, crossP([-6,-4,0],[-6,0,3]) gives the same.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{u}\times\underset{\sim}{v}\right| = \sqrt{144+324+576} = \sqrt{1044} = 6\sqrt{29}" />,
    reason: <>Take out the largest square factor: <Katex tex="1044 = 36\times29" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \tfrac12\times6\sqrt{29} = 3\sqrt{29}}" />,
    reason: <>Halve the parallelogram. This is <Katex tex="m\sqrt n" /> with <Katex tex="m=3,\ n=29" />.</>,
    more: <>About <Katex tex="16.2" /> square units. The report's common errors: omitting the division by 2 (giving <Katex tex="6\sqrt{29}" />, the parallelogram), and incorrectly assuming the triangle was isosceles or right-angled. It is neither: the sides are <Katex tex="2\sqrt{13}" />, <Katex tex="3\sqrt5" /> and <Katex tex="5" />, all different, and the dot products of the two sides at each vertex are 36, 16 and 9, none zero. So "half base times height" with two of the sides as base and height does not apply; the cross product handles any triangle.</>,
  },
]

export default function SpecialistQ5_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (10 marks)</p>
        <p>
          Consider the points <Katex tex="A(1,-2,3)" /> and <Katex tex="B(2,-5,-1)" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Three of the five parts turn on a cross product. Point to line:{' '}
              <Katex tex="\left|\overrightarrow{AP}\times\underset{\sim}{d}\right|\div\left|\underset{\sim}{d}\right|" />{' '}(<Katex tex="P" /> any point on the line, <Katex tex="\underset{\sim}{d}" /> its direction).
              Plane through three points: the cross product of two side vectors is the normal.
              Area of a triangle:{' '}
              <Katex tex="\tfrac12\left|\underset{\sim}{u}\times\underset{\sim}{v}\right|" />.
              Knowing which divisor belongs to which is most of the question.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Line Equation"
        marks={1}
        statement={
          <>
            Find a vector equation, in terms of the components{' '}
            <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" /> and{' '}
            <Katex tex="\underset{\sim}{k}" />, for the line passing through these points.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Shortest Distance"
        marks={3}
        statement={
          <>
            Consider the different line{' '}
            <Katex tex="L_1:\ \underset{\sim}{r_1}(t) = 2\underset{\sim}{i}+\underset{\sim}{j}-3\underset{\sim}{k}+t\left(-\underset{\sim}{i}+2\underset{\sim}{j}+\underset{\sim}{k}\right)" />,{' '}
            <Katex tex="t\in R" />.
            <br />
            Find the shortest distance from <Katex tex="L_1" /> to point <Katex tex="A" />.
            <br />
            Give your answer in the form{' '}
            <Katex tex="\dfrac{a\sqrt b}{c}" /> where <Katex tex="a" />, <Katex tex="b" /> and{' '}
            <Katex tex="c" /> are positive integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Plane Equation"
        marks={3}
        statement={
          <>
            Let <Katex tex="C" /> be the point <Katex tex="(0,2,-5)" />.
            <br />
            Find the Cartesian equation of the plane that contains the points <Katex tex="A" />,{' '}
            <Katex tex="B" /> and <Katex tex="C" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          Another plane has the Cartesian equation <Katex tex="2x-3y+4z=12" />.
          <br />
          This plane intersects the coordinate axes at three points, which form the vertices of a
          triangle.
        </p>
      </div>

      <PartCard letter="d.i" topic="Axis Intercepts" marks={1} statement={<>Find the coordinates of these three points.</>} examinerReport={EXAM_DI}>
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Triangle Area"
        marks={2}
        statement={
          <>
            Find the area of the triangle.
            <br />
            Give your answer in the form{' '}
            <Katex tex="m\sqrt n" /> where <Katex tex="m" /> and <Katex tex="n" /> are
            integers.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
