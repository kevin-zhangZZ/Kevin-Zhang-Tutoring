// 2020 Methods Exam 1 Q7c — slide y = f(x − k), f(x) = x² + 3x + 5, left and right and watch its
// shortest distance to P(1, 0). The orange segment runs from P to the closest point of the curve
// (found numerically), and the dashed circle about P with that radius just touches the curve there.
// The dashed line y = 11/4 is the "floor": every point of the curve is on or above it, so no point
// can be closer to P than 11/4. That distance is reached only when the turning point
// (k − 3/2, 11/4) sits directly above P, at k = 5/2. At other k the closest point is NOT the
// turning point (at k = 0 it is near x ≈ −1.13, distance ≈ 3.59), which is why the argument
// needs the floor rather than "the vertex is always the closest point". Drawn to scale.

import { useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, num, tick,
  usePlayer,
} from './kit'

const f = (x: number) => x * x + 3 * x + 5
const FLOOR = 11 / 4
const K_MIN = -2
const K_MAX = 6
const K_BEST = 5 / 2
const snap = (k: number) => (Math.abs(k - K_BEST) < 0.05 ? K_BEST : k)

/** The closest point of y = f(x − k) to P(1, 0): a fine scan, then a local refinement. */
function closest(k: number): { x: number; y: number; d: number } {
  const g = (x: number) => f(x - k)
  const dist = (x: number) => Math.hypot(x - 1, g(x))
  const v = k - 1.5
  let best = v
  let bestD = Infinity
  for (let i = 0; i <= 1200; i++) {
    const x = v - 6 + (12 * i) / 1200
    const d = dist(x)
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  let lo = best - 0.01
  let hi = best + 0.01
  for (let i = 0; i < 40; i++) {
    const m1 = lo + (hi - lo) / 3
    const m2 = hi - (hi - lo) / 3
    if (dist(m1) < dist(m2)) hi = m2
    else lo = m1
  }
  const x = (lo + hi) / 2
  return { x, y: g(x), d: dist(x) }
}

export default function ShiftParabola() {
  const [k, setK] = useState(0)
  const player = usePlayer(setK, { min: K_MIN, max: K_MAX, seconds: 8 })
  const g = (x: number) => f(x - k)
  const vx = k - 1.5
  const near = closest(k)
  const best = k === K_BEST
  const segColor = best ? C.good : C.g

  let notice
  if (best) {
    notice = (
      <Notice tone="good">
        <b>Now the turning point is directly above P</b>, at <M>{'\\left(1, \\tfrac{11}{4}\\right)'}</M>, and the closest
        point of the curve is straight up: the distance is exactly <M>{'\\tfrac{11}{4}'}</M>. The dashed circle can&apos;t
        shrink any further, because the whole curve sits on or above the line <M>{'y = \\tfrac{11}{4}'}</M>, which is{' '}
        <M>{'\\tfrac{11}{4}'}</M> above P. The turning point moved from <M>{'x = -\\tfrac32'}</M> to <M>x = 1</M>, so{' '}
        <M>{'k = \\tfrac52'}</M>.
      </Notice>
    )
  } else if (k < K_BEST) {
    notice = (
      <Notice>
        {Math.abs(k) < 0.03 ? (
          <>This is the original graph (<M>k = 0</M>). </>
        ) : k < 0 ? (
          <>A negative <M>k</M> moves the graph <b>left</b>, away from P. </>
        ) : null}
        The turning point is at <M>{`x \\approx ${num(vx)}`}</M>, to the left of P. Careful: the closest point to P is{' '}
        <b>not</b> the turning point here. The dashed circle first touches the curve partway up the side nearer P, about{' '}
        {num(near.d)} away. That is more than <M>{'\\tfrac{11}{4} = 2.75'}</M>, since that point is above the dashed line
        and not straight above P. Slide <M>k</M> to the right{k < 1 ? ', or press play' : ''}.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Too far: the turning point is at <M>{`x \\approx ${num(vx)}`}</M>, to the <b>right</b> of P, and the shortest
        distance (about {num(near.d)}) is growing again. It was smallest in between, when the turning point was
        directly above P. Slide <M>k</M> back until the orange segment points straight up.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-4, 6]}
        y={[-1, 7]}
        xStep={1}
        yStep={1}
        equalScale
        height={340}
        xLabels={v => (Math.abs(v - 1) < 1e-9 ? '' : tick(v))}
        yLabels={v => (Math.abs(v - 2) < 1e-9 ? tick(v) : '')}
      >
        {Math.abs(k) > 0.05 && <Plot.OfX y={f} color={C.guide} style="dashed" weight={1.5} />}
        <Line.Segment point1={[-20, FLOOR]} point2={[20, FLOOR]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[5.9, FLOOR]} color={C.guide} attach="sw" gap={6}>y = 11/4</Label>
        <Circle center={[1, 0]} radius={near.d} color={segColor} weight={1.5} fillOpacity={0.05} strokeStyle="dashed" />
        <Plot.OfX y={g} color={C.f} weight={3} />
        <Point x={vx} y={FLOOR} color={C.f} />
        <Line.Segment point1={[1, 0]} point2={[near.x, near.y]} color={segColor} weight={3} />
        <Point x={near.x} y={near.y} color={segColor} />
        <Point x={1} y={0} color={C.ink} />
        <Label at={[1, 0]} attach="s" gap={8}>P</Label>
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        To scale. The blue curve is <M>y = f(x - k)</M>; the dashed grey curve is the original graph of <M>f</M>.
      </p>
      <Controls>
        <Slider
          label="k"
          value={k}
          onChange={v => {
            player.stop()
            setK(snap(v))
          }}
          min={K_MIN}
          max={K_MAX}
          step={0.01}
          format={v => num(v)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(k)} label="Slide from k = −2 to 6" />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{turning point } \\left(k - \\tfrac32,\\ \\tfrac{11}{4}\\right) \\approx (${num(vx)},\\ 2.75)`} />
          <Readout
            color={segColor}
            tex={best ? '\\text{shortest distance} = \\tfrac{11}{4}\\ \\checkmark' : `\\text{shortest distance} \\approx ${num(near.d)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
