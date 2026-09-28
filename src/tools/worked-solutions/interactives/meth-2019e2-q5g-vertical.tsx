// 2019 Methods Exam 2 Q5g — why the tangent to f⁻¹ at x = 1 is vertical, and where tan⁻¹(1/3)
// comes from. Slide P along f(x) = 1 − x³: its mirror P′ in y = x rides along f⁻¹, and P′'s tangent
// is P's tangent reflected, so its gradient is the reciprocal (rise and run swap). At P = (0, 1)
// f is flat, so at P′ = (1, 0), the point of f⁻¹ at x = 1, the tangent is vertical. The toggle then
// adds the tangent to f at x = 1, y = 3 − 3x, with its 3-by-1 right-angled triangle: the angle
// between it and the vertical line x = 1 has tan θ = 1/3.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle } from './kit'

type P2 = [number, number]
const f = (x: number) => 1 - x ** 3
const TH = Math.atan(1 / 3)
const fmt = (v: number) => (Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(2))

// A short piece of the line through `at` with direction (dx, dy), `len` long each way.
function piece(at: P2, dx: number, dy: number, len: number): [P2, P2] {
  const n = Math.hypot(dx, dy)
  return [
    [at[0] - (len * dx) / n, at[1] - (len * dy) / n],
    [at[0] + (len * dx) / n, at[1] + (len * dy) / n],
  ]
}

export default function Vertical() {
  const [p, setP] = useState(0.4)
  const [angle, setAngle] = useState(false)
  const flat = Math.abs(p) < 0.005
  const m = -3 * p * p
  const P: P2 = [p, f(p)]
  const Pm: P2 = [f(p), p]
  const [a1, a2] = piece(P, 1, m, angle ? 0.6 : 0.9)
  const [b1, b2] = piece(Pm, m, 1, 0.9) // the reflected direction: (1, m) → (m, 1)

  let notice
  if (angle) {
    notice = (
      <Notice tone="good">
        Both tangents pass through <M>(1, 0)</M>, because <M>f(1) = 0</M> and <M>{'f^{-1}(1) = 0'}</M>. The green tangent to{' '}
        <M>f</M>, <M>y = 3 - 3x</M>, rises <M>3</M> for every <M>1</M> it goes left, so it makes a right-angled triangle with
        legs <M>3</M> (up the vertical tangent) and <M>1</M> (across). The angle <M>\theta</M> at <M>(1, 0)</M> is opposite
        the <M>1</M> and next to the <M>3</M>: <M>{'\\tan\\theta = \\tfrac13'}</M>, so{' '}
        <M>{'\\theta = \\tan^{-1}\\left(\\tfrac13\\right) \\approx 18.43^\\circ'}</M>. The exact form is the answer.
      </Notice>
    )
  } else if (flat) {
    notice = (
      <Notice tone="good">
        <b>P = (0, 1) is where f is flat</b>: <M>{"f'(0) = 0"}</M>. Its mirror image <M>P&apos; = (1, 0)</M> is the point of{' '}
        <M>{'f^{-1}'}</M> at <M>x = 1</M>, and reflecting a horizontal line in <M>y = x</M> gives a <b>vertical</b> one. So the
        tangent to <M>{'f^{-1}'}</M> at <M>x = 1</M> is the line <M>x = 1</M>. Now turn on &ldquo;Show the angle at x = 1&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Reflecting in <M>y = x</M> swaps rise and run, so the gradient at <M>P&apos;</M> is the <b>reciprocal</b> of the
        gradient at <M>P</M>: <M>{`${m.toFixed(2)} \\to ${fmt(1 / m)}`}</M>. Slide <M>P</M> towards <M>x = 0</M>,
        where the tangent to <M>f</M> flattens out, and watch the tangent at <M>P&apos;</M> stand up.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.2, 3.2]} y={[-1.2, 3.2]} xStep={1} yStep={1} equalScale height={400}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[2.9, 2.9]} color={C.guide} attach="se">y = x</Label>
        <Plot.OfX y={f} domain={[-1.3, 1.28]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [f(t), t]} domain={[-1.28, 1.3]} color={C.g} weight={3} />
        <Label at={[1.2, f(1.2)]} color={C.f} attach="e">f</Label>
        <Label at={[f(-1.15), -1.15]} color={C.g} attach="n">f⁻¹</Label>

        {angle && (
          <>
            <Polygon points={[[1, 0], [1, 3], [0, 3]]} color={C.guide} fillOpacity={0.12} weight={1} />
            <Label at={[1, 1.5]} color={C.ink} attach="e">3</Label>
            <Label at={[0.5, 3]} color={C.ink} attach="n">1</Label>
            <Line.ThroughPoints point1={[0, 3]} point2={[1, 0]} color={C.good} weight={2.5} />
            <Label at={[0.2, 2.4]} color={C.good} attach="w">y = 3 − 3x</Label>
            <Plot.Parametric xy={u => [1 + 0.5 * Math.cos(u), 0.5 * Math.sin(u)]} domain={[Math.PI / 2, Math.PI / 2 + TH]} color={C.violet} weight={2.5} />
            <Label at={[1 + 0.5 * Math.cos(Math.PI / 2 + TH / 2), 0.5 * Math.sin(Math.PI / 2 + TH / 2)]} color={C.violet} attach="n">θ</Label>
          </>
        )}

        <Line.Segment point1={P} point2={[f(p), p]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={a1} point2={a2} color={C.f} weight={2.5} />
        {angle ? (
          <Line.ThroughPoints point1={[1, 0]} point2={[1, 1]} color={C.g} weight={2.5} />
        ) : (
          <Line.Segment point1={b1} point2={b2} color={C.g} weight={2.5} />
        )}
        <Point x={P[0]} y={P[1]} color={C.f} />
        <Point x={Pm[0]} y={Pm[1]} color={C.g} />
        <Label at={P} color={C.f} attach="ne">P</Label>
        <Label at={Pm} color={C.g} attach="ne">P′</Label>
      </Plane>
      <Controls>
        <Slider
          label={'x_P'}
          value={p}
          onChange={v => {
            setAngle(false)
            setP(v)
          }}
          min={-1}
          max={1}
          step={0.01}
        />
        <Toggle
          label="Show the angle at x = 1"
          checked={angle}
          onChange={v => {
            setAngle(v)
            if (v) setP(0)
          }}
        />
        <Readouts>
          <Readout color={C.f} tex={`\\text{gradient at } P = -3x_P^2 = ${m.toFixed(2)}`} />
          <Readout
            color={C.g}
            tex={flat ? `\\text{gradient at } P' \\text{ undefined (vertical)}` : `\\text{gradient at } P' = -\\tfrac{1}{3x_P^2} = ${fmt(1 / m)}`}
          />
          {angle && <Readout color={C.violet} tex={`\\theta = \\tan^{-1}\\left(\\tfrac13\\right) \\approx ${((TH * 180) / Math.PI).toFixed(2)}^\\circ`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
