// 2017 Specialist Exam 2 MCQ 8 — "the gradient is increasing" is a statement about f′, not f.
// Top: f(x) = x³ − mx² + 4 with a draggable point P and its tangent. Bottom: the gradient
// function f′(x) = 3x² − 2mx, whose height at x is the tangent's slope above it. The green band
// x ≥ m/3 is where f′ climbs (f″ = 6x − 2m ≥ 0). The default state puts P between m/3 and 2m/3,
// where f is still going DOWNHILL but its slope is getting less negative — the stretch that
// option D (x ≥ 2m/3, the right-hand piece of where f′ ≥ 0; 52% of students) leaves out. A toggle
// shades where f′ ≥ 0. Moving the m slider carries P along with the vertex x = m/3, so it stays on
// screen and keeps its place relative to the green band.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, clamp, num } from './kit'

const X0 = -2.5
const X1 = 3.5
const TOP: [number, number] = [-2, 10]
const BOT: [number, number] = [-4, 10]

const fOf = (m: number) => (t: number) => t ** 3 - m * t * t + 4
const fpOf = (m: number) => (t: number) => 3 * t * t - 2 * m * t
/** P and its gradient dot are both inside their planes. */
function visible(t: number, m: number) {
  const ft = fOf(m)(t)
  const gt = fpOf(m)(t)
  return ft >= TOP[0] && ft <= TOP[1] && gt >= BOT[0] && gt <= BOT[1]
}
/** Where P goes when m changes: the same distance from the vertex x = m/3 as before, pulled in
 *  towards the vertex (which is always on screen) if that would leave either plane. */
function placeP(xTry: number, m: number): number {
  const v = m / 3
  let t = clamp(xTry, X0 + 0.05, X1 - 0.05)
  for (let i = 0; i < 200 && !visible(t, m); i++) t = v + (t - v) * 0.95
  return visible(t, m) ? t : v
}

export default function Gradient() {
  const [m, setM] = useState(3)
  const [x, setX] = useState(1.5)
  const [showD, setShowD] = useState(false)

  const f = fOf(m)
  const fp = fpOf(m)
  const fpp = (t: number) => 6 * t - 2 * m
  const v = m / 3
  const r = (2 * m) / 3
  const y = f(x)
  const slope = fp(x)

  // Snap the dragged point to the nearest visible point of f, measuring distance in plane
  // proportions (the two axes have different scales).
  function nearestOnF([mx, my]: [number, number]): number {
    let best = x
    let bestD = Infinity
    for (let i = 0; i <= 600; i++) {
      const t = X0 + 0.05 + ((X1 - X0 - 0.1) * i) / 600
      if (!visible(t, m)) continue
      const ft = f(t)
      const d = ((t - mx) / (X1 - X0)) ** 2 + ((ft - my) / (TOP[1] - TOP[0])) ** 2
      if (d < bestD) {
        bestD = d
        best = t
      }
    }
    return best
  }

  const nearVertex = Math.abs(x - v) < 0.06
  const fInc = slope > 1e-9
  const gradInc = fpp(x) > 0
  // Where f′ < 0 but rising: from m/3 up to the larger zero of f′.
  const gapEnd = Math.max(0, r)

  let notice
  if (nearVertex) {
    notice = (
      <Notice tone="good">
        <b>This is <M>x = \tfrac m3</M>, the bottom of the <M>f'</M> parabola</b> (green dot){m !== 0 && <>, where <M>f</M> is
        going downhill most steeply</>}. From here on, <M>f'</M> only climbs: that is exactly <M>f''(x) = 6x - 2m \ge 0</M>, or{' '}
        <M>x \ge \tfrac m3</M>. Now drag P to the right.
      </Notice>
    )
  } else if (gradInc && !fInc) {
    notice = (
      <Notice tone="warn">
        {/* Only for m > 0 does option D leave this stretch out; for m < 0, D's x ≥ 2m/3 covers it. */}
        <b>{m > 0 ? 'The stretch most students missed.' : 'Downhill, but the gradient is increasing.'}</b> Here <M>f</M> is
        going <b>downhill</b>: the gradient is{' '}
        <M>{`f'(x) = ${num(slope)}`}</M>, negative, so <M>f</M> is decreasing. But drag P to the right and watch the
        gradient: it rises towards <M>0</M> (the orange curve below climbs). A gradient going from{' '}
        <M>{`${num(-(m * m) / 3)}`}</M> up to <M>0</M> <i>is increasing</i>. So{' '}
        <M>{`${num(v)} \\le x < ${gapEnd === 0 ? '0' : num(gapEnd)}`}</M> belongs in the answer
        {m > 0 ? (
          <>
            , and option D&apos;s <M>{'x \\ge \\tfrac{2m}{3}'}</M> leaves it out.
          </>
        ) : (
          '.'
        )}
      </Notice>
    )
  } else if (gradInc && fInc) {
    notice = (
      <Notice>
        Uphill and getting steeper: the tangent&apos;s gradient <M>{`${num(slope)}`}</M> is positive <i>and</i> growing as P
        moves right. Both <M>f</M> and its gradient are increasing here. Now drag P left, past the green dot, and watch the
        gradient start to fall.
      </Notice>
    )
  } else if (fInc) {
    notice = (
      <Notice tone="warn">
        <b>Careful:</b> <M>f</M> is going <b>uphill</b> here (<M>{`f'(x) = ${num(slope)} > 0`}</M>), so <M>f</M> is
        increasing. But as P moves right the tangent gets <i>flatter</i>, and the orange curve below falls. The gradient is
        decreasing. So &ldquo;<M>f</M> is increasing&rdquo; and &ldquo;the gradient of <M>f</M> is increasing&rdquo; are
        different questions.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Downhill and getting steeper: the gradient <M>{`${num(slope)}`}</M> is negative and still falling (the orange curve
        below is going down). The gradient is decreasing here. Drag P to the right until the orange curve turns around.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
        <span style={{ color: C.f }}>y = f(x)</span> and its tangent at P
      </p>
      {/* y-ticks every 3: every f passes through (0, 4), which would sit on a "4" tick. */}
      <Plane x={[X0, X1]} y={TOP} xStep={1} yStep={3} height={240}>
        {showD && (
          <>
            <Region top={() => TOP[1]} bottom={() => TOP[0]} from={X0} to={Math.min(0, r)} color={C.g} opacity={0.14} />
            <Region top={() => TOP[1]} bottom={() => TOP[0]} from={Math.max(0, r)} to={X1} color={C.g} opacity={0.14} />
          </>
        )}
        <Region top={() => TOP[1]} bottom={() => TOP[0]} from={v} to={X1} color={C.good} opacity={0.1} />
        <Plot.OfX y={f} color={C.f} weight={3} />
        <Line.PointSlope point={[x, y]} slope={slope} color={C.g} weight={2} />
        {/* mafs's Text attach is vertically inverted ('s' draws above the anchor), hence 'sw'/'se'. */}
        <Line.Segment point1={[x, TOP[0]]} point2={[x, TOP[1]]} color={C.guide} style="dashed" weight={1} />
        <Label at={[x, y]} color={C.f} attach={slope > 0 ? 'nw' : 'ne'}>P</Label>
        <MovablePoint point={[x, y]} onMove={p => setX(clamp(nearestOnF(p), X0 + 0.05, X1 - 0.05))} color={C.f} />
      </Plane>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mt-3 mb-1">
        <span style={{ color: C.g }}>y = f′(x)</span>, the gradient of f
      </p>
      <Plane x={[X0, X1]} y={BOT} xStep={1} yStep={3} height={200}>
        <Region top={() => BOT[1]} bottom={() => BOT[0]} from={v} to={X1} color={C.good} opacity={0.1} />
        <Label at={[X1 - 0.05, BOT[0] + 0.2]} color={C.good} attach="w" size={12}>f′ increasing</Label>
        <Plot.OfX y={fp} color={C.g} weight={3} />
        <Line.Segment point1={[x, BOT[0]]} point2={[x, BOT[1]]} color={C.guide} style="dashed" weight={1} />
        <Point x={v} y={fp(v)} color={C.good} />
        <Point x={x} y={slope} color={C.g} />
      </Plane>
      <Controls>
        <Slider
          label="m"
          value={m}
          onChange={next => {
            setX(placeP(x + (next - m) / 3, next))
            setM(next)
          }}
          min={-3}
          max={3}
          step={0.1}
          format={t => num(t, 1)}
        />
        <Toggle label="Shade where f is increasing (option D's idea)" checked={showD} onChange={setShowD} />
        <Readouts>
          <Readout color={C.f} tex={`x = ${num(x)}`} />
          <Readout color={C.g} tex={`\\text{gradient } f'(x) = ${num(slope)}`} />
          <Readout color={C.good} tex={`\\tfrac m3 = ${num(v)}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Drag P along the curve. The height of the orange curve below is the gradient of the orange tangent above.
        </p>
        {notice}
        {showD && (
          <Notice>
            Orange shading: where <M>f'(x) \ge 0</M>, i.e. where <M>f</M> is <i>increasing</i>. That is the answer to a
            different question. {m > 0 ? (
              <>For <M>m &gt; 0</M> it is <M>x \le 0</M> or <M>{'x \\ge \\tfrac{2m}{3}'}</M>, which is where option D comes from.</>
            ) : m < 0 ? (
              <>For <M>m &lt; 0</M> it is <M>{'x \\le \\tfrac{2m}{3}'}</M> or <M>x \ge 0</M>.</>
            ) : (
              <>For <M>m = 0</M> it is every <M>x</M>.</>
            )}{' '}
            The green band, where the gradient increases, starts earlier: at <M>x = \tfrac m3</M>, halfway between the zeros{' '}
            <M>0</M> and <M>{'\\tfrac{2m}{3}'}</M> of <M>f'</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
