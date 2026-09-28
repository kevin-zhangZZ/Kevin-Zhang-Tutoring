// 2020 Methods Exam 2 Q2c — where the swimmer lands decides how far they swim. Drag the landing
// point Q along the north bank f₁(x) = 20cos(πx/100) + 40 and watch the length of PQ from P(50, 30).
// The dashed circle centred at P through Q cuts the bank whenever part of the bank is closer to P
// than Q is; at the closest point it only just touches the bank, and PQ meets the bank at right
// angles (x ≈ 54.477, PQ ≈ 8.475, checked with scipy). The small graph of d(x) underneath is the
// function fMin minimises, so its lowest point is the same landing point. Buttons jump to the swims
// of part a (due north, 10 m) and part b (due east, 50/3 m) for comparison.
//
// Drawn to scale (equal axes) so the right angle looks like one. The view is zoomed in near P, so
// neither axis is on screen: the tick numbers are drawn along the edges instead.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Polyline, Readout,
  Readouts, Region, num, type vec,
} from './kit'

const f1 = (x: number) => 20 * Math.cos((Math.PI * x) / 100) + 40
const f2 = (x: number) => f1(x) - 10
const df1 = (x: number) => -(Math.PI / 5) * Math.sin((Math.PI * x) / 100)
const PX = 50
const PY = 30
const dist = (x: number) => Math.hypot(x - PX, f1(x) - PY)
// The minimum of d(x) = √((x − 50)² + (f₁(x) − 30)²), from scipy: x = 54.476935…, d = 8.475259…
const X_MIN = 54.4769350527
const X_EAST = 200 / 3
// Where Q may go, and the view around it.
const QLO = 44
const QHI = 68
const XL = 36
const XR = 72
const YB = 16
const YT = 48

// Snap the dragged point to the nearest point of the bank (by distance, not by x alone, since the
// bank is fairly steep here), then onto the three landmark swims when close.
const SAMPLES = Array.from({ length: 961 }, (_, i) => QLO + ((QHI - QLO) * i) / 960)
function nearestOnBank([mx, my]: vec.Vector2): number {
  let best = QLO
  let bestD = Infinity
  for (const x of SAMPLES) {
    const dd = (x - mx) ** 2 + (f1(x) - my) ** 2
    if (dd < bestD) {
      bestD = dd
      best = x
    }
  }
  for (const s of [X_MIN, PX, X_EAST]) if (Math.abs(best - s) < 0.35) return s
  return best
}

// Tick numbers along the bottom and left edges (the axes themselves are off screen).
function EdgeTicks({ xs, ys, x0, y0 }: { xs: number[]; ys: number[]; x0: number; y0: number }) {
  return (
    <>
      {xs.map(v => (
        <Label key={`x${v}`} at={[v, y0]} attach="s" size={11} gap={4} bold={false}>
          {v}
        </Label>
      ))}
      {ys.map(v => (
        <Label key={`y${v}`} at={[x0, v]} attach="w" size={11} gap={4} bold={false}>
          {v}
        </Label>
      ))}
    </>
  )
}

export default function ShortestSwim() {
  const [x, setX] = useState(PX)
  const q: vec.Vector2 = [x, f1(x)]
  const d = dist(x)
  const atMin = x === X_MIN
  const atNorth = x === PX
  const atEast = x === X_EAST

  // Unit vectors: along the bank at Q, and from Q back towards P.
  const tl = Math.hypot(1, df1(x))
  const t: vec.Vector2 = [1 / tl, df1(x) / tl]
  const u: vec.Vector2 = [(PX - x) / d, (PY - q[1]) / d]
  const angle = (Math.acos(Math.min(1, Math.abs(t[0] * u[0] + t[1] * u[1]))) * 180) / Math.PI
  const s = 1.3
  const square: vec.Vector2[] = [
    [x + s * u[0], q[1] + s * u[1]],
    [x + s * u[0] + s * t[0], q[1] + s * u[1] + s * t[1]],
    [x + s * t[0], q[1] + s * t[1]],
  ]
  const segColor = atMin ? C.good : C.violet

  let notice
  if (atMin) {
    notice = (
      <Notice tone="good">
        <b>This is the shortest swim.</b> The dashed circle centred at P now only <i>touches</i> the bank at Q: every
        other point of the bank is outside it, so every other landing point is further from P. And PQ meets the bank
        at <M>90^\circ</M>, just as a circle&apos;s radius meets a line that touches it. This is the lowest point of the
        graph of <M>d(x)</M> above, the <M>x \approx 54.48</M> that fMin finds, and <M>PQ \approx 8.475</M>, so{' '}
        <M>8.5</M> m.
      </Notice>
    )
  } else if (atNorth) {
    notice = (
      <Notice>
        <b>Due north (part a):</b> <M>Q = (50, 40)</M> and <M>PQ = 40 - 30 = 10</M>. But look at the circle: just to
        the right of Q the bank dips <i>inside</i> it, so there are landing points closer than 10 m. The bank slopes
        down to the east, so this swim meets it at only about <M>{`${num(angle, 0)}^\\circ`}</M>, not square-on. Drag Q
        a little to the right.
      </Notice>
    )
  } else if (atEast) {
    notice = (
      <Notice>
        <b>Due east (part b):</b> <M>{'Q = \\left(\\tfrac{200}{3}, 30\\right)'}</M>. P and Q are both at height 30, so
        PQ is just the change in <M>x</M>: <M>{'\\tfrac{200}{3} - 50 = \\tfrac{50}{3} \\approx 16.67'}</M> m. The
        circle swallows a long stretch of the bank, so plenty of landing points are closer. Drag Q back to the left.
      </Notice>
    )
  } else {
    const side = x < X_MIN ? 'right' : 'left'
    notice = (
      <Notice>
        The circle through Q cuts the bank, and part of the bank on the {side} of Q is <i>inside</i> it: those points
        are closer to P than Q is. PQ meets the bank at about <M>{`${num(angle, 0)}^\\circ`}</M>, not <M>90^\circ</M>.
        Drag Q to the {side}, towards the bottom of the <M>d(x)</M> graph, until the circle just touches the bank.
      </Notice>
    )
  }

  return (
    <div>
      {/* Held to a phone-like width on a wide screen, so the to-scale plane fills its box instead of
          showing extra river either side of the tick numbers. */}
      <div className="max-w-[440px] mx-auto">
      <Plane x={[XL, XR]} y={[YB, YT]} xStep={2} yStep={2} equalScale height={400} labels={false} xLabel="" yLabel="">
        <EdgeTicks xs={[40, 50, 60, 70]} ys={[20, 30, 40]} x0={XL} y0={YB} />
        <Region top={f1} bottom={f2} from={XL} to={XR} color={C.guide} opacity={0.16} />
        <Circle center={[PX, PY]} radius={d} color={C.guide} fillOpacity={0.05} weight={1.5} strokeStyle="dashed" />
        <Plot.OfX y={f1} domain={[XL, XR]} color={C.f} weight={3} />
        <Plot.OfX y={f2} domain={[XL, XR]} color={C.g} weight={3} />
        <Label at={[40, f1(40)]} color={C.f} attach="ne" gap={9}>north bank f₁</Label>
        <Label at={[66, f2(66)]} color={C.g} attach="sw" gap={9}>south bank f₂</Label>
        {/* The bank's direction at Q. */}
        <Line.Segment
          point1={[x - 6 * t[0], q[1] - 6 * t[1]]}
          point2={[x + 6 * t[0], q[1] + 6 * t[1]]}
          color={C.guide}
          style="dashed"
          weight={1.5}
        />
        <Line.Segment point1={[PX, PY]} point2={q} color={segColor} weight={3} />
        {atMin && <Polyline points={square} color={C.good} weight={1.5} fillOpacity={0} />}
        <Point x={PX} y={PY} color={C.ink} />
        <Label at={[PX, PY]} attach="sw" gap={8}>P</Label>
        <MovablePoint point={q} onMove={p => setX(nearestOnBank(p))} color={atMin ? C.good : C.f} />
        <Label at={q} attach={x < 60 ? 'ne' : 'n'} gap={14} color={atMin ? C.good : C.f}>Q</Label>
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        To scale, zoomed in near P. Drag the point Q along the north bank.
      </p>
      <div className="mt-3">
        <Plane x={[QLO, QHI]} y={[-3, 20]} xStep={2} yStep={5} height={160} labels={false} xLabel="" yLabel="">
          <EdgeTicks xs={[44, 50, 56, 62, 68]} ys={[5, 10, 15, 20]} x0={QLO} y0={0} />
          <Plot.OfX y={dist} domain={[QLO, QHI]} color={C.violet} weight={2.5} />
          <Line.Segment point1={[X_MIN, 0]} point2={[X_MIN, dist(X_MIN)]} color={C.good} style="dashed" weight={1.5} />
          <Point x={X_MIN} y={dist(X_MIN)} color={C.good} />
          <Line.Segment point1={[x, 0]} point2={[x, d]} color={segColor} weight={1.5} />
          <Point x={x} y={d} color={segColor} />
          <Label at={[45, 18.5]} attach="e" color={C.violet} size={12}>PQ = d(x)</Label>
        </Plane>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
          The length of PQ against the <i>x</i>-coordinate of Q. Its lowest point is what fMin finds.
        </p>
      </div>
      </div>
      <Controls>
        <Buttons>
          <ActionButton label="Due north (part a)" onClick={() => setX(PX)} />
          <ActionButton label="Due east (part b)" onClick={() => setX(X_EAST)} />
          <ActionButton label="Shortest (part c)" onClick={() => setX(X_MIN)} />
        </Buttons>
        <Readouts>
          <Readout color={atMin ? C.good : C.f} tex={`Q \\approx (${num(x, 2)},\\ ${num(q[1], 2)})`} />
          <Readout color={segColor} tex={`PQ \\approx ${num(d, 3)}`} />
          <Readout tex={`\\text{angle with the bank} \\approx ${num(angle, 1)}^\\circ`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
