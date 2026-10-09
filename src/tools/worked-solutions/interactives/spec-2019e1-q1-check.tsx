// 2019 Specialist Exam 1 Q1 — how to catch a wrong answer to a DE without redoing it: a solution
// must (1) pass through (0, π) and (2) at every x have exactly the slope the DE demands at that
// point. Pick a candidate — our answer, or one of the two wrong answers from the examiner's report's
// common errors (∫2y dy = ∫e^{2x}/(1+e^{2x}) dx, and the index-law slip y = e^{2x}+1+π/2) — and slide
// x: the candidate's own tangent (orange) is compared with the direction 2ye^{2x}/(1+e^{2x}) demands
// there (dashed; green when they agree, red when not), over a faint slope field.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'
import { SlopeField, along, grid, pxPerUnit, slope, useWidth } from './spec-2019e1-q1-family'

const X: [number, number] = [-2, 1]
const Y: [number, number] = [0, 9]
const H = 320
const XS = grid(-1.875, 0.875, 11)
const YS = grid(0.5, 8.5, 8)
const E = (x: number) => Math.exp(2 * x)
const LX = -1.3 // label the curves on their flat left-hand part, clear of the y-axis numbers (the flat
// ∫2y dy curve takes its label below, clear of the (0, π) label on a phone)

type Key = 'ours' | 'sep' | 'index'
const CANDIDATES: Record<Key, { button: string; label: string; y: (x: number) => number; dy: (x: number) => number }> = {
  ours: {
    button: 'Our answer',
    label: 'y = (π/2)(1 + e²ˣ)',
    y: x => (Math.PI / 2) * (1 + E(x)),
    dy: x => Math.PI * E(x),
  },
  sep: {
    // From ∫2y dy = ∫ e^{2x}/(1+e^{2x}) dx: y² = ½ log_e(1+e^{2x}) + π² − ½ log_e 2.
    button: '∫2y dy slip',
    label: 'y² = ½ logₑ(1 + e²ˣ) + c',
    y: x => Math.sqrt(0.5 * Math.log(1 + E(x)) + Math.PI ** 2 - 0.5 * Math.LN2),
    dy: x => E(x) / (2 * Math.sqrt(0.5 * Math.log(1 + E(x)) + Math.PI ** 2 - 0.5 * Math.LN2) * (1 + E(x))),
  },
  index: {
    button: 'Index-law slip',
    label: 'y = e²ˣ + 1 + π/2',
    y: x => E(x) + 1 + Math.PI / 2,
    dy: x => 2 * E(x),
  },
}

export default function Check() {
  const [ref, width] = useWidth()
  const [key, setKey] = useState<Key>('ours')
  const [x0, setX0] = useState(0.3)
  const { sx, sy } = pxPerUnit(X, Y, width, H)
  const c = CANDIDATES[key]

  const y0 = c.y(x0)
  const own = c.dy(x0)
  const demand = slope(x0, y0)
  const agree = Math.abs(own - demand) < 1e-6
  const startOk = Math.abs(c.y(0) - Math.PI) < 1e-9
  const [ox, oy] = along(own, 55, sx, sy)
  const [dx, dy] = along(demand, 55, sx, sy)
  const dirColor = agree ? C.good : C.bad

  let notice
  if (key === 'ours') {
    notice = (
      <Notice tone="good">
        The curve passes through <M>(0, \pi)</M>, and wherever you slide <M>x</M> its tangent (orange) lies exactly along
        the direction the DE demands (dashed green). Those two checks are what &ldquo;solves the DE with{' '}
        <M>y(0) = \pi</M>&rdquo; means. Now test the two wrong answers from the report&apos;s common errors.
      </Notice>
    )
  } else if (key === 'sep') {
    notice = (
      <Notice tone="warn">
        This comes from <M>{'\\int 2y\\,dy = \\int\\frac{e^{2x}}{1+e^{2x}}\\,dx'}</M>. It <b>does</b> pass through{' '}
        <M>(0, \pi)</M>, so checking <M>y(0)</M> alone won&apos;t catch it, but it is almost flat where the DE demands a
        steep climb (at <M>x = 0</M>: <M>{'\\tfrac{1}{4\\pi} \\approx 0.08'}</M> against <M>\pi</M>). Differentiating{' '}
        <M>{'y^2 = \\tfrac12\\log_e(1+e^{2x}) + c'}</M> gives <M>{'2y\\tfrac{dy}{dx} = \\tfrac{e^{2x}}{1+e^{2x}}'}</M>, so
        its <M>y</M> divides where the DE&apos;s <M>y</M> multiplies.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The report&apos;s index-law slip fails the quick check first: <M>{'y(0) = 2 + \\tfrac{\\pi}{2} \\approx 3.57'}</M>,
        not <M>\pi</M> (the purple point). Its slope <M>{'2e^{2x}'}</M> never matches the DE either: slide <M>x</M> and the
        dashed direction is always steeper, because adding <M>{'\\tfrac{\\pi}{2}'}</M> raised the height without raising
        the slope.
      </Notice>
    )
  }

  return (
    <div ref={ref}>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {(Object.keys(CANDIDATES) as Key[]).map(k => (
          <button
            key={k}
            type="button"
            onClick={() => setKey(k)}
            className={
              'px-3 py-1 rounded-full text-[12.5px] border transition-colors ' +
              (k === key
                ? 'bg-sky-700 border-sky-700 text-white dark:bg-sky-500 dark:border-sky-500 dark:text-gray-950'
                : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800')
            }
          >
            {CANDIDATES[k].button}
          </button>
        ))}
      </div>
      <Plane x={X} y={Y} xStep={0.5} yStep={1} height={H} xLabels={v => (Number.isInteger(v) ? String(v) : '')}>
        <SlopeField xs={XS} ys={YS} sx={sx} sy={sy} L={Math.min(9, 0.35 * Math.min(sx * 0.25, sy))} opacity={0.45} />
        <Plot.OfX y={c.y} domain={X} color={C.f} weight={3} />
        <Label at={[LX, c.y(LX)]} attach={key === 'sep' ? 's' : 'n'} color={C.f} gap={9}>
          {c.label}
        </Label>
        <Line.Segment point1={[x0 - ox, y0 - oy]} point2={[x0 + ox, y0 + oy]} color={C.g} weight={4} />
        <Line.Segment point1={[x0 - dx, y0 - dy]} point2={[x0 + dx, y0 + dy]} color={dirColor} weight={3} style="dashed" />
        <Point x={x0} y={y0} color={C.f} />
        <Point x={0} y={Math.PI} color={C.violet} />
        <Label at={[0, Math.PI]} attach="nw" color={C.violet} gap={9}>(0, π)</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-1.8} max={0.75} step={0.01} />
        <Readouts>
          <Readout color={C.g} tex={`\\text{curve's slope} \\approx ${num(own)}`} />
          <Readout color={dirColor} tex={`\\text{DE demands } \\tfrac{2ye^{2x}}{1+e^{2x}} \\approx ${num(demand)}${agree ? '\\ \\checkmark' : ''}`} />
          <Readout
            color={startOk ? C.good : C.bad}
            tex={startOk ? `y(0) = \\pi\\ \\checkmark` : `y(0) \\approx ${num(c.y(0))} \\ne \\pi`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
