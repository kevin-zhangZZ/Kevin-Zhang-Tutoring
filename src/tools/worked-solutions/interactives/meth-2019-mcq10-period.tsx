// 2019 Methods Exam 2 MCQ 10 — why x + sin(x) is not periodic (option C, chosen by 33%). Shift
// the graph right by h: a function has period h only if the shifted copy lands exactly on the
// original. For sin(x) alone that happens at h = 2π. For f(x) = x + sin(x) the shifted copy at
// h = 2π has the same shape but sits exactly 2π lower, f(x − 2π) = f(x) − 2π, and the vertical
// gap h + sin(x) − sin(x − h) is never 0 for any h > 0, so f has no period at all.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Slider, Toggle, tick } from './kit'

const PI = Math.PI
const XM = 4.2 // where the vertical gap between the two curves is drawn

/** Axis numbers as multiples of π. */
const piLabel = (v: number) => {
  const k = Math.round(v / PI)
  if (Math.abs(v - k * PI) > 1e-6 || k === 0) return ''
  if (k === 1) return 'π'
  if (k === -1) return '−π'
  return `${k < 0 ? '−' : ''}${Math.abs(k)}π`
}

export default function Period() {
  const [h, setH] = useState(2 * PI)
  const [sinOnly, setSinOnly] = useState(false)

  const g = sinOnly ? (x: number) => Math.sin(x) : (x: number) => x + Math.sin(x)
  const shifted = (x: number) => g(x - h)
  const atPeriod = Math.abs(h - 2 * PI) < 1e-6
  // gap g(x) − g(x − h) = [h] + 2cos(x − h/2)sin(h/2); its range over all x:
  const base = sinOnly ? 0 : h
  const wob = 2 * Math.abs(Math.sin(h / 2))
  const lo = base - wob
  const hi = base + wob
  const gapHere = g(XM) - shifted(XM)

  const name = sinOnly ? '\\sin' : 'f'
  // the lowest point of sin(x − h) in the right half of the plane, for its label
  const troughX = ((h + 1.5 * PI) % (2 * PI)) + 2 * PI

  let notice
  if (atPeriod && !sinOnly) {
    notice = (
      <Notice tone="warn">
        Shifted right by <M>2\pi</M>, the orange copy has exactly the same shape as <M>f</M> but sits{' '}
        <b><M>2\pi</M> lower</b> everywhere: <M>{'f(x - 2\\pi) = f(x) - 2\\pi'}</M>. A period needs the shifted graph to
        land <em>on</em> the original, so <M>2\pi</M> is not a period. Turn on &ldquo;<M>\sin(x)</M> alone&rdquo; to see
        what a real period looks like.
      </Notice>
    )
  } else if (atPeriod) {
    notice = (
      <Notice tone="good">
        <M>\sin(x)</M> shifted right by <M>2\pi</M> lands exactly on itself: that is what &ldquo;period{' '}
        <M>2\pi</M>&rdquo; means. Adding <M>x</M> spoils it, because over one cycle the line <M>y = x</M> also rises by{' '}
        <M>2\pi</M>. Turn the toggle off to see the same shift applied to <M>x + \sin(x)</M>.
      </Notice>
    )
  } else if (!sinOnly) {
    notice = (
      <Notice>
        The gap between the curves is <M>{'f(x) - f(x - h) = h + \\sin(x) - \\sin(x - h)'}</M>, which is at least{' '}
        <M>{'h - 2\\left|\\sin\\tfrac{h}{2}\\right|'}</M>, and that is positive for every <M>{'h > 0'}</M>. So no shift
        ever makes the copy land on <M>f</M>: <M>f</M> has no period at all. Slide back to <M>h = 2\pi</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        For <M>\sin(x)</M> the gap wobbles around <M>0</M> and shrinks to nothing as <M>h</M> reaches <M>2\pi</M>. Slide{' '}
        <M>h</M> to <M>2\pi</M> and watch the copy land exactly on the original.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 4 * PI]} y={sinOnly ? [-2.5, 2.5] : [-8, 14]} xStep={PI} yStep={sinOnly ? 1 : 2} height={320} xLabels={piLabel} yLabels={v => (sinOnly ? Math.abs(v) > 2.5 : v > 14 || v < -8) ? "" : tick(v)}>
        {!sinOnly && <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.2} />}
        <Plot.OfX y={shifted} domain={[0, 4 * PI]} color={C.g} weight={3} style="dashed" />
        <Plot.OfX y={g} domain={[0, 4 * PI]} color={C.f} weight={3} />
        {Math.abs(gapHere) > 0.05 && (
          <>
            <Line.Segment point1={[XM, shifted(XM)]} point2={[XM, g(XM)]} color={C.violet} weight={2.5} />
            <Label at={[XM, (g(XM) + shifted(XM)) / 2 + (sinOnly ? 0 : 1.3)]} color={C.violet} attach="e">
              {atPeriod && !sinOnly ? 'gap 2π' : `gap ${gapHere.toFixed(2)}`}
            </Label>
          </>
        )}
        {sinOnly ? (
          <>
            <Label at={[2.5 * PI, 1]} color={C.f} attach="n">y = sin x</Label>
            <Label at={[troughX, -1]} color={C.g} attach="s">y = sin(x − h)</Label>
          </>
        ) : (
          <>
            <Label at={[10.5, g(10.5)]} color={C.f} attach="se">y = f(x)</Label>
            <Label at={[7.3, shifted(7.3)]} color={C.g} attach="se">y = f(x − h)</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider
          label="h"
          value={h}
          onChange={v => setH(Math.abs(v - 2 * PI) < 0.06 ? 2 * PI : v)}
          min={0}
          max={2.5 * PI}
          step={0.01}
          format={v => `${(v / PI).toFixed(2)}π`}
        />
        <Toggle label="sin(x) alone (what option C is thinking of)" checked={sinOnly} onChange={setSinOnly} />
        <Readouts>
          <Readout
            color={C.violet}
            tex={
              atPeriod
                ? `${name}(x) - ${name}(x - 2\\pi) = ${sinOnly ? '0' : '2\\pi'} \\text{ for every } x`
                : `${name}(x) - ${name}(x - h) \\in \\left[${lo.toFixed(2)},\\ ${hi.toFixed(2)}\\right]`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
