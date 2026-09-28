// 2019 Methods Exam 1 Q8c — on D = (−1, 1)\{0}, h simplifies to log_e(4(1 − x)). Sweep x from −1
// to 1: the traced point's height is projected onto a range bar at the right, which gets painted
// from just below log_e 8 (open — x = −1 isn't in D) downward towards −∞ (asymptote x = 1). As the
// sweep passes the hole at x = 0 the bar is left with a gap at log_e 4: h is strictly decreasing, so
// that value came only from x = 0. A toggle closes the hole to show the answer (−∞, log_e 8) that
// forgets x ≠ 0. Readouts check the simplified rule against the original two-log rule.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, num, tick, usePlayer,
} from './kit'

const h = (x: number) => Math.log(4 * (1 - x))
const g = (x: number) => -4 * x * x * (x * x - 1)
const LOG8 = Math.log(8)
const LOG4 = Math.log(4)
const YMIN = -2.5
const YMAX = 2.6
const BAR = 1.35

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

export default function RangeWidget() {
  const [raw, setRaw] = useState(0.35)
  const [forget, setForget] = useState(false)
  const player = usePlayer(setRaw, { min: -0.99, max: 0.99, seconds: 7 })
  const x0 = Math.abs(raw) < 0.005 ? 0 : raw

  const atHole = x0 === 0 && !forget
  const y0 = h(x0)
  const yShown = Math.max(y0, YMIN)
  const passed = x0 > 0
  const gap = passed && !forget

  let notice
  if (forget) {
    notice = (
      <Notice tone="warn">
        Forget that <M>x \ne 0</M> and the curve looks unbroken, so the range comes out as{' '}
        <M>{'(-\\infty,\\ \\log_e 8)'}</M>. But <M>0</M> is not in <M>D</M> (there <M>{'x^3+x^2 = 0'}</M>), so{' '}
        <M>h(0)</M> doesn&apos;t exist and <M>{'\\log_e 4'}</M> is never an output. Turn the toggle off to see the gap.
      </Notice>
    )
  } else if (atHole) {
    notice = (
      <Notice tone="warn">
        <b><M>x = 0</M> is not in <M>D</M></b>, so there is no point here: the curve has a hole at{' '}
        <M>{'(0,\\ \\log_e 4)'}</M>. And because <M>h</M> is strictly decreasing, no other <M>x</M> gives the height{' '}
        <M>{'\\log_e 4'}</M> either, so that one value is missing from the range. Keep sweeping right.
      </Notice>
    )
  } else if (!passed) {
    notice = (
      <Notice>
        As <M>x</M> moves right from <M>-1</M>, <M>h(x)</M> falls from just under <M>{'\\log_e 8'}</M>. The top value{' '}
        <M>{'\\log_e 8'}</M> would need <M>x = -1</M>, which isn&apos;t in <M>D</M>, so the bar is open at the top. Press
        Sweep, or drag <M>x</M> past <M>0</M> and watch the bar.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        The bar now has a <b>gap at <M>{'\\log_e 4'}</M></b>: the hole in the domain became a hole in the range. As{' '}
        <M>{'x \\to 1^-'}</M>, <M>{'4(1-x) \\to 0^+'}</M> so <M>{'h \\to -\\infty'}</M> and the bar runs all the way down.
        Range: <M>{'{(-\\infty,\\ \\log_e 8)\\setminus\\{\\log_e 4\\}}'}</M>.
      </Notice>
    )
  }

  const onX = (v: number) => {
    player.stop()
    setRaw(v)
  }

  return (
    <div>
      <Plane
        x={[-1.3, 1.9]}
        y={[YMIN, YMAX]}
        xStep={0.5}
        yStep={1}
        height={340}
        xLabels={v => (v < -1.3 || v > 1.9 ? '' : tick(v))}
        yLabels={v => (v < YMIN || v > YMAX ? '' : tick(v))}
      >
        <Line.Segment point1={[1, YMIN]} point2={[1, YMAX]} color={C.bad} style="dashed" weight={2} />
        <Label at={[1, 2.35]} attach="w" color={C.bad}>x = 1</Label>
        <Plot.OfX y={h} domain={[-1, 0.999]} color={C.guide} weight={2} />
        <Plot.OfX y={h} domain={[-1, x0]} color={C.f} weight={3.5} />
        <Line.Segment point1={[0, LOG4]} point2={[BAR, LOG4]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[-1, LOG8]} point2={[BAR, LOG8]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[BAR, YMIN]} point2={[BAR, LOG8]} color={C.guide} weight={2} />
        {x0 > -0.99 && <Line.Segment point1={[BAR, yShown]} point2={[BAR, LOG8]} color={C.violet} weight={6} />}
        {y0 >= YMIN && <Line.Segment point1={[x0, y0]} point2={[BAR, y0]} color={C.violet} style="dashed" weight={1.5} />}
        <OpenPoint x={-1} y={LOG8} color={C.f} />
        <OpenPoint x={BAR} y={LOG8} color={C.violet} />
        {forget ? <Point x={0} y={LOG4} color={C.bad} /> : <OpenPoint x={0} y={LOG4} color={C.bad} />}
        {gap && <OpenPoint x={BAR} y={LOG4} color={C.violet} />}
        {!atHole && y0 >= YMIN && <Point x={x0} y={y0} color={C.f} />}
        {!atHole && y0 >= YMIN && <Point x={BAR} y={y0} color={C.violet} />}
        <Label at={[BAR, LOG8]} attach="e" color={C.violet}>logₑ 8</Label>
        <Label at={[BAR, LOG4]} attach="e" color={gap ? C.violet : C.guide}>logₑ 4</Label>
        <Label at={[BAR, YMIN]} attach="ne" color={C.violet}>range</Label>
        <Label at={[0.5, h(0.5)]} attach="sw" color={C.f}>y = h(x)</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={onX} min={-0.99} max={0.99} step={0.01} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(raw)} label="Sweep from −1 to 1" />
          <Toggle label="What if I forget x ≠ 0?" checked={forget} onChange={setForget} />
        </Buttons>
        <Readouts>
          {x0 === 0 ? (
            <>
              <Readout color={C.bad} tex={'h(0)\\ \\text{undefined: } \\log_e(0^3+0^2) = \\log_e 0'} />
              <Readout color={C.bad} tex={'\\log_e(4(1-0)) = \\log_e 4 \\text{ is never reached}'} />
            </>
          ) : (
            <>
              <Readout color={C.f} tex={`h(${num(x0)}) = \\log_e(4(1-x)) = ${num(y0, 3)}`} />
              <Readout tex={`\\log_e g(x) - \\log_e(x^3+x^2) = ${num(Math.log(g(x0)) - Math.log(x0 ** 3 + x0 ** 2), 3)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
