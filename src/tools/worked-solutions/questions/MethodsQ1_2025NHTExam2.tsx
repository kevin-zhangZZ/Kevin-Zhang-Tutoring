// 2025 Mathematical Methods NHT — Exam 2, Section B Question 1 (12 marks). The NHT report gives
// sample answers only, with no statistics. The quartic g(x) = (x² − 1)(x + 1)² = (x − 1)(x + 1)³:
// stationary point of inflection, local minimum, average rate of change, tangents of gradient −2,
// the transformations to g(1 − x), a dilated and translated copy with its minimum on the x-axis,
// and the family g_k(x) = (x² − k)(x + k)²: exactly one x-intercept, exactly one stationary point.
// Question text transcribed from the original paper (the 2025 NHT paper has no text layer, so
// it was read from rendered pages; no diagram). Answers checked with sympy and against the VCAA
// report's sample answers: a. x = −1; b. (1/2, −27/16); c. 14; d. y = −2x − 1 and
// y = −2x − 43/16; e. reflect in the y-axis then translate 1 right (or translate 1 left then
// reflect); f. b = 27a/16; g.i. k ≤ 0; g.ii. −8 < k ≤ 0. The WrongMethod in e. is a verified slip,
// not taken from the report, which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} g(x) &= (x-1)(x+1)(x+1)^2 \\ &= (x-1)(x+1)^3 \end{aligned}" />,
    reason: <><Katex tex="x^2-1" /> is a difference of two squares, so it splits into <Katex tex="(x-1)(x+1)" /> and joins the <Katex tex="(x+1)^2" /> already there.</>,
    more: <>A factor cubed means the graph flattens out as it crosses the axis there: the signature of a stationary point of inflection. The derivative confirms it.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} g'(x) &= (x+1)^3 + 3(x-1)(x+1)^2 \\ &= (x+1)^2\big[(x+1)+3(x-1)\big] \\ &= 2(x+1)^2(2x-1) \end{aligned}"
      />
    ),
    reason: <>Product rule, <Katex tex="(uv)'=u'v+uv'" /> with <Katex tex="u=x-1" /> and <Katex tex="v=(x+1)^3" /> (chain rule for <Katex tex="v'" />), then take out the common factor <Katex tex="(x+1)^2" />.</>,
  },
  {
    working: <Katex display tex="g'(x)=0 \iff x=-1 \ \text{ or } \ x=\tfrac12" />,
    reason: <>The two stationary points.</>,
  },
  {
    working: <Katex display tex="\boxed{x=-1}" />,
    reason: <>Around <Katex tex="x=-1" /> the factor <Katex tex="(x+1)^2" /> is positive on both sides and <Katex tex="2x-1" /> is negative, so <Katex tex="g'" /> is negative on both sides: the gradient touches zero without changing sign, which is a stationary point of inflection.</>,
    more: <>At <Katex tex="x=\tfrac12" /> the sign of <Katex tex="g'" /> does change (from − to +), so that one is the turning point of part b.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) < 0 \text{ for } x<\tfrac12, \qquad g'(x) > 0 \text{ for } x>\tfrac12" />,
    reason: <>From part a., the sign of <Katex tex="g'(x)=2(x+1)^2(2x-1)" /> is the sign of <Katex tex="2x-1" /> (away from <Katex tex="x=-1" />). Decreasing then increasing: a local minimum at <Katex tex="x=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="g\!\left(\tfrac12\right) = \left(\tfrac12-1\right)\left(\tfrac32\right)^3 = -\tfrac12\times\tfrac{27}{8} = -\tfrac{27}{16}" />,
    reason: <>Substitute into the factorised form <Katex tex="(x-1)(x+1)^3" />: quicker than expanding.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\tfrac12,\ -\tfrac{27}{16}\right)}" />,
    reason: <>VCAA also accepts <Katex tex="(0.5,\ -1.6875)" />.</>,
    more: <>Sanity check: a quartic with a positive leading coefficient has one lowest point, and it must be below the axis because <Katex tex="g" /> is negative between its zeros <Katex tex="-1" /> and <Katex tex="1" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate of change} = \frac{g(2)-g(0)}{2-0}" />,
    reason: <>Average rate of change is the gradient of the chord joining the two points: change in <Katex tex="g" /> over change in <Katex tex="x" />. No derivative is involved.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} g(2) = (4-1)(3)^2 = 27 \\ g(0) = (0-1)(1)^2 = -1 \end{gathered}" />,
  },
  {
    working: <Katex display tex="\frac{27-(-1)}{2} = \boxed{14}" />,
    reason: <>Positive: <Katex tex="g" /> rises from <Katex tex="-1" /> to <Katex tex="27" /> over the interval.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = -2 \implies 2(x+1)^2(2x-1) = -2" />,
    reason: <>A tangent's gradient is the derivative at the point of contact, so find where <Katex tex="g'(x)=-2" />, using <Katex tex="g'" /> from part a.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} (x^2+2x+1)(2x-1)+1 &= 0 \\ 2x^3+3x^2 &= 0 \\ x^2(2x+3) &= 0 \end{aligned}"
      />
    ),
    reason: <>Divide by 2 and expand: the constant terms cancel, which leaves a common factor <Katex tex="x^2" />.</>,
    more: <>On CAS: <Cas fn="solve">solve(g′(x) = −2, x)</Cas></>,
  },
  {
    working: <Katex display tex="x = 0 \quad \text{or} \quad x = -\tfrac32" />,
  },
  {
    working: <Katex display tex="g(0) = -1, \qquad g\!\left(-\tfrac32\right) = \left(\tfrac94-1\right)\left(-\tfrac12\right)^2 = \tfrac{5}{16}" />,
    reason: <>The points of contact <Katex tex="(0,-1)" /> and <Katex tex="\left(-\tfrac32,\tfrac5{16}\right)" />.</>,
  },
  {
    working: <Katex display tex="y-\tfrac5{16} = -2\left(x+\tfrac32\right) \implies y = -2x - 3 + \tfrac5{16}" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> with <Katex tex="m=-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y=-2x-1 \quad \text{and} \quad y=-2x-\tfrac{43}{16}}" />,
    reason: <>Equations, as asked, not just the points.</>,
    more: <>Check: <Katex tex="(0,-1)" /> satisfies <Katex tex="y=-2x-1" />, and <Katex tex="-2\left(-\tfrac32\right)-\tfrac{43}{16}=\tfrac{48-43}{16}=\tfrac5{16}" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="g(1-x) = g\big(-(x-1)\big)" />,
    reason: <>Write the inside in the form <Katex tex="-(x-1)" /> to see the two steps: a sign change on <Katex tex="x" />, then <Katex tex="x" /> replaced by <Katex tex="x-1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &y=g(x) \\ \xrightarrow{\ x\,\to\,-x\ } \ &y=g(-x) \\ \xrightarrow{\ x\,\to\,x-1\ } \ &y=g\big(-(x-1)\big) \end{aligned}" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="-x" /> reflects in the <Katex tex="y" />-axis; then replacing <Katex tex="x" /> by <Katex tex="x-1" /> translates 1 unit in the positive <Katex tex="x" /> direction.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{gathered}\text{1. Reflection in the } y\text{-axis} \\ \text{2. Translation of 1 unit} \\ \text{in the positive } x \text{ direction}\end{gathered}}"
      />
    ),
    reason: <>VCAA also accepts the other order with a different translation: translate 1 unit to the <em>left</em> (<Katex tex="y=g(x+1)" />), then reflect in the <Katex tex="y" />-axis (<Katex tex="y=g(-x+1)" />).</>,
    more: <>Check with one point: the stationary point of inflection <Katex tex="(-1,0)" /> reflects to <Katex tex="(1,0)" /> and moves to <Katex tex="(2,0)" />; and <Katex tex="g(1-2)=g(-1)=0" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{local min of } y = a\,g(x)+b \text{ at } x=\tfrac12" />,
    reason: <>With <Katex tex="a>0" />, multiplying by <Katex tex="a" /> is a dilation from the <Katex tex="x" />-axis, which keeps the minimum a minimum and keeps its <Katex tex="x" />-value; adding <Katex tex="b" /> only lifts the graph. So the minimum is still at <Katex tex="x=\tfrac12" /> (part b.).</>,
  },
  {
    working: <Katex display tex="a\,g\!\left(\tfrac12\right)+b = 0 \implies -\tfrac{27}{16}a+b=0" />,
    reason: <>&ldquo;On the <Katex tex="x" />-axis&rdquo; means the minimum's <Katex tex="y" />-value is 0.</>,
  },
  {
    working: <Katex display tex="\boxed{b=\tfrac{27a}{16}}" />,
    reason: <>VCAA also accepts <Katex tex="b=1.6875a" />. Positive, as <Katex tex="b" /> must be: the graph is lifted just far enough that the minimum touches the axis.</>,
  },
]

const ROWS_GI: WorkingRow[] = [
  {
    working: <Katex display tex="g_k(x)=0 \iff x^2=k \ \text{ or } \ x=-k" />,
    reason: <>Null factor law on <Katex tex="(x^2-k)(x+k)^2" />. The <Katex tex="x" />-intercepts are the solutions of <Katex tex="x^2=k" /> together with <Katex tex="x=-k" />. Count the <em>distinct</em> ones case by case.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} k>0: \ x=\pm\sqrt k \text{ and } x=-k \\ \Rightarrow \ \text{at least two} \end{gathered}" />,
    reason: <><Katex tex="\sqrt k" /> and <Katex tex="-\sqrt k" /> are already two different intercepts. (At <Katex tex="k=1" />, <Katex tex="-k=-\sqrt k" />, but that still leaves two.)</>,
  },
  {
    working: <Katex display tex="k=0: \ g_0(x)=x^4 \ \Rightarrow \ x=0 \text{ only}" />,
    reason: <>Exactly one intercept.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} k<0: \ x^2=k \text{ is impossible}, \\ x=-k \ \Rightarrow \ \text{one} \end{gathered}" />,
    reason: <>A square can't be negative, so <Katex tex="x^2-k>0" /> for every <Katex tex="x" />, and the only intercept is where <Katex tex="(x+k)^2=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k\le 0}" />,
    reason: <>Include <Katex tex="k=0" />: it gives exactly one intercept too.</>,
  },
]

const ROWS_GII: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} g_k'(x) &= 2x(x+k)^2 + 2(x^2-k)(x+k) \\ &= 2(x+k)\big[x(x+k)+x^2-k\big] \\ &= 2(x+k)\left(2x^2+kx-k\right) \end{aligned}"
      />
    ),
    reason: <>Product rule, then take out the common factor <Katex tex="2(x+k)" />.</>,
    more: <>Check: at <Katex tex="k=1" /> this is <Katex tex="2(x+1)(2x-1)(x+1)" />, the derivative from part a.</>,
  },
  {
    working: <Katex display tex="g_k'(x)=0 \iff x=-k \ \text{ or } \ 2x^2+kx-k=0" />,
    reason: <><Katex tex="x=-k" /> is always a stationary point. For exactly one, the quadratic must add no <em>new</em> one: either it has no real roots, or its only roots coincide with <Katex tex="x=-k" />.</>,
  },
  {
    working: <Katex display tex="\Delta = k^2-4(2)(-k) = k^2+8k = k(k+8)" />,
    reason: <>The discriminant of <Katex tex="2x^2+kx-k" />.</>,
  },
  {
    working: <Katex display tex="\text{No real roots: } k(k+8)<0 \iff -8<k<0" />,
    reason: <>An upward parabola in <Katex tex="k" /> with zeros <Katex tex="-8" /> and <Katex tex="0" /> is negative between them. For these <Katex tex="k" />, <Katex tex="x=-k" /> is the only stationary point.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \text{Root at } x=-k: \\ 2k^2-k^2-k=0 \\ k(k-1)=0 \iff k=0 \text{ or } k=1 \end{gathered}" />,
    reason: <>Substitute <Katex tex="x=-k" /> into the quadratic to find when it shares that root.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} k=0&: \ g_0'(x)=4x^3, \ \text{only } x=0 \ \checkmark \\ k=1&: \ 2x^2+x-1=(2x-1)(x+1) \\ &\phantom{:}\ \ x=-1,\ \tfrac12 \ \times \end{aligned}"
      />
    ),
    reason: <>At <Katex tex="k=0" /> everything collapses onto <Katex tex="x=0" />: one stationary point. At <Katex tex="k=1" /> the quadratic's other root <Katex tex="\tfrac12" /> is a second stationary point (this is part a.'s <Katex tex="g" />).</>,
    more: <>The other edge, <Katex tex="k=-8" />, fails too: the quadratic becomes <Katex tex="2(x-2)^2" />, a repeated root at <Katex tex="x=2" />, which is a second stationary point alongside <Katex tex="x=-k=8" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-8<k\le 0}" />,
    reason: <>The interval from the discriminant, plus the single extra value <Katex tex="k=0" />.</>,
  },
]

export default function MethodsQ1_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (12 marks)</p>
        <p>
          Consider the function <Katex tex="g:R\to R,\ g(x)=(x^2-1)(x+1)^2" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Almost everything here comes from one factorisation:{' '}
              <Katex tex="g(x)=(x-1)(x+1)^3" />, with derivative{' '}
              <Katex tex="g'(x)=2(x+1)^2(2x-1)" />. A cubed factor means a stationary point of
              inflection; the simple factor <Katex tex="2x-1" /> in <Katex tex="g'" /> gives the
              turning point.
            </p>
            <p>
              Part g. asks the same questions of a whole family of functions. The approach is to
              count <em>distinct</em> solutions, watching for the values of <Katex tex="k" /> where
              two solutions merge into one.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Stationary Point of Inflection"
        marks={1}
        statement={<>Find the <Katex tex="x" />-value of the stationary point of inflection of the graph of <Katex tex="y=g(x)" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Local Minimum"
        marks={1}
        statement={<>Find the coordinates of the local minimum of the graph of <Katex tex="y=g(x)" />.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Average Rate of Change"
        marks={1}
        statement={<>Find the average rate of change of <Katex tex="g(x)" /> between <Katex tex="x=0" /> and <Katex tex="x=2" />.</>}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Tangent Lines"
        marks={2}
        statement={<>Find the equations of the tangent lines to the graph of <Katex tex="y=g(x)" /> that have a gradient of <Katex tex="-2" />.</>}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Transformations"
        marks={2}
        statement={<>Describe a sequence of two transformations that maps the graph of <Katex tex="y=g(x)" /> to the graph of <Katex tex="y=g(1-x)" />.</>}
      >
        <WorkingTable rows={ROWS_E} />
        <WrongMethod
          title="Translate 1 unit right, then reflect in the y-axis"
          working={<Katex display tex="\begin{gathered} g(x)\to g(x-1)\to g(-x-1) \\ g(-x-1) \ne g(1-x) \end{gathered}" />}
        >
          The reflection acts on the <em>whole</em> of <Katex tex="x" />, including the shift already
          inside, so the translation flips direction. Check either answer by writing out the rule
          after each step; with this order, the translation has to be 1 unit <em>left</em>.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="f"
        topic="Dilation and Translation"
        marks={1}
        statement={
          <>
            Let <Katex tex="a" /> and <Katex tex="b" /> be positive real numbers, such that the graph
            of <Katex tex="y=a\times g(x)+b" /> has a local minimum on the <Katex tex="x" />-axis.
            <br />
            Express <Katex tex="b" /> in terms of <Katex tex="a" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">g.</p>
        <p>
          For each real number <Katex tex="k" />, let <Katex tex="g_k" /> be the function{' '}
          <Katex tex="g_k:R\to R,\ g_k(x)=(x^2-k)(x+k)^2" />.
        </p>
      </div>

      <PartCard
        letter="g.i"
        topic="Number of Intercepts"
        marks={1}
        statement={<>Find all values of <Katex tex="k" /> for which the graph of <Katex tex="y=g_k(x)" /> has exactly one <Katex tex="x" />-intercept.</>}
      >
        <WorkingTable rows={ROWS_GI} />
      </PartCard>

      <PartCard
        letter="g.ii"
        topic="Number of Stationary Points"
        marks={3}
        statement={<>Find all values of <Katex tex="k" /> for which the graph of <Katex tex="y=g_k(x)" /> has exactly one stationary point.</>}
      >
        <WorkingTable rows={ROWS_GII} />
      </PartCard>
    </div>
  )
}
