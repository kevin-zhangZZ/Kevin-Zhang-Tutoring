// 2016 Specialist Exam 2 Q5d — once the engine cuts out at t = 5, the acceleration is frozen at
// −9.8, so the height after t = 5 is a new parabola, not the part (c) formula carried on. Sweep t
// along the true height–time graph; the toggle overlays h = 7.6t² − (5/6)t³ continued past t = 5
// (the report's most common misconception), whose acceleration 76/5 − 5t keeps falling below
// −9.8 as if a thrust were now pulling the rocket down. That route peaks at t = 6.08 with
// h ≈ 93.65 m; the true peak is t ≈ 6.38, h ≈ 95.13 m. Numbers checked with sympy.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Buttons, Slider, Toggle,
  usePlayer,
} from './kit'

const G = 9.8
const H5 = 515 / 6
const V5 = 13.5
const powered = (t: number) => 7.6 * t * t - (5 / 6) * t ** 3
const free = (t: number) => H5 + V5 * (t - 5) - (G / 2) * (t - 5) ** 2
const height = (t: number) => (t <= 5 ? powered(t) : free(t))
const T_TOP = 5 + V5 / G // 6.378
const H_TOP = H5 + (V5 * V5) / (2 * G) // 95.13
const T_WRONG = 152 / 25 // 6.08
const H_WRONG = powered(T_WRONG) // 93.65

export default function CarryOn() {
  const [t, setT] = useState(5.6)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 8, seconds: 6 })

  const aTrue = t <= 5 ? 76 / 5 - 5 * t : -G
  const aWrong = 76 / 5 - 5 * t
  const after = t > 5

  let notice
  if (!after) {
    notice = (
      <Notice>
        <b>Engine on</b> (<M>{'0\\le t\\le 5'}</M>): the acceleration <M>{'\\tfrac{76}{5}-5t'}</M> changes with time, so the
        height comes from integrating, as in part (c). Move <M>t</M> past 5.
      </Notice>
    )
  } else if (!wrong) {
    notice = (
      <Notice tone="good">
        <b>Engine off:</b> only gravity acts, so the acceleration stays at <M>-9.8</M> and the graph is a new parabola starting at{' '}
        <M>{'(5,\\ 85.83)'}</M> with slope <M>13.5</M>. Its top is at <M>{'t\\approx 6.38'}</M>, height{' '}
        <M>{'95.13'}</M> m. Now turn on the toggle.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The dashed red curve keeps using <M>{'h=\\tfrac{76}{10}t^2-\\tfrac56t^3'}</M> after <M>t=5</M>. Its acceleration is still{' '}
        <M>{'\\tfrac{76}{5}-5t'}</M> ({aWrong.toFixed(1)} at this <M>t</M>), as if the thrust had turned round and pushed down. It
        peaks too early and too low: <M>{'93.65'}</M> m at <M>{'t=6.08'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 8]} y={[0, 100]} xStep={1} yStep={20} height={320} xLabel="t" yLabel="h">
        <Plot.OfX y={powered} domain={[0, 5]} color={C.f} weight={3} />
        <Plot.OfX y={free} domain={[5, 8]} color={C.g} weight={3} />
        {wrong && <Plot.OfX y={powered} domain={[5, 8]} color={C.bad} weight={2.5} style="dashed" />}
        <Line.Segment point1={[5, 0]} point2={[5, 100]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[5, 8]} color={C.guide} attach="w">engine off</Label>
        <Point x={T_TOP} y={H_TOP} color={C.good} />
        <Label at={[T_TOP, H_TOP]} color={C.good} attach="n">95.13</Label>
        {wrong && <Point x={T_WRONG} y={H_WRONG} color={C.bad} />}
        {wrong && <Label at={[T_WRONG, H_WRONG]} color={C.bad} attach="sw">93.65</Label>}
        <Point x={t} y={height(t)} color={after ? C.g : C.f} />
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={8}
          step={0.02}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Fly from t = 0" />
          <Toggle label="Keep using part (c)'s formula" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={after ? C.g : C.f} tex={`h \\approx ${height(t).toFixed(2)}\\text{ m}`} />
          <Readout color={after ? C.g : C.f} tex={`a = ${aTrue.toFixed(1)}\\text{ m s}^{-2}`} />
          {wrong && after && <Readout color={C.bad} tex={`\\text{part (c) formula: } a = ${aWrong.toFixed(1)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
