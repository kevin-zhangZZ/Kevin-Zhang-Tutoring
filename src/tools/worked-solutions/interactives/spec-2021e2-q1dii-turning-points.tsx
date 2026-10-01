// 2021 Specialist Exam 2 Q1d.ii — why the boundaries are k = −5 and k = 3/2. Drag k and watch the
// stationary points of g_k(x) = (2x − 3)(x + 5)/((x − k)(x + 2)): they are the solutions of
// −(2k + 3)x² + (30 − 8k)x + (30 − 29k) = 0, whose discriminant is Δ = −84(k + 5)(2k − 3) (sympy).
// For −5 < k < 3/2 there are turning points (one only at k = −3/2, where the x² term vanishes);
// as k approaches 3/2 (or −5) the two squeeze together onto the hole that appears at x = 3/2 (or
// x = −5), and for k > 3/2 or k < −5 there are none. The three k values of d.i are ruled out.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num, tick } from './kit'

const X0 = -9
const X1 = 7
const Y0 = -6
const Y1 = 14
const EPS = 1e-6
const xTicks = (v: number) => (v < X0 || v > X1 || Math.round(v) % 2 !== 0 ? '' : tick(v))
const yTicks = (v: number) => (v < Y0 || v > Y1 ? '' : tick(v))
const is = (k: number, v: number) => Math.abs(k - v) < EPS

/** Which side of a vertical asymptote is clear at the top of the plane: the side where g → −∞. */
const clearSide = (g: (x: number) => number, p: number) => (g(p + 1e-4) < 0 ? 'e' : 'w')

function gOf(k: number): (x: number) => number {
  if (is(k, 1.5)) return x => (2 * (x + 5)) / (x + 2)
  if (is(k, -5)) return x => (2 * x - 3) / (x + 2)
  return x => ((2 * x - 3) * (x + 5)) / ((x - k) * (x + 2))
}

function poles(k: number): number[] {
  if (is(k, 1.5) || is(k, -5) || is(k, -2)) return [-2]
  return [-2, k].sort((a, b) => a - b)
}

/** Real solutions of g_k'(x) = 0 that are in the domain (x ≠ k, x ≠ −2). */
function stationary(k: number): number[] {
  const a = -(2 * k + 3)
  const b = 30 - 8 * k
  const c = 30 - 29 * k
  let roots: number[]
  if (Math.abs(a) < EPS) roots = [-c / b]
  else {
    const d = b * b - 4 * a * c
    if (d < -EPS) roots = []
    else if (Math.abs(d) <= EPS) roots = [-b / (2 * a)]
    else roots = [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)].sort((p, q) => p - q)
  }
  return roots.filter(x => Math.abs(x - k) > 1e-4 && Math.abs(x + 2) > 1e-4)
}

function edge(a: number, b: number, inside: (x: number) => boolean) {
  const ia = inside(a)
  for (let j = 0; j < 40; j++) {
    const m = (a + b) / 2
    if (inside(m) === ia) a = m
    else b = m
  }
  return (a + b) / 2
}

function pieces(lo: number, hi: number, inside: (x: number) => boolean, n = 600): [number, number][] {
  const out: [number, number][] = []
  let start: number | null = null
  let prev = lo
  for (let i = 0; i <= n; i++) {
    const x = lo + ((hi - lo) * i) / n
    const ok = inside(x)
    if (ok && start === null) start = i === 0 ? x : edge(prev, x, inside)
    if (!ok && start !== null) {
      out.push([start, edge(prev, x, inside)])
      start = null
    }
    prev = x
  }
  if (start !== null) out.push([start, hi])
  return out
}

function branches(g: (x: number) => number, ps: number[]): [number, number][] {
  const cuts = [X0, ...ps.filter(p => p > X0 && p < X1), X1]
  const out: [number, number][] = []
  for (let i = 0; i + 1 < cuts.length; i++) {
    const lo = i === 0 ? cuts[i] : cuts[i] + 1e-9
    const hi = i + 2 === cuts.length ? cuts[i + 1] : cuts[i + 1] - 1e-9
    out.push(...pieces(lo, hi, x => g(x) > Y0 - 3 && g(x) < Y1 + 3))
  }
  return out
}

function Hole({ x, y }: { x: number; y: number }) {
  return <Point x={x} y={y} color={C.f} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: C.f, strokeWidth: 2.5 } }} />
}

export default function TurningPoints() {
  const [k, setK] = useState(1)
  const g = gOf(k)
  const ps = poles(k)
  const delta = -84 * (k + 5) * (2 * k - 3)
  const sp = stationary(k).map(x => ({ x, y: g(x) }))
  const visible = (p: { x: number; y: number }) => p.x > X0 && p.x < X1 && p.y > Y0 && p.y < Y1
  const excluded = is(k, 1.5) || is(k, -5) || is(k, -2)
  const fmt = (v: number) => (is(v, 1.5) ? '3/2' : v.toFixed(2))

  let notice
  if (is(k, 1.5) || is(k, -5)) {
    const z = is(k, 1.5) ? '\\tfrac32' : '-5'
    notice = (
      <Notice tone="warn">
        <b>Here <M>\Delta = 0</M>, and the double root is <M>{`x = ${z}`}</M>: exactly where the hole is.</b> The two
        turning points have squeezed together and vanished into the hole. But <M>{`k = ${z}`}</M> leaves only two
        asymptotes (part d.i), so the question rules it out: the boundary itself is excluded.
      </Notice>
    )
  } else if (is(k, -2)) {
    notice = (
      <Notice tone="warn">
        <b><M>k = -2</M> is ruled out</b>: it leaves only two asymptotes (part d.i). It isn&apos;t an answer here anyway:{' '}
        <M>{'\\Delta > 0'}</M>, and one stationary point survives far to the left, at <M>x = -44</M>.
      </Notice>
    )
  } else if (delta < 0) {
    notice = (
      <Notice tone="good">
        <b><M>{'\\Delta < 0'}</M>, so <M>{"g_k'(x)"}</M> is never zero: no stationary points.</b> Every branch just
        rises or falls. This holds for every <M>{'k > \\tfrac32'}</M> and every <M>{'k < -5'}</M>, because{' '}
        <M>{'-84(k+5)(2k-3) < 0'}</M> exactly outside the roots <M>-5</M> and <M>{'\\tfrac32'}</M>. Drag back towards
        a boundary and watch the turning points come back.
      </Notice>
    )
  } else if (is(k, -1.5)) {
    notice = (
      <Notice>
        At <M>{'k = -\\tfrac32'}</M> the <M>x^2</M> term vanishes, so <M>{"g_k'(x) = 0"}</M> is linear: one stationary point,
        at <M>x = -1.75</M> (far above the screen). It is still a stationary point, so this <M>k</M> is not an answer.
      </Notice>
    )
  } else if (k > 0.5 || k < -4) {
    const z = k > 0.5 ? '\\tfrac32' : '-5'
    notice = (
      <Notice>
        <M>{'\\Delta > 0'}</M>, so there are two turning points (orange). Drag <M>k</M> slowly towards <M>{z}</M>: they
        close in on <M>{`x = ${z}`}</M> from both sides, the zero of the numerator where the hole will appear.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'\\Delta > 0'}</M> for every <M>k</M> between <M>-5</M> and <M>{'\\tfrac32'}</M>, so the graph has stationary
        points, though here they may be off the screen (see the readout). Drag <M>k</M> towards <M>{'\\tfrac32'}</M>{' '}
        and watch them come into view and squeeze together.
      </Notice>
    )
  }

  const spTex =
    sp.length === 0
      ? '\\text{stationary points: none}'
      : `\\text{stationary points: } ${sp
          .map(p => `(${num(p.x)},\\ ${num(p.y)})${visible(p) ? '' : '^{\\ast}'}`)
          .join(',\\ ')}`

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={1} yStep={2} height={340} xLabels={xTicks} yLabels={yTicks}>
        <Line.Segment point1={[X0, 2]} point2={[X1, 2]} color={C.bad} style="dashed" weight={1.5} />
        <Line.Segment point1={[-2, Y0]} point2={[-2, Y1]} color={C.bad} style="dashed" weight={1.5} />
        <Label at={[-2, Y1 - 0.8]} color={C.bad} attach={clearSide(g, -2)} size={12}>x = −2</Label>
        {!excluded && (
          <>
            <Line.Segment point1={[k, Y0]} point2={[k, Y1]} color={C.violet} style="dashed" weight={2} />
            <Label at={[k, Y1 - 0.8]} color={C.violet} attach={clearSide(g, k)} size={12}>x = k</Label>
          </>
        )}
        {branches(g, ps).map(([a, b], i) => (
          <Plot.OfX key={`${i}-${a.toFixed(4)}`} y={g} domain={[a, b]} color={C.f} weight={3} />
        ))}
        {is(k, 1.5) && <Hole x={1.5} y={26 / 7} />}
        {is(k, -5) && <Hole x={-5} y={13 / 3} />}
        {sp.filter(visible).map(p => (
          <Point key={p.x} x={p.x} y={p.y} color={C.g} />
        ))}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={-7} max={3} step={0.05} format={fmt} />
        <Buttons>
          <ActionButton label="k = 1 (the original f)" onClick={() => setK(1)} />
          <ActionButton label="k = 1.4" onClick={() => setK(1.4)} />
          <ActionButton label="k = 2" onClick={() => setK(2)} />
          <ActionButton label="k = −4.8" onClick={() => setK(-4.8)} />
        </Buttons>
        <Readouts>
          <Readout color={delta < -EPS ? C.good : undefined} tex={`\\Delta = -84(k+5)(2k-3) = ${num(delta, 2).replace(/\.?0+$/, '')}`} />
          <Readout color={C.g} tex={spTex} />
        </Readouts>
        {sp.some(p => !visible(p)) && (
          <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
            <M>{'^{\\ast}'}</M> off the screen.
          </p>
        )}
        {notice}
      </Controls>
    </div>
  )
}
