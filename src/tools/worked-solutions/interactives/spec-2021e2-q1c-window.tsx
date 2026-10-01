// 2021 Specialist Exam 2 Q1c — why so many sketches had no middle branch. The graph of
// f(x) = (2x − 3)(x + 5)/((x − 1)(x + 2)) with a calculator screen drawn over it: x from −10 to 10,
// y from −6.67 up to a top edge the student drags (−6.67 to 6.67 is the usual default window). The
// part of the curve inside the screen is bold, the rest faint. The middle branch's lowest point is
// (−0.04, 7.49) (sympy: x = (11 − √126)/5), so with the default top edge the whole branch — and the
// y-intercept (0, 7.5) on it — is off screen, and nothing on the screen says anything is missing.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, tick } from './kit'

const f = (x: number) => ((2 * x - 3) * (x + 5)) / ((x - 1) * (x + 2))

const X0 = -11
const X1 = 11
const Y0 = -8
const Y1 = 17
const WX0 = -10
const WX1 = 10
const WY0 = -6.67
const DEFAULT_TOP = 6.67
const LOW = { x: (11 - Math.sqrt(126)) / 5, y: f((11 - Math.sqrt(126)) / 5) } // (−0.045, 7.494)

// The three branches, kept clear of the asymptotes x = −2 and x = 1.
const E = 1e-9
const BRANCHES: [number, number][] = [
  [X0, -2 - E],
  [-2 + E, 1 - E],
  [1 + E, X1],
]

/** Where `inside` switches between a and b (inside(a) ≠ inside(b)), by bisection. */
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
function pieces(lo: number, hi: number, inside: (x: number) => boolean, n = 700): [number, number][] {
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

/** Tick numbers only inside the ranges (the plane's padding would show a clipped extra one). */
const within = (lo: number, hi: number) => (v: number) => (v < lo - 1e-9 || v > hi + 1e-9 ? '' : tick(v))

const ALL = BRANCHES.flatMap(([a, b]) => pieces(a, b, x => f(x) > Y0 - 3 && f(x) < Y1 + 3))

export default function CalculatorWindow() {
  const [top, setTop] = useState(DEFAULT_TOP)
  const onScreen = (x: number) => x >= WX0 && x <= WX1 && f(x) >= WY0 && f(x) <= top
  const shown = BRANCHES.flatMap(([a, b]) => pieces(Math.max(a, WX0), Math.min(b, WX1), onScreen))
  const middleShown = top >= LOW.y
  const grid = top >= 15.95

  let notice
  if (!middleShown) {
    notice = (
      <Notice tone="warn">
        <b>The screen shows two branches and looks finished.</b> But the whole middle branch, between <M>x = -2</M> and{' '}
        <M>x = 1</M>, sits above the top edge: its lowest point is <M>(-0.04,\ 7.49)</M> and the screen stops at{' '}
        <M>{`y = ${top.toFixed(2)}`}</M>. The calculator doesn&apos;t draw asymptotes, so nothing hints that a piece is
        missing. Drag the top edge up past <M>7.49</M>.
      </Notice>
    )
  } else if (!grid) {
    notice = (
      <Notice tone="good">
        <b>Now the bottom of the middle branch appears.</b> Between the asymptotes <M>{'f(x) \\to +\\infty'}</M> at both
        ends, so this branch is a valley that never comes below <M>{'y \\approx 7.49'}</M>. It also carries the
        y-intercept <M>{'\\left(0, \\tfrac{15}{2}\\right)'}</M>, so missing the branch loses an intercept too. Press
        &ldquo;Match VCAA&apos;s grid&rdquo; to see it all.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>With the screen matched to VCAA&apos;s grid (up to <M>y = 16</M>), all three branches are visible</b>, which is
        what the report recommends. The sketch still needs its labels: the asymptotes, the intercepts <M>(-5, 0)</M>,{' '}
        <M>{'\\left(\\tfrac32, 0\\right)'}</M> and <M>{'\\left(0, \\tfrac{15}{2}\\right)'}</M>, the maximum{' '}
        <M>(4.44,\ 2.51)</M> and the point of inflection <M>(6.79,\ 2.45)</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={2} yStep={2} height={340} xLabels={within(X0, X1)} yLabels={within(Y0, Y1)}>
        <Polygon
          points={[[WX0, WY0], [WX1, WY0], [WX1, top], [WX0, top]]}
          color={C.violet}
          fillOpacity={0.07}
          weight={2}
          strokeStyle="dashed"
        />
        <Label at={[WX1, top]} color={C.violet} attach="sw" size={12}>calculator screen</Label>
        <Line.Segment point1={[-2, Y0]} point2={[-2, Y1]} color={C.bad} style="dashed" weight={1.5} />
        <Line.Segment point1={[1, Y0]} point2={[1, Y1]} color={C.bad} style="dashed" weight={1.5} />
        <Line.Segment point1={[X0, 2]} point2={[X1, 2]} color={C.bad} style="dashed" weight={1.5} />
        <Label at={[-2, 13]} color={C.bad} attach="w" size={12}>x = −2</Label>
        <Label at={[1, 13]} color={C.bad} attach="e" size={12}>x = 1</Label>
        <Label at={[-7, 2]} color={C.bad} attach="n" size={12}>y = 2</Label>
        {ALL.map(([a, b], i) => (
          <Plot.OfX key={`all${i}`} y={f} domain={[a, b]} color={C.guide} weight={1.5} opacity={0.6} />
        ))}
        {shown.map(([a, b], i) => (
          <Plot.OfX key={`on${i}-${a.toFixed(4)}`} y={f} domain={[a, b]} color={C.f} weight={3} />
        ))}
        <Point x={LOW.x} y={LOW.y} color={middleShown ? C.f : C.guide} />
        <Label at={[LOW.x, LOW.y]} color={middleShown ? C.f : C.guide} attach="w" gap={14} size={12}>(−0.04, 7.49)</Label>
      </Plane>
      <Controls>
        <Slider label="y_{\max}" value={top} onChange={setTop} min={4} max={16} step={0.01} />
        <Buttons>
          <ActionButton label="Default window" onClick={() => setTop(DEFAULT_TOP)} />
          <ActionButton label="Match VCAA's grid" onClick={() => setTop(16)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\text{screen: } {-10} \\le x \\le 10,\\ {-6.67} \\le y \\le ${top.toFixed(2)}`} />
          <Readout color={middleShown ? C.good : C.bad} tex={`\\text{branches on screen: } ${middleShown ? 3 : 2}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
