// 2017 Methods Exam 2 MCQ 2 — slide a tangent along the cubic f(x) = x(x + 5)(x − 3) (the only
// cubic through the labelled stationary points (−3, 36) and (5/3, −400/27) with those turning
// points). The tangent is green going uphill, red going downhill and flat only at the two turning
// points, so f′(x) < 0 exactly on (−3, 5/3) (option D, marked in red on the x-axis). A toggle
// overlays the gradient graph y = f′(x) = (x + 3)(3x − 5): an upright parabola that is below the
// axis BETWEEN its roots, not outside them (the slip behind option C).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts,
  Region, Slider, Toggle, clamp, tick, usePlayer,
} from './kit'

const f = (x: number) => x * x * x + 2 * x * x - 15 * x
const fp = (x: number) => 3 * x * x + 4 * x - 15
const X1 = -3
const X2 = 5 / 3
const XMIN = -7
const XMAX = 5.5
const LO = -6 // keep the point on screen (f(−6) = −54, f(4.4) ≈ 58)
const HI = 4.4
const HALF = 1.1 // half-width (in x) of the drawn tangent segment

const snap = (v: number) => (Math.abs(v - X1) < 0.06 ? X1 : Math.abs(v - X2) < 0.06 ? X2 : v)
const fmt = (v: number) => (v === X2 ? '5/3' : v.toFixed(2))

export default function Downhill() {
  const [x0, setX0] = useState(-1.5)
  const [showGrad, setShowGrad] = useState(false)
  const player = usePlayer(setX0, { min: LO, max: HI, seconds: 9 })

  const m = fp(x0)
  const flat = x0 === X1 || x0 === X2
  const down = !flat && m < 0
  const tanColor = flat ? C.ink : down ? C.bad : C.good
  const y0 = f(x0)
  const mTex = flat ? '0' : m.toFixed(2)

  const move = (v: number) => {
    player.stop()
    setX0(snap(clamp(v, LO, HI)))
  }

  return (
    <div>
      <Plane
        x={[XMIN, XMAX]}
        y={[-60, 60]}
        xStep={1}
        yStep={10}
        height={340}
        xLabels={v => (v >= -7 && v <= 5 ? tick(v) : '')}
        yLabels={v => (Math.round(v) % 20 === 0 ? tick(v) : '')}
      >
        {/* drop from each turning point to the x-axis: the interval's endpoints */}
        <Line.Segment point1={[X1, 36]} point2={[X1, 0]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[X2, f(X2)]} point2={[X2, 0]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[X1, 0]} point2={[X2, 0]} color={C.bad} weight={5} />

        {showGrad && (
          <>
            <Region top={() => 0} bottom={fp} from={X1} to={X2} color={C.bad} opacity={0.15} />
            <Plot.OfX y={fp} domain={[XMIN, XMAX]} color={C.violet} weight={2.5} />
            <Point x={x0} y={m} color={C.violet} />
            <Label at={[-1.6, fp(-1.6)]} color={C.violet} attach="s">y = f′(x)</Label>
          </>
        )}

        <Plot.OfX y={f} domain={[XMIN, XMAX]} color={C.f} weight={3} />
        <Label at={[-5.7, f(-5.7)]} color={C.f} attach="e">y = f(x)</Label>
        <Point x={X1} y={36} color={C.f} />
        <Point x={X2} y={f(X2)} color={C.f} />
        <Label at={[X1, 36]} attach="n" size={12}>(−3, 36)</Label>
        <Label at={[X2, f(X2)]} attach="se" size={12}>(5/3, −400/27)</Label>

        <Line.Segment point1={[x0 - HALF, y0 - HALF * m]} point2={[x0 + HALF, y0 + HALF * m]} color={tanColor} weight={3} />
        <MovablePoint
          point={[x0, y0]}
          onMove={([x]) => move(x)}
          constrain={([x]) => {
            const xc = clamp(x, LO, HI)
            return [xc, f(xc)]
          }}
          color={tanColor}
        />
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={move} min={LO} max={HI} step={0.01} format={fmt} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Slide the tangent" />
          <Toggle label="Show the gradient graph y = f′(x)" checked={showGrad} onChange={setShowGrad} />
        </Buttons>
        <Readouts>
          <Readout color={tanColor} tex={`f'(${x0 === X2 ? '\\tfrac53' : x0.toFixed(2)}) = ${mTex}`} />
          <Readout
            color={tanColor}
            tex={flat ? '\\text{flat: stationary point}' : down ? '\\text{downhill: } f\'(x) < 0' : '\\text{uphill: } f\'(x) > 0'}
          />
        </Readouts>
        {flat ? (
          <Notice>
            At a turning point the tangent is flat: <M>{"f'(x) = 0"}</M>, not less than <M>0</M>. That is why the
            answer uses round brackets, <M>{'\\left(-3, \\tfrac53\\right)'}</M>: the endpoints themselves are left out.
            Nudge the point either way and the tangent tilts again.
          </Notice>
        ) : down ? (
          <Notice>
            Between the maximum at <M>x = -3</M> and the minimum at <M>{'x = \\tfrac53'}</M> the tangent points
            downhill, so <M>{"f'(x) < 0"}</M>. Notice that the curve is <em>above</em> the axis for part of this
            stretch: the sign of <M>f</M> does not matter, only its direction. Slide past either turning point and
            watch the tangent flatten, then turn green.
          </Notice>
        ) : (
          <Notice tone="warn">
            Out here the tangent points uphill, so <M>{"f'(x) > 0"}</M>. These outer stretches,{' '}
            <M>{'(-\\infty, -3) \\cup \\left(\\tfrac53, \\infty\\right)'}</M>, are option C: the opposite of what
            was asked. Turn on the gradient graph: <M>{"y = f'(x)"}</M> is above the axis here, and dips below it
            only between <M>-3</M> and <M>{'\\tfrac53'}</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
