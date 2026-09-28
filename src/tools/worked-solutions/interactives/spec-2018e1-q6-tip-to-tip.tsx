// 2018 Specialist Exam 1 Q6 — the change in momentum is final minus initial, drawn tip to tip.
// The momentum is p(t) = 2ṙ(t) = 2cos(t) i − 2sin(t) j + 4t k. Looking down on the i–j plane, its
// horizontal part swings clockwise round a circle of radius 2 (cos t and sin t are unit-circle
// coordinates), while its k-part grows along a number line. Slide the end time t from π/2: the
// green arrow from the start tip (orange) to the current tip (blue) is Δp, and at t = π it is
// −2i + 2j (with 2πk from the k-line). A toggle shows the scalar idea failing: the horizontal
// arrows never change length, yet the momentum clearly changed.

import { useState } from 'react'
import { type Attach, C, Circle, Controls, Label, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, M, tick } from './kit'

const PI = Math.PI
const STEP = PI / 24
const I = '\\underset{\\sim}{i}'
const J = '\\underset{\\sim}{j}'
const K = '\\underset{\\sim}{k}'
const P = '\\underset{\\sim}{p}'

type Comp = { v: number; abs: string }

/** "2i − 2j + 2πk" from signed components; zero components are left out. */
function vecTex(parts: [Comp, string][], approx: boolean): string {
  let s = ''
  for (const [c, unit] of parts) {
    if (Math.abs(c.v) < 1e-9 || (approx && Math.abs(c.v) < 0.005)) continue
    const sign = c.v < 0 ? '-' : '+'
    s += s === '' ? (sign === '-' ? '-' : '') : ` ${sign} `
    s += `${c.abs}\\,${unit}`
  }
  return s === '' ? '\\underset{\\sim}{0}' : s
}

/** Exact |value| for 2cos t or 2sin t at a multiple of π/4. */
function exactTrig(v: number): string {
  const a = Math.abs(v)
  if (Math.abs(a - 2) < 1e-9) return '2'
  if (Math.abs(a - Math.SQRT2) < 1e-9) return '\\sqrt2'
  return '0'
}

/** |m|π for an integer m. */
function piTex(m: number): string {
  const a = Math.abs(m)
  return a === 1 ? '\\pi' : `${a}\\pi`
}

/** The slider value n (t = nπ/24) as a fraction of π. */
function fmtT(n: number): string {
  const g = (a: number, b: number): number => (b === 0 ? a : g(b, a % b))
  const d = g(n, 24)
  const num = n / d
  const den = 24 / d
  const top = num === 1 ? 'π' : `${num}π`
  return den === 1 ? top : `${top}/${den}`
}

function outward(x: number, y: number): Attach {
  const dirs: Attach[] = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se']
  const k = Math.round(Math.atan2(y, x) / (PI / 4))
  return dirs[((k % 8) + 8) % 8]
}

export default function TipToTip() {
  const [n, setN] = useState(24)
  const [sizes, setSizes] = useState(false)

  const t = n * STEP
  const exact = n % 6 === 0
  const px = 2 * Math.cos(t)
  const py = -2 * Math.sin(t)
  const pk = 4 * t
  const p0: [number, number] = [0, -2]
  const dx = px - p0[0]
  const dy = py - p0[1]
  const dk = pk - 2 * PI
  const hLen = Math.hypot(dx, dy)

  const comp = (v: number, kind: 'trig' | 'pi'): Comp => ({
    v,
    abs: exact ? (kind === 'trig' ? exactTrig(v) : piTex(Math.round(v / PI))) : Math.abs(v).toFixed(2),
  })
  const rel = exact ? '=' : '\\approx'
  const pTex = vecTex([[comp(px, 'trig'), I], [comp(py, 'trig'), J], [comp(pk, 'pi'), K]], !exact)
  // Δp's j-part is 2 − 2sin t: exact values 0, 2, 4 or 2 ∓ √2 at multiples of π/4.
  const sin = Math.sin(t)
  const dyAbs = Math.abs(sin) < 1e-9 ? '2' : Math.abs(sin - 1) < 1e-9 ? '0' : Math.abs(sin + 1) < 1e-9 ? '4' : sin > 0 ? '(2-\\sqrt2)' : '(2+\\sqrt2)'
  const dTex = vecTex(
    [[comp(dx, 'trig'), I], [{ v: dy, abs: exact ? dyAbs : Math.abs(dy).toFixed(2) }, J], [comp(dk, 'pi'), K]],
    !exact,
  )

  const atStart = n === 12
  const atKey = n === 24
  const speedDiff = 2 * Math.sqrt(1 + 4 * t * t) - 2 * Math.sqrt(1 + PI * PI)
  const dLen = Math.hypot(dx, dy, dk)

  // Where to put the Δp label: beside the middle of the green arrow, away from the origin.
  const mid: [number, number] = [p0[0] + dx / 2, p0[1] + dy / 2]
  const midNearO = Math.hypot(mid[0], mid[1]) < 0.3
  const dAt: [number, number] = midNearO ? [p0[0] + 0.3 * dx, p0[1] + 0.3 * dy] : mid
  const dAttach: Attach = midNearO ? 'e' : outward(mid[0], mid[1])

  let notice
  if (sizes && !atStart) {
    notice = (
      <Notice tone="warn">
        Both horizontal arrows are exactly <M>2</M> long at every <M>t</M>: the particle&apos;s horizontal speed never
        changes. So comparing sizes says nothing happened horizontally, yet the green arrow is{' '}
        <M>{hLen.toFixed(2)}</M> long. The momentum <b>turned</b>, and turning is a change. A single number
        throws that direction away, and the two red numbers don&apos;t even agree: the change in size is not the size
        of the change. The answer must be the vector.
      </Notice>
    )
  } else if (atStart) {
    notice = (
      <Notice>
        At <M>{'t = \\tfrac{\\pi}{2}'}</M> the start and the end are the same moment, so nothing has changed yet:{' '}
        <M>{`\\Delta${P} = \\underset{\\sim}{0}`}</M>. Drag <M>t</M> towards <M>\pi</M> and watch the blue arrow swing
        clockwise while the green arrow grows out of the orange tip.
      </Notice>
    )
  } else if (atKey) {
    notice = (
      <Notice tone="good">
        <b>This is the question&apos;s end time.</b> Horizontally the momentum turned from <M>{`-2${J}`}</M> (straight
        down) to <M>{`-2${I}`}</M> (straight left). The green arrow joins the old tip to the new tip: <M>2</M> left and{' '}
        <M>2</M> up, so <M>{`-2${I} + 2${J}`}</M>. On the <M>{K}</M>-line, <M>2\pi</M> grew to <M>4\pi</M>, a change
        of <M>{'2\\pi.'}</M> Now turn on &ldquo;Only the size matters?&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The blue tip is <M>{'(2\\cos t,\\ -2\\sin t)'}</M>, so it runs clockwise round a circle of radius <M>2</M>. The
        change is always the green arrow from the start tip (orange) to the current tip (blue): orange + green = blue,
        which is <M>{`\\Delta${P} = ${P}(t) - ${P}\\left(\\tfrac{\\pi}{2}\\right)`}</M>. Stop at <M>t = \pi</M>.
      </Notice>
    )
  }

  const tipAttach = outward(px, py)
  const caption = 'text-[12px] text-gray-500 dark:text-gray-400 mb-1'

  return (
    <div>
      <p className={caption}>Looking down on the i–j plane (the k-part is out of the screen)</p>
      <Plane x={[-2.6, 2.6]} y={[-2.6, 2.6]} equalScale height={340} xLabel="i" yLabel="j" labels={v => (Math.abs(v) > 2.5 || v < -1.5 ? '' : tick(v))}>
        <Circle center={[0, 0]} radius={2} color={sizes ? C.bad : C.guide} fillOpacity={0} strokeOpacity={sizes ? 0.9 : 0.5} strokeStyle="dashed" weight={sizes ? 2 : 1} />
        {sizes && (
          <Label at={px > 0.1 ? [-1.6, 1.2] : [1.6, 1.2]} attach={px > 0.1 ? 'e' : 'w'} color={C.bad}>
            length 2
          </Label>
        )}
        {n > 12 && <Plot.Parametric xy={s => [2 * Math.cos(s), -2 * Math.sin(s)]} domain={[PI / 2, t]} color={C.f} weight={2} style="dashed" />}
        <Vector tail={[0, 0]} tip={p0} color={C.g} weight={3} />
        <Vector tail={[0, 0]} tip={[px, py]} color={C.f} weight={3} />
        {n > 12 && <Vector tail={p0} tip={[px, py]} color={C.good} weight={3.5} />}
        <Point x={0} y={-2} color={C.g} />
        <Label at={p0} attach={n === 12 ? 'se' : 's'} color={C.g}>
          p(π/2)
        </Label>
        {n > 12 && (
          <Label at={[px, py]} attach={tipAttach} color={C.f}>
            p(t)
          </Label>
        )}
        {n > 12 && (
          <Label at={dAt} attach={dAttach} color={C.good}>
            Δp
          </Label>
        )}
      </Plane>

      <p className={`${caption} mt-3`}>The k-direction on its own: a number line</p>
      <Plane x={[0, 8.8 * PI]} y={[-1, 1]} xStep={2 * PI} yStep={1} height={100} labels={false} xLabel="k" yLabel="">
        {n > 12 && <Vector tail={[2 * PI, 0.5]} tip={[pk, 0.5]} color={C.good} weight={3} />}
        {n > 12 && (
          <Label at={[(2 * PI + pk) / 2, 0.5]} attach="n" color={C.good}>
            {exact ? `Δ = ${Math.round(dk / PI) === 1 ? '' : Math.round(dk / PI)}π` : `Δ ≈ ${dk.toFixed(2)}`}
          </Label>
        )}
        <Point x={2 * PI} y={0} color={C.g} />
        <Point x={pk} y={0} color={C.f} />
        <Label at={[2 * PI, 0]} attach="sw" color={C.g}>
          2π
        </Label>
        {n > 12 && (
          <Label at={[pk, 0]} attach="se" color={C.f}>
            {exact ? `${Math.round(pk / PI)}π` : pk.toFixed(2)}
          </Label>
        )}
      </Plane>

      <Controls>
        <Slider label="t" value={t} onChange={v => setN(Math.round(v / STEP))} min={PI / 2} max={2 * PI} step={STEP} format={() => fmtT(n)} />
        <Toggle label="Only the size matters?" checked={sizes} onChange={setSizes} />
        <Readouts>
          <Readout color={C.g} tex={`${P}\\left(\\tfrac{\\pi}{2}\\right) = -2\\,${J} + 2\\pi\\,${K}`} />
          <Readout color={C.f} tex={`${P}(t) ${rel} ${pTex}`} />
          {sizes ? (
            <>
              <Readout color={C.bad} tex={`|${P}(t)| - \\left|${P}\\left(\\tfrac{\\pi}{2}\\right)\\right| \\approx ${speedDiff.toFixed(2)}`} />
              <Readout color={C.bad} tex={`|\\Delta${P}| \\approx ${dLen.toFixed(2)}`} />
            </>
          ) : (
            <Readout color={C.good} tex={`\\Delta${P} ${rel} ${dTex}${atKey ? '\\ \\checkmark' : ''}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
