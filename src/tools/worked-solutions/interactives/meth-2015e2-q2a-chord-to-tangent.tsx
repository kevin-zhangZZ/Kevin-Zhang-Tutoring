// 2015 Methods Exam 2 Q2a — the angle at A comes from the TANGENT, not from a line to the top of
// the frame. Slide P along the parabola y = 60 − 3x²/80 from the top (0, 60) down towards
// A(−40, 0): the chord AP starts at the report's wrong answer (gradient 60/40 = 1.5, about 56°)
// and steepens to the tangent at A (gradient g′(−40) = 3, 71.57° → 72°). The chord gradient is
// exactly 3(40 − p)/80 for P at x = p, so it tends to 3 as p → −40. Equal-scale axes so the
// angles drawn are true angles.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, tick } from './kit'

const g = (x: number) => 60 - (3 / 80) * x * x
const deg = (r: number) => (r * 180) / Math.PI
const TAN_ANGLE = Math.atan(3) // 71.565°

export default function ChordToTangent() {
  const [p, setP] = useState(0)

  const m = (3 * (40 - p)) / 80
  const phi = Math.atan(m)
  const close = p < -36
  const atTop = p > -1

  const chord = (x: number) => m * (x + 40)
  const tangent = (x: number) => 3 * (x + 40)

  let notice
  if (atTop) {
    notice = (
      <Notice tone="warn">
        <b>This is the report&apos;s <M>56^\circ</M> answer.</b> <M>{'\\tan(\\theta)=\\tfrac{60}{40}'}</M> uses the blue line from{' '}
        <M>A</M> to the top of the frame. That line is a chord: it cuts through the parabola instead of touching it at{' '}
        <M>A</M>. Slide <M>P</M> down towards <M>A</M> and watch the chord swing up to the orange tangent.
      </Notice>
    )
  } else if (close) {
    notice = (
      <Notice tone="good">
        With <M>P</M> almost at <M>A</M>, the chord is nearly the tangent: its gradient{' '}
        <M>{'\\tfrac{3(40-p)}{80}'}</M> is heading to <M>3</M>, which is <M>{"g'(-40)"}</M>. So{' '}
        <M>{'\\theta=\\tan^{-1}(3)=71.565\\ldots^\\circ'}</M>, which rounds <b>up</b> to <M>72^\circ</M>, not <M>71^\circ</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>P</M> moves towards <M>A</M>, the chord gets steeper, because the parabola is steepest at its feet. No chord
        from <M>A</M> is as steep as the tangent. Keep sliding until <M>P</M> almost reaches <M>A</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-45, 45]} y={[-5, 65]} xStep={10} yStep={10} equalScale height={340} xLabels={v => (Math.abs(v) > 40 ? '' : tick(v))} yLabels={v => (v < 0 || v > 60 ? '' : tick(v))}>
        <Plot.OfX y={g} domain={[-40, 40]} color={C.ink} weight={2.5} />
        <Plot.OfX y={tangent} domain={[-41.5, -19]} color={C.g} weight={2.5} />
        <Plot.OfX y={chord} domain={[-41.5, Math.max(p, -30) + 4]} color={C.f} weight={2.5} />
        <Line.Segment point1={[-40, 0]} point2={[-22, 0]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.Parametric xy={t => [-40 + 9 * Math.cos(t), 9 * Math.sin(t)]} domain={[0, phi]} color={C.f} weight={2} />
        <Plot.Parametric xy={t => [-40 + 13 * Math.cos(t), 13 * Math.sin(t)]} domain={[0, TAN_ANGLE]} color={C.g} weight={2} />
        <Point x={-40} y={0} color={C.ink} />
        <Label at={[-40, 0]} attach="nw">A</Label>
        <Point x={p} y={g(p)} color={C.f} />
        <Label at={[p, g(p)]} attach="nw" color={C.f}>P</Label>
        <Label at={[-21, tangent(-21)]} attach="w" color={C.g}>tangent</Label>
        <Label at={[25, g(25)]} attach="e">frame</Label>
      </Plane>
      <Controls>
        <Slider label="P\text{ at }x" value={p} onChange={setP} min={-39} max={0} step={0.25} format={v => v.toFixed(1)} />
        <Readouts>
          <Readout color={C.f} tex={`\\text{chord } AP:\\ m=${m.toFixed(3)},\\ \\text{angle}\\approx${deg(phi).toFixed(1)}^\\circ`} />
          <Readout color={C.g} tex={`\\text{tangent at } A:\\ m=3,\\ \\theta=${deg(TAN_ANGLE).toFixed(2)}^\\circ`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
