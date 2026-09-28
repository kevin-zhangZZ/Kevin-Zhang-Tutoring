// 2018 Specialist Exam 1 Q5 — y = 0 is an asymptote of f(x) = (x + 1)/(x² − 4) because of the
// ENDS, not the middle. Zoom the window out from VCAA's −4…4 to −100…100: the vertical asymptotes
// and the crossing at (−1, 0) squeeze into the middle, while both ends lie along y = 0 (below on the
// left, above on the right). Readouts give f at the window's edges, which shrink towards 0.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const f = (x: number) => (x + 1) / (x * x - 4)
const Y = 1
const t = (v: number, dp = 3) => (Math.abs(v) < 0.5 * 10 ** -dp ? (0).toFixed(dp) : v.toFixed(dp))

/** Window half-widths the slider steps through, each with a tick spacing that divides it (so no
 *  tick number sits half-clipped just past the edge). */
const WINDOWS: [number, number][] = [
  [4, 1], [5, 1], [6, 2], [8, 2], [10, 5], [12, 6], [16, 8], [20, 10], [30, 15], [40, 20], [50, 25],
  [60, 30], [80, 40], [100, 50],
]

export default function Ends() {
  const [s, setS] = useState(0)
  const [R, step] = WINDOWS[s]
  const eps = 0.02
  const fr = f(R)
  const fl = f(-R)
  const zoomed = R >= 12

  return (
    <div>
      <Plane x={[-R, R]} y={[-Y, Y]} xStep={step} yStep={0.5} height={280}>
        <Line.Segment point1={[-2, -Y - 0.1]} point2={[-2, Y + 0.1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[2, -Y - 0.1]} point2={[2, Y + 0.1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[-R, 0]} point2={[R, 0]} color={C.bad} style="dashed" weight={2} />
        <Label at={[-0.75 * R, 0]} attach="n" color={C.bad}>y = 0</Label>
        <Plot.OfX y={f} domain={[-R, -2 - eps]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[-2 + eps, 2 - eps]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[2 + eps, R]} color={C.f} weight={3} />
        <Point x={-1} y={0} color={C.good} />
        {!zoomed && (
          <Label at={[-1, 0]} attach="ne" color={C.good}>(−1, 0)</Label>
        )}
        <Point x={-R} y={fl} color={C.f} />
        <Point x={R} y={fr} color={C.f} />
      </Plane>
      <Controls>
        <Slider label={'\\text{window}'} value={s} onChange={setS} min={0} max={WINDOWS.length - 1} step={1} format={() => `±${R}`} />
        <Readouts>
          <Readout color={C.f} tex={`f(-${R}) = ${t(fl)}`} />
          <Readout color={C.f} tex={`f(${R}) = ${t(fr)}`} />
        </Readouts>
        {zoomed ? (
          <Notice tone="good">
            Zoomed out, everything near <M>x = \pm 2</M> squeezes into the middle, and both ends lie along the red
            line: <b>just below <M>y = 0</M> on the left, just above it on the right</b>. The <M>x^2</M> in the
            denominator beats the <M>x</M> in the numerator, so <M>f(x) \to 0</M> as <M>x \to \pm\infty</M>. That is
            the horizontal asymptote <M>y = 0</M>, and the sketch must label it.
          </Notice>
        ) : (
          <Notice>
            The middle branch <b>crosses</b> the red line <M>y = 0</M> at <M>(-1, 0)</M>. That does not stop{' '}
            <M>y = 0</M> being an asymptote: a horizontal asymptote only describes what happens as{' '}
            <M>x \to \pm\infty</M>. Drag the slider to zoom out and watch the two ends.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
