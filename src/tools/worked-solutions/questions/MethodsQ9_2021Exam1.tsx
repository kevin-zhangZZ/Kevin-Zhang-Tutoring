// 2021 Mathematical Methods — Exam 1 Question 9 (8 marks). A tangent to the unit circle
// from an external point, then a vertical dilation of that tangent and the triangle it cuts
// out. The hardest question on the paper: parts b(i) and b(ii) averaged 0.1 marks each.
// Question text transcribed from the original paper; both figures are crops of VCAA's own
// artwork. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import circleSrc from './meth-2021e1-q9-circle.png'
import triangleSrc from './meth-2021e1-q9c-triangle.png'

const EXAM_A: SAExaminerStats = {
  marks: [78, 9, 13],
  average: 0.4,
  comment: (
    <>
      It is important to remember that for "show that" questions, the working needs to be
      clear and logically structured. Those who could see the question as a right-angled
      triangle tended to fare better. Many differentiated the equation of the semicircle, but
      then tried to evaluate the derivative at <Katex tex="x=2" />, a point that is not in
      the domain of the derivative. For most students, angles were not defined or labelled on
      diagrams, nor were side lengths indicated.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [94, 6],
  average: 0.1,
  comment: (
    <>
      This question was poorly answered. Most students could not find <Katex tex="q" />,
      while some students gave <Katex tex="q\in[-1,1]" />, forgetting to exclude zero.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [96, 4],
  average: 0.1,
  comment: (
    <>
      This question was poorly done. There were students who correctly identified the
      endpoints, but then wrote an incorrect interval. This question involves visualisation
      of the problem, and students are encouraged to practise this skill.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [82, 17, 1],
  average: 0.2,
  comment: (
    <>
      Students are reminded of the need to consider domains when defining functions. Many
      were able to write <Katex tex="g(\theta)=\sin(\theta)" />, but very few stated the
      domain of the function. Some wrote the function incorrectly as{' '}
      <Katex tex="g(x)=\sin(\theta)" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [81, 15, 4],
  average: 0.3,
  comment: (
    <>
      Because many students overlooked the domain in their definition of{' '}
      <Katex tex="g(\theta)" />, they did not realise that the maximum occurs at an endpoint,{' '}
      <Katex tex="\theta=\tfrac\pi3" />. Instead, many attempted this question by
      differentiation and then solved <Katex tex="\tfrac{d}{d\theta}\sin(\theta)=0" /> to get
      the incorrect maximum <Katex tex="A=1" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="OP \perp AP \ \text{ (a tangent is perpendicular to the radius at the point of contact)}" />,
    reason: <>So <Katex tex="OPA" /> is a right-angled triangle, with the right angle at <Katex tex="P" /> — the diagram marks it.</>,
  },
  {
    working: <Katex display tex="OP = 1, \quad OA = 2 \implies \cos(\angle AOP) = \tfrac{OP}{OA} = \tfrac12" />,
    reason: <>The radius over the hypotenuse. Treating this as trigonometry beats differentiating <Katex tex="y=\sqrt{1-x^2}" />, whose derivative does not even exist at <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="\angle AOP = \tfrac\pi3" />,
    reason: <>The angle <Katex tex="OP" /> makes with the positive <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="P = \left(\cos\tfrac\pi3,\ \sin\tfrac\pi3\right) = \left(\tfrac12,\ \tfrac{\sqrt3}{2}\right)" />,
    reason: <><Katex tex="P" /> is on the unit circle, so its coordinates are just the cosine and sine of that angle.</>,
  },
  {
    working: <Katex display tex="m_{AP} = \frac{\tfrac{\sqrt3}{2}-0}{\tfrac12-2} = \frac{\tfrac{\sqrt3}{2}}{-\tfrac32} = -\frac{1}{\sqrt3}" />,
    reason: <>Or, since <Katex tex="m_{OP}=\tan\tfrac\pi3=\sqrt3" /> and <Katex tex="AP\perp OP" />, take the negative reciprocal.</>,
  },
  {
    working: <Katex display tex="y-0 = -\frac{1}{\sqrt3}(x-2)" />,
    reason: <>Point–gradient form through <Katex tex="A(2,0)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\frac{x}{\sqrt3}+\frac{2}{\sqrt3}} \ \checkmark" />,
    reason: <>Every step written out, with the angle named — the report is explicit that this is what earned the marks.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="T\!\begin{bmatrix}x\\y\end{bmatrix} = \begin{bmatrix}x\\qy\end{bmatrix}" />,
    reason: <>A dilation by factor <Katex tex="q" /> from the <Katex tex="x" />-axis; horizontal positions are untouched.</>,
  },
  {
    working: <Katex display tex="Y = qy = q\left(-\frac{X}{\sqrt3}+\frac{2}{\sqrt3}\right) \implies h(x) = \frac{q}{\sqrt3}(2-x)" />,
    reason: <>Every image point still satisfies <Katex tex="Y=0" /> at <Katex tex="X=2" />, so the line pivots about <Katex tex="A(2,0)" /> as <Katex tex="q" /> changes. That is the picture to hold.</>,
  },
  {
    working: <Katex display tex="\text{distance from } O \text{ to } h = \frac{\left|\tfrac{2q}{\sqrt3}\right|}{\sqrt{\tfrac{q^2}{3}+1}} = \frac{2|q|}{\sqrt{q^2+3}}" />,
    reason: <>Writing <Katex tex="h" /> as <Katex tex="\tfrac{q}{\sqrt3}x+y-\tfrac{2q}{\sqrt3}=0" /> and using the point–line distance formula.</>,
  },
  {
    working: <Katex display tex="\text{at least one intersection} \iff \text{distance} \le 1" />,
    reason: 'The line meets the unit circle exactly when it comes within one unit of the centre.',
  },
  {
    working: <Katex display tex="\frac{4q^2}{q^2+3} \le 1 \implies 4q^2 \le q^2+3 \implies q^2 \le 1" />,
    reason: 'Squaring is safe — both sides are non-negative.',
  },
  {
    working: <Katex display tex="\boxed{q \in [-1,0) \cup (0,1]}" />,
    reason: <>Zero must be excluded: the question says <Katex tex="q\in R\setminus\{0\}" />, and <Katex tex="q=0" /> would collapse the line onto the <Katex tex="x" />-axis anyway. Writing <Katex tex="[-1,1]" /> is the report's named slip.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+\frac{q^2}{3}(2-x)^2 = 1" />,
    reason: <>Substituting <Katex tex="h" /> into the unit circle.</>,
  },
  {
    working: <Katex display tex="\left(3+q^2\right)x^2-4q^2x+\left(4q^2-3\right) = 0" />,
    reason: 'Clearing the fraction and collecting. A quadratic, so at most two intersections.',
  },
  {
    working: <Katex display tex="\text{two intersections} \iff \Delta = 36\left(1-q^2\right) > 0 \iff |q| < 1" />,
    reason: <>At <Katex tex="|q|=1" /> the line is tangent, giving only one point.</>,
  },
  {
    working: <Katex display tex="x_1x_2 = \frac{4q^2-3}{3+q^2} > 0 \iff q^2 > \tfrac34 \iff |q| > \tfrac{\sqrt3}{2}" />,
    reason: <>Both <Katex tex="x" />-coordinates positive means their product is positive; their sum <Katex tex="\tfrac{4q^2}{3+q^2}" /> is automatically positive.</>,
  },
  {
    working: <Katex display tex="y = \frac{q}{\sqrt3}(2-x) \text{ with } x\le1 \implies \operatorname{sign}(y) = \operatorname{sign}(q)" />,
    reason: <>On the unit circle <Katex tex="x\le1" />, so <Katex tex="2-x>0" /> always — the <Katex tex="y" />-coordinates are positive exactly when <Katex tex="q>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{q \in \left(\tfrac{\sqrt3}{2},\ 1\right)}" />,
    reason: <>Both ends open: at <Katex tex="q=\tfrac{\sqrt3}{2}" /> one intersection slides onto <Katex tex="x=0" /> (not positive), and at <Katex tex="q=1" /> the two collapse into one.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="P' = (\cos\theta,\ \sin\theta)" />,
    reason: <><Katex tex="P'" /> is on the unit circle, and <Katex tex="\theta" /> is the angle it makes at <Katex tex="O" /> with the positive <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\text{area} = \tfrac12\times OA\times\text{height} = \tfrac12\times2\times\sin\theta" />,
    reason: <>Taking <Katex tex="OA" /> along the <Katex tex="x" />-axis as the base, the height is just the <Katex tex="y" />-coordinate of <Katex tex="P'" />.</>,
  },
  {
    working: <Katex display tex="\text{area} = \sin\theta" />,
    reason: <>The 2 and the <Katex tex="\tfrac12" /> cancel exactly.</>,
  },
  {
    working: <Katex display tex="q\to0^+ \Rightarrow P'\to(1,0) \Rightarrow \theta\to0; \quad q=1 \Rightarrow P'=P \Rightarrow \theta = \tfrac\pi3" />,
    reason: <>Tracking the endpoints of <Katex tex="0<q\le1" /> gives the domain — the step almost every student skipped.</>,
  },
  {
    working: <Katex display tex="\boxed{g:\left(0,\tfrac\pi3\right]\to R, \ g(\theta) = \sin(\theta)}" />,
    reason: <>A <em>function</em> needs its domain. Note the variable is <Katex tex="\theta" />, not <Katex tex="x" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(\theta) = \cos\theta > 0 \ \text{ for } \theta\in\left(0,\tfrac\pi3\right]" />,
    reason: <>Strictly increasing across the whole domain, so there is no interior turning point — solving <Katex tex="\cos\theta=0" /> gives <Katex tex="\theta=\tfrac\pi2" />, which is outside it.</>,
  },
  {
    working: <Katex display tex="\text{maximum at the right endpoint } \theta = \tfrac\pi3" />,
    reason: 'An increasing function on a half-open interval attains its maximum at the closed end.',
  },
  {
    working: <Katex display tex="\boxed{\text{maximum area} = \sin\!\left(\tfrac\pi3\right) = \tfrac{\sqrt3}{2}}" />,
    reason: <>About 0.866 square units. Differentiating blindly produces <Katex tex="A=1" />, the report's common wrong answer — and it corresponds to <Katex tex="P'" /> at the top of the circle, which this family of lines never reaches.</>,
  },
]

export default function MethodsQ9_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (8 marks)</p>
        <p>
          Consider the unit circle <Katex tex="x^2+y^2=1" /> and the tangent to the circle at
          the point <Katex tex="P" />, shown in the diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={circleSrc}
            alt="The unit circle with a tangent touching it at P in the first quadrant, the radius OP drawn with a right angle marked, and the tangent meeting the x-axis at A(2, 0) — from the original 2021 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Show that the equation of the line that passes through the points{' '}
            <Katex tex="A" /> and <Katex tex="P" /> is given by{' '}
            <Katex tex="y=-\dfrac{x}{\sqrt3}+\dfrac{2}{\sqrt3}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          Let{' '}
          <Katex tex="T:R^2\to R^2,\ T\!\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}1&0\\0&q\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" />
          , where <Katex tex="q\in R\setminus\{0\}" />, and let the graph of the function{' '}
          <Katex tex="h" /> be the transformation of the line that passes through the points{' '}
          <Katex tex="A" /> and <Katex tex="P" /> under <Katex tex="T" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="q" /> for which the graph of <Katex tex="h" />{' '}
            intersects with the unit circle at least once.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={1}
        statement={
          <>
            Let the graph of <Katex tex="h" /> intersect the unit circle twice. Find the
            values of <Katex tex="q" /> for which the coordinates of the points of
            intersection have only positive values.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          For <Katex tex="0<q\le1" />, let <Katex tex="P'" /> be the point of intersection of
          the graph of <Katex tex="h" /> with the unit circle, where <Katex tex="P'" /> is
          always the point of intersection that is closest to <Katex tex="A" />, as shown in
          the diagram below. Let <Katex tex="g" /> be the function that gives the area of
          triangle <Katex tex="OAP'" /> in terms of <Katex tex="\theta" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={triangleSrc}
            alt="The same unit circle with a shallower line through A(2, 0) meeting the circle at P′, and the shaded triangle OAP′ with the angle θ marked at O — from the original 2021 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="c.i"
        marks={2}
        statement={<>Define the function <Katex tex="g" />.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={2}
        statement={
          <>
            Determine the maximum possible area of the triangle <Katex tex="OAP'" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>
    </div>
  )
}
