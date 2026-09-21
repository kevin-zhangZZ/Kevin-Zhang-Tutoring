// 2016 Mathematical Methods — Exam 2, Section B, Question 4 (21 marks).
// f(x) = (2x+1)/(x+2) and its inverse, a minimum distance to the origin, then the family
// g(x) = (kx+1)/(x+k): a monotonicity proof, an intersection, a triangle area, and a
// bounded area function. Parts (d), (e)(iii) and (f)(ii) were among the least-answered
// on the paper. Question text transcribed from the original paper; the figures are crops
// of VCAA's own artwork. Answers verified with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import biiSrc from './meth-2016exam2-q4bii-shaded.png'
import biiiSrc from './meth-2016exam2-q4biii-shaded.png'
import pointSrc from './meth-2016exam2-q4c-point.png'
import triangleSrc from './meth-2016exam2-q4eiii-triangle.png'
import regionSrc from './meth-2016exam2-q4f-region.png'

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
      gave two sets of values for <Katex tex="c" /> and <Katex tex="d" />, or chose the
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
      <Katex tex="\int_{1}^{\infty}" />.
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
    reason: <>Force the numerator to contain a copy of the denominator: <Katex tex="2(x+2)=2x+4" />, and <Katex tex="2x+1" /> is <Katex tex="3" /> less than that.</>,
  },
  {
    working: <Katex display tex="\boxed{2+\frac{-3}{x+2}}" />,
    reason: <>So <Katex tex="a=2" /> and <Katex tex="b=-3" />. This form is worth the two marks twice over: it makes the asymptotes <Katex tex="y=2" /> and <Katex tex="x=-2" /> visible, and it makes every integral in part (b) doable.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="x = \frac{2y+1}{y+2}" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then make <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x(y+2) = 2y+1 \implies xy+2x = 2y+1" />,
    reason: <>Clearing the fraction.</>,
  },
  {
    working: <Katex display tex="y(x-2) = 1-2x \implies y = \frac{1-2x}{x-2}" />,
    reason: <>Collecting the <Katex tex="y" /> terms on one side.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \frac{-3}{x-2}-2}" />,
    reason: <>The same expression in part (a)'s form — check by expanding: <Katex tex="\tfrac{-3-2(x-2)}{x-2}=\tfrac{1-2x}{x-2}" /> ✓. Either form was accepted.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dom}(f^{-1}) = \text{ran}(f) = R\setminus\{2\}}" />,
    reason: <>The horizontal asymptote of <Katex tex="f" /> is <Katex tex="y=2" />, so <Katex tex="2" /> is the one output <Katex tex="f" /> never produces. Half the marks were for stating this.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{2x+1}{x+2} = x \implies 2x+1 = x^2+2x" />,
    reason: <>Finding where the curve meets <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="x^2 = 1 \implies x = \pm1" />,
    reason: <>The <Katex tex="2x" /> terms cancel, leaving something remarkably clean.</>,
  },
  {
    working: <Katex display tex="A = \int_{-1}^{1}\bigl(f(x)-x\bigr)dx" />,
    reason: <>Between the intersections <Katex tex="f" /> is above <Katex tex="y=x" /> — check at <Katex tex="x=0" />: <Katex tex="f(0)=\tfrac12>0" />.</>,
  },
  {
    working: <Katex display tex="= \int_{-1}^{1}\left(2-\frac{3}{x+2}-x\right)dx" />,
    reason: <>Using part (a). Without that rewrite there is no antiderivative to write down.</>,
  },
  {
    working: <Katex display tex="= \left[2x-3\log_e(x+2)-\frac{x^2}{2}\right]_{-1}^{1}" />,
    reason: <>Note <Katex tex="x+2>0" /> throughout <Katex tex="[-1,1]" />, so no absolute values are needed.</>,
  },
  {
    working: <Katex display tex="= \left(2-3\log_e3-\tfrac12\right)-\left(-2-0-\tfrac12\right)" />,
    reason: <><Katex tex="\log_e(1)=0" /> at the lower terminal.</>,
  },
  {
    working: <Katex display tex="\boxed{4-3\log_e(3)}" />,
    reason: <>About <Katex tex="0.704" />. Exact was required, and the report notes the base going missing from students' logs.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="f^{-1} \text{ is the reflection of } f \text{ in } y=x" />,
    reason: <>So the region between <Katex tex="f" /> and <Katex tex="f^{-1}" /> is symmetric about that line, and each half is the region from part (b)(ii).</>,
  },
  {
    working: <Katex display tex="A = 2\int_{-1}^{1}\bigl(f(x)-x\bigr)dx" />,
    reason: <>Both curves pass through <Katex tex="(-1,-1)" /> and <Katex tex="(1,1)" />, which are the same two intersection points as before.</>,
  },
  {
    working: <Katex display tex="\boxed{8-6\log_e(3)}" />,
    reason: <>Exactly double part (b)(ii), about <Katex tex="1.408" /> — and no integration at all is needed once you spot the symmetry.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="D^2 = x^2+\left(\frac{2x+1}{x+2}\right)^2" />,
    reason: <>Distance from <Katex tex="(x,f(x))" /> to the origin. Minimising <Katex tex="D^2" /> gives the same <Katex tex="x" /> as minimising <Katex tex="D" />, and avoids a square root throughout.</>,
  },
  {
    working: <Cas fn="solve">solve(d/dx(x² + ((2x+1)/(x+2))²) = 0, x) | -2&lt;x&lt;∞</Cas>,
    reason: <>The domain restriction matters: the CAS returns <Katex tex="x=-2-\sqrt3" /> as well, which is on the <em>other</em> branch of the hyperbola and is not the point in the figure. The report says ignoring the domain was the main error.</>,
  },
  {
    working: <Katex display tex="\boxed{c = \sqrt3-2}" />,
    reason: <>About <Katex tex="-0.268" />, which is where the figure puts <Katex tex="P" /> — just left of the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="d = f(\sqrt3-2) = \frac{2\sqrt3-3}{\sqrt3} = 2-\sqrt3" />,
    reason: <>The denominator is <Katex tex="(\sqrt3-2)+2=\sqrt3" />, which is why this comes out so neatly. So <Katex tex="d=-c" /> — the closest point lies on the line <Katex tex="y=-x" />, as it must, since the hyperbola is symmetric about that line here.</>,
  },
  {
    working: <Katex display tex="D = \sqrt{c^2+d^2} = \sqrt{2\left(2-\sqrt3\right)^2} = \sqrt2\left(2-\sqrt3\right)" />,
    reason: <>Using <Katex tex="d=-c" />, so <Katex tex="c^2+d^2=2d^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{D = 2\sqrt2-\sqrt6}" />,
    reason: <>About <Katex tex="0.379" />. The report notes students who found <Katex tex="c" /> and <Katex tex="d" /> and then stopped — the question asks for the distance too.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g(x_2)-g(x_1) = \frac{kx_2+1}{x_2+k}-\frac{kx_1+1}{x_1+k}" />,
    reason: <>Comparing two outputs directly. Substituting particular numbers proves nothing — the report is explicit that it earned no marks.</>,
  },
  {
    working: <Katex display tex="= \frac{(kx_2+1)(x_1+k)-(kx_1+1)(x_2+k)}{(x_1+k)(x_2+k)}" />,
    reason: <>Common denominator.</>,
  },
  {
    working: <Katex display tex="\text{numerator} = k^2x_2+x_1-k^2x_1-x_2 = (x_2-x_1)(k^2-1)" />,
    reason: <>The <Katex tex="kx_1x_2" /> and <Katex tex="k" /> terms cancel, leaving a clean factorisation. This is the step the whole proof turns on.</>,
  },
  {
    working: <Katex display tex="g(x_2)-g(x_1) = \frac{(x_2-x_1)(k^2-1)}{(x_1+k)(x_2+k)}" />,
    reason: <>Now check the sign of each of the three factors.</>,
  },
  {
    working: <Katex display tex="x_2>x_1 \implies x_2-x_1>0; \quad k>1 \implies k^2-1>0" />,
    reason: <>Given in the question.</>,
  },
  {
    working: <Katex display tex="x_1,x_2\in(-k,\infty) \implies x_1+k>0 \text{ and } x_2+k>0" />,
    reason: <>The domain was chosen precisely so the denominator is positive.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x_2)-g(x_1)>0 \implies g(x_1)<g(x_2)}" />,
    reason: <>Positive over positive. Only <Katex tex="10\%" /> of students scored anything here, but the argument is four lines of algebra and three sign checks.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{kx+1}{x+k} = -x" />,
    reason: <>Setting the two rules equal.</>,
  },
  {
    working: <Katex display tex="kx+1 = -x^2-kx \implies x^2+2kx+1 = 0" />,
    reason: <>Clearing the fraction and collecting.</>,
  },
  {
    working: <Katex display tex="x = \frac{-2k\pm\sqrt{4k^2-4}}{2} = -k\pm\sqrt{k^2-1}" />,
    reason: <>Quadratic formula. Real because <Katex tex="k>1" />.</>,
  },
  {
    working: <Katex display tex="x>-k \implies x = -k+\sqrt{k^2-1}" />,
    reason: <>The domain of <Katex tex="g" /> is <Katex tex="(-k,\infty)" />, which rules out the negative root. The report says ignoring this, or giving both, was the usual error.</>,
  },
  {
    working: <Katex display tex="\boxed{X = \left(-k+\sqrt{k^2-1},\ k-\sqrt{k^2-1}\right)}" />,
    reason: <>The <Katex tex="y" />-coordinate is just <Katex tex="-x" />, since <Katex tex="X" /> lies on <Katex tex="y=-x" />.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="-k+\sqrt{k^2-1} = -\frac12" />,
    reason: <>Matching the <Katex tex="x" />-coordinate from part (e)(i).</>,
  },
  {
    working: <Katex display tex="\sqrt{k^2-1} = k-\frac12" />,
    reason: <>Rearranging. The right-hand side is positive since <Katex tex="k>1" />, so squaring is safe.</>,
  },
  {
    working: <Katex display tex="k^2-1 = k^2-k+\frac14" />,
    reason: <>Squaring. The <Katex tex="k^2" /> terms cancel, which is why this is a linear equation in disguise.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac54}" />,
    reason: <>From <Katex tex="-1=-k+\tfrac14" />. Check: <Katex tex="g\!\left(-\tfrac12\right)=\tfrac{-5/8+1}{-1/2+5/4}=\tfrac{3/8}{3/4}=\tfrac12" /> ✓ — which is also the alternative route the report mentions.</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: <Katex display tex="YZ = \sqrt{2^2+2^2} = 2\sqrt2" />,
    reason: <>From <Katex tex="Z(-1,-1)" /> to <Katex tex="Y(1,1)" />. Take this as the base — it lies along the line <Katex tex="y=x" />, which makes the height easy.</>,
  },
  {
    working: <Katex display tex="\text{height} = \frac{|x_X-y_X|}{\sqrt2} = \frac{\left|\left(-k+\sqrt{k^2-1}\right)-\left(k-\sqrt{k^2-1}\right)\right|}{\sqrt2}" />,
    reason: <>The perpendicular distance from <Katex tex="X" /> to the line <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="= \frac{2\left(k-\sqrt{k^2-1}\right)}{\sqrt2} = \sqrt2\left(k-\sqrt{k^2-1}\right)" />,
    reason: <><Katex tex="k>\sqrt{k^2-1}" /> for <Katex tex="k>1" />, so the modulus opens this way.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \frac12\times2\sqrt2\times\sqrt2\left(k-\sqrt{k^2-1}\right) = 2\left(k-\sqrt{k^2-1}\right)" />,
    reason: <>The two <Katex tex="\sqrt2" />s multiply to <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="s(k) = 4\left(k-\sqrt{k^2-1}\right)^2" />,
    reason: <>Squaring the area, as the question defines it.</>,
  },
  {
    working: <Katex display tex="s(k)\ge1 \iff k-\sqrt{k^2-1}\ge\frac12" />,
    reason: <>Taking square roots; both sides are positive.</>,
  },
  {
    working: <Katex display tex="\sqrt{k^2-1}\le k-\frac12 \implies k^2-1\le k^2-k+\frac14 \implies k\le\frac54" />,
    reason: <>The same cancellation as part (e)(ii).</>,
  },
  {
    working: <Katex display tex="\boxed{1<k\le\frac54}" />,
    reason: <>The left end is strict because <Katex tex="k>1" /> was given. The report notes students writing <Katex tex="1\le k" />, which would include <Katex tex="k=1" /> and collapse <Katex tex="X" /> onto <Katex tex="(-1,1)" />.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{kx+1}{x+k} = x \implies x^2 = 1 \implies x = \pm1" />,
    reason: <>The curve meets <Katex tex="y=x" /> at <Katex tex="(-1,-1)" /> and <Katex tex="(1,1)" /> — for <em>every</em> <Katex tex="k" />, since the <Katex tex="kx" /> terms cancel.</>,
  },
  {
    working: <Katex display tex="A(k) = \int_{-1}^{1}\bigl(g(x)-x\bigr)dx" />,
    reason: <>Fixed terminals, and <Katex tex="g" /> above <Katex tex="y=x" /> in between (check <Katex tex="g(0)=\tfrac1k>0" />). Using <Katex tex="f" /> instead of <Katex tex="g" /> gives an answer with no <Katex tex="k" /> in it, which the report flags.</>,
  },
  {
    working: <Katex display tex="g(x) = k+\frac{1-k^2}{x+k}" />,
    reason: <>The same rewrite as part (a): <Katex tex="k(x+k)+1-k^2=kx+1" /> ✓.</>,
  },
  {
    working: <Katex display tex="\int\bigl(g(x)-x\bigr)dx = kx+\left(1-k^2\right)\log_e(x+k)-\frac{x^2}{2}" />,
    reason: <><Katex tex="x+k>0" /> on <Katex tex="[-1,1]" /> because <Katex tex="k>1" />, so no absolute values.</>,
  },
  {
    working: <Katex display tex="\boxed{A(k) = 2k+\left(k^2-1\right)\log_e\!\left(\frac{k-1}{k+1}\right)}" />,
    reason: <>The <Katex tex="x^2/2" /> terms cancel and the two logs combine. Note <Katex tex="\tfrac{k-1}{k+1}<1" />, so the log is negative and pulls the answer below <Katex tex="2k" />.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="g(x)>x \text{ on } (-1,1)" />,
    reason: <>They meet only at <Katex tex="x=\pm1" />, and <Katex tex="g(0)=\tfrac1k>0" />, so <Katex tex="g" /> stays above the line in between. An integral of a strictly positive function over an interval of positive length is positive, so <Katex tex="A(k)>0" />.</>,
  },
  {
    working: <Katex display tex="g \text{ increasing and } g(1)=1 \implies g(x)\le1 \text{ on } [-1,1]" />,
    reason: <>From part (d). So the region never rises above the line <Katex tex="y=1" />.</>,
  },
  {
    working: <Katex display tex="\text{region} \subset \{\,x\ge-1,\ y\le1,\ y\ge x\,\}" />,
    reason: <>Three straight boundaries, which enclose a triangle with vertices <Katex tex="(-1,-1)" />, <Katex tex="(1,1)" /> and <Katex tex="(-1,1)" />.</>,
  },
  {
    working: <Katex display tex="\text{area of triangle} = \frac12\times2\times2 = 2" />,
    reason: <>Both legs have length <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0<A(k)<2 \text{ for all } k>1}" />,
    reason: <>The inequality is strict at the top because the curve is strictly below <Katex tex="y=1" /> except at the single point <Katex tex="x=1" />. Only <Katex tex="6\%" /> of students scored anything here — and the argument needs no integration at all.</>,
  },
]

export default function MethodsQ4_2016Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (21 marks)</p>
        <p>
          The longest question on the paper, built in two halves: parts (a)–(c) on the single
          hyperbola <Katex tex="f(x)=\tfrac{2x+1}{x+2}" />, then parts (d)–(f) on the whole
          family <Katex tex="g(x)=\tfrac{kx+1}{x+k}" /> that contains it.
        </p>
      </div>

      <PartCard
        letter="a"
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
            Every integral in this question — parts (b)(ii), (b)(iii) and (f)(i) — goes
            through this rewrite. It also hands you both asymptotes for free.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
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
          <img
            src={biiSrc}
            alt="The hyperbola y = f(x) and the line y = x crossing at (−1, −1) and (1, 1), with the lens-shaped region between them shaded — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard letter="b.ii" marks={1} statement={<>Find the area of the shaded region.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Part of the graphs of <Katex tex="f" /> and <Katex tex="f^{-1}" /> are shown in the
          diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={biiiSrc}
            alt="The graphs of f and its inverse crossing at (−1, −1) and (1, 1), with the region between them shaded — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard letter="b.iii" marks={1} statement={<>Find the area of the shaded region.</>} examinerReport={EXAM_BIII}>
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Part of the graph of <Katex tex="f" /> is shown in the diagram below. The point{' '}
          <Katex tex="P(c,d)" /> is on the graph of <Katex tex="f" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={pointSrc}
            alt="The right-hand branch of y = f(x) rising through the x-intercept at −1/2 towards the asymptote y = 2, with the point P(c, d) marked just above and left of the origin — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="c"
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
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g:(-k,\infty)\to R" />, <Katex tex="g(x)=\dfrac{kx+1}{x+k}" />,
          where <Katex tex="k>1" />.
        </p>
      </div>

      <PartCard
        letter="d"
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
          <p>
            Either way, the proof has to hold for <em>all</em> <Katex tex="x_1<x_2" /> in the
            domain. Testing a few numbers is not a proof — the report says that earned
            nothing.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e.i"
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
      </PartCard>

      <PartCard
        letter="e.ii"
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
          <img
            src={triangleSrc}
            alt="The curve y = g(x) and the line y = x, with Z at (−1, −1), Y at (1, 1) and X on the curve to the upper left of the line — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="e.iii"
        marks={2}
        statement={
          <>
            Find the values of <Katex tex="k" /> such that <Katex tex="s(k)\ge1" />.
          </>
        }
        examinerReport={EXAM_EIII}
      >
        <WorkingTable rows={ROWS_EIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The graph of <Katex tex="g" /> and the line <Katex tex="y=x" /> enclose a region of
          the plane, shown shaded below. Let <Katex tex="A(k)" /> be the rule of the function{' '}
          <Katex tex="A" /> that gives the area of this enclosed region. The domain of{' '}
          <Katex tex="A" /> is <Katex tex="(1,\infty)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={regionSrc}
            alt="The curve y = g(x) above the line y = x between their intersections at (−1, −1) and (1, 1), with the enclosed region shaded — from the original 2016 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard letter="f.i" marks={2} statement={<>Give the rule for <Katex tex="A(k)" />.</>} examinerReport={EXAM_FI}>
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
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
      </PartCard>
    </div>
  )
}
