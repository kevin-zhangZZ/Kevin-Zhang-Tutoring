// 2018 Specialist Exam 2 MCQ 7 — arc length is a sum of tiny hypotenuses. The figure-eight
// x = sin(2t), y = 2cos(t), 0 ≤ t ≤ 2π is approximated by n straight chords. One chord (the one
// containing the chosen t) is drawn with its Δx and Δy legs: its length √(Δx² + Δy²) is almost
// exactly √(x′(t)² + y′(t)²)·Δt, so as n grows the chord total climbs to the integral ≈ 12.19.
// A toggle draws what dx/dt = cos(2t) (the forgotten chain-rule 2) really measures: the narrower
// curve x = ½sin(2t), y = 2cos(t), whose length is ≈ 9.51 — option B.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polyline, Readout, Readouts, Slider, Toggle,
  integrate,
} from './kit'

const TWO_PI = 2 * Math.PI
const X = (t: number) => Math.sin(2 * t)
const Y = (t: number) => 2 * Math.cos(t)
const dX = (t: number) => 2 * Math.cos(2 * t)
const dY = (t: number) => -2 * Math.sin(t)
const speed = (t: number) => Math.hypot(dX(t), dY(t))
const LENGTH = integrate(speed, 0, TWO_PI, 4000) // 12.1944
const WRONG = integrate(t => Math.hypot(Math.cos(2 * t), 2 * Math.sin(t)), 0, TWO_PI, 4000) // 9.5076

export default function Chords() {
  const [n, setN] = useState(8)
  const [t, setT] = useState(0.5)
  const [wrong, setWrong] = useState(false)

  const dt = TWO_PI / n
  const pts: [number, number][] = Array.from({ length: n + 1 }, (_, i) => [X(i * dt), Y(i * dt)])
  let total = 0
  for (let i = 0; i < n; i++) total += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1])

  const k = Math.min(n - 1, Math.floor(t / dt))
  const [p, q] = [pts[k], pts[k + 1]]
  const ddx = q[0] - p[0]
  const ddy = q[1] - p[1]
  const chord = Math.hypot(ddx, ddy)
  const tm = (k + 0.5) * dt
  const approx = speed(tm) * dt
  const corner: [number, number] = [q[0], p[1]]
  const big = chord > 0.45

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red dashed curve is <M>{'x = \\tfrac12\\sin(2t),\\ y = 2\\cos(t)'}</M>, whose derivative really is{' '}
        <M>{'\\tfrac{dx}{dt} = \\cos(2t).'}</M> So dropping the chain-rule <M>2</M> doesn&apos;t give a rough length
        for our curve. It gives the exact length of this narrower one, <M>{`\\approx ${WRONG.toFixed(2)}`}</M>, which is
        option <b>B</b>.
      </Notice>
    )
  } else if (n < 16) {
    notice = (
      <Notice>
        With <M>{`${n}`}</M> chords the total is <M>{total.toFixed(2)}</M>, short of <M>{LENGTH.toFixed(2)}</M>: each
        straight chord cuts across a bend of the figure-eight. Look at the two readouts for the orange chord. The
        hypotenuse and <M>{"\\sqrt{x'(t)^2+y'(t)^2}\\,\\Delta t"}</M> don&apos;t quite agree yet. Push <M>n</M> up.
      </Notice>
    )
  } else if (n < 40) {
    notice = (
      <Notice>
        Each chord is <M>{'\\sqrt{\\Delta x^2+\\Delta y^2}'}</M>, which is the same as{' '}
        <M>{'\\sqrt{\\left(\\tfrac{\\Delta x}{\\Delta t}\\right)^2+\\left(\\tfrac{\\Delta y}{\\Delta t}\\right)^2}\\,\\Delta t'}</M>.
        For short chords, <M>{'\\tfrac{\\Delta x}{\\Delta t}'}</M> is almost <M>{"x'(t)"}</M>, so the two chord readouts
        now nearly match. Keep going to <M>n = 60</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>{`${n}`}</M> chords give <M>{total.toFixed(3)}</M>, within <M>{(LENGTH - total).toFixed(3)}</M> of the
        integral. As <M>{'\\Delta t \\to 0'}</M> the sum of <M>{"\\sqrt{x'(t)^2+y'(t)^2}\\,\\Delta t"}</M> becomes{' '}
        <M>{"\\int_0^{2\\pi}\\sqrt{x'(t)^2+y'(t)^2}\\,dt"}</M>. That&apos;s the whole arc-length formula. Now turn on
        the toggle to see what forgetting a <M>2</M> does.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.6, 1.6]} y={[-2.4, 2.4]} equalScale height={420} xStep={1} yStep={1}>
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, TWO_PI]} color={C.f} weight={2.5} opacity={0.55} />
        {wrong && (
          <Plot.Parametric xy={s => [0.5 * X(s), Y(s)]} domain={[0, TWO_PI]} color={C.bad} weight={2.5} style="dashed" />
        )}
        <Polyline points={pts} color={C.violet} weight={2} fillOpacity={0} />
        {pts.slice(0, n).map((pt, i) => (
          <Point key={i} x={pt[0]} y={pt[1]} color={C.violet} />
        ))}
        <Line.Segment point1={p} point2={corner} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={corner} point2={q} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={p} point2={q} color={C.g} weight={4} />
        {big && (
          <>
            <Label at={[(p[0] + q[0]) / 2, p[1]]} attach={ddy < 0 ? 'n' : 's'} color={C.guide} size={12}>
              Δx
            </Label>
            <Label at={[q[0], (p[1] + q[1]) / 2]} attach={ddx > 0 ? 'e' : 'w'} color={C.guide} size={12}>
              Δy
            </Label>
          </>
        )}
        <Point x={X(t)} y={Y(t)} color={C.g} />
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={4} max={60} step={1} format={v => `${Math.round(v)} chords`} />
        <Slider label="t" value={t} onChange={setT} min={0} max={TWO_PI - 0.001} step={0.01} />
        <Buttons>
          <Toggle label={<>Forget the chain-rule 2: use <M>{'\\tfrac{dx}{dt}=\\cos(2t)'}</M></>} checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\sqrt{\\Delta x^2+\\Delta y^2} = ${chord.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\sqrt{x'(t)^2+y'(t)^2}\\,\\Delta t \\approx ${approx.toFixed(3)}`} />
          <Readout color={C.violet} tex={`\\text{all ${n} chords} = ${total.toFixed(3)}`} />
          <Readout color={C.f} tex={`\\text{integral} \\approx ${LENGTH.toFixed(3)}`} />
          {wrong && <Readout color={C.bad} tex={`\\int_0^{2\\pi}\\!\\sqrt{\\cos^2(2t)+4\\sin^2(t)}\\,dt \\approx ${WRONG.toFixed(2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
