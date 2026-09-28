// 2020 Specialist Exam 2 MCQ 4 — f(g(x)) as a two-stage machine, which gives the range without any
// trigonometry. Slide x through (0, π/2): g sends it to u = cosec²x on the u-axis (always above 1 —
// the orange band is the range of g, (1, ∞), which sits inside f's domain [1, ∞)), and f turns u
// into the height √(u − 1)/u. f peaks at u = 2 (f′(u) = (2 − u)/(2u²√(u − 1)), checked with sympy)
// with f(2) = ½, and u = 2 is one of the numbers g supplies (at x = π/4), so ½ is in the range; the
// height 0 would need u = 1 (x = π/2, excluded) or u "= ∞", so it is never reached. The readouts
// show √(u − 1)/u and ½sin(2x) agreeing for every x.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const PI = Math.PI
const f = (u: number) => Math.sqrt(Math.max(0, u - 1)) / u
const g = (x: number) => 1 / Math.sin(x) ** 2
const U_MAX = 10.5
// cosec²x = 10.5 at x = arcsin(1/√10.5) ≈ 0.314, so from X_MIN on, u (≤ 9.6) is on screen.
const X_MIN = 0.33
const X_MAX = PI / 2 - 0.02
const SNAP = 0.015

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

const yTick = (v: number) => (Math.abs(v - 0.25) < 1e-9 ? '1/4' : Math.abs(v - 0.5) < 1e-9 ? '1/2' : '')
const uTick = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 && Math.round(v) % 2 === 0 ? String(Math.round(v)) : Math.abs(v - 1) < 1e-9 ? '1' : '')

/** x in (0, π/2) as a readout: π/4 when it is exactly there. */
const xText = (x: number) => (Math.abs(x - PI / 4) < 1e-9 ? '\\tfrac{\\pi}{4}' : `${x.toFixed(3)}`)

export default function InnerWidget() {
  const [x, setX] = useState(0.5)
  const u = g(x)
  const y = f(u)
  const atPeak = Math.abs(x - PI / 4) < 1e-9
  const nearOne = x > PI / 2 - 0.12
  const far = x < 0.45

  let notice
  let tone: 'neutral' | 'good' = 'neutral'
  if (atPeak) {
    tone = 'good'
    notice = (
      <>
        <b>At <M>{'x = \\tfrac{\\pi}{4}'}</M>, g sends in <M>{'u = \\operatorname{cosec}^2\\left(\\tfrac{\\pi}{4}\\right) = 2'}</M></b>, exactly where{' '}
        <M>f</M> peaks: <M>{'f(2) = \\tfrac{\\sqrt{1}}{2} = \\tfrac12'}</M>. Because <M>2</M> is one of the numbers g actually supplies, the
        height <M>{'\\tfrac12'}</M> is reached, so it belongs in the range. You didn&apos;t need the trig simplification to see it.
      </>
    )
  } else if (nearOne) {
    notice = (
      <>
        As <M>{'x \\to \\tfrac{\\pi}{2}'}</M>, <M>{'\\sin^2 x \\to 1'}</M>, so <M>{'u = \\operatorname{cosec}^2 x'}</M> slides down towards{' '}
        <M>1</M> and the height <M>{'f(u) \\to f(1) = 0'}</M>. But g never hands f the number <M>1</M> itself: that would need{' '}
        <M>{'x = \\tfrac{\\pi}{2}'}</M>, which is excluded (the hollow dot at u = 1). So <M>0</M> is approached and never reached.
      </>
    )
  } else if (far) {
    notice = (
      <>
        As <M>{'x \\to 0'}</M>, <M>{'\\sin^2 x \\to 0'}</M>, so <M>{'u = \\operatorname{cosec}^2 x'}</M> grows without bound (the slider stops at{' '}
        <M>x = 0.33</M>, where <M>u \approx 9.5</M>, only to keep u on the picture). The height <M>{'\\tfrac{\\sqrt{u-1}}{u}'}</M> shrinks towards <M>0</M>: the
        bottom grows faster than the top. Again <M>0</M> is approached, never reached.
      </>
    )
  } else {
    notice = (
      <>
        Two stages: g sends <M>x</M> to <M>{'u = \\operatorname{cosec}^2 x'}</M> on the orange band (every <M>u</M> above <M>1</M>, the range
        of g), then f turns <M>u</M> into a height. f&apos;s domain <M>{'[1, \\infty)'}</M> contains the whole band, which is why{' '}
        <M>{'f(g(x))'}</M> exists. Slide <M>x</M> to both ends, then to <M>{'\\tfrac{\\pi}{4}'}</M>.
      </>
    )
  }

  return (
    <div>
      <Plane x={[0, U_MAX]} y={[-0.08, 0.62]} xStep={1} yStep={0.125} height={290} xLabel="u" xLabels={uTick} yLabels={yTick}>
        {/* The range of g, (1, ∞), on the u-axis. */}
        <Line.Segment point1={[1, 0]} point2={[U_MAX, 0]} color={C.g} weight={6} />
        <OpenPoint x={1} y={0} color={C.g} />
        <Label at={[7.4, 0]} color={C.g} attach="n" gap={8} size={12}>range of g: u &gt; 1</Label>

        <Plot.OfX y={f} domain={[1, U_MAX]} color={C.f} weight={3} />
        <Label at={[8.2, f(8.2)]} color={C.f} attach="n" gap={8}>y = f(u)</Label>
        <Point x={2} y={0.5} color={C.good} />
        <Label at={[2, 0.5]} color={C.good} attach="ne" gap={8}>(2, 1/2)</Label>

        <Line.Segment point1={[u, 0]} point2={[u, y]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, y]} point2={[u, y]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={u} y={0} color={C.g} />
        <Point x={u} y={y} color={C.f} />
        <Point x={0} y={y} color={C.f} svgCircleProps={{ r: 3.5 }} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x}
          onChange={v => setX(Math.abs(v - PI / 4) < SNAP ? PI / 4 : v)}
          min={X_MIN}
          max={X_MAX}
          step={0.001}
          format={v => (Math.abs(v - PI / 4) < 1e-9 ? 'π/4' : v.toFixed(3))}
        />
        <Readouts>
          <Readout tex={`x = ${xText(x)}`} />
          <Readout color={C.g} tex={`u = \\operatorname{cosec}^2 x ${atPeak ? '= 2' : `\\approx ${u.toFixed(3)}`}`} />
          <Readout color={C.f} tex={`f(u) = \\tfrac{\\sqrt{u-1}}{u} ${atPeak ? '= \\tfrac12' : `\\approx ${y.toFixed(4)}`}`} />
          <Readout tex={`\\tfrac12\\sin(2x) ${atPeak ? '= \\tfrac12' : `\\approx ${(0.5 * Math.sin(2 * x)).toFixed(4)}`}`} />
        </Readouts>
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
