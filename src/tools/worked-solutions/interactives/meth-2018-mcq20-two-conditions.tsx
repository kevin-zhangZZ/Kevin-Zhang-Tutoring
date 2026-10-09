// 2018 Methods Exam 2 MCQ 20 — a diagonal matrix [[P, 0], [0, Q]] is a horizontal scaling by P and a
// vertical scaling by Q, so it multiplies every gradient by Q/P (run × P, rise × Q: see the rise/run
// triangle on the tangent) and the area under the curve by |P|Q. The question never gives f, so the
// widget uses one sample pdf with median 0 and f′(0) = 4 (a left-skewed Gumbel-type curve,
// f(x) = (1/β)e^{z − e^z}, z = (x − μ)/β, β ≈ 0.1631, μ ≈ 0.0598; median and f′(0) checked in sympy).
// Pick an option (or drag P and Q) to see g(x) = Q f(x/P), its tangent at the median, and the two
// tests: g′(0) = −1 and area = 1 with g ≥ 0. B, the most popular answer, passes the gradient test
// and fails the area test (the curve is flipped under the axis). Only A passes both.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, tick } from './kit'

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
const LETTERS: Letter[] = ['A', 'B', 'C', 'D', 'E']
const OPTS: Record<Letter, [number, number]> = {
  A: [-2, 0.5],
  B: [2, -0.5],
  C: [2, 0.5],
  D: [-0.5, 2],
  E: [0.5, -2],
}

const BETA = 0.163054502637057
const MU = 0.0597615819754984
const f = (x: number) => {
  const z = (x - MU) / BETA
  return Math.exp(z - Math.exp(z)) / BETA
}
const F0 = f(0) // ≈ 2.1255
const FP0 = 4
const RUN = 0.15

/** ±k/2, ±k/4 as TeX fractions, integers as is. */
function fr(v: number) {
  const s = v < 0 ? '-' : ''
  const a = Math.abs(v)
  if (Math.abs(a - Math.round(a)) < 1e-9) return `${s}${Math.round(a)}`
  for (const d of [2, 4, 8, 16]) {
    const n = a * d
    if (Math.abs(n - Math.round(n)) < 1e-9) return `${s}\\tfrac{${Math.round(n)}}{${d}}`
  }
  return `${s}${a.toFixed(2)}`
}

const X0 = -1.8
const X1 = 1.8
const Y0 = -2.6
const Y1 = 2.9

export default function TwoConditions() {
  const [pick, setPick] = useState<Letter | null>('B')
  const [P, setP] = useState(2)
  const [Q, setQ] = useState(-0.5)

  const choose = (L: Letter) => {
    setPick(L)
    setP(OPTS[L][0])
    setQ(OPTS[L][1])
  }

  const g = (x: number) => Q * f(x / P)
  const slope = (Q / P) * FP0
  const area = Math.abs(P) * Q
  const slopeOk = Math.abs(slope + 1) < 1e-9
  const areaOk = Math.abs(area - 1) < 1e-9 && Q > 0
  const G0 = Q * F0
  const gColor = Q >= 0 ? C.good : C.bad

  // Tangent segments at the median, and the rise/run triangle on f's tangent and its image.
  const tf = (x: number) => F0 + FP0 * x
  const tg = (x: number) => G0 + slope * x
  const triF: [number, number][] = [[0, F0], [RUN, F0], [RUN, F0 + FP0 * RUN]]
  const triG: [number, number][] = triF.map(([x, y]) => [P * x, Q * y])
  const labelX = -0.35 * P
  const labelAttach = ((Q >= 0 ? 'n' : 's') + (P < 0 ? 'e' : 'w')) as 'ne' | 'nw' | 'se' | 'sw'

  let notice
  if (pick === 'A') {
    notice = (
      <Notice tone="good">
        <b>Both tests pass.</b> Reflecting in the <M>y</M>-axis turns the uphill gradient <M>4</M> into <M>-4</M>; stretching
        sideways by <M>2</M> doubles every run, so <M>-2</M>; squashing by <M>{'\\tfrac12'}</M> halves every rise, so <M>-1</M>.
        The area is <M>{'2 \\times \\tfrac12 = 1'}</M> and the curve stays above the axis. Now try <b>B</b>.
      </Notice>
    )
  } else if (pick === 'B') {
    notice = (
      <Notice tone="warn">
        <b>B passes the gradient test</b>: <M>{'\\tfrac{-1/2}{2}\\times 4 = -1'}</M>. But its reflection is in the <M>x</M>-axis, so
        the whole curve is flipped <b>under</b> the axis: <M>{'g(x) < 0'}</M> everywhere and the &ldquo;area&rdquo; is <M>-1</M>. A
        probability density can never be negative, so the reflection must be in the <M>y</M>-axis instead. Try <b>A</b>.
      </Notice>
    )
  } else if (pick === 'C') {
    notice = (
      <Notice tone="warn">
        The area is still <M>{'2\\times\\tfrac12 = 1'}</M>, but nothing reflects, so the curve is still going <b>uphill</b> at the
        median: <M>{"g'(0) = +1"}</M>, not <M>-1</M>.
      </Notice>
    )
  } else if (pick === 'D' || pick === 'E') {
    notice = (
      <Notice tone="warn">
        The two factors are the wrong way round. Squashing sideways by <M>{'\\tfrac12'}</M> halves every run, which{' '}
        <b>doubles</b> the gradient, stretching up by <M>2</M> doubles it again, and the reflection makes it negative:{' '}
        <M>{'4 \\to -16'}</M>. The curve is so tall it
        runs off the top{pick === 'E' ? ' (here, off the bottom, because E also flips it under the axis)' : ''}.
      </Notice>
    )
  } else if (slopeOk && areaOk) {
    notice = (
      <Notice tone="good">
        That is option <b>A</b>&apos;s matrix: the only pair with <M>{'\\tfrac QP = -\\tfrac14'}</M>, <M>{'|P|\\,Q = 1'}</M> and{' '}
        <M>{'Q > 0'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Watch the triangle on the tangent: its run is multiplied by <M>P</M> and its rise by <M>Q</M>, so the gradient is
        multiplied by <M>{'\\tfrac QP'}</M>. The area is multiplied by <M>{'|P|\\,Q'}</M>. Find the one pair that gives{' '}
        <M>{"g'(0) = -1"}</M> <b>and</b> keeps the area <M>1</M> above the axis.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={0.5} yStep={1} height={330} yLabels={v => (Math.abs(v) > 2.5 ? '' : tick(v))}>
        <Region top={x => Math.max(g(x), 0)} bottom={x => Math.min(g(x), 0)} from={X0} to={X1} color={gColor} opacity={0.18} samples={240} />
        <Plot.OfX y={f} domain={[X0, X1]} color={C.f} weight={2} />
        <Plot.OfX y={g} domain={[X0, X1]} color={C.g} weight={3.5} />
        <Line.Segment point1={[-0.24, tf(-0.24)]} point2={[0.17, tf(0.17)]} color={C.f} style="dashed" weight={2} />
        <Line.Segment point1={[-0.45, tg(-0.45)]} point2={[0.45, tg(0.45)]} color={C.g} style="dashed" weight={2} />
        <Polygon points={triF} color={C.f} fillOpacity={0.15} weight={1.5} />
        <Polygon points={triG} color={C.g} fillOpacity={0.15} weight={1.5} />
        <Label at={[RUN, F0 + FP0 * RUN]} color={C.f} attach="e">f</Label>
        <Label at={[labelX, g(labelX)]} color={C.g} attach={labelAttach}>g</Label>
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Option:</span>
          {LETTERS.map(L => (
            <button
              key={L}
              type="button"
              onClick={() => choose(L)}
              className={
                'text-[13px] font-bold w-9 py-1.5 rounded-full border ' +
                (L === pick
                  ? 'bg-sky-700 border-sky-700 text-white dark:bg-sky-500 dark:border-sky-500 dark:text-gray-950'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300')
              }
            >
              {L}
            </button>
          ))}
        </div>
        <Slider
          label="P"
          value={P}
          onChange={v => {
            setPick(null)
            setP(Math.abs(v) < 0.25 ? (v < 0 ? -0.25 : 0.25) : v)
          }}
          min={-3}
          max={3}
          step={0.25}
        />
        <Slider
          label="Q"
          value={Q}
          onChange={v => {
            setPick(null)
            setQ(v)
          }}
          min={-3}
          max={3}
          step={0.25}
        />
        <Readouts>
          <Readout tex={`\\begin{bmatrix}${fr(P)}&0\\\\0&${fr(Q)}\\end{bmatrix}`} />
          <Readout
            color={slopeOk ? C.good : C.bad}
            tex={`g'(0) = \\tfrac{Q}{P}f'(0) = ${fr(slope)}\\ ${slopeOk ? '\\checkmark' : '\\times'}`}
          />
          <Readout
            color={areaOk ? C.good : C.bad}
            tex={`\\text{area} = |P|\\,Q = ${fr(area)}\\ ${areaOk ? '\\checkmark' : '\\times'}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
