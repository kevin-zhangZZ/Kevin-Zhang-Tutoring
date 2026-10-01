// 2021 Specialist Exam 2 MCQ 4 — why Arg(zz̄ / (z − z̄)) is −π/2 for every z with Im(z) > 0.
// Drag z = a + bi: zz̄ = a² + b² (orange) always lands on the positive real axis (Arg 0) and
// z − z̄ = 2bi (violet) on the positive imaginary axis (Arg π/2), so the quotient
// −(a² + b²)/(2b) i (green) always points straight down: Arg = 0 − π/2. The toggle shows the
// 1/i = i slip behind option D: it puts the quotient at +(a² + b²)/(2b) i, and multiplying
// that back by z − z̄ gives −(a² + b²) (red), not zz̄. z is kept to −1.1 ≤ a ≤ 1.1,
// 0.5 ≤ b ≤ 1.2 so every point fits on screen; it starts at −1.1 + 0.7i, clear of the angle labels.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, Vector, clamp, num } from './kit'

const A_MAX = 1.1
const B_MIN = 0.5
const B_MAX = 1.2
const HALF = Math.PI / 2

export default function QuotientDirection() {
  const [[a, b], setZ] = useState<[number, number]>([-1.1, 0.7])
  const [slip, setSlip] = useState(false)

  const n = a * a + b * b // z z̄
  const d = 2 * b // z − z̄ = d i
  const k = n / d // quotient = −k i
  const side = a < 0 ? 'w' : 'e'
  // quotient label: left of the axis (clear of the tick numbers) unless z̄ is right beside it there
  const qSide = a >= 0 || Math.abs(k - b) > 0.3 ? 'w' : 'e'

  const zTex = `${num(a)} ${b >= 0 ? '+' : '-'} ${num(Math.abs(b))}i`

  return (
    <div>
      <Plane x={[-2.9, 2.9]} y={[-1.7, 2.7]} equalScale height={400} xLabel="Re" yLabel="Im">
        {/* z and its conjugate */}
        <Line.Segment point1={[a, -b]} point2={[a, b]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={a} y={-b} color={C.guide} />
        <Label at={[a, -b]} attach={side} color={C.guide} size={12}>z̄</Label>

        {/* numerator, denominator and the true quotient, all drawn from O */}
        <Vector tail={[0, 0]} tip={[n, 0]} color={C.g} weight={3} />
        <Label at={[n, 0]} attach="n" color={C.g} size={12}>zz̄</Label>
        <Vector tail={[0, 0]} tip={[0, d]} color={C.violet} weight={3} />
        <Label at={[0, d]} attach="e" color={C.violet} size={12}>z − z̄</Label>
        <Plot.Parametric xy={t => [0.5 * Math.cos(t), 0.5 * Math.sin(t)]} domain={[0, HALF]} color={C.violet} weight={2} />
        <Label at={[0.5 * Math.SQRT1_2, 0.5 * Math.SQRT1_2]} attach="ne" color={C.violet} size={12}>π/2</Label>

        {!slip && (
          <>
            <Vector tail={[0, 0]} tip={[0, -k]} color={C.good} weight={3} />
            <Label at={[0, -k]} attach={qSide} color={C.good} size={12}>quotient</Label>
            <Plot.Parametric xy={t => [0.7 * Math.cos(t), 0.7 * Math.sin(t)]} domain={[-HALF, 0]} color={C.good} weight={2} />
            <Label at={[0.7 * Math.SQRT1_2, -0.7 * Math.SQRT1_2]} attach="se" color={C.good} size={12}>−π/2</Label>
          </>
        )}

        {slip && (
          <>
            <Line.Segment point1={[0, 0]} point2={[0, k]} color={C.bad} style="dashed" weight={2} />
            <Point x={0} y={k} color={C.bad} />
            <Label at={[0, k]} attach="w" color={C.bad} size={12}>slip</Label>
            <Line.Segment point1={[0, 0]} point2={[-n, 0]} color={C.bad} style="dashed" weight={2} />
            <Point x={-n} y={0} color={C.bad} />
            {/* keep the label clear of the left edge (large n) and of the y-axis (small n) */}
            <Label at={[-n, 0]} attach={n > 2 ? 'ne' : n < 1 ? 'nw' : 'n'} color={C.bad} size={12}>
              slip × (z − z̄)
            </Label>
          </>
        )}

        <Label at={[a, b]} attach={a < 0 ? 'nw' : 'ne'} color={C.f}>z</Label>
        <MovablePoint
          point={[a, b]}
          onMove={([x, y]) => setZ([clamp(x, -A_MAX, A_MAX), clamp(y, B_MIN, B_MAX)])}
          color={C.f}
        />
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <Toggle label="Use 1/i = i (option D)" checked={slip} onChange={setSlip} />
          <span className="text-[12px] text-gray-500 dark:text-gray-400">Drag z anywhere above the real axis.</span>
        </div>
        <Readouts>
          <Readout color={C.f} tex={`z = ${zTex}`} />
          <Readout color={C.g} tex={`z\\bar z = ${num(n)}`} />
          <Readout color={C.violet} tex={`z - \\bar z = ${num(d)}i`} />
          {slip ? (
            <Readout color={C.bad} tex={`\\text{slip: } {+${num(k)}i}`} />
          ) : (
            <Readout color={C.good} tex={`\\dfrac{z\\bar z}{z-\\bar z} = -${num(k)}i`} />
          )}
        </Readouts>
        {slip ? (
          <Notice tone="warn">
            <b>With <M>{'\\tfrac1i = i'}</M> the quotient would be <M>{`+${num(k)}i`}</M>, pointing up</b> (red): Arg{' '}
            <M>{'\\tfrac\\pi2'}</M>, option D. Test it by multiplying back, since quotient <M>\times</M> divisor must give the
            numerator: <M>{`(${num(k)}i)(${num(d)}i) = -${num(n)}`}</M>, the red point on the negative real axis. But{' '}
            <M>{`z\\bar z = +${num(n)}`}</M>. The fix: <M>{'i \\times (-i) = -i^2 = 1'}</M>, so <M>{'\\tfrac1i = -i'}</M>.
          </Notice>
        ) : (
          <Notice>
            Wherever you drag <M>z</M>, <M>{'z\\bar z = a^2 + b^2'}</M> stays on the positive real axis (Arg <M>0</M>) and{' '}
            <M>{'z - \\bar z = 2bi'}</M> stays on the positive imaginary axis (Arg <M>{'\\tfrac\\pi2'}</M>). Dividing subtracts
            arguments, <M>{'0 - \\tfrac\\pi2 = -\\tfrac\\pi2'}</M>, so the green quotient always points straight down: its
            length changes, its direction never does. Now switch on the slip behind option D.
          </Notice>
        )}
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
          <M>z</M> is kept in a box so every point fits on screen; the directions are the same for every <M>z</M> with{' '}
          <M>{'\\mathrm{Im}(z) > 0'}</M>.
        </p>
      </Controls>
    </div>
  )
}
