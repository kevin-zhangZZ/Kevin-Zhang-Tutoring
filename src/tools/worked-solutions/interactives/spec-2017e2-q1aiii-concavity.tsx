// 2017 Specialist Exam 2 Q1a.iii — f''(x) = 6x²(x³ − 2)/(1 + x³)³ is zero at x = 0 AND at x = ∛2,
// but only one of those is a point of inflection. Slide a tangent along f(x) = x/(1 + x³): the curve
// is coloured by concavity (orange = concave down, violet = concave up), and the graph of f'' below
// shows it touching zero at x = 0 (the x² factor never goes negative) but crossing at x = ∛2.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider,
  tick, usePlayer,
} from './kit'

const f = (x: number) => x / (1 + x ** 3)
const f1 = (x: number) => (1 - 2 * x ** 3) / (1 + x ** 3) ** 2
const f2 = (x: number) => (6 * x * x * (x ** 3 - 2)) / (1 + x ** 3) ** 3
const XI = Math.cbrt(2) // 1.2599…, the true inflection
const DOWN = C.g // concave down
const UP = C.violet // concave up

// Monotone bisection: first x in [lo, hi] where g crosses the target.
function solve(g: (x: number) => number, target: number, lo: number, hi: number) {
  const s = Math.sign(g(lo) - target)
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (Math.sign(g(mid) - target) === s) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}
const F_LEFT = solve(f, 2.4, -3, -1 - 1e-9)
const F_RIGHT = solve(f, -2.4, -1 + 1e-9, 0)
const F2_LEFT = solve(f2, 0.9, -3, -1 - 1e-9)
const F2_RIGHT = solve(f2, -2.9, -1 + 1e-9, 0)

const sgn = (v: number) => (Math.abs(v) < 1e-9 ? '0' : v > 0 ? '+' : '-')

export default function Concavity() {
  const [x0, setX0] = useState(0)
  const player = usePlayer(setX0, { min: -0.8, max: 3, seconds: 8 })
  const move = (v: number) => {
    player.stop()
    // x = −1 is not in the domain: jump over the gap around the asymptote.
    if (v > -1.2 && v < -0.8) v = v < -1 ? -1.2 : -0.8
    setX0(v)
  }

  const y0 = f(x0)
  const m = f1(x0)
  const d2 = f2(x0)
  const atZero = Math.abs(x0) < 0.03
  const atXi = Math.abs(x0 - XI) < 0.03
  const col = atZero || atXi ? C.ink : d2 > 0 ? UP : DOWN
  const half = 0.8 / Math.sqrt(1 + m * m)

  let notice
  if (atZero) {
    notice = (
      <Notice tone="warn">
        <b><M>{"f''(0) = 0"}</M>, but this is not an inflection.</b> The curve is orange (concave down) on{' '}
        <b>both</b> sides of the origin, and in the lower graph <M>{"f''"}</M> only <em>touches</em> zero and goes
        back down. The factor <M>{'x^2'}</M> is zero at <M>x = 0</M> but never negative, so it can&apos;t flip the sign.
        Slide a little either way to check.
      </Notice>
    )
  } else if (atXi) {
    notice = (
      <Notice tone="good">
        Here <M>{"f''"}</M> <b>crosses</b> zero: negative to the left, positive to the right, because the factor{' '}
        <M>{'x^3 - 2'}</M> changes sign. The curve switches from concave down to concave up, and the tangent cuts
        through the curve. This is the only point of inflection, <M>{'(1.26,\\ 0.42)'}</M>.
      </Notice>
    )
  } else if (x0 < -1) {
    notice = (
      <Notice>
        Left of the asymptote the curve is concave up (<M>{"f'' > 0"}</M>), and just right of it concave down. The
        concavity differs across <M>x = -1</M>, but there is no point on the graph there, so it can&apos;t be a
        point of inflection.
      </Notice>
    )
  } else if (x0 < XI) {
    notice = (
      <Notice>
        Concave down: the curve bends away below its tangent, and <M>{"f''(x) < 0"}</M>. Slide through{' '}
        <M>x = 0</M> and watch whether the colour changes, then keep going to <M>{'x = \\sqrt[3]{2}'}</M>. Or press
        Sweep.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Concave up now: the curve sits above its tangent and <M>{"f''(x) > 0"}</M>. It has to bend back up so it can
        level off towards the asymptote <M>y = 0</M>, which is why the concavity has to change somewhere after
        the maximum.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-2, 2]} height={250}>
        <Line.Segment point1={[-1, -2.4]} point2={[-1, 2.4]} color={C.guide} style="dashed" weight={2} />
        <Plot.OfX y={f} domain={[-3, F_LEFT]} color={UP} weight={3.5} />
        <Plot.OfX y={f} domain={[F_RIGHT, XI]} color={DOWN} weight={3.5} />
        <Plot.OfX y={f} domain={[XI, 3]} color={UP} weight={3.5} />
        <Line.Segment point1={[x0 - half, y0 - m * half]} point2={[x0 + half, y0 + m * half]} color={C.f} weight={2.5} />
        <Point x={0} y={0} color={atZero ? C.bad : C.guide} />
        <Point x={XI} y={f(XI)} color={C.good} />
        <Point x={x0} y={y0} color={C.f} />
        {atXi && <Label at={[XI, f(XI)]} attach="ne" color={C.good}>(1.26, 0.42)</Label>}
        {atZero && <Label at={[0, 0]} attach="nw" color={C.bad}>(0, 0)?</Label>}
      </Plane>
      <Plane x={[-3, 3]} y={[-2.5, 0.5]} yStep={0.5} height={170} xLabel="x" yLabel="" yLabels={v => (Number.isInteger(v) ? tick(v) : '')}>
        <Line.Segment point1={[-1, -2.8]} point2={[-1, 0.8]} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={[x0, -2.8]} point2={[x0, 0.8]} color={C.f} style="dashed" weight={1.5} />
        <Plot.OfX y={f2} domain={[-3, F2_LEFT]} color={UP} weight={3} />
        <Plot.OfX y={f2} domain={[F2_RIGHT, 0]} color={DOWN} weight={3} />
        <Plot.OfX y={f2} domain={[0, XI]} color={DOWN} weight={3} />
        <Plot.OfX y={f2} domain={[XI, 3]} color={UP} weight={3} />
        <Point x={0} y={0} color={atZero ? C.bad : C.guide} />
        <Point x={XI} y={0} color={C.good} />
        {d2 > -2.8 && d2 < 0.8 && <Point x={x0} y={d2} color={C.f} />}
        <Label at={[2.1, -1.3]} attach="c">y = f″(x)</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={move} min={-3} max={3} step={0.01} />
        <Buttons>
          <ActionButton label={<M>{'x = 0'}</M>} onClick={() => move(0)} />
          <ActionButton label={<M>{'x = \\sqrt[3]{2}'}</M>} onClick={() => move(XI)} />
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0 < -0.8 || x0 > 2.95 ? -0.8 : x0)} label="Sweep" />
        </Buttons>
        <Readouts>
          <Readout color={col} tex={`f''(${x0.toFixed(2)}) = ${Math.abs(d2) < 5e-4 ? '0' : d2.toFixed(3)}`} />
          <Readout
            tex={`\\text{signs: } \\underbrace{6x^2}_{${sgn(x0 * x0)}}\\ \\underbrace{(x^3-2)}_{${sgn(x0 ** 3 - 2)}}\\ \\underbrace{(1+x^3)^3}_{${sgn(1 + x0 ** 3)}}`}
          />
          <Readout color={col} tex={atZero ? '\\text{concave down on both sides}' : atXi ? '\\text{concave down} \\to \\text{up}' : d2 > 0 ? '\\text{concave up}' : '\\text{concave down}'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
