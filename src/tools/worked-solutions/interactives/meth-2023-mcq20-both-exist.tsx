// 2023 Methods Exam 2 MCQ 20 — (f∘g)(x) and (g∘f)(x) each have their own domain, and the answer
// is the x-values where BOTH work. Drag x along the axis: y = sin(x) (g, defined only for x < 5) is
// drawn against the line y = −1/√2, and three bars show where f∘g exists (sin(x) + 1/√2 > 0, x < 5),
// where g∘f exists (x + 1/√2 > 0, and f(x) < 5, which holds all the way to e⁵ − 1/√2 ≈ 147.7), and
// where both do: (−1/√2, 5π/4), option A. It opens at x = −0.75, inside option C, where f∘g works
// but g∘f does not (that gap is option E); the "Zoom in on the gap" toggle shows how narrow that gap
// between −π/4 ≈ −0.785 and −1/√2 ≈ −0.707 is. The draggable marker on the x-axis is labelled x.
// The slider snaps to −3π/4, −π/4, −1/√2 and 5π/4, where log_e(0) makes the
// composite undefined — why every end is open (B and D close an end).

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, clamp, num } from './kit'

const R = Math.SQRT1_2 // 1/√2
const PI = Math.PI
const ROW = { fg: -1.35, gf: -1.75, both: -2.15 } as const
const X_MAX = 4.99 // g is only defined for x < 5

type Snap = 'a1' | 'a' | 'r' | 'b' | null
const SNAPS: { key: Exclude<Snap, null>; x: number; tex: string }[] = [
  { key: 'a1', x: (-3 * PI) / 4, tex: '-\\tfrac{3\\pi}{4}' },
  { key: 'a', x: -PI / 4, tex: '-\\tfrac{\\pi}{4}' },
  { key: 'r', x: -R, tex: '-\\tfrac{1}{\\sqrt2}' },
  { key: 'b', x: (5 * PI) / 4, tex: '\\tfrac{5\\pi}{4}' },
]

function Hollow({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

/** A domain bar on one row, with a hollow dot at each open end that is on screen. */
function Bar({ from, to, y, color, x0, x1 }: { from: number; to: number; y: number; color: string; x0: number; x1: number }) {
  const a = Math.max(from, x0)
  const b = Math.min(to, x1)
  if (b <= a) return null
  return (
    <>
      <Line.Segment point1={[a, y]} point2={[b, y]} color={color} weight={6} />
      {from >= x0 && <Hollow x={from} y={y} color={color} />}
      {to <= x1 && <Hollow x={to} y={y} color={color} />}
    </>
  )
}

export default function BothExist() {
  const [x, setX] = useState(-0.75)
  const [snap, setSnap] = useState<Snap>(null)
  const [zoom, setZoom] = useState(false)

  const X0 = zoom ? -1.05 : -3
  const X1 = zoom ? -0.45 : 5.5
  const tol = zoom ? 0.003 : 0.03

  const onX = (v: number) => {
    const c = clamp(v, X0, Math.min(X1, X_MAX))
    const hit = SNAPS.find(s => Math.abs(s.x - c) < tol)
    setSnap(hit ? hit.key : null)
    setX(hit ? hit.x : c)
  }
  const onZoom = (z: boolean) => {
    setZoom(z)
    if (z && (x < -1.05 || x > -0.45)) {
      setX(-0.75)
      setSnap(null)
    }
  }

  const s = Math.sin(x)
  const fgVal = snap === 'a1' || snap === 'a' || snap === 'b' ? 0 : s + R
  const gfVal = snap === 'r' ? 0 : x + R
  const fgOk = fgVal > 0
  const gfOk = gfVal > 0 // f(x) < 5 holds for every x shown (x < 5 gives f(x) < 1.75)
  const both = fgOk && gfOk
  const xTex = snap ? SNAPS.find(t => t.key === snap)!.tex : num(x, 3)

  let notice
  if (snap === 'r') {
    notice = (
      <Notice tone="warn">
        At <M>{'x = -\\tfrac{1}{\\sqrt2}'}</M>, <M>{'x + \\tfrac{1}{\\sqrt2} = 0'}</M> and <M>\log_e(0)</M> is undefined,
        so <M>g\circ f</M> fails right at this point. That is why the interval is <b>open</b> at{' '}
        <M>{'-\\tfrac{1}{\\sqrt2}'}</M>: option B includes this point, so B is wrong. Nudge <M>x</M> a little to the right
        and both composites work.
      </Notice>
    )
  } else if (snap === 'a' || snap === 'a1' || snap === 'b') {
    notice = (
      <Notice tone="warn">
        At <M>{`x = ${xTex}`}</M>, <M>{'\\sin(x) = -\\tfrac{1}{\\sqrt2}'}</M>, so <M>{'\\sin(x) + \\tfrac{1}{\\sqrt2} = 0'}</M>{' '}
        and <M>\log_e(0)</M> is undefined: <M>f\circ g</M> fails here.{' '}
        {snap === 'b' ? (
          <>
            So the answer is open at <M>{'\\tfrac{5\\pi}{4}'}</M>, and option D, which closes this end, is wrong. Slide left
            back into the green bar.
          </>
        ) : (
          <>
            This <M>x</M> is also left of <M>{'-\\tfrac{1}{\\sqrt2}'}</M>, so <M>g\circ f</M> fails too.
            {snap === 'a' && <> Option D includes <M>{'-\\tfrac{\\pi}{4}'}</M>, so D is wrong.</>} Slide right towards{' '}
            <M>{'-\\tfrac{1}{\\sqrt2}'}</M>.
          </>
        )}
      </Notice>
    )
  } else if (fgOk && !gfOk) {
    notice = (
      <Notice tone="warn">
        Here <M>f\circ g</M> exists (the curve is above <M>{'y = -\\tfrac{1}{\\sqrt2}'}</M>), but <M>g\circ f</M> does
        not: <M>{'x + \\tfrac{1}{\\sqrt2} < 0'}</M>, and <M>\log_e</M> of a negative is undefined.{' '}
        {x > -PI / 4 ? (
          <>
            This <M>x</M> lies inside option C, so C is too big: <M>g\circ f</M> pulls the left end in from{' '}
            <M>{'-\\tfrac{\\pi}{4}'}</M> to <M>{'-\\tfrac{1}{\\sqrt2}'}</M>. (Option E is this gap, so it fails too.){' '}
          </>
        ) : (
          <>
            <M>g\circ f</M> fails everywhere left of <M>{'-\\tfrac{1}{\\sqrt2}'}</M>, so this piece of{' '}
            <M>f\circ g</M>&apos;s domain cannot be in the answer.{' '}
          </>
        )}
        {zoom ? (
          <>Slide right to exactly <M>{'-\\tfrac{1}{\\sqrt2}'}</M>.</>
        ) : (
          <>Press <b>Zoom in on the gap</b> to see how narrow the gap between <M>{'-\\tfrac{\\pi}{4}'}</M> and <M>{'-\\tfrac{1}{\\sqrt2}'}</M> is.</>
        )}
      </Notice>
    )
  } else if (both) {
    notice = (
      <Notice tone="good">
        <b>Both composites exist here</b>: <M>{'\\sin(x) + \\tfrac{1}{\\sqrt2} > 0'}</M> for <M>f\circ g</M>, and{' '}
        <M>{'x + \\tfrac{1}{\\sqrt2} > 0'}</M> with <M>{'f(x) < 5'}</M> for <M>g\circ f</M>. The green bar is every such{' '}
        <M>x</M>: <M>{'\\left(-\\tfrac{1}{\\sqrt2}, \\tfrac{5\\pi}{4}\\right)'}</M>, option A.{' '}
        {zoom ? <>Press <b>Zoom back out</b>, then slide</> : 'Slide'} right past <M>{'\\tfrac{5\\pi}{4} \\approx 3.93'}</M> to see where{' '}
        <M>f\circ g</M> gives out.
      </Notice>
    )
  } else if (!fgOk && gfOk) {
    notice = (
      <Notice tone="warn">
        <M>g\circ f</M> still works here, but <M>\sin(x)</M> has dropped below <M>{'-\\tfrac{1}{\\sqrt2}'}</M>, so{' '}
        <M>f\circ g</M> fails. The curve only climbs back above the line at <M>{'x = \\tfrac{7\\pi}{4} \\approx 5.50'}</M>,
        but <M>g</M> stops at <M>x = 5</M> (the open dot), so <M>{'\\tfrac{5\\pi}{4}'}</M> is the right end.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Neither composite exists here: the curve is below <M>{'y = -\\tfrac{1}{\\sqrt2}'}</M>, and{' '}
        <M>{'x + \\tfrac{1}{\\sqrt2} < 0'}</M>. Slide right into the green bar.
      </Notice>
    )
  }

  // No tick numbers in the side padding (or at the left edge, where the curve starts), nor
  // under the draggable x marker, whose halo would cover them
  const fmtTick = (v: number) =>
    v <= X0 + 1e-9 || v > X1 + 1e-9 || Math.abs(v - x) < 0.06 * (X1 - X0) ? '' : (zoom ? v.toFixed(1) : String(Math.round(v))).replace('-', '−')

  return (
    <div>
      <Plane key={zoom ? 'z' : 'f'} x={[X0, X1]} y={[-2.3, 1.3]} xStep={zoom ? 0.1 : 1} yStep={1} height={360} xLabels={fmtTick} yLabels={v => (Math.abs(Math.abs(v) - 1) < 1e-9 ? String(v).replace('-', '−') : '')}>
        {/* Where sin(x) is above −1/√2 (f∘g works), shaded under the curve */}
        <Region top={Math.sin} bottom={() => -R} from={Math.max(X0, -PI / 4)} to={Math.min(X1, (5 * PI) / 4)} color={C.violet} opacity={0.15} />
        <Region top={Math.sin} bottom={() => -R} from={X0} to={Math.min(X1, (-3 * PI) / 4)} color={C.violet} opacity={0.15} />
        <Line.Segment point1={[X0, -R]} point2={[X1, -R]} color={C.bad} style="dashed" weight={2} />
        <Plot.OfX y={Math.sin} domain={[X0, Math.min(X1, 5)]} color={C.g} weight={3} />
        {!zoom && <Hollow x={5} y={Math.sin(5)} color={C.g} />}
        {zoom ? (
          <Label at={[X1, -R]} attach="sw" color={C.bad}>y = −1/√2</Label>
        ) : (
          <Label at={[PI / 2, -R]} attach="n" color={C.bad}>y = −1/√2</Label>
        )}
        <Label at={zoom ? [-0.5, Math.sin(-0.5)] : [PI / 2, 1]} attach={zoom ? 'nw' : 'n'} color={C.g}>y = sin(x)</Label>

        {/* Where the curve meets the line */}
        <Hollow x={-PI / 4} y={-R} color={C.violet} />
        <Label at={[-PI / 4, -R]} attach="se" color={C.violet}>−π/4</Label>
        {!zoom && (
          <>
            <Hollow x={(5 * PI) / 4} y={-R} color={C.violet} />
            <Label at={[(5 * PI) / 4, -R]} attach="sw" color={C.violet}>5π/4</Label>
            <Hollow x={(-3 * PI) / 4} y={-R} color={C.violet} />
            <Label at={[(-3 * PI) / 4, -R]} attach="sw" color={C.violet}>−3π/4</Label>
          </>
        )}

        {/* The three domain bars */}
        <Bar from={-Infinity} to={(-3 * PI) / 4} y={ROW.fg} color={C.violet} x0={X0} x1={X1} />
        <Bar from={-PI / 4} to={(5 * PI) / 4} y={ROW.fg} color={C.violet} x0={X0} x1={X1} />
        <Bar from={-R} to={Infinity} y={ROW.gf} color={C.f} x0={X0} x1={X1} />
        <Bar from={-R} to={(5 * PI) / 4} y={ROW.both} color={C.good} x0={X0} x1={X1} />
        <Label at={[X0, ROW.fg]} attach="ne" gap={11} color={C.violet}>f∘g exists</Label>
        <Label at={[X0, ROW.gf]} attach="ne" gap={11} color={C.f}>g∘f exists</Label>
        <Label at={[X0, ROW.both]} attach="ne" gap={11} color={C.good}>both exist</Label>
        <Label at={[-R, ROW.gf]} attach="w" gap={10} color={C.f}>−1/√2</Label>

        {/* The chosen x */}
        <Line.Segment point1={[x, 1.3]} point2={[x, ROW.both - 0.1]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={x} y={s} color={C.g} />
        <Label at={[x, 0]} attach="n" gap={15} italic color={both ? C.good : C.bad}>x</Label>
        <MovablePoint point={[x, 0]} onMove={pt => onX(pt[0])} constrain={pt => [clamp(pt[0], X0, Math.min(X1, X_MAX)), 0]} color={both ? C.good : C.bad} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x}
          onChange={onX}
          min={X0}
          max={Math.min(X1, X_MAX)}
          step={zoom ? 0.001 : 0.01}
          format={v => num(v, zoom ? 3 : 2)}
        />
        <Toggle label={zoom ? 'Zoom back out' : 'Zoom in on the gap'} checked={zoom} onChange={onZoom} />
        <Readouts>
          <Readout tex={`x = ${xTex}`} />
          <Readout
            color={fgOk ? C.violet : C.bad}
            tex={`\\sin(x) + \\tfrac{1}{\\sqrt2} = ${num(fgVal, 3)} ${fgOk ? '> 0 \\Rightarrow f\\circ g\\ \\checkmark' : '\\le 0 \\Rightarrow f\\circ g\\ \\times'}`}
          />
          <Readout
            color={gfOk ? C.f : C.bad}
            tex={`x + \\tfrac{1}{\\sqrt2} = ${num(gfVal, 3)} ${gfOk ? '> 0' : '\\le 0 \\Rightarrow g\\circ f\\ \\times'}`}
          />
          {gfOk && <Readout color={C.f} tex={`f(x) = ${num(Math.log(gfVal), 2)} < 5 \\Rightarrow g\\circ f\\ \\checkmark`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
