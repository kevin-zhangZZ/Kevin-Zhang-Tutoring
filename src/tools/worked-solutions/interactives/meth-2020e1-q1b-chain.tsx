// 2020 Methods Exam 1 Q1b — the chain rule's factor (2x − 1) is the inside's gradient. f(x) =
// e^{x² − x + 3} is e^u with u = x² − x + 3 inside: a nudge to x is multiplied by 2x − 1 on its way
// into u, then by e^u on its way out to y, so f′(x) = e^u × (2x − 1). Slide x along the curve and
// the tangent's gradient is that product. At x = 1 the inside rate is exactly 1, so f′(1) = e³; at
// x = ½ the inside rate is 0, which is the only reason f can have a flat tangent there (e^u is never
// 0). Two toggles draw the line a wrong derivative would give: without brackets (2x − e^u, which is
// 2 − e³ ≈ −18.09 at x = 1, the report's error) and without the chain factor (e^u, which agrees
// only at x = 1, where 2x − 1 = 1, and still climbs at x = ½ where f is flat).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num,
} from './kit'

const inner = (x: number) => x * x - x + 3
const f = (x: number) => Math.exp(inner(x))
const fp = (x: number) => (2 * x - 1) * f(x)

type Mode = 'right' | 'brackets' | 'chain'
const slopeFor = (mode: Mode, x: number) => (mode === 'brackets' ? 2 * x - f(x) : mode === 'chain' ? f(x) : fp(x))
// "=" when the 2 dp value shown is exact (u = 3 at x = 1), "≈" when it has been rounded.
const rel = (v: number) => (Math.abs(v * 100 - Math.round(v * 100)) < 1e-6 ? '=' : '\\approx')

/** One step of the chain: its rate, an arrow, and the multiplier at the current x. */
function Arrow({ tex, value }: { tex: string; value: string }) {
  return (
    <div className="flex-none flex flex-col items-center justify-center text-[11.5px] leading-tight text-gray-600 dark:text-gray-300">
      <Katex tex={tex} />
      <span aria-hidden="true" className="text-[20px] leading-none text-gray-400 dark:text-gray-500">→</span>
      <span className="font-semibold tabular-nums">×{value}</span>
    </div>
  )
}

/** x → u → y as three boxes, with each step's rate on the arrow between them. */
function Flow({ x }: { x: number }) {
  const box = 'flex-1 min-w-0 rounded-lg border px-1 py-1.5 text-center text-[12px] leading-snug'
  return (
    <div className="flex items-stretch gap-1 mb-3">
      <div className={`${box} border-violet-200 bg-violet-50/70 dark:border-violet-900 dark:bg-violet-950/30`}>
        <p className="text-[11px] font-bold text-violet-700 dark:text-violet-300">input</p>
        <p className="whitespace-nowrap tabular-nums"><Katex tex={`x=${num(x)}`} /></p>
      </div>
      <Arrow tex="2x-1" value={num(2 * x - 1)} />
      <div className={`${box} border-orange-200 bg-orange-50/70 dark:border-orange-900 dark:bg-orange-950/30`}>
        <p className="text-[11px] font-bold text-orange-700 dark:text-orange-300">inside</p>
        <p className="whitespace-nowrap tabular-nums"><Katex tex={`u${rel(inner(x))}${num(inner(x))}`} /></p>
      </div>
      <Arrow tex="e^u" value={num(f(x))} />
      <div className={`${box} border-sky-200 bg-sky-50/70 dark:border-sky-900 dark:bg-sky-950/30`}>
        <p className="text-[11px] font-bold text-sky-700 dark:text-sky-300">output</p>
        <p className="whitespace-nowrap tabular-nums"><Katex tex={`y\\approx${num(f(x))}`} /></p>
      </div>
    </div>
  )
}

export default function ChainFactor() {
  const [x, setX] = useState(1)
  const [mode, setMode] = useState<Mode>('right')
  const y = f(x)
  const m = slopeFor(mode, x)
  const atOne = Math.abs(x - 1) < 0.005
  const atHalf = Math.abs(x - 0.5) < 0.005

  let notice
  if (mode === 'brackets') {
    notice = (
      <Notice tone="warn">
        <b>Without brackets, <M>{'2x-1e^{x^2-x+3}'}</M> means <M>{'2x-e^{x^2-x+3}'}</M></b>: order of operations
        multiplies only the <M>1</M>.{' '}
        {atOne ? (
          <>
            At <M>x = 1</M> that is <M>2 - e^3 \approx -18.09</M>: the red line, steeply downhill, where the curve is plainly
            going up.
          </>
        ) : (
          <>
            At <M>{`x = ${num(x)}`}</M> that gives a gradient of about <M>{num(m)}</M>: the red line, which cuts across the
            curve instead of just touching it. (At <M>x = 1</M> it is <M>2 - e^3 \approx -18.09</M>, steeply downhill.)
          </>
        )}{' '}
        The whole of <M>2x - 1</M> multiplies <M>{'e^{x^2-x+3}'}</M>, so it needs brackets.
      </Notice>
    )
  } else if (mode === 'chain') {
    notice = atOne ? (
      <Notice tone="warn">
        <b>Forgetting the chain factor gives <M>{"f'(x) = e^{x^2-x+3}"}</M></b>, and at <M>x = 1</M> the red line lies right on
        the tangent. That is luck, not a method: <M>2(1) - 1 = 1</M>, so multiplying by the inside rate changes nothing{' '}
        <i>at this one point</i>. Now press &ldquo;Go to x = ½&rdquo; and watch the red line.
      </Notice>
    ) : (
      <Notice tone="warn">
        The red line uses gradient <M>{`e^{u} \\approx ${num(m)}`}</M>, which ignores how fast the inside is changing, so it
        misses the true tangent (dashed).
        {atHalf ? (
          <>
            {' '}At <M>x = \tfrac12</M> the curve is flat, but this line still climbs at about <M>15.64</M>. No gradient
            without the factor <M>2x - 1</M> can ever be <M>0</M>, because <M>e^u</M> is never <M>0</M>.
          </>
        ) : (
          <> It only agrees where <M>2x - 1 = 1</M>, i.e. at <M>x = 1</M>. Try <M>x = \tfrac12</M>, where the curve is flat.</>
        )}
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 1</M> the inside rate is <M>2(1) - 1 = 1</M></b>, so a nudge to <M>x</M> passes into <M>u</M> unchanged, and{' '}
        <M>e^u</M> then multiplies it by <M>e^3 \approx 20.09</M>. So <M>f&apos;(1) = e^3 \times 1 = e^3</M>, the gradient of the
        orange tangent. Now go to <M>x = \tfrac12</M>, or try the two &ldquo;What if&rdquo; buttons.
      </Notice>
    )
  } else if (atHalf) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = \tfrac12</M> the inside rate <M>2x - 1</M> is <M>0</M></b>: <M>x^2 - x + 3</M> is at its lowest, so a nudge
        to <M>x</M> doesn&apos;t move <M>u</M> at all, and the tangent is flat. <M>e^u</M> is never <M>0</M>, so the factor{' '}
        <M>2x - 1</M> is the only thing that can make <M>f&apos;(x) = 0</M>: <M>f</M> bottoms out exactly where its index does.
      </Notice>
    )
  } else if (x < 0.5) {
    notice = (
      <Notice>
        Left of <M>x = \tfrac12</M> the inside is decreasing (<M>2x - 1 &lt; 0</M>): increasing <M>x</M> makes <M>u</M> smaller,
        so the tangent slopes down. The outside rate <M>e^u</M> is always positive; the sign of <M>f&apos;(x)</M> comes from
        the inside. Slide to <M>x = \tfrac12</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Follow a small nudge to <M>x</M>: it is multiplied by <M>2x - 1 \approx {num(2 * x - 1)}</M> on its way into <M>u</M>, then
        by <M>e^u \approx {num(y)}</M> on its way out. So <M>f&apos;(x)</M> is the product,{' '}
        <M>{`\\approx ${num(2 * x - 1)} \\times ${num(y)} \\approx ${num(fp(x))}`}</M>. Slide to <M>x = 1</M> for the
        question&apos;s value.
      </Notice>
    )
  }

  const lineColor = mode === 'right' ? C.g : C.bad
  return (
    <div>
      <Flow x={x} />
      <Plane x={[-0.5, 1.5]} y={[0, 50]} xStep={0.5} yStep={10} height={320}>
        <Plot.OfX y={f} domain={[-0.5, 1.5]} color={C.f} weight={3} />
        <Label at={[1.36, f(1.36)]} color={C.f} attach="w">y = f(x)</Label>
        {mode !== 'right' && <Line.PointSlope point={[x, y]} slope={fp(x)} color={C.g} style="dashed" weight={2} opacity={0.7} />}
        <Line.PointSlope point={[x, y]} slope={m} color={lineColor} weight={2.5} />
        <Point x={x} y={y} color={C.f} />
        {/* The no-brackets line runs down-right through the point, where this label would sit. */}
        {atOne && mode !== 'brackets' && <Label at={[1, y]} color={C.f} attach="se">(1, e³)</Label>}
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={-0.5} max={1.5} step={0.01} format={v => num(v)} />
        <Buttons>
          <ActionButton label="Go to x = 1" onClick={() => setX(1)} />
          <ActionButton label="Go to x = ½" onClick={() => setX(0.5)} />
        </Buttons>
        <Buttons>
          <Toggle label="What if I drop the brackets?" checked={mode === 'brackets'} onChange={on => setMode(on ? 'brackets' : 'right')} />
          <Toggle label="What if I forget × (2x − 1)?" checked={mode === 'chain'} onChange={on => setMode(on ? 'chain' : 'right')} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`f'(x) = e^{u}(2x-1) ${rel(fp(x))} ${num(fp(x))}`} />
          {mode === 'brackets' && <Readout color={C.bad} tex={`2x - e^{u} \\approx ${num(m)}`} />}
          {mode === 'chain' && <Readout color={C.bad} tex={`e^{u} \\approx ${num(m)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
