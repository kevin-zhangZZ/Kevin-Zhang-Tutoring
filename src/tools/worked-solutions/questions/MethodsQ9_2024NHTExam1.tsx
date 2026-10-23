// 2024 Mathematical Methods NHT — Exam 1, Question 9 (8 marks). The NHT report gives sample
// answers only, with no statistics; its notes on parts c. (a "show that" needs every line) and
// d. (form the tangent, then use part c.'s antiderivative) are quoted as those parts' examiner
// comments. f(x) = (x − 1)e^(−x): its derivative, the transformations taking f to f′
// (f′(x) = −(1/e) f(x − 1)), integration by recognition, and the area between f, its tangent at
// x = 3 and the line x = 1. Question text transcribed from the original paper; the part d.
// figure is cropped from the original VCAA exam PDF. Answers checked with sympy and against the
// VCAA report's sample answers ((2 − x)e^(−x); reflection in the x-axis, dilation by 1/e from the
// x-axis, translation 1 right; 9e^(−3) − e^(−1)). Part b.'s translation maps f's domain (0, ∞)
// to (1, ∞), so f's image is the part of y = f′(x) with x > 1; noted in the working. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2024nhte1-q9d-graph.png'

const REPORT_C: SAExaminerStats = {
  comment: (
    <>
      This question was a &lsquo;show that&rsquo; question. As such, each line of working needed to demonstrate a
      clear, logical and explicit progression, leading to the answer.
    </>
  ),
}

const REPORT_D: SAExaminerStats = {
  comment: (
    <>
      This question involved forming the equation of the tangent line <Katex tex="y=g(x)" /> and then constructing an
      integral to find the area of the region bounded by the tangent line, the curve <Katex tex="y=f(x)" /> and the
      line <Katex tex="x=1" />.
      <br />
      It was helpful to use the fact that <Katex tex="\tfrac{d}{dx}\left(-xe^{-x}\right)=f(x)" />, as established in
      part 9c., and thus <Katex tex="\int f(x)\,dx=-xe^{-x}" />
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="u=x-1,\ u'=1;\qquad v=e^{-x},\ v'=-e^{-x}" />,
    reason: <><Katex tex="f" /> is a product, so use <Katex tex="(uv)'=u'v+uv'" />. The chain rule gives <Katex tex="\tfrac{d}{dx}e^{-x}=-e^{-x}" />.</>,
  },
  {
    working: <Katex display tex="f'(x)=e^{-x}-(x-1)e^{-x}=e^{-x}\left(1-x+1\right)" />,
    reason: <>Take out the common factor <Katex tex="e^{-x}" />, watching the sign on <Katex tex="-(x-1)=-x+1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x)=(2-x)e^{-x}}" />,
    reason: <>VCAA also writes <Katex tex="-(x-2)e^{-x}" />, the form part b. uses. Check: <Katex tex="f'(3)=-e^{-3}<0" />, and the graph in part d. is falling at <Katex tex="x=3" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=-(x-2)e^{-x}" />,
    reason: <>Write <Katex tex="f'" /> so it looks as much like <Katex tex="f(x)=(x-1)e^{-x}" /> as possible. The bracket <Katex tex="(x-2)" /> is <Katex tex="(x-1)" /> with <Katex tex="x" /> replaced by <Katex tex="x-1" />.</>,
  },
  {
    working: <Katex display tex="f(x-1)=(x-2)e^{-(x-1)}=(x-2)e^{-x}\cdot e" />,
    reason: <>Replace every <Katex tex="x" /> in <Katex tex="f" /> by <Katex tex="x-1" />. The exponential becomes <Katex tex="e^{-x+1}=e^{-x}e^1" />, so there is an extra factor of <Katex tex="e" />.</>,
  },
  {
    working: <Katex display tex="f'(x)=-\frac1e\,f(x-1)" />,
    reason: <>Divide by <Katex tex="e" /> to remove that factor, then put in the minus sign: <Katex tex="-\tfrac1e\cdot e(x-2)e^{-x}=-(x-2)e^{-x}" />.</>,
    more: <>As a mapping: <Katex tex="(x,y)\to\left(x+1,\,-\tfrac{y}{e}\right)" />. A point <Katex tex="(x,f(x))" /> goes to <Katex tex="\left(x+1,-\tfrac1ef(x)\right)" />, and <Katex tex="f'(x+1)=-\tfrac1ef(x)" />, so it lands on <Katex tex="y=f'(x)" />.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span>• Reflection in the <Katex tex="x" />-axis</span>
        <span>• Dilation by a factor of <Katex tex="\tfrac1e" /> from the <Katex tex="x" />-axis</span>
        <span>• Translation of 1 unit in the positive <Katex tex="x" />-direction</span>
      </div>
    ),
    reason: <>Read each transformation off <Katex tex="-\tfrac1e f(x-1)" />: the minus sign reflects in the <Katex tex="x" />-axis, the <Katex tex="\tfrac1e" /> dilates vertically, and <Katex tex="x-1" /> translates 1 unit right. VCAA accepts them in any order.</>,
    more: <>The order doesn&apos;t matter here because the reflection and dilation act on <Katex tex="y" /> only and the translation acts on <Katex tex="x" /> only. One subtlety: <Katex tex="f" /> has domain <Katex tex="(0,\infty)" />, so its image starts at <Katex tex="x=1" />: it is the part of <Katex tex="y=f'(x)" /> with <Katex tex="x>1" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\left(-xe^{-x}\right)=(-1)e^{-x}+(-x)\left(-e^{-x}\right)" />,
    reason: <>Product rule with <Katex tex="u=-x" /> (<Katex tex="u'=-1" />) and <Katex tex="v=e^{-x}" /> (<Katex tex="v'=-e^{-x}" />).</>,
  },
  {
    working: <Katex display tex="=-e^{-x}+xe^{-x}" />,
    reason: <>The two minus signs in the second term multiply to a plus.</>,
  },
  {
    working: <Katex display tex="=(x-1)e^{-x}" />,
    reason: <>Take out the common factor <Katex tex="e^{-x}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{d}{dx}\left(-xe^{-x}\right)=f(x)}" />,
    reason: <>This is the rule for <Katex tex="f" />. As required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}f(3)&=(3-1)e^{-3}=2e^{-3}\\ f'(3)&=(2-3)e^{-3}=-e^{-3}\end{aligned}" />,
    reason: <>The point of contact and the gradient there, using <Katex tex="f'" /> from part a.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}y-2e^{-3}=-e^{-3}(x-3)\\ \implies g(x)=-e^{-3}x+5e^{-3}\end{gathered}" />,
    reason: <>The tangent is the straight line through <Katex tex="(3,f(3))" /> with gradient <Katex tex="f'(3)" />: <Katex tex="y-y_1=m(x-x_1)" />.</>,
    more: <>That is <Katex tex="g(x)=e^{-3}(5-x)" />, which meets the <Katex tex="x" />-axis at <Katex tex="x=5" />, as in the figure, where the tangent crosses the axis to the right of the point of contact.</>,
  },
  {
    working: <Katex display tex="A=\int_1^3\left(g(x)-f(x)\right)dx" />,
    reason: <>The shaded region runs from <Katex tex="x=1" /> to the point of contact at <Katex tex="x=3" />, with the tangent on top and the curve below, so integrate top minus bottom.</>,
    more: <>Why the tangent is on top: <Katex tex="f''(x)=(x-3)e^{-x}<0" /> for <Katex tex="x<3" />, so the curve bends downward there and lies below its tangent. The tangent touches the curve only at <Katex tex="x=3" />, which is why that is the right-hand terminal.</>,
  },
  {
    working: <Katex display tex="=\left[-e^{-3}\frac{x^2}{2}+5e^{-3}x+xe^{-x}\right]_1^3" />,
    reason: <><Katex tex="e^{-3}" /> is a constant, so the line integrates term by term. From part c., <Katex tex="\int f(x)\,dx=-xe^{-x}" />, so subtracting <Katex tex="f" /> gives <Katex tex="+xe^{-x}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}=&\left(-\tfrac92e^{-3}+15e^{-3}+3e^{-3}\right)\\ &-\left(-\tfrac12e^{-3}+5e^{-3}+e^{-1}\right)\end{aligned}" />,
    reason: <>Upper terminal minus lower terminal. At <Katex tex="x=1" /> the last term is <Katex tex="1\cdot e^{-1}" />, the only one without <Katex tex="e^{-3}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&=e^{-3}\left(-\tfrac92+15+3+\tfrac12-5\right)-e^{-1}\\ &=9e^{-3}-e^{-1}\end{aligned}" />,
    reason: <>Collect the <Katex tex="e^{-3}" /> terms: <Katex tex="-\tfrac92+\tfrac12=-4" />, and <Katex tex="-4+15+3-5=9" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A=9e^{-3}-e^{-1}=\frac{9-e^2}{e^3}\ \text{square units}}" />,
    reason: <>Sanity check: <Katex tex="e^2\approx7.39<9" />, so the area is positive, about <Katex tex="0.08" />, a small sliver, as the shaded region in the figure suggests.</>,
    more: <>VCAA also gives <Katex tex="\tfrac{9}{e^3}-\tfrac1e" />. A negative answer here would mean the subtraction was the wrong way round (curve minus tangent).</>,
  },
]

export default function MethodsQ9_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (8 marks)</p>
        <p>
          Let <Katex tex="f:(0,\infty)\to R,\ f(x)=(x-1)e^{-x}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={1}
        statement={<>Find <Katex tex="f'(x)" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Transformations"
        marks={2}
        statement={<>State a sequence of transformations that will map <Katex tex="f(x)" /> onto <Katex tex="f'(x)" />.</>}
      >
        <Background>
          <p>
            To find transformations from <Katex tex="y=f(x)" /> to a new graph, write the new rule in the form{' '}
            <Katex tex="A\,f(x-h)" /> (more generally <Katex tex="A\,f(n(x-h))+k" />) and read off each change:{' '}
            <Katex tex="A<0" /> reflects in the <Katex tex="x" />-axis, <Katex tex="|A|" /> dilates from the{' '}
            <Katex tex="x" />-axis, and <Katex tex="x-h" /> translates <Katex tex="h" /> units in the positive{' '}
            <Katex tex="x" />-direction. The work is algebra: making the new rule look like the old one.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Translate 1 unit left, because of the −1"
          working={<Katex display tex="\begin{gathered}(x-1)\to(x-2):\\ \text{translate 1 unit in the}\\ \text{negative } x\text{-direction}\end{gathered}" />}
        >
          Replacing <Katex tex="x" /> by <Katex tex="x-1" /> moves the graph 1 unit to the <em>right</em>: the new
          graph reaches each height one unit later. Check with a feature: <Katex tex="f" /> is zero at{' '}
          <Katex tex="x=1" /> and <Katex tex="f'" /> is zero at <Katex tex="x=2" />, so the zero moved right.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Antiderivative"
        marks={1}
        statement={
          <>
            Show that <Katex tex="\dfrac{d}{dx}\left(-xe^{-x}\right)=f(x)" />.
          </>
        }
        examinerReport={REPORT_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Area Between Curves"
        marks={4}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              Let <Katex tex="y=g(x)" /> be the tangent to <Katex tex="y=f(x)" /> at the point{' '}
              <Katex tex="\left(3,f(3)\right)" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={graphSrc}
                alt="The curve y = f(x) rising steeply from below the x-axis through x = 1 to a peak, then falling and flattening towards the x-axis, with its tangent y = g(x) touching it at the marked point (3, f(3)); the region between the tangent, the curve and the vertical line x = 1 is shaded — from the original VCAA exam paper"
                className="w-full max-w-[460px]"
              />
            </div>
            <p>
              Using <Katex tex="\dfrac{d}{dx}\left(-xe^{-x}\right)=f(x)" />, or otherwise, determine the area of the
              region bounded by the lines <Katex tex="x=1" />, <Katex tex="y=g(x)" /> and the graph of{' '}
              <Katex tex="y=f(x)" />.
            </p>
          </div>
        }
        examinerReport={REPORT_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
