// 2019 Specialist Exam 2 MCQ 16 — why the acceleration is v·dv/dx and not dv/dx (option C). The
// graph is v = eˣ sin(x) against position x. From the chosen point, the purple run is the distance
// the particle covers in the next 0.1 s (Δx = v × 0.1) and the orange rise is how much the tangent
// says v changes over that run (Δv = dv/dx × Δx). So the gain per second is Δv ÷ 0.1 = v·dv/dx.
// dv/dx alone is the gain per METRE. Near x = π the slope is steepest (≈ −e^π ≈ −23) but v ≈ 0,
// so the particle hardly moves and a ≈ 0. A toggle draws the 0.1-metre triangle (what option C
// measures) for comparison.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Readout, Readouts, Slider, Toggle, clamp, tick,
} from './kit'

type V2 = [number, number]
const v = (x: number) => Math.exp(x) * Math.sin(x)
const dv = (x: number) => Math.exp(x) * (Math.sin(x) + Math.cos(x))
const DT = 0.1
const X_MIN = 0.2
const X_MAX = 3.135
const PEAK = (3 * Math.PI) / 4

export default function PerSecond() {
  const [x0, setX0] = useState(1.5)
  const [perMetre, setPerMetre] = useState(false)

  const v0 = v(x0)
  const s = dv(x0)
  const a = v0 * s
  const run = v0 * DT // metres covered in the next 0.1 s
  const rise = s * run // change in v along that run, read off the tangent
  const P: V2 = [x0, v0]
  const Q: V2 = [x0 + run, v0]
  const R: V2 = [x0 + run, v0 + rise]
  const Qm: V2 = [x0 + 0.1, v0]
  const Rm: V2 = [x0 + 0.1, v0 + 0.1 * s]
  const nearPeak = Math.abs(x0 - PEAK) < 0.03
  const nearPi = x0 > 3.04

  let notice
  if (nearPeak) {
    notice = (
      <Notice>
        At the top of the graph, <M>{'x=\\tfrac{3\\pi}{4}'}</M>, the tangent is flat: <M>{'\\tfrac{dv}{dx}=0'}</M>, so{' '}
        <M>{'a=v\\tfrac{dv}{dx}=0'}</M> as well. Where the slope is zero the two agree. Everywhere else they don&apos;t:
        drag towards <M>{'x=\\pi'}</M>.
      </Notice>
    )
  } else if (nearPi) {
    notice = (
      <Notice tone="warn">
        Near <M>{'x=\\pi'}</M> the graph is at its steepest, <M>{`\\tfrac{dv}{dx}\\approx ${s.toFixed(1)}`}</M> per
        metre, but the particle is barely moving, at only <M>{`v\\approx ${v0.toFixed(2)}`}</M> m/s. In 0.1 s it covers almost no
        ground, so its velocity hardly changes: <M>{`a\\approx ${a.toFixed(1)}`}</M>, heading to <M>0</M> at{' '}
        <M>{'x=\\pi'}</M>. Option C would call this the hardest braking on the graph.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here the particle moves at <M>{`v\\approx ${v0.toFixed(2)}`}</M> m/s, so in the next 0.1 s it covers the purple
        run, <M>{`\\Delta x\\approx ${run.toFixed(2)}`}</M> m. Along that run the tangent changes by the orange{' '}
        <M>{`\\Delta v\\approx ${rise.toFixed(2)}`}</M> m/s. That&apos;s <M>{`${a.toFixed(1)}`}</M> m/s every second:{' '}
        <M>{'a=v\\tfrac{dv}{dx}'}</M>. The slope <M>{`\\tfrac{dv}{dx}\\approx ${s.toFixed(2)}`}</M> on its own (option
        C) is the change per <b>metre</b>, not per second. Drag towards <M>{'x=\\pi'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 3.5]} y={[-3, 9.5]} xStep={1} yStep={2} height={320} yLabel="v" yLabels={y => (y > 9 ? '' : tick(y))}>
        <Plot.OfX y={v} domain={[0, Math.PI]} color={C.f} weight={3} />
        <Label at={[0.9, v(0.9)]} attach="se" color={C.f}>
          v = eˣ sin(x)
        </Label>
        <Line.PointSlope point={P} slope={s} color={C.guide} style="dashed" weight={1.5} />
        {perMetre && (
          <>
            <Line.Segment point1={P} point2={Qm} color={C.bad} weight={2} style="dashed" />
            <Line.Segment point1={Qm} point2={Rm} color={C.bad} weight={3} />
            <Label at={[Rm[0], (Qm[1] + Rm[1]) / 2]} attach="e" color={C.bad}>
              per 0.1 m
            </Label>
          </>
        )}
        <Line.Segment point1={P} point2={Q} color={C.violet} weight={3} />
        <Line.Segment point1={Q} point2={R} color={C.g} weight={3} />
        {run > 0.15 && (
          <Label at={[(P[0] + Q[0]) / 2, v0]} attach={rise >= 0 ? 's' : 'n'} color={C.violet} size={12}>
            Δx
          </Label>
        )}
        {Math.abs(rise) > 0.4 && !perMetre && (
          <Label at={[R[0], (Q[1] + R[1]) / 2]} attach="e" color={C.g}>
            Δv
          </Label>
        )}
        <MovablePoint
          point={P}
          color={C.f}
          constrain={([x]) => {
            const c = clamp(x, X_MIN, X_MAX)
            return [c, v(c)]
          }}
          onMove={([x]) => setX0(clamp(x, X_MIN, X_MAX))}
        />
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={X_MIN} max={X_MAX} step={0.005} />
        <Buttons>
          <ActionButton label="Go to x = 3.13, just short of π" onClick={() => setX0(3.13)} />
          <Toggle label="Compare the 0.1-metre triangle (option C)" checked={perMetre} onChange={setPerMetre} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`v\\approx ${v0.toFixed(2)}\\ \\text{m/s}`} />
          <Readout color={C.bad} tex={`\\tfrac{dv}{dx}\\approx ${s.toFixed(2)}\\ \\text{per metre (C)}`} />
          <Readout color={C.good} tex={`a=v\\tfrac{dv}{dx}\\approx ${a.toFixed(2)}\\ \\text{m/s}^2\\ \\text{(A)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
