// 2018 Methods Exam 2 Q3e — P is the point of Arch 5 whose tangent is parallel to the second
// bridge. Slide a point along h₂(x) = 5 sin((x − 40)π/30) with its tangent drawn; the lower graph
// plots the tangent's gradient h₂′(x) against the bridge's gradient tan(π/90), so the CAS's
// solve(h₂′(x) = tan(π/90)) becomes "where the gradient curve crosses the line" — once in [40, 70],
// at x ≈ 54.36. A button jumps to the top of the arch to show why the crest (55, 5) is not P.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const M_BRIDGE = Math.tan(Math.PI / 90)
const h2 = (x: number) => 5 * Math.sin(((x - 40) * Math.PI) / 30)
const dh2 = (x: number) => (Math.PI / 6) * Math.cos(((x - 40) * Math.PI) / 30)
const XP = 40 + (30 / Math.PI) * Math.acos((6 * M_BRIDGE) / Math.PI)
const YP = h2(XP)
const bridge = (x: number) => 5 + M_BRIDGE * x

export default function ParallelTangent() {
  const [x0, setX0] = useState(46)
  const y0 = h2(x0)
  const g = dh2(x0)
  const hit = Math.abs(x0 - XP) < 0.12
  const crest = Math.abs(x0 - 55) < 0.12
  const tanColor = hit ? C.good : C.violet
  const L = 7

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b>Parallel.</b> Here <M>{"h_2'(x) = \\tan\\left(\\tfrac{\\pi}{90}\\right) \\approx 0.0349"}</M>, so{' '}
        <M>{`P \\approx (${XP.toFixed(2)},\\ ${YP.toFixed(2)})`}</M>. On the lower graph this is where the gradient
        curve crosses the orange line, and it crosses only once in <M>[40,\ 70]</M>, so there is exactly one{' '}
        <M>P</M>. Notice it is just left of the crest and a shade below <M>y = 5</M>.
      </Notice>
    )
  } else if (crest) {
    notice = (
      <Notice tone="warn">
        At the top of the arch the tangent is horizontal: <M>{"h_2'(55) = 0"}</M>. The bridge rises with gradient{' '}
        <M>0.035</M>, so the two are <b>not</b> parallel and <M>(55,\ 5)</M> is not <M>P</M>. Reading{' '}
        <M>P \approx (54,\ 5)</M> off the diagram has the same problem: you need the point where the gradients
        match, which only the equation can give to two decimal places.
      </Notice>
    )
  } else if (x0 < XP) {
    notice = (
      <Notice>
        Here the arch climbs more steeply than the bridge: <M>{`h_2'(x) = ${g.toFixed(3)}`}</M>, bigger than{' '}
        <M>0.035</M>. Slide right. The tangent flattens as you approach the crest, so somewhere before the top
        its gradient drops to exactly the bridge&apos;s.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>P</M> the tangent is flatter than the bridge, and beyond the crest it slopes <b>down</b> (
        <M>{`h_2'(x) = ${g.toFixed(3)}`}</M>). A downhill tangent can never be parallel to a bridge that rises, so{' '}
        <M>P</M> must be on the rising, left-hand side of the arch.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[38, 72]} y={[0, 8.5]} xStep={5} yStep={1} height={250} xLabel="" yLabel="">
        <Line.Segment point1={[36, 5]} point2={[74, 5]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={bridge} domain={[30, 80]} color={C.g} weight={3} />
        <Plot.OfX y={h2} domain={[40, 70]} color={C.f} weight={3} />
        <Line.Segment point1={[x0 - L, y0 - L * g]} point2={[x0 + L, y0 + L * g]} color={tanColor} weight={2.5} />
        <Point x={x0} y={y0} color={tanColor} />
        <Label at={[71, bridge(71)]} attach="nw" color={C.g}>second bridge</Label>
        <Label at={[67, h2(67)]} attach="e" color={C.f}>Arch 5</Label>
        <Label at={[38.5, 5]} attach="s" color={C.guide} bold={false} gap={4}>y = 5</Label>
        {hit && <Label at={[x0, y0]} attach="s" color={C.good} gap={10}>P</Label>}
      </Plane>
      <Plane x={[38, 72]} y={[-0.6, 0.6]} xStep={5} yStep={0.2} height={150} xLabel="" yLabel="" yLabels={false}>
        <Plot.OfX y={() => M_BRIDGE} domain={[30, 80]} color={C.g} weight={2.5} style="dashed" />
        <Plot.OfX y={dh2} domain={[40, 70]} color={C.f} weight={3} />
        <Line.Segment point1={[x0, 0]} point2={[x0, g]} color={tanColor} style="dashed" weight={1.5} />
        <Point x={x0} y={g} color={tanColor} />
        {hit && <Point x={XP} y={M_BRIDGE} color={C.good} />}
        <Label at={[62, dh2(62)]} attach="sw" color={C.f}>{"gradient h₂′(x)"}</Label>
        <Label at={[71, M_BRIDGE]} attach="nw" color={C.g}>{'tan(π/90) ≈ 0.035'}</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={40} max={70} step={0.02} format={v => v.toFixed(2)} />
        <Buttons>
          <ActionButton label="Top of the arch" onClick={() => setX0(55)} />
          <ActionButton label="Solve for P" onClick={() => setX0(XP)} />
        </Buttons>
        <Readouts>
          <Readout color={tanColor} tex={`h_2'(${x0.toFixed(2)}) = ${g.toFixed(4)}`} />
          <Readout color={C.g} tex={`\\tan\\left(\\tfrac{\\pi}{90}\\right) = ${M_BRIDGE.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
