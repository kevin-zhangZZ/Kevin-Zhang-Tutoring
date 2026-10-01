// 2021 Specialist Exam 2 Q6b — why Clare's wait is the SUM of four separate drink times
// T₄ = D₁ + D₂ + D₃ + D₄ ~ N(8, 1), not one drink scaled by four, 4D ~ N(8, 2²). Each simulated
// queue draws four independent times D ~ N(2, 0.5²) (seeded, so the opening picture is fixed); the
// bar at the top shows the latest queue against the 7.5-minute deadline and every total piles up
// in the histogram (on-time bars green). The toggle shows the report's error: copying ONE drink's
// time four times, so nothing cancels and the totals spread twice as wide. Theory: Pr(T₄ ≤ 7.5)
// = 0.3085 against Pr(4D ≤ 7.5) = 0.4013 (scipy).

import { useMemo, useRef, useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Toggle,
} from './kit'

const MU = 2
const SD = 0.5
const DEADLINE = 7.5
const LO = 2
const HI = 14
const BIN = 0.5
const START = 400
const MAX_QUEUES = 5000
const SCALE = 12 // minutes shown on the queue bar
const P_SUM = 0.3085375387259869 // Pr(N(8, 1) ≤ 7.5)
const P_SCALED = 0.4012936743170763 // Pr(N(8, 2²) ≤ 7.5)

const pdf = (sd: number) => (x: number) => Math.exp(-0.5 * ((x - 8) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))
const sumPdf = pdf(1)
const scaledPdf = pdf(2)

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

// One drink's dispensing time, by Box–Muller.
function drink(rand: () => number) {
  let u = 0
  while (u === 0) u = rand()
  return MU + SD * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand())
}

function pour(rand: () => number, k: number): number[][] {
  const out: number[][] = []
  for (let i = 0; i < k; i++) out.push([drink(rand), drink(rand), drink(rand), drink(rand)])
  return out
}

function makeStart() {
  const rand = mulberry32(2021)
  return { rand, queues: pour(rand, START) }
}

const DRINK_COLOURS = [C.f, C.g, C.violet, C.good]
const clock = (min: number) => {
  const secs = Math.round(min * 60)
  const mm = 52 + Math.floor(secs / 60)
  const ss = secs % 60
  return mm >= 60 ? `9:${String(mm - 60).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `8:${mm}:${String(ss).padStart(2, '0')}`
}

export default function FourDrinks() {
  const [start] = useState(makeStart)
  const rand = useRef(start.rand)
  const [queues, setQueues] = useState<number[][]>(start.queues)
  const [scaled, setScaled] = useState(false)

  const add = (k: number) => setQueues(q => (q.length >= MAX_QUEUES ? q : [...q, ...pour(rand.current, k)]))

  const total = (q: number[]) => (scaled ? 4 * q[0] : q[0] + q[1] + q[2] + q[3])
  const stats = useMemo(() => {
    const bins = Math.round((HI - LO) / BIN)
    const counts = new Array<number>(bins).fill(0)
    let onTime = 0
    let s1 = 0
    let s2 = 0
    for (const q of queues) {
      const t = scaled ? 4 * q[0] : q[0] + q[1] + q[2] + q[3]
      if (t <= DEADLINE) onTime++
      s1 += t
      s2 += t * t
      const i = Math.floor((t - LO) / BIN)
      if (i >= 0 && i < bins) counts[i]++
    }
    const N = queues.length
    const sd = Math.sqrt(Math.max(0, (s2 - (s1 * s1) / N) / (N - 1)))
    return { counts, onTime, sd }
  }, [queues, scaled])

  const N = queues.length
  const last = queues[N - 1]
  const parts = scaled ? [last[0], last[0], last[0], last[0]] : last
  const lastTotal = total(last)
  const late = lastTotal > DEADLINE
  const curve = scaled ? scaledPdf : sumPdf
  const curveColour = scaled ? C.bad : C.f
  const pctOnTime = ((100 * stats.onTime) / N).toFixed(1)

  let acc = 0
  const segments = parts.map((d, i) => {
    const left = acc
    acc += d
    return { left, d, i }
  })

  const lastLine = `${parts.map(d => d.toFixed(2)).join(' + ')} = ${lastTotal.toFixed(2)}`

  return (
    <div>
      <div className="mb-3">
        <div className="mb-1 text-[12.5px] text-gray-600 dark:text-gray-300">
          {scaled ? 'Latest queue, one drink copied four times' : 'Latest queue, four separate drinks'} (minutes after 8:52)
        </div>
        <div className="relative h-8 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
          {segments.map(({ left, d, i }) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 flex items-center justify-center border-r-2 border-white text-[11px] font-semibold text-white dark:border-gray-900"
              style={{
                left: `${(100 * left) / SCALE}%`,
                width: `${(100 * Math.max(0, Math.min(d, SCALE - left))) / SCALE}%`,
                background: scaled ? C.bad : DRINK_COLOURS[i],
              }}
            >
              <span className="relative z-10 [text-shadow:0_0_3px_rgba(0,0,0,0.55)]">{d.toFixed(2)}</span>
            </div>
          ))}
          <div className="absolute top-0 bottom-0 z-[5] w-[3px] bg-red-600 dark:bg-red-400" style={{ left: `calc(${(100 * DEADLINE) / SCALE}% - 1.5px)` }} />
        </div>
        <div className="relative h-4 text-[11px] text-gray-500 dark:text-gray-400">
          <span className="absolute left-0">0</span>
          <span className="absolute -translate-x-full font-semibold text-red-600 dark:text-red-400" style={{ left: `${(100 * DEADLINE) / SCALE}%` }}>
            leave by 7.5&nbsp;
          </span>
          <span className="absolute right-0">12 min</span>
        </div>
      </div>
      <Plane
        x={[LO, HI]}
        y={[0, 0.5]}
        xStep={1}
        yStep={1}
        xLabel="t"
        yLabel=""
        yLabels={false}
        xLabels={v => (Math.round(v) % 2 === 0 ? String(Math.round(v)) : '')}
        height={260}
      >
        {stats.counts.map((c, i) => {
          if (!c) return null
          const x0 = LO + i * BIN
          const h = c / (N * BIN)
          return (
            <Polygon
              key={i}
              points={[[x0, 0], [x0 + BIN, 0], [x0 + BIN, h], [x0, h]]}
              color={x0 + BIN <= DEADLINE + 1e-9 ? C.good : C.guide}
              fillOpacity={0.45}
              weight={1}
            />
          )
        })}
        <Plot.OfX y={curve} domain={[LO, HI]} color={curveColour} weight={3} />
        <Label at={[scaled ? 10.6 : 9.3, curve(scaled ? 10.6 : 9.3)]} attach="ne" color={curveColour} size={12}>
          {scaled ? 'N(8, 2²)' : 'N(8, 1)'}
        </Label>
        <Line.Segment point1={[DEADLINE, 0]} point2={[DEADLINE, 0.47]} color={C.bad} style="dashed" weight={2} />
        <Label at={[DEADLINE, 0.47]} attach="w" color={C.good} size={12}>on time</Label>
        <Label at={[DEADLINE, 0.47]} attach="e" color={C.guide} size={12}>late</Label>
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="Pour 1 queue" onClick={() => add(1)} />
          <ActionButton label="Pour 100 queues" onClick={() => add(100)} />
          <Toggle label="Common error: one drink × 4" checked={scaled} onChange={setScaled} />
        </Buttons>
        <Readouts>
          <Readout color={late ? C.bad : C.good} tex={`\\text{latest: } ${lastLine}\\ \\text{min} \\ (${late ? '\\text{late}' : '\\text{on time}'})`} />
          <Readout tex={`\\text{on time: } ${stats.onTime}/${N} = ${pctOnTime}\\%`} />
          <Readout tex={`\\text{sd of totals} \\approx ${stats.sd.toFixed(2)}`} />
          <Readout
            color={curveColour}
            tex={scaled ? `\\Pr(4D \\le 7.5) = ${P_SCALED.toFixed(4)}\\ \\text{(wrong)}` : `\\Pr(T_4 \\le 7.5) = ${P_SUM.toFixed(4)}`}
          />
        </Readouts>
        {scaled ? (
          <Notice tone="warn">
            Here one drink&apos;s time is copied four times, so a slow drink is slow four times over and nothing cancels.
            The totals spread twice as wide: <M>{'\\operatorname{Var}(4D) = 4^2 \\times 0.5^2 = 4'}</M>, sd <M>2</M>, which
            puts about 40% on time instead of 31%. But Clare&apos;s queue holds four <b>separate</b> drinks, each with its
            own random time. Turn the error off and compare the spread of the bars.
          </Notice>
        ) : (
          <Notice>
            In this queue Clare&apos;s drink is ready at {clock(lastTotal)}, so she reaches the meeting at{' '}
            {clock(lastTotal + 0.5)}: {late ? 'late' : 'on time'}. With four{' '}
            <b>independent</b> drinks, a slow one is usually partly cancelled by a quick one, so the totals bunch near 8:{' '}
            <M>{'\\operatorname{Var}(T_4) = 4 \\times 0.5^2 = 1'}</M>, sd <M>1</M>. About 31% are at most 7.5 minutes. Pour
            a few more queues, then turn on the common error.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
