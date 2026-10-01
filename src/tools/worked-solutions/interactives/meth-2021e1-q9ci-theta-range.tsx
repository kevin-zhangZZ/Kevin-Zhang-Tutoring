// 2021 Methods Exam 1 Q9c.i — where the domain of g comes from. Drag q through (0, 1]: P′ is the
// intersection of h(x) = (q/√3)(2 − x) with the unit circle nearer A, at
// x = (2q² + 3√(1 − q²))/(3 + q²) (sympy), so P′ = (cos θ, sin θ) and the shaded triangle OAP′ has
// base OA = 2 and height sin θ, area sin θ. As q → 0⁺, P′ slides down to (1, 0) and θ → 0
// (never reached); at q = 1, h is the original tangent, P′ = P and θ = π/3. Every P′ lies on the
// green arc — the domain (0, π/3] that the report says very few students stated.

import { useState } from 'react'
import {
  C, Circle, Controls, tick, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Slider, num,
  usePlayer,
} from './kit'

const R3 = Math.sqrt(3)
const A: [number, number] = [2, 0]
const Q_MIN = 0.01

/** P′, the intersection of h with the unit circle nearer A (0 < q ≤ 1). */
function pPrime(q: number): [number, number] {
  const x = (2 * q * q + 3 * Math.sqrt(Math.max(0, 1 - q * q))) / (3 + q * q)
  return [x, (q * (2 - x)) / R3]
}

export default function ThetaRange() {
  const [raw, setRaw] = useState(0.8)
  const player = usePlayer(setRaw, { min: Q_MIN, max: 1, seconds: 6 })

  const atOne = raw > 0.997
  const q = atOne ? 1 : raw
  const P: [number, number] = atOne ? [0.5, R3 / 2] : pPrime(q)
  const th = atOne ? Math.PI / 3 : Math.atan2(P[1], P[0])
  const arcR = 0.28
  const mid = th / 2

  let notice
  if (atOne) {
    notice = (
      <Notice tone="good">
        <b>At <M>q = 1</M>, <M>h</M> is the original tangent, so <M>P&apos; = P</M> and <M>{'\\theta = \\tfrac\\pi3'}</M>.</b>{' '}
        <M>q</M> can&apos;t go past <M>1</M> (part b.i), so <M>\theta</M> can&apos;t pass <M>{'\\tfrac\\pi3'}</M>; and
        because <M>q = 1</M> is allowed, <M>{'\\tfrac\\pi3'}</M> is included. Together with the open end at <M>0</M>:{' '}
        <M>{'g:\\left(0,\\tfrac\\pi3\\right]\\to R,\\ g(\\theta)=\\sin(\\theta)'}</M>.
      </Notice>
    )
  } else if (q < 0.12) {
    notice = (
      <Notice>
        <b>As <M>{'q\\to0^+'}</M> the line flattens toward the <M>x</M>-axis</b> and <M>P&apos;</M> slides down to{' '}
        <M>(1, 0)</M>, so <M>{'\\theta\\to0'}</M> and the triangle collapses. But <M>q = 0</M> is not allowed, so{' '}
        <M>\theta</M> never actually reaches <M>0</M>: the domain is open at <M>0</M>. Now drag <M>q</M> all the way to{' '}
        <M>1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The triangle&apos;s base is <M>OA = 2</M> and its height is the <M>y</M>-coordinate of <M>P&apos;</M>, which is{' '}
        <M>\sin\theta</M>; so the area is <M>{'\\tfrac12\\times2\\times\\sin\\theta=\\sin\\theta'}</M>. Every possible{' '}
        <M>P&apos;</M> lies on the <b>green arc</b>. Drag <M>q</M> to both ends of its range, <M>{'q\\to0^+'}</M> and{' '}
        <M>q = 1</M>, to see where <M>\theta</M> starts and stops.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.2, 2.2]} y={[-0.3, 1.3]} xStep={0.5} yStep={0.5} equalScale height={320} xLabels={v => (v < -1.25 || v > 2.2 ? '' : tick(v))} yLabels={v => (v > 1.1 ? '' : tick(v))}>
        <Circle center={[0, 0]} radius={1} color={C.f} fillOpacity={0.04} weight={2} />
        <Plot.Parametric xy={t => [Math.cos(t), Math.sin(t)]} domain={[0, Math.PI / 3]} color={C.good} weight={6} />
        <Point x={1} y={0} color={C.good} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: C.good, strokeWidth: 2.5 } }} />
        <Point x={0.5} y={R3 / 2} color={C.good} svgCircleProps={{ r: 5 }} />
        <Line.ThroughPoints point1={A} point2={[0, 2 / R3]} color={C.guide} style="dashed" weight={1.5} />
        <Polygon points={[[0, 0], A, P]} color={C.violet} fillOpacity={0.25} weight={2} />
        <Line.ThroughPoints point1={A} point2={[0, (2 * q) / R3]} color={C.g} weight={3} />
        <Line.Segment point1={P} point2={[P[0], 0]} color={C.violet} style="dashed" weight={2} />
        {P[1] > 0.3 && (
          <Label at={[P[0], P[1] / 2]} color={C.violet} attach="e" size={12}>
            sin θ
          </Label>
        )}
        <Plot.Parametric xy={t => [arcR * Math.cos(t), arcR * Math.sin(t)]} domain={[0, th]} color={C.ink} weight={1.5} />
        <Label at={[(arcR + 0.02) * Math.cos(mid), (arcR + 0.02) * Math.sin(mid)]} attach="e" size={12}>
          θ
        </Label>
        <Point x={P[0]} y={P[1]} color={C.g} svgCircleProps={{ r: 6 }} />
        <Label at={P} color={C.g} attach="ne">P′</Label>
        <Point x={A[0]} y={A[1]} color={C.ink} />
        <Label at={A} attach="ne">A</Label>
      </Plane>
      <Controls>
        <Slider
          label="q"
          value={raw}
          onChange={v => {
            player.stop()
            setRaw(v)
          }}
          min={Q_MIN}
          max={1}
          step={0.005}
          format={v => (v > 0.997 ? '1' : v.toFixed(3))}
        />
        <PlayButton playing={player.playing} onClick={() => player.toggle(raw)} label="Sweep q from 0 to 1" />
        <Readouts>
          <Readout color={C.g} tex={`P' \\approx (${num(P[0], 3)},\\ ${num(P[1], 3)})`} />
          <Readout tex={atOne ? '\\theta = \\tfrac\\pi3 \\approx 1.047' : `\\theta \\approx ${num(th, 3)}`} />
          <Readout color={C.violet} tex={`\\text{area} = \\sin\\theta \\approx ${num(Math.sin(th), 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
