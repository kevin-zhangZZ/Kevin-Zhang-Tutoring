// 2017 Specialist Exam 1 Q6 — building the largest set on which f′ is defined, one condition at a
// time, with a number line underneath that shrinks as each condition bites. Step 1: arcsin(x) only
// exists for −1 ≤ x ≤ 1. Step 2: f(x) = 1/arcsin(x) also needs arcsin(x) ≠ 0, which removes x = 0
// (a vertical asymptote) and leaves the domain of f, [−1, 0) ∪ (0, 1] — the report's common wrong
// answer [−1, 1] \ {0}. Step 3 zooms in (equal scale) on the endpoint (1, 2/π): f is defined there,
// but the tangent turns vertical as x → 1 because √(1 − x²) → 0 in the denominator of f′, so ±1
// are not in the domain of f′. Final set (−1, 0) ∪ (0, 1).

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, StepNav, useSteps,
} from './kit'

const g = (x: number) => Math.asin(x)
const f = (x: number) => 1 / Math.asin(x)
const fp = (x: number) => -1 / (Math.asin(x) ** 2 * Math.sqrt(1 - x * x))
const fmt = (v: number, dp = 2) => {
  const s = v.toFixed(dp)
  return Number(s) === 0 ? (0).toFixed(dp) : s
}

// f leaves the [-4, 4] plane where |arcsin(x)| = 1/4.6.
const X_IN = Math.sin(1 / 4.6)

// ---------------------------------------------------------------------------------------------
// Number line: one row per condition so far, each row the set that survives it.
// ---------------------------------------------------------------------------------------------

type Piece = { a: number; b: number; aOpen: boolean; bOpen: boolean }
const ROWS: { name: string; color: string; pieces: Piece[] }[] = [
  { name: 'arcsin', color: C.g, pieces: [{ a: -1, b: 1, aOpen: false, bOpen: false }] },
  {
    name: 'f',
    color: C.f,
    pieces: [
      { a: -1, b: 0, aOpen: false, bOpen: true },
      { a: 0, b: 1, aOpen: true, bOpen: false },
    ],
  },
  {
    name: 'f′',
    color: C.good,
    pieces: [
      { a: -1, b: 0, aOpen: true, bOpen: true },
      { a: 0, b: 1, aOpen: true, bOpen: true },
    ],
  },
]
const SETS = ['[-1,\\,1]', '[-1,\\,0)\\cup(0,\\,1]', '(-1,\\,0)\\cup(0,\\,1)']
const SET_NAMES = ['\\text{arcsin needs}\\ x \\in', '\\text{domain of } f', "\\text{domain of } f'"]

const NX0 = 62
const NX1 = 330
const X_LO = -1.4
const X_HI = 1.4
const sx = (v: number) => NX0 + ((v - X_LO) / (X_HI - X_LO)) * (NX1 - NX0)
const ROW_H = 24

function NumberLines({ upTo, marker }: { upTo: number; marker?: number }) {
  const rows = ROWS.slice(0, upTo + 1)
  const h = rows.length * ROW_H + 22
  return (
    <svg
      viewBox={`0 0 340 ${h}`}
      className="w-full max-w-[420px] text-gray-600 dark:text-gray-300"
      role="img"
      aria-label="Number lines showing the allowed x-values after each condition"
    >
      {[-1, 0, 1].map(t => (
        <g key={t}>
          <line x1={sx(t)} x2={sx(t)} y1={6} y2={h - 16} stroke="currentColor" strokeOpacity={0.18} strokeDasharray="3 3" />
          <text x={sx(t)} y={h - 3} textAnchor="middle" fontSize={12} fill="currentColor">
            {t === -1 ? '−1' : t}
          </text>
        </g>
      ))}
      {marker !== undefined && (
        <line x1={sx(marker)} x2={sx(marker)} y1={4} y2={h - 16} stroke={C.violet} strokeWidth={2} />
      )}
      {rows.map((r, i) => {
        const y = 14 + i * ROW_H
        return (
          <g key={r.name}>
            <text x={NX0 - 10} y={y + 4} textAnchor="end" fontSize={12.5} fontStyle={r.name === 'arcsin' ? 'normal' : 'italic'} fontWeight={600} fill={r.color}>
              {r.name}
            </text>
            <line x1={NX0} x2={NX1} y1={y} y2={y} stroke="currentColor" strokeOpacity={0.35} strokeWidth={1} />
            {r.pieces.map((p, j) => (
              <line key={j} x1={sx(p.a)} x2={sx(p.b)} y1={y} y2={y} stroke={r.color} strokeWidth={5} strokeLinecap="butt" />
            ))}
            {r.pieces.flatMap((p, j) => [
              { v: p.a, open: p.aOpen, k: `${j}a` },
              { v: p.b, open: p.bOpen, k: `${j}b` },
            ]).map(e => (
              <circle
                key={e.k}
                cx={sx(e.v)}
                cy={y}
                r={4.5}
                stroke={r.color}
                strokeWidth={2}
                className={e.open ? 'fill-white dark:fill-gray-900' : undefined}
                fill={e.open ? undefined : r.color}
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}

// ---------------------------------------------------------------------------------------------
// Step 3's zoomed view: an equal-scale window on the endpoint (1, 2/π), so gradients look true.
// ---------------------------------------------------------------------------------------------

const Z_X: [number, number] = [0.75, 1.15]
const Z_Y: [number, number] = [0.5, 1.02]
const TAN_HALF = 0.09

function tangentEnds(x0: number): [[number, number], [number, number]] {
  const y0 = f(x0)
  if (x0 >= 1) return [[1, y0 - TAN_HALF], [1, y0 + TAN_HALF]]
  const m = fp(x0)
  const dx = TAN_HALF / Math.sqrt(1 + m * m)
  return [
    [x0 - dx, y0 - m * dx],
    [x0 + dx, y0 + m * dx],
  ]
}

export default function DomainOfDerivative() {
  const s = useSteps(3)
  const [x0, setX0] = useState(0.9)

  const atEnd = x0 >= 1 - 1e-9
  const [t1, t2] = tangentEnds(x0)

  let notice
  if (s.step === 0) {
    notice = (
      <Notice>
        Start from the inside: <M>{'\\arcsin'}</M> undoes <M>{'\\sin'}</M>, so its inputs are values of sine, only{' '}
        <M>-1</M> to <M>1</M>. In the grey regions there is no <M>{'\\arcsin(x)'}</M>, so no <M>f(x)</M> and certainly no{' '}
        <M>{"f'(x)"}</M>. That already rules out <M>R</M>, <M>{'R\\setminus\\{-1,0,1\\}'}</M> and{' '}
        <M>{'(-\\infty,0)\\cup(0,\\infty)'}</M>, all common errors in the report. Press Next.
      </Notice>
    )
  } else if (s.step === 1) {
    notice = (
      <Notice>
        <M>{'\\arcsin(0) = 0'}</M>, and we can&apos;t divide by <M>0</M>, so <M>x = 0</M> goes: <M>f</M> has a vertical
        asymptote there (red). What&apos;s left, <M>{'[-1,0)\\cup(0,1]'}</M>, is where <M>f</M> exists. Note the closed
        dots: <M>{'f(1) = \\tfrac{2}{\\pi}'}</M> is a real point. But the question asks where <M>{"f'"}</M> exists. Press
        Next to zoom in on <M>x = 1</M>.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="warn">
        <b>At <M>x = 1</M> the point exists</b>, <M>{'f(1) = \\tfrac{2}{\\pi}'}</M>, <b>but the tangent is vertical</b>,
        and a vertical line has no gradient. In the formula, <M>{"f'(1)"}</M> would need{' '}
        <M>{'\\sqrt{1-1^2} = 0'}</M> on the bottom. So <M>1</M> is in the domain of <M>f</M> but not of{' '}
        <M>{"f'"}</M>; by symmetry (<M>f</M> is odd) the same happens at <M>x = -1</M>.
      </Notice>
    )
  } else if (x0 > 0.97) {
    notice = (
      <Notice>
        Nearly vertical: <M>{`f'(${fmt(x0, 3)}) \\approx ${fmt(fp(x0), 1)}`}</M>, and it keeps getting steeper. The
        factor <M>{'\\sqrt{1-x^2}'}</M> on the bottom of <M>{"f'(x)"}</M> is heading to <M>0</M>. Push the slider all
        the way to <M>1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Zoomed in on the end of the graph at equal scale, so the tangent&apos;s steepness is true. Here{' '}
        <M>{`f'(${fmt(x0)}) \\approx ${fmt(fp(x0))}`}</M>. Drag <M>x</M> towards <M>1</M> and watch the green tangent
        stand up. (It&apos;s inherited from <M>{'\\arcsin'}</M>, which has a vertical tangent at <M>x = 1</M>.)
      </Notice>
    )
  }

  return (
    <div>
      {s.step < 2 ? (
        <Plane x={[-1.5, 1.5]} y={[-4, 4]} xStep={0.5} yStep={1} height={320}>
          <Polygon points={[[1, -4.6], [1.8, -4.6], [1.8, 4.6], [1, 4.6]]} color={C.guide} fillOpacity={0.18} weight={0} />
          <Polygon points={[[-1, -4.6], [-1.8, -4.6], [-1.8, 4.6], [-1, 4.6]]} color={C.guide} fillOpacity={0.18} weight={0} />
          <Plot.OfX y={g} domain={[-1, 1]} color={C.g} weight={s.step === 0 ? 3 : 2} opacity={s.step === 0 ? 1 : 0.45} />
          {s.step === 0 && (
            <>
              <Point x={1} y={g(1)} color={C.g} />
              <Point x={-1} y={g(-1)} color={C.g} />
              <Label at={[1, Math.PI / 2]} color={C.g} attach="nw">
                arcsin x
              </Label>
            </>
          )}
          {s.step === 1 && (
            <>
              <Line.Segment point1={[0, -4.6]} point2={[0, 4.6]} color={C.bad} style="dashed" weight={2} />
              <Label at={[0, 3.3]} color={C.bad} attach="w">
                x = 0
              </Label>
              <Plot.OfX y={f} domain={[X_IN, 1]} color={C.f} weight={3} />
              <Plot.OfX y={f} domain={[-1, -X_IN]} color={C.f} weight={3} />
              <Point x={1} y={f(1)} color={C.f} />
              <Point x={-1} y={f(-1)} color={C.f} />
              <Label at={[0.45, f(0.45)]} color={C.f} attach="ne">
                y = f(x)
              </Label>
            </>
          )}
        </Plane>
      ) : (
        <Plane x={Z_X} y={Z_Y} xStep={0.05} yStep={0.05} height={340} equalScale labels={false} xLabel="" yLabel="">
          <Line.Segment point1={[1, Z_Y[0] - 0.1]} point2={[1, Z_Y[1] + 0.1]} color={C.guide} style="dashed" weight={1.5} />
          <Label at={[1, 0.53]} color={C.guide} attach="e">
            x = 1
          </Label>
          <Plot.OfX y={f} domain={[0.7, 1]} color={C.f} weight={3} />
          <Label at={[0.86, f(0.86)]} color={C.f} attach="w">
            y = f(x)
          </Label>
          <Line.Segment point1={t1} point2={t2} color={atEnd ? C.bad : C.good} weight={3} />
          <Point x={x0} y={f(x0)} color={C.f} />
          <Label at={[1, 2 / Math.PI]} color={C.ink} attach="e">
            (1, 2/π)
          </Label>
        </Plane>
      )}
      <Controls>
        <StepNav step={s.step} count={3} onBack={s.back} onNext={s.next} />
        {s.step === 2 && <Slider label="x" value={x0} onChange={setX0} min={0.85} max={1} step={0.002} format={v => v.toFixed(3)} />}
        <NumberLines upTo={s.step} marker={s.step === 2 ? x0 : undefined} />
        <Readouts>
          <Readout color={ROWS[s.step].color} tex={`${SET_NAMES[s.step]}\\ ${SETS[s.step]}`} />
          {s.step === 2 &&
            (atEnd ? (
              <Readout color={C.bad} tex={"f'(1) = \\dfrac{-1}{\\left(\\frac{\\pi}{2}\\right)^2\\sqrt{0}}\\ \\text{undefined}"} />
            ) : (
              <Readout color={C.good} tex={`f'(${fmt(x0, 3)}) \\approx ${fmt(fp(x0))}`} />
            ))}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
