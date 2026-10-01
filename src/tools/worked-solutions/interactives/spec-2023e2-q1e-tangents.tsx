// 2023 Specialist Exam 2 Q1e — the quarter ellipse x = 2cos(t) + 2, y = (e − 2)sin(t),
// t ∈ [π/2, π], leaves D(2, e − 2) horizontally and reaches O vertically. Slide t from π/2 to π:
// the arrow is the direction of motion (dx/dt, dy/dt). At t = π/2, dy/dt = 0 (flat at D, the top
// of the ellipse); at t = π, dx/dt = 0 (vertical at O, the ellipse's leftmost point). The rest of
// the ellipse is dashed so both facts can be seen. A toggle overlays a hump through O and D that
// is flat at D but meets O on a slant (gradient e − 2) — the "not vertical at the origin" sketch
// the examiners' report describes.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, Vector,
  num, usePlayer,
} from './kit'

const K = Math.E - 2
const PI = Math.PI
const ex = (t: number) => 2 * Math.cos(t) + 2
const ey = (t: number) => K * Math.sin(t)
// A typical wrong sketch: a hump through O and D, flat at D, but with gradient e − 2 at O.
const hump = (x: number) => (K * x * (4 - x)) / 4
const ARROW = 0.45

export default function Tangents() {
  const [t, setT] = useState((3 * PI) / 4)
  const [compare, setCompare] = useState(false)
  const player = usePlayer(setT, { min: PI / 2, max: PI, seconds: 5 })

  const atD = t - PI / 2 < 0.006
  const atO = PI - t < 0.006
  const tt = atD ? PI / 2 : atO ? PI : t
  const P: [number, number] = [ex(tt), ey(tt)]
  const dx = -2 * Math.sin(tt)
  const dy = K * Math.cos(tt)
  const v: [number, number] = [atO ? 0 : dx, atD ? 0 : dy]
  const tip: [number, number] = [P[0] + ARROW * v[0], P[1] + ARROW * v[1]]
  const tanColor = atD || atO ? C.good : C.violet

  let notice
  if (compare) {
    notice = (
      <Notice tone="warn">
        The red hump also joins <M>D</M> to <M>O</M> and is flat at <M>D</M>, but it reaches <M>O</M> with gradient{' '}
        <M>e-2 \approx 0.72</M>, a slant. The report says the sketches were often not vertical at the origin, and a curve
        like this would not earn the mark even though both ends are in the right place. Slide <M>t</M> to <M>\pi</M> and compare
        the blue path, which turns straight down into <M>O</M>.
      </Notice>
    )
  } else if (atD) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'t = \\tfrac{\\pi}{2}'}</M> (point <M>D</M>)</b>, <M>{'\\tfrac{dy}{dt} = (e-2)\\cos\\tfrac{\\pi}{2} = 0'}</M>{' '}
        while <M>{'\\tfrac{dx}{dt} = -2'}</M>. The point is moving purely sideways, so the path leaves <M>D</M>{' '}
        <b>horizontally</b>: <M>D</M> is the top of the ellipse. Now slide <M>t</M> to <M>\pi</M>.
      </Notice>
    )
  } else if (atO) {
    notice = (
      <Notice tone="good">
        <b>At <M>t = \pi</M> (point <M>O</M>)</b>, <M>{'\\tfrac{dx}{dt} = -2\\sin\\pi = 0'}</M> while{' '}
        <M>{'\\tfrac{dy}{dt} = -(e-2) \\neq 0'}</M>. The point is moving straight down, so the path reaches <M>O</M>{' '}
        <b>vertically</b>: <M>O</M> is the leftmost point of the ellipse. Turn on &ldquo;Compare a typical
        sketch&rdquo; to see a sketch that misses this.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The arrow points along <M>{'\\left(\\tfrac{dx}{dt}, \\tfrac{dy}{dt}\\right)'}</M>, the direction the walker
        moves as <M>t</M> increases from <M>{'\\tfrac{\\pi}{2}'}</M> (at <M>D</M>) to <M>\pi</M> (at <M>O</M>). In
        between, both rates are non-zero, so the tangent is slanted. Slide <M>t</M> to each end to see which rate
        becomes zero there.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.45, 2.85]} y={[-0.82, 1.05]} xStep={1} yStep={0.5} height={300}>
        <Plot.Parametric xy={s => [ex(s), ey(s)]} domain={[0, 2 * PI]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.Parametric xy={s => [ex(s), ey(s)]} domain={[PI / 2, PI]} color={C.f} weight={3} />
        {compare && (
          <>
            <Plot.OfX y={hump} domain={[0, 2]} color={C.bad} weight={2.5} />
            <Line.Segment point1={[-0.3, -0.3 * K]} point2={[0.55, 0.55 * K]} color={C.bad} style="dashed" weight={1.5} />
            <Label at={[1.1, hump(1.1)]} color={C.bad} attach="s" size={12} gap={10}>typical sketch</Label>
          </>
        )}
        <Point x={2} y={0} color={C.guide} />
        <Label at={[2, 0]} color={C.guide} attach="ne" size={12}>centre (2, 0)</Label>
        <Line.ThroughPoints point1={P} point2={tip} color={tanColor} style="dashed" weight={1.5} />
        <Vector tail={P} tip={tip} color={tanColor} weight={2.5} />
        <Point x={2} y={K} color={C.ink} />
        <Label at={[2, K]} attach="n">D(2, e − 2)</Label>
        <Point x={0} y={0} color={C.ink} />
        <Label at={[0, 0]} attach="sw">O</Label>
        <Point x={P[0]} y={P[1]} color={tanColor} />
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={val => {
            player.stop()
            setT(val)
          }}
          min={PI / 2}
          max={PI}
          step={PI / 400}
          format={val => `${(val / PI).toFixed(2)}π`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Walk from D to O" />
          <Toggle label="Compare a typical sketch" checked={compare} onChange={setCompare} />
        </Buttons>
        <Readouts>
          <Readout color={tanColor} tex={`\\tfrac{dx}{dt} = -2\\sin t = ${num(dx, 3)}`} />
          <Readout color={tanColor} tex={`\\tfrac{dy}{dt} = (e-2)\\cos t = ${num(dy, 3)}`} />
          <Readout
            color={tanColor}
            tex={atO ? '\\tfrac{dy}{dx}\\ \\text{undefined: vertical}' : `\\tfrac{dy}{dx} = ${num(dy / dx, 3)}${atD ? '\\ \\text{(horizontal)}' : ''}`}
          />
          {compare && <Readout color={C.bad} tex="\text{red at } O\text{: } \tfrac{dy}{dx} = e-2 \approx 0.718" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
