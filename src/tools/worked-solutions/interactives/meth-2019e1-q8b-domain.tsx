// 2019 Methods Exam 1 Q8b — h(x) = log_e(g(x)) − log_e(x³ + x²) exists only where BOTH log inputs
// are positive. Drag x along the axis: the two inputs g(x) = −4x²(x² − 1) and x³ + x² are plotted,
// with their positive parts shaded, and h is defined only where both dots are above the axis —
// giving D = (−1, 1)\{0} (green, open at −1, 0 and 1). A toggle shows the tempting shortcut of
// simplifying to log_e(4(1 − x)) first, whose domain x < 1 wrongly lets in x ≤ −1 and x = 0.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, clamp, num, tick,
} from './kit'

const g = (x: number) => -4 * x * x * (x * x - 1)
const p = (x: number) => x ** 3 + x ** 2
const X0 = -1.7
const X1 = 1.7

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

export default function DomainWidget() {
  const [x, setX] = useState(-0.5)
  const [shortcut, setShortcut] = useState(false)

  const gx = g(x)
  const px = p(x)
  const eps = 1e-9
  const gOk = gx > eps
  const pOk = px > eps
  const inD = gOk && pOk
  const shortcutOk = x < 1 - eps

  let notice
  if (shortcut) {
    notice =
      shortcutOk && !inD ? (
        <Notice tone="warn">
          The simplified rule <M>{'\\log_e(4(1-x))'}</M> is happy here, but <b><M>h</M> itself is not</b>:{' '}
          {!gOk ? (
            <>
              <M>{`g(x) = ${num(gx)}`}</M>, and <M>{'\\log_e'}</M> of a number that isn&apos;t positive doesn&apos;t exist.
            </>
          ) : (
            <>
              <M>{`x^3+x^2 = ${num(px)}`}</M>, and <M>{'\\log_e'}</M> of a number that isn&apos;t positive doesn&apos;t exist.
            </>
          )}{' '}
          Log laws only apply where each log already exists, so the red shortcut domain <M>{'x<1'}</M> is too big. Find{' '}
          <M>D</M> from the rule as given.
        </Notice>
      ) : (
        <Notice tone="warn">
          The red strip is the domain of the simplified rule <M>{'\\log_e(4(1-x))'}</M>: all <M>{'x<1'}</M>. Drag{' '}
          <M>x</M> to <M>-1.3</M> or to <M>0</M> and the shortcut still says &ldquo;fine&rdquo;, but one of the original
          logs has no value.
        </Notice>
      )
  } else if (inD) {
    notice = (
      <Notice tone="good">
        Both dots are above the axis, so both logs exist and <M>h(x)</M> has a value. Every <M>x</M> in{' '}
        <M>{'(-1,0)'}</M> and <M>{'(0,1)'}</M> works; the orange curve is only just positive on <M>{'(-1,0)'}</M>, but
        just positive is enough. Now drag to exactly <M>0</M>.
      </Notice>
    )
  } else if (Math.abs(x) < 0.01) {
    notice = (
      <Notice tone="warn">
        At <M>x = 0</M> both curves only <b>touch</b> the axis: <M>g(0) = 0</M> and <M>0^3+0^2 = 0</M>. Zero isn&apos;t
        positive and <M>{'\\log_e 0'}</M> is undefined, so <M>0</M> is punched out of the domain even though every{' '}
        <M>x</M> near it works.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        {!gOk && !pOk ? 'Both dots are' : !gOk ? 'The blue dot is' : 'The orange dot is'} on or below the axis, so{' '}
        {!gOk && !pOk ? 'neither log exists' : !gOk ? <M>{'\\log_e(g(x))'}</M> : <M>{'\\log_e(x^3+x^2)'}</M>}
        {!gOk && !pOk ? '' : ' has no value'} and <M>h(x)</M> is undefined. <M>h</M> needs <b>both</b> dots strictly above
        the axis at once. Turn on the shortcut to see a tempting way to get this wrong.
      </Notice>
    )
  }

  const onX = (v: number) => setX(Math.abs(v) < 0.01 ? 0 : clamp(v, -1.6, 1.6))

  return (
    <div>
      <Plane x={[X0, X1]} y={[-1.4, 2.2]} xStep={0.5} yStep={1} height={320} xLabels={v => (v < X0 || v > X1 ? '' : tick(v))}>
        <Region top={xx => Math.max(g(xx), 0)} bottom={() => 0} from={-1} to={1} color={C.f} opacity={0.18} />
        <Region top={xx => Math.max(p(xx), 0)} bottom={() => 0} from={-1} to={X1} color={C.g} opacity={0.1} />
        <Plot.OfX y={g} domain={[X0, X1]} color={C.f} weight={3} />
        <Plot.OfX y={p} domain={[X0, X1]} color={C.g} weight={3} />
        {shortcut ? (
          <>
            <Line.Segment point1={[X0, 0]} point2={[1, 0]} color={C.bad} weight={6} />
            <OpenPoint x={1} y={0} color={C.bad} />
          </>
        ) : (
          <>
            <Line.Segment point1={[-1, 0]} point2={[1, 0]} color={C.good} weight={6} />
            <OpenPoint x={-1} y={0} color={C.good} />
            <OpenPoint x={0} y={0} color={C.good} />
            <OpenPoint x={1} y={0} color={C.good} />
          </>
        )}
        <Line.Segment point1={[x, -1.4]} point2={[x, 2.2]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={x} y={clamp(gx, -1.4, 2.2)} color={gOk ? C.f : C.bad} />
        <Point x={x} y={clamp(px, -1.4, 2.2)} color={pOk ? C.g : C.bad} />
        <Label at={[-Math.SQRT1_2, 1]} attach="n" color={C.f}>y = g(x)</Label>
        <Label at={[1, 2]} attach="e" color={C.g}>y = x³ + x²</Label>
        <MovablePoint point={[x, 0]} onMove={pt => onX(pt[0])} constrain={pt => [clamp(pt[0], -1.6, 1.6), 0]} color={inD ? C.good : C.bad} />
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={onX} min={-1.6} max={1.6} step={0.05} />
        <Toggle label="Shortcut: simplify with log laws first" checked={shortcut} onChange={setShortcut} />
        <Readouts>
          <Readout color={gOk ? C.f : C.bad} tex={`g(x) = ${num(gx, 3)}${gOk ? ' > 0' : ' \\le 0'}`} />
          <Readout color={pOk ? C.g : C.bad} tex={`x^3+x^2 = ${num(px, 3)}${pOk ? ' > 0' : ' \\le 0'}`} />
          <Readout
            color={inD ? C.good : C.bad}
            tex={inD ? `h(x) = ${num(Math.log(gx) - Math.log(px), 3)}` : 'h(x)\\ \\text{undefined}'}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
