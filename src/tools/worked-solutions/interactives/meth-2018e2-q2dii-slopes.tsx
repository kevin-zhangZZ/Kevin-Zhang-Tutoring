// 2018 Methods Exam 2 Q2d(ii) — why the total b(t) + b(t − 6) peaks at t ≈ 7.78, BEFORE Tablet 2's
// own peak at 2.15 + 6 = 8.15. Slide t along [6, 12] with a tangent on each dashed curve and on the
// total: the total's gradient is b'(t) + b'(t − 6), Tablet 2's rise plus Tablet 1's (negative) fall.
// The maximum is where the rise exactly cancels the fall (both 26.60 mg/h). A toggle tests the
// tempting idea "the peak is just the one-tablet peak shifted 6 hours" (close to the report's "t = 8") — at t = 8.15
// Tablet 2 is flat but Tablet 1 is still falling, so the total is already going down.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num, tick,
} from './kit'

const A = 4500 / 7
const b = (t: number) => (t < 0 ? 0 : A * (Math.exp(-t / 5) - Math.exp(-0.9 * t)))
const db = (t: number) => (t < 0 ? 0 : A * (-0.2 * Math.exp(-t / 5) + 0.9 * Math.exp(-0.9 * t)))
const total = (t: number) => b(t) + b(t - 6)
const T_MAX = 7.779002
const T_SHIFT = 6 + (10 / 7) * Math.log(4.5)
const H = 0.45 // half-width, in hours, of each tangent segment
const AX = 4.6 // where the stand-in y-axis is drawn

export default function Slopes() {
  const [t, setT] = useState(7)
  const [shift, setShift] = useState(false)

  const s1 = db(t)
  const s2 = db(t - 6)
  const sum = s1 + s2
  const atMax = Math.abs(t - T_MAX) < 0.015
  const totColor = atMax ? C.good : C.f
  const tangent = (f: (x: number) => number, slope: number, color: string, w = 2.5) => (
    <Line.Segment
      point1={[t - H, f(t) - H * slope]}
      point2={[t + H, f(t) + H * slope]}
      color={color}
      weight={w}
    />
  )

  let notice
  if (atMax) {
    notice = (
      <Notice tone="good">
        <b>The slopes cancel.</b> Tablet 2 is rising at <M>{`${num(s2, 2)}`}</M> mg/h and Tablet 1 is falling at{' '}
        <M>{`${num(-s1, 2)}`}</M> mg/h, so the total&apos;s gradient <M>{"b'(t)+b'(t-6)"}</M> is <M>\approx 0</M>. This is the
        maximum: <M>{`${num(total(T_MAX), 2)}`}</M> mg at <M>t\approx7.78</M>.
      </Notice>
    )
  } else if (shift) {
    notice = (
      <Notice tone="warn">
        Tablet 2&apos;s own peak is at <M>{'\\tfrac{10}{7}\\log_e\\!\\left(\\tfrac92\\right)+6\\approx8.15'}</M>, where its
        slope is <M>0</M>. But Tablet 1 is still falling there at <M>{`${num(-db(T_SHIFT), 2)}`}</M> mg/h, so the
        total is already going <b>down</b>: <M>{`${num(total(T_SHIFT), 2)}`}</M> mg, less than the true maximum. Drag{' '}
        <M>t</M> back to where the slopes balance.
      </Notice>
    )
  } else if (t < T_MAX) {
    notice = (
      <Notice>
        Tablet 2 is rising faster (<M>{`${num(s2, 1)}`}</M>) than Tablet 1 is falling (<M>{`${num(s1, 1)}`}</M>), so the
        total climbs. Drag <M>t</M> right until the two slopes are equal and opposite.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now Tablet 1&apos;s fall (<M>{`${num(s1, 1)}`}</M>) outweighs Tablet 2&apos;s {s2 > 0 ? 'rise' : 'change'} (
        <M>{`${num(s2, 1)}`}</M>), so the total is falling. The peak is behind you, where the slopes cancelled.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[4, 12.5]} y={[0, 520]} xStep={1} yStep={100} height={320} xLabel="t" yLabel="" xLabels={v => (v < 5 || v > 12 ? '' : tick(v))}>
        {/* The plane starts at t = 4, so its own y-axis (t = 0) is off-screen: draw a stand-in at t = 4.6. */}
        <Line.Segment point1={[AX, 0]} point2={[AX, 520]} color={C.guide} weight={1.5} />
        {[100, 200, 300, 400, 500].map(v => (
          <Label key={v} at={[AX, v]} color={C.guide} attach="w" size={11} gap={4} bold={false}>{v}</Label>
        ))}
        <Label at={[AX, 520]} color={C.guide} attach="e" size={12} italic>y</Label>
        <Plot.OfX y={b} domain={[AX, 12]} color={C.violet} weight={2} style="dashed" />
        <Plot.OfX y={x => b(x - 6)} domain={[6, 12]} color={C.g} weight={2} style="dashed" />
        <Plot.OfX y={total} domain={[AX, 12]} color={C.f} weight={3} />
        {shift && (
          <>
            <Line.Segment point1={[T_SHIFT, 0]} point2={[T_SHIFT, total(T_SHIFT)]} color={C.bad} weight={2} style="dashed" />
            <Point x={T_SHIFT} y={b(T_SHIFT - 6)} color={C.bad} />
            <Point x={T_SHIFT} y={total(T_SHIFT)} color={C.bad} />
            <Label at={[T_SHIFT, 30]} color={C.bad} attach="e">t = 8.15</Label>
          </>
        )}
        {tangent(b, s1, C.violet)}
        {t > 6 && tangent(x => b(x - 6), s2, C.g)}
        {tangent(total, sum, totColor, 3.5)}
        <Point x={t} y={b(t)} color={C.violet} />
        <Point x={t} y={b(t - 6)} color={C.g} />
        <Point x={t} y={total(t)} color={totColor} />
        <Label at={[11.2, total(11.2)]} color={C.f} attach="ne">total</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={6} max={12} step={0.01} />
        <Buttons>
          <ActionButton label="Jump to the maximum" onClick={() => setT(T_MAX)} />
          <Toggle label="Just shift the one-tablet peak by 6 hours?" checked={shift} onChange={setShift} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`b'(t) = ${num(s1, 2)}`} />
          <Readout color={C.g} tex={`b'(t-6) = ${num(s2, 2)}`} />
          <Readout color={totColor} tex={`\\text{total gradient} = ${num(sum, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
