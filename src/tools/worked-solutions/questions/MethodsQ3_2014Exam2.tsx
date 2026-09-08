// 2014 Mathematical Methods — Exam 2, Question 3 (Section B).
// Tasmania Jones carves a statue from a cylinder of ice — volume, surface area minimisation,
// then a melting-rate related-rates problem. Question text transcribed from the original
// paper; worked solutions below are original. No video walkthrough yet.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

export default function MethodsQ3_2014Exam2() {
  const rowsA: WorkingRow[] = [
    {
      working: <Katex display tex="V = \pi r^2 h = \pi\left(\frac{d}{2}\right)^2 h = 216" />,
      reason: <>Cylinder volume, with radius written as <Katex tex="\tfrac{d}{2}" /> since the diameter <Katex tex="d" /> is the given variable.</>,
    },
    {
      working: <Katex display tex="\boxed{h = \dfrac{864}{\pi d^2}}" />,
      reason: <>Rearrange: <Katex tex="\tfrac{\pi d^2}{4}h=216 \implies h = \tfrac{864}{\pi d^2}" />.</>,
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: <Katex display tex="S = \pi d h + \pi\left(\frac{d}{2}\right)^2 = \pi dh + \frac{\pi d^2}{4}" />,
      reason: <>Excluding the base: lateral (curved) surface <Katex tex="\pi dh" /> plus the flat top, a circle of radius <Katex tex="\tfrac{d}{2}" />.</>,
    },
    {
      working: <Katex display tex="S = \pi d\left(\frac{864}{\pi d^2}\right) + \frac{\pi d^2}{4} = \frac{864}{d}+\frac{\pi d^2}{4}" />,
      reason: <>Substitute <Katex tex="h" /> from part (a) to write <Katex tex="S" /> in terms of <Katex tex="d" /> alone.</>,
    },
    {
      working: <Katex display tex="\boxed{S = \dfrac{\pi d^2}{4} + \dfrac{864}{d}} \quad \checkmark" />,
      reason: 'Matches the given form — confirms the substitution.',
    },
  ]

  const rowsC: WorkingRow[] = [
    {
      working: <Katex display tex="\frac{dS}{dd} = \frac{\pi d}{2} - \frac{864}{d^2} = 0" />,
    },
    {
      working: <Katex display tex="\frac{\pi d^3}{2} = 864 \;\implies\; d^3 = \frac{1728}{\pi}" />,
    },
    {
      working: <Katex display tex="\boxed{d = \sqrt[3]{\dfrac{1728}{\pi}} = \dfrac{12}{\sqrt[3]{\pi}} \approx 8.19 \text{ m}}" />,
      reason: (
        <>
          <Katex tex="\dfrac{d^2S}{dd^2}=\dfrac{\pi}{2}+\dfrac{1728}{d^3}>0" /> everywhere, so this is a minimum.
        </>
      ),
    },
    {
      working: <Katex display tex="S_{\min} = \frac{864}{d}+\frac{864}{2d} = \frac{1296}{d}" />,
      reason: <>Using <Katex tex="\tfrac{\pi d^2}{4}=\tfrac{\pi d^3}{4d}=\tfrac{864}{2d}" /> (from <Katex tex="\tfrac{\pi d^3}{2}=864" />) to rewrite the first term of <Katex tex="S" /> without <Katex tex="\pi" />.</>,
    },
    {
      working: <Katex display tex="\boxed{S_{\min} = 1296\left(\frac{\pi}{1728}\right)^{1/3} = 108\sqrt[3]{\pi} \approx 158.18 \text{ m}^2}" />,
      reason: <>Substitute <Katex tex="\tfrac1d = \left(\tfrac{\pi}{1728}\right)^{1/3}" />.</>,
    },
  ]

  const rowsD: WorkingRow[] = [
    {
      working: <Katex display tex="\frac{\pi d^3}{2}=864 \;\implies\; d^3 = \frac{1728}{\pi}, \qquad h = \frac{864}{\pi d^2}" />,
      reason: 'Combine the optimal-d condition from part (c) with the h–d relation from part (a).',
    },
    {
      working: <Katex display tex="h = \frac{864}{\pi d^2} = \frac{d^3/2}{d^2} = \frac{d}{2}" />,
      reason: <>Since <Katex tex="864 = \tfrac{\pi d^3}{2}" />, substitute directly: <Katex tex="\tfrac{864}{\pi d^2} = \tfrac{\pi d^3/2}{\pi d^2}" />.</>,
    },
    {
      working: <Katex display tex="\boxed{h = \dfrac{d}{2} = \dfrac{6}{\sqrt[3]{\pi}} \approx 4.10 \text{ m}}" />,
      reason: <>Halve the value of <Katex tex="d" /> found in part (c). Neatly, the minimising cylinder has height exactly half its diameter.</>,
    },
  ]

  const rowsE: WorkingRow[] = [
    {
      working: <Katex display tex="d = 2h \;\implies\; r = \frac{d}{2} = h" />,
      reason: <>The problem now assumes the ice keeps the <Katex tex="d=2h" /> proportions found in part (d) as it melts.</>,
    },
    {
      working: <Katex display tex="V = \pi r^2 h = \pi h^2\cdot h" />,
    },
    {
      working: <Katex display tex="\boxed{V = \pi h^3}" />,
    },
  ]

  const rowsF: WorkingRow[] = [
    {
      working: <Katex display tex="\frac{dV}{dt} = -10 \quad \text{(given, constant)}, \qquad \frac{dV}{dh} = 3\pi h^2" />,
      reason: <>Differentiate <Katex tex="V=\pi h^3" /> from part (e) with respect to <Katex tex="h" />.</>,
    },
    {
      working: <Katex display tex="\frac{dh}{dt} = \frac{dV}{dt}\Big/\frac{dV}{dh}" />,
      reason: 'Chain rule (related rates).',
    },
    {
      working: <Katex display tex="\boxed{\dfrac{dh}{dt} = \dfrac{-10}{3\pi h^2}}" />,
    },
  ]

  const rowsG: WorkingRow[] = [
    {
      working: <Katex display tex="\text{Statue height} = 1\text{ m, based at the centre of the ice's base} \;\implies\; h=1" />,
      reason: 'The top of the statue is "just exposed" exactly when the melting ice surface has dropped to the height of the statue.',
    },
    {
      working: <Katex display tex="\left.\frac{dh}{dt}\right|_{h=1} = \frac{-10}{3\pi(1)^2}" />,
      reason: 'Substitute h = 1 into the result from part (f).',
    },
    {
      working: <Katex display tex="\boxed{\dfrac{dh}{dt} = -\dfrac{10}{3\pi} \approx -1.06 \text{ m/year}}" />,
    },
  ]

  const rowsH: WorkingRow[] = [
    {
      working: <Katex display tex="\frac{dV}{dt}=-10 \text{ (constant)} \;\implies\; V(t) = 216-10t" />,
      reason: <>Since the volume decreases at a constant rate from its initial value <Katex tex="V(0)=216" /> — no need to integrate <Katex tex="\tfrac{dh}{dt}" /> separately.</>,
    },
    {
      working: <Katex display tex="V=\pi h^3 \;\implies\; h^3 = \frac{216-10t}{\pi}" />,
      reason: <>From part (e), valid throughout while <Katex tex="d=2h" /> holds.</>,
    },
    {
      working: <Katex display tex="h=1 \;\implies\; 1 = \frac{216-10t}{\pi} \;\implies\; 216-10t=\pi" />,
      reason: 'Set h = 1, the condition from part (g).',
    },
    {
      working: <Katex display tex="t = \frac{216-\pi}{10} \approx 21.29 \text{ years}" />,
    },
    {
      working: <Katex display tex="\boxed{\text{Sometime during the year } 2031}" />,
      reason: (
        <>
          Counting from 1 Jan 2010: <Katex tex="t=21" /> years lands on 1 Jan 2031, and the remaining{' '}
          <Katex tex="\approx 0.29" /> of a year (<Katex tex="\approx" /> 3.5 months) falls in 2031, before
          1 Jan 2032.
        </>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3</p>
        <p>
          Tasmania Jones is exploring an ice cave and finds a large cylindrical block of ice, with a 1 m tall
          statue embedded with its base at the centre of one of the cylinder's circular faces. The cylinder of
          ice has diameter <Katex tex="d" /> metres and height <Katex tex="h" /> metres, and initially has
          volume 216 m³.
        </p>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 mt-3 w-fit">
          <IceCylinderDiagram />
        </div>
      </div>

      <PartCard letter="a" marks={1} statement={<>Show that <Katex tex="h = \dfrac{864}{\pi d^2}" />.</>}>
        <WorkingTable rows={rowsA} />
      </PartCard>

      <PartCard letter="b" marks={1} statement={<>Hence show that the surface area of the ice block, excluding its base, is given by <Katex tex="S = \dfrac{\pi d^2}{4} + \dfrac{864}{d}" />.</>}>
        <WorkingTable rows={rowsB} />
      </PartCard>

      <PartCard letter="c" marks={2} statement="Find the value of d, correct to two decimal places, that minimises this surface area, and find the minimum surface area, correct to two decimal places.">
        <WorkingTable rows={rowsC} />
      </PartCard>

      <PartCard letter="d" marks={1} statement={<>Find the value of <Katex tex="h" /> for which the surface area is a minimum, giving your answer correct to two decimal places.</>}>
        <WorkingTable rows={rowsD} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The ice block, with the statue embedded, begins to melt. As it does, it maintains the same
        proportions found in part (d) — that is, its diameter is always twice its height, <Katex tex="d=2h" />.
      </div>

      <PartCard letter="e" marks={1} statement="Show that the volume of the ice block can be written as V = πh³.">
        <WorkingTable rows={rowsE} />
      </PartCard>

      <PartCard letter="f" marks={2} statement={<>Given the ice is melting at a constant rate of 10 m³ per year, find <Katex tex="\dfrac{dh}{dt}" /> in terms of <Katex tex="h" />.</>}>
        <WorkingTable rows={rowsF} />
      </PartCard>

      <PartCard letter="g" marks={1} statement="Find the rate at which h is decreasing at the instant the top of the statue is just exposed, correct to two decimal places.">
        <WorkingTable rows={rowsG} />
      </PartCard>

      <PartCard letter="h" marks={2} statement="If the ice block started melting on 1 January 2010, find the year in which the top of the statue is just exposed.">
        <WorkingTable rows={rowsH} />
      </PartCard>
    </div>
  )
}

function IceCylinderDiagram() {
  return (
    <svg viewBox="0 0 240 220" width={200} height={183}>
      <ellipse cx={120} cy={40} rx={80} ry={22} fill="#e0f2fe" stroke="#38bdf8" strokeWidth={2} />
      <line x1={40} y1={40} x2={40} y2={170} stroke="#38bdf8" strokeWidth={2} />
      <line x1={200} y1={40} x2={200} y2={170} stroke="#38bdf8" strokeWidth={2} />
      <path d="M 40 170 A 80 22 0 0 0 200 170" fill="none" stroke="#38bdf8" strokeWidth={2} />
      <path d="M 40 170 A 80 22 0 0 1 200 170" fill="none" stroke="#38bdf8" strokeWidth={2} strokeDasharray="4 3" />
      {/* statue */}
      <rect x={112} y={95} width={16} height={60} rx={3} fill="#94a3b8" />
      <circle cx={120} cy={90} r={8} fill="#94a3b8" />
      <line x1={40} y1={40} x2={200} y2={40} stroke="#9ca3af" strokeWidth={1} strokeDasharray="3 2" />
      <text x={210} y={100} fontSize={12} className="fill-gray-700 dark:fill-gray-300">h</text>
      <line x1={222} y1={40} x2={222} y2={170} stroke="#9ca3af" strokeWidth={1} />
      <text x={110} y={30} fontSize={12} className="fill-gray-700 dark:fill-gray-300">d</text>
      <line x1={40} y1={18} x2={200} y2={18} stroke="#9ca3af" strokeWidth={1} />
    </svg>
  )
}
