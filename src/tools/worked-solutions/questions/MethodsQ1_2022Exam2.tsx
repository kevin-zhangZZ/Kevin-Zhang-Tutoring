// 2022 Mathematical Methods — Exam 2, Section B Question 1 (11 marks). A tangent and a
// normal to a parabola, the area they cut off, and then the same in terms of a parameter.
// Question text transcribed from the original paper; all three figures are crops of VCAA's
// own artwork. Answers checked with sympy and against the VCAA examination report.
// Solution is original. Part e has an interactive widget (interactives/meth-2022e2-q1e-min-area):
// slide the tangent point x = −b and watch the shaded area A(b) fall to its minimum at b = 2a².

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import parabolaSrc from './meth-2022e2-q1-parabola.png'
import perpSrc from './meth-2022e2-q1d-perp.png'
import shadedSrc from './meth-2022e2-q1e-shaded.png'

const MinAreaWidget = lazyWidget(() => import('../interactives/meth-2022e2-q1e-min-area'))

const EXAM_A: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      This question only required students to find the axis of symmetry of the graph of a
      quadratic function, but it was not answered well. An equation was required. The most
      common errors were <Katex tex="y=0" />, 0, (0, 0), <Katex tex="y" />-axis and{' '}
      <Katex tex="-\tfrac{b}{2a}=0" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [4, 96],
  average: 1,
  comment: <>This question was answered well.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [21, 5, 73],
  average: 1.5,
  comment: (
    <>
      An equation was required. Some students wrote only the expression{' '}
      <Katex tex="-2x-12" />. Others did not use their technology and often algebraic errors
      were seen in responses.
      <br />
      Several students found <Katex tex="f'(-2)" /> rather than solving{' '}
      <Katex tex="f'(x)=-2" />.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: (
    <>
      An equation was required for this question. As in Question 1c., those who did not use
      their technology tended to make algebraic errors. The most common incorrect answer was{' '}
      <Katex tex="y=\tfrac{x}{2}+12" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [25, 14, 62],
  average: 1.4,
  comment: (
    <>
      Students who attempted this question generally did well. Most were able to subtract{' '}
      <Katex tex="f(x)" /> from their perpendicular line. Some subtracted the perpendicular
      line from <Katex tex="f(x)" />. Others used the tangent line and some had incorrect
      terminals.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [55, 9, 5, 13, 18],
  average: 1.3,
  comment: (
    <>
      Many students were unable to find the equation of the perpendicular line. Some students
      did not subtract <Katex tex="g(x)" /> and evaluated{' '}
      <Katex tex="\displaystyle\int_{-b}^{\frac{8a^4+b^2}{b}}\left(y_n\right)dx" />. Others had
      incorrect terminals.
      <br />
      A common incorrect answer was <Katex tex="b=-2a^2" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{x^2}{12} \implies \text{turning point } (0,\ 0)" />,
    reason: <>The rule is <Katex tex="x^2" /> scaled by <Katex tex="\tfrac{1}{12}" />, with no horizontal or vertical translation, so the turning point stays at the origin, as the diagram shows. A parabola&apos;s axis of symmetry is the vertical line through its turning point.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 0}" />,
    reason: <>An <em>equation</em> of a line is required. The report&apos;s common errors: <Katex tex="y=0" /> is the horizontal axis; 0 and <Katex tex="(0,0)" /> are not equations; &ldquo;the <Katex tex="y" />-axis&rdquo; names the right line but is not an equation.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \tfrac{1}{12}x^2 \implies f'(x) = \tfrac{1}{12}\times 2x" />,
    reason: <>Power rule: bring the power down and reduce it by 1; the constant <Katex tex="\tfrac{1}{12}" /> just multiplies through.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{x}{6}}" />,
    reason: <>Simplified: <Katex tex="\tfrac{2x}{12} = \tfrac{x}{6}" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = -2 \implies \frac{x}{6} = -2 \implies x = -12" />,
    reason: <>The derivative gives the tangent&apos;s gradient at each <Katex tex="x" />, so to find <em>where</em> the gradient is <Katex tex="-2" />, solve <Katex tex="f'(x)=-2" />. Evaluating <Katex tex="f'(-2)" /> instead gives the gradient at <Katex tex="x=-2" />, a different question; the report notes several students did that.</>,
  },
  {
    working: <Katex display tex="f(-12) = \frac{144}{12} = 12 \implies M(-12,\ 12)" />,
    reason: <>Substitute back into <Katex tex="f" /> for the <Katex tex="y" />-coordinate. <Katex tex="x=-12" /> is negative, matching <Katex tex="M" /> on the left branch in the diagram.</>,
  },
  {
    working: <Katex display tex="y-12 = -2\bigl(x-(-12)\bigr)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1 = m(x-x_1)" />, with <Katex tex="m=-2" /> and <Katex tex="(x_1, y_1) = (-12, 12)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -2x-12}" />,
    reason: <>Expand: <Katex tex="y = -2x-24+12" />. Write an equation (<Katex tex="y = \ldots" />), not just the expression <Katex tex="-2x-12" />; the report notes some students wrote only the expression.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="m_\perp = \frac{-1}{-2} = \frac12" />,
    reason: <>Perpendicular lines have gradients that multiply to <Katex tex="-1" />, so take the negative reciprocal of the tangent&apos;s gradient <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="y-12 = \tfrac12\bigl(x-(-12)\bigr) = \tfrac12x+6" />,
    reason: <>The line passes through the same point <Katex tex="M(-12,12)" /> as the tangent.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{x}{2}+18}" />,
    reason: <>Add 12 to both sides: <Katex tex="6+12=18" />. Check: at <Katex tex="x=-12" />, <Katex tex="y=-6+18=12" /> ✓. The report&apos;s most common incorrect answer, <Katex tex="y=\tfrac x2+12" />, gives <Katex tex="y=6" /> at <Katex tex="x=-12" />, so it misses <Katex tex="M" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{x^2}{12} = \frac{x}{2}+18 \implies x^2-6x-216 = 0" />,
    reason: <><Katex tex="N" /> is where the line meets the parabola again, so set them equal. Multiply both sides by 12 and rearrange.</>,
  },
  {
    working: <Katex display tex="(x-18)(x+12) = 0 \implies x = -12 \text{ or } x = 18" />,
    reason: <><Katex tex="x=-12" /> is <Katex tex="M" /> (the line was built through <Katex tex="M" />), so <Katex tex="N" /> is at <Katex tex="x=18" />. These two <Katex tex="x" />-values are the terminals.</>,
  },
  {
    working: <Katex display tex="A = \int_{-12}^{18}\left(\frac{x}{2}+18-\frac{x^2}{12}\right)dx" />,
    reason: <>Line minus curve, because the line is above the parabola between <Katex tex="M" /> and <Katex tex="N" /> (at <Katex tex="x=0" />: line 18, parabola 0). Use the perpendicular line, not the tangent: it is the one that bounds the region. Subtracting the other way gives <Katex tex="-375" />.</>,
  },
  {
    working: <Katex display tex="= \left[\frac{x^2}{4}+18x-\frac{x^3}{36}\right]_{-12}^{18}" />,
    reason: <>Antidifferentiate term by term (on CAS, the definite integral gives the value directly).</>,
  },
  {
    working: (
      <>
        <Katex display tex="= (81+324-162)-(36-216+48)" />
        <Katex display tex="= 243-(-132)" />
      </>
    ),
    reason: <>Upper terminal minus lower terminal.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 375}" />,
    reason: <>Square units.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = \frac{x}{2a^2} \implies g'(-b) = -\frac{b}{2a^2}" />,
    reason: <>Plan: the shaded area depends on where the tangent touches (<Katex tex="x=-b" />), so write the area as a function <Katex tex="A(b)" /> and minimise it. First, the same steps as parts c and d.i, with letters: the tangent&apos;s gradient at <Katex tex="x=-b" />. Here <Katex tex="a" /> is a fixed positive constant.</>,
  },
  {
    working: <Katex display tex="m_\perp = \frac{2a^2}{b}, \quad g(-b) = \frac{b^2}{4a^2}" />,
    reason: <>The negative reciprocal, <Katex tex="-1 \div \left(-\tfrac{b}{2a^2}\right)" />, and the point <Katex tex="\left(-b,\ \tfrac{b^2}{4a^2}\right)" /> the line passes through.</>,
  },
  {
    working: (
      <>
        <Katex display tex="y_n = \frac{2a^2}{b}(x+b)+\frac{b^2}{4a^2}" />
        <Katex display tex="= \frac{2a^2}{b}x+2a^2+\frac{b^2}{4a^2}" />
      </>
    ),
    reason: <>Point–gradient form. The report notes many students were unable to find this line. Check against part d: <Katex tex="4a^2 = 12" /> (so <Katex tex="a^2=3" />) and <Katex tex="b=12" /> (so <Katex tex="M" /> is at <Katex tex="x=-12" />) give <Katex tex="y=\tfrac x2+6+12=\tfrac x2+18" />, the part d.i answer ✓.</>,
  },
  {
    working: (
      <>
        <Cas fn="solve">solve(yn(x) = g(x), x)</Cas>
        <Katex display tex="x = -b \text{ or } x = \frac{8a^4}{b}+b" />
      </>
    ),
    reason: <>Where the line meets the parabola. <Katex tex="x=-b" /> is the point of tangency (the line passes through it), so the other solution is the right-hand terminal. Copy CAS output carefully: the report flags transcription errors in this part.</>,
  },
  {
    working: (
      <>
        <Katex display tex="A(b) = \int_{-b}^{\frac{8a^4}{b}+b}\bigl(y_n-g(x)\bigr)\,dx" />
        <Katex display tex="= \frac{64a^{12}+48a^8b^2+12a^4b^4+b^6}{3a^2b^3}" />
      </>
    ),
    reason: <>Line minus parabola, because the line is on top across the shaded region. The report notes some students integrated <Katex tex="y_n" /> alone, which also counts the area under the parabola, and others had incorrect terminals. CAS may display an equivalent form such as <Katex tex="\tfrac{(4a^4+b^2)^3}{3a^2b^3}" />.</>,
  },
  {
    working: (
      <>
        <Cas fn="derivative">d/db(A(b))</Cas>
        <Katex display tex="\frac{dA}{db} = \frac{(b^2-4a^4)(b^2+4a^4)^2}{a^2b^4}" />
      </>
    ),
    reason: <>A minimum of <Katex tex="A" /> occurs where <Katex tex="\tfrac{dA}{db}=0" />. Define <Katex tex="A(b)" /> on CAS, then differentiate with respect to <Katex tex="b" />, treating <Katex tex="a" /> as a constant (factorise the result to see its sign).</>,
  },
  {
    working: (
      <>
        <Cas fn="solve">solve(d/db(A(b)) = 0, b) | b &gt; 0</Cas>
        <Katex display tex="b = 2a^2" />
      </>
    ),
    reason: <>Without the restriction CAS gives <Katex tex="b=\pm 2a^2" />; the question says <Katex tex="b>0" />, which rules out <Katex tex="b=-2a^2" />, a common incorrect answer in the report. Check it is a minimum: <Katex tex="(b^2+4a^4)^2" /> and <Katex tex="a^2b^4" /> are positive, so the sign of <Katex tex="\tfrac{dA}{db}" /> is the sign of <Katex tex="b^2-4a^4" />: negative for <Katex tex="0<b<2a^2" /> and positive for <Katex tex="b>2a^2" />. The area decreases then increases, so it is a minimum.</>,
  },
  {
    working: <Katex display tex="\boxed{b = 2a^2}" />,
    reason: <>The minimum shaded area is then <Katex tex="A(2a^2) = \tfrac{64a^4}{3}" /> (not asked).</>,
  },
]

export default function MethodsQ1_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (11 marks)</p>
        <p>
          The diagram below shows part of the graph of <Katex tex="y=f(x)" />, where{' '}
          <Katex tex="f(x)=\dfrac{x^2}{12}" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={parabolaSrc}
            alt="Part of the parabola y = x²/12 with the tangent at a point M on its left branch — from the original 2022 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Axis of Symmetry"
        marks={1}
        statement={
          <>
            State the equation of the axis of symmetry of the graph of <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Derivative"
        marks={1}
        statement={
          <>
            State the derivative of <Katex tex="f" /> with respect to <Katex tex="x" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The tangent to <Katex tex="f" /> at point <Katex tex="M" /> has gradient{' '}
          <Katex tex="-2" />.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Tangent Line"
        marks={2}
        statement={
          <>
            Find the equation of the tangent to <Katex tex="f" /> at
            point <Katex tex="M" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          The diagram below shows part of the graph of <Katex tex="y=f(x)" />, the tangent to{' '}
          <Katex tex="f" /> at point <Katex tex="M" /> and the line perpendicular to the
          tangent at point <Katex tex="M" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={perpSrc}
            alt="The same parabola with the tangent at M and the perpendicular line through M, which cuts the parabola again at a point N on the right branch — from the original 2022 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="d.i"
        topic="Normal Line"
        marks={1}
        statement={
          <>
            Find the equation of the line perpendicular to the tangent passing through point{' '}
            <Katex tex="M" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            The line perpendicular to the tangent at point <Katex tex="M" /> also cuts{' '}
            <Katex tex="f" /> at point <Katex tex="N" />, as shown in the diagram above.
            <br />
            Find the area enclosed by this line and the curve <Katex tex="y=f(x)" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Optimisation"
        marks={4}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              Another parabola is defined by the rule <Katex tex="g(x)=\dfrac{x^2}{4a^2}" />,
              where <Katex tex="a>0" />.
              <br />
              A tangent to <Katex tex="g" /> and the line perpendicular to the tangent at{' '}
              <Katex tex="x=-b" />, where <Katex tex="b>0" />, are shown below.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={shadedSrc}
                alt="The parabola g(x) = x²/(4a²) with the tangent and the perpendicular line at x = −b, the region between the perpendicular line and the parabola shaded — from the original 2022 VCAA exam paper"
                className="w-full max-w-[420px]"
              />
            </div>
            <p>
              Find the value of <Katex tex="b" />, in terms of <Katex tex="a" />, such that the
              shaded area is a minimum.
            </p>
          </div>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="Moving the tangent point changes the area, and it is smallest at b = 2a²">
          <MinAreaWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
