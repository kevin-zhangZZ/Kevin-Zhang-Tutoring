// 2018 Specialist Exam 2 MCQ 2 — f(x) = 1/√(sin⁻¹(cx + d)) is built in layers, and x is in the
// domain only if it survives every layer. Drag x along the axis: the readouts push it through
// u = cx + d → sin⁻¹(u) → √ → 1/√, turning red at the first layer that fails. The orange curve is
// y = sin⁻¹(cx + d), the sky curve is f itself, and the green interval (−d/c, (1 − d)/c] is the
// domain — open where sin⁻¹ is 0 (f has a vertical asymptote there), closed at the top where
// f = 1/√(π/2). A toggle shows option C's extra left half, where sin⁻¹ is negative. Sliders move c, d.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, num, tick,
} from './kit'

const X0 = -3
const X1 = 3
const Y0 = -2.5
const Y1 = 3.5
const HALF_PI = Math.PI / 2

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

export default function LayersWidget() {
  const [c, setC] = useState(1)
  const [d, setD] = useState(0.5)
  const [x, setX] = useState(-0.9)
  const [optC, setOptC] = useState(false)

  const zero = -d / c
  const top = (1 - d) / c
  const bot = (-1 - d) / c

  const u = c * x + d
  const inArc = Math.abs(u) <= 1 + 1e-9
  const s = inArc ? Math.asin(clamp(u, -1, 1)) : NaN
  const isZero = Math.abs(u) < 1e-9
  const ok = inArc && !isZero && u > 0
  const fx = ok ? 1 / Math.sqrt(s) : NaN

  // Snap x onto the two endpoints so the student can land exactly on them.
  const onX = (v: number) => {
    let w = clamp(v, X0 + 0.1, X1 - 0.1)
    if (Math.abs(w - zero) < 0.06) w = zero
    else if (Math.abs(w - top) < 0.06) w = top
    else if (Math.abs(w - bot) < 0.06) w = bot
    setX(w)
  }
  // Keep x at the same u when c or d change, so the story stays put.
  const setCD = (nc: number, nd: number) => {
    setX(clamp((u - nd) / nc, X0 + 0.1, X1 - 0.1))
    setC(nc)
    setD(nd)
  }

  // f from where it comes down into view to the top end.
  const fStart = (Math.sin(1 / (Y1 * Y1)) - d) / c
  const gFrom = Math.max(bot, X0)
  const gTo = Math.min(top, X1)

  const bad = C.bad
  const good = C.good
  const layer1 = inArc
    ? { tex: `\\sin^{-1}(u)=${num(s, 3)}`, color: u >= 0 ? good : bad }
    : { tex: `\\sin^{-1}(${num(u, 2)})\\ \\text{undefined}`, color: bad }
  const layer2 = !inArc
    ? null
    : u < -1e-9
      ? { tex: `\\sqrt{${num(s, 3)}}\\ \\text{undefined}`, color: bad }
      : { tex: `\\sqrt{\\sin^{-1}(u)}=${num(Math.sqrt(Math.max(s, 0)), 3)}`, color: good }
  const layer3 = !inArc || u < -1e-9
    ? null
    : isZero
      ? { tex: 'f(x)=\\tfrac{1}{0}\\ \\text{undefined}', color: bad }
      : { tex: `f(x)=${num(fx, 3)}`, color: good }

  let notice
  if (!inArc) {
    notice = (
      <Notice tone="warn">
        The first layer fails: <M>{`u=${num(u, 2)}`}</M> is outside <M>{'[-1,1]'}</M>, and <M>{'\\sin^{-1}'}</M> has no output
        there.{' '}
        {u > 1 ? (
          <>
            Option A (<M>{'x>-\\tfrac{d}{c}'}</M>) would keep this <M>x</M> — it forgets the <M>{'\\sin^{-1}'}</M> layer.
          </>
        ) : (
          <>Drag <M>x</M> right, into the orange curve&rsquo;s domain.</>
        )}
      </Notice>
    )
  } else if (u < -1e-9) {
    notice = (
      <Notice tone="warn">
        <M>{`u=${num(u, 2)}`}</M> is a legal input for <M>{'\\sin^{-1}'}</M>, so option C keeps this <M>x</M>. But{' '}
        <M>{`\\sin^{-1}(u)=${num(s, 2)}`}</M> is <b>negative</b>, and a negative number has no real square root. The whole
        left half of <M>{'\\sin^{-1}'}</M>&rsquo;s domain, where the orange curve is below the axis, is lost. Drag <M>x</M> right,
        onto the dashed line.
      </Notice>
    )
  } else if (isZero) {
    notice = (
      <Notice tone="warn">
        At <M>{'x=-\\tfrac{d}{c}'}</M> the square root is fine — <M>{'\\sqrt0=0'}</M> — but then <M>f</M> divides by it. The sky
        curve shoots up the dashed asymptote here, which is why this end of the domain is <b>open</b> (<M>{'<'}</M>).
      </Notice>
    )
  } else if (Math.abs(u - 1) < 1e-9) {
    notice = (
      <Notice tone="good">
        At <M>{'x=\\tfrac{1-d}{c}'}</M>, <M>{'u=1'}</M> and <M>{'\\sin^{-1}(1)=\\tfrac{\\pi}{2}'}</M>, so{' '}
        <M>{'f=\\tfrac{1}{\\sqrt{\\pi/2}}\\approx0.80'}</M> — perfectly defined. This end is <b>closed</b> (<M>{'\\le'}</M>). One
        step further right and <M>{'\\sin^{-1}'}</M> fails.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Every layer works, so this <M>x</M> is in the domain. Now change <M>c</M> and <M>d</M>: the interval slides and
        stretches, but it always runs from where <M>{'\\sin^{-1}'}</M> is <M>0</M> (open) to where it is{' '}
        <M>{'\\tfrac{\\pi}{2}'}</M> (closed) — option B.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={0.5} yStep={1} height={330} xLabels={v => (Number.isInteger(v) ? tick(v) : '')} yLabels={v => (v > Y0 && v < Y1 ? tick(v) : '')}>
        {/* vertical asymptote of f */}
        {zero > X0 && zero < X1 && (
          <>
            <Line.Segment point1={[zero, Y0]} point2={[zero, Y1]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[zero, Y0 + 0.15]} attach="e" color={C.guide} size={12}>x = −d/c</Label>
          </>
        )}
        {gTo > gFrom && <Plot.OfX y={t => Math.asin(clamp(c * t + d, -1, 1))} domain={[gFrom, gTo]} color={C.g} weight={2.5} />}
        {top > X0 && <Plot.OfX y={t => 1 / Math.sqrt(Math.asin(clamp(c * t + d, -1, 1)))} domain={[Math.max(fStart, X0), Math.min(top, X1)]} color={C.f} weight={3} />}
        {top < X1 && top > X0 && (
          <Label at={[top, Math.PI / 2]} attach={top > 1.2 ? 'n' : 'e'} color={C.g} size={12}>y = sin⁻¹(cx + d)</Label>
        )}
        {top > X0 && top < X1 && (
          <Label at={[top, 1 / Math.sqrt(HALF_PI)]} attach={top > X1 - 1.3 ? 'sw' : 'e'} color={C.f} size={12}>y = f(x)</Label>
        )}

        {/* the domain, or option C's version of it */}
        {optC && bot < zero && (
          <>
            <Line.Segment point1={[Math.max(bot, X0), 0]} point2={[Math.min(zero, X1), 0]} color={bad} weight={6} />
            {bot > X0 && <Point x={bot} y={0} color={bad} />}
            <Label at={[(Math.max(bot, X0) + Math.min(zero, X1)) / 2, 0]} attach="n" color={bad} size={12}>only in C</Label>
          </>
        )}
        <Line.Segment point1={[Math.max(zero, X0), 0]} point2={[Math.min(top, X1), 0]} color={good} weight={6} />
        {zero > X0 && zero < X1 && <OpenPoint x={zero} y={0} color={good} />}
        {top > X0 && top < X1 && <Point x={top} y={0} color={good} />}

        {/* the test point */}
        <Line.Segment point1={[x, Y0]} point2={[x, Y1]} color={C.guide} style="dashed" weight={1} />
        {inArc && <Point x={x} y={s} color={u < -1e-9 ? bad : C.g} />}
        {ok && fx < Y1 && <Point x={x} y={fx} color={C.f} />}
        <MovablePoint point={[x, 0]} onMove={pt => onX(pt[0])} constrain={pt => [clamp(pt[0], X0 + 0.1, X1 - 0.1), 0]} color={ok ? good : bad} />
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={onX} min={X0 + 0.1} max={X1 - 0.1} step={0.05} />
        <Slider label="c" value={c} onChange={v => setCD(v, d)} min={0.75} max={3} step={0.25} />
        <Slider label="d" value={d} onChange={v => setCD(c, v)} min={-1} max={1} step={0.25} />
        <Toggle label="Option C: use only the domain of sin⁻¹" checked={optC} onChange={setOptC} />
        <Readouts>
          <Readout color={inArc ? good : bad} tex={`u=cx+d=${num(u, 3)}`} />
          <Readout color={layer1.color} tex={layer1.tex} />
          {layer2 && <Readout color={layer2.color} tex={layer2.tex} />}
          {layer3 && <Readout color={layer3.color} tex={layer3.tex} />}
        </Readouts>
        <Readouts>
          <Readout color={good} tex={`\\text{domain: } ${num(zero, 2)}<x\\le ${num(top, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
