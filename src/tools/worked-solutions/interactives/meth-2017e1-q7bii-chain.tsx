// 2017 Methods Exam 1 Q7b.ii (and, through the named export `Chain`, Q7c) — follow one x through
// a composite: x goes into the inner function, its output u is fed to f(u) = √(u + 1), and f's
// output is the composite's value. The graph is f's, with its input axis called u; the orange bar
// on the u-axis is every input the inner function ever hands f (its range), and the green bar on
// the y-axis is everything that comes out (the composite's range).
//   b.ii: g(x) = x² + 4x + 3 on (−∞, −3] hands f ALL of [0, ∞), so f(g(x)) reaches all of f's
//         range [1, ∞).
//   c.:   h(x) = x² + 3 on R only hands f [3, ∞), so the curve from (0, 1) to (3, 2) is never
//         used and the range starts at f(3) = 2. A toggle tests the wrong idea "it's just ran f":
//         an output of 1.5 would need u = 1.25, which h never produces.

import { useState } from 'react'
import { Buttons, C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const f = (u: number) => Math.sqrt(u + 1)
// "=" when the 2 dp value shown is exact (g(−4) = 3), "≈" when it has been rounded.
const rel = (v: number) => (Math.abs(v * 100 - Math.round(v * 100)) < 1e-6 ? '=' : '\\approx')
const U_MAX = 9
const Y_TOP = 3.6

type Which = 'g' | 'h'
const INNER = {
  g: {
    rule: (x: number) => x * x + 4 * x + 3,
    tex: 'g',
    // The three sets in the flow boxes, as short inequalities so they fit a phone.
    dom: 'x\\le -3',
    ran: 'u\\ge 0',
    out: 'y\\ge 1',
    uMin: 0,
    xMin: -5,
    xMax: -3,
    x0: -4,
    xAtMin: -3,
  },
  h: {
    rule: (x: number) => x * x + 3,
    tex: 'h',
    dom: 'x\\in R',
    ran: 'u\\ge 3',
    out: 'y\\ge 2',
    uMin: 3,
    xMin: -2.2,
    xMax: 2.2,
    x0: 1.5,
    xAtMin: 0,
  },
} as const

/** The x → inner → u → f → y chain drawn as three boxes, with the sets on top and the current
 *  values underneath — the "machine" picture a teacher draws before any algebra. */
function Flow({ which, x, u, y }: { which: Which; x: number; u: number; y: number }) {
  const s = INNER[which]
  const box = 'flex-1 min-w-0 rounded-lg border px-1 py-1.5 text-center text-[12px] leading-snug'
  const arrow = 'flex-none flex flex-col items-center justify-center text-[12px] font-semibold text-gray-500 dark:text-gray-400'
  return (
    <div className="flex items-stretch gap-1.5 mb-3">
      <div className={`${box} border-violet-200 bg-violet-50/70 dark:border-violet-900 dark:bg-violet-950/30`}>
        <p className="text-[11px] font-bold text-violet-700 dark:text-violet-300">Input x</p>
        <p className="whitespace-nowrap"><Katex tex={s.dom} /></p>
        <p className="whitespace-nowrap tabular-nums text-gray-600 dark:text-gray-300"><Katex tex={`x=${x.toFixed(2)}`} /></p>
      </div>
      <div className={arrow}>
        <span><Katex tex={s.tex} /></span>
        <span aria-hidden="true">→</span>
      </div>
      <div className={`${box} border-orange-200 bg-orange-50/70 dark:border-orange-900 dark:bg-orange-950/30`}>
        <p className="text-[11px] font-bold text-orange-700 dark:text-orange-300">Fed to f</p>
        <p className="whitespace-nowrap"><Katex tex={s.ran} /></p>
        <p className="whitespace-nowrap tabular-nums text-gray-600 dark:text-gray-300"><Katex tex={`u${rel(u)}${u.toFixed(2)}`} /></p>
      </div>
      <div className={arrow}>
        <span><Katex tex="f" /></span>
        <span aria-hidden="true">→</span>
      </div>
      <div className={`${box} border-emerald-200 bg-emerald-50/70 dark:border-emerald-900 dark:bg-emerald-950/30`}>
        <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Output</p>
        <p className="whitespace-nowrap"><Katex tex={s.out} /></p>
        <p className="whitespace-nowrap tabular-nums text-gray-600 dark:text-gray-300"><Katex tex={`y${rel(y)}${y.toFixed(2)}`} /></p>
      </div>
    </div>
  )
}

export function Chain({ start, compare }: { start: Which; compare: boolean }) {
  const [which, setWhich] = useState<Which>(start)
  const [x, setX] = useState<number>(INNER[start].x0)
  const [testWrong, setTestWrong] = useState(false)
  const s = INNER[which]
  const u = s.rule(x)
  const y = f(u)
  const yMin = f(s.uMin)
  const atMin = Math.abs(x - s.xAtMin) < 0.03
  const showWrong = which === 'h' && testWrong

  const pick = (w: Which) => {
    setWhich(w)
    setX(INNER[w].x0)
    if (w === 'g') setTestWrong(false)
  }

  let notice
  if (showWrong) {
    notice = (
      <Notice tone="warn">
        <b>Is the range just <M>{'\\text{ran}(f) = [1, \\infty)'}</M> again?</b> Test one value in <M>[1, 2)</M>, say{' '}
        <M>y = 1.5</M>. For <M>f(u) = 1.5</M> you need <M>u = 1.25</M> (since <M>{'\\sqrt{2.25} = 1.5'}</M>), the red
        dashed path. But <M>h(x) = x^2 + 3 = 1.25</M> means <M>x^2 = -1.75</M>, which has no solution: <M>h</M> never
        hands <M>f</M> anything below <M>3</M>. So <M>1.5</M>, and every value in <M>[1, 2)</M>, is never reached.
      </Notice>
    )
  } else if (which === 'g' && atMin) {
    notice = (
      <Notice tone="good">
        <b><M>x = -3</M> gives <M>g(-3) = 0</M></b>, the smallest input <M>f</M> accepts, and <M>f(0) = 1</M>, the
        smallest output <M>f</M> has. No <M>x</M> in the domain gives anything lower, so the range of{' '}
        <M>f(g(x))</M> starts at <M>1</M>, square bracket because it is reached: <M>{'[1, \\infty)'}</M>, the range of{' '}
        <M>f</M> from part a.
      </Notice>
    )
  } else if (which === 'g') {
    notice = (
      <Notice>
        Follow the chain: <M>{`x = ${x.toFixed(2)}`}</M> goes into <M>g</M>, giving{' '}
        <M>{`u ${rel(u)} ${u.toFixed(2)}`}</M>; that goes into <M>f</M>, giving <M>{`y ${rel(y)} ${y.toFixed(2)}`}</M>. As <M>x</M> runs
        along <M>{'(-\\infty, -3]'}</M>, the orange dot sweeps the <b>whole</b> orange bar <M>{'[0, \\infty)'}</M>: every
        input <M>f</M> accepts, none missing. So <M>f</M> produces everything it can. Note that{' '}
        <M>{'[0, \\infty)'}</M> is the middle box (what goes into <M>f</M>), not the answer. Now slide <M>x</M> to{' '}
        <M>-3</M>.
        {compare && <> Then switch back to <M>h</M> to compare.</>}
      </Notice>
    )
  } else if (atMin) {
    notice = (
      <Notice tone="good">
        <b><M>x = 0</M> is where <M>h</M> is smallest</b>: <M>h(0) = 3</M>, so the smallest input <M>f</M> ever receives
        is <M>3</M>, and <M>{'f(3) = \\sqrt4 = 2'}</M>. That is the bottom of the range: <M>{'[2, \\infty)'}</M>, reached at{' '}
        <M>x = 0</M>, so square bracket. Now try the &ldquo;just <M>{'\\text{ran}(f)'}</M>?&rdquo; button.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{`x = ${x.toFixed(2)}`}</M> goes into <M>h</M>, giving <M>{`u ${rel(u)} ${u.toFixed(2)}`}</M>, then{' '}
        <M>{`f(u) ${rel(y)} ${y.toFixed(2)}`}</M>. Because <M>x^2 \ge 0</M>, <M>h(x) = x^2 + 3</M> is never below{' '}
        <M>3</M>, so <M>f</M> is only ever fed the orange bar <M>{'[3, \\infty)'}</M>. The dashed piece of <M>f</M>, from{' '}
        <M>(0, 1)</M> to <M>(3, 2)</M>, is never used, so the outputs start at <M>f(3) = 2</M>, not <M>f(0) = 1</M>. Slide{' '}
        <M>x</M> to <M>0</M>.
        {compare && <> Switch to <M>g</M> to see why part b.ii was different.</>}
      </Notice>
    )
  }

  return (
    <div>
      <Flow which={which} x={x} u={u} y={y} />
      <Plane x={[-1, U_MAX + 0.5]} y={[-0.5, Y_TOP]} xStep={1} yStep={1} height={300} xLabel="u">
        {/* f on its domain: the part that's used solid, the part that's never fed dashed. */}
        {s.uMin > 0 && <Plot.OfX y={f} domain={[0, s.uMin]} color={C.f} weight={2} style="dashed" opacity={0.55} />}
        <Plot.OfX y={f} domain={[s.uMin, U_MAX + 0.5]} color={C.f} weight={3.5} />
        <Point x={0} y={1} color={s.uMin > 0 ? C.guide : C.f} />
        <Label at={[7, 2.25]} color={C.f} attach="e">y = f(u)</Label>

        {/* What the inner function hands f (orange), and what comes out (green). */}
        <Line.Segment point1={[s.uMin, 0]} point2={[U_MAX + 0.8, 0]} color={C.g} weight={6} opacity={0.75} />
        <Line.Segment point1={[0, yMin]} point2={[0, Y_TOP + 0.3]} color={C.good} weight={7} opacity={0.75} />
        <Line.Segment point1={[s.uMin, 0]} point2={[s.uMin, yMin]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[s.uMin, yMin]} point2={[0, yMin]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={s.uMin} y={yMin} color={C.good} />
        {/* mafs swaps n/s: attach "ne" puts the label below-right. Nudged clear of the y-axis's
            tick number when the point is on the axis. */}
        <Label at={[s.uMin > 0 ? s.uMin : 0.4, yMin]} color={C.good} attach="ne" size={12}>
          {s.uMin > 0 ? '(3, 2)' : '(0, 1)'}
        </Label>

        {showWrong && (
          <>
            <Line.Segment point1={[0, 1]} point2={[0, 2]} color={C.bad} weight={7} opacity={0.9} />
            <Line.Segment point1={[0, 1.5]} point2={[1.25, 1.5]} color={C.bad} style="dashed" weight={2} />
            <Line.Segment point1={[1.25, 1.5]} point2={[1.25, 0]} color={C.bad} style="dashed" weight={2} />
            <Point x={1.25} y={0} color={C.bad} />
            {/* Short, so it ends before u = 3, where h's guide line and the current x's path run. */}
            <Label at={[1.25, 0.6]} color={C.bad} attach="e" size={12}>1.25?</Label>
          </>
        )}

        {/* The current x, followed through the chain. */}
        <Line.Segment point1={[u, 0]} point2={[u, y]} color={C.g} style="dashed" weight={1.5} />
        <Line.Segment point1={[u, y]} point2={[0, y]} color={C.good} style="dashed" weight={1.5} />
        <Point x={u} y={0} color={C.g} />
        <Point x={u} y={y} color={C.f} />
        <Point x={0} y={y} color={C.good} />
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={s.xMin} max={s.xMax} step={0.02} format={v => v.toFixed(2).replace('-', '−')} />
        {compare && (
          <Buttons>
            <Toggle label="Inner function h (part c)" checked={which === 'h'} onChange={() => pick('h')} />
            <Toggle label="Compare: g (part b.ii)" checked={which === 'g'} onChange={() => pick('g')} />
            {which === 'h' && <Toggle label="Is the range just ran(f) = [1, ∞)?" checked={testWrong} onChange={setTestWrong} />}
          </Buttons>
        )}
        <Readouts>
          <Readout color={C.g} tex={`u = ${s.tex}(${x.toFixed(2)}) ${rel(u)} ${u.toFixed(2)}`} />
          <Readout color={C.good} tex={`f(u) ${rel(u)} \\sqrt{${u.toFixed(2)} + 1} ${rel(u) === '=' ? rel(y) : '\\approx'} ${y.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}

export default function ChainG() {
  return <Chain start="g" compare={false} />
}
