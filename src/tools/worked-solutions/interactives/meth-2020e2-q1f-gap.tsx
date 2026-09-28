// 2020 Methods Exam 2 Q1f (23% full marks, 71% zero) — where is the vertical gap D between f and h
// at most 2? Three views of the same x, chosen with the buttons:
//  • "The ruler": D is the length of the vertical segment joining the curves at x (green when
//    D ≤ 2, red when not). Sweeping x paints the answer set along the bottom bar. It shows that D
//    stays ≤ 2 right across each shaded region (it only touches 2 at x = ±2, where f = 0 and h = 2),
//    runs past the crossings at ±√2 out to ±1.08, and is huge near the y-axis (6 at x = 0).
//  • "Graph of h − f": the working's method, −2 ≤ h(x) − f(x) ≤ 2. The violet graph of
//    h − f = 2 − ½(x² − 4)² never rises above 2 (it touches at x = ±2), so only the lower line bites.
//  • "Measure from y = 1": h is f reflected in y = 1 (part e.i), so D = 2|f − 1|, and D ≤ 2 exactly
//    when 0 ≤ f ≤ 2 — the band. f ≥ 0 always, so this is just f(x) ≤ 2, i.e. (x² − 4)² ≤ 8 (itute's
//    route). Boundaries ±√(4 ± 2√2) = ±1.08, ±2.61 in every view.
// The drag handle rides on the answer bar, so it never covers a short ruler.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider, Toggle,
  clamp, num, tick, usePlayer,
} from './kit'

const f = (x: number) => 0.25 * (x * x - 4) ** 2
const h = (x: number) => 2 - f(x)
const gap = (x: number) => h(x) - f(x)
const XMAX = 2.85
const XC = 2.87 // curves drawn to here (f ≈ 4.49 at the top of the view)
const R1 = Math.sqrt(4 - 2 * Math.SQRT2) // 1.0824
const R2 = Math.sqrt(4 + 2 * Math.SQRT2) // 2.6131
const S2 = Math.SQRT2
const S6 = Math.sqrt(6)
const BAR = -3.1 // height of the answer bar
const GOOD: [number, number][] = [
  [-R2, -R1],
  [R1, R2],
]
const EDGES = [-R2, -R1, R1, R2]
// Where h − f = −2.9, i.e. (x² − 4)² = 9.8: the violet graph is drawn only down to there.
const GC_IN = Math.sqrt(4 - Math.sqrt(9.8)) // 0.932
const GC_OUT = Math.sqrt(4 + Math.sqrt(9.8)) // 2.670

type View = 'ruler' | 'signed' | 'mirror'

/** The swept part [−XMAX, x] split into pieces where D ≤ 2 (ok) and where it isn't. */
function pieces(x: number): { from: number; to: number; ok: boolean }[] {
  const cuts = [-XMAX, ...EDGES.filter(e => e < x), x]
  const out: { from: number; to: number; ok: boolean }[] = []
  for (let i = 0; i + 1 < cuts.length; i++) {
    const mid = (cuts[i] + cuts[i + 1]) / 2
    out.push({ from: cuts[i], to: cuts[i + 1], ok: GOOD.some(([a, b]) => mid >= a && mid <= b) })
  }
  return out
}

export default function Gap() {
  const [x, setX] = useState(1.5)
  const [view, setView] = useState<View>('ruler')
  const player = usePlayer(setX, { min: -XMAX, max: XMAX, seconds: 9 })
  const set = (v: number) => {
    player.stop()
    const snap = [...EDGES, -2, 2, -S6, -S2, S2, S6].find(e => Math.abs(e - v) < 0.02)
    setX(snap ?? clamp(v, -XMAX, XMAX))
  }
  const y = f(x)
  const yh = h(x)
  const D = Math.abs(yh - y)
  const ok = D <= 2 + 1e-9
  const ax = Math.abs(x)
  const near = (v: number) => Math.abs(ax - v) < 1e-9
  const hOnTop = yh > y
  const ruleColor = ok ? C.good : C.bad

  let notice
  if (view === 'signed') {
    notice = (
      <Notice>
        The violet curve is <M>{'h(x) - f(x) = 2 - \\tfrac12\\left(x^2-4\\right)^2'}</M>. It is positive where <M>h</M> is on
        top and negative where <M>f</M> is, and <M>D</M> is its size either way. So <M>D \le 2</M> means the violet
        curve lies <b>between the red lines</b> <M>y = -2</M> and <M>y = 2</M>: that is the working&apos;s{' '}
        <M>{'-2 \\le h(x) - f(x) \\le 2'}</M>. It never goes above <M>2</M> (it just touches at <M>x = \pm2</M>), so the top
        line never cuts anything off; only <M>{'h - f \\ge -2'}</M> matters. It is inside the band on two intervals.{' '}
        {ok ? 'At the current x it is inside.' : 'At the current x it has dropped below −2.'}
      </Notice>
    )
  } else if (view === 'mirror') {
    notice = (
      <Notice>
        <M>h</M> is <M>f</M> reflected in <M>y = 1</M>, so the two curves are always the <b>same distance</b> from that
        line, on opposite sides: the ruler is two equal halves, and <M>D = 2|f(x) - 1|</M>. So <M>D \le 2</M> exactly when{' '}
        <M>f(x)</M> is within <M>1</M> of the line, that is <M>{'0 \\le f(x) \\le 2'}</M>: the green band. <M>f</M> is never
        negative, so all you need is <M>f(x) \le 2</M>, which gives <M>{'\\left(x^2-4\\right)^2 \\le 8'}</M>.{' '}
        {ok ? 'Here the blue point is inside the band.' : 'Here the blue point is above the band.'}
      </Notice>
    )
  } else if (near(S2) || near(S6)) {
    notice = (
      <Notice tone="good">
        The curves cross here, so <M>D = 0</M>. Nothing special happens to the answer at a crossing: <M>D</M> is small on{' '}
        <i>both</i> sides of it, so the answer carries straight on through <M>\pm\sqrt2</M> and <M>\pm\sqrt6</M>.
      </Notice>
    )
  } else if (near(2)) {
    notice = (
      <Notice tone="good">
        <b><M>D = 2</M> exactly</b> (<M>f = 0</M>, <M>h = 2</M>). But this is <i>not</i> an end of the answer: either side
        of <M>x = \pm2</M> the gap is less than 2, not more. It is the tallest the gap gets inside a shaded region, so every{' '}
        <M>x</M> in the shaded regions works. Solving only <M>D = 2</M> gives this point as well as the four real ends, which
        is why &ldquo;only the values of <M>x</M> for when <M>D = 2</M>&rdquo; lost marks.
      </Notice>
    )
  } else if (near(R1) || near(R2)) {
    notice = (
      <Notice tone="good">
        <b><M>D = 2</M> exactly, and this one is an end of the answer</b>: on one side the gap is under 2, on the other it
        is over. &ldquo;At most 2&rdquo; includes 2, so the end is included: <M>\le</M>, at{' '}
        <M>{`x = ${x < 0 ? '-' : ''}${near(R1) ? '1.08' : '2.61'}`}</M>.
      </Notice>
    )
  } else if (ax < R1) {
    notice = (
      <Notice tone="warn">
        Near the <M>y</M>-axis <M>f</M> is high and <M>h</M> is low: <M>D = f(x) - h(x) \approx {num(D)}</M>, more than 2 (at{' '}
        <M>x = 0</M> it is <M>4 - (-2) = 6</M>). These <M>x</M>-values fail, so the answer is two separate intervals, not
        one. Press play to sweep the whole way across.
      </Notice>
    )
  } else if (ax < S2) {
    notice = (
      <Notice>
        <M>f</M> is still on top here, so <M>D = f(x) - h(x) \approx {num(D)}</M>, now under 2. These <M>x</M>-values count
        even though they are <b>outside</b> the shaded regions: the answer runs past the crossing at{' '}
        <M>{`x = ${x < 0 ? '-' : ''}\\sqrt2`}</M> until the gap reaches 2, at <M>{`x = ${x < 0 ? '-' : ''}1.08`}</M>.
      </Notice>
    )
  } else if (ax < S6) {
    notice = (
      <Notice>
        Inside a shaded region <M>h</M> is on top, so <M>D = h(x) - f(x) \approx {num(D)}</M>. The ruler is never longer
        than 2 in here (it reaches 2 only at <M>x = \pm2</M>), so the whole shaded region is part of the answer.
      </Notice>
    )
  } else if (ax < R2) {
    notice = (
      <Notice>
        Past the crossing at <M>{`x = ${x < 0 ? '-' : ''}\\sqrt6`}</M>, <M>f</M> is on top again and the curves spread apart
        quickly: <M>D = f(x) - h(x) \approx {num(D)}</M>. Still at most 2, until <M>{`x = ${x < 0 ? '-' : ''}2.61`}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Out here <M>f</M> shoots up and <M>h</M> plunges: <M>D \approx {num(D)}</M>, more than 2. The answer stops at{' '}
        <M>\pm2.61</M>.
      </Notice>
    )
  }

  const faint = view === 'signed'
  return (
    <div>
      <Plane
        x={[-3, 3]}
        y={[-3.5, 4.5]}
        xStep={1}
        yStep={1}
        height={330}
        yLabels={v => (v < -2.5 || v > 4.5 ? "" : tick(v))}
      >
        {view === 'mirror' && (
          <>
            <Region top={() => 2} bottom={() => 0} from={-3.2} to={3.2} color={C.good} opacity={0.12} />
            <Line.ThroughPoints point1={[0, 1]} point2={[1, 1]} color={C.violet} style="dashed" weight={1.5} />
            <Label at={[-0.7, 1]} color={C.violet} attach="n" size={12}>y = 1</Label>
          </>
        )}
        {view === 'signed' && (
          <>
            <Region top={() => 2} bottom={() => -2} from={-3.2} to={3.2} color={C.good} opacity={0.08} />
            <Line.ThroughPoints point1={[0, 2]} point2={[1, 2]} color={C.bad} style="dashed" weight={1.5} />
            <Line.ThroughPoints point1={[0, -2]} point2={[1, -2]} color={C.bad} style="dashed" weight={1.5} />
            <Label at={[-0.2, 2]} color={C.bad} attach="nw" size={12}>y = 2</Label>
            <Label at={[2, -2]} color={C.bad} attach="s" size={12}>y = −2</Label>
          </>
        )}
        <Plot.OfX y={f} domain={[-XC, XC]} color={C.f} weight={faint ? 1.5 : 3} opacity={faint ? 0.5 : 1} />
        <Plot.OfX y={h} domain={[-XC, XC]} color={C.g} weight={faint ? 1.5 : 3} opacity={faint ? 0.5 : 1} />
        {!faint && <Label at={[2.75, f(2.75)]} color={C.f} attach="w">f</Label>}
        {!faint && <Label at={[2.75, h(2.75)]} color={C.g} attach="w">h</Label>}
        {view === 'signed' && (
          <>
            {/* Stop the violet graph at y = −2.9, just above the answer bar. */}
            <Plot.OfX y={gap} domain={[-GC_OUT, -GC_IN]} color={C.violet} weight={3} />
            <Plot.OfX y={gap} domain={[GC_IN, GC_OUT]} color={C.violet} weight={3} />
            <Label at={[-1.3, gap(-1.3)]} color={C.violet} attach="w">h − f</Label>
            <Line.Segment point1={[x, 0]} point2={[x, Math.max(gap(x), -2.9)]} color={ruleColor} weight={4} />
            {gap(x) >= -2.9 && <Point x={x} y={gap(x)} color={ruleColor} />}
          </>
        )}
        {view !== 'signed' && (
          <>
            <Line.Segment point1={[x, y]} point2={[x, yh]} color={ruleColor} weight={4} />
            <Point x={x} y={y} color={C.f} />
            <Point x={x} y={yh} color={C.g} />
            {D > 0.35 && (
              <Label at={[x, (y + yh) / 2]} color={ruleColor} attach={x < 0 ? 'e' : 'w'} gap={8} size={12}>
                {`D ≈ ${num(D)}`}
              </Label>
            )}
          </>
        )}
        {/* The answer bar: the swept part of [−2.85, 2.85], green where D ≤ 2. */}
        {pieces(x).map(p => (
          <Line.Segment
            key={p.from}
            point1={[p.from, BAR]}
            point2={[p.to, BAR]}
            color={p.ok ? C.good : C.bad}
            weight={p.ok ? 7 : 2.5}
            opacity={p.ok ? 1 : 0.6}
          />
        ))}
        {EDGES.filter(e => e <= x + 1e-9).map(e => (
          <Label key={e} at={[e, BAR]} attach="s" size={11} gap={8} color={C.good}>
            {num(e)}
          </Label>
        ))}
        {/* The drag handle rides on the answer bar, so it never hides the ruler. */}
        <MovablePoint point={[x, BAR]} onMove={p => set(p[0])} constrain={p => [clamp(p[0], -XMAX, XMAX), BAR]} color={ruleColor} />
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        Drag the handle on the bar along the bottom (or use the slider). The bar fills in as <M>x</M> moves right: green
        where <M>D \le 2</M>, red where it isn&apos;t.
      </p>
      <Controls>
        <Buttons>
          <Toggle label="The ruler" checked={view === 'ruler'} onChange={() => setView('ruler')} />
          <Toggle label="Graph of h − f" checked={view === 'signed'} onChange={() => setView('signed')} />
          <Toggle label="Measure from y = 1" checked={view === 'mirror'} onChange={() => setView('mirror')} />
        </Buttons>
        <Slider label="x" value={x} onChange={set} min={-XMAX} max={XMAX} step={0.005} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x)} label="Sweep from left to right" />
        </Buttons>
        <Readouts>
          <Readout color={ruleColor} tex={`D = |h(x) - f(x)| \\approx ${num(D)} ${ok ? '\\le 2' : '> 2'}`} />
          {view === 'signed' && <Readout color={C.violet} tex={`h(x) - f(x) \\approx ${num(yh - y)}`} />}
          {view === 'mirror' && <Readout color={C.violet} tex={`|f(x) - 1| \\approx ${num(Math.abs(y - 1))}, \\ D = 2 \\times ${num(Math.abs(y - 1))}`} />}
          {view === 'ruler' && <Readout tex={hOnTop ? `h \\text{ on top: } D = h - f` : `f \\text{ on top: } D = f - h`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
