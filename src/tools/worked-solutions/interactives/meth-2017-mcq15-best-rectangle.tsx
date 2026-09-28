// 2017 Methods Exam 2 MCQ 15 — the trade-off behind the maximum. Drag the corner C(u, v) along
// y = 8 − x³: a narrow rectangle is tall but thin, a wide one is short, and the area A(u) = 8u − u⁴
// (plotted underneath, with its tangent) rises and then falls. The tangent is flat at u = ∛2, where
// v = 6 and A = 6∛2 ≈ 7.56 (option B). The notice there points out that ∛2 itself (option A) is
// where the maximum happens, not the maximum.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Slider,
  clamp, num, tick, usePlayer,
} from './kit'

const f = (x: number) => 8 - x ** 3
const area = (u: number) => 8 * u - u ** 4
const dA = (u: number) => 8 - 4 * u ** 3
const U_STAR = Math.cbrt(2)
const A_MAX = 6 * Math.cbrt(2)
const LO = 0.05
const HI = 1.95
const xl = (v: number) => (v < 0 || v > 2.2 ? '' : tick(v))
const yl = (v: number) => (v < 0 || v > 9 ? '' : tick(v))
// top plane: the curve runs through the tick label at y = 8, so that one is drawn left of the axis instead
const ylTop = (v: number) => (v === 8 ? '' : yl(v))

export default function BestRectangle() {
  const [u, setU] = useState(0.6)
  const player = usePlayer(setU, { min: LO, max: HI, seconds: 7 })
  const v = f(u)
  const A = area(u)
  const s = dA(u)
  const near = Math.abs(u - U_STAR) < 0.025
  const d = 0.28

  const move = (x: number) => {
    player.stop()
    setU(clamp(x, LO, HI))
  }

  let notice
  if (near) {
    notice = (
      <Notice tone="good">
        <b>This is the biggest rectangle.</b> The tangent to <M>A(u)</M> is flat: <M>{"A'(u) = 8 - 4u^3 = 0"}</M>, so{' '}
        <M>u^3 = 2</M>, <M>{'u = \\sqrt[3]{2} \\approx 1.26'}</M> and <M>v = 8 - 2 = 6</M>. The maximum area is{' '}
        <M>{'uv = 6\\sqrt[3]{2} \\approx 7.56'}</M>. Careful: <M>{'\\sqrt[3]{2}'}</M> is <em>where</em> the maximum
        happens (option A), not the maximum itself.
      </Notice>
    )
  } else if (u < U_STAR) {
    notice = (
      <Notice>
        A narrow rectangle: tall (<M>v</M> is close to <M>8</M>) but thin, so its area is small. Near the top the curve
        is almost flat, so widening costs hardly any height, and <M>A(u)</M> is still rising:{' '}
        <M>{"A'(u) > 0"}</M>. Drag <M>C</M> to the right, or press play.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        A wide rectangle: the curve is plunging here, so each extra bit of width costs a lot of height, and{' '}
        <M>A(u)</M> is falling: <M>{"A'(u) < 0"}</M>. At <M>u = 2</M> the height, and so the area, is <M>0</M>. Drag{' '}
        <M>C</M> back to find the peak.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.35, 2.45]} y={[-0.6, 9.4]} xStep={0.5} yStep={2} height={250} xLabels={xl} yLabels={ylTop}>
        <Label at={[0, 8]} attach="w" color={C.ink} size={12}>8</Label>
        <Polygon points={[[0, 0], [u, 0], [u, v], [0, v]]} color={near ? C.good : C.f} fillOpacity={0.25} weight={2} />
        <Plot.OfX y={f} domain={[0, 2]} color={C.ink} weight={2.5} />
        {u >= 0.8 && (
          <Label at={[u / 2 + 0.1, v / 2]} attach="c" color={near ? C.good : C.f} size={12}>
            {`A = ${num(A, 2)}`}
          </Label>
        )}
        <Label at={[u, v]} attach="ne" color={C.ink}>C(u, v)</Label>
        <MovablePoint point={[u, v]} onMove={([x]) => move(x)} constrain={([x]) => [clamp(x, LO, HI), f(clamp(x, LO, HI))]} color={C.g} />
      </Plane>
      <div className="mt-3" />
      <Plane x={[-0.35, 2.45]} y={[-0.6, 9.4]} xStep={0.5} yStep={2} height={200} xLabel="u" yLabel="A" xLabels={xl} yLabels={yl}>
        <Plot.OfX y={area} domain={[0, 2]} color={C.violet} weight={2.5} />
        {near && (
          <>
            <Line.Segment point1={[0, A_MAX]} point2={[U_STAR, A_MAX]} color={C.good} style="dashed" weight={1.5} />
            <Label at={[0.05, A_MAX]} attach="se" color={C.good} size={12}>6∛2 ≈ 7.56</Label>
          </>
        )}
        <Line.Segment point1={[u - d, A - d * s]} point2={[u + d, A + d * s]} color={C.g} weight={2.5} />
        <Point x={u} y={A} color={near ? C.good : C.violet} />
      </Plane>
      <Controls>
        <Slider label="u" value={u} onChange={move} min={LO} max={HI} step={0.005} />
        <PlayButton playing={player.playing} onClick={() => player.toggle(u)} label="Sweep u from 0 to 2" />
        <Readouts>
          <Readout tex={`v = 8 - u^3 = ${num(v, 2)}`} color={C.ink} />
          <Readout tex={`A = uv = ${num(A, 2)}`} color={C.violet} />
          <Readout tex={`A'(u) = 8 - 4u^3 = ${num(s, 2)}`} color={C.g} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
