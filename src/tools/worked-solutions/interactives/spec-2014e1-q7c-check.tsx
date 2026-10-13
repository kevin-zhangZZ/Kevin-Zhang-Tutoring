// 2014 Specialist Exam 1 Q7c — checking an area answer against the graph. Only 26% got full marks;
// the report names two slips: integrating 6x/(1+4x²) as 3·arctan(2x), and keeping the x-terminals
// after substituting u = 1 + 4x². Pick a candidate answer: the widget draws the rectangle of the
// same area over [1/2, √3/2]. The true area must have an equal-area height between the curve's
// lowest value π/4 and highest value π/3. The 3·arctan slip (height 0.690) fails that check;
// the terminals slip (height 1.030) passes it, so the check catches some slips but not all.
// Values from sympy: correct √3π/6 − π/8 − ¼ln2 ≈ 0.3409; 3arctan slip π(4√3 − 5)/24 ≈ 0.2524;
// terminals slip √3π/6 − π/8 − ⅛ln3 ≈ 0.3769; width (√3 − 1)/2 ≈ 0.3660.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Toggle, Buttons } from './kit'

const g = (x: number) => Math.atan(2 * x)
const A0 = 0.5
const B0 = Math.sqrt(3) / 2
const WIDTH = B0 - A0
const LO = Math.PI / 4
const HI = Math.PI / 3

const CANDIDATES = [
  { key: 'right', label: 'Correct answer', value: 0.3409138, tex: '\\tfrac{\\sqrt3\\pi}{6}-\\tfrac\\pi8-\\tfrac14\\log_e2' },
  { key: 'atan', label: 'Used 3 arctan(2x)', value: 0.2524012, tex: '\\tfrac{\\sqrt3\\pi}{6}-\\tfrac\\pi8-\\tfrac\\pi3+\\tfrac\\pi4' },
  { key: 'terms', label: 'Kept x-terminals for u', value: 0.3768741, tex: '\\tfrac{\\sqrt3\\pi}{6}-\\tfrac\\pi8-\\tfrac18\\log_e3' },
] as const

export default function Check() {
  const [pick, setPick] = useState<(typeof CANDIDATES)[number]['key']>('right')
  const [bounds, setBounds] = useState(true)
  const cand = CANDIDATES.find(c => c.key === pick)!
  const h = cand.value / WIDTH
  const inside = h >= LO && h <= HI
  const colour = pick === 'right' ? C.good : inside ? C.g : C.bad

  let notice
  if (pick === 'right') {
    notice = (
      <Notice tone="good">
        The equal-area rectangle has height <M>{h.toFixed(3)}</M>, between the curve&apos;s lowest value{' '}
        <M>{'\\tfrac\\pi4\\approx0.785'}</M> and highest <M>{'\\tfrac\\pi3\\approx1.047'}</M>, cutting the curve with
        about as much shading above as below. Now try the two slips.
      </Notice>
    )
  } else if (pick === 'atan') {
    notice = (
      <Notice tone="warn">
        Writing <M>{'\\int\\frac{6x}{1+4x^2}dx = 3\\arctan(2x)'}</M> gives an area of <M>0.252</M>. Its equal-area
        rectangle (height <M>{h.toFixed(3)}</M>) sits <b>entirely below the curve</b>, smaller than the rectangle of height{' '}
        <M>{'\\tfrac\\pi4'}</M> that fits under it, so this answer is impossible. That numerator is a multiple of the
        denominator&apos;s derivative: <M>{'\\log_e'}</M>, not arctan.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Substituting <M>{'u = 1+4x^2'}</M> but keeping the terminals <M>{'\\tfrac12'}</M> and{' '}
        <M>{'\\tfrac{\\sqrt3}{2}'}</M> gives <M>0.377</M>. Its height <M>{h.toFixed(3)}</M> is still below{' '}
        <M>{'\\tfrac\\pi3'}</M>, so <b>this check does not catch it</b>. Only careful terminals do: the{' '}
        <M>u</M>-terminals are <M>{'1+4\\cdot\\tfrac14 = 2'}</M> and <M>{'1+4\\cdot\\tfrac34 = 4'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1.05]} y={[0, 1.3]} xStep={0.25} yStep={0.25} height={320} label="Graph of y = arctan(2x) with the area from x = 1/2 to x = √3/2">
        <Region top={g} bottom={() => 0} from={A0} to={B0} color={C.f} opacity={0.22} />
        <Plot.OfX y={g} domain={[0, 1.05]} color={C.f} weight={3} />
        {bounds && (
          <>
            <Line.Segment point1={[A0, LO]} point2={[B0, LO]} color={C.guide} style="dashed" weight={1.5} />
            <Line.Segment point1={[A0, HI]} point2={[B0, HI]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[A0, LO]} color={C.guide} attach="w">π/4</Label>
            <Label at={[A0, HI]} color={C.guide} attach="w">π/3</Label>
          </>
        )}
        <Polygon
          points={[[A0, 0], [B0, 0], [B0, h], [A0, h]]}
          color={colour}
          fillOpacity={0.12}
          weight={2.5}
        />
        <Label at={[0.22, g(0.22)]} color={C.f} attach="se">arctan(2x)</Label>
        <Label at={[B0, 0.07]} attach="e" bold={false}>√3/2</Label>
      </Plane>
      <Controls>
        <Buttons>
          {CANDIDATES.map(c => (
            <Toggle key={c.key} label={c.label} checked={pick === c.key} onChange={() => setPick(c.key)} />
          ))}
          <Toggle label="Show π/4 and π/3 heights" checked={bounds} onChange={setBounds} />
        </Buttons>
        <Readouts>
          <Readout color={colour} tex={`A = ${cand.tex} \\approx ${cand.value.toFixed(3)}`} />
          <Readout color={colour} tex={`\\text{height} = \\frac{A}{${WIDTH.toFixed(3)}} \\approx ${h.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
