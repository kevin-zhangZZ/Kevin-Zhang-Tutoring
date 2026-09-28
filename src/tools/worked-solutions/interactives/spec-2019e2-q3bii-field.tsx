// 2019 Specialist Exam 2 Q3b.ii — what the constant c in e^Q = e^t + c means. The direction field of
// dQ/dt = e^{t−Q} with a draggable start (0, Q(0)) on the Q-axis: the solution through it is
// Q = log_e(e^t + c) with c = e^{Q(0)} − 1, so every value of c is a different curve following the
// marks, and Q = 1 at t = 0 picks c = e − 1. A toggle shows the log slip Q = t + (constant) — a line of
// slope 1 through the same start — cutting across the marks (it only works when Q(0) = 0, c = 0).

import { useEffect, useRef, useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Readout, Readouts, Toggle, clamp,
  num,
} from './kit'

const T: [number, number] = [0, 4]
const Y: [number, number] = [-1, 4.5]
const H = 320
const slope = (t: number, q: number) => Math.exp(t - q)
const fmt = (v: number) => String(Number(v.toFixed(2)))
const grid = (a: number, b: number, n: number) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n)

/** Width of the wrapper, so each mark can be a fixed number of pixels long on a stretched plane. */
function useWidth() {
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

export default function Field() {
  const [q0, setQ0] = useState(1)
  const [slip, setSlip] = useState(false)
  const [ref, width] = useWidth()

  // Pixels per unit (the kit Plane pads x by 7% and y by 8% of the range on each side).
  const sx = (width || 600) / (1.14 * (T[1] - T[0]))
  const sy = H / (1.16 * (Y[1] - Y[0]))
  const L = 7
  const marks = []
  for (const t of grid(0.25, 3.75, 7)) {
    for (const q of grid(-0.5, 4, 9)) {
      const m = slope(t, q)
      const u = L / Math.hypot(sx, m * sy)
      marks.push(
        <Line.Segment key={`${t},${q}`} point1={[t - u, q - u * m]} point2={[t + u, q + u * m]} color={C.guide} weight={1.6} opacity={0.8} />,
      )
    }
  }

  const c = Math.exp(q0) - 1
  const Q = (t: number) => Math.log(Math.exp(t) + c)
  const atAnswer = Math.abs(q0 - 1) < 0.02
  const atZero = Math.abs(q0) < 0.02
  const cTex = atAnswer ? 'e - 1 \\approx 1.718' : num(c, 3)
  const inside = atAnswer ? 'e^t + e - 1' : Math.abs(c) < 0.0005 ? 'e^t' : c > 0 ? `e^t + ${num(c, 3)}` : `e^t - ${num(-c, 3)}`

  let notice
  if (slip) {
    notice = atZero ? (
      <Notice>
        At <M>Q(0) = 0</M>, <M>c = 0</M> and the solution really is <M>{'Q = \\log_e(e^t) = t'}</M>, so the line lies
        on the curve. This is the <b>only</b> start where the shortcut gives a solution. Drag the start anywhere else.
      </Notice>
    ) : (
      <Notice tone="warn">
        The red line <M>{`Q = t ${q0 < 0 ? '-' : '+'} ${fmt(Math.abs(q0))}`}</M> starts at the right point but cuts across the marks: its slope is{' '}
        <M>1</M> everywhere, while the equation demands <M>{`e^{t-Q} = e^{${fmt(-q0)}} \\approx ${num(slope(0, q0), 2)}`}</M>{' '}
        at the start. Logs don&apos;t split over a sum: <M>{'\\log_e(e^t + c) \\ne t + \\log_e c'}</M>.
      </Notice>
    )
  } else if (atAnswer) {
    notice = (
      <Notice tone="good">
        This is the question&apos;s curve. <M>Q = 1</M> at <M>t = 0</M> gives <M>e^1 = e^0 + c</M>, so{' '}
        <M>c = e - 1</M>. It starts with slope <M>{'e^{0-1} \\approx 0.37'}</M> and steepens towards slope 1,
        matching every mark it passes. Drag the start up or down to see other values of <M>c</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Moving the start changes <M>{'c = e^{Q(0)} - 1'}</M>, and every <M>c</M> gives a different curve. All of them
        follow the marks, because each one satisfies <M>{'\\tfrac{dQ}{dt} = e^{t-Q}'}</M>. One constant is all it
        takes to reach every curve, so one initial condition pins it down. Press <b>Q(0) = 1</b> to return.
      </Notice>
    )
  }

  return (
    <div ref={ref}>
      <Plane x={T} y={Y} xStep={1} yStep={1} height={H} xLabel="t" yLabel="Q">
        {marks}
        <Plot.OfX y={Q} domain={T} color={atAnswer ? C.good : C.f} weight={3} />
        {slip && <Plot.OfX y={t => t + q0} domain={[0, Math.min(4, 4.5 - q0)]} color={C.bad} style="dashed" weight={2.5} />}
        <MovablePoint
          point={[0, q0]}
          onMove={([, y]) => setQ0(Math.round(clamp(y, -0.8, 4) * 100) / 100)}
          constrain={([, y]) => [0, clamp(y, -0.8, 4)]}
          color={atAnswer ? C.good : C.f}
        />
        <Label at={[1.1, Q(1.1)]} attach="se" gap={10} color={atAnswer ? C.good : C.f}>{atAnswer ? 'c = e − 1' : `c = ${num(c, 2)}`}</Label>
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="Q(0) = 1" onClick={() => setQ0(1)} />
          <Toggle label="Take logs term by term" checked={slip} onChange={setSlip} />
        </Buttons>
        <Readouts>
          <Readout tex={`Q(0) = ${num(q0)}`} />
          <Readout color={atAnswer ? C.good : C.f} tex={`c = e^{Q(0)} - 1 = ${cTex}`} />
          <Readout color={atAnswer ? C.good : C.f} tex={`Q = \\log_e\\left(${inside}\\right)`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
