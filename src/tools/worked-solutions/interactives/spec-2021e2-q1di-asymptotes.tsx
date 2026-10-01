// 2021 Specialist Exam 2 Q1d.i — why k = −2 is not the only answer. Drag k and watch the graph of
// g_k(x) = (2x − 3)(x + 5)/((x − k)(x + 2)) with its asymptotes. y = 2 never moves, so "two
// asymptotes" means losing a vertical one, which happens three ways: x = k lands on x = −2 (k = −2,
// a repeated factor), or x = k lands on a zero of the numerator and the factor cancels (k = 3/2:
// g = 2(x + 5)/(x + 2), hole at (3/2, 26/7); k = −5: g = (2x − 3)/(x + 2), hole at (−5, 13/3)).
// Most students found only k = −2.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, tick } from './kit'

const X0 = -8
const X1 = 6
const Y0 = -8
const Y1 = 12
const EPS = 1e-6
// Tick numbers: −5 (a zero of the numerator) and a few others, not 2, which sits beside the labelled 3/2.
const xTicks = (v: number) => ([-8, -5, -2, 4, 6].some(t => Math.abs(v - t) < 1e-9) ? tick(v) : '')
const yTicks = (v: number) => (v < Y0 || v > Y1 ? '' : tick(v))
const is = (k: number, v: number) => Math.abs(k - v) < EPS

/** Which side of a vertical asymptote is clear at the top of the plane: the side where g → −∞. */
const clearSide = (g: (x: number) => number, p: number) => (g(p + 1e-4) < 0 ? 'e' : 'w')

/** g_k, using the cancelled form at k = 3/2 and k = −5 so the hole itself never divides 0 by 0. */
function gOf(k: number): (x: number) => number {
  if (is(k, 1.5)) return x => (2 * (x + 5)) / (x + 2)
  if (is(k, -5)) return x => (2 * x - 3) / (x + 2)
  return x => ((2 * x - 3) * (x + 5)) / ((x - k) * (x + 2))
}

/** Vertical asymptotes of g_k. */
function poles(k: number): number[] {
  if (is(k, 1.5) || is(k, -5) || is(k, -2)) return [-2]
  return [-2, k].sort((a, b) => a - b)
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

/** The sub-intervals of [lo, hi] on which `inside` holds. */
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

export default function AsymptoteCount() {
  const [k, setK] = useState(1)
  const g = gOf(k)
  const ps = poles(k)
  const count = ps.length + 1
  const cancelHigh = is(k, 1.5)
  const cancelLow = is(k, -5)
  const merged = is(k, -2)
  const special = cancelHigh || cancelLow || merged

  const vaTex = merged ? 'x = -2 \\ (\\text{repeated})' : special ? 'x = -2' : `x = -2,\\ x = ${k.toFixed(2)}`

  let notice
  if (merged) {
    notice = (
      <Notice tone="good">
        <b>Two asymptotes: the two vertical asymptotes have merged.</b> With <M>k = -2</M> the denominator is{' '}
        <M>{'(x+2)^2'}</M>, so <M>x = -2</M> is the only vertical asymptote. This is the value most students found, but
        there are two more ways to lose a vertical asymptote. Press <M>{'k = \\tfrac32'}</M>.
      </Notice>
    )
  } else if (cancelHigh) {
    notice = (
      <Notice tone="good">
        <b>Two asymptotes, and this time <M>x = k</M> has vanished.</b> At <M>{'k = \\tfrac32'}</M> the bottom factor{' '}
        <M>{'\\left(x - \\tfrac32\\right)'}</M> cancels with the top factor <M>(2x - 3)</M>, leaving{' '}
        <M>{'g_k(x) = \\frac{2(x+5)}{x+2}'}</M> with a hole at <M>{'\\left(\\tfrac32, \\tfrac{26}{7}\\right)'}</M>, not an
        asymptote. The numerator has one other zero, <M>x = -5</M>: press <M>k = -5</M>.
      </Notice>
    )
  } else if (cancelLow) {
    notice = (
      <Notice tone="good">
        <b>Two asymptotes again: <M>(x + 5)</M> cancels.</b> Now <M>{'g_k(x) = \\frac{2x-3}{x+2}'}</M> with a hole at{' '}
        <M>{'\\left(-5, \\tfrac{13}{3}\\right)'}</M>. That makes three values: <M>{'k = -5,\\ -2,\\ \\tfrac32'}</M>. Nudge{' '}
        <M>k</M> either side of <M>-5</M> and the asymptote <M>x = k</M> comes straight back.
      </Notice>
    )
  } else if (Math.abs(k - 1.5) <= 0.3 || Math.abs(k + 5) <= 0.3) {
    const z = Math.abs(k - 1.5) <= 0.3 ? '\\tfrac32' : '-5'
    notice = (
      <Notice>
        The asymptote <M>x = k</M> is right next to the x-intercept <M>{`x = ${z}`}</M>, a zero of the numerator. Still
        three asymptotes. Drag <M>k</M> onto <M>{z}</M> exactly and see what happens to <M>x = k</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>Three asymptotes: <M>x = k</M>, <M>x = -2</M> and <M>y = 2</M>.</b> The horizontal one never moves (degree 2 over
        degree 2, leading coefficients 2 and 1), so to have only two asymptotes a vertical one must disappear. Drag{' '}
        <M>k</M> to find every value where that happens. There are three.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={1} yStep={2} height={340} xLabels={xTicks} yLabels={yTicks}>
        <Line.Segment point1={[X0, 2]} point2={[X1, 2]} color={C.bad} style="dashed" weight={1.5} />
        <Label at={[X0, 2]} color={C.bad} attach={cancelLow ? 'se' : 'ne'} size={12}>y = 2</Label>
        <Line.Segment point1={[-2, Y0]} point2={[-2, Y1]} color={C.bad} style="dashed" weight={1.5} />
        <Label at={[-2, Y1 - 0.8]} color={C.bad} attach={clearSide(g, -2)} size={12}>
          {merged ? 'x = −2 (twice)' : 'x = −2'}
        </Label>
        {!special && (
          <>
            <Line.Segment point1={[k, Y0]} point2={[k, Y1]} color={C.g} style="dashed" weight={2} />
            <Label at={[k, Y1 - 0.8]} color={C.g} attach={clearSide(g, k)} size={12}>x = k</Label>
          </>
        )}
        {branches(g, ps).map(([a, b], i) => (
          <Plot.OfX key={`${i}-${a.toFixed(4)}`} y={g} domain={[a, b]} color={C.f} weight={3} />
        ))}
        {!cancelLow && <Point x={-5} y={0} color={C.ink} />}
        {!cancelHigh && <Point x={1.5} y={0} color={C.ink} />}
        {!cancelHigh && <Label at={[1.5, 0]} attach="se" size={12}>3/2</Label>}
        {cancelHigh && (
          <>
            <Hole x={1.5} y={26 / 7} />
            <Label at={[1.5, 26 / 7]} color={C.f} attach="ne" size={12}>(3/2, 26/7)</Label>
          </>
        )}
        {cancelLow && (
          <>
            <Hole x={-5} y={13 / 3} />
            <Label at={[-5, 13 / 3]} color={C.f} attach="nw" size={12}>(−5, 13/3)</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={-7} max={4} step={0.25} />
        <Buttons>
          <ActionButton label="k = −2" onClick={() => setK(-2)} />
          <ActionButton label="k = 3/2" onClick={() => setK(1.5)} />
          <ActionButton label="k = −5" onClick={() => setK(-5)} />
          <ActionButton label="k = 1 (the original f)" onClick={() => setK(1)} />
        </Buttons>
        <Readouts>
          <Readout color={C.bad} tex={`\\text{vertical: } ${vaTex}`} />
          <Readout color={C.bad} tex="\text{horizontal: } y = 2" />
          <Readout color={count === 2 ? C.good : undefined} tex={`\\text{asymptotes: } ${count}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
