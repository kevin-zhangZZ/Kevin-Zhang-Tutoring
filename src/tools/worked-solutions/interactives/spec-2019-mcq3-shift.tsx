// 2019 Specialist Exam 2 MCQ 3 — why the implied domain of f(x) = 1 − sec(x + π/4) excludes
// x = (4n + 1)π/4. Slide the shift s from 0 to π/4 in y = 1 − sec(x + s): at s = 0 the vertical
// asymptotes are where cos x = 0, x = (2n − 1)π/2 (option E's set); as s grows every asymptote
// moves s units LEFT, ending at x = π/4 + nπ = (4n + 1)π/4 (option D). The toggle draws option
// C's values x = (4n − 1)π/4 = 3π/4 + nπ — the asymptotes moved the wrong way (24% chose C) — and
// shows each one passing straight through a point of the graph (f(−π/4) = 0, f(3π/4) = 2), so
// those x-values are in the domain. Checked with sympy: cos(x + π/4) = 0 ⇔ x = π/4 + nπ.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, PlayButton, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, tick, usePlayer } from './kit'

const PI = Math.PI
const S_MAX = PI / 4
const X: [number, number] = [-1.5 * PI, 2 * PI]
const Y: [number, number] = [-5, 7]
const EPS = 0.1 // branch ends this close to an asymptote: |sec| ≈ 10, well off the padded view

const f = (x: number, s: number) => 1 - 1 / Math.cos(x + s)

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** A multiple of π/48 as a plain-text fraction ("3π/4"), or 2 dp if it isn't one. */
function piText(v: number): string {
  const k = Math.round(v / (PI / 48))
  if (Math.abs(v - (k * PI) / 48) > 1e-6) return v.toFixed(2)
  if (k === 0) return '0'
  const g = gcd(Math.abs(k), 48)
  const n = k / g
  const d = 48 / g
  const sign = n < 0 ? '−' : ''
  const top = Math.abs(n) === 1 ? 'π' : `${Math.abs(n)}π`
  return d === 1 ? `${sign}${top}` : `${sign}${top}/${d}`
}

/** The same as TeX ("\tfrac{3\pi}{4}"). */
function piTex(v: number): string {
  const k = Math.round(v / (PI / 48))
  if (Math.abs(v - (k * PI) / 48) > 1e-6) return v.toFixed(2)
  if (k === 0) return '0'
  const g = gcd(Math.abs(k), 48)
  const n = Math.abs(k / g)
  const d = 48 / g
  const top = n === 1 ? '\\pi' : `${n}\\pi`
  return `${k < 0 ? '-' : ''}${d === 1 ? top : `\\tfrac{${top}}{${d}}`}`
}

const halfPiTicks = (v: number) => piText(v)

// Option C's excluded values (4n − 1)π/4 inside the window, with f there when s = π/4.
const C_XS = [-5, -1, 3, 7].map(k => (k * PI) / 4)

export default function ShiftAsymptotes() {
  const [s, setS] = useState(S_MAX)
  const [showC, setShowC] = useState(false)
  const player = usePlayer(setS, { min: 0, max: S_MAX, seconds: 4 })
  const atStart = s < 1e-6
  const atEnd = Math.abs(s - S_MAX) < 1e-6

  // Asymptotes x = π/2 − s + nπ; branch n runs between asymptote n and asymptote n + 1.
  const asym: { x: number; n: number }[] = []
  for (let n = -3; n <= 3; n++) {
    const a = PI / 2 - s + n * PI
    if (a > X[0] - 0.01 && a < X[1] + 0.01) asym.push({ x: a, n })
  }
  const branches: [number, number][] = []
  for (let n = -3; n <= 2; n++) {
    const a = PI / 2 - s + n * PI
    const lo = Math.max(a + EPS, X[0] - 0.3)
    const hi = Math.min(a + PI - EPS, X[1] + 0.3)
    if (hi > lo) branches.push([lo, hi])
  }

  let notice
  if (showC) {
    notice = (
      <Notice tone="warn">
        <b>Red: option C&apos;s values</b> <M>{'x=-\\frac{\\pi}{4},\\ \\frac{3\\pi}{4},\\ \\frac{7\\pi}{4},\\dots'}</M> — the
        asymptotes moved <i>right</i> instead of left. Each red line runs straight through a point of the graph:{' '}
        <M>{'f\\left(-\\frac{\\pi}{4}\\right)=1-\\sec 0=0'}</M> and <M>{'f\\left(\\frac{3\\pi}{4}\\right)=1-\\sec\\pi=2'}</M>. A
        value with an output can&apos;t be missing from the domain; these are the turning points, where{' '}
        <M>{'\\cos\\left(x+\\frac{\\pi}{4}\\right)=\\pm1'}</M>.
      </Notice>
    )
  } else if (atStart) {
    notice = (
      <Notice>
        With no shift this is <M>{'y=1-\\sec x'}</M>: the asymptotes sit where <M>{'\\cos x=0'}</M>, at{' '}
        <M>{'x=\\frac{(2n-1)\\pi}{2}'}</M> — that is option E&apos;s set. But the question has <M>{'x+\\frac{\\pi}{4}'}</M>{' '}
        inside the bracket. Press play, or drag <M>s</M> up to <M>{'\\frac{\\pi}{4}'}</M>, and watch which way the asymptotes
        go.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="good">
        <b>This is the question&apos;s function.</b> The bracket <M>{'x+\\frac{\\pi}{4}'}</M> reaches <M>{'\\frac{\\pi}{2}'}</M>{' '}
        when <M>{'x=\\frac{\\pi}{4}'}</M>, so every asymptote has moved <M>{'\\frac{\\pi}{4}'}</M> to the <b>left</b>, to{' '}
        <M>{'x=\\frac{\\pi}{4}+n\\pi=\\frac{(4n+1)\\pi}{4}'}</M>: option D. Turn on option C&apos;s values to see the
        wrong-way shift fail.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Adding <M>s</M> inside the bracket moves every asymptote <M>s</M> units to the <b>left</b>: <M>{'x+s'}</M> reaches{' '}
        <M>{'\\frac{\\pi}{2}'}</M> when <M>x</M> is only <M>{'\\frac{\\pi}{2}-s'}</M>. Each input gets a head start of{' '}
        <M>s</M>, so everything happens <M>s</M> earlier.
      </Notice>
    )
  }

  const sTex = piTex(s)
  const inner = atStart ? 'x' : `x+${sTex}`

  return (
    <div className="space-y-3">
      <Plane x={X} y={Y} xStep={PI / 2} yStep={1} height={330} xLabels={halfPiTicks} yLabels={v => (v < Y[0] || v > Y[1] ? '' : tick(v))}>
        {asym.map(({ x, n }) => (
          <g key={n}>
            <Line.ThroughPoints point1={[x, 0]} point2={[x, 1]} color={C.g} style="dashed" weight={2} />
            {/* The label goes on the side of the line where the bottom of the plane is empty. */}
            <Label at={[x, -4.4]} attach={n % 2 === 0 ? 'e' : 'w'} color={C.g} size={12}>
              {piText(x)}
            </Label>
          </g>
        ))}
        {branches.map(([lo, hi], i) => (
          <Plot.OfX key={i} y={x => f(x, s)} domain={[lo, hi]} color={C.f} weight={3} />
        ))}
        {showC &&
          C_XS.map(cx => {
            const cy = f(cx, s)
            const onScreen = Number.isFinite(cy) && cy > Y[0] && cy < Y[1]
            return (
              <g key={cx}>
                <Line.ThroughPoints point1={[cx, 0]} point2={[cx, 1]} color={C.bad} style="dashed" weight={2} />
                {onScreen && <Point x={cx} y={cy} color={C.bad} />}
                {onScreen && atEnd && (cx === -PI / 4 || cx === (3 * PI) / 4) && (
                  <Label at={[cx, cy]} attach={cy > 1 ? 'se' : 'nw'} color={C.bad} size={12}>
                    {`(${piText(cx)}, ${Math.round(cy)})`}
                  </Label>
                )}
              </g>
            )
          })}
      </Plane>
      <Controls>
        <Slider
          label="s"
          value={s}
          onChange={v => {
            player.stop()
            setS(v)
          }}
          min={0}
          max={S_MAX}
          step={PI / 48}
          format={piText}
        />
        <div className="flex flex-wrap items-center gap-3">
          <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Play the shift" />
          <Toggle
            label="Show option C's values"
            checked={showC}
            onChange={v => {
              setShowC(v)
              if (v) {
                player.stop()
                setS(S_MAX)
              }
            }}
          />
        </div>
      </Controls>
      <Readouts>
        <Readout tex={`y=1-\\sec\\left(${inner}\\right)`} color={C.f} />
        <Readout tex={`\\text{asymptotes: } x=\\tfrac{\\pi}{2}${atStart ? '' : `-${sTex}`}+n\\pi`} color={C.g} />
      </Readouts>
      {notice}
    </div>
  )
}
