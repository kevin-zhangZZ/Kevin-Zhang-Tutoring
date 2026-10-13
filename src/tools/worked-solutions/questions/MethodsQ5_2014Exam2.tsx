// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 5 (13 marks). Factorising
// x^4 - 8x, the translation linking f and g, counting positive intercepts, a one-solution
// condition, a symmetric pair of gradients, and tangents through an external point. Question
// text transcribed from the original paper (no diagram given). Answers checked with sympy and
// against the VCAA examination report. Solution is original.
// Interactive diagrams (§15): part b. slides y = f(x + h) left onto g at h = 1
// (interactives/meth-2014e2-q5b-shift.tsx); part c.i. slides d and counts the positive intercepts,
// stopping on d = 1 (intercept at the origin) and d = 3 (interactives/meth-2014e2-q5ci-intercepts.tsx);
// part d. moves the line y = n onto the minimum (interactives/meth-2014e2-q5d-level.tsx); part e.i.
// slides m and shows u³ + v³ stays 4, then finds u + v = 1 at m = 4√5 (interactives/meth-2014e2-q5ei-gradients.tsx);
// part f.ii. slides the point of tangency p until the tangent passes through (3/2, −12), with a toggle
// for the tangent at x = 3/2 (interactives/meth-2014e2-q5fii-tangents.tsx).
// Skipped: c.ii. (same picture as c.i., whose widget covers the d < 1 case); e.ii. (the e.i. widget
// already shows the u + v = 1 case and why only one pair works); f.i. (the lost marks were missing
// brackets, an algebra slip a picture does not fix).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const ShiftWidget = lazyWidget(() => import('../interactives/meth-2014e2-q5b-shift'))
const InterceptsWidget = lazyWidget(() => import('../interactives/meth-2014e2-q5ci-intercepts'))
const LevelWidget = lazyWidget(() => import('../interactives/meth-2014e2-q5d-level'))
const GradientsWidget = lazyWidget(() => import('../interactives/meth-2014e2-q5ei-gradients'))
const TangentsWidget = lazyWidget(() => import('../interactives/meth-2014e2-q5fii-tangents'))

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
    reason: <>Take out the common factor <Katex tex="x" /> first; what remains, <Katex tex="x^3-2^3" />, is a difference of two cubes.</>,
  },
  {
    working: <Katex display tex="x^3-8 = (x-2)\left(x^2+2x+4\right)" />,
    reason: <><Katex tex="a^3-b^3=(a-b)\left(a^2+ab+b^2\right)" /> with <Katex tex="a=x" />, <Katex tex="b=2" />: the middle term is <Katex tex="+2x" />.</>,
    more: <>Check by expanding: <Katex tex="(x-2)\left(x^2+2x+4\right)=x^3+2x^2+4x-2x^2-4x-8=x^3-8" /> ✓. The report's incorrect quadratic factor <Katex tex="x^2-2x+4" /> belongs to the <em>sum</em> of cubes <Katex tex="x^3+8=(x+2)\left(x^2-2x+4\right)" />. This is a calculator-allowed exam, so CAS factorisation of <Katex tex="x^4-8x" /> gives <Katex tex="x(x-2)\left(x^2+2x+4\right)" /> directly, as the report notes others did; the completed square in the next row is still yours to do.</>,
  },
  {
    working: <Katex display tex="x^2+2x+4 = \left(x^2+2x+1\right)+3 = (x+1)^2+3" />,
    reason: <>Completing the square (half of <Katex tex="2" /> is <Katex tex="1" />), which gives the <Katex tex="(x+b)^2+c" /> form the question asks for.</>,
  },
  {
    working: <Katex display tex="\boxed{x^4-8x = x(x-2)\left((x+1)^2+3\right)}" />,
    reason: <>So <Katex tex="a=2" />, <Katex tex="b=1" />, <Katex tex="c=3" />. Since <Katex tex="(x+1)^2+3>0" /> always, the only real zeros are <Katex tex="0" /> and <Katex tex="2" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (x-3)(x-1)\left(x^2+3\right)" />,
    reason: <>Compare the shapes: <Katex tex="g" /> from part a. is <Katex tex="x(x-2)\left((x+1)^2+3\right)" />. Each factor of <Katex tex="g" /> looks like a factor of <Katex tex="f" /> with <Katex tex="x" /> replaced by <Katex tex="x+1" />.</>,
  },
  {
    working: <Katex display tex="f(x+1) = (x-2)(x)\left((x+1)^2+3\right)" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="x+1" /> shifts each factor: <Katex tex="x+1-3=x-2" /> and <Katex tex="x+1-1=x" />.</>,
  },
  {
    working: <Katex display tex="f(x+1) = g(x)" />,
    reason: <>The two rules are identical, which is exactly what part a. was setting up.</>,
    more: <>A quick check with intercepts: <Katex tex="f" /> cuts the <Katex tex="x" />-axis at <Katex tex="1" /> and <Katex tex="3" />, and <Katex tex="g" /> at <Katex tex="0" /> and <Katex tex="2" />. Every intercept has moved 1 unit to the left.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{a translation of 1 unit in the}\\ \text{negative direction of the } x\text{-axis}\end{gathered}}" />,
    reason: <>Replacing <Katex tex="x" /> with <Katex tex="x+1" /> moves the graph <em>left</em> (the negative direction), not right.</>,
    more: <>Why left: <Katex tex="g(x)=f(x+1)" /> says the height of <Katex tex="g" /> at <Katex tex="x" /> is the height <Katex tex="f" /> had one unit further right. So whatever <Katex tex="f" /> does at <Katex tex="x=1" />, <Katex tex="g" /> does at <Katex tex="x=0" />. The report notes some students described the translation as one unit in the positive direction (the sign trap), and some did not connect this part to part a.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 0 \implies x = 1 \text{ or } x = 3" />,
    reason: <>Null factor law. <Katex tex="x^2+3>0" /> for all real <Katex tex="x" />, so the quadratic factor contributes no intercepts.</>,
  },
  {
    working: <Katex display tex="f(x+d) = 0 \implies x+d = 1 \text{ or } x+d = 3" />,
    reason: <>Same factors with <Katex tex="x+d" /> in place of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="x = 1-d \quad\text{or}\quad x = 3-d" />,
    reason: <>The graph moves <Katex tex="d" /> units left (right if <Katex tex="d<0" />), so both intercepts decrease by <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="\text{exactly one positive}: \quad 3-d>0 \text{ and } 1-d\le0" />,
    reason: <>The larger intercept must stay positive while the smaller one reaches zero or below. <Katex tex="x=0" /> is <em>not</em> positive, so <Katex tex="\le" /> is correct here.</>,
  },
  {
    working: <Katex display tex="d<3 \text{ and } d\ge1" />,
    reason: <>Rearranging each inequality.</>,
  },
  {
    working: <Katex display tex="\boxed{d \in [1,3)}" />,
    reason: <>Check the ends: <Katex tex="d=1" /> gives intercepts <Katex tex="0" /> and <Katex tex="2" />, one positive, so <Katex tex="1" /> is included; <Katex tex="d=3" /> gives <Katex tex="-2" /> and <Katex tex="0" />, none positive.</>,
    more: <>The report notes <Katex tex="(1,3)" /> and <Katex tex="1<d<3" /> were common incorrect answers: both leave out <Katex tex="d=1" />. At <Katex tex="d=1" /> the left intercept sits exactly on the origin, and an intercept at <Katex tex="x=0" /> is neither positive nor negative, so the graph still has exactly one positive intercept (at <Katex tex="x=2" />). The bracket at <Katex tex="3" /> is round because at <Katex tex="d=3" /> the right intercept has reached the origin too. Only 7% of students scored this mark.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{two positive}: \quad 1-d>0 \text{ and } 3-d>0" />,
    reason: <>Using the intercepts <Katex tex="1-d" /> and <Katex tex="3-d" /> from part c.i., both must lie strictly to the right of the origin.</>,
  },
  {
    working: <Katex display tex="d<1 \text{ and } d<3 \implies d<1" />,
    reason: <>Any <Katex tex="d<1" /> automatically satisfies <Katex tex="d<3" />, so the first condition is the one that matters.</>,
  },
  {
    working: <Katex display tex="\boxed{d \in (-\infty,1)}" />,
    reason: <>Equivalently <Katex tex="d<1" />. Check <Katex tex="d=0" />: intercepts <Katex tex="1" /> and <Katex tex="3" />, both positive ✓. At <Katex tex="d=1" /> one intercept is <Katex tex="0" />, so <Katex tex="1" /> is excluded.</>,
    more: <>The report notes incorrect notation such as <Katex tex="(1,-\infty)" />. An interval is always written smaller endpoint first, and <Katex tex="-\infty" /> always takes a round bracket, so the correct form is <Katex tex="(-\infty,1)" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 4x^3-8" />,
    reason: <>The number of solutions of <Katex tex="g(x)=n" /> depends on the shape of <Katex tex="g" />, so find its stationary points.</>,
  },
  {
    working: <Katex display tex="4x^3 - 8 = 0 \implies x^3=2 \implies x = \sqrt[3]{2}" />,
    reason: <>The only stationary point. <Katex tex="g" /> is a positive quartic (rising at both ends), so this single turning point is its minimum.</>,
    more: <>Sign check: <Katex tex="g'(x)=4x^3-8" /> is negative for <Katex tex="x<\sqrt[3]2" /> and positive for <Katex tex="x>\sqrt[3]2" />, so <Katex tex="g" /> decreases then increases, a U shape like a parabola, with no other turning points.</>,
  },
  {
    working: <Katex display tex="g(x) = n \text{ has one solution} \iff n = g\!\left(\sqrt[3]2\right)" />,
    reason: <>A horizontal line <Katex tex="y=n" /> above the minimum cuts the U twice; below it, not at all. Exactly one solution only at the minimum.</>,
  },
  {
    working: <Katex display tex="g\!\left(\sqrt[3]2\right) = 2^{4/3}-8\times2^{1/3} = 2^{1/3}(2-8)" />,
    reason: <>Since <Katex tex="\left(2^{1/3}\right)^4=2^{4/3}=2\cdot2^{1/3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = -6\sqrt[3]{2}}" />,
    reason: <>Exact, as required (about <Katex tex="-7.56" />). The question asks for <Katex tex="n" />, the <Katex tex="y" />-value, not the <Katex tex="x" />-value <Katex tex="\sqrt[3]2" />.</>,
    more: <>The report notes an exact answer was required, and some students gave only the <Katex tex="x" /> value and not the required value of <Katex tex="n" />. <Katex tex="n" /> is a height on the graph, so it is <Katex tex="g" /> evaluated at the turning point. A decimal such as <Katex tex="-7.56" /> is not exact.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="g'(u) = m: \quad 4u^3-8 = m" />,
    reason: <>&ldquo;The gradient at <Katex tex="\bigl(u,g(u)\bigr)" /> is <Katex tex="m" />&rdquo; means <Katex tex="g'(u)=m" />, with <Katex tex="g'(x)=4x^3-8" /> from part d.</>,
    more: <>The report notes many students were unable to set up the two equations, and most who did went on to answer correctly. The whole question is translating words into derivatives: the gradient of a curve at a point is the derivative evaluated at that point's <Katex tex="x" />-coordinate.</>,
  },
  {
    working: <Katex display tex="g'(v) = -m: \quad 4v^3-8 = -m" />,
    reason: <>The same idea at <Katex tex="\bigl(v,g(v)\bigr)" />. Two equations, three unknowns, but adding them will remove <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="\bigl(4u^3-8\bigr)+\bigl(4v^3-8\bigr) = m+(-m) = 0" />,
    reason: <>Adding the two equations eliminates <Katex tex="m" /> without ever finding it.</>,
    more: <>Another of the &ldquo;different approaches&rdquo; the report mentions: make each cube the subject, <Katex tex="u^3=\tfrac{8+m}{4}" /> and <Katex tex="v^3=\tfrac{8-m}{4}" />, then add: <Katex tex="u^3+v^3=\tfrac{16}{4}=4" />. Either way <Katex tex="m" /> cancels, so the answer is the same for every positive <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="4u^3+4v^3 = 16" />,
    reason: <>Moving the constants to the right.</>,
  },
  {
    working: <Katex display tex="\boxed{u^3+v^3 = 4}" />,
    reason: <>Dividing by 4.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="v = 1-u \implies u^3+(1-u)^3 = 4" />,
    reason: <>Substitute <Katex tex="u+v=1" /> into part e.i.'s <Katex tex="u^3+v^3=4" /> to get one equation in <Katex tex="u" />.</>,
    more: <>On CAS, <Cas fn="solve">solve(u^3+v^3=4 and u+v=1, &#123;u,v&#125;)</Cas> returns both pairs at once. You still have to choose between them, as below.</>,
  },
  {
    working: <Katex display tex="u^3+1-3u+3u^2-u^3 = 4" />,
    reason: <>Expanding <Katex tex="(1-u)^3=1-3u+3u^2-u^3" />. The <Katex tex="u^3" /> terms cancel.</>,
  },
  {
    working: <Katex display tex="3u^2-3u-3 = 0 \implies u^2-u-1 = 0" />,
    reason: <>Collecting terms and dividing by 3.</>,
  },
  {
    working: <Katex display tex="u = \frac{1\pm\sqrt5}{2}" />,
    reason: <>Quadratic formula. Each value gives <Katex tex="v=1-u" />, so there are two candidate pairs; the condition <Katex tex="m>0" /> decides between them.</>,
  },
  {
    working: <Katex display tex="m>0 \implies 4u^3-8>0 \implies u > \sqrt[3]2 \approx 1.26" />,
    reason: <>The gradient at <Katex tex="u" /> is the positive one, so <Katex tex="u" /> must be the larger root.</>,
    more: <>The report notes many students gave two solutions when only one was required as <Katex tex="m>0" />. Swapping <Katex tex="u" /> and <Katex tex="v" /> would make the gradient at <Katex tex="u" /> negative, which contradicts the information given before part e.i.</>,
  },
  {
    working: <Katex display tex="\boxed{u = \frac{1+\sqrt5}{2}, \qquad v = \frac{1-\sqrt5}{2}}" />,
    reason: <><Katex tex="\tfrac{1+\sqrt5}2\approx1.618>1.26" /> ✓, then <Katex tex="v=1-u=\tfrac{1-\sqrt5}2\approx-0.618" />. Exact values are required.</>,
    more: <>Check: <Katex tex="u^2=u+1" /> gives <Katex tex="u^3=2u+1" />, so <Katex tex="g'(u)=4(2u+1)-8=8u-4=4\sqrt5>0" />. Similarly <Katex tex="g'(v)=8v-4=-4\sqrt5" />, so here <Katex tex="m=4\sqrt5" /> ✓.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="y-g(p) = g'(p)(x-p)" />,
    reason: <>Point–gradient form at <Katex tex="\bigl(p,g(p)\bigr)" />, with <Katex tex="g'(p)=4p^3-8" /> from part d.</>,
  },
  {
    working: <Katex display tex="y = \left(p^4-8p\right)+\left(4p^3-8\right)(x-p)" />,
    reason: <>Substituting. Brackets around both <Katex tex="g(p)" /> and <Katex tex="g'(p)" /> are essential.</>,
    more: <>The report notes some students omitted the brackets, giving <Katex tex="y-\left(p^4-8p\right)=4p^3-8(x-p)" /> (only the <Katex tex="8" /> gets multiplied by <Katex tex="x-p" />) or <Katex tex="y-p^4-8p=4p^3-8(x-p)" /> (which also makes the <Katex tex="8p" /> term the wrong sign). Both are different lines, not the tangent.</>,
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
    working: <Katex display tex="g\!\left(\tfrac32\right) = \tfrac{81}{16}-12 = -\tfrac{111}{16} \ne -12" />,
    reason: <>The point is <em>not</em> on the curve, so it cannot be the point of tangency. The tangents touch the curve somewhere else, at unknown <Katex tex="x=p" />.</>,
    more: <>The report notes many students did not read the question carefully and found the tangent at <Katex tex="x=\tfrac32" />; that line touches the curve at <Katex tex="\left(\tfrac32,-\tfrac{111}{16}\right)" /> and does not pass through <Katex tex="\left(\tfrac32,-12\right)" />. The report also notes some did not realise they could use part f.i.: its tangent at a general point <Katex tex="p" /> is exactly what this part needs.</>,
  },
  {
    working: <Katex display tex="-12 = \left(4p^3-8\right)\tfrac32-3p^4" />,
    reason: <>Substitute <Katex tex="x=\tfrac32" />, <Katex tex="y=-12" /> into part f.i.'s tangent: we want the values of <Katex tex="p" /> whose tangent passes through the point.</>,
  },
  {
    working: <Katex display tex="-12 = 6p^3-12-3p^4" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="3p^4-6p^3 = 0 \implies 3p^3(p-2) = 0" />,
    reason: <>The constants cancel; factorise rather than divide by <Katex tex="p^3" />, which would lose <Katex tex="p=0" />.</>,
    more: <>The report notes some students obtained <Katex tex="p=0" /> by incorrect working, and that the correct answers had to be obtained by correct working. So write this equation down and factorise it in full: dividing by <Katex tex="p^3" /> and then adding <Katex tex="p=0" /> back by guesswork is not correct working.</>,
  },
  {
    working: <Katex display tex="p=0 \quad\text{or}\quad p=2" />,
    reason: <>Null factor law: two points of tangency, so two tangents.</>,
    more: <>On CAS, <Cas fn="solve">solve(-12 = (4p^3-8)(3/2) - 3p^4, p)</Cas> gives the same two values directly.</>,
  },
  {
    working: <Katex display tex="p=0: \quad y = (0-8)x-0 = -8x" />,
    reason: <>Substituting back into part f.i.</>,
  },
  {
    working: <Katex display tex="p=2: \quad y = (32-8)x-3(16) = 24x-48" />,
    reason: <>Likewise, with <Katex tex="p^3=8" /> and <Katex tex="p^4=16" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -8x \quad\text{and}\quad y = 24x-48}" />,
    reason: <>Check at <Katex tex="x=\tfrac32" />: <Katex tex="-8\left(\tfrac32\right)=-12" /> ✓ and <Katex tex="24\left(\tfrac32\right)-48=-12" /> ✓.</>,
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
        <Explore title="Why f(x + 1) moves the graph left, onto g">
          <ShiftWidget />
        </Explore>
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
        <Explore title="Counting positive intercepts: what happens at d = 1 and d = 3">
          <InterceptsWidget />
        </Explore>
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
        <Explore title="One solution only when the line y = n touches the minimum">
          <LevelWidget />
        </Explore>
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
        <Explore title="m changes, but u³ + v³ stays 4">
          <GradientsWidget />
        </Explore>
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
        <Explore title="Only two tangents pass through (3/2, −12)">
          <TangentsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
