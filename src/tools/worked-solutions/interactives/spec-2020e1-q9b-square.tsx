// 2020 Specialist Exam 1 Q9b — why the square root in the arc-length integrand comes out. Write
// P = 1/(1 + t) and Q = 1/(4(1 − t)). Part a gives dy/dt = P − Q, so (dy/dt)² is a square of side
// P − Q (violet). And (dx/dt)² = 1/(1 − t²) is exactly 4PQ, since 4 · 1/(1 + t) · 1/(4(1 − t)) =
// 1/((1 + t)(1 − t)): four P × Q rectangles (orange). Built up in three steps, the rectangles
// pinwheel around the violet square and fill a square of side P + Q (green) with nothing left over:
// (P − Q)² + 4PQ = (P + Q)², so √((dx/dt)² + (dy/dt)²) = P + Q. The t slider runs over the
// question's interval 0 ≤ t ≤ 1/2 (where P > Q throughout), to show the fit holds for every t.

import { useEffect, useRef, useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Polygon, Slider, StepNav, num, prefersReducedMotion, useSteps, type vec } from './kit'

const Pf = (t: number) => 1 / (1 + t)
const Qf = (t: number) => 1 / (4 * (1 - t))

/** Bottom-left corner of the big square; the view is kept clear of x = 0 and y = 0 so no axes show. */
const O = 0.5
/** How far each rectangle stands out from its final place in step 2. */
const GAP = 0.12

function rect(x0: number, y0: number, w: number, h: number): vec.Vector2[] {
  return [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]]
}

function Swatch({ color, outline = false }: { color: string; outline?: boolean }) {
  return (
    <span
      className="inline-block flex-none w-3 h-3 rounded-[2px] mt-[3px]"
      style={outline ? { border: `2px solid ${color}` } : { background: color, opacity: 0.75 }}
    />
  )
}

function Row({ color, outline, tex, sub }: { color: string; outline?: boolean; tex: string; sub?: string }) {
  return (
    <div className="flex items-start gap-2">
      <Swatch color={color} outline={outline} />
      <div className="min-w-0">
        <M>{tex}</M>
        {sub && (
          <div className="text-[12px] text-gray-500 dark:text-gray-400">
            <M>{sub}</M>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PerfectSquare() {
  const steps = useSteps(3)
  const s = steps.step
  const [t, setT] = useState(0.2)

  // The rectangles slide into place when the student reaches step 3 (and back out on "Back").
  const target = s >= 2 ? 0 : GAP
  const [g, setG] = useState(target)
  const gRef = useRef(target)
  useEffect(() => {
    const from = gRef.current
    if (from === target) return
    if (prefersReducedMotion()) {
      gRef.current = target
      setG(target)
      return
    }
    const start = performance.now()
    let raf = 0
    const frame = (now: number) => {
      const k = Math.min(1, (now - start) / 700)
      const v = from + (target - from) * (1 - (1 - k) ** 3)
      gRef.current = v
      setG(v)
      if (k < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [target])

  const P = Pf(t)
  const Q = Qf(t)
  const S = P + Q
  const D = P - Q
  const dx2 = 1 / (1 - t * t)
  const dy2 = D * D

  // The pinwheel: each rectangle is P × Q, turned a quarter each time, pushed out by g.
  const R1 = rect(O, O - g, P, Q) // bottom
  const R2 = rect(O + P + g, O, Q, P) // right
  const R3 = rect(O + Q, O + P + g, P, Q) // top
  const R4 = rect(O - g, O + Q, Q, P) // left
  const centres: vec.Vector2[] = [
    [O + P / 2, O - g + Q / 2],
    [O + P + g + Q / 2, O + P / 2],
    [O + Q + P / 2, O + P + g + Q / 2],
    [O - g + Q / 2, O + Q + P / 2],
  ]
  const inner = rect(O + Q, O + Q, D, D)
  const settled = s === 2 && g < 0.005

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        <b><M>{'\\left(\\tfrac{dy}{dt}\\right)^2'}</M> is a square.</b> Write <M>{'{P = \\tfrac{1}{1+t}}'}</M> and{' '}
        <M>{'{Q = \\tfrac{1}{4(1-t)}}'}</M>. Part a gave <M>{'{\\tfrac{dy}{dt} = P - Q}'}</M>, so{' '}
        <M>{'\\left(\\tfrac{dy}{dt}\\right)^2'}</M> is the area of the violet square with side <M>P - Q</M>. Expanded,
        that area is <M>{'P^2 - 2PQ + Q^2'}</M>, with a minus in the middle. The arc length needs the square root of{' '}
        <M>{'\\left(\\tfrac{dx}{dt}\\right)^2 + \\left(\\tfrac{dy}{dt}\\right)^2'}</M>. So what does adding{' '}
        <M>{'\\left(\\tfrac{dx}{dt}\\right)^2'}</M> do to this square? Press Next.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        <b><M>{'\\left(\\tfrac{dx}{dt}\\right)^2'}</M> is four <M>P \times Q</M> rectangles.</b> Each orange rectangle
        is <M>P</M> by <M>Q</M>, so the four of them have area{' '}
        <M>{'{4PQ = 4\\cdot\\tfrac{1}{1+t}\\cdot\\tfrac{1}{4(1-t)} = \\tfrac{1}{(1+t)(1-t)} = \\tfrac{1}{1-t^2}}'}</M>. That
        is exactly <M>{'\\left(\\tfrac{dx}{dt}\\right)^2'}</M> (check the two numbers beside the picture). The question
        was built so that this happens. Press Next to fit the pieces together.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Together they fill one square, of side <M>P + Q</M>.</b> Around the violet square, the four rectangles close
        up with no gap and no overlap. Read the bottom edge: <M>P</M>, then <M>Q</M>. So{' '}
        <M>{'{\\left(\\tfrac{dx}{dt}\\right)^2 + \\left(\\tfrac{dy}{dt}\\right)^2 = (P + Q)^2}'}</M>. In the algebra, the{' '}
        <M>+4PQ</M> turns the middle term <M>-2PQ</M> into <M>+2PQ</M>. The square root of the whole area is the
        side, <M>{'{P + Q = \\tfrac{1}{1+t} + \\tfrac{1}{4(1-t)}}'}</M>, and that is what you integrate. Slide{' '}
        <M>t</M>: the pieces change shape, but they fit for every <M>t</M> from <M>0</M> to <M>{'\\tfrac12'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
        <div className="w-full sm:w-[300px] flex-none">
          <Plane x={[0.3, 1.9]} y={[0.3, 1.9]} xStep={0.25} yStep={0.25} equalScale height={300} labels={false} xLabel="" yLabel="">
            <Polygon points={inner} color={C.violet} fillOpacity={0.4} weight={2} />
            {s >= 1 &&
              [R1, R2, R3, R4].map((r, i) => <Polygon key={i} points={r} color={C.g} fillOpacity={0.3} weight={1.5} />)}
            {s >= 1 && centres.map((c, i) => <Label key={i} at={c} attach="c" color={C.g} size={12}>PQ</Label>)}
            {/* The frame the pieces fill: dashed while they slide in, solid once they are in place. */}
            {s >= 2 && (
              <Polygon points={rect(O, O, S, S)} color={C.good} fillOpacity={0} weight={3} strokeStyle={settled ? 'solid' : 'dashed'} />
            )}

            {/* Side lengths. Step 1: the violet square's side. Steps 2–3: the bottom rectangle's
                sides (and in step 3 the whole bottom and left edges, P then Q). */}
            {s === 0 && <Label at={[O + Q + D / 2, O + Q]} attach="s" color={C.violet}>P − Q</Label>}
            {s >= 1 && D >= 0.3 && <Label at={[O + Q + D / 2, O + Q + D / 2]} attach="c" color={C.violet} size={12}>P − Q</Label>}
            {s >= 1 && <Label at={[O + P / 2, O - g]} attach="s">P</Label>}
            {s >= 1 && <Label at={[O, O - g + Q / 2]} attach="w">Q</Label>}
            {s >= 2 && <Label at={[O + P + g + Q / 2, O]} attach="s">Q</Label>}
            {s >= 2 && <Label at={[O - g, O + Q + P / 2]} attach="w">P</Label>}
            {s >= 2 && <Label at={[O + S / 2, O + S + g]} attach="n" color={C.good}>side P + Q</Label>}
          </Plane>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-2 text-[13px] text-gray-700 dark:text-gray-300">
          <div className="flex flex-col gap-0.5 text-[12.5px] text-gray-500 dark:text-gray-400">
            <span>
              At <M>{`t = ${num(t)}`}</M>:
            </span>
            <M>{`P = \\tfrac{1}{1+t} \\approx ${num(P, 3)}`}</M>
            <M>{`Q = \\tfrac{1}{4(1-t)} \\approx ${num(Q, 3)}`}</M>
          </div>
          <Row color={C.violet} tex={`\\left(\\tfrac{dy}{dt}\\right)^2 = (P-Q)^2 \\approx ${num(dy2, 3)}`} />
          {s >= 1 && (
            <Row
              color={C.g}
              tex={`\\left(\\tfrac{dx}{dt}\\right)^2 = \\tfrac{1}{1-t^2} \\approx ${num(dx2, 3)}`}
              sub={`4PQ \\approx 4 \\times ${num(P * Q, 3)} = ${num(4 * P * Q, 3)}`}
            />
          )}
          {s >= 2 && (
            <Row
              color={C.good}
              outline
              tex={`\\left(\\tfrac{dx}{dt}\\right)^2 + \\left(\\tfrac{dy}{dt}\\right)^2 \\approx ${num(dx2 + dy2, 3)}`}
              sub={`(P+Q)^2 \\approx ${num(S, 3)}^2 = ${num(S * S, 3)}`}
            />
          )}
        </div>
      </div>
      <Controls>
        <StepNav step={s} count={3} onBack={steps.back} onNext={steps.next} />
        <Slider label="t" value={t} onChange={setT} min={0} max={0.5} step={0.01} />
        {notice}
      </Controls>
    </div>
  )
}
