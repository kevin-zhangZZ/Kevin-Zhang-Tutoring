// 2019 Methods Exam 1 Q5b — the area under f(x) = 2/(x − 1)² + 1 from x = −1 to x = 0 is a sum of
// strips, and every strip has two pieces: an orange piece of height exactly 1 (the "+1") and a blue
// piece of height 2/(x − 1)² on top. Sweep a strip across: the orange pieces stack into a 1 × 1
// square (the "+x" in the antiderivative, area 1) and the blue pieces into a cap of area
// [−2/(x − 1)] from −1 to 0 = 1, total 2. A toggle drops the +1 — the report's common error —
// and the square goes missing, leaving 1.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle,
  num, tick, usePlayer,
} from './kit'

const cap = (x: number) => 2 / (x - 1) ** 2
const f = (x: number) => cap(x) + 1
/** Exact running areas from x = −1 to x = b. */
const squareArea = (b: number) => b + 1
const capArea = (b: number) => -2 / (b - 1) - 1
const W = 0.035

export default function SquareCap() {
  const [b, setB] = useState(-0.45)
  const [drop, setDrop] = useState(false)
  const player = usePlayer(setB, { min: -1, max: 0, seconds: 5 })

  const done = b > -0.005
  const s0 = Math.max(-1, b - W / 2)
  const s1 = Math.min(0, b + W / 2)
  const sq = squareArea(b)
  const cp = capArea(b)

  let notice
  if (drop) {
    notice = (
      <Notice tone="warn">
        Integrating only <M>{'\\frac{2}{(x-1)^2}'}</M> counts the <b>blue cap alone</b>: at <M>x = 0</M> that is{' '}
        <M>1</M>. The red dashed square under <M>y = 1</M> (area exactly <M>1</M>) is never counted, because the{' '}
        <M>+1</M> in <M>f</M> should have become <M>+x</M> in the antiderivative. Quick check: the region holds a whole{' '}
        <M>{'1 \\times 1'}</M> square, so its area must be more than <M>1</M>.
      </Notice>
    )
  } else if (done) {
    notice = (
      <Notice tone="good">
        At <M>x = 0</M> the orange pieces make a full <M>{'1 \\times 1'}</M> square (area <M>1</M>) and the blue cap has area{' '}
        <M>{'\\left[-\\frac{2}{x-1}\\right]_{-1}^{0} = 2 - 1 = 1'}</M>. Total <M>2</M>, matching{' '}
        <M>{'\\left[-\\frac{2}{x-1} + x\\right]_{-1}^{0}'}</M>. Now turn on &ldquo;Drop the +1&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The strip at <M>x</M> has height <M>{'f(x) = 1 + \\frac{2}{(x-1)^2}'}</M>: an <b>orange</b> piece of height exactly{' '}
        <M>1</M> plus a <b>blue</b> piece on top. The orange pieces always have height <M>1</M>, so they stack into a
        rectangle of area <M>x + 1</M>: that is the <M>+x</M> term in the antiderivative. Sweep to <M>x = 0</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.8, 1.3]} y={[-0.4, 4.2]} xStep={1} yStep={1} height={320} xLabels={v => (v < -1.5 ? '' : tick(v))}>
        {/* the whole target region, faint */}
        <Region top={f} bottom={() => 0} from={-1} to={0} color={C.guide} opacity={0.08} />
        {/* swept so far */}
        {!drop && <Region top={() => 1} bottom={() => 0} from={-1} to={b} color={C.g} opacity={0.3} />}
        <Region top={f} bottom={() => 1} from={-1} to={b} color={C.f} opacity={0.25} />
        {drop && (
          <Polygon points={[[-1, 0], [0, 0], [0, 1], [-1, 1]]} color={C.bad} fillOpacity={0} weight={2} strokeStyle="dashed" />
        )}

        <Line.Segment point1={[-1.8, 1]} point2={[1.3, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[-1, 0]} point2={[-1, 4.2]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[1, -0.4]} point2={[1, 4.2]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[0.3, 1]} attach="ne" color={C.ink}>y = 1</Label>
        <Label at={[-1, 3.7]} attach="w" color={C.ink}>x = −1</Label>
        <Label at={[1, 3.7]} attach="w" color={C.ink}>x = 1</Label>

        <Plot.OfX y={f} domain={[-1.8, 0.2]} color={C.f} weight={3} />

        {/* the strip, split into its two pieces */}
        {!drop && <Polygon points={[[s0, 0], [s1, 0], [s1, 1], [s0, 1]]} color={C.g} fillOpacity={0.9} weight={1} />}
        <Polygon points={[[s0, 1], [s1, 1], [s1, f(b)], [s0, f(b)]]} color={C.f} fillOpacity={0.9} weight={1} />

        {done && !drop && <Label at={[-0.5, 0.5]} attach="c" color={C.g}>area 1</Label>}
        {done && <Label at={[-0.5, 1.35]} attach="c" color={C.f}>area 1</Label>}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={b}
          onChange={v => {
            player.stop()
            setB(v)
          }}
          min={-1}
          max={0}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(b)} label="Sweep from −1 to 0" />
          <Toggle label="Drop the +1" checked={drop} onChange={setDrop} />
        </Buttons>
        <Readouts>
          {drop ? (
            <Readout color={C.bad} tex={`\\text{integrand used} = \\tfrac{2}{(x-1)^2} = ${num(cap(b))}\\ne f(x)`} />
          ) : (
            <Readout tex={`\\text{strip height} = 1 + ${num(cap(b))} = ${num(f(b))}`} />
          )}
          {!drop && <Readout color={C.g} tex={`\\text{square so far} = x + 1 = ${num(sq)}`} />}
          <Readout color={C.f} tex={`\\text{cap so far} = -\\tfrac{2}{x-1} - 1 = ${num(cp)}`} />
          <Readout
            color={drop ? C.bad : done ? C.good : undefined}
            tex={drop ? `\\text{total} = ${num(cp)}${done ? '\\ \\text{(too small)}' : ''}` : `\\text{total} = ${num(sq + cp)}${done ? '\\ \\checkmark' : ''}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
