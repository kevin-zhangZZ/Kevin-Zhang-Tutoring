// 2017 Specialist Exam 1 Q3 — the three roots of z³ + az² + 6z + a on an Argand plane as the real
// constant a slides from −5 to 5. For every real a the two non-real roots are mirror images in the
// real axis (the conjugate root theorem), and they trace a symmetric track. At a = −4 the lower
// root lands on the given 1 − i, its partner is 1 + i and the real root is 2. A readout shows
// P(1 − i) = (4 + a) + (−8 − 2a)i, which is zero only at a = −4. A toggle adds the report's wrong
// partner −1 − i with a readout P(−1 − i) = (a − 4) + (2a − 8)i: it is 1 − i reflected in the imaginary axis, and it is only a root when a = +4,
// when 1 − i no longer is.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const P = (x: number, a: number) => x * x * x + a * x * x + 6 * x + a

/** The unique real root (P is negative far left, positive far right, and has one real root for every real a). */
function realRoot(a: number): number {
  let lo = -20
  let hi = 20
  for (let k = 0; k < 80; k++) {
    const mid = (lo + hi) / 2
    if (P(mid, a) < 0) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/** Deflate by (z − r): z³ + az² + 6z + a = (z − r)(z² + Bz + D). Returns the pair p ± qi, q ≥ 0. */
function pair(a: number): { r: number; p: number; q: number } {
  const r = realRoot(a)
  const B = a + r
  const D = 6 + r * B
  const p = -B / 2
  const q = Math.sqrt(Math.max(0, D - (B * B) / 4))
  return { r, p, q }
}

/** Up to 2 dp with trailing zeros dropped; ASCII minus for TeX, a real minus sign for plane labels. */
const fx = (v: number, tex: boolean) => {
  const s = (Math.abs(v) < 0.005 ? 0 : v).toFixed(2).replace(/\.?0+$/, '')
  return tex ? s : s.replace('-', '−')
}

/** p ± qi as text, e.g. "1 + i", "0.62 − 0.97i". */
const cx = (p: number, q: number, sign: string, tex: boolean) => {
  const im = Math.abs(q - 1) < 0.005 ? 'i' : `${fx(q, tex)}i`
  return `${fx(p, tex)} ${sign} ${im}`
}

export default function ConjugatePair() {
  const [a, setA] = useState(-4)
  const [wrong, setWrong] = useState(false)
  const { r, p, q } = pair(a)
  const atAnswer = Math.abs(a + 4) < 0.05
  const atFlip = Math.abs(a - 4) < 0.05
  // hide the lower root's own label while it is close to the ring and its label
  const nearRing = Math.hypot(p - 1, q - 1) < 0.9
  const rootAttach = Math.abs(r - p) < 0.8 ? (r < p ? 'nw' : 'ne') : 'n'

  // P(1 − i) = (4 + a) + (−8 − 2a)i
  const reP = 4 + a
  const imP = -8 - 2 * a
  const pTex = `P(1-i) = ${fx(reP, true)} ${imP < 0 ? '-' : '+'} ${fx(Math.abs(imP), true)}i`
  // P(−1 − i) = (a − 4) + (2a − 8)i
  const reW = a - 4
  const imW = 2 * a - 8
  const wTex = `P(-1-i) = ${fx(reW, true)} ${imW < 0 ? '-' : '+'} ${fx(Math.abs(imW), true)}i`

  let notice
  if (wrong && atAnswer) {
    notice = (
      <Notice tone="warn">
        <b>At <M>a = -4</M>, <M>-1 - i</M> is not a root: <M>P(-1 - i) = -8 - 16i</M>.</b> The red point is <M>1 - i</M>{' '}
        with the sign of the <b>real</b> part flipped, a reflection in the imaginary axis. The true partner <M>1 + i</M> is
        the reflection in the <b>real</b> axis. Slide <M>a</M> to <M>4</M> to see when <M>-1 - i</M> does become a root.
      </Notice>
    )
  } else if (atAnswer) {
    notice = (
      <Notice tone="good">
        <b>At <M>a = -4</M> the lower root sits in the ring: <M>1 - i</M> is a solution.</b> Its partner is automatically
        its mirror image in the real axis, <M>1 + i</M>, and the one root left over is real: <M>2</M>. That is the whole
        answer. Notice <M>P(1 - i)</M> has both parts zero only here.
      </Notice>
    )
  } else if (wrong && atFlip) {
    notice = (
      <Notice tone="warn">
        <b>At <M>a = 4</M>, <M>-1 - i</M> is a root — but <M>1 - i</M> is not.</b> The whole picture is the <M>a = -4</M>{' '}
        picture reflected in the imaginary axis. That reflection swaps <M>a</M> for <M>-a</M>, so it never gives a second root of
        the same equation. The pair is still mirrored in the <b>real</b> axis: <M>-1 \pm i</M>.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        The red point <M>-1 - i</M> is <M>1 - i</M> with the sign of the <b>real</b> part flipped — a reflection in the
        imaginary axis. The blue pair never uses that mirror. Slide <M>a</M> to <M>-4</M>, then to <M>4</M>:{' '}
        <M>1 - i</M> and <M>-1 - i</M> are never roots at the same time.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Whatever real value <M>a</M> takes, the two non-real roots are <b>mirror images in the real axis</b>: the dashed
        line joining them is vertical and cut in half by the real axis. That is the conjugate root theorem. Slide{' '}
        <M>a</M> until the lower root lands in the orange ring at <M>1 - i</M>, and watch where the real root is then.
      </Notice>
    )
  }

  const ringColor = atAnswer ? C.good : C.g

  return (
    <div>
      <Plane
        x={[-4.2, 4.8]}
        y={[-2.7, 2.7]}
        equalScale
        height={340}
        xLabel=""
        yLabel="Im"
        yLabels={v => (v === 0 || Math.abs(v) > 2.5 ? '' : v === 1 ? 'i' : v === -1 ? '−i' : `${v < 0 ? '−' : ''}${Math.abs(v)}i`)}
      >
        <Label at={[4.8, 0]} attach="nw" size={14} italic>Re</Label>
        {/* the track of the pair as a runs from −5 to 5 */}
        <Plot.Parametric xy={t => { const s = pair(t); return [s.p, s.q] }} domain={[-5, 5]} color={C.guide} weight={1.5} style="dashed" />
        <Plot.Parametric xy={t => { const s = pair(t); return [s.p, -s.q] }} domain={[-5, 5]} color={C.guide} weight={1.5} style="dashed" />

        {/* the given root */}
        <Circle center={[1, -1]} radius={0.2} color={ringColor} fillOpacity={0} strokeStyle="solid" />
        <Label at={[1.2, -1]} attach="e" color={ringColor}>1 − i (given)</Label>

        {/* the wrong partner */}
        {wrong && (
          <>
            <Line.Segment point1={[1, -1]} point2={[-1, -1]} color={C.bad} style="dashed" weight={2} />
            <Point x={-1} y={-1} color={C.bad} />
            <Label at={[-1, -1]} attach="sw" color={C.bad}>−1 − i ?</Label>
          </>
        )}

        {/* the mirror line joining the pair */}
        <Line.Segment point1={[p, q]} point2={[p, -q]} color={C.f} style="dashed" weight={2} />
        <Point x={p} y={q} color={C.f} />
        <Point x={p} y={-q} color={C.f} />
        <Label at={[p, q]} attach={p >= 0 ? 'ne' : 'nw'} color={C.f}>{cx(p, q, '+', false)}</Label>
        {!nearRing && <Label at={[p, -q]} attach={p >= 0 ? 'se' : 'sw'} color={C.f}>{cx(p, q, '−', false)}</Label>}
        <Point x={r} y={0} color={C.violet} />
        <Label at={[r, 0]} attach={rootAttach} color={C.violet}>{fx(r, false)}</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-5} max={5} step={0.1} format={v => v.toFixed(1)} />
        <Toggle label="Show the report's wrong partner −1 − i" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.f} tex={`\\text{pair: } ${cx(p, q, '\\pm', true)}`} />
          <Readout color={C.violet} tex={`\\text{real root: } ${fx(r, true)}`} />
          <Readout color={atAnswer ? C.good : C.g} tex={pTex + (atAnswer ? '\\ \\checkmark' : '')} />
          {wrong && <Readout color={atFlip ? C.good : C.bad} tex={wTex + (atFlip ? '\\ \\checkmark' : '')} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
