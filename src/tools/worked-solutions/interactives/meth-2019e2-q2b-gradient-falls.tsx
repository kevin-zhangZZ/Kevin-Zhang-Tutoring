// 2019 Methods Exam 2 Q2b — "the gradient of the hill is strictly decreasing" is about the
// gradient, not the hill. Walk a tangent along y = 3x(x − 30)²/2000 while the lower graph plots
// its gradient dy/dx = 9(x − 30)(x − 10)/2000. The gradient falls from x = 0 all the way to its
// lowest value at x = 20 (the steepest point of the descent), then rises back to 0, even though the
// hill itself is still going down. A toggle shades the common wrong answer [10, 30] (where the hill
// is decreasing, i.e. dy/dx < 0) so students can see it is a different set.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider, Toggle, tick,
  usePlayer,
} from './kit'

const y = (x: number) => (3 * x * (x - 30) ** 2) / 2000
const yp = (x: number) => (9 * (x - 30) * (x - 10)) / 2000
const ypp = (x: number) => (9 * (x - 20)) / 1000

/** A tangent segment through (x0, y0) with gradient m, about the same on-screen length at any
 *  slope, trimmed so it stays inside x ∈ [xmin, xmax], y ≥ ymin. */
function tangentSeg(x0: number, y0: number, m: number, xmin: number, xmax: number, ymin: number): [[number, number], [number, number]] {
  const half = 3.2 / Math.sqrt(1 + (1.3 * m) ** 2)
  const end = (s: 1 | -1): [number, number] => {
    let t = half
    if (x0 + s * t > xmax) t = xmax - x0
    if (x0 + s * t < xmin) t = x0 - xmin
    const yEnd = y0 + s * m * t
    if (yEnd < ymin && Math.abs(m) > 1e-9) t = (y0 - ymin) / Math.abs(m)
    return [x0 + s * t, y0 + s * m * t]
  }
  return [end(-1), end(1)]
}

export default function GradientFalls() {
  const [x0, setX0] = useState(15)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setX0, { min: 0, max: 30, seconds: 9 })

  const m = yp(x0)
  const falling = ypp(x0) < 0
  const atVertex = Math.abs(x0 - 20) < 0.35
  const [p1, p2] = tangentSeg(x0, y(x0), m, 0, 30, -0.4)
  const gradColor = falling ? C.good : C.g

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red shading is <M>[10, 30]</M>, the most common answer: where the <b>hill</b> goes down, i.e. where{' '}
        <M>{'\\tfrac{dy}{dx} \\le 0'}</M>. But look at the lower graph on <M>(20, 30]</M>: the gradient is negative there,
        yet it is <b>rising</b> from <M>{'-\\tfrac{9}{20}'}</M> back up to <M>0</M>. A negative gradient is not the same
        as a decreasing gradient. Drag across <M>x = 20</M> and watch the gradient readout turn from green (falling) to orange (rising).
      </Notice>
    )
  } else if (atVertex) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 20</M> the tangent is at its steepest</b>, with <M>{'\\tfrac{dy}{dx} = -\\tfrac{9}{20}'}</M>. That is
        the lowest point of the gradient graph (the vertex of the parabola, halfway between its roots <M>10</M> and{' '}
        <M>30</M>). So the gradient falls on the whole stretch from <M>0</M> up to and including <M>20</M>, and rises
        after it.
      </Notice>
    )
  } else if (x0 < 10) {
    notice = (
      <Notice>
        Here the <b>hill is going up</b>, but read the <M>{'\\tfrac{dy}{dx}'}</M> readout as you move right: it is shrinking. The climb is
        easing off, so the <b>gradient is decreasing</b> even though the hill is increasing. That is why the answer
        starts at <M>0</M>, not at the peak <M>x = 10</M>.
      </Notice>
    )
  } else if (x0 < 20) {
    notice = (
      <Notice>
        Past the peak the hill goes down and the gradient is negative, and it is <b>still falling</b>: each step right,
        the descent gets steeper. The green curve below keeps heading down until <M>x = 20</M>. Press play or drag on
        past <M>20</M> to see what changes.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The hill is still going down, but the descent is <b>easing</b>: the tangent is flattening out and the gradient is
        climbing back from <M>{'-\\tfrac{9}{20}'}</M> towards <M>0</M>. So here the gradient is <b>increasing</b>. Turn on
        the toggle to see why the popular answer <M>[10, 30]</M> gets this stretch wrong.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 30]} y={[-0.4, 8]} xStep={5} yStep={2} height={210}>
        {wrong && <Region top={y} bottom={() => 0} from={10} to={30} color={C.bad} opacity={0.2} />}
        <Line.Segment point1={[20, -0.4]} point2={[20, 8]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={y} domain={[0, 30]} color={C.f} weight={3} />
        <Line.Segment point1={p1} point2={p2} color={C.g} weight={3} />
        <Point x={x0} y={y(x0)} color={C.g} />
        <Label at={[6, y(6)]} color={C.f} attach="se">hill</Label>
        {wrong && <Label at={[21, y(21)]} color={C.bad} attach="ne">hill decreasing</Label>}
      </Plane>
      <div className="mt-3" />
      <Plane x={[0, 30]} y={[-0.6, 1.6]} xStep={5} yStep={0.5} height={200} yLabel="" yLabels={v => (v > 1.4 ? "" : tick(v))}>
        {wrong && <Region top={() => 0} bottom={yp} from={10} to={30} color={C.bad} opacity={0.2} />}
        <Line.Segment point1={[20, -0.6]} point2={[20, 1.4]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={yp} domain={[0, 20]} color={C.good} weight={4} />
        <Plot.OfX y={yp} domain={[20, 30]} color={C.g} weight={3} />
        <Point x={x0} y={m} color={gradColor} />
        <Label at={[20, 1.1]} color={C.guide} attach="e">x = 20</Label>
        <Label at={[0.3, 1.55]} attach="e" italic>dy/dx</Label>
        <Label at={[4, yp(4)]} color={C.good} attach="ne">gradient falling</Label>
        {wrong && <Label at={[26, 0]} color={C.bad} attach="n">dy/dx ≤ 0</Label>}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={0}
          max={30}
          step={0.1}
          format={v => v.toFixed(1)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Walk the hill" />
          <Toggle label="Show where the hill is decreasing" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`y = ${y(x0).toFixed(2)}`} />
          <Readout color={gradColor} tex={`\\dfrac{dy}{dx} = ${m.toFixed(3)}`} />
          <Readout
            color={gradColor}
            tex={`\\dfrac{d^2y}{dx^2} = ${ypp(x0).toFixed(3)}\\ \\Rightarrow\\ \\text{gradient ${atVertex ? 'at its lowest' : falling ? 'falling' : 'rising'}}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
