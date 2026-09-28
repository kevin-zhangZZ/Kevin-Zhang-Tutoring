// 2020 Methods Exam 2 MCQ 2 — why the remainder on dividing by x + 2 is p(−2). Division writes
// p(x) = (x + 2)q(x) + r, so the graph of p (blue) is the graph of (x + 2)q(x) (orange) shifted
// vertically by the remainder r at every x. The orange curve always passes through (−2, 0), because
// of its factor x + 2, so the blue curve's height at x = −2 IS the remainder: r = p(−2) = −11 − 8a.
// Slide a until that gap is 5 (a = −2, option E; then p(x) − 5 = (x + 2)(x + 3)(x − 1)). A toggle
// tries x = 2 instead (option C, a = ½): the curve passes through (2, 5), but the gap at x = −2 is
// −15, because at x = 2 the quotient term is 4q(2) = 20, not 0 (drawn dashed; the second gap marker
// at x = 1.5 is hidden then so the labels stay clear). All curves are computed from
// p(x) = x³ − 2ax² + x − 1 and its quotient q(x) = x² − (2a + 2)x + (4a + 5) (checked with sympy).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const pOf = (a: number) => (x: number) => x ** 3 - 2 * a * x * x + x - 1
const qb = (a: number) => -(2 * a + 2)
const qc = (a: number) => 4 * a + 5
/** (x + 2)q(x) = p(x) − r: the part of p that division by x + 2 accounts for. */
const prodOf = (a: number) => (x: number) => (x + 2) * (x * x + qb(a) * x + qc(a))
const remOf = (a: number) => -8 * a - 11

const X: [number, number] = [-4, 3]
const Y: [number, number] = [-25, 20]
const GAP_X = 1.5 // a second place to see the same gap

/** A decimal with a real minus sign ("−1.5", "3"). */
const d = (v: number) => {
  const r = Math.round(v * 100) / 100
  return (Object.is(r, -0) ? 0 : r).toString().replace('-', '−')
}
/** The same number for TeX (ASCII minus). */
const t = (v: number) => d(v).replace('−', '-')
/** " + 3x", " − 1.5x", "" for a zero coefficient, "x" for a unit one — for building TeX. */
function term(coef: number, sym: string): string {
  if (Math.abs(coef) < 1e-9) return ''
  const sign = coef < 0 ? ' - ' : ' + '
  const mag = Math.abs(coef)
  return `${sign}${sym && Math.abs(mag - 1) < 1e-9 ? '' : String(Math.round(mag * 100) / 100)}${sym}`
}

export default function Remainder() {
  const [a, setA] = useState(0)
  const [tryTwo, setTryTwo] = useState(false)
  const p = pOf(a)
  const prod = prodOf(a)
  const r = remOf(a)
  const hit = Math.abs(r - 5) < 1e-9
  const gapColor = hit ? C.good : C.violet
  const p2 = p(2)

  const identity =
    `{\\color{${C.f}}p(x)} = {\\color{${C.g}}(x+2)(x^2${term(qb(a), 'x')}${term(qc(a), '')})}` +
    `{\\color{${gapColor}}${term(r, '') || ' + 0'}}`

  let notice
  if (tryTwo) {
    notice = (
      <Notice tone="warn">
        {Math.abs(a - 0.5) < 1e-9 ? (
          <>
            At <M>{'a = \\tfrac12'}</M> (option C) the blue curve does pass through <M>(2, 5)</M>, which is all{' '}
            <M>p(2) = 5</M> says. But the remainder is still the gap at <M>x = -2</M>, and that is <M>-15</M>.
          </>
        ) : (
          <>
            The red point is <M>(2, p(2))</M>. Setting <M>p(2) = 5</M> gives <M>{'a = \\tfrac12'}</M> (option C): slide there.
          </>
        )}{' '}
        At <M>x = 2</M> the factor <M>x + 2</M> is 4, not 0, so the orange curve isn&apos;t at zero there:{' '}
        <M>p(2) = 4q(2) + r</M> mixes the quotient in with the remainder. Only at <M>x = -2</M> does the quotient term
        vanish and leave <M>r</M> on its own.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b>At <M>a = -2</M> the gap is exactly 5</b>: <M>p(-2) = 5</M>, so <M>p(x) = (x+2)(x^2+2x-3) + 5</M> and the remainder
        on dividing by <M>x + 2</M> is 5. Option E. (The quotient factorises as <M>(x+3)(x-1)</M>, which is why the orange
        curve now crosses the axis at −3, −2 and 1, and the blue curve is at height 5 at all three.)
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Whatever <M>a</M> is, the orange curve <M>(x+2)q(x)</M> passes through <M>(-2, 0)</M>: the factor <M>x + 2</M> is zero
        there. The blue curve <M>p(x)</M> is the orange one shifted by the remainder <M>r</M> at <i>every</i> <M>x</M> (the two
        violet gaps are equal). So the height of <M>p</M> at <M>x = -2</M> <i>is</i> the remainder:{' '}
        <M>r = p(-2) = -11 - 8a</M>, now <M>{t(r)}</M>.{' '}
        {r < 5 ? (
          <>That&apos;s below 5: slide <M>a</M> left. Each drop of 1 in <M>a</M> raises <M>p(-2)</M> by 8.</>
        ) : (
          <>That&apos;s above 5: slide <M>a</M> right.</>
        )}
      </Notice>
    )
  }

  const inY = (v: number) => v >= Y[0] && v <= Y[1]
  // Label the second gap on whichever side neither curve passes close to its midpoint.
  const mid = (prod(GAP_X) + p(GAP_X)) / 2
  const clear = (x: number) => Math.abs(p(x) - mid) > 3 && Math.abs(prod(x) - mid) > 3
  const gapSide = clear(GAP_X + 0.2) ? 'e' : clear(GAP_X - 0.2) ? 'w' : null

  return (
    <div>
      <Plane x={X} y={Y} xStep={1} yStep={5} height={330} xLabels={v => (v === -2 ? '' : String(v).replace('-', '−'))} yLabels={v => (v % 10 === 0 ? String(v).replace('-', '−') : '')}>
        <Line.Segment point1={[X[0], 5]} point2={[X[1], 5]} color={C.bad} style="dashed" weight={1.5} />
        <Label at={[X[0], 5]} color={C.bad} attach="ne" size={12}>y = 5</Label>
        <Line.Segment point1={[-2, Y[0]]} point2={[-2, Y[1]]} color={C.guide} style="dashed" weight={1} />
        <Plot.OfX y={prod} domain={X} color={C.g} weight={2.5} />
        <Plot.OfX y={p} domain={X} color={C.f} weight={3} />
        {/* The remainder as a gap, at x = −2 and again at x = GAP_X: the same size everywhere. */}
        <Line.Segment point1={[-2, 0]} point2={[-2, r]} color={gapColor} weight={4} />
        {!tryTwo && inY(prod(GAP_X)) && inY(p(GAP_X)) && (
          <>
            <Line.Segment point1={[GAP_X, prod(GAP_X)]} point2={[GAP_X, p(GAP_X)]} color={gapColor} weight={2.5} />
            {Math.abs(r) > 2.5 && gapSide && (
              <Label at={[GAP_X, (prod(GAP_X) + p(GAP_X)) / 2]} color={gapColor} attach={gapSide} size={14} italic>r</Label>
            )}
          </>
        )}
        <Label at={[-2, Y[1]]} color={C.guide} attach="se" size={12}>x = −2</Label>
        <Point x={-2} y={0} color={C.g} />
        {inY(r) && <Point x={-2} y={r} color={C.f} />}
        {inY(r) && Math.abs(r) > 2.5 && (
          <Label at={[-2, r / 2]} color={gapColor} attach="e" size={14} italic>r</Label>
        )}
        {tryTwo && inY(p2) && (
          <>
            <Line.Segment point1={[2, 0]} point2={[2, prod(2)]} color={C.g} style="dashed" weight={1.5} />
            <Point x={2} y={prod(2)} color={C.g} />
            <Point x={2} y={p2} color={C.bad} />
            <Label at={[2, p2]} color={C.bad} attach={p2 > 12 ? 'sw' : 'nw'} size={12}>{`p(2) = ${d(p2)}`}</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-3} max={1} step={0.25} format={v => d(v)} />
        <Buttons>
          <Toggle
            label="Try x = 2 instead (option C)"
            checked={tryTwo}
            onChange={v => {
              setTryTwo(v)
              if (v) setA(0.5)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex="p(x)" />
          <Readout color={C.g} tex="(x+2)\,q(x)" />
          <Readout color={gapColor} tex={`r = p(-2) = -11 - 8a = ${t(r)}`} />
        </Readouts>
        <div className="text-[13px] text-gray-700 dark:text-gray-300 overflow-x-auto">
          <M>{identity}</M>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
