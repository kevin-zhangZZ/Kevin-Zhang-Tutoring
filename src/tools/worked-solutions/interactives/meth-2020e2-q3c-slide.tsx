// 2020 Methods Exam 2 Q3c — slide the mean k of N(k, 4²) across the fixed window −4.5 ≤ t ≤ 0.5
// and watch how much of the curve's area the window holds. Because σ stays 4, only where the
// window sits relative to the mean matters: at k = −1.5 it runs from 3 below the mean to 2 above
// (the original model's −3 ≤ t ≤ 2 slid 1.5 left), and at k = −2.5 from 2 below to 3 above, the
// mirror image, which holds the same area by symmetry. The lower graph plots that area against k:
// a hump that peaks at 46.80% when the window is centred on the mean (k = −2) and is cut twice by
// the 46.48% line. The report notes many students did not find k = −2.5.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polyline, Readout, Readouts, Region, Slider, Toggle,
  integrate, num, tick,
} from './kit'

const SD = 4
const pdf = (t: number, mu: number) => Math.exp(-((t - mu) ** 2) / (2 * SD * SD)) / (SD * Math.sqrt(2 * Math.PI))
const LO = -4.5
const HI = 0.5
/** Share of N(mu, 4²) inside the window. */
const inWindow = (mu: number) => integrate(t => pdf(t, mu), LO, HI, 200)
const TARGET = integrate(t => pdf(t, 0), -3, 2, 200) // 0.46483…
const ROOTS = [-1.5, -2.5]
const PEAK = 0.1 // top of the main plane's y-range

// The lower graph shows the area in percent, with its horizontal axis at 41% so the top of the hump
// (46.80%) and the 46.48% line are far enough apart to see. It is also drawn shifted 5 to the right
// (KX), so that mafs's vertical axis, which always passes through 0, sits at the left edge (k = −5)
// instead of cutting through the graph at k = 0; the tick numbers are relabelled.
const BASE = 41
const toY = (share: number) => 100 * share - BASE
const KX = 5
const kx = (k: number) => k + KX
const K_LO = -4.2
const K_HI = 0.2
const CURVE = Array.from({ length: 169 }, (_, i) => {
  const k = K_LO + ((K_HI - K_LO) * i) / 168
  return [kx(k), toY(inWindow(k))] as [number, number]
})

export default function Slide() {
  const [k, setK] = useState(0)
  const [showOld, setShowOld] = useState(false)
  const [found, setFound] = useState<number[]>([])

  const share = inWindow(k)
  const hit = ROOTS.find(r => Math.abs(k - r) < 0.03)
  const centred = Math.abs(k + 2) < 0.06
  const below = k + 4.5 // how far the window reaches below the mean
  const above = 0.5 - k // … and above it
  const both = found.length === 2

  const move = (v: number) => {
    setK(v)
    const r = ROOTS.find(root => Math.abs(v - root) < 0.03)
    if (r !== undefined && !found.includes(r)) setFound(f => [...f, r])
  }

  let notice
  if (hit === -1.5) {
    notice = (
      <Notice tone="good">
        <b>k = −1.5:</b> the window reaches 3 below the mean and 2 above it, exactly how <M>-3 \le t \le 2</M> sat around the
        old mean of 0. It is the old picture slid 1.5 to the left (turn on the comparison to see the two pictures line up), so
        it holds the same 46.48%.{' '}
        {both ? (
          <>You have found both values: the lower graph crosses the 46.48% line once either side of <M>k = -2</M>.</>
        ) : (
          <>But look at the lower graph: the area is still rising as you go left. There is a second value. Keep sliding.</>
        )}
      </Notice>
    )
  } else if (hit === -2.5) {
    notice = (
      <Notice tone="good">
        <b>k = −2.5:</b> now the window reaches 2 below the mean and 3 above it, the mirror image of &ldquo;3 below, 2
        above&rdquo;. A normal curve is symmetric about its mean, so the mirror-image window holds exactly the same area:
        46.48% again. This is the value the report says many students did not find.{' '}
        {both ? (
          <>You have found both: the lower graph crosses the 46.48% line once either side of <M>k = -2</M>.</>
        ) : (
          <>There is another value to the right of <M>k = -2</M>. Find it.</>
        )}
      </Notice>
    )
  } else if (centred) {
    notice = (
      <Notice>
        <b>The window is centred on the mean</b>, 2.5 either side, so it holds the most it possibly can: about 46.80%. That is a
        little <i>more</i> than 46.48%, so the area has to come back down to 46.48% on <b>both</b> sides of <M>k = -2</M>.
        That is why there are two answers.
      </Notice>
    )
  } else if (share > TARGET) {
    notice = (
      <Notice>
        The area is <b>above</b> 46.48%: the window is close to centred on the mean ({num(below, 1)} below, {num(above, 1)}{' '}
        above). The exact answers are where the lopsidedness is 3 and 2, one way round or the other.
      </Notice>
    )
  } else if (k > -1.5) {
    notice = (
      <Notice>
        With the mean at <M>{'k = ' + k.toFixed(2)}</M> the window reaches {num(below, 1)} below the mean but only {num(above, 1)} above
        it, so a big part of the curve is outside the window on the right. It holds only about {num(100 * share, 2)}%. The
        window is further left than the old one, so <b>slide the mean left</b>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the mean has gone too far left: the window reaches only {num(below, 1)} below the mean and {num(above, 1)} above, and
        the curve spills out on the left. About {num(100 * share, 2)}%. Slide back to the right.
      </Notice>
    )
  }

  const shade = hit !== undefined ? C.good : C.g

  return (
    <div>
      <Plane
        x={[-14, 10]}
        y={[0, 0.112]}
        xStep={2}
        yStep={0.05}
        yLabels={false}
        xLabels={v => (Math.abs(v % 4) < 1e-9 && v >= -12 && v <= 8 ? tick(v) : '')}
        xLabel="t"
        yLabel=""
        height={260}
      >
        {showOld && (
          <>
            <Plot.OfX y={t => pdf(t, 0)} domain={[-14, 10]} color={C.guide} weight={2} style="dashed" />
            <Line.Segment point1={[-3, 0]} point2={[-3, pdf(-3, 0)]} color={C.guide} style="dashed" weight={1.5} />
            <Line.Segment point1={[2, 0]} point2={[2, pdf(2, 0)]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[6.5, pdf(6.5, 0)]} color={C.guide} attach="ne">old, mean 0</Label>
          </>
        )}
        <Region top={t => pdf(t, k)} bottom={() => 0} from={LO} to={HI} color={shade} opacity={0.35} />
        <Plot.OfX y={t => pdf(t, k)} domain={[-14, 10]} color={C.f} weight={3} />
        <Line.Segment point1={[LO, 0]} point2={[LO, PEAK + 0.006]} color={C.bad} style="dashed" weight={2} />
        <Line.Segment point1={[HI, 0]} point2={[HI, PEAK + 0.006]} color={C.bad} style="dashed" weight={2} />
        <Label at={[LO, PEAK + 0.006]} color={C.bad} attach="w" size={12}>−4.5</Label>
        <Label at={[HI, PEAK + 0.006]} color={C.bad} attach="e" size={12}>0.5</Label>
        {/* The mean, and how far the window reaches either side of it. */}
        <Line.Segment point1={[k, 0]} point2={[k, pdf(k, k)]} color={C.f} style="dashed" weight={1.5} />
        <Label at={[k, pdf(k, k)]} color={C.f} attach="n" size={12}>k</Label>
        {below > 0.6 && <Line.Segment point1={[LO, 0.02]} point2={[k, 0.02]} color={C.ink} weight={1.5} />}
        {above > 0.6 && <Line.Segment point1={[k, 0.035]} point2={[HI, 0.035]} color={C.ink} weight={1.5} />}
        {below > 0.9 && <Label at={[(LO + k) / 2, 0.02]} attach="n" size={11} gap={3}>{num(below, 1)}</Label>}
        {above > 0.9 && <Label at={[(k + HI) / 2, 0.035]} attach="n" size={11} gap={3}>{num(above, 1)}</Label>}
      </Plane>

      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-2 mb-1">
        Area inside the window against the mean <M>k</M>:
      </p>
      <Plane
        x={[-0.2, kx(0.5)]}
        y={[-0.9, 6.3]}
        xStep={1}
        yStep={1}
        xLabels={v => (v >= 1 ? tick(v - KX) : '')}
        yLabels={v => (v > 0.5 && v < 6.5 ? `${v + BASE}%` : '')}
        xLabel="k"
        yLabel=""
        height={190}
      >
        <Line.Segment point1={[kx(-4.35), toY(TARGET)]} point2={[kx(0.5), toY(TARGET)]} color={C.bad} style="dashed" weight={2} />
        <Label at={[kx(0.5), toY(TARGET)]} color={C.bad} attach="nw" size={11}>46.48%</Label>
        <Polyline points={CURVE} color={C.f} weight={3} />
        {found.map(r => (
          <Point key={r} x={kx(r)} y={toY(inWindow(r))} color={C.good} />
        ))}
        {toY(share) >= 0 && <Point x={kx(k)} y={toY(share)} color={hit !== undefined ? C.good : C.g} />}
      </Plane>

      <Controls>
        <Slider label="k" value={k} onChange={move} min={-4} max={0} step={0.05} />
        <Buttons>
          <Toggle label="Compare with the original model" checked={showOld} onChange={setShowOld} />
        </Buttons>
        <Readouts>
          <Readout color={shade} tex={`\\Pr(-4.5 \\le X \\le 0.5) \\approx ${num(100 * share, 2)}\\%`} />
          <Readout tex={`\\text{window: } ${num(below, 1)} \\text{ below, } ${num(above, 1)} \\text{ above the mean}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
