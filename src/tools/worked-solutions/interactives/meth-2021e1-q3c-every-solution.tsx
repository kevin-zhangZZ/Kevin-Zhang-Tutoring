// 2021 Methods Exam 1 Q3c — what a general solution actually generates. The graph is
// g(x) = 2sin(2x) against y = √3 on [−2π, 5π/2], where the equation has exactly ten solutions
// (sympy): −11π/6, −5π/3, −5π/6, −2π/3, π/6, π/3, 7π/6, 4π/3, 13π/6, 7π/3. Step k and the pair
// x = π/6 + kπ, π/3 + kπ moves one period (π) at a time and lands on every one of them. The other
// buttons are the report's common errors: +2kπ jumps two periods and skips every other pair,
// k ∈ Z⁺ loses k = 0 and every negative k, and k ∈ R lets k = 0.5 give x = 2π/3, where
// g(x) = −√3 (both members of the pair land on −√3 there).

import { useState } from 'react'
import {
  C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, clamp, num,
} from './kit'

const PI = Math.PI
const R3 = Math.sqrt(3)
const g = (x: number) => 2 * Math.sin(2 * x)
const X0 = -2 * PI
const X1 = 2.5 * PI
const Y_ARROW = 2.35

// The ten solutions on screen, as multiples of π/6 (x = nπ/6).
const SOLUTIONS = [-11, -10, -5, -4, 1, 2, 7, 8, 13, 14]

type Mode = 'Z' | 'TWO' | 'ZPLUS' | 'R'
const MODES: Record<Mode, { m: number; lo: number; hi: number; set: string; button: string }> = {
  Z: { m: 1, lo: -2, hi: 2, set: 'Z', button: '+k\\pi,\\ k\\in Z' },
  TWO: { m: 2, lo: -1, hi: 1, set: 'Z', button: '+2k\\pi' },
  ZPLUS: { m: 1, lo: 1, hi: 2, set: 'Z^+', button: 'k\\in Z^+' },
  R: { m: 1, lo: -2, hi: 2, set: 'R', button: 'k\\in R' },
}
const ORDER: Mode[] = ['Z', 'TWO', 'ZPLUS', 'R']

/** Does the answer in this mode generate x = nπ/6 for some allowed k? */
function caughtBy(n: number, mode: Mode): boolean {
  const { m } = MODES[mode]
  return [1, 2].some(base => {
    const k = (n - base) / (6 * m)
    return Number.isInteger(k) && (mode !== 'ZPLUS' || k >= 1)
  })
}

function hcf(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : hcf(b, a % b)
}

/** nπ/d in lowest terms, as TeX. */
function piTex(n: number, d: number): string {
  if (n === 0) return '0'
  const h = hcf(n, d)
  const a = Math.abs(n / h)
  const b = d / h
  const top = a === 1 ? '\\pi' : `${a}\\pi`
  return `${n < 0 ? '-' : ''}${b === 1 ? top : `\\tfrac{${top}}{${b}}`}`
}

function Open({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

export default function EverySolution() {
  const [mode, setMode] = useState<Mode>('Z')
  const [k, setK] = useState(0)
  const cfg = MODES[mode]
  const { m } = cfg
  const real = mode === 'R'

  const choose = (next: Mode) => {
    const c = MODES[next]
    setMode(next)
    setK(next === 'R' ? 0.5 : clamp(Math.round(k), c.lo, c.hi))
  }

  const xP = PI / 6 + m * k * PI
  const xQ = PI / 3 + m * k * PI
  const whole = Math.abs(k - Math.round(k)) < 1e-6
  const pairColor = whole ? C.good : C.bad

  const caught = SOLUTIONS.filter(n => caughtBy(n, mode)).length
  const current = (n: number) => !real && (n === 1 + 6 * m * k || n === 2 + 6 * m * k)

  // The jump arrow: from the pair at kA to the pair at kA + 1 (both inside the slider's range).
  const kA = k + 1 <= cfg.hi ? k : k - 1
  const xa = PI / 6 + m * kA * PI
  const xb = xa + m * PI

  const kTex = (v: number, dp: number) => (v < 0 ? `(${v.toFixed(dp)})` : v.toFixed(dp))
  const term = m === 2 ? `2(${k})\\pi` : `${kTex(k, 0)}\\pi`
  const kOf = m === 2 ? '2k' : 'k'
  const answer = `x = \\tfrac{\\pi}{6} + ${kOf}\\pi \\ \\text{ or } \\ x = \\tfrac{\\pi}{3} + ${kOf}\\pi, \\quad k \\in ${cfg.set}`

  let notice
  if (mode === 'Z') {
    notice = (
      <Notice tone="good">
        <b>Each step of <M>k</M> slides both solutions one full period, <M>\pi</M>, to the right</b> (the period from part
        b: <M>g</M> repeats every <M>\pi</M>). Negative <M>k</M> slides them left. So the two families land on all ten
        intersections on screen, and nowhere else. Now try the report&apos;s common errors, starting with{' '}
        <M>+2k\pi</M>.
      </Notice>
    )
  } else if (mode === 'TWO') {
    notice = (
      <Notice tone="warn">
        <b>Writing <M>+2k\pi</M> means the <M>2k\pi</M> was never divided by 2.</b> Each step of <M>k</M> now jumps{' '}
        <M>2\pi</M>, two periods of <M>g</M>, straight over the pair in between: the red rings at{' '}
        <M>{'\\tfrac{7\\pi}{6}'}</M> and <M>{'\\tfrac{4\\pi}{3}'}</M> (and <M>{'-\\tfrac{5\\pi}{6}'}</M>,{' '}
        <M>{'-\\tfrac{2\\pi}{3}'}</M>) are solutions this answer never reaches. The <M>+2k\pi</M> belonged to{' '}
        <M>2x</M>; once you divide by 2 it must become <M>+k\pi</M>.
      </Notice>
    )
  } else if (mode === 'ZPLUS') {
    notice = (
      <Notice tone="warn">
        <b><M>{'Z^+ = \\{1, 2, 3, \\dots\\}'}</M> leaves out <M>k = 0</M> and every negative <M>k</M>.</b> So even{' '}
        <M>{'\\tfrac{\\pi}{6}'}</M> and <M>{'\\tfrac{\\pi}{3}'}</M>, the first solutions you found, are missing, along with
        everything to their left. The domain is <M>R</M>, so the solutions run in both directions and <M>k</M> must be
        any integer: <M>k \in Z</M>.
      </Notice>
    )
  } else if (whole) {
    notice = (
      <Notice>
        At a whole-number <M>k</M> the pair lands on the line, as before. Now drag <M>k</M> to a value in between, such
        as <M>0.5</M>: with <M>k \in R</M> nothing forbids it.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>With <M>k \in R</M>, <M>{`k = ${k.toFixed(2)}`}</M> is allowed</b>, giving{' '}
        <M>{`x = \\tfrac{\\pi}{6} + ${kTex(k, 2)}\\pi \\approx ${num(xP)}`}</M>, where <M>{`g(x) \\approx ${num(g(xP))}`}</M>,
        not <M>{'\\sqrt3 \\approx 1.73'}</M>. A real <M>k</M> lets <M>x</M> be any real number at all, so this answer
        claims every <M>x</M> is a solution. That is why <M>k \in Z</M> must be written; the report lists{' '}
        <M>k \in R</M> among the common errors.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-2.5, 2.5]} xStep={PI / 2} yStep={1} height={300} xLabels={false} yLabels={false}>
        <Plot.OfX y={g} domain={[X0, X1]} color={C.f} weight={3} />
        {/* Tick numbers drawn below-right of each crossing, where the rising curve leaves room
            (mafs centres them under the tick, right where the curve cuts through). */}
        {[-2, -1, 1, 2].map(n => (
          <Label key={n} at={[n * PI, 0]} attach="se" size={12} gap={5}>{piTick(n * PI)}</Label>
        ))}
        <Line.Segment point1={[X0, R3]} point2={[X1, R3]} color={C.g} weight={2.5} />
        <Label at={[(-5 * PI) / 4, R3]} color={C.g} attach="s" size={12}>y = √3</Label>

        {!real && (
          <>
            <Line.Segment point1={[xa, R3]} point2={[xa, Y_ARROW]} color={C.guide} style="dashed" weight={1.5} />
            <Line.Segment point1={[xb, R3]} point2={[xb, Y_ARROW]} color={C.guide} style="dashed" weight={1.5} />
            <Vector tail={[xa, Y_ARROW]} tip={[xb, Y_ARROW]} color={C.violet} weight={2.5} />
            <Label at={[(xa + xb) / 2, Y_ARROW]} color={C.violet} attach="n" size={12}>{m === 2 ? '+2π' : '+π'}</Label>
          </>
        )}

        {SOLUTIONS.map(n => {
          const x = (n * PI) / 6
          if (real) return <Open key={n} x={x} y={R3} color={C.guide} />
          if (!caughtBy(n, mode)) return <Open key={n} x={x} y={R3} color={C.bad} />
          return <Point key={n} x={x} y={R3} color={C.good} svgCircleProps={{ r: current(n) ? 7 : 4.5 }} />
        })}

        {real && (
          <>
            {!whole && <Line.Segment point1={[xP, g(xP)]} point2={[xP, R3]} color={C.bad} style="dashed" weight={1.5} />}
            {!whole && <Line.Segment point1={[xQ, g(xQ)]} point2={[xQ, R3]} color={C.bad} style="dashed" weight={1.5} />}
            <Point x={xP} y={g(xP)} color={pairColor} svgCircleProps={{ r: 6.5 }} />
            <Point x={xQ} y={g(xQ)} color={pairColor} svgCircleProps={{ r: 6.5 }} />
          </>
        )}
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] text-gray-500 dark:text-gray-400">Answer with</span>
          {ORDER.map(md => (
            <Toggle key={md} label={<M>{MODES[md].button}</M>} checked={mode === md} onChange={() => choose(md)} />
          ))}
        </div>
        <div className="overflow-x-auto text-[13px] text-gray-800 dark:text-gray-100">
          <Katex tex={answer} />
        </div>
        <Slider
          label="k"
          value={k}
          onChange={setK}
          min={cfg.lo}
          max={cfg.hi}
          step={real ? 0.05 : 1}
          format={v => (real ? v.toFixed(2) : String(v))}
        />
        <Readouts>
          {real ? (
            <>
              <Readout
                color={pairColor}
                tex={`g\\left(\\tfrac{\\pi}{6} + ${kTex(k, 2)}\\pi\\right) ${whole ? '= \\sqrt3' : `\\approx ${num(g(xP))}`}`}
              />
              <Readout
                color={pairColor}
                tex={`g\\left(\\tfrac{\\pi}{3} + ${kTex(k, 2)}\\pi\\right) ${whole ? '= \\sqrt3' : `\\approx ${num(g(xQ))}`}`}
              />
            </>
          ) : (
            <>
              <Readout tex={`x = \\tfrac{\\pi}{6} + ${term} = ${piTex(1 + 6 * m * k, 6)}`} />
              <Readout tex={`x = \\tfrac{\\pi}{3} + ${term} = ${piTex(1 + 3 * m * k, 3)}`} />
              <Readout color={C.good} tex={`\\text{caught: } ${caught}`} />
              <Readout color={C.bad} tex={`\\text{missed: } ${10 - caught}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}

function piTick(v: number): string {
  const n = Math.round(v / PI)
  if (Math.abs(v - n * PI) > 1e-6) return ''
  if (n === 1) return 'π'
  if (n === -1) return '−π'
  return `${n < 0 ? '−' : ''}${Math.abs(n)}π`
}
