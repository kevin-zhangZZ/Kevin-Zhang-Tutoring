// 2016 Specialist Exam 2 Q5e — the whole flight on one height–time graph, split into its three
// stages: powered climb (0 to 5 s), coasting climb (1.378 s), fall from rest (4.406 s), total
// ≈ 10.8 s. The report says many students added only some of the stages, and that inconsistent
// signs caused difficulty. The toggle shows the report's one-equation route: measure
// displacement s from the point where the engine cuts out, up positive, so s = 13.5T − 4.9T²
// goes negative once the rocket drops below 85.83 m and reaches −515/6 at the ground (T ≈ 5.78).
// Numbers checked with sympy.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  usePlayer,
} from './kit'

const G = 9.8
const H5 = 515 / 6
const V5 = 13.5
const T_TOP = 5 + V5 / G // 6.378
const H_TOP = H5 + (V5 * V5) / (2 * G) // 95.132
const T_END = T_TOP + Math.sqrt((2 * H_TOP) / G) // 10.784
const powered = (t: number) => 7.6 * t * t - (5 / 6) * t ** 3
const free = (t: number) => H5 + V5 * (t - 5) - (G / 2) * (t - 5) ** 2
const height = (t: number) => (t <= 5 ? powered(t) : free(t))
const velocity = (t: number) => (t <= 5 ? 15.2 * t - 2.5 * t * t : V5 - G * (t - 5))

export default function Stages() {
  const [t, setT] = useState(T_END)
  const [oneEq, setOneEq] = useState(false)
  const player = usePlayer(setT, { min: 0, max: T_END, seconds: 7 })

  const stage = t <= 5 ? 1 : t <= T_TOP ? 2 : 3
  const colour = stage === 1 ? C.f : stage === 2 ? C.g : C.violet
  const T = Math.max(0, t - 5)
  const s = V5 * T - (G / 2) * T * T
  const landed = t > T_END - 0.02

  let notice
  if (oneEq) {
    notice = landed ? (
      <Notice tone="good">
        At the ground the rocket is <M>{'\\tfrac{515}{6}\\approx 85.83'}</M> m <b>below</b> where the engine cut out, so with up
        positive <M>{'s=-\\tfrac{515}{6}'}</M>. Solving <M>{'-\\tfrac{515}{6}=13.5T-4.9T^2'}</M> gives <M>{'T\\approx 5.78'}</M>{' '}
        (stages 2 and 3 together), and <M>{'5+5.78\\approx 10.8'}</M> s.
      </Notice>
    ) : (
      <Notice>
        Here <M>T</M> is the time since the engine cut out and <M>s</M> is measured from the dashed line, up positive. Above
        the line <M>s</M> is positive; once the rocket drops below it, <M>s</M> is negative. Slide to the ground and read{' '}
        <M>s</M>.
      </Notice>
    )
  } else if (landed) {
    notice = (
      <Notice tone="good">
        <b>Total flight time = all three stages:</b> <M>{'5+1.378+4.406\\approx 10.8'}</M> s. Leaving out a stage gives{' '}
        <M>{'9.4'}</M> (no coasting climb) or <M>{'5.8'}</M> (no powered climb). Turn on the toggle for the one-equation route.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Stage {stage}: {stage === 1 ? 'engine on, acceleration 76/5 − 5t' : stage === 2 ? 'engine off, still rising, slowing at 9.8 m s⁻²' : 'falling from rest at the top, speeding up at 9.8 m s⁻²'}.
        Each stage needs its own time; slide to the ground to add them up.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.4, 11.6]} y={[0, 100]} xStep={1} yStep={20} height={320} xLabel="t" yLabel="h">
        <Plot.OfX y={powered} domain={[0, 5]} color={C.f} weight={3} />
        <Plot.OfX y={free} domain={[5, T_TOP]} color={C.g} weight={3} />
        <Plot.OfX y={free} domain={[T_TOP, T_END]} color={C.violet} weight={3} />
        <Line.Segment point1={[5, 0]} point2={[5, H5]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[T_TOP, 0]} point2={[T_TOP, H_TOP]} color={C.guide} style="dashed" weight={1.5} />
        {oneEq && <Line.Segment point1={[5, H5]} point2={[11, H5]} color={C.ink} style="dashed" weight={1.5} />}
        <Label at={[2.5, 6]} color={C.f} attach="c">5 s</Label>
        <Label at={[(5 + T_TOP) / 2, 14]} color={C.g} attach="c">1.378 s</Label>
        <Label at={[(T_TOP + T_END) / 2, 6]} color={C.violet} attach="c">4.406 s</Label>
        {oneEq && t > 5 && <Line.Segment point1={[t, H5]} point2={[t, height(t)]} color={s >= 0 ? C.good : C.bad} weight={3} />}
        <Point x={t} y={height(t)} color={colour} />
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
          max={T_END}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Fly the whole flight" />
          <Toggle label="One equation after t = 5" checked={oneEq} onChange={setOneEq} />
        </Buttons>
        <Readouts>
          <Readout color={colour} tex={`h \\approx ${Math.max(0, height(t)).toFixed(2)}\\text{ m}`} />
          <Readout color={colour} tex={`v \\approx ${velocity(t).toFixed(2)}\\text{ m s}^{-1}`} />
          {oneEq && t > 5 && <Readout color={s >= 0 ? C.good : C.bad} tex={`T \\approx ${T.toFixed(2)},\\ s \\approx ${s.toFixed(2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
