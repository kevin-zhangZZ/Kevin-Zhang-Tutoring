// 2017 Specialist Exam 2 Q3b — the third-quadrant edges are the first-quadrant edges turned
// half a turn about O. Rotate the two pieces of f (arcsin in sky, arccos in orange) through φ:
// at 180° every point (x, y) lands on (−x, −y), so g(x) = −f(−x), and the arccos piece that was on
// the far right is now on the far left — the domains swap order. A toggle shows the report's
// error of using one rule for the whole edge: y = −3arcsin(−x/2) on [−2, 0] never turns the
// corner and heads off to −3π/2 at x = −2.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  tick, usePlayer,
} from './kit'

const R2 = Math.SQRT2
const f = (x: number) => (x <= R2 ? 3 * Math.asin(x / 2) : 3 * Math.acos(x / 2))
const asinPiece = (t: number) => 3 * Math.asin(t / 2)
const acosPiece = (t: number) => 3 * Math.acos(t / 2)
const CORNER: [number, number] = [R2, (3 * Math.PI) / 4]
const P: [number, number] = [1, Math.PI / 2]

function rot([x, y]: [number, number], deg: number): [number, number] {
  const a = (deg * Math.PI) / 180
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]
}

export default function RotateEdge() {
  const [phi, setPhi] = useState(90)
  const [oneRule, setOneRule] = useState(false)
  const player = usePlayer(setPhi, { min: 0, max: 180, seconds: 4 })
  const done = phi >= 179.5
  const cRot = rot(CORNER, phi)
  const pRot = rot(P, phi)
  const rC = Math.hypot(CORNER[0], CORNER[1])
  const a0 = Math.atan2(CORNER[1], CORNER[0])

  let notice
  if (oneRule) {
    notice = (
      <Notice tone="warn">
        One rule for the whole edge, <M>{'y=-3\\arcsin\\left(-\\tfrac{x}{2}\\right)'}</M> for <M>{'-2\\le x\\le 0'}</M>,
        is a single smooth curve, so it <b>cannot turn the corner</b>. It sails past{' '}
        <M>{'\\left(-\\sqrt2,-\\tfrac{3\\pi}{4}\\right)'}</M> and reaches <M>{'-\\tfrac{3\\pi}{2}\\approx-4.71'}</M> at{' '}
        <M>x=-2</M>, far below the brooch. A corner in the edge always means a hybrid rule.
      </Notice>
    )
  } else if (done) {
    notice = (
      <Notice tone="good">
        Half a turn sends every point <M>{'(x,y)'}</M> to <M>{'(-x,-y)'}</M>, so the new rule is{' '}
        <M>{'g(x)=-f(-x)'}</M>: the point <M>{'P(1,\\tfrac{\\pi}{2})'}</M> became <M>{"P'(-1,-\\tfrac{\\pi}{2})"}</M>. Look
        at the domain bars: the orange <M>\arccos</M> piece that was on the <b>far right</b> is now on the{' '}
        <b>far left</b>, <M>{'-2\\le x<-\\sqrt2'}</M>. Turn on &ldquo;One rule for the whole edge&rdquo; to see why
        two pieces are needed.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Turn the first-quadrant edge about <M>O</M> (drag <M>\varphi</M> or press Play). The corner <M>C</M> swings
        round the dashed circle. Keep an eye on the orange <M>\arccos</M> piece: which end of the third-quadrant
        edge will it land on at <M>{'180^\\circ'}</M>?
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.9, 2.9]} y={[-2.9, 2.9]} equalScale height={440} labels={v => (Math.abs(v) > 2.5 ? '' : tick(v))}>
        {/* the whole brooch, faint */}
        <Plot.OfX y={f} domain={[0, 2]} color={C.guide} weight={1.5} />
        <Plot.OfX y={x => -f(x)} domain={[0, 2]} color={C.guide} weight={1.5} />
        <Plot.OfX y={x => f(-x)} domain={[-2, 0]} color={C.guide} weight={1.5} />
        <Plot.OfX y={x => -f(-x)} domain={[-2, 0]} color={C.guide} weight={1.5} />

        {/* the corner's path */}
        {phi > 0.5 && (
          <Plot.Parametric
            xy={t => [rC * Math.cos(a0 + t), rC * Math.sin(a0 + t)]}
            domain={[0, (phi * Math.PI) / 180]}
            color={C.guide}
            style="dashed"
            weight={1.5}
          />
        )}

        {/* original first-quadrant pieces, then the rotated copy */}
        <Plot.OfX y={asinPiece} domain={[0, R2]} color={C.f} weight={2} opacity={0.45} />
        <Plot.OfX y={acosPiece} domain={[R2, 2]} color={C.g} weight={2} opacity={0.45} />
        <Plot.Parametric xy={t => rot([t, asinPiece(t)], phi)} domain={[0, R2]} color={C.f} weight={3.5} />
        <Plot.Parametric xy={t => rot([t, acosPiece(t)], phi)} domain={[R2, 2]} color={C.g} weight={3.5} />

        {/* domain bars on the x-axis */}
        <Line.Segment point1={[0, 0]} point2={[R2, 0]} color={C.f} weight={6} opacity={0.6} />
        <Line.Segment point1={[R2, 0]} point2={[2, 0]} color={C.g} weight={6} opacity={0.6} />
        <Label at={[R2, 0]} attach="s" color={C.ink} size={12}>√2</Label>
        {done && (
          <>
            <Line.Segment point1={[-R2, 0]} point2={[0, 0]} color={C.f} weight={6} />
            <Line.Segment point1={[-2, 0]} point2={[-R2, 0]} color={C.g} weight={6} />
            <Label at={[-R2, 0]} attach="n" color={C.ink} size={12}>−√2</Label>
          </>
        )}

        {oneRule && (
          <>
            <Plot.OfX y={x => -3 * Math.asin(-x / 2)} domain={[-2, 0]} color={C.bad} style="dashed" weight={3} />
            <Label at={[-1.75, -2.75]} attach="e" color={C.bad} size={12}>↓ −4.71 at x = −2</Label>
          </>
        )}

        <Point x={CORNER[0]} y={CORNER[1]} color={C.guide} />
        <Point x={cRot[0]} y={cRot[1]} color={C.g} />
        <Label at={cRot} attach={done ? 'sw' : 'ne'} color={C.g}>{done ? "C'" : 'C'}</Label>
        <Point x={pRot[0]} y={pRot[1]} color={C.f} />
        <Label at={pRot} attach={done ? 'se' : 'nw'} color={C.f}>{done ? "P'" : 'P'}</Label>
      </Plane>
      <Controls>
        <Slider
          label="\varphi"
          value={phi}
          onChange={v => {
            player.stop()
            setPhi(v)
          }}
          min={0}
          max={180}
          step={1}
          format={v => `${v.toFixed(0)}°`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(phi)} label="Turn half a turn" />
          <Toggle label="One rule for the whole edge" checked={oneRule} onChange={setOneRule} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`C(\\sqrt2,\\tfrac{3\\pi}{4}) \\to (${cRot[0].toFixed(2)},\\ ${cRot[1].toFixed(2)})`} />
          {done && <Readout tex={`(x,y)\\to(-x,-y)\\ \\Rightarrow\\ g(x)=-f(-x)`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
