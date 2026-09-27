// 2017 Methods Exam 2 Q3c — a conditional probability as a share of area. "Given T ≤ 55" leaves only
// the part of the triangle left of 55 (blue, area 41/50) as the new whole; the event T ≤ 25 is the
// orange sliver (area 1/50) entirely inside it, so the answer is its share, 1/41. Slide the given
// bound c to see the share climb to 1 as c → 25 and fall to Pr(T ≤ 25) = 0.02 as c → 70. A toggle
// divides by part b.'s 4/5 = Pr(25 ≤ T ≤ 55) instead — a region that doesn't even contain the
// sliver — which gives the report's common wrong answer 1/40.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Polyline, Readout, Readouts, Slider, Text, Toggle, num } from './kit'

// The density is drawn in plot units: t across and S × f(t) up, so the peak f(45) = 1/25 is at
// height 45 (mafs pads the view in plot units, so the true heights would be squashed).
const S = 1125
const f = (t: number) => (t >= 20 && t < 45 ? (t - 20) / 625 : t >= 45 && t <= 70 ? (70 - t) / 625 : 0)
const Y = (t: number) => S * f(t)
/** Pr(T ≤ x), from the areas of the triangles. */
const cdf = (x: number) => (x <= 20 ? 0 : x <= 45 ? (x - 20) ** 2 / 1250 : x <= 70 ? 1 - (70 - x) ** 2 / 1250 : 1)
const GRAPH: [number, number][] = [[0, 0], [20, 0], [45, 45], [70, 0], [100, 0]]
function under(a: number, b: number): [number, number][] {
  const pts: [number, number][] = [[a, 0], [a, Y(a)]]
  for (const k of [20, 45, 70]) if (k > a && k < b) pts.push([k, Y(k)])
  pts.push([b, Y(b)], [b, 0])
  return pts
}

// Tick numbers drawn by hand (the plane's own labels would show plot units). In mafs, attach "n"
// hangs the text below the anchor.
function Ticks({ xs = [], ys = [], xName }: { xs?: [number, string][]; ys?: [number, string][]; xName?: [number, string] }) {
  return (
    <>
      {xs.map(([v, s]) => (
        <Text key={`x${v}`} x={v} y={0} attach="n" attachDistance={17} size={12} color={C.ink}>{s}</Text>
      ))}
      {xName && (
        <Text x={xName[0]} y={0} attach="w" attachDistance={2} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic', dy: '-0.9em' }}>{xName[1]}</Text>
      )}
      {ys.map(([v, s]) => (
        <Text key={`y${v}`} x={0} y={v} attach="w" attachDistance={7} size={12} color={C.ink}>{s}</Text>
      ))}
    </>
  )
}

const EVENT = cdf(25) // 1/50
/** A slider value for a readout: whole numbers as is, otherwise one decimal place. */
const fmt = (v: number) => (Math.abs(v - Math.round(v)) < 0.05 ? String(Math.round(v)) : v.toFixed(1))

export default function GivenArea() {
  const [c, setC] = useState(55)
  const [wrong, setWrong] = useState(false)
  const whole = wrong ? cdf(c) - cdf(25) : cdf(c)
  const share = whole > 1e-9 ? (wrong ? EVENT / whole : Math.min(1, EVENT / whole)) : NaN
  const at55 = Math.abs(c - 55) < 0.3

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Dividing by <M>\Pr(25 \le T \le c)</M> (part b.&apos;s <M>{'\\tfrac45'}</M> when <M>c = 55</M>) makes the red region the
        whole, and the orange sliver isn&apos;t even inside it. Being told <M>{`T \\le ${fmt(c)}`}</M> only rules out times{' '}
        <b>above</b> {fmt(c)}: every time from 20 to {fmt(c)} is still possible.{' '}
        {at55 ? <>This gives <M>{'\\tfrac{1/50}{4/5} = \\tfrac{1}{40}'}</M>, the report&apos;s common wrong answer.</> : null}
        {share > 1 ? <>Here the &ldquo;share&rdquo; is bigger than 1, which no probability can be: a sure sign the whole is wrong.</> : null}
      </Notice>
    )
  } else if (at55) {
    notice = (
      <Notice>
        Told that <M>T \le 55</M>, the only times still possible are the blue region, area{' '}
        <M>{'\\tfrac{41}{50} = 0.82'}</M>: that is the new whole. The orange sliver <M>T \le 25</M> lies completely inside it,
        so &ldquo;both&rdquo; is just <M>T \le 25</M>, area <M>{'\\tfrac1{50}'}</M>. The answer is the sliver&apos;s share:{' '}
        <M>{'\\tfrac{1/50}{41/50} = \\tfrac1{41} \\approx 0.024'}</M>. Now slide <M>c</M>.
      </Notice>
    )
  } else if (c > 55) {
    notice = (
      <Notice>
        As <M>c</M> grows, the condition rules out less and less. At <M>c = 70</M> it rules out nothing, and the answer is just{' '}
        <M>\Pr(T \le 25) = 0.02</M>: being told something certain changes nothing.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>c</M> shrinks towards 25, the blue whole shrinks onto the orange sliver and the share climbs towards 1: if you are
        told <M>T \le 25</M>, then <M>T \le 25</M> is certain.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-19, 108]} y={[-8, 52]} xStep={5} yStep={11.25} labels={false} xLabel="" yLabel="" height={280}>
        <Text x={0} y={50} attach="e" attachDistance={6} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic' }}>y</Text>
        <Ticks xs={[[20, '20'], [40, '40'], [60, '60'], [80, '80'], [100, '100']]} ys={[[22.5, '1/50'], [45, '1/25']]} xName={[108, 't']} />
        {wrong
          ? c > 25 && <Polygon points={under(25, c)} color={C.bad} fillOpacity={0.25} weight={0} strokeOpacity={0} />
          : <Polygon points={under(20, c)} color={C.f} fillOpacity={0.28} weight={0} strokeOpacity={0} />}
        <Polygon points={under(20, 25)} color={C.g} fillOpacity={0.85} weight={0} strokeOpacity={0} />
        <Polyline points={GRAPH} color={C.f} weight={3} />
        <Line.Segment point1={[c, 0]} point2={[c, Y(c) + 7]} color={wrong ? C.bad : C.ink} weight={2} />
        <Label at={[c, Y(c) + 7]} color={wrong ? C.bad : C.ink} attach="n">c</Label>
        <Label at={[19, 5]} color={C.g} attach="w">0.02</Label>
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={25} max={70} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <Toggle label="What if I divide by part b.'s answer?" checked={wrong} onChange={on => { setWrong(on); if (on) setC(55) }} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\Pr(T \\le 25) = 0.0200`} />
          <Readout
            color={wrong ? C.bad : C.f}
            tex={wrong ? `\\Pr(25 \\le T \\le ${fmt(c)}) \\approx ${num(whole, 4)}` : `\\Pr(T \\le ${fmt(c)}) \\approx ${num(whole, 4)}`}
          />
          <Readout tex={`\\text{share} \\approx ${Number.isNaN(share) ? '\\text{undefined}' : num(share, 4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
