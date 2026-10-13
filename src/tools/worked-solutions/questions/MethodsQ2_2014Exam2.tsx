// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 2 (13 marks). A statue inside
// a cylinder of ice — volume, minimising the surface area, then a melting-rate related-rates
// problem. Question text transcribed from the original paper; the diagram is cropped from the
// original VCAA exam PDF. Answers checked with sympy and against the VCAA examination report.
// Solution is original.
// Interactive diagrams (§15): part f. shows the skin of area 3πh² = dV/dh that melts off the top
// and side, so dh/dt = −10 ÷ 3πh² (interactives/meth-2014e2-q2f-skin.tsx); part h. plots h(t) to
// show h = 1 at t ≈ 21.29 (during 2031) comes before V = 0 at t = 21.6
// (interactives/meth-2014e2-q2h-timeline.tsx).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'
import diagramSrc from './meth-2014e2-q2-ice-cylinder.png'

const SkinWidget = lazyWidget(() => import('../interactives/meth-2014e2-q2f-skin'))
const TimelineWidget = lazyWidget(() => import('../interactives/meth-2014e2-q2h-timeline'))

const EXAMINER_A: SAExaminerStats = {
  marks: [15, 10, 75],
  average: 1.6,
  comment: (
    <>
      This question was quite well answered. Some students used the formula for the volume of a cone
      instead of a cylinder. Some used poor notation, omitting brackets and writing{' '}
      <Katex tex="\tfrac{d^2}{2}=\tfrac{d^2}{4}" />. Many left their answer in the form{' '}
      <Katex tex="h=\dfrac{216}{\pi(d/2)^2}" />, which was accepted; however, it is preferable to write in
      simplified form.
    </>
  ),
}

const EXAMINER_B: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment:
    "This was a 'show that' question and some students showed sufficient working. Some included the area of the base of the cylinder. Others did not include the area of the top of the cylinder and only considered the curved surface area.",
}

const EXAMINER_C: SAExaminerStats = {
  marks: [25, 25, 50],
  average: 1.3,
  comment: (
    <>
      Some students answered only part of the question, finding the correct value for <Katex tex="d" /> but
      not attempting to find <Katex tex="S" />. Exact answers were required. Answers such as{' '}
      <Katex tex="d=8.19\ldots" /> and <Katex tex="S=158.17\ldots" /> were often given.
    </>
  ),
}

const EXAMINER_D: SAExaminerStats = {
  marks: [58, 42],
  average: 0.4,
  comment: (
    <>
      Some students did not square <Katex tex="\tfrac{12}{\sqrt[3]{\pi}}" />, using{' '}
      <Katex tex="h=\dfrac{864}{\pi(12/\sqrt[3]{\pi})}" /> to get <Katex tex="\dfrac{72}{\pi^{2/3}}" />. An
      exact answer was required, not a decimal expression such as 4.09, as was given by some students. Some
      substituted <Katex tex="d=\tfrac{12}{\sqrt[3]{\pi}}" /> into <Katex tex="S=\tfrac{\pi d^2}{4}+\tfrac{864}{d}" />.
    </>
  ),
}

const EXAMINER_E: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      Some students used an incorrect formula, such as <Katex tex="V=\pi(2h)^2h=4\pi h^3" /> or{' '}
      <Katex tex="V=2\pi rh=2\pi h^2" />.
    </>
  ),
}

const EXAMINER_F: SAExaminerStats = {
  marks: [27, 12, 38, 22],
  average: 1.6,
  comment: (
    <>
      Many students were able to set up the related rates equation and find <Katex tex="\tfrac{dV}{dh}" />.
      Some students did not find the reciprocal before substituting into <Katex tex="\tfrac{dh}{dV}" />. Many
      used <Katex tex="\tfrac{dV}{dt}=10\ \text{m}^3/\text{year}" />.
    </>
  ),
}

const EXAMINER_G: SAExaminerStats = {
  marks: [60, 40],
  average: 0.4,
  comment: 'Students who answered Question 2f. correctly tended to also answer this question correctly. An exact answer was required. Some students gave incorrect units.',
}

const EXAMINER_H: SAExaminerStats = {
  marks: [86, 4, 9],
  average: 0.3,
  comment: (
    <>
      This question was not answered well. A number of different approaches could have been used. Some
      students gave 2032 as their final answer. Some did not subtract <Katex tex="\pi" /> from 216 and used{' '}
      <Katex tex="t=\tfrac{216}{10}" />. Incorrect terminals were often used or if evaluating{' '}
      <Katex tex="t=\displaystyle\int\!\left(-\tfrac{3\pi h^2}{10}\right)dh" />, a constant of integration was
      often missing. Some used <Katex tex="t=\displaystyle\int\!\left(-\tfrac{10}{3\pi h^2}\right)dh" />.
    </>
  ),
}

export default function MethodsQ2_2014Exam2() {
  const rowsA: WorkingRow[] = [
    {
      working: <Katex display tex="\begin{aligned} V &= \pi r^2 h \\ &= \pi\left(\frac{d}{2}\right)^2 h \\ &= 216 \end{aligned}" />,
      reason: <>Cylinder volume, with radius written as <Katex tex="\tfrac{d}{2}" /> since the diameter <Katex tex="d" /> is the given variable.</>,
      more: <>The report notes some students used the cone formula <Katex tex="\tfrac13\pi r^2h" /> instead. Keep the brackets: <Katex tex="\left(\tfrac{d}{2}\right)^2=\tfrac{d^2}{4}" />, whereas <Katex tex="\tfrac{d^2}{2}" /> is a different number.</>,
    },
    {
      working: <Katex display tex="\boxed{h = \dfrac{864}{\pi d^2}}" />,
      reason: <>Rearrange: <Katex tex="\tfrac{\pi d^2}{4}h=216 \implies h = \tfrac{864}{\pi d^2}" />, since <Katex tex="216\times4=864" />.</>,
      more: <>The report accepted <Katex tex="h=\tfrac{216}{\pi(d/2)^2}" /> but prefers the simplified form, which is also the one part (b) needs.</>,
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: <Katex display tex="\begin{aligned} S &= \pi d h + \pi\left(\frac{d}{2}\right)^2 \\ &= \pi dh + \frac{\pi d^2}{4} \end{aligned}" />,
      reason: <>Excluding the base: curved surface <Katex tex="\pi dh" /> (circumference <Katex tex="\pi d" /> times height) plus the circular top, radius <Katex tex="\tfrac{d}{2}" />.</>,
      more: <>The report notes the two common slips: adding the base as well (a second <Katex tex="\tfrac{\pi d^2}{4}" />), or leaving out the top and using only the curved surface.</>,
    },
    {
      working: <Katex display tex="\begin{aligned} S &= \pi d\left(\frac{864}{\pi d^2}\right) + \frac{\pi d^2}{4} \\ &= \frac{864}{d}+\frac{\pi d^2}{4} \end{aligned}" />,
      reason: <>Substitute <Katex tex="h" /> from part (a) to write <Katex tex="S" /> in terms of <Katex tex="d" /> alone; <Katex tex="\pi" /> and one <Katex tex="d" /> cancel.</>,
    },
    {
      working: <Katex display tex="S = \dfrac{\pi d^2}{4} + \dfrac{864}{d}" />,
      reason: <>Reorder the terms to match the given rule. As required.</>,
      more: <>In a &ldquo;show that&rdquo;, the mark is for the lines above (the area formula and the substitution of <Katex tex="h" />), not for restating the given rule.</>,
    },
  ]

  const rowsC: WorkingRow[] = [
    {
      working: <Katex display tex="\begin{aligned} \frac{dS}{dd} &= \frac{\pi d}{2} - \frac{864}{d^2} \\ &= 0 \end{aligned}" />,
      reason: <>A minimum of <Katex tex="S" /> on <Katex tex="d>0" /> occurs where its derivative is zero. (<Katex tex="\tfrac{864}{d}=864d^{-1}" /> differentiates to <Katex tex="-864d^{-2}" />.)</>,
      more: <>On CAS, <Cas fn="solve">solve(d/dd(πd²/4 + 864/d) = 0, d) | d &gt; 0</Cas> gives the same exact value, as in the report's answer; the by-hand route below shows where it comes from.</>,
    },
    {
      working: (
        <>
          <Katex display tex="\frac{\pi d^3}{2} = 864" />
          <Katex display tex="\implies\; d^3 = \frac{1728}{\pi}" />
        </>
      ),
      reason: <>Multiply through by <Katex tex="d^2" />, then by <Katex tex="\tfrac2\pi" />.</>,
    },
    {
      working: <Katex display tex="\boxed{d = \sqrt[3]{\dfrac{1728}{\pi}} = \dfrac{12}{\sqrt[3]{\pi}} \text{ m}}" />,
      reason: (
        <>
          <Katex tex="1728=12^3" />. It is a minimum since <Katex tex="\tfrac{d^2S}{dd^2}=\tfrac{\pi}{2}+\tfrac{1728}{d^3}>0" /> for <Katex tex="d>0" />. Give the exact value.
        </>
      ),
      more: <>The report says exact answers were required: <Katex tex="d=8.19\ldots" /> was often given and lost the mark.</>,
    },
    {
      working: <Katex display tex="\begin{aligned} \frac{\pi d^2}{4} &= \frac{\pi}{4}\cdot\frac{144}{\pi^{2/3}} = 36\sqrt[3]{\pi} \\ \frac{864}{d} &= \frac{864\sqrt[3]{\pi}}{12} = 72\sqrt[3]{\pi} \end{aligned}" />,
      reason: <>Substitute <Katex tex="d=\tfrac{12}{\sqrt[3]\pi}" /> into each term of <Katex tex="S" />: <Katex tex="d^2=\tfrac{144}{\pi^{2/3}}" />, and <Katex tex="\pi\div\pi^{2/3}=\pi^{1/3}" />.</>,
      more: <>A shortcut: at the minimum <Katex tex="\tfrac{\pi d^3}{2}=864" />, so <Katex tex="\tfrac{\pi d^2}{4}=\tfrac{\pi d^3}{4d}=\tfrac{864}{2d}" /> and <Katex tex="S_{\min}=\tfrac{864}{2d}+\tfrac{864}{d}=\tfrac{1296}{d}=1296\times\tfrac{\sqrt[3]\pi}{12}" />, with no fractional powers of <Katex tex="\pi" /> to handle.</>,
    },
    {
      working: <Katex display tex="\boxed{S_{\min} = 36\sqrt[3]{\pi}+72\sqrt[3]{\pi} = 108\sqrt[3]{\pi} \text{ m}^2}" />,
      reason: <>Add the two terms. The question asks for both <Katex tex="d" /> and the minimum <Katex tex="S" />.</>,
      more: <>The report notes some students found <Katex tex="d" /> and stopped, and that the decimal <Katex tex="158.17\ldots" /> was often given instead of the exact value. Sanity check: <Katex tex="108\sqrt[3]\pi\approx158.18" /> m², and <Katex tex="S(8)=16\pi+108\approx158.27" />, just above it, as a minimum should be.</>,
    },
  ]

  const rowsD: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\text{(c): }\; \frac{\pi d^3}{2}=864" />
          <Katex display tex="\text{(a): }\; h = \frac{864}{\pi d^2}" />
        </>
      ),
      reason: <>Combine the optimal-<Katex tex="d" /> condition from part (c) with the <Katex tex="h" />–<Katex tex="d" /> relation from part (a).</>,
    },
    {
      working: <Katex display tex="\begin{aligned} h &= \frac{864}{\pi d^2} \\ &= \frac{d^3/2}{d^2} \\ &= \frac{d}{2} \end{aligned}" />,
      reason: <>Since <Katex tex="864 = \tfrac{\pi d^3}{2}" />, substitute directly: <Katex tex="\tfrac{864}{\pi d^2} = \tfrac{\pi d^3/2}{\pi d^2}" />.</>,
      more: <>So the cylinder with the least surface area has height exactly half its diameter, which is the <Katex tex="d=2h" /> the stem uses from part (e) on.</>,
    },
    {
      working: <Katex display tex="\boxed{h = \dfrac{d}{2} = \dfrac{6}{\sqrt[3]{\pi}} \text{ m}}" />,
      reason: <>Halve the value of <Katex tex="d" /> found in part (c). Exact, not the decimal 4.09.</>,
      more: <>Substituting <Katex tex="d=\tfrac{12}{\sqrt[3]\pi}" /> into <Katex tex="h=\tfrac{864}{\pi d^2}" /> also works, but the report notes some students forgot to square <Katex tex="\tfrac{12}{\sqrt[3]\pi}" /> and got <Katex tex="\tfrac{72}{\pi^{2/3}}" />. Others substituted into the formula for <Katex tex="S" />, which gives the surface area, not the height.</>,
    },
  ]

  const rowsE: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="d = 2h" />
          <Katex display tex="\begin{aligned} \implies\; r &= \frac{d}{2} \\ &= h \end{aligned}" />
        </>
      ),
      reason: <>The stem says <Katex tex="d=2h" /> holds throughout the melting (the proportions found in part (d)), so the radius equals the height.</>,
    },
    {
      working: <Katex display tex="\begin{aligned} V &= \pi r^2 h \\ &= \pi h^2\cdot h \end{aligned}" />,
      reason: <>The radius is <Katex tex="h" />, not the diameter <Katex tex="2h" />.</>,
      more: <>The report lists two wrong formulas: <Katex tex="\pi(2h)^2h=4\pi h^3" />, which uses the diameter as the radius, and <Katex tex="2\pi rh=2\pi h^2" />, which is the curved surface area, not the volume.</>,
    },
    {
      working: <Katex display tex="\boxed{V = \pi h^3}" />,
      reason: <>Check at the start: <Katex tex="h=\tfrac{6}{\sqrt[3]\pi}" /> gives <Katex tex="V=\pi\cdot\tfrac{216}{\pi}=216" /> ✓.</>,
    },
  ]

  const rowsF: WorkingRow[] = [
    {
      working: <Katex display tex="\frac{dV}{dt} = -10, \qquad \frac{dV}{dh} = 3\pi h^2" />,
      reason: <>The volume <em>decreases</em> by 10 m³ per year, so <Katex tex="\tfrac{dV}{dt}" /> is negative. Differentiate <Katex tex="V=\pi h^3" /> from part (e).</>,
      more: <>The report notes many students used <Katex tex="\tfrac{dV}{dt}=10" />. A rate of change is negative whenever the quantity is going down, and that sign carries through to <Katex tex="\tfrac{dh}{dt}" />.</>,
    },
    {
      working: <Katex display tex="\begin{aligned} \frac{dh}{dt} &= \frac{dh}{dV}\times\frac{dV}{dt} \\ &= \frac{1}{3\pi h^2}\times(-10) \end{aligned}" />,
      reason: <>Chain rule (related rates): <Katex tex="V" /> links <Katex tex="h" /> and <Katex tex="t" />. <Katex tex="\tfrac{dh}{dV}" /> is the reciprocal of <Katex tex="\tfrac{dV}{dh}" />.</>,
      more: <>The report notes some students did not take the reciprocal and substituted <Katex tex="3\pi h^2" /> for <Katex tex="\tfrac{dh}{dV}" />. A picture of why you divide: with <Katex tex="r=h" />, melting removes a skin of equal thickness from the top (area <Katex tex="\pi h^2" />) and the side (area <Katex tex="2\pi h\cdot h" />), since <Katex tex="r=h" /> throughout means the radius and the height drop by the same amount, total area <Katex tex="3\pi h^2=\tfrac{dV}{dh}" />. Ten cubic metres a year spread over that area is a layer <Katex tex="\tfrac{10}{3\pi h^2}" /> m thick each year, so the height drops at that rate. The diagram below shows the skin.</>,
    },
    {
      working: <Katex display tex="\boxed{\dfrac{dh}{dt} = -\dfrac{10}{3\pi h^2} \text{ m/year}}" />,
      reason: <>Negative, as it must be for a melting cylinder.</>,
      more: <>The rate depends on <Katex tex="h" />: as the cylinder shrinks, the same 10 m³ comes off a smaller surface, so the height falls faster.</>,
    },
  ]

  const rowsG: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\text{Statue height} = 1\text{ m}" />
          <Katex display tex="\implies\; h=1" />
        </>
      ),
      reason: <>The statue stands on the base of the ice, so its top is "just exposed" when the ice's height has dropped to 1 m.</>,
    },
    {
      working: <Katex display tex="\left.\frac{dh}{dt}\right|_{h=1} = \frac{-10}{3\pi(1)^2}" />,
      reason: <>Substitute <Katex tex="h=1" /> into the result from part (f).</>,
    },
    {
      working: <Katex display tex="\frac{dh}{dt} = -\frac{10}{3\pi}" />,
      reason: <>Leave it exact (it is about <Katex tex="-1.06" /> m/year).</>,
      more: <>The report says an exact answer was required, and notes that students who got part (f) right tended to get this right too.</>,
    },
    {
      working: <Katex display tex="\boxed{\text{decreasing at } \tfrac{10}{3\pi} \text{ m/year}}" />,
      reason: <>The question asks how fast the height is <em>decreasing</em>, so state a positive rate, with units m/year.</>,
      more: <>Giving <Katex tex="\tfrac{dh}{dt}=-\tfrac{10}{3\pi}" /> m/year says the same thing, and the report's answer shows both forms. It notes some students gave incorrect units: height is in metres and time in years.</>,
    },
  ]

  const rowsH: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\frac{dV}{dt}=-10 \text{ (constant)}" />
          <Katex display tex="\implies\; V(t) = 216-10t" />
        </>
      ),
      reason: <>The volume starts at 216 m³ on 1 January 2010 (<Katex tex="t=0" />) and falls by 10 m³ each year.</>,
      more: <>Because <Katex tex="\tfrac{dV}{dt}" /> is constant, <Katex tex="V" /> is linear in <Katex tex="t" />, so there is nothing to integrate. The report's answer also shows a route from part (f): <Katex tex="\tfrac{dt}{dh}=-\tfrac{3\pi h^2}{10}" />, and it writes <Katex tex="t=\displaystyle\int_{1}^{6/\sqrt[3]\pi}\tfrac{3\pi h^2}{10}\,dh=21.2858\ldots" />. That equals <Katex tex="\displaystyle\int_{6/\sqrt[3]\pi}^{1}-\tfrac{3\pi h^2}{10}\,dh" />, which runs from the starting height (part d) down to 1; swapping the terminals flips the sign. It notes the slips on that route: wrong terminals, a missing constant of integration when integrating without terminals, and integrating <Katex tex="\tfrac{dh}{dt}" /> instead of <Katex tex="\tfrac{dt}{dh}" />.</>,
    },
    {
      working: (
        <>
          <Katex display tex="V=\pi h^3" />
          <Katex display tex="\implies\; h^3 = \frac{216-10t}{\pi}" />
        </>
      ),
      reason: <>Link volume to height with part (e), which holds throughout since <Katex tex="d=2h" /> is kept.</>,
    },
    {
      working: (
        <>
          <Katex display tex="h=1" />
          <Katex display tex="\implies\; 1 = \frac{216-10t}{\pi}" />
          <Katex display tex="\implies\; 216-10t=\pi" />
        </>
      ),
      reason: <>Set <Katex tex="h=1" />, the statue's height, as in part (g).</>,
    },
    {
      working: <Katex display tex="t = \frac{216-\pi}{10} = 21.2858\ldots \text{ years}" />,
      reason: <>Solve for <Katex tex="t" />. At this moment <Katex tex="\pi" /> m³ of ice is still left, so <Katex tex="\pi" /> must not be dropped.</>,
      more: <>The report notes some students used <Katex tex="t=\tfrac{216}{10}=21.6" />. That is when <Katex tex="V=0" />, the moment the whole cylinder has melted, about 4 months after the statue's top appears.</>,
    },
    {
      working: <Katex display tex="\boxed{\text{During the year } 2031}" />,
      reason: <><Katex tex="t=21" /> is 1 January 2031 and <Katex tex="t=22" /> is 1 January 2032, so <Katex tex="t\approx21.29" /> falls during 2031.</>,
      more: (
        <>
          The report notes 2032 was a common wrong answer, which comes from rounding up or counting one year too many. But{' '}
          <Katex tex="2010+21.29=2031.29" />: about <Katex tex="0.29\times12\approx3.4" /> months into 2031, in mid-April 2031.
          The diagram below plots the height against time with the year boundaries marked.
        </>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (13 marks)</p>
        <p>
          On 1 January 2010, Tasmania Jones was walking through an ice-covered region of Greenland when he
          found a large ice cylinder that was made a thousand years ago by the Vikings.
        </p>
        <p className="mt-2">
          A statue was inside the ice cylinder. The statue was 1 m tall and its base was at the centre of
          the base of the cylinder.
        </p>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 my-3 w-fit">
          <img loading="lazy" decoding="async" src={diagramSrc} alt="Ice cylinder of height h metres and diameter d metres, with a 1 m statue at its centre, from the original 2014 VCAA exam paper" className="w-full max-w-[280px]" />
        </div>
        <p>
          The cylinder had a height of <Katex tex="h" /> metres and a diameter of <Katex tex="d" /> metres.
          Tasmania Jones found that the volume of the cylinder was 216 m³. At that time, 1 January 2010, the
          cylinder had not changed in a thousand years. It was exactly as it was when the Vikings made it.
        </p>
      </div>

      <PartCard letter="a" topic="Modelling" marks={2} statement={<>Write an expression for <Katex tex="h" /> in terms of <Katex tex="d" />.</>} examinerReport={EXAMINER_A}>
        <WorkingTable rows={rowsA} />
      </PartCard>

      <PartCard letter="b" topic="Surface Area" marks={1} statement={<>Show that the surface area of the cylinder excluding the base, <Katex tex="S" /> square metres, is given by the rule <Katex tex="S = \dfrac{\pi d^2}{4} + \dfrac{864}{d}" />.</>} examinerReport={EXAMINER_B}>
        <WorkingTable rows={rowsB} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Tasmania found that the Vikings made the cylinder so that <Katex tex="S" /> is a minimum.
      </div>

      <PartCard letter="c" topic="Optimisation" marks={2} statement={<>Find the value of <Katex tex="d" /> for which <Katex tex="S" /> is a minimum and find this minimum value of <Katex tex="S" />.</>} examinerReport={EXAMINER_C}>
        <WorkingTable rows={rowsC} />
      </PartCard>

      <PartCard letter="d" topic="Optimisation" marks={1} statement={<>Find the value of <Katex tex="h" /> when <Katex tex="S" /> is a minimum.</>} examinerReport={EXAMINER_D}>
        <WorkingTable rows={rowsD} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        On 1 January 2010, Tasmania believed that due to recent temperature changes in Greenland, the ice of
        the cylinder had just started melting. Therefore, he decided to return on 1 January each year to
        measure the ice cylinder. He observes that the volume of the ice cylinder decreases by a constant rate
        of 10 m³ per year. Assume that the cylindrical shape is retained and <Katex tex="d=2h" /> at the
        beginning and as the cylinder melts.
      </div>

      <PartCard letter="e" topic="Modelling" marks={1} statement={<>Write down an expression for <Katex tex="V" /> in terms of <Katex tex="h" />.</>} examinerReport={EXAMINER_E}>
        <WorkingTable rows={rowsE} />
      </PartCard>

      <PartCard letter="f" topic="Related Rates" marks={3} statement={<>Find <Katex tex="\dfrac{dh}{dt}" /> in terms of <Katex tex="h" />.</>} examinerReport={EXAMINER_F}>
        <WorkingTable rows={rowsF} />
        <Explore title="The melting skin: why you divide by dV/dh">
          <SkinWidget />
        </Explore>
      </PartCard>

      <PartCard letter="g" topic="Related Rates" marks={1} statement="Find the rate at which the height of the cylinder will be decreasing when the top of the statue is just exposed." examinerReport={EXAMINER_G}>
        <WorkingTable rows={rowsG} />
      </PartCard>

      <PartCard letter="h" topic="Solve Equation" marks={2} statement="Find the year in which the top of the statue will just be exposed. (Assume that the melting started on 1 January 2010.)" examinerReport={EXAMINER_H}>
        <WorkingTable rows={rowsH} />
        <Explore title="h = 1 comes before V = 0, and during 2031">
          <TimelineWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
