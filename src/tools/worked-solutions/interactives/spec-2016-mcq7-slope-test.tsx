// 2016 Specialist Exam 2 MCQ 7 — x = sin t − cos t, y = ½ sin 2t traces the parabola
// y = ½(1 − x²) (since x² = 1 − sin 2t), whose slope is −x = cos t − sin t. Drag t: the point moves
// along the arc, the tangent's slope is shown, and every option is evaluated at that t, so the
// student sees option A match the tangent everywhere while B–D fail (B coincides where sin t = 0,
// D where t = π/4, 5π/4 — the slider snaps to multiples of π/4 so these can be reached). A toggle
// draws option E's line: E is what the sign slip dx/dt = cos t − sin t gives, and it simplifies to
// cos t + sin t (option B), so it cuts across the curve instead of touching it.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const L = 0.55 // half-length of each drawn line

function seg(px: number, py: number, m: number): [[number, number], [number, number]] {
  const d = Math.hypot(1, m)
  return [
    [px - L / d, py - (L * m) / d],
    [px + L / d, py + (L * m) / d],
  ]
}

const fmt = (v: number) => (Number.isFinite(v) && Math.abs(v) < 1e6 ? num(v, 3) : '\\text{undefined}')

export default function SlopeTest() {
  const [t, setRawT] = useState(Math.PI / 6)
  const [showE, setShowE] = useState(false)
  // snap to multiples of π/4 so the special values (t = π/4, π, ...) can actually be reached
  const setT = (v: number) => {
    const q = Math.PI / 4
    const k = Math.round(v / q)
    setRawT(Math.abs(v - k * q) < 0.011 ? k * q : v)
  }

  const s = Math.sin(t)
  const c = Math.cos(t)
  const px = s - c
  const py = Math.sin(2 * t) / 2
  const slope = c - s
  const dxdt = c + s
  const turning = Math.abs(dxdt) < 0.03
  const small = (v: number) => Math.abs(v) < 1e-3

  const opts: [string, number][] = [
    ['A', c - s],
    ['B', c + s],
    ['C', small(c) || small(s) ? NaN : 1 / c + 1 / s],
    ['D', small(c) || small(s) ? NaN : 1 / c - 1 / s],
    ['E', small(c - s) ? NaN : Math.cos(2 * t) / (c - s)],
  ]
  const matches = (v: number) => Number.isFinite(v) && Math.abs(v - slope) < 0.005

  const [t1, t2] = seg(px, py, slope)
  const [e1, e2] = seg(px, py, c + s)

  let notice
  if (turning) {
    notice = (
      <Notice>
        Here <M>{'\\tfrac{dx}{dt} = 0'}</M>: the point reaches the end of the arc at <M>{'x = \\pm\\sqrt2'}</M> and turns
        back. The formula <M>{'\\tfrac{dy/dt}{dx/dt}'}</M> gives <M>{'\\tfrac00'}</M> here, which is why the cancelled
        form is only claimed where <M>{'\\cos(t) + \\sin(t) \\neq 0'}</M>.
      </Notice>
    )
  } else if (showE) {
    notice = (
      <Notice tone="warn">
        <b>The red line is option E.</b> Using <M>{'\\tfrac{dx}{dt} = \\cos(t) - \\sin(t)'}</M> (the sign slip) gives{' '}
        <M>{'\\tfrac{\\cos(2t)}{\\cos(t) - \\sin(t)}'}</M>, which cancels to <M>{'\\cos(t) + \\sin(t)'}</M>, the same as
        option B. Drag <M>t</M>: the red line cuts across the parabola instead of touching it (except at{' '}
        <M>{'t = 0, \\pi'}</M>, where <M>{'\\sin(t) = 0'}</M> and the two slopes agree).
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Squaring <M>x</M> gives <M>{'x^2 = 1 - \\sin(2t) = 1 - 2y'}</M>, so the point always lies on{' '}
        <M>{'y = \\tfrac12(1 - x^2)'}</M>, whose slope is <M>{'-x = \\cos(t) - \\sin(t)'}</M>. Drag <M>t</M>: only option
        A matches the tangent at every point. (B and E also match at <M>{'t = 0, \\pi'}</M>, where{' '}
        <M>{'\\sin(t) = 0'}</M>, and D at <M>{'t = \\tfrac{\\pi}{4}, \\tfrac{5\\pi}{4}'}</M>, so test two values of{' '}
        <M>t</M>, not one.) Then turn on option E&apos;s line.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.6, 1.6]} y={[-0.8, 0.8]} xStep={0.5} yStep={0.5} equalScale minHeight={190}>
        <Plot.OfX y={x => (1 - x * x) / 2} domain={[-Math.SQRT2, Math.SQRT2]} color={C.f} weight={3} />
        <Label at={[0.8, (1 - 0.64) / 2]} attach="ne" color={C.f}>y = ½(1 − x²)</Label>
        <Line.Segment point1={t1} point2={t2} color={C.g} weight={3} />
        {showE && !turning && <Line.Segment point1={e1} point2={e2} color={C.bad} weight={2.5} style="dashed" />}
        <Point x={px} y={py} color={C.violet} />
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={2 * Math.PI} step={0.01} />
        <Buttons>
          <Toggle label="Show option E's line" checked={showE} onChange={setShowE} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`(x, y) = (${num(px, 3)},\\ ${num(py, 3)})`} />
          <Readout color={C.g} tex={`\\text{tangent slope} = ${num(slope, 3)}`} />
        </Readouts>
        <Readouts>
          {opts.map(([k, v]) => (
            <Readout
              key={k}
              color={matches(v) ? C.good : k === 'E' && showE ? C.bad : undefined}
              tex={`\\text{${k}}: ${fmt(v)}${matches(v) ? '\\ \\checkmark' : ''}`}
            />
          ))}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
