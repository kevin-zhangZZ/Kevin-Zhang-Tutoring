// 2017 Specialist Exam 1 Q1 — why dy/dx for 3xy² + 2y = x has to contain y as well as x. The
// curve is not a function of x: the vertical line x = 1 meets it at (1, −1) AND at (1, 1/3), and
// the tangents there have different gradients (1/2 and 1/6). Drag a point along the curve (drawn
// as x = 2y/(1 − 3y²), which IS a function of y) and the tangent follows, its gradient always
// dy/dx = (1 − 3y²)/(6xy + 2) evaluated at both coordinates of the point. A toggle shows the
// chain-rule slip on the first term (d/dx(y²) written as 2y): gradient (1 − 3y² − 6xy)/2, which is
// 2 at the question's point, and the red line cuts across the curve instead of touching it.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, num,
} from './kit'

type P2 = [number, number]

const xOf = (y: number) => (2 * y) / (1 - 3 * y * y)
const slope = (x: number, y: number) => (1 - 3 * y * y) / (6 * x * y + 2)
const noChain = (x: number, y: number) => (1 - 3 * y * y - 6 * x * y) / 2
const A = 1 / Math.sqrt(3) // horizontal asymptotes y = ±1/√3 split the curve into three branches

const XR: P2 = [-2, 4.4]
const YR: P2 = [-2.5, 1.5]
const P: P2 = [1, -1] // the question's point
const Q: P2 = [1, 1 / 3] // the other point on the curve with x = 1

// Dense samples of the visible curve, for snapping a dragged point onto it.
const SAMPLES: P2[] = []
for (let y = YR[0]; y <= YR[1]; y += 0.0005) {
  if (Math.abs(Math.abs(y) - A) < 0.004) continue
  const x = xOf(y)
  if (x >= XR[0] + 0.1 && x <= XR[1] - 0.15) SAMPLES.push([x, y])
}

const near = (a: P2, b: P2, tol: number) => Math.hypot(a[0] - b[0], a[1] - b[1]) < tol

function snap(p: P2): P2 {
  if (near(p, P, 0.12)) return P
  if (near(p, Q, 0.12)) return Q
  let best = SAMPLES[0]
  let bd = Infinity
  for (const s of SAMPLES) {
    const d = (s[0] - p[0]) ** 2 + (s[1] - p[1]) ** 2
    if (d < bd) {
      bd = d
      best = s
    }
  }
  return best
}

const signed = (v: number) => (v < 0 ? `- ${num(-v)}` : `+ ${num(v)}`)

export default function TwoTangents() {
  const [pt, setPt] = useState<P2>(P)
  const [wrong, setWrong] = useState(false)

  const [x, y] = pt
  const atP = near(pt, P, 1e-9)
  const atQ = near(pt, Q, 1e-9)
  const m = slope(x, y)
  const c = y - m * x
  const mw = noChain(x, y)

  const pointTex = atP ? 'P = (1,\\ -1)' : atQ ? 'P = \\left(1,\\ \\tfrac13\\right)' : `P = (${num(x)},\\ ${num(y)})`
  const slopeTex = atP
    ? '\\frac{dy}{dx} = \\frac{1-3(-1)^2}{6(1)(-1)+2} = \\frac{-2}{-4} = \\frac12'
    : atQ
      ? '\\frac{dy}{dx} = \\frac{1-3\\left(\\frac13\\right)^2}{6(1)\\left(\\frac13\\right)+2} = \\frac{2/3}{4} = \\frac16'
      : `\\frac{dy}{dx} = \\frac{1-3y^2}{6xy+2} = ${num(m)}`
  const tangentTex = atP
    ? '\\text{tangent: } y = \\tfrac12 x - \\tfrac32'
    : atQ
      ? '\\text{tangent: } y = \\tfrac16 x + \\tfrac16'
      : `\\text{tangent: } y = ${num(m)}x ${signed(c)}`

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Without the chain rule, <M>{'\\tfrac{d}{dx}(y^2)'}</M> is written as <M>2y</M> instead of{' '}
        <M>{'2y\\tfrac{dy}{dx}'}</M>, which leads to <M>{'\\tfrac{dy}{dx} = \\tfrac{1-3y^2-6xy}{2}'}</M>.
        {atP ? (
          <>
            {' '}At <M>(1,-1)</M> that is <M>2</M>, and the red line <M>y = 2x - 3</M> slices across the curve
            instead of touching it.
          </>
        ) : (
          <> Drag the point anywhere: the red line never lies along the curve.</>
        )}{' '}
        <M>y</M> changes as <M>x</M> changes, so every term containing <M>y</M> must pick up a{' '}
        <M>{'\\tfrac{dy}{dx}'}</M> when you differentiate it.
      </Notice>
    )
  } else if (atP) {
    notice = (
      <Notice tone="good">
        <b>This is the question&apos;s point.</b> Substituting <M>x = 1</M> and <M>y = -1</M> gives{' '}
        <M>{'\\tfrac{dy}{dx} = \\tfrac12'}</M>, and the orange tangent just touches the curve here. Now press{' '}
        &ldquo;Go to (1, 1/3)&rdquo;: the dashed line <M>x = 1</M> meets the curve a second time.
      </Notice>
    )
  } else if (atQ) {
    notice = (
      <Notice tone="good">
        <b>Same <M>x = 1</M>, a different point, a different gradient:</b> <M>{'\\tfrac16'}</M> here but{' '}
        <M>{'\\tfrac12'}</M> at <M>(1,-1)</M>. A gradient formula in <M>x</M> alone would have to give one
        answer at <M>x = 1</M>, so <M>{'\\tfrac{dy}{dx}'}</M> must contain <M>y</M> as well. That is why you
        substitute <b>both</b> coordinates of the point.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Drag the point along any of the three branches. Wherever it is, the tangent&apos;s gradient comes from
        putting that point&apos;s <M>x</M> <b>and</b> <M>y</M> into <M>{'\\tfrac{dy}{dx} = \\tfrac{1-3y^2}{6xy+2}'}</M>,
        and the tangent hugs the curve. Then turn on the chain-rule slip to see what goes wrong.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={XR} y={YR} xStep={1} yStep={1} height={430} minHeight={150} equalScale>
        <Line.Segment point1={[1, YR[0] - 0.3]} point2={[1, YR[1] + 0.3]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[1, 1.3]} color={C.guide} attach="e">x = 1</Label>
        <Plot.Parametric xy={t => [xOf(t), t]} domain={[-3.2, -0.615]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [xOf(t), t]} domain={[-0.54, 0.54]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [xOf(t), t]} domain={[0.615, 3.2]} color={C.f} weight={3} />
        <Label at={[3.5, -0.68]} color={C.f} attach="s">3xy² + 2y = x</Label>
        {wrong && <Line.PointSlope point={pt} slope={mw} color={C.bad} weight={2.5} />}
        <Line.PointSlope point={pt} slope={m} color={C.g} weight={2.5} />
        <Point x={P[0]} y={P[1]} color={C.ink} />
        <Point x={Q[0]} y={Q[1]} color={C.ink} />
        <Label at={P} attach="se" gap={13}>(1, −1)</Label>
        <Label at={Q} attach="ne" gap={14}>(1, 1/3)</Label>
        <MovablePoint point={pt} onMove={p => setPt(snap(p as P2))} constrain={p => snap(p as P2)} color={C.g} />
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="Go to (1, −1)" onClick={() => setPt(P)} />
          <ActionButton label="Go to (1, 1/3)" onClick={() => setPt(Q)} />
          <Toggle label="Forget the chain rule on y²" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout tex={pointTex} />
          <Readout color={C.g} tex={slopeTex} />
          <Readout color={C.g} tex={tangentTex} />
          {wrong && (
            <Readout
              color={C.bad}
              tex={`\\text{no chain rule: } \\frac{1-3y^2-6xy}{2} = ${atP ? '2' : atQ ? '-\\tfrac23' : num(mw)}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
