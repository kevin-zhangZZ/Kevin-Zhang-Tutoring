// 2020 Methods Exam 2 MCQ 16 — the triangle OBC under y = 9 − x² is a trade-off. Top: drag C along
// the parabola (or slide m): the base OB = m grows while the height BC = 9 − m² shrinks. Bottom: the
// area A(m) = ½m(9 − m²) plotted against m, a hump that is 0 at both ends of (0, 3) and peaks at
// (√3, 3√3). At the peak the two coordinates are labelled separately: m = √3 says WHERE the maximum
// happens, A = 3√3 ≈ 5.20 is the maximum area itself. Reading the wrong one is option C (17%).
// Every value comes from the question's rule (checked with sympy: A′(m) = −3(m² − 3)/2, A(1) = 4,
// A(2) = 5, A(√3) = 3√3).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout,
  Readouts, Slider, clamp, num, usePlayer,
} from './kit'

const R3 = Math.sqrt(3)
const PEAK = 3 * R3
const para = (x: number) => 9 - x * x
const area = (m: number) => 0.5 * m * (9 - m * m)
const dArea = (m: number) => 0.5 * (9 - 3 * m * m)
const M_MIN = 0.02
const M_MAX = 2.98
const TOP_X: [number, number] = [0, 3.3]
const TOP_Y: [number, number] = [0, 9.6]
const BOT_Y: [number, number] = [0, 6]

/** Land exactly on the peak when the student gets close, so the "at the maximum" message shows. */
const snap = (m: number) => (Math.abs(m - R3) < 0.025 ? R3 : m)

// Snap a drag to the nearest point of the parabola, measuring distance in proportion to each
// axis's range (the plane is not equal-scale), so a mostly vertical drag still moves C.
const SAMPLES = Array.from({ length: 601 }, (_, i) => M_MIN + ((M_MAX - M_MIN) * i) / 600)
function nearestOnParabola([mx, my]: [number, number]): number {
  let best = 1
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = ((x - mx) / 3.3) ** 2 + ((para(x) - my) / 9.6) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

const ticks = (keep: (v: number) => boolean) => (v: number) => (keep(v) ? String(v) : '')

export default function TradeOff() {
  const [m, setM] = useState(1)
  const player = usePlayer(setM, { min: M_MIN, max: M_MAX, seconds: 7 })
  const set = (v: number) => {
    player.stop()
    setM(snap(clamp(v, M_MIN, M_MAX)))
  }

  const h = para(m)
  const A = area(m)
  const slope = dArea(m)
  const atPeak = Math.abs(m - R3) < 1e-9
  const nearLeft = m < 0.2
  const nearRight = m > 2.9
  const areaColor = atPeak ? C.good : C.g

  let notice
  if (atPeak) {
    notice = (
      <Notice tone="good">
        <b>The top of the hump: <M>{"A'(m) = 0"}</M> at <M>{'m = \\sqrt3'}</M>.</b> Base <M>{'\\sqrt3'}</M>, height{' '}
        <M>{'9 - 3 = 6'}</M>, area <M>{'\\tfrac12 \\times \\sqrt3 \\times 6 = 3\\sqrt3 \\approx 5.20'}</M>. Look at the
        green point on the area graph: <M>{'\\sqrt3'}</M> is how far <i>across</i> it is (where the maximum happens) and{' '}
        <M>{'3\\sqrt3'}</M> is how far <i>up</i> it is (how big the area gets). The question asks for the area, so the
        answer is <M>{'3\\sqrt3'}</M> (D), not <M>{'\\sqrt3'}</M> (C).
      </Notice>
    )
  } else if (nearLeft) {
    notice = (
      <Notice>
        With C close to the <M>y</M>-axis the triangle is tall but has almost no base, so its area is close to 0. That&apos;s
        why <M>m</M> can&apos;t be 0: there would be no triangle. Slide <M>m</M> to the right and watch the area climb.
      </Notice>
    )
  } else if (nearRight) {
    notice = (
      <Notice>
        Now the base is long but C has slid almost down to the <M>x</M>-axis: the height <M>{`9 - m^2 \\approx ${num(h)}`}</M> is
        nearly 0, so the area <M>{`\\approx ${num(A)}`}</M> is small again. At <M>m = 3</M> the triangle would be flat, which is why <M>{'m < 3'}</M>.
        Both ends give (almost) no area, so the maximum is somewhere in between.
      </Notice>
    )
  } else if (m < R3) {
    notice = (
      <Notice>
        Moving C to the right makes the base <M>m</M> longer but the height <M>{'9 - m^2'}</M> shorter. Here the longer base
        wins: the area is still <b>rising</b>, and the gradient of the hump is positive,{' '}
        <M>{`A'(m) \\approx ${num(slope)}`}</M>. Keep sliding right (or press play) and watch for the moment the area stops
        growing.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past the peak: the height <M>{'9 - m^2'}</M> is now shrinking faster than the base grows (the parabola gets steeper
        as it comes down), so the area is <b>falling</b>, <M>{`A'(m) \\approx ${num(slope)}`}</M>. The biggest triangle was
        a little to the left. Slide back until <M>{"A'(m) = 0"}</M>.
      </Notice>
    )
  }

  const mLabel = atPeak ? '√3' : num(m)

  return (
    <div>
      <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
        <div>
          <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
            The triangle under <span style={{ color: C.f }}>y = 9 − x²</span>
          </p>
          {/* No tick number at y = 9: the parabola starts right on top of it. */}
          <Plane x={TOP_X} y={TOP_Y} xStep={1} yStep={1} height={250} yLabels={ticks(v => v === 3 || v === 6)}>
            <Polygon points={[[0, 0], [m, 0], [m, h]]} color={areaColor} fillOpacity={0.3} weight={2} />
            <Plot.OfX y={para} domain={[0, 3]} color={C.f} weight={3} />
            {m < 2 ? (
              <Label at={[2.45, para(2.45)]} color={C.f} attach="e" size={12}>y = 9 − x²</Label>
            ) : (
              <Label at={[0.3, para(0.3)]} color={C.f} attach="ne" size={12}>y = 9 − x²</Label>
            )}
            <Point x={0} y={0} color={C.ink} />
            <Label at={[0, 0]} attach="sw" size={12}>O</Label>
            <Point x={m} y={0} color={C.ink} />
            <Label at={[m, 0]} attach="ne" size={12}>B</Label>
            {/* The base and the height, written on the triangle itself. */}
            {m > 0.45 && <Label at={[m / 2, 0]} attach="n" color={areaColor} size={12} gap={5}>m</Label>}
            {h > 1.6 && (
              <Label at={[m, h / 2]} attach={m > 1.25 ? 'w' : 'e'} color={areaColor} size={12}>9 − m²</Label>
            )}
            <Label at={[m, h]} color={C.f} attach="ne" gap={10}>C</Label>
            <MovablePoint point={[m, h]} onMove={p => set(nearestOnParabola(p))} color={C.f} />
          </Plane>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
            Its <span style={{ color: C.g }}>area A(m)</span> for each position of C
          </p>
          <Plane x={TOP_X} y={BOT_Y} xStep={1} yStep={1} height={250} xLabel="m" yLabel="A" yLabels={ticks(v => v % 2 === 0)}>
            <Plot.OfX y={area} domain={[0, 3]} color={C.g} weight={3} />
            <Line.Segment point1={[m, 0]} point2={[m, A]} color={areaColor} style="dashed" weight={1.5} />
            <Line.Segment point1={[0, A]} point2={[m, A]} color={areaColor} style="dashed" weight={1.5} />
            {atPeak && (
              <>
                <Label at={[R3, 0]} color={C.good} attach="ne" size={12}>m = √3</Label>
                <Label at={[0, PEAK]} color={C.good} attach="ne" size={12}>A = 3√3 ≈ 5.20</Label>
              </>
            )}
            <Point x={m} y={A} color={areaColor} />
          </Plane>
        </div>
      </div>
      <Controls>
        <Slider label="m" value={m} onChange={set} min={M_MIN} max={M_MAX} step={0.01} format={() => mLabel} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(m)} label="Slide C from 0 to 3" />
          <ActionButton label="Go to the peak" onClick={() => set(R3)} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{base } m ${atPeak ? '= \\sqrt3' : `\\approx ${num(m)}`}`} />
          <Readout tex={`\\text{height } 9 - m^2 ${atPeak ? '= 6' : `\\approx ${num(h)}`}`} />
          <Readout color={areaColor} tex={`A = \\tfrac12 \\times \\text{base} \\times \\text{height} ${atPeak ? '= 3\\sqrt3' : `\\approx ${num(A)}`}`} />
          <Readout tex={`A'(m) = \\tfrac12(9 - 3m^2) ${atPeak ? '= 0' : `\\approx ${num(slope)}`}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the blue point C along the parabola, or use the slider.</p>
        {notice}
      </Controls>
    </div>
  )
}
