// 2014 Methods Exam 2 Q2h — when does the ice drop to the top of the statue? V = 216 − 10t and
// V = πh³ give h(t) = ∛((216 − 10t)/π). Slide t along the curve: h reaches 1 (the statue's top) at
// t = (216 − π)/10 ≈ 21.29, not at t = 21.6, which is where V = 0 and the ice is gone (the report's
// 216/10 error). The zoom toggle shows the year bands: t = 21 is 1 January 2031 and t = 22 is
// 1 January 2032, so t ≈ 21.29 falls during 2031, not 2032 (the report's other common answer).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle } from './kit'

const T_END = 21.6 // V = 0
const T_STATUE = (216 - Math.PI) / 10 // 21.2858…
const hOf = (t: number) => Math.cbrt(Math.max(216 - 10 * t, 0) / Math.PI)

export default function Timeline() {
  const [t, setT] = useState(15)
  const [zoom, setZoom] = useState(false)

  const lo = zoom ? 20 : 0
  const yTop = zoom ? 2 : 4.5
  const tt = Math.max(t, lo)
  const h = hOf(tt)
  const V = Math.max(216 - 10 * tt, 0)
  const year = 2010 + Math.floor(tt)
  const nearStatue = Math.abs(tt - T_STATUE) < 0.03
  const nearEnd = tt > T_END - 0.03

  let notice
  if (nearStatue) {
    notice = (
      <Notice tone="good">
        <b><M>h = 1</M> at <M>t \approx 21.29</M></b>: the ice is level with the statue&apos;s top, with <M>V=\pi</M> m³
        still left. <M>t=21</M> is 1 January 2031 and <M>t=22</M> is 1 January 2032, so this is <b>during 2031</b>.
        {!zoom && <> Turn on the zoom to see the year bands.</>}
      </Notice>
    )
  } else if (nearEnd) {
    notice = (
      <Notice tone="warn">
        <M>{'t = \\tfrac{216}{10} = 21.6'}</M> is where <M>V = 0</M>: the whole cylinder has melted, about 4 months after the statue&apos;s top
        appeared. Forgetting the <M>\pi</M> in <M>216-10t=\pi</M> finds this moment instead of the statue&apos;s.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The volume falls steadily, but the height falls slowly at first and then faster (part f). Slide <M>t</M> to where
        the curve meets the dashed line <M>h = 1</M>, then on to <M>t = 21.6</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={zoom ? [20, 22.2] : [0, 24.5]}
        y={[0, yTop]}
        xStep={zoom ? 1 : 5}
        yStep={1}
        height={300}
        xLabel="t"
        yLabel="h"
        label="Height of the ice against years since 1 January 2010"
      >
        {zoom && (
          <>
            <Region top={() => yTop} bottom={() => 0} from={20} to={21} color={C.guide} opacity={0.12} />
            <Region top={() => yTop} bottom={() => 0} from={21} to={22} color={C.good} opacity={0.15} />
            <Label at={[20.5, yTop - 0.05]} attach="s" color={C.guide} size={12}>2030</Label>
            <Label at={[21.5, yTop - 0.05]} attach="s" color={C.good} size={12}>2031</Label>
          </>
        )}
        <Line.Segment point1={[lo, 1]} point2={[zoom ? 22.2 : 24.5, 1]} color={C.g} style="dashed" weight={2} />
        <Label at={[lo + (zoom ? 0.05 : 0.5), 1]} attach="ne" color={C.g} size={12}>h = 1 (statue top)</Label>
        <Plot.OfX y={hOf} domain={[lo, T_END]} color={C.f} weight={3} />
        <Point x={T_STATUE} y={1} color={C.good} />
        <Point x={T_END} y={0} color={C.bad} />
        <Label at={[T_END, 0.35]} attach="e" color={C.bad} size={12}>V = 0</Label>
        <Line.Segment point1={[tt, 0]} point2={[tt, h]} color={C.violet} weight={2} />
        <Point x={tt} y={h} color={C.violet} />
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={zoom ? 20 : 0} max={T_END} step={0.01} />
        <Buttons>
          <Toggle
            label="Zoom in on 2030–2031"
            checked={zoom}
            onChange={v => {
              setZoom(v)
              if (v && t < 20) setT(20.5)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout tex={`V = 216 - 10t \\approx ${V.toFixed(1)}\\ \\text{m}^3`} />
          <Readout color={C.f} tex={`h = \\sqrt[3]{\\tfrac{V}{\\pi}} \\approx ${h.toFixed(2)}\\ \\text{m}`} />
          <Readout color={C.violet} tex={`t = ${tt.toFixed(2)} \\Rightarrow \\text{during } ${year}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
