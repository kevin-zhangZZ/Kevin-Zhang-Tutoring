// 2019 Specialist Exam 2 MCQ 9 — test each option's direction field against features you can read off
// the VCAA diagram. All five options depend only on y − x, so all five fields are striped along lines
// parallel to y = x; the stripes alone decide nothing. Pick an option to draw its field (flat marks
// green, near-vertical marks red, flat/vertical diagonals dashed) and drag the probe P to read dy/dx.
// A and C are flat along y = x; E is vertical there; D has slope 1 on y = x (it passes the origin test)
// but |dy/dx| ≥ 1 everywhere, so it is never flat. Only B = cos(y − x) is steep (gradient 1) on y = x and
// flat on y − x = ±π/2, as in the diagram. Grid spacing 0.8 so the diagonals y − x = ±1.6 carry marks.

import { useMemo, useState, type ReactNode } from 'react'
import { Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Readout, Readouts, Toggle, clamp, num } from './kit'

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTS: Record<Opt, { btn: string; f: (u: number) => number; flat: number; vert: number }> = {
  // u = y − x. flat / vert: the offset c (mod π) of the diagonals y − x = c + kπ where marks are flat /
  // vertical (NaN for none).
  A: { btn: '\\sin(y-x)', f: u => Math.sin(u), flat: 0, vert: NaN },
  B: { btn: '\\cos(y-x)', f: u => Math.cos(u), flat: Math.PI / 2, vert: NaN },
  C: { btn: '\\sin(x-y)', f: u => -Math.sin(u), flat: 0, vert: NaN },
  D: { btn: '1/\\cos(y-x)', f: u => 1 / Math.cos(u), flat: NaN, vert: Math.PI / 2 },
  E: { btn: '1/\\sin(y-x)', f: u => 1 / Math.sin(u), flat: NaN, vert: 0 },
}
const LETTERS: Opt[] = ['A', 'B', 'C', 'D', 'E']
const R: [number, number] = [-8, 8]
const GRID = Array.from({ length: 21 }, (_, i) => -8 + 0.8 * i) // −8, −7.2, …, 8
const HALF = 0.3 // half-length of a mark, in units (the plane is equal-scale)
const STEEP = 12

/** A mark of gradient m centred at (x, y), 2·len long; vertical when m is infinite. */
function ends(x: number, y: number, m: number, len: number): [[number, number], [number, number]] {
  const [ux, uy] = Math.abs(m) > 1e6 || !Number.isFinite(m) ? [0, 1] : [1 / Math.hypot(1, m), m / Math.hypot(1, m)]
  return [
    [x - len * ux, y - len * uy],
    [x + len * ux, y + len * uy],
  ]
}

/** Offsets c (within the plane) of the diagonals y − x = c0 + kπ. */
function diagonals(c0: number) {
  if (Number.isNaN(c0)) return []
  const out: number[] = []
  for (let k = -6; k <= 6; k++) {
    const c = c0 + k * Math.PI
    if (Math.abs(c) < 15.5) out.push(c)
  }
  return out
}

/** The part of the line y = x + c inside the square [−8, 8]². */
function diag(c: number): { point1: [number, number]; point2: [number, number] } {
  const x0 = Math.max(-8, -8 - c)
  const x1 = Math.min(8, 8 - c)
  return { point1: [x0, x0 + c], point2: [x1, x1 + c] }
}

function Field({ opt }: { opt: Opt }) {
  const { f, flat, vert } = OPTS[opt]
  const marks = []
  for (const x of GRID) {
    for (const y of GRID) {
      const m = f(y - x)
      const [p1, p2] = ends(x, y, m, HALF)
      const color = Math.abs(m) < 0.2 ? C.good : Math.abs(m) > STEEP || !Number.isFinite(m) ? C.bad : C.guide
      marks.push(<Line.Segment key={`${x},${y}`} point1={p1} point2={p2} color={color} weight={1.6} />)
    }
  }
  return (
    <>
      {diagonals(flat).map(c => (
        <Line.Segment key={`f${c}`} {...diag(c)} color={C.good} style="dashed" weight={1.2} opacity={0.6} />
      ))}
      {diagonals(vert).map(c => (
        <Line.Segment key={`v${c}`} {...diag(c)} color={C.bad} style="dashed" weight={1.2} opacity={0.6} />
      ))}
      {marks}
    </>
  )
}

const NOTES: Record<Opt, { tone: 'neutral' | 'good' | 'warn'; body: ReactNode }> = {
  A: {
    tone: 'warn',
    body: (
      <>
        <M>{'\\sin(y-x) = \\sin 0 = 0'}</M> everywhere on <M>y = x</M>, so every mark on the violet line is flat. In the
        VCAA diagram the marks on <M>y = x</M> slope upward (look at <M>(2, 2)</M>), so A is out. Try C.
      </>
    ),
  },
  C: {
    tone: 'warn',
    body: (
      <>
        <M>{'\\sin(x-y) = -\\sin(y-x)'}</M>: A&apos;s field with every slope flipped. It is still 0 on <M>y = x</M>, so
        the marks along the violet line are flat again. Out. Try D.
      </>
    ),
  },
  D: {
    tone: 'warn',
    body: (
      <>
        On <M>y = x</M>, <M>{'\\tfrac{1}{\\cos 0} = 1'}</M>: D passes the origin test, which is why it is tempting. But{' '}
        <M>{'|\\cos| \\le 1'}</M> makes <M>{'\\left|\\tfrac{dy}{dx}\\right| \\ge 1'}</M>, so no mark is ever flat, and on
        the red diagonals <M>{'y - x = \\pm\\tfrac{\\pi}{2}'}</M> they stand vertical. The diagram has flat marks: out. Try E.
      </>
    ),
  },
  E: {
    tone: 'warn',
    body: (
      <>
        <M>{'\\tfrac{1}{\\sin(y-x)}'}</M> is undefined on <M>y = x</M> itself, so the marks along the violet line are
        vertical, and again none is ever flat. Out. Try B.
      </>
    ),
  },
  B: {
    tone: 'good',
    body: (
      <>
        <M>{'\\cos 0 = 1'}</M>, so the marks on <M>y = x</M> have gradient 1 (the line <M>y = x</M> is itself a
        solution). The flat marks sit on <M>{'y - x = \\pm\\tfrac{\\pi}{2}'}</M>, crossing the <M>y</M>-axis near{' '}
        <M>{'\\pm 1.6'}</M>, just as in the diagram. Drag <M>P</M> onto a green diagonal to check.
      </>
    ),
  },
}

export default function Fields() {
  const [opt, setOpt] = useState<Opt>('A')
  const [p, setP] = useState<[number, number]>([2, 2])
  const field = useMemo(() => <Field opt={opt} />, [opt])

  const u = p[1] - p[0]
  const m = OPTS[opt].f(u)
  const vertical = !Number.isFinite(m) || Math.abs(m) > 1e6
  const [q1, q2] = ends(p[0], p[1], m, 0.9)
  const bounded = opt === 'A' || opt === 'B' || opt === 'C'

  return (
    <div>
      <div className="mb-2">
      <Buttons>
        {LETTERS.map(L => (
          <Toggle
            key={L}
            label={
              <>
                {L}: <M>{OPTS[L].btn}</M>
              </>
            }
            checked={opt === L}
            onChange={() => setOpt(L)}
          />
        ))}
      </Buttons>
      </div>
      <Plane
        x={R}
        y={R}
        xStep={2}
        yStep={2}
        equalScale
        height={440}
        xLabels={v => (Math.abs(v) > 8.5 ? '' : String(v))}
      >
        {field}
        <Line.Segment {...diag(0)} color={C.violet} style="dashed" weight={2} />
        <Label at={[6.2, 6.2]} attach="se" color={C.violet}>
          y = x
        </Label>
        <Line.Segment point1={q1} point2={q2} color={C.f} weight={3.5} />
        <MovablePoint point={p} onMove={([x, y]) => setP([clamp(x, -7.8, 7.8), clamp(y, -7.8, 7.8)])} color={C.f} />
        <Label at={p} attach="nw" color={C.f}>
          P
        </Label>
      </Plane>
      <Controls>
        <Readouts>
          <Readout tex={`P \\approx (${num(p[0], 1)}, ${num(p[1], 1)}),\\ \\ y - x \\approx ${num(u)}`} />
          <Readout
            color={C.f}
            tex={`\\tfrac{dy}{dx} = ${OPTS[opt].btn} ${vertical ? '\\ \\text{undefined (vertical)}' : `\\approx ${num(m)}`}`}
          />
          <Readout
            color={bounded ? C.good : C.bad}
            tex={bounded ? '-1 \\le \\tfrac{dy}{dx} \\le 1' : '\\left|\\tfrac{dy}{dx}\\right| \\ge 1 \\text{ (never flat)}'}
          />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Green marks are flat, red ones near vertical. Drag P to read the gradient anywhere.
        </p>
        <Notice tone={NOTES[opt].tone}>{NOTES[opt].body}</Notice>
      </Controls>
    </div>
  )
}
