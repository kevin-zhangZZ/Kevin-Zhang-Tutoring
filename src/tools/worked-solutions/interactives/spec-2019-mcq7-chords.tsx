// 2019 Specialist Exam 2 MCQ 7 — why the arc-length integrand is √((dx/dt)² + (dy/dt)²). The curve
// x = 3sin(t), y = 4cos(t), 0 ≤ t ≤ π is the right half of an ellipse, cut here into n chords. Each
// chord is the hypotenuse of a right triangle with legs Δx and Δy, so its length is √(Δx² + Δy²) ≈
// √(9cos²t + 16sin²t)·Δt = √(9 + 7sin²t)·Δt, and the chord total climbs to L ≈ 11.05 as n grows
// (n = 2 gives two 3-4-5 hypotenuses, 5 + 5 = 10). A toggle shows option A's slip,
// (−4sin t)² = −16sin²t: its integrand is negative, so has no square root, on the red middle of the curve.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, integrate, num } from './kit'

const X: [number, number] = [-3.5, 4.5]
const Y: [number, number] = [-4.5, 4.5]
const pos = (t: number): [number, number] => [3 * Math.sin(t), 4 * Math.cos(t)]
const speed = (t: number) => Math.sqrt(9 + 7 * Math.sin(t) ** 2)
const L = integrate(speed, 0, Math.PI, 400) // ≈ 11.05
const T1 = Math.atan(3 / 4) // option A's 9cos²t − 16sin²t is negative for T1 < t < π − T1
const T2 = Math.PI - T1
const aInt = (t: number) => 9 * Math.cos(t) ** 2 - 16 * Math.sin(t) ** 2

export default function Chords() {
  const [n, setN] = useState(6)
  const [t, setT] = useState(0.8)
  const [showA, setShowA] = useState(false)

  const dt = Math.PI / n
  const k = Math.min(n - 1, Math.floor(t / dt))
  const pts = Array.from({ length: n + 1 }, (_, i) => pos(i * dt))
  let total = 0
  for (let i = 0; i < n; i++) total += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1])

  const P = pts[k]
  const Q = pts[k + 1]
  const dx = Q[0] - P[0]
  const dy = Q[1] - P[1]
  const chord = Math.hypot(dx, dy)
  const tm = (k + 0.5) * dt
  const approx = speed(tm) * dt
  // Put the right angle outside the ellipse: top-right while x is growing, bottom-right after.
  const rising = tm < Math.PI / 2
  const corner: [number, number] = rising ? [Q[0], P[1]] : [P[0], Q[1]]
  const hLeg: [[number, number], [number, number]] = rising ? [P, corner] : [corner, Q]
  const vLeg: [[number, number], [number, number]] = rising ? [corner, Q] : [P, corner]
  const big = n <= 12

  const onMove = ([px, py]: [number, number]) => {
    let s = Math.atan2(px / 3, py / 4)
    if (s < 0) s = s > -Math.PI / 2 ? 0 : Math.PI
    setT(Math.min(Math.PI - 1e-6, s))
  }

  const aNow = aInt(t)

  let notice
  if (showA) {
    notice = (
      <Notice tone="warn">
        Option A writes <M>{'(-4\\sin t)^2'}</M> as <M>{'-16\\sin^2 t'}</M>. At this point it gives{' '}
        <M>{`9\\cos^2 t - 16\\sin^2 t \\approx ${num(aNow)}`}</M>
        {aNow < 0 ? ', and a negative number has no square root.' : '.'} On the whole red stretch of the curve (
        <M>{'0.64 < t < 2.50'}</M>) A&apos;s integrand is negative, so it cannot be measuring any length. A leg pointing
        down is still a positive length: squaring kills the minus sign.
      </Notice>
    )
  } else if (n === 2) {
    notice = (
      <Notice>
        Two chords: from <M>(0, 4)</M> to <M>(3, 0)</M> and on to <M>(0, -4)</M>. Each is the hypotenuse of a 3-4-5
        triangle, so the total is <M>5 + 5 = 10</M>, already close to <M>{`L \\approx ${num(L)}`}</M>. Drag{' '}
        <M>n</M> up and watch the chords hug the curve.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        This chord has legs <M>{`\\Delta x \\approx ${num(dx)}`}</M> and <M>{`\\Delta y \\approx ${num(dy)}`}</M>.{' '}
        {dy < 0 && (
          <>
            The curve is heading down, so <M>\Delta y</M> is negative, but Pythagoras squares it.{' '}
          </>
        )}
        Dividing each leg by <M>\Delta t</M> gives <M>{'\\tfrac{dx}{dt}'}</M> and <M>{'\\tfrac{dy}{dt}'}</M>, so each
        chord is about <M>{'\\sqrt{(\\tfrac{dx}{dt})^2 + (\\tfrac{dy}{dt})^2}\\,\\Delta t'}</M>. Push <M>n</M> up: the
        chord total closes in on the integral.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={X}
        y={Y}
        equalScale
        height={420}
        xLabels={v => (v > 4.4 || v < -3.4 || v === 3 ? '' : String(v))}
        yLabels={v => (Math.abs(v) === 4 || Math.abs(v) > 4.4 ? '' : String(v))}
      >
        <Plot.Parametric xy={pos} domain={[Math.PI, 2 * Math.PI]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.Parametric xy={pos} domain={[0, Math.PI]} color={C.f} weight={3} />
        {showA && <Plot.Parametric xy={pos} domain={[T1, T2]} color={C.bad} weight={5} />}
        {pts.slice(0, -1).map((p, i) => (
          <Line.Segment key={i} point1={p} point2={pts[i + 1]} color={C.g} weight={i === k ? 4 : 2} />
        ))}
        <Line.Segment point1={hLeg[0]} point2={hLeg[1]} color={C.violet} weight={2.5} />
        <Line.Segment point1={vLeg[0]} point2={vLeg[1]} color={C.violet} weight={2.5} />
        {big && (
          <>
            <Label at={[(hLeg[0][0] + hLeg[1][0]) / 2, hLeg[0][1]]} attach={rising ? 'n' : 's'} color={C.violet}>
              Δx
            </Label>
            <Label at={[vLeg[0][0], (vLeg[0][1] + vLeg[1][1]) / 2]} attach="e" color={C.violet}>
              Δy
            </Label>
          </>
        )}
        {n <= 16 && pts.map((p, i) => <Point key={i} x={p[0]} y={p[1]} color={C.g} />)}
        <Label at={[0, 4]} attach="nw">t = 0</Label>
        <Label at={[0, -4]} attach="sw">t = π</Label>
        <MovablePoint point={pos(t)} onMove={onMove} color={C.f} />
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={2} max={40} step={1} format={v => String(Math.round(v))} />
        <Buttons>
          <Toggle label="Option A: subtract 16 sin²t" checked={showA} onChange={setShowA} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\Delta x \\approx ${num(dx)},\\ \\ \\Delta y \\approx ${num(dy)}`} />
          <Readout color={C.g} tex={`\\text{chord} = \\sqrt{\\Delta x^2 + \\Delta y^2} \\approx ${num(chord, 3)}`} />
          <Readout color={C.f} tex={`\\sqrt{9 + 7\\sin^2 t}\\,\\Delta t \\approx ${num(approx, 3)}`} />
          <Readout color={C.g} tex={`\\text{all ${n} chords} \\approx ${num(total, 3)}`} />
          <Readout color={C.good} tex={`L = \\int_0^{\\pi}\\sqrt{9+7\\sin^2 t}\\,dt \\approx ${num(L, 3)}`} />
          {showA && <Readout color={C.bad} tex={`9\\cos^2 t - 16\\sin^2 t \\approx ${num(aNow)}`} />}
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the blue point along the curve to pick a chord.</p>
        {notice}
      </Controls>
    </div>
  )
}
