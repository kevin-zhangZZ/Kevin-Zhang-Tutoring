// 2019 Mathematical Methods — Exam 2, Question 2 (11 marks).
// A zip-line cable above a hill modelled by y = 3x(x-30)²/2000 — the hill's gradient (parts
// a-b), the cable's rule where it runs 3 m above the hill (part c), where the cable's gradient
// matches the hill's average gradient (part d), and the join point A where the straight and
// curved sections meet smoothly (part e). Both photographs of the situation are VCAA's own
// graphs, cropped directly from the exam paper; the extra graph of dy/dx in part (b) is this
// site's own explanatory figure (matplotlib) of a function VCAA never printed — part (b) was
// the worst-answered part of the paper at 3% correct, and the gradient graph is what makes it
// obvious. Question text transcribed from the original paper. Cross-checked against the VCAA
// examination report and itute's independent solutions, and independently re-derived (all
// numeric parts by computer algebra, matching both sources exactly). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import hillSrc from './meth-2019exam2-q2-hill.png'
import hillCableSrc from './meth-2019exam2-q2-hill-cable.png'
import gradientSrc from './meth-2019exam2-q2-gradient.png'

const EXAM_A: SAExaminerStats = {
  marks: [7, 93],
  average: 1.0,
  comment: (
    <>
      This question was answered well. Common incorrect answers were{' '}
      <Katex tex="\dfrac{9x(x-30)(x-15)}{500}" /> and <Katex tex="\dfrac{9(x^2-40x+30)}{2000}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [97, 3],
  average: 0.1,
  comment: (
    <>
      This question was not done well. Most students interpreted the question as asking where
      the function modelling the hill itself was strictly decreasing, rather than where its
      gradient was strictly decreasing — the most common incorrect response was{' '}
      <Katex tex="[10,30]" />, or a combination of round and square brackets with those two
      values.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: <>This question was generally well done. Some students did not give an equation. Others added <Katex tex="10" />, instead of <Katex tex="3" />, to <Katex tex="f" />.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [41, 13, 9, 37],
  average: 1.4,
  comment: (
    <>
      A common incorrect answer for the average gradient was <Katex tex="\tfrac{3}{10}" /> (the
      sign was dropped). Some students used{' '}
      <Katex tex="\tfrac{1}{30-10}\int_{10}^{30}h(x)\,dx" /> — the average <em>value</em> of{' '}
      <Katex tex="h" /> — instead of the average gradient. Some gave approximate answers,{' '}
      <Katex tex="14.23" /> and <Katex tex="25.77" />, instead of the exact forms.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: <>The answer had to be given in terms of <Katex tex="a" />. Some students used <Katex tex="\tfrac{f(a)-10}{a}" /> (the hill) instead of <Katex tex="\tfrac{h(a)-10}{a}" /> (the cable). Others wrote <Katex tex="\tfrac{b-10}{a}" />, which is not in terms of <Katex tex="a" /> alone.</>,
}

const EXAM_EII: SAExaminerStats = {
  marks: [69, 9, 6, 15],
  average: 0.7,
  comment: (
    <>
      Many students did not equate the correct expressions. Some students found the value of{' '}
      <Katex tex="a" /> but not the value of <Katex tex="b" />. Other students rounded their
      answers incorrectly, giving <Katex tex="(11.11,8.94)" />.
    </>
  ),
}

const EXAM_EIII: SAExaminerStats = {
  marks: [80, 20],
  average: 0.2,
  comment: <>Students who obtained the correct value for <Katex tex="a" /> in part (e)(ii) were generally successful with this question.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \dfrac{3}{2000}\Bigl[\underbrace{x}_{u}\cdot\underbrace{(x-30)^2}_{v}\Bigr]" />,
    reason: <>Pull the constant <Katex tex="\tfrac{3}{2000}" /> out first — it just rides along — and differentiate the product that's left.</>,
  },
  {
    working: <Katex display tex="u'=1, \qquad v' = 2(x-30)" />,
    reason: <>Chain rule on <Katex tex="(x-30)^2" />: the inside function <Katex tex="x-30" /> has derivative <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{dy}{dx} = \dfrac{3}{2000}\Bigl[(x-30)^2 + x\cdot 2(x-30)\Bigr]" />,
    reason: <>Product rule <Katex tex="u'v+uv'" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="= \dfrac{3}{2000}(x-30)\Bigl[(x-30)+2x\Bigr]" />
        <Katex display tex="= \dfrac{3}{2000}(x-30)(3x-30)" />
      </>
    ),
    reason: <>Both terms share a factor of <Katex tex="(x-30)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{dy}{dx} = \dfrac{9(x-30)(x-10)}{2000}}" />,
    reason: <>Take the <Katex tex="3" /> out of <Katex tex="(3x-30)" /> and absorb it: <Katex tex="3\times3=9" />. Leaving it factorised is worth doing — the roots <Katex tex="x=10" /> and <Katex tex="x=30" /> are the two places the hill is momentarily flat, which matches the given graph.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={hillSrc} alt="The hill y = 3x(x−30)²/2000 on x ∈ [0,30], rising to a peak at (10,6) and falling back to zero at x = 30" className="w-full max-w-[400px]" />
      </div>
    ),
    reason: <>The hill itself. Reading <em>this</em> graph tells you where the <em>hill</em> is decreasing (from <Katex tex="x=10" /> onwards) — which is the trap. The question asks about the gradient, so the graph to look at is the next one.</>,
  },
  {
    working: <Katex display tex="\text{Gradient function: } \dfrac{dy}{dx} = \dfrac{9(x-30)(x-10)}{2000}" />,
    reason: <>From part (a). This is an upright parabola in <Katex tex="x" /> (positive <Katex tex="x^2" /> coefficient) with roots at <Katex tex="x=10" /> and <Katex tex="x=30" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={gradientSrc} alt="Graph of dy/dx against x: an upright parabola with roots at 10 and 30, falling from 1.35 at x=0 to a minimum of −9/20 at x=20, then rising back to 0 at x=30" className="w-full max-w-[400px]" />
      </div>
    ),
    reason: <>Its vertex sits halfway between the roots, at <Katex tex="x=\tfrac{10+30}{2}=20" />. The gradient falls all the way from <Katex tex="x=0" /> to the vertex, then climbs again — so "gradient strictly decreasing" is the stretch to the <em>left</em> of the vertex.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{d}{dx}\!\left(\dfrac{dy}{dx}\right) = \dfrac{d^2y}{dx^2} = \dfrac{9(2x-40)}{2000}" />
        <Katex display tex="\dfrac{9(2x-40)}{2000}<0 \iff x<20" />
      </>
    ),
    reason: <>The algebraic version of the same statement: the gradient is decreasing exactly where the <em>derivative of the gradient</em> is negative.</>,
  },
  {
    working: <Katex display tex="\boxed{x\in(0,20]}" />,
    reason: <>Restricted to the hill's own domain <Katex tex="x\in[0,30]" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={hillCableSrc} alt="The hill with the cable above it: straight from (0,10) to A(a,b), then running exactly 3 m above the hill all the way to x = 30" className="w-full max-w-[460px]" />
      </div>
    ),
    reason: <>The dashed cable sits a constant <Katex tex="3" /> m above the hill for <Katex tex="x\in[a,30]" /> — both vertical arrows in the figure are labelled <Katex tex="3" /> m.</>,
  },
  {
    working: <Katex display tex="\text{height of cable} = \text{height of hill} + 3" />,
    reason: <>"Exactly <Katex tex="3" /> m vertically above" means every <Katex tex="y" />-value is <Katex tex="3" /> larger — a vertical translation of the hill's graph.</>,
  },
  {
    working: <Katex display tex="\boxed{h(x) = \dfrac{3x(x-30)^2}{2000}+3}, \qquad x\in[a,30]" />,
    reason: <>The report notes some students added <Katex tex="10" /> (the pole height) instead of <Katex tex="3" />, and some gave an expression rather than an equation — the question asks for the rule, so write <Katex tex="h(x)=\dots" /> (or <Katex tex="y=\dots" />).</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="y(10) = \dfrac{3(10)(10-30)^2}{2000} = \dfrac{3(10)(400)}{2000} = 6" />
        <Katex display tex="y(30) = \dfrac{3(30)(30-30)^2}{2000} = 0" />
      </>
    ),
    reason: <>The two endpoint heights of the hill — both readable off the given graph as a check: the peak <Katex tex="(10,6)" /> and the point where the hill meets the axis at <Katex tex="x=30" />.</>,
  },
  {
    working: <Katex display tex="\text{Average gradient} = \dfrac{y(30)-y(10)}{30-10} = \dfrac{0-6}{20} = -\dfrac{3}{10}" />,
    reason: <>Rise over run between the two endpoints. Negative, as it must be — over <Katex tex="[10,30]" /> the hill drops from <Katex tex="6" /> m to ground level.</>,
  },
  {
    working: <Katex display tex="\text{Gradient of the cable} = h'(x) = \dfrac{dy}{dx} = \dfrac{9(x-30)(x-10)}{2000}" />,
    reason: <>On <Katex tex="[a,30]" /> the cable is the hill shifted up <Katex tex="3" /> m, and a vertical shift doesn't change any gradient — so the cable's gradient function is the same as the hill's.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{9(x-30)(x-10)}{2000} = -\dfrac{3}{10}" />
        <Katex display tex="9\left(x^2-40x+300\right) = -600" />
        <Katex display tex="9x^2-360x+3300=0 \implies 3x^2-120x+1100=0" />
      </>
    ),
    reason: <>Expand, multiply both sides by <Katex tex="2000" />, then divide through by <Katex tex="3" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x = \dfrac{120\pm\sqrt{120^2-4(3)(1100)}}{2(3)} = \dfrac{120\pm\sqrt{1200}}{6}" />
        <Katex display tex="= \dfrac{120\pm20\sqrt3}{6} = 20\pm\dfrac{10\sqrt3}{3}" />
      </>
    ),
    reason: <>Quadratic formula, then simplify <Katex tex="\sqrt{1200}=\sqrt{400\times3}=20\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 20-\dfrac{10\sqrt3}{3} \ \text{ or } \ x=20+\dfrac{10\sqrt3}{3}}" />,
    reason: <>Both lie inside <Katex tex="[10,30]" /> (<Katex tex="\approx14.23" /> and <Katex tex="\approx25.77" />), so both are valid. Keep the surd form — the report specifically notes that the decimal answers did not score, because Section B requires exact values unless told otherwise.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="b = h(a) = \dfrac{3a(a-30)^2}{2000}+3" />,
    reason: <><Katex tex="A" /> is on the curved section, so its height comes from part (c)'s rule.</>,
  },
  {
    working: <Katex display tex="\text{gradient} = \dfrac{\text{rise}}{\text{run}} = \dfrac{h(a)-10}{a-0}" />,
    reason: <>The straight section runs from the top of the pole <Katex tex="(0,10)" /> to <Katex tex="A(a,b)" />. A straight line's gradient is rise over run between any two of its points.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{h(a)-10}{a} = \dfrac{3a^2}{2000}-\dfrac{9a}{100}+\dfrac{27}{20}-\dfrac{7}{a}}" />,
    reason: <>Expanding is optional — either form scores — but it must be <em>in terms of <Katex tex="a" /></em>, so <Katex tex="\tfrac{b-10}{a}" /> alone was not accepted.</>,
  },
  {
    working: <Katex display tex="\text{Equivalently: } \dfrac{9(a-30)(a-10)}{2000}" />,
    reason: <>Because the join is smooth, the curved section's derivative at <Katex tex="x=a" /> is also "the gradient at <Katex tex="A" />" — this is the form itute gives. The two expressions are only equal at the special value of <Katex tex="a" /> that makes the join smooth, and finding that value is exactly what part (e)(ii) does.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\underbrace{\dfrac{h(a)-10}{a}}_{\text{straight section}} = \underbrace{\dfrac{9(a-30)(a-10)}{2000}}_{\text{curved section}}" />,
    reason: <>"Smooth join" means the two sections arrive at <Katex tex="A" /> with the <em>same</em> gradient. Setting the two expressions from part (e)(i) equal gives one equation in the one unknown <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{3a^2}{2000}-\dfrac{9a}{100}+\dfrac{27}{20}-\dfrac{7}{a} = \dfrac{9(a-30)(a-10)}{2000}" />,
    reason: <>Solve on CAS over <Katex tex="10\le a\le20" />, the range the question gives for <Katex tex="a" /> — that restriction is what picks out the one relevant solution.</>,
  },
  {
    working: <Katex display tex="a \approx 11.1157\ldots \implies a\approx11.12" />,
  },
  {
    working: <Katex display tex="b = h(a) = \dfrac{3(11.1157\ldots)(11.1157\ldots-30)^2}{2000}+3 \approx 8.9461" />,
    reason: <>Substitute the <em>unrounded</em> value of <Katex tex="a" /> back into <Katex tex="h" />. Rounding <Katex tex="a" /> first is what produced the report's noted wrong answer <Katex tex="(11.11,8.94)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx (11.12,\ 8.95)}" />,
    reason: <>Both coordinates, each to two decimal places. Sanity check against the given figure: <Katex tex="A" /> is drawn just past <Katex tex="x=10" /> at a height a little under <Katex tex="9" />. ✓</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Gradient at } A = \dfrac{9(a-30)(a-10)}{2000} \quad \text{with } a\approx11.1157" />,
    reason: <>Use part (e)(i)'s rule with part (e)(ii)'s value of <Katex tex="a" /> — again, the unrounded one.</>,
  },
  {
    working: <Katex display tex="= \dfrac{9(11.1157-30)(11.1157-10)}{2000} \approx -0.0948" />,
  },
  {
    working: <Katex display tex="\boxed{\approx -0.1}" />,
    reason: <>Correct to one decimal place. The sign makes sense: at <Katex tex="A" /> the cable has just started its gentle descent, so the gradient is small and negative.</>,
  },
]

export default function MethodsQ2_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (11 marks)</p>
        <p className="mb-2">
          An amusement park is planning to build a zip-line above a hill on its property. The
          hill is modelled by <Katex tex="y=\dfrac{3x(x-30)^2}{2000},\ x\in[0,30]" />, where{' '}
          <Katex tex="x" /> is the horizontal distance, in metres, from an origin and{' '}
          <Katex tex="y" /> is the height, in metres, above this origin.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find <Katex tex="\dfrac{dy}{dx}" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement="State the set of values for which the gradient of the hill is strictly decreasing." examinerReport={EXAM_B}>
        <Background>
          <p>
            Only <b>3%</b> of students scored this mark, and the reason is a single word. There
            are two different questions you could ask about a hill:
          </p>
          <p>
            <b>"Where is the hill decreasing?"</b> — where the <em>height</em> is going down,
            i.e. where <Katex tex="\tfrac{dy}{dx}<0" />. That's <Katex tex="[10,30]" />, the answer
            most students gave.
          </p>
          <p>
            <b>"Where is the gradient decreasing?"</b> — where the <em>steepness reading itself</em>{' '}
            is going down, i.e. where <Katex tex="\tfrac{dy}{dx}" /> is getting smaller as you walk
            right. That's about the second derivative, <Katex tex="\tfrac{d^2y}{dx^2}<0" />, and it is
            what this question asks.
          </p>
          <p>
            Physically: walking from <Katex tex="x=0" />, you start climbing steeply, the climb
            eases off, you crest the peak, and then the descent gets steeper and steeper. The
            gradient reading falls the whole way — from <Katex tex="+1.35" /> through <Katex tex="0" />{' '}
            at the peak and on down to its most negative value — even though the hill itself
            first rises and then falls.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Background title="A Note On The Endpoints">
          <p>
            VCAA's published answer is <Katex tex="(0,20]" />. itute's solutions give{' '}
            <Katex tex="[0,20]" /> instead — and the derivative test does hold at{' '}
            <Katex tex="x=0" />, since <Katex tex="\tfrac{d^2y}{dx^2}=-\tfrac{9}{50}<0" /> there. The
            two differ only over whether the left-hand endpoint of the domain counts. Write the
            official form, <Katex tex="(0,20]" />, in an exam; the mathematics that earns the
            mark is identifying <Katex tex="20" /> as the cut-off and that it is <em>included</em>.
          </p>
        </Background>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The cable for the zip-line is connected to a pole at the origin at a height of{' '}
          <Katex tex="10" /> m and is straight for <Katex tex="0\le x\le a" />, where{' '}
          <Katex tex="10\le a\le20" />. The straight section joins the curved section at{' '}
          <Katex tex="A(a,b)" />. The cable is then exactly <Katex tex="3" /> m vertically above
          the hill from <Katex tex="a\le x\le30" />.
        </p>
      </div>

      <PartCard letter="c" marks={1} statement={<>State the rule, in terms of <Katex tex="x" />, for the height of the cable above the horizontal axis for <Katex tex="x\in[a,30]" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={3} statement={<>Find the values of <Katex tex="x" /> for which the gradient of the cable is equal to the average gradient of the hill for <Katex tex="x\in[10,30]" />.</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            The <b>average gradient</b> of a curve between two points is just the gradient of the
            straight line joining them:{' '}
            <Katex tex="\dfrac{y(b)-y(a)}{b-a}" />. It is <em>not</em> the average value of the
            function, and not an integral — the report notes students who integrated{' '}
            <Katex tex="h" /> here lost the marks.
          </p>
          <p>
            So this part has two halves: work out that one number from the hill's endpoints,
            then find where the cable's <em>instantaneous</em> gradient equals it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The gradients of the straight and curved sections of the cable approach the same
          value at <Katex tex="x=a" />, so there is a continuous and smooth join at{' '}
          <Katex tex="A" />.
        </p>
      </div>

      <PartCard letter="e.i" marks={1} statement={<>State the gradient of the cable at <Katex tex="A" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_EI}>
        <Background>
          <p>
            <Katex tex="A" /> is the seam between the two halves of the cable, so there are two
            ways to describe the gradient there — the straight section's, which is a rise-over-run
            calculation, and the curved section's, which is a derivative. VCAA's published answer
            uses the straight section, and that is the more useful one here, because the next
            part equates the two.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard letter="e.ii" marks={3} statement={<>Find the coordinates of <Katex tex="A" />, with each value correct to two decimal places.</>} examinerReport={EXAM_EII}>
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard letter="e.iii" marks={1} statement="Find the value of the gradient at A, correct to one decimal place." examinerReport={EXAM_EIII}>
        <WorkingTable rows={ROWS_EIII} />
      </PartCard>
    </div>
  )
}
