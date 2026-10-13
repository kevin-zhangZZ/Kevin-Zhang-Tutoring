// 2015 Specialist Exam 2 Q1d — sketching f and its inverse. Students lost marks on endpoints
// and concavity. Slide a point A along y = f(x) = √(2 − sin²x), 0 ≤ x ≤ π/2; its mirror image B in
// y = x runs along y = f⁻¹(x) carrying the reflected tangent (gradient 1/f′). Horizontal tangents
// at f's endpoints become vertical tangents at f⁻¹'s endpoints, and f's inflection point
// (0.872, 2^{1/4} ≈ 1.189) maps to (1.189, 0.872), so both curves bend the same way on each
// matching piece (for a decreasing f, (f⁻¹)″ = −f″/(f′)³ has the sign of f″).
// Numbers checked with sympy: inflection at sin²x = 2 − √2, P at a = 1.0986.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, usePlayer,
} from './kit'

const HALF_PI = Math.PI / 2
const f = (x: number) => Math.sqrt(2 - Math.sin(x) ** 2)
const df = (x: number) => (-Math.sin(x) * Math.cos(x)) / f(x)
const T_INF = Math.asin(Math.sqrt(2 - Math.SQRT2)) // 0.8716
const A_P = 1.0986
const L = 0.26

function seg(p: [number, number], dir: [number, number]): [[number, number], [number, number]] {
  const n = Math.hypot(dir[0], dir[1])
  const u: [number, number] = [(dir[0] / n) * L, (dir[1] / n) * L]
  return [
    [p[0] - u[0], p[1] - u[1]],
    [p[0] + u[0], p[1] + u[1]],
  ]
}

export default function Mirror() {
  const [t, setT] = useState(0.4)
  const player = usePlayer(setT, { min: 0, max: HALF_PI, seconds: 7 })

  const A: [number, number] = [t, f(t)]
  const B: [number, number] = [f(t), t]
  const m = df(t)
  const [a1, a2] = seg(A, [1, m])
  const [b1, b2] = seg(B, [m, 1])
  const flat = Math.abs(m) < 0.02
  const down = t < T_INF

  let notice
  if (t < 0.04 || t > HALF_PI - 0.04) {
    notice = (
      <Notice tone="good">
        <b>Flat on <M>f</M> means vertical on <M>{'f^{-1}'}</M>.</b> Part b(ii) gave <M>{"f'=0"}</M> at both ends, so
        reflecting turns the horizontal tangent at {t < 0.04 ? <M>{'(0,\\sqrt2)'}</M> : <M>{'(\\tfrac\\pi2,1)'}</M>} into
        a vertical one at {t < 0.04 ? <M>{'(\\sqrt2,0)'}</M> : <M>{'(1,\\tfrac\\pi2)'}</M>}. Your inverse must
        land on (or leave) that endpoint straight up and down.
      </Notice>
    )
  } else if (Math.abs(t - T_INF) < 0.03) {
    notice = (
      <Notice tone="good">
        <b>Inflection point.</b> <M>f</M> switches from bending down to bending up at{' '}
        <M>{'(0.872,\\ 1.189)'}</M>, so <M>{'f^{-1}'}</M> switches at the mirror point <M>{'(1.189,\\ 0.872)'}</M>. Each
        curve is an S-shape, not a simple arc.
      </Notice>
    )
  } else if (Math.abs(t - A_P) < 0.025) {
    notice = (
      <Notice>
        <b>A and B meet on <M>y=x</M></b> at <M>{'P(1.099,\\ 1.099)'}</M> (part e). The two tangents here have
        gradients <M>{"f'"}</M> and <M>{"1/f'"}</M>, so the curves cross rather than touch.
      </Notice>
    )
  } else if (down) {
    notice = (
      <Notice>
        Here <M>f</M> is <b>concave down</b> (it bends below its tangent), and the mirror piece of{' '}
        <M>{'f^{-1}'}</M> near <M>{'(\\sqrt2,0)'}</M> is concave down too. Slide right past <M>x\approx0.87</M> and
        watch both bends flip.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>x\approx0.87</M>, <M>f</M> is <b>concave up</b>, flattening onto <M>{'(\\tfrac\\pi2,1)'}</M>; the mirror
        piece of <M>{'f^{-1}'}</M> near <M>{'(1,\\tfrac\\pi2)'}</M> is concave up too. Slide to the end to see the
        vertical tangent appear.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1.8]} y={[0, 1.8]} xStep={0.5} yStep={0.5} equalScale height={380} label="Graph of y = f(x) and y = f inverse of x, reflected in y = x">
        <Line.Segment point1={[0, 0]} point2={[1.8, 1.8]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[1.62, 1.62]} color={C.guide} attach="nw" bold={false}>y = x</Label>
        <Plot.OfX y={f} domain={[0, HALF_PI]} color={C.f} weight={3} />
        <Plot.Parametric xy={s => [f(s), s]} domain={[0, HALF_PI]} color={C.g} weight={3} />
        <Line.Segment point1={A} point2={B} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={a1} point2={a2} color={C.violet} weight={2.5} />
        <Line.Segment point1={b1} point2={b2} color={C.violet} weight={2.5} />
        <Point x={T_INF} y={f(T_INF)} color={C.good} />
        <Label at={[T_INF, f(T_INF)]} color={C.good} attach="ne" size={11}>inflection</Label>
        <Point x={f(T_INF)} y={T_INF} color={C.good} />
        <Label at={[f(T_INF), T_INF]} color={C.good} attach="se" size={11}>inflection</Label>
        <Point x={A[0]} y={A[1]} color={C.f} />
        <Point x={B[0]} y={B[1]} color={C.g} />
        <Label at={A} color={C.f} attach="n">A</Label>
        <Label at={B} color={C.g} attach="e">B</Label>
        <Label at={[0.65, f(0.65)]} color={C.f} attach="ne">f</Label>
        <Label at={[f(1.45), 1.45]} color={C.g} attach="w">f⁻¹</Label>
      </Plane>
      <Controls>
        <Slider
          label="x_A"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={HALF_PI}
          step={0.005}
        />
        <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Slide A along f" />
        <Readouts>
          <Readout color={C.f} tex={`A(${t.toFixed(3)},\\ ${f(t).toFixed(3)}),\\ f' = ${flat ? '0' : m.toFixed(3)}`} />
          <Readout
            color={C.g}
            tex={`B(${f(t).toFixed(3)},\\ ${t.toFixed(3)}),\\ \\text{gradient} = ${flat ? '\\text{vertical}' : (1 / m).toFixed(3)}`}
          />
          <Readout color={C.violet} tex={`\\text{both concave ${down ? 'down' : 'up'}}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
