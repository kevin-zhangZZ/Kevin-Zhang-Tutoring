// 2023 Methods Exam 2 Q3h — f(x) = n^x − x^n (x ≥ 0) has a local minimum for every n in the
// slider's range, so f'(x) = 0 alone can't pick out n: the minimum must also lie ON the x-axis,
// f(x) = 0 at the same x. Slide n from 2 (where f is h from parts d.–g., minimum (3.21, −1.05))
// and watch the two x-intercepts — one is always x = n, since n^n − n^n = 0 — close in and merge
// at n = e, where the minimum is (e, 0).

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const E = Math.E

/** A root of fn in [lo, hi] by bisection (fn changes sign there). */
function bisect(fn: (x: number) => number, lo: number, hi: number): number {
  let a = lo
  let b = hi
  for (let i = 0; i < 60; i++) {
    const mid = (a + b) / 2
    if (fn(a) * fn(mid) <= 0) b = mid
    else a = mid
  }
  return (a + b) / 2
}

/** The local minimum of f(x) = n^x − x^n: where f' changes from negative to positive. */
function localMin(n: number): number {
  if (n === E) return E
  const d = (x: number) => n ** x * Math.log(n) - n * x ** (n - 1)
  const step = 0.01
  for (let x = 0.05; x < 6; x += step) {
    if (d(x) < 0 && d(x + step) >= 0) return bisect(d, x, x + step)
  }
  return NaN
}

/** The x-intercept other than x = n (none when n = e: the two have merged). */
function otherRoot(n: number, xm: number): number {
  if (n === E) return NaN
  const f = (x: number) => n ** x - x ** n
  // The two intercepts sit either side of the minimum; x = n is one of them.
  return n < xm ? bisect(f, xm, 8) : bisect(f, 0.5, xm)
}

export default function MinimumOnAxis() {
  const [n, setN] = useState(2)

  const f = (x: number) => n ** x - x ** n
  const onAxis = n === E
  const xm = localMin(n)
  const ym = onAxis ? 0 : f(xm)
  const r2 = otherRoot(n, xm)
  const minColor = onAxis ? C.good : C.bad
  // Near n = e the minimum is only a few hundred-thousandths below the axis: keep 2 significant figures.
  const yText = Math.abs(ym) >= 0.005 ? ym.toFixed(2) : ym.toPrecision(2)

  let notice
  if (onAxis) {
    notice = (
      <Notice tone="good">
        <b>At <M>n = e</M> the local minimum is <M>(e,\ 0)</M>.</b> Both conditions hold at the same point:{' '}
        <M>{"f'(e) = 0"}</M> and <M>{'f(e) = e^e - e^e = 0'}</M>. The two <span className="whitespace-nowrap"><M>x</M>-intercepts</span> have merged, so the
        graph just touches the axis there. This is the only <M>n</M> that works, and the answer is exact:{' '}
        <M>n = e</M>, not 2.718.
      </Notice>
    )
  } else if (Math.abs(n - E) < 0.1) {
    notice = (
      <Notice>
        Very close: the local minimum is only <M>{Math.abs(ym) >= 0.005 ? Math.abs(ym).toFixed(3) : Math.abs(ym).toPrecision(2)}</M> below the axis, between the{' '}
        <span className="whitespace-nowrap"><M>x</M>-intercepts</span> <M>{Math.min(n, r2).toFixed(3)}</M> and <M>{Math.max(n, r2).toFixed(3)}</M>. They merge
        when <M>{'n = e \\approx 2.718'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`n = ${n.toFixed(3)}`}</M>{n === 2 ? <> (this is <M>h</M> from parts d.–g.)</> : null} the local
        minimum is <M>{`(${xm.toFixed(2)},\\ ${ym.toFixed(2)})`}</M>. It is a stationary point, so{' '}
        <M>{"f'(x) = 0"}</M> there, but <M>{`f(x) = ${ym.toFixed(2)}`}</M>, not 0: it sits below the axis. Every{' '}
        <M>n</M> on this slider has such a point, so <M>{"f'(x) = 0"}</M> alone can&apos;t find <span className="whitespace-nowrap"><M>n</M>.</span> Drag <M>n</M> and watch
        the two <span className="whitespace-nowrap"><M>x</M>-intercepts</span> (one is always <M>x = n</M>) close in.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 4.5]} y={[-2, 3]} xStep={1} yStep={1} height={320}>
        <Plot.OfX y={f} domain={[0, 4.8]} color={C.f} weight={3} />
        <Label at={[0.25, f(0.25)]} color={C.f} attach="se">f</Label>
        <Point x={n} y={0} color={C.violet} />
        {!onAxis && <Point x={r2} y={0} color={C.violet} />}
        <Point x={xm} y={ym} color={minColor} />
        <Label at={[xm, ym]} color={minColor} attach={Math.abs(ym) < 0.3 ? 'sw' : 's'} gap={10}>
          {onAxis ? '(e, 0)' : `(${xm.toFixed(2)}, ${yText})`}
        </Label>
      </Plane>
      <Controls>
        <Slider
          label="n"
          value={n}
          onChange={v => setN(Math.abs(v - E) < 0.0025 ? E : v)}
          min={2}
          max={3.3}
          step={0.002}
          format={v => (v === E ? 'e' : v.toFixed(3))}
        />
        <Readouts>
          <Readout color={minColor} tex={`\\text{local min at } x = ${onAxis ? 'e' : xm.toFixed(3)}`} />
          <Readout tex={"f'(x) = 0 \\ \\checkmark"} />
          <Readout color={minColor} tex={`f(x) = ${onAxis ? '0 \\ \\checkmark' : yText}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
