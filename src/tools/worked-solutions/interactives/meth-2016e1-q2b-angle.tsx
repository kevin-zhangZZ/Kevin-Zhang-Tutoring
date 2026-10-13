// 2016 Methods Exam 1 Q2b — turning a negative gradient into an anticlockwise angle. The tangent to
// f(x) = √(1 − 2x) at x = a has gradient −1/√(1 − 2a) and meets the x-axis at x = 1 − a. At that
// point the arc from the positive x-direction anticlockwise up to the tangent is θ (violet); the
// small leftover angle to the negative x-axis is the reference angle (green), so θ = 180° − ref.
// A toggle shows the calculator's tan⁻¹(m), a negative angle measured clockwise (red) — the answer
// the question did not ask for. Starts at a = −1, where θ = 150° = 5π/6.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const DEG = 180 / Math.PI
const f = (x: number) => Math.sqrt(Math.max(0, 1 - 2 * x))
const fd = (x: number) => -1 / Math.sqrt(1 - 2 * x)

export default function TangentAngle() {
  const [a, setA] = useState(-1)
  const [calc, setCalc] = useState(false)
  const m = fd(a)
  const ref = Math.atan(-m) // reference angle, radians, in (0, π/2)
  const theta = Math.PI - ref
  const X = 1 - a // x-intercept of the tangent
  const atMinus1 = Math.abs(a + 1) < 0.005
  const r1 = 0.6
  const r2 = 0.9
  const mid = (theta + Math.PI) / 2
  const arc = (r: number, from: number, to: number, color: string) => (
    <Plot.Parametric xy={s => [X + r * Math.cos(s), r * Math.sin(s)]} domain={[from, to]} color={color} weight={3} />
  )

  let notice
  if (calc) {
    notice = (
      <Notice tone="warn">
        The calculator&apos;s <M>{'\\tan^{-1}(m)'}</M> is always between <M>-90^\circ</M> and <M>90^\circ</M>. For a
        negative gradient it gives a <b>negative</b> angle, measured <b>clockwise</b> (red arc). The question asks for the
        anticlockwise angle, the violet one: add <M>180^\circ</M>.
      </Notice>
    )
  } else if (atMinus1) {
    notice = (
      <Notice tone="good">
        At <M>x=-1</M>: <M>{'m=-\\tfrac{1}{\\sqrt3}'}</M>, so the reference angle is <M>{'30^\\circ'}</M> (green) and{' '}
        <M>{'\\theta=180^\\circ-30^\\circ=150^\\circ=\\tfrac{5\\pi}{6}'}</M> (violet), both measured where the tangent crosses the <M>x</M>-axis (here <M>x=2</M>). Now turn on &ldquo;What{' '}
        <M>{'\\tan^{-1}'}</M> gives&rdquo;.
      </Notice>
    )
  } else if (a > 0) {
    notice = (
      <Notice>
        Near the endpoint <M>{'x=\\tfrac12'}</M> the tangent is steep, so <M>\theta</M> drops towards <M>90^\circ</M>.
        It is still obtuse: every tangent to this graph slopes downhill.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Move <M>x</M>: the gradient is always negative, so <M>\theta</M> is always between <M>90^\circ</M> and{' '}
        <M>180^\circ</M>. The flatter the tangent, the closer <M>\theta</M> gets to <M>180^\circ</M>. Violet plus
        green always makes a straight angle.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 4.4]} y={[-1.2, 2.8]} equalScale height={340}>
        <Plot.OfX y={f} domain={[-3, 0.5]} color={C.f} weight={3} />
        <Line.PointSlope point={[a, f(a)]} slope={m} color={C.g} weight={2} opacity={0.9} />
        {arc(r1, 0, theta, C.violet)}
        {arc(r2, theta, Math.PI, C.good)}
        {calc && arc(r1 * 0.75, -ref, 0, C.bad)}
        <Point x={a} y={f(a)} color={C.f} />
        <Point x={X} y={0} color={C.ink} />
        <Label at={[X + r1 * Math.cos(theta / 2), r1 * Math.sin(theta / 2)]} color={C.violet} attach="ne" size={13}>
          {`θ = ${(theta * DEG).toFixed(0)}°`}
        </Label>
        <Label at={[X + (r2 + 0.05) * Math.cos(mid), (r2 + 0.05) * Math.sin(mid)]} color={C.good} attach="w" size={12}>
          {`${(ref * DEG).toFixed(0)}°`}
        </Label>
        {calc && (
          <Label at={[X + r1 * 0.75, -0.25]} color={C.bad} attach="se" size={12}>
            {`${(-ref * DEG).toFixed(0)}°`}
          </Label>
        )}
        <Label at={[-2.6, f(-2.6)]} color={C.f} attach="n">f</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={a} onChange={setA} min={-2.5} max={0.3} step={0.01} format={v => v.toFixed(2)} />
        <Buttons>
          <ActionButton label="x = −1" onClick={() => setA(-1)} />
          <Toggle label={<>What <M>{'\\tan^{-1}'}</M> gives</>} checked={calc} onChange={setCalc} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`m = f'(${a.toFixed(2)}) = ${m.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\text{reference angle} = \\tan^{-1}|m| = ${(ref * DEG).toFixed(1)}^\\circ`} />
          <Readout color={C.violet} tex={`\\theta = 180^\\circ - ${(ref * DEG).toFixed(1)}^\\circ = ${(theta * DEG).toFixed(1)}^\\circ`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
