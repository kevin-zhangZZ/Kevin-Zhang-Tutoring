// 2019 Specialist Exam 2 Q2b.i — every circle through the conjugate pair −1 ± (√6/2)i has its
// centre on the real axis (the perpendicular bisector of the pair). Drag the centre h along the
// real axis: the radius is the hypotenuse of a right triangle with legs |h + 1| and √6/2, so
// r² = (h + 1)² + 3/2 is smallest at h = −1, where the roots are the ends of a diameter. A toggle
// draws the report's common slip m = −1 (a circle centred at +1), which misses both roots.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, Slider,
  Toggle, clamp, num, tick,
} from './kit'

/** Tick numbers only inside the requested range (the padding beyond it would put a tick under the axis names). */
const inRange = (lo: number, hi: number) => (v: number) => (v < lo - 1e-9 || v > hi + 1e-9 ? '' : tick(v))

const K = Math.sqrt(6) / 2 // imaginary part of the roots, and the minimum radius
const H_MIN = -2.6
const H_MAX = 0.6

export default function SmallestCircle() {
  const [h, setH] = useState(0)
  const [slip, setSlip] = useState(false)

  const r = Math.sqrt((h + 1) ** 2 + 1.5)
  const atMid = Math.abs(h + 1) < 0.03
  const col = atMid ? C.good : C.f
  const right = h > -1 // which side of the roots the centre is on
  const move = (v: number) => setH(clamp(Math.round(v * 20) / 20, H_MIN, H_MAX))

  let notice
  if (slip) {
    notice = (
      <Notice tone="warn">
        The red dashed circle is <M>{'|z-1|=\\tfrac{\\sqrt6}{2}'}</M>: what you get by reading <M>{'|z+m|'}</M> as
        &ldquo;centre <M>m</M>&rdquo; and writing <M>m=-1</M>. It misses both roots. <M>{'|z+m|=|z-(-m)|'}</M> is the
        distance from <M>-m</M>, so a centre of <M>-1</M> needs <M>m=1</M>. Check by putting the centre in:{' '}
        <M>{'|-1+m|'}</M> must be <M>0</M>.
      </Notice>
    )
  } else if (atMid) {
    notice = (
      <Notice tone="good">
        At <M>h=-1</M> the orange leg has vanished, so <M>{'r^2=0+\\tfrac32'}</M> and{' '}
        <M>{'r=\\tfrac{\\sqrt6}{2}\\approx1.22'}</M>, the smallest possible. The chord joining the roots now passes
        through the centre: the roots are the ends of a <b>diameter</b>. Centre <M>{'-1=-m'}</M>, so <M>m=1</M> and{' '}
        <M>{'n=\\tfrac{\\sqrt6}{2}'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Wherever the centre sits on the real axis, the circle still passes through <b>both</b> roots: the real axis is
        the perpendicular bisector of a conjugate pair, so every point on it is equally far from the two. The radius is
        the hypotenuse of a right triangle with legs <M>{'|h+1|'}</M> (orange) and <M>{'\\tfrac{\\sqrt6}{2}'}</M>{' '}
        (violet), so <M>{'r^2=(h+1)^2+\\tfrac32'}</M>. Drag the centre towards <M>-1</M> and watch the orange leg
        shrink.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.8, 1.8]} y={[-2.2, 2.2]} equalScale height={330} xLabel="" yLabel="Im" xLabels={inRange(-3.8, 1.8)}>
        <Label at={[1.8, 0]} attach="n" size={14} italic>Re</Label>
        <Circle center={[h, 0]} radius={r} color={col} fillOpacity={0.07} weight={2.5} />
        {slip && <Circle center={[1, 0]} radius={K} color={C.bad} fillOpacity={0} weight={2.5} strokeStyle="dashed" />}
        {/* The chord joining the roots: a diameter only when the centre is at its midpoint. */}
        <Line.Segment point1={[-1, -K]} point2={[-1, K]} color={atMid ? C.good : C.guide} style="dashed" weight={2} />
        {!atMid && (
          <>
            <Line.Segment point1={[h, 0]} point2={[-1, 0]} color={C.g} weight={4} />
            <Line.Segment point1={[-1, 0]} point2={[-1, K]} color={C.violet} weight={4} />
            <Line.Segment point1={[h, 0]} point2={[-1, K]} color={col} weight={2.5} />
            <Label at={[(h - 1) / 2, K / 2]} attach={right ? 'ne' : 'nw'} color={col}>r</Label>
          </>
        )}
        <Point x={-1} y={K} color={C.ink} />
        <Point x={-1} y={-K} color={C.ink} />
        <Label at={[-1, K]} attach="nw" gap={9}>−1 + (√6/2)i</Label>
        <Label at={[-1, -K]} attach="sw" gap={9}>−1 − (√6/2)i</Label>
        <MovablePoint point={[h, 0]} onMove={p => move(p[0])} constrain={pt => [pt[0], 0]} color={col} />
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={move} min={H_MIN} max={H_MAX} step={0.05} />
        <Buttons>
          <ActionButton label="Centre at the midpoint" onClick={() => setH(-1)} />
          <Toggle label="Common slip: m = −1" checked={slip} onChange={setSlip} />
        </Buttons>
        <div className="[&_.katex]:pointer-events-none">
        <Readouts>
          <Readout color={col} tex={`\\text{centre } h=${num(h)}`} />
          <Readout color={col} tex={`r=\\sqrt{(h+1)^2+\\tfrac32}=${num(r, 3)}`} />
          <Readout tex={`\\text{smallest: }\\tfrac{\\sqrt6}{2}\\approx${num(K, 3)}`} />
        </Readouts>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
