// 2018 Specialist Exam 2 MCQ 15 — force sets the SLOPE of the velocity–time graph, and the
// distance is the AREA under it. Choose the force P on the 8 kg particle: a = P/8 is the gradient
// of v = 4 + at, the time to reach 20 m/s is T = 16/a, and the shaded trapezium ½(4 + 20)T is the
// distance covered. Only P = 102.4 N makes that area exactly 15 m (a = 12.8, T = 1.25 s). A
// button tries P = 12.8 (option C, the acceleration mistaken for the force): a = 1.6 m s⁻², the
// line barely rises and the particle needs 10 s and 120 m.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider,
} from './kit'

const MASS = 8
const U = 4
const V = 20
const TMAX = 3

export default function ForceSlope() {
  const [P, setP] = useState(60)

  const a = P / MASS
  const T = (V - U) / a
  const dist = ((U + V) / 2) * T
  const tEnd = Math.min(T, TMAX)
  const vel = (t: number) => U + a * t
  const isC = Math.abs(P - 12.8) < 0.15
  const hit = Math.abs(dist - 15) < 0.15
  const col = hit ? C.good : isC ? C.bad : C.f

  let notice
  if (isC) {
    notice = (
      <Notice tone="warn">
        <b>12.8 is the acceleration, not the force.</b> Pushing <M>8</M> kg with <M>12.8</M> N gives only{' '}
        <M>{'a = \\tfrac{12.8}{8} = 1.6\\ \\text{m s}^{-2}'}</M>: the line barely rises, and the particle would need{' '}
        <M>10</M> s and <M>120</M> m to reach <M>{'20\\ \\text{m s}^{-1}'}</M>. On an <M>8</M> kg particle the force must be{' '}
        <M>8</M> times the acceleration.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b>The area is exactly 15.</b> The trapezium is <M>{'\\tfrac12(4 + 20)T'}</M> with <M>{'T = \\tfrac{16}{a}'}</M>,
        which is <M>{'\\tfrac{20^2 - 4^2}{2a}'}</M>: that is where <M>{'v^2 = u^2 + 2as'}</M> comes from. Setting it to{' '}
        <M>15</M> gives the gradient <M>{'a = 12.8'}</M>, and the force that produces it on <M>8</M> kg is{' '}
        <M>{'P = 8 \\times 12.8 = 102.4'}</M> N: option E.
      </Notice>
    )
  } else if (dist > 15) {
    notice = (
      <Notice>
        The force sets the <b>gradient</b> <M>{'a = \\tfrac{P}{8}'}</M>; the shaded <b>area</b> is the distance covered
        while the speed climbs from <M>4</M> to <M>20</M>. At this force the area is{' '}
        <M>{`${dist.toFixed(1)}\\ \\text{m}`}</M>, more than <M>15</M>. Increase <M>P</M>: a steeper line reaches{' '}
        <M>20</M> sooner, so the area shrinks. Then try the option buttons.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Too steep: the speed reaches <M>20</M> after only <M>{`${dist.toFixed(1)}\\ \\text{m}`}</M>. Reduce <M>P</M> until the
        shaded area is exactly <M>15</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, TMAX]} y={[0, 24]} xStep={0.5} yStep={4} height={280} xLabel="t" yLabel="v" xLabels={v => (v > 0 ? String(v) : '')}>
        <Region top={vel} bottom={() => 0} from={0} to={tEnd} color={col} opacity={0.2} />
        <Line.Segment point1={[0, V]} point2={[TMAX, V]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[TMAX, V]} color={C.guide} attach="nw">v = 20</Label>
        {T <= TMAX && (
          <Line.Segment point1={[T, 0]} point2={[T, V]} color={col} style="dashed" weight={1.5} />
        )}
        <Plot.OfX y={vel} domain={[0, tEnd]} color={col} weight={3} />
        <Point x={0} y={U} color={C.f} />
        <Point x={tEnd} y={vel(tEnd)} color={col} />
        <Label at={[tEnd / 2, 2]} color={col} attach="c">
          {T > TMAX ? `area ${dist.toFixed(1)} m, ends at t = ${T.toFixed(1)}` : `area ≈ ${dist.toFixed(1)} m`}
        </Label>
      </Plane>
      <Controls>
        <Slider label="P" value={P} onChange={setP} min={10} max={200} step={0.2} format={v => `${v.toFixed(1)} N`} />
        <Buttons>
          <ActionButton label="Try P = 12.8 (option C)" onClick={() => setP(12.8)} />
          <ActionButton label="Try P = 102.4 (option E)" onClick={() => setP(102.4)} />
        </Buttons>
        <Readouts>
          <Readout tex={`a = \\tfrac{P}{8} = ${a.toFixed(2)}`} color={col} />
          <Readout tex={`T = \\tfrac{20 - 4}{a} = ${T.toFixed(2)}\\ \\text{s}`} />
          <Readout tex={`\\text{distance} = \\tfrac12(4 + 20)T = ${dist.toFixed(1)}\\ \\text{m}`} color={col} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
