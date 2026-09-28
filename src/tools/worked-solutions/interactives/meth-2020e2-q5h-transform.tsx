// 2020 Methods Exam 2 Q5h — apply T: (x, y) → (mx + h, ny + k) to p(x) = x³ + wx (shown with
// w = −1, part a.'s f; any w behaves the same) and watch the tangents at x = t and x = −t. The
// image is y = n·p((x − h)/m) + k, with gradient (n/m)·p′((x − h)/m). Dilations and reflections
// (m, n) multiply every gradient by the same n/m, and a vertical translation k changes no gradient,
// so with h = 0 the tangents at ±t stay parallel — even when k ≠ 0 makes the image no longer odd:
// what survives is the half-turn symmetry about (0, k), a point still on the y-axis. A horizontal
// translation h moves the centre to (h, k); the tangent at t then pairs with the one at 2h − t
// (hollow point), and the gradients at ±t differ by (n/m³)·12ht. So h = 0; m, n, k are free.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num,
} from './kit'

const W = -1
const p = (x: number) => x ** 3 + W * x
const dp = (x: number) => 3 * x * x + W
const X: [number, number] = [-3, 3]
const Y: [number, number] = [-3, 3]
const intTicks = (v: number) => (Number.isInteger(v) ? String(v) : '')
/** m and n are non-zero: keep the sliders out of (−0.25, 0.25). */
const nonZero = (v: number) => (Math.abs(v) < 0.25 ? (v < 0 ? -0.25 : 0.25) : round2(v))
/** Slider values to 2 dp, so h = 0 is exactly 0. */
const round2 = (v: number) => Math.round(v * 100) / 100

export default function Transform() {
  const [m, setM] = useState(1)
  const [n, setN] = useState(1)
  const [h, setH] = useState(0)
  const [k, setK] = useState(0)
  const [t, setT] = useState(0.8)

  const Yf = (x: number) => n * p((x - h) / m) + k
  const dY = (x: number) => (n / m) * dp((x - h) / m)
  const g1 = dY(t)
  const g2 = dY(-t)
  const parallel = Math.abs(g1 - g2) < 1e-9
  const shifted = Math.abs(h) > 1e-9
  const stretched = Math.abs(m - 1) > 1e-9 || Math.abs(n - 1) > 1e-9
  const lifted = Math.abs(k) > 1e-9
  const partner = 2 * h - t

  // The image's x-range inside the view, so it stops at the edge.
  const inView = (x: number) => Math.abs(Yf(x)) <= Y[1] + 0.35
  const pieces: [number, number][] = []
  let start: number | null = null
  for (let i = 0; i <= 600; i++) {
    const x = X[0] - 0.2 + ((X[1] - X[0] + 0.4) * i) / 600
    if (inView(x)) {
      if (start === null) start = x
    } else if (start !== null) {
      pieces.push([start, x])
      start = null
    }
  }
  if (start !== null) pieces.push([start, X[1] + 0.2])

  let notice
  if (shifted) {
    notice = (
      <Notice tone="warn">
        <b>Not parallel.</b> Sliding the graph sideways by <M>h</M> moves its centre of symmetry (green) to{' '}
        <M>x = h</M>. The tangent at <M>x = t</M> now pairs with the one at <M>x = 2h - t</M> (hollow point), not at{' '}
        <M>x = -t</M>, so the gradients at <M>\pm t</M> differ:{' '}
        <M>{`${num(g1, 2)}`}</M> against <M>{`${num(g2, 2)}`}</M>. Only <M>h = 0</M> keeps the pairs at <M>x = t</M> and{' '}
        <M>x = -t</M>. Put <M>h</M> back to <M>0</M>.
      </Notice>
    )
  } else if (!stretched && !lifted) {
    notice = (
      <Notice>
        This is <M>p</M> with <M>w = -1</M>. Part f. says <M>p(-x) = -p(x)</M>: spin the graph half a turn about the origin
        and it lands on itself. A half-turn carries the tangent at <M>x = t</M> onto the tangent at <M>x = -t</M>, and turns
        a line into a <i>parallel</i> line, so these two tangents are parallel for every <M>t</M>. Now try each slider:
        which ones break it?
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Still parallel.</b>{' '}
        {stretched && (
          <>
            Stretching or reflecting multiplies every gradient by the same factor <M>{'\\tfrac nm'}</M>
            {' '}(here <M>{`${num(n / m, 2)}`}</M>), so two gradients that were equal stay equal.{' '}
          </>
        )}
        {lifted && (
          <>
            Moving the graph up or down by <M>k</M> changes no gradient at all. The image is no longer odd (its centre of
            symmetry is now <M>(0, k)</M>, not the origin), but the centre is still on the <M>y</M>-axis, so the pairs are
            still at <M>x = \pm t</M>.{' '}
          </>
        )}
        So{' '}
        {stretched && lifted ? (
          <><M>m</M>, <M>n</M> and <M>k</M> need</>
        ) : stretched ? (
          <><M>m</M> and <M>n</M> need</>
        ) : (
          <><M>k</M> needs</>
        )}{' '}
        no restriction. Now try <M>h</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={X} y={Y} xStep={1} yStep={1} height={320} xLabels={intTicks} yLabels={intTicks}>
        <Plot.OfX y={p} domain={[-1.75, 1.75]} color={C.guide} weight={1.5} style="dashed" />
        {pieces.map(([lo, hi]) => (
          <Plot.OfX key={lo} y={Yf} domain={[lo, hi]} color={C.f} weight={3} />
        ))}
        <Line.PointSlope point={[t, Yf(t)]} slope={g1} color={parallel ? C.good : C.g} weight={2.5} />
        <Line.PointSlope point={[-t, Yf(-t)]} slope={g2} color={parallel ? C.good : C.violet} weight={2.5} />
        <Line.Segment point1={[t, 0]} point2={[t, Yf(t)]} color={C.guide} style="dashed" weight={1.2} />
        <Line.Segment point1={[-t, 0]} point2={[-t, Yf(-t)]} color={C.guide} style="dashed" weight={1.2} />
        {shifted && Math.abs(partner) < X[1] && (
          <Point x={partner} y={Yf(partner)} color={C.g} svgCircleProps={{ r: 6, style: { fill: 'var(--mafs-bg)', stroke: C.g, strokeWidth: 2.5 } }} />
        )}
        <Point x={t} y={Yf(t)} color={parallel ? C.good : C.g} />
        <Point x={-t} y={Yf(-t)} color={parallel ? C.good : C.violet} />
        <Point x={h} y={k} color={C.good} svgCircleProps={{ r: 4.5 }} />
        {/* Above the axis (clear of the tick numbers), beside the dashed guide when the point is above too. */}
        <Label at={[t, 0]} attach={Yf(t) > 0 ? 'ne' : 'n'} size={12}>
          t
        </Label>
        <Label at={[-t, 0]} attach={Yf(-t) > 0 ? 'nw' : 'n'} size={12}>
          −t
        </Label>
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        Dashed grey: <M>p(x) = x^3 - x</M> before the transformation. Blue: its image. Green dot: the centre of symmetry{' '}
        <M>(h, k)</M>.
      </p>
      <Controls>
        <Slider label="m" value={m} onChange={v => setM(nonZero(v))} min={-2} max={2} step={0.05} format={v => num(v, 2)} />
        <Slider label="n" value={n} onChange={v => setN(nonZero(v))} min={-2} max={2} step={0.05} format={v => num(v, 2)} />
        <Slider label="h" value={h} onChange={v => setH(round2(v))} min={-1.5} max={1.5} step={0.05} format={v => num(v, 2)} />
        <Slider label="k" value={k} onChange={v => setK(round2(v))} min={-1.5} max={1.5} step={0.05} format={v => num(v, 2)} />
        <Slider label="t" value={t} onChange={setT} min={0.2} max={1.6} step={0.01} format={v => num(v, 2)} />
        <Buttons>
          <ActionButton label="Reset" onClick={() => { setM(1); setN(1); setH(0); setK(0) }} />
          <ActionButton label="Lift it: k = 1" onClick={() => { setH(0); setK(1) }} />
          <ActionButton label="Slide it: h = 0.5" onClick={() => setH(0.5)} />
        </Buttons>
        <Readouts>
          <Readout color={parallel ? C.good : C.g} tex={`\\text{gradient at } t \\approx ${num(g1, 3)}`} />
          <Readout color={parallel ? C.good : C.violet} tex={`\\text{gradient at } {-t} \\approx ${num(g2, 3)}`} />
          <Readout color={parallel ? C.good : C.bad} tex={parallel ? '\\text{parallel}\\ \\checkmark' : '\\text{not parallel}'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
