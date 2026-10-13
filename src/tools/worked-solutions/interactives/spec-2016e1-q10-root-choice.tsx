// 2016 Specialist Exam 1 Q10 — completing the square gives y = 2 ± √R(x), and BOTH roots solve the
// differential equation. Slide the starting value y(1) = y₀: the pair of curves only depends on
// (y₀ − 2)², so y₀ = 0 and y₀ = 4 give the very same pair — the initial point alone decides the sign.
// Points below the dashed line y = 2 (where 1/(2 − y) is undefined, so no solution can cross it)
// take the minus root; points above take the plus root. In general
// (y − 2)² = (y₀ − 2)² + π/2 − 2 arcsin(x/√2); for y₀ = 0 this is 4 + π/2 − 2 arcsin(x/√2).
// Its smallest value (at x → √2) is 4 − π/2 ≈ 2.43, so the branches stay at least
// 2√(4 − π/2) ≈ 3.12 apart. Near y₀ = 2 (|y₀ − 2| < √(π/2) ≈ 1.25) the radicand turns negative
// before x = √2, e.g. y₀ = 1 or 3 stops at x = √2 sin(1/2 + π/4) ≈ 1.357. Values checked with sympy.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const R2 = Math.SQRT2
const radicand = (x: number, y0: number) => (y0 - 2) ** 2 + Math.PI / 2 - 2 * Math.asin(x / R2)

export default function RootChoice() {
  const [y0, setY0] = useState(0)
  const [both, setBoth] = useState(true)

  const onLine = Math.abs(y0 - 2) < 1e-9
  const below = y0 < 2
  const sign = below ? -1 : 1
  // Where the radicand reaches 0 (if it does before x = √2).
  const half = ((y0 - 2) ** 2 + Math.PI / 2) / 2
  const xEnd = half < Math.PI / 2 ? R2 * Math.sin(half) : R2
  const dom: [number, number] = [-R2 + 1e-4, xEnd - 1e-4]
  const chosen = (x: number) => 2 + sign * Math.sqrt(Math.max(0, radicand(x, y0)))
  const other = (x: number) => 2 - sign * Math.sqrt(Math.max(0, radicand(x, y0)))
  const c = 2 * y0 - (y0 * y0) / 2 - Math.PI / 4
  const mirror = 4 - y0

  let notice
  if (onLine) {
    notice = (
      <Notice tone="warn">
        At <M>y = 2</M> the right-hand side <M>{'\\tfrac{1}{2-y}'}</M> is undefined, so no solution can start (or cross)
        here. Move <M>y_0</M> off the dashed line.
      </Notice>
    )
  } else if (y0 === 0) {
    notice = (
      <Notice>
        <b>The question&apos;s point <M>(1, 0)</M> is below the dashed line <M>y = 2</M></b>, so it lies on the{' '}
        <b>minus</b> root. The faint upper curve also solves the differential equation, but it passes through{' '}
        <M>(1, 4)</M>. Now slide <M>y_0</M> to <M>4</M>: the same two curves appear, but the plus root is chosen.
      </Notice>
    )
  } else if (Math.abs(y0 - 2) ** 2 < Math.PI / 2) {
    notice = (
      <Notice tone="warn">
        Starting this close to <M>y = 2</M>, the radicand reaches <M>0</M> at <M>x \approx {xEnd.toFixed(3)}</M>: the
        curve runs into <M>y = 2</M> with a vertical tangent and the solution stops there. The question&apos;s{' '}
        <M>y_0 = 0</M> never has this problem.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>y_0 = {num(y0)}</M> and <M>y_0 = {num(mirror)}</M> give the <b>same</b> constant <M>c</M> and the same pair of
        curves, because only <M>(y_0 - 2)^2</M> appears. The two branches never meet, so a solution can&apos;t switch
        from one sign to the other: the starting point {below ? 'below' : 'above'} <M>y = 2</M> fixes the{' '}
        <b>{below ? 'minus' : 'plus'}</b> root for every <M>x</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.6, 1.6]} y={[-1.5, 5.5]} xStep={0.5} yStep={1} height={340}>
        <Line.Segment point1={[-1.6, 2]} point2={[1.6, 2]} color={C.guide} style="dashed" weight={2} />
        <Label at={[-1.55, 2]} color={C.guide} attach="ne">y = 2</Label>
        {!onLine && both && <Plot.OfX y={other} domain={dom} color={C.g} weight={2} opacity={0.45} />}
        {!onLine && <Plot.OfX y={chosen} domain={dom} color={C.f} weight={3} />}
        {!onLine && <Point x={1} y={y0} color={C.bad} />}
        {!onLine && (
          <Label at={[1, y0]} color={C.bad} attach={below ? 'nw' : 'sw'}>
            {`(1, ${num(y0)})`}
          </Label>
        )}
        {!onLine && both && (
          <Label at={[-1.2, other(-1.2)]} color={C.g} attach={below ? 'n' : 's'}>
            {below ? '2 + √…' : '2 − √…'}
          </Label>
        )}
        {!onLine && (
          <Label at={[-1.2, chosen(-1.2)]} color={C.f} attach={below ? 's' : 'n'}>
            {below ? '2 − √…' : '2 + √…'}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="y_0" value={y0} onChange={setY0} min={-1} max={5} step={0.25} />
        <Toggle label="Show the other root" checked={both} onChange={setBoth} />
        {!onLine && (
          <Readouts>
            <Readout tex={`c = 2y_0 - \\tfrac{y_0^2}{2} - \\tfrac{\\pi}{4} \\approx ${num(c, 3)}`} />
            <Readout color={C.f} tex={`y = 2 ${below ? '-' : '+'} \\sqrt{(y_0-2)^2 + \\tfrac{\\pi}{2} - 2\\arcsin\\tfrac{x}{\\sqrt2}}`} />
          </Readouts>
        )}
        {notice}
      </Controls>
    </div>
  )
}

function num(v: number, dp = 2): string {
  const s = Number.isInteger(v) ? String(v) : v.toFixed(dp)
  return s.replace('-', '−')
}
