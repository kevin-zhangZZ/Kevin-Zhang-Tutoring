// 2020 Methods Exam 2 MCQ 4 — testing the five options against the graph. The curve is the left-hand
// side of the equation, y = 2cos(2x − π/3) + 1, on [−π, π]; its zeros (grey rings) are the solutions,
// x = −π/2, −π/6, π/2, 5π/6. Pick an option and its two formulas are plotted for every integer k that
// lands in view, each value at its true height on the curve: a value that is a solution sits on the
// x-axis, one that isn't sits up at height 2 or down at −1, in red with a drop line. A correct formula
// takes its family's colour from the unit-circle diagram above (violet −π/6 + kπ, orange π/2 + kπ).
// Only D puts every value on a zero and reaches every zero. A, B and C each have one correct formula
// and one wrong one — and the correct ones can look different from D's (A's π(6k − 3)/6 and B's
// π(6k + 5)/6 are D's families with k shifted by one), which is the point: the same set of solutions can
// be written many ways, so test values rather than match the look of a formula. Heights computed from
// the question's equation (checked with sympy: A/B's π(6k − 2)/6 gives −1 and C/E's π(6k + 2)/6 gives 2
// for every k; E's π gives 2).

import { useState, type ReactNode } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Toggle } from './kit'

const PI = Math.PI
const g = (x: number) => 2 * Math.cos(2 * x - PI / 3) + 1
/** The slope of the curve, to put a height label on the side the curve leaves free. */
const slope = (x: number) => -4 * Math.sin(2 * x - PI / 3)
const ZEROS = [-PI / 2, -PI / 6, PI / 2, (5 * PI) / 6]

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
/** A family is x = π(6k + c)/6 for k ∈ Z, or a single value (c = null, fixed x). */
type Family = { c: number | null; fixed?: number; tex: string }
const OPTIONS: Record<Letter, [Family, Family]> = {
  A: [{ c: -2, tex: '\\tfrac{\\pi(6k-2)}{6}' }, { c: -3, tex: '\\tfrac{\\pi(6k-3)}{6}' }],
  B: [{ c: -2, tex: '\\tfrac{\\pi(6k-2)}{6}' }, { c: 5, tex: '\\tfrac{\\pi(6k+5)}{6}' }],
  C: [{ c: -1, tex: '\\tfrac{\\pi(6k-1)}{6}' }, { c: 2, tex: '\\tfrac{\\pi(6k+2)}{6}' }],
  D: [{ c: -1, tex: '\\tfrac{\\pi(6k-1)}{6}' }, { c: 3, tex: '\\tfrac{\\pi(6k+3)}{6}' }],
  E: [{ c: null, fixed: PI, tex: '\\pi' }, { c: 2, tex: '\\tfrac{\\pi(6k+2)}{6}' }],
}

/** The values of a family in [−π, π], as multiples of π/6 (n means nπ/6). */
function sixths(f: Family): number[] {
  if (f.c === null) return [Math.round(((f.fixed ?? 0) * 6) / PI)]
  const out: number[] = []
  for (let k = -3; k <= 3; k++) {
    const n = 6 * k + f.c
    if (n >= -6 && n <= 6) out.push(n)
  }
  return out
}

const isZero = (x: number) => Math.abs(g(x)) < 1e-9

/** A formula's colour: red if any value fails; otherwise its family's colour from the circle
 *  diagram — violet for −π/6 + kπ (it contains −π/6), orange for π/2 + kπ. */
function familyColor(f: Family): string {
  const vals = sixths(f)
  if (!vals.every(n => isZero((n * PI) / 6))) return C.bad
  return vals.includes(-1) ? C.violet : C.g
}

/** nπ/6 in lowest terms, as TeX. */
function piTex(n: number): string {
  if (n === 0) return '0'
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const d0 = gcd(Math.abs(n), 6)
  const num = n / d0
  const den = 6 / d0
  const sign = num < 0 ? '-' : ''
  const top = Math.abs(num) === 1 ? '\\pi' : `${Math.abs(num)}\\pi`
  return den === 1 ? `${sign}${top}` : `${sign}\\tfrac{${top}}{${den}}`
}

/** Tick numbers at multiples of π/2, drawn along the bottom of the grid: on the axis, ±π/2 would sit
 *  on the zero rings there. */
function PiTicks() {
  const ticks: [number, string][] = [
    [-PI, '−π'],
    [-PI / 2, '−π/2'],
    [PI / 2, 'π/2'],
    [PI, 'π'],
  ]
  return (
    <>
      {ticks.map(([v, t]) => (
        <Label key={t} at={[v, -1.75]} attach="c" size={12} bold={false}>
          {t}
        </Label>
      ))}
    </>
  )
}

const MESSAGES: Record<Letter, { tone: 'good' | 'warn'; body: ReactNode }> = {
  A: {
    tone: 'warn',
    body: (
      <>
        <b>A is out.</b> Its first formula, <M>{'\\tfrac{\\pi(6k-2)}{6} = -\\tfrac\\pi3 + k\\pi'}</M>, lands where the curve is at
        height <M>-1</M> (red): at <M>{'x = -\\tfrac\\pi3'}</M> the bracket is <M>{'2x - \\tfrac\\pi3 = -\\pi'}</M>, and{' '}
        <M>{'2\\cos(-\\pi) + 1 = -1'}</M>, not 0. Its second formula is right: <M>{'\\tfrac{\\pi(6k-3)}{6}'}</M> gives the same
        values as D&apos;s <M>{'\\tfrac{\\pi(6k+3)}{6}'}</M> (orange), just with <M>k</M> counted one lower. The zeros at{' '}
        <M>{'-\\tfrac\\pi6'}</M> and <M>{'\\tfrac{5\\pi}6'}</M> are never reached.
      </>
    ),
  },
  B: {
    tone: 'warn',
    body: (
      <>
        <b>B is out</b>, because of the same first formula as A (height <M>-1</M>). Its second formula is right, although it
        doesn&apos;t look it: <M>{'\\tfrac{\\pi(6k+5)}{6}'}</M> is D&apos;s violet <M>{'\\tfrac{\\pi(6k-1)}{6}'}</M> with <M>k + 1</M> in
        place of <M>k</M>, since <M>{'6(k+1) - 1 = 6k + 5'}</M>. Two different-looking formulas, one set of solutions. Nothing in B
        reaches <M>{'\\pm\\tfrac\\pi2'}</M>.
      </>
    ),
  },
  C: {
    tone: 'warn',
    body: (
      <>
        <b>C is out.</b> Its first formula <M>{'\\tfrac{\\pi(6k-1)}{6}'}</M> is right (violet, on the zeros), but the second,{' '}
        <M>{'\\tfrac{\\pi(6k+2)}{6} = \\tfrac\\pi3 + k\\pi,'}</M> lands where the curve is at height 2: at <M>{'x = \\tfrac\\pi3'}</M>{' '}
        the bracket is <M>{'\\tfrac\\pi3'}</M>, and <M>{'2\\cos\\tfrac\\pi3 + 1 = 2'}</M>. One wrong formula is enough to rule out
        an option, and the zeros at <M>{'\\pm\\tfrac\\pi2'}</M> are missed.
      </>
    ),
  },
  D: {
    tone: 'good',
    body: (
      <>
        <b>D passes both tests.</b> Every value it gives sits on a zero, and every zero is reached: violet{' '}
        <M>{'\\tfrac{\\pi(6k-1)}{6}'}</M> gives <M>{'-\\tfrac\\pi6'}</M> and <M>{'\\tfrac{5\\pi}6'}</M>, orange{' '}
        <M>{'\\tfrac{\\pi(6k+3)}{6}'}</M> gives <M>{'\\pm\\tfrac\\pi2'}</M>: the two families from the unit circle. The pattern
        repeats every <M>\pi</M> (the period of the curve), which is what the <M>k</M> in each formula does.
      </>
    ),
  },
  E: {
    tone: 'warn',
    body: (
      <>
        <b>E is out.</b> <M>x = \pi</M> is a single value with no <M>k</M>, and it isn&apos;t even a solution: the curve is at
        height 2 there, since <M>{'2\\cos\\tfrac{5\\pi}3 + 1 = 2'}</M>. The second formula is C&apos;s wrong one. E misses all
        four zeros.
      </>
    ),
  },
}

export default function OptionsWidget() {
  const [opt, setOpt] = useState<Letter>('C')
  const fams = OPTIONS[opt]
  const pts = fams.flatMap(f => sixths(f).map(n => ({ n, x: (n * PI) / 6, color: familyColor(f) })))
  const covered = (z: number) => pts.some(p => Math.abs(p.x - z) < 1e-9)

  return (
    <div>
      <Plane x={[-PI, PI]} y={[-2, 3.5]} xStep={PI / 6} yStep={1} height={270} xLabels={false} yLabels={v => (v >= -1 && v <= 3 ? String(v).replace('-', '−') : '')}>
        <PiTicks />
        <Plot.OfX y={g} domain={[-PI, PI]} color={C.f} weight={3} />
        {ZEROS.filter(z => !covered(z)).map(z => (
          <Point key={z} x={z} y={0} color={C.guide} svgCircleProps={{ r: 7, style: { fill: 'none', stroke: C.guide, strokeWidth: 2.5 } }} />
        ))}
        {pts.map(p => {
          const y = g(p.x)
          const ok = isZero(p.x)
          return (
            <g key={`${p.color}-${p.n}`}>
              {!ok && <Line.Segment point1={[p.x, 0]} point2={[p.x, y]} color={C.bad} style="dashed" weight={2} />}
              <Point x={p.x} y={ok ? 0 : y} color={p.color} />
              {!ok && (
                <Label at={[p.x, y]} color={C.bad} attach={y < 0 ? 's' : slope(p.x) < 0 ? 'ne' : 'nw'} size={12}>
                  {y > 0 ? '2' : '−1'}
                </Label>
              )}
            </g>
          )
        })}
      </Plane>
      <Controls>
        <Buttons>
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Test option</span>
          {(Object.keys(OPTIONS) as Letter[]).map(l => (
            <Toggle key={l} label={l} checked={opt === l} onChange={() => setOpt(l)} />
          ))}
        </Buttons>
        {/* Not clickable: KaTeX's fraction struts reach up over the buttons above and would
            otherwise swallow taps on them. */}
        <div className="pointer-events-none">
          <Readouts>
            {fams.map((f, i) => {
              const vals = sixths(f)
              const allOk = vals.every(n => isZero((n * PI) / 6))
              return (
                <Readout
                  key={i}
                  color={familyColor(f)}
                  tex={`x = ${f.tex}${f.c === null ? '' : `:\\ ${vals.map(piTex).join(',\\ ')}`} \\ ${allOk ? '\\checkmark' : '\\times'}`}
                />
              )
            })}
          </Readouts>
        </div>
        <Notice tone={MESSAGES[opt].tone}>{MESSAGES[opt].body}</Notice>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          The curve is <M>{'y = 2\\cos\\left(2x - \\tfrac\\pi3\\right) + 1'}</M>; the grey rings are its zeros, the solutions. Each
          dot is one value an option gives, drawn at the curve&apos;s height there: red if it isn&apos;t a solution.
        </p>
      </Controls>
    </div>
  )
}
