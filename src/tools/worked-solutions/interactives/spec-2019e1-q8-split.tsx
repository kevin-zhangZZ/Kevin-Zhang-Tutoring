// 2019 Specialist Exam 1 Q8 — why the integrand "splits naturally" (the examiner's phrase). The area
// under y² = (1 + 2x)/(1 + x²) on [0, 1] is stacked as two layers, one per term of
// (1 + 2x)/(1 + x²) = 1/(1 + x²) + 2x/(1 + x²): blue underneath, orange on top. Slide x (or sweep) and
// the two heights always add to y² (at x = 0: 1 + 0; at x = ½ they are equal, 0.8 + 0.8; at x = 1:
// 0.5 + 1), and each layer's area so far is its own standard antiderivative: tan⁻¹(x) for blue and
// log_e(1 + x²) for orange (the f′/f form: its top, 2x, is the derivative of its bottom, 1 + x²). At
// x = 1 they are π/4 ≈ 0.7854 and log_e 2 ≈ 0.6931, total ≈ 1.4785, and V = π × 1.4785 ≈ 4.645.

import { useState } from 'react'
import {
  C, Controls, Katex, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, num,
  tick, usePlayer,
} from './kit'

const L1 = (x: number) => 1 / (1 + x * x)
const L2 = (x: number) => (2 * x) / (1 + x * x)
const Y2 = (x: number) => L1(x) + L2(x)
const F1 = (x: number) => Math.atan(x)
const F2 = (x: number) => Math.log(1 + x * x)
// Half-width of the stacked bar at x, in x-units.
const W = 0.014

const LAYERS = [
  { color: C.f, piece: '\\dfrac{1}{1+x^2}', anti: '\\tan^{-1}(x)', h: L1, F: F1 },
  { color: C.g, piece: '\\dfrac{2x}{1+x^2}', anti: '\\log_e\\!\\left(1+x^2\\right)', h: L2, F: F2 },
]

export default function Split() {
  const [x0, setX0] = useState(0.5)
  const player = usePlayer(setX0, { min: 0, max: 1, seconds: 5 })
  const atEnd = x0 > 0.997
  const x = atEnd ? 1 : x0
  // Displayed totals are the sums of the displayed (rounded) parts, so the table and the notice
  // always add up exactly; each is within 0.01 (heights) or 0.0001 (areas) of the true value.
  const r = (v: number, dp: number) => Number(v.toFixed(dp))
  const hSum = r(L1(x), 2) + r(L2(x), 2)
  const total = r(F1(x), 4) + r(F2(x), 4)
  const atStart = x < 0.015
  const half = Math.abs(x - 0.5) < 0.012

  let notice
  if (atEnd) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 1</M>:</b> blue <M>{'\\tan^{-1}(1) = \\tfrac{\\pi}{4} \\approx 0.785'}</M>, orange{' '}
        <M>{'\\log_e(2) - \\log_e(1) = \\log_e 2 \\approx 0.693'}</M>. The area under <M>y^2</M> is their sum, and
        multiplying by <M>\pi</M> gives <M>{'V = \\tfrac{\\pi^2}{4} + \\pi\\log_e 2 \\approx 4.645'}</M>. The{' '}
        <M>{'\\tfrac{\\pi^2}{4}'}</M> comes from the blue layer (an inverse tan gives a <M>\pi</M>, then the formula
        multiplies by another), and the log from the orange one.
      </Notice>
    )
  } else if (atStart) {
    notice = (
      <Notice>
        At <M>x = 0</M> the orange piece is 0 (its top, <M>2x</M>, is zero) and the blue piece is 1, so{' '}
        <M>y^2 = 1 + 0 = 1</M>. Press play to sweep the area out to <M>x = 1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`x = ${num(x, 2)}`}</M> the two heights stack up to exactly <M>y^2</M>:{' '}
        <M>{`${num(L1(x), 2)} + ${num(L2(x), 2)} = ${num(hSum, 2)}`}</M>
        {half ? ' (here the two layers are equal)' : ''}. That is just{' '}
        <M>{'\\tfrac{1+2x}{1+x^2} = \\tfrac{1}{1+x^2} + \\tfrac{2x}{1+x^2}'}</M>, splitting the <b>numerator</b>, so the
        area splits into two layers. Blue is the inverse tan form off the formula sheet. Orange has on top{' '}
        <M>2x</M>, exactly the derivative of the bottom <M>1+x^2</M>, so it is <M>{"\\tfrac{f'}{f}"}</M> and gives a
        log with no substitution. Keep going to <M>x = 1</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-0.1, 1.15]}
        y={[0, 1.85]}
        xStep={0.25}
        yStep={0.5}
        height={300}
        yLabel="y²"
        xLabels={v => (v <= 0 || v > 1 ? '' : tick(v))}
        yLabels={false}
      >
        {/* y tick numbers LEFT of the axis: the shaded layers start right at x = 0, where the plane's
            own numbers (right of the axis) would sit on the curves. */}
        {[0.5, 1, 1.5].map(v => (
          <Label key={v} at={[0, v]} attach="w" size={12} bold={false}>
            {v}
          </Label>
        ))}
        {/* Swept so far: strong; still to come: faint. */}
        <Region top={L1} bottom={() => 0} from={0} to={x} color={C.f} opacity={0.35} />
        <Region top={Y2} bottom={L1} from={0} to={x} color={C.g} opacity={0.35} />
        <Region top={L1} bottom={() => 0} from={x} to={1} color={C.f} opacity={0.08} />
        <Region top={Y2} bottom={L1} from={x} to={1} color={C.g} opacity={0.08} />
        <Plot.OfX y={L1} domain={[0, 1]} color={C.f} weight={1.5} />
        <Plot.OfX y={Y2} domain={[0, 1]} color={C.ink} weight={3} />
        <Line.Segment point1={[1, 0]} point2={[1, 1.75]} color={C.guide} style="dashed" weight={1.5} />
        {/* The stacked bar at x: two heights that add up to y². */}
        <Polygon points={[[x - W, 0], [x + W, 0], [x + W, L1(x)], [x - W, L1(x)]]} color={C.f} fillOpacity={0.9} weight={0} />
        <Polygon points={[[x - W, L1(x)], [x + W, L1(x)], [x + W, Y2(x)], [x - W, Y2(x)]]} color={C.g} fillOpacity={0.9} weight={0} />
        <Label at={[0.25, L1(0.25) / 2]} color={C.f} attach="c" size={12}>1/(1+x²)</Label>
        <Label at={[0.78, L1(0.78) + L2(0.78) / 2]} color={C.g} attach="c" size={12}>2x/(1+x²)</Label>
        <Label at={[0.3, Y2(0.3)]} attach="n" size={13}>y²</Label>
        <Label at={[1, 1.75]} color={C.guide} attach="w" size={12}>x = 1</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={0}
          max={1}
          step={0.005}
        />
        <div className="flex flex-wrap items-center gap-2">
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep to 1" />
        </div>
        <table className="w-full border-collapse text-[12.5px] text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-[11.5px] text-gray-500 dark:text-gray-400">
              <th className="px-1 py-1 text-left font-normal">layer</th>
              <th className="px-1 py-1 text-right font-normal">height at x</th>
              <th className="px-1 py-1 text-left font-normal">antiderivative</th>
              <th className="px-1 py-1 text-right font-normal">area 0 to x</th>
            </tr>
          </thead>
          <tbody>
            {LAYERS.map(l => (
              <tr key={l.anti}>
                <td className="px-1 py-1">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-sm flex-none" style={{ background: l.color }} />
                    <Katex tex={l.piece} />
                  </span>
                </td>
                <td className="px-1 py-1 text-right tabular-nums">{num(l.h(x), 2)}</td>
                <td className="px-1 py-1">
                  <Katex tex={l.anti} />
                </td>
                <td className="px-1 py-1 text-right tabular-nums">{num(l.F(x), 4)}</td>
              </tr>
            ))}
            <tr className="border-t border-gray-200 dark:border-gray-700 font-semibold">
              <td className="px-1 py-1">
                <Katex tex="y^2" />
              </td>
              <td className="px-1 py-1 text-right tabular-nums">{num(hSum, 2)}</td>
              <td className="px-1 py-1" />
              <td className="px-1 py-1 text-right tabular-nums">{num(total, 4)}</td>
            </tr>
          </tbody>
        </table>
        {atEnd && (
          <Readouts>
            <Readout color={C.good} tex={`V = \\pi \\times ${num(total, 4)} \\approx ${num(Math.PI * total, 3)}`} />
          </Readouts>
        )}
        {notice}
      </Controls>
    </div>
  )
}
