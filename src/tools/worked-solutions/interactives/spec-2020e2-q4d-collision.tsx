// 2020 Specialist Exam 2 Q4d — crossing paths is not the same as colliding. Both the aeroplane
// r_A(t) = (450 − 150 sin(πt/6)) i + (400 − 200 cos(πt/6)) j and the drone
// r_D(t) = 30t i + (−t² + 40t) j run on the same clock t (0 ≤ t ≤ 40). The top graph shows where
// each one is at the chosen t and the gap between them; the lower graph plots both x-coordinates
// against t, which agree only once (t ≈ 12.85), when the heights are 348.9 and 219.4. Jump
// buttons visit the drone's two path crossings (t ≈ 10.53 at (316, 310), when the plane is about 244 m
// away; t = 20 at (600, 400), which the plane reaches at t = 21) and the closest approach
// (about 29 m at t ≈ 20.94).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider,
  usePlayer,
} from './kit'

const W = Math.PI / 6
const xA = (t: number) => 450 - 150 * Math.sin(W * t)
const yA = (t: number) => 400 - 200 * Math.cos(W * t)
const xD = (t: number) => 30 * t
const yD = (t: number) => -t * t + 40 * t
const gap = (t: number) => Math.hypot(xA(t) - xD(t), yA(t) - yD(t))
// A craft's name label is hidden while it sits on a labelled crossing point, so the two don't overlap.
const nearMark = (x: number, y: number) => Math.hypot(x - 315.92, y - 310.33) < 60 || Math.hypot(x - 600, y - 400) < 60

const T_CROSS1 = 10.5307 // drone at (315.92, 310.33)
const T_XMATCH = 12.8492 // the only time the x-coordinates agree
const T_CROSS2 = 20 // drone at (600, 400)
const T_CLOSE = 20.9366 // closest approach, about 29.2 m

export default function Collision() {
  const [t, setT] = useState(T_CROSS1)
  const player = usePlayer(setT, { min: 0, max: 40, seconds: 20 })
  const go = (v: number) => {
    player.stop()
    setT(v)
  }

  const ax = xA(t)
  const ay = yA(t)
  const dx = xD(t)
  const dy = yD(t)
  const d = gap(t)
  const near = (v: number) => Math.abs(t - v) < 0.06

  let notice
  if (near(T_CROSS1)) {
    notice = (
      <Notice tone="warn">
        The drone is at <M>(316,\ 310)</M>, a point on the plane&apos;s path, yet the plane is at{' '}
        <M>{`(${ax.toFixed(0)},\\ ${ay.toFixed(0)})`}</M>, about {d.toFixed(0)} m away. The plane passes this point at{' '}
        <M>t\approx2.11</M>, <M>14.11</M>, <M>26.11</M> and <M>38.11</M>, never at <M>10.53</M>. A point on both paths only matters if both get there
        at the same <M>t</M>.
      </Notice>
    )
  } else if (near(T_CROSS2)) {
    notice = (
      <Notice tone="warn">
        The drone reaches <M>(600,\ 400)</M> at <M>t=20</M>, but the plane is at{' '}
        <M>{`(${ax.toFixed(0)},\\ ${ay.toFixed(0)})`}</M>, {d.toFixed(0)} m away. It arrives at <M>(600,\ 400)</M> at{' '}
        <M>t=21</M> (and <M>9</M>, <M>33</M>): one second too late.
      </Notice>
    )
  } else if (near(T_XMATCH)) {
    notice = (
      <Notice tone="good">
        <b>Same <M>x</M>, different <M>y</M>.</b> At <M>t\approx12.85</M> both have <M>x\approx385.5</M> (the lower graph&apos;s
        only crossing), but the drone is at <M>y\approx348.9</M> and the plane at <M>y\approx219.4</M>. This is the only
        moment the <M>x</M>-coordinates agree, so the two can never be in the same place at the same time.
      </Notice>
    )
  } else if (near(T_CLOSE)) {
    notice = (
      <Notice tone="good">
        <b>Closest approach:</b> about {d.toFixed(0)} m at <M>t\approx20.94</M>, just after the drone passes{' '}
        <M>(600,\ 400)</M> and just before the plane gets there. A near miss, but the gap never reaches zero.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Both dots run on the same clock <M>t</M>. Contact means the gap is zero: equal <M>x</M> <b>and</b> equal{' '}
        <M>y</M> at one value of <M>t</M>. Use the buttons to visit the moments that look dangerous, or play all 40 seconds.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1250]} y={[0, 650]} xStep={200} yStep={200} height={290}>
        <Plot.Parametric xy={u => [xA(u), yA(u)]} domain={[0, 12]} color={C.f} weight={2} style="dashed" />
        <Plot.Parametric xy={u => [xD(u), yD(u)]} domain={[0, 40]} color={C.g} weight={2} style="dashed" />
        <Point x={315.92} y={310.33} color={C.ink} />
        <Point x={600} y={400} color={C.ink} />
        <Label at={[315.92, 310.33]} attach="w" size={11}>(316, 310)</Label>
        <Label at={[600, 400]} attach="ne" size={11}>(600, 400)</Label>
        <Line.Segment point1={[ax, ay]} point2={[dx, dy]} color={C.bad} weight={1.5} style="dashed" />
        <Point x={ax} y={ay} color={C.f} />
        <Point x={dx} y={dy} color={C.g} />
        {!nearMark(ax, ay) && <Label at={[ax, ay]} attach={ay < dy ? 's' : 'n'} color={C.f} size={12}>plane</Label>}
        {!nearMark(dx, dy) && <Label at={[dx, dy]} attach={ay < dy ? 'n' : 's'} color={C.g} size={12}>drone</Label>}
      </Plane>
      <p className="mt-2 mb-1 text-[12px] font-semibold text-gray-500 dark:text-gray-400">x-coordinates against time</p>
      <Plane
        x={[0, 40]}
        y={[-110, 1250]}
        xStep={5}
        yStep={300}
        height={190}
        xLabel="t"
        yLabel="x"
        yLabels={v => (Math.abs(v - 300) < 1e-6 ? '' : String(v))}
      >
        <Plot.OfX y={xA} domain={[0, 40]} color={C.f} weight={2.5} />
        <Plot.OfX y={xD} domain={[0, 40]} color={C.g} weight={2.5} />
        <Line.Segment point1={[T_XMATCH, 0]} point2={[T_XMATCH, xD(T_XMATCH)]} color={C.ink} style="dashed" weight={1} />
        <Point x={T_XMATCH} y={xD(T_XMATCH)} color={C.ink} />
        <Label at={[T_XMATCH, 90]} attach="e" size={11}>t ≈ 12.85</Label>
        <Line.Segment point1={[t, 0]} point2={[t, 1200]} color={C.guide} style="dashed" weight={1} />
        <Label at={[27, 810]} attach="nw" color={C.g} size={11}>drone: 30t</Label>
        <Label at={[40, 600]} attach="nw" color={C.f} size={11}>plane</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={go} min={0} max={40} step={0.01} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play 40 s" />
          <ActionButton label="Drone at (316, 310)" onClick={() => go(T_CROSS1)} />
          <ActionButton label="Drone at (600, 400)" onClick={() => go(T_CROSS2)} />
          <ActionButton label="Same x" onClick={() => go(T_XMATCH)} />
          <ActionButton label="Closest" onClick={() => go(T_CLOSE)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{plane } (${ax.toFixed(1)},\\ ${ay.toFixed(1)})`} />
          <Readout color={C.g} tex={`\\text{drone } (${dx.toFixed(1)},\\ ${dy.toFixed(1)})`} />
          <Readout color={C.bad} tex={`\\text{gap} = ${d.toFixed(1)}\\text{ m}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
