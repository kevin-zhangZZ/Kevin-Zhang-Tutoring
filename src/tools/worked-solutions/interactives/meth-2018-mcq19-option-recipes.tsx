// 2018 Methods Exam 2 MCQ 19 — what each option actually adds up. The four shaded regions between
// f(x) = cos(πx/2) and g(x) = sin(πx) have areas 1/(2π), 1/(2π), 1/(2π), 9/(2π). Every option is some
// combination of signed integrals, so it counts each region a whole number of times: +1, ×2, 0, or −1
// (subtracted). Pick an option and each region is coloured by how it is counted, with the option's
// value against the true total 6/π. C counts region 2 twice and region 3 not at all, which works only
// because the two are congruent (half-turn about (1, 0)); E, the most popular choice, subtracts the
// big last region and comes out negative. Multipliers and values checked in sympy.

import { useState, type ReactNode } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, tick } from './kit'

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
const LETTERS: Letter[] = ['A', 'B', 'C', 'D', 'E']

const f = (x: number) => Math.cos((Math.PI * x) / 2)
const g = (x: number) => Math.sin(Math.PI * x)
const top = (x: number) => Math.max(f(x), g(x))
const bottom = (x: number) => Math.min(f(x), g(x))
const CROSS = [0, 1 / 3, 1, 5 / 3, 3]
/** Each region's area, in units of 1/(2π). */
const AREA = [1, 1, 1, 9]
const TRUE_TOTAL = 12 // 6/π = 12/(2π)

/** How many times each option counts each region's area (negative = subtracted). */
const COUNTS: Record<Letter, number[]> = {
  A: [-1, 1, -1, 1],
  B: [0, 0, 0, 2],
  C: [1, 2, 0, 1],
  D: [0, 0, 2, 2],
  E: [1, 2, 0, -1],
}

/** The option's value as a TeX fraction of π, from its total in units of 1/(2π). */
function valueTex(u: number) {
  const exact: Record<number, string> = { 8: '\\tfrac4\\pi', 18: '\\tfrac9\\pi', 12: '\\tfrac6\\pi', 20: '\\tfrac{10}\\pi', [-6]: '-\\tfrac3\\pi' }
  return `${exact[u] ?? `\\tfrac{${u}}{2\\pi}`} \\approx ${(u / (2 * Math.PI)).toFixed(3)}`
}

function colorOf(n: number) {
  if (n < 0) return C.bad
  if (n === 0) return C.guide
  if (n === 1) return C.good
  return C.violet
}
const tagOf = (n: number) => (n === 0 ? '0' : n === 1 ? '+1' : n === 2 ? '×2' : '−1')

const NOTES: Record<Letter, { tone: 'neutral' | 'good' | 'warn'; body: ReactNode }> = {
  A: {
    tone: 'warn',
    body: (
      <>
        One integral of <M>g - f</M> straight across <M>[0,3]</M>. Where <M>f</M> is on top (the first and third regions), <M>g - f</M> is negative,
        so those two regions are <b>subtracted</b>. The value <M>{'\\tfrac4\\pi'}</M> falls short of the area by twice their areas.
      </>
    ),
  },
  B: {
    tone: 'warn',
    body: (
      <>
        Only the last region, counted twice. That would be right only if the last region were a copy of the other three
        together, but it is far bigger: <M>{'\\tfrac{9}{2\\pi}'}</M> against <M>{'\\tfrac{3}{2\\pi}'}</M>. The value{' '}
        <M>{'\\tfrac9\\pi'}</M> overshoots.
      </>
    ),
  },
  C: {
    tone: 'good',
    body: (
      <>
        The second region has <M>g</M> on top, so <M>{'\\int_{1/3}^{1}(f-g)\\,dx'}</M> is negative and <M>{'-2\\int'}</M> adds its area{' '}
        <b>twice</b>: once for itself and once for the third region, its half-turn copy about <M>(1,0)</M>. The last region also has{' '}
        <M>g</M> on top, so its minus sign makes it positive. As the second and third regions are the same size, every area is counted exactly once. Now pick{' '}
        <b>E</b>, the most popular answer.
      </>
    ),
  },
  D: {
    tone: 'warn',
    body: (
      <>
        The third region doubled does stand in for the middle two, but the first region is left out and the big last region is doubled. The
        value <M>{'\\tfrac{10}\\pi'}</M> is too large.
      </>
    ),
  },
  E: {
    tone: 'warn',
    body: (
      <>
        E matches C except for the last term, <M>{'+\\int_{5/3}^{3}(f-g)\\,dx'}</M>. But <M>g</M> is on top there (at <M>x=2</M>,{' '}
        <M>f=-1</M> and <M>g=0</M>), so that integral is <M>{'-\\tfrac{9}{2\\pi}'}</M> and the biggest region is{' '}
        <b>subtracted</b>. The total is negative, which no area can be.
      </>
    ),
  },
}

export default function OptionRecipes() {
  const [pick, setPick] = useState<Letter>('C')
  const counts = COUNTS[pick]
  const total = counts.reduce((s, n, i) => s + n * AREA[i], 0)
  const sumTex = counts
    .map((n, i) => ({ n, a: AREA[i] }))
    .filter(t => t.n !== 0)
    .map((t, j) => {
      const term = Math.abs(t.n) === 1 ? `${t.a}` : `${Math.abs(t.n)}(${t.a})`
      return (t.n < 0 ? '-' : j === 0 ? '' : '+') + term
    })
    .join('')
  const ok = total === TRUE_TOTAL
  const mid = [1 / 6, 2 / 3, 4 / 3, 7 / 3]

  return (
    <div>
      <Plane x={[-0.1, 3.2]} y={[-1.2, 1.4]} xStep={1} yStep={0.5} height={320} yLabels={v => (v > 1.2 ? '' : tick(v))}>
        {counts.map((n, r) => (
          <Region
            key={r}
            top={top}
            bottom={bottom}
            from={CROSS[r]}
            to={CROSS[r + 1]}
            color={colorOf(n)}
            opacity={n === 0 ? 0.1 : n === 2 ? 0.45 : 0.3}
          />
        ))}
        <Plot.OfX y={f} domain={[-0.1, 3.2]} color={C.f} weight={2.5} />
        <Plot.OfX y={g} domain={[-0.1, 3.2]} color={C.g} weight={2.5} />
        {[1 / 3, 5 / 3].map(c => (
          <Line.Segment key={c} point1={[c, 0]} point2={[c, f(c)]} color={C.guide} style="dashed" />
        ))}
        {counts.map((n, r) => (
          <Label key={r} at={[mid[r], 1.2]} attach="c" color={colorOf(n)} size={14}>
            {tagOf(n)}
          </Label>
        ))}
        <Label at={[2, f(2)]} color={C.f} attach="s">f</Label>
        <Label at={[2.9, g(2.9)]} color={C.g} attach="e">g</Label>
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Option:</span>
          {LETTERS.map(L => (
            <button
              key={L}
              type="button"
              onClick={() => setPick(L)}
              className={
                'text-[13px] font-bold w-9 py-1.5 rounded-full border ' +
                (L === pick
                  ? 'bg-sky-600 border-sky-600 text-white dark:bg-sky-500 dark:border-sky-500'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300')
              }
            >
              {L}
            </button>
          ))}
        </div>
        <Readouts>
          <Readout tex={`\\text{areas, left to right} = \\tfrac{1}{2\\pi},\\ \\tfrac{1}{2\\pi},\\ \\tfrac{1}{2\\pi},\\ \\tfrac{9}{2\\pi}`} />
          <Readout color={ok ? C.good : C.bad} tex={`\\text{${pick}} = \\tfrac{1}{2\\pi}(${sumTex}) = ${valueTex(total)}${ok ? '\\ \\checkmark' : ''}`} />
          <Readout tex={`\\text{total area} = ${valueTex(TRUE_TOTAL)}`} />
        </Readouts>
        <Notice tone={NOTES[pick].tone}>{NOTES[pick].body}</Notice>
      </Controls>
    </div>
  )
}
