// 2020 Methods Exam 1 Q8d.i — slide g(x) = x·log_e(x) + k up and down against the line y = 2x.
// Lifting the curve never changes its gradient, so the one place it is as steep as the line stays
// at x = e (g′(e) = log_e(e) + 1 = 2): the dashed tangent there is always parallel to y = 2x, just
// e − k below it. The line cuts the curve once (k < 3/e), twice (3/e < k < e), touches it at
// (e, 2e) when k = e, and misses it for k > e. Separates the two conditions of a tangent — same
// gradient (finds x = e, the report's common wrong answer) and same point (finds k = e).
// Crossings solve x·log_e(x) − 2x = −k by bisection (checked with scipy: k = 1.5 → 0.596, 5.672).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
} from './kit'

const A = 1 / Math.E
const E = Math.E
const THREE_E = 3 / Math.E
const TOL = 0.015
const XR = 6.5
const YT = 13
const Y_TOP_LABEL = 13.4

const u = (x: number) => x * Math.log(x) - 2 * x // g(x) = 2x  ⇔  u(x) = −k

function bisect(fn: (x: number) => number, lo: number, hi: number): number {
  let a = lo
  let b = hi
  const fa = fn(a)
  for (let i = 0; i < 70; i++) {
    const m = (a + b) / 2
    if (Math.sign(fn(m)) === Math.sign(fa)) a = m
    else b = m
  }
  return (a + b) / 2
}

/** Where g meets y = 2x: u falls from −3/e to −e on (1/e, e), then rises for ever. */
function crossings(k: number): number[] {
  if (Math.abs(k - E) < TOL) return [E]
  if (k > E) return []
  const out: number[] = []
  if (k > THREE_E) out.push(bisect(x => u(x) + k, A, E))
  out.push(bisect(x => u(x) + k, E, 100))
  return out
}

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

const fmt = (v: number) => v.toFixed(2).replace('-', '−')

export default function TangentWidget() {
  const [k, setK] = useState(1.5)
  const touching = Math.abs(k - E) < TOL
  // Within a hair of e the slider snaps to e itself, so the picture shows exact tangency.
  const kk = touching ? E : k
  const g = (x: number) => x * Math.log(x) + kk
  // Where g reaches the height of its label (g is increasing on its domain).
  const xTop = bisect(x => g(x) - Y_TOP_LABEL, A, 20)
  const pts = crossings(kk)
  const onScreen = pts.filter(x => x < XR)
  const lineColor = touching ? C.good : C.bad
  const gap = E - kk

  let notice
  if (touching) {
    notice = (
      <Notice tone="good">
        <b><M>k = e \approx 2.72</M>: the tangent at <M>x = e</M> is <M>y = 2x</M> itself.</b> Both conditions for a
        tangent hold: the same gradient (<M>g&apos;(e) = 2</M>, true for <i>every</i> <M>k</M>) and the same point (
        <M>g(e) = e + k = 2e</M>, true <i>only</i> for <M>k = e</M>). The gradient told you <i>where</i> the line
        touches (<M>x = e</M>); the shared point told you <i>how far to lift</i> (<M>k = e</M>). The question asks for{' '}
        <M>k</M>.
      </Notice>
    )
  } else if (k > E) {
    notice = (
      <Notice>
        Too far. The whole curve is now above <M>y = 2x</M>: even at <M>x = e</M>, the closest place, it is{' '}
        <M>k - e \approx {fmt(k - E)}</M> above the line, so the line misses it altogether. Only one value of{' '}
        <M>k</M> makes the line a tangent. Press &ldquo;Set k = e&rdquo;.
      </Notice>
    )
  } else if (pts.length === 2) {
    notice = (
      <Notice>
        The red line <b>cuts</b> the curve twice, at <M>x \approx {fmt(pts[0])}</M> and{' '}
        <M>x \approx {fmt(pts[1])}</M>. That is a chord, not a tangent. As you lift the curve the two crossings close in
        on <M>x = e</M>, the one place where the curve is exactly as steep as the line. The dashed tangent there is
        still <M>e - k \approx {fmt(gap)}</M> below <M>y = 2x</M>. Keep lifting.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The red line <b>cuts</b> the curve at <M>x \approx {fmt(pts[0])}</M>
        {pts[0] > XR ? ' (off to the right)' : ''}, so it is not a tangent. A tangent has the curve&apos;s gradient where
        it touches, so look for where <M>g&apos;(x) = \log_e(x) + 1 = 2</M>: at <M>x = e</M> (dashed). Moving the
        curve up or down never changes its steepness, so that dashed tangent always has gradient 2. It is parallel to{' '}
        <M>y = 2x</M> but <M>e - k \approx {fmt(gap)}</M> below it. Drag <M>k</M> up.
      </Notice>
    )
  }

  return (
    <div>
      {/* y numbers 2 to 12 only: 14 sat on the axis name and −2 was cut off at the bottom. */}
      <Plane x={[0, XR]} y={[-1, YT]} xStep={1} yStep={2} height={320} yLabels={v => (v >= 2 && v <= 12 ? String(v) : '')}>
        <Line.Segment point1={[E, 0]} point2={[E, E + kk]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[E, 0]} color={C.guide} attach="ne" size={12}>x = e</Label>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 2]} color={lineColor} weight={2.5} />
        {/* Each label goes on the side of its line away from the other curve. */}
        <Label at={[4.5, 9]} color={lineColor} attach={g(4.5) > 9 ? 'se' : 'nw'} size={12}>y = 2x</Label>
        {/* The tangent at x = e: gradient 2 for every k. */}
        {!touching && (
          <Line.Segment point1={[E - 2, E + kk - 4]} point2={[E + 2, E + kk + 4]} color={C.f} style="dashed" weight={1.5} />
        )}
        <Plot.OfX y={g} domain={[A + 1e-6, XR]} color={C.f} weight={3} />
        <OpenPoint x={A} y={kk - A} color={C.f} />
        {/* g is labelled near the top, on the side away from the line (the dashed tangent keeps
            to the middle of the plane, below the curve). */}
        <Label at={[xTop, Y_TOP_LABEL]} color={C.f} attach={xTop < Y_TOP_LABEL / 2 ? 'w' : 'e'}>g</Label>
        {/* The gap at x = e between the tangent point and the line. */}
        {!touching && <Line.Segment point1={[E, E + kk]} point2={[E, 2 * E]} color={C.g} weight={3} />}
        <Point x={E} y={E + kk} color={touching ? C.good : C.f} />
        {!touching && <Point x={E} y={2 * E} color={C.bad} />}
        {!touching && onScreen.map(x => <Point key={x} x={x} y={2 * x} color={C.bad} />)}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0} max={4} step={0.01} />
        <Buttons>
          <ActionButton label="Set k = e" onClick={() => setK(E)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`g'(e) = \\log_e(e) + 1 = 2`} />
          <Readout color={touching ? C.good : C.g} tex={`g(e) = e + k \\approx ${fmt(E + kk)}`} />
          <Readout color={lineColor} tex={`2e \\approx ${fmt(2 * E)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
