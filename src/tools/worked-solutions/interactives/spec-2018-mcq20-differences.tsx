// 2018 Specialist Exam 2 MCQ 20 — why the variances ADD for a difference. Random pairs are drawn
// from M ~ N(71, 10²) and S ~ N(75, 7²) (seeded, so the page always opens on the same 500 pairs)
// and the differences D = M − S are shown as a histogram, which is the thing to believe. Over it,
// the student picks a rule for sd(D): variances add, √(100 + 49) ≈ 12.21 (the bars fit; area right
// of 0 is 0.3716, option B); variances subtract, √51 ≈ 7.14 (far too narrow; 0.2877, option A); or
// standard deviations add, 17 (too wide; 0.4070, option C). Readouts give the share of drawn pairs
// with M > S and the sd of the drawn differences, to compare with each rule.

import { useMemo, useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region } from './kit'

const MU_M = 71
const SD_M = 10
const MU_S = 75
const SD_S = 7
const MU_D = MU_M - MU_S // −4
const XR: [number, number] = [-52, 44]
const YTOP = 0.066
const BIN = 4
const START = 500

type Rule = 'add' | 'subVar' | 'addSd'
const RULES: { key: Rule; label: string; sd: number; tex: string }[] = [
  { key: 'add', label: 'Add variances', sd: Math.sqrt(SD_M ** 2 + SD_S ** 2), tex: '\\sqrt{10^2 + 7^2} = \\sqrt{149}' },
  { key: 'subVar', label: 'Subtract variances', sd: Math.sqrt(SD_M ** 2 - SD_S ** 2), tex: '\\sqrt{10^2 - 7^2} = \\sqrt{51}' },
  { key: 'addSd', label: 'Add sds', sd: SD_M + SD_S, tex: '10 + 7' },
]

const pdf = (x: number, mu: number, sd: number) => Math.exp(-0.5 * ((x - mu) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))

/** Standard normal cdf (Abramowitz–Stegun 7.1.26 erf, error below 1.5e-7). */
function phi(z: number): number {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)
  return z >= 0 ? 0.5 * (1 + y) : 0.5 * (1 - y)
}

/** Seeded uniform generator (mulberry32), so the opening sample is the same on every visit. */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Draw `n` differences M − S using Box–Muller normals from the generator `u`. */
function drawDiffs(u: () => number, n: number): number[] {
  const out: number[] = []
  const normal = () => Math.sqrt(-2 * Math.log(1 - u())) * Math.cos(2 * Math.PI * u())
  for (let i = 0; i < n; i++) out.push(MU_M + SD_M * normal() - (MU_S + SD_S * normal()))
  return out
}

export default function DifferencesWidget() {
  const [gen] = useState(() => rng(5390))
  const [diffs, setDiffs] = useState<number[]>(() => drawDiffs(gen, START))
  const [rule, setRule] = useState<Rule>('add')

  const r = RULES.find(q => q.key === rule)!
  const area = 1 - phi((0 - MU_D) / r.sd)
  const correct = rule === 'add'

  const { bars, above, sdDrawn } = useMemo(() => {
    const nBins = Math.round((XR[1] - XR[0]) / BIN)
    const counts = new Array(nBins).fill(0)
    let pos = 0
    let sum = 0
    let sum2 = 0
    for (const d of diffs) {
      const k = Math.floor((d - XR[0]) / BIN)
      if (k >= 0 && k < nBins) counts[k]++
      if (d > 0) pos++
      sum += d
      sum2 += d * d
    }
    const n = diffs.length
    const mean = sum / n
    return {
      bars: counts.map((c, k) => ({ x0: XR[0] + k * BIN, h: c / (n * BIN) })),
      above: pos,
      sdDrawn: Math.sqrt((sum2 - n * mean * mean) / (n - 1)),
    }
  }, [diffs])

  const curveColor = correct ? C.f : C.bad
  const notice = correct ? (
    <>
      The bars are {diffs.length} simulated differences <M>M - S</M>, and the curve with variance <M>{'100 + 49 = 149'}</M> fits
      them; its area right of <M>0</M>, <M>0.3716</M> (option B), is close to the share of pairs with <M>{'M > S'}</M>. The spread (sd
      about <M>12.2</M>) is <em>bigger</em> than either score's alone: a high Maths score with a low Statistics score gives a big
      positive <M>D</M>, and the reverse a big negative one. Try the other two rules.
    </>
  ) : rule === 'subVar' ? (
    <>
      Variance <M>{'100 - 49 = 51'}</M> gives sd <M>{'\\approx 7.14'}</M>: the curve is far too narrow for the bars, and its area
      right of <M>0</M> is <M>0.2877</M>, option A. Subtracting <M>S</M> cannot make <M>D</M> <em>less</em> uncertain than{' '}
      <M>M</M> alone, since <M>S</M> brings its own randomness either way.
    </>
  ) : (
    <>
      Adding the standard deviations gives <M>17</M>: now the curve is too wide, and its area right of <M>0</M> is{' '}
      <M>0.4070</M>, option C. Spreads combine through the variances, like Pythagoras:{' '}
      <M>{'\\sqrt{10^2 + 7^2} \\approx 12.2'}</M>, not <M>10 + 7</M>.
    </>
  )

  return (
    <div>
      <Plane x={XR} y={[0, YTOP]} xStep={4} yStep={0.01} height={300} xLabel="D" yLabel="" yLabels={false} xLabels={v => (v % 20 === 0 && Math.abs(v) <= 40 ? String(v) : '')}>
        {bars.map(b =>
          b.h > 0 ? (
            <Polygon
              key={b.x0}
              points={[[b.x0, 0], [b.x0 + BIN, 0], [b.x0 + BIN, b.h], [b.x0, b.h]]}
              color={C.violet}
              fillOpacity={0.22}
              weight={1}
            />
          ) : null,
        )}
        <Region top={x => pdf(x, MU_D, r.sd)} bottom={() => 0} from={0} to={XR[1]} color={correct ? C.good : C.bad} opacity={0.25} />
        <Plot.OfX y={x => pdf(x, MU_D, r.sd)} domain={XR} color={curveColor} weight={2.5} />
        <Label at={[0, YTOP]} attach="se" size={12} gap={5}>M &gt; S</Label>
        <Label at={[0, YTOP]} attach="sw" size={12} gap={5}>M &lt; S</Label>
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Rule for sd(M − S):</span>
          {RULES.map(q => (
            <button
              key={q.key}
              type="button"
              onClick={() => setRule(q.key)}
              aria-pressed={rule === q.key}
              className={
                'text-[12.5px] font-semibold px-3 py-1.5 rounded-full border ' +
                (rule === q.key
                  ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500')
              }
            >
              {q.label}
            </button>
          ))}
        </div>
        <Readouts>
          <Readout tex={`\\operatorname{sd}(D) = ${r.tex} \\approx ${r.sd.toFixed(2)}`} color={curveColor} />
          <Readout tex={`\\text{area right of } 0 = ${area.toFixed(4)}`} color={correct ? C.good : C.bad} />
          <Readout tex={`\\text{sd of the drawn } D\\text{'s} \\approx ${sdDrawn.toFixed(2)}`} color={C.violet} />
          <Readout tex={`M > S \\text{ in } ${above} \\text{ of } ${diffs.length} = ${(above / diffs.length).toFixed(3)}`} color={C.violet} />
        </Readouts>
        <Buttons>
          <ActionButton label="Draw 500 more pairs" onClick={() => setDiffs(d => d.concat(drawDiffs(gen, 500)))} />
          <ActionButton label="Start again" onClick={() => setDiffs(drawDiffs(gen, START))} />
        </Buttons>
        <Notice tone={correct ? 'good' : 'warn'}>{notice}</Notice>
      </Controls>
    </div>
  )
}
