// 2019 Specialist Exam 1 Q5a.ii — turning points are where the tangent is flat. Slide a tangent
// along f(x) = cos²x + cos x + 1 with f'(x) = −sin x (2cos x + 1) drawn in violet underneath:
// the tangent goes flat exactly where one of the two factors is zero — 2cos x + 1 = 0 at 2π/3 and
// 4π/3 (the two minimums, height 3/4) and sin x = 0 at π (the small maximum, height 1). At the
// ends x = 0 and 2π, sin x = 0 as well; a toggle carries the curve on past the domain to show
// why those still aren't answers — the question asks about the open interval (0, 2π).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  num, usePlayer,
} from './kit'

const PI = Math.PI
const f = (x: number) => Math.cos(x) ** 2 + Math.cos(x) + 1
const fd = (x: number) => -Math.sin(x) * (2 * Math.cos(x) + 1)

const TOL = 0.035
const EXT = 0.7

/** x-axis tick labels at multiples of π/2 only. */
const piTick = (v: number) => {
  const k = Math.round(v / (PI / 2))
  if (Math.abs(v - (k * PI) / 2) > 1e-6) return ''
  return ['', 'π/2', 'π', '3π/2', '2π'][k] ?? ''
}

const NAMES: [number, string][] = [
  [0, '0'], [PI / 6, 'π/6'], [PI / 3, 'π/3'], [PI / 2, 'π/2'], [(2 * PI) / 3, '2π/3'], [(5 * PI) / 6, '5π/6'],
  [PI, 'π'], [(7 * PI) / 6, '7π/6'], [(4 * PI) / 3, '4π/3'], [(3 * PI) / 2, '3π/2'], [(5 * PI) / 3, '5π/3'],
  [(11 * PI) / 6, '11π/6'], [2 * PI, '2π'],
]
const angle = (v: number) => NAMES.find(([a]) => Math.abs(a - v) < 1e-6)?.[1] ?? `${(v / PI).toFixed(2)}π`

const TURNING = [
  { x: (2 * PI) / 3, tex: '\\left(\\tfrac{2\\pi}{3},\\ \\tfrac34\\right)', label: '(2π/3, 3/4)' },
  { x: PI, tex: '(\\pi,\\ 1)', label: '(π, 1)' },
  { x: (4 * PI) / 3, tex: '\\left(\\tfrac{4\\pi}{3},\\ \\tfrac34\\right)', label: '(4π/3, 3/4)' },
]

export default function FlatTangent() {
  const [x0, setX0] = useState(PI / 2)
  const [showDeriv, setShowDeriv] = useState(true)
  const [extend, setExtend] = useState(false)
  const player = usePlayer(setX0, { min: 0, max: 2 * PI, seconds: 9 })

  const s = Math.sin(x0)
  const c2 = 2 * Math.cos(x0) + 1
  const m = fd(x0)
  const atEnd = x0 < TOL || x0 > 2 * PI - TOL
  const tp = TURNING.find(t => Math.abs(t.x - x0) < TOL)
  const flat = Math.abs(m) < 0.06
  const tanColor = atEnd ? C.bad : flat ? C.good : C.g
  const d = 0.85 / Math.sqrt(1 + 0.35 * m * m)
  const lo = extend ? -EXT : 0
  const hi = extend ? 2 * PI + EXT : 2 * PI

  let notice
  if (atEnd) {
    const end = x0 < PI ? '0' : '2\\pi'
    notice = (
      <Notice tone="warn">
        <M>{`\\sin(${end}) = 0`}</M>, so <M>{"f'(x) = 0"}</M> here too and the tangent is flat. But{' '}
        <M>{`x = ${end}`}</M> is an <b>end of the domain</b>, and the question asks only about the open interval{' '}
        <M>{'(0, 2\\pi)'}</M>: round brackets mean <M>0</M> and <M>{'2\\pi'}</M> are left out.{' '}
        {extend ? (
          <>
            The dashed grey curve shows the graph <em>would</em> turn here if the domain carried on — but it stops at{' '}
            <M>{`x = ${end}`}</M>, and the open interval leaves this point out anyway.
          </>
        ) : (
          'Turn on “Extend past the domain” to see what is going on here.'
        )}{' '}
        The report says including these endpoints was a common mistake.
      </Notice>
    )
  } else if (tp && tp.x !== PI) {
    notice = (
      <Notice tone="good">
        Here <M>{'2\\cos x + 1 = 0'}</M>, i.e. <M>{'\\cos x = -\\tfrac12'}</M>, so the product <M>{"f'(x)"}</M> is zero
        even though <M>{'\\sin x'}</M> isn&apos;t. The tangent is flat and the curve changes from going down to going
        up: a <b>local minimum</b> at <M>{tp.tex}</M>.
      </Notice>
    )
  } else if (tp) {
    notice = (
      <Notice tone="good">
        Now it&apos;s the <b>other</b> factor: <M>{'\\sin\\pi = 0'}</M>. The tangent is flat and the curve changes from
        going up to going down: a <b>local maximum</b> at <M>{tp.tex}</M>, the small bump in the middle. That&apos;s all
        three: two from <M>{'\\cos x = -\\tfrac12'}</M>, one from <M>{'\\sin x = 0'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here <M>{`f'(x) = ${num(m)}`}</M> is {m < 0 ? 'negative' : 'positive'}, so the tangent slopes{' '}
        {m < 0 ? 'down' : 'up'} and <M>f</M> is {m < 0 ? 'decreasing' : 'increasing'}. The tangent can only be flat
        where the product <M>{'-\\sin x\\,(2\\cos x + 1)'}</M> is zero, and a product is zero only when one factor is.
        {showDeriv ? ' Each time the violet curve crosses the x-axis, the blue curve turns.' : ''} Press play or slide to
        find every flat spot.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-EXT, 2 * PI + EXT]} y={[-2, 3.4]} xStep={PI / 2} yStep={1} height={340} xLabels={piTick} yLabels={v => (Math.abs(v - 3) < 1e-6 ? '' : String(v))}>
        {extend && (
          <>
            <Plot.OfX y={f} domain={[-EXT, 0]} color={C.guide} style="dashed" weight={2} />
            <Plot.OfX y={f} domain={[2 * PI, 2 * PI + EXT]} color={C.guide} style="dashed" weight={2} />
          </>
        )}
        {showDeriv && (
          <>
            <Plot.OfX y={fd} domain={[lo, hi]} color={C.violet} weight={2} />
            <Label at={[3.6, fd(3.6)]} color={C.violet} attach="s">f′(x)</Label>
            <Line.Segment point1={[x0, fd(x0)]} point2={[x0, f(x0)]} color={C.guide} style="dashed" weight={1.5} />
          </>
        )}
        <Plot.OfX y={f} domain={[0, 2 * PI]} color={C.f} weight={3} />
        <Label at={[5.6, f(5.6)]} color={C.f} attach="e">f</Label>
        <Point x={0} y={3} color={C.f} />
        <Point x={2 * PI} y={3} color={C.f} />
        {TURNING.map(t => (
          <Point key={t.x} x={t.x} y={f(t.x)} color={C.good} />
        ))}
        {atEnd && (
          <Label at={[x0 < PI ? 0 : 2 * PI, 3]} color={C.bad} attach={x0 < PI ? 'ne' : 'nw'} gap={10}>
            {x0 < PI ? '(0, 3): endpoint' : '(2π, 3): endpoint'}
          </Label>
        )}
        {tp && <Label at={[tp.x, f(tp.x)]} color={C.good} attach={tp.x === PI ? 'n' : 's'} gap={10}>{tp.label}</Label>}
        {showDeriv && <Point x={x0} y={m} color={C.violet} />}
        <Line.Segment point1={[x0 - d, f(x0) - m * d]} point2={[x0 + d, f(x0) + m * d]} color={tanColor} weight={3} />
        <Point x={x0} y={f(x0)} color={tanColor} />
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
          max={2 * PI}
          step={PI / 120}
          format={angle}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Slide from 0 to 2π" />
          <Toggle label="Show f′(x)" checked={showDeriv} onChange={setShowDeriv} />
          <Toggle label="Extend past the domain" checked={extend} onChange={setExtend} />
        </Buttons>
        <Readouts>
          <Readout color={Math.abs(s) < 0.02 ? C.good : undefined} tex={`\\sin x = ${num(s)}`} />
          <Readout color={Math.abs(c2) < 0.02 ? C.good : undefined} tex={`2\\cos x + 1 = ${num(c2)}`} />
          <Readout color={tanColor} tex={`f'(x) = ${num(m)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
