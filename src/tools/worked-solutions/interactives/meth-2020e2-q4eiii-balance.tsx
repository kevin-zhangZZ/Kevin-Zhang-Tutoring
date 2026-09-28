// 2020 Methods Exam 2 Q4e.iii — slide Q(n, f(n)) along f(x) = 2x·e^(1−x²) for 1 < n < 3 and watch
// the two shaded regions: A₁ between f and the chord y₁ from the origin (f on top, on [0, n]) and
// A₂ between the chord y₂ to (3, f(3)) and f (chord on top, on [n, 3]). As Q moves right A₁ grows
// and A₂ shrinks, so they balance exactly once: n = 1.08803…, both areas ≈ 0.90115 (checked with
// scipy; by hand A₁ = e − (1 + n²)e^(1−n²)). A toggle swaps A₂ for the report's triangle version,
// ½(3 − n)(f(n) − f(3)) − ∫ₙ³ f dx, which leaves out the strip (3 − n)·f(3) ≈ 0.0038 under the chord
// and moves the balance point to 1.08690… → 1.087, the report's wrong answer.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region,
  Slider, Toggle, clamp, num, type vec,
} from './kit'

const f = (x: number) => 2 * x * Math.exp(1 - x * x)
const F = (x: number) => -Math.exp(1 - x * x) // an antiderivative of f
const F3 = f(3) // 6e⁻⁸
const N_STAR = 1.0880326662492048
const N_TRI = 1.0869044528444618
const SNAP = 0.002

/** The left region: ∫₀ⁿ (f − y₁) dx = (F(n) − F(0)) − ½·n·f(n). */
const areaLeft = (n: number) => F(n) - F(0) - 0.5 * n * f(n)
/** The right region: ∫ₙ³ (y₂ − f) dx = trapezium under the chord − ∫ₙ³ f dx. */
const areaRight = (n: number) => 0.5 * (3 - n) * (f(n) + F3) - (F(3) - F(n))
/** The report's triangle version, which drops the strip (3 − n)·f(3). */
const areaRightTri = (n: number) => 0.5 * (3 - n) * (f(n) - F3) - (F(3) - F(n))

// Snap a drag to the nearest point of f with 1 ≤ x ≤ 2.95.
const SAMPLES = Array.from({ length: 1951 }, (_, i) => 1 + (1.95 * i) / 1950)
function nearestOnF([mx, my]: vec.Vector2): number {
  let best = 1.5
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = (x - mx) ** 2 + (f(x) - my) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-[12.5px] text-gray-700 dark:text-gray-300">
      <span className="w-6 flex-none font-semibold" style={{ color }}>{label}</span>
      <div className="flex-1 h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${Math.max(0, (100 * value) / max)}%`, background: color, opacity: 0.75 }} />
      </div>
      <span className="w-14 flex-none text-right tabular-nums font-display font-semibold">{value.toFixed(4)}</span>
    </div>
  )
}

export default function BalanceWidget() {
  const [n0, setN] = useState(1.5)
  const [tri, setTri] = useState(false)
  const target = tri ? N_TRI : N_STAR
  const n = Math.abs(n0 - target) < SNAP ? target : n0
  const balanced = n === target
  const fn = f(n)
  const y1 = (x: number) => (fn / n) * x
  const y2 = (x: number) => ((F3 - fn) / (3 - n)) * (x - 3) + F3
  const a1 = areaLeft(n)
  const a2 = tri ? areaRightTri(n) : areaRight(n)
  const diff = a1 - a2
  const max = Math.max(a1, a2, 0.01)

  let notice
  if (balanced && !tri) {
    notice = (
      <Notice tone="good">
        <b>Balanced: <M>{'A_1 = A_2 \\approx 0.9012'}</M> at <M>{'n \\approx 1.0880'}</M>, so <M>n = 1.088</M>.</b> Moving{' '}
        <M>Q</M> right makes the left region bigger (the chord from <M>O</M> dips under more of the hump) and the right
        region smaller, so there is exactly one balance point with <M>1 &lt; n &lt; 3</M>. Now turn on the triangle
        toggle.
      </Notice>
    )
  } else if (balanced && tri) {
    notice = (
      <Notice tone="warn">
        <b>With the triangle, the &ldquo;balance&rdquo; moves to <M>{'n \\approx 1.0869'}</M>, which rounds to 1.087</b>,
        the report&apos;s wrong answer. The chord ends at <M>{'(3, f(3))'}</M>, <M>{'6e^{-8}'}</M> above the axis, so the
        shape between the chord and the axis is a trapezium with parallel sides <M>f(n)</M> and <M>f(3)</M>. The
        triangle only reaches down to height <M>f(3)</M>, but <M>{'\\int_n^3 f(x)\\,dx'}</M> goes all the way down to the
        axis, so a strip of area <M>{`(3 - n)f(3) \\approx ${((3 - n) * F3).toFixed(4)}`}</M> is lost. Too thin to see, but enough to change
        the third decimal place.
      </Notice>
    )
  } else if (diff < 0) {
    notice = (
      <Notice>
        The right-hand region is bigger (<M>{`A_2 - A_1 \\approx ${(-diff).toFixed(4)}`}</M>).{' '}
        {tri ? 'The triangle toggle is on. ' : ''}Slide <M>Q</M> to the <b>right</b>: the chord from <M>O</M> drops
        further below the hump, so <M>{'A_1'}</M> grows while <M>{'A_2'}</M> shrinks.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The left-hand region is bigger (<M>{`A_1 - A_2 \\approx ${diff.toFixed(4)}`}</M>).{' '}
        {tri ? 'The triangle toggle is on. ' : ''}Slide <M>Q</M> to the <b>left</b>, towards the peak, to shrink{' '}
        <M>{'A_1'}</M> and grow <M>{'A_2'}</M>.
      </Notice>
    )
  }

  // Area labels inside each region.
  const l1: vec.Vector2 = [0.42 * n, (f(0.42 * n) + y1(0.42 * n)) / 2]
  const xr = n + 0.3 * (3 - n)
  const l2: vec.Vector2 = [xr, (y2(xr) + f(xr)) / 2]

  return (
    <div>
      <Plane x={[0, 3.1]} y={[0, 2.5]} xStep={1} yStep={1} height={300}>
        <Region top={f} bottom={y1} from={0} to={n} color={C.f} opacity={0.3} />
        <Region top={y2} bottom={f} from={n} to={3} color={C.g} opacity={0.3} />
        {tri && (
          <>
            {/* The shape under the chord: to the eye a triangle, really a trapezium. */}
            <Line.Segment point1={[n, fn]} point2={[n, 0]} color={C.bad} style="dashed" weight={1.5} />
            <Label at={[n, 0.35]} color={C.bad} attach="w" size={11}>f(n)</Label>
          </>
        )}
        <Plot.OfX y={f} domain={[0, 3]} color={C.f} weight={3} />
        <Line.Segment point1={[0, 0]} point2={[n, fn]} color={C.ink} weight={2} />
        <Line.Segment point1={[n, fn]} point2={[3, F3]} color={C.ink} weight={2} />
        <Point x={3} y={F3} color={C.ink} />
        <Label at={l1} color={C.f} attach="c">A₁</Label>
        <Label at={l2} color={C.g} attach="c">A₂</Label>
        <Label at={[n, fn]} color={balanced && !tri ? C.good : C.ink} attach="ne" gap={12}>Q</Label>
        <MovablePoint
          point={[n, fn]}
          onMove={p => setN(clamp(nearestOnF(p), 1, 2.95))}
          color={balanced ? (tri ? C.bad : C.good) : C.f}
        />
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={setN} min={1} max={2.95} step={0.0005} format={v => v.toFixed(4)} />
        <Buttons>
          <ActionButton label="Jump to the balance point" onClick={() => setN(target)} />
          <Toggle label="What if I use a triangle for the right-hand shape?" checked={tri} onChange={setTri} />
        </Buttons>
        <div className="flex flex-col gap-1.5">
          <Bar label="A₁" value={a1} max={max} color={C.f} />
          <Bar label="A₂" value={a2} max={max} color={tri ? C.bad : C.g} />
        </div>
        <Readouts>
          <Readout tex={`A_1 - A_2 \\approx ${num(diff, 4)}`} color={balanced ? (tri ? C.bad : C.good) : undefined} />
          {tri && <Readout color={C.bad} tex={`\\text{missing strip } (3-n)f(3) \\approx ${((3 - n) * F3).toFixed(4)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
