// 2020 Methods Exam 2 Q4e.i — which rule is the segment from O(0, 0) to Q(n, f(n))? Drag Q along
// f(x) = 2x·e^(1−x²) (1 < n < 3) and plot, one at a time, the correct answer y = 2e^(1−n²)·x and the
// four common incorrect answers the examination report lists: y = 2e^(1−n²) (the gradient alone),
// y = 2ne^(1−n²) (that is f(n), Q's height), y = 2xe^(1−x²) (f itself) and y = 2e^(1−x²) (the
// gradient with x in place of n). Three live checks — through O? through Q? a straight line? —
// show that only the correct rule passes all three, for every position of Q.

import { useState, type ReactNode } from 'react'
import {
  Buttons, C, Controls, Katex, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Slider, Toggle, clamp, num, type vec,
} from './kit'

const f = (x: number) => 2 * x * Math.exp(1 - x * x)
const XR = 3.1

type Key = 'right' | 'gradient' | 'height' | 'curve' | 'bell'

interface Candidate {
  tex: string
  /** The candidate's y at x, for the current n. */
  y: (x: number, n: number) => number
  straight: boolean
}

const CANDIDATES: Record<Key, Candidate> = {
  right: { tex: 'y = 2e^{1-n^2}x', y: (x, n) => 2 * Math.exp(1 - n * n) * x, straight: true },
  gradient: { tex: 'y = 2e^{1-n^2}', y: (_x, n) => 2 * Math.exp(1 - n * n), straight: true },
  height: { tex: 'y = 2ne^{1-n^2}', y: (_x, n) => f(n), straight: true },
  curve: { tex: 'y = 2xe^{1-x^2}', y: x => f(x), straight: false },
  bell: { tex: 'y = 2e^{1-x^2}', y: x => 2 * Math.exp(1 - x * x), straight: false },
}
const ORDER: Key[] = ['right', 'gradient', 'height', 'curve', 'bell']

// Snap a drag to the nearest point of f with 1 < x < 3.
const SAMPLES = Array.from({ length: 801 }, (_, i) => 1.02 + (1.94 * i) / 800)
function nearestOnF([mx, my]: vec.Vector2): number {
  let best = 1.5
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = (x - mx) ** 2 + (f(x) - my) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

function Check({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[12.5px] font-semibold px-2.5 py-1 rounded-full border ${
        ok
          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
          : 'border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200'
      }`}
    >
      {ok ? '✓' : '✗'} {children}
    </span>
  )
}

export default function SegmentWidget() {
  const [n, setN] = useState(1.5)
  const [pick, setPick] = useState<Key>('right')
  const cand = CANDIDATES[pick]
  const fn = f(n)
  const grad = 2 * Math.exp(1 - n * n)
  const throughO = Math.abs(cand.y(0, n)) < 1e-9
  const throughQ = Math.abs(cand.y(n, n) - fn) < 1e-9
  const ok = pick === 'right'
  const candY = (x: number) => cand.y(x, n)

  let notice
  if (pick === 'right') {
    notice = (
      <Notice tone="good">
        <b>All three checks pass, wherever Q is</b> (drag it). The gradient is rise over run from <M>O</M> to{' '}
        <M>Q</M>: <M>{'\\tfrac{f(n)}{n} = \\tfrac{2ne^{1-n^2}}{n} = 2e^{1-n^2}'}</M>, here{' '}
        <M>{`\\approx ${num(grad, 3)}`}</M>. The line goes through the origin, so there is no constant term:{' '}
        <M>{'y = 2e^{1-n^2}x'}</M>. (<M>{'y = \\tfrac{f(n)}{n}x'}</M> is the same line, but the question wants it in
        terms of <M>n</M>.) Now try the other four rules: each is a common incorrect answer from the report.
      </Notice>
    )
  } else if (pick === 'gradient') {
    notice = (
      <Notice tone="warn">
        <b>That&apos;s only the gradient.</b> With no <M>x</M> in it, the rule gives the same <M>y</M> (
        <M>{`\\approx ${num(grad, 3)}`}</M>) at every point: a horizontal line that misses both <M>O</M> and <M>Q</M>. A
        line through the origin is <M>y = mx</M>, and <M>{'2e^{1-n^2}'}</M> is just the <M>m</M>.
      </Notice>
    )
  } else if (pick === 'height') {
    notice = (
      <Notice tone="warn">
        <M>{'2ne^{1-n^2}'}</M> is <M>f(n)</M>, the <i>height</i> of <M>Q</M>. As a rule it is the horizontal line
        through <M>Q</M>: it hits <M>Q</M> but misses the origin. The gradient needs the height divided by the run,{' '}
        <M>n</M>.
      </Notice>
    )
  } else if (pick === 'curve') {
    notice = (
      <Notice tone="warn">
        This is the rule for <M>f</M> itself, so it runs from <M>O</M> to <M>Q</M> along the <i>curve</i>, not the
        straight segment. The two letters do different jobs: <M>n</M> fixes where <M>Q</M> is, so it belongs in the
        gradient; <M>x</M> is the variable that moves along the segment, and in a line it appears only to the first
        power.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        This is the gradient with <M>x</M> written in place of <M>n</M>, which turns a number into a curve. It starts at{' '}
        <M>{'2e \\approx 5.44'}</M> on the <M>y</M>-axis (off the top here), so it misses the origin and isn&apos;t
        straight. For a given <M>Q</M>, the gradient is one fixed number: it contains <M>n</M>, not <M>x</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, XR]} y={[0, 3]} xStep={1} yStep={1} height={300}>
        {/* The segment in the question's diagram, for reference. */}
        <Line.Segment point1={[0, 0]} point2={[n, fn]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[0, 3]} color={C.f} weight={3} />
        <Label at={[0.45, f(0.45)]} color={C.f} attach="nw">f</Label>
        {ok ? (
          <Line.Segment point1={[0, 0]} point2={[n, fn]} color={C.good} weight={3.5} />
        ) : cand.straight ? (
          <Line.Segment point1={[0, candY(0)]} point2={[XR, candY(XR)]} color={C.bad} weight={3} />
        ) : (
          <Plot.OfX y={candY} domain={[0, XR]} color={C.bad} weight={3} style="dashed" />
        )}
        <Point x={0} y={0} color={throughO ? C.good : C.bad} />
        <Label at={[0, 0]} color={C.ink} attach="ne" gap={9}>O</Label>
        <Label at={[n, fn]} color={throughQ ? C.good : C.bad} attach="ne" gap={12}>Q</Label>
        <MovablePoint point={[n, fn]} onMove={p => setN(clamp(nearestOnF(p), 1.02, 2.96))} color={throughQ ? C.good : C.bad} />
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={setN} min={1.02} max={2.96} step={0.01} />
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Choose a rule to plot, then drag Q along the curve.</p>
        <Buttons>
          {ORDER.map(k => (
            <Toggle key={k} label={<Katex tex={CANDIDATES[k].tex} />} checked={pick === k} onChange={() => setPick(k)} />
          ))}
        </Buttons>
        <div className="flex flex-wrap gap-2">
          <Check ok={throughO}>through O</Check>
          <Check ok={throughQ}>through Q</Check>
          <Check ok={cand.straight}>a straight line</Check>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
