// 2018 Specialist Exam 2 MCQ 10 — a direction field for dy/dx = N/D is flat where the numerator N is
// zero and vertical where the denominator D is zero. In the VCAA diagram the flat marks lie on
// y = −2x and the vertical marks on y = 2x. Pick an option to draw its field: its flat line (N = 0)
// is dashed green, its vertical line (D = 0) dashed red, and the checklist compares both with the
// diagram. B and D share A's vertical line, and E shares A's flat line (E even has the right signs on
// both axes), so only A matches on both. Drag P to read dy/dx anywhere (P starts on the y-axis).

import { useMemo, useState, type ReactNode } from 'react'
import { Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Readout, Readouts, Toggle, clamp, num } from './kit'

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'
type Side = { tex: string; f: (x: number, y: number) => number; k: number; line: string }

// For each option: numerator and denominator, the slope k of the line y = kx on which each is zero.
const OPTS: Record<Opt, { n: Side; d: Side }> = {
  A: {
    n: { tex: '2x+y', f: (x, y) => 2 * x + y, k: -2, line: 'y = −2x' },
    d: { tex: 'y-2x', f: (x, y) => y - 2 * x, k: 2, line: 'y = 2x' },
  },
  B: {
    n: { tex: 'x+2y', f: (x, y) => x + 2 * y, k: -0.5, line: 'y = −x/2' },
    d: { tex: '2x-y', f: (x, y) => 2 * x - y, k: 2, line: 'y = 2x' },
  },
  C: {
    n: { tex: '2x-y', f: (x, y) => 2 * x - y, k: 2, line: 'y = 2x' },
    d: { tex: 'x+2y', f: (x, y) => x + 2 * y, k: -0.5, line: 'y = −x/2' },
  },
  D: {
    n: { tex: 'x-2y', f: (x, y) => x - 2 * y, k: 0.5, line: 'y = x/2' },
    d: { tex: 'y-2x', f: (x, y) => y - 2 * x, k: 2, line: 'y = 2x' },
  },
  E: {
    n: { tex: '2x+y', f: (x, y) => 2 * x + y, k: -2, line: 'y = −2x' },
    d: { tex: '2y-x', f: (x, y) => 2 * y - x, k: 0.5, line: 'y = x/2' },
  },
}
const LETTERS: Opt[] = ['A', 'B', 'C', 'D', 'E']
const LINE_TEX: Record<string, string> = { '2': 'y=2x', '-2': 'y=-2x', '0.5': 'y=\\tfrac{x}{2}', '-0.5': 'y=-\\tfrac{x}{2}' }
const DIAGRAM_FLAT = -2
const DIAGRAM_VERT = 2
const GRID = Array.from({ length: 21 }, (_, i) => Math.round((-8 + 0.8 * i) * 10) / 10) // −8, −7.2, …, 8
const HALF = 0.3

/** A mark of gradient m centred at (x, y), 2·len long; vertical when m is infinite. */
function ends(x: number, y: number, m: number, len: number): [[number, number], [number, number]] {
  const [ux, uy] = !Number.isFinite(m) || Math.abs(m) > 1e6 ? [0, 1] : [1 / Math.hypot(1, m), m / Math.hypot(1, m)]
  return [
    [x - len * ux, y - len * uy],
    [x + len * ux, y + len * uy],
  ]
}

/** The part of y = kx inside [−8, 8]². */
function seg(k: number): { point1: [number, number]; point2: [number, number] } {
  const x1 = Math.abs(k) <= 1 ? 8 : 8 / Math.abs(k)
  return { point1: [-x1, -k * x1], point2: [x1, k * x1] }
}

/** Where to put a line's label: near the top/right end, pulled in from the edge. */
function labelAt(k: number): { at: [number, number]; attach: 'e' | 'w' | 'se' | 'ne' } {
  // Offset sideways from the line and attached away from it, so the dashed line never runs through the text.
  if (Math.abs(k) > 1) return { at: [7 / k + (k > 0 ? 0.6 : -0.6), 7], attach: k > 0 ? 'e' : 'w' }
  return { at: [5, 5 * k], attach: k > 0 ? 'se' : 'ne' }
}

function Field({ opt }: { opt: Opt }) {
  const { n, d } = OPTS[opt]
  const marks = []
  for (const x of GRID) {
    for (const y of GRID) {
      const top = n.f(x, y)
      const bot = d.f(x, y)
      if (Math.abs(top) < 1e-9 && Math.abs(bot) < 1e-9) continue // the origin: 0/0
      const m = Math.abs(bot) < 1e-9 ? Infinity : top / bot
      const [p1, p2] = ends(x, y, m, HALF)
      const color = Math.abs(m) < 0.15 ? C.good : !Number.isFinite(m) || Math.abs(m) > 8 ? C.bad : C.guide
      marks.push(<Line.Segment key={`${x},${y}`} point1={p1} point2={p2} color={color} weight={1.6} />)
    }
  }
  return <>{marks}</>
}

const NOTES: Record<Opt, { tone: 'neutral' | 'good' | 'warn'; body: ReactNode }> = {
  E: {
    tone: 'warn',
    body: (
      <>
        E has A&apos;s numerator, so its flat marks (green) sit on <M>y=-2x</M> just like the diagram&apos;s, and it even has
        the right signs on both axes. But its denominator <M>2y-x</M> is zero on <M>{'y=\\tfrac{x}{2}'}</M>: E&apos;s marks
        stand vertical through <M>(4,2)</M>. The diagram&apos;s vertical marks run through <M>(2,4)</M> and <M>(4,8)</M>. Out.
        Try A.
      </>
    ),
  },
  A: {
    tone: 'good',
    body: (
      <>
        Flat on <M>y=-2x</M> and vertical on <M>y=2x</M>, exactly where the diagram has them. Drag <M>P</M> along the
        positive <M>y</M>-axis: <M>{'\\tfrac{dy}{dx}=\\tfrac{y}{y}=1'}</M> everywhere. Then along the positive{' '}
        <M>x</M>-axis: <M>{'\\tfrac{2x}{-2x}=-1'}</M>. Those are the <M>{'45^\\circ'}</M> marks either side of{' '}
        <M>O</M> in the diagram.
      </>
    ),
  },
  B: {
    tone: 'warn',
    body: (
      <>
        B&apos;s denominator <M>2x-y</M> is also zero on <M>y=2x</M>, so its vertical marks are in the right place. The
        vertical line alone cannot separate A, B and D. But B is flat on <M>{'y=-\\tfrac{x}{2}'}</M>, and at{' '}
        <M>(0,4)</M> it gives <M>-2</M>: a mark sloping down, where the diagram&apos;s slopes up. Out.
      </>
    ),
  },
  C: {
    tone: 'warn',
    body: (
      <>
        C is flat on <M>y=2x</M>, exactly where the diagram&apos;s marks stand vertical, and it is vertical on{' '}
        <M>{'y=-\\tfrac{x}{2}'}</M>. Neither line matches. Out.
      </>
    ),
  },
  D: {
    tone: 'warn',
    body: (
      <>
        D has A&apos;s denominator, so its vertical line is right. But its numerator <M>x-2y</M> is zero on{' '}
        <M>{'y=\\tfrac{x}{2}'}</M>, so D would be flat through <M>(4,2)</M>, where the diagram&apos;s marks are steep. At{' '}
        <M>(0,4)</M> it gives <M>-2</M>, the wrong way. Out.
      </>
    ),
  },
}

export default function FlatVertical() {
  const [opt, setOpt] = useState<Opt>('E')
  const [p, setP] = useState<[number, number]>([0, 4])
  const field = useMemo(() => <Field opt={opt} />, [opt])
  const { n, d } = OPTS[opt]

  const top = n.f(p[0], p[1])
  const bot = d.f(p[0], p[1])
  const vertical = Math.abs(bot) < 0.05
  const m = vertical ? Infinity : top / bot
  const [q1, q2] = ends(p[0], p[1], m, 0.9)
  const flatOk = n.k === DIAGRAM_FLAT
  const vertOk = d.k === DIAGRAM_VERT
  const fl = labelAt(n.k)
  const vl = labelAt(d.k)

  return (
    <div>
      <div className="mb-2">
        <Buttons>
          {LETTERS.map(L => (
            <Toggle
              key={L}
              label={
                <>
                  {L}: <M>{`\\frac{${OPTS[L].n.tex}}{${OPTS[L].d.tex}}`}</M>
                </>
              }
              checked={opt === L}
              onChange={() => setOpt(L)}
            />
          ))}
        </Buttons>
      </div>
      <div className="mx-auto max-w-[440px]">
      <Plane x={[-8, 8]} y={[-8, 8]} xStep={2} yStep={2} equalScale height={440}>
        {field}
        <Line.Segment {...seg(n.k)} color={C.good} style="dashed" weight={2} />
        <Line.Segment {...seg(d.k)} color={C.bad} style="dashed" weight={2} />
        <Label at={fl.at} attach={fl.attach} color={C.good}>
          {n.line}
        </Label>
        <Label at={vl.at} attach={vl.attach} color={C.bad}>
          {d.line}
        </Label>
        <Line.Segment point1={q1} point2={q2} color={C.f} weight={3.5} />
        <MovablePoint
          point={p}
          onMove={([x, y]) => setP([Math.round(clamp(x, -7.8, 7.8) * 10) / 10, Math.round(clamp(y, -7.8, 7.8) * 10) / 10])}
          color={C.f}
        />
        <Label at={p} attach="nw" color={C.f}>
          P
        </Label>
      </Plane>
      </div>
      <Controls>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          In the VCAA diagram: flat marks along <M>y=-2x</M>, vertical marks along <M>y=2x</M>.
        </p>
        <Readouts>
          <Readout
            color={flatOk ? C.good : C.bad}
            tex={`\\text{flat: } ${n.tex}=0 \\Rightarrow ${LINE_TEX[String(n.k)]}\\ ${flatOk ? '\\checkmark' : '\\times'}`}
          />
          <Readout
            color={vertOk ? C.good : C.bad}
            tex={`\\text{vertical: } ${d.tex}=0 \\Rightarrow ${LINE_TEX[String(d.k)]}\\ ${vertOk ? '\\checkmark' : '\\times'}`}
          />
          <Readout
            color={C.f}
            tex={
              Math.abs(top) < 0.05 && vertical
                ? `\\text{at } (${num(p[0], 1)}, ${num(p[1], 1)}):\\ \\tfrac{0}{0}\\ \\text{undefined}`
                : vertical
                  ? `\\text{at } (${num(p[0], 1)}, ${num(p[1], 1)}):\\ \\tfrac{dy}{dx}\\ \\text{undefined (vertical)}`
                  : `\\text{at } (${num(p[0], 1)}, ${num(p[1], 1)}):\\ \\tfrac{dy}{dx}=\\tfrac{${num(top, 1)}}{${num(bot, 1)}}\\approx ${num(m)}`
            }
          />
        </Readouts>
        <Notice tone={NOTES[opt].tone}>{NOTES[opt].body}</Notice>
      </Controls>
    </div>
  )
}
