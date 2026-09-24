// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 5 (13 marks). Factorising
// x^4 - 8x, the translation linking f and g, counting positive intercepts, a one-solution
// condition, a symmetric pair of gradients, and tangents through an external point. Question
// text transcribed from the original paper (no diagram given). Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [33, 19, 48],
  average: 1.2,
  comment: (
    <>
      Some students attempted to factorise by hand and obtained two correct linear factors but
      an incorrect quadratic factor such as <Katex tex="x(x-2)\left(x^2-2x+4\right)" />. Others
      used their technology to factorise appropriately.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [63, 37],
  average: 0.4,
  comment: (
    <>
      Some students did not make the connection between Question 5a. and Question 5b. Others described
      the translation as one unit in the <em>positive</em> direction of the{' '}
      <Katex tex="x" />-axis.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [93, 7],
  average: 0.1,
  comment: (
    <>
      This question was not answered well. <Katex tex="(1,3)" /> and{' '}
      <Katex tex="1<d<3" /> were common incorrect answers.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [81, 19],
  average: 0.1,
  comment: (
    <>
      Some students used incorrect notation such as <Katex tex="(1,-\infty)" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [83, 17],
  average: 0.2,
  comment: (
    <>
      An exact answer was required. Some students gave only the <Katex tex="x" /> value, and
      not the required value of <Katex tex="n" />.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [68, 8, 24],
  average: 0.6,
  comment: (
    <>
      A number of different approaches could be used to answer this question. Many students
      were unable to set up the two equations. Most students who were able to set up the two
      equations were able to answer the question correctly.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [90, 10],
  average: 0.1,
  comment: (
    <>
      Many students gave two solutions when only one was required as <Katex tex="m>0" />.
      Some did not give exact answers.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [78, 22],
  average: 0.2,
  comment: (
    <>
      Some students omitted the brackets.{' '}
      <Katex tex="y-\left(p^4-8p\right)=4p^3-8(x-p)" /> and{' '}
      <Katex tex="y-p^4-8p=4p^3-8(x-p)" /> were often given.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [80, 6, 2, 11],
  average: 0.5,
  comment: (
    <>
      Many students did not read the question carefully and tried to find the equation of the
      tangent to <Katex tex="g(x)" /> at <Katex tex="x=\tfrac32" />.{' '}
      <Katex tex="\left(\tfrac32,-12\right)" /> was not a point on <Katex tex="g(x)" />. Some
      did not realise that they could use their answer from the previous question. Others
      obtained <Katex tex="p=0" /> by incorrect working. The correct answers had to be
      obtained by correct working.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^4-8x = x\left(x^3-8\right)" />,
    reason: <>Take out the common factor first; what remains is a difference of two cubes.</>,
  },
  {
    working: <Katex display tex="x^3-8 = (x-2)\left(x^2+2x+4\right)" />,
    reason: <><Katex tex="a^3-b^3=(a-b)\left(a^2+ab+b^2\right)" /> with <Katex tex="b=2" />. The quadratic factor is the step the report says went wrong.</>,
  },
  {
    working: <Katex display tex="x^2+2x+4 = (x+1)^2+3" />,
    reason: <>Completing the square, which is the form the question asks for.</>,
  },
  {
    working: <Katex display tex="\boxed{x^4-8x = x(x-2)\left((x+1)^2+3\right)}" />,
    reason: <>So <Katex tex="a=2" />, <Katex tex="b=1" />, <Katex tex="c=3" />. Note <Katex tex="(x+1)^2+3>0" /> always, so the only real zeros are <Katex tex="0" /> and <Katex tex="2" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (x-3)(x-1)\left(x^2+3\right)" />,
    reason: <>Compare the shapes: <Katex tex="g" /> from part a. is <Katex tex="x(x-2)\left((x+1)^2+3\right)" />.</>,
  },
  {
    working: <Katex display tex="f(x+1) = (x-2)(x)\left((x+1)^2+3\right)" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="x+1" /> shifts each factor: <Katex tex="x+1-3=x-2" /> and <Katex tex="x+1-1=x" />.</>,
  },
  {
    working: <Katex display tex="f(x+1) = g(x)" />,
    reason: <>The two rules are identical, which is exactly what part a. was setting up.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{a translation of 1 unit in the negative direction of the } x\text{-axis}}" />,
    reason: <>Replacing <Katex tex="x" /> with <Katex tex="x+1" /> moves the graph <em>left</em>, not right — the sign trap the report highlights.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 0 \implies x = 1 \text{ or } x = 3" />,
    reason: <><Katex tex="x^2+3>0" /> for all real <Katex tex="x" />, so the quadratic factor contributes no intercepts.</>,
  },
  {
    working: <Katex display tex="f(x+d) = 0 \implies x = 1-d \text{ or } x = 3-d" />,
    reason: <>The graph shifts <Katex tex="d" /> units left, so both intercepts drop by <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="\text{exactly one positive}: \quad 3-d>0 \text{ and } 1-d\le0" />,
    reason: <>The larger intercept must stay positive while the smaller one is pushed to zero or below. Note <Katex tex="x=0" /> is <em>not</em> positive, so the second inequality is not strict.</>,
  },
  {
    working: <Katex display tex="d<3 \text{ and } d\ge1" />,
    reason: <>Combining.</>,
  },
  {
    working: <Katex display tex="\boxed{d \in [1,3)}" />,
    reason: <>At <Katex tex="d=1" /> the intercepts are <Katex tex="0" /> and <Katex tex="2" /> — one positive ✓. The common wrong answer <Katex tex="(1,3)" /> excludes that case.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{two positive}: \quad 1-d>0 \text{ and } 3-d>0" />,
    reason: <>Both intercepts must stay strictly to the right of the origin.</>,
  },
  {
    working: <Katex display tex="d<1 \text{ and } d<3 \implies d<1" />,
    reason: <>The first condition is the binding one.</>,
  },
  {
    working: <Katex display tex="\boxed{d \in (-\infty,1)}" />,
    reason: <>Equivalently <Katex tex="d<1" />. An interval is written smaller endpoint first — the report's example of incorrect notation, <Katex tex="(1,-\infty)" />, has them the wrong way round. Check with <Katex tex="d=0" />: the intercepts 1 and 3 are both positive ✓.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = x^4-8x \implies g'(x) = 4x^3-8" />,
    reason: <>A positive quartic with a single stationary point, so it is shaped like a parabola: one minimum and no other turning points.</>,
  },
  {
    working: <Katex display tex="4x^3 = 8 \implies x = \sqrt[3]{2}" />,
    reason: <>The unique stationary point, and therefore the global minimum.</>,
  },
  {
    working: <Katex display tex="g(x) = n \text{ has one solution} \iff n = g\!\left(\sqrt[3]2\right)" />,
    reason: <>Above the minimum the horizontal line cuts twice; below it, not at all. Exactly one solution happens only at the minimum itself.</>,
  },
  {
    working: <Katex display tex="g\!\left(\sqrt[3]2\right) = 2^{4/3}-8\times2^{1/3} = 2^{1/3}(2-8)" />,
    reason: <>Since <Katex tex="\left(2^{1/3}\right)^4=2^{4/3}=2\cdot2^{1/3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = -6\sqrt[3]{2}}" />,
    reason: <>Exact, as required — about <Katex tex="-7.56" />. The question asks for <Katex tex="n" />, not the <Katex tex="x" /> value.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="g'(u) = m: \quad 4u^3-8 = m" />,
    reason: <>The gradient at the first point.</>,
  },
  {
    working: <Katex display tex="g'(v) = -m: \quad 4v^3-8 = -m" />,
    reason: <>And at the second. Two equations in three unknowns — but <Katex tex="m" /> is about to disappear.</>,
  },
  {
    working: <Katex display tex="\bigl(4u^3-8\bigr)+\bigl(4v^3-8\bigr) = m+(-m) = 0" />,
    reason: <>Adding eliminates <Katex tex="m" /> without ever finding it.</>,
  },
  {
    working: <Katex display tex="4u^3+4v^3 = 16" />,
    reason: <>Collecting the constants.</>,
  },
  {
    working: <Katex display tex="\boxed{u^3+v^3 = 4}" />,
    reason: <>Dividing by 4.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="(u+v)^3 = u^3+v^3+3uv(u+v)" />,
    reason: <>The identity that turns the two given facts into a value for <Katex tex="uv" />.</>,
  },
  {
    working: <Katex display tex="1 = 4+3uv(1) \implies uv = -1" />,
    reason: <>Using <Katex tex="u+v=1" /> and part e(i).</>,
  },
  {
    working: <Katex display tex="t^2-t-1 = 0 \implies t = \frac{1\pm\sqrt5}{2}" />,
    reason: <><Katex tex="u" /> and <Katex tex="v" /> are the roots of a quadratic with sum 1 and product <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="m>0 \implies 4u^3-8>0 \implies u > \sqrt[3]2 \approx 1.26" />,
    reason: <>This is what decides which root is which — the report says many students gave both pairs when only one was required.</>,
  },
  {
    working: <Katex display tex="\boxed{u = \frac{1+\sqrt5}{2}, \qquad v = \frac{1-\sqrt5}{2}}" />,
    reason: <><Katex tex="\tfrac{1+\sqrt5}2\approx1.618>1.26" /> ✓, while <Katex tex="v\approx-0.618" /> gives a negative gradient.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="y-g(p) = g'(p)(x-p)" />,
    reason: <>Point–gradient form at <Katex tex="\bigl(p,g(p)\bigr)" />.</>,
  },
  {
    working: <Katex display tex="y = \left(p^4-8p\right)+\left(4p^3-8\right)(x-p)" />,
    reason: <>Substituting. Brackets around both expressions are essential — the report says omitting them was the main error.</>,
  },
  {
    working: <Katex display tex="y = \left(4p^3-8\right)x + p^4-8p-4p^4+8p" />,
    reason: <>Expanding <Katex tex="-\left(4p^3-8\right)p = -4p^4+8p" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \left(4p^3-8\right)x-3p^4}" />,
    reason: <>The <Katex tex="8p" /> terms cancel, leaving a clean intercept.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="\left(\tfrac32,-12\right) \text{ on the tangent}: \quad -12 = \left(4p^3-8\right)\tfrac32-3p^4" />,
    reason: <>The point is <em>not</em> on the curve — <Katex tex="g\!\left(\tfrac32\right)=-6.9375" /> — so it cannot be the point of tangency. Substitute it into the general tangent from part f(i) instead.</>,
  },
  {
    working: <Katex display tex="-12 = 6p^3-12-3p^4" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="3p^4-6p^3 = 0 \implies 3p^3(p-2) = 0" />,
    reason: <>The constants cancel, and the quartic factorises immediately.</>,
  },
  {
    working: <Cas fn="solve">solve(-12 = (4p^3-8)(3/2) - 3p^4, p)</Cas>,
    reason: <><Katex tex="p=0" /> or <Katex tex="p=2" /> — two points of tangency, so two tangents.</>,
  },
  {
    working: <Katex display tex="p=0: \quad y = (0-8)x-0 = -8x" />,
    reason: <>Substituting back into part f(i).</>,
  },
  {
    working: <Katex display tex="\boxed{y = -8x \quad\text{and}\quad y = 24x-48}" />,
    reason: <><Katex tex="p=2" /> gives <Katex tex="\left(4(8)-8\right)x-3(16)=24x-48" />. Check: at <Katex tex="x=\tfrac32" />, <Katex tex="-8\left(\tfrac32\right)=-12" /> ✓ and <Katex tex="24\left(\tfrac32\right)-48=-12" /> ✓.</>,
  },
]

export default function MethodsQ5_2014Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (13 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />,{' '}
          <Katex tex="f(x)=(x-3)(x-1)\left(x^2+3\right)" /> and <Katex tex="g:R\to R" />,{' '}
          <Katex tex="g(x)=x^4-8x" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Factorisation"
        marks={2}
        statement={
          <>
            Express <Katex tex="x^4-8x" /> in the form{' '}
            <Katex tex="x(x-a)\left((x+b)^2+c\right)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background>
          <p>
            The factorisation in part a. is not busy-work: it is what reveals that{' '}
            <Katex tex="g" /> is simply <Katex tex="f" /> shifted sideways, and parts b. and c.
            both depend on seeing that.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Translation"
        marks={1}
        statement={
          <>
            Describe the translation that maps the graph of <Katex tex="y=f(x)" /> onto the
            graph of <Katex tex="y=g(x)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Intercepts"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="d" /> such that the graph of{' '}
            <Katex tex="y=f(x+d)" /> has one positive <Katex tex="x" />-axis intercept.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Intercepts"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="d" /> such that the graph of{' '}
            <Katex tex="y=f(x+d)" /> has two positive <Katex tex="x" />-axis intercepts.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Number of Solutions"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="n" /> for which the equation{' '}
            <Katex tex="g(x)=n" /> has one solution.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        At the point <Katex tex="\bigl(u,g(u)\bigr)" />, the gradient of{' '}
        <Katex tex="y=g(x)" /> is <Katex tex="m" /> and at the point{' '}
        <Katex tex="\bigl(v,g(v)\bigr)" />, the gradient is <Katex tex="-m" />, where{' '}
        <Katex tex="m" /> is a positive real number.
      </div>

      <PartCard
        letter="e.i"
        topic="Algebraic Identity"
        marks={2}
        statement={<>Find the value of <Katex tex="u^3+v^3" />.</>}
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Simultaneous Equations"
        marks={1}
        statement={<>Find <Katex tex="u" /> and <Katex tex="v" /> if <Katex tex="u+v=1" />.</>}
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard
        letter="f.i"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Find the equation of the tangent to the graph of <Katex tex="y=g(x)" /> at the
            point <Katex tex="\bigl(p,g(p)\bigr)" />.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Tangent Through Point"
        marks={3}
        statement={
          <>
            Find the equations of the tangents to the graph of <Katex tex="y=g(x)" /> that
            pass through the point with coordinates <Katex tex="\left(\tfrac32,-12\right)" />.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>
    </div>
  )
}
