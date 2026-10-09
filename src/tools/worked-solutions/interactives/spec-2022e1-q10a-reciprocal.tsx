// 2022 Specialist Exam 1 Q10a — every point of y = sec(4x) is 1 ÷ cos(4x), read straight up from
// the cosine underneath. Sweep x across [−π/4, π/4]: cos(4x) = 1 gives the minimum (0, 1); cos(4x)
// shrinking to 0 sends sec(4x) to ±∞ at the asymptotes x = ±π/8, with the sign of the cosine
// deciding which way; cos(4x) = −1 at the endpoints gives the tops (±π/4, −1) of the outer
// branches. Nothing lands between −1 and 1, and the graph stops at the endpoints (no horizontal
// asymptote) — the shape errors the examiners' report describes.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, usePlayer,
} from './kit'

const PI = Math.PI
const STEP = PI / 240
const Q = PI / 4 // the endpoint
const A = PI / 8 // the asymptote
const YMAX = 5
// Draw each branch only while |sec(4x)| ≤ 5.6, so no curve runs between the asymptotes' ends.
const XE = Math.acos(1 / 5.6) / 4 // middle branch reaches y = 5.6 here
const XO = (PI - Math.acos(1 / 5.6)) / 4 // outer branches start at y = −5.6 here

const cos4 = (x: number) => Math.cos(4 * x)
const sec4 = (x: number) => 1 / Math.cos(4 * x)

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
/** x as a multiple of π: "π/10", "−5π/48", "0". */
function piLabel(x: number): string {
  const n = Math.round(x / STEP)
  if (n === 0) return '0'
  const g = gcd(Math.abs(n), 240)
  const p = Math.abs(n) / g
  const q = 240 / g
  return `${n < 0 ? '−' : ''}${p === 1 ? '' : p}π${q === 1 ? '' : `/${q}`}`
}
const xTick = (v: number) => {
  const k = Math.round(v / A)
  return k === 0 ? '' : `${k < 0 ? '−' : ''}π/${Math.abs(k) === 1 ? 8 : 4}`
}
// Odd y-values only (and not 1, which the label (0, 1) already gives), so the numbers on the
// y-axis stay clear of that label and the curve's name.
const yTick = (v: number) => {
  const k = Math.round(v)
  return Math.abs(k) % 2 === 1 && k !== 1 ? `${k < 0 ? '−' : ''}${Math.abs(k)}` : ''
}

export default function Reciprocal() {
  const [x0, setX0] = useState(PI / 10)
  const player = usePlayer(setX0, { min: -Q, max: Q, seconds: 9 })

  const c = cos4(x0)
  const s = sec4(x0)
  const atAsym = Math.abs(c) < 0.02
  const atTurn = Math.abs(x0) < STEP / 2
  const atEnd = Math.abs(x0) > Q - STEP / 2
  const middle = c > 0
  const onScreen = !atAsym && Math.abs(s) <= YMAX
  const side = x0 < 0 ? '-' : ''

  let notice
  if (atAsym) {
    notice = (
      <Notice tone="warn">
        At <M>{`x = ${side}\\tfrac{\\pi}{8}`}</M>, <M>{'\\cos(4x) = 0'}</M> and <M>{'1 \\div 0'}</M> is undefined: a
        vertical asymptote. Just inside it the cosine is a tiny <b>positive</b> number, so the secant is huge and
        positive; just outside, the cosine is tiny and <b>negative</b>, so the secant is huge and negative. That is why
        the branches run off in opposite directions on either side of the asymptote.
      </Notice>
    )
  } else if (atTurn) {
    notice = (
      <Notice tone="good">
        At <M>x = 0</M> the cosine is at its highest, <M>1</M>, so <M>{'\\sec(4x) = \\tfrac{1}{1} = 1'}</M>, the lowest
        point of the middle branch: the turning point <M>(0, 1)</M>. Move either way and the cosine gets smaller, so
        the secant gets bigger. The middle branch is a U, the same on both sides of the <M>y</M>-axis.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="good">
        At the endpoint the cosine is at its lowest, <M>{'\\cos(\\pm\\pi) = -1'}</M>, so{' '}
        <M>{'\\sec(4x) = \\tfrac{1}{-1} = -1'}</M>. That is the highest the outer branch gets: it levels off as it
        arrives and then simply stops, because the domain ends at <M>{`x = ${side}\\tfrac{\\pi}{4}`}</M>. Mark{' '}
        <M>{`\\left(${side}\\tfrac{\\pi}{4}, -1\\right)`}</M> with a closed dot; there is no horizontal asymptote.
      </Notice>
    )
  } else if (middle) {
    notice = (
      <Notice>
        Between the asymptotes the cosine is between <M>0</M> and <M>1</M>, so{' '}
        <M>{'\\sec(4x) = \\tfrac{1}{\\cos(4x)}'}</M> is <M>1</M> or more. Here{' '}
        <M>{`\\cos(4x) \\approx ${c.toFixed(3)}`}</M> gives <M>{`\\sec(4x) \\approx ${s.toFixed(2)}`}</M>. Drag{' '}
        <M>x</M> towards <M>{`${side}\\tfrac{\\pi}{8}`}</M> and watch the cosine shrink to <M>0</M> while the secant
        shoots up.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Outside the asymptotes the cosine is <b>negative</b>, between <M>-1</M> and <M>0</M>, so the secant is{' '}
        <M>-1</M> or less: here <M>{`\\tfrac{1}{${c.toFixed(3)}} \\approx ${s.toFixed(2)}`}</M>. The outer branches sit
        at or below <M>y = -1</M>, never between <M>-1</M> and <M>1</M>. Drag to the endpoint{' '}
        <M>{`x = ${side}\\tfrac{\\pi}{4}`}</M> to find the top of this branch.
      </Notice>
    )
  }

  const top = onScreen ? s : Math.sign(atAsym ? 1 : s) * YMAX

  return (
    <div>
      <Plane x={[-Q, Q]} y={[-YMAX, YMAX]} xStep={A} yStep={1} height={340} xLabels={xTick} yLabels={yTick}>
        <Line.Segment point1={[A, -YMAX]} point2={[A, YMAX]} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={[-A, -YMAX]} point2={[-A, YMAX]} color={C.guide} style="dashed" weight={2} />
        <Label at={[A, 4.3]} color={C.guide} attach="e">x = π/8</Label>
        <Label at={[-A, 4.3]} color={C.guide} attach="w">x = −π/8</Label>

        <Plot.OfX y={cos4} domain={[-Q, Q]} color={C.g} weight={2.5} />
        <Plot.OfX y={sec4} domain={[-XE, XE]} color={C.f} weight={3} />
        <Plot.OfX y={sec4} domain={[XO, Q]} color={C.f} weight={3} />
        <Plot.OfX y={sec4} domain={[-Q, -XO]} color={C.f} weight={3} />
        <Label at={[-0.6, 0.8]} color={C.g} attach="c">y = cos(4x)</Label>
        <Label at={[0, 2.3]} color={C.f} attach="c">y = sec(4x)</Label>

        <Point x={0} y={1} color={C.ink} />
        <Point x={Q} y={-1} color={C.ink} />
        <Point x={-Q} y={-1} color={C.ink} />
        {/* Above the minimum, clear of both arms of the U; the endpoint labels hang below their dots,
            nudged in from the plane's edge, under the outer branches (which stay above y ≈ −1.3 there). */}
        <Label at={[0, 1]} attach="n" gap={10}>(0, 1)</Label>
        <Label at={[Q - 0.05, -1]} attach="s" gap={15} size={12}>(π/4, −1)</Label>
        <Label at={[-Q + 0.05, -1]} attach="s" gap={15} size={12}>(−π/4, −1)</Label>

        {!atAsym && <Line.Segment point1={[x0, c]} point2={[x0, top]} color={C.violet} style="dashed" weight={1.5} />}
        <Point x={x0} y={atAsym ? 0 : c} color={C.g} />
        {onScreen && <Point x={x0} y={s} color={C.f} />}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={-Q}
          max={Q}
          step={STEP}
          format={piLabel}
        />
        <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from −π/4 to π/4" />
        <Readouts>
          <Readout color={C.g} tex={atAsym ? '\\cos(4x) = 0' : `\\cos(4x) \\approx ${c.toFixed(3)}`} />
          <Readout
            color={C.f}
            tex={
              atAsym
                ? '\\sec(4x) = \\tfrac{1}{0}\\ \\text{undefined}'
                : `\\sec(4x) = \\tfrac{1}{\\cos(4x)} \\approx ${s.toFixed(2)}${onScreen ? '' : '\\ \\text{(off the screen)}'}`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
