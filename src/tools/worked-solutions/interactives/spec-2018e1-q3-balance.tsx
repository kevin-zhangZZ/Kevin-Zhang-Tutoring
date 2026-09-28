// 2018 Specialist Exam 1 Q3 — why implicit differentiation works. Every point on the curve
// 2x²sin(y) + xy = π²/18 makes the left side equal π²/18, so walking from P(π/6, π/6) to a
// nearby point Q on the curve changes the left side by 0 overall. Split the walk into a step
// across (only x changes, violet) and a step down/up (only y changes, orange): the two changes
// cancel exactly. Per unit step they become 4x sin(y) + y and (2x²cos(y) + x)·dy/dx, which is
// the differentiated equation, and the chord PQ's gradient closes in on the tangent's
// −18/(π√3 + 6) ≈ −1.573 as Q slides into P. A toggle adds the red line from forgetting the
// dy/dx on sin(y), gradient −3 − √3π/6 ≈ −3.91, which is visibly not the tangent.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp,
  num, tick,
} from './kit'

const K = Math.PI ** 2 / 18
const P = Math.PI / 6 // P = (π/6, π/6)
const lhs = (x: number, y: number) => 2 * x * x * Math.sin(y) + x * y

/** The curve's y for a given x. For 0.3 ≤ x ≤ 1.2 the left side increases with y on [0, 2], so bisect. */
function yOf(x: number) {
  let lo = 0
  let hi = 2
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2
    if (lhs(x, mid) < K) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

const TAN = -18 / (Math.PI * Math.sqrt(3) + 6) // ≈ −1.573
const WRONG = -3 - (Math.sqrt(3) * Math.PI) / 6 // ≈ −3.907, from d/dx sin(y) = cos(y)
const DX_MIN = -0.18
const DX_MAX = 0.5
const signed = (v: number, dp = 3) => (v > 0.0005 ? '+' : '') + num(v, dp)

export default function ImplicitBalance() {
  const [dx, setDx] = useState(0.25)
  const [wrong, setWrong] = useState(false)

  const atP = Math.abs(dx) < 0.0005
  const near = Math.abs(dx) <= 0.012
  const right = dx > 0
  const xQ = P + dx
  const yQ = atP ? P : yOf(xQ)
  const dy = yQ - P
  const across = atP ? 0 : lhs(xQ, P) - K // P → R = (x_Q, π/6): only x changes
  const upDown = atP ? 0 : lhs(xQ, yQ) - lhs(xQ, P) // R → Q: only y changes; computed, and it cancels because Q is back on the curve
  const chord = atP ? TAN : dy / dx

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Writing <M>{'\\tfrac{d}{dx}\\sin(y) = \\cos(y)'}</M> treats <M>y</M> as if it stayed put. It gives{' '}
        <M>{'\\tfrac{dy}{dx} = -3 - \\tfrac{\\sqrt3\\pi}{6} \\approx -3.91'}</M>, and the red line is far steeper than the
        curve at <M>P</M>. But <M>y</M> does change as you move along the curve (the orange step), so{' '}
        <M>{'\\sin(y)'}</M> changes at the rate <M>{'\\cos(y)\\tfrac{dy}{dx}'}</M>.
      </Notice>
    )
  } else if (atP) {
    notice = (
      <Notice tone="good">
        <b>Q has reached P, and the chord has become the tangent</b>, gradient{' '}
        <M>{'\\tfrac{-18}{\\pi\\sqrt3+6} \\approx -1.573'}</M>. In the limit the violet part per unit step is{' '}
        <M>{'4x\\sin(y) + y = \\tfrac{\\pi}{2}'}</M> and the orange part is{' '}
        <M>{'\\left(2x^2\\cos(y) + x\\right)\\tfrac{dy}{dx}'}</M>. They still add to <M>0</M>: that is the line{' '}
        <M>{'\\tfrac{\\pi}{2} + \\tfrac{\\pi(\\sqrt3\\pi+6)}{36}\\tfrac{dy}{dx} = 0'}</M> in the working.
      </Notice>
    )
  } else if (near) {
    notice = (
      <Notice tone="good">
        Q is right next to P, and the gradient of <M>PQ</M> is <M>{num(chord, 3)}</M>, almost the tangent&apos;s{' '}
        <M>-1.573</M>. Divide each change by its own step: violet <M>{'\\div\\,\\Delta x'}</M> gives{' '}
        <M>{num(across / dx, 3)}</M> (heading for <M>{'4x\\sin(y)+y = \\tfrac{\\pi}{2} \\approx 1.571'}</M>) and orange{' '}
        <M>{'\\div\\,\\Delta y'}</M> gives <M>{num(upDown / dy, 3)}</M> (heading for{' '}
        <M>{'2x^2\\cos(y)+x \\approx 0.998'}</M>). Slide <M>{'\\Delta x'}</M> to <M>0</M> to finish the limit.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Get from P to Q in two steps: <b style={{ color: C.violet }}>across</b>, where only <M>x</M> changes, then{' '}
        <b style={{ color: C.g }}>{right ? 'down' : 'up'}</b>, where only <M>y</M> changes. The left side changes by{' '}
        <M>{signed(across)}</M> on the first step and by <M>{signed(upDown)}</M> on the second. They cancel exactly
        because Q is back on the curve, where the left side is <M>{'\\tfrac{\\pi^2}{18}'}</M> again. That is why the
        differentiated equation equals <M>0</M>. Drag Q towards P and watch the gradient of <M>PQ</M>.
      </Notice>
    )
  }

  const showDxLabel = Math.abs(dx) > 0.07
  const showDyLabel = Math.abs(dy) > 0.07

  return (
    <div>
      <Plane
        x={[0, 1.4]}
        y={[0, 1.15]}
        xStep={0.2}
        yStep={0.2}
        equalScale
        height={460}
        xLabels={v => (v < 0 || v > 1.45 ? '' : tick(v))}
        yLabels={v => (v > 1.1 ? '' : tick(v))}
      >
        <Line.Segment point1={[P, 0]} point2={[P, P]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[0, P]} point2={[P, P]} color={C.guide} style="dashed" weight={1} />
        <Label at={[P, 0]} attach="ne" color={C.guide} size={12}>π/6</Label>
        <Label at={[P / 2 + 0.04, P]} attach="n" color={C.guide} size={12}>π/6</Label>

        <Plot.OfX y={yOf} domain={[0.3, 1.6]} color={C.f} weight={3} />
        <Line.PointSlope point={[P, P]} slope={TAN} color={C.good} weight={2} />
        {!wrong && (
          <Label at={[P + (0.15 - P) / TAN, 0.15]} attach="w" color={C.good} size={12}>tangent</Label>
        )}
        {wrong && (
          <>
            <Line.PointSlope point={[P, P]} slope={WRONG} color={C.bad} weight={2} />
            <Label at={[P + (1.05 - P) / WRONG, 1.05]} attach="e" color={C.bad} size={12}>no dy/dx on sin y</Label>
          </>
        )}

        {!atP && (
          <>
            <Line.ThroughPoints point1={[P, P]} point2={[xQ, yQ]} color={C.ink} style="dashed" weight={1.5} />
            <Line.Segment point1={[P, P]} point2={[xQ, P]} color={C.violet} weight={3} />
            <Line.Segment point1={[xQ, P]} point2={[xQ, yQ]} color={C.g} weight={3} />
          </>
        )}
        {!atP && showDxLabel && (
          <Label at={[(P + xQ) / 2, P]} attach={right ? 'n' : 's'} color={C.violet} size={12}>Δx</Label>
        )}
        {!atP && showDyLabel && (
          <Label at={[xQ, (P + yQ) / 2]} attach={right ? 'e' : 'w'} color={C.g} size={12}>Δy</Label>
        )}

        <Point x={P} y={P} color={C.ink} />
        <Label at={[P, P]} attach={right || atP ? 'sw' : 'ne'}>P</Label>
        {Math.abs(dx) > 0.04 && <Label at={[xQ, yQ]} attach={right ? 'sw' : 'ne'} color={C.g}>Q</Label>}
        <MovablePoint
          point={[xQ, yQ]}
          onMove={p => setDx(clamp(p[0] - P, DX_MIN, DX_MAX))}
          constrain={p => {
            const x = clamp(p[0], P + DX_MIN, P + DX_MAX)
            return [x, yOf(x)]
          }}
          color={C.g}
        />
      </Plane>
      <Controls>
        <Slider label="\Delta x" value={dx} onChange={setDx} min={DX_MIN} max={DX_MAX} step={0.001} format={v => num(v, 3)} />
        <Buttons>
          <Toggle
            label={<>Forget the <M>{'\\tfrac{dy}{dx}'}</M> on <M>{'\\sin(y)'}</M></>}
            checked={wrong}
            onChange={setWrong}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`x\\text{ moves: } \\Delta\\text{LHS} = ${signed(across)}`} />
          <Readout color={C.g} tex={`y\\text{ moves: } \\Delta\\text{LHS} = ${signed(upDown)}`} />
          <Readout tex={atP ? `Q = P\\text{: chord} \\to \\text{tangent}` : `\\text{gradient of } PQ = ${num(chord, 3)}`} />
          <Readout color={C.good} tex={`\\text{tangent: } \\tfrac{-18}{\\pi\\sqrt3+6} \\approx ${num(TAN, 3)}`} />
          {wrong && <Readout color={C.bad} tex={`\\text{red line (no } \\tfrac{dy}{dx}\\text{): } {${num(WRONG, 3)}}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
