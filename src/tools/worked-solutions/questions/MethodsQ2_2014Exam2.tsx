// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 2 (13 marks). A statue inside
// a cylinder of ice — volume, minimising the surface area, then a melting-rate related-rates
// problem. Question text transcribed from the original paper; the diagram is cropped from the
// original VCAA exam PDF. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2014e2-q2-ice-cylinder.png'

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
    },
    {
      working: <Katex display tex="\boxed{h = \dfrac{864}{\pi d^2}}" />,
      reason: <>Rearrange: <Katex tex="\tfrac{\pi d^2}{4}h=216 \implies h = \tfrac{864}{\pi d^2}" />.</>,
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: <Katex display tex="\begin{aligned} S &= \pi d h + \pi\left(\frac{d}{2}\right)^2 \\ &= \pi dh + \frac{\pi d^2}{4} \end{aligned}" />,
      reason: <>Excluding the base: lateral (curved) surface <Katex tex="\pi dh" /> plus the flat top, a circle of radius <Katex tex="\tfrac{d}{2}" />.</>,
    },
    {
      working: <Katex display tex="\begin{aligned} S &= \pi d\left(\frac{864}{\pi d^2}\right) + \frac{\pi d^2}{4} \\ &= \frac{864}{d}+\frac{\pi d^2}{4} \end{aligned}" />,
      reason: <>Substitute <Katex tex="h" /> from part (a) to write <Katex tex="S" /> in terms of <Katex tex="d" /> alone.</>,
    },
    {
      working: <Katex display tex="S = \dfrac{\pi d^2}{4} + \dfrac{864}{d} \quad \text{as required}" />,
      reason: <>A "show that" earns its mark for the lines above it — the substitution of <Katex tex="h" /> and the simplification — not for restating the given rule. The report notes that including the base, or leaving out the top, were the common slips.</>,
    },
  ]

  const rowsC: WorkingRow[] = [
    {
      working: <Katex display tex="\begin{aligned} \frac{dS}{dd} &= \frac{\pi d}{2} - \frac{864}{d^2} \\ &= 0 \end{aligned}" />,
      reason: <>A minimum of <Katex tex="S" /> on <Katex tex="d>0" /> occurs where its derivative is zero. (<Katex tex="\tfrac{864}{d}=864d^{-1}" /> differentiates to <Katex tex="-864d^{-2}" />.)</>,
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
          <Katex tex="1728=12^3" />, so the cube root comes out cleanly. <Katex tex="\dfrac{d^2S}{dd^2}=\dfrac{\pi}{2}+\dfrac{1728}{d^3}>0" /> for every <Katex tex="d>0" />, so this is a minimum. (<Katex tex="\approx8.19" /> m — but the report says exact answers were required, and <Katex tex="8.19\ldots" /> was a common way to lose the mark.)
        </>
      ),
    },
    {
      working: <Katex display tex="\begin{aligned} S_{\min} &= \frac{864}{d}+\frac{864}{2d} \\ &= \frac{1296}{d} \end{aligned}" />,
      reason: <>Using <Katex tex="\tfrac{\pi d^2}{4}=\tfrac{\pi d^3}{4d}=\tfrac{864}{2d}" /> (from <Katex tex="\tfrac{\pi d^3}{2}=864" />) to rewrite the first term of <Katex tex="S" /> without <Katex tex="\pi" />.</>,
    },
    {
      working: <Katex display tex="\boxed{S_{\min} = 1296\times\frac{\sqrt[3]{\pi}}{12} = 108\sqrt[3]{\pi} \text{ m}^2}" />,
      reason: <>Substitute <Katex tex="\tfrac1d = \tfrac{\sqrt[3]\pi}{12}" />. Sanity check: <Katex tex="108\sqrt[3]\pi\approx158.2" /> m², and <Katex tex="S(8)=16\pi+108\approx158.3" />, just above it, as a minimum should be.</>,
    },
  ]

  const rowsD: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\frac{\pi d^3}{2}=864" />
          <Katex display tex="\implies\; d^3 = \frac{1728}{\pi}, \qquad h = \frac{864}{\pi d^2}" />
        </>
      ),
      reason: 'Combine the optimal-d condition from part (c) with the h–d relation from part (a).',
    },
    {
      working: <Katex display tex="\begin{aligned} h &= \frac{864}{\pi d^2} \\ &= \frac{d^3/2}{d^2} \\ &= \frac{d}{2} \end{aligned}" />,
      reason: <>Since <Katex tex="864 = \tfrac{\pi d^3}{2}" />, substitute directly: <Katex tex="\tfrac{864}{\pi d^2} = \tfrac{\pi d^3/2}{\pi d^2}" />.</>,
    },
    {
      working: <Katex display tex="\boxed{h = \dfrac{d}{2} = \dfrac{6}{\sqrt[3]{\pi}} \text{ m}}" />,
      reason: <>Halve the value of <Katex tex="d" /> found in part (c). Neatly, the minimising cylinder has height exactly half its diameter. Exact, as the report required — not a decimal such as 4.09. The report notes some students forgot to square <Katex tex="\tfrac{12}{\sqrt[3]\pi}" /> when substituting into <Katex tex="h=\tfrac{864}{\pi d^2}" />.</>,
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
      reason: <>The problem now assumes the ice keeps the <Katex tex="d=2h" /> proportions found in part (d) as it melts.</>,
    },
    {
      working: <Katex display tex="\begin{aligned} V &= \pi r^2 h \\ &= \pi h^2\cdot h \end{aligned}" />,
      reason: <>The radius is <Katex tex="h" />, not the diameter <Katex tex="2h" /> — using <Katex tex="\pi(2h)^2h" /> is the report's first listed error.</>,
    },
    {
      working: <Katex display tex="\boxed{V = \pi h^3}" />,
      reason: <>Check at the start: <Katex tex="h=\tfrac{6}{\sqrt[3]\pi}" /> gives <Katex tex="V=\pi\cdot\tfrac{216}{\pi}=216" /> ✓.</>,
    },
  ]

  const rowsF: WorkingRow[] = [
    {
      working: <Katex display tex="\frac{dV}{dt} = -10 \quad \text{(given, constant)}, \qquad \frac{dV}{dh} = 3\pi h^2" />,
      reason: <>Differentiate <Katex tex="V=\pi h^3" /> from part (e) with respect to <Katex tex="h" />.</>,
    },
    {
      working: <Katex display tex="\frac{dh}{dt} = \frac{dh}{dV}\times\frac{dV}{dt} = \frac{1}{3\pi h^2}\times(-10)" />,
      reason: <>Chain rule (related rates). <Katex tex="\tfrac{dh}{dV}" /> is the reciprocal of <Katex tex="\tfrac{dV}{dh}" /> — the step the report says some students skipped. The rate is <Katex tex="-10" /> because the volume is decreasing.</>,
    },
    {
      working: <Katex display tex="\boxed{\dfrac{dh}{dt} = -\dfrac{10}{3\pi h^2} \text{ m/year}}" />,
      reason: <>Negative, as it must be for a melting cylinder.</>,
    },
  ]

  const rowsG: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\text{Statue height} = 1\text{ m, based at the centre of the ice's base}" />
          <Katex display tex="\implies\; h=1" />
        </>
      ),
      reason: 'The top of the statue is "just exposed" exactly when the melting ice surface has dropped to the height of the statue.',
    },
    {
      working: <Katex display tex="\left.\frac{dh}{dt}\right|_{h=1} = \frac{-10}{3\pi(1)^2}" />,
      reason: 'Substitute h = 1 into the result from part (f).',
    },
    {
      working: <Katex display tex="\frac{dh}{dt} = -\frac{10}{3\pi}" />,
      reason: <>About <Katex tex="-1.06" /> m/year — but the report required the exact value.</>,
    },
    {
      working: <Katex display tex="\boxed{\text{decreasing at } \tfrac{10}{3\pi} \text{ m/year}}" />,
      reason: <>The question asks for the rate of <em>decrease</em>, so state it as a positive rate "decreasing at", or equivalently give <Katex tex="\tfrac{dh}{dt}=-\tfrac{10}{3\pi}" /> m/year. Units matter — the report notes some students gave incorrect ones.</>,
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
      reason: <>Since the volume decreases at a constant rate from its initial value <Katex tex="V(0)=216" /> — no need to integrate <Katex tex="\tfrac{dh}{dt}" /> separately.</>,
    },
    {
      working: (
        <>
          <Katex display tex="V=\pi h^3" />
          <Katex display tex="\implies\; h^3 = \frac{216-10t}{\pi}" />
        </>
      ),
      reason: <>From part (e), valid throughout while <Katex tex="d=2h" /> holds.</>,
    },
    {
      working: (
        <>
          <Katex display tex="h=1" />
          <Katex display tex="\implies\; 1 = \frac{216-10t}{\pi}" />
          <Katex display tex="\implies\; 216-10t=\pi" />
        </>
      ),
      reason: 'Set h = 1, the condition from part (g).',
    },
    {
      working: <Katex display tex="t = \frac{216-\pi}{10} = 21.2858\ldots \text{ years}" />,
      reason: <>Forgetting the <Katex tex="\pi" /> — using <Katex tex="t=\tfrac{216}{10}" /> — is one of the report's listed errors.</>,
    },
    {
      working: <Katex display tex="\boxed{\text{Sometime during the year } 2031}" />,
      reason: (
        <>
          Counting from 1 Jan 2010: <Katex tex="t=21" /> years lands on 1 Jan 2031, and the remaining{' '}
          <Katex tex="\approx 0.29" /> of a year (<Katex tex="\approx" /> 3.5 months) falls in 2031, before
          1 Jan 2032. The report notes 2032 was a common wrong answer — <Katex tex="2010+21.29" /> is{' '}
          <Katex tex="2031.29" />, which is <em>during</em> 2031.
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
          <img src={diagramSrc} alt="Ice cylinder of height h metres and diameter d metres, with a 1 m statue at its centre, from the original 2014 VCAA exam paper" className="w-full max-w-[280px]" />
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
      </PartCard>

      <PartCard letter="g" topic="Related Rates" marks={1} statement="Find the rate at which the height of the cylinder will be decreasing when the top of the statue is just exposed." examinerReport={EXAMINER_G}>
        <WorkingTable rows={rowsG} />
      </PartCard>

      <PartCard letter="h" topic="Solve Equation" marks={2} statement="Find the year in which the top of the statue will just be exposed. (Assume that the melting started on 1 January 2010.)" examinerReport={EXAMINER_H}>
        <WorkingTable rows={rowsH} />
      </PartCard>
    </div>
  )
}
