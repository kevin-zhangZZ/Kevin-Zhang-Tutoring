// 2018 Specialist Exam 2 MCQ 4 — why cosec(−x) comes out positive. On the unit circle P(x) =
// (cos x, sin x). The conditions cos x = −a < 0 and cot x = b > 0 only hold in the third quadrant
// (shaded), where sin x < 0. The point for −x is P reflected in the horizontal axis, so its height
// sin(−x) = −sin(x) is positive and cosec(−x) = b/a > 0 (option A). Drag P: the readouts compute
// a = −cos x, b = cot x and b/a from the current angle and show b/a = cosec(−x) whenever the
// conditions hold. The toggle shows the wrong idea of stopping at cosec(x) = −b/a (option B).

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Polygon, Readout, Readouts, Toggle, tick } from './kit'

const TAU = 2 * Math.PI
const XR: [number, number] = [-1.75, 1.75]
const YR: [number, number] = [-1.45, 1.45]

/** Keep the angle in [0, 2π) and away from sin x = 0, where cot x is undefined. */
function tidy(t: number): number {
  let u = ((t % TAU) + TAU) % TAU
  for (const k of [0, Math.PI, TAU]) if (Math.abs(u - k) < 0.05) u = k + (u >= k ? 0.05 : -0.05)
  return ((u % TAU) + TAU) % TAU
}

/** Arc of radius r from angle t0 to t1 (t0 < t1). */
function Arc({ t0, t1, r, color }: { t0: number; t1: number; r: number; color: string }) {
  if (t1 - t0 < 0.02) return null
  return <Plot.Parametric xy={t => [r * Math.cos(t), r * Math.sin(t)]} domain={[t0, t1]} color={color} weight={2.5} />
}

const f2 = (v: number) => v.toFixed(2)

export default function ReflectWidget() {
  const [t, setT] = useState((4 * Math.PI) / 3)
  const [wrong, setWrong] = useState(false)

  const c = Math.cos(t)
  const s = Math.sin(t)
  const cot = c / s
  const P: [number, number] = [c, s]
  const Pm: [number, number] = [c, -s]
  const foot: [number, number] = [c, 0]
  const cosOk = c < -1e-9
  const cotOk = cot > 1e-9
  const ok = cosOk && cotOk
  const a = -c
  const b = cot

  // Put each label on the outside of the circle, away from the axes.
  const out = (p: [number, number]) => `${p[1] >= 0 ? 'n' : 's'}${p[0] >= 0 ? 'e' : 'w'}` as 'ne' | 'nw' | 'se' | 'sw'

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (!ok) {
    const why = !cosOk
      ? <>Here <M>{'\\cos x \\ge 0'}</M>, but the question says <M>{'\\cos x = -a'}</M> with <M>{'a > 0'}</M>.</>
      : <>Here <M>{'\\cos x < 0'}</M> as required, but <M>{'\\cot x = \\tfrac{\\cos x}{\\sin x} < 0'}</M> because <M>{'\\sin x > 0'}</M>, and the question says <M>{'\\cot x = b > 0'}</M>.</>
    notice = (
      <>
        {why} Both conditions hold only when <M>P</M> is in the shaded third quadrant, so that is where <M>x</M> must be. Drag <M>P</M> back
        there.
      </>
    )
  } else if (wrong) {
    tone = 'warn'
    notice = (
      <>
        Stopping at <M>{'\\mathrm{cosec}(x) = \\tfrac{1}{\\sin x}'}</M> gives <M>{`-\\tfrac{b}{a} \\approx ${f2(-b / a)}`}</M>, option B. It is negative
        because <M>P</M> is below the axis. But the question asks about <M>-x</M>: turn the toggle off to see <M>P</M> reflected, and its
        height flip sign.
      </>
    )
  } else {
    tone = 'good'
    notice = (
      <>
        <M>{'\\cos x < 0'}</M> and <M>{'\\cot x > 0'}</M> put <M>x</M> in the third quadrant, where the blue height <M>{'\\sin x'}</M> is negative.
        Going round by <M>-x</M> reflects <M>P</M> in the horizontal axis, so the green height <M>{'\\sin(-x) = -\\sin x'}</M> is positive, and
        so is <M>{'\\mathrm{cosec}(-x) = \\tfrac{b}{a}'}</M>. Drag <M>P</M> round the shaded quadrant: the two readouts always agree.
      </>
    )
  }

  return (
    <div>
      <Plane x={XR} y={YR} equalScale height={380} xLabel="" yLabel="" xLabels={v => (Math.abs(Math.abs(v) - 1) < 1e-9 ? tick(v) : '')} yLabels={false}>
        <Polygon points={[[0, 0], [XR[0], 0], [XR[0], YR[0]], [0, YR[0]]]} color={C.g} fillOpacity={0.08} weight={0} />
        <Label at={[XR[0] + 0.05, YR[0] + 0.05]} attach="ne" size={11} color={C.g} gap={2}>{'cos x < 0, cot x > 0'}</Label>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} />
        {/* The angle x (anticlockwise from the positive axis) and, unless hidden, −x (clockwise). */}
        <Arc t0={0} t1={t} r={0.22} color={C.f} />
        {!wrong && <Arc t0={-t} t1={0} r={0.34} color={C.good} />}
        <Line.Segment point1={[0, 0]} point2={P} color={C.ink} weight={1.5} />
        {!wrong && <Line.Segment point1={[0, 0]} point2={Pm} color={C.good} weight={1.5} style="dashed" />}
        {/* cos x along the axis; sin x and sin(−x) as the vertical heights. */}
        <Line.Segment point1={[0, 0]} point2={foot} color={C.g} weight={4} />
        <Line.Segment point1={foot} point2={P} color={wrong && ok ? C.bad : C.f} weight={4} />
        {!wrong && <Line.Segment point1={foot} point2={Pm} color={C.good} weight={4} />}
        <Label at={P} attach={out(P)} gap={10} color={C.ink}>P(x)</Label>
        {!wrong && <Label at={Pm} attach={out(Pm)} gap={10} color={C.good}>P(−x)</Label>}
        <MovablePoint
          point={P}
          onMove={([x, y]) => setT(tidy(Math.atan2(y, x)))}
          constrain={([x, y]) => {
            const u = tidy(Math.atan2(y, x))
            return [Math.cos(u), Math.sin(u)]
          }}
          color={C.violet}
        />
      </Plane>
      <Controls>
        <Readouts>
          <Readout tex={`\\cos x \\approx ${f2(c)}`} color={cosOk ? C.good : C.bad} />
          <Readout tex={`\\cot x \\approx ${f2(cot)}`} color={cotOk ? C.good : C.bad} />
          <Readout tex={`\\sin x \\approx ${f2(s)}`} color={C.f} />
        </Readouts>
        {ok && (
          <Readouts>
            <Readout tex={`\\tfrac{b}{a} = \\tfrac{\\cot x}{-\\cos x} \\approx ${f2(b / a)}`} />
            {wrong ? (
              <Readout tex={`\\mathrm{cosec}(x) = \\tfrac{1}{\\sin x} \\approx ${f2(1 / s)}`} color={C.bad} />
            ) : (
              <Readout tex={`\\mathrm{cosec}(-x) = \\tfrac{1}{\\sin(-x)} \\approx ${f2(-1 / s)}`} color={C.good} />
            )}
          </Readouts>
        )}
        <Toggle label={<>Wrong idea: the minus in <M>{'\\mathrm{cosec}(-x)'}</M> doesn&apos;t matter</>} checked={wrong} onChange={setWrong} />
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
