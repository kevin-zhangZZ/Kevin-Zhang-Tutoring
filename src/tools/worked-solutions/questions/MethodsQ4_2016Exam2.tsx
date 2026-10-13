// 2016 Mathematical Methods — Exam 2, Section B, Question 4 (21 marks).
// f(x) = (2x+1)/(x+2) and its inverse, a minimum distance to the origin, then the family
// g(x) = (kx+1)/(x+k): a monotonicity proof, an intersection, a triangle area, and a
// bounded area function. Parts (d), (e)(iii) and (f)(ii) were among the least-answered
// on the paper. Question text transcribed from the original paper; the figures are crops
// of VCAA's own artwork. Answers verified with sympy. Solution is original.
// Interactive diagrams (§15): part c. slides P along the branch with a circle centred at O, until
// the circle just touches the curve, plus a toggle for the other CAS root on the other branch
// (interactives/meth-2016e2-q4c-closest.tsx); part e.i. shows both roots of x² + 2kx + 1 = 0 either
// side of the asymptote x = −k (interactives/meth-2016e2-q4ei-branch.tsx); part e.iii. slides k to
// grow and shrink triangle XYZ until s(k) = 1 at k = 5/4 (interactives/meth-2016e2-q4eiii-triangle.tsx);
// part f.i. slides k with fixed terminals ±1 and overlays f's fixed area (interactives/meth-2016e2-q4fi-area.tsx);
// part f.ii. shows the region inside the triangle of area 2 for every k (interactives/meth-2016e2-q4fii-bound.tsx).
// Skipped: part d. (a proof by algebra — a graph shows g rising but not why g(x₂) − g(x₁) > 0 for
// every pair); part e.ii. (a one-line equation, and the e.iii. widget already shows X reaching
// (−½, ½) at k = 5/4).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import biiSrc from './meth-2016e2-q4bii-shaded.png'
import biiiSrc from './meth-2016e2-q4biii-shaded.png'
import pointSrc from './meth-2016e2-q4c-point.png'
import triangleSrc from './meth-2016e2-q4eiii-triangle.png'
import regionSrc from './meth-2016e2-q4f-region.png'

const ClosestWidget = lazyWidget(() => import('../interactives/meth-2016e2-q4c-closest'))
const BranchWidget = lazyWidget(() => import('../interactives/meth-2016e2-q4ei-branch'))
const TriangleWidget = lazyWidget(() => import('../interactives/meth-2016e2-q4eiii-triangle'))
const AreaWidget = lazyWidget(() => import('../interactives/meth-2016e2-q4fi-area'))
const BoundWidget = lazyWidget(() => import('../interactives/meth-2016e2-q4fii-bound'))

const EXAM_A: SAExaminerStats = {
  marks: [42, 6, 52],
  average: 1.1,
  comment: (
    <>
      This question was answered well and could be done directly using technology. Some
      students left their answer as <Katex tex="2x+\tfrac{1}{x+2}" />, which was incorrect.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [19, 26, 56],
  average: 1.4,
  comment: (
    <>
      This question was answered well. Equivalent forms were acceptable. Some students did
      not give the domain. Others attempted to solve for <Katex tex="y" /> by hand and were
      unsuccessful.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      This question was answered well. Some students gave an approximate answer when an
      exact answer was required. The base was sometimes missing from students' responses.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: <>Some students realised that the answer to this question was double that of the previous result.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [69, 4, 14, 14],
  average: 0.7,
  comment: (
    <>
      This question was not answered well. Some students did not consider the domain and
      gave two sets of values for <Katex tex="c" /> and <Katex tex="d" /> or chose the
      incorrect value for <Katex tex="c" />. Others had the correct answers for{' '}
      <Katex tex="c" /> and <Katex tex="d" /> but did not work out the minimum distance.
      Some did not give exact values.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [90, 4, 6],
  average: 0.2,
  comment: (
    <>
      Many students did not attempt this question. Some just substituted in specific values,
      which was not acceptable.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [60, 16, 24],
  average: 0.6,
  comment: (
    <>
      Some students did not consider the domain and chose the incorrect value for{' '}
      <Katex tex="x" />. Others gave two sets of coordinates. Some did not include a
      multiplication sign between <Katex tex="k" /> and <Katex tex="x" /> when using
      technology.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [51, 11, 38],
  average: 0.9,
  comment: (
    <>
      Some students did not use their answer to Question 4e.i. but were successful in
      solving <Katex tex="g\!\left(-\tfrac12\right)=\tfrac12" />.
    </>
  ),
}

const EXAM_EIII: SAExaminerStats = {
  marks: [91, 5, 3],
  average: 0.1,
  comment: (
    <>
      This question was not answered well. Some students had{' '}
      <Katex tex="1\le k\le\tfrac54" />.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [61, 20, 18],
  average: 0.6,
  comment: (
    <>
      Most students were able to set up the integral.{' '}
      <Katex tex="A(k)=\int_{-1}^{1}\bigl(f(x)-x\bigr)dx" />, which was independent of{' '}
      <Katex tex="k" />, was sometimes given. Other students tried to use{' '}
      <Katex tex="A(k)=\int_{1}^{\infty}\bigl(f(x)-x\bigr)dx" />. Some broke the area up into
      different sections and were successful, but this would have been time consuming.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [94, 4, 2],
  average: 0.1,
  comment: <>Many students did not attempt this question.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{2x+1}{x+2} = \frac{2(x+2)-3}{x+2}" />,
    reason: <>Make the numerator contain a copy of the denominator: <Katex tex="2(x+2)=2x+4" />, and <Katex tex="2x+1" /> is <Katex tex="3" /> less than that.</>,
  },
  {
    working: <Katex display tex="= \frac{2(x+2)}{x+2}+\frac{-3}{x+2} = \boxed{2+\frac{-3}{x+2}}" />,
    reason: <>Split the fraction and cancel <Katex tex="x+2" /> in the first part. So <Katex tex="a=2" /> and <Katex tex="b=-3" />.</>,
    more: <>Check by recombining: <Katex tex="2+\tfrac{-3}{x+2}=\tfrac{2x+4-3}{x+2}=\tfrac{2x+1}{x+2}" /> ✓. The report notes some students left their answer as <Katex tex="2x+\tfrac{1}{x+2}" />, which is a different function: at <Katex tex="x=1" /> it gives <Katex tex="\tfrac73" />, while the original gives <Katex tex="1" />. It is also not in the form asked for, since <Katex tex="a" /> must be a number, not <Katex tex="2x" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="x = \frac{2y+1}{y+2}" />,
    reason: <>For the inverse, swap <Katex tex="x" /> and <Katex tex="y" /> in <Katex tex="y=f(x)" />, then make <Katex tex="y" /> the subject.</>,
    more: <>On CAS, <Cas fn="solve">solve(x = (2y+1)/(y+2), y)</Cas> does the next two lines at once. The report notes some students attempted to solve for <Katex tex="y" /> by hand and were unsuccessful, so on Exam 2 let the CAS do the algebra.</>,
  },
  {
    working: <Katex display tex="x(y+2) = 2y+1 \implies xy+2x = 2y+1" />,
    reason: <>Clearing the fraction.</>,
  },
  {
    working: <Katex display tex="xy-2y = 1-2x \implies y = \frac{1-2x}{x-2}" />,
    reason: <>Collect the <Katex tex="y" /> terms on one side, factor out <Katex tex="y" /> to get <Katex tex="y(x-2)" />, and divide.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \frac{-3}{x-2}-2}" />,
    reason: <>The same rule written in part a.'s form. Either form was accepted.</>,
    more: <>Check by recombining: <Katex tex="\tfrac{-3-2(x-2)}{x-2}=\tfrac{1-2x}{x-2}" /> ✓. This form also shows the inverse's asymptotes <Katex tex="x=2" /> and <Katex tex="y=-2" />: those of <Katex tex="f" /> (<Katex tex="x=-2" />, <Katex tex="y=2" />) with <Katex tex="x" /> and <Katex tex="y" /> swapped.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dom}(f^{-1}) = \text{ran}(f) = R\setminus\{2\}}" />,
    reason: <>The domain of an inverse is the range of the original. <Katex tex="f(x)=2-\tfrac{3}{x+2}" /> takes every value except its asymptote, <Katex tex="2" />.</>,
    more: <>The question asks for the rule <em>and</em> the domain, and the report notes some students did not give the domain. The term <Katex tex="\tfrac{-3}{x+2}" /> takes every real value except <Katex tex="0" />, so <Katex tex="f(x)" /> takes every value except <Katex tex="2" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{2x+1}{x+2} = x \implies 2x+1 = x^2+2x" />,
    reason: <>The region's ends are where the curve meets <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="x^2 = 1 \implies x = \pm1" />,
    reason: <>The <Katex tex="2x" /> terms cancel.</>,
  },
  {
    working: <Katex display tex="A = \int_{-1}^{1}\bigl(f(x)-x\bigr)dx" />,
    reason: <>Area is the integral of top minus bottom. Between the intersections <Katex tex="f" /> is on top: at <Katex tex="x=0" />, <Katex tex="f(0)=\tfrac12>0" />.</>,
  },
  {
    working: <Katex display tex="= \int_{-1}^{1}\left(2-\frac{3}{x+2}-x\right)dx" />,
    reason: <>Using part a., so each term has a standard antiderivative.</>,
    more: <>On Exam 2 the CAS will evaluate <Katex tex="\int_{-1}^{1}\left(\tfrac{2x+1}{x+2}-x\right)dx" /> directly. By hand, the part a. form is what makes it possible: <Katex tex="\tfrac{3}{x+2}" /> integrates to <Katex tex="3\log_e(x+2)" />.</>,
  },
  {
    working: <Katex display tex="= \left[2x-3\log_e(x+2)-\frac{x^2}{2}\right]_{-1}^{1}" />,
    reason: <><Katex tex="x+2>0" /> throughout <Katex tex="[-1,1]" />, so no absolute value is needed in the log.</>,
  },
  {
    working: <Katex display tex="= \left(2-3\log_e3-\tfrac12\right)-\left(-2-3\log_e1-\tfrac12\right)" />,
    reason: <>Upper terminal minus lower terminal; <Katex tex="\log_e1=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{4-3\log_e(3)}" />,
    reason: <>An exact answer was required (about <Katex tex="0.704" /> square units). <Katex tex="4-\log_e(27)" /> is the same number.</>,
    more: <>The report notes some students gave an approximate answer when an exact answer was required, and that the base was sometimes missing. Write <Katex tex="\log_e" />, not <Katex tex="\log" />.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="f^{-1} \text{ is the reflection of } f \text{ in } y=x" />,
    reason: <>So the line <Katex tex="y=x" /> cuts the shaded region into two mirror-image halves, and one half is exactly the region from part b.ii.</>,
    more: <>The two graphs meet at <Katex tex="(-1,-1)" /> and <Katex tex="(1,1)" />, the points where <Katex tex="f" /> meets <Katex tex="y=x" />: each lies on the mirror line, so the reflection leaves it in place and it is on both graphs. The region between <Katex tex="f" /> and <Katex tex="y=x" /> reflects onto the region between <Katex tex="y=x" /> and <Katex tex="f^{-1}" />, with the same area.</>,
  },
  {
    working: <Katex display tex="A = 2\int_{-1}^{1}\bigl(f(x)-x\bigr)dx = 2\bigl(4-3\log_e(3)\bigr)" />,
    reason: <>Twice the area from part b.ii.</>,
  },
  {
    working: <Katex display tex="\boxed{8-6\log_e(3)}" />,
    reason: <>About <Katex tex="1.408" /> square units. No new integral is needed once you see the symmetry.</>,
    more: <>The report notes some students realised the answer was double the previous result: that is the whole one-mark method. Integrating <Katex tex="f(x)-f^{-1}(x)" /> from <Katex tex="-1" /> to <Katex tex="1" /> on CAS gives the same value, but it relies on the correct inverse from b.i.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="D^2 = x^2+\left(\frac{2x+1}{x+2}\right)^2" />,
    reason: <>Squared distance from <Katex tex="(x,f(x))" /> to the origin. The <Katex tex="x" /> minimising <Katex tex="D^2" /> also minimises <Katex tex="D" />, and there is no square root to differentiate.</>,
  },
  {
    working: <Cas fn="solve">solve(d/dx(x² + ((2x+1)/(x+2))²) = 0, x) | x&gt;-2</Cas>,
    reason: <>A minimum is a stationary point. Restrict to <Katex tex="x>-2" />: <Katex tex="P" /> is on the branch shown, right of the asymptote <Katex tex="x=-2" />.</>,
    more: <>Without the restriction the CAS also returns <Katex tex="x=-2-\sqrt3\approx-3.73" />. That gives the point <Katex tex="(-2-\sqrt3,\ 2+\sqrt3)" /> on the <em>other</em> branch of the hyperbola, about <Katex tex="5.28" /> from the origin: the closest point on that branch, not <Katex tex="P" />. The report notes some students did not consider the domain and gave two sets of values for <Katex tex="c" /> and <Katex tex="d" />, or chose the incorrect value for <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c = \sqrt3-2}" />,
    reason: <>About <Katex tex="-0.268" />, just left of the <Katex tex="y" />-axis, where the figure puts <Katex tex="P" />. It is the only stationary point on this branch and <Katex tex="D" /> grows at both ends, so it is the minimum.</>,
    more: <>Why this stationary point is a minimum: on the branch <Katex tex="x>-2" />, <Katex tex="D" /> grows without bound both as <Katex tex="x\to-2^{+}" /> (where <Katex tex="f(x)\to-\infty" />) and as <Katex tex="x\to\infty" />. A smooth function that is large at both ends, with only one stationary point in between, has its minimum there.</>,
  },
  {
    working: <Katex display tex="d = f(\sqrt3-2) = \frac{2\sqrt3-3}{\sqrt3} = 2-\sqrt3" />,
    reason: <>Substitute <Katex tex="c" />: numerator <Katex tex="2(\sqrt3-2)+1=2\sqrt3-3" />, denominator <Katex tex="(\sqrt3-2)+2=\sqrt3" />. Then divide each term by <Katex tex="\sqrt3" />.</>,
    more: <>So <Katex tex="d=-c" />: <Katex tex="P" /> lies on the line <Katex tex="y=-x" />. That is no accident. A hyperbola like this is symmetric about the two lines of gradient <Katex tex="\pm1" /> through its centre <Katex tex="(-2,2)" />. One of them is <Katex tex="y=-x" />, which also passes through the origin, and reflecting in a line through the origin does not change distances from the origin.</>,
  },
  {
    working: <Katex display tex="D = \sqrt{c^2+d^2} = \sqrt{2\left(2-\sqrt3\right)^2} = \sqrt2\left(2-\sqrt3\right)" />,
    reason: <>Since <Katex tex="d=-c" />, <Katex tex="c^2+d^2=2d^2" />, and <Katex tex="2-\sqrt3>0" /> comes out of the root.</>,
  },
  {
    working: <Katex display tex="\boxed{D = 2\sqrt2-\sqrt6}" />,
    reason: <>The minimum distance, exact (about <Katex tex="0.379" />). The question asks for <Katex tex="c" />, <Katex tex="d" /> <em>and</em> this distance.</>,
    more: <>The report notes some students had the correct <Katex tex="c" /> and <Katex tex="d" /> but did not work out the minimum distance, and some did not give exact values.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } -k<x_1<x_2" />,
    reason: <>The proof must work for <em>every</em> pair in the domain, so take a general pair and show <Katex tex="g(x_2)-g(x_1)>0" />.</>,
    more: <>The report notes some students just substituted in specific values, which was not acceptable: checking a few pairs can never cover all of them.</>,
  },
  {
    working: <Katex display tex="g(x_2)-g(x_1) = \frac{kx_2+1}{x_2+k}-\frac{kx_1+1}{x_1+k}" />,
    reason: <>Write out the difference of the two outputs.</>,
  },
  {
    working: <Katex display tex="= \frac{(kx_2+1)(x_1+k)-(kx_1+1)(x_2+k)}{(x_1+k)(x_2+k)}" />,
    reason: <>Common denominator.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\text{numerator} &= (kx_1x_2+k^2x_2+x_1+k)\\ &\quad-(kx_1x_2+k^2x_1+x_2+k)\\ &= k^2(x_2-x_1)-(x_2-x_1)\\ &= (x_2-x_1)(k^2-1)\end{aligned}"
      />
    ),
    reason: <>Expand both products: the <Katex tex="kx_1x_2" /> and <Katex tex="k" /> terms cancel, and <Katex tex="x_2-x_1" /> factors out.</>,
  },
  {
    working: <Katex display tex="g(x_2)-g(x_1) = \frac{(x_2-x_1)(k^2-1)}{(x_1+k)(x_2+k)}" />,
    reason: <>Now show each of the four factors is positive.</>,
  },
  {
    working: <Katex display tex="x_2-x_1>0,\quad k^2-1>0" />,
    reason: <>Both come from the question: <Katex tex="x_2>x_1" />, and <Katex tex="k>1" /> so <Katex tex="k^2>1" />.</>,
  },
  {
    working: <Katex display tex="x_1,x_2>-k \implies x_1+k>0 \text{ and } x_2+k>0" />,
    reason: <>Both points are in the domain <Katex tex="(-k,\infty)" />.</>,
  },
  {
    working: <Katex display tex="g(x_2)-g(x_1)>0 \implies g(x_1)<g(x_2)" />,
    reason: <>A positive over a positive is positive. So <Katex tex="x_1<x_2" /> implies <Katex tex="g(x_1)<g(x_2)" />, as required.</>,
    more: <>The report notes many students did not attempt this question (90% scored 0), yet it is one subtraction, one expansion and four sign checks.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{kx+1}{x+k} = -x" />,
    reason: <>At an intersection the two rules are equal.</>,
    more: <>On CAS, <Cas fn="solve">solve((k·x+1)/(x+k) = -x, x) | x&gt;-k</Cas> gives the answer directly. Type <Katex tex="k\cdot x" /> with a multiplication sign: the report notes some students did not, and the CAS then reads <Katex tex="kx" /> as a single new variable.</>,
  },
  {
    working: <Katex display tex="kx+1 = -x^2-kx \implies x^2+2kx+1 = 0" />,
    reason: <>Multiply both sides by <Katex tex="x+k" /> and collect everything on one side.</>,
  },
  {
    working: <Katex display tex="x = \frac{-2k\pm\sqrt{4k^2-4}}{2} = -k\pm\sqrt{k^2-1}" />,
    reason: <>Quadratic formula, then <Katex tex="\sqrt{4k^2-4}=2\sqrt{k^2-1}" />. Both roots are real because <Katex tex="k>1" />.</>,
  },
  {
    working: <Katex display tex="x>-k \implies x = -k+\sqrt{k^2-1}" />,
    reason: <>The domain of <Katex tex="g" /> is <Katex tex="(-k,\infty)" />. Only the root with <Katex tex="+\sqrt{k^2-1}" /> is greater than <Katex tex="-k" />.</>,
    more: <>The other root, <Katex tex="-k-\sqrt{k^2-1}" />, is left of the asymptote <Katex tex="x=-k" />. That is where <Katex tex="y=-x" /> meets the other branch of the hyperbola <Katex tex="y=\tfrac{kx+1}{x+k}" />, which is not part of <Katex tex="g" />. The report notes some students did not consider the domain and chose the incorrect value for <Katex tex="x" />; others gave two sets of coordinates.</>,
  },
  {
    working: <Katex display tex="\boxed{X = \left(-k+\sqrt{k^2-1},\ k-\sqrt{k^2-1}\right)}" />,
    reason: <>The <Katex tex="y" />-coordinate is <Katex tex="-x" />, since <Katex tex="X" /> lies on <Katex tex="y=-x" />.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="-k+\sqrt{k^2-1} = -\frac12" />,
    reason: <>Set the <Katex tex="x" />-coordinate from part e.i. equal to <Katex tex="-\tfrac12" />. The <Katex tex="y" />-coordinate then matches automatically.</>,
  },
  {
    working: <Katex display tex="\sqrt{k^2-1} = k-\frac12" />,
    reason: <>Isolate the square root. The right side is positive since <Katex tex="k>1" />, so squaring adds no false solutions.</>,
  },
  {
    working: <Katex display tex="k^2-1 = k^2-k+\frac14" />,
    reason: <>Square both sides. The <Katex tex="k^2" /> terms cancel, leaving a linear equation.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac54}" />,
    reason: <>From <Katex tex="-1=-k+\tfrac14" />. Check: with <Katex tex="k=\tfrac54" />, <Katex tex="g\!\left(-\tfrac12\right)=\tfrac12" /> ✓.</>,
    more: <>The check in full: <Katex tex="g\!\left(-\tfrac12\right)=\tfrac{-5/8+1}{-1/2+5/4}=\tfrac{3/8}{3/4}=\tfrac12" />. Solving <Katex tex="g\!\left(-\tfrac12\right)=\tfrac12" /> for <Katex tex="k" /> is itself a valid method, and the report notes students who used it were successful: <Katex tex="\tfrac{-k/2+1}{k-1/2}=\tfrac12" /> gives <Katex tex="-k+2=k-\tfrac12" />, so <Katex tex="k=\tfrac54" />.</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: <Katex display tex="YZ = \sqrt{2^2+2^2} = 2\sqrt2" />,
    reason: <>Take <Katex tex="YZ" />, from <Katex tex="Z(-1,-1)" /> to <Katex tex="Y(1,1)" />, as the base. It does not depend on <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\text{height} = OX" />,
    reason: <><Katex tex="YZ" /> lies on <Katex tex="y=x" />, and <Katex tex="X" /> lies on <Katex tex="y=-x" />, which is perpendicular to it through <Katex tex="O" />. So the height from <Katex tex="X" /> to <Katex tex="YZ" /> is <Katex tex="OX" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}OX &= \sqrt{\left(-k+\sqrt{k^2-1}\right)^2+\left(k-\sqrt{k^2-1}\right)^2}\\ &= \sqrt2\left(k-\sqrt{k^2-1}\right)\end{aligned}"
      />
    ),
    reason: <>Using <Katex tex="X" /> from part e.i. Both squares equal <Katex tex="\left(k-\sqrt{k^2-1}\right)^2" />, and <Katex tex="k-\sqrt{k^2-1}>0" />, so it comes out of the root.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\text{Area} &= \tfrac12\times2\sqrt2\times\sqrt2\left(k-\sqrt{k^2-1}\right)\\ &= 2\left(k-\sqrt{k^2-1}\right)\end{aligned}"
      />
    ),
    reason: <><Katex tex="\tfrac12\times\text{base}\times\text{height}" />; the two <Katex tex="\sqrt2" />s multiply to <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="s(k) = 4\left(k-\sqrt{k^2-1}\right)^2" />,
    reason: <>The question defines <Katex tex="s(k)" /> as the <em>square</em> of the area.</>,
  },
  {
    working: <Katex display tex="s(k)\ge1 \iff k-\sqrt{k^2-1}\ge\frac12" />,
    reason: <>The area <Katex tex="2\left(k-\sqrt{k^2-1}\right)" /> is positive, so its square is at least <Katex tex="1" /> exactly when the area is at least <Katex tex="1" />.</>,
    more: <>On CAS, <Cas fn="solve">solve(4(k-√(k²-1))² ≥ 1, k) | k&gt;1</Cas> gives the answer directly. The algebra below shows where it comes from.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\sqrt{k^2-1}&\le k-\tfrac12\\ k^2-1&\le k^2-k+\tfrac14\\ k&\le\tfrac54\end{aligned}" />,
    reason: <>Rearrange to isolate the root. Both sides are positive, so squaring keeps the inequality. The <Katex tex="k^2" /> terms cancel, as in part e.ii.</>,
    more: <>This fits part e.ii.: at <Katex tex="k=\tfrac54" />, <Katex tex="X=\left(-\tfrac12,\tfrac12\right)" />, <Katex tex="OX=\tfrac{\sqrt2}{2}" />, the area is <Katex tex="\tfrac12\times2\sqrt2\times\tfrac{\sqrt2}{2}=1" /> and <Katex tex="s=1" />. As <Katex tex="k" /> increases, <Katex tex="X" /> slides towards <Katex tex="O" /> and the triangle shrinks, so <Katex tex="s(k)\ge1" /> for the smaller values of <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{1<k\le\frac54}" />,
    reason: <>Combine with the given <Katex tex="k>1" />, so the left end is strict. The right end is included because <Katex tex="s\!\left(\tfrac54\right)=1" />.</>,
    more: <>The report notes some students had <Katex tex="1\le k\le\tfrac54" />. But <Katex tex="k=1" /> is not allowed: the question gives <Katex tex="k>1" />, and at <Katex tex="k=1" />, <Katex tex="\tfrac{x+1}{x+1}" /> is just the constant <Katex tex="1" />, not a hyperbola.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{kx+1}{x+k} = x \implies x^2 = 1 \implies x = \pm1" />,
    reason: <>The region's ends: <Katex tex="kx+1=x^2+kx" />, and the <Katex tex="kx" /> terms cancel, so the ends are <Katex tex="x=\pm1" /> for <em>every</em> <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="A(k) = \int_{-1}^{1}\bigl(g(x)-x\bigr)dx" />,
    reason: <>Top minus bottom between the intersections: <Katex tex="g" /> is above <Katex tex="y=x" /> there, since <Katex tex="g(0)=\tfrac1k>0" />.</>,
    more: <>Use <Katex tex="g" />, not <Katex tex="f" />: the report notes <Katex tex="\int_{-1}^{1}\bigl(f(x)-x\bigr)dx" /> was sometimes given, and that is just the one number from part b.ii. (the case <Katex tex="k=2" />), with no <Katex tex="k" /> in it. The report also notes attempts at <Katex tex="\int_{1}^{\infty}" />: but the region runs from <Katex tex="x=-1" /> to <Katex tex="x=1" />, and beyond <Katex tex="x=1" /> the curve is below the line, so that integral is not this region at all.</>,
  },
  {
    working: <Katex display tex="g(x) = k+\frac{1-k^2}{x+k}" />,
    reason: <>The same rewrite as part a., so <Katex tex="g" /> can be antidifferentiated. Check: <Katex tex="k(x+k)+1-k^2=kx+1" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\int\bigl(g(x)-x\bigr)dx\\ &= kx+\left(1-k^2\right)\log_e(x+k)-\frac{x^2}{2}\end{aligned}" />,
    reason: <><Katex tex="x+k>0" /> on <Katex tex="[-1,1]" /> because <Katex tex="k>1" />, so no absolute value is needed.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}A(k) &= \left(k+(1-k^2)\log_e(k+1)-\tfrac12\right)\\ &\quad-\left(-k+(1-k^2)\log_e(k-1)-\tfrac12\right)\end{aligned}"
      />
    ),
    reason: <>Upper terminal <Katex tex="x=1" /> minus lower terminal <Katex tex="x=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A(k) = 2k+\left(k^2-1\right)\log_e\!\left(\frac{k-1}{k+1}\right)}" />,
    reason: <>The <Katex tex="\tfrac12" />s cancel, and <Katex tex="(1-k^2)\bigl(\log_e(k+1)-\log_e(k-1)\bigr)=(k^2-1)\log_e\tfrac{k-1}{k+1}" />.</>,
    more: <>Check: <Katex tex="k=2" /> gives <Katex tex="4+3\log_e\tfrac13=4-3\log_e(3)" />, the area from part b.ii., because <Katex tex="g" /> with <Katex tex="k=2" /> is <Katex tex="f" />. The equivalent form <Katex tex="2k+(1-k^2)\log_e\!\left(\tfrac{k+1}{k-1}\right)" /> is also correct. The report notes some broke the area up into different sections and were successful, but this would have been time consuming.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="g(x)>x \text{ on } (-1,1) \implies A(k)>0" />,
    reason: <>They meet only at <Katex tex="x=\pm1" />, and <Katex tex="g(0)=\tfrac1k>0" />, so <Katex tex="g" /> is above the line between them: the region has positive area.</>,
  },
  {
    working: <Katex display tex="g(x)\le g(1)=1 \text{ on } [-1,1]" />,
    reason: <>By part d., <Katex tex="g" /> is increasing, so <Katex tex="g(x)\le g(1)" /> for <Katex tex="x\le1" />. So the region never rises above the line <Katex tex="y=1" />.</>,
  },
  {
    working: <Katex display tex="\text{region} \subset \{\,x\ge-1,\ y\le1,\ y\ge x\,\}" />,
    reason: <>The region lies right of <Katex tex="x=-1" />, below <Katex tex="y=1" /> and above <Katex tex="y=x" />: inside the triangle with vertices <Katex tex="(-1,-1)" />, <Katex tex="(1,1)" />, <Katex tex="(-1,1)" />.</>,
  },
  {
    working: <Katex display tex="\text{area of triangle} = \frac12\times2\times2 = 2" />,
    reason: <>A right-angled triangle: both legs (along <Katex tex="x=-1" /> and along <Katex tex="y=1" />) have length <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0<A(k)<2 \text{ for all } k>1}" />,
    reason: <>At <Katex tex="x=-1" /> the curve is at <Katex tex="y=-1" />, far below <Katex tex="y=1" />, so the corner of the triangle near <Katex tex="(-1,1)" /> is left empty: <Katex tex="A(k)<2" />. As required.</>,
    more: <>This is the report's argument. Neither bound can be improved: as <Katex tex="k\to1^{+}" />, <Katex tex="g" /> flattens towards <Katex tex="y=1" /> and <Katex tex="A(k)\to2" />; as <Katex tex="k\to\infty" />, <Katex tex="g" /> hugs <Katex tex="y=x" /> and <Katex tex="A(k)\to0" />. The report notes many students did not attempt this question, yet no integration is needed.</>,
  },
]

export default function MethodsQ4_2016Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (21 marks)</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background title="How this question is built">
            <p>
              The longest question on the paper, in two halves: parts a.–c. on the single
              hyperbola <Katex tex="f(x)=\tfrac{2x+1}{x+2}" />, then parts d.–f. on the whole
              family <Katex tex="g(x)=\tfrac{kx+1}{x+k}" /> that contains it (<Katex tex="f" /> is
              the case <Katex tex="k=2" />).
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Rational Function"
        marks={2}
        statement={
          <>
            Express <Katex tex="\dfrac{2x+1}{x+2}" /> in the form{' '}
            <Katex tex="a+\dfrac{b}{x+2}" />, where <Katex tex="a" /> and <Katex tex="b" />{' '}
            are non-zero integers.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Why this form matters">
          <p>
            <Katex tex="\dfrac{2x+1}{x+2}" /> cannot be antidifferentiated as it stands. Split
            off the constant and what remains is <Katex tex="\dfrac{b}{x+2}" />, whose
            antiderivative is a logarithm.
          </p>
          <p>
            Every integral in this question (parts b.ii. and f.i.) goes through this
            rewrite. It also hands you both asymptotes for free.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Inverse Function"
        marks={2}
        statement={
          <>
            Let <Katex tex="f:R\setminus\{-2\}\to R" />,{' '}
            <Katex tex="f(x)=\dfrac{2x+1}{x+2}" />. Find the rule and domain of{' '}
            <Katex tex="f^{-1}" />, the inverse function of <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Part of the graphs of <Katex tex="f" /> and <Katex tex="y=x" /> are shown in the
          diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={biiSrc}
            alt="The hyperbola y = f(x) and the line y = x crossing at (−1, −1) and (1, 1), with the lens-shaped region between them shaded — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard letter="b.ii" topic="Area Between Curves" marks={1} statement={<>Find the area of the shaded region.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Part of the graphs of <Katex tex="f" /> and <Katex tex="f^{-1}" /> are shown in the
          diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={biiiSrc}
            alt="The graphs of f and its inverse crossing at (−1, −1) and (1, 1), with the region between them shaded — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard letter="b.iii" topic="Area Between Curves" marks={1} statement={<>Find the area of the shaded region.</>} examinerReport={EXAM_BIII}>
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Part of the graph of <Katex tex="f" /> is shown in the diagram below. The point{' '}
          <Katex tex="P(c,d)" /> is on the graph of <Katex tex="f" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={pointSrc}
            alt="The right-hand branch of y = f(x) rising through the x-intercept at −1/2 towards the asymptote y = 2, with the point P(c, d) marked just above and left of the origin — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="c"
        topic="Minimum Distance"
        marks={3}
        statement={
          <>
            Find the exact values of <Katex tex="c" /> and <Katex tex="d" /> such that the
            distance of this point to the origin is a minimum, and find this minimum
            distance.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="The closest point is where a circle centred at O just touches the curve">
          <ClosestWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g:(-k,\infty)\to R" />, <Katex tex="g(x)=\dfrac{kx+1}{x+k}" />,
          where <Katex tex="k>1" />.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Increasing Function"
        marks={2}
        statement={
          <>
            Show that <Katex tex="x_1<x_2" /> implies that{' '}
            <Katex tex="g(x_1)<g(x_2)" />, where <Katex tex="x_1\in(-k,\infty)" /> and{' '}
            <Katex tex="x_2\in(-k,\infty)" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="Proving a function is increasing">
          <p>
            Two routes work. Differentiate and show <Katex tex="g'>0" />, or compare two
            outputs directly and show <Katex tex="g(x_2)-g(x_1)>0" />. The second is what
            the wording here points at, and it avoids the quotient rule entirely.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e.i"
        topic="Intersections"
        marks={2}
        statement={
          <>
            Let <Katex tex="X" /> be the point of intersection of the graphs of{' '}
            <Katex tex="y=g(x)" /> and <Katex tex="y=-x" />. Find the coordinates of{' '}
            <Katex tex="X" /> in terms of <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
        <Explore title="The second root lies on the other branch, outside the domain of g">
          <BranchWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Find Parameter"
        marks={2}
        statement={
          <>
            Find the value of <Katex tex="k" /> for which the coordinates of{' '}
            <Katex tex="X" /> are <Katex tex="\left(-\tfrac12,\tfrac12\right)" />.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Let <Katex tex="Z(-1,-1)" />, <Katex tex="Y(1,1)" /> and <Katex tex="X" /> be the
          vertices of the triangle <Katex tex="XYZ" />. Let <Katex tex="s(k)" /> be the
          square of the area of triangle <Katex tex="XYZ" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={triangleSrc}
            alt="The curve y = g(x) and the line y = x, with Z at (−1, −1), Y at (1, 1) and X on the curve to the upper left of the line — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="e.iii"
        topic="Inequality"
        marks={2}
        statement={
          <>
            Find the values of <Katex tex="k" /> such that <Katex tex="s(k)\ge1" />.
          </>
        }
        examinerReport={EXAM_EIII}
      >
        <WorkingTable rows={ROWS_EIII} />
        <Explore title="A larger k pulls X towards O and shrinks the triangle">
          <TriangleWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The graph of <Katex tex="g" /> and the line <Katex tex="y=x" /> enclose a region of
          the plane. The region is shown shaded in the diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={regionSrc}
            alt="The curve y = g(x) above the line y = x between their intersections at (−1, −1) and (1, 1), with the enclosed region shaded — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
        <p className="mt-3">
          Let <Katex tex="A(k)" /> be the rule of the function <Katex tex="A" /> that gives the
          area of this enclosed region. The domain of <Katex tex="A" /> is{' '}
          <Katex tex="(1,\infty)" />.
        </p>
      </div>

      <PartCard letter="f.i" topic="Area Function" marks={2} statement={<>Give the rule for <Katex tex="A(k)" />.</>} examinerReport={EXAM_FI}>
        <WorkingTable rows={ROWS_FI} />
        <Explore title="The terminals stay at −1 and 1, but the area changes with k">
          <AreaWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Bounding an Area"
        marks={2}
        statement={
          <>
            Show that <Katex tex="0<A(k)<2" /> for all <Katex tex="k>1" />.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <Background title="Bound the region, not the formula">
          <p>
            <Katex tex="A(k)=2k+(k^2-1)\log_e\!\left(\tfrac{k-1}{k+1}\right)" /> is not
            something you want to bound algebraically — the two terms both blow up and very
            nearly cancel.
          </p>
          <p>
            Instead, bound the <em>region</em>. It sits between <Katex tex="y=x" /> and{' '}
            <Katex tex="y=g(x)\le1" />, to the right of <Katex tex="x=-1" />. Those three
            lines enclose a triangle of area <Katex tex="2" />, and the region fits inside
            it for every <Katex tex="k" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FII} />
        <Explore title="For every k, the region fits inside a triangle of area 2">
          <BoundWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
