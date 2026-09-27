// 2017 Methods Exam 2 Q3g.ii — the chain d → p → q that part g.ii runs backwards. Slide the cut-off
// time d on the density: the area to the right of d is p = Pr(T > d), one day's chance of working
// more than d minutes. Below, that p is a point on the curve q(p) = 21p²(1 − p)⁵ + 35p³(1 − p)⁴, the
// chance of 2 or 3 such days out of 7. The point reaches the top of the q-curve (p ≈ 0.3539) exactly
// when d ≈ 48.97, so d = 49 minutes. Two toggles jump to the report's two wrong answers: using q's
// maximum 0.5665 as the area (d ≈ 43) and taking the area from 20 up to d (d ≈ 41) — both push p
// away from 0.3539 and q visibly drops.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Polyline, Readout, Readouts, Slider, Text, Toggle, num,
} from './kit'

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

/** Part f.: the chance of exactly 2 or 3 days out of 7 when each day has probability p. */
const q = (p: number) => 21 * p ** 2 * (1 - p) ** 5 + 35 * p ** 3 * (1 - p) ** 4
const P_STAR = (Math.sqrt(30) - 3) / 7 // 0.353889…, part g.i.
const Q_STAR = q(P_STAR) // 0.566466…
const D_STAR = 70 - Math.sqrt(1250 * P_STAR) // 48.9676…
const D_USED_Q = 20 + Math.sqrt(1250 * (1 - Q_STAR)) // 43.279…: area right of d set to 0.5665
const D_LEFT = 20 + Math.sqrt(1250 * P_STAR) // 41.032…: area from 20 to d set to 0.3539

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

function Caption({ children }: { children: string }) {
  return <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mb-1 mt-1">{children}</p>
}

export default function Chain() {
  const [d, setD] = useState(60)
  const p = 1 - cdf(d)
  const qp = q(p)
  const atStar = Math.abs(d - D_STAR) < 0.3
  const atUsedQ = Math.abs(d - D_USED_Q) < 0.01
  const atLeft = Math.abs(d - D_LEFT) < 0.01

  let notice
  if (atUsedQ) {
    notice = (
      <Notice tone="warn">
        This is <M>d \approx 43.28</M>, from setting the area to the right of <M>d</M> equal to the <b>maximum value of q</b>,{' '}
        <M>0.5665</M>. But the area to the right of <M>d</M> <i>is</i> <M>p</M>, so this makes <M>p \approx 0.5665</M>, and the
        point on the lower graph slides down the far side of the hump: <M>q</M> is only about {num(qp, 3)}. <M>q</M> is the chance
        of 2 or 3 days out of 7; it is never an area under the one-day density.
      </Notice>
    )
  } else if (atLeft) {
    notice = (
      <Notice tone="warn">
        This is <M>d \approx 41</M>, from <M>{'\\int_{20}^{d} f(t)\\,dt = 0.3539'}</M>. That is the area to the <b>left</b> of{' '}
        <M>d</M>. But <M>p</M> is the chance she works <b>more than</b> <M>d</M> minutes, the area to the <b>right</b>, which
        here is {num(p, 4)}. With that <M>p</M>, <M>q</M> falls to about {num(qp, 3)}.
      </Notice>
    )
  } else if (atStar) {
    notice = (
      <Notice tone="good">
        <b>The point is at the top of the q-curve.</b> Part g.i. found the top at <M>p \approx 0.3539</M>, so we need the{' '}
        <M>d</M> with 0.3539 of the area to its <b>right</b>. That is less than half, so <M>d</M> is right of the peak and the
        area is one triangle: <M>{'\\tfrac{(70-d)^2}{1250} = 0.3539\\ldots'}</M>, giving <M>d \approx 48.97</M>, so{' '}
        <b>49 minutes</b>.
      </Notice>
    )
  } else if (d > D_STAR) {
    notice = (
      <Notice>
        The blue area to the right of <M>d</M> is <M>p \approx {num(p, 3)}</M>: on any one day she rarely works more than{' '}
        <M>d</M> minutes, so doing it on 2 or 3 days out of 7 is unlikely, and <M>q \approx {num(qp, 3)}</M>. Slide{' '}
        <M>d</M> left: the blue area grows, and the point below climbs the q-curve.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now <M>p \approx {num(p, 3)}</M> is large: she usually works more than <M>d</M> minutes, so over 7 days she tends to do
        it on <i>more</i> than 3 days, and <M>q \approx {num(qp, 3)}</M> falls again. The best <M>d</M> is in between: find
        where the point below sits at the top.
      </Notice>
    )
  }

  return (
    <div>
      <Caption>One day: p is the area to the right of d</Caption>
      <Plane x={[-19, 108]} y={[-8, 52]} xStep={5} yStep={11.25} labels={false} xLabel="" yLabel="" height={240}>
        <Text x={0} y={50} attach="e" attachDistance={6} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic' }}>y</Text>
        <Ticks xs={[[20, '20'], [40, '40'], [60, '60'], [80, '80'], [100, '100']]} ys={[[22.5, '1/50'], [45, '1/25']]} xName={[108, 't']} />
        {d < 70 && <Polygon points={under(d, 70)} color={C.f} fillOpacity={0.35} weight={0} strokeOpacity={0} />}
        <Polyline points={GRAPH} color={C.f} weight={3} />
        <Line.Segment point1={[d, 0]} point2={[d, Y(d) + 6]} color={atUsedQ || atLeft ? C.bad : C.ink} weight={2} />
        <Label at={[d, Y(d) + 6]} color={atUsedQ || atLeft ? C.bad : C.ink} attach="n">d</Label>
        {/* Just right of the triangle's corner at 70, where it never crosses the falling edge or the d-line. */}
        {d < 69.5 && <Label at={[82, 0]} color={C.f} attach="n">{`p ≈ ${num(p, 2)}`}</Label>}
      </Plane>
      <Caption>Seven days: q against p</Caption>
      <Plane x={[-16, 108]} y={[-10, 66]} xStep={10} yStep={10} labels={false} xLabel="" yLabel="" height={240}>
        <Text x={0} y={63} attach="e" attachDistance={6} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic' }}>q</Text>
        <Ticks
          xs={[[20, '0.2'], [40, '0.4'], [60, '0.6'], [80, '0.8'], [100, '1']]}
          ys={[[20, '0.2'], [40, '0.4'], [60, '0.6']]}
          xName={[108, 'p']}
        />
        <Line.Segment point1={[100 * P_STAR, 0]} point2={[100 * P_STAR, 100 * Q_STAR]} color={C.good} style="dashed" weight={1.5} />
        <Plot.OfX y={x => 100 * q(x / 100)} domain={[0, 100]} color={C.g} weight={3} />
        <Point x={100 * P_STAR} y={100 * Q_STAR} color={C.good} />
        <Line.Segment point1={[100 * p, 0]} point2={[100 * p, 100 * qp]} color={C.f} weight={2} />
        <Point x={100 * p} y={100 * qp} color={atUsedQ || atLeft ? C.bad : atStar ? C.good : C.g} />
        {!atStar && <Label at={[100 * P_STAR, 100 * Q_STAR]} color={C.good} attach="e">top</Label>}
      </Plane>
      <Controls>
        <Slider label="d" value={d} onChange={setD} min={20} max={70} step={0.01} format={v => v.toFixed(2)} />
        <Buttons>
          <Toggle label="What if I use q ≈ 0.5665 as the area?" checked={atUsedQ} onChange={on => setD(on ? D_USED_Q : D_STAR)} />
          <Toggle label="What if I take the area from 20 up to d?" checked={atLeft} onChange={on => setD(on ? D_LEFT : D_STAR)} />
        </Buttons>
        <Readouts>
          <Readout tex={`d = ${num(d, 2)}`} />
          <Readout color={C.f} tex={`p = \\Pr(T > d) \\approx ${num(p, 4)}`} />
          <Readout color={C.g} tex={`q \\approx ${num(qp, 4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
