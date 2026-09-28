// 2019 Specialist Exam 2 Q6b — "the two means differ by less than 2 grams" as a picture. Each dot
// is one simulated pair of sample means (x̄₁, x̄₂), both from N(375, 15²/50); 400 pairs from a
// fixed seed. Pairs whose means differ by less than 2 g fill a diagonal STRIP on both sides of
// the line x̄₁ = x̄₂, i.e. −2 < D < 2 with D = x̄₁ − x̄₂; about half the cloud (0.495) is in it.
// Drag the pair point to see that a negative D can still be a small difference. A toggle shows
// the report's error, Pr(D < 2): a half-plane that also counts pairs with x̄₂ far above x̄₁
// (0.748). The spread of the simulated differences is about 3 = √(4.5 + 4.5), not 2.12, which is
// why the variances add. Seed 202 gives 0.495, 0.7475 and sd 2.988; exact values checked in scipy.

import { useMemo, useState } from 'react'
import { C, Buttons, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Polygon, Readout, Readouts, Toggle, clamp } from './kit'

const MU = 375
const S = 15 / Math.sqrt(50)
const N = 400
const LO = 366
const HI = 384
const EXACT_BAND = 0.4950149249061542 // normCdf(-2, 2, 0, 3)
const EXACT_BELOW = 0.7475074624530771 // normCdf(-∞, 2, 0, 3)

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeCloud(): [number, number][] {
  const r = mulberry32(202)
  const out: [number, number][] = []
  for (let i = 0; i < N; i++) {
    const u1 = r() || 1e-9
    const u2 = r()
    const R = Math.sqrt(-2 * Math.log(u1))
    out.push([MU + S * R * Math.cos(2 * Math.PI * u2), MU + S * R * Math.sin(2 * Math.PI * u2)])
  }
  return out
}

export default function Strip() {
  const cloud = useMemo(makeCloud, [])
  const [pt, setPt] = useState<[number, number]>([374, 375.5])
  const [below, setBelow] = useState(false)

  const diffs = cloud.map(([a, b]) => a - b)
  const inBand = diffs.filter(d => Math.abs(d) < 2).length / N
  const inBelow = diffs.filter(d => d < 2).length / N
  const mean = diffs.reduce((s, d) => s + d, 0) / N
  const sdD = Math.sqrt(diffs.reduce((s, d) => s + (d - mean) ** 2, 0) / (N - 1))

  const d = pt[0] - pt[1]
  const small = Math.abs(d) < 2
  const counted = below ? d < 2 : small
  const ptColour = small ? C.good : counted ? C.bad : C.guide
  const dStr = (d >= 0 ? '' : '-') + Math.abs(d).toFixed(1)

  let notice
  if (below && d <= -2) {
    notice = (
      <Notice tone="warn">
        Here <M>{`D = ${dStr}`}</M>: the means differ by <M>{`${Math.abs(d).toFixed(1)}`}</M> g, yet <M>{'D < 2'}</M> still
        counts this pair. The red half-plane swallows the whole top-left of the cloud, which is why{' '}
        <M>{'\\Pr(D < 2) \\approx 0.748'}</M> is far too big. &ldquo;Differ by less than 2&rdquo; needs both edges of the
        strip.
      </Notice>
    )
  } else if (small && d < 0) {
    notice = (
      <Notice tone="good">
        <M>{`D = ${dStr}`}</M> is negative, because the second mean is the bigger one, but the two means still differ by
        only <M>{`${Math.abs(d).toFixed(1)}`}</M> g, so this pair counts. That&apos;s why the green strip runs along{' '}
        <b>both</b> sides of the dashed diagonal <M>{'\\overline{x}_1 = \\overline{x}_2'}</M>, so <M>{'-2 < D < 2'}</M>. Now drag the violet point further up-left.
      </Notice>
    )
  } else if (small) {
    notice = (
      <Notice tone="good">
        <M>{`D = ${dStr}`}</M>: the means differ by less than <M>2</M> g, so the pair sits inside the green strip{' '}
        <M>{'-2 < D < 2'}</M>. About half of all pairs do, <M>{'\\approx 0.495'}</M>. Drag the violet point across the dashed diagonal to
        make <M>D</M> negative.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{`D = ${dStr}`}</M>: the means differ by more than <M>2</M> g, so this pair is outside the strip.{' '}
        {below ? (
          <>It is right of the line <M>D = 2</M>, so even <M>{'\\Pr(D < 2)'}</M> leaves it out.</>
        ) : (
          <>Turn on &ldquo;Only D &lt; 2&rdquo; and drag the point to the top-left to see the report&apos;s mistake.</>
        )}
      </Notice>
    )
  }

  return (
    <div>
      <div className="mx-auto max-w-[380px]">
      <Plane x={[LO, HI]} y={[LO, HI]} xStep={5} yStep={5} equalScale height={380} labels={false} xLabel="" yLabel="">
        {below && <Polygon points={[[LO, LO - 2], [HI + 2, HI], [HI + 2, HI + 4], [LO, HI + 4]]} color={C.bad} fillOpacity={0.1} weight={0} />}
        <Polygon points={[[LO - 2, LO - 4], [HI + 2, HI], [HI + 2, HI + 4], [LO - 2, LO]]} color={C.good} fillOpacity={0.14} weight={0} />
        {cloud.map(([a, b], i) => {
          const dd = a - b
          const inside = below ? dd < 2 : Math.abs(dd) < 2
          const col = !inside ? C.guide : Math.abs(dd) < 2 ? C.good : C.bad
          return <Point key={i} x={a} y={b} color={col} opacity={inside ? 0.85 : 0.45} svgCircleProps={{ r: 2.2 }} />
        })}
        <Line.ThroughPoints point1={[MU, MU]} point2={[MU + 1, MU + 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[MU, MU - 2]} point2={[MU + 1, MU - 1]} color={C.good} weight={2} />
        <Line.ThroughPoints point1={[MU, MU + 2]} point2={[MU + 1, MU + 3]} color={C.good} weight={2} />
        <Label at={[381.5, 379.5]} attach="se" color={C.good} size={12}>D = 2</Label>
        <Label at={[379.5, 381.5]} attach="nw" color={C.good} size={12}>D = −2</Label>
        {[370, 375, 380].map(v => (
          <Label key={`x${v}`} at={[v, LO]} attach="n" color={C.guide} size={11} gap={3}>{String(v)}</Label>
        ))}
        {[370, 375, 380].map(v => (
          <Label key={`y${v}`} at={[LO, v]} attach="e" color={C.guide} size={11} gap={4}>{String(v)}</Label>
        ))}
        <Label at={[HI, LO + 0.9]} attach="nw" size={12} gap={4}>x̄₁ →</Label>
        <Label at={[LO + 0.9, HI]} attach="se" size={12} gap={4}>↑ x̄₂</Label>
        <MovablePoint point={pt} onMove={p => setPt([clamp(p[0], LO + 0.5, HI - 0.5), clamp(p[1], LO + 0.5, HI - 0.5)])} color={C.violet} />
      </Plane>
      </div>
      <Controls>
        <Buttons>
          <Toggle label="Only D < 2" checked={below} onChange={setBelow} />
        </Buttons>
        <Readouts>
          <Readout color={ptColour} tex={`D = \\overline{x}_1 - \\overline{x}_2 = ${pt[0].toFixed(1)} - ${pt[1].toFixed(1)} = ${dStr}`} />
          {below ? (
            <Readout color={C.bad} tex={`\\text{pairs with } D<2:\\ ${inBelow.toFixed(3)} \\quad (\\text{exact } ${EXACT_BELOW.toFixed(3)})`} />
          ) : (
            <Readout color={C.good} tex={`\\text{pairs with } |D|<2:\\ ${inBand.toFixed(3)} \\quad (\\text{exact } ${EXACT_BAND.toFixed(3)})`} />
          )}
          <Readout tex={`\\text{sd of the ${N} differences} \\approx ${sdD.toFixed(2)} \\approx \\sqrt{4.5+4.5}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
