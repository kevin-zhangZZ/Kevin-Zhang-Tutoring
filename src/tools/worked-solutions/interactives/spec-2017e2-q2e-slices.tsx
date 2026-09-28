// 2017 Specialist Exam 2 Q2e — distance fallen is the area under the v–t graph, in two phases.
// Phase 1 is the free-fall triangle (19.6 m). Phase 2 is sliced by SPEED: each strip is a speed
// step Δv (height = the speed mid-step), lasting Δt = Δv/a (part d's integrand), with area v·Δv/a
// (part e's integrand), laid end to end from t = 2, so the
// strips add up to ∫_{19.6}^{30} v/(9.8 − 0.01v²) dv ≈ 100.4 m; total ≈ 120 m. A toggle shades the
// report's error — the model applied from the start — whose area is ∫_0^{30} ≈ 125.3 m.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const G = 9.8
const K = 0.01
const VT = Math.sqrt(G / K) // 14√5
const ALPHA = K * VT
const C0 = Math.atanh(19.6 / VT)

const speed = (t: number) => (t <= 2 ? G * t : VT * Math.tanh(ALPHA * (t - 2) + C0))
const speedWrong = (t: number) => VT * Math.tanh(ALPHA * t)
const accel = (v: number) => G - K * v * v
const timeTo = (V: number) => 2 + (Math.atanh(V / VT) - C0) / ALPHA
/** ∫_{a}^{b} v/(9.8 − 0.01v²) dv = 50 ln((9.8 − 0.01a²)/(9.8 − 0.01b²)). */
const distInt = (a: number, b: number) => 50 * Math.log(accel(a) / accel(b))

const T30 = timeTo(30) // ≈ 5.80
const T30_WRONG = Math.atanh(30 / VT) / ALPHA // ≈ 6.15
const PHASE2 = distInt(19.6, 30) // ≈ 100.4
const WRONG = distInt(0, 30) // ≈ 125.3
const T_MAX = 7

export default function Slices() {
  const [n, setN] = useState(5)
  const [slices, setSlices] = useState(true)
  const [wrong, setWrong] = useState(false)

  const dv = (30 - 19.6) / n
  // Speed steps of Δv from 19.6 to 30. Each strip: height v = the speed in the middle of its
  // step, width Δt = Δv / a(v); laid end to end from t = 2, so the widths add up to (nearly) the
  // 3.80 s of part d and the areas to (nearly) the 100.4 m of the integral.
  let tStart = 2
  const strips = Array.from({ length: n }, (_, k) => {
    const v = 19.6 + (k + 0.5) * dv
    const w = dv / accel(v)
    const t = tStart
    tStart += w
    return { v, t, w, area: v * w }
  })
  const sum = strips.reduce((s, r) => s + r.area, 0)
  const last = strips[n - 1]
  const showSlices = slices && !wrong

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red curve has resistance from the start. It is slower, so it takes longer to reach <M>30</M> m/s (
        <M>{`${num(T30_WRONG, 2)}`}</M> s), and its area is{' '}
        <M>{`\\int_0^{30}\\frac{v}{9.8-0.01v^2}\\,dv \\approx ${num(WRONG, 1)}`}</M> m, not <M>120</M>. The first{' '}
        <M>19.6</M> m were fallen with <M>a = 9.8</M>, not <M>{'9.8 - 0.01v^2'}</M>, so the integral has to start at{' '}
        <M>19.6</M> and the orange triangle is added on separately.
      </Notice>
    )
  } else if (showSlices) {
    notice = (
      <Notice>
        Distance is the area under the <M>v</M>–<M>t</M> graph. For phase 2, slice by <b>speed</b>: the violet strip is
        a speed step <M>{'\\Delta v'}</M> that lasts <M>{'\\Delta t = \\frac{\\Delta v}{a}'}</M> (part d&apos;s
        integrand), so its area is <M>{'v\\,\\Delta t = \\frac{v\\,\\Delta v}{a}'}</M>, which is part e&apos;s integrand.
        The strips widen as <M>a</M> shrinks. Increase <M>n</M> and the sum tends to <M>{num(PHASE2, 1)}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Orange triangle: <M>{'\\tfrac12 \\times 2 \\times 19.6 = 19.6'}</M> m (part a). Sky region:{' '}
        <M>{`\\int_{19.6}^{30}\\frac{v}{9.8-0.01v^2}\\,dv \\approx ${num(PHASE2, 1)}`}</M> m. Together{' '}
        <M>{`\\approx ${num(19.6 + PHASE2, 1)}`}</M>, so <M>120</M> m to the nearest metre. Turn on the red toggle to
        see what integrating from <M>0</M> does.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, T_MAX]} y={[0, 34]} xStep={1} yStep={10} height={310} xLabel="t" yLabel="v">
        {wrong ? (
          <Region top={speedWrong} bottom={() => 0} from={0} to={T30_WRONG} color={C.bad} opacity={0.22} />
        ) : (
          <>
            <Region top={speed} bottom={() => 0} from={0} to={2} color={C.g} opacity={0.3} />
            <Region top={speed} bottom={() => 0} from={2} to={T30} color={C.f} opacity={showSlices ? 0.1 : 0.25} />
          </>
        )}
        {showSlices &&
          strips.map((r, k) => (
            <Polygon
              key={k}
              points={[[r.t, 0], [r.t + r.w, 0], [r.t + r.w, r.v], [r.t, r.v]]}
              color={k === n - 1 ? C.violet : C.f}
              fillOpacity={k === n - 1 ? 0.5 : 0.35}
              weight={1}
            />
          ))}
        <Line.Segment point1={[0, 30]} point2={[T30, 30]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[T30, 0]} point2={[T30, 30]} color={C.guide} style="dashed" weight={1.5} />
        {wrong && <Plot.OfX y={speedWrong} domain={[0, T_MAX]} color={C.bad} weight={2.5} style="dashed" />}
        <Plot.OfX y={speed} domain={[0, 2]} color={C.g} weight={3} />
        <Plot.OfX y={speed} domain={[2, T_MAX]} color={C.f} weight={3} />
        <Point x={T30} y={30} color={C.f} />
        {wrong && <Point x={T30_WRONG} y={30} color={C.bad} />}
        {!wrong && <Label at={[1.35, 4]} attach="c" color={C.g} size={12}>19.6 m</Label>}
        <Label at={[T30, 30]} attach="se" color={C.f} size={12}>(5.80, 30)</Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Slice phase 2 by speed" checked={slices} onChange={setSlices} />
          <Toggle label="What if I integrate from 0?" checked={wrong} onChange={setWrong} />
        </Buttons>
        {showSlices && <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={2} max={30} step={1} format={v => v.toFixed(0)} />}
        <Readouts>
          {showSlices && (
            <>
              <Readout color={C.violet} tex={`\\Delta t = \\tfrac{${num(dv, 2)}}{a(${num(last.v, 2)})} \\approx ${num(last.w, 2)}`} />
              <Readout color={C.violet} tex={`\\text{area} = v\\,\\Delta t \\approx ${num(last.area, 2)}`} />
              <Readout color={C.f} tex={`\\text{sum of ${n} strips} \\approx ${num(sum, 1)}`} />
            </>
          )}
          {!showSlices && !wrong && <Readout color={C.f} tex={`\\int_{19.6}^{30}\\tfrac{v}{9.8-0.01v^2}\\,dv \\approx ${num(PHASE2, 1)}`} />}
          {!wrong && <Readout color={C.g} tex="\text{phase 1} = 19.6" />}
          {wrong ? (
            <Readout color={C.bad} tex={`\\int_{0}^{30}\\tfrac{v}{9.8-0.01v^2}\\,dv \\approx ${num(WRONG, 1)}`} />
          ) : (
            <Readout color={C.good} tex={`19.6 + ${num(PHASE2, 1)} \\approx ${num(19.6 + PHASE2, 1)}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
