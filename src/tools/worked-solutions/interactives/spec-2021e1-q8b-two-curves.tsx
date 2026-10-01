// 2021 Specialist Exam 1 Q8b — z² + 2z̄ + 2 = 0 is two real equations at once. With z = x + yi,
// w = z² + 2z̄ + 2 has Re(w) = x² − y² + 2x + 2 (zero on the orange hyperbola y² − (x + 1)² = 1)
// and Im(w) = 2y(x − 1) (zero on the blue lines y = 0 and x = 1). Drag z: the solutions 1 ± √5 i
// are where the curve crosses a line; the curve never reaches y = 0 (that case has Δ = −4 < 0).
// The widget starts at part a.'s answer −1 + i, which is on the curve but gives w = −4i. A toggle
// swaps 2z̄ for 2z (part a.'s equation): the real part — and so the curve — is unchanged, but the
// imaginary part becomes 2y(x + 1), the line moves to x = −1 and the crossings move to −1 ± i.
// All values checked with sympy.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, clamp, num, type Attach } from './kit'

type P2 = [number, number]

const X: P2 = [-4, 3]
const Y: P2 = [-3, 3]
const R5 = Math.sqrt(5)

// Re(w) = 0 ⟺ y² − (x + 1)² = 1: two branches, y = ±√((x + 1)² + 1).
const branch = (x: number) => Math.sqrt((x + 1) ** 2 + 1)

type Root = { p: P2; tex: string; text: string; attach: Attach }
// Labels sit inside each branch's U (above the upper vertex, below the lower), clear of the curve.
// With part a.'s line x = -1 running through those, they move off it (see `where`).
const A_ROOTS: Root[] = [
  { p: [-1, 1], tex: '-1 + i', text: '−1 + i', attach: 'n' },
  { p: [-1, -1], tex: '-1 - i', text: '−1 − i', attach: 's' },
]
const B_ROOTS: Root[] = [
  { p: [1, R5], tex: '1 + \\sqrt5\\,i', text: '1 + √5 i', attach: 'e' },
  { p: [1, -R5], tex: '1 - \\sqrt5\\,i', text: '1 − √5 i', attach: 'e' },
]

const dist = (a: P2, b: P2) => Math.hypot(a[0] - b[0], a[1] - b[1])

function cplx(re: number, im: number): string {
  const r = Math.abs(re) < 0.005 ? 0 : re
  const i = Math.abs(im) < 0.005 ? 0 : im
  if (r === 0 && i === 0) return '0'
  if (i === 0) return num(r)
  const imPart = `${num(Math.abs(i))}i`
  if (r === 0) return i < 0 ? `-${imPart}` : imPart
  return `${num(r)} ${i < 0 ? '-' : '+'} ${imPart}`
}

export default function TwoCurves() {
  const [conj, setConj] = useState(true) // true: part b. (2z̄); false: part a. (2z)
  const [p, setP] = useState<P2>([-1, 1])
  const L = conj ? 1 : -1 // Im(w) = 2y(x − L)

  const snap = (q: P2): P2 => {
    const raw: P2 = [clamp(q[0], X[0], X[1]), clamp(q[1], Y[0], Y[1])]
    for (const s of [...A_ROOTS, ...B_ROOTS]) if (dist(raw, s.p) < 0.18) return s.p
    let [x, y] = raw
    if (Math.abs(x - L) < 0.08) x = L
    if (Math.abs(y) < 0.08) y = 0
    else if (Math.abs(Math.abs(y) - branch(x)) < 0.08) y = Math.sign(y) * branch(x)
    return [x, y]
  }

  const [x, y] = p
  const re = x * x - y * y + 2 * x + 2
  const im = 2 * y * (x - L)
  const aHit = A_ROOTS.find(s => dist(p, s.p) < 1e-9)
  const bHit = B_ROOTS.find(s => dist(p, s.p) < 1e-9)
  const special = aHit ?? bHit
  const zTex = special ? special.tex : cplx(x, y)
  const reZero = Math.abs(re) < 0.005
  const imZero = Math.abs(im) < 0.005
  const solved = reZero && imZero
  const wName = conj ? 'z^2 + 2\\bar z + 2' : 'z^2 + 2z + 2'
  const wTex = special && !solved ? (conj ? (y > 0 ? '-4i' : '4i') : y > 0 ? '4\\sqrt5\\,i' : '-4\\sqrt5\\,i') : cplx(re, im)
  const own = conj ? B_ROOTS : A_ROOTS
  // Part a.'s roots lie on its line x = -1, so their labels step left, between the curve and the real axis.
  const where = (s: Root): Attach => (!conj && A_ROOTS.includes(s) ? (s.p[1] > 0 ? 'sw' : 'nw') : s.attach)
  const gapOf = (a: Attach) => (a === 'n' || a === 's' ? 16 : 12)
  const other = conj ? A_ROOTS : B_ROOTS

  let notice
  if (conj && aHit) {
    notice = (
      <Notice tone="warn">
        <b><M>{`z = ${aHit.tex}`}</M> is part a.&apos;s answer.</b> It sits on the orange curve, so the real part{' '}
        <M>{'x^2 - y^2 + 2x + 2'}</M> is <M>0</M>. But it is not on a blue line: <M>{`2y(x-1) = 2(${y})(-2) = ${-4 * y}`}</M>,
        so <M>{`z^2 + 2\\bar z + 2 = ${wTex} \\neq 0.`}</M> Drag z along the orange curve until it meets a blue line.
      </Notice>
    )
  } else if (conj && bHit) {
    notice = (
      <Notice tone="good">
        <b>Both parts are zero: <M>{`z = ${bHit.tex}`}</M> is a solution.</b> The orange curve meets the line{' '}
        <M>x = 1</M> exactly at <M>{'y = \\pm\\sqrt5'}</M>. It never meets the other blue line <M>y = 0</M>: there the real part
        is <M>{'(x+1)^2 + 1 \\geq 1'}</M>. That is the <M>y = 0</M> case in the working, with <M>{'\\Delta = -4 < 0'}</M>.
      </Notice>
    )
  } else if (!conj && aHit) {
    notice = (
      <Notice tone="good">
        <b>With <M>2z</M> instead of <M>{'2\\bar z'}</M>, <M>{aHit.tex}</M> works.</b> The real part is the same, so the orange
        curve has not moved. Only the imaginary part changed, to <M>{'2xy + 2y = 2y(x+1)'}</M>, so the vertical line moved
        from <M>x = 1</M> to <M>x = -1</M>, and the crossings moved with it. Turn the toggle off to watch the line move back.
      </Notice>
    )
  } else if (!conj && bHit) {
    notice = (
      <Notice tone="warn">
        Part b.&apos;s answer <M>{bHit.tex}</M> is on the orange curve but not on <M>x = -1</M>, so it does not solve{' '}
        <M>{'z^2 + 2z + 2 = 0'}</M>: there <M>{`w = ${wTex} \\neq 0`}</M>. The two equations share the curve, not the line,
        so neither one&apos;s answers carry over to the other.
      </Notice>
    )
  } else if (y === 0) {
    notice = (
      <Notice>
        On the real axis the imaginary part <M>{`2y(x ${conj ? '-' : '+'} 1)`}</M> is <M>0</M> for free, but the real part is{' '}
        <M>{'x^2 + 2x + 2 = (x+1)^2 + 1'}</M>, which is never below <M>1</M> (here it is <M>{num(re)}</M>). The orange curve
        never reaches this line, so <M>y = 0</M> gives no solutions.
      </Notice>
    )
  } else if (x === L) {
    notice = (
      <Notice>
        On the line <M>{`x = ${L}`}</M> the imaginary part is <M>0</M>, and the real part is{' '}
        <M>{conj ? '5 - y^2' : '1 - y^2'}</M> <M>{`= ${num(re)}`}</M>. Slide z up or down the line to where it crosses the
        orange curve.
      </Notice>
    )
  } else if (reZero) {
    notice = (
      <Notice>
        On the orange curve the real part is <M>0</M>, but the imaginary part is <M>{num(im)}</M>. Slide z along the curve to
        where it crosses a blue line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Neither part is zero here. A solution needs the real part zero (orange curve) <b>and</b> the imaginary part zero
        (blue lines) at the same time, so it can only be where they cross. Drag z onto the orange curve, then along it.
      </Notice>
    )
  }

  const zColor = solved ? C.good : C.violet

  return (
    <div>
      <Plane x={X} y={Y} equalScale height={360} xLabel="" yLabel="Im">
        {/* "Re" above the axis, so the blue Im(w) = 0 line along it doesn't cover the name. */}
        <Label at={[X[1], 0]} attach="ne" size={14} italic>
          Re
        </Label>
        {/* Im(w) = 0: the real axis and the vertical line x = L */}
        {/* Drawn well past the ranges: equalScale may show more of the plane than X × Y. */}
        <Line.Segment point1={[-12, 0]} point2={[12, 0]} color={C.f} weight={3} />
        <Line.Segment point1={[L, -12]} point2={[L, 12]} color={C.f} weight={3} />
        {/* Re(w) = 0: the hyperbola y² − (x + 1)² = 1 */}
        <Plot.OfX y={branch} domain={[-12, 12]} color={C.g} weight={3} />
        <Plot.OfX y={xx => -branch(xx)} domain={[-12, 12]} color={C.g} weight={3} />
        <Label at={[-3.75, branch(-3.75)]} attach="e" gap={10} color={C.g}>
          Re(w) = 0
        </Label>
        <Label at={conj ? [1, -1] : [-1, -2.9]} attach={conj ? 'e' : 'w'} color={C.f}>
          Im(w) = 0
        </Label>
        <Label at={[-2.7, 0]} attach="n" color={C.f}>
          Im(w) = 0
        </Label>
        {own.map(s => (
          <Point key={s.text} x={s.p[0]} y={s.p[1]} color={C.good} />
        ))}
        {other.map(s => (
          <Point key={s.text} x={s.p[0]} y={s.p[1]} color={C.bad} />
        ))}
        {[...own, ...other].filter(s => s !== special).map(s => (
          <Label key={`l${s.text}`} at={s.p} attach={where(s)} gap={gapOf(where(s))} color={own.includes(s) ? C.good : C.bad}>
            {s.text}
          </Label>
        ))}
        <MovablePoint point={p} onMove={q => setP(snap(q as P2))} color={zColor} />
        <Label at={p} attach={special ? where(special) : 'nw'} gap={special ? gapOf(where(special)) : 12} color={zColor}>
          {special ? `z = ${special.text}` : 'z'}
        </Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle
            label={
              <>
                Part a.&apos;s equation (<M>2z</M> instead of <M>{'2\\bar z'}</M>)
              </>
            }
            checked={!conj}
            onChange={v => setConj(!v)}
          />
        </Buttons>
        <Readouts>
          <Readout color={zColor} tex={`z = ${zTex}`} />
          <Readout color={C.g} tex={`\\text{Re}(w) = x^2 - y^2 + 2x + 2 = ${num(re)}`} />
          <Readout color={C.f} tex={`\\text{Im}(w) = 2y(x ${conj ? '-' : '+'} 1) = ${num(im)}`} />
          <Readout color={solved ? C.good : undefined} tex={`w = ${wName} = ${wTex}${solved ? '\\ \\checkmark' : ''}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
