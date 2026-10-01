// 2021 Specialist Exam 2 MCQ 5 — why the greatest |z| on |z − 2 − √3i| = 1 is at the far end of
// the line from O through the centre, not at the top of the circle. Drag P round the circle: the
// orange segment OP is |z|, the violet drop to the real axis is Im(z), and the dashed grey circle
// (centre O, through P) shows whether any part of the circle is still farther from O than P is.
// At the highest point Im(z) = √3 + 1 ≈ 2.73 (option A, chosen by 42%) but |z| ≈ 3.39; the
// maximum is √7 + 1 ≈ 3.65 at (2 + 2/√7, √3 + √3/√7) ≈ (2.76, 2.39), where the circle sits
// entirely inside the dashed one.

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, num } from './kit'
import type { Attach } from './kit'

const R3 = Math.sqrt(3)
const CX = 2
const CY = R3
const OC = Math.sqrt(7)
const TH_FAR = Math.atan2(CY, CX) // direction from O to the centre (≈ 0.714 rad)
const TH_TOP = Math.PI / 2
const TH_NEAR = TH_FAR - Math.PI
const SNAP = 0.04

const wrap = (t: number) => Math.atan2(Math.sin(t), Math.cos(t))
const near = (t: number, target: number, tol = 0.03) => Math.abs(wrap(t - target)) < tol

/** The compass side of the circle that the angle t points to, for P's label. */
function outward(t: number): Attach {
  const dirs: Attach[] = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se']
  const k = Math.round(wrap(t) / (Math.PI / 4))
  return dirs[(k + 8) % 8]
}

export default function FarthestPoint() {
  const [th, setTh] = useState(TH_TOP)
  const px = CX + Math.cos(th)
  const py = CY + Math.sin(th)
  const mod = Math.hypot(px, py)
  const farX = CX + CX / OC
  const farY = CY + CY / OC

  const move = ([mx, my]: [number, number]) => {
    let t = Math.atan2(my - CY, mx - CX)
    for (const target of [TH_FAR, TH_TOP]) if (near(t, target, SNAP)) t = target
    setTh(t)
  }

  let notice
  if (near(th, TH_TOP)) {
    notice = (
      <Notice tone="warn">
        <b>This is the highest point of the circle:</b> <M>{'\\mathrm{Im}(z) = \\sqrt3 + 1 \\approx 2.73'}</M>, option A. But{' '}
        <M>|z|</M> is the <i>length</i> of OP, not the height of P, and here <M>{`|z| \\approx ${num(mod)}`}</M>. The dashed
        circle is every point at that distance from O, and part of the blue circle pokes outside it on the right: those points
        are farther from O. Drag P clockwise towards the dashed line through the centre.
      </Notice>
    )
  } else if (near(th, TH_FAR)) {
    notice = (
      <Notice tone="good">
        <b>P is on the line from O through the centre, on the far side.</b> Now the whole blue circle sits inside the dashed
        one and touches it only at P, so no point of the circle is farther from O. The distance is O to the centre plus the
        radius: <M>{'|z|_{\\max} = \\sqrt7 + 1 \\approx 3.65'}</M>, option D. Press &ldquo;Highest point&rdquo; to compare.
      </Notice>
    )
  } else if (near(th, TH_NEAR, 0.05)) {
    notice = (
      <Notice>
        This is the <b>nearest</b> point to O, on the same line but on the near side: <M>{'|z|_{\\min} = \\sqrt7 - 1 \\approx 1.65'}</M>.
        The farthest point is directly opposite it, through the centre.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here <M>{`|z| \\approx ${num(mod)}`}</M>. Part of the blue circle is still outside the dashed circle, so some points
        are farther from O than P. Keep dragging P towards the end of the dashed line through the centre, where{' '}
        <M>|z|</M> is greatest.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.5, 4.2]} y={[-0.5, 4]} equalScale height={420} xLabel="Re" yLabel="Im">
        <Circle center={[0, 0]} radius={mod} color={C.guide} weight={1.5} fillOpacity={0.04} strokeStyle="dashed" />
        <Line.Segment point1={[0, 0]} point2={[farX, farY]} color={C.guide} style="dashed" weight={1.5} />
        <Circle center={[CX, CY]} radius={1} color={C.f} weight={3} fillOpacity={0.06} />
        <Point x={CX} y={CY} color={C.f} />
        <Label at={[CX, CY]} attach="e" color={C.f} size={12}>(2, √3)</Label>
        <Line.Segment point1={[px, 0]} point2={[px, py]} color={C.violet} style="dashed" weight={2} />
        <Label at={[px, 0.32]} attach={px < CX - 0.3 ? 'w' : 'e'} color={C.violet} size={12}>Im(z)</Label>
        <Line.Segment point1={[0, 0]} point2={[px, py]} color={C.g} weight={3} />
        <Label at={[px * 0.35, py * 0.35]} attach="nw" color={C.g} size={13}>|z|</Label>
        <Label at={[0, 0]} attach="sw" size={12}>O</Label>
        <Label at={[px, py]} attach={outward(th)} color={C.g} gap={11}>P</Label>
        <MovablePoint point={[px, py]} onMove={move} color={C.g} />
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="Highest point" onClick={() => setTh(TH_TOP)} />
          <ActionButton label="Farthest point" onClick={() => setTh(TH_FAR)} />
          <span className="text-[12px] text-gray-500 dark:text-gray-400">or drag P round the circle.</span>
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`|z| = ${num(mod)}`} />
          <Readout color={C.violet} tex={`\\mathrm{Im}(z) = ${num(py)}`} />
          <Readout tex={'\\sqrt7 + 1 \\approx 3.65'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
