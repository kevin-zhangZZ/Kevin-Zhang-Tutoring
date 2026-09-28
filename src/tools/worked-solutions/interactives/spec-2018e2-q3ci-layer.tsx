// 2018 Specialist Exam 2 Q3c.i — why dh/dt = (dV/dt) ÷ (dV/dh). dV/dh = (π/4)(4h² + 1) is the
// area of the water surface πx(h)², so a volume ΔV poured in spreads into a layer about ΔV/A
// thick. The widget pours the same 0.1 m³ on top at any depth h: the layer gets thinner as the
// surface widens. With the net inflow 0.04 − 0.05√h, the depth rises at (net inflow)/(area),
// which is 0.0153 m/s at h = 0.25 (part c.ii).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, tick } from './kit'

const TOP = Math.sqrt(3) / 2
const xOf = (y: number) => Math.sqrt(4 * y * y + 1) / 2
const wall = (x: number) => (Math.abs(x) <= 0.5 ? 0 : Math.sqrt(4 * x * x - 1) / 2)
const vol = (h: number) => (Math.PI / 4) * ((4 * h ** 3) / 3 + h)
const area = (h: number) => (Math.PI / 4) * (4 * h * h + 1)
const DV = 0.1

// Thickness of the layer that ΔV makes on top of depth h (bisection on V).
function layer(h: number): number {
  let lo = h
  let hi = h + 1
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2
    if (vol(mid) - vol(h) < DV) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2 - h
}

function ellipse(y: number, r: number): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= 48; i++) {
    const t = (2 * Math.PI * i) / 48
    pts.push([r * Math.cos(t), y + 0.07 * r * Math.sin(t)])
  }
  return pts
}

export default function Layer() {
  const [h, setH] = useState(0.25)
  const dh = layer(h)
  const A = area(h)
  const net = 0.04 - 0.05 * Math.sqrt(h)
  const rate = net / A
  const top = h + dh

  let notice
  if (Math.abs(h - 0.25) < 0.004) {
    notice = (
      <Notice tone="good">
        At <M>h = 0.25</M> the surface is a disc of area <M>{'\\tfrac{\\pi}{4}(4h^2+1) \\approx 0.98'}</M> m². Each second
        the fountain gains a net <M>{'0.04 - 0.05\\sqrt{0.25} = 0.015'}</M> m³, which spreads over that surface, so the depth
        rises about <M>{'0.015 \\div 0.98 \\approx 0.0153'}</M> m/s. That is part c.ii. Now drag <M>h</M> up and watch the
        same <M>0.1</M> m³ layer get thinner.
      </Notice>
    )
  } else if (h > 0.6) {
    notice = (
      <Notice>
        Up here the surface has two to four times the area of the base, so the same <M>0.1</M> m³ makes a layer only 3 to 5 cm thick,
        compared with about 12 cm at the very bottom. Dividing by <M>{'\\tfrac{dV}{dh}'}</M> is
        exactly this spreading: <M>{'\\Delta h \\approx \\Delta V \\div A'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'\\tfrac{dV}{dh}'}</M> is <b>the area of the water surface</b>: raising the level by a thin <M>{'\\Delta h'}</M>{' '}
        adds a slab of volume <M>{'A\\,\\Delta h'}</M>. So a volume <M>{'\\Delta V'}</M> poured in raises the level by{' '}
        <M>{'\\Delta h \\approx \\Delta V \\div A'}</M>, and per second that is{' '}
        <M>{'\\tfrac{dh}{dt} = \\tfrac{dV}{dt} \\div \\tfrac{dV}{dh}'}</M>. Set <M>h = 0.25</M> to connect it with part c.ii.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.3, 1.3]} y={[-0.12, 1.05]} xStep={0.5} yStep={0.25} height={340} equalScale xLabels={v => (Math.abs(v) > 1.1 ? "" : tick(v))} yLabels={v => (v < 0 || v > 1 ? "" : tick(v))}>
        <Region top={() => h} bottom={wall} from={-xOf(h)} to={xOf(h)} color={C.f} opacity={0.2} />
        <Region top={() => top} bottom={x => Math.max(h, wall(x))} from={-xOf(top)} to={xOf(top)} color={C.g} opacity={0.55} />
        <Plot.Parametric xy={t => [xOf(t), t]} domain={[0, TOP]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [-xOf(t), t]} domain={[0, TOP]} color={C.f} weight={2} style="dashed" />
        <Line.Segment point1={[-0.5, 0]} point2={[0.5, 0]} color={C.f} weight={3} />
        <Polygon points={ellipse(h, xOf(h))} color={C.f} fillOpacity={0.12} weight={2} />
        <Label at={[-xOf(top), top]} attach="w" color={C.g} size={12}>+0.1 m³</Label>
        <Line.Segment point1={[1.18, 0]} point2={[1.18, h]} color={C.guide} weight={2} />
        <Label at={[1.18, h / 2]} attach="e" color={C.guide}>h</Label>
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={0} max={TOP - 0.05} step={0.005} format={v => v.toFixed(3)} />
        <Readouts>
          <Readout color={C.f} tex={`A = \\tfrac{dV}{dh} = \\tfrac{\\pi}{4}(4h^2+1) = ${A.toFixed(3)}\\text{ m}^2`} />
          <Readout color={C.g} tex={`\\text{layer} = ${dh.toFixed(3)} \\approx \\tfrac{0.1}{A} = ${(DV / A).toFixed(3)}\\text{ m}`} />
          <Readout tex={`\\tfrac{dV}{dt} = 0.04 - 0.05\\sqrt h = ${net.toFixed(4)}`} />
          <Readout color={C.good} tex={`\\tfrac{dh}{dt} = \\tfrac{dV}{dt} \\div \\tfrac{dV}{dh} = ${rate.toFixed(4)}\\text{ m/s}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
