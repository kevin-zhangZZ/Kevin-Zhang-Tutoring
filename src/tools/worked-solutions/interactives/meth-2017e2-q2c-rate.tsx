// 2017 Methods Exam 2 Q2c — the rate of change of the height is greatest when P is level with the
// centre on the way up (t = 7.5), not at the top (t = 15). Three views of the same instant: the
// wheel, with P's velocity arrow (grey) and its vertical part h′(t) (orange); the graph of
// h(t) = 65 − 55cos(πt/15) with the tangent at t; and the graph of h′(t) = (11π/3)sin(πt/15).
// At the top the tangent is flat and h′ = 0: that is the time of maximum height, the report's
// common wrong answer (15 minutes), not the time of maximum rate.

import { useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  Vector, num, usePlayer,
} from './kit'

const R = 55
const YC = 65
const N = Math.PI / 15
const PEAK = (11 * Math.PI) / 3
const h = (t: number) => YC - R * Math.cos(N * t)
const dh = (t: number) => PEAK * Math.sin(N * t)
// Metres of arrow drawn per (metre per minute) of velocity. At 2.5 the arrows stay clear of the
// ground and of the top of the view all the way round.
const SCALE = 2.5
// Half-width (in minutes) of the tangent segment drawn on the h graph.
const HALF = 3.5
const timeLabel = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1))
// On the wheel: x ticks every 30 and y ticks every 25, so the two sets never share a value and the
// x ticks that land on the (letterboxed) left and right edges, ±90 and ±120, can be hidden alone.
// The y tick 125 is hidden too: it sits just above the top of the wheel, where P's label and the
// velocity arrow pass.
const wheelLabel = (v: number) => (Math.abs(v) === 90 || Math.abs(v) === 120 || v === 125 ? '' : String(v))

function Caption({ children }: { children: string }) {
  return <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mb-1">{children}</p>
}

export default function RateWidget() {
  const [t, setT] = useState(4)
  const player = usePlayer(setT, { min: 0, max: 30, seconds: 12 })

  const px = R * Math.sin(N * t)
  const py = h(t)
  const rate = dh(t)
  const vx = R * N * Math.cos(N * t)
  const vy = rate

  const at = (v: number) => Math.abs(t - v) < 0.26
  const atClimb = at(7.5)
  const atTop = at(15)
  const atFall = at(22.5)
  const atBottom = t < 0.26 || t > 29.74

  const jump = (v: number) => {
    player.stop()
    setT(v)
  }

  let notice
  if (atClimb) {
    notice = (
      <Notice tone="good">
        <b><M>t = 7.5</M>: P is level with the centre, on the way up.</b> Here P is moving straight up, so all of its
        speed goes into height and <M>{"h'(7.5) = \\tfrac{11\\pi}{3} \\approx 11.52"}</M> m/min, the biggest it ever gets.
        On the <M>h</M> graph this is the steepest point, where the curve crosses its midline <M>h = 65</M>. It is a
        quarter of the way through the <M>30</M>-minute period.
      </Notice>
    )
  } else if (atTop) {
    notice = (
      <Notice tone="warn">
        <b><M>t = 15</M> is the top: <M>h</M> is at its maximum, but its rate is zero.</b> P is moving sideways here,
        so it isn&apos;t gaining any height, and the tangent on the <M>h</M> graph is flat: <M>{"h'(15) = 0"}</M>.
        Solving <M>{"h'(t) = 0"}</M> finds <i>this</i> point, the maximum of <M>h</M>. That is the report&apos;s common
        wrong answer, 15 minutes.
      </Notice>
    )
  } else if (atFall) {
    notice = (
      <Notice>
        <M>t = 22.5</M>: level with the centre again, but on the way <b>down</b>. P is moving straight down, so{' '}
        <M>{"h'(22.5) = -\\tfrac{11\\pi}{3}"}</M>, the <i>minimum</i> rate (the fastest fall). Solving{' '}
        <M>{"h''(t) = 0"}</M> gives both <M>7.5</M> and <M>22.5</M>; only <M>7.5</M> is the maximum.
      </Notice>
    )
  } else if (atBottom) {
    notice = (
      <Notice>
        At the bottom P is moving sideways, so <M>{"h' = 0"}</M> here too: <M>h</M> is at its minimum, <M>10</M> m.
        Press play and watch the orange arrow (the vertical part of P&apos;s motion) grow and shrink.
      </Notice>
    )
  } else if (t < 7.5) {
    notice = (
      <Notice>
        P is climbing and its motion is turning more and more upward, so the orange arrow (the vertical part of P&apos;s
        velocity, which is <M>{"h'(t)"}</M>) keeps growing. The tangent on the <M>h</M> graph is getting steeper. Keep
        going: where does the orange arrow stop growing?
      </Notice>
    )
  } else if (t < 15) {
    notice = (
      <Notice>
        Still climbing (<M>{"h' > 0"}</M>), but P&apos;s motion is turning sideways, so it climbs more slowly: the orange
        arrow is shrinking and the <M>h</M> graph is flattening out. The rate peaked back at <M>t = 7.5</M>, even
        though the height is still rising.
      </Notice>
    )
  } else if (t < 22.5) {
    notice = (
      <Notice>
        Past the top, P is coming down, so <M>{"h' < 0"}</M> and the orange arrow points down. It is falling faster and
        faster until it is level with the centre at <M>t = 22.5</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Still falling, but more slowly as P&apos;s motion turns sideways again. At <M>t = 30</M> Sammy is back at the
        bottom after exactly one period, <M>{"\\tfrac{2\\pi}{\\pi/15} = 30"}</M> minutes.
      </Notice>
    )
  }

  const showArrow = Math.abs(vy) * SCALE > 1.2
  // P's label goes on the side away from its velocity arrow: near the top and bottom the arrow is
  // horizontal (left at the top, right at the bottom); elsewhere it goes outside the wheel.
  const labelSide = Math.abs(px) < 20 ? (vx > 0 ? 'w' : 'e') : px >= 0 ? 'e' : 'w'

  return (
    <div>
      {/* U+2060 (word joiner) stops a line break between h′ and (t). */}
      <Caption>{"The wheel (metres). Grey arrow: P's velocity. Orange arrow: its vertical part, h′⁠(t)."}</Caption>
      <Plane x={[-70, 70]} y={[-10, 132]} xStep={30} yStep={25} equalScale height={230} labels={wheelLabel} xLabel="" yLabel="">
        <Circle center={[0, YC]} radius={R} color={C.f} fillOpacity={0} weight={2} />
        <Line.Segment point1={[-70, YC]} point2={[70, YC]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, YC]} point2={[px, py]} color={C.guide} weight={1.5} />
        <Point x={0} y={YC} color={C.ink} />
        <Label at={[0, YC]} attach="w">C</Label>
        <Vector tail={[px, py]} tip={[px + SCALE * vx, py + SCALE * vy]} color={C.guide} weight={1.5} />
        {showArrow && <Vector tail={[px, py]} tip={[px, py + SCALE * vy]} color={C.g} weight={2.5} />}
        <Point x={px} y={py} color={C.f} />
        <Label at={[px, py]} color={C.f} attach={labelSide}>P</Label>
      </Plane>
      <div className="mt-3">
        <Caption>Height h(t) in metres, against t in minutes</Caption>
        <Plane x={[0, 31.5]} y={[-14, 128]} xStep={7.5} yStep={20} height={180} xLabel="" yLabel="" labels={timeLabel}>
          <Line.Segment point1={[0, YC]} point2={[30, YC]} color={C.guide} style="dashed" weight={1.5} />
          <Plot.OfX y={h} domain={[0, 30]} color={C.f} weight={3} />
          <Line.Segment
            point1={[t - HALF, py - HALF * rate]}
            point2={[t + HALF, py + HALF * rate]}
            color={C.g}
            weight={2.5}
          />
          <Point x={t} y={py} color={C.f} />
        </Plane>
      </div>
      <div className="mt-3">
        <Caption>Rate of change h′(t) in metres per minute, against t</Caption>
        <Plane x={[0, 31.5]} y={[-13, 13]} xStep={7.5} yStep={5} height={140} xLabel="" yLabel="" labels={timeLabel}>
          <Line.Segment point1={[0, PEAK]} point2={[30, PEAK]} color={C.guide} style="dashed" weight={1.5} />
          {/* mafs places attach="n" text below the point. */}
          <Label at={[26.5, PEAK]} color={C.guide} attach="s" size={12}>11π/3</Label>
          <Plot.OfX y={dh} domain={[0, 30]} color={C.g} weight={3} />
          <Line.Segment point1={[t, 0]} point2={[t, rate]} color={C.g} style="dashed" weight={1.5} />
          <Point x={t} y={rate} color={C.g} />
        </Plane>
      </div>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={30}
          step={0.05}
          format={v => `${v.toFixed(1)} min`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Ride one rotation" />
          <Toggle label="t = 7.5" checked={atClimb} onChange={() => jump(7.5)} />
          <Toggle label="t = 15 (the top)" checked={atTop} onChange={() => jump(15)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`h(t) \\approx ${num(py, 1)}\\text{ m}`} />
          <Readout color={C.g} tex={`h'(t) \\approx ${num(rate, 2)}\\text{ m/min}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
