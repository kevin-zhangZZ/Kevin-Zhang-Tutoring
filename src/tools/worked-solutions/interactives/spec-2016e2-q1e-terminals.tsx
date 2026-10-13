// 2016 Specialist Exam 2 Q1e — where the terminals of V = π∫ x² dy come from. The arc
// y = 4/x + x + x², x ∈ [−3, −0.5], is drawn with its mirror image (the other side of the glass),
// and a slider moves a horizontal slice up the glass: its radius is |x| and its thickness is dy,
// so the slices run between the heights of the arc's two ends, y = f(−0.5) = −33/4 at the bottom
// and y = f(−3) = 14/3 at the top. f is decreasing on [−3, −0.5] (f′ < 0 there), so each height
// meets the arc exactly once and x(y) is found by bisection. A toggle shades what ∫ from −3 to −0.5
// dy would actually cover — just the band of the glass between heights −3 and −0.5 — the error of
// using the given x-values as terminals. 66% of students scored zero (report: decimal b, and b/c
// swapped, which is only right with a = −π).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle } from './kit'

const f = (x: number) => 4 / x + x + x * x
const B = 14 / 3 // f(−3), the top
const CC = -33 / 4 // f(−0.5), the bottom
/** The x on the arc at height y (f is decreasing on [−3, −0.5]). */
function xOf(y: number) {
  let lo = -3
  let hi = -0.5
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (f(mid) > y) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

function band(y1: number, y2: number): [number, number][] {
  const pts: [number, number][] = []
  const n = 40
  for (let i = 0; i <= n; i++) {
    const y = y1 + ((y2 - y1) * i) / n
    pts.push([xOf(y), y])
  }
  for (let i = n; i >= 0; i--) {
    const y = y1 + ((y2 - y1) * i) / n
    pts.push([-xOf(y), y])
  }
  return pts
}
const GLASS = band(CC, B)
const WRONG = band(-3, -0.5)

export default function Terminals() {
  const [y, setY] = useState(-4)
  const [wrong, setWrong] = useState(false)
  const x = xOf(y)
  const atTop = Math.abs(y - B) < 0.06
  const atBottom = Math.abs(y - CC) < 0.06

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Terminals <M>-3</M> and <M>-0.5</M> belong on <M>x</M>, but this integral is in <M>dy</M>, so they would be read as
        heights: the red band, only the slices between <M>y=-3</M> and <M>y=-0.5</M>. The whole glass runs from{' '}
        <M>{'y=-\\tfrac{33}{4}'}</M> up to <M>{'y=\\tfrac{14}{3}'}</M>. Turn this off and slide to each end.
      </Notice>
    )
  } else if (atTop) {
    notice = (
      <Notice tone="good">
        <b>Top of the glass:</b> the arc ends at <M>x=-3</M>, height <M>{'f(-3)=\\tfrac{14}{3}'}</M>. That is the upper
        terminal <M>b</M>, kept exact. Now press <b>Bottom end</b>.
      </Notice>
    )
  } else if (atBottom) {
    notice = (
      <Notice tone="good">
        <b>Bottom of the glass:</b> the arc ends at <M>x=-0.5</M>, height <M>{'f(-0.5)=-\\tfrac{33}{4}'}</M>. That is the
        lower terminal <M>c</M>. Lower terminal at the bottom, upper at the top, so <M>{'a=\\pi'}</M> with no sign change.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each horizontal slice is a disc of radius <M>|x|</M> and thickness <M>dy</M>, so its volume is{' '}
        <M>{'\\pi x^2\\,dy'}</M>. Adding the slices means letting <M>y</M> run from the bottom of the glass to the top.
        Press <b>Top end</b> to find where it stops.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.5, 3.5]} y={[-9, 6]} xStep={1} yStep={1} height={360} xLabels={v => (Math.abs(v) > 3.5 ? '' : String(v))} yLabels={v => (Math.round(v) % 2 === 0 ? String(v) : '')}>
        <Polygon points={GLASS} color={C.f} fillOpacity={0.1} strokeOpacity={0} />
        {wrong && <Polygon points={WRONG} color={C.bad} fillOpacity={0.35} strokeOpacity={0} />}
        <Plot.Parametric xy={t => [-t, f(t)]} domain={[-3, -0.5]} color={C.f} weight={1.5} style="dashed" />
        <Plot.Parametric xy={t => [t, f(t)]} domain={[-3, -0.5]} color={C.f} weight={3} />
        <Line.Segment point1={[-3, B]} point2={[0, B]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[-0.5, CC]} point2={[0, CC]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[0, B]} attach="ne" color={C.good}>y = b = 14/3</Label>
        <Label at={[0, CC]} attach="se" color={C.good}>y = c = −33/4</Label>
        <Point x={-3} y={B} color={C.good} />
        <Point x={-0.5} y={CC} color={C.good} />
        <Label at={[-3, B]} attach="n" color={C.ink}>x = −3</Label>
        <Label at={[-0.5, CC]} attach="w" color={C.ink}>x = −0.5</Label>
        {/* the slice at height y: the full disc diameter, with the radius |x| in orange */}
        <Line.Segment point1={[x, y]} point2={[-x, y]} color={C.g} style="dashed" weight={1.5} />
        <Line.Segment point1={[x, y]} point2={[0, y]} color={C.g} weight={5} />
        <Point x={x} y={y} color={C.g} />
        <Label at={[x / 2, y]} attach="n" color={C.g}>r = |x|</Label>
      </Plane>
      <Controls>
        <Slider label="y" value={y} onChange={setY} min={CC} max={B} step={0.01} />
        <Buttons>
          <ActionButton label="Top end" onClick={() => setY(B)} />
          <ActionButton label="Bottom end" onClick={() => setY(CC)} />
        </Buttons>
        <Toggle label="Use −3 and −0.5 as the terminals" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={`y \\approx ${y.toFixed(2)}`} />
          <Readout color={C.g} tex={`x \\approx ${x.toFixed(2)},\\ r = |x| \\approx ${Math.abs(x).toFixed(2)}`} />
          <Readout tex={`\\text{slice area } \\pi x^2 \\approx ${(Math.PI * x * x).toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
