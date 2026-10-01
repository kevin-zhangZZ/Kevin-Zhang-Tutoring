// 2022 Specialist Exam 1 Q3a — why the total time for four cups has sd 3, not 4 × 1.5 = 6. Each
// round pours four separate cups from X ~ N(10, 1.5²) and the totals pile up into a histogram
// (bars above 34 s in blue, the left tail in red). The N(40, 3²) curve fits the bars, the sd of
// the poured totals comes out near 3, and about 97.7% of totals exceed 34 (the answer, 0.98).
// The last round's deviations from 10 s show slow and fast cups partly cancelling. A toggle lays
// the wrong sd-6 curve (the sd of 4X, one cup × 4) over the same bars: far too wide, and it
// predicts only 84% above 34.

import { useMemo, useRef, useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Toggle,
} from './kit'

const MU = 10
const SIGMA = 1.5
const N = 4
const TOTAL_MU = N * MU
const TOTAL_SD = Math.sqrt(N * SIGMA * SIGMA) // 3
const WRONG_SD = N * SIGMA // 6
const CUT = 34
const LO = 24
const HI = 56
const BIN = 1
const START = 500
const MAX_ROUNDS = 5000

const pdf = (sd: number) => (x: number) =>
  Math.exp(-0.5 * ((x - TOTAL_MU) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))

// Abramowitz & Stegun 7.1.26 (error below 1.5e-7): plenty for 3 decimal places.
function erf(x: number) {
  const s = Math.sign(x)
  const a = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2))

// A seeded generator, so the opening picture is the same for every student.
function mulberry32(seed: number) {
  let s = seed
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// One cup's time, by Box–Muller, rounded to 0.1 s like a stopwatch reading.
function cup(rand: () => number) {
  let u = 0
  while (u === 0) u = rand()
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand())
  return Math.round((MU + SIGMA * z) * 10) / 10
}

function pour(rand: () => number, k: number): number[][] {
  const out: number[][] = []
  for (let i = 0; i < k; i++) out.push(Array.from({ length: N }, () => cup(rand)))
  return out
}

function makeStart() {
  const rand = mulberry32(1234)
  return { rand, rounds: pour(rand, START) }
}

const sum = (r: number[]) => r.reduce((a, b) => a + b, 0)
const r1 = (v: number) => (Math.round(v * 10) / 10).toFixed(1)
const signed = (v: number) => (v >= 0 ? `+${r1(v)}` : `-${r1(-v)}`)
const xTicks = new Set([28, 34, 40, 46, 52])

export default function FourCups() {
  const [start] = useState(makeStart)
  const rand = useRef(start.rand)
  const [rounds, setRounds] = useState<number[][]>(start.rounds)
  const [wrong, setWrong] = useState(false)

  const add = (k: number) => setRounds(p => (p.length >= MAX_ROUNDS ? p : [...p, ...pour(rand.current, k)]))
  const reset = () => setRounds([])

  const stats = useMemo(() => {
    const bins = Math.round((HI - LO) / BIN)
    const counts = new Array<number>(bins).fill(0)
    let above = 0
    let s1 = 0
    let s2 = 0
    for (const r of rounds) {
      const t = sum(r)
      if (t > CUT) above++
      s1 += t
      s2 += t * t
      const i = Math.floor((t - LO) / BIN)
      if (i >= 0 && i < bins) counts[i]++
    }
    const n = rounds.length
    const sd = n > 1 ? Math.sqrt(Math.max(0, (s2 - (s1 * s1) / n) / (n - 1))) : 0
    return { counts, above, sd }
  }, [rounds])

  const total = rounds.length
  const last = total ? rounds[total - 1] : null
  const lastTotal = last ? sum(last) : TOTAL_MU
  const right = pdf(TOTAL_SD)
  const wide = pdf(WRONG_SD)
  const pctAbove = total ? ((100 * stats.above) / total).toFixed(1) : '0'

  let notice
  if (total < 50) {
    notice = (
      <Notice>
        Press <b>Pour 100 rounds</b> a few times. The bars need a few hundred rounds before their shape settles and
        you can see how spread out the totals really are.
      </Notice>
    )
  } else if (!wrong) {
    notice = (
      <Notice tone="good">
        Each round pours four <b>separate</b> cups. Some run slow and some fast, so their differences from{' '}
        <M>{'10\\text{ s}'}</M> partly cancel (look at the last round), and the totals stay within a few seconds of{' '}
        <M>40</M>. The sd of the poured totals is close to <M>{'\\sqrt{4\\times1.5^2}=3'}</M>, so <M>34</M> is two
        sds below <M>40</M> and about 98% of totals are above it. Press <b>Pour 1 round</b> a few times, then turn on
        the wrong idea.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{'4\\times1.5=6'}</M> is the sd of <M>4X</M>: one cup&apos;s time multiplied by four, as if all four cups
        were slow or fast by exactly the same amount. Separate cups don&apos;t do that, so the sd-6 curve is far
        wider than the bars. It puts <M>34</M> only one sd below <M>40</M> and predicts about 84% above <M>34</M>,
        but the poured totals show about 98%.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[LO, HI]}
        y={[0, 0.18]}
        xStep={2}
        yStep={0.04}
        xLabel="T"
        yLabel=""
        yLabels={false}
        xLabels={v => (xTicks.has(Math.round(v)) ? String(Math.round(v)) : '')}
        height={320}
      >
        {stats.counts.map((c, i) => {
          if (!c) return null
          const x0 = LO + i * BIN
          const h = c / (total * BIN)
          return (
            <Polygon
              key={i}
              points={[[x0, 0], [x0 + BIN, 0], [x0 + BIN, h], [x0, h]]}
              color={x0 >= CUT ? C.f : C.bad}
              fillOpacity={0.4}
              weight={1}
            />
          )
        })}
        <Line.Segment point1={[CUT, 0]} point2={[CUT, 0.17]} color={C.guide} style="dashed" weight={2} />
        <Label at={[CUT, 0.17]} attach="e" color={C.f}>more than 34 s</Label>
        <Plot.OfX y={right} domain={[LO, HI]} color={C.good} weight={3} />
        <Label at={[TOTAL_MU + 1.3 * TOTAL_SD, right(TOTAL_MU + 1.3 * TOTAL_SD)]} attach="ne" color={C.good}>
          sd 3
        </Label>
        {wrong && (
          <>
            <Plot.OfX y={wide} domain={[LO, HI]} color={C.g} weight={3} style="dashed" />
            <Label at={[TOTAL_MU + 1.6 * WRONG_SD, wide(TOTAL_MU + 1.6 * WRONG_SD)]} attach="ne" color={C.g}>
              sd 6
            </Label>
          </>
        )}
        {last && <Point x={lastTotal} y={0} color={C.violet} />}
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="Pour 1 round" onClick={() => add(1)} />
          <ActionButton label="Pour 100 rounds" onClick={() => add(100)} />
          <ActionButton label="Start again" onClick={reset} />
          <Toggle label="Wrong idea: sd = 4 × 1.5 = 6" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          {last && (
            <Readout color={C.violet} tex={`\\text{last round: } ${last.map(r1).join(' + ')} = ${r1(lastTotal)}`} />
          )}
          {last && (
            <Readout tex={`\\text{vs 10 s each: } {${last.map(v => signed(v - MU)).join(' ')}} = {${signed(lastTotal - TOTAL_MU)}}`} />
          )}
          {last && wrong && <Readout color={C.g} tex={`\\text{one cup} \\times 4 = 4 \\times ${r1(last[0])} = ${r1(4 * last[0])}`} />}
          <Readout color={C.good} tex={`\\text{sd of the ${total} totals} \\approx ${total > 1 ? stats.sd.toFixed(2) : '?'}`} />
          <Readout color={C.f} tex={`\\text{totals above 34: } ${pctAbove}\\%`} />
          <Readout
            color={wrong ? C.g : C.good}
            tex={
              wrong
                ? `\\text{sd 6 curve: } \\Pr(Z>-1) \\approx ${(100 * (1 - Phi(-1))).toFixed(1)}\\%`
                : `\\text{sd 3 curve: } \\Pr(Z>-2) \\approx ${(100 * (1 - Phi(-2))).toFixed(1)}\\%`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
