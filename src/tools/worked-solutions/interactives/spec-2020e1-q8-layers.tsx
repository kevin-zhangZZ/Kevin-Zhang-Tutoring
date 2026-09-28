// 2020 Specialist Exam 1 Q8 — what the partial fractions buy you. The area under
// y² = 4(x² + x + 1)/((x + 1)(x² + 1)) on [0, √3] is stacked as three layers, one per term of
// y² = 2/(x + 1) + 2x/(x² + 1) + 2/(x² + 1): blue, violet and orange. Slide x (or sweep) and the three
// heights always add to y², and each layer's area so far is its own standard antiderivative:
// 2log_e(x + 1), log_e(x² + 1) (f′/f) and 2arctan(x). At x = √3 they are 2log_e(1 + √3) ≈ 2.010,
// log_e 4 ≈ 1.386 and 2π/3 ≈ 2.094, total ≈ 5.491, and V = π × 5.491 ≈ 17.25. The two log layers
// combine into 2log_e(2 + 2√3) (that is a); the orange arctan layer is the only source of π (that is
// b = π/3).

import { useState } from 'react'
import {
  C, Controls, Katex, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, num,
  tick, usePlayer,
} from './kit'

const B = Math.sqrt(3)
const L1 = (x: number) => 2 / (x + 1)
const L2 = (x: number) => (2 * x) / (x * x + 1)
const L3 = (x: number) => 2 / (x * x + 1)
const S12 = (x: number) => L1(x) + L2(x)
const Y2 = (x: number) => L1(x) + L2(x) + L3(x)
const F1 = (x: number) => 2 * Math.log(1 + x)
const F2 = (x: number) => Math.log(1 + x * x)
const F3 = (x: number) => 2 * Math.atan(x)
const W = 0.022

const LAYERS = [
  { color: C.f, piece: '\\dfrac{2}{x+1}', anti: '2\\log_e(x+1)', h: L1, F: F1 },
  { color: C.violet, piece: '\\dfrac{2x}{x^2+1}', anti: '\\log_e\\!\\left(x^2+1\\right)', h: L2, F: F2 },
  { color: C.g, piece: '\\dfrac{2}{x^2+1}', anti: '2\\arctan(x)', h: L3, F: F3 },
]

export default function Layers() {
  const [x0, setX0] = useState(0.8)
  const player = usePlayer(setX0, { min: 0, max: B, seconds: 6 })
  const atEnd = x0 > B - 0.004
  const x = atEnd ? B : x0
  const total = F1(x) + F2(x) + F3(x)
  const atStart = x < 0.02

  let notice
  if (atEnd) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = \sqrt3</M>:</b> blue <M>{'2\\log_e(1+\\sqrt3) \\approx 2.010'}</M>, violet{' '}
        <M>{'\\log_e 4 = 2\\log_e 2 \\approx 1.386'}</M>, orange <M>{'2\\arctan\\sqrt3 = \\tfrac{2\\pi}{3} \\approx 2.094'}</M>.
        The two log layers join into one log:{' '}
        <M>{'2\\log_e(1+\\sqrt3) + 2\\log_e 2 = 2\\log_e(2+2\\sqrt3)'}</M>, which is where <M>a</M> comes from. The
        orange layer is the only place a <M>\pi</M> can come from, so it gives <M>{'b = \\tfrac{\\pi}{3}'}</M>. Times{' '}
        <M>\pi</M>: <M>{'V = 2\\pi\\left(\\log_e(2+2\\sqrt3)+\\tfrac{\\pi}{3}\\right) \\approx 17.25'}</M>.
      </Notice>
    )
  } else if (atStart) {
    notice = (
      <Notice>
        At <M>x = 0</M> the violet piece is 0 (its top, <M>2x</M>, is zero) and the blue and orange pieces are 2 each:{' '}
        <M>2 + 0 + 2 = 4 = y^2</M>. Press play to sweep the area out to <M>x = \sqrt3</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`x = ${num(x, 2)}`}</M> the three heights stack up to exactly <M>y^2</M>:{' '}
        <M>{`${num(L1(x), 2)} + ${num(L2(x), 2)} + ${num(L3(x), 2)} = ${num(Y2(x), 2)}`}</M>. That is the partial
        fraction identity, and it holds at every <M>x</M>, so the area under <M>y^2</M> splits into three layers.
        Each layer is a standard integral: blue a log, violet a log too (its top, <M>2x</M>, is the derivative of{' '}
        <M>{'{x^2 + 1}\\text{:}'}</M> the <M>{"\\tfrac{f'}{f}"}</M> form), orange an arctan. Keep going to <M>x = \sqrt3</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 1.8]}
        y={[0, 4.2]}
        xStep={0.5}
        yStep={1}
        height={320}
        yLabel="y²"
        xLabels={v => (Math.abs(v - 1.5) < 1e-9 ? '' : tick(v))}
        yLabels={false}
      >
        {/* y tick numbers LEFT of the axis: the shaded layers start right at x = 0, where the plane's
            own numbers (right of the axis) sat on the curves. */}
        {[1, 2, 3, 4].map(v => (
          <Label key={v} at={[0, v]} attach="w" size={12} bold={false}>
            {v}
          </Label>
        ))}
        {/* Swept so far: strong; still to come: faint. */}
        <Region top={L1} bottom={() => 0} from={0} to={x} color={C.f} opacity={0.35} />
        <Region top={S12} bottom={L1} from={0} to={x} color={C.violet} opacity={0.35} />
        <Region top={Y2} bottom={S12} from={0} to={x} color={C.g} opacity={0.35} />
        <Region top={L1} bottom={() => 0} from={x} to={B} color={C.f} opacity={0.08} />
        <Region top={S12} bottom={L1} from={x} to={B} color={C.violet} opacity={0.08} />
        <Region top={Y2} bottom={S12} from={x} to={B} color={C.g} opacity={0.08} />
        <Plot.OfX y={L1} domain={[0, B]} color={C.f} weight={1.5} />
        <Plot.OfX y={S12} domain={[0, B]} color={C.violet} weight={1.5} />
        <Plot.OfX y={Y2} domain={[0, B]} color={C.ink} weight={3} />
        <Line.Segment point1={[B, 0]} point2={[B, 3.9]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[B, 3.7]} color={C.guide} attach="w" size={12}>x = √3</Label>
        {/* The stacked bar at x: three heights that add up to y². */}
        <Polygon points={[[x - W, 0], [x + W, 0], [x + W, L1(x)], [x - W, L1(x)]]} color={C.f} fillOpacity={0.9} weight={0} />
        <Polygon points={[[x - W, L1(x)], [x + W, L1(x)], [x + W, S12(x)], [x - W, S12(x)]]} color={C.violet} fillOpacity={0.9} weight={0} />
        <Polygon points={[[x - W, S12(x)], [x + W, S12(x)], [x + W, Y2(x)], [x - W, Y2(x)]]} color={C.g} fillOpacity={0.9} weight={0} />
        <Label at={[0.28, L1(0.28) / 2]} color={C.f} attach="c" size={12}>2/(x+1)</Label>
        <Label at={[1.3, L1(1.3) + L2(1.3) / 2]} color={C.violet} attach="c" size={12}>2x/(x²+1)</Label>
        <Label at={[0.3, S12(0.3) + L3(0.3) / 2]} color={C.g} attach="c" size={12}>2/(x²+1)</Label>
        <Label at={[1.05, Y2(1.05)]} attach="ne" size={13}>y²</Label>
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
          max={B}
          step={0.005}
        />
        <div className="flex flex-wrap items-center gap-2">
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep to √3" />
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
                <td className="px-1 py-1 text-right tabular-nums">{num(l.F(x), 3)}</td>
              </tr>
            ))}
            <tr className="border-t border-gray-200 dark:border-gray-700 font-semibold">
              <td className="px-1 py-1">
                <Katex tex="y^2" />
              </td>
              <td className="px-1 py-1 text-right tabular-nums">{num(Y2(x), 2)}</td>
              <td className="px-1 py-1" />
              <td className="px-1 py-1 text-right tabular-nums">{num(total, 3)}</td>
            </tr>
          </tbody>
        </table>
        {atEnd && (
          <Readouts>
            <Readout color={C.good} tex={`V = \\pi \\times ${num(total, 3)} \\approx ${num(Math.PI * total, 2)}`} />
          </Readouts>
        )}
        {notice}
      </Controls>
    </div>
  )
}
