// 2017 Specialist Exam 2 MCQ 10 — the question asks about |f(x)|, not f. Slide "flip" from 0 to 1
// and every part of the curve below the x-axis is reflected up (y → −y). The point of
// inflection (b, −1) of f rides up to (b, 1): the reflection turns concave up into concave down
// and vice versa, so a change of concavity is still a change. At x = −a the curve bends the same
// way on both sides before the flip and after it, so (−a, 1) is still not a point of inflection.
// A short tangent at each point shows it: at an inflection the tangent cuts through the curve.
// Same f as spec-2017-mcq10-squared-factor.tsx (a = 3, b = −1, fitted to every condition).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, num, usePlayer } from './kit'

const A = 3
const B = -1
const c = -1.7290836901031864
const q = (x: number) => ((-0.030410672526482138 * x - 0.31840114125436199) * x - 1.1317075689903847) * x - 1.3697252828043172
const dq = (x: number) => (3 * -0.030410672526482138 * x + 2 * -0.31840114125436199) * x - 1.1317075689903847
const C1 = -0.22927273293549762
const C2 = 1.7350399039438822
const f = (x: number) => Math.exp(c * x) * q(x) + C1 * x + C2
const fp = (x: number) => Math.exp(c * x) * (c * q(x) + dq(x)) + C1

const X0 = -4.5
const X1 = 4.5
const Y = 2.6

/** A tangent segment at x on the curve y = s·f(x), where s = ±1 or anything between, running
 *  `left` units to the left and `right` units to the right. Near b and −a the curve is almost
 *  straight (f″ = 0 there), so the segment has to be about a unit long before the gap between it
 *  and the curve shows. At −a it stops 0.4 short on the left, before the corner at x ≈ −3.43. */
function tangent(x: number, s: number, left: number, right: number): [[number, number], [number, number]] {
  const y = s * f(x)
  const m = s * fp(x)
  return [
    [x - left, y - m * left],
    [x + right, y + m * right],
  ]
}

/** −1 and 1 as whole numbers at the ends of the flip, two decimals on the way. */
const height = (v: number) => (Math.abs(Math.abs(v) - 1) < 0.005 ? num(v, 0) : num(v))

export default function AbsInflection() {
  const [t, setT] = useState(0)
  const player = usePlayer(setT, { min: 0, max: 1, seconds: 3 })
  // Negative parts are scaled by cos(πt): 1 (f itself) → 0 (flattened) → −1 (reflected, |f|).
  const s = Math.cos(Math.PI * t)
  const h = (x: number) => {
    const v = f(x)
    return v >= 0 ? v : s * v
  }
  const done = t > 0.995
  const [tb1, tb2] = tangent(B, s, 1, 1)
  const [ta1, ta2] = tangent(-A, s, 0.4, 0.8)

  let notice
  if (t < 0.005) {
    notice = (
      <Notice>
        This is <M>f</M>. Its only point of inflection is <M>(b, -1)</M>: the tangent there cuts through the curve. At{' '}
        <M>(-a, -1)</M> the tangent stays under the curve on both sides, so that is not one. But the question asks about{' '}
        <M>|f(x)|</M>. Press <b>Flip</b> (or drag the slider) to reflect every part below the <M>x</M>-axis up above it.
      </Notice>
    )
  } else if (!done) {
    notice = (
      <Notice>
        Where <M>f(x) &lt; 0</M>, <M>|f(x)| = -f(x)</M>: each point <M>(x, y)</M> below the axis goes to{' '}
        <M>(x, -y)</M>. The parts above the axis don&apos;t move. Watch the two points at height <M>-1</M>: they are heading
        for height <M>1</M>, and the bends in the curve between them are turning upside down.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>This is <M>|f|</M>.</b> The piece between the two <M>x</M>-intercepts was reflected, so concave up became concave
        down and vice versa. At <M>x = b</M> the concavity still changes (now from down to up) and the tangent still cuts
        through: the point of inflection survives, at <M>{'(b, |f(b)|) = (b, 1)'}</M>. That is option <b>E</b>. At{' '}
        <M>x = -a</M> the curve is now concave down on both sides, so <M>(-a, 1)</M> is still not a point of inflection.
        The sharp corners where <M>f</M> crosses the axis have no tangent at all, so they aren&apos;t points of inflection
        either.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-Y, Y]} xStep={1} yStep={1} height={320} labels={false}>
        {/* mafs's Text puts attach 'n' BELOW the anchor and 's' above it, so these read inverted. */}
        <Label at={[-A, 0]} attach={s > 0 ? 'n' : 's'} size={12}>−a</Label>
        <Label at={[B, 0]} attach={s > 0 ? 'n' : 's'} size={12}>b</Label>
        <Label at={[-B, 0]} attach="s" size={12}>−b</Label>
        <Label at={[A, 0]} attach="s" size={12}>a</Label>
        {t > 0.005 && <Plot.OfX y={f} domain={[-3.8, X1]} color={C.guide} weight={1.5} style="dashed" />}
        <Plot.OfX y={h} domain={[-3.8, X1]} color={C.f} weight={3} />
        <Line.Segment point1={ta1} point2={ta2} color={C.guide} weight={2.5} />
        <Line.Segment point1={tb1} point2={tb2} color={C.g} weight={2.5} />
        <Point x={-A} y={-s} color={C.guide} />
        <Point x={B} y={-s} color={C.good} />
        {/* Before the flip both labels sit up-left of their points; after it, both go to the right
            (inside the arch for −a, above the falling tangent for b) so they can't meet. */}
        <Label at={[B, -s]} color={C.good} attach={s > 0 ? 'nw' : 'e'}>{`(b, ${height(-s)})`}</Label>
        <Label at={[-A, -s]} color={C.guide} attach={s > 0 ? 'nw' : 'e'}>{`(−a, ${height(-s)})`}</Label>
      </Plane>
      <Controls>
        <Slider
          label="\text{flip}"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={1}
          step={0.01}
          format={v => `${Math.round(v * 100)}%`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Flip" />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`\\text{at } x = b: \\ (b,\\ ${height(-s)})`} />
          <Readout color={C.guide} tex={`\\text{at } x = -a: \\ (-a,\\ ${height(-s)})`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
