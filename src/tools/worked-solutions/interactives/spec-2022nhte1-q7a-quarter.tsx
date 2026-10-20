// 2022 Specialist NHT Exam 1 Q7 — the particle only ever traces one quarter of the hyperbola.
// The whole of x²/16 − y²/4 = 1 is drawn faintly (both branches, equal axes); as t runs over
// [0, π/2) the point r(t) = (4sec(t), 2tan(t)) starts at (4, 0) and moves up and to the right,
// never reaching the other three quarters, because sec(t) ≥ 1 and tan(t) ≥ 0 there. That is why
// part a.'s equation needs x ≥ 4 (and y ≥ 0). The velocity arrow (green, drawn at 0.3 × its true
// size) and the speed readout show part b.: at t = π/6 the velocity is (8/3, 8/3) and the speed
// 8√2/3 ≈ 3.77.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Vector,
  num, usePlayer, type vec,
} from './kit'

const T_MAX = 1.1
const K = 0.3
const X = (t: number) => 4 / Math.cos(t)
const Y = (t: number) => 2 * Math.tan(t)
const dX = (t: number) => (4 * Math.sin(t)) / Math.cos(t) ** 2
const dY = (t: number) => 2 / Math.cos(t) ** 2
const PI6 = Math.PI / 6

export default function QuarterHyperbola() {
  const [t, setT] = useState(PI6)
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 6 })

  const P: vec.Vector2 = [X(t), Y(t)]
  const V: vec.Vector2 = [dX(t), dY(t)]
  const speed = Math.hypot(V[0], V[1])
  const atPi6 = Math.abs(t - PI6) < 0.006

  let notice
  if (t < 0.01) {
    notice = (
      <Notice>
        <b>At <M>t = 0</M> the particle is at <M>(4, 0)</M></b>, the vertex of the right branch, moving straight up:{' '}
        <M>{'\\sec(0)=1'}</M> and <M>{'\\tan(0)=0'}</M>. Press play and watch which parts of the faint hyperbola it never
        visits.
      </Notice>
    )
  } else if (atPi6) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'t=\\tfrac\\pi6'}</M></b> the velocity is <M>{'\\tfrac83\\,\\underset{\\sim}{i}+\\tfrac83\\,\\underset{\\sim}{j}'}</M>,
        so the arrow points at exactly <M>{'45^\\circ'}</M>, and the speed is{' '}
        <M>{'\\sqrt{\\left(\\tfrac83\\right)^2+\\left(\\tfrac83\\right)^2}=\\tfrac{8\\sqrt2}{3}\\approx3.77'}</M> m/s. That is part b.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        For every <M>t</M> in <M>{'\\left[0,\\tfrac\\pi2\\right)'}</M>, <M>{'\\sec(t)\\ge1'}</M> and <M>{'\\tan(t)\\ge0'}</M>, so{' '}
        <M>{'x\\ge4'}</M> and <M>{'y\\ge0'}</M>: the particle stays on the top half of the right branch. The other three
        quarters satisfy the same equation, but the particle never goes there, which is why the answer to part a. states{' '}
        <M>{'x\\ge4'}</M>. As <M>{'t\\to\\tfrac\\pi2'}</M> the particle heads off to infinity, ever faster.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-12, 12]} y={[-6, 6]} xStep={4} yStep={2} equalScale height={340}>
        {/* The whole hyperbola, faint: x = ±4sec(u), y = 2tan(u) for u in (−π/2, π/2). */}
        <Plot.Parametric xy={u => [X(u), Y(u)]} domain={[-1.2, 1.2]} color={C.guide} weight={1.5} opacity={0.6} />
        <Plot.Parametric xy={u => [-X(u), Y(u)]} domain={[-1.2, 1.2]} color={C.guide} weight={1.5} opacity={0.6} />
        {t > 0.002 && <Plot.Parametric xy={u => [X(u), Y(u)]} domain={[0, t]} color={C.f} weight={4} />}
        <Vector tail={P} tip={[P[0] + K * V[0], P[1] + K * V[1]]} color={C.good} weight={2.5} />
        <Point x={4} y={0} color={C.ink} />
        <Label at={[4, 0]} attach="nw">(4, 0)</Label>
        <Point x={P[0]} y={P[1]} color={C.f} />
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={T_MAX}
          step={0.005}
          format={v => v.toFixed(3)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Run t from 0" />
          <ActionButton
            label={<M>{'\\text{Go to } t=\\tfrac\\pi6'}</M>}
            onClick={() => {
              player.stop()
              setT(PI6)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\underset{\\sim}{r}(t) \\approx (${num(P[0])},\\ ${num(P[1])})`} />
          <Readout color={C.good} tex={`\\dot{\\underset{\\sim}{r}}(t) \\approx (${num(V[0])},\\ ${num(V[1])})`} />
          <Readout tex={`\\text{speed} \\approx ${num(speed)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
