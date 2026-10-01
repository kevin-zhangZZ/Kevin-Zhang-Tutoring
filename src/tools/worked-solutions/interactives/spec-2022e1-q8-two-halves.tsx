// 2022 Specialist Exam 1 Q8 — why the answer takes the negative square root. The relation
// v² = 4 − 4x² (from a = −4x and v = −2 at O) holds for the body's whole back-and-forth motion:
// the trip the question asks about (rest at x = 1 → through O with v = −2 → rest at x = −1) is the
// lower half v = −2√(1 − x²); after it comes to rest again the body heads back along the upper
// half v = +2√(1 − x²), with exactly the same v². Drag or play time t; the body is drawn on the
// x-axis with its velocity arrow, and its (x, v) point moves round the curve. The motion used is
// x = cos 2t, which satisfies a = −4x, x = 1 and v = 0 at t = 0, and v = −2 at x = 0 (t = π/4).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Vector, usePlayer } from './kit'

const T_END = Math.PI
const lower = (x: number) => -2 * Math.sqrt(Math.max(0, 1 - x * x))
const upper = (x: number) => 2 * Math.sqrt(Math.max(0, 1 - x * x))
const fmt = (v: number) => (Math.abs(v) < 0.005 ? '0.00' : v.toFixed(2))

export default function TwoHalves() {
  const [t, setT] = useState(Math.PI / 4)
  const player = usePlayer(setT, { min: 0, max: T_END, seconds: 7 })

  const x = Math.cos(2 * t)
  const v = -2 * Math.sin(2 * t)
  const a = -4 * x
  const outbound = t < Math.PI / 2 - 0.01
  const atStart = t < 0.03
  const atEnd = Math.abs(t - Math.PI / 2) <= 0.01
  const atGiven = Math.abs(t - Math.PI / 4) < 0.03
  const backHome = t > T_END - 0.03
  const col = t <= Math.PI / 2 + 0.01 ? C.f : C.g

  let notice
  if (atStart) {
    notice = (
      <Notice>
        At <M>t = 0</M> the body is at rest at <M>x = 1</M>. There <M>a = -4x = -4</M>, which is negative, so it
        starts moving in the negative direction, towards <M>O</M>. (Starting from rest at <M>x = -1</M> it would
        have <M>a = 4</M> and reach <M>O</M> with <M>v = +2</M>, not <M>-2</M>.) Press play to follow it.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="good">
        At rest again at <M>x = -1</M>: the end of the interval the question asks about. The whole trip from{' '}
        <M>x = 1</M> to <M>x = -1</M> ran along the blue lower half, <M>{'v = -2\\sqrt{1-x^2}'}</M>. Now drag{' '}
        <M>t</M> further to see what happens next.
      </Notice>
    )
  } else if (outbound) {
    notice = (
      <Notice>
        {atGiven ? (
          <>
            This is the given moment: passing through <M>O</M> with <M>v = -2</M>.{' '}
          </>
        ) : (
          <>
            Here <M>x = {fmt(x)}</M> and <M>v = {fmt(v)}</M>, which is negative.{' '}
          </>
        )}
        On this trip the body moves in the negative direction, so its point sits on the blue lower half. To switch to
        the upper half <M>v</M> would have to pass through <M>0</M>, and that only happens at <M>x = \pm 1</M>, the
        two ends of the interval. Drag <M>t</M> past <M>{'\\tfrac{\\pi}{2} \\approx 1.57'}</M>.
      </Notice>
    )
  } else if (backHome) {
    notice = (
      <Notice tone="warn">
        Back at rest at <M>x = 1</M>, where it started, and the motion repeats. The whole return trip ran along the
        orange upper half, with <M>v &gt; 0</M> but exactly the same <M>v^2 = 4 - 4x^2</M> as the trip out. That
        return trip is not the interval in the question, so <M>{'v = +2\\sqrt{1-x^2}'}</M> is rejected.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        This is <b>after</b> the interval: the body has turned round at <M>x = -1</M> and is heading back, so{' '}
        <M>v = {fmt(v)}</M> is positive and the point is on the orange upper half, <M>{'v = +2\\sqrt{1-x^2}'}</M>.
        Check the readout: <M>v^2 = 4 - 4x^2</M> still holds, exactly as it did on the way out. Squaring threw the
        direction away, so only the given <M>v = -2</M> at <M>O</M> can pick the sign: the minus one.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.7, 1.7]} y={[-3, 3]} xStep={0.5} yStep={1} height={340} xLabel="x" yLabel="v">
        <Plot.OfX y={lower} domain={[-1, 1]} color={C.f} weight={3} />
        <Plot.OfX y={upper} domain={[-1, 1]} color={C.g} weight={2.5} style="dashed" />
        <Label at={[0.5, lower(0.5)]} color={C.f} attach="se">v = −2√(1 − x²)</Label>
        <Label at={[0.5, upper(0.5)]} color={C.g} attach="ne">v = +2√(1 − x²)</Label>
        <Point x={0} y={-2} color={C.f} opacity={0.6} />
        <Label at={[0, -2]} color={C.f} attach="sw" size={12}>given: v = −2 at O</Label>
        <Label at={[1, 0]} attach="ne" size={12}>rest</Label>
        <Label at={[-1, 0]} attach="nw" size={12}>rest</Label>
        <Line.Segment point1={[x, 0]} point2={[x, v]} color={C.guide} style="dashed" weight={1.5} />
        {Math.abs(v) > 0.05 && <Vector tail={[x, 0]} tip={[x + 0.3 * v, 0]} color={C.ink} weight={3} />}
        <Point x={x} y={0} color={C.ink} />
        <Point x={x} y={v} color={col} />
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={val => {
            player.stop()
            setT(val)
          }}
          min={0}
          max={T_END}
          step={0.005}
          format={val => `${val.toFixed(2)} s`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play the motion" />
        </Buttons>
        <Readouts>
          <Readout tex={`x = ${fmt(x)}`} />
          <Readout color={col} tex={`v = ${fmt(v)}`} />
          <Readout tex={`a = -4x = ${fmt(a)}`} />
          <Readout tex={`v^2 = ${fmt(v * v)}, \\quad 4 - 4x^2 = ${fmt(4 - 4 * x * x)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
