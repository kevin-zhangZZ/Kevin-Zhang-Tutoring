// 2019 Mathematical Methods — Exam 2, Question 2 (11 marks).
// A zip-line cable above a hill modelled by y = 3x(x-30)²/2000 — the hill's gradient (parts
// a-b), the cable's rule where it runs 3 m above the hill (part c), where the cable's gradient
// matches the hill's average gradient (part d), and the join point A where the straight and
// curved sections meet smoothly (part e). Both graphs of the situation are VCAA's own,
// cropped directly from the exam paper and shown in the stem where the paper prints them.
// Interactive widgets (our own, never in the stem): part b. walks a tangent along the hill beside
// the graph of dy/dx, so the gradient visibly falls on (0, 20] while the hill falls on [10, 30]
// (part b. was the worst-answered part of the paper at 3% correct); part d. shows the average
// gradient as the chord from (10, 6) to (30, 0) and the answers as the two tangents parallel to it;
// part e.ii. slides the join point A until the corner disappears (the tangent at A passes through
// the pole top), with toggles for both gradient expressions graphed against a and the report's
// f(a) slip. Wrong-method boxes are all taken from the examiner's report's comments and each was
// recomputed. Question text transcribed from the original paper. Cross-checked against the VCAA
// examination report and itute's independent solutions, and independently re-derived (all
// numeric parts by computer algebra, matching both sources exactly; itute gives [0, 20] for part
// b. where VCAA gives (0, 20] — see the endpoint note in part b.). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'
import hillSrc from './meth-2019e2-q2-hill.png'
import hillCableSrc from './meth-2019e2-q2-hill-cable.png'

const GradientFallsWidget = lazyWidget(() => import('../interactives/meth-2019e2-q2b-gradient-falls'))
const ParallelTangentWidget = lazyWidget(() => import('../interactives/meth-2019e2-q2d-parallel-tangent'))
const SmoothJoinWidget = lazyWidget(() => import('../interactives/meth-2019e2-q2e-smooth-join'))

const EXAM_A: SAExaminerStats = {
  marks: [7, 93],
  average: 1.0,
  comment: (
    <>
      Other equivalent forms were acceptable.
      <br />
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
      the function modelling the hill was strictly decreasing, rather than the gradient of the
      hill and so the most common incorrect response was <Katex tex="[10,\ 30]" /> or a
      combination of round and square brackets with those two values.
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
      A common incorrect answer for the average gradient was <Katex tex="\tfrac{3}{10}" />.
      <br />
      Some students used <Katex tex="\dfrac{1}{30-10}\displaystyle\int_{10}^{30}h(x)\,dx" />{' '}
      instead of <Katex tex="\dfrac{1}{30-10}\displaystyle\int_{10}^{30}h'(x)\,dx" />.
      <br />
      Some students gave approximate answers for the <Katex tex="x" /> values, 14.23 and 25.77.
      <br />
      Other students did not use brackets correctly, giving{' '}
      <Katex tex="x=\dfrac{\pm10\left(\sqrt3+6\right)}{3}" /> as their answer. Another common
      incorrect answer was <Katex tex="\dfrac{6\pm10\sqrt3}{3}" />.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      Common incorrect answers were{' '}
      <Katex tex="\dfrac{9a^2}{2000}-\dfrac{9a}{50}+\dfrac{27}{50}" />,{' '}
      <Katex tex="\dfrac{3}{2000}a^2-\dfrac{9}{100}a-\dfrac{10}{a}+\dfrac{27}{20}" /> and{' '}
      <Katex tex="\dfrac{3a^3-180a^2+2700a-20000}{2000a}" />.
      <br />
      Some students used <Katex tex="\dfrac{f(a)-10}{a}" /> instead of{' '}
      <Katex tex="\dfrac{h(a)-10}{a}" />. Other students wrote <Katex tex="\dfrac{b-10}{a}" />.
      <br />
      The answer had to be given in terms of <Katex tex="a" />.
    </>
  ),
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
  comment: <>Students who obtained the correct value for <Katex tex="a" /> in Question 2eii. were generally successful with this question.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \dfrac{3}{2000}\Bigl[\underbrace{x}_{u}\cdot\underbrace{(x-30)^2}_{v}\Bigr]" />,
    reason: <>Pull out the constant <Katex tex="\tfrac{3}{2000}" />, then use the product rule on what's left. (On CAS: <Cas fn="derivative">d/dx(3x(x-30)^2/2000)</Cas>, then factor.)</>,
    more: <>The constant just rides along through the differentiation. Aim for the factorised form whichever way you do it: parts b. and d. both lean on it.</>,
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
    reason: <>Take the <Katex tex="3" /> out of <Katex tex="(3x-30)" /> and absorb it: <Katex tex="3\times3=9" />.</>,
    more: <>Leaving it factorised is worth doing: the roots <Katex tex="x=10" /> and <Katex tex="x=30" /> are the two places the hill is momentarily flat, which matches the given graph. If you do expand, <Katex tex="(x-30)(x-10)=x^2-40x+300" />; the report lists <Katex tex="\tfrac{9(x^2-40x+30)}{2000}" />, with <Katex tex="30" /> in place of <Katex tex="300" />, among the common incorrect answers.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Gradient function: } \dfrac{dy}{dx} = \dfrac{9(x-30)(x-10)}{2000}" />,
    reason: <>The question is about the <em>gradient</em>, not the hill, so work with part a.'s gradient function: an upright parabola with roots <Katex tex="10" /> and <Katex tex="30" />.</>,
    more: <>It is upright because the <Katex tex="x^2" /> coefficient, <Katex tex="\tfrac{9}{2000}" />, is positive.</>,
  },
  {
    working: <Katex display tex="\text{Vertex: } x=\dfrac{10+30}{2}=20" />,
    reason: <>The vertex is halfway between the roots. An upright parabola falls until its vertex, so the gradient decreases to the <em>left</em> of <Katex tex="x=20" />.</>,
    more: <>At the vertex the gradient is <Katex tex="\tfrac{9(-10)(10)}{2000}=-\tfrac{9}{20}" />: this is where the descent is steepest.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{d}{dx}\!\left(\dfrac{dy}{dx}\right) = \dfrac{d^2y}{dx^2} = \dfrac{9(x-20)}{1000}" />
        <Katex display tex="\dfrac{9(x-20)}{1000}<0 \iff x<20" />
      </>
    ),
    reason: <>To find where a quantity is decreasing, differentiate <em>that quantity</em>. Here it is the gradient, so differentiate the gradient function.</>,
    more: <>This is the algebraic version of the vertex argument in the row above, and it works for any gradient function, not just a parabola.</>,
  },
  {
    working: <Katex display tex="\boxed{x\in(0,20]}" />,
    reason: <>Restrict to the hill's domain and include <Katex tex="20" />, where the gradient is still falling. VCAA's published answer is <Katex tex="(0,20]" />, leaving out the endpoint <Katex tex="x=0" />.</>,
    more: <>Why <Katex tex="20" /> is included: for any <Katex tex="x_1<x_2\le20" /> the gradient at <Katex tex="x_2" /> is lower than at <Katex tex="x_1" />, which is exactly what "strictly decreasing" means. A single point where <Katex tex="\tfrac{d^2y}{dx^2}=0" /> does not break that, and VCAA's convention is to include such endpoints.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{height of cable} = \text{height of hill} + 3" />,
    reason: <>"Exactly <Katex tex="3" /> m vertically above" means every <Katex tex="y" />-value is <Katex tex="3" /> larger: a vertical translation of the hill's graph.</>,
    more: <>In the second graph the dashed cable sits a constant <Katex tex="3" /> m above the hill for <Katex tex="x\in[a,30]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h(x) = \dfrac{3x(x-30)^2}{2000}+3}, \qquad x\in[a,30]" />,
    reason: <>The question asks for the rule, so write an equation, <Katex tex="h(x)=\dots" /> (or <Katex tex="y=\dots" />), not just an expression.</>,
    more: <>The report notes some students did not give an equation. The expanded form, <Katex tex="h(x)=\tfrac{3x^3}{2000}-\tfrac{9x^2}{100}+\tfrac{27x}{20}+3" />, is equally correct.</>,
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
    reason: <>The hill's heights at the two ends of <Katex tex="[10,30]" />.</>,
    more: <>Both can be read off the given graph as a check: the peak <Katex tex="(10,6)" />, and the point where the hill meets the axis at <Katex tex="x=30" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{Average gradient} &= \dfrac{y(30)-y(10)}{30-10} \\ &= \dfrac{0-6}{20} = -\dfrac{3}{10} \end{aligned}" />,
    reason: <>Rise over run between the two endpoints. It must be negative: over <Katex tex="[10,30]" /> the hill drops from <Katex tex="6" /> m to ground level.</>,
    more: <>The report's advice to students uses this very part as its example of checking that answers are reasonable: from the graph, the average gradient had to be negative. Averaging the <em>gradient</em> function gives the same number, <Katex tex="\tfrac{1}{20}\int_{10}^{30}y'(x)\,dx=\tfrac{y(30)-y(10)}{20}=-\tfrac{3}{10}" />, by the fundamental theorem of calculus; averaging the height function itself does not.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{On } [a,30]:\ \text{gradient of cable} = h'(x)" />
        <Katex display tex="= \dfrac{dy}{dx} = \dfrac{9(x-30)(x-10)}{2000}" />
      </>
    ),
    reason: <>On the curved section <Katex tex="[a,30]" /> the cable is the hill shifted up <Katex tex="3" /> m, and a vertical shift doesn't change any gradient.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{9(x-30)(x-10)}{2000} = -\dfrac{3}{10}" />
        <Katex display tex="9\left(x^2-40x+300\right) = -600" />
        <Katex display tex="9x^2-360x+3300=0" />
        <Katex display tex="3x^2-120x+1100=0" />
      </>
    ),
    reason: <>Multiply both sides by <Katex tex="2000" /> and expand, add <Katex tex="600" /> to both sides (<Katex tex="2700+600=3300" />), then divide through by <Katex tex="3" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x = \dfrac{120\pm\sqrt{120^2-4(3)(1100)}}{2(3)}" />
        <Katex display tex="= \dfrac{120\pm\sqrt{1200}}{6}" />
        <Katex display tex="= \dfrac{120\pm20\sqrt3}{6} = 20\pm\dfrac{10\sqrt3}{3}" />
      </>
    ),
    reason: <>Quadratic formula, then simplify <Katex tex="\sqrt{1200}=\sqrt{400\times3}=20\sqrt3" />.</>,
    more: <>On CAS, <Cas fn="solve">solve(9(x-30)(x-10)/2000=-3/10, x)</Cas> gives the same pair. The report writes them as <Katex tex="\tfrac{60\pm10\sqrt3}{3}" />; it lists <Katex tex="\tfrac{6\pm10\sqrt3}{3}" /> among the common incorrect answers.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 20-\dfrac{10\sqrt3}{3} \ \text{ or } \ x=20+\dfrac{10\sqrt3}{3}}" />,
    reason: <>Both (<Katex tex="\approx14.23" /> and <Katex tex="\approx25.77" />) lie in <Katex tex="[10,30]" /> and past <Katex tex="a\approx11.12" /> (part e.ii.), so on the curved section: both count. Give them exact.</>,
    more: <>They sit one on each side of the steepest point <Katex tex="x=20" />, as they must. The straight section adds no solutions: its gradient is constant, about <Katex tex="-0.09" /> (part e.iii.), never <Katex tex="-\tfrac{3}{10}" />. No accuracy was asked for, and Section B requires exact values unless told otherwise; the report notes some students gave the approximations. It also notes bracket errors in writing these, such as <Katex tex="\tfrac{\pm10(\sqrt3+6)}{3}" />, and lists this part among those with transcription errors from technology.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="b = h(a) = \dfrac{3a(a-30)^2}{2000}+3" />,
    reason: <><Katex tex="A" /> is on the curved section, so its height comes from part c.'s rule.</>,
  },
  {
    working: <Katex display tex="\text{gradient} = \dfrac{\text{rise}}{\text{run}} = \dfrac{h(a)-10}{a-0}" />,
    reason: <>The straight section runs from the pole top <Katex tex="(0,10)" /> to <Katex tex="A(a,b)" />, so its gradient is rise over run between those two points.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{h(a)-10}{a} = \dfrac{3a^2}{2000}-\dfrac{9a}{100}+\dfrac{27}{20}-\dfrac{7}{a}}" />,
    reason: <>Expanding is optional, but the answer must be <em>in terms of <Katex tex="a" /></em> only.</>,
    more: <>The report notes some students wrote <Katex tex="\tfrac{b-10}{a}" />, which still contains <Katex tex="b" />. The expansion uses <Katex tex="\tfrac{3a(a-30)^2}{2000a}=\tfrac{3(a^2-60a+900)}{2000}" /> and <Katex tex="\tfrac{3-10}{a}=-\tfrac{7}{a}" />.</>,
  },
  {
    working: <Katex display tex="\text{Equivalently: } \dfrac{9(a-30)(a-10)}{2000}" />,
    reason: <>The join is smooth, so the curve's derivative at <Katex tex="x=a" /> is also the gradient at <Katex tex="A" />. The report accepts this form too.</>,
    more: <>Expanded, it is <Katex tex="\tfrac{9a^2}{2000}-\tfrac{9a}{50}+\tfrac{27}{20}" />; the report lists the same thing with <Katex tex="\tfrac{27}{50}" /> in place of <Katex tex="\tfrac{27}{20}" /> among the common incorrect answers. The two expressions in this part are equal only at the value of <Katex tex="a" /> that makes the join smooth, and finding that value is exactly what part e.ii. does.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\underbrace{\dfrac{h(a)-10}{a}}_{\text{straight section}} = \underbrace{\dfrac{9(a-30)(a-10)}{2000}}_{\text{curved section}}" />,
    reason: <>"Smooth join" means both sections have the <em>same</em> gradient at <Katex tex="A" />, so equate the two expressions from part e.i.</>,
    more: <>That gives one equation in the one unknown <Katex tex="a" />. The report notes many students did not equate the correct expressions.</>,
  },
  {
    working: <Katex display tex="\dfrac{3a^2}{2000}-\dfrac{9a}{100}+\dfrac{27}{20}-\dfrac{7}{a} = \dfrac{9(a-30)(a-10)}{2000}" />,
    reason: <>Solve on CAS, restricted to the question's range for <Katex tex="a" />: <Cas fn="solve">solve(3a^2/2000-9a/100+27/20-7/a = 9(a-30)(a-10)/2000, a) | 10&lt;=a&lt;=20</Cas>.</>,
    more: <>The restriction is not optional. Without it the equation has three solutions, <Katex tex="a\approx-7.85" />, <Katex tex="11.12" /> and <Katex tex="26.74" />, and only one lies in <Katex tex="[10,20]" />.</>,
  },
  {
    working: <Katex display tex="a \approx 11.1157\ldots \implies a\approx11.12" />,
    reason: <>The one solution in <Katex tex="[10,20]" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="b = h(a) = \dfrac{3(11.1157\ldots)(11.1157\ldots-30)^2}{2000}+3" />
        <Katex display tex="\approx 8.9461" />
      </>
    ),
    reason: <>The question wants both coordinates, so substitute the <em>unrounded</em> <Katex tex="a" /> into <Katex tex="h" /> to get <Katex tex="b" />.</>,
    more: <>The report notes some students found the value of <Katex tex="a" /> but not the value of <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx (11.12,\ 8.95)}" />,
    reason: <>Both coordinates, each rounded (not truncated) to two decimal places.</>,
    more: <>Sanity check against the given figure: <Katex tex="A" /> is drawn just past <Katex tex="x=10" /> at a height a little under <Katex tex="9" />. ✓</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{Gradient at } A = \dfrac{9(a-30)(a-10)}{2000}" />
        <Katex display tex="\text{with } a\approx11.1157\ldots" />
      </>
    ),
    reason: <>Use part e.i.'s derivative form with part e.ii.'s value of <Katex tex="a" />, again unrounded.</>,
  },
  {
    working: <Katex display tex="= \dfrac{9(11.1157-30)(11.1157-10)}{2000} \approx -0.0948" />,
    reason: <>At this <Katex tex="a" /> the two expressions from part e.i. are equal (that is how <Katex tex="a" /> was found), so use the simpler derivative form.</>,
    more: <>The straight-section form gives the same <Katex tex="-0.0948" />. On CAS, substitute the stored solution for <Katex tex="a" /> rather than retyping a rounded value.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx -0.1}" />,
    reason: <>Correct to one decimal place.</>,
    more: <>The sign makes sense: at <Katex tex="A" /> the cable has just started its gentle descent, so the gradient is small and negative. The smooth-join explorer in part e.ii. shows the same number in its readout once the corner disappears.</>,
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
          <Katex tex="y" /> is the height, in metres, above this origin, as shown in the graph
          below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={hillSrc} alt="The hill y = 3x(x−30)²/2000 on x ∈ [0, 30], rising to a peak at (10, 6) and falling back to zero at x = 30, from the original 2019 VCAA exam paper" className="w-full max-w-[400px]" />
        </div>
      </div>

      <PartCard letter="a" topic="Derivative" marks={1} statement={<>Find <Katex tex="\dfrac{dy}{dx}" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Decreasing Gradient" marks={1} statement="State the set of values for which the gradient of the hill is strictly decreasing." examinerReport={EXAM_B}>
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
        <Explore title="The hill falls on [10, 30], but its gradient falls on (0, 20]">
          <GradientFallsWidget />
        </Explore>
        <WrongMethod
          title="The gradient is decreasing where the hill is going down"
          source="Examiner's report"
          working={<Katex display tex="\dfrac{dy}{dx}\le 0 \implies x\in[10,30]" />}
        >
          This finds where the gradient is <em>negative</em> (where the hill is decreasing), not where the gradient is{' '}
          <em>decreasing</em>. On <Katex tex="(20,30]" /> the gradient is negative but climbing, from{' '}
          <Katex tex="-\tfrac{9}{20}" /> back up to <Katex tex="0" />, as the descent eases off; and on{' '}
          <Katex tex="(0,10)" /> it is positive but falling. To catch it, ask whose behaviour the question is about:
          &ldquo;the gradient &hellip; is decreasing&rdquo; means differentiate the gradient.
        </WrongMethod>
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
          the hill from <Katex tex="a\le x\le30" />, as shown in the graph below.
        </p>
        <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={hillCableSrc} alt="The hill with the dashed cable above it: straight from (0, 10) to A(a, b), then exactly 3 m above the hill all the way to x = 30, from the original 2019 VCAA exam paper" className="w-full max-w-[460px]" />
        </div>
      </div>

      <PartCard letter="c" topic="Rule of Function" marks={1} statement={<>State the rule, in terms of <Katex tex="x" />, for the height of the cable above the horizontal axis for <Katex tex="x\in[a,30]" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="The cable starts at the 10 m pole, so add 10"
          source="Examiner's report"
          working={<Katex display tex="h(x)=\dfrac{3x(x-30)^2}{2000}+10" />}
        >
          The <Katex tex="10" /> m is the height of the pole at <Katex tex="x=0" />, which is on the <em>straight</em>{' '}
          section; the curved section's rule comes from the &ldquo;<Katex tex="3" /> m vertically above&rdquo;
          condition. A one-point check exposes it: at <Katex tex="x=30" /> the hill is at ground level and the figure
          marks the cable <Katex tex="3" /> m up, but this rule gives <Katex tex="10" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="Average Gradient" marks={3} statement={<>Find the values of <Katex tex="x" /> for which the gradient of the cable is equal to the average gradient of the hill for <Katex tex="x\in[10,30]" />.</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            The <b>average gradient</b> of a curve between two points is just the gradient of the
            straight line joining them:{' '}
            <Katex tex="\dfrac{y(b)-y(a)}{b-a}" />. It is <em>not</em> the average value of the
            function — the report notes some students used the average value of{' '}
            <Katex tex="h" />, <Katex tex="\tfrac{1}{30-10}\int_{10}^{30}h(x)\,dx" />, instead.
          </p>
          <p>
            So this part has two halves: work out that one number from the hill's endpoints,
            then find where the cable's <em>instantaneous</em> gradient equals it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="Average gradient is a chord; the answers are where a tangent runs parallel to it">
          <ParallelTangentWidget />
        </Explore>
        <WrongMethod
          title="Average gradient = (6 − 0)/(30 − 10) = 3/10"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\dfrac{9(x-30)(x-10)}{2000}=\dfrac{3}{10}" />
              <Katex display tex="x=20\pm\sqrt{\tfrac{500}{3}}\approx 7.09 \text{ or } 32.91" />
            </>
          }
        >
          Subtracting the heights in the wrong order flips the sign. The hill <em>falls</em> from{' '}
          <Katex tex="6" /> m to <Katex tex="0" /> m over <Katex tex="[10,30]" />, so its average gradient must be
          negative, as a glance at the graph confirms. The follow-through gives it away
          too: both solutions lie outside <Katex tex="[10,30]" />, because on that interval the cable's gradient is
          never positive.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The gradients of the straight and curved sections of the cable approach the same
          value at <Katex tex="x=a" />, so there is a continuous and smooth join at{' '}
          <Katex tex="A" />.
        </p>
      </div>

      <PartCard letter="e.i" topic="Gradient" marks={1} statement={<>State the gradient of the cable at <Katex tex="A" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_EI}>
        <Background>
          <p>
            <Katex tex="A" /> is the seam between the two halves of the cable, so there are two
            ways to describe the gradient there — the straight section's, which is a rise-over-run
            calculation, and the curved section's, which is a derivative. Part e.ii. needs both,
            because it equates them.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EI} />
        <WrongMethod
          title="A is on the hill, so its height is f(a)"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\dfrac{f(a)-10}{a}=\dfrac{3a(a-30)^2-20000}{2000a}" />
              <Katex display tex="=\dfrac{3a^2}{2000}-\dfrac{9a}{100}+\dfrac{27}{20}-\dfrac{10}{a}" />
            </>
          }
        >
          Both of these forms appear among the report's common incorrect answers. <Katex tex="A" /> is on the{' '}
          <em>cable</em>, which is <Katex tex="3" /> m above the hill there, so its height is{' '}
          <Katex tex="h(a)=f(a)+3" />. The tell-tale sign is the <Katex tex="-\tfrac{10}{a}" /> term: with the correct
          height it is <Katex tex="\tfrac{3-10}{a}=-\tfrac{7}{a}" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e.ii" topic="Smooth Join" marks={3} statement={<>Find the coordinates of <Katex tex="A" />, with each value correct to two decimal places.</>} examinerReport={EXAM_EII}>
        <Background>
          <p>
            A <b>smooth join</b> means no corner: the straight section arrives at <Katex tex="A" /> with exactly the
            gradient the curve leaves with. Picture it the other way round — the straight section is then a piece
            of the <em>tangent</em> to the curve at <Katex tex="A" />, and since it starts at the pole top, that
            tangent must pass through <Katex tex="(0,10)" />.
          </p>
          <p>
            That gives two equivalent equations, and the report accepts either: equate the two gradients from part
            e.i., or require the tangent at <Katex tex="A" /> to pass through <Katex tex="(0,10)" />,{' '}
            <Katex tex="a\,h'(a)+10=h(a)" />. Each has one unknown, <Katex tex="a" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EII} />
        <Explore title="Slide A until the corner disappears">
          <SmoothJoinWidget />
        </Explore>
        <WrongMethod
          title="Copy the first two decimal places off the screen"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="a=11.1157\ldots\to11.11" />
              <Katex display tex="b=8.9461\ldots\to8.94" />
            </>
          }
        >
          That truncates rather than rounds, and it produces exactly the report's incorrect{' '}
          <Katex tex="(11.11,\ 8.94)" />. Look at the third decimal place: <Katex tex="11.115\ldots" /> and{' '}
          <Katex tex="8.946\ldots" /> both round <em>up</em>, to <Katex tex="11.12" /> and <Katex tex="8.95" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e.iii" topic="Gradient" marks={1} statement={<>Find the value of the gradient at <Katex tex="A" />, correct to one decimal place.</>} examinerReport={EXAM_EIII}>
        <WorkingTable rows={ROWS_EIII} />
      </PartCard>
    </div>
  )
}
