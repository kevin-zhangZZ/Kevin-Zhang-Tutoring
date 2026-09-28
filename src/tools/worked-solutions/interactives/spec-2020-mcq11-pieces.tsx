// 2020 Specialist Exam 2 MCQ 11 — what partial fractions means, and where its signs come from.
// The blue curve is the integrand after the substitution, 1/((u − 1)(u − 2)); the orange and violet
// curves are the two pieces 1/(u − 2) and −1/(u − 1). Drag u along the axis: the orange arrow is the
// first piece, the violet arrow the second stacked on top of it, and the tip lands on the blue
// curve for every u. Near u = 2 the curve behaves like the orange piece (the other factor u − 1 is
// about 1, so the coefficient is +1) and near u = 1 like the violet one (u − 2 is about −1, so −1):
// the cover-up rule, seen. It opens at u = 1.5, inside the green u-terminals 1 to √3, where
// both pieces are −2 and stack to −4 on the curve. The toggle swaps in option D's signs (19% chose D): the pieces add to
// the blue curve turned upside down. Deliberately no shading over [1, √3] — the integral is
// improper at u = 1 (see the note in the solution), so it has no finite area to show; the
// terminals are only marked on the axis.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, Vector, clamp, num } from './kit'

const U0 = -0.5
const U1 = 3.5
const Y = 8
const CLIP = 9.5 // curves are drawn only where |y| ≤ CLIP, a little beyond the visible ±8 (+ padding)
const GAP = 0.13 // u is kept this far from the asymptotes, so every arrow stays on screen
const DX = 0.07 // the first arrow sits this far left of u, so the two arrows don't overlap

const whole = (u: number) => 1 / ((u - 1) * (u - 2))
const pieceA = (u: number) => 1 / (u - 2)
const pieceB = (u: number) => -1 / (u - 1)

/** The parts of [a, b] where |fn| ≤ CLIP, found by sampling and refined by bisection, so a curve
 *  with vertical asymptotes is drawn as separate branches rather than joined across a pole. */
function branches(fn: (u: number) => number, a: number, b: number): [number, number][] {
  const ok = (u: number) => Number.isFinite(fn(u)) && Math.abs(fn(u)) <= CLIP
  const edge = (inside: number, outside: number) => {
    let lo = inside
    let hi = outside
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2
      if (ok(mid)) lo = mid
      else hi = mid
    }
    return lo
  }
  const N = 1200
  const out: [number, number][] = []
  let startU: number | null = ok(a) ? a : null
  let prev = a
  for (let i = 1; i <= N; i++) {
    const u = a + ((b - a) * i) / N
    const now = ok(u)
    if (now && startU === null) startU = edge(u, prev)
    if (!now && startU !== null) {
      out.push([startU, edge(prev, u)])
      startU = null
    }
    prev = u
  }
  if (startU !== null) out.push([startU, b])
  return out
}

function Curve({ fn, color, weight }: { fn: (u: number) => number; color: string; weight: number }) {
  return (
    <>
      {branches(fn, U0, U1).map(([a, b]) => (
        <Plot.OfX key={`${a}`} y={fn} domain={[a, b]} color={color} weight={weight} />
      ))}
    </>
  )
}

/** Keep u off the two asymptotes. */
function settle(u: number): number {
  let v = clamp(u, U0 + 0.1, U1 - 0.1)
  for (const pole of [1, 2]) {
    if (Math.abs(v - pole) < GAP) v = v < pole ? pole - GAP : pole + GAP
  }
  return v
}

export default function PiecesWidget() {
  const [u, setU] = useState(1.5)
  const [swapped, setSwapped] = useState(false)

  const sign = swapped ? -1 : 1
  const a = sign * pieceA(u)
  const b = sign * pieceB(u)
  const sum = a + b
  const g = whole(u)
  const near2 = Math.abs(u - 2) < 0.3
  const near1 = Math.abs(u - 1) < 0.3
  const between = u > 1 && u < 2

  let notice
  if (swapped) {
    notice = (
      <Notice tone="warn">
        Option D&apos;s pieces, <M>{'\\tfrac{1}{u-1} - \\tfrac{1}{u-2}'}</M>, are each the negative of C&apos;s, so they add
        up to the <b>red</b> curve: the blue one turned upside down. The stacked arrows now land on red, not blue, whatever{' '}
        <M>u</M> you pick. At <M>{`u = ${num(u)}`}</M> they give <M>{num(sum, 3)}</M> where the integrand is{' '}
        <M>{num(g, 3)}</M>. Checking one easy value, like <M>u = 0</M>, catches this: <M>{'\\tfrac{1}{-1} - \\tfrac{1}{-2} = -\\tfrac12'}</M>, not <M>{'\\tfrac12'}</M>.
      </Notice>
    )
  } else if (near2) {
    notice = (
      <Notice tone="good">
        <b>Near <M>u = 2</M> the blue curve races off to infinity together with the orange piece</b>, while the violet piece
        stays small. Here the other factor <M>u - 1</M> is almost exactly 1, so{' '}
        <M>{'\\tfrac{1}{(u-1)(u-2)} \\approx \\tfrac{1}{1\\times(u-2)}'}</M>: the number on top of <M>u - 2</M> is{' '}
        <M>{'\\tfrac{1}{2-1} = +1'}</M>. That is the cover-up rule: cover <M>(u - 2)</M> and put <M>u = 2</M> into what is
        left. Now go near <M>u = 1</M>.
      </Notice>
    )
  } else if (near1) {
    notice = (
      <Notice tone="good">
        <b>Near <M>u = 1</M> the blue curve follows the violet piece</b>. Here the other factor <M>u - 2</M> is almost{' '}
        <M>-1</M>, so the curve behaves like <M>{'\\tfrac{1}{(u-1)(-1)} = -\\tfrac{1}{u-1}'}</M>: the number on top of{' '}
        <M>u - 1</M> is <M>{'\\tfrac{1}{1-2} = -1'}</M>. That is the minus sign in option C, and it is why the curve
        plunges down just to the right of <M>u = 1</M> and shoots up just to the left. Now try option D&apos;s signs.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The orange arrow is <M>{'\\tfrac{1}{u-2}'}</M>; the violet arrow, <M>{'-\\tfrac{1}{u-1}'}</M>, is stacked on top of
        it. The tip lands exactly on the blue curve, for every <M>u</M> you try: that is what{' '}
        <M>{'\\tfrac{1}{(u-1)(u-2)} = \\tfrac{1}{u-2} - \\tfrac{1}{u-1}'}</M> means.{' '}
        {between && (
          <>
            Here <M>{'u - 1 > 0'}</M> and <M>{'u - 2 < 0'}</M>, so both arrows point <b>down</b>: the integrand is negative
            all the way along the green stretch from <M>u = 1</M> to <M>{'\\sqrt3'}</M> that the integral covers.{' '}
          </>
        )}
        {Math.abs(u) < 0.03 && (
          <>
            At <M>u = 0</M>: <M>{'-\\tfrac12 + 1 = \\tfrac12'}</M>, and <M>{'\\tfrac{1}{(-1)(-2)} = \\tfrac12'}</M>.{' '}
          </>
        )}
        Drag <M>u</M> towards 2 and watch which piece the curve copies.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[U0, U1]} y={[-Y, Y]} xStep={1} yStep={2} height={330} xLabel="u">
        <Line.Segment point1={[1, -Y - 2]} point2={[1, Y + 2]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[2, -Y - 2]} point2={[2, Y + 2]} color={C.guide} style="dashed" weight={1.5} />
        {/* the u-terminals of the integral, 1 to √3 */}
        <Line.Segment point1={[1, 0]} point2={[Math.sqrt(3), 0]} color={C.good} weight={6} />
        <Label at={[Math.sqrt(3), 0]} attach="s" gap={6} size={12} color={C.good}>√3</Label>
        <Curve fn={u => sign * pieceA(u)} color={C.g} weight={1.8} />
        <Curve fn={u => sign * pieceB(u)} color={C.violet} weight={1.8} />
        <Curve fn={whole} color={C.f} weight={3.2} />
        {swapped && <Curve fn={u => -whole(u)} color={C.bad} weight={3.2} />}
        {/* the two pieces stacked at u: the first a little to the left, the second from its tip */}
        <Vector tail={[u - DX, 0]} tip={[u - DX, a]} color={C.g} weight={3} />
        <Line.Segment point1={[u - DX, a]} point2={[u, a]} color={C.guide} style="dashed" weight={1.5} />
        <Vector tail={[u, a]} tip={[u, sum]} color={C.violet} weight={3} />
        <Point x={u} y={swapped ? sum : g} color={swapped ? C.bad : C.f} />
        <MovablePoint point={[u, 0]} constrain={p => [settle(p[0]), 0]} onMove={p => setU(settle(p[0]))} color={C.ink} />
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-gray-600 dark:text-gray-300">
          <span className="inline-flex items-center gap-1.5"><span className="inline-block w-4 h-[3px] rounded" style={{ background: C.f }} /><M>{'\\tfrac{1}{(u-1)(u-2)}'}</M></span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-block w-4 h-[3px] rounded" style={{ background: C.g }} /><M>{swapped ? '-\\tfrac{1}{u-2}' : '\\tfrac{1}{u-2}'}</M></span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-block w-4 h-[3px] rounded" style={{ background: C.violet }} /><M>{swapped ? '\\tfrac{1}{u-1}' : '-\\tfrac{1}{u-1}'}</M></span>
          {swapped && <span className="inline-flex items-center gap-1.5"><span className="inline-block w-4 h-[3px] rounded" style={{ background: C.bad }} />option D&apos;s sum</span>}
        </div>
        <Buttons>
          <ActionButton label="u = 0" onClick={() => setU(0)} />
          <ActionButton label="u = 1.5" onClick={() => setU(1.5)} />
          <ActionButton label="Near u = 1" onClick={() => setU(1.2)} />
          <ActionButton label="Near u = 2" onClick={() => setU(2.2)} />
          <Toggle label="Try option D's signs" checked={swapped} onChange={setSwapped} />
        </Buttons>
        <Readouts>
          <Readout tex={`u = ${num(u)}`} />
          <Readout color={C.g} tex={`${swapped ? '-' : ''}\\tfrac{1}{u-2} = ${num(a, 3)}`} />
          <Readout color={C.violet} tex={`${swapped ? '' : '-'}\\tfrac{1}{u-1} = ${num(b, 3)}`} />
          <Readout color={swapped ? C.bad : C.good} tex={`\\text{sum} = ${num(sum, 3)}`} />
          <Readout color={C.f} tex={`\\tfrac{1}{(u-1)(u-2)} = ${num(g, 3)}${swapped ? '' : '\\ \\checkmark'}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the point on the <M>u</M>-axis, or jump with the buttons.</p>
        {notice}
      </Controls>
    </div>
  )
}
