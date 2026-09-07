// 2016 Specialist Mathematics — Exam 2, Question 4 (10 marks).
// Two ships' position vectors: collision check, angle between paths, closest approach.
// Question text transcribed from the original paper; worked solutions below are original.
// No video walkthrough yet — the tutor will record and add these later.

import Katex from '../../../components/Katex'
import { PartCard, Step } from '../QuestionParts'

export default function SpecialistQ4_2016() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (10 marks)</p>
        <p className="mb-2">
          Two ships, <Katex tex="A" /> and <Katex tex="B" />, are observed from a lighthouse at origin{' '}
          <Katex tex="O" />. Relative to <Katex tex="O" />, their position vectors at time <Katex tex="t" /> hours
          after midday are given by
        </p>
        <Katex display tex="\underset{\sim}{r}_A = 5(1-t)\underset{\sim}{i} + 3(1+t)\underset{\sim}{j}, \qquad \underset{\sim}{r}_B = 4(t-2)\underset{\sim}{i} + (5t-2)\underset{\sim}{j}" className="my-2" />
        <p>where displacements are measured in kilometres.</p>
      </div>

      <PartCard letter="a" marks={2} statement="Show that the two ships will not collide, clearly stating your reason.">
        <Step n={1}>
          The ships collide only if both components of <Katex tex="\underset{\sim}{r}_A" /> and <Katex tex="\underset{\sim}{r}_B" /> match at
          the <em>same</em> value of <Katex tex="t" />. Setting the <Katex tex="i" />-components equal:
          <Katex display tex="5(1-t) = 4(t-2) \;\implies\; 5-5t=4t-8 \;\implies\; t = \tfrac{13}{9}" className="my-2" />
        </Step>
        <Step n={2}>
          Setting the <Katex tex="j" />-components equal:
          <Katex display tex="3(1+t) = 5t-2 \;\implies\; 3+3t=5t-2 \;\implies\; t = \tfrac{5}{2}" className="my-2" />
        </Step>
        <Step n={3} final>
          <Katex tex="\tfrac{13}{9} \ne \tfrac{5}{2}" /> — the paths cross, but the ships are never at that crossing
          point at the same time.
          <Katex display tex="\boxed{\text{No common solution for } t \implies \text{the ships do not collide.}}" className="my-2" />
        </Step>
      </PartCard>

      <PartCard letter="b" marks={3} statement="Sketch and label the path of each ship on the axes below. Show the direction of motion of each ship with an arrow.">
        <Step n={1}>
          Eliminating <Katex tex="t" /> from each vector gives the Cartesian line each ship travels along:
          <Katex display tex="\text{Ship } A: \ y = 6 - \tfrac{3}{5}x \qquad \text{Ship } B: \ y = 1.25x + 8" className="my-2" />
        </Step>
        <Step n={2} final>
          Direction vectors <Katex tex="(-5,3)" /> for <Katex tex="A" /> and <Katex tex="(4,5)" /> for{' '}
          <Katex tex="B" /> (from the coefficients of <Katex tex="t" />) fix which way each arrow points:
          <div className="mt-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
            <ShipPathsDiagram />
          </div>
        </Step>
      </PartCard>

      <PartCard letter="c" marks={2} statement="Find the obtuse angle between the paths of the two ships. Give your answer in degrees, correct to one decimal place.">
        <Step n={1}>
          Using the direction vectors <Katex tex="\underset{\sim}{d}_A=(-5,3)" /> and <Katex tex="\underset{\sim}{d}_B=(4,5)" />:
          <Katex
            display
            tex="\cos\theta = \frac{\underset{\sim}{d}_A \cdot \underset{\sim}{d}_B}{|\underset{\sim}{d}_A||\underset{\sim}{d}_B|} = \frac{(-5)(4)+(3)(5)}{\sqrt{34}\sqrt{41}} = \frac{-5}{\sqrt{1394}}"
            className="my-2"
          />
        </Step>
        <Step n={2} final>
          <Katex tex="\cos\theta \approx -0.1339" />, which is already obtuse:
          <Katex display tex="\boxed{\theta \approx 97.7°}" className="my-2" />
        </Step>
      </PartCard>

      <PartCard letter="d" marks={3} statement={<>Find the value of <Katex tex="t" />, correct to three decimal places, when the ships are closest, and the minimum distance between them in kilometres, correct to two decimal places.</>}>
        <Step n={1}>
          The displacement from <Katex tex="B" /> to <Katex tex="A" /> is:
          <Katex
            display
            tex="\underset{\sim}{r}_A - \underset{\sim}{r}_B = \bigl[5(1-t)-4(t-2)\bigr]\underset{\sim}{i} + \bigl[3(1+t)-(5t-2)\bigr]\underset{\sim}{j} = (13-9t)\underset{\sim}{i} + (5-2t)\underset{\sim}{j}"
            className="my-2"
          />
        </Step>
        <Step n={2}>
          Minimise the square of the distance, <Katex tex="D(t)^2=(13-9t)^2+(5-2t)^2 = 85t^2-254t+194" />:
          <Katex display tex="D'(t)^2 = 170t - 254 = 0 \;\implies\; t = \frac{254}{170} = \frac{127}{85}" className="my-2" />
        </Step>
        <Step n={3} final>
          <Katex display tex="\boxed{t \approx 1.494 \text{ hours}}" className="my-2" />
          Substituting back, the minimum value of <Katex tex="D(t)^2 \approx 4.2471" />, so:
          <Katex display tex="\boxed{D_{\min} = \sqrt{4.2471} \approx 2.06 \text{ km}}" className="my-2" />
        </Step>
      </PartCard>
    </div>
  )
}

// Lighthouse-at-origin sketch: ship A's path (sky) and ship B's path (amber), each drawn
// over the visible t-range with an arrowhead showing the direction of increasing t.
function ShipPathsDiagram() {
  const A1 = { x: 300, y: 150 } // t=-1 -> (10,0)
  const A2 = { x: 75, y: 15 } // t=2 -> (-5,9), direction of travel
  const B1 = { x: 30, y: 180 } // t=0 -> (-8,-2)
  const B2 = { x: 150, y: 30 } // t=2 -> (0,8), direction of travel

  return (
    <svg viewBox="0 0 300 300" width={260} height={260}>
      {[-10, -5, 0, 5, 10].map(n => (
        <g key={n}>
          <line x1={150 + n * 15} y1={0} x2={150 + n * 15} y2={300} stroke="#e5e7eb" strokeWidth={1} />
          <line x1={0} y1={150 - n * 15} x2={300} y2={150 - n * 15} stroke="#e5e7eb" strokeWidth={1} />
        </g>
      ))}
      <line x1={0} y1={150} x2={300} y2={150} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={150} y1={0} x2={150} y2={300} stroke="#9ca3af" strokeWidth={1.5} />

      <circle cx={150} cy={150} r={4} fill="#374151" />
      <text x={156} y={146} fontSize={11} className="fill-gray-700 dark:fill-gray-300">O</text>

      <defs>
        <marker id="arrowA" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#0ea5e9" />
        </marker>
        <marker id="arrowB" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#f97316" />
        </marker>
      </defs>

      <line x1={A1.x} y1={A1.y} x2={A2.x} y2={A2.y} stroke="#0ea5e9" strokeWidth={2.5} markerEnd="url(#arrowA)" />
      <line x1={B1.x} y1={B1.y} x2={B2.x} y2={B2.y} stroke="#f97316" strokeWidth={2.5} markerEnd="url(#arrowB)" />

      <text x={A1.x - 22} y={A1.y - 8} fontSize={12} className="fill-sky-600 dark:fill-sky-400" fontWeight={700}>A</text>
      <text x={B1.x + 6} y={B1.y + 14} fontSize={12} className="fill-orange-600 dark:fill-orange-400" fontWeight={700}>B</text>
    </svg>
  )
}
