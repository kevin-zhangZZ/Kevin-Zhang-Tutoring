// 2018 Specialist Exam 2 Q5d — why the speed at the end of the ramp is just under 4.9 m/s.
// Speed v against distance x from part c.: x = −v + 4.9 logₑ(4.9/(4.9 − v)). The orange gap from
// the point up to the dashed line v = 4.9 IS the acceleration a = 4.9 − v, so the gap closes more
// and more slowly and never shuts. Play runs in real time (v = 4.9(1 − e^(−t)),
// x = 4.9(t − 1 + e^(−t)), the same motion); the end of the ramp, x = 15, gives v ≈ 4.81 after
// ≈ 4.04 s. Past x = 15 the curve is dashed: an imagined longer ramp still never reaches 4.9.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, usePlayer } from './kit'

const K = 4.9 // g/2 with g = 9.8: the terminal speed
const X = (v: number) => -v + K * Math.log(K / (K - v)) // part c's answer
const vOfT = (t: number) => K * (1 - Math.exp(-t))
const xOfT = (t: number) => K * (t - 1 + Math.exp(-t))
/** Time to slide x metres, by bisection (xOfT is increasing). */
function tOfX(x: number) {
  let lo = 0
  let hi = 30
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (xOfT(mid) < x) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}
const RAMP = 15
const XMAX = 31
const T_END = tOfX(RAMP) // ≈ 4.04 s
const V_END = vOfT(T_END) // ≈ 4.81
const V_MAX = vOfT(tOfX(XMAX))

export default function Terminal() {
  const [t, setT] = useState(tOfX(3))
  const player = usePlayer(setT, { min: 0, max: T_END, seconds: T_END })

  const x0 = xOfT(t)
  const v0 = vOfT(t)
  const a = K - v0
  const atEnd = Math.abs(x0 - RAMP) < 0.3
  const gapLabelSide = x0 > 24 ? 'w' : 'e'

  let notice
  if (atEnd) {
    notice = (
      <Notice tone="good">
        <b>End of the ramp:</b> <M>x = 15</M> gives <M>{`v \\approx ${V_END.toFixed(2)}`}</M> m s<M>{'^{-1}'}</M>, part
        d.&apos;s answer. It is still speeding up, but only just (<M>{`a \\approx ${(K - V_END).toFixed(2)}`}</M>), so the
        speed is a whisker under <M>4.9</M>. An answer of <M>4.9</M> or more must be wrong, which is why the CAS solve is
        restricted to <M>{'0 < v < 4.9'}</M>. Drag past <M>15</M> to imagine a longer ramp.
      </Notice>
    )
  } else if (x0 < 5) {
    notice = (
      <Notice>
        The orange gap <M>a</M> up to the dashed line is <M>{'4.9 - v'}</M>, which is exactly the acceleration{' '}
        <M>{'\\tfrac{g-2v}{2}'}</M> from part b.ii. Near the top the suitcase is slow, the resistance is small and the gap
        is big, so the speed climbs quickly. Press play to watch it slide down the <M>{'15\\text{ m}'}</M> ramp in real
        time.
      </Notice>
    )
  } else if (x0 < RAMP) {
    notice = (
      <Notice>
        The faster the suitcase goes, the more resistance it meets, so the gap <M>{'a = 4.9 - v'}</M> shrinks, and a smaller
        gap means the speed creeps up more slowly. The gap closes, but never shuts. Keep going to the red line at the end of
        the ramp, <M>x = 15</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Past the real ramp (dashed): even at <M>{`x = ${x0.toFixed(0)}`}</M> m the speed is only{' '}
        <M>{`${v0.toFixed(3)}`}</M>. In part c.&apos;s answer, <M>{'\\log_e\\!\\left(\\tfrac{4.9}{4.9-v}\\right)\\to\\infty'}</M>{' '}
        as <M>{'v \\to 4.9'}</M>, so reaching <M>4.9</M> would take an infinitely long ramp. <M>4.9</M> m s
        <M>{'^{-1}'}</M> is the terminal speed.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, XMAX]} y={[0, 5.8]} xStep={5} yStep={1} height={300} xLabel="x" yLabel="v">
        <Line.Segment point1={[0, K]} point2={[XMAX, K]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[XMAX - 0.5, K]} color={C.guide} attach="nw">v = 4.9 (a = 0)</Label>
        <Line.Segment point1={[RAMP, 0]} point2={[RAMP, 5.8]} color={C.bad} style="dashed" weight={2} />
        <Label at={[RAMP, 1]} color={C.bad} attach="e">end of ramp</Label>
        <Plot.Parametric xy={s => [X(s), s]} domain={[0, V_END]} color={C.f} weight={3} />
        <Plot.Parametric xy={s => [X(s), s]} domain={[V_END, V_MAX]} color={C.f} weight={2} style="dashed" />
        <Line.Segment point1={[x0, v0]} point2={[x0, K]} color={C.g} weight={5} />
        {a > 0.25 && (
          <Label at={[x0, (v0 + K) / 2]} color={C.g} attach={gapLabelSide}>a</Label>
        )}
        <Point x={x0} y={v0} color={atEnd ? C.good : C.f} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={x => {
            player.stop()
            setT(tOfX(x))
          }}
          min={0}
          max={30}
          step={0.1}
          format={x => x.toFixed(1)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Slide down the ramp" />
          <ActionButton
            label="End of the ramp"
            onClick={() => {
              player.stop()
              setT(T_END)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout tex={`x \\approx ${x0.toFixed(2)}\\text{ m}`} />
          <Readout color={atEnd ? C.good : C.f} tex={`v \\approx ${v0.toFixed(atEnd || x0 > RAMP ? 3 : 2)}`} />
          <Readout color={C.g} tex={`a = 4.9 - v \\approx ${a.toFixed(3)}`} />
          <Readout tex={`t \\approx ${t.toFixed(2)}\\text{ s}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
