// 2022 Specialist Exam 2 MCQ 3 — slide c in y = (x² + 2x + c)/(x² − 4). The horizontal
// asymptote y = 1 never moves. The denominator is zero at x = ±2, but a zero of the denominator
// only gives a vertical asymptote if the numerator is NOT also zero there: at c = −8 the factor
// (x − 2) cancels (a hole at (2, 3/2), only x = −2 left); at c = 0 the factor (x + 2) cancels
// (a hole at (−2, 1/2), only x = 2 left). Every other c gives both. So "two vertical asymptotes"
// (option A, chosen by 41%) is not always true, but "at least one" (option E) is.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, clamp, tick } from './kit'

const XMIN = -6
const XMAX = 6
const EPS = 1e-3
const TOP = 5.5 // y-level for the vertical-asymptote labels

const neg = (v: number) => String(v).replace('-', '−')

function Hole({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

export default function Holes() {
  const [c, setC] = useState(3)
  const f = (x: number) => clamp((x * x + 2 * x + c) / (x * x - 4), -80, 80)

  const at2 = 8 + c // numerator at x = 2
  const atM2 = c // numerator at x = −2
  const va2 = at2 !== 0
  const vaM2 = atM2 !== 0
  const count = (va2 ? 1 : 0) + (vaM2 ? 1 : 0)

  // Put each asymptote's label on the side where the curve does NOT run off the plane:
  // just right of x = 2 the curve heads to sign(8 + c)·∞; just left of x = −2 it heads to sign(c)·∞.
  const y2 = at2 > 0 ? -TOP : TOP
  const yM2 = atM2 > 0 ? -TOP : TOP

  return (
    <div>
      <Plane
        x={[XMIN, XMAX]}
        y={[-6, 6]}
        height={320}
        // Skip the half-cut ticks past ±6, and ±1 on the y-axis: y = 1 is labelled on its asymptote
        // and the middle branch runs over −1.
        xLabels={v => (Math.abs(v) > 6.01 ? '' : tick(v))}
        yLabels={v => (Math.abs(v) > 6.01 || Math.abs(Math.abs(v) - 1) < 1e-6 ? '' : tick(v))}
      >
        <Line.ThroughPoints point1={[0, 1]} point2={[1, 1]} color={C.violet} style="dashed" weight={1.5} />
        <Label at={[XMIN + 0.2, 1]} color={C.violet} attach="ne">y = 1</Label>
        {va2 && (
          <>
            <Line.ThroughPoints point1={[2, 0]} point2={[2, 1]} color={C.bad} style="dashed" weight={1.5} />
            <Label at={[2, y2]} color={C.bad} attach="e">x = 2</Label>
          </>
        )}
        {vaM2 && (
          <>
            <Line.ThroughPoints point1={[-2, 0]} point2={[-2, 1]} color={C.bad} style="dashed" weight={1.5} />
            <Label at={[-2, yM2]} color={C.bad} attach="w">x = −2</Label>
          </>
        )}
        <Plot.OfX y={f} domain={[XMIN, -2 - EPS]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[-2 + EPS, 2 - EPS]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[2 + EPS, XMAX]} color={C.f} weight={3} />
        {!va2 && (
          <>
            <Hole x={2} y={1.5} color={C.good} />
            <Label at={[2, 1.5]} color={C.good} attach="ne">hole</Label>
          </>
        )}
        {!vaM2 && (
          <>
            <Hole x={-2} y={0.5} color={C.good} />
            <Label at={[-2, 0.5]} color={C.good} attach="ne">hole</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={-12} max={6} step={1} format={neg} />
        <Readouts>
          <Readout color={va2 ? C.bad : C.good} tex={`\\text{numerator at } x=2:\\ 8+c = ${at2}`} />
          <Readout color={vaM2 ? C.bad : C.good} tex={`\\text{numerator at } x=-2:\\ c = ${atM2}`} />
          <Readout tex={`\\text{vertical asymptotes: } ${count}`} />
        </Readouts>
        {c === 0 ? (
          <Notice tone="good">
            At <M>c = 0</M> the numerator <M>x^2 + 2x = x(x + 2)</M> is also zero at <M>x = -2</M>, so the factor{' '}
            <M>(x + 2)</M> cancels: <M>{'y = \\frac{x}{x - 2},\\ x \\neq -2'}</M>. The asymptote at <M>x = -2</M> becomes a
            hole at <M>{'\\left(-2, \\tfrac{1}{2}\\right)'}</M>, leaving only <M>x = 2</M>, so options A and C fail. Now
            try <M>c = -8</M>.
          </Notice>
        ) : c === -8 ? (
          <Notice tone="good">
            At <M>c = -8</M> the numerator <M>x^2 + 2x - 8 = (x + 4)(x - 2)</M> is zero at <M>x = 2</M>, so{' '}
            <M>(x - 2)</M> cancels: <M>{'y = \\frac{x + 4}{x + 2},\\ x \\neq 2'}</M>. Now the hole is at{' '}
            <M>{'\\left(2, \\tfrac{3}{2}\\right)'}</M> and only <M>x = -2</M> is left, so option D (only <M>x = 2</M>) fails
            too. <M>c</M> can&apos;t be <M>0</M> and <M>-8</M> at once, so one asymptote always survives, and{' '}
            <M>y = 1</M> never moves: option E.
          </Notice>
        ) : (
          <Notice>
            With <M>{`c = ${c}`}</M> the numerator is <M>{`${at2}`}</M> at <M>x = 2</M> and <M>{`${atM2}`}</M> at{' '}
            <M>x = -2</M>. Neither is zero, so neither factor of the denominator cancels, and there are two vertical
            asymptotes. This is the picture option A assumes for every <M>c</M>. Drag <M>c</M> to <M>0</M>, then to{' '}
            <M>-8</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
