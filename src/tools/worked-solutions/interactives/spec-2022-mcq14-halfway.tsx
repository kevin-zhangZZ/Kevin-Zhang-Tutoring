// 2022 Specialist Exam 2 MCQ 14 — halfway through the time is not halfway along AB. One case
// that fits the question: a = 5 m/s², so v = 7 + 5t, the trip takes 2 s and AB = 24 m (as = 120).
// The shaded area under the velocity–time graph is the distance covered. At t = 1 s (halfway in
// time) v = 12, the average (option C, 49% chose it), but only 9.5 m of the 24 m is covered. The
// midpoint is reached at t = 1.2 s, where v = 13 (option D). A track under the graph shows the
// particle's position between A and B.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider,
} from './kit'

const A_CC = 5 // acceleration
const T = 2 // time from A to B
const AB = 24 // distance AB
const vel = (t: number) => 7 + A_CC * t
const dist = (t: number) => 7 * t + (A_CC / 2) * t * t
const T_MID = 1.2 // time at the midpoint of AB

export default function Halfway() {
  const [t, setT] = useState(1)

  const v = vel(t)
  const x = dist(t)
  const atHalfTime = Math.abs(t - 1) < 0.015
  const atMid = Math.abs(t - T_MID) < 0.015
  const col = atMid ? C.good : atHalfTime ? C.bad : C.g

  let notice
  if (atMid) {
    notice = (
      <Notice tone="good">
        <b>The shaded area is now 12 m, half of AB</b>, so this is the midpoint, and <M>v = 13</M> (option D). It took
        60% of the time to cover the first half of the distance, so the velocity has had longer to grow and is past 12.
        Check: <M>{'v^2=\\tfrac12\\left(7^2+17^2\\right)=169.'}</M>
      </Notice>
    )
  } else if (atHalfTime) {
    notice = (
      <Notice tone="warn">
        <b>Halfway through the time, <M>v = 12</M></b>, the average of 7 and 17 (option C). But the shaded area, the
        distance covered, is only 9.5 m of the 24 m. The particle was slow early on, so it is not at the midpoint yet.
        Drag <M>t</M> on until the shaded area is half of 24.
      </Notice>
    )
  } else if (t < 1) {
    notice = (
      <Notice>
        The shaded area under the graph is the distance covered so far. Early on the particle is slow, so the area grows
        slowly. Press &ldquo;Halfway in time&rdquo; and compare the area with half of 24 m.
      </Notice>
    )
  } else if (t < T_MID) {
    notice = (
      <Notice>
        More than half the time has gone and <M>v</M> is already above 12, yet less than 12 m is covered. The particle
        still hasn&apos;t reached the midpoint. Keep going.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        More than 12 m is covered now, so the particle is past the midpoint. Drag back to where the shaded area is
        exactly half of AB, or press &ldquo;Halfway along AB&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12.5px] text-gray-600 dark:text-gray-400 mb-2">
        One case that fits: <M>{'a=5\\ \\mathrm{ms^{-2}}'}</M>, so the trip takes 2 s and <M>AB = 24</M> m. Any other{' '}
        <M>a</M> with <M>as = 120</M> only stretches the picture.
      </p>
      <Plane x={[0, 2.2]} y={[0, 19]} xStep={0.5} yStep={2} height={300} xLabel="t" yLabel="v" xLabels={n => String(n)} yLabels={n => (n > 18 ? '' : String(n))}>
        <Region top={vel} bottom={() => 0} from={0} to={t} color={col} opacity={0.3} />
        <Region top={vel} bottom={() => 0} from={t} to={T} color={C.guide} opacity={0.12} />
        {/* starts clear of the y-axis so it doesn't strike through the "12" tick number */}
        <Line.Segment point1={[0.2, 12]} point2={[T, 12]} color={C.bad} style="dashed" weight={1.5} />
        <Label at={[1.7, 12]} attach="s" color={C.bad} size={12}>
          average 12
        </Label>
        <Plot.OfX y={vel} domain={[0, T]} color={C.f} weight={3} />
        <Line.Segment point1={[T, 0]} point2={[T, 17]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[1.55, vel(1.55)]} attach="nw" color={C.f}>
          v = 7 + 5t
        </Label>
        <Line.Segment point1={[t, 0]} point2={[t, v]} color={col} weight={2} />
        <Point x={t} y={v} color={col} />
        <Label at={[t, v]} attach={t < 0.4 ? 'se' : 'nw'} color={col}>
          {`v = ${v.toFixed(2)}`}
        </Label>
        {t > 0.35 && (
          <Label at={[t / 2, 3.2]} attach="c" color={C.ink} size={12}>
            {`${x.toFixed(2)} m`}
          </Label>
        )}
      </Plane>

      {/* where the particle is between A and B */}
      <div className="relative h-11 mx-3 mt-3" aria-hidden>
        <div className="absolute left-0 right-0 top-3 h-1 rounded bg-gray-300 dark:bg-gray-600" />
        {[
          { p: 0, s: 'A' },
          { p: 50, s: 'M' },
          { p: 100, s: 'B' },
        ].map(m => (
          <div key={m.s} className="absolute top-1.5" style={{ left: `${m.p}%`, transform: 'translateX(-50%)' }}>
            <div className="w-0.5 h-4 mx-auto" style={{ background: m.s === 'M' ? C.good : C.guide }} />
            <div className="text-[12px] font-semibold text-center text-gray-700 dark:text-gray-200">{m.s}</div>
          </div>
        ))}
        <div
          className="absolute top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900"
          style={{ left: `${(100 * x) / AB}%`, transform: 'translateX(-50%)', background: col }}
        />
      </div>

      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={T} step={0.01} format={n => `${n.toFixed(2)} s`} />
        <Buttons>
          <ActionButton label="Halfway in time" onClick={() => setT(1)} />
          <ActionButton label="Halfway along AB" onClick={() => setT(T_MID)} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{time: } ${Math.round((100 * t) / T)}\\%\\text{ of the trip}`} />
          <Readout color={col} tex={`\\text{covered: } ${x.toFixed(2)}\\text{ of } 24\\text{ m}`} />
          <Readout color={col} tex={`v = ${v.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
