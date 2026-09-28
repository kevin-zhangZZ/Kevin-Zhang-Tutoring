// 2018 Methods Exam 2 Q4d.ii — what the Statsville interval (0.102, 0.145) says about 0.1587.
// Pick a "true" Statsville proportion p (it starts at Mathsland's 0.1587) and the widget draws 20
// simulated samples of 900 adults (the size the interval's width implies: 0.1235 ± 1.96·√(p̂q̂/900)
// ≈ 0.1235 ± 0.0215), each with its approximate 95% confidence interval. If Statsville matched
// Mathsland, the intervals would cluster round 0.1587 and about 19 in 20 would contain it; the
// doctors' real interval sits wholly below it. Moving p into (0.102, 0.145) makes their interval
// look typical: the CI is the set of plausible values for Statsville, and 0.1587 is not one.

import { useMemo, useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider } from './kit'

const N = 900
const LO = 0.102
const HI = 0.145
const PHAT = (LO + HI) / 2
const MATHS = 0.1587
const ROWS = 20

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

function normLower(z: number) {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const y = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-x * x)
  return z >= 0 ? 1 - y / 2 : y / 2
}

export default function CiSim() {
  const [p, setP] = useState(MATHS)
  const [seed, setSeed] = useState(7)

  const sims = useMemo(() => {
    const r = rng(seed * 7919 + Math.round(p * 1e4))
    return Array.from({ length: ROWS }, () => {
      let x = 0
      for (let i = 0; i < N; i++) if (r() < p) x++
      const ph = x / N
      const e = 1.96 * Math.sqrt((ph * (1 - ph)) / N)
      return { ph, lo: ph - e, hi: ph + e }
    })
  }, [p, seed])

  const hits = sims.filter(s => s.lo < p && p < s.hi).length
  const asLow = normLower((PHAT - p) / Math.sqrt((p * (1 - p)) / N))
  const isMaths = Math.abs(p - MATHS) < 0.0006
  const inside = p > LO && p < HI

  let notice
  if (isMaths) {
    notice = (
      <Notice>
        Suppose Statsville&apos;s rate really were Mathsland&apos;s <M>0.1587</M>. Each bar is the interval the doctors
        would get from a fresh sample of <M>900</M>: they cluster round <M>0.1587</M> and about 19 in 20 contain it.
        The doctors&apos; real interval (orange) lies wholly <b>below</b> <M>0.1587</M>; a sample that low would happen
        only about <M>{(asLow * 1000).toFixed(0)}</M> times in <M>1000</M>. Now drag <M>p</M> into the orange interval.
      </Notice>
    )
  } else if (inside) {
    notice = (
      <Notice tone="good">
        With <M>{`p = ${p.toFixed(4)}`}</M>, intervals like the orange one are typical. Every value inside{' '}
        <M>(0.102,\ 0.145)</M> is a plausible Statsville rate given the data, and <M>0.1587</M> is not one of them.
        That is the answer: the interval <b>does not contain</b> Mathsland&apos;s <M>0.1587</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        This <M>p</M> is outside the orange interval too, so the doctors&apos; sample would be unusual here as well
        (about <M>{(Math.min(asLow, 1 - asLow) * 100).toFixed(1)}\%</M> of samples land that far out). The interval
        marks the values of <M>p</M> the data can live with.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0.08, 0.21]} y={[0, 25]} xStep={0.02} yStep={5} height={330} xLabel="p" yLabel="" xLabels={v => (v > 0.205 ? '' : v.toFixed(2))} yLabels={false}>
        <Line.Segment point1={[MATHS, 0]} point2={[MATHS, 24.5]} color={C.f} style="dashed" weight={2} />
        <Label at={[MATHS, 24.5]} attach="e" color={C.f} size={12}>Mathsland</Label>
        {Math.abs(p - MATHS) > 0.0006 && (
          <Line.Segment point1={[p, 0]} point2={[p, 21]} color={C.guide} style="dashed" weight={1.5} />
        )}
        {sims.map((s, i) => {
          const col = s.lo < p && p < s.hi ? C.good : C.bad
          return (
            <g key={i}>
              <Line.Segment point1={[s.lo, i + 1]} point2={[s.hi, i + 1]} color={col} weight={2.5} />
              <Point x={s.ph} y={i + 1} color={col} />
            </g>
          )
        })}
        <Line.Segment point1={[LO, 22.8]} point2={[HI, 22.8]} color={C.g} weight={5} />
        <Point x={PHAT} y={22.8} color={C.g} />
        <Label at={[PHAT, 22.8]} attach="n" color={C.g} size={12}>Statsville CI</Label>
      </Plane>
      <Controls>
        <Slider label="\text{true Statsville } p" value={p} onChange={setP} min={0.1} max={0.17} step={0.0005} format={v => v.toFixed(4)} />
        <Buttons>
          <ActionButton label="Same as Mathsland (0.1587)" onClick={() => setP(MATHS)} />
          <ActionButton label="Take 20 new samples" onClick={() => setSeed(s => s + 1)} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`${hits} \\text{ of } ${ROWS} \\text{ intervals contain } ${p.toFixed(4)}`} />
          <Readout color={C.g} tex="\text{doctors: } 0.1235 \pm 0.0215" />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
