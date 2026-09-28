// 2018 Specialist Exam 2 MCQ 5 — why z + 1/z is real only when |z| = 1. 1/z = z̄/|z|², so 1/z
// points the same way as z̄ (z reflected in the real axis) but has length 1/|z|. Its imaginary part
// −b/|z|² cancels z's imaginary part b only when |z| = 1, and then z + 1/z = z + z̄ = 2a. Drag z
// (b ≠ 0 and a ≠ 0 are enforced): the red gap is Im(z + 1/z) = b(1 − 1/|z|²), and it closes only on
// the dashed unit circle. The chips test options A–E for the current z (dimmed when the sum is not
// real, since such a z doesn't meet the condition); at cis(π/4) A, C and D all tick, which is the
// trap of trusting one example, and cis(π/3) is the counterexample that leaves only D.

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, Vector, clamp, tick } from './kit'

type V = [number, number]
const XR: V = [-2.6, 3.1]
const YR: V = [-2.3, 2.3]
const Q = Math.PI / 4
const EPS = 1e-9

/** Keep |z| in [0.5, 2] and a, b away from 0; snap onto the unit circle and onto a = ±b when close. */
function tidy([x, y]: V): V {
  let r = clamp(Math.hypot(x, y), 0.5, 2)
  let th = Math.atan2(y, x)
  if (Math.abs(r - 1) < 0.05) r = 1
  const k = Math.round((th - Q) / (2 * Q))
  if (Math.abs(th - (Q + 2 * Q * k)) < 0.05) th = Q + 2 * Q * k
  let a = r * Math.cos(th)
  let b = r * Math.sin(th)
  if (Math.abs(b) < 0.1) b = b < 0 ? -0.1 : 0.1
  if (Math.abs(a) < 0.1) a = a < 0 ? -0.1 : 0.1
  return [a, b]
}

const f2 = (v: number) => (Math.abs(v) < 0.005 ? '0' : v.toFixed(2))
const side = (p: V, gapN: boolean) => `${p[1] >= 0 ? 'n' : 's'}${gapN ? '' : p[0] >= 0 ? 'e' : 'w'}` as 'n' | 's' | 'ne' | 'nw' | 'se' | 'sw'

function Chip({ letter, tex, ok }: { letter: string; tex: string; ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[12px] ${
        ok
          ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-100'
          : 'border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500'
      }`}
    >
      <b>{letter}</b> <M>{tex}</M> {ok ? '✓' : '✗'}
    </span>
  )
}

export default function ReciprocalWidget() {
  const [z, setZ] = useState<V>([1.5, 1])
  const [a, b] = z
  const r2 = a * a + b * b
  const r = Math.sqrt(r2)
  const conj: V = [a, -b]
  const inv: V = [a / r2, -b / r2]
  const s: V = [a + inv[0], b + inv[1]]
  const real = Math.abs(s[1]) < EPS
  const onCircle = Math.abs(r - 1) < EPS

  const optA = Math.abs(Math.atan2(b, a) - Q) < EPS
  const optB = Math.abs(a + b) < EPS
  const optC = Math.abs(a - b) < EPS
  const optE = Math.abs(a * a - b * b - 1) < EPS && Math.abs(2 * a * b) < EPS

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (onCircle && (optA || optB || optC)) {
    tone = 'warn'
    notice = (
      <>
        <M>{'z + \\tfrac1z'}</M> is real here, but this <M>z</M> also has <M>{optB ? 'a = -b' : 'a = b'}</M>, so more than one option ticks. One
        example can&apos;t tell you what <em>must</em> be true. Drag <M>z</M> round the dashed circle: the sum stays on the real axis while A, B
        and C come and go. Only D holds every time.
      </>
    )
  } else if (onCircle) {
    tone = 'good'
    notice = (
      <>
        On the unit circle <M>{'\\tfrac1z'}</M> lands exactly on <M>{'\\bar z'}</M>, the mirror image of <M>z</M>. Their imaginary parts{' '}
        <M>b</M> and <M>-b</M> cancel, so <M>{`z + \\tfrac1z = 2a \\approx ${f2(2 * a)}`}</M> is real. This works at every point of the
        circle, and nowhere else, which is why D must be true.
      </>
    )
  } else {
    notice = (
      <>
        <M>{'\\tfrac1z'}</M> (orange) points the same way as <M>{'\\bar z'}</M> (grey), but its length is{' '}
        <M>{`\\tfrac{1}{|z|} \\approx ${f2(1 / r)}`}</M>, not <M>{`|z| \\approx ${f2(r)}`}</M>. So its imaginary part doesn&apos;t cancel{' '}
        <M>b</M>, and <M>{'z + \\tfrac1z'}</M> sits off the real axis by the red gap. Drag <M>z</M> until the gap closes: it only happens on the
        dashed unit circle. (Until then this <M>z</M> breaks the question&apos;s condition, so it can&apos;t test the options.)
      </>
    )
  }

  return (
    <div>
      <Plane
        x={XR}
        y={YR}
        equalScale
        height={420}
        xLabel=""
        yLabel="Im"
        labels={v => (Math.abs(v) > 2.5 ? '' : tick(v))}
      >
        <Label at={[XR[1], 0]} attach="sw" size={14} gap={4} italic>Re</Label>
        <Circle center={[0, 0]} radius={1} color={C.good} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
        {/* z̄: the mirror image of z; 1/z lies on the same ray from 0. */}
        <Line.Segment point1={[0, 0]} point2={conj} color={C.guide} style="dashed" />
        <Point x={conj[0]} y={conj[1]} color={C.guide} />
        {!onCircle && <Label at={conj} attach={side(conj, false)} color={C.guide} gap={8}>z̄</Label>}
        <Vector tail={[0, 0]} tip={inv} color={C.g} weight={2.5} />
        <Label at={inv} attach={onCircle || r < 1 ? side(inv, false) : (`${inv[1] >= 0 ? 'n' : 's'}${inv[0] >= 0 ? 'w' : 'e'}` as 'nw' | 'ne' | 'sw' | 'se')} color={C.g} gap={10}>
          {onCircle ? '1/z = z̄' : '1/z'}
        </Label>
        {/* z + 1/z by tip-to-tail: slide the orange arrow onto the tip of z. */}
        <Vector tail={[0, 0]} tip={z} color={C.violet} weight={2.5} />
        <Line.Segment point1={z} point2={s} color={C.g} style="dashed" weight={2} />
        {!real && <Line.Segment point1={s} point2={[s[0], 0]} color={C.bad} weight={3} />}
        <Point x={s[0]} y={s[1]} color={real ? C.good : C.f} />
        <Label at={s} attach={real ? (s[0] >= 0 ? 'ne' : 'nw') : side(s, false)} color={real ? C.good : C.f} gap={9}>z + 1/z</Label>
        <Label at={z} attach={side(z, false)} color={C.violet} gap={12}>z</Label>
        <MovablePoint point={z} onMove={p => setZ(tidy(p as V))} color={C.violet} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout tex={`z \\approx ${f2(a)} ${b < 0 ? '-' : '+'} ${f2(Math.abs(b))}i`} color={C.violet} />
          <Readout tex={`|z| ${onCircle ? '=' : '\\approx'} ${onCircle ? '1' : f2(r)}`} />
          <Readout tex={`\\mathrm{Im}\\big(z + \\tfrac1z\\big) = b\\big(1 - \\tfrac{1}{|z|^2}\\big) ${real ? '= 0' : `\\approx ${f2(s[1])}`}`} color={real ? C.good : C.bad} />
        </Readouts>
        <div className={`flex flex-wrap items-center gap-1.5 transition-opacity ${real ? '' : 'opacity-50'}`}>
          <span className="text-[12px] text-gray-600 dark:text-gray-300">{real ? 'For this z:' : 'Not a valid z (sum not real):'}</span>
          <Chip letter="A" tex={'\\mathrm{Arg}(z) = \\tfrac{\\pi}{4}'} ok={optA} />
          <Chip letter="B" tex="a = -b" ok={optB} />
          <Chip letter="C" tex="a = b" ok={optC} />
          <Chip letter="D" tex="|z| = 1" ok={onCircle} />
          <Chip letter="E" tex="z^2 = 1" ok={optE} />
        </div>
        <Buttons>
          <ActionButton label={<>Try <M>{'z = \\tfrac12 + \\tfrac{\\sqrt3}{2}i'}</M></>} onClick={() => setZ([0.5, Math.sqrt(3) / 2])} />
          <ActionButton label="Put z on the unit circle" onClick={() => setZ([a / r, b / r])} />
        </Buttons>
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
