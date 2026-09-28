// 2020 Methods Exam 2 Q5d — which tangents to f(x) = x³ − x land in the window 1 ≤ x < 1.1?
// Top: the tangent at x = a and its x-intercept b, with the window shaded green on the x-axis.
// Bottom: b = 2a³/(3a² − 1) graphed against a, with the band 1 ≤ b < 1.1. The band is met twice:
// on the right branch for 0.8084 < a < 1.3468 (b dips to exactly 1 at a = 1, the tangent at the
// x-intercept (1, 0), then climbs back), and on the left branch for −0.5052 < a ≤ −0.5, a sliver
// only 0.005 wide that is invisible at full scale — hence the zoom buttons. At a = −½ the tangent
// passes through (1, 0) exactly. Endpoints checked with sympy: −0.505173…, −½, 0.808408…,
// 1.346765…; b = 1 ⇔ (a − 1)²(2a + 1) = 0.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle,
  clamp, num,
} from './kit'

const f = (x: number) => x ** 3 - x
const fp = (x: number) => 3 * x * x - 1
const bOf = (a: number) => (2 * a ** 3) / fp(a)
const R3 = 1 / Math.sqrt(3)
// Where b = 1.1 (part d.i) and b = 1, unrounded.
const L11 = -0.505173151189614
const M11 = 0.808407795308479
const R11 = 1.34676535588113

type View = 'all' | 'left' | 'right'
const intTicks = (v: number) => (Number.isInteger(v) ? String(v) : '')
const VIEWS: Record<View, {
  a: [number, number]
  b: [number, number]
  aStep: number
  bStep: number
  step: number
  dp: number
  start: number
  /** Zoomed views don't contain the axes, so their scale is written along the bottom and left
   *  edges instead (mafs only puts tick numbers on the axes themselves). */
  edgeA?: number[]
  edgeB?: number[]
}> = {
  all: { a: [-1.5, 2], b: [-1.5, 3], aStep: 0.5, bStep: 0.5, step: 0.005, dp: 3, start: 1.2 },
  left: {
    a: [-0.53, -0.48], b: [0.7, 1.9], aStep: 0.01, bStep: 0.1, step: 0.0002, dp: 4, start: -0.502,
    edgeA: [-0.52, -0.51, -0.5, -0.49], edgeB: [1, 1.1, 1.5],
  },
  right: {
    a: [0.7, 1.5], b: [0.9, 1.5], aStep: 0.1, bStep: 0.1, step: 0.002, dp: 3, start: 1.2,
    edgeA: [0.8, 1, 1.2, 1.4], edgeB: [1, 1.1, 1.3],
  },
}

const TX: [number, number] = [-1.5, 2]
const TY: [number, number] = [-1.2, 1.2]

export default function Window() {
  const [view, setView] = useState<View>('all')
  const [a, setA] = useState(1.2)
  const [shade, setShade] = useState(false)
  const V = VIEWS[view]

  const fa = f(a)
  const m = fp(a)
  const flat = Math.abs(m) < 1e-9
  const b = flat ? NaN : bOf(a)
  const inside = !flat && b >= 1 - 1e-9 && b < 1.1 - 1e-12
  const bOnTop = !flat && b > TX[0] && b < TX[1]
  const col = inside ? C.good : C.g

  // The curve b(a) in three branches, stopping short of the asymptotes a = ±1/√3 so the plot
  // never joins +∞ to −∞.
  const e = 0.004
  const branches = ([
    [V.a[0], -R3 - e],
    [-R3 + e, R3 - e],
    [R3 + e, V.a[1]],
  ] as [number, number][])
    .map(([lo, hi]) => [Math.max(lo, V.a[0] - 0.01), Math.min(hi, V.a[1] + 0.01)] as [number, number])
    .filter(([lo, hi]) => hi > lo)

  const changeView = (next: View) => {
    setView(next)
    const W = VIEWS[next]
    if (a < W.a[0] || a > W.a[1]) setA(W.start)
  }

  let notice
  if (flat) {
    notice = <Notice>At a turning point the tangent is horizontal and has no <M>x</M>-intercept (part c.).</Notice>
  } else if (inside && a < 0) {
    notice = (
      <Notice tone="good">
        <b>A tangent from the left-hand hump lands in the window too</b>, the interval that is easy to miss. On this branch{' '}
        <M>b</M> <i>decreases</i> as <M>a</M> increases: it falls through <M>1.1</M> at <M>a \approx -0.5052</M> and reaches
        exactly <M>1</M> at <M>a = -\tfrac12</M>, where the tangent passes through the <M>x</M>-intercept <M>(1, 0)</M> of{' '}
        <M>f</M> (the reason the question mentions it). So this piece is <M>{'(-0.505,\\ -0.500\\,]'}</M>: round at{' '}
        <M>-0.505</M>, where <M>b = 1.1</M> is not allowed; square at <M>-0.500</M>, where <M>b = 1</M> is.
      </Notice>
    )
  } else if (inside) {
    notice = (
      <Notice tone="good">
        <b>The tangent lands between 1 and 1.1.</b> On this branch <M>b</M> comes down from far away, reaches its lowest value,
        exactly <M>1</M>, at <M>a = 1</M> (the tangent at <M>(1, 0)</M> lands where it touches), then climbs again. So every{' '}
        <M>a</M> from <M>0.808</M> to <M>1.347</M> works; both ends are where <M>b = 1.1</M>, so both brackets are round, and{' '}
        <M>b = 1</M> is <i>inside</i> the interval, not an end. Now press &ldquo;Zoom: left window&rdquo;: there is a second
        piece.
      </Notice>
    )
  } else if (view === 'left') {
    notice = (
      <Notice>
        Zoomed in on the left branch, where <M>b</M> falls steeply as <M>a</M> increases. The violet curve is inside the green
        band only between <M>a \approx -0.5052</M> (<M>b = 1.1</M>) and <M>a = -0.5</M> (<M>b = 1</M>): a gap of about{' '}
        <M>0.005</M>, which is why it vanishes on the full-size graph. Drag <M>a</M> into it.
      </Notice>
    )
  } else if (b >= 1.1) {
    notice = (
      <Notice>
        <M>{`b \\approx ${num(b, 3)}`}</M> is past the window: this tangent is too flat and runs too far. In the lower graph
        the violet curve <M>{'b = \\tfrac{2a^3}{3a^2-1}'}</M> is above the green band here. It crosses <M>b = 1.1</M> three
        times (part d.i.&apos;s three values), and meets the band in two places. Find both.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{`b \\approx ${num(b, 3)}`}</M> falls short of the window. Tangents at <M>{'a < -\\tfrac{\\sqrt3}{3}'}</M> or{' '}
        <M>{'0 < a < \\tfrac{\\sqrt3}{3}'}</M> land at a negative <M>b</M>, and for <M>{'-\\tfrac12 < a \\le 0'}</M> they
        land between <M>0</M> and <M>1</M>. In the lower graph, look for where the violet curve is inside the green band.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
        The tangent at <span style={{ color: C.g }}>x = a</span> and where it lands, <span style={{ color: C.g }}>b</span>
      </p>
      <Plane x={TX} y={TY} xStep={0.5} yStep={0.5} height={240} xLabels={v => (Number.isInteger(v) ? String(v) : '')} yLabels={false}>
        <Region top={() => TY[1] + 0.2} bottom={() => TY[0] - 0.2} from={1} to={1.1} color={C.good} opacity={0.22} />
        <Plot.OfX y={f} domain={[-1.38, 1.38]} color={C.f} weight={3} />
        <Label at={[1.3, f(1.3)]} color={C.f} attach="e">f</Label>
        {!flat && <Line.PointSlope point={[a, fa]} slope={m} color={C.g} weight={2.5} />}
        {flat && <Line.Segment point1={[TX[0] - 1, fa]} point2={[TX[1] + 1, fa]} color={C.g} weight={2.5} />}
        <Line.Segment point1={[a, 0]} point2={[a, fa]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={a} y={fa} color={C.g} />
        {bOnTop && <Point x={b} y={0} color={col} />}
        {bOnTop && (
          <Label at={[b, 0]} color={col} attach={m < 0 ? 'ne' : 'nw'}>
            b
          </Label>
        )}
        {!flat && !bOnTop && (
          <Label at={[b > 0 ? TX[1] : TX[0], 0]} color={C.g} attach={b > 0 ? 'nw' : 'ne'} size={12}>
            {b > 0 ? `b ≈ ${num(b, 1)} →` : `← b ≈ ${num(b, 1)}`}
          </Label>
        )}
      </Plane>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mt-3 mb-1">
        <span style={{ color: C.violet }}>b = 2a³/(3a² − 1)</span> against a{view !== 'all' ? ' (zoomed in)' : ''}
      </p>
      <Plane
        key={view}
        x={V.a}
        y={V.b}
        xStep={V.aStep}
        yStep={V.bStep}
        height={230}
        xLabel="a"
        yLabel="b"
        labels={V.edgeA ? false : intTicks}
      >
        <Region top={() => 1.1} bottom={() => 1} from={V.a[0] - 1} to={V.a[1] + 1} color={C.good} opacity={0.25} />
        {shade && (
          <>
            <Region top={() => V.b[1] + 1} bottom={() => V.b[0] - 1} from={L11} to={-0.5} color={C.good} opacity={0.18} />
            <Region top={() => V.b[1] + 1} bottom={() => V.b[0] - 1} from={M11} to={R11} color={C.good} opacity={0.18} />
          </>
        )}
        {view === 'all' && (
          <>
            <Line.Segment point1={[-R3, V.b[0] - 1]} point2={[-R3, V.b[1] + 1]} color={C.violet} style="dashed" weight={1.5} />
            <Line.Segment point1={[R3, V.b[0] - 1]} point2={[R3, V.b[1] + 1]} color={C.violet} style="dashed" weight={1.5} />
          </>
        )}
        {branches.map(([lo, hi]) => (
          <Plot.OfX key={lo} y={bOf} domain={[lo, hi]} color={C.violet} weight={3} />
        ))}
        {!flat && b > V.b[0] - 0.5 && b < V.b[1] + 0.5 && <Point x={a} y={b} color={col} />}
        {V.edgeA?.map(v => (
          <Label key={`a${v}`} at={[v, V.b[0]]} attach="s" size={11} bold={false} gap={4}>
            {String(v).replace('-', '−')}
          </Label>
        ))}
        {V.edgeB?.map(v => (
          <Label key={`b${v}`} at={[V.a[0], v]} attach="e" size={11} bold={false} gap={3}>
            {String(v)}
          </Label>
        ))}
      </Plane>
      <Controls>
        <Slider
          label="a"
          value={clamp(a, V.a[0], V.a[1])}
          onChange={v => setA(v)}
          min={V.a[0]}
          max={V.a[1]}
          step={V.step}
          format={v => num(v, V.dp)}
        />
        <Buttons>
          <Toggle label="Whole graph" checked={view === 'all'} onChange={() => changeView('all')} />
          <Toggle label="Zoom: left window" checked={view === 'left'} onChange={() => changeView('left')} />
          <Toggle label="Zoom: right window" checked={view === 'right'} onChange={() => changeView('right')} />
        </Buttons>
        <Buttons>
          <ActionButton label="a = −½" onClick={() => { if (view === 'right') setView('all'); setA(-0.5) }} />
          <ActionButton label="a = 1" onClick={() => { if (view === 'left') setView('all'); setA(1) }} />
          <Toggle label="Shade the a-values that work" checked={shade} onChange={setShade} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`a = ${num(a, V.dp)}`} />
          <Readout color={col} tex={flat ? 'b \\text{ does not exist}' : `b \\approx ${num(b, 4)}`} />
          <Readout
            color={inside ? C.good : undefined}
            tex={inside ? '1 \\le b < 1.1\\ \\checkmark' : flat ? '' : b < 1 ? 'b < 1' : 'b \\ge 1.1'}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
