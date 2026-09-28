// 2017 Specialist Exam 1 Q4 — why the mean of a four-bottle pack is less spread out than one
// bottle. Packs of four are filled from X ~ N(298, 3²): the last pack's four bottles (orange
// dots) and their mean (green) are drawn at the top, and every pack mean piles up into the
// histogram (bars under 295 in red). Three candidate curves for the pack mean are laid over the
// bars — sd σ = 3, σ/√4 = 1.5 and σ/4 = 0.75 — and only 3/√4 fits. About 16% of single bottles
// are under 295, but only about 2% of pack means (the answer, 0.023).

import { useMemo, useRef, useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Toggle,
} from './kit'

const MU = 298
const SIGMA = 3
const N = 4
const LO = 286
const HI = 310
const BIN = 0.5
const START = 400
const MAX_PACKS = 5000
const ROW = 0.37

type Choice = 'sigma' | 'root' | 'n'
const SD: Record<Choice, number> = { sigma: SIGMA, root: SIGMA / Math.sqrt(N), n: SIGMA / N }

const pdf = (sd: number) => (x: number) => Math.exp(-0.5 * ((x - MU) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))

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

// One bottle's volume, by Box–Muller, rounded to 0.1 mL like a real reading.
function bottle(rand: () => number) {
  let u = 0
  while (u === 0) u = rand()
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand())
  return Math.round((MU + SIGMA * z) * 10) / 10
}

function fill(rand: () => number, k: number): number[][] {
  const out: number[][] = []
  for (let i = 0; i < k; i++) out.push(Array.from({ length: N }, () => bottle(rand)))
  return out
}

function makeStart() {
  const rand = mulberry32(2017)
  return { rand, packs: fill(rand, START) }
}

const mean = (p: number[]) => p.reduce((a, b) => a + b, 0) / p.length
const pct = (k: number, total: number) => (total ? ((100 * k) / total).toFixed(1) : '0')
const CHOICE_TEX: Record<Choice, string> = {
  sigma: '\\sigma = 3',
  root: '\\tfrac{\\sigma}{\\sqrt4} = 1.5',
  n: '\\tfrac{\\sigma}{4} = 0.75',
}

export default function Packs() {
  const [start] = useState(makeStart)
  const rand = useRef(start.rand)
  const [packs, setPacks] = useState<number[][]>(start.packs)
  const [choice, setChoice] = useState<Choice>('root')

  const add = (k: number) => setPacks(p => (p.length >= MAX_PACKS ? p : [...p, ...fill(rand.current, k)]))
  const reset = () => setPacks([])

  const stats = useMemo(() => {
    const bins = Math.round((HI - LO) / BIN)
    const counts = new Array<number>(bins).fill(0)
    let meansBelow = 0
    let bottlesBelow = 0
    for (const p of packs) {
      const m = mean(p)
      if (m < 295) meansBelow++
      for (const v of p) if (v < 295) bottlesBelow++
      const i = Math.floor((m - LO) / BIN)
      if (i >= 0 && i < bins) counts[i]++
    }
    return { counts, meansBelow, bottlesBelow }
  }, [packs])

  const total = packs.length
  const last = total ? packs[total - 1] : null
  const lastMean = last ? mean(last) : MU
  const sd = SD[choice]
  const cand = pdf(sd)
  const candColor = choice === 'root' ? C.good : C.bad
  const one = pdf(SIGMA)

  let notice
  if (total < 50) {
    notice = (
      <Notice>
        Press <b>Draw 100 packs</b> a few times. The bars need a few hundred packs before their shape settles
        and you can judge which curve fits them.
      </Notice>
    )
  } else if (choice === 'root') {
    notice = (
      <Notice tone="good">
        The curve with <M>{'\\mathrm{sd}(\\bar X) = \\tfrac{3}{\\sqrt4} = 1.5'}</M> fits the bars. In a pack, a heavy
        bottle and a light one partly cancel, so the mean rarely strays far from <M>298</M>. Only about 2% of pack
        means are under <M>295</M>, compared with about 16% of single bottles. Press <b>Draw 1 pack</b> a few times,
        then try the other two curves.
      </Notice>
    )
  } else if (choice === 'sigma') {
    notice = (
      <Notice tone="warn">
        This is the curve for <b>one bottle</b> (sd <M>3</M>), and it is far wider than the bars. For a pack to
        average under <M>295</M>, most of its four bottles have to be low at the same time, which is much rarer than
        one low bottle. This curve predicts about 16% under <M>295</M>, but the packs show about 2%.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Dividing by <M>n = 4</M> gives sd <M>0.75</M>, which is far too narrow: plenty of bars sit where this curve
        is almost zero (look near <M>296</M> and <M>300</M>). It is the <b>variance</b> that gets divided by{' '}
        <M>n</M>: <M>{'\\mathrm{Var}(\\bar X) = \\tfrac{9}{4}'}</M>, so <M>{'\\mathrm{sd}(\\bar X) = \\tfrac32'}</M>.
        This curve predicts almost no pack means under <M>295</M>, but about 2% are.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[LO, HI]}
        y={[0, 0.4]}
        xStep={1}
        yStep={0.1}
        xLabel=""
        yLabel=""
        yLabels={false}
        xLabels={v => ((Math.round(v) - MU) % 3 === 0 ? String(Math.round(v)) : '')}
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
              color={x0 + BIN <= 295 ? C.bad : C.g}
              fillOpacity={0.45}
              weight={1}
            />
          )
        })}
        <Line.Segment point1={[295, 0]} point2={[295, 0.32]} color={C.bad} style="dashed" weight={2} />
        <Plot.OfX y={one} domain={[LO, HI]} color={C.f} weight={2.5} />
        <Label at={[302, one(302)]} attach="ne" color={C.f}>one bottle</Label>
        <Plot.OfX y={cand} domain={[LO, HI]} color={candColor} weight={3} />
        {choice !== 'sigma' && (
          <Label at={[MU + 1.3 * sd, cand(MU + 1.3 * sd)]} attach="ne" color={candColor}>
            {`sd ${sd}`}
          </Label>
        )}
        {last && (
          <>
            <Line.Segment point1={[Math.min(...last), ROW]} point2={[Math.max(...last), ROW]} color={C.guide} weight={2} />
            {last.map((v, i) => (
              <Point key={i} x={v} y={ROW} color={C.g} />
            ))}
            <Point x={lastMean} y={ROW} color={C.good} />
            <Label at={[lastMean, ROW]} attach="n" color={C.good} size={12}>mean</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="Draw 1 pack" onClick={() => add(1)} />
          <ActionButton label="Draw 100 packs" onClick={() => add(100)} />
          <ActionButton label="Start again" onClick={reset} />
        </Buttons>
        <Buttons>
          <span className="text-[12.5px] text-gray-600 dark:text-gray-300">Curve for the pack mean, sd =</span>
          {(['sigma', 'root', 'n'] as Choice[]).map(k => (
            <Toggle key={k} label={<M>{CHOICE_TEX[k]}</M>} checked={choice === k} onChange={() => setChoice(k)} />
          ))}
        </Buttons>
        <Readouts>
          {last && <Readout color={C.g} tex={`\\text{last pack: } ${last.map(v => v.toFixed(1)).join(',\\ ')}`} />}
          {last && <Readout color={C.good} tex={`\\bar x = ${lastMean.toFixed(2)}`} />}
          <Readout color={C.f} tex={`\\text{bottles under 295: } ${pct(stats.bottlesBelow, 4 * total)}\\%\\ \\text{of } ${4 * total}`} />
          <Readout color={C.bad} tex={`\\text{pack means under 295: } ${pct(stats.meansBelow, total)}\\%\\ \\text{of } ${total}`} />
          <Readout
            color={candColor}
            tex={`\\text{curve with sd } ${sd}\\text{ predicts } ${(100 * Phi((295 - MU) / sd)).toFixed(choice === 'n' ? 3 : 1)}\\%`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
