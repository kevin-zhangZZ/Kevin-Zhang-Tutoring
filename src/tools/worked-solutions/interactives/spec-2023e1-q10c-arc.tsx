// 2023 Specialist Exam 1 Q10c — the distance along the curve from A (t = 0) to B (t = a) is an arc
// of the circle (x − 2)² + (y − 1)² = 9 from part b. Because x − 2 = 3cos(2t) and y − 1 = 3sin(2t),
// the particle sits at angle 2t about the centre C(2, 1), so by time a it has turned 2a (not a) and
// the arc is radius × angle = 3 × 2a = 6a — the same as speed 6 × time a. A slider moves a over one
// full lap (0 to π); the arc readout reaches 3π/4 ≈ 2.36 at a = π/8, where the angle ACB is π/4. A second
// button jumps to the trap a = π/4 (what you get by taking the angle as a): the particle has turned π/2,
// so the arc is 3π/2, twice the required distance.

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const CX = 2
const CY = 1
const R = 3
const TARGET = Math.PI / 8
const TRAP = Math.PI / 4
const pos = (th: number): [number, number] => [CX + R * Math.cos(th), CY + R * Math.sin(th)]

/** The side of a point on the circle that faces outward, for its label. */
function outward(th: number): 'e' | 'ne' | 'n' | 'nw' | 'w' | 'sw' | 's' | 'se' {
  const dirs = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'] as const
  const k = Math.round((((th % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) / (Math.PI / 4)) % 8
  return dirs[k]
}

export default function ArcWidget() {
  const [a, setA] = useState(0.55)
  const move = (v: number) =>
    setA(Math.abs(v - TARGET) < 0.012 ? TARGET : Math.abs(v - TRAP) < 0.012 ? TRAP : v)

  const angle = 2 * a
  const arc = R * angle
  const B = pos(angle)
  const atTarget = Math.abs(a - TARGET) < 1e-9
  const atTrap = Math.abs(a - TRAP) < 1e-9
  const wedgeR = 0.65

  let notice
  if (atTarget) {
    notice = (
      <Notice tone="good">
        <b>
          <M>{'a = \\tfrac{\\pi}{8}'}</M>: the particle has turned <M>{'2a = \\tfrac{\\pi}{4}'}</M> about the centre
        </b>
        , so the arc is <M>{'3\\times\\tfrac{\\pi}{4} = \\tfrac{3\\pi}{4}'}</M>, as required. It is the same number as
        speed <M>{'\\times'}</M> time, <M>{'6\\times\\tfrac{\\pi}{8}'}</M>. Now press the <M>{'a = \\tfrac{\\pi}{4}'}</M>{' '}
        button to see the answer you get if you take the angle as <M>{'a'}</M>.
      </Notice>
    )
  } else if (atTrap) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>{'a = \\tfrac{\\pi}{4}'}</M> overshoots
        </b>
        : it solves <M>{'3a = \\tfrac{3\\pi}{4}'}</M>, which takes the angle as <M>{'a'}</M>. But the particle has
        turned <M>{'2a = \\tfrac{\\pi}{2}'}</M>, a quarter of the circle, so the arc is{' '}
        <M>{'3\\times\\tfrac{\\pi}{2} = \\tfrac{3\\pi}{2}'}</M>, twice the required <M>{'\\tfrac{3\\pi}{4}'}</M>. The{' '}
        <M>{'2t'}</M> inside <M>{'\\cos(2t)'}</M> and <M>{'\\sin(2t)'}</M> doubles the angle, so halve <M>{'a'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'B'}</M> is where the particle is at time <M>{'a'}</M>. Since <M>{'{x-2=3\\cos(2a)}'}</M> and{' '}
        <M>{'{y-1=3\\sin(2a)}'}</M>, the particle has turned through <M>{'2a'}</M> about the centre <M>{'C'}</M>, twice{' '}
        <M>{'a'}</M>. So the distance along the curve is the arc, radius <M>{'\\times'}</M> angle{' '}
        <M>{'= 3\\times 2a'}</M>. Slide{' '}
        <M>{'a'}</M> until the arc is <M>{'\\tfrac{3\\pi}{4}\\approx 2.36'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.6, 5.9]} y={[-2.5, 4.6]} equalScale height={340} xStep={1} yStep={1}>
        <Circle center={[CX, CY]} radius={R} color={C.guide} fillOpacity={0} weight={1.5} />
        <Line.Segment point1={[CX, CY]} point2={pos(0)} color={C.guide} weight={1.5} />
        <Line.Segment point1={[CX, CY]} point2={B} color={C.guide} weight={1.5} />
        {angle > 0.02 && (
          <>
            <Plot.Parametric xy={pos} domain={[0, angle]} color={atTarget ? C.good : C.f} weight={5} />
            <Plot.Parametric
              xy={th => [CX + wedgeR * Math.cos(th), CY + wedgeR * Math.sin(th)]}
              domain={[0, angle]}
              color={C.g}
              weight={2.5}
            />
            {angle > 0.35 && (
              <Label at={[CX + 0.95 * Math.cos(a), CY + 0.95 * Math.sin(a)]} attach="c" color={C.g}>
                2a
              </Label>
            )}
          </>
        )}
        <Point x={CX} y={CY} color={C.ink} />
        <Label at={[CX, CY]} attach={angle > 4 && angle < 5.5 ? 'nw' : 'sw'}>
          C
        </Label>
        <Point x={pos(0)[0]} y={pos(0)[1]} color={C.ink} />
        <Label at={pos(0)} attach="e">
          A
        </Label>
        {angle > 0.02 && (
          <>
            <Point x={B[0]} y={B[1]} color={atTarget ? C.good : C.f} />
            <Label at={B} attach={outward(angle)} color={atTarget ? C.good : C.f}>
              B
            </Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider
          label="a"
          value={a}
          onChange={move}
          min={0}
          max={Math.PI}
          step={0.001}
          format={v => (Math.abs(v - TARGET) < 1e-9 ? 'π/8' : Math.abs(v - TRAP) < 1e-9 ? 'π/4' : num(v, 3))}
        />
        <Buttons>
          <ActionButton label={<>Arc <M>{'= \\tfrac{3\\pi}{4}'}</M></>} onClick={() => setA(TARGET)} />
          <ActionButton label={<>Try <M>{'a = \\tfrac{\\pi}{4}'}</M></>} onClick={() => setA(TRAP)} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{angle turned} = 2a \\approx ${num(angle, 2)}`} color={C.g} />
          <Readout tex={`\\text{arc } AB = 3\\times 2a \\approx ${num(arc, 2)}`} color={atTarget ? C.good : C.f} />
          <Readout tex={`\\text{target } \\tfrac{3\\pi}{4}\\approx 2.36`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
