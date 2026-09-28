// 2018 Specialist Exam 2 Q3e — one Euler step is a walk along the tangent. From (25, 0.4) the
// slope is dh/dt evaluated at the depth h = 0.4 (the rule depends on h, not t): about 0.006504 m/s,
// so five seconds along the tangent gives 0.4 + 5(0.006504) ≈ 0.4325. The true depth curve
// (solved numerically through (25, 0.4)) bends downward, so the tangent overshoots a little; a
// step-size slider shows the overshoot growing with the step.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const rate = (h: number) => (4 - 5 * Math.sqrt(Math.max(h, 0))) / (25 * Math.PI * (4 * h * h + 1))
const T0 = 25
const H0 = 0.4
const M0 = rate(H0)

// RK4 through (25, 0.4), forwards to t = 65 and backwards to t = 0, on a 0.05 s grid.
const DT = 0.05
const T_MIN = 0
const T_MAX = 65
const table: number[] = (() => {
  const n = Math.round((T_MAX - T_MIN) / DT)
  const out = new Array<number>(n + 1)
  const i0 = Math.round((T0 - T_MIN) / DT)
  out[i0] = H0
  const step = (h: number, d: number) => {
    const k1 = rate(h)
    const k2 = rate(h + (d / 2) * k1)
    const k3 = rate(h + (d / 2) * k2)
    const k4 = rate(h + d * k3)
    return h + (d / 6) * (k1 + 2 * k2 + 2 * k3 + k4)
  }
  for (let i = i0; i < n; i++) out[i + 1] = step(out[i], DT)
  for (let i = i0; i > 0; i--) out[i - 1] = Math.max(0, step(out[i], -DT))
  return out
})()
function trueH(t: number): number {
  const u = (t - T_MIN) / DT
  const i = Math.max(0, Math.min(table.length - 2, Math.floor(u)))
  const f = u - i
  return table[i] * (1 - f) + table[i + 1] * f
}

export default function EulerStep() {
  const [d, setD] = useState(5)
  const [zoomOut, setZoomOut] = useState(false)
  const t1 = T0 + d
  const euler = H0 + d * M0
  const truth = trueH(t1)
  const over = euler - truth

  let notice
  if (Math.abs(d - 5) < 0.01) {
    notice = (
      <Notice tone="good">
        <b>The step the question asks for.</b> The slope comes from the rule at the <b>start</b> of the step, and the rule needs
        the depth, so substitute <M>h = 0.4</M> (not <M>t = 25</M>): <M>{'\\tfrac{dh}{dt} \\approx 0.006504'}</M>. Five
        seconds along the tangent gives <M>{'0.4 + 5(0.006504) \\approx 0.4325'}</M>. The true curve is just below: it bends
        down, so the tangent overshoots slightly. Try a bigger step.
      </Notice>
    )
  } else if (d > 5) {
    notice = (
      <Notice tone="warn">
        With a longer step the tangent keeps the slope it had at <M>h = 0.4</M>, but the real rate keeps falling: the surface
        gets wider and the outflow <M>{'0.05\\sqrt h'}</M> grows. So the overshoot grows with the step, to about{' '}
        <M>{num4(over)}</M> m here. Euler&apos;s method is only as good as &ldquo;the slope stays about the same for one
        step&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        A short step barely leaves the curve, because over a second or two the slope hardly changes. That is the whole idea of
        Euler&apos;s method: <M>{'h_{n+1} = h_n + \\delta \\times \\tfrac{dh}{dt}\\big|_{h_n}'}</M>, one straight-line step at a
        time. Set the step back to <M>5</M>.
      </Notice>
    )
  }

  const xr: [number, number] = zoomOut ? [0, 62] : [20, 42]
  const yr: [number, number] = zoomOut ? [0, 0.72] : [0.37, 0.51]
  return (
    <div>
      <Plane
        x={xr}
        y={yr}
        xStep={zoomOut ? 10 : 5}
        yStep={zoomOut ? 0.1 : 0.02}
        height={320}
        xLabel="t"
        yLabel="h"
        yLabels={v => (zoomOut ? v.toFixed(1) : v.toFixed(2))}
      >
        <Plot.OfX y={trueH} domain={[Math.max(xr[0], 0.05), xr[1]]} color={C.f} weight={3} />
        <Line.Segment point1={[T0, H0]} point2={[t1, euler]} color={C.g} weight={3} />
        <Line.Segment point1={[t1, yr[0]]} point2={[t1, Math.max(euler, truth)]} color={C.guide} style="dashed" weight={1.5} />
        {!zoomOut && (
          <>
            {/* the axes are off-screen when zoomed in, so label the grid directly */}
            <Line.Segment point1={[T0, yr[0]]} point2={[T0, H0]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[T0, yr[0]]} attach="ne" color={C.guide} size={12}>t = 25</Label>
            <Label at={[t1, yr[0]]} attach="ne" color={C.guide} size={12}>{`t = ${t1.toFixed(1).replace(/\.0$/, '')}`}</Label>
            {[0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5].map(v => (
              <Label key={v} at={[xr[0], v]} attach="e" color={C.guide} size={11} bold={false}>{v.toFixed(2)}</Label>
            ))}
          </>
        )}
        <Point x={T0} y={H0} color={C.ink} />
        <Point x={t1} y={truth} color={C.f} />
        <Point x={t1} y={euler} color={C.g} />
        <Label at={[T0, H0]} attach="se">(25, 0.4)</Label>
        <Label at={[t1, euler]} attach="nw" color={C.g}>Euler</Label>
        {!zoomOut && <Label at={[t1, truth]} attach="se" color={C.f}>true</Label>}
      </Plane>
      <Controls>
        <Slider label="\delta" value={d} onChange={setD} min={1} max={15} step={0.5} format={v => `${v.toFixed(1)} s`} />
        <Buttons>
          <Toggle label="Zoom out to t = 0" checked={zoomOut} onChange={setZoomOut} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\tfrac{dh}{dt}\\big|_{h=0.4} = \\tfrac{4-5\\sqrt{0.4}}{25\\pi(4(0.4)^2+1)} \\approx ${M0.toFixed(6)}`} />
          <Readout color={C.g} tex={`\\text{Euler: } 0.4 + ${d.toFixed(1)}(${M0.toFixed(6)}) \\approx ${euler.toFixed(4)}`} />
          <Readout color={C.f} tex={`\\text{true } h(${t1.toFixed(1)}) \\approx ${truth.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}

function num4(v: number): string {
  return v.toFixed(4)
}
