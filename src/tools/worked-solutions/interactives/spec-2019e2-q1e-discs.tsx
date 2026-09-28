// 2019 Specialist Exam 2 Q1e — why dy becomes sec²(t) dt. The region between the curve
// x = sec(t) + 1, y = tan(t) (t from 0 to tan⁻¹(2√2) = cos⁻¹(1/3)) and the y-axis is spun about the y-axis, and
// the solid is cut into n horizontal discs, one per equal step Δt. Each disc has radius x and
// thickness Δy — and the discs near the top are much thicker, because a step Δt moves y by about
// (dy/dt)Δt = sec²(t)Δt. The sum π Σ x² Δy approaches π∫(sec t + 1)² sec² t dt ≈ 73.66. A toggle
// shows the slip of swapping the differential straight for dt (the report: most "simply replaced
// dx with dt"), here dy → dt: discs Δt thick only stack up to height tan⁻¹(2√2) ≈ 1.23 instead of
// 2√2, giving ≈ 23.8.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Slider, Toggle, num,
} from './kit'

const X = (t: number) => 1 / Math.cos(t) + 1
const Y = (t: number) => Math.tan(t)
const T = Math.acos(1 / 3)
const H = 2 * Math.SQRT2
const EXACT = Math.PI * ((46 * Math.SQRT2) / 3 + Math.asinh(H)) // 73.66
const RIM = 0.1

type Disc = { y0: number; y1: number; r: number; tm: number }

export default function Discs() {
  const [n, setN] = useState(8)
  const [tSel, setTSel] = useState(1.0)
  const [wrong, setWrong] = useState(false)

  const dt = T / n
  const discs: Disc[] = []
  for (let i = 0; i < n; i++) {
    const a = i * dt
    const b = (i + 1) * dt
    const tm = (a + b) / 2
    discs.push(wrong ? { y0: a, y1: b, r: X(tm), tm } : { y0: Y(a), y1: Y(b), r: X(tm), tm })
  }
  const k = Math.min(n - 1, Math.floor(tSel / dt))
  const sel = discs[k]
  const dyTrue = Y((k + 1) * dt) - Y(k * dt)
  const sec2dt = dt / Math.cos(sel.tm) ** 2
  const sumTrue = Math.PI * discs.reduce((acc, d, i) => acc + d.r * d.r * (Y((i + 1) * dt) - Y(i * dt)), 0)
  const sumWrong = Math.PI * discs.reduce((acc, d) => acc + d.r * d.r * dt, 0)
  const bottomDy = Y(dt)
  const topDy = H - Y(T - dt)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Replacing <M>dy</M> by <M>dt</M> makes every disc just <M>{`\\Delta t = ${num(dt, 3)}`}</M> thick. Stacked up,
        they only reach height <M>{'\\tan^{-1}\\left(2\\sqrt2\\right) \\approx 1.23'}</M> instead of{' '}
        <M>{'2\\sqrt2 \\approx 2.83'}</M>, so the &ldquo;volume&rdquo; is about <M>23.8</M>, not <M>73.7</M>. The
        factor <M>{'\\tfrac{dy}{dt} = \\sec^2 t'}</M> is what stretches each <M>\Delta t</M> into the true thickness.
      </Notice>
    )
  } else if (n >= 30) {
    notice = (
      <Notice tone="good">
        With {n} discs the sum is <M>{num(sumTrue, 2)}</M>, closing in on <M>{num(EXACT, 2)}</M>. In the limit each disc
        contributes <M>{'\\pi x^2\\,dy = \\pi(\\sec t + 1)^2\\sec^2 t\\,dt'}</M>, and the discs run from{' '}
        <M>t = 0</M> at the base to <M>{'t = \\tan^{-1}\\left(2\\sqrt2\\right)'}</M> at the top, which gives the
        terminals. Now turn on the common slip to see what dropping <M>{'\\sec^2 t'}</M> does.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every disc covers the same step <M>\Delta t</M>, yet the top disc is{' '}
        {num(topDy / bottomDy, 1)} times as thick as the bottom one. Because <M>{'y = \\tan t'}</M>, a step{' '}
        <M>\Delta t</M> raises <M>y</M> by about <M>{'\\sec^2(t)\\,\\Delta t'}</M>, and <M>{'\\sec^2 t'}</M> grows
        from <M>1</M> at the base to <M>9</M> at the top. Drag <M>t</M> to compare <M>\Delta y</M> with{' '}
        <M>{'\\sec^2(t)\\,\\Delta t'}</M>, then push <M>n</M> up.
      </Notice>
    )
  }

  const ymid = (sel.y0 + sel.y1) / 2

  return (
    <div>
      <Plane x={[-4.6, 4.6]} y={[-0.35, 3.5]} xStep={1} yStep={1} height={300}>
        {/* the solid's cross-section through the axis, and its rims */}
        <Polygon
          points={[
            ...Array.from({ length: 41 }, (_, i) => [X((T * i) / 40), Y((T * i) / 40)] as [number, number]),
            ...Array.from({ length: 41 }, (_, i) => [-X((T * (40 - i)) / 40), Y((T * (40 - i)) / 40)] as [number, number]),
          ]}
          color={C.f}
          fillOpacity={0.06}
          weight={0}
        />
        <Plot.Parametric xy={th => [4 * Math.cos(th), H + RIM * Math.sin(th)]} domain={[0, 2 * Math.PI]} color={C.guide} weight={1.5} />
        <Plot.Parametric xy={th => [2 * Math.cos(th), RIM * Math.sin(th)]} domain={[0, 2 * Math.PI]} color={C.guide} weight={1.5} />

        {discs.map((d, i) => (
          <Polygon
            key={i}
            points={[[-d.r, d.y0], [d.r, d.y0], [d.r, d.y1], [-d.r, d.y1]]}
            color={i === k ? C.g : wrong ? C.bad : C.f}
            fillOpacity={i === k ? 0.55 : 0.22}
            weight={1}
          />
        ))}

        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, T]} color={C.f} weight={3} />
        <Plot.Parametric xy={s => [-X(s), Y(s)]} domain={[0, T]} color={C.f} weight={2} style="dashed" />
        <Line.Segment point1={[0, -0.35]} point2={[0, 3.5]} color={C.violet} style="dashed" weight={2} />
        <Label at={[0, 3.12]} attach="w" color={C.violet} size={12}>axis</Label>

        <Line.Segment point1={[0, ymid]} point2={[sel.r, ymid]} color={C.ink} weight={2} />
        <Label at={[sel.r / 2, ymid]} attach="n" size={12} gap={4}>x</Label>
        <Label at={[2.02, 0.14]} attach="e" color={C.f} size={12}>t = 0</Label>
        <Label at={[3.0, H + 0.08]} attach="n" color={C.f} size={12}>t = arctan(2√2)</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={3} max={40} step={1} format={v => String(Math.round(v))} />
        <Slider label="t" value={tSel} onChange={setTSel} min={0} max={T - 1e-6} step={0.005} format={v => v.toFixed(2)} />
        <Buttons>
          <Toggle label="Replace dy by dt (the common slip)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\text{radius } x = \\sec t + 1 = ${num(sel.r, 2)}`} />
          <Readout tex={`\\Delta t = ${num(dt, 3)}`} />
          {wrong ? (
            <Readout color={C.bad} tex={`\\text{stack height} = n\\,\\Delta t = ${num(T, 2)}`} />
          ) : (
            <Readout color={C.g} tex={`\\Delta y = ${num(dyTrue, 3)} \\approx \\sec^2(t)\\,\\Delta t = ${num(sec2dt, 3)}`} />
          )}
          {wrong ? (
            <Readout color={C.bad} tex={`\\pi\\sum x^2\\,\\Delta t = ${num(sumWrong, 2)}`} />
          ) : (
            <Readout color={C.f} tex={`\\pi\\sum x^2\\,\\Delta y = ${num(sumTrue, 2)}`} />
          )}
          <Readout color={C.good} tex={`V = ${num(EXACT, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
