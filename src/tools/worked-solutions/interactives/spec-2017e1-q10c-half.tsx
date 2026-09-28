// 2017 Specialist Exam 1 Q10c — a check on the integral without part (a). The graph of
// y = arccos(x/2) has half-turn symmetry about (0, π/2): arccos(−x/2) = π − arccos(x/2). Spin the
// orange piece under the curve on [0, 2] half a turn about that point and it exactly fills the gap
// above the curve on [−2, 0], so ∫₋₂² arccos(x/2) dx is the left half of the 4 × π box: 2π.
// Hence V = π × 2π = 2π², and the solid is exactly half the cylinder of radius √π.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  usePlayer,
} from './kit'

const g = (x: number) => Math.acos(Math.max(-1, Math.min(1, x / 2)))
const MID: [number, number] = [0, Math.PI / 2]

// the region under the curve for 0 ≤ x ≤ 2
const RIGHT: [number, number][] = (() => {
  const pts: [number, number][] = [[0, 0]]
  for (let i = 0; i <= 60; i++) {
    const x = (2 * i) / 60
    pts.push([x, g(x)])
  }
  pts.push([2, 0])
  return pts
})()

function turn(pts: [number, number][], deg: number): [number, number][] {
  const t = (deg * Math.PI) / 180
  const c = Math.cos(t)
  const s = Math.sin(t)
  return pts.map(([x, y]) => {
    const dx = x - MID[0]
    const dy = y - MID[1]
    return [MID[0] + c * dx - s * dy, MID[1] + s * dx + c * dy]
  })
}

export default function HalfTurn() {
  const [deg, setDeg] = useState(0)
  const player = usePlayer(setDeg, { min: 0, max: 180, seconds: 4 })

  const done = deg > 179.5
  const moving = turn(RIGHT, deg)

  let notice
  if (deg < 0.5) {
    notice = (
      <Notice>
        The shaded area is <M>{'\\int_{-2}^{2}\\arccos\\left(\\tfrac{x}{2}\\right)dx'}</M>, the integral inside{' '}
        <M>V</M>. The grey box is <M>4</M> wide and <M>\pi</M> tall. Press play to spin the orange right-hand piece
        half a turn about the violet point <M>{'\\left(0, \\tfrac{\\pi}{2}\\right)'}</M> and watch where it lands.
      </Notice>
    )
  } else if (!done) {
    notice = (
      <Notice>
        Keep turning. The piece is rigid, so its area does not change. It is heading for the empty space above the
        curve on the left.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        It fits exactly, because <M>{'\\arccos\\left(-\\tfrac{x}{2}\\right) = \\pi - \\arccos\\left(\\tfrac{x}{2}\\right)'}</M>{' '}
        (e.g. <M>{'\\tfrac{2\\pi}{3} = \\pi - \\tfrac{\\pi}{3}'}</M> at <M>x = 1</M>). So the area is the left
        half of the box, <M>{'2 \\times \\pi = 2\\pi'}</M>, and <M>{'V = \\pi \\times 2\\pi = 2\\pi^2'}</M>. That
        agrees with the part (a) method.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.4, 2.4]} y={[-0.3, 3.5]} xStep={1} yStep={1} height={340} equalScale yLabels={false}>
        <Polygon points={[[-2, 0], [2, 0], [2, Math.PI], [-2, Math.PI]]} color={C.guide} fillOpacity={0} weight={1.5} />
        <Region top={g} bottom={() => 0} from={-2} to={0} color={C.f} opacity={0.25} />
        {deg > 0.5 && <Polygon points={RIGHT} color={C.g} fillOpacity={0} weight={1} />}
        <Polygon points={moving} color={C.g} fillOpacity={0.4} weight={2} />
        <Plot.OfX y={g} domain={[-2, 2]} color={C.f} weight={3} />
        <Point x={MID[0]} y={MID[1]} color={C.violet} />
        <Label at={MID} attach="ne" color={C.violet} size={12}>(0, π/2)</Label>
        <Label at={[0, Math.PI]} attach="ne" color={C.guide}>π</Label>
        <Label at={[1.2, g(1.2)]} attach="ne" color={C.f}>y = arccos(x/2)</Label>
      </Plane>
      <Controls>
        <Slider
          label="\text{turn}"
          value={deg}
          onChange={v => {
            player.stop()
            setDeg(v)
          }}
          min={0}
          max={180}
          step={1}
          format={v => `${Math.round(v)}°`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(deg)} label="Spin the right half" />
        </Buttons>
        <Readouts>
          <Readout tex="\text{box} = 4 \times \pi = 4\pi" />
          {done && <Readout color={C.good} tex="\int_{-2}^{2}\arccos\left(\tfrac{x}{2}\right)dx = \tfrac12(4\pi) = 2\pi" />}
          {done && <Readout color={C.good} tex="V = \pi \times 2\pi = 2\pi^2\ \checkmark" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
