// 2015 Specialist Exam 2 Q5d(iv) — the time to reach a speed is the area under dt/dv = 1/(1.4(7 − v))
// between the starting speed 0 and the final speed. Drag the final speed b: the shaded area is the
// time, and the depth reached (from part d(ii)) is shown beside it, so the student sees that depth D
// corresponds to speed 5 — the limits are speeds, because the variable of integration is v. A toggle
// shows what the integral gives if the depth 2.7 is wrongly used as the upper limit. Near v = 7 the
// area grows without bound: the trailer never reaches its terminal speed.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const g = (v: number) => 1 / (1.4 * (7 - v))
const time = (b: number) => Math.log(7 / (7 - b)) / 1.4
const depth = (b: number) => (-b - 7 * Math.log(7 - b) + 7 * Math.log(7)) / 1.4
const D = depth(5) // 2.692…

export default function TimeArea() {
  const [b, setB] = useState(5)
  const [wrong, setWrong] = useState(false)

  const upper = wrong ? D : b
  const area = time(upper)
  const at5 = Math.abs(b - 5) < 0.03
  const near7 = b > 6.2

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        With <M>D \approx 2.69</M> as the upper limit you get <M>{`t \\approx ${area.toFixed(2)}`}</M>, the time to
        reach a <b>speed</b> of 2.69 m/s — not a depth. The integral is with respect to <M>v</M>, so both limits must be speeds: 0
        and 5.
      </Notice>
    )
  } else if (at5) {
    notice = (
      <Notice tone="good">
        At speed 5 the trailer is at depth <M>D \approx 2.69</M> m, and the shaded area is{' '}
        <M>{'\\int_0^5 \\frac{dv}{1.4(7-v)} \\approx 0.895'}</M> s. Turn on the toggle to see what using{' '}
        <M>D</M> as the limit would give.
      </Notice>
    )
  } else if (near7) {
    notice = (
      <Notice>
        As <M>b</M> approaches 7 the curve shoots up and the area grows without bound: the trailer gets ever closer to
        its terminal speed of 7 m/s but never reaches it.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The shaded area is the time taken to speed up from 0 to <M>b</M>. Set <M>b = 5</M>: that is the speed the
        question gives at depth <M>D</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 7.4]} y={[0, 1.6]} xStep={1} yStep={0.5} height={300} xLabel="v" yLabel="">
        <Region top={g} bottom={() => 0} from={0} to={upper} color={wrong ? C.bad : C.f} opacity={0.25} />
        <Plot.OfX y={g} domain={[0, 6.55]} color={C.f} weight={3} />
        <Line.Segment point1={[7, 0]} point2={[7, 1.6]} color={C.guide} style="dashed" weight={2} />
        <Label at={[7, 0.22]} color={C.guide} attach="w">v = 7</Label>
        <Line.Segment point1={[upper, 0]} point2={[upper, g(upper)]} color={wrong ? C.bad : C.f} weight={2} />
        <Label at={[5.6, g(5.6)]} color={C.f} attach="nw">dt/dv = 1/(1.4(7 − v))</Label>
      </Plane>
      <Controls>
        <Slider
          label="\text{final speed } b"
          value={b}
          onChange={v => {
            setB(v)
            setWrong(false)
          }}
          min={0.5}
          max={6.5}
          step={0.05}
        />
        <Toggle label="Use the depth D as the upper limit" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout
            color={wrong ? C.bad : C.f}
            tex={`t = \\int_0^{${upper.toFixed(2)}} \\frac{dv}{1.4(7-v)} \\approx ${area.toFixed(3)}\\ \\text{s}`}
          />
          {!wrong && <Readout tex={`\\text{depth at speed } ${b.toFixed(2)}:\\ x \\approx ${depth(b).toFixed(2)}\\ \\text{m}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
