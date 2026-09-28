// 2018 Specialist Exam 1 Q10 — why y(t) = arcsin(t) + t√(1 − t²) has the tidy derivative
// 2√(1 − t²). The expression is exactly twice the area under the quarter circle y = √(1 − x²)
// from x = 0 to x = t: a sector of angle α = arcsin(t) (area ½ arcsin t) plus a right triangle
// (area ½ t√(1 − t²)). Nudging t adds a thin strip of height √(1 − t²), so dy/dt = 2√(1 − t²).
// A toggle drops the arcsin term (the report's error): the triangle alone stops growing at
// t = 1/√2 and then shrinks, so its derivative (1 − 2t²)/√(1 − t²) goes negative.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Slider,
  Toggle, usePlayer,
} from './kit'

const h = (x: number) => Math.sqrt(Math.max(0, 1 - x * x))
const DX = 0.04
const R2 = 1 / Math.SQRT2

export default function AreaUnderQuarterCircle() {
  const [t, setT] = useState(0.6)
  const [noArcsin, setNoArcsin] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 1, seconds: 7 })

  const alpha = Math.asin(t)
  const P: [number, number] = [t, h(t)]
  const sectorPts: [number, number][] = [[0, 0]]
  for (let i = 0; i <= 48; i++) {
    const s = (alpha * i) / 48
    sectorPts.push([Math.sin(s), Math.cos(s)])
  }
  const anglePts: [number, number][] = []
  for (let i = 0; i <= 20; i++) {
    const s = (alpha * i) / 20
    anglePts.push([0.2 * Math.sin(s), 0.2 * Math.cos(s)])
  }
  const sector = alpha / 2
  const tri = (t * h(t)) / 2
  const right = Math.min(1, t + DX)
  const rate = 2 * h(t)
  const triRate = t < 0.9999 ? (1 - 2 * t * t) / h(t) : -Infinity
  const shrinking = t > R2 + 0.005

  let notice
  if (!noArcsin) {
    notice = (
      <Notice>
        <M>{'y(t)=\\arcsin(t)+t\\sqrt{1-t^2}'}</M> is exactly <b>twice the shaded area</b> under the quarter circle from{' '}
        <M>0</M> to <M>t</M>: the violet sector has angle <M>{'\\alpha=\\arcsin(t)'}</M> (because{' '}
        <M>{'\\sin\\alpha=t'}</M>), so area <M>{'\\tfrac12\\arcsin(t)'}</M>, and the orange triangle has area{' '}
        <M>{'\\tfrac12t\\sqrt{1-t^2}'}</M>. Nudge <M>t</M> and the area gains the green strip, of height{' '}
        <M>{'\\sqrt{1-t^2}\\text{,}'}</M> so <M>{'\\tfrac{dy}{dt}=2\\sqrt{1-t^2}'}</M>. Now drop the arcsin term.
      </Notice>
    )
  } else if (!shrinking) {
    notice = (
      <Notice tone="warn">
        Without <M>{'\\arcsin(t)'}</M>, <M>y</M> would be twice the triangle alone. For now the triangle is still growing,
        so its rate <M>{'\\tfrac{1-2t^2}{\\sqrt{1-t^2}}'}</M> is positive. Slide <M>t</M> past{' '}
        <M>{'\\tfrac{1}{\\sqrt2}\\approx0.71'}</M> and watch the triangle flatten out.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Past <M>{'t=\\tfrac{1}{\\sqrt2}'}</M> the triangle gets flatter and its area <b>shrinks</b>, so{' '}
        <M>{'\\tfrac{1-2t^2}{\\sqrt{1-t^2}}'}</M> is negative. The full area never shrinks: the sector gains what the
        triangle loses, plus the new strip. Leave out the arcsin term and{' '}
        <M>{'\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2'}</M> is not a perfect square, so the
        integrand can never become <M>{'at^2+bt+c'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
        Quarter circle <span className="whitespace-nowrap">y = √(1 − x²)</span>, shaded from 0 to t
      </p>
      <Plane x={[0, 1.25]} y={[0, 1.15]} xStep={0.5} yStep={0.5} height={330} equalScale xLabel="" yLabel="y">
        <Label at={[1.2, 0]} attach="n" size={14} italic>
          x
        </Label>
        {!noArcsin && <Polygon points={sectorPts} color={C.violet} fillOpacity={0.28} weight={0} strokeOpacity={0} />}
        {noArcsin && (
          <Polygon points={sectorPts} color={C.guide} fillOpacity={0.06} weight={1.5} strokeStyle="dashed" />
        )}
        <Polygon points={[[0, 0], [t, 0], P]} color={C.g} fillOpacity={0.3} weight={1.5} />
        {!noArcsin && t < 0.999 && (
          <Polygon
            points={[[t, 0], [right, 0], [right, h(t)], [t, h(t)]]}
            color={C.good}
            fillOpacity={0.75}
            weight={1}
          />
        )}
        <Plot.Parametric xy={u => [Math.sin(u), Math.cos(u)]} domain={[0, Math.PI / 2]} color={C.f} weight={3} />
        <Line.Segment point1={[t, 0]} point2={P} color={C.ink} weight={1.5} style="dashed" />
        {alpha > 0.12 && <Plot.Parametric xy={u => [0.2 * Math.sin(u), 0.2 * Math.cos(u)]} domain={[0, alpha]} color={C.violet} weight={2} />}
        {alpha > 0.25 && (
          <Label at={anglePts[10]} attach="n" color={C.violet} size={12} gap={4}>
            α
          </Label>
        )}
        <Point x={P[0]} y={P[1]} color={C.f} />
        <Label at={P} attach={t > 0.75 ? 'w' : 'ne'} color={C.f} size={12}>
          (t, √(1−t²))
        </Label>
        <Label at={[t, 0]} attach="s" color={C.ink} size={12}>
          t
        </Label>
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
          max={1}
          step={0.005}
          format={v => v.toFixed(3)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Sweep t from 0 to 1" />
          <Toggle label="Ignore the arcsin(t) term" checked={noArcsin} onChange={setNoArcsin} />
        </Buttons>
        <Readouts>
          {!noArcsin && <Readout color={C.violet} tex={`\\text{sector}=\\tfrac12\\arcsin(t)=${sector.toFixed(3)}`} />}
          <Readout color={C.g} tex={`\\text{triangle}=\\tfrac12t\\sqrt{1-t^2}=${tri.toFixed(3)}`} />
          {noArcsin ? (
            <Readout
              color={C.bad}
              tex={`\\tfrac{d}{dt}\\left(t\\sqrt{1-t^2}\\right)=${Number.isFinite(triRate) ? triRate.toFixed(3) : '-\\infty'}`}
            />
          ) : (
            <>
              <Readout tex={`y(t)=2\\times${(sector + tri).toFixed(3)}=${(2 * (sector + tri)).toFixed(3)}`} />
              <Readout color={C.good} tex={`\\tfrac{dy}{dt}=2\\sqrt{1-t^2}=${rate.toFixed(3)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
