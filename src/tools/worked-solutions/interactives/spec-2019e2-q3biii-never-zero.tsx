// 2019 Specialist Exam 2 Q3b.iii — why Q = log_e(e^t + e − 1) has no point of inflection. Top: the
// curve with a sliding tangent (slope dQ/dt = e^t/(e^t + e − 1)) and the line Q = t it approaches.
// Bottom: d²Q/dt² = e^t(e − 1)/(e^t + e − 1)² with the same t marked. The slope climbs from e^{−1} ≈ 0.37
// towards 1 the whole way, so the tangent only ever turns one way, and the second-derivative graph stays
// above the axis: it shrinks towards 0 but, being a product of positive factors, never reaches it.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider, num, usePlayer,
} from './kit'

const E1 = Math.E - 1
const Q = (t: number) => Math.log(Math.exp(t) + E1)
const dQ = (t: number) => Math.exp(t) / (Math.exp(t) + E1)
const d2Q = (t: number) => (Math.exp(t) * E1) / (Math.exp(t) + E1) ** 2
const TMAX = 7

export default function NeverZero() {
  const [t0, setT0] = useState(0.5)
  const player = usePlayer(setT0, { min: 0, max: TMAX, seconds: 7 })

  const q = Q(t0)
  const m = dQ(t0)
  const k = d2Q(t0)
  const et = Math.exp(t0)
  const half = 1.3
  const late = t0 > 4

  let notice
  if (t0 < 0.05) {
    notice = (
      <Notice>
        At the start the tangent has slope <M>{'e^{-1} \\approx 0.37'}</M>. Press play and watch the orange tangent: it
        only ever turns <b>anticlockwise</b> (steeper), and the lower graph never touches its axis.
      </Notice>
    )
  } else if (!late) {
    notice = (
      <Notice>
        The slope is <M>{`${num(m, 3)}`}</M> and still increasing, because <M>{`\\tfrac{d^2Q}{dt^2} \\approx ${num(k, 3)} > 0`}</M>.
        An inflection needs the tangent to <b>stop</b> turning one way and start turning the other. That can only happen
        where the lower graph <b>crosses</b> its axis. Keep going to large <M>t</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Now <M>{`\\tfrac{d^2Q}{dt^2} \\approx ${k.toExponential(1).replace(/e([-+]\d+)/, '\\times 10^{$1}')}`}</M>:
        tiny, but still positive, since it is a product of positive factors (green readout). Getting close to 0 is not
        reaching 0, and it would have to change sign for an inflection. The slope just creeps up towards 1, so the curve
        hugs the line <M>Q = t</M> from above.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, TMAX]} y={[0, 7.3]} xStep={1} yStep={1} height={260} xLabel="t" yLabel="Q">
        <Plot.OfX y={t => t} domain={[0, TMAX]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[6.6, 6.6]} attach="se" color={C.guide}>Q = t</Label>
        <Plot.OfX y={Q} domain={[0, TMAX]} color={C.f} weight={3} />
        <Line.Segment
          point1={[Math.max(0, t0 - half), q - (t0 - Math.max(0, t0 - half)) * m]}
          point2={[Math.min(TMAX + 0.3, t0 + half), q + (Math.min(TMAX + 0.3, t0 + half) - t0) * m]}
          color={C.g}
          weight={2.5}
        />
        <Point x={t0} y={q} color={C.g} />
        <Label at={[1.2, Q(1.2)]} attach="nw" color={C.f}>Q(t)</Label>
      </Plane>
      <Plane x={[0, TMAX]} y={[-0.06, 0.3]} xStep={1} yStep={0.1} height={150} xLabel="t" yLabel="">
        <Region top={d2Q} bottom={() => 0} from={0} to={TMAX} color={C.good} opacity={0.18} />
        <Plot.OfX y={d2Q} domain={[0, TMAX]} color={C.good} weight={2.5} />
        <Line.Segment point1={[t0, 0]} point2={[t0, k]} color={C.g} weight={2} />
        <Point x={t0} y={k} color={C.g} />
        <Label at={[3.2, 0.2]} attach="e" color={C.good}>d²Q/dt² &gt; 0 everywhere</Label>
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t0}
          onChange={v => {
            player.stop()
            setT0(v)
          }}
          min={0}
          max={TMAX}
          step={0.01}
        />
        <PlayButton playing={player.playing} onClick={() => player.toggle(t0)} label="Sweep t from 0 to 7" />
        <Readouts>
          <Readout color={C.g} tex={`\\tfrac{dQ}{dt} = \\tfrac{e^t}{e^t + e - 1} \\approx ${num(m, 3)}`} />
          <Readout
            color={C.good}
            tex={`\\tfrac{d^2Q}{dt^2} = \\tfrac{${num(et, 2)}\\,\\times\\,${num(E1, 3)}}{(${num(et + E1, 2)})^2} > 0`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
