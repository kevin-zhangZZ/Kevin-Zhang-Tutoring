// 2018 Specialist Exam 2 Q3f — why the level settles at h = 0.64 m, 0.23 m below the rim. The
// depth h(t) is solved numerically from dh/dt = (4 − 5√h)/(25π(4h² + 1)), h(0) = 0. Bars under the
// graph compare the constant inflow 0.04 m³/s with the outflow 0.05√h, which grows with depth;
// they balance at √h = 4/5, so h(t) levels off at 16/25 = 0.64, below the top of the fountain at
// √3/2 ≈ 0.866. The gap √3/2 − 0.64 ≈ 0.23 m is what the question asks for.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, usePlayer } from './kit'

const TOP = Math.sqrt(3) / 2
const EQ = 16 / 25
const rate = (h: number) => (4 - 5 * Math.sqrt(Math.max(h, 0))) / (25 * Math.PI * (4 * h * h + 1))
const T_MAX = 240
const DT = 0.1
const table: number[] = (() => {
  const n = Math.round(T_MAX / DT)
  const out = new Array<number>(n + 1)
  out[0] = 0
  for (let i = 0; i < n; i++) {
    const h = out[i]
    const k1 = rate(h)
    const k2 = rate(h + (DT / 2) * k1)
    const k3 = rate(h + (DT / 2) * k2)
    const k4 = rate(h + DT * k3)
    out[i + 1] = h + (DT / 6) * (k1 + 2 * k2 + 2 * k3 + k4)
  }
  return out
})()
function hAt(t: number): number {
  const u = t / DT
  const i = Math.max(0, Math.min(table.length - 2, Math.floor(u)))
  const f = u - i
  return table[i] * (1 - f) + table[i + 1] * f
}

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-[12.5px] text-gray-700 dark:text-gray-300">
      <span className="w-[62px] shrink-0">{label}</span>
      <div className="flex-1 h-3.5 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className="h-full rounded" style={{ width: `${Math.min(100, (value / 0.05) * 100)}%`, background: color }} />
      </div>
      <span className="w-[76px] shrink-0 text-right tabular-nums">{value.toFixed(4)} m³/s</span>
    </div>
  )
}

export default function Settle() {
  const [t, setT] = useState(12)
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 8 })
  const h = hAt(t)
  const out = 0.05 * Math.sqrt(h)

  let notice
  if (h < 0.35) {
    notice = (
      <Notice>
        Early on the water is shallow, so the outflow <M>{'0.05\\sqrt h'}</M> is small and most of the inflow stays in: the
        depth climbs quickly. But the outflow grows as the water deepens, while the inflow stays at <M>0.04</M>. Press play.
      </Notice>
    )
  } else if (h < 0.62) {
    notice = (
      <Notice>
        The outflow bar is catching up with the inflow bar, so the net gain <M>{'0.04 - 0.05\\sqrt h'}</M> shrinks and the curve
        flattens. The level can only keep rising while the inflow bar is longer.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>The bars are almost equal.</b> They balance when <M>{'0.05\\sqrt h = 0.04'}</M>, i.e. <M>{'h = 0.64'}</M>, where{' '}
        <M>{'\\tfrac{dh}{dt} = 0'}</M>. The level creeps towards <M>0.64</M> m but never reaches the rim at{' '}
        <M>{'\\tfrac{\\sqrt3}{2} \\approx 0.866'}</M> m. The question asks how far <b>from the top</b>, so the answer is the
        gap: <M>{'0.866 - 0.64 \\approx 0.23'}</M> m.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, T_MAX]} y={[0, 1]} xStep={40} yStep={0.2} height={300} xLabel="t" yLabel="h">
        <Line.Segment point1={[0, TOP]} point2={[T_MAX, TOP]} color={C.violet} style="dashed" weight={2} />
        <Label at={[4, TOP]} attach="ne" color={C.violet} size={12}>top of fountain, h = √3/2</Label>
        <Line.Segment point1={[0, EQ]} point2={[T_MAX, EQ]} color={C.good} style="dashed" weight={2} />
        <Label at={[120, EQ]} attach="n" color={C.good} size={12}>h = 0.64: in = out</Label>
        <Plot.OfX y={hAt} domain={[0, T_MAX]} color={C.guide} weight={1.5} opacity={0.5} />
        {t > 0.5 && <Plot.OfX y={hAt} domain={[0, t]} color={C.f} weight={3} />}
        <Point x={t} y={h} color={C.f} />
        <Line.Segment point1={[222, EQ]} point2={[222, TOP]} color={C.g} weight={3} />
        <Label at={[222, (EQ + TOP) / 2]} attach="w" color={C.g} size={12}>0.23 m</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={v => { player.stop(); setT(v) }} min={0} max={T_MAX} step={1} format={v => `${v.toFixed(0)} s`} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Fill the fountain" />
        </Buttons>
        <div className="flex flex-col gap-1.5">
          <Bar label="inflow" value={0.04} color={C.f} />
          <Bar label="outflow" value={out} color={C.g} />
        </div>
        <Readouts>
          <Readout color={C.f} tex={`h \\approx ${h.toFixed(3)}\\text{ m}`} />
          <Readout tex={`\\tfrac{dh}{dt} = \\tfrac{4-5\\sqrt h}{25\\pi(4h^2+1)} \\approx ${rate(h).toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
