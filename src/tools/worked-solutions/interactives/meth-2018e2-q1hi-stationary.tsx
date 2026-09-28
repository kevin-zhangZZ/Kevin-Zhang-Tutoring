// 2018 Methods Exam 2 Q1h.i — the stationary points of p(x) = 3x⁴ + 4x³ + 6(a − 2)x² − 12ax + a²
// are the zeros of p'(x) = 12(x − 1)(x² + 2x + a). Slide a from 0 to 2.5: x = 1 never moves, while
// the quadratic factor's pair x = −1 ± √(1 − a) closes in, merges at a = 1 into a single stationary
// point of inflection at x = −1 (p' touches the axis there without changing sign), and vanishes for
// a > 1. The top graph is p, the bottom graph is p'.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const p = (x: number, a: number) => 3 * x ** 4 + 4 * x ** 3 + 6 * (a - 2) * x ** 2 - 12 * a * x + a * a
const dp = (x: number, a: number) => 12 * (x - 1) * (x * x + 2 * x + a)

export default function Stationary() {
  const [a, setA] = useState(0.5)
  const d = 1 - a
  const merged = Math.abs(d) < 0.02
  const pair = merged ? [-1] : d > 0 ? [-1 - Math.sqrt(d), -1 + Math.sqrt(d)] : []
  const count = 1 + pair.length
  const disc = 4 - 4 * a
  const P = (x: number) => p(x, a)
  const DP = (x: number) => dp(x, a)
  const aTex = merged ? '1' : a.toFixed(2)

  let notice
  if (merged) {
    notice = (
      <Notice tone="warn">
        <b>At <M>a = 1</M></b>, <M>{'\\Delta = 0'}</M> and the pair merges into one point, <M>x = -1</M>. There{' '}
        <M>{"p'(x) = 12(x-1)(x+1)^2"}</M> touches zero without changing sign, so <M>p</M> flattens out and keeps
        rising: a <b>stationary point of inflection</b>. It is still a stationary point, so <M>p</M> has{' '}
        <b>two</b>. That is why <M>a = 1</M> and <M>{'a \\ge 1'}</M> are wrong. Nudge <M>a</M> past 1.
      </Notice>
    )
  } else if (d > 0) {
    notice = (
      <Notice>
        <M>{`\\Delta = 4 - 4a = ${disc.toFixed(2)} > 0`}</M>, so <M>{'x^2 + 2x + a = 0'}</M> has two solutions,{' '}
        <M>{'x = -1 \\pm \\sqrt{1-a}'}</M>, and <M>p</M> has <b>three</b> stationary points (the purple pair plus{' '}
        <M>x = 1</M>). {Math.abs(a) < 0.02 ? <>At <M>a = 0</M> this is <M>f</M> from part a. </> : null}Slide{' '}
        <M>a</M> up and watch the purple pair close in on <M>x = -1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>{`\\Delta = 4 - 4a = ${disc.toFixed(2)} < 0`}</M>: the quadratic factor is never zero, so <M>p'</M> crosses
        the axis only at <M>x = 1</M>. One stationary point, for <em>every</em> <M>{'a > 1'}</M>. At <M>a = 2</M>{' '}
        (part h.ii.) it is the minimum, <M>p(1) = -13</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 2]} y={[-40, 40]} xStep={1} yStep={10} height={260}>
        <Plot.OfX y={P} domain={[-3.3, 2.3]} color={C.f} weight={3} />
        {[1, ...pair].map(s => (
          <Line.Segment
            key={`t${s.toFixed(3)}`}
            point1={[s - 0.35, P(s)]}
            point2={[s + 0.35, P(s)]}
            color={s === 1 ? C.g : C.violet}
            style="dashed"
            weight={2}
          />
        ))}
        <Point x={1} y={P(1)} color={C.g} />
        {pair.map(s => (
          <Point key={s.toFixed(4)} x={s} y={P(s)} color={C.violet} />
        ))}
        <Label at={[1, P(1)]} attach="s" color={C.g} size={12}>x = 1</Label>
        {merged && <Label at={[-1, P(-1)]} attach="nw" color={C.violet} size={12}>inflection, x = −1</Label>}
        <Label at={[-2.75, Math.min(33, P(-2.75))]} attach="e" color={C.f}>y = p(x)</Label>
      </Plane>
      <Plane x={[-3, 2]} y={[-40, 40]} xStep={1} yStep={20} height={190} yLabel="">
        <Plot.OfX y={DP} domain={[-3.3, 2.3]} color={C.violet} weight={2.5} />
        <Point x={1} y={0} color={C.g} />
        {pair.map(s => (
          <Point key={`r${s.toFixed(4)}`} x={s} y={0} color={C.violet} />
        ))}
        <Label at={[1.6, Math.min(38, DP(1.6))]} attach="w" color={C.violet}>y = p′(x)</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={0} max={2.5} step={0.05} format={v => v.toFixed(2)} />
        <Buttons>
          <ActionButton label="a = 1" onClick={() => setA(1)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`p'(x) = 12(x-1)(x^2+2x+${aTex})`} />
          <Readout tex={`\\Delta = 4-4a = ${merged ? '0' : disc.toFixed(2)}`} />
          <Readout color={C.g} tex={`\\text{stationary points: } ${count}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
