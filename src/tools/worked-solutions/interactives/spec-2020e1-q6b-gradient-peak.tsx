// 2020 Specialist Exam 1 Q6b — a point of inflection is where the gradient stops rising and starts
// falling. Top: f(x) = arctan(3x − 6) + π with a draggable point P and its tangent. Bottom: the
// gradient function f′(x) = 3/(9x² − 36x + 37) = 3/(9(x − 2)² + 1) from part a, whose height at x
// is the slope of the tangent above it: a hump with its peak f′(2) = 3. Left of x = 2 the hump
// rises (f″ > 0, the tangent sits under the curve, concave up); right of it the hump falls
// (f″ < 0, the tangent sits above the curve, concave down). The live sign table is the working's
// f″(x) = −54(x − 2)/(9x² − 36x + 37)², column by column, and the jump buttons land on the test
// values x = 1 and x = 3, where f″ = ±27/50. Aimed at the report's point that most students showed
// f″(2) = 0 but few justified the change of concavity (average 0.8 out of 2).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Katex, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region, clamp, num } from './kit'

const HALF_PI = Math.PI / 2
const f = (x: number) => Math.atan(3 * x - 6) + Math.PI
const fp = (x: number) => 3 / (9 * (x - 2) ** 2 + 1)
const fpp = (x: number) => (-54 * (x - 2)) / (9 * x * x - 36 * x + 37) ** 2

const X0 = -1
const X1 = 5
const TOP: [number, number] = [0, 5]
// The gradient plane starts a little below 0 so the x tick numbers have room under the axis.
const BOT: [number, number] = [-0.35, 3.4]
const NEAR = 0.04

// Snap a drag to the nearest point of the curve, measuring distance in proportion to each axis's
// range (the plane is not equal-scale), so a mostly vertical drag on the steep middle still works.
const SAMPLES = Array.from({ length: 1201 }, (_, i) => X0 + 0.02 + ((X1 - X0 - 0.04) * i) / 1200)
function nearestOnF([mx, my]: [number, number]): number {
  let best = 2
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = ((x - mx) / (X1 - X0)) ** 2 + ((f(x) - my) / (TOP[1] - TOP[0])) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

type Col = 0 | 1 | 2
const column = (x: number): Col => (Math.abs(x - 2) < NEAR ? 1 : x < 2 ? 0 : 2)

const MINUS = '−'
const HEADS = ['x<2', 'x=2', 'x>2']
const SIGN_ROWS: { tex: string; vals: string[] }[] = [
  { tex: '-54', vals: [MINUS, MINUS, MINUS] },
  { tex: 'x-2', vals: [MINUS, '0', '+'] },
  { tex: '(9x^2-36x+37)^2', vals: ['+', '+', '+'] },
  { tex: "f''(x)", vals: ['+', '0', MINUS] },
]
const GRADIENT = ['rising', 'peak', 'falling']
const SHAPE = ['∪', '∪ → ∩', '∩']

function SignTable({ col }: { col: Col }) {
  const cell = (i: number) =>
    `px-1 py-1 text-center ${i === col ? 'bg-emerald-100 dark:bg-emerald-900/50 font-semibold text-gray-900 dark:text-white' : ''}`
  return (
    <table className="w-full table-fixed border-collapse text-[12px] text-gray-700 dark:text-gray-300">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-700">
          <th className="w-[8.6rem] px-1 py-1 text-left font-normal text-gray-500 dark:text-gray-400">sign of</th>
          {HEADS.map((h, i) => (
            <th key={h} className={`${cell(i)} font-normal`}>
              <Katex tex={h} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SIGN_ROWS.map(r => (
          <tr key={r.tex} className={r.tex === "f''(x)" ? 'border-t border-gray-200 dark:border-gray-700' : ''}>
            <td className="px-1 py-1 whitespace-nowrap">
              <Katex tex={r.tex} />
            </td>
            {r.vals.map((v, i) => (
              <td key={i} className={cell(i)}>
                {v}
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td className="px-1 py-1 text-gray-500 dark:text-gray-400">gradient <Katex tex="f'" /></td>
          {GRADIENT.map((s, i) => (
            <td key={i} className={cell(i)}>
              {s}
            </td>
          ))}
        </tr>
        <tr>
          <td className="px-1 py-1 text-gray-500 dark:text-gray-400">shape</td>
          {SHAPE.map((s, i) => (
            <td key={i} className={cell(i)}>
              {s}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default function GradientPeak() {
  const [x, setX] = useState(1.3)
  const y = f(x)
  const slope = fp(x)
  const col = column(x)

  let notice
  if (col === 1) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 2</M> the gradient peaks: <M>f'(2) = 3</M>, the steepest point on the whole curve.</b> The top of the
        hump is flat, which is why <M>f''(2) = 0</M>. But what makes this a point of inflection is what happens either
        side: the gradient climbs to 3 and then comes back down, so <M>f''</M> goes from + to −. You can see it in the
        tangent too: it cuts through the curve here, under it on the left and over it on the right.
      </Notice>
    )
  } else if (col === 0) {
    notice = (
      <Notice>
        <b>Left of <M>x = 2</M>: concave up.</b> The tangent sits <i>under</i> the curve. Drag P to the right and watch the
        orange dot below climb the hump: the gradient{' '}
        <M>{`f'(x) \\approx ${num(slope)}`}</M> is increasing, and an increasing gradient is exactly what{' '}
        <M>{"f''(x) > 0"}</M> means{Math.abs(x - 1) < 0.005 && <> (here <M>{"f''(1) = \\tfrac{27}{50}"}</M>, the working&apos;s test value)</>}.
        Keep going to <M>x = 2</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>Right of <M>x = 2</M>: concave down.</b> The tangent now sits <i>above</i> the curve. <M>f</M> is still going
        uphill (the orange dot never reaches the axis, because <M>{"f'(x) > 0"}</M> for every <M>x</M>), but the gradient{' '}
        <M>{`\\approx ${num(slope)}`}</M> is <i>falling</i>, so <M>{"f''(x) < 0"}</M>
        {Math.abs(x - 3) < 0.005 && <> (here <M>{"f''(3) = -\\tfrac{27}{50}"}</M>)</>}. Concave up has become concave down
        at <M>x = 2</M>: that change is what the question wants you to show.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
        <span style={{ color: C.f }}>y = f(x)</span> and its <span style={{ color: C.g }}>tangent</span> at P
      </p>
      {/* No y tick numbers: the curve crosses the y-axis at π − arctan 6 ≈ 1.74, right beside a
          π/2 tick on either side of the axis. The asymptotes carry their equations instead. */}
      <Plane x={[X0, X1]} y={TOP} xStep={1} yStep={HALF_PI} height={250} yLabels={false}>
        <Region top={() => TOP[1]} bottom={() => TOP[0]} from={X0 - 0.5} to={2} color={C.good} opacity={0.08} />
        <Region top={() => TOP[1]} bottom={() => TOP[0]} from={2} to={X1 + 0.5} color={C.violet} opacity={0.08} />
        <Label at={[0.2, 3.85]} color={C.good} attach="e" size={12}>concave up</Label>
        <Label at={[X1, 0.55]} color={C.violet} attach="w" size={12}>concave down</Label>
        <Line.Segment point1={[X0, HALF_PI]} point2={[X1, HALF_PI]} color={C.f} style="dashed" weight={1.5} />
        <Line.Segment point1={[X0, 3 * HALF_PI]} point2={[X1, 3 * HALF_PI]} color={C.f} style="dashed" weight={1.5} />
        <Label at={[X0, 3 * HALF_PI]} color={C.f} attach="ne" size={12}>y = 3π/2</Label>
        <Label at={[X1, HALF_PI]} color={C.f} attach="sw" size={12}>y = π/2</Label>
        <Line.Segment point1={[x, TOP[0]]} point2={[x, TOP[1]]} color={C.guide} style="dashed" weight={1} />
        <Plot.OfX y={f} domain={[X0, X1]} color={C.f} weight={3} minSamplingDepth={10} />
        <Line.PointSlope point={[x, y]} slope={slope} color={C.g} weight={2} />
        <Point x={2} y={Math.PI} color={C.ink} />
        <Label at={[2, Math.PI]} attach="se" gap={10} size={12}>(2, π)</Label>
        <Label at={[x, y]} color={C.f} attach="nw">P</Label>
        <MovablePoint point={[x, y]} onMove={p => setX(clamp(nearestOnF(p), X0 + 0.02, X1 - 0.02))} color={C.f} />
      </Plane>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mt-3 mb-1">
        <span style={{ color: C.g }}>y = f′(x)</span>, the gradient of the tangent above
      </p>
      <Plane x={[X0, X1]} y={BOT} xStep={1} yStep={1} height={170}>
        <Region top={() => BOT[1]} bottom={() => 0} from={X0 - 0.5} to={2} color={C.good} opacity={0.08} />
        <Region top={() => BOT[1]} bottom={() => 0} from={2} to={X1 + 0.5} color={C.violet} opacity={0.08} />
        <Line.Segment point1={[x, 0]} point2={[x, BOT[1]]} color={C.guide} style="dashed" weight={1} />
        <Plot.OfX y={fp} domain={[X0, X1]} color={C.g} weight={3} minSamplingDepth={10} />
        <Point x={2} y={3} color={C.good} />
        <Label at={[2, 3]} color={C.good} attach="e" gap={10} size={12}>peak f′(2) = 3</Label>
        <Point x={x} y={slope} color={C.g} />
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <Buttons>
            <ActionButton label="Go to x = 1" onClick={() => setX(1)} />
            <ActionButton label="Go to x = 2" onClick={() => setX(2)} />
            <ActionButton label="Go to x = 3" onClick={() => setX(3)} />
          </Buttons>
          <span className="text-[12px] text-gray-500 dark:text-gray-400">or drag P along the curve.</span>
        </div>
        <Readouts>
          <Readout color={C.f} tex={`x = ${num(x)}`} />
          <Readout color={C.g} tex={`\\text{gradient } f'(x) \\approx ${num(slope)}`} />
          <Readout tex={col === 1 ? "f''(x) = 0" : `f''(x) \\approx ${num(fpp(x))}`} />
        </Readouts>
        <SignTable col={col} />
        {notice}
      </Controls>
    </div>
  )
}
