// 2017 Specialist Exam 2 Q2d — the time to reach a speed comes in two phases. The v–t graph:
// 2 s of free fall (orange, a = 9.8) up to 19.6 m/s, then the resistance model a = 9.8 − 0.01v²
// (sky). Slide the target speed V: the time splits into 2 s + ∫_{19.6}^{V} dv/(9.8 − 0.01v²),
// which is why the integral starts at 19.6 and why 2 is added (5.80 s at V = 30). A toggle draws
// the report's first error — the model applied from the start, ∫_0^{30} (6.15 s) — as a red curve.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, num } from './kit'

const G = 9.8
const K = 0.01
const VT = Math.sqrt(G / K) // 14√5 ≈ 31.3
const ALPHA = K * VT
const C0 = Math.atanh(19.6 / VT)

/** Actual speed: free fall to t = 2, then dv/dt = 9.8 − 0.01v² from v = 19.6. */
const speed = (t: number) => (t <= 2 ? G * t : VT * Math.tanh(ALPHA * (t - 2) + C0))
/** The report's wrong model: dv/dt = 9.8 − 0.01v² from v = 0 at t = 0. */
const speedWrong = (t: number) => VT * Math.tanh(ALPHA * t)
/** ∫_{19.6}^{V} dv/(9.8 − 0.01v²), the time spent in the resistance phase. */
const phase2 = (V: number) => (Math.atanh(V / VT) - C0) / ALPHA
const timeTo = (V: number) => (V <= 19.6 ? V / G : 2 + phase2(V))
const timeWrong = (V: number) => Math.atanh(V / VT) / ALPHA

const T_MAX = 8
/** The target speed for TeX: 30 rather than 30.0. */
const fv = (V: number) => V.toFixed(1).replace(/\.0$/, '')

export default function TwoPhases() {
  const [V, setV] = useState(30)
  const [wrong, setWrong] = useState(false)

  const inFreeFall = V <= 19.6
  const tV = timeTo(V)
  const tW = timeWrong(V)
  const t2 = inFreeFall ? 0 : phase2(V)
  const show = Math.min(tV, T_MAX)
  const band = 1.4

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red curve uses <M>{'a = 9.8 - 0.01v^2'}</M> from the moment the skydiver leaves the helicopter, but for
        those first 2 s there was <b>no</b> resistance. With less acceleration early on it is always slower, so it
        reaches <M>{`${fv(V)}`}</M> m/s later: <M>{`\\int_0^{${fv(V)}}\\approx ${num(tW, 2)}`}</M> s instead
        of <M>{`${num(tV, 2)}`}</M> s. Integrating from <M>0</M> describes a different skydiver.
      </Notice>
    )
  } else if (inFreeFall) {
    notice = (
      <Notice>
        Below <M>19.6</M> m/s the skydiver is still in free fall: <M>{`t = \\tfrac{${fv(V)}}{9.8} = ${num(tV, 2)}`}</M>{' '}
        s, and the resistance model hasn&apos;t started yet. Drag <M>V</M> past <M>19.6</M> to see the second phase begin.
      </Notice>
    )
  } else if (V > 30.9) {
    notice = (
      <Notice>
        Close to <M>{'14\\sqrt5 \\approx 31.3'}</M> the time shoots up: <M>a</M> is nearly zero, so each extra m/s
        takes longer than the last, and <M>{'14\\sqrt5'}</M> itself is never reached. Bring <M>V</M> back to{' '}
        <M>30</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        The time comes in two pieces. <b>Orange:</b> 2 s of free fall, which ends at <M>19.6</M> m/s. <b>Sky:</b> the
        resistance phase, the only part the integral covers, so it starts at <M>{'v = 19.6'}</M>:{' '}
        <M>{`\\int_{19.6}^{${fv(V)}}\\frac{dv}{9.8-0.01v^2}\\approx ${num(t2, 2)}`}</M>. Stopping there gives only
        the time after 2 s; add the 2. Now turn on the toggle.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, T_MAX]} y={[0, 36]} xStep={1} yStep={10} height={310} xLabel="t" yLabel="v">
        <Line.Segment point1={[0, VT]} point2={[T_MAX, VT]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[T_MAX, VT]} attach="nw" color={C.guide} size={12}>14√5</Label>
        {/* the two phases along the time axis */}
        <Polygon points={[[0, 0], [Math.min(2, tV), 0], [Math.min(2, tV), band], [0, band]]} color={C.g} fillOpacity={0.55} weight={0} />
        {!inFreeFall && (
          <Polygon points={[[2, 0], [show, 0], [show, band], [2, band]]} color={C.f} fillOpacity={0.55} weight={0} />
        )}
        <Label at={[Math.min(2, tV) / 2, band]} attach="n" color={C.g} size={12}>{inFreeFall ? `${num(tV, 2)} s` : '2 s'}</Label>
        {!inFreeFall && (
          <Label at={[(2 + show) / 2, band]} attach="n" color={C.f} size={12}>{`${num(t2, 2)} s`}</Label>
        )}
        <Line.Segment point1={[2, 0]} point2={[2, 19.6]} color={C.guide} style="dashed" weight={1.5} />
        {wrong && <Plot.OfX y={speedWrong} domain={[0, T_MAX]} color={C.bad} weight={2.5} style="dashed" />}
        <Plot.OfX y={speed} domain={[0, 2]} color={C.g} weight={3} />
        <Plot.OfX y={speed} domain={[2, T_MAX]} color={C.f} weight={3} />
        <Label at={[2, 19.6]} attach="se" color={C.g} size={12}>(2, 19.6)</Label>
        {/* the target speed */}
        {tV <= T_MAX && (
          <>
            <Line.Segment point1={[0, V]} point2={[tV, V]} color={C.violet} style="dashed" weight={1.5} />
            <Line.Segment point1={[tV, band]} point2={[tV, V]} color={C.violet} style="dashed" weight={1.5} />
            <Point x={tV} y={V} color={C.violet} />
          </>
        )}
        {wrong && tW <= T_MAX && <Point x={tW} y={V} color={C.bad} />}
      </Plane>
      <Controls>
        <Slider label="V" value={V} onChange={setV} min={5} max={31.2} step={0.1} format={v => v.toFixed(1)} />
        <Toggle label="What if the model applied from the start?" checked={wrong} onChange={setWrong} />
        <Readouts>
          {inFreeFall ? (
            <Readout color={C.g} tex={`t = \\tfrac{V}{9.8} \\approx ${num(tV, 2)}`} />
          ) : (
            <>
              <Readout color={C.g} tex="t_1 = 2" />
              <Readout color={C.f} tex={`t_2 = \\int_{19.6}^{${fv(V)}}\\frac{dv}{9.8-0.01v^2} \\approx ${num(t2, 2)}`} />
              <Readout color={C.violet} tex={`t_1 + t_2 \\approx ${num(tV, 2)}`} />
            </>
          )}
          {wrong && <Readout color={C.bad} tex={`\\int_{0}^{${fv(V)}}\\frac{dv}{9.8-0.01v^2} \\approx ${num(tW, 2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
