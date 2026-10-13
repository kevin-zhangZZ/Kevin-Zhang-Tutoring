// 2015 Specialist Exam 2 Q4a.ii — the angle of elevation from O needs the helicopter's horizontal
// distance from O, and at altitude 60 m (t = 150) the helicopter is NOT above its take-off point:
// after 2½ circuits it is over (25, 50), on the far side of the circle. Top: plan view (the circle
// of radius 25 about (50, 50), O, the take-off point and the point below the helicopter). Bottom:
// the vertical plane through O and the helicopter, where the elevation is the angle at O. A toggle
// shows the report's common error — assuming it is above (75, 50), so d = √(75² + 50²) = 90.14 and
// the angle is 33.6°, not 47.0°. Values checked with sympy: d(150) = √3125 = 55.90,
// arctan(60/55.90) = 47.03°, arctan(55.90/60) = 42.97° (the angle with the vertical).

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, num } from './kit'

const pos = (t: number) => {
  const s = (Math.PI * t) / 30
  return [50 + 25 * Math.cos(s), 50 + 25 * Math.sin(s), (2 * t) / 5] as const
}
const DEG = 180 / Math.PI
const D_WRONG = Math.hypot(75, 50)

export default function Elevation() {
  const [t, setT] = useState(150)
  const [wrong, setWrong] = useState(false)

  const [x, y, z] = pos(t)
  const d = Math.hypot(x, y)
  const th = Math.atan2(z, d)
  const thW = Math.atan2(z, D_WRONG)
  const at150 = Math.abs(t - 150) < 0.5
  const R = 14

  return (
    <div>
      <p className="text-[13px] text-gray-600 dark:text-gray-400 mb-1">Plan view (looking down)</p>
      <Plane x={[0, 85]} y={[0, 85]} xStep={25} yStep={25} equalScale height={320} xLabel="E" yLabel="N">
        <Circle center={[50, 50]} radius={25} color={C.guide} fillOpacity={0} strokeStyle="dashed" weight={1.5} />
        {t > 0 && (
          <Plot.Parametric xy={s => [50 + 25 * Math.cos(s), 50 + 25 * Math.sin(s)]} domain={[0, (Math.PI * t) / 30]} color={C.g} weight={2} />
        )}
        <Line.Segment point1={[0, 0]} point2={[x, y]} color={C.f} weight={2.5} />
        {wrong && <Line.Segment point1={[0, 0]} point2={[75, 50]} color={C.bad} style="dashed" weight={2} />}
        <Point x={75} y={50} color={C.ink} />
        <Label at={[75, 50]} attach="n" size={12}>take-off</Label>
        <Point x={x} y={y} color={C.f} />
        <Label at={[x, y]} color={C.f} attach="n" size={13}>helicopter</Label>
        <Label at={[0, 0]} attach="ne" size={14}>O</Label>
      </Plane>
      <p className="text-[13px] text-gray-600 dark:text-gray-400 mt-3 mb-1">Side view: the vertical plane through O and the helicopter</p>
      <Plane x={[0, 100]} y={[0, 70]} xStep={20} yStep={20} equalScale height={300} xLabel="" yLabel="">
        {wrong && (
          <>
            <Polygon points={[[0, 0], [D_WRONG, 0], [D_WRONG, z]]} color={C.bad} fillOpacity={0.08} weight={1.5} strokeStyle="dashed" />
            <Label at={[D_WRONG, z]} color={C.bad} attach="n" size={12}>wrong</Label>
          </>
        )}
        <Polygon points={[[0, 0], [d, 0], [d, z]]} color={C.f} fillOpacity={0.15} weight={2} />
        <Plot.Parametric xy={s => [R * Math.cos(s), R * Math.sin(s)]} domain={[0, th]} color={C.good} weight={2.5} />
        <Label at={[R * Math.cos(th / 2), R * Math.sin(th / 2)]} color={C.good} attach="e" size={13}>{`${num(th * DEG, 1)}°`}</Label>
        <Label at={[d * 0.72, 0]} color={C.f} attach="n" size={12}>{`d = ${num(d, 2)}`}</Label>
        <Label at={[d, z / 2]} color={C.f} attach="e" size={12}>{`${num(z, 1)} m`}</Label>
        <Label at={[0, 0]} attach="nw" size={14}>O</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={150} step={1} format={v => `${v} s`} />
        <Toggle label="Assume it is above take-off" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={`\\underset{\\sim}{r}(${t}) = ${num(x, 2)}\\underset{\\sim}{i}+${num(y, 2)}\\underset{\\sim}{j}+${num(z, 2)}\\underset{\\sim}{k}`} />
          <Readout color={C.f} tex={`d = \\sqrt{${num(x, 2)}^2+${num(y, 2)}^2} = ${num(d, 2)}`} />
          <Readout color={C.good} tex={`\\tan^{-1}\\!\\left(\\tfrac{${num(z, 1)}}{${num(d, 2)}}\\right) = ${num(th * DEG, 1)}^\\circ`} />
          {wrong && <Readout color={C.bad} tex={`\\tan^{-1}\\!\\left(\\tfrac{${num(z, 1)}}{${num(D_WRONG, 2)}}\\right) = ${num(thW * DEG, 1)}^\\circ`} />}
        </Readouts>
        {wrong ? (
          <Notice tone="warn">
            <b>The red triangle is the report&apos;s common error.</b> Climbing straight up from take-off would put the
            helicopter <M>{'\\sqrt{75^2+50^2}\\approx 90.14'}</M> m from <M>O</M> horizontally, giving{' '}
            <M>{'33.6^\\circ'}</M>. But it circles as it climbs: slide <M>t</M> from 0 to 150 and watch the orange path go
            round two and a half times, ending over <M>(25, 50)</M>, much closer to <M>O</M>.
          </Notice>
        ) : at150 ? (
          <Notice tone="good">
            <b>At <M>t = 150</M> the altitude is 60 m and the elevation is <M>{'47^\\circ'}</M>.</b> It is the angle at{' '}
            <M>O</M> between the ground line (length <M>d</M>) and the line up to the helicopter. The angle at the top,{' '}
            <M>{'43^\\circ'}</M>, is the angle with the vertical. Now turn on the toggle.
          </Notice>
        ) : (
          <Notice>
            The elevation from <M>O</M> lives in the side view: ground distance <M>d</M> across, altitude{' '}
            <M>{'\\tfrac{2t}{5}'}</M> up. Both change as <M>t</M> changes. Slide to <M>t = 150</M>, where the altitude
            is 60 m.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
