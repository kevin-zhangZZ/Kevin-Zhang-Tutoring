// 2019 Specialist Mathematics — Exam 2, Section B, Question 1 (11 marks).
// A parametric curve x = sec(t)+1, y = tan(t) — converting to cartesian form, its domain and
// range, dy/dx in terms of sin(t) and its limiting value, a sketch, and a volume of revolution
// integral. Question text transcribed from the original paper (the rule is y = √(x² − 2x)
// throughout, not y² = x² − 2x). VCAA's axes for part d. were blank, so the sketched curve is
// this site's own answer, plotted with matplotlib on VCAA's grid (−4 to 4, gridlines every
// 0.5); it matches the sketch published in the examination report. Cross-checked against the VCAA examination
// report and itute's independent solutions, and verified by computer algebra (the part e.
// integral ≈ 73.66 = π(46√2/3 + sinh⁻¹(2√2)), matching π∫₀^{2√2} x² dy).
// Solution is original.
// Interactive widgets: b. a t-slider tracing the point on y² = x² − 2x, showing only the
// upper-right piece is reached (domain [2, ∞)), with the rule-alone domain x ≤ 0 as a toggle;
// c.ii. a sliding tangent whose gradient 1/sin t falls from vertical to the asymptote's 1;
// e. the solid cut into discs one Δt apart, whose thicknesses Δy ≈ sec²(t)Δt grow up the solid,
// with the report's "replaced dx with dt" slip shown as a squashed stack.
// Wording notes (not changing VCAA's answers): b. asks for the domain of "the relation given by
// y = √(x² − 2x)", which on its own is (−∞, 0] ∪ [2, ∞); the published [2, ∞) presumes the
// parametric restriction on t. e. says the portion of the curve is rotated "to form a solid";
// strictly a curve sweeps out a surface — the intended solid is the region between the curve and
// the y-axis (0 ≤ y ≤ 2√2), which is what the report's π∫x² dy integral gives.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import sketchSrc from './spec-2019e2-q1d-sketch.png'

const TracedWidget = lazyWidget(() => import('../interactives/spec-2019e2-q1b-traced'))
const GradientWidget = lazyWidget(() => import('../interactives/spec-2019e2-q1c-gradient'))
const DiscsWidget = lazyWidget(() => import('../interactives/spec-2019e2-q1e-discs'))

const EXAM_A: SAExaminerStats = {
  marks: [17, 7, 76],
  average: 1.6,
  comment: <>This question was generally done well. Some students took unnecessarily convoluted approaches with the relationships between the trigonometric expressions. Students were required to work from the parametric forms to reach the cartesian form.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 42, 38],
  average: 1.2,
  comment: <>While most students stated the correct range, a significant number gave a domain which did not account for the restriction on <Katex tex="t" />.</>,
}

const EXAM_CI: SAExaminerStats = {
  marks: [27, 12, 61],
  average: 1.4,
  comment: <>Students who differentiated the parametric functions with respect to <Katex tex="t" /> and then applied the chain rule were generally successful. Students who differentiated <Katex tex="y" /> in terms of <Katex tex="x" /> directly were less successful; some left their answer in terms of <Katex tex="x" />, others had difficulty with the subsequent substitution and simplification.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
}

const EXAM_D: SAExaminerStats = {
  marks: [4, 12, 84],
  average: 1.8,
  comment: <>This was generally well done with most students labelling the endpoints with coordinates as required. Students are advised to set viewing windows on technology to a scale that closely matches the scale provided on the examination.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [79, 19, 3],
  average: 0.3,
  comment: (
    <>
      Correct alternatives for the upper terminal of the definite integral include{' '}
      <Katex tex="\arccos\left(\tfrac13\right)" />.
      <br />
      Very few students answered this question correctly. The most common incorrect answer was
      an integral in terms of <Katex tex="x" />. Of those that attempted to give an integral in
      terms of <Katex tex="t" />, most simply replaced <Katex tex="dx" /> with <Katex tex="dt" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sec^2(t) = 1+\tan^2(t)" />,
    reason: <>The Pythagorean identity that links <Katex tex="\sec" /> and <Katex tex="\tan" /> — exactly the two functions in the parametric equations, which is the signal to use it to eliminate <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="x = \sec(t)+1 \implies \sec(t) = x-1, \qquad y=\tan(t)" />,
    reason: <>Make each trigonometric function the subject, so each can be replaced by an expression in <Katex tex="x" /> or <Katex tex="y" /> inside the identity.</>,
  },
  {
    working: <Katex display tex="(x-1)^2 = 1+y^2" />,
    reason: <>Substitute both into the identity.</>,
  },
  {
    working: <Katex display tex="y^2 = (x-1)^2-1 = x^2-2x+1-1 = x^2-2x" />,
    reason: <>Rearrange for <Katex tex="y^2" /> and expand.</>,
  },
  {
    working: <Katex display tex="t\in\left[0,\tfrac{\pi}{2}\right) \implies y=\tan(t)\ge0" />,
    reason: <>The parameter's restriction decides which square root to take: <Katex tex="\tan" /> is non-negative on this interval.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \sqrt{x^2-2x}}" />,
    reason: <>As required. The report notes students were required to work from the parametric forms to reach the cartesian form — so start from <Katex tex="x" /> and <Katex tex="t" />, not from the answer.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="t\in\left[0,\dfrac{\pi}{2}\right) \implies \sec(t)\in[1,\infty)" />,
    reason: <>The curve is the set of points the parameter actually reaches, so start from the <Katex tex="t" />-interval, not from the cartesian rule. <Katex tex="\cos(t)" /> falls from <Katex tex="1" /> to <Katex tex="0^+" /> across this interval, so its reciprocal climbs from <Katex tex="1" /> without bound.</>,
  },
  {
    working: <Katex display tex="x = \sec(t)+1 \in [2,\infty)" />,
    reason: <>Adding <Katex tex="1" /> shifts the interval.</>,
  },
  {
    working: <Katex display tex="y = \tan(t) \in [0,\infty)" />,
    reason: <><Katex tex="\tan(0)=0" /> and <Katex tex="\tan(t)\to\infty" /> as <Katex tex="t\to\tfrac{\pi}{2}^-" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{domain } [2,\infty), \qquad \text{range } [0,\infty)}" />,
    reason: <>Note this is the domain and range of the curve the <em>parameter</em> traces out. The rule <Katex tex="y=\sqrt{x^2-2x}" /> on its own would also allow <Katex tex="x\le0" />; the restriction on <Katex tex="t" /> removes that branch. The report notes a significant number gave a domain which did not account for the restriction on <Katex tex="t" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dx}{dt} = \sec(t)\tan(t), \qquad \dfrac{dy}{dt} = \sec^2(t)" />,
    reason: <>Standard derivatives: <Katex tex="\tfrac{d}{dt}\sec(t)=\sec(t)\tan(t)" /> and <Katex tex="\tfrac{d}{dt}\tan(t)=\sec^2(t)" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt} = \dfrac{\sec^2(t)}{\sec(t)\tan(t)} = \dfrac{\sec(t)}{\tan(t)}" />,
    reason: <>The chain rule in parametric form — no need to go back to <Katex tex="x" /> and <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="= \dfrac{1}{\cos(t)}\times\dfrac{\cos(t)}{\sin(t)}" />,
    reason: <>Write both in terms of <Katex tex="\sin" /> and <Katex tex="\cos" />; the <Katex tex="\cos(t)" /> cancels.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{dy}{dx} = \dfrac{1}{\sin(t)}}" />,
    reason: <>Equivalently <Katex tex="\operatorname{cosec}(t)" />, but the question asked for it in terms of <Katex tex="\sin(t)" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{As } t\to\dfrac{\pi}{2}^-: \quad \sin(t)\to1" />,
    reason: <><Katex tex="t" /> never actually equals <Katex tex="\tfrac{\pi}{2}" /> (the interval is open there), which is why the question asks for a <em>limiting</em> value. But <Katex tex="\tfrac{1}{\sin(t)}" /> is continuous at <Katex tex="\tfrac{\pi}{2}" /> and <Katex tex="\sin\left(\tfrac{\pi}{2}\right)=1" />, so the limit is found by substituting. Don&apos;t be put off by <Katex tex="x" /> and <Katex tex="y" /> both going to infinity: the gradient can still settle.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{dy}{dx} \to 1}" />,
    reason: <>So far out along the curve the gradient settles at <Katex tex="1" /> — the curve approaches the asymptote <Katex tex="y=x-1" /> of the hyperbola <Katex tex="(x-1)^2-y^2=1" />, which has gradient <Katex tex="1" />. ✓</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="y = \sqrt{x^2-2x}, \quad x\in[2,4]" />,
    reason: <>Only non-negative <Katex tex="y" />-values (part b.), and only the stretch of the curve from <Katex tex="x=2" /> to <Katex tex="x=4" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x=2: \ y=\sqrt{4-4}=0" />
        <Katex display tex="x=4: \ y=\sqrt{16-8}=\sqrt8=2\sqrt2" />
      </>
    ),
    reason: <>The two endpoints, which the question requires to be labelled with their coordinates. Leave <Katex tex="2\sqrt2" /> exact in the label, but use <Katex tex="2\sqrt2\approx2.83" /> to place the point just below the <Katex tex="y=3" /> gridline.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={sketchSrc} alt="The curve y = √(x² − 2x) from (2, 0), where it starts with a vertical tangent, rising to (4, 2√2), drawn on VCAA's grid from −4 to 4" className="w-full max-w-[340px]" />
      </div>
    ),
    reason: <>Starting at <Katex tex="(2,0)" /> with a vertical tangent (the gradient <Katex tex="\tfrac{1}{\sin t}" /> is undefined at <Katex tex="t=0" />) and flattening towards gradient <Katex tex="1" /> as it climbs — exactly what parts c.i. and c.ii. predicted.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_0^{2\sqrt2} x^2\,dy" />,
    reason: <>Picture the solid first: the region between the curve and the <Katex tex="y" />-axis spun about the <Katex tex="y" />-axis, a vase of radius <Katex tex="2" /> at the base and <Katex tex="4" /> at the top. Slice it horizontally: each slice is a disc at height <Katex tex="y" /> with radius <Katex tex="x" /> (the distance from the axis out to the curve) and thickness <Katex tex="dy" />, so its volume is <Katex tex="\pi x^2\,dy" />. The discs run from <Katex tex="y=0" /> to <Katex tex="y=2\sqrt2" /> (part d.). The report says the most common incorrect answer was an integral in terms of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="dy = \dfrac{dy}{dt}\,dt = \sec^2(t)\,dt" />,
    reason: <>The question wants <Katex tex="t" />, so the variable of integration changes from <Katex tex="y" /> to <Katex tex="t" /> — and whenever the variable changes, the differential changes with it, exactly as <Katex tex="du=u'(x)\,dx" /> in a substitution. A step <Katex tex="dt" /> in the parameter moves <Katex tex="y" /> by <Katex tex="\tfrac{dy}{dt}\,dt" />, not by <Katex tex="dt" />. The report notes that of those who attempted an integral in terms of <Katex tex="t" />, most simply replaced <Katex tex="dx" /> with <Katex tex="dt" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="y=0 \implies \tan(t)=0 \implies t=0" />
        <Katex display tex="y=2\sqrt2 \implies \tan(t)=2\sqrt2 \implies t=\tan^{-1}\!\left(2\sqrt2\right)" />
        <Katex display tex="\tan^{-1}\!\left(2\sqrt2\right)=\cos^{-1}\!\left(\tfrac13\right)" />
      </>
    ),
    reason: <>The terminals are <Katex tex="y" />-values, so they must be converted to <Katex tex="t" />-values too, using <Katex tex="y=\tan(t)" /> with <Katex tex="t\in\left[0,\tfrac{\pi}{2}\right)" />. The report gives <Katex tex="\tan^{-1}\!\left(2\sqrt2\right)" /> and accepts <Katex tex="\cos^{-1}\!\left(\tfrac13\right)" />: at the top <Katex tex="x=4" />, so <Katex tex="\sec(t)=3" /> and <Katex tex="\cos(t)=\tfrac13" /> — the same angle.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^{\tan^{-1}(2\sqrt2)} \bigl(\sec(t)+1\bigr)^2\sec^2(t)\,dt}" />,
    reason: <>The question says to write it down but not evaluate it, so stop here — substituting <Katex tex="x=\sec(t)+1" /> and <Katex tex="dy=\sec^2(t)\,dt" /> is the whole task.</>,
  },
]

export default function SpecialistQ1_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          A curve is defined parametrically by <Katex tex="x=\sec(t)+1" />,{' '}
          <Katex tex="y=\tan(t)" />, where <Katex tex="t\in\left[0,\dfrac{\pi}{2}\right)" />.
        </p>
      </div>

      <PartCard letter="a" topic="Cartesian Equation" marks={2} statement={<>Show that the curve can be represented in cartesian form by the rule <Katex tex="y=\sqrt{x^2-2x}" />.</>} examinerReport={EXAM_A}>
        <Background>
          <p>
            Converting a parametric curve to cartesian form means <b>eliminating the
            parameter</b>. When the two equations involve a matched pair of trigonometric
            functions, the tool is almost always a Pythagorean identity — here{' '}
            <Katex tex="\sec^2(t)=1+\tan^2(t)" />, which turns "<Katex tex="x" /> in terms of{' '}
            <Katex tex="\sec" />, <Katex tex="y" /> in terms of <Katex tex="\tan" />" into a
            single equation in <Katex tex="x" /> and <Katex tex="y" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Domain & Range" marks={2} statement={<>State the domain and range of the relation given by <Katex tex="y=\sqrt{x^2-2x}" />.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            A parametric curve is the path traced by the point{' '}
            <Katex tex="\bigl(x(t),y(t)\bigr)" /> as <Katex tex="t" /> runs through its interval. So
            its domain is the set of values <Katex tex="x(t)" /> takes over that interval, and its
            range is the set of values <Katex tex="y(t)" /> takes. The cartesian rule from part a.
            describes the same points, but on its own it can allow extra ones the parameter never
            reaches.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="The parameter traces only one piece, so the domain starts at x = 2">
          <TracedWidget />
        </Explore>
        <WrongMethod
          title="Get the domain from x² − 2x ≥ 0"
          source="Examiner's report"
          working={<Katex display tex="x^2-2x\ge0 \implies x\le0 \text{ or } x\ge2" />}
        >
          The report notes a significant number gave a domain which did not account for the restriction
          on <Katex tex="t" />. This is how that happens: it finds where the square root is defined, not
          where the curve actually is. With <Katex tex="t\in\left[0,\tfrac{\pi}{2}\right)" />,{' '}
          <Katex tex="\sec(t)\ge1" />, so <Katex tex="x=\sec(t)+1\ge2" /> and the branch{' '}
          <Katex tex="x\le0" /> is never traced. To catch it, read the domain and range off{' '}
          <Katex tex="x(t)" /> and <Katex tex="y(t)" /> over the given <Katex tex="t" />-interval.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c.i" topic="Parametric Derivative" marks={2} statement={<>Express <Katex tex="\dfrac{dy}{dx}" /> in terms of <Katex tex="\sin(t)" />.</>} examinerReport={EXAM_CI}>
        <Background>
          <p>
            For a parametric curve you never need the cartesian rule to differentiate — use{' '}
            <Katex tex="\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt}" />, which is just the chain rule
            rearranged. Differentiate each coordinate with respect to the parameter and divide.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <WrongMethod
          title="Differentiate y = √(x² − 2x) and leave it in x"
          source="Examiner's report"
          working={<Katex display tex="\dfrac{dy}{dx}=\dfrac{2x-2}{2\sqrt{x^2-2x}}=\dfrac{x-1}{\sqrt{x^2-2x}}" />}
        >
          This derivative is correct, but it is not what was asked. The report says students who
          differentiated <Katex tex="y" /> in terms of <Katex tex="x" /> directly were less successful:
          some left their answer in terms of <Katex tex="x" />, others had difficulty with the
          substitution and simplification. To finish, substitute <Katex tex="x-1=\sec(t)" /> and{' '}
          <Katex tex="\sqrt{x^2-2x}=\tan(t)" /> (part a.) to get{' '}
          <Katex tex="\tfrac{\sec(t)}{\tan(t)}=\tfrac{1}{\sin(t)}" />, the long way round. When{' '}
          <Katex tex="x" /> and <Katex tex="y" /> are both given in terms of <Katex tex="t" />,{' '}
          <Katex tex="\tfrac{dy/dt}{dx/dt}" /> lands in <Katex tex="t" /> directly.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c.ii" topic="Limiting Gradient" marks={1} statement={<>State the limiting value of <Katex tex="\dfrac{dy}{dx}" /> as <Katex tex="t" /> approaches <Katex tex="\dfrac{\pi}{2}" />.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
        <Explore title="Why the gradient starts vertical and settles at 1">
          <GradientWidget />
        </Explore>
      </PartCard>

      <PartCard letter="d" topic="Sketch Graph" marks={2} statement={<>Sketch the curve <Katex tex="y=\sqrt{x^2-2x}" /> on the axes below for <Katex tex="x\in[2,4]" />, labelling the endpoints with their coordinates.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" topic="Volume of Revolution" marks={2} statement={<>The portion of the curve given by <Katex tex="y=\sqrt{x^2-2x}" /> for <Katex tex="x\in[2,4]" /> is rotated about the <Katex tex="y" />-axis to form a solid of revolution.<br />Write down, but do not evaluate, a definite integral in terms of <Katex tex="t" /> that gives the volume of the solid formed.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            Two things change when you rotate about the <Katex tex="y" />-axis instead of the{' '}
            <Katex tex="x" />-axis: the radius of a slice is <Katex tex="x" /> (not{' '}
            <Katex tex="y" />), and you integrate with respect to <Katex tex="y" /> (not{' '}
            <Katex tex="x" />). So <Katex tex="V=\pi\int x^2\,dy" />. Because the answer is
            wanted in terms of <Katex tex="t" />, both the integrand <em>and</em> the terminals
            then have to be converted to the parameter.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="Why dy becomes sec²(t) dt: equal steps in t give unequal discs">
          <DiscsWidget />
        </Explore>
        <WrongMethod
          title="Just swap the d-variable for dt"
          source="Examiner's report"
          working={<Katex display tex="V=\pi\int_0^{\tan^{-1}(2\sqrt2)}\bigl(\sec(t)+1\bigr)^2\,dt\approx23.8" />}
        >
          The report says that of those who attempted an integral in terms of <Katex tex="t" />, most
          simply replaced <Katex tex="dx" /> with <Katex tex="dt" />. Whichever differential is swapped,
          the slip treats a step in <Katex tex="t" /> as if it were a step of the same size in the
          slicing variable. Here <Katex tex="y=\tan(t)" />, so <Katex tex="dy=\sec^2(t)\,dt" />, and{' '}
          <Katex tex="\sec^2(t)" /> grows from <Katex tex="1" /> to <Katex tex="9" /> up the solid.
          Dropping it gives about <Katex tex="23.8" /> instead of the true <Katex tex="73.7" /> — in the
          widget, the red discs only stack up to height <Katex tex="1.23" />. To catch it, change the
          differential every time you change the variable, as in any substitution.
        </WrongMethod>
        <WrongMethod
          title="Write the volume as an integral in x"
          source="Examiner's report"
          working={<Katex display tex="V=\pi\int_2^4 y^2\,dx=\pi\int_2^4\left(x^2-2x\right)dx" />}
        >
          The report says the most common incorrect answer was an integral in terms of{' '}
          <Katex tex="x" />. Any <Katex tex="x" />-integral misses the instruction &ldquo;in terms
          of <Katex tex="t" />&rdquo;. The familiar one shown here is also the wrong solid:{' '}
          <Katex tex="\pi\int y^2\,dx" /> stacks discs of radius <Katex tex="y" /> along the{' '}
          <Katex tex="x" />-axis, which is rotation about the <Katex tex="x" />-axis (it gives{' '}
          <Katex tex="\tfrac{20\pi}{3}\approx20.9" />). About the <Katex tex="y" />-axis the discs are
          horizontal, so start from <Katex tex="\pi\int x^2\,dy" />, then convert everything to{' '}
          <Katex tex="t" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
