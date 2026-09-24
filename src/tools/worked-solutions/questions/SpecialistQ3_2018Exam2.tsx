// 2018 Specialist Mathematics — Exam 2, Section B, Question 3 (13 marks). A fountain modelled
// as a volume of revolution about the y-axis, then filled against an outflow: a related-rates
// differential equation, a time integral, Euler's method and a steady state. Question text
// transcribed from the original paper; the figure is cropped directly from the exam PDF, not
// a redrawing. Answers re-derived in sympy/scipy and checked against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import fountainSrc from './spec-2018e2-q3-fountain.png'

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
    working: <Katex display tex="y = \frac12\sqrt{4x^2-1} \implies 4y^2 = 4x^2-1 \implies x^2 = \frac{4y^2+1}{4}" />,
    reason: <>Rotation about the <Katex tex="y" />-axis needs <Katex tex="x^2" /> as a function of <Katex tex="y" />, so rearrange rather than integrating the given form.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_0^h x^2\,dy = \pi\int_0^h \frac{4y^2+1}{4}\,dy" />,
    reason: <>Volume of revolution about the <Katex tex="y" />-axis, from the bottom of the bowl (<Katex tex="y=0" />) up to the water surface at <Katex tex="y=h" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{4}\left[\frac{4y^3}{3}+y\right]_0^h" />,
    reason: <>Antidifferentiating.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{\pi}{4}\left(\frac{4h^3}{3}+h\right)}" />,
    reason: <>As required — the lower terminal contributes nothing. On a "show that", write this last line explicitly: the report says many students did not explicitly show that their working yielded the required volume.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Top of the fountain: } y = \frac{\sqrt3}{2} \ \text{ at } x=1" />,
    reason: <>Read from the figure — the curve is drawn up to <Katex tex="\left(1,\tfrac{\sqrt3}{2}\right)" />, so the fountain is <Katex tex="\tfrac{\sqrt3}{2}" /> m deep.</>,
  },
  {
    working: <Katex display tex="V_{\text{full}} = \frac{\pi}{4}\left(\frac{4}{3}\left(\frac{\sqrt3}{2}\right)^3+\frac{\sqrt3}{2}\right)" />,
    reason: <>Substituting the full depth into part a.</>,
  },
  {
    working: <Cas fn="solve">solve(π/4*(4h^3/3+h) = V_full/2, h) | 0&lt;h&lt;√3/2</Cas>,
    reason: <>Halve the volume, then solve for the depth. The report names failing to halve as a common error — the question asks for half the <em>volume</em>, not half the depth.</>,
  },
  {
    working: <Katex display tex="\boxed{h \approx 0.59 \text{ m}}" />,
    reason: <>Two decimal places. (<Katex tex="V_{\text{full}}=\tfrac{\sqrt3\pi}{4}\approx1.360" /> m³, so half is <Katex tex="\approx0.680" /> m³.) Sensible: more than half the full depth of <Katex tex="0.866" /> m, because the bowl widens towards the top, so the upper half holds more water than the lower half. ✓</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dV}{dt} = 0.04 - 0.05\sqrt{h}" />,
    reason: <>Rate in minus rate out, both in cubic metres per second.</>,
  },
  {
    working: <Katex display tex="\frac{dV}{dh} = \frac{\pi}{4}\left(4h^2+1\right)" />,
    reason: <>Differentiating part a. with respect to <Katex tex="h" />: <Katex tex="\tfrac{\pi}{4}\left(\tfrac{12h^2}{3}+1\right)" />. Brackets matter here — the report says so explicitly.</>,
  },
  {
    working: <Katex display tex="\frac{dh}{dt} = \frac{dV}{dt}\div\frac{dV}{dh} = \frac{0.04-0.05\sqrt h}{\frac{\pi}{4}\left(4h^2+1\right)}" />,
    reason: <>The chain rule, written as a quotient of the two rates.</>,
  },
  {
    working: <Katex display tex="= \frac{4\left(0.04-0.05\sqrt h\right)}{\pi\left(4h^2+1\right)} = \frac{0.16-0.2\sqrt h}{\pi\left(4h^2+1\right)}" />,
    reason: <>Multiplying numerator and denominator by <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt} = \frac{4-5\sqrt h}{25\pi\left(4h^2+1\right)}}" />,
    reason: <>As required. Multiplying top and bottom by <Katex tex="25" /> clears the decimals: <Katex tex="25\times0.16=4" /> and <Katex tex="25\times0.2=5" />. Show this step — the report says many students jumped from the product of the derivatives straight to the given answer.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dh}{dt}\bigg|_{h=0.25} = \frac{4-5\sqrt{0.25}}{25\pi\left(4(0.25)^2+1\right)} = \frac{4-2.5}{25\pi(1.25)}" />,
    reason: <><Katex tex="\sqrt{0.25}=0.5" /> and <Katex tex="4(0.0625)=0.25" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.0153 \text{ m s}^{-1}}" />,
    reason: <>Four decimal places, as asked — the report notes answers not given in the required form. Positive, so the fountain is still filling at this depth.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dt}{dh} = \frac{1}{\frac{dh}{dt}} = \frac{25\pi\left(4h^2+1\right)}{4-5\sqrt h}" />,
    reason: <>To find a time from a rate of depth change, invert the derivative and integrate with respect to <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \int_0^{0.25}\frac{25\pi\left(4h^2+1\right)}{4-5\sqrt h}\,dh}" />,
    reason: <>The fountain starts empty, so the lower terminal is <Katex tex="h=0" />.</>,
  },
  {
    working: <Cas fn="nInt">nInt(25π(4h^2+1)/(4-5√h), h, 0, 0.25)</Cas>,
    reason: <>Numerical, since the integrand has no elementary antiderivative worth chasing.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 9.8 \text{ seconds}}" />,
    reason: <>To the nearest tenth. Rough check: <Katex tex="\tfrac{dh}{dt}" /> falls from <Katex tex="\tfrac{4}{25\pi}\approx0.051" /> at <Katex tex="h=0" /> to <Katex tex="0.0153" /> at <Katex tex="h=0.25" /> (part c.ii.), so the time must lie between <Katex tex="\tfrac{0.25}{0.051}\approx4.9" /> and <Katex tex="\tfrac{0.25}{0.0153}\approx16" /> seconds. ✓</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="h_{n+1} = h_n + \delta\,\frac{dh}{dt}\bigg|_{h_n}" />,
    reason: <>Euler's method: step forward along the tangent. Write it out — the report says many students did not explicitly demonstrate their use of Euler's method, and a number substituted incorrectly.</>,
  },
  {
    working: <Katex display tex="h_0 = 0.4 \ \text{ at } t=25, \qquad \delta = 5" />,
    reason: <>One step of five seconds takes <Katex tex="t=25" /> to <Katex tex="t=30" />, which is what the question asks for.</>,
  },
  {
    working: <Katex display tex="\frac{dh}{dt}\bigg|_{h=0.4} = \frac{4-5\sqrt{0.4}}{25\pi\left(4(0.16)+1\right)} \approx 0.006504" />,
    reason: <>Evaluating the derivative at the <em>starting</em> depth of the step.</>,
  },
  {
    working: <Katex display tex="h_1 = 0.4 + 5(0.006504) \approx 0.4325" />,
    reason: <>One step.</>,
  },
  {
    working: <Katex display tex="\boxed{h \approx 0.43 \text{ m}}" />,
    reason: <>Two decimal places. Note how little the depth moves in five seconds — the inflow and outflow are nearly balanced by now, which part f. makes precise.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Stabilises} \iff \frac{dh}{dt} = 0 \iff 4-5\sqrt h = 0" />,
    reason: <>The level stops changing when inflow and outflow balance. Only the numerator can vanish.</>,
  },
  {
    working: <Katex display tex="\sqrt h = \frac45 \implies h = \frac{16}{25} = 0.64 \text{ m}" />,
    reason: <>The limiting depth.</>,
  },
  {
    working: <Katex display tex="\text{Top of the fountain at } y = \frac{\sqrt3}{2} \approx 0.8660" />,
    reason: <>From the figure, as in part b.</>,
  },
  {
    working: <Katex display tex="\frac{\sqrt3}{2} - 0.64 \approx 0.2260" />,
    reason: <>The question asks how far <em>from the top</em> the level settles, not what the depth is. The report says many students who correctly found <Katex tex="h" /> did not subtract it from the height of the top of the fountain.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.23 \text{ m below the top}}" />,
    reason: <>Two decimal places. So the fountain never quite fills — it stabilises about <Katex tex="23" /> cm short of the rim. Only <Katex tex="24\%" /> of students scored both marks.</>,
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
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Solve Equation" marks={2} statement={<>Find the depth <Katex tex="h" /> when the fountain is filled to half its volume. Give your answer in metres, correct to two decimal places.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
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
      </PartCard>

      <PartCard letter="c.ii" topic="Related Rates" marks={1} statement={<>Find the rate, in metres per second, correct to four decimal places, at which the depth is increasing when the depth is <Katex tex="0.25" /> m.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard letter="d" topic="Time Integral" marks={2} statement={<>Express the time taken for the depth to reach <Katex tex="0.25" /> m as a definite integral and evaluate this integral correct to the nearest tenth of a second.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" topic="Euler's Method" marks={2} statement={<>After <Katex tex="25" /> seconds the depth has risen to <Katex tex="0.4" /> m.<br />Using Euler's method with a step size of five seconds, find an estimate of the depth <Katex tex="30" /> seconds after the fountain began to fill. Give your answer in metres, correct to two decimal places.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
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
      </PartCard>
    </div>
  )
}
