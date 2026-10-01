// 2021 Methods Exam 2 MCQ 19 — meeting at the join is not the same as being smooth there. Pick any
// option A–E: the left piece (x < 0) is blue, the right piece is orange, and each piece's tangent at
// x = 0 is drawn dashed right across the view. A zoom slider (×1 to ×100) magnifies about the join
// (0, f(0)) — (0, 0) for B, where f(0) is undefined. D (20% of students) and A are continuous but
// their tangents differ (2 vs 4, 1 vs −1), so the corner keeps the same angle at every zoom; C jumps
// (left piece → 4, f(0) = 1); B has a hole; only E (gradient 4 on both sides) straightens into a
// single line. Opens on D at ×1.

import { useState } from 'react'
import { Buttons, C, Controls, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

type Key = 'A' | 'B' | 'C' | 'D' | 'E'
type Opt = {
  L: (x: number) => number
  R: (x: number) => number
  Ltex: string
  Rtex: string
  /** Gradient of each piece at x = 0. */
  mL: number
  mR: number
  /** Whether x = 0 is in the domain (it is in the right piece for every option except B). */
  defined: boolean
}

const sq = (x: number) => (2 * x + 1) ** 2
const OPTS: Record<Key, Opt> = {
  A: { L: x => x, R: x => -x, Ltex: 'x', Rtex: '-x', mL: 1, mR: -1, defined: true },
  B: { L: x => x, R: x => -x, Ltex: 'x', Rtex: '-x', mL: 1, mR: -1, defined: false },
  C: { L: x => 8 * x + 4, R: sq, Ltex: '8x+4', Rtex: '(2x+1)^2', mL: 8, mR: 4, defined: true },
  D: { L: x => 2 * x + 1, R: sq, Ltex: '2x+1', Rtex: '(2x+1)^2', mL: 2, mR: 4, defined: true },
  E: { L: x => 4 * x + 1, R: sq, Ltex: '4x+1', Rtex: '(2x+1)^2', mL: 4, mR: 4, defined: true },
}
const KEYS: Key[] = ['A', 'B', 'C', 'D', 'E']

// The ×1 view is x in [−HX, HX], y within HY of the join; zooming shrinks both towards the join.
const HX = 1.5
const HY = 3.5

/** A 1–2–5 step giving about four grid lines across `span`. */
function niceStep(span: number): number {
  const raw = span / 4
  const p = 10 ** Math.floor(Math.log10(raw))
  const m = raw / p
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p
}

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

export default function JoinZoom() {
  const [key, setKey] = useState<Key>('D')
  const [s, setS] = useState(0) // log10 of the magnification
  const o = OPTS[key]
  const z = 10 ** s
  const zoomed = z >= 5

  const L0 = o.L(0)
  const R0 = o.R(0)
  const y0 = R0 // the join is centred; for B this is the hole at (0, 0)
  const x: [number, number] = [-HX / z, HX / z]
  const y: [number, number] = [y0 - HY / z, y0 + HY / z]
  const xStep = niceStep(x[1] - x[0])
  const yStep = niceStep(y[1] - y[0])
  const dp = Math.max(0, -Math.floor(Math.log10(xStep) + 1e-9))
  const fmt = (v: number) => (Math.abs(v - y0) < yStep / 2 || Math.abs(v - L0) < yStep / 2 ? '' : v.toFixed(dp))

  const continuous = o.defined && L0 === R0
  const same = o.mL === o.mR
  const smooth = continuous && same

  let notice
  if (key === 'B') {
    notice = (
      <Notice tone="warn">
        The same graph as A, but neither piece includes <M>x = 0</M> (the right piece is only <M>{'x > 0'}</M>), so
        there is a hole at the origin and <M>f(0)</M> doesn&apos;t exist. A function can&apos;t be differentiable at
        an <M>x</M>-value where it isn&apos;t even defined, so B fails at <M>x = 0</M>. Zoom in: the hole never fills.
      </Notice>
    )
  } else if (key === 'C') {
    notice = (
      <Notice tone="warn">
        A <b>jump</b>: as <M>{'x \\to 0^-'}</M>, <M>8x + 4</M> heads to <M>4</M>, but{' '}
        <M>{'f(0) = (2(0)+1)^2 = 1'}</M>. The graph is broken at <M>x = 0</M>, so it is not continuous and can&apos;t be
        differentiable there. {z > 5.2 ? 'Zoomed in, the left piece has left the screen altogether.' : 'Zoom in and watch the left piece leave the screen.'}{' '}
        (<M>8x + 4</M> is the <em>derivative</em> of <M>{'(2x+1)^2'}</M>, not a piece that meets it.)
      </Notice>
    )
  } else if (smooth) {
    notice = zoomed ? (
      <Notice tone="good">
        At <M>{`\\times${Math.round(z)}`}</M> the join has disappeared: the graph looks like one straight line of
        gradient <M>4</M> through <M>(0, 1)</M>. That is what differentiable at <M>x = 0</M> looks like, and E is the
        only option that does it. Compare D at the same zoom.
      </Notice>
    ) : (
      <Notice tone="good">
        The pieces meet at <M>(0, 1)</M> <em>and</em> both have gradient <M>4</M> there, so the two dashed tangents are
        the same green line. Zoom in: the blue and orange pieces blend into one straight line.
      </Notice>
    )
  } else {
    const peak = key === 'A'
    notice = zoomed ? (
      <Notice tone="warn">
        Still a corner at <M>{`\\times${Math.round(z)}`}</M>, with exactly the same angle as at <M>{'\\times1'}</M>. A
        smooth curve straightens into one line when you zoom in; this one never will, because the gradients either side
        of <M>x = 0</M> are <M>{String(o.mL)}</M> and <M>{String(o.mR)}</M>. Continuous, but not differentiable.
        {peak ? '' : ' Now try E.'}
      </Notice>
    ) : (
      <Notice>
        The pieces do meet at <M>{peak ? '(0, 0)' : '(0, 1)'}</M>, so {key} is continuous. That is only the first
        test: the left piece arrives with gradient <M>{String(o.mL)}</M> and the right piece leaves with
        gradient <M>{String(o.mR)}</M>, so the dashed tangents point in different directions.
        {peak && <> (This is a sharp peak, the graph of <M>{'y=-|x|'}</M>.)</>} Drag the zoom slider and see whether
        the corner smooths out.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={x} y={y} xStep={xStep} yStep={yStep} height={290} xLabels={v => v.toFixed(dp)} yLabels={fmt}>
        {smooth ? (
          <Line.PointSlope point={[0, R0]} slope={o.mR} color={C.good} style="dashed" weight={2} />
        ) : (
          <>
            <Line.PointSlope point={[0, L0]} slope={o.mL} color={C.f} style="dashed" weight={1.5} />
            <Line.PointSlope point={[0, R0]} slope={o.mR} color={C.g} style="dashed" weight={1.5} />
          </>
        )}
        <Plot.OfX y={o.L} domain={[x[0], 0]} color={C.f} weight={3.5} />
        <Plot.OfX y={o.R} domain={[0, x[1]]} color={C.g} weight={3.5} />
        <OpenPoint x={0} y={L0} color={C.f} />
        {o.defined ? <Point x={0} y={R0} color={C.g} /> : <OpenPoint x={0} y={R0} color={C.g} />}
      </Plane>
      <Controls>
        <Buttons>
          {KEYS.map(k => (
            <Toggle key={k} label={`Option ${k}`} checked={key === k} onChange={() => setKey(k)} />
          ))}
        </Buttons>
        <Slider label="\text{zoom}" value={s} onChange={setS} min={0} max={2} step={0.01} format={v => `×${Math.round(10 ** v)}`} />
        <Readouts>
          <Readout color={C.f} tex={`x<0:\\ y=${o.Ltex}`} />
          <Readout color={C.g} tex={`${o.defined ? 'x\\ge0' : 'x>0'}:\\ y=${o.Rtex}`} />
          <Readout
            color={continuous ? C.good : C.bad}
            tex={
              o.defined
                ? `\\text{left} \\to ${L0},\\ f(0)=${R0}\\ ${continuous ? '\\checkmark' : '\\times'}`
                : `f(0)\\ \\text{undefined}\\ \\times`
            }
          />
          <Readout color={same ? C.good : C.bad} tex={`\\text{gradients: } ${o.mL}\\ \\text{and}\\ ${o.mR}\\ ${same ? '\\checkmark' : '\\times'}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
