// 2018 Methods Exam 1 Q9b — slide the point of contact along y = x sin(x). Because |sin(x)| ≤ 1 the
// curve is trapped between the lines y = x and y = −x, and it touches one of them wherever
// sin(x) = ±1. The tangent's y-intercept is c = −t² cos(t), so at exactly those points (cos t = 0)
// the tangent passes through the origin — it IS the boundary line. At the question's point
// t = −5π/2 that line is y = −x.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const PI = Math.PI
const f = (x: number) => x * Math.sin(x)
const df = (x: number) => Math.sin(x) + x * Math.cos(x)
const X0 = -3 * PI - 0.3
const X1 = 1.2

/** Multiples of π/2 as short text: −5π/2, −2π, −3π/2, … */
const halfPi = (v: number) => {
  const k = Math.round((2 * v) / PI)
  if (Math.abs(v - (k * PI) / 2) > 1e-6 || v < -3 * PI - 1e-6) return ''
  if (k === 0) return '0'
  if (k % 2 === 0) {
    const m = k / 2
    return m === 1 ? 'π' : m === -1 ? '−π' : `${m < 0 ? '−' : ''}${Math.abs(m)}π`
  }
  return `${k < 0 ? '−' : ''}${Math.abs(k) === 1 ? '' : Math.abs(k)}π/2`
}
const halfPiTex = (v: number) => {
  const k = Math.round((2 * v) / PI)
  if (Math.abs(v - (k * PI) / 2) > 1e-6) return v.toFixed(2)
  if (k === 0) return '0'
  const sign = k < 0 ? '-' : ''
  const a = Math.abs(k)
  if (a % 2 === 0) return `${sign}${a === 2 ? '' : a / 2}\\pi`
  return `${sign}\\tfrac{${a === 1 ? '' : a}\\pi}{2}`
}

export default function Tangent() {
  const [t, setT] = useState(-2.5 * PI)

  const yt = f(t)
  const m = df(t)
  const c = -t * t * Math.cos(t)
  const tangent = (x: number) => yt + m * (x - t)
  const throughO = Math.abs(Math.cos(t)) < 1e-6
  const onMinusX = throughO && Math.sin(t) < 0 // y = t sin t = −t
  const atQuestion = Math.abs(t + 2.5 * PI) < 1e-6

  let notice
  if (atQuestion) {
    notice = (
      <Notice tone="good">
        <b>The question&apos;s point.</b> Here <M>{'\\sin t = -1'}</M>, so the curve&apos;s height is{' '}
        <M>{'t\\sin t = -t'}</M>: the point sits on the grey line <M>y = -x</M>. The curve can never go past that
        line (because <M>{'|\\sin x| \\le 1'}</M>), so it just touches it, and the tangent is the line itself: gradient{' '}
        <M>-1</M>, through <M>O</M>. Slide away and watch the intercept leave the origin.
      </Notice>
    )
  } else if (throughO) {
    notice = (
      <Notice tone="good">
        Another point where <M>{'\\cos t = 0'}</M>, so <M>{'\\sin t = \\pm 1'}</M> and the curve touches the line{' '}
        <M>{onMinusX ? 'y = -x' : 'y = x'}</M>. The tangent is that line, and again it passes through the origin.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The tangent at <M>{'(t, t\\sin t)'}</M> meets the <M>y</M>-axis at <M>{'c = -t^2\\cos t'}</M>, so it misses the
        origin unless <M>{'\\cos t = 0'}</M>. Slide <M>t</M> to <M>{'-\\tfrac{5\\pi}{2}'}</M>, the question&apos;s
        point, then try <M>{'-\\tfrac{3\\pi}{2}'}</M> and <M>{'-\\tfrac{\\pi}{2}'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-10, 10]} xStep={PI / 2} yStep={2} height={330} xLabels={halfPi}>
        <Line.Segment point1={[X0, X0]} point2={[0, 0]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[X0, -X0]} point2={[0, 0]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[-1.2 * PI, 1.2 * PI]} color={C.guide} attach="ne" size={12}>
          y = −x
        </Label>
        <Label at={[-1.2 * PI, -1.2 * PI]} color={C.guide} attach="se" size={12}>
          y = x
        </Label>
        <Plot.OfX y={f} domain={[X0, X1]} color={C.f} weight={3} />
        <Plot.OfX y={tangent} domain={[X0, X1]} color={C.g} weight={2.5} />
        <Point x={t} y={yt} color={C.g} />
        <Point x={0} y={c} color={throughO ? C.good : C.violet} />
        <Label at={[0, c]} color={throughO ? C.good : C.violet} attach="e">
          {throughO ? 'O' : `c ≈ ${c.toFixed(1)}`}
        </Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={-3 * PI} max={-PI / 4} step={PI / 20} format={v => halfPi(v) || `${(v / PI).toFixed(2)}π`} />
        <Readouts>
          <Readout color={C.f} tex={`\\text{point } \\left(${halfPiTex(t)},\\ ${yt.toFixed(2)}\\right)`} />
          <Readout color={C.g} tex={`m = \\sin t + t\\cos t = ${Math.abs(m) < 1e-9 ? '0' : m.toFixed(2)}`} />
          <Readout color={throughO ? C.good : C.violet} tex={`c = -t^2\\cos t = ${Math.abs(c) < 1e-6 ? '0' : c.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
