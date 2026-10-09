// 2023 Specialist Exam 2 MCQ 16 — total vertical distance adds the climb and the fall. Height
// z(t) = 15t − 4.9t² + 1.5 is plotted against t, with two bars on the right that fill as the ball
// moves: the climb (violet) runs from the release height 1.5 m to the top 636/49 ≈ 12.98 m at
// t = 15/9.8 ≈ 1.53, so it is only ≈ 11.48 m; the fall (orange) runs from the top to the ground,
// ≈ 12.98 m, landing at t ≈ 3.16. Readouts compare distance (up + down ≈ 24.46, option D) with
// displacement (z − 1.5, ending at −1.5, option A). A toggle shows option E's 2 × 13 counting a
// 1.5 m climb below the release point that the ball never travels.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, Buttons, num, usePlayer } from './kit'

const z = (t: number) => 15 * t - 4.9 * t * t + 1.5
const Z0 = 1.5
const T_TOP = 15 / 9.8 // ≈ 1.531
const Z_MAX = z(T_TOP) // 636/49 ≈ 12.98
const T_LAND = (15 + Math.sqrt(15 * 15 + 4 * 4.9 * 1.5)) / 9.8 // ≈ 3.158
const T_MAX = 3.16
const X_UP = 3.5
const X_DOWN = 4.1

export default function UpAndDown() {
  const [t, setT] = useState(2.4)
  const [doubled, setDoubled] = useState(false)
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 6 })

  const tt = Math.min(t, T_LAND)
  const landed = t >= T_LAND - 0.005
  const h = landed ? 0 : z(tt)
  const nearTop = Math.abs(tt - T_TOP) <= 0.03
  const rising = tt < T_TOP
  const up = rising ? h - Z0 : Z_MAX - Z0
  const down = rising ? 0 : Z_MAX - h
  const dotColor = rising ? C.violet : C.g

  let notice
  if (doubled) {
    notice = (
      <Notice tone="warn">
        Option <b>E</b> doubles the maximum height: <M>{'2 \\times 12.98 \\approx 26.0'}</M>. That counts the climb as the
        full <M>12.98</M> m, as if the ball were thrown from the ground, so it adds the red dashed <M>1.5</M> m below the up
        bar. The ball was released <M>1.5</M> m up and never travels that bit: the climb is only{' '}
        <M>{'12.98 - 1.5 \\approx 11.48'}</M> m.
      </Notice>
    )
  } else if (landed) {
    notice = (
      <Notice tone="good">
        <b>Landed</b> at <M>t \approx 3.16</M>. Distance travelled <M>{'= 11.48 + 12.98 \\approx 24.5'}</M> m, option{' '}
        <b>D</b>. The displacement is only <M>{'0 - 1.5 = -1.5'}</M> m (option A), because it subtracts the fall from the
        climb instead of adding them. Turn on the toggle to see where <M>26.0</M> comes from.
      </Notice>
    )
  } else if (nearTop) {
    notice = (
      <Notice tone="good">
        <b>The top</b>: <M>{'\\dot z = 0'}</M> at <M>{'t = \\tfrac{15}{9.8} \\approx 1.53'}</M>. The climb is finished, and
        it is <M>{'12.98 - 1.5 \\approx 11.48'}</M> m, not <M>13</M> m, because the ball started <M>1.5</M> m up. Keep
        going: every metre the ball now falls adds to the distance.
      </Notice>
    )
  } else if (rising) {
    notice = (
      <Notice>
        The ball is <b>rising</b> (<M>{'\\dot z > 0'}</M>). It was released at <M>1.5</M> m, so the violet up bar starts at{' '}
        <M>1.5</M>, not at the ground. While the ball only moves up, distance and displacement are equal. Drag{' '}
        <M>t</M> past the top at <M>t \approx 1.53</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The ball is <b>falling</b> (<M>{'\\dot z < 0'}</M>). The orange down bar grows, so the distance keeps increasing,
        but the displacement shrinks because the fall undoes the climb. Press <b>Throw the ball</b> or drag to{' '}
        <M>{'{t \\approx 3.16}'}</M>, when the ball hits the ground.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 4.35]}
        y={[-1, 14.5]}
        xStep={1}
        yStep={2}
        height={320}
        xLabel="t"
        yLabel="z"
        xLabels={v => (v > 3.3 ? '' : String(v))}
        yLabels={v => (v < 5 ? '' : String(v))}
      >
        <Line.Segment point1={[0, Z0]} point2={[X_UP, Z0]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[T_TOP, Z_MAX]} point2={[X_DOWN, Z_MAX]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={z} domain={[0, T_LAND]} color={C.guide} style="dashed" weight={2} />
        {tt > 0.01 && <Plot.OfX y={z} domain={[0, Math.min(tt, T_TOP)]} color={C.violet} weight={3} />}
        {tt > T_TOP + 0.01 && <Plot.OfX y={z} domain={[T_TOP, tt]} color={C.g} weight={3} />}
        <Label at={[0.45, Z0]} attach="se" color={C.guide}>release 1.5 m</Label>
        <Label at={[T_TOP, Z_MAX]} attach="n">top ≈ 12.98</Label>

        {doubled && <Line.Segment point1={[X_UP, 0]} point2={[X_UP, Z0]} color={C.bad} style="dashed" weight={7} />}
        {up > 0.02 && <Line.Segment point1={[X_UP, Z0]} point2={[X_UP, Z0 + up]} color={C.violet} weight={7} />}
        {down > 0.02 && <Line.Segment point1={[X_DOWN, Z_MAX]} point2={[X_DOWN, Z_MAX - down]} color={C.g} weight={7} />}
        <Label at={[X_UP, 0]} attach="s" color={C.violet}>up</Label>
        <Label at={[X_DOWN, 0]} attach="s" color={C.g}>down</Label>

        <Point x={tt} y={h} color={dotColor} />
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={tt}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={T_MAX}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Throw the ball" />
          <Toggle label="Double the max height? (E)" checked={doubled} onChange={setDoubled} />
        </Buttons>
        <Readouts>
          <Readout tex={`z(${num(tt)}) \\approx ${num(h)}`} />
          <Readout color={C.violet} tex={`\\text{up} \\approx ${num(up)}`} />
          <Readout color={C.g} tex={`\\text{down} \\approx ${num(down)}`} />
          <Readout color={C.good} tex={`\\text{distance} = \\text{up} + \\text{down} \\approx ${num(up + down)}`} />
          <Readout tex={`\\text{displacement} = z - 1.5 \\approx ${num(h - Z0)}`} />
          {doubled && <Readout color={C.bad} tex={`2 \\times 12.98 \\approx ${num(2 * Z_MAX)}\\ \\text{(wrong)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
