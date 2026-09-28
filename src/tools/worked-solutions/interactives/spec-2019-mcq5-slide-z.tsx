// 2019 Specialist Exam 2 MCQ 5 — what Arg(z − 2) = π/4 and Arg(z − (5 + i)) = 5π/6 mean on the
// Argand plane. z − 2 is the arrow from 2 to z, so the first locus is the ray from (2, 0) (open) at
// angle π/4, and the second is the ray from (5, 1) (open) at 5π/6, heading up-left. Drag z (locked to
// the first ray by default, so Arg(z − 2) stays π/4) and watch the orange angle Arg(z − (5 + i)): it
// reaches 5π/6 only at z = (2 + √3) + √3i, where a = 2 + √3 ≈ 3.73 (option E) and b = √3 (option D).
// Unlocked, z can be dragged anywhere; below (2, 0) on the line y = x − 2 the blue angle is −3π/4, so
// that half-line is not part of the locus. The toggle shows the sign slip tan(5π/6) = +1/√3: the red
// line meets y = x − 2 at (2 − √3, −√3) (y is option A, x is option B), a point on neither ray.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, Vector, clamp, tick } from './kit'

const R3 = Math.sqrt(3)
const S1: [number, number] = [2, 0]
const S2: [number, number] = [5, 1]
const T1 = Math.PI / 4
const T2 = (5 * Math.PI) / 6
const HIT: [number, number] = [2 + R3, R3]
const SLIP: [number, number] = [2 - R3, -R3]
const X_RANGE: [number, number] = [-0.6, 6.6]
const Y_RANGE: [number, number] = [-2.1, 4.3]

/** An angle as a multiple of π, TeX; exact when it is (to within rounding) π/4, 5π/6 or −3π/4. */
function angTex(a: number): string {
  if (Math.abs(a - T1) < 1e-6) return '\\tfrac{\\pi}{4}'
  if (Math.abs(a - T2) < 1e-6) return '\\tfrac{5\\pi}{6}'
  if (Math.abs(a + (3 * Math.PI) / 4) < 1e-6) return '-\\tfrac{3\\pi}{4}'
  return `\\approx ${(a / Math.PI).toFixed(2).replace('-', '-\\,')}\\pi`
}

/** Arc of radius rad at centre c from angle 0 to angle a (either sign). */
function Arc({ c, a, rad, color }: { c: [number, number]; a: number; rad: number; color: string }) {
  if (Math.abs(a) < 0.02) return null
  return (
    <Plot.Parametric
      xy={t => [c[0] + rad * Math.cos(t), c[1] + rad * Math.sin(t)]}
      domain={a > 0 ? [0, a] : [a, 0]}
      color={color}
      weight={2.5}
    />
  )
}

const near = (p: [number, number], q: [number, number], d: number) => Math.hypot(p[0] - q[0], p[1] - q[1]) < d

export default function SlideZWidget() {
  const [z, setZ] = useState<[number, number]>([4.5, 2.5])
  const [lock, setLock] = useState(true)
  const [slip, setSlip] = useState(false)

  const move = ([x, y]: [number, number]) => {
    if (lock) {
      // Project onto the ray y = x − 2, x > 2, and snap to the crossing when close.
      let t = clamp((x - 2 + y) / 2, 0.2, 3.5)
      if (Math.abs(t - R3) < 0.07) t = R3
      setZ([2 + t, t])
    } else {
      const p: [number, number] = [clamp(x, X_RANGE[0], X_RANGE[1]), clamp(y, Y_RANGE[0], Y_RANGE[1])]
      if (near(p, HIT, 0.14)) setZ(HIT)
      else if (near(p, SLIP, 0.14)) setZ(SLIP)
      else if (near(p, S1, 0.1) || near(p, S2, 0.1)) return // Arg(0) is undefined: keep z off the start points
      else setZ(p)
    }
  }
  const toggleLock = (v: boolean) => {
    setLock(v)
    if (v) move(z)
  }

  const a1 = Math.atan2(z[1] - S1[1], z[0] - S1[0])
  const a2 = Math.atan2(z[1] - S2[1], z[0] - S2[0])
  const on1 = Math.abs(a1 - T1) < 1e-6
  const on2 = Math.abs(a2 - T2) < 1e-6
  const hit = on1 && on2
  const atSlip = z[0] === SLIP[0] && z[1] === SLIP[1]

  const d2: [number, number] = [Math.cos(T2), Math.sin(T2)]

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (hit) {
    tone = 'good'
    notice = (
      <>
        Both conditions hold at once: the arrow from <M>2</M> points at <M>{'\\tfrac{\\pi}{4}'}</M> and the arrow from{' '}
        <M>5 + i</M> points at <M>{'\\tfrac{5\\pi}{6}'}</M>. Here <M>{'z = (2+\\sqrt3) + \\sqrt3\\,i'}</M>, so{' '}
        <M>{'a = 2+\\sqrt3 \\approx 3.73'}</M> and <M>{'b = \\sqrt3 \\approx 1.73'}</M>. The question asks for <M>b</M>, the
        imaginary part: option D. (Option E is <M>a</M>.)
      </>
    )
  } else if (slip) {
    tone = 'warn'
    notice = (
      <>
        The red line has gradient <M>{'+\\tfrac{1}{\\sqrt3}'}</M>, the sign slip <M>{'\\tan\\tfrac{5\\pi}{6} = \\tan\\tfrac{\\pi}{6}'}</M>.
        It meets the grey line <M>{'{y = x - 2}'}</M> at <M>{'(2-\\sqrt3,\\ -\\sqrt3)'}</M>, but that point has <M>{'x < 2'}</M>: it is
        on neither ray. Unlock <M>z</M> and drag it there: <M>{'\\mathrm{Arg}(z-2) = -\\tfrac{3\\pi}{4}'}</M>, not{' '}
        <M>{'\\tfrac{\\pi}{4}'}</M>. Its <M>y</M> is option A and its <M>x</M> is option B.
      </>
    )
  } else if (lock) {
    notice = (
      <>
        <M>z</M> is locked to the blue ray, and <M>{'\\mathrm{Arg}(z-2)'}</M> stays <M>{'\\tfrac{\\pi}{4}'}</M> wherever you slide
        it: the ray is exactly the set of points where the arrow from <M>2</M> to <M>z</M> points at <M>{'\\tfrac{\\pi}{4}.'}</M>{' '}
        Now slide <M>z</M> and watch the orange angle, <M>{'\\mathrm{Arg}(z-(5+i)).'}</M> You need it to reach{' '}
        <M>{'\\tfrac{5\\pi}{6} \\approx 0.83\\pi'}</M>.
      </>
    )
  } else {
    notice = (
      <>
        <M>z</M> is free. The blue angle is <M>{'\\tfrac{\\pi}{4}'}</M> only on the blue ray, and the orange angle is{' '}
        <M>{'\\tfrac{5\\pi}{6}'}</M> only on the orange ray. Now drag <M>z</M> onto the line <M>{'{y = x - 2}'}</M> behind{' '}
        <M>(2, 0)</M>, down and to the left: there the arrow from <M>2</M> points the opposite way, so the blue angle is{' '}
        <M>{'-\\tfrac{3\\pi}{4}'}</M>, not <M>{'\\tfrac{\\pi}{4}'}</M>. That half of the line is not part of the locus.
      </>
    )
  }

  return (
    <div>
      <Plane
        x={X_RANGE}
        y={Y_RANGE}
        equalScale
        height={400}
        xLabel=""
        yLabel="Im"
        xLabels={v => (v === 2 || v > X_RANGE[1] || v < X_RANGE[0] ? '' : tick(v))}
        yLabels={v => (v > Y_RANGE[1] || v < Y_RANGE[0] ? '' : tick(v))}
      >
        {slip && (
          <>
            <Line.ThroughPoints point1={[0, -2]} point2={[1, -1]} color={C.guide} style="dashed" />
            <Line.ThroughPoints point1={S2} point2={[5 + R3, 2]} color={C.bad} style="dashed" />
            <Point x={SLIP[0]} y={SLIP[1]} color={C.bad} />
            <Label at={SLIP} attach="e" color={C.bad} gap={9}>(2 − √3, −√3)</Label>
          </>
        )}
        {/* Axis name inside the plane (the kit's default sits past the edge and clips on a phone). */}
        <Label at={[X_RANGE[1], 0]} attach="nw" size={14} gap={4} italic>Re</Label>
        {/* The two rays, each starting at an open circle. */}
        <Line.Segment point1={S1} point2={[2 + 5, 5]} color={C.f} weight={3} />
        <Line.Segment point1={S2} point2={[S2[0] + 8 * d2[0], S2[1] + 8 * d2[1]]} color={C.g} weight={3} />
        {/* Horizontal references the angles are measured from. */}
        <Line.Segment point1={S1} point2={[S1[0] + 0.9, 0]} color={C.guide} style="dashed" />
        <Line.Segment point1={S2} point2={[S2[0] + 0.9, S2[1]]} color={C.guide} style="dashed" />
        <Arc c={S1} a={a1} rad={0.45} color={on1 ? C.good : C.f} />
        <Arc c={S2} a={a2} rad={0.45} color={on2 ? C.good : C.g} />
        <Vector tail={S1} tip={z} color={C.f} weight={1.5} />
        <Vector tail={S2} tip={z} color={C.g} weight={1.5} />
        <Circle center={S1} radius={0.09} color={C.f} fillOpacity={0} />
        <Circle center={S2} radius={0.09} color={C.g} fillOpacity={0} />
        <Label at={S1} attach="s" color={C.f} gap={10}>2</Label>
        <Label at={S2} attach="se" color={C.g} gap={8}>5 + i</Label>
        <Label at={z} attach={hit ? 'n' : 'nw'} color={hit ? C.good : C.ink} gap={12}>
          {hit ? '(2 + √3, √3)' : 'z'}
        </Label>
        <MovablePoint point={z} onMove={p => move(p as [number, number])} color={hit ? C.good : C.violet} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout tex={`\\mathrm{Arg}(z-2) ${on1 || Math.abs(a1 + (3 * Math.PI) / 4) < 1e-6 ? '=' : ''} ${angTex(a1)}`} color={on1 ? C.good : C.f} />
          <Readout tex={`\\mathrm{Arg}\\big(z-(5+i)\\big) ${on2 ? '=' : ''} ${angTex(a2)}`} color={on2 ? C.good : C.g} />
        </Readouts>
        <Readouts>
          {hit ? (
            <Readout tex={'a = 2+\\sqrt3,\\quad b = \\sqrt3'} color={C.good} />
          ) : atSlip ? (
            <Readout tex={'a = 2-\\sqrt3,\\quad b = -\\sqrt3'} color={C.bad} />
          ) : (
            <Readout tex={`a = \\mathrm{Re}(z) \\approx ${z[0].toFixed(2)},\\quad b = \\mathrm{Im}(z) \\approx ${z[1].toFixed(2).replace('-', '-\\,')}`} />
          )}
        </Readouts>
        <Toggle label={<>Lock <M>z</M> to the blue ray</>} checked={lock} onChange={toggleLock} />
        <Toggle label={<>Wrong idea: gradient <M>{'\\tan\\tfrac{5\\pi}{6} = +\\tfrac{1}{\\sqrt3}'}</M></>} checked={slip} onChange={setSlip} />
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
