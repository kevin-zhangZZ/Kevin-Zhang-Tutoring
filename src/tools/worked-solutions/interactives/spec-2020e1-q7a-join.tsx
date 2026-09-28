// 2020 Specialist Exam 1 Q7a — "make the join smooth". Sliders for m and n move the line
// y = mx + n (x < 1) against the fixed curve y = 4/(1 + x²) (x ≥ 1). Two things can go wrong at
// x = 1: a jump (the line arrives at height m + n, the curve starts at f(1) = 2) and a corner (the
// line's gradient m against the curve's f′(1) = −8/2² = −2). Continuity alone only pins the line
// to (1, 2) — the "Pin the line" toggle makes it pivot there, showing that m + n = 2 can't decide
// m. Both gaps close only at m = −2, n = 4, where the line is the curve's tangent at (1, 2).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, num,
} from './kit'

const g = (x: number) => 4 / (1 + x * x)
const G1 = 2 // f(1) from the curve
const D1 = -2 // f′(1) from the curve: −8x/(1 + x²)² at x = 1
const XL = -0.5
const XR = 3
const YT = 5
const r1 = (v: number) => Math.round(v * 10) / 10
const eq = (a: number, b: number) => Math.abs(a - b) < 1e-6

export default function Join() {
  const [m, setM] = useState(-1)
  const [n, setN] = useState(3.5)
  const [pinned, setPinned] = useState(false)
  const [showTan, setShowTan] = useState(false)

  const v = m + n
  const gap = v - G1
  const noJump = eq(v, G1)
  const noCorner = eq(m, D1)
  const smooth = noJump && noCorner
  const line = (x: number) => m * x + n
  const lineColor = smooth ? C.good : C.g

  const changeM = (raw: number) => {
    const next = r1(raw)
    setM(next)
    if (pinned) setN(r1(G1 - next))
  }
  const changeN = (raw: number) => {
    const next = r1(raw)
    setN(next)
    if (pinned) setM(r1(G1 - next))
  }
  const togglePin = (on: boolean) => {
    setPinned(on)
    if (on) setN(r1(G1 - m))
  }

  // Where to write "mx + n": on the line near x = 0.25, on the side the line isn't heading.
  const lx = 0.25
  const ly = clamp(line(lx), 0.3, YT - 0.3)

  let notice
  if (smooth) {
    notice = (
      <Notice tone="good">
        <b>A smooth join: no jump and no corner.</b> With <M>m = -2</M> and <M>n = 4</M> the line arrives at height{' '}
        <M>m + n = 2 = f(1)</M> <i>and</i> with gradient <M>{"m = -2 = f'(1)"}</M>. So <M>y = -2x + 4</M> is exactly the
        tangent to <M>{'y = \\tfrac{4}{1+x^2}'}</M> at <M>(1, 2)</M> (the dashed continuation lies along it). That is
        what &ldquo;<M>f</M> and <M>{"f'"}</M> continuous&rdquo; means at a join: the line must be the curve&apos;s tangent there.
      </Notice>
    )
  } else if (noJump) {
    notice = (
      <Notice>
        <b>No jump now</b>: <M>m + n = 2</M>, so the line runs into <M>(1, 2)</M>. But there is still a <b>corner</b>: the
        line&apos;s gradient is <M>{`m = ${num(m, 1)}`}</M> and the curve leaves with gradient <M>-2</M> (compare the dashed
        continuation with the blue curve). Every line through <M>(1, 2)</M> satisfies <M>m + n = 2</M>, so continuity alone
        can&apos;t find <M>m</M>.{' '}
        {pinned ? <>Slide <M>m</M> and watch the line pivot about <M>(1, 2)</M> until the corner disappears.</> : <>Turn on &ldquo;Pin the line to (1, 2)&rdquo; and slide <M>m</M>.</>}
      </Notice>
    )
  } else if (noCorner) {
    notice = (
      <Notice>
        <b>The gradients match</b> (<M>{"m = -2 = f'(1)"}</M>), so there is no corner, but the line arrives at height{' '}
        <M>{`m + n = ${num(v, 1)}`}</M> instead of <M>2</M>: a jump of <M>{num(gap, 1)}</M>. The line is parallel to the
        curve&apos;s tangent but in the wrong place. Change <M>n</M> until the red gap closes.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Two things are wrong at <M>x = 1</M>.</b> A <b>jump</b>: the line arrives at height{' '}
        <M>{`m + n = ${num(v, 1)}`}</M> but the curve starts at <M>f(1) = 2</M> (the red gap). And a <b>corner</b>: the
        line&apos;s gradient <M>{`m = ${num(m, 1)}`}</M> isn&apos;t the curve&apos;s gradient <M>-2</M> at <M>x = 1</M>. Fix the
        jump first: turn on &ldquo;Pin the line to (1, 2)&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[XL, XR]} y={[0, YT]} xStep={1} yStep={1} height={320}>
        {showTan && (
          <>
            <Line.PointSlope point={[1, G1]} slope={D1} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[1.6, D1 * 1.6 + 4]} color={C.guide} attach="sw" size={12}>tangent</Label>
          </>
        )}
        {/* Where the line would go if it carried on past x = 1: the angle between this and the
            curve is the corner. Kept short so it never runs through the curve's label. */}
        <Line.Segment point1={[1, v]} point2={[1.9, line(1.9)]} color={lineColor} style="dashed" weight={1.5} opacity={0.55} />
        <Line.Segment point1={[XL - 0.3, line(XL - 0.3)]} point2={[1, v]} color={lineColor} weight={3} />
        <Plot.OfX y={g} domain={[1, XR + 0.3]} color={C.f} weight={3} />
        {!noJump && <Line.Segment point1={[1, G1]} point2={[1, v]} color={C.bad} weight={3} />}
        {!noJump && (
          <Label at={[1, (G1 + v) / 2]} color={C.bad} attach="w" size={12}>jump</Label>
        )}
        {!noJump && (
          <Point x={1} y={v} color={lineColor} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: lineColor, strokeWidth: 2.5 } }} />
        )}
        <Point x={1} y={G1} color={smooth ? C.good : C.f} />
        <Label at={[1, G1]} attach="sw" color={smooth ? C.good : C.ink} size={12}>(1, 2)</Label>
        <Label at={[2.4, 0.27]} color={C.f} attach="c" size={12}>4/(1+x²)</Label>
        <Label at={[lx, ly]} color={lineColor} attach={m <= 0 ? 'ne' : 'se'}>mx + n</Label>
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={changeM} min={-4} max={2} step={0.1} format={x => num(x, 1)} />
        <Slider label="n" value={n} onChange={changeN} min={0} max={6} step={0.1} format={x => num(x, 1)} />
        <Buttons>
          <Toggle label="Pin the line to (1, 2)" checked={pinned} onChange={togglePin} />
          <Toggle label="Show the curve's tangent at x = 1" checked={showTan} onChange={setShowTan} />
        </Buttons>
        <Readouts>
          <Readout color={noJump ? C.good : C.bad} tex={`\\text{jump: } (m+n) - f(1) = ${num(v, 1)} - 2 = ${num(gap, 1)}`} />
          <Readout color={noCorner ? C.good : C.bad} tex={`\\text{corner: } m - f'(1) = ${num(m, 1)} - (-2) = ${num(m - D1, 1)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
