// 2018 Specialist Exam 1 Q9a — why every value of t puts P = (sec t, (√2/2) tan t) on x² − 2y² = 1.
// Drag or play t: the readout x² − 2y² = sec²t − tan²t stays at exactly 1 however P moves, which is
// what "eliminating t" means. For −π/2 < t < π/2, cos t > 0 so x = sec t ≥ 1 (right branch); for
// π/2 < |t| ≤ π, cos t < 0 so x ≤ −1 (left branch), so t ∈ R traces the whole hyperbola. Near
// t = ±π/2 the point runs off along an asymptote y = ±x/√2. A toggle draws why the identity holds:
// the tangent to the unit circle at Q = (cos t, sin t) meets the x-axis at T = (sec t, 0); OQ = 1,
// QT = |tan t|, OT = |sec t| with a right angle at Q, so sec²t = 1 + tan²t by Pythagoras. P sits
// directly above or below T, at height (√2/2) tan t.

import { useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts,
  Slider, Toggle, tick, usePlayer,
} from './kit'

const S = Math.SQRT2 / 2

type P2 = [number, number]
/** d units from `from`, heading directly away from `away` (for a label clear of a triangle). */
function push(from: P2, away: P2, d: number): P2 {
  const dx = from[0] - away[0]
  const dy = from[1] - away[1]
  const L = Math.hypot(dx, dy) || 1
  return [from[0] + (d * dx) / L, from[1] + (d * dy) / L]
}

const fmt = (v: number) => (Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(3))

export default function Trace() {
  const [t, setT] = useState(0.8)
  const [why, setWhy] = useState(false)
  const player = usePlayer(setT, { min: -Math.PI, max: Math.PI, seconds: 10 })
  // Zoom in on the unit circle while the triangle is showing.
  const XM = why ? 2.6 : 4.2
  const YM = why ? 1.8 : 2.8
  const UMAX = Math.acosh(XM)

  const c = Math.cos(t)
  const s = Math.sin(t)
  const sec = 1 / c
  const tan = Math.tan(t)
  const py = S * tan
  const right = c > 0
  const onScreen = Math.abs(c) > 1e-6 && Math.abs(sec) <= XM && Math.abs(py) <= YM
  const col = right ? C.f : C.g
  const x2 = sec * sec
  const y2 = 2 * py * py

  // Right-angle marker at Q: along Q→O and along Q→T.
  const a = 0.16
  const u1: [number, number] = [-c, -s]
  const sg = Math.sign(tan) || 1
  const u2: [number, number] = [sg * s, -sg * c]
  const Q: [number, number] = [c, s]
  const square: [number, number][] = [
    Q,
    [Q[0] + a * u1[0], Q[1] + a * u1[1]],
    [Q[0] + a * u1[0] + a * u2[0], Q[1] + a * u1[1] + a * u2[1]],
    [Q[0] + a * u2[0], Q[1] + a * u2[1]],
  ]
  const showTri = why && Math.abs(sec) <= XM + 0.5 && Math.abs(tan) > 0.05
  // Label spots: '1' just inside the triangle, 'tan t' just outside, 'Q' beyond the circle.
  const G: P2 = [(c + sec) / 3, s / 3]
  const midOQ: P2 = [c / 2, s / 2]
  const midQT: P2 = [(c + sec) / 2, s / 2]
  const one = push(midOQ, [2 * midOQ[0] - G[0], 2 * midOQ[1] - G[1]], 0.16)
  const tanAt = push(midQT, G, 0.2)
  const qAt: P2 = [1.2 * c, 1.2 * s]

  let notice
  if (why) {
    notice = (
      <Notice>
        <b>Why <M>{'\\sec^2 t - \\tan^2 t = 1'}</M>:</b> the tangent to the unit circle at <M>Q</M> is perpendicular to the
        radius <M>OQ</M>, and it meets the <M>x</M>-axis at <M>T = (\sec t, 0)</M>. So triangle <M>OQT</M> has a right angle
        at <M>Q</M>, with <M>OQ = 1</M>, <M>{'QT = |\\tan t|'}</M> and <M>{'OT = |\\sec t|'}</M>. Pythagoras gives{' '}
        <M>{'\\sec^2 t = 1 + \\tan^2 t'}</M>. <M>P</M> sits directly above or below <M>T</M>, at height{' '}
        <M>{'\\tfrac{\\sqrt2}{2}\\tan t'}</M>.
      </Notice>
    )
  } else if (!onScreen) {
    notice = (
      <Notice tone="warn">
        As <M>{'t \\to \\pm\\tfrac{\\pi}{2}'}</M>, <M>\cos t \to 0</M>, so <M>\sec t</M> and <M>\tan t</M> both blow up and{' '}
        <M>P</M> runs off the screen along an asymptote <M>{'y = \\pm\\tfrac{x}{\\sqrt2}'}</M> (the dashed lines). At{' '}
        <M>{'t = \\pm\\tfrac{\\pi}{2}'}</M> itself <M>\sec t</M> is undefined; just past it, <M>P</M> comes back on the{' '}
        <b>other</b> branch.
      </Notice>
    )
  } else if (right) {
    notice = (
      <Notice>
        <b>Every</b> position of <M>P</M> gives <M>x^2 - 2y^2 = 1</M>: squaring turns the coordinates into{' '}
        <M>\sec^2 t</M> and <M>\tan^2 t</M>, and those always differ by exactly 1. That is what eliminating <M>t</M> means,
        finding a rule that holds whatever <M>t</M> is. Press play to sweep <M>t</M> from <M>-\pi</M> to <M>\pi</M>, or show
        the triangle to see why the identity is true.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now <M>{'\\cos t < 0'}</M>, so <M>x = \sec t \le -1</M>: the same rule traces the <b>left</b> branch. Because{' '}
        <M>t \in R</M>, the curve is the whole hyperbola. Only the right branch meets <M>y = x - 1</M> (part b), so only the
        right branch helps bound the region in part c.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-XM, XM]} y={[-YM, YM]} xStep={1} yStep={1} height={340} equalScale labels={why ? false : tick} yLabels={why ? false : v => (Math.abs(v) > 2.9 ? '' : tick(v))}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, S]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[0, 0]} point2={[1, -S]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.Parametric
          xy={u => [Math.cosh(u), Math.sinh(u) * S]}
          domain={[-UMAX, UMAX]}
          color={right ? C.f : C.guide}
          weight={right ? 3 : 1.5}
        />
        <Plot.Parametric
          xy={u => [-Math.cosh(u), Math.sinh(u) * S]}
          domain={[-UMAX, UMAX]}
          color={right ? C.guide : C.g}
          weight={right ? 1.5 : 3}
        />
        {why && (
          <>
            <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} />
            {showTri && (
              <>
                <Polygon points={square} color={C.ink} fillOpacity={0} weight={1} />
                <Line.Segment point1={[0, 0]} point2={Q} color={C.ink} weight={2.5} />
                <Line.Segment point1={Q} point2={[sec, 0]} color={C.violet} weight={3} />
                <Line.Segment point1={[0, 0]} point2={[sec, 0]} color={C.good} weight={4} />
                <Point x={c} y={s} color={C.ink} />
                <Label at={one} attach="c" size={12}>1</Label>
                <Label at={tanAt} attach="c" color={C.violet} size={12}>
                  tan t
                </Label>
                <Label at={[sec / 2, 0]} attach={s > 0 ? 's' : 'n'} color={C.good} size={12}>
                  sec t
                </Label>
                <Label at={qAt} attach="c" size={12}>Q</Label>
                <Label at={[sec, 0]} attach={s > 0 ? 'se' : 'ne'} size={12}>T</Label>
              </>
            )}
          </>
        )}
        {onScreen && (
          <>
            {why && <Line.Segment point1={[sec, 0]} point2={[sec, py]} color={C.guide} style="dashed" weight={1.5} />}
            <Point x={sec} y={py} color={col} />
            <Label at={[sec, py]} attach={right ? 'e' : 'w'} color={col}>P</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={-Math.PI}
          max={Math.PI}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Sweep t from −π to π" />
          <Toggle label="Why is sec²t − tan²t = 1?" checked={why} onChange={setWhy} />
        </Buttons>
        <Readouts>
          <Readout color={col} tex={`x = \\sec t = ${fmt(sec)}`} />
          <Readout color={col} tex={`y = \\tfrac{\\sqrt2}{2}\\tan t = ${fmt(py)}`} />
          <Readout
            color={C.good}
            tex={`x^2 - 2y^2 = ${fmt(x2)} - ${fmt(y2)} = ${(x2 - y2).toFixed(3)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
