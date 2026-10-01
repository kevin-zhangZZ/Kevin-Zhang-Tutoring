// 2023 Methods Exam 1 Q9c — the biggest triangle is past the peak. Slide A(k, 0) along the x-axis
// with B(k, g(k)) directly above it on track 2, g(x) = 12x − 3x². The triangle OAB has area
// A(k) = ½·k·g(k) = 6k² − (3/2)k³, plotted underneath with its tangent. It starts with B at the peak
// P(2, 12): the tallest triangle, but its area is only 12 and still rising (A'(2) = 6 > 0), because
// the height has stopped growing while the base hasn't. The maximum is at k = 8/3, where
// g(8/3) = 32/3 and A = ½ × 8/3 × 32/3 = 128/9 ≈ 14.22.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Polygon,
  Readout, Readouts, Slider, clamp, num, tick, usePlayer,
} from './kit'

const g = (x: number) => 12 * x - 3 * x * x
const area = (k: number) => 0.5 * k * g(k)
const dA = (k: number) => 12 * k - 4.5 * k * k
const K_STAR = 8 / 3
const A_MAX = 128 / 9
const LO = 0.05
const HI = 3.95
const xl = (v: number) => (v < 0 || v > 4 ? '' : tick(v))
// y tick numbers are drawn left of the axis (below), so they stay clear of the curves near x = 0
const yTicks = (vals: number[]) =>
  vals.map(v => (
    <Label key={v} at={[0, v]} attach="w" color={C.ink} size={12}>
      {String(v)}
    </Label>
  ))

export default function PastThePeak() {
  const [k, setK] = useState(2)
  const player = usePlayer(setK, { min: LO, max: HI, seconds: 8 })
  const h = g(k)
  const A = area(k)
  const s = dA(k)
  const atPeak = Math.abs(k - 2) < 0.03
  const atBest = Math.abs(k - K_STAR) < 0.03
  const tri = atBest ? C.good : C.f
  // keep the tangent a similar length on screen however steep it is
  const dx = 0.35 / Math.sqrt(1 + (s * 0.09) ** 2)

  const move = (v: number) => {
    player.stop()
    setK(clamp(v, LO, HI))
  }

  let notice
  if (atBest) {
    notice = (
      <Notice tone="good">
        <b>This is the biggest triangle.</b> <M>{"A'(k) = \\tfrac{3k}{2}(8 - 3k) = 0"}</M> at <M>{'k = \\tfrac83'}</M>. The
        height is <M>{'g\\left(\\tfrac83\\right) = \\tfrac{32}{3}'}</M>, so the area is{' '}
        <M>{'\\tfrac12 \\times \\tfrac83 \\times \\tfrac{32}{3} = \\tfrac{128}{9} \\approx 14.22'}</M> km². <M>B</M> sits
        past the peak: it gives up a little height for a lot of extra base.
      </Notice>
    )
  } else if (atPeak) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>B</M> is at the peak <M>P</M>
        </b>
        , so this is the tallest triangle (height <M>12</M>, area <M>12</M>). But it is not the biggest. At <M>P</M> the
        height has stopped growing (<M>{"g'(2) = 0"}</M>) while the base keeps growing, so the area is still rising:{' '}
        <M>{"A'(2) = 6 > 0"}</M>. Drag <M>B</M> further right.
      </Notice>
    )
  } else if (k < 2) {
    notice = (
      <Notice>
        Here moving <M>A</M> right makes the base <em>and</em> the height bigger (<M>B</M> is still climbing towards{' '}
        <M>P</M>), so the area rises quickly: <M>{"A'(k) > 0"}</M>. Keep dragging right, or press play.
      </Notice>
    )
  } else if (k < K_STAR) {
    notice = (
      <Notice>
        <M>B</M> is past the peak, so the height is now shrinking, but only slowly: track 2 is still nearly flat near{' '}
        <M>P</M>. The extra base more than makes up for it, so the area is still rising: <M>{"A'(k) > 0"}</M>. Keep going.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Track 2 now drops steeply, so each step right loses more height than the extra base is worth: the area is
        falling, <M>{"A'(k) < 0"}</M>. At <M>k = 4</M>, <M>B</M> reaches the x-axis and the area is <M>0</M>. Drag
        back to find the maximum.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.5, 4.3]} y={[0, 14]} xStep={1} yStep={4} height={240} xLabels={xl} yLabels={false}>
        {yTicks([4, 8, 12])}
        <Polygon points={[[0, 0], [k, 0], [k, h]]} color={tri} fillOpacity={0.25} weight={2} />
        <Plot.OfX y={g} domain={[0, 4]} color={C.g} weight={3} />
        <Label at={[3.55, g(3.55)]} attach="e" color={C.g} size={12}>track 2</Label>
        {k > 1.2 && (
          <Label at={[(2 * k) / 3, h / 3]} attach="c" color={tri} size={12}>
            {`area ${num(A, 2)}`}
          </Label>
        )}
        <Label at={[0, 0]} attach="sw" color={C.ink}>O</Label>
        <Label at={[k, 0]} attach="ne" color={C.ink}>A</Label>
        {atPeak ? (
          <Label at={[k, h]} attach="ne" color={C.ink}>B = P</Label>
        ) : (
          <>
            <Point x={2} y={12} color={C.ink} />
            <Label at={[2, 12]} attach="n" color={C.ink}>P</Label>
            <Label at={[k, h]} attach={k < 2 ? 'nw' : 'ne'} color={C.ink}>B</Label>
          </>
        )}
        <MovablePoint point={[k, h]} onMove={([x]) => move(x)} constrain={([x]) => [clamp(x, LO, HI), g(clamp(x, LO, HI))]} color={C.f} />
      </Plane>
      <div className="mt-3" />
      <Plane x={[-0.5, 4.3]} y={[-1.5, 16]} xStep={1} yStep={4} height={210} xLabel="k" yLabel="" xLabels={xl} yLabels={false}>
        {yTicks([4, 8, 12])}
        {/* the axis name sits beside the top of the axis, where the plane has room for it */}
        <Label at={[0, 16]} attach="e" color={C.ink} size={14} italic>A(k)</Label>
        <Line.Segment point1={[2, 0]} point2={[2, 16]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[2, 1.2]} attach="w" color={C.guide} size={12}>B at P</Label>
        <Plot.OfX y={area} domain={[0, 4]} color={C.violet} weight={2.5} />
        {atBest && (
          <>
            <Line.Segment point1={[0, A_MAX]} point2={[K_STAR, A_MAX]} color={C.good} style="dashed" weight={1.5} />
            <Label at={[0.1, A_MAX]} attach="se" color={C.good} size={12}>128/9 ≈ 14.22</Label>
          </>
        )}
        <Line.Segment point1={[k - dx, A - dx * s]} point2={[k + dx, A + dx * s]} color={C.f} weight={2.5} />
        <Point x={k} y={A} color={atBest ? C.good : C.violet} />
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={move} min={LO} max={HI} step={0.005} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(k)} label="Sweep k from 0 to 4" />
          <ActionButton label="Put B at the peak P" onClick={() => move(2)} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{base } OA = k = ${num(k, 2)}`} color={C.ink} />
          <Readout tex={`\\text{height } AB = g(k) = ${num(h, 2)}`} color={C.g} />
          <Readout tex={`A(k) = \\tfrac12 k\\,g(k) = ${num(A, 2)}`} color={C.violet} />
          <Readout tex={`A'(k) = 12k - \\tfrac92 k^2 = ${num(s, 2)}`} color={C.f} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
