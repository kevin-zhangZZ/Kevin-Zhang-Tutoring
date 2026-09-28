// 2018 Specialist Exam 2 Q1a — where f(x) = 2arcsin(x² − 1) exists. The inner value u = x² − 1 is
// drawn as a parabola over the green band −1 ≤ u ≤ 1 (the only inputs arcsin accepts). Slide x:
// while the parabola is inside the band, f(x) = 2arcsin(u) is plotted; it leaves the band at
// x = ±√2, where u = 1 exactly — on the edge, so arcsin(1) = π/2 is defined and the endpoints are
// included (closed brackets). As u sweeps −1 → 1, f sweeps −π → π: the range.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider,
  num,
} from './kit'

const R2 = Math.SQRT2
const u = (x: number) => x * x - 1
const f = (x: number) => 2 * Math.asin(Math.max(-1, Math.min(1, u(x))))

export default function Band() {
  const [x0, setX0] = useState(1.2)
  const u0 = u(x0)
  const edge = Math.abs(Math.abs(x0) - R2) < 0.006
  const inside = edge || Math.abs(u0) <= 1
  const atZero = Math.abs(x0) < 0.006
  const uCol = inside ? C.good : C.bad

  let notice
  if (edge) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'x = \\pm\\sqrt2'}</M>, <M>u = 1</M> exactly</b>: on the edge of the band, not outside it.{' '}
        <M>{'\\sin^{-1}(1) = \\tfrac{\\pi}{2}'}</M> is perfectly defined, so <M>{'f(\\pm\\sqrt2) = \\pi'}</M> and the
        endpoints belong in the domain: <b>closed</b> brackets, <M>{'\\left[-\\sqrt2, \\sqrt2\\right]'}</M>. Nudge the
        slider a little further out and watch <M>f</M> disappear.
      </Notice>
    )
  } else if (!inside) {
    notice = (
      <Notice tone="warn">
        Here <M>{`u = x^2 - 1 = ${num(u0)}`}</M>, above the band. Sine never gets past <M>1</M>, so no angle has this
        sine and <M>{'\\sin^{-1}(u)'}</M> does not exist: <M>f(x)</M> is undefined. The parabola leaves the band where{' '}
        <M>x^2 - 1 = 1</M>, i.e. <M>{'x = \\pm\\sqrt2'}</M>. Press &ldquo;Go to <M>{'x = \\sqrt2'}</M>&rdquo; to see the
        exact edge.
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice>
        At <M>x = 0</M>, <M>u = -1</M>: the bottom edge of the band, the smallest input <M>{'\\sin^{-1}'}</M> ever gets.
        So <M>{'f(0) = 2\\sin^{-1}(-1) = -\\pi'}</M> is the lowest point. The parabola never dips below{' '}
        <M>-1</M>, which is why only the top edge of the band limits the domain.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Inside the band, arcsin accepts <M>u</M> and the blue height is <M>{'2\\sin^{-1}(u)'}</M>. As <M>x</M> runs
        from <M>0</M> to <M>{'\\sqrt2'}</M>, <M>u</M> climbs from <M>-1</M> to <M>1</M>, so <M>f</M> climbs from{' '}
        <M>{'-\\pi'}</M> to <M>{'\\pi'}</M>: that is the range <M>{'[-\\pi, \\pi]'}</M>. Slide past{' '}
        <M>{'x \\approx 1.41'}</M> to see where <M>f</M> stops.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.2, 2.2]} y={[-4, 4]} xStep={1} yStep={1} height={340}>
        <Region top={() => 1} bottom={() => -1} from={-2.2} to={2.2} color={C.good} opacity={0.13} />
        <Line.Segment point1={[-2.2, 1]} point2={[2.2, 1]} color={C.good} style="dashed" weight={1.5} />
        <Line.Segment point1={[-2.2, -1]} point2={[2.2, -1]} color={C.good} style="dashed" weight={1.5} />
        <Label at={[-2.2, -1]} attach="se" color={C.good} size={12}>arcsin accepts u</Label>
        <Plot.OfX y={u} domain={[-2.2, 2.2]} color={C.g} weight={2.5} />
        <Label at={[-2.05, 3.85]} attach="e" color={C.g}>u = x² − 1</Label>
        <Plot.OfX y={f} domain={[-R2, R2]} color={C.f} weight={3} />
        <Point x={-R2} y={Math.PI} color={C.f} />
        <Point x={R2} y={Math.PI} color={C.f} />
        <Label at={[0.55, f(0.55)]} attach="e" color={C.f}>y = f(x)</Label>
        <Line.Segment point1={[x0, -4]} point2={[x0, 4]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={x0} y={u0} color={uCol} />
        {inside && <Point x={x0} y={f(x0)} color={C.f} />}
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-2} max={2} step={0.01} />
        <Buttons>
          <ActionButton label={<>Go to <M>{'x = \\sqrt2'}</M></>} onClick={() => setX0(R2)} />
          <ActionButton label={<>Go to <M>x = 0</M></>} onClick={() => setX0(0)} />
        </Buttons>
        <Readouts>
          <Readout color={uCol} tex={`u = x^2 - 1 = ${edge ? '1' : num(u0)}`} />
          <Readout
            color={inside ? C.f : C.bad}
            tex={inside ? `f(x) = 2\\sin^{-1}(u) = ${edge ? '\\pi' : atZero ? '-\\pi' : num(f(x0))}` : `\\sin^{-1}(${num(u0)})\\ \\text{undefined}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
