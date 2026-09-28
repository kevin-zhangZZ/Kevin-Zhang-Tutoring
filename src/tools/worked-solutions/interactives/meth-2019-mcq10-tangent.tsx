// 2019 Methods Exam 2 MCQ 10 — slide a tangent along f(x) = x + sin(x). Its gradient is
// f'(x) = 1 + cos(x), which never drops below 0: the tangent goes from steep (gradient 2 at
// x = 0, ±2π) to momentarily flat at x = ±π, but never points downhill. A toggle overlays the
// gradient graph y = f'(x), which touches the x-axis at ±π and never goes under it (option D).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  usePlayer,
} from './kit'

const PI = Math.PI
const f = (x: number) => x + Math.sin(x)
const fp = (x: number) => 1 + Math.cos(x)
const HALF = 1.3 // half-width (in x) of the drawn tangent segment

/** Axis numbers as multiples of π. */
const piLabel = (v: number) => {
  const k = Math.round(v / PI)
  if (Math.abs(v - k * PI) > 1e-6 || k === 0) return ''
  if (k === 1) return 'π'
  if (k === -1) return '−π'
  return `${k < 0 ? '−' : ''}${Math.abs(k)}π`
}

const piFormat = (v: number) => `${(v / PI).toFixed(2)}π`

export default function Tangent() {
  const [x0, setX0] = useState(2)
  const [showGrad, setShowGrad] = useState(false)
  const player = usePlayer(setX0, { min: -2 * PI, max: 2 * PI, seconds: 10 })

  const s = fp(x0)
  const flat = s < 0.004
  const y0 = f(x0)
  const tanColor = flat ? C.good : C.g

  return (
    <div>
      <Plane x={[-2 * PI, 2 * PI]} y={[-8, 8]} xStep={PI} yStep={2} height={320} xLabels={piLabel}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[-2.4, -2.4]} color={C.guide} attach="nw">y = x</Label>
        {showGrad && (
          <>
            <Plot.OfX y={fp} domain={[-2 * PI, 2 * PI]} color={C.violet} weight={2.5} />
            <Point x={x0} y={s} color={C.violet} />
            <Label at={[-0.3, 2]} color={C.violet} attach="nw">y = f′(x)</Label>
          </>
        )}
        <Plot.OfX y={f} domain={[-2 * PI, 2 * PI]} color={C.f} weight={3} />
        <Label at={[-4.2, f(-4.2)]} color={C.f} attach="nw">y = f(x)</Label>
        <Line.Segment point1={[x0 - HALF, y0 - HALF * s]} point2={[x0 + HALF, y0 + HALF * s]} color={tanColor} weight={3} />
        <Point x={x0} y={y0} color={tanColor} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(Math.abs(Math.abs(v) - PI) < 0.03 ? Math.sign(v) * PI : v)
          }}
          min={-2 * PI}
          max={2 * PI}
          step={0.01}
          format={piFormat}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Slide the tangent" />
          <Toggle label="Show the gradient graph y = f′(x)" checked={showGrad} onChange={setShowGrad} />
        </Buttons>
        <Readouts>
          <Readout color={tanColor} tex={`f'(x) = 1 + \\cos(x) = ${flat ? '0' : s.toFixed(2)}`} />
          <Readout tex={`\\cos(x) = ${Math.cos(x0).toFixed(2)}`} />
        </Readouts>
        {flat ? (
          <Notice tone="good">
            At <M>x = {x0 < 0 ? '-\\pi' : '\\pi'}</M>, <M>\cos(x) = -1</M>, so <M>{"f'(x) = 1 + (-1) = 0"}</M>: the
            tangent is horizontal for an instant. Nudge <M>x</M> either way and the gradient is positive again, so the
            curve pauses and keeps climbing. That is why option D says <M>{"f'(x) \\ge 0"}</M>, with the equals sign.
          </Notice>
        ) : (
          <Notice>
            The tangent&apos;s gradient is <M>{"f'(x) = 1 + \\cos(x)"}</M>. Because <M>\cos(x)</M> never goes below{' '}
            <M>-1</M>, the gradient never goes below <M>0</M>: the tangent tilts from gradient <M>2</M> (at{' '}
            <M>x = 0</M>) down to flat, but never points downhill. Slide to <M>x = \pi</M>, then turn on the gradient
            graph: it touches the <M>x</M>-axis but never dips under it.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
