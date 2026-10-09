// 2023 Methods Exam 2 MCQ 14 — a tangent that passes through P(1/3, 0) does not have to touch the
// curve at P. Slide the point of contact x = a along y = x(3x − 1)(x + 3)(x + 1) and watch where
// its tangent crosses the dashed line x = 1/3. The tangent goes through P at a = 1/3 (the tangent
// at P itself) and also at a = (−4 + √7)/3 ≈ −0.451 and a = (−4 − √7)/3 ≈ −2.215, the three
// solutions of 27a⁴ + 54a³ − 18a² − 10a + 3 = 0 in the working. "Show all three" draws the three
// lines together: three different gradients, so three different tangents (option D).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, tick } from './kit'

const f = (x: number) => x * (3 * x - 1) * (x + 3) * (x + 1)
const df = (x: number) => 12 * x ** 3 + 33 * x ** 2 + 10 * x - 3
const PX = 1 / 3
// Where the tangent at x = a meets the line x = 1/3. P is on that tangent exactly when this is 0.
const heightAtP = (a: number) => f(a) + df(a) * (PX - a)

const R_MID = (-4 + Math.sqrt(7)) / 3 // ≈ −0.451
const R_LOW = (-4 - Math.sqrt(7)) / 3 // ≈ −2.215
const ROOTS = [PX, R_MID, R_LOW]
const A_MIN = -3
const A_MAX = 0.7
const SNAP = 0.03
const X_RANGE: [number, number] = [-3.4, 1.2]
const Y_RANGE: [number, number] = [-18, 8]

// Within SNAP of a solution, jump onto it exactly, so the line visibly goes through P.
const snap = (a: number) => ROOTS.find(r => Math.abs(a - r) <= SNAP) ?? a

// Nearest point of the curve to a drag position, measured in screen-like units (the y-range is
// about five times the x-range, so raw distances would let the y-direction dominate).
const SAMPLES = Array.from({ length: 741 }, (_, i) => A_MIN + ((A_MAX - A_MIN) * i) / 740)
function nearestOnCurve([mx, my]: [number, number]): number {
  const sx = X_RANGE[1] - X_RANGE[0]
  const sy = Y_RANGE[1] - Y_RANGE[0]
  let best = SAMPLES[0]
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = ((x - mx) / sx) ** 2 + ((f(x) - my) / sy) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

// The tangent at x = a, drawn through two of its points.
function Tangent({ a, color }: { a: number; color: string }) {
  return <Line.ThroughPoints point1={[a, f(a)]} point2={[a + 1, f(a) + df(a)]} color={color} weight={2.5} />
}

// The curve crosses the x-axis right through the tick numbers −3 and −1, so leave those two out.
const skipIntercepts = (v: number) => (Math.abs(v + 3) < 1e-9 || Math.abs(v + 1) < 1e-9 ? '' : tick(v))

const sign = (v: number) => (v < 0 ? `- ${Math.abs(v).toFixed(2)}` : `+ ${v.toFixed(2)}`)

export default function ThreeTangents() {
  const [raw, setRaw] = useState(PX)
  const [showAll, setShowAll] = useState(false)

  const a = snap(raw)
  const hit = ROOTS.includes(a)
  const m = df(a)
  const c = f(a) - a * m
  const hP = hit ? 0 : heightAtP(a)
  const lineColor = hit ? C.good : C.g
  const crossVisible = !hit && hP > Y_RANGE[0] && hP < Y_RANGE[1]

  let notice
  if (showAll) {
    notice = (
      <Notice tone="good">
        <b>Three points of contact, three different gradients</b>: <M>{'\\tfrac{40}{9}'}</M> at P itself,{' '}
        <M>\approx -1.89</M> at <M>a \approx -0.451</M> and <M>\approx 6.34</M> at <M>a \approx -2.215</M>. So these are
        three different lines through P (option <b>D</b>), and the tangent at P itself is only one of them.
      </Notice>
    )
  } else if (a === PX) {
    notice = (
      <Notice tone="good">
        <b>This is the tangent at P itself</b> (gradient <M>{'\\tfrac{40}{9}'}</M>). Is it the only tangent through
        P? Drag the orange point (or <M>a</M>) to the left and watch where the tangent crosses the dashed line{' '}
        <M>x = \tfrac13</M>.
      </Notice>
    )
  } else if (a === R_MID) {
    notice = (
      <Notice tone="good">
        <b>A second tangent through P.</b> It touches the curve at <M>{'a = \\tfrac{-4+\\sqrt7}{3} \\approx -0.451'}</M>,
        just right of the hump, and runs downhill (gradient <M>\approx -1.89</M>) straight through P. Keep dragging
        left: there is one more.
      </Notice>
    )
  } else if (a === R_LOW) {
    notice = (
      <Notice tone="good">
        <b>A third tangent through P.</b> It touches the curve at <M>{'a = \\tfrac{-4-\\sqrt7}{3} \\approx -2.215'}</M>,
        near the bottom of the deep trough, and climbs steeply (gradient <M>\approx 6.34</M>) up to P. Turn on
        &ldquo;Show all three&rdquo; to compare them.
      </Notice>
    )
  } else {
    const above = hP > 0
    notice = (
      <Notice>
        The tangent at <M>{`x = ${a.toFixed(2)}`}</M> crosses the dashed line <M>x = \tfrac13</M> at height{' '}
        <M>{`y_T\\big(\\tfrac13\\big) \\approx ${hP.toFixed(2)}`}</M>, so it passes <b>{above ? 'above' : 'below'} P</b>.
        P is on the tangent only when <M>{'y_T\\big(\\tfrac13\\big) = 0'}</M>, the equation solved in the working. Keep
        dragging: each time the red crossing point moves past P, the tangent sweeps through P on the way.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={X_RANGE} y={Y_RANGE} xStep={1} yStep={6} height={340} xLabels={skipIntercepts}>
        <Line.Segment point1={[PX, Y_RANGE[0]]} point2={[PX, Y_RANGE[1]]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[PX, -16.5]} color={C.guide} attach="e" size={12}>x = 1/3</Label>
        <Plot.OfX y={f} domain={X_RANGE} color={C.f} weight={3} />
        {showAll ? (
          <>
            <Tangent a={PX} color={C.good} />
            <Tangent a={R_MID} color={C.g} />
            <Tangent a={R_LOW} color={C.violet} />
            <Point x={PX} y={0} color={C.good} />
            <Point x={R_MID} y={f(R_MID)} color={C.g} />
            <Point x={R_LOW} y={f(R_LOW)} color={C.violet} />
          </>
        ) : (
          <>
            <Tangent a={a} color={lineColor} />
            {crossVisible && <Point x={PX} y={hP} color={C.bad} />}
            <Point x={PX} y={0} color={C.ink} />
            <MovablePoint point={[a, f(a)]} onMove={p => setRaw(clamp(nearestOnCurve(p), A_MIN, A_MAX))} color={C.g} />
          </>
        )}
        <Label at={[PX, 0]} attach="se" gap={9}>P</Label>
      </Plane>
      <Controls>
        <Slider
          label="a"
          value={raw}
          onChange={v => {
            setShowAll(false)
            setRaw(v)
          }}
          min={A_MIN}
          max={A_MAX}
          step={0.005}
          format={() => a.toFixed(3)}
        />
        <Buttons>
          <Toggle label="Show all three" checked={showAll} onChange={setShowAll} />
        </Buttons>
        {!showAll && (
          <Readouts>
            <Readout color={lineColor} tex={`y_T \\approx ${m.toFixed(2)}x ${sign(c)}`} />
            <Readout color={hit ? C.good : C.bad} tex={`y_T\\big(\\tfrac13\\big) ${hit ? '= 0' : `\\approx ${hP.toFixed(2)}`}`} />
          </Readouts>
        )}
        {!showAll && (
          <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the orange point along the curve, or use the slider.</p>
        )}
        {notice}
      </Controls>
    </div>
  )
}
