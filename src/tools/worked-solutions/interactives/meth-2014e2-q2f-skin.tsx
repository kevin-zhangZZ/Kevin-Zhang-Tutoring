// 2014 Methods Exam 2 Q2f — why dh/dt = (dV/dt) ÷ (dV/dh). With d = 2h the radius equals the
// height, so as the cylinder melts it loses a skin of the same thickness off the top and the
// side. That skin has area πh² (top) + 2πh·h (side) = 3πh² = dV/dh. Each year 10 m³ of ice leaves
// through that skin, so the height drops by about 10 ÷ 3πh² per year: a division by dV/dh (the
// reciprocal the report says students missed), and negative because h is shrinking. Slide h down
// towards the statue (h = 1): the same 10 m³ is spread over a smaller skin, so the layer that melts
// in the next year gets thicker and the height falls faster.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider } from './kit'

const H0 = 6 / Math.cbrt(Math.PI) // 4.0967…, the starting height (V = 216)
const DV = 10 // m³ melted in the next year

export default function Skin() {
  const [h, setH] = useState(2.5)

  const V = Math.PI * h ** 3
  const area = 3 * Math.PI * h * h
  const rate = -10 / area
  // The cylinder that is left a year later (d = 2h kept): πh₁³ = V − 10, or nothing if V ≤ 10
  const h1 = Math.cbrt(Math.max(V - DV, 0) / Math.PI)
  const atStatue = h < 1.03

  // Cross-section through the axis: a rectangle of width 2h (radius h each side) and height h.
  const rect = (r: number, ht: number): [number, number][] => [[-r, 0], [r, 0], [r, ht], [-r, ht]]

  return (
    <div>
      <Plane x={[-4.5, 4.5]} y={[0, 4.5]} equalScale height={300} xLabel="" yLabel="" label="Side view of the melting ice cylinder">
        <Polygon points={rect(H0, H0)} color={C.guide} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
        <Polygon points={rect(h, h)} color={C.bad} fillOpacity={0.55} weight={2} />
        <Polygon points={rect(h1, h1)} color={C.f} fillOpacity={0.45} weight={2} />
        <Line.Segment point1={[0, 0]} point2={[0, 1]} color={C.ink} weight={4} />
        <Label at={[0, 1]} attach="e" size={12}>statue</Label>
        <Label at={[-H0, H0]} attach="ne" color={C.guide} size={12}>2010: h ≈ 4.10</Label>
        <Label at={[h, h / 2]} attach="e" color={C.bad} size={12}>skin</Label>
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={1} max={4.09} step={0.01} />
        <Readouts>
          <Readout tex={`V = \\pi h^3 \\approx ${V.toFixed(1)}\\ \\text{m}^3`} />
          <Readout color={C.bad} tex={`\\text{skin} = \\pi h^2 + 2\\pi h\\cdot h = 3\\pi h^2 \\approx ${area.toFixed(1)}\\ \\text{m}^2`} />
          <Readout color={C.bad} tex={V > DV ? `\\text{actual drop over next year} \\approx ${(h - h1).toFixed(2)}\\ \\text{m}` : '\\text{all melted within a year}'} />
          <Readout color={C.good} tex={`\\frac{dh}{dt} = \\frac{-10}{3\\pi h^2} \\approx ${rate.toFixed(3)}\\ \\text{m/year}`} />
        </Readouts>
        {atStatue ? (
          <Notice tone="good">
            <b>The statue&apos;s top is reached at <M>h = 1</M></b>: the skin is only <M>3\pi\approx 9.4</M> m², so the
            same 10 m³ a year strips the height at <M>{'\\tfrac{10}{3\\pi}\\approx1.06'}</M> m/year, part (g). The whole
            cylinder (<M>V=\pi</M>) would be gone in under 4 months.
          </Notice>
        ) : (
          <Notice>
            The red skin is what melts next. Its area is <M>{'\\tfrac{dV}{dh}=3\\pi h^2'}</M>, and 10 m³ a year spread
            over it is a layer about <M>{'10\\div3\\pi h^2'}</M> m thick per year (the actual drop is a little more, as the skin
            shrinks while it melts). That is why you <b>divide</b> by{' '}
            <M>{'\\tfrac{dV}{dh}'}</M>, and the minus sign is because <M>h</M> shrinks. Slide <M>h</M> down to 1 and
            watch the layer thicken.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
