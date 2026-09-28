// 2020 Methods Exam 2 Q5b–c — slide the point of contact x = a along f(x) = x³ − x and watch the
// tangent g_a and its x-intercept b. The tangent drops f(a) over a horizontal run of f(a)/f′(a)
// (drawn purple), so b = a − f(a)/f′(a) = 2a³/(3a² − 1): the denominator of part a.'s formula IS
// the gradient f′(a). As a climbs towards a turning point the tangent flattens and b runs off the
// screen; at a = ±√3/3 the gradient is exactly 0, g_a is the horizontal line y = ±2√3/9 and never
// meets the axis — part b.'s "b does not exist" and part c.'s "horizontal line" in one picture. At
// a = 0, ±1 the point is on the axis already, so b = a (the cases part e. has to throw out).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
  clamp, num,
} from './kit'

const f = (x: number) => x ** 3 - x
const fp = (x: number) => 3 * x * x - 1
const R3 = 1 / Math.sqrt(3)
const X0 = -2.5
const X1 = 2.5
const Y0 = -1.25
const Y1 = 1.25
const A_MIN = -1.3
const A_MAX = 1.3

/** Snap onto the turning points and onto the axis crossings, so the special cases are reachable. */
function snap(a: number): number {
  for (const s of [-R3, R3]) if (Math.abs(a - s) < 0.004) return s
  for (const s of [-1, 0, 1]) if (Math.abs(a - s) < 0.004) return s
  return a
}

// Drag target → nearest point of f, with distances measured in proportion to each axis's span.
const SAMPLES = Array.from({ length: 1041 }, (_, i) => A_MIN + ((A_MAX - A_MIN) * i) / 1040)
function nearestOnF([mx, my]: [number, number]): number {
  let best = 0
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = ((x - mx) / (X1 - X0)) ** 2 + ((f(x) - my) / (Y1 - Y0)) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

const intTicks = (v: number) => (Number.isInteger(v) ? String(v) : '')

export default function FlatTangent() {
  const [a, setA] = useState(-0.45)
  const fa = f(a)
  const m = fp(a)
  const flat = Math.abs(m) < 1e-9
  const onAxis = Math.abs(fa) < 1e-9
  const b = flat ? NaN : (2 * a ** 3) / m
  const bOn = !flat && b > X0 && b < X1
  const bFar = !flat && !bOn
  // Keep the "a" label off the integer tick numbers under the axis.
  const aLabel = !(Math.abs(a - Math.round(a)) < 0.12 && Math.round(a) !== 0)

  let notice
  if (flat) {
    notice = (
      <Notice tone="good">
        <b>The tangent is flat.</b> At <M>{a > 0 ? 'a = \\tfrac{\\sqrt3}{3}' : 'a = -\\tfrac{\\sqrt3}{3}'}</M> the gradient{' '}
        <M>f'(a) = 3a^2 - 1</M> is exactly <M>0</M>, so <M>g_a</M> is the horizontal line{' '}
        <M>{a > 0 ? 'y = -\\tfrac{2\\sqrt3}{9}' : 'y = \\tfrac{2\\sqrt3}{9}'}</M>. It runs parallel to the <M>x</M>-axis and
        never meets it: there is no <M>x</M>-intercept, so no <M>b</M>. In the formula that shows up as dividing by{' '}
        <M>3a^2 - 1 = 0</M>. This is part c.&apos;s answer: the graph of <M>g_a</M> is a <b>horizontal line</b>. (The point
        of contact is a turning point of <M>f</M>, but the question is about the tangent.)
      </Notice>
    )
  } else if (onAxis) {
    notice = (
      <Notice>
        Here <M>f(a) = 0</M>: the point of contact is already on the <M>x</M>-axis, so the tangent crosses the axis right where
        it touches and <M>b = a</M>. (Check: <M>{'\\tfrac{2a^3}{3a^2-1} = a'}</M> at <M>a = -1, 0, 1</M>.) Part e. has to
        throw these three cases out.
      </Notice>
    )
  } else if (bFar || Math.abs(m) < 0.3) {
    notice = (
      <Notice tone="warn">
        <b>Nearly flat.</b> The gradient is only <M>{`f'(a) \\approx ${num(m, 3)}`}</M>, so to drop from height{' '}
        <M>{`f(a) \\approx ${num(fa, 3)}`}</M> to the axis the tangent has to run{' '}
        <M>{`\\tfrac{f(a)}{f'(a)} \\approx ${num(fa / m, 2)}`}</M> sideways{bFar ? ', off the edge of the picture' : ''}. The
        flatter the tangent, the further away <M>b</M> lands. Keep going: press &ldquo;Go to a = {a > 0 ? '' : '−'}1/√3&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The orange tangent at <M>x = a</M> drops from height <M>{`f(a) \\approx ${num(fa, 3)}`}</M> to the axis. Its gradient
        is rise over run, so the purple run from <M>b</M> to <M>a</M> is{' '}
        <M>{'a - b = \\tfrac{f(a)}{f\'(a)}'}</M>. That gives <M>{'b = a - \\tfrac{f(a)}{f\'(a)}'}</M>, which simplifies to
        part a.&apos;s <M>{'\\tfrac{2a^3}{3a^2-1}'}</M>: its denominator is the gradient <M>f'(a)</M>. Now drag the point slowly
        towards {a < 0 ? 'the top of the hump' : 'the bottom of the dip'} and watch <M>b</M>.
      </Notice>
    )
  }

  const move = (v: number) => setA(snap(clamp(v, A_MIN, A_MAX)))

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={0.5} yStep={0.5} height={300} xLabels={intTicks} yLabels={intTicks}>
        <Plot.OfX y={f} domain={[-1.405, 1.405]} color={C.f} weight={3} />
        <Label at={[1.33, f(1.33)]} color={C.f} attach="e">f</Label>
        {flat ? (
          <>
            <Line.Segment point1={[X0 - 1, fa]} point2={[X1 + 1, fa]} color={C.good} weight={3} />
            <Label at={[a > 0 ? X0 + 0.05 : X1 - 0.05, fa]} color={C.good} attach={a > 0 ? 'ne' : 'nw'}>
              {a > 0 ? 'y = −2√3/9' : 'y = 2√3/9'}
            </Label>
          </>
        ) : (
          <Line.PointSlope point={[a, fa]} slope={m} color={C.g} weight={2.5} />
        )}
        {!onAxis && <Line.Segment point1={[a, 0]} point2={[a, fa]} color={C.guide} style="dashed" weight={1.5} />}
        {bOn && !onAxis && <Line.Segment point1={[b, 0]} point2={[a, 0]} color={C.violet} weight={4} />}
        {bOn && <Point x={b} y={0} color={C.g} />}
        {bOn && !onAxis && (
          <Label at={[b, 0]} color={C.g} attach={m < 0 ? 'ne' : 'nw'}>
            b
          </Label>
        )}
        {bFar && (
          <Label at={[b > 0 ? X1 : X0, 0]} color={C.g} attach={b > 0 ? 'nw' : 'ne'} size={12}>
            {b > 0 ? `b ≈ ${num(b, 1)} →` : `← b ≈ ${num(b, 1)}`}
          </Label>
        )}
        {aLabel && !onAxis && (
          <Label at={[a, 0]} attach={fa > 0 ? 's' : 'n'} size={12}>
            a
          </Label>
        )}
        <MovablePoint point={[a, fa]} onMove={p => move(nearestOnF(p))} color={flat ? C.good : C.g} />
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={move} min={A_MIN} max={A_MAX} step={0.005} format={v => num(v, 3)} />
        <Buttons>
          <ActionButton label="Go to a = −1/√3" onClick={() => setA(-R3)} />
          <ActionButton label="Go to a = 1/√3" onClick={() => setA(R3)} />
          <ActionButton label="Back to a = −0.45" onClick={() => setA(-0.45)} />
        </Buttons>
        <Readouts>
          <Readout color={flat ? C.good : C.g} tex={`f'(a) = 3a^2 - 1 = ${num(m, 3)}`} />
          <Readout color={C.violet} tex={flat ? `\\tfrac{f(a)}{f'(a)} = \\tfrac{${num(fa, 3)}}{0}\\text{: undefined}` :`a - b = \\tfrac{f(a)}{f'(a)} \\approx ${num(fa / m, 3)}`} />
          <Readout tex={flat ? 'b \\text{ does not exist}' : `b = \\tfrac{2a^3}{3a^2-1} \\approx ${num(b, 3)}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the orange point along the curve, or use the slider.</p>
        {notice}
      </Controls>
    </div>
  )
}
