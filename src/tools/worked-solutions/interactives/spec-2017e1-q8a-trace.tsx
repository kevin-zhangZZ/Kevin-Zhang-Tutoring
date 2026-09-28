// 2017 Specialist Exam 1 Q8a — sketching a solution curve means letting the ticks steer the pencil.
// The slope field of dy/dx = −x/(1 + y²) with a pencil that starts at (−1, 1) and moves along the
// true solution (2y³ + 6y + 3x² − 11 = 0, from part b.), always carrying its tangent, which lies
// along the tick it is on. The readouts give the gradient at the pencil; markers appear at the
// y-intercept (0, 1.22) — the height students misread as the answer — and at the x-intercept
// √(11/3) ≈ 1.9. A toggle reflects the drawn curve and the tangent in the y-axis: x → −x flips the
// sign of dy/dx, so the mirror image follows the ticks too and the curve is symmetric.

import { memo, useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, num,
  usePlayer,
} from './kit'

const K = 11 / 6 // y + y³/3 = −x²/2 + K through (−1, 1)
const slope = (x: number, y: number) => -x / (1 + y * y)
/** The one real root of y³ + 3y + q = 0 with q = 3x²/2 − 3K (Cardano; 3y² + 3 > 0 so y is unique). */
function solY(x: number) {
  const q = 1.5 * x * x - 3 * K
  const r = Math.sqrt((q * q) / 4 + 1)
  return Math.cbrt(-q / 2 + r) + Math.cbrt(-q / 2 - r)
}
const X_INT = Math.sqrt(11 / 3)
const Y_INT = solY(0)
const EDGE = 3.2

/** The field as VCAA drew it (a tick every 0.2 units, each a short piece of the tangent), widened to x = ±3.2. */
const Field = memo(function Field() {
  const marks = []
  for (let i = -16; i <= 16; i++) {
    for (let j = -12; j <= 12; j++) {
      const x = i / 5
      const y = j / 5
      const m = slope(x, y)
      const u = 0.075 / Math.hypot(1, m)
      marks.push(
        <Line.Segment key={`${i},${j}`} point1={[x - u, y - u * m]} point2={[x + u, y + u * m]} color={C.guide} weight={1.4} opacity={0.75} />,
      )
    }
  }
  return <>{marks}</>
})

export default function Trace() {
  const [xp, setXp] = useState(0.8)
  const [mirror, setMirror] = useState(false)
  const player = usePlayer(setXp, { min: -1, max: EDGE, seconds: 8 })

  const yp = solY(xp)
  const m = slope(xp, yp)
  const u = 0.45 / Math.hypot(1, m)
  const lo = Math.min(-1, xp)
  const hi = Math.max(-1, xp)
  const reachedX = xp >= X_INT - 0.01
  const reachedY = xp >= 0
  const atStart = Math.abs(xp + 1) < 0.04
  const atPeak = Math.abs(xp) < 0.06
  const atCross = Math.abs(xp - X_INT) < 0.06

  let notice
  if (atStart) {
    notice = (
      <Notice>
        The pencil is on <M>(-1, 1)</M>. The tick here has gradient <M>{'\\frac{-(-1)}{1+1^2} = \\tfrac12'}</M>, gently
        uphill to the right. That is all the equation tells you at any point: which way to head next. Press{' '}
        <b>Trace</b> and watch the orange tangent stay on the ticks.
      </Notice>
    )
  } else if (xp < -1.87) {
    notice = (
      <Notice>
        Going left from the start the curve falls ever more steeply, crossing the <M>x</M>-axis near{' '}
        <M>x = -1.9</M>, then easing off slightly as it carries on to the edge of the field. The question wants the <b>positive</b> value, but this
        one is its mirror image, a first hint that the curve is symmetric. Turn on the mirror to check.
      </Notice>
    )
  } else if (xp < -1) {
    notice = (
      <Notice>
        Left of the start the ticks get steeper as <M>|x|</M> grows, so the curve drops faster and faster. A solution curve
        is drawn across the whole field in <b>both</b> directions from the given point, not just the part near it.
      </Notice>
    )
  } else if (xp < -0.06) {
    notice = (
      <Notice>
        Still climbing, but less steeply: <M>{'\\frac{dy}{dx} = \\frac{-x}{1+y^2}'}</M> shrinks to <M>0</M> as{' '}
        <M>x \to 0</M>. From <M>x = -1</M> to <M>x = 0</M> the curve rises only about <M>0.2</M>. Keep going to the{' '}
        <M>y</M>-axis.
      </Notice>
    )
  } else if (atPeak) {
    notice = (
      <Notice>
        On the <M>y</M>-axis the ticks are flat (<M>x = 0</M> makes <M>{'\\tfrac{dy}{dx} = 0'}</M>), so the curve peaks
        here at <M>y \approx 1.22</M>. That is the <b><M>y</M>-intercept</b>, the height when <M>x = 0</M>, not the
        answer. The question wants <M>x</M> when <M>y = 0</M>: keep tracing right.
      </Notice>
    )
  } else if (atCross) {
    notice = (
      <Notice tone="good">
        The pencil crosses the <M>x</M>-axis at <M>x \approx 1.9</M>: that is the estimate part a. wants (part b. gives it
        exactly as <M>{'\\sqrt{11/3} \\approx 1.915'}</M>). The tick here is steep, gradient about <M>-1.9</M>. Keep going:
        the curve does not stop at the axis.
      </Notice>
    )
  } else if (xp > X_INT) {
    notice = (
      <Notice>
        The curve is steepest just past the <M>x</M>-axis. Below it <M>y^2</M> grows again, so <M>1+y^2</M> gets
        bigger and the ticks ease off a little, but the curve keeps falling, reaching about <M>y = -1.7</M> at the edge
        of this field. Draw it all the way across the field you are given: the report says
        some students stopped at the <M>x</M>-intercepts.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right of the <M>y</M>-axis, <M>-x</M> is negative, so every tick slopes down and the curve falls, gently at first,
        then more steeply. Turn on the mirror: the right half is the left half reflected. Then trace on to{' '}
        <M>y = 0</M>.
      </Notice>
    )
  }

  const mirrorNotice = mirror && (
    <Notice>
      The violet dashed curve is the drawn part reflected in the <M>y</M>-axis, and it lies exactly on the ticks. Swapping{' '}
      <M>x</M> for <M>-x</M> flips the sign of <M>{'\\frac{-x}{1+y^2}'}</M> but not its size, so the tick at{' '}
      <M>(-x, y)</M> is the mirror image of the tick at <M>(x, y)</M>. The curve must be symmetric about the{' '}
      <M>y</M>-axis.
    </Notice>
  )

  return (
    <div>
      <Plane x={[-3.2, 3.2]} y={[-2.5, 2.5]} height={460} equalScale>
        <Field />
        {mirror && (
          <>
            <Plot.OfX y={x => solY(-x)} domain={[-hi, -lo]} color={C.violet} style="dashed" weight={3} />
            <Line.Segment point1={[-xp - u, yp + u * m]} point2={[-xp + u, yp - u * m]} color={C.violet} weight={2.5} />
            <Point x={-xp} y={yp} color={C.violet} />
          </>
        )}
        <Plot.OfX y={solY} domain={[lo, hi]} color={C.f} weight={3.5} />
        {reachedY && <Point x={0} y={Y_INT} color={C.ink} />}
        {reachedY && <Label at={[0, Y_INT]} attach="ne" gap={9}>(0, 1.22)</Label>}
        {reachedX && <Point x={X_INT} y={0} color={C.good} />}
        {reachedX && <Label at={[X_INT, 0]} attach="ne" color={C.good} gap={9}>x ≈ 1.9</Label>}
        <Point x={-1} y={1} color={C.f} />
        <Label at={[-1, 1]} attach="nw" color={C.f} gap={9}>(−1, 1)</Label>
        <Line.Segment point1={[xp - u, yp - u * m]} point2={[xp + u, yp + u * m]} color={C.g} weight={2.5} />
        <Point x={xp} y={yp} color={C.g} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={xp}
          onChange={v => {
            player.stop()
            setXp(v)
          }}
          min={-EDGE}
          max={EDGE}
          step={0.005}
        />
        <Buttons>
          <PlayButton
            playing={player.playing}
            onClick={() => {
              // A fresh trace always starts at the given point; pressing again pauses.
              if (!player.playing) setXp(-1)
              player.toggle(-1)
            }}
            label="Trace from (−1, 1)"
          />
          <Toggle label="Mirror in the y-axis" checked={mirror} onChange={setMirror} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\text{pencil} = (${num(xp)},\\ ${num(yp)})`} />
          <Readout color={C.g} tex={`\\frac{dy}{dx} = \\frac{-x}{1+y^2} = ${num(m)}`} />
          {mirror && <Readout color={C.violet} tex={`\\text{at } (${num(-xp)},\\ ${num(yp)}):\\ \\frac{dy}{dx} = ${num(-m)}`} />}
        </Readouts>
        {notice}
        {mirrorNotice}
      </Controls>
    </div>
  )
}
