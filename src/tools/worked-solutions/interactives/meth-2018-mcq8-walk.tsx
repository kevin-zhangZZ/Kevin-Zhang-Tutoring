// 2018 Methods Exam 2 MCQ 8 — a definite integral as a walk along the x-axis that collects signed
// area. Walk 1 → 12 (total 5), then back 12 → 5: walking right to left, the area above the axis
// is subtracted (so ∫₁₂⁵ g dx = −6 even though that area is above the axis), the stretch 5 to 12
// is counted once each way and cancels, and the walk ends on ∫₁⁵ g dx = 5 + (−6) = −1.
// The question gives no rule for g; the curve is one g built to fit both facts,
// g(x) = (x − 5)(107/1232 + 141x/8624), with ∫₁¹² g = 5 and ∫₅¹² g = 6 exactly (sympy).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider,
  Vector, num, tick, usePlayer,
} from './kit'

const A = 107 / 1232
const B = 141 / 8624
const g = (x: number) => (x - 5) * (A + B * x)
// Antiderivative of g = Bx² + (A − 5B)x − 5A, for exact running totals.
const G = (x: number) => (B * x ** 3) / 3 + ((A - 5 * B) * x ** 2) / 2 - 5 * A * x
const I = (a: number, b: number) => G(b) - G(a)

/** Position along the walk: t in [0, 1] is leg 1 (1 → 12), t in [1, 2] is leg 2 (12 → 5). */
const pos = (t: number) => (t <= 1 ? 1 + 11 * t : 12 - 7 * (t - 1))
const Y1 = -0.75
const Y2 = -1.2
/** x for a readout: whole numbers (the turn at 12, the end at 5) show without ".0". */
const fx = (x: number) => (Math.abs(x - Math.round(x)) < 0.05 ? String(Math.round(x)) : num(x, 1))

export default function Walk() {
  const [t, setT] = useState(1)
  const player = usePlayer(setT, { min: 0, max: 2, seconds: 8 })

  const x = pos(t)
  const leg2 = t > 1.0005
  const atTurn = Math.abs(t - 1) < 0.006
  const done = t > 1.995
  const leg1End = leg2 ? 12 : x
  const leg1Val = I(1, leg1End)
  const leg2Val = leg2 ? I(12, x) : 0
  const total = I(1, x)

  let notice
  if (done) {
    notice = (
      <Notice tone="good">
        The walk ends at <M>5</M> with total <M>{'5 + (-6) = -1'}</M>. The stretch from <M>5</M> to <M>12</M> was counted once
        each way and cancelled, so all that is left is the net area from <M>1</M> to <M>5</M>:{' '}
        <M>{'\\int_1^5 g(x)\\,dx = -1'}</M>. The legs chain end to start, <M>{'1 \\to 12 \\to 5'}</M>, so you simply add.
      </Notice>
    )
  } else if (atTurn) {
    notice = (
      <Notice>
        At <M>12</M> the total is <M>{'5 = \\int_1^{12} g(x)\\,dx'}</M>. Leg 2 now walks <b>back</b> from <M>12</M> to{' '}
        <M>5</M>. Press play (or drag on) and watch the total <b>fall</b>, even though the area there is above the axis.
      </Notice>
    )
  } else if (leg2) {
    notice = (
      <Notice>
        Walking right to left, every strip has a negative width <M>dx</M>, so area <b>above</b> the axis now{' '}
        <b>subtracts</b>: the total falls. Each piece you walk back over (grey) was added on leg 1 and is now taken away.
        That is why <M>{'\\int_{12}^{5} g(x)\\,dx = -6'}</M> is negative: it is <M>{'-\\int_5^{12} g(x)\\,dx'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Leg 1 walks right from <M>1</M> to <M>12</M>. Blue strips (above the axis) add to the total and orange strips
        (below) subtract, so <M>{'\\int_1^{12} g(x)\\,dx = 5'}</M> is a <em>net</em> signed area, not a plain area.
        Keep going past <M>12</M> to start leg 2.
      </Notice>
    )
  }

  const pos0 = (v: number) => Math.max(v, 0)
  const neg0 = (v: number) => Math.min(v, 0)
  const cancelledMid = (x + 12) / 2

  return (
    <div>
      <Plane
        x={[-0.6, 13.4]}
        y={[-1.6, 2.7]}
        xStep={1}
        yStep={1}
        height={300}
        xLabels={v => (v < 0 || v > 13 ? "" : tick(v))}
        yLabels={v => (v < -1.5 || v > 2.5 ? "" : tick(v))}
      >
        {/* Net area collected so far: always the region from 1 to where you are now. */}
        <Region top={v => pos0(g(v))} bottom={() => 0} from={1} to={x} color={C.f} opacity={0.3} />
        <Region top={() => 0} bottom={v => neg0(g(v))} from={1} to={x} color={C.g} opacity={0.35} />
        {/* Walked forwards then backwards: counted +, then −. */}
        {leg2 && <Region top={v => pos0(g(v))} bottom={() => 0} from={x} to={12} color={C.guide} opacity={0.3} />}
        {leg2 && 12 - x > 2.5 && (
          <Label at={[cancelledMid, g(cancelledMid) / 2]} color={C.guide} attach="c" size={12}>cancels</Label>
        )}
        <Plot.OfX y={g} domain={[0, 13]} color={C.ink} weight={2.5} />
        <Label at={[12.3, g(12.3)]} color={C.ink} attach="nw">y = g(x)</Label>
        <Line.Segment point1={[x, 0]} point2={[x, g(x)]} color={C.ink} style="dashed" weight={1.5} />
        <Point x={x} y={0} color={C.violet} />

        {/* The two legs of the walk, drawn under the axis like a number line. */}
        {leg1End - 1 > 0.15 && <Vector tail={[1, Y1]} tip={[leg1End, Y1]} color={C.violet} weight={2.5} />}
        {leg1End - 1 > 2.5 && (
          <Label at={[(1 + leg1End) / 2, Y1]} color={C.violet} attach="n" size={12}>
            {`1 → ${leg2 ? '12' : fx(x)}`}
          </Label>
        )}
        {leg2 && 12 - x > 0.15 && <Vector tail={[12, Y2]} tip={[x, Y2]} color={C.bad} weight={2.5} />}
        {leg2 && 12 - x > 2.5 && (
          <Label at={[(12 + x) / 2, Y2]} color={C.bad} attach="s" size={12}>{`12 → ${done ? '5' : num(x, 1)}`}</Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="\text{walk}"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={2}
          step={0.005}
          format={v => `x = ${fx(pos(v))}`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Walk 1 → 12 → 5" />
        </Buttons>
        <Readouts>
          <Readout
            color={C.violet}
            tex={leg2 ? '\\int_1^{12} g(x)\\,dx = 5' : `\\int_1^{${fx(x)}} g(x)\\,dx = ${num(leg1Val)}`}
          />
          {leg2 && (
            <Readout
              color={C.bad}
              tex={done ? '\\int_{12}^{5} g(x)\\,dx = -6' : `\\int_{12}^{${num(x, 1)}} g(x)\\,dx = ${num(leg2Val)}`}
            />
          )}
          <Readout
            color={done ? C.good : undefined}
            tex={done ? '\\int_1^{5} g(x)\\,dx = 5 + (-6) = -1' : `\\text{total} = ${num(total)}`}
          />
        </Readouts>
        {notice}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          The question never gives <M>g</M>. This curve is one <M>g</M> with <M>{'\\int_1^{12} g(x)\\,dx = 5'}</M> and{' '}
          <M>{'\\int_{12}^{5} g(x)\\,dx = -6'}</M>; every such <M>g</M> ends the walk on the same <M>-1</M>.
        </p>
      </Controls>
    </div>
  )
}
