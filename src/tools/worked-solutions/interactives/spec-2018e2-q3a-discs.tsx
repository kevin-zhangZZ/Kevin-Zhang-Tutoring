// 2018 Specialist Exam 2 Q3a — the water in the fountain is a stack of horizontal discs. The
// cross-section shows y = ½√(4x² − 1) (and its mirror image after rotating about the y-axis);
// the orange disc at height y has radius x = ½√(4y² + 1), so its area is π(4y² + 1)/4. Stacking
// these from y = 0 to the water surface y = h is V = π∫₀ʰ x² dy = (π/4)(4h³/3 + h).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  tick, usePlayer,
} from './kit'

const TOP = Math.sqrt(3) / 2
const xOf = (y: number) => Math.sqrt(4 * y * y + 1) / 2
const wall = (x: number) => (Math.abs(x) <= 0.5 ? 0 : Math.sqrt(4 * x * x - 1) / 2)
const vol = (h: number) => (Math.PI / 4) * ((4 * h ** 3) / 3 + h)

function disc(y: number, r: number): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= 48; i++) {
    const t = (2 * Math.PI * i) / 48
    pts.push([r * Math.cos(t), y + 0.07 * r * Math.sin(t)])
  }
  return pts
}

export default function Discs() {
  const [h, setH] = useState(0.6)
  const [y0, setY0] = useState(0.3)
  const yy = Math.min(y0, h)
  const player = usePlayer(setY0, { min: 0, max: h, seconds: 4 })
  const r = xOf(yy)

  let notice
  if (yy < 0.03) {
    notice = (
      <Notice>
        <b>The bottom disc has radius <M>\tfrac12</M>, not 0</b>: the curve meets the <M>x</M>-axis at{' '}
        <M>x = \tfrac12</M>, so the fountain has a flat base. That is why the stack starts at <M>y = 0</M> with a disc of area{' '}
        <M>{'\\tfrac{\\pi}{4}'}</M>. Drag <M>y</M> upwards and watch the discs grow.
      </Notice>
    )
  } else if (h - yy < 0.02) {
    notice = (
      <Notice tone="good">
        <b>This disc is the water surface.</b> The stack stops here, so <M>h</M> is the upper terminal:{' '}
        <M>{'V = \\pi\\int_0^h x^2\\,dy'}</M>. Change <M>h</M> and the volume readout follows{' '}
        <M>{'\\tfrac{\\pi}{4}\\left(\\tfrac{4h^3}{3}+h\\right)'}</M> exactly.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The disc at height <M>y</M> reaches out to the curve, so its <b>radius is the curve&apos;s <M>x</M>-value</b> at that
        height. That is why you rearrange to <M>{'x^2 = \\tfrac{4y^2+1}{4}'}</M>: each disc has area <M>\pi x^2</M> written in{' '}
        <M>y</M>. Press play to stack the discs from the base to the surface.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.3, 1.3]} y={[-0.12, 1.05]} xStep={0.5} yStep={0.25} height={340} equalScale xLabels={v => (Math.abs(v) > 1.1 ? "" : tick(v))} yLabels={v => (v < 0 || v > 1 ? "" : tick(v))}>
        <Region top={() => h} bottom={wall} from={-xOf(h)} to={xOf(h)} color={C.f} opacity={0.16} />
        <Plot.Parametric xy={t => [xOf(t), t]} domain={[0, TOP]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [-xOf(t), t]} domain={[0, TOP]} color={C.f} weight={2} style="dashed" />
        <Line.Segment point1={[-0.5, 0]} point2={[0.5, 0]} color={C.f} weight={3} />
        <Line.Segment point1={[-xOf(h), h]} point2={[xOf(h), h]} color={C.f} weight={2} />
        <Polygon points={disc(yy, r)} color={C.g} fillOpacity={0.35} weight={2} />
        <Line.Segment point1={[0, yy]} point2={[r, yy]} color={C.g} weight={3} />
        <Point x={r} y={yy} color={C.g} />
        <Label at={[0.7 * r, yy]} attach="n" color={C.g} gap={12}>x</Label>
        <Line.Segment point1={[1.18, 0]} point2={[1.18, h]} color={C.guide} weight={2} />
        <Label at={[1.18, h / 2]} attach="e" color={C.guide}>h</Label>
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={v => { setH(v); if (y0 > v) setY0(v) }} min={0.1} max={TOP} step={0.005} />
        <Slider label="y" value={yy} onChange={v => { player.stop(); setY0(Math.min(v, h)) }} min={0} max={h} step={0.005} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(yy)} label="Stack the discs" />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\text{radius } x = \\tfrac12\\sqrt{4y^2+1} = ${r.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\text{disc area } \\pi x^2 = ${(Math.PI * r * r).toFixed(3)}`} />
          <Readout color={C.f} tex={`V = \\tfrac{\\pi}{4}\\left(\\tfrac{4h^3}{3}+h\\right) = ${vol(h).toFixed(3)}\\text{ m}^3`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
