// 2023 Methods Exam 2 MCQ 19 — y = p(x) = x² + (4k + 3)x + 4k² − 9/4 with a slider for k. It starts at
// k = 1, inside option A (Δ = 24k + 18 > 0, two real roots) but with both roots negative: the
// y-intercept p(0) = 4k² − 9/4 sits above the axis. Dragging k just below 3/4 pulls p(0) below the axis,
// and an upward parabola that is below the axis at x = 0 must cross once on each side — one negative
// root, one positive. The key values k = ±3/4 are on the slider (at both, x = 0 is a root). The
// chips show which options contain the current k, so the student sees A, B, C and E each contain
// values of k that fail.

import { useState } from 'react'
import { C, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num, tick } from './kit'

const XR: [number, number] = [-8, 3]
const YR: [number, number] = [-5, 6]
const Q = 0.75
// Δ and p(0) are exact at 2 dp for k a multiple of 0.05; drop trailing zeros.
const trim = (v: number) => num(v).replace(/\.?0+$/, '')

const OPTIONS: { letter: string; tex: string; has: (k: number) => boolean }[] = [
  { letter: 'A', tex: 'k>-\\tfrac34', has: k => k > -Q },
  { letter: 'B', tex: 'k\\ge-\\tfrac34', has: k => k >= -Q },
  { letter: 'C', tex: 'k>\\tfrac34', has: k => k > Q },
  { letter: 'D', tex: '-\\tfrac34<k<\\tfrac34', has: k => k > -Q && k < Q },
  { letter: 'E', tex: 'k<-\\tfrac34 \\text{ or } k>\\tfrac34', has: k => k < -Q || k > Q },
]

export default function InterceptSign() {
  const [raw, setRaw] = useState(1)
  const k = Math.round(raw * 20) / 20 // multiples of 0.05, so k = ±3/4 land exactly

  const b = 4 * k + 3
  const c = 4 * k * k - 9 / 4
  const p = (x: number) => x * x + b * x + c
  const disc = 24 * k + 18 // = b² − 4c
  const p0 = c
  const roots = disc > 1e-9 ? [(-b - Math.sqrt(disc)) / 2, (-b + Math.sqrt(disc)) / 2] : disc > -1e-9 ? [-b / 2] : []
  const works = roots.length === 2 && roots[0] < -1e-9 && roots[1] > 1e-9
  const at = (v: number) => Math.abs(k - v) < 1e-9

  let rootText: string
  if (roots.length === 0) rootText = '\\text{no real roots}'
  else if (roots.length === 1) rootText = `x = ${num(roots[0], 0)} \\text{ (repeated)}`
  else rootText = `x \\approx ${num(roots[0])},\\ ${num(roots[1])}`

  let notice
  if (at(Q)) {
    notice = (
      <Notice tone="warn">
        At <M>{'k = \\tfrac34'}</M>, <M>{'p(0) = 0'}</M>: the equation is <M>{'x^2 + 6x = 0'}</M>, with roots{' '}
        <M>0</M> and <M>-6</M>. Zero is neither positive nor negative, so <M>{'k = \\tfrac34'}</M> is excluded — that is
        why the right end of D is strict.
      </Notice>
    )
  } else if (at(-Q)) {
    notice = (
      <Notice tone="warn">
        At <M>{'k = -\\tfrac34'}</M>, <M>{'\\Delta = 0'}</M> and the equation is <M>{'x^2 = 0'}</M>: one repeated root at{' '}
        <M>{'x = 0'}</M>. That is not two solutions, and not one of each sign — yet option B lets this value in.
      </Notice>
    )
  } else if (k > Q) {
    notice = (
      <Notice tone="warn">
        <M>{`\\Delta = 24k + 18 = ${trim(disc)} > 0`}</M>, so there are two real roots and this <M>k</M> is in
        option A — but both roots are negative. The y-intercept <M>{'p(0)'}</M> is above the axis, so the upward
        parabola can only cross on one side of it. Drag <M>k</M> a little below <M>{'\\tfrac34'}</M> and watch{' '}
        <M>{'p(0)'}</M> drop below the axis.
      </Notice>
    )
  } else if (k > -Q) {
    notice = (
      <Notice tone="good">
        <M>{`p(0) = ${trim(p0)}`}</M> is below the axis. The parabola opens upward, so it must cut the x-axis once
        to the left of the y-axis and once to the right: one negative root, one positive. This also forces{' '}
        <M>{'\\Delta > 0'}</M>, so the discriminant adds nothing new.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{`\\Delta = 24k + 18 = ${trim(disc)} < 0`}</M>: the parabola sits entirely above the x-axis, so there
        are no real roots. Option E contains these <M>k</M>; it is the set where <M>{'p(0) > 0'}</M>, the sign
        condition turned the wrong way round.
      </Notice>
    )
  }

  const p0Color = p0 < -1e-9 ? C.good : p0 > 1e-9 ? C.bad : C.violet

  return (
    <div>
      <Plane x={XR} y={YR} xStep={1} yStep={1} height={300} yLabels={false} xLabels={v => (v < XR[0] - 0.5 ? '' : tick(v))}>
        <Plot.OfX y={p} domain={XR} color={C.f} weight={3} />
        {roots.map(r => (
          <Point key={r} x={r} y={0} color={C.g} />
        ))}
        <Point x={0} y={p0} color={p0Color} />
        <Label at={[0, p0]} attach="w" color={p0Color} gap={9}>
          p(0)
        </Label>
      </Plane>
      <div className="mt-3 flex flex-col gap-3">
        <Slider label="k" value={raw} onChange={setRaw} min={-1.25} max={1.25} step={0.05} format={() => trim(k)} />
        <Readouts>
          <Readout tex={`\\Delta = 24k + 18 = ${trim(disc)}`} />
          <Readout tex={`p(0) = 4k^2 - \\tfrac94 = ${trim(p0)}`} color={p0Color} />
          <Readout tex={rootText} color={C.g} />
        </Readouts>
        <p className={`text-[13px] font-semibold ${works ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400'}`}>
          {works ? '✓ One positive and one negative solution' : '✗ Not one positive and one negative solution'}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 text-[12.5px]">
          <span className="text-gray-600 dark:text-gray-300">This k is in:</span>
          {OPTIONS.map(o => {
            const inIt = o.has(k)
            return (
              <span
                key={o.letter}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 ${
                  !inIt
                    ? 'border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500 opacity-60'
                    : works
                      ? 'border-emerald-400 text-emerald-800 dark:border-emerald-700 dark:text-emerald-200'
                      : 'border-red-300 text-red-700 dark:border-red-800 dark:text-red-300'
                }`}
              >
                <b>{o.letter}</b> <M>{o.tex}</M>
              </span>
            )
          })}
        </div>
        {notice}
      </div>
    </div>
  )
}
