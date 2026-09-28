// 2017 Methods Exam 2 MCQ 20 — the shaded region lies under BOTH y = cos(x) and y = √3 sin(x), so
// the top edge of every vertical strip is the LOWER of the two curves: √3 sin(x) left of B, cos(x)
// right of B. Sweep a strip from O to A and watch the top edge swap curves at B (x = π/6), which is
// why the area is two integrals split there. At the end the swept area is √3 − 1 next to triangle
// OAB's √3π/8. A toggle shows the common wrong area, ∫₀^{π/2} cos(x) dx = 1 (option E): it also
// counts the red wedge between the curves left of B, which is not shaded.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider, Toggle,
  integrate, usePlayer,
} from './kit'

const PI = Math.PI
const R3 = Math.sqrt(3)
const f = (x: number) => Math.cos(x)
const g = (x: number) => R3 * Math.sin(x)
const lower = (x: number) => Math.min(f(x), g(x))
const XB = PI / 6
const YB = R3 / 2
const XA = PI / 2
const SHADED = R3 - 1
const TRI = (R3 * PI) / 8
const W = 0.03

const piTick = (v: number) => {
  const n = Math.round(v / (PI / 6))
  if (Math.abs(v - (n * PI) / 6) > 1e-6) return ''
  return ['', 'π/6', 'π/3', 'π/2'][n] ?? ''
}

export default function LowerCurve() {
  const [x0, setX0] = useState(0.3)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setX0, { min: 0, max: XA, seconds: 6 })

  const atB = Math.abs(x0 - XB) < 0.02
  const left = x0 < XB
  const done = x0 > XA - 0.005
  const swept = integrate(lower, 0, x0)
  const stripColor = atB ? C.good : left ? C.g : C.f
  const s0 = Math.max(0, x0 - W / 2)
  const s1 = Math.min(XA, x0 + W / 2)
  const h = lower(x0)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{'\\int_0^{\\pi/2}\\cos(x)\\,dx = 1'}</M> counts everything under the blue curve, including the{' '}
        <b>red wedge</b> between <M>\cos(x)</M> and <M>{'\\sqrt3\\sin(x)'}</M> left of <M>B</M>. That wedge is not
        shaded: the orange curve cuts it off. It has area <M>{'2-\\sqrt3 \\approx 0.268'}</M>, and{' '}
        <M>{'1-(2-\\sqrt3) = \\sqrt3-1'}</M>. Using <M>1</M> as the shaded area gives option <b>E</b>.
      </Notice>
    )
  } else if (atB) {
    notice = (
      <Notice tone="good">
        <b>At <M>B</M> the curves meet</b>, and the top edge of the shaded region changes from{' '}
        <M>{'\\sqrt3\\sin(x)'}</M> to <M>\cos(x)</M>. One integral can only follow one rule, so the area must be split
        here, at <M>{'x = \\tfrac{\\pi}{6}'}</M>. Keep sweeping towards <M>A</M>.
      </Notice>
    )
  } else if (left) {
    notice = (
      <Notice>
        Left of <M>B</M>, <b>the orange curve is the lower one</b>, and the shading stops there: each strip reaches up
        to <M>{'\\sqrt3\\sin(x)'}</M>, not to <M>\cos(x)</M>. So this piece is{' '}
        <M>{'\\int_0^{\\pi/6}\\sqrt3\\sin(x)\\,dx'}</M>. Press Sweep, or drag <M>x</M> past <M>B</M>.
      </Notice>
    )
  } else if (!done) {
    notice = (
      <Notice>
        Right of <M>B</M>, <b>the blue curve is now the lower one</b>, so it becomes the top edge of every strip:{' '}
        <M>{'\\int_{\\pi/6}^{\\pi/2}\\cos(x)\\,dx'}</M>. Keep going to <M>A</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Swept: <M>{'\\sqrt3-1 \\approx 0.732'}</M>. Triangle <M>OAB</M> (purple) is{' '}
        <M>{'\\tfrac{\\sqrt3\\pi}{8} \\approx 0.680'}</M>, a little less, because it misses the two thin slivers between
        its sides and the curves. Turn on the toggle to see the most tempting wrong area.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1.7]} y={[0, 1.8]} xStep={PI / 6} yStep={0.5} height={320} xLabels={piTick} yLabels={v => (Math.abs(v - 0.5) < 1e-9 ? "1/2" : Math.abs(v - 1.5) < 1e-9 ? "3/2" : "")}>
        <Region top={lower} bottom={() => 0} from={0} to={XA} color={C.guide} opacity={0.15} />
        {wrong && <Region top={f} bottom={g} from={0} to={XB} color={C.bad} opacity={0.45} />}
        <Region top={lower} bottom={() => 0} from={0} to={Math.min(x0, XB)} color={C.g} opacity={0.3} />
        <Region top={lower} bottom={() => 0} from={XB} to={Math.max(XB, x0)} color={C.f} opacity={0.3} />
        <Polygon points={[[0, 0], [XA, 0], [XB, YB]]} color={C.violet} fillOpacity={0.04} weight={2} />
        <Plot.OfX y={f} domain={[0, XA]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[0, XA]} color={C.g} weight={3} />
        <Polygon points={[[s0, 0], [s1, 0], [s1, h], [s0, h]]} color={stripColor} fillOpacity={0.85} weight={1} />
        <Point x={XB} y={YB} color={C.ink} />
        <Label at={[XB, YB]} attach="n" gap={10}>
          B
        </Label>
        <Label at={[XA, 0]} attach="ne">
          A
        </Label>
        <Label at={[0, 0]} attach="sw">
          O
        </Label>
        <Label at={[1.2, f(1.2)]} attach="ne" color={C.f}>
          y = cos x
        </Label>
        <Label at={[1.05, g(1.05)]} attach="nw" color={C.g}>
          y = √3 sin x
        </Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={0}
          max={XA}
          step={0.005}
          format={v => v.toFixed(3)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from O to A" />
          <Toggle label="Wrong idea: area under cos(x) from 0 to π/2" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout
            color={stripColor}
            tex={left ? `\\text{top edge} = \\sqrt3\\sin(x) \\approx ${h.toFixed(3)}` : `\\text{top edge} = \\cos(x) \\approx ${h.toFixed(3)}`}
          />
          <Readout tex={`\\text{shaded so far} \\approx ${swept.toFixed(3)}`} />
          {done && <Readout color={C.good} tex={`\\sqrt3 - 1 \\approx ${SHADED.toFixed(3)}\\ \\checkmark`} />}
          {done && <Readout color={C.violet} tex={`\\triangle OAB = \\tfrac{\\sqrt3\\pi}{8} \\approx ${TRI.toFixed(3)}`} />}
          {wrong && <Readout color={C.bad} tex="\int_0^{\pi/2}\cos(x)\,dx = 1" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
