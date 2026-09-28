// 2019 Specialist Exam 1 Q1 — why the constant of integration ends up MULTIPLYING. The slope field
// of dy/dx = 2ye^{2x}/(1+e^{2x}) with a draggable starting point (0, y(0)) on the y-axis: the
// solution through it is y = A(1+e^{2x}) with A = y(0)/2 — always the same curve 1+e^{2x}, stretched
// vertically. Because dy/dx is proportional to y, doubling every height doubles every slope, so a
// stretched solution is still a solution. A toggle shows the wrong idea that the constant ADDS
// (1+e^{2x} slid up through the same start point): its slope stays 2e^{2x} and it cuts across the
// marks. Also exports the slope-field helpers used by spec-2019e1-q1-check.tsx.

import { useEffect, useRef, useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Readout, Readouts, Toggle, clamp, num } from './kit'

/** The differential equation's right-hand side: the gradient every solution must have at (x, y). */
export const slope = (x: number, y: number) => (2 * y * Math.exp(2 * x)) / (1 + Math.exp(2 * x))

/** Track a wrapper's width, so marks can be drawn a fixed number of pixels long on a stretched plane. */
export function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(entries => setWidth(entries[0]?.contentRect.width ?? 0))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

/** Pixels per unit of a kit Plane (it pads x by 7% and y by 8% of the range on each side). */
export function pxPerUnit(x: [number, number], y: [number, number], width: number, height: number) {
  return { sx: (width || 600) / (1.14 * (x[1] - x[0])), sy: height / (1.16 * (y[1] - y[0])) }
}

/** Offset [dx, dy] (in units) that is L pixels long on screen in the direction of gradient m. */
export function along(m: number, L: number, sx: number, sy: number): [number, number] {
  const t = L / Math.hypot(sx, m * sy)
  return [t, t * m]
}

/** Short marks of gradient slope(x, y) on a grid of points, each 2L px long. */
export function SlopeField({
  xs,
  ys,
  sx,
  sy,
  L,
  opacity = 0.75,
}: {
  xs: number[]
  ys: number[]
  sx: number
  sy: number
  L: number
  opacity?: number
}) {
  const marks = []
  for (const px of xs) {
    for (const py of ys) {
      const [dx, dy] = along(slope(px, py), L, sx, sy)
      marks.push(
        <Line.Segment
          key={`${px},${py}`}
          point1={[px - dx, py - dy]}
          point2={[px + dx, py + dy]}
          color={C.guide}
          weight={1.6}
          opacity={opacity}
        />,
      )
    }
  }
  return <>{marks}</>
}

/** Evenly spaced values from a to b (inclusive) in n steps. */
export const grid = (a: number, b: number, n: number) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n)

const X: [number, number] = [-2, 1]
const Y: [number, number] = [-3, 9]
const H = 340
const XS = grid(-1.875, 0.875, 11) // between the grid lines, so no mark sits on an axis
const YS = grid(-2.5, 8.5, 11)
const base = (x: number) => 1 + Math.exp(2 * x)

export default function Family() {
  const [ref, width] = useWidth()
  const [y0, setY0] = useState(Math.PI)
  const [shift, setShift] = useState(false)
  const { sx, sy } = pxPerUnit(X, Y, width, H)

  const atPi = Math.abs(y0 - Math.PI) < 1e-9
  const atZero = Math.abs(y0) < 1e-9
  const A = y0 / 2
  const aTex = atPi ? '\\tfrac{\\pi}{2}' : num(A)
  const aText = atPi ? '(π/2)' : atZero ? '0' : num(A)
  const sol = (x: number) => A * base(x)
  const shifted = (x: number) => base(x) + (y0 - 2)

  // Labels sit on the flat left-hand part of the curves, clear of the y-axis numbers; with the
  // shifted curve showing, whichever curve is higher there takes its label above, the other below.
  const LX = -1.2
  const redAbove = shifted(LX) > sol(LX)
  const solAttach = shift ? (redAbove ? 's' : 'n') : A < 0 ? 's' : 'n'

  const onMove = ([, y]: [number, number]) => {
    let v = clamp(y, -2.8, 8.6)
    if (Math.abs(v - Math.PI) < 0.14) v = Math.PI
    else if (Math.abs(v) < 0.14) v = 0
    setY0(v)
  }

  let notice
  if (shift && Math.abs(y0 - 2) < 0.15) {
    notice = (
      <Notice>
        At <M>y(0) = 2</M> the shift is zero (<M>A = 1</M>), so the two curves coincide. Drag the point away from{' '}
        <M>2</M> and watch them split: the stretched curve keeps following the marks, the shifted one does not.
      </Notice>
    )
  } else if (shift) {
    notice = (
      <Notice tone="warn">
        <b>Adding a constant slides <M>{'1+e^{2x}'}</M> straight up.</b> Every height changes but every slope stays{' '}
        <M>{'2e^{2x}'}</M>. The DE needs the slope to grow with the height, so the red curve cuts across the marks: at the
        start it climbs at <M>2</M> where the marks demand <M>{atPi ? '\\pi' : num(y0)}</M>. That is why the answer can&apos;t be
        of the form <M>{'y = 1 + e^{2x} + c'}</M>.
      </Notice>
    )
  } else if (atPi) {
    notice = (
      <Notice tone="good">
        Through <M>(0, \pi)</M> the constant is <M>{'A = \\tfrac{\\pi}{2}'}</M>: this is the answer{' '}
        <M>{'y = \\tfrac{\\pi}{2}\\left(1+e^{2x}\\right)'}</M>, running along the marks everywhere. Drag the point up
        and down the <M>y</M>-axis: every start gives the same shape, stretched vertically. That is the{' '}
        <M>+c</M> inside the log becoming <M>\times A</M> outside.
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice>
        <M>y = 0</M> is a solution too (<M>A = 0</M>): the marks flatten out as they approach the <M>x</M>-axis. It is
        the one solution set aside when we divided by <M>y</M>, which is fine here because our curve starts at{' '}
        <M>\pi</M>, not <M>0</M>.
      </Notice>
    )
  } else if (y0 < 0) {
    notice = (
      <Notice>
        Below the axis <M>A</M> is negative: that is the <M>\pm</M> in <M>{'A = \\pm e^{c}'}</M>. The curve is a mirror
        image of a positive solution, and no solution crosses <M>y = 0</M>, so the sign of <M>y(0)</M> fixes the sign of{' '}
        <M>y</M> for every <M>x</M>. Drag back up to <M>\pi</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Starting at <M>{`(0, ${num(y0)})`}</M> gives <M>{`A = \\tfrac{y(0)}{2} \\approx ${num(A)}`}</M>, and the curve
        still follows the marks. The DE says <M>{'\\tfrac{dy}{dx}'}</M> is proportional to <M>y</M>, so multiplying every
        height by the same number multiplies every slope by it too. Now turn on &ldquo;What if the constant
        added?&rdquo;
      </Notice>
    )
  }

  return (
    <div ref={ref}>
      <Plane
        x={X}
        y={Y}
        xStep={0.5}
        yStep={1}
        height={H}
        xLabels={v => (Number.isInteger(v) ? String(v) : '')}
        yLabels={v => (v > 9 || v < -3 ? '' : String(v))}
      >
        <SlopeField xs={XS} ys={YS} sx={sx} sy={sy} L={Math.min(10, 0.38 * Math.min(sx * 0.25, sy))} />
        {!shift && <Plot.OfX y={base} domain={X} color={C.guide} style="dashed" weight={1.5} />}
        {shift && <Plot.OfX y={shifted} domain={X} color={C.bad} weight={2.5} />}
        <Plot.OfX y={sol} domain={X} color={C.f} weight={3} />
        {shift && (
          <Label at={[LX, shifted(LX)]} attach={redAbove ? 'n' : 's'} color={C.bad}>
            1 + e²ˣ + c
          </Label>
        )}
        <Label at={[LX, sol(LX)]} attach={solAttach} color={C.f}>
          {atZero ? 'y = 0' : `y = ${aText}(1 + e²ˣ)`}
        </Label>
        <MovablePoint point={[0, y0]} onMove={onMove} constrain={([, y]) => [0, clamp(y, -2.8, 8.6)]} color={C.f} />
        {atPi && <Label at={[0, y0]} attach="nw" gap={10}>(0, π)</Label>}
      </Plane>
      <Controls>
        <Toggle label="What if the constant added?" checked={shift} onChange={setShift} />
        <Readouts>
          <Readout tex={`y(0) ${atPi ? '= \\pi' : `\\approx ${num(y0)}`}`} />
          <Readout color={C.f} tex={`A = \\tfrac{y(0)}{2} ${atPi ? '= ' : '\\approx '}${aTex}`} />
          {shift ? (
            <>
              <Readout tex={`\\text{marks at the start: } \\tfrac{dy}{dx} = y(0) \\approx ${num(y0)}`} />
              <Readout color={C.bad} tex={`\\text{shifted curve: } \\tfrac{dy}{dx} = 2e^{0} = 2`} />
            </>
          ) : (
            <Readout color={C.guide} tex={`\\text{dashed: } y = 1 + e^{2x}\\ (A = 1)`} />
          )}
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the blue point up and down the y-axis.</p>
        {notice}
      </Controls>
    </div>
  )
}
