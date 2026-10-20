// 2022 Specialist NHT Exam 2 Q6 d.–e. — the release altitude h controls where the package lands.
// The aircraft flies along y = 500 − x/30 (sky blue); released at altitude h it is at
// x = 30(500 − h), and the package (orange) keeps the aircraft's velocity 60i − 2j while gravity
// pulls it down: r(T) = (30(500 − h) + 60T) i + (h − 2T − 4.9T²) j. It starts at h = 460 (part d.):
// lands at x ≈ 1769.2, 30.8 m short of the drop position (1800, 0). At h ≈ 458.95 (part e.) it lands
// on the drop position. The toggle shows the wrong idea that the package falls straight down: it
// would land under the release point, 600 m short at h = 460. The view is zoomed to x 700–2100, so
// the y-axis is out of view and its numbers are drawn along the left edge. Numbers checked with scipy.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const H_TARGET = 458.95214 // solve(30(500 − h) + 60T(h) = 1800, h), checked with scipy
const X0 = 700
const X1 = 2100
const pathY = (x: number) => 500 - x / 30
const fallTime = (h: number) => (-2 + Math.sqrt(4 + 19.6 * h)) / 9.8

export default function Release() {
  const [h, setH] = useState(460)
  const [straight, setStraight] = useState(false)

  const xr = 30 * (500 - h) // where the aircraft is when it reaches altitude h
  const tr = (500 - h) / 2 // the aircraft's time at release
  const T = fallTime(h)
  const xl = xr + 60 * T
  const short = 1800 - xl
  const onTarget = Math.abs(short) < 0.3
  const partD = Math.abs(h - 460) < 0.005
  const gapColour = onTarget ? C.good : C.bad

  let notice
  if (onTarget) {
    notice = (
      <Notice tone="good">
        <b>On target:</b> released at <M>{'h \\approx 458.95'}</M> m the package lands on the drop position. Compared
        with part d., the aircraft is about 1 m lower, so it releases about 0.5 s later and 31 m further on, which
        almost exactly makes up the 30.8 m shortfall.
      </Notice>
    )
  } else if (partD) {
    notice = (
      <Notice tone="warn">
        <b>Part d.:</b> released at 460 m (at <M>t = 20</M>, <M>x = 1200</M>), the package carries the aircraft&apos;s
        velocity <M>{'60\\underset{\\sim}{i} - 2\\underset{\\sim}{j}'}</M> and falls for about 9.49 s, moving{' '}
        <M>{'60 \\times 9.49 \\approx 569'}</M> m forward. It lands at <M>x \approx 1769.2</M>, 30.8 m short. Try
        releasing a little later, at a lower altitude.
      </Notice>
    )
  } else if (short > 0) {
    notice = (
      <Notice>
        Still short by about {short.toFixed(1)} m: the package is released too early. The aircraft is descending, so
        a later release means a <em>lower</em> altitude: slide <M>h</M> down.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now it overshoots by about {(-short).toFixed(1)} m: released too late. Slide <M>h</M> back up. Each metre of
        altitude moves the landing point about 29 m.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, 520]} xStep={100} yStep={100} height={320} yLabel="" yLabels={false} xLabels={v => (Math.round(v) % 200 === 0 && v >= 800 && v <= 2000 ? String(Math.round(v)) : '')}>
        {[100, 200, 300, 400, 500].map(v => (
          <Label key={v} at={[X0, v]} attach="e" color={C.guide} size={10} bold={false}>
            {String(v)}
          </Label>
        ))}
        <Line.Segment point1={[X0, pathY(X0)]} point2={[X1, pathY(X1)]} color={C.f} weight={2.5} />
        <Label at={[X1, pathY(X1)]} attach="nw" color={C.f} size={11}>aircraft path</Label>
        {straight && (
          <>
            <Line.Segment point1={[xr, h]} point2={[xr, 0]} color={C.bad} style="dashed" weight={2} />
            <Label at={[xr, 140]} attach="w" color={C.bad} size={11}>straight down?</Label>
          </>
        )}
        <Plot.Parametric xy={T2 => [xr + 60 * T2, h - 2 * T2 - 4.9 * T2 * T2]} domain={[0, T]} color={C.g} weight={3} />
        <Line.Segment point1={[xl, 0]} point2={[1800, 0]} color={gapColour} weight={5} />
        <Point x={xr} y={h} color={C.f} />
        <Label at={[xr, h]} attach="ne" color={C.f} size={11}>release</Label>
        <Point x={1800} y={0} color={C.violet} />
        <Label at={[1800, 0]} attach="ne" color={C.violet} size={11}>drop</Label>
        <Point x={xl} y={0} color={C.g} />
      </Plane>
      <Controls>
        <Slider label="h (m)" value={h} onChange={setH} min={450} max={470} step={0.01} format={v => v.toFixed(2)} />
        <Buttons>
          <ActionButton label="Part d. (460 m)" onClick={() => setH(460)} />
          <ActionButton label="Part e. (458.95 m)" onClick={() => setH(H_TARGET)} />
        </Buttons>
        <Toggle label="What if it fell straight down?" checked={straight} onChange={setStraight} />
        <Readouts>
          <Readout color={C.f} tex={`\\text{release at } t = \\tfrac{500-h}{2} \\approx ${tr.toFixed(2)},\\ x \\approx ${xr.toFixed(1)}`} />
          <Readout color={C.g} tex={`\\text{fall time } T \\approx ${T.toFixed(4)},\\ \\text{lands at } x \\approx ${xl.toFixed(1)}`} />
          <Readout color={gapColour} tex={onTarget ? '\\text{lands on the drop position}' : short >= 0 ? `\\text{short by} \\approx ${short.toFixed(1)}\\ \\text{m}` : `\\text{overshoots by} \\approx ${(-short).toFixed(1)}\\ \\text{m}`} />
        </Readouts>
        {notice}
        {straight && (
          <Notice tone="warn">
            Falling straight down would land the package at <M>x \approx {xr.toFixed(0)}</M>, hundreds of metres short. It
            doesn&apos;t: at release the package is moving with the aircraft, so it keeps the 60 m/s forward velocity
            all the way down (nothing acts horizontally once air resistance is ignored).
          </Notice>
        )}
      </Controls>
    </div>
  )
}
