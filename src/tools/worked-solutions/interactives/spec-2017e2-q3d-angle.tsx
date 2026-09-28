// 2017 Specialist Exam 2 Q3d — the angle between two curves at a point is the angle between their
// tangents there. P sits on the edge y = 3arcsin(x/2) and Q is its mirror image on the other edge
// y = −3arcsin(x/2). With P at the corner, the chords OP and OQ make 61.9° (what you'd get if the
// edges were straight); slide P into O and the chords turn into the tangents y = ±(3/2)x, whose
// acute angle is 180° − 2 tan⁻¹(3/2) ≈ 67.4°. A toggle shows the obtuse angle, 112.6°, inside the wing.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts,
  Slider, Toggle, clamp, usePlayer,
} from './kit'

const R2 = Math.SQRT2
const f = (x: number) => (x <= R2 ? 3 * Math.asin(x / 2) : 3 * Math.acos(x / 2))
const E = (x: number) => 3 * Math.asin(x / 2)
const DEG = 180 / Math.PI
const TAN_T = Math.atan(1.5) // tangent's angle with the positive x-axis
const MIN_P = 0.02

function arc(r: number, a: number, b: number) {
  return (s: number): [number, number] => [r * Math.cos(a + (b - a) * s), r * Math.sin(a + (b - a) * s)]
}

export default function AngleAtOrigin() {
  // u runs from 0 (P at the corner) to 1 (P almost at O), so Play can slide P into O
  const [u, setU] = useState(0)
  const [tangents, setTangents] = useState(true)
  const [obtuse, setObtuse] = useState(false)
  const player = usePlayer(setU, { min: 0, max: 1, seconds: 5 })
  const p = R2 - (R2 - MIN_P) * u
  const setP = (x: number) => setU((R2 - clamp(x, MIN_P, R2)) / (R2 - MIN_P))

  const m = E(p) / p
  const th = Math.atan(m)
  const chordAngle = 180 - 2 * th * DEG
  const tanAngle = 180 - 2 * TAN_T * DEG
  const near = p < 0.1
  const atCorner = p > R2 - 0.02

  let notice
  if (obtuse) {
    notice = (
      <Notice tone="warn">
        The red angle, inside the wing, is <M>{'2\\tan^{-1}\\tfrac32\\approx112.6^\\circ'}</M>. It is also an angle
        between the edges (the two angles add to <M>{'180^\\circ'}</M>), but the question asks for the{' '}
        <b>acute</b> one: <M>{'180^\\circ-112.6^\\circ=67.4^\\circ'}</M>. The report says some students gave the
        obtuse angle.
      </Notice>
    )
  } else if (atCorner) {
    notice = (
      <Notice>
        With <M>P</M> at the corner, the violet lines <M>OP</M> and <M>OQ</M> make{' '}
        <M>{`${chordAngle.toFixed(1)}^\\circ`}</M>. That is the answer <em>if the edges were straight</em>, but they
        bend: the gradient of <M>{'3\\arcsin\\tfrac{x}{2}'}</M> grows from <M>1.5</M> at <M>O</M> to about{' '}
        <M>2.1</M> at the corner. Slide <M>P</M> into <M>O</M> (or press Play) and watch the violet lines.
      </Notice>
    )
  } else if (near) {
    notice = (
      <Notice tone="good">
        Now <M>OP</M> is almost the green tangent: its gradient is <M>{`${m.toFixed(3)}`}</M>, heading for{' '}
        <M>{"f'(0)=\\tfrac32"}</M>. The angle between two curves at a point is the angle between their{' '}
        <b>tangents</b> there, which is why you need the derivative: <M>{'180^\\circ-2\\tan^{-1}\\tfrac32\\approx67.4^\\circ'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>P</M> slides towards <M>O</M>, the chord <M>OP</M> swings round towards the green tangent and the
        violet angle grows from <M>{'61.9^\\circ'}</M> towards <M>{'67.4^\\circ'}</M>. Keep going until <M>P</M> is
        almost at <M>O</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.7, 1.7]} y={[-1.2, 2.8]} equalScale height={440} labels={false}>
        {/* the brooch, faint */}
        <Plot.OfX y={f} domain={[0, 2]} color={C.guide} weight={1.5} />
        <Plot.OfX y={x => -f(x)} domain={[0, 2]} color={C.guide} weight={1.5} />
        <Plot.OfX y={x => f(-x)} domain={[-2, 0]} color={C.guide} weight={1.5} />
        <Plot.OfX y={x => -f(-x)} domain={[-2, 0]} color={C.guide} weight={1.5} />
        {/* the two edges that cross at O */}
        <Plot.OfX y={E} domain={[-R2, R2]} color={C.f} weight={3} />
        <Plot.OfX y={x => -E(x)} domain={[-R2, R2]} color={C.g} weight={3} />

        {tangents && (
          <>
            <Plot.OfX y={x => 1.5 * x} domain={[-1.6, 1.6]} color={C.good} weight={2} />
            <Plot.OfX y={x => -1.5 * x} domain={[-1.6, 1.6]} color={C.good} weight={2} />
            <Plot.Parametric xy={arc(1.8, TAN_T, Math.PI - TAN_T)} domain={[0, 1]} color={C.good} weight={2} />
            <Label at={[1.8 * Math.cos(1.66), 1.8 * Math.sin(1.66)]} attach="nw" color={C.good} size={12}>67.4°</Label>
          </>
        )}

        <Line.ThroughPoints point1={[0, 0]} point2={[p, E(p)]} color={C.violet} style="dashed" weight={2} />
        <Line.ThroughPoints point1={[0, 0]} point2={[-p, E(p)]} color={C.violet} style="dashed" weight={2} />
        <Plot.Parametric xy={arc(1.3, th, Math.PI - th)} domain={[0, 1]} color={C.violet} weight={2.5} />
        <Label at={[1.3 * Math.cos(1.66), 1.3 * Math.sin(1.66)]} attach="nw" color={C.violet} size={12}>{`${chordAngle.toFixed(1)}°`}</Label>

        {obtuse && (
          <>
            <Plot.Parametric xy={arc(0.6, -TAN_T, TAN_T)} domain={[0, 1]} color={C.bad} weight={2.5} />
            <Label at={[0.62, 0.04]} attach="ne" color={C.bad} size={12}>112.6°</Label>
          </>
        )}

        <Point x={0} y={0} color={C.ink} />
        <Label at={[0, 0]} attach="s" color={C.ink} size={12}>O</Label>
        <Point x={-p} y={E(p)} color={C.g} />
        {p > 0.15 && <Label at={[-p, E(p)]} attach={p > 1 ? "ne" : "w"} color={C.g}>Q</Label>}
        <MovablePoint
          point={[p, E(p)]}
          color={C.f}
          constrain={([x]) => {
            const px = clamp(x, MIN_P, R2)
            return [px, E(px)]
          }}
          onMove={([x]) => {
            player.stop()
            setP(x)
          }}
        />
        <Label at={[p, E(p)]} attach={p > 1 ? "nw" : "e"} color={C.f}>P</Label>
      </Plane>
      <Controls>
        <Slider
          label="x_P"
          value={p}
          onChange={v => {
            player.stop()
            setP(v)
          }}
          min={MIN_P}
          max={R2}
          step={0.005}
          format={v => v.toFixed(3)}
        />
        <Buttons>
          <PlayButton
            playing={player.playing}
            onClick={() => player.toggle(u)}
            label="Slide P into O"
          />
          <Toggle label="Tangents at O" checked={tangents} onChange={setTangents} />
          <Toggle label="The obtuse angle" checked={obtuse} onChange={setObtuse} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`m_{OP}=\\frac{3\\arcsin(x_P/2)}{x_P}=${m.toFixed(3)}`} />
          <Readout color={C.violet} tex={`180^\\circ-2\\tan^{-1}(${m.toFixed(3)})=${chordAngle.toFixed(1)}^\\circ`} />
          {tangents && <Readout color={C.good} tex={`f'(0)=\\tfrac32:\\ 180^\\circ-2\\tan^{-1}\\tfrac32=${tanAngle.toFixed(1)}^\\circ`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
