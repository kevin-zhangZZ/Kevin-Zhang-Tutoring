// 2018 Specialist Mathematics — Exam 2, Section B, Question 3 (13 marks). A fountain modelled
// as a volume of revolution about the y-axis, then filled against an outflow: a related-rates
// differential equation, a time integral, Euler's method and a steady state. Question text
// transcribed from the original paper; the figure is cropped directly from the exam PDF, not
// a redrawing. Answers re-derived in sympy/scipy and checked against the VCAA examination
// report. Solution is original.
//
// Interactive widgets: a. the water as a stack of discs of radius x(y); b. half the volume vs
// half the depth (volume gauge beside the fountain); c.i. dV/dh as the area of the water surface
// (the same 0.1 m³ makes a thinner layer higher up); d. the time as the area under dt/dh;
// e. one Euler step along the tangent vs the true depth curve; f. inflow vs outflow bars as the
// level settles at h = 0.64, 0.23 m below the rim. WrongMethod boxes for b, c.i and f, each from
// the examiner's report.
//
// Source disagreement: itute gives h = 0.68 m for part b. That is the half volume in cubic
// metres (√3π/8 ≈ 0.680), not the depth; solving V(h) = √3π/8 gives h ≈ 0.5909, matching the
// VCAA report's 0.59.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import fountainSrc from './spec-2018e2-q3-fountain.png'

const DiscsWidget = lazyWidget(() => import('../interactives/spec-2018e2-q3a-discs'))
const HalfWidget = lazyWidget(() => import('../interactives/spec-2018e2-q3b-half'))
const LayerWidget = lazyWidget(() => import('../interactives/spec-2018e2-q3ci-layer'))
const AreaWidget = lazyWidget(() => import('../interactives/spec-2018e2-q3d-area'))
const EulerWidget = lazyWidget(() => import('../interactives/spec-2018e2-q3e-euler'))
const SettleWidget = lazyWidget(() => import('../interactives/spec-2018e2-q3f-settle'))

const EXAM_A: SAExaminerStats = {
  marks: [40, 27, 32],
  average: 0.9,
  comment: (
    <>
      Approximately half of the students were able to either set up an appropriate definite
      integral or find an antiderivative and attempt to evaluate the constant of integration.
      Of these, many did not explicitly show that the first part of their response yielded the
      required volume.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [28, 17, 56],
  average: 1.3,
  comment: (
    <>
      While the approach above was the most common, other correct approaches were used. A
      common error was to fail to halve the volume.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [34, 30, 36],
  average: 1.0,
  comment: (
    <>
      Most students were able to correctly state <Katex tex="\tfrac{dV}{dt}" /> and find{' '}
      <Katex tex="\tfrac{dV}{dh}" /> and then use this to find <Katex tex="\tfrac{dh}{dV}" />{' '}
      before proceeding. A few students did not understand the importance of brackets when
      multiplying the derivative expressions.
      <br />
      Many students moved directly from the product of the derivatives to the required
      expression, without explicitly showing that their product led to the final (given)
      answer.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [26, 74],
  average: 0.8,
  comment: (
    <>
      The majority of students were able to use the supplied derivative to find the required
      rate for the given depth. Some students did not give the answer in the required decimal
      form.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [34, 10, 56],
  average: 1.2,
  comment: (
    <>
      Most students were able to set up a correct definite integral. Transcription errors
      were occasionally present in the integrand.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [64, 10, 25],
  average: 0.6,
  comment: (
    <>
      Many students did not explicitly demonstrate their use of Euler's method. Of those who
      did, a number incorrectly substituted into their expression.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [61, 15, 24],
  average: 0.7,
  comment: (
    <>
      Most students who attempted this question understood that they need to solve{' '}
      <Katex tex="\tfrac{dh}{dt}=0" /> to find the limiting water level. Many students who
      correctly found <Katex tex="h" /> did not subtract their value from the height of the
      top of the fountain.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} y &= \tfrac12\sqrt{4x^2-1} \\ 4y^2 &= 4x^2-1 \\ x^2 &= \frac{4y^2+1}{4} \end{aligned}" />,
    reason: <>Rotating about the <Katex tex="y" />-axis slices the water into <em>horizontal</em> discs. The disc at height <Katex tex="y" /> reaches out to the curve, so its radius is the curve's <Katex tex="x" />-value there and its area is <Katex tex="\pi x^2" />. That area must be written in terms of <Katex tex="y" />, so rearrange the given rule for <Katex tex="x^2" /> rather than integrating it as given.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_0^h x^2\,dy = \pi\int_0^h \frac{4y^2+1}{4}\,dy" />,
    reason: <>Stack the discs (<Katex tex="dy" />, because they pile up vertically) from the bottom of the fountain, <Katex tex="y=0" />, up to the water surface, <Katex tex="y=h" />. The bottom is flat: the curve meets the <Katex tex="x" />-axis at <Katex tex="x=\tfrac12" />, so the lowest disc has radius <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{4}\left[\frac{4y^3}{3}+y\right]_0^h" />,
    reason: <>Take out the constant <Katex tex="\tfrac{\pi}{4}" /> and antidifferentiate term by term: <Katex tex="4y^2 \to \tfrac{4y^3}{3}" /> and <Katex tex="1 \to y" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{\pi}{4}\left(\frac{4h^3}{3}+h\right)}" />,
    reason: <>The lower terminal contributes <Katex tex="0" />. Write this last line out explicitly: the report says many students did not explicitly show that their working yielded the required volume. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Top of the fountain: } y = \frac{\sqrt3}{2} \ \text{ at } x=1" />,
    reason: <>Read from the figure: the curve is drawn up to <Katex tex="\left(1,\tfrac{\sqrt3}{2}\right)" />, so the fountain is <Katex tex="\tfrac{\sqrt3}{2}\approx0.866" /> m deep when full.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} V_{\text{full}} &= \frac{\pi}{4}\left(\frac{4}{3}\left(\frac{\sqrt3}{2}\right)^3+\frac{\sqrt3}{2}\right) \\ &= \frac{\sqrt3\,\pi}{4} \end{aligned}" />,
    reason: <>Substitute the full depth into part a.: <Katex tex="\tfrac43\cdot\tfrac{3\sqrt3}{8}=\tfrac{\sqrt3}{2}" />, so the bracket is <Katex tex="\sqrt3" />.</>,
  },
  {
    working: <Cas fn="solve">solve(π/4*(4h^3/3+h) = √3π/8, h) | 0&lt;h&lt;√3/2</Cas>,
    reason: <>Set the volume equal to <em>half</em> the full volume, <Katex tex="\tfrac{\sqrt3\pi}{8}\approx0.680" /> m³, and solve for the depth. <Katex tex="V" /> increases with <Katex tex="h" />, so there is exactly one solution in the fountain. The report names failing to halve as a common error.</>,
  },
  {
    working: <Katex display tex="\boxed{h \approx 0.59 \text{ m}}" />,
    reason: <>Two decimal places. Sensible: well above half the full depth (<Katex tex="\tfrac{\sqrt3}{4}\approx0.433" />), because the bowl is narrow at the bottom. Filling to half the depth holds only <Katex tex="\tfrac{5}{16}" /> of the water.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dV}{dt} = 0.04 - 0.05\sqrt{h}" />,
    reason: <>The volume changes at (rate in) − (rate out): the jet adds <Katex tex="0.04" /> m³/s and the drain removes <Katex tex="0.05\sqrt h" /> m³/s.</>,
  },
  {
    working: <Katex display tex="\frac{dV}{dh} = \frac{\pi}{4}\left(4h^2+1\right)" />,
    reason: <>Differentiate part a. with respect to <Katex tex="h" />: <Katex tex="\tfrac{\pi}{4}\left(\tfrac{12h^2}{3}+1\right)" />. This is the area of the water surface, <Katex tex="\pi x^2" /> at <Katex tex="y=h" />: raising the level by a thin <Katex tex="\delta h" /> adds a slab of volume (area) × <Katex tex="\delta h" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{dh}{dt} &= \frac{dh}{dV}\times\frac{dV}{dt} \\ &= \frac{4}{\pi\left(4h^2+1\right)}\times\left(0.04-0.05\sqrt h\right) \end{aligned}" />,
    reason: <>How would I know to do this? I have <Katex tex="\tfrac{dV}{dt}" />, I want <Katex tex="\tfrac{dh}{dt}" />, and part a. links <Katex tex="V" /> to <Katex tex="h" />, so chain through <Katex tex="V" />, with <Katex tex="\tfrac{dh}{dV}" /> the reciprocal of <Katex tex="\tfrac{dV}{dh}" />. Keep the whole net rate <Katex tex="0.04-0.05\sqrt h" /> in brackets.</>,
  },
  {
    working: <Katex display tex="= \frac{0.16-0.2\sqrt h}{\pi\left(4h^2+1\right)}" />,
    reason: <>Multiply out the numerator: <Katex tex="4\times0.04=0.16" /> and <Katex tex="4\times0.05=0.2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt} = \frac{4-5\sqrt h}{25\pi\left(4h^2+1\right)}}" />,
    reason: <>Multiplying top and bottom by <Katex tex="25" /> clears the decimals: <Katex tex="25\times0.16=4" /> and <Katex tex="25\times0.2=5" />. Show this step: the report says many students moved directly from the product of the derivatives to the given answer. As required.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \frac{dh}{dt}\bigg|_{h=0.25} &= \frac{4-5\sqrt{0.25}}{25\pi\left(4(0.25)^2+1\right)} \\ &= \frac{4-2.5}{25\pi(1.25)} \end{aligned}" />,
    reason: <>Substitute into the rule from c.i.: <Katex tex="\sqrt{0.25}=0.5" /> and <Katex tex="4(0.0625)+1=1.25" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.0153 \text{ m s}^{-1}}" />,
    reason: <>Four decimal places, as asked. The exact value is <Katex tex="\tfrac{6}{125\pi}" />, but the report notes that some students did not give the answer in the required decimal form. Positive, so the fountain is still filling at this depth.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dt}{dh} = \frac{1}{\frac{dh}{dt}} = \frac{25\pi\left(4h^2+1\right)}{4-5\sqrt h}" />,
    reason: <>The question wants a <em>time</em>, and the rate is given in terms of <Katex tex="h" /> only, so flip it: <Katex tex="\tfrac{dt}{dh}" /> is the number of seconds each metre of depth takes. Flip the whole fraction.</>,
  },
  {
    working: <Katex display tex="t = \int_0^{0.25}\frac{25\pi\left(4h^2+1\right)}{4-5\sqrt h}\,dh" />,
    reason: <>Add those seconds up over the depth. The fountain starts empty, so the lower terminal is <Katex tex="h=0" />. Copy the integrand carefully: the report notes transcription errors in the integrand.</>,
  },
  {
    working: <Cas fn="nInt">nInt(25π(4h^2+1)/(4-5√h), h, 0, 0.25)</Cas>,
    reason: <>The question asks for a value to the nearest tenth, so evaluate numerically. There is no need to antidifferentiate.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} t &= \int_0^{0.25}\frac{25\pi\left(4h^2+1\right)}{4-5\sqrt h}\,dh \\ &\approx 9.8 \text{ seconds} \end{aligned}}" />,
    reason: <>To the nearest tenth. Rough check: <Katex tex="\tfrac{dh}{dt}" /> falls from <Katex tex="\tfrac{4}{25\pi}\approx0.051" /> at <Katex tex="h=0" /> to <Katex tex="0.0153" /> at <Katex tex="h=0.25" /> (part c.ii.), so the time must lie between <Katex tex="\tfrac{0.25}{0.051}\approx4.9" /> and <Katex tex="\tfrac{0.25}{0.0153}\approx16" /> seconds.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="h_{n+1} = h_n + \delta\,\frac{dh}{dt}\bigg|_{h_n}" />,
    reason: <>Euler's method walks along the tangent: new depth = old depth + step × slope. Write this line down: the report says many students did not explicitly demonstrate their use of Euler's method.</>,
  },
  {
    working: <Katex display tex="h_0 = 0.4 \ \text{ at } t=25, \qquad \delta = 5" />,
    reason: <>Start from the information given, not from <Katex tex="t=0" />. One step of five seconds takes <Katex tex="t=25" /> to <Katex tex="t=30" />, which is what the question asks for.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{dh}{dt}\bigg|_{h=0.4} &= \frac{4-5\sqrt{0.4}}{25\pi\left(4(0.4)^2+1\right)} \\ &\approx 0.006504 \end{aligned}" />,
    reason: <>The slope comes from the <em>start</em> of the step. The rule is written in terms of <Katex tex="h" />, so substitute the depth <Katex tex="0.4" />; the time <Katex tex="t=25" /> does not go into it at all. The report says a number of students substituted incorrectly.</>,
  },
  {
    working: <Katex display tex="h_1 = 0.4 + 5(0.006504) \approx 0.4325" />,
    reason: <>Step × slope is the rise along the tangent over five seconds.</>,
  },
  {
    working: <Katex display tex="\boxed{h \approx 0.43 \text{ m}}" />,
    reason: <>Two decimal places. Solving the differential equation numerically from <Katex tex="(25,\,0.4)" /> gives about <Katex tex="0.429" /> at <Katex tex="t=30" />: Euler overshoots slightly because the depth curve bends down (the rate keeps falling as the fountain widens and the outflow grows). Both round to <Katex tex="0.43" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Stabilises} \iff \frac{dh}{dt} = 0 \iff 4-5\sqrt h = 0" />,
    reason: <>"Ultimately stabilises" means the depth stops changing. The denominator <Katex tex="25\pi(4h^2+1)" /> is always positive, so only the numerator can be zero: that is where the inflow <Katex tex="0.04" /> equals the outflow <Katex tex="0.05\sqrt h" />.</>,
  },
  {
    working: <Katex display tex="\sqrt h = \frac45 \implies h = \frac{16}{25} = 0.64 \text{ m}" />,
    reason: <>The limiting depth. The level really does head here: for <Katex tex="h<0.64" />, <Katex tex="4-5\sqrt h>0" />, so the water keeps rising towards <Katex tex="0.64" />, more and more slowly.</>,
  },
  {
    working: <Katex display tex="\text{Top of the fountain at } y = \frac{\sqrt3}{2} \approx 0.8660" />,
    reason: <>From the figure, as in part b. Since <Katex tex="0.64 < 0.866" />, the fountain never overflows.</>,
  },
  {
    working: <Katex display tex="\frac{\sqrt3}{2} - 0.64 \approx 0.2260" />,
    reason: <>The question asks how far <em>from the top</em> the level settles, not what the depth is. The report says many students who correctly found <Katex tex="h" /> did not subtract it from the height of the top of the fountain.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.23 \text{ m below the top}}" />,
    reason: <>Two decimal places. So the fountain never quite fills: it stabilises about <Katex tex="23" /> cm short of the rim. Only <Katex tex="24\%" /> of students scored both marks.</>,
  },
]

export default function SpecialistQ3_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (13 marks)</p>
        <p className="mb-3">
          Part of the graph of <Katex tex="y=\dfrac12\sqrt{4x^2-1}" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={fountainSrc} alt="Part of the graph of y = ½√(4x²−1), rising from (½, 0) to (1, √3/2), from the original 2018 VCAA exam paper" className="w-full max-w-[380px]" />
        </div>
        <p className="mt-3">
          The curve shown is rotated about the <Katex tex="y" />-axis to form a volume of
          revolution that is to model a fountain, where length units are in metres.
        </p>
      </div>

      <PartCard letter="a" topic="Volume of Revolution" marks={2} statement={<>Show that the volume, <Katex tex="V" /> cubic metres, of water in the fountain when it is filled to a depth of <Katex tex="h" /> metres is given by <Katex tex="V=\dfrac{\pi}{4}\left(\dfrac{4h^3}{3}+h\right)" />.</>} examinerReport={EXAM_A}>
        <Background>
          <p>
            Rotating about the <Katex tex="y" />-axis: <Katex tex="V=\pi\int_c^d x^2\,dy" />,
            with <Katex tex="x^2" /> written in terms of <Katex tex="y" />. Why: a thin
            horizontal slice of the solid at height <Katex tex="y" /> is a disc of radius{' '}
            <Katex tex="x" /> and thickness <Katex tex="\delta y" />, so its volume is about{' '}
            <Katex tex="\pi x^2\,\delta y" />. Adding the slices from <Katex tex="y=c" /> to{' '}
            <Katex tex="y=d" /> and letting <Katex tex="\delta y\to0" /> gives the integral.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="The water is a stack of discs of radius x">
          <DiscsWidget />
        </Explore>
      </PartCard>

      <PartCard letter="b" topic="Solve Equation" marks={2} statement={<>Find the depth <Katex tex="h" /> when the fountain is filled to half its volume. Give your answer in metres, correct to two decimal places.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Half the volume is not half the depth">
          <HalfWidget />
        </Explore>
        <WrongMethod
          title="Solve V(h) = the full volume"
          source="Examiner's report"
          working={<Katex tex="\tfrac{\pi}{4}\left(\tfrac{4h^3}{3}+h\right)=\tfrac{\sqrt3\pi}{4} \implies h=\tfrac{\sqrt3}{2}\approx0.87" />}
        >
          The report says a common error was to fail to halve the volume. Without the{' '}
          <Katex tex="\tfrac12" /> the equation just finds the depth of a <em>full</em> fountain:{' '}
          <Katex tex="V" /> is increasing and <Katex tex="V\!\left(\tfrac{\sqrt3}{2}\right)" /> is
          the full volume, so the solution is the rim itself. Catch it: a depth equal to the
          whole fountain can't be &ldquo;half full&rdquo;.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The fountain is initially empty. A vertical jet of water in the centre fills the
          fountain at a rate of <Katex tex="0.04" /> cubic metres per second and, at the same
          time, water flows out from the bottom of the fountain at a rate of{' '}
          <Katex tex="0.05\sqrt{h}" /> cubic metres per second when the depth is{' '}
          <Katex tex="h" /> metres.
        </p>
      </div>

      <PartCard letter="c.i" topic="Related Rates" marks={2} statement={<>Show that <Katex tex="\dfrac{dh}{dt}=\dfrac{4-5\sqrt h}{25\pi\left(4h^2+1\right)}" />.</>} examinerReport={EXAM_CI}>
        <Background>
          <p>
            The rates given are <em>volume</em> rates, but the question wants a{' '}
            <em>depth</em> rate. The chain rule bridges them:{' '}
            <Katex tex="\tfrac{dh}{dt}=\tfrac{dh}{dV}\times\tfrac{dV}{dt}" />, and{' '}
            <Katex tex="\tfrac{dh}{dV}" /> is the reciprocal of what part a. differentiates
            to.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <Explore title="dV/dh is the area of the water surface">
          <LayerWidget />
        </Explore>
        <WrongMethod
          title="Multiply the two rates without brackets"
          source="Examiner's report"
          working={<Katex tex="\tfrac{dh}{dt}=0.04-0.05\sqrt h\times\tfrac{4}{\pi(4h^2+1)}" />}
        >
          The report says a few students did not understand the importance of brackets when
          multiplying the derivative expressions. Without them only the outflow is divided by
          the surface area, and the inflow <Katex tex="0.04" /> is left as a volume rate. At{' '}
          <Katex tex="h=0.25" /> this gives about <Katex tex="0.0145" /> instead of{' '}
          <Katex tex="0.0153" />. Catch it: the whole net rate spreads over the surface, so
          all of <Katex tex="0.04-0.05\sqrt h" /> sits over <Katex tex="\tfrac{dV}{dh}" />, just
          as <Katex tex="4-5\sqrt h" /> sits together in the given answer.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c.ii" topic="Related Rates" marks={1} statement={<>Find the rate, in metres per second, correct to four decimal places, at which the depth is increasing when the depth is <Katex tex="0.25" /> m.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard letter="d" topic="Time Integral" marks={2} statement={<>Express the time taken for the depth to reach <Katex tex="0.25" /> m as a definite integral and evaluate this integral correct to the nearest tenth of a second.</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            When a rate depends on <Katex tex="h" /> only, flip it:{' '}
            <Katex tex="\tfrac{dt}{dh}=1\div\tfrac{dh}{dt}" /> says how many seconds each metre
            of depth takes. Integrating it from the starting depth to the target depth adds
            those up into the total time,{' '}
            <Katex tex="t=\int_{h_0}^{h_1}\tfrac{dt}{dh}\,dh" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="The time is the area under dt/dh">
          <AreaWidget />
        </Explore>
      </PartCard>

      <PartCard letter="e" topic="Euler's Method" marks={2} statement={<>After <Katex tex="25" /> seconds the depth has risen to <Katex tex="0.4" /> m.<br />Using Euler's method with a step size of five seconds, find an estimate of the depth <Katex tex="30" /> seconds after the fountain began to fill. Give your answer in metres, correct to two decimal places.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            Euler's method replaces the solution curve by its tangent for one step:{' '}
            <Katex tex="h(t+\delta)\approx h(t)+\delta\,h'(t)" />. Here <Katex tex="h'(t)" /> is
            given as a function of the depth <Katex tex="h" />, so the slope for a step comes
            from the depth at the start of that step.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="One Euler step walks along the tangent">
          <EulerWidget />
        </Explore>
      </PartCard>

      <PartCard letter="f" topic="Equilibrium" marks={2} statement={<>How far from the top of the fountain does the water level ultimately stabilise? Give your answer in metres, correct to two decimal places.</>} examinerReport={EXAM_F}>
        <Background>
          <p>
            "Stabilises" means the depth stops changing, so set{' '}
            <Katex tex="\tfrac{dh}{dt}=0" />. A fraction is zero only when its numerator is,
            which makes this a one-line equation.
          </p>
          <p>
            Then read the question again: it asks how far <em>from the top</em>, not what the
            final depth is. Those are different numbers, and the report says many students who
            found <Katex tex="h" /> did not take this last step.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Why the level settles at 0.64 m, below the rim">
          <SettleWidget />
        </Explore>
        <WrongMethod
          title="The level stabilises at h = 0.64, so the answer is 0.64 m"
          source="Examiner's report"
          working={<Katex tex="h=0.64 \text{ m}" />}
        >
          That is the <em>depth</em>, measured up from the bottom. The question asks how far
          from the <em>top</em>, measured down from the rim at{' '}
          <Katex tex="\tfrac{\sqrt3}{2}\approx0.866" /> m, so the answer is{' '}
          <Katex tex="0.866-0.64\approx0.23" /> m. The report says many students who correctly
          found <Katex tex="h" /> did not subtract it. Catch it: underline what the question
          measures from before you box an answer.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
