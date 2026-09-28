// 2019 Specialist Exam 2 MCQ 10 — why the pile's height rises at (rate of volume) ÷ (area of the
// base). A cross-section of the sand cone (semi-vertex angle 60°, so r = √3 h), built in three
// steps: the pile; a thin layer of new sand that raises it by Δh; then the old pile lifted by Δh,
// which fits exactly into the top of the new one (same 60° sides), leaving a disc of radius r and
// thickness Δh plus two corner slivers that vanish as Δh → 0. So dV/dh = πr² = 3πh², which is the
// derivative of V = πh³, and dh/dt = 1.5 ÷ (3πh²) = 2/π ≈ 0.64 m/min at h = 0.5 (option C).

import { useState } from 'react'
import type { vec } from './kit'
import {
  C, Controls, Label, Line, M, Notice, Plane, Polygon, Polyline, Readout, Readouts, Slider, StepNav, num, useSteps,
} from './kit'

const K = Math.sqrt(3) // r = h tan 60°
const RATE = 1.5 // dV/dt, m³ per minute

/** Points on a circular arc about `c`, radius rho, from angle t0 to t1 (degrees). */
function arc(c: vec.Vector2, rho: number, t0: number, t1: number): vec.Vector2[] {
  const pts: vec.Vector2[] = []
  for (let i = 0; i <= 24; i++) {
    const t = ((t0 + ((t1 - t0) * i) / 24) * Math.PI) / 180
    pts.push([c[0] + rho * Math.cos(t), c[1] + rho * Math.sin(t)])
  }
  return pts
}

export default function Slab() {
  const [h, setH] = useState(0.5)
  const [dh, setDh] = useState(0.1)
  const steps = useSteps(3)
  const s = steps.step

  const r = K * h
  const H = h + dh
  const R = K * H
  const dV = Math.PI * (H ** 3 - h ** 3)
  const disc = Math.PI * r * r * dh
  const rise = RATE / (Math.PI * r * r)
  const atHalf = Math.abs(h - 0.5) < 0.005

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        The semi-vertex angle is measured from the <b>vertical axis</b>, at the apex. In the right triangle apex, centre,
        edge: <M>{'\\tan 60^\\circ = \\tfrac{r}{h}'}</M>, so <M>{'r = \\sqrt3\\,h'}</M>. Drag <M>h</M>: the pile grows but
        keeps its shape, so <M>V</M> depends on <M>h</M> alone: <M>{'V = \\tfrac13\\pi(\\sqrt3 h)^2h = \\pi h^3'}</M>. Press
        Next to pour in some sand.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        A little more sand (orange) makes a thin skin over the <b>whole</b> pile and lifts the top by <M>\Delta h</M>. How
        much volume is that skin? It is awkward to see directly. Press Next for a neater way to look at it.
      </Notice>
    )
  } else {
    notice = (
      <>
        <Notice>
          Lift the old pile by <M>\Delta h</M>: its sides have the same 60° slope, so it fits exactly into the top of the new
          pile. What is left is a <b>disc</b> of radius <M>r</M> and thickness <M>\Delta h</M> (orange) plus two corner
          slivers (violet). Shrink <M>\Delta h</M>: the slivers vanish, so <M>{'\\Delta V \\approx \\pi r^2\\,\\Delta h'}</M>,
          i.e. <M>{'\\tfrac{dV}{dh} = \\pi r^2 = 3\\pi h^2'}</M>, which is exactly the derivative of <M>\pi h^3</M>.
        </Notice>
        {atHalf ? (
          <Notice tone="good">
            At <M>h = 0.5</M> the base has area <M>{'\\pi r^2 = 3\\pi(0.5)^2 = 0.75\\pi \\approx 2.36'}</M> m². Sand arrives at{' '}
            <M>1.5</M> m³ per minute, spread as a thin disc over that base, so the height rises at{' '}
            <M>{'\\tfrac{1.5}{0.75\\pi} = \\tfrac{2}{\\pi} \\approx 0.64'}</M> m per minute: option C. Drag <M>h</M> up: the
            base grows like <M>h^2</M>, so the pile rises more and more slowly.
          </Notice>
        ) : (
          <Notice>
            Here <M>{`\\pi r^2 = ${num(Math.PI * r * r, 2)}`}</M> m², so the pile rises at <M>{num(rise, 2)}</M> m per minute.
            Set <M>h = 0.5</M> for the moment in the question.
          </Notice>
        )}
      </>
    )
  }

  return (
    <div>
      <Plane x={[-1.3, 1.3]} y={[-0.12, 0.8]} xStep={0.25} yStep={0.25} equalScale labels={false} xLabel="" yLabel="">
        {s === 0 && (
          <>
            <Polygon points={[[-r, 0], [0, h], [r, 0]]} color={C.f} fillOpacity={0.3} weight={2.5} />
            <Line.Segment point1={[0, 0]} point2={[0, h]} color={C.ink} weight={1.5} style="dashed" />
            <Line.Segment point1={[0, 0]} point2={[r, 0]} color={C.ink} weight={2.5} />
            <Polyline points={[[0.04, 0], [0.04, 0.04], [0, 0.04]]} color={C.ink} weight={1.5} />
            <Polyline points={arc([0, h], 0.12, -90, -30)} color={C.g} weight={2} />
            <Label at={[0.02, h - 0.17]} color={C.g} attach="se" size={11} gap={3}>60°</Label>
            <Label at={[0, h / 2]} attach="w" italic>h</Label>
            <Label at={[r / 2, 0]} attach="s" italic>r</Label>
          </>
        )}
        {s === 1 && (
          <>
            <Polygon points={[[-R, 0], [0, H], [R, 0]]} color={C.g} fillOpacity={0.45} weight={2} />
            <Polygon points={[[-r, 0], [0, h], [r, 0]]} color={C.f} fillOpacity={0.45} weight={2} />
            <Line.Segment point1={[0, h]} point2={[0, H]} color={C.ink} weight={2.5} />
            <Label at={[0, h + dh / 2]} attach="e" size={12}>Δh</Label>
            <Label at={[-R / 2, H / 2]} color={C.g} attach="nw" size={12}>new sand</Label>
          </>
        )}
        {s === 2 && (
          <>
            <Polygon points={[[-R, 0], [0, H], [R, 0]]} color={C.g} fillOpacity={0} weight={2} />
            <Polygon points={[[-r, dh], [0, H], [r, dh]]} color={C.f} fillOpacity={0.45} weight={2} />
            <Polygon points={[[-r, 0], [r, 0], [r, dh], [-r, dh]]} color={C.g} fillOpacity={0.6} weight={1.5} />
            <Polygon points={[[r, 0], [R, 0], [r, dh]]} color={C.violet} fillOpacity={0.75} weight={1.5} />
            <Polygon points={[[-r, 0], [-R, 0], [-r, dh]]} color={C.violet} fillOpacity={0.75} weight={1.5} />
            <Label at={[-R, dh / 2]} attach="w" size={12}>Δh</Label>
            <Label at={[r / 2, 0]} attach="s" italic>r</Label>
            {h >= 0.35 && <Label at={[0, dh + h / 3]} color={C.f} attach="c" size={11}>old pile, lifted</Label>}
          </>
        )}
      </Plane>
      <Controls>
        <StepNav step={s} count={3} onBack={steps.back} onNext={steps.next} />
        <Slider label="h" value={h} onChange={setH} min={0.2} max={0.6} step={0.01} />
        {s > 0 && <Slider label="\Delta h" value={dh} onChange={setDh} min={0.01} max={0.12} step={0.01} />}
        <Readouts>
          {s === 0 && <Readout color={C.ink} tex={`r = \\sqrt3\\,h = ${num(r, 3)}`} />}
          {s === 0 && <Readout color={C.f} tex={`V = \\pi h^3 = ${num(Math.PI * h ** 3, 3)}`} />}
          {s >= 1 && <Readout color={C.g} tex={`\\Delta V = \\pi(h+\\Delta h)^3 - \\pi h^3 = ${num(dV, 4)}`} />}
          {s === 2 && <Readout color={C.g} tex={`\\text{disc} = \\pi r^2\\,\\Delta h = ${num(disc, 4)}`} />}
          {s === 2 && <Readout color={C.violet} tex={`\\text{slivers} = ${num(dV - disc, 4)}`} />}
          {s === 2 && (
            <Readout
              color={atHalf ? C.good : C.ink}
              tex={`\\frac{dh}{dt} = \\frac{1.5}{\\pi r^2} = \\frac{1.5}{3\\pi h^2} = ${num(rise, 2)}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
