// 2018 Specialist Exam 2 MCQ 9 — a separated form is right only if its curves follow the slope
// field. The segments show dy/dx = 2/(sin(x + y) − sin(x − y)), computed straight from the
// question's form, on the cell −π/2 < x < π/2, 0 < y < π (where cos(x) > 0 and sin(y) > 0). The
// green curve is option D, ∫sec(x)dx = ∫sin(y)dy, i.e. cos(y) = cos(y₀) + G(x₀) − G(x) with
// G(x) = log_e(sec x + tan x), through the draggable point: it runs along the segments everywhere.
// Buttons add option C (dy/dx = cos(x)sin(y), the reciprocal, 12%) or option E
// (dy/dx = sin(y)/cos(x), 8%) through the same point: they cut across the field. Readouts show
// sin(x + y) − sin(x − y) and 2cos(x)sin(y) agreeing at the point (the identity that makes it
// separable).

import { useState, type ReactNode } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Readout, Readouts, clamp } from './kit'

const HALF_PI = Math.PI / 2
const slope = (x: number, y: number) => 2 / (Math.sin(x + y) - Math.sin(x - y))
const Gd = (x: number) => Math.asinh(Math.tan(x)) // log_e(sec x + tan x)
const gd = (s: number) => Math.atan(Math.sinh(s)) // inverse of Gd

type Opt = 'none' | 'C' | 'E'

const FIELD: { x: number; y: number; m: number }[] = []
for (let i = -7; i <= 7; i++) {
  for (let j = 1; j <= 15; j++) {
    const x = i * 0.2
    const y = j * 0.2
    FIELD.push({ x, y, m: slope(x, y) })
  }
}
const HL = 0.08

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[12.5px] font-semibold px-3 py-1.5 rounded-full border ${
        active
          ? 'bg-sky-700 border-sky-700 text-white dark:bg-sky-500 dark:border-sky-500 dark:text-gray-950'
          : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500'
      }`}
    >
      {children}
    </button>
  )
}

const tick = (v: number) => {
  const r = v / HALF_PI
  if (Math.abs(r - 1) < 1e-6) return 'π/2'
  if (Math.abs(r + 1) < 1e-6) return '−π/2'
  if (Math.abs(r - 2) < 1e-6) return 'π'
  return ''
}

export default function SlopeField() {
  const [pt, setPt] = useState<[number, number]>([-0.8, 1.0])
  const [opt, setOpt] = useState<Opt>('none')
  const [x0, y0] = pt

  // Option D through (x0, y0): cos(y) = k − G(x), defined while |k − G(x)| ≤ 1.
  const k = Math.cos(y0) + Gd(x0)
  const dLo = Math.max(-HALF_PI + 0.001, gd(k - 1))
  const dHi = Math.min(HALF_PI - 0.001, gd(k + 1))
  const yD = (x: number) => Math.acos(clamp(k - Gd(x), -1, 1))

  // Option C: log_e tan(y/2) = sin(x) + c.  Option E: log_e tan(y/2) = G(x) + c.
  const t0 = Math.tan(y0 / 2)
  const yC = (x: number) => 2 * Math.atan(t0 * Math.exp(Math.sin(x) - Math.sin(x0)))
  const yE = (x: number) => 2 * Math.atan(t0 * Math.exp(Gd(x) - Gd(x0)))

  const mTrue = slope(x0, y0)
  const mOpt = opt === 'C' ? Math.cos(x0) * Math.sin(y0) : Math.sin(y0) / Math.cos(x0)
  const lhs = Math.sin(x0 + y0) - Math.sin(x0 - y0)
  const rhs = 2 * Math.cos(x0) * Math.sin(y0)
  const nearHalfPi = Math.abs(y0 - HALF_PI) < 0.12

  let notice
  if (opt === 'none') {
    notice = (
      <Notice>
        Each grey segment has the slope <M>{'\\tfrac{2}{\\sin(x+y)-\\sin(x-y)}'}</M>, worked out straight from the
        question. The green curve is option <b>D</b> solved through your point, <M>{'-\\cos(y) = \\log_e(\\sec(x)+\\tan(x))+c'}</M>,
        and it runs along the segments everywhere. Drag the point to any other start, then draw options C and E
        through it.
      </Notice>
    )
  } else if (opt === 'C') {
    notice = (
      <Notice tone="warn">
        Option <b>C</b> is what you get by separating <M>{'\\tfrac{dy}{dx} = \\cos(x)\\sin(y)'}</M>, the{' '}
        <em>reciprocal</em> of the real rate. Its red curve passes through your point at slope{' '}
        <M>{mOpt.toFixed(2)}</M> instead of <M>{mTrue.toFixed(2)}</M>, and it cuts straight across the segments. Where
        the real curves climb steeply, C&apos;s curve is flat.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Option <b>E</b> separates <M>{'\\tfrac{dy}{dx} = \\tfrac{\\sin(y)}{\\cos(x)}'}</M>, with <M>{'\\sin(y)'}</M> on
        top instead of underneath.{' '}
        {nearHalfPi ? (
          <>
            Near <M>{'y = \\tfrac{\\pi}{2}'}</M>, where <M>{'\\sin(y) = 1'}</M>, the two slopes agree, which is why the
            curves touch here. Move the point up or down and they split apart.
          </>
        ) : (
          <>
            They agree only where <M>{'\\sin(y) = 1'}</M>. Drag the point to <M>{'y = \\tfrac{\\pi}{2}'}</M> to see
            the curves touch, then away again to see the red curve leave the segments.
          </>
        )}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-HALF_PI, HALF_PI]} y={[0, Math.PI]} xStep={HALF_PI} yStep={HALF_PI} equalScale height={420} labels={tick}>
        {FIELD.map((s, i) => {
          const c = 1 / Math.hypot(1, s.m)
          const dx = HL * c
          const dy = HL * s.m * c
          return <Line.Segment key={i} point1={[s.x - dx, s.y - dy]} point2={[s.x + dx, s.y + dy]} color={C.guide} weight={1.5} />
        })}
        <Line.Segment point1={[-HALF_PI, Math.PI]} point2={[HALF_PI, Math.PI]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[-HALF_PI, 0]} point2={[-HALF_PI, Math.PI]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[HALF_PI, 0]} point2={[HALF_PI, Math.PI]} color={C.guide} style="dashed" weight={1} />
        {opt === 'C' && <Plot.OfX y={yC} domain={[-HALF_PI + 0.01, HALF_PI - 0.01]} color={C.bad} weight={2.5} />}
        {opt === 'E' && <Plot.OfX y={yE} domain={[-HALF_PI + 0.01, HALF_PI - 0.01]} color={C.bad} weight={2.5} />}
        {dHi > dLo && <Plot.OfX y={yD} domain={[dLo, dHi]} color={C.good} weight={3} />}
        {opt !== 'none' && (
          <Label at={[1.2, opt === 'C' ? yC(1.2) : yE(1.2)]} attach={opt === 'C' ? 'n' : 'se'} color={C.bad}>
            {opt}
          </Label>
        )}
        <MovablePoint
          point={pt}
          onMove={p => setPt([clamp(p[0], -1.45, 1.45), clamp(p[1], 0.15, Math.PI - 0.15)])}
          color={C.g}
        />
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-gray-600 dark:text-gray-400">
          <span>Also draw:</span>
          <Choice active={opt === 'none'} onClick={() => setOpt('none')}>D only</Choice>
          <Choice active={opt === 'C'} onClick={() => setOpt('C')}>option C</Choice>
          <Choice active={opt === 'E'} onClick={() => setOpt('E')}>option E</Choice>
        </div>
        <Readouts>
          <Readout tex={`\\sin(x+y)-\\sin(x-y) = ${lhs.toFixed(3)}`} />
          <Readout tex={`2\\cos(x)\\sin(y) = ${rhs.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\text{field and D: } \\tfrac{dy}{dx} = ${mTrue.toFixed(2)}`} />
          {opt !== 'none' && <Readout color={C.bad} tex={`\\text{${opt}: } \\tfrac{dy}{dx} = ${mOpt.toFixed(2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
