// 2020 Methods Exam 2 Q5e — when is the tangent at x = b parallel to the tangent at x = a?
// Top: f(x) = x³ − x, the tangent g_a at x = a (orange), where it lands (b), and the tangent g_b
// at x = b (purple) — the picture VCAA printed, but live. Bottom: the gradient function
// f′(x) = 3x² − 1, with dots at heights f′(a) and f′(b). The dashed line at height f′(a) meets the
// parabola only at x = a and at its mirror image x = −a (the parabola is symmetric about the y-axis),
// so parallel tangents need b = −a; with b = 2a³/(3a² − 1) that happens only at a = ±√5/5 (b = ∓√5/5,
// common gradient −2/5). At a = −1, 0, 1 the point is on the axis, b = a and g_b is the same line as
// g_a, not a second parallel line — the cases the question's b ≠ a excludes. Checked with sympy.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
  clamp, num,
} from './kit'

const f = (x: number) => x ** 3 - x
const fp = (x: number) => 3 * x * x - 1
const R3 = 1 / Math.sqrt(3)
const R5 = 1 / Math.sqrt(5)
const X: [number, number] = [-2, 2]
const TY: [number, number] = [-1.2, 1.2]
const BY: [number, number] = [-1.5, 3]
const A_MIN = -1.3
const A_MAX = 1.3

function snap(a: number): number {
  for (const s of [-R5, R5]) if (Math.abs(a - s) < 0.003) return s
  for (const s of [-R3, R3]) if (Math.abs(a - s) < 0.004) return s
  for (const s of [-1, 0, 1]) if (Math.abs(a - s) < 0.004) return s
  return a
}

const SAMPLES = Array.from({ length: 1041 }, (_, i) => A_MIN + ((A_MAX - A_MIN) * i) / 1040)
function nearestOnF([mx, my]: [number, number]): number {
  let best = 0
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = ((x - mx) / (X[1] - X[0])) ** 2 + ((f(x) - my) / (TY[1] - TY[0])) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

const intTicks = (v: number) => (Number.isInteger(v) ? String(v) : '')

export default function Parallel() {
  const [a, setA] = useState(-0.35)
  const fa = f(a)
  const ma = fp(a)
  const flat = Math.abs(ma) < 1e-9
  const b = flat ? NaN : (2 * a ** 3) / ma
  const same = !flat && Math.abs(b - a) < 1e-9
  const parallel = !flat && !same && Math.abs(Math.abs(a) - R5) < 1e-9
  const bOn = !flat && b > X[0] + 0.02 && b < X[1] - 0.02
  const fb = bOn ? f(b) : NaN
  const mb = flat ? NaN : fp(b)
  const bDotOn = !flat && mb < BY[1] + 0.3 && b > X[0] && b < X[1]
  const bCol = parallel ? C.good : C.violet
  const aCol = parallel ? C.good : C.g

  let notice
  if (flat) {
    notice = (
      <Notice>
        At <M>{a > 0 ? 'a = \\tfrac{\\sqrt3}{3}' : 'a = -\\tfrac{\\sqrt3}{3}'}</M> the tangent is horizontal, so <M>b</M> does
        not exist (parts b. and c.) and there is no <M>g_b</M>. Part e. only asks about <M>a</M> where <M>b</M> exists.
      </Notice>
    )
  } else if (parallel) {
    notice = (
      <Notice tone="good">
        <b>Parallel.</b> The tangent at <M>{a < 0 ? 'a = -\\tfrac{\\sqrt5}{5}' : 'a = \\tfrac{\\sqrt5}{5}'}</M> lands at{' '}
        <M>{a < 0 ? 'b = \\tfrac{\\sqrt5}{5}' : 'b = -\\tfrac{\\sqrt5}{5}'}</M>, exactly the mirror image <M>-a</M>. There the
        gradient is the same, <M>{'f\'(b) = f\'(a) = -\\tfrac25'}</M>, so <M>g_b</M> runs parallel to <M>g_a</M>. In the
        lower graph the purple dot has landed on the hollow one. Algebraically: <M>b = -a</M> in{' '}
        <M>{'\\tfrac{2a^3}{3a^2-1} = -a'}</M> gives <M>5a^2 = 1</M>.
      </Notice>
    )
  } else if (same) {
    notice = (
      <Notice tone="warn">
        <b>Here <M>b = a</M>.</b> The point of contact is on the <M>x</M>-axis, so the tangent lands where it touches, and{' '}
        <M>g_b</M> is the <i>same</i> line as <M>g_a</M>: one line, not two parallel ones. Equal gradients, trivially, which is
        why solving <M>f&apos;(a) = f&apos;(b)</M> throws up <M>a = -1, 0, 1</M>, and why the question says <M>b \ne a</M>.
        Throw these out.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The tangent at <M>x = a</M> lands at <M>{`b \\approx ${num(b, 3)}`}</M>, and the tangent there has gradient{' '}
        <M>{`f'(b) \\approx ${num(mb, 3)}`}</M>, not <M>{`f'(a) \\approx ${num(ma, 3)}`}</M>: not parallel. In the lower graph,
        the dashed line at height <M>f'(a)</M> meets the gradient parabola at <M>x = a</M> and at its mirror image{' '}
        <M>x = -a</M> (hollow dot), and nowhere else. So the tangents can only be parallel if <M>b</M> lands exactly on{' '}
        <M>-a</M>. Drag <M>a</M> until the purple dot sits on the hollow one.
      </Notice>
    )
  }

  const move = (v: number) => setA(snap(clamp(v, A_MIN, A_MAX)))

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
        <span style={{ color: C.f }}>f(x) = x³ − x</span>, the tangent <span style={{ color: C.g }}>g<sub>a</sub></span> and the tangent{' '}
        <span style={{ color: C.violet }}>g<sub>b</sub></span>
      </p>
      <Plane x={X} y={TY} xStep={0.5} yStep={0.5} height={260} xLabels={intTicks} yLabels={false}>
        <Plot.OfX y={f} domain={[-1.38, 1.38]} color={C.f} weight={3} />
        <Label at={[1.3, f(1.3)]} color={C.f} attach="e">f</Label>
        {bOn && !same && (
          <>
            <Line.PointSlope point={[b, fb]} slope={mb} color={bCol} weight={2.5} />
            <Line.Segment point1={[b, 0]} point2={[b, fb]} color={C.guide} style="dashed" weight={1.5} />
            <Point x={b} y={fb} color={bCol} />
          </>
        )}
        {flat ? (
          <Line.Segment point1={[X[0] - 1, fa]} point2={[X[1] + 1, fa]} color={C.g} weight={2.5} />
        ) : (
          <Line.PointSlope point={[a, fa]} slope={ma} color={aCol} weight={2.5} />
        )}
        <Line.Segment point1={[a, 0]} point2={[a, fa]} color={C.guide} style="dashed" weight={1.5} />
        {bOn && <Point x={b} y={0} color={bCol} />}
        {bOn && !same && (
          <Label at={[b, 0]} color={bCol} attach={fb < 0 ? 'n' : 's'} size={12}>
            b
          </Label>
        )}
        {!flat && !bOn && (
          <Label at={[b > 0 ? X[1] : X[0], 0]} color={C.violet} attach={b > 0 ? 'nw' : 'ne'} size={12}>
            {b > 0 ? `b ≈ ${num(b, 1)} →` : `← b ≈ ${num(b, 1)}`}
          </Label>
        )}
        {Math.abs(fa) > 0.05 && (
          <Label at={[a, 0]} attach={fa > 0 ? 's' : 'n'} size={12}>
            a
          </Label>
        )}
        <MovablePoint point={[a, fa]} onMove={p => move(nearestOnF(p))} color={aCol} />
      </Plane>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mt-3 mb-1">
        The gradient function <span style={{ color: C.f }}>f′(x) = 3x² − 1</span>: height = gradient of the tangent
      </p>
      <Plane x={X} y={BY} xStep={0.5} yStep={0.5} height={220} xLabels={intTicks} yLabels={v => (Number.isInteger(v) && v > 0 ? String(v) : '')}>
        <Plot.OfX y={fp} domain={[-1.28, 1.28]} color={C.f} weight={3} />
        <Line.Segment point1={[X[0] - 1, ma]} point2={[X[1] + 1, ma]} color={C.guide} style="dashed" weight={1.5} />
        {!parallel && !same && (
          <Point x={-a} y={ma} color={C.guide} svgCircleProps={{ r: 5.5, style: { fill: 'var(--mafs-bg)', stroke: C.guide, strokeWidth: 2.5 } }} />
        )}
        {!parallel && !same && Math.abs(a) > 0.08 && (
          <Label at={[-a, ma]} color={C.guide} attach="n" size={12}>
            −a
          </Label>
        )}
        {bDotOn && !same && <Point x={b} y={mb} color={bCol} />}
        <Point x={a} y={ma} color={aCol} />
        <Label at={[a, ma]} color={aCol} attach="n" size={12}>
          a
        </Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={move} min={A_MIN} max={A_MAX} step={0.005} format={v => num(v, 3)} />
        <Buttons>
          <ActionButton label="a = −√5/5" onClick={() => setA(-R5)} />
          <ActionButton label="a = √5/5" onClick={() => setA(R5)} />
          <ActionButton label="a = −1 (b = a)" onClick={() => setA(-1)} />
        </Buttons>
        <Readouts>
          <Readout color={aCol} tex={`f'(a) = ${num(ma, 3)}`} />
          <Readout color={bCol} tex={flat ? 'b \\text{ does not exist}' : `b \\approx ${num(b, 3)},\\ f'(b) \\approx ${num(mb, 3)}`} />
          <Readout tex={`-a = ${num(-a, 3)}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the orange point along the curve, or use the slider.</p>
        {notice}
      </Controls>
    </div>
  )
}
