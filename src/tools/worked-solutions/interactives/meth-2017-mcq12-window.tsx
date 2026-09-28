// 2017 Methods Exam 2 MCQ 12 — drag the right end d of the window [−π, d] across y = sin(2x) and
// y = √3/2. Solutions inside the window light up and a running sum updates: −5π/6, −3π/2, −4π/3, −π,
// π/6, 3π/2. The sum is −π for every d in [π/3, 7π/6), and 3π/4 (option C) is the only option there.
// In that state the two solutions in each hump are shown symmetric about its peak (x = −3π/4 and
// x = π/4), which is why they sum to exactly −π. A toggle shows the slip 2x = π/3 + kπ (solutions
// every π/2): half its dots are where sin(2x) = −√3/2, and its running sum hits −π at d = π/6 —
// option B.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts,
  Region, Slider, Toggle, clamp,
} from './kit'

const PI = Math.PI
const R3 = Math.sqrt(3) / 2
const U = PI / 6 // solutions are whole multiples of π/6
const TRUE_SOLS = [-5, -4, 1, 2, 7, 8] // x = π/6 + kπ and x = π/3 + kπ, in units of π/6
const SLIP_SOLS = [-5, -2, 1, 4, 7] // x = π/6 + kπ/2 (from 2x = π/3 + kπ)
const LO = -PI
const HI = (3 * PI) / 2
const SNAP = PI / 48
const snap = (v: number) => clamp(Math.round(v / SNAP) * SNAP, LO, HI)
const OPTIONS = [
  { letter: 'A', d: 0, tex: '0' },
  { letter: 'B', d: PI / 6, tex: 'π/6' },
  { letter: 'C', d: (3 * PI) / 4, tex: '3π/4' },
  { letter: 'D', d: (7 * PI) / 6, tex: '7π/6' },
  { letter: 'E', d: (3 * PI) / 2, tex: '3π/2' },
]

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a
}

/** n·π/6 as TeX, in lowest terms. */
function piTex(n: number): string {
  if (n === 0) return '0'
  const g = gcd(n, 6)
  const p = n / g
  const q = 6 / g
  const top = Math.abs(p) === 1 ? '\\pi' : `${Math.abs(p)}\\pi`
  return `${p < 0 ? '-' : ''}${q === 1 ? top : `\\tfrac{${top}}{${q}}`}`
}

function piTick(v: number): string {
  const n = Math.round(v / (PI / 2))
  if (Math.abs(v - (n * PI) / 2) > 1e-6) return ''
  const sign = n < 0 ? '−' : ''
  const m = Math.abs(n)
  if (m === 1) return `${sign}π/2`
  if (m === 2) return `${sign}π`
  return m % 2 === 0 ? `${sign}${m / 2}π` : `${sign}${m}π/2`
}

export default function SolutionWindow() {
  const [d, setD] = useState(-PI / 4)
  const [slip, setSlip] = useState(false)

  const sols = slip ? SLIP_SOLS : TRUE_SOLS
  const inWin = (n: number) => n * U <= d + 1e-9
  const counted = sols.filter(inWin)
  const sum = counted.reduce((s, n) => s + n, 0)
  const next = sols.find(n => !inWin(n))
  const hitsTarget = counted.length > 0 && sum === -6
  const good = !slip && hitsTarget

  let notice
  if (slip) {
    notice = (
      <Notice tone="warn">
        With <M>{'2x = \\tfrac{\\pi}{3} + k\\pi'}</M> the dots come every <M>{'\\tfrac{\\pi}{2}'}</M>, and every second one
        (red, on the dashed line) is not a solution: <M>{'\\sin\\left(2 \\times -\\tfrac{\\pi}{3}\\right) = -\\tfrac{\\sqrt3}{2}'}</M>.
        Adding <M>\pi</M> to <M>2x</M> flips the sign of sine. With these dots the sum reaches <M>-\pi</M> at{' '}
        <M>{'d = \\tfrac{\\pi}{6}'}</M> — option B.
      </Notice>
    )
  } else if (counted.length === 0) {
    notice = (
      <Notice>
        No solutions in the window yet. Drag <M>d</M> to the right: each time the window passes a dot, that{' '}
        <M>x</M>-value joins the sum.
      </Notice>
    )
  } else if (good) {
    notice = (
      <Notice tone="good">
        The sum is <M>-\pi</M> for every <M>d</M> on the green bar, from <M>{'\\tfrac{\\pi}{3}'}</M> up to (not including){' '}
        <M>{'\\tfrac{7\\pi}{6}'}</M>, and <M>{'\\tfrac{3\\pi}{4}'}</M> (option C) is the only option on it. Why exactly{' '}
        <M>-\pi</M>? Each hump&apos;s two solutions are symmetric about its peak, so they add to twice the peak&apos;s{' '}
        <M>x</M>: <M>{'2\\left(-\\tfrac{3\\pi}{4}\\right) + 2\\left(\\tfrac{\\pi}{4}\\right) = -\\pi'}</M>.
      </Notice>
    )
  } else if (sum > -6 && d >= (7 * PI) / 6 - 1e-9) {
    notice = (
      <Notice tone="warn">
        From <M>{'d = \\tfrac{7\\pi}{6}'}</M> (option D) on, the fifth solution is inside the window, so the sum is now{' '}
        <M>{piTex(sum)}</M>, no longer <M>-\pi</M>. The window has to stop <b>before</b> <M>{'\\tfrac{7\\pi}{6}'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Sum so far: <M>{piTex(sum)}</M>, not <M>-\pi</M> yet. The next solution,{' '}
        <M>{next !== undefined ? piTex(next) : ''}</M>, is not in the window yet. Keep dragging <M>d</M> to the right.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[LO, HI]} y={[-1.25, 1.25]} xStep={PI / 2} yStep={0.5} height={260} xLabels={piTick}>
        <Region top={() => 1.2} bottom={() => -1.2} from={LO} to={d} color={C.violet} opacity={0.1} />
        <Line.Segment point1={[LO, -1.2]} point2={[LO, 1.2]} color={C.guide} style="dashed" weight={1.5} />
        {good && <Line.Segment point1={[PI / 3, 0]} point2={[(7 * PI) / 6, 0]} color={C.good} weight={7} />}
        {good && (
          <>
            <Line.Segment point1={[(-3 * PI) / 4, 0]} point2={[(-3 * PI) / 4, 1]} color={C.violet} style="dashed" weight={1.5} />
            <Line.Segment point1={[PI / 4, 0]} point2={[PI / 4, 1]} color={C.violet} style="dashed" weight={1.5} />
          </>
        )}
        {slip && <Line.Segment point1={[LO, -R3]} point2={[HI, -R3]} color={C.bad} style="dashed" weight={1.5} />}
        <Line.Segment point1={[LO, R3]} point2={[HI, R3]} color={C.g} weight={2.5} />
        <Plot.OfX y={x => Math.sin(2 * x)} domain={[LO, HI]} color={C.f} weight={3} />
        <Label at={[-0.08, R3]} attach="nw" color={C.g}>√3/2</Label>
        {sols.map(n => {
          const x = n * U
          const y = Math.sin(2 * x)
          const ok = Math.abs(y - R3) < 1e-9
          const col = inWin(n) ? (ok ? C.good : C.bad) : C.guide
          return (
            <g key={n}>
              <Line.Segment point1={[x, 0]} point2={[x, y]} color={col} style="dashed" weight={1.2} />
              <Point x={x} y={y} color={col} />
              <Point x={x} y={0} color={col} />
            </g>
          )
        })}
        <Line.Segment point1={[d, -1.2]} point2={[d, 1.2]} color={C.violet} weight={2} />
        <Label at={[d, -1.2]} attach="s" color={C.violet}>d</Label>
        <MovablePoint
          point={[d, 0]}
          color={C.violet}
          constrain={p => [snap(p[0]), 0]}
          onMove={p => setD(snap(p[0]))}
        />
      </Plane>
      <Controls>
        <Slider label="d" value={d} onChange={v => setD(snap(v))} min={LO} max={HI} step={SNAP} format={v => `${(v / PI).toFixed(2)}π`} />
        <Buttons>
          {OPTIONS.map(o => (
            <ActionButton key={o.letter} label={`${o.letter}: ${o.tex}`} onClick={() => setD(o.d)} />
          ))}
          <Toggle label="Slip: 2x = π/3 + kπ" checked={slip} onChange={setSlip} />
        </Buttons>
        <Readouts>
          <Readout
            color={slip ? C.bad : C.good}
            tex={`\\text{${slip ? 'dots' : 'solutions'} in } [-\\pi, d]\\text{: } ${counted.length}`}
          />
          <Readout color={hitsTarget ? C.good : C.violet} tex={`\\text{sum} = ${piTex(sum)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
