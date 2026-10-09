// 2023 Methods Exam 1 Q3b — solving f(x) ≤ 1 for f(x) = 2 − 3/(x − 1) by reading the sketch.
// Slide x across both branches: the test point on the curve is green when f(x) ≤ 1 and red when
// not. Every x left of the asymptote x = 1 gives f(x) > 2, the curve is undefined at x = 1, it
// is below y = 1 from the asymptote up to x = 4, and above it again after 4, so the answer is
// (1, 4]. A toggle shows the popular wrong answer (−∞, 4] (from multiplying by x − 1 without checking its
// sign): the red part of that interval sits under the left branch, where nothing works.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, num, tick } from './kit'

const f = (x: number) => 2 - 3 / (x - 1)
const X_MIN = -3
const X_MAX = 7
const Y_LO = -4.7
const Y_HI = 6.7

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

export default function Branches() {
  const [x0, setX0] = useState(-1)
  const [wrong, setWrong] = useState(false)

  const atPole = Math.abs(x0 - 1) < 0.025
  const atFour = Math.abs(x0 - 4) < 0.025
  const fx = atFour ? 1 : f(x0)
  const ok = !atPole && fx <= 1 + 1e-9
  const col = atPole ? C.guide : ok ? C.good : C.bad
  const yShown = clamp(fx, Y_LO, Y_HI)
  const onView = !atPole && fx > Y_LO && fx < Y_HI
  const xs = num(x0, 2)

  let notice
  if (wrong && x0 < 1 && !atPole) {
    notice = (
      <Notice tone="warn">
        <b><M>{`x = ${xs}`}</M> is inside <M>{'(-\\infty, 4]'}</M></b>, but <M>{`f(${xs}) = ${num(fx)}`}</M> is above the
        line <M>y = 1</M>, so it is not a solution. The red part of the <M>x</M>-axis is all under the left branch, which
        never comes down below <M>y = 2</M>. The answer <M>{'(-\\infty, 4]'}</M> only used the crossing at <M>x = 4</M> and
        ignored the asymptote at <M>x = 1</M>.
      </Notice>
    )
  } else if (wrong && !atPole) {
    notice = (
      <Notice>
        To the right of <M>x = 1</M>, the red interval <M>{'(-\\infty, 4]'}</M> and the green answer <M>{'(1, 4]'}</M>{' '}
        agree. All the difference is on the left: slide <M>x</M> below 1 to see why those <M>x</M>-values fail.
      </Notice>
    )
  } else if (atPole) {
    notice = (
      <Notice>
        <b><M>x = 1</M> is not in the domain</b>: <M>{'f(1) = 2 - \\tfrac{3}{0}'}</M> does not exist. So 1 cannot be in the
        answer, and the interval is open there. Slide a little to the right: the curve is far below <M>y = 1</M>.
      </Notice>
    )
  } else if (x0 < 1) {
    notice = (
      <Notice tone="warn">
        <b>Left branch: <M>{`f(${xs}) = ${num(fx)} > 1`}</M>.</b> For <M>{'x < 1'}</M>, <M>{'\\tfrac{3}{x-1}'}</M> is
        negative, so <M>{'f(x) = 2 - (\\text{negative})'}</M> is always above 2. No <M>x</M>-value on this branch works.
        Slide <M>x</M> past the asymptote to the right branch.
      </Notice>
    )
  } else if (atFour) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 4</M> the curve meets <M>y = 1</M></b>: <M>f(4) = 1</M>. The inequality is <M>{'\\le'}</M>, so 4 is
        included and the interval is closed there. Slide past 4 to see the curve rise above the line.
      </Notice>
    )
  } else if (x0 < 4) {
    notice = (
      <Notice tone="good">
        <b>Right branch, <M>{'1 < x < 4'}</M>: <M>{`f(${xs}) = ${num(fx)} \\le 1`}</M>.</b> Here the curve climbs from far
        below up to the line <M>y = 1</M>, so every <M>x</M> between the asymptote and 4 works. Turn on the toggle to test
        the popular answer <M>{'(-\\infty, 4]'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Past <M>x = 4</M>: <M>{`f(${xs}) = ${num(fx)} > 1`}</M>.</b> The right branch keeps rising towards{' '}
        <M>y = 2</M>, so it stays above <M>y = 1</M> from here on. The only <M>x</M>-values that work are the green ones:{' '}
        <M>{'1 < x \\le 4'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      {/* The top tick (6) is left unnumbered so it does not sit under the axis name y. */}
      <Plane x={[X_MIN, X_MAX]} y={[-4, 6]} height={340} yLabels={v => (v > 5.5 ? '' : tick(v))}>
        <Line.Segment point1={[1, Y_LO]} point2={[1, Y_HI]} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={[X_MIN - 1, 2]} point2={[X_MAX + 1, 2]} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={[X_MIN - 1, 1]} point2={[X_MAX + 1, 1]} color={C.g} weight={2.5} />

        <Plot.OfX y={f} domain={[X_MIN - 1, 0.4]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[1.4, X_MAX + 1]} color={C.f} weight={3} />
        {/* The part of the curve on or below y = 1 (always), and (toggle) the left branch, where every x is ≤ 4 but fails. */}
        <Plot.OfX y={f} domain={[1.4, 4]} color={C.good} weight={5} />
        {wrong && <Plot.OfX y={f} domain={[X_MIN - 1, 0.4]} color={C.bad} weight={5} />}

        {/* The answer set on the x-axis, and (toggle) the wrong answer (−∞, 4] under it. */}
        {wrong && <Line.Segment point1={[X_MIN - 1, 0]} point2={[4, 0]} color={C.bad} weight={6} />}
        <Line.Segment point1={[1, 0]} point2={[4, 0]} color={C.good} weight={6} />
        <OpenPoint x={1} y={0} color={C.good} />
        <Point x={4} y={0} color={C.good} />
        <Point x={4} y={1} color={C.g} />

        <Label at={[1, 5.4]} color={C.guide} attach="e">x = 1</Label>
        <Label at={[6.9, 2]} color={C.guide} attach="nw" gap={4}>y = 2</Label>
        <Label at={[-2.9, 1]} color={C.g} attach="ne" gap={4}>y = 1</Label>
        <Label at={[4, 1]} color={C.g} attach="se">(4, 1)</Label>
        <Label at={[-2.5, f(-2.5)]} color={C.f} attach="n" gap={16}>y = f(x)</Label>

        {/* The x being tested, and the curve's height above it. */}
        <Line.Segment point1={[x0, 0]} point2={[x0, atPole ? Y_LO : yShown]} color={col} style="dashed" weight={2} />
        {onView && <Point x={x0} y={fx} color={col} />}
        <Point x={x0} y={0} color={col} />
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={X_MIN} max={X_MAX} step={0.05} format={v => num(v, 2)} />
        <Toggle label={<>Test the answer <M>{'(-\\infty, 4]'}</M></>} checked={wrong} onChange={setWrong} />
        <Readouts>
          {atPole ? (
            <Readout color={C.guide} tex={'f(1) = 2 - \\tfrac{3}{0} \\ \\text{is undefined}'} />
          ) : (
            <Readout color={col} tex={`f(${xs}) = 2 - \\frac{3}{${xs} - 1} = ${num(fx)}`} />
          )}
          {!atPole && (
            <Readout color={col} tex={ok ? `${num(fx)} \\le 1 \\ \\checkmark` : `${num(fx)} > 1 \\ \\times`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
