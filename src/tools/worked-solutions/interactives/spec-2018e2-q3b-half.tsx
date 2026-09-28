// 2018 Specialist Exam 2 Q3b — half the volume is not half the depth. The fountain's cross-section
// fills to depth h while a gauge beside it shows V(h) as a fraction of the full volume √3π/4.
// Filling to half the depth (√3/4 ≈ 0.433 m) holds only 5/16 ≈ 31% of the water, because the bowl
// is narrow at the bottom; the gauge reaches one half at h ≈ 0.59 m, the answer to part b.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, tick } from './kit'

const TOP = Math.sqrt(3) / 2
const xOf = (y: number) => Math.sqrt(4 * y * y + 1) / 2
const wall = (x: number) => (Math.abs(x) <= 0.5 ? 0 : Math.sqrt(4 * x * x - 1) / 2)
const vol = (h: number) => (Math.PI / 4) * ((4 * h ** 3) / 3 + h)
const FULL = vol(TOP)

// Solve V(h) = FULL/2 by bisection (V is increasing).
function halfDepth(): number {
  let lo = 0
  let hi = TOP
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (vol(mid) < FULL / 2) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}
const HALF_V = halfDepth()
const G0 = 1.12
const G1 = 1.26

export default function HalfVolume() {
  const [h, setH] = useState(TOP / 2)
  const frac = vol(h) / FULL
  const atHalfDepth = Math.abs(h - TOP / 2) < 0.006
  const atHalfVol = Math.abs(h - HALF_V) < 0.006

  let notice
  if (atHalfDepth) {
    notice = (
      <Notice tone="warn">
        <b>Half the depth holds only about {Math.round(frac * 100)}% of the water.</b> The bottom half of the bowl is the narrow
        half: its discs have radius between <M>0.5</M> and <M>0.66</M>, while the top half&apos;s reach out to <M>1</M>. Now press
        &ldquo;Half the volume&rdquo; and see how much higher the water has to be.
      </Notice>
    )
  } else if (atHalfVol) {
    notice = (
      <Notice tone="good">
        <b>The gauge is exactly half full at <M>h \approx 0.59</M> m</b>, well above half the depth (<M>0.43</M> m). This is the
        solution of <M>{'\\tfrac{\\pi}{4}\\left(\\tfrac{4h^3}{3}+h\\right) = \\tfrac12 \\cdot \\tfrac{\\sqrt3\\pi}{4}'}</M>, and it
        is a good check on your CAS answer: for a bowl that widens, the half-volume depth must sit above the halfway mark.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The water level shows the <b>depth</b>; the gauge on the right shows the <b>volume</b> as a fraction of a full fountain.
        They don&apos;t move together: near the bottom each centimetre adds a small disc, near the top a big one. Try the two
        buttons.
      </Notice>
    )
  }

  const gaugeTop = frac * TOP
  return (
    <div>
      <Plane x={[-1.25, 1.55]} y={[-0.12, 1.05]} xStep={0.5} yStep={0.25} height={340} equalScale xLabels={v => (Math.abs(v) > 1.1 ? "" : tick(v))} yLabels={v => (v < 0 || v > 1 ? "" : tick(v))}>
        <Region top={() => h} bottom={wall} from={-xOf(h)} to={xOf(h)} color={C.f} opacity={0.22} />
        <Plot.Parametric xy={t => [xOf(t), t]} domain={[0, TOP]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [-xOf(t), t]} domain={[0, TOP]} color={C.f} weight={2} style="dashed" />
        <Line.Segment point1={[-0.5, 0]} point2={[0.5, 0]} color={C.f} weight={3} />
        <Line.Segment point1={[-xOf(h), h]} point2={[xOf(h), h]} color={C.f} weight={2} />
        <Line.Segment point1={[-1.1, TOP / 2]} point2={[1.02, TOP / 2]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[-0.75, TOP / 2]} attach="sw" color={C.guide} size={12}>half depth</Label>
        {/* volume gauge: height ∝ V(h) / V_full */}
        <Polygon points={[[G0, 0], [G1, 0], [G1, TOP], [G0, TOP]]} color={C.guide} fillOpacity={0} weight={1.5} />
        <Polygon points={[[G0, 0], [G1, 0], [G1, gaugeTop], [G0, gaugeTop]]} color={atHalfVol ? C.good : C.g} fillOpacity={0.5} weight={0} />
        <Line.Segment point1={[G0 - 0.03, TOP / 2]} point2={[G1 + 0.03, TOP / 2]} color={C.ink} weight={2} />
        <Label at={[G1, TOP / 2]} attach="e" size={12} gap={5}>½</Label>
        <Label at={[(G0 + G1) / 2, TOP]} attach="n" color={C.g} size={12}>volume</Label>
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={0} max={TOP} step={0.001} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label="Half the depth" onClick={() => setH(TOP / 2)} />
          <ActionButton label="Half the volume" onClick={() => setH(HALF_V)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{depth: } \\frac{h}{\\sqrt3/2} = ${Math.round((h / TOP) * 100)}\\%`} />
          <Readout color={atHalfVol ? C.good : C.g} tex={`\\text{volume: } \\frac{V(h)}{\\sqrt3\\pi/4} = ${Math.round(frac * 100)}\\%`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
