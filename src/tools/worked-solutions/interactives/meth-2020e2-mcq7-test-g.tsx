// 2020 Methods Exam 2 MCQ 7 — test the five options on a real g. The question's g is unknown, but
// a correct formula for f′(x) must work for EVERY differentiable g, so choose one and check. With
// g(u) = sin u, f(x) = e^{sin(x²)} is an actual curve: slide x, and the gradient of the curve at P
// (measured numerically from the curve itself, not from any formula) is compared with each option's
// value. Only option C agrees at every x. The most-chosen wrong answer, D (11%), reads g′ at 2x
// instead of at g's own input x²: at x = 1 that is cos 2 ≈ −0.42 instead of cos 1 ≈ 0.54, so D's
// line runs downhill while the curve climbs. The second test function, g(u) = log_e(1 + u), turns f
// into 1 + x², whose gradient 2x students already know; option C simplifies to exactly 2x there.
// Where a wrong option agrees by coincidence (every option at x = 0; D and E at x = 2, where x² and
// 2x are both 4), the Notice says so. Values checked in numpy (x = 1, sin: gradient 2.5068, A 4.64,
// B 3.904, C 2.5068, D −1.931, E 2.683).

import { useState } from 'react'
import { Buttons, C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

type GKey = 'sin' | 'log'
type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
const LETTERS: Letter[] = ['A', 'B', 'C', 'D', 'E']

interface TestG {
  g: (u: number) => number
  gp: (u: number) => number
  /** TeX for g(u), g′(u) */
  tex: string
  gpTex: string
  y: [number, number]
  /** TeX for the outer and middle chain-rule factors, e^{g(x²)} and g′(x²), with this g. */
  outer: string
  middle: string
}
const GS: Record<GKey, TestG> = {
  sin: {
    g: Math.sin,
    gp: Math.cos,
    tex: 'g(u) = \\sin u',
    gpTex: "g'(u) = \\cos u",
    y: [0, 3],
    outer: 'e^{\\sin(x^2)}',
    middle: '\\cos(x^2)',
  },
  log: {
    g: u => Math.log(1 + u),
    gp: u => 1 / (1 + u),
    tex: 'g(u) = \\log_e(1+u)',
    gpTex: "g'(u) = \\tfrac{1}{1+u}",
    y: [0, 5],
    outer: '(1+x^2)',
    middle: '\\tfrac{1}{1+x^2}',
  },
}

// Each option, as printed, with the chosen g substituted (e^{log_e(1 + u)} = 1 + u).
const FORMULA: Record<GKey, Record<Letter, string>> = {
  sin: {
    A: '2x\\,e^{\\sin(x^2)}',
    B: '2x\\sin(x^2)\\,e^{\\sin(x^2)}',
    C: '2x\\cos(x^2)\\,e^{\\sin(x^2)}',
    D: '2x\\cos(2x)\\,e^{\\sin(x^2)}',
    E: '2x\\cos(x^2)\\,e^{\\sin(2x)}',
  },
  log: {
    A: '2x(1+x^2)',
    B: '2x\\log_e(1+x^2)\\,(1+x^2)',
    C: '2x\\cdot\\tfrac{1}{1+x^2}\\cdot(1+x^2) = 2x',
    D: '2x\\cdot\\tfrac{1}{1+2x}\\cdot(1+x^2)',
    E: '2x\\cdot\\tfrac{1}{1+x^2}\\cdot(1+2x)',
  },
}

function optionValue(L: Letter, t: TestG, x: number): number {
  const u = x * x
  switch (L) {
    case 'A':
      return 2 * x * Math.exp(t.g(u))
    case 'B':
      return 2 * x * t.g(u) * Math.exp(t.g(u))
    case 'C':
      return 2 * x * t.gp(u) * Math.exp(t.g(u))
    case 'D':
      return 2 * x * t.gp(2 * x) * Math.exp(t.g(u))
    case 'E':
      return 2 * x * t.gp(u) * Math.exp(t.g(2 * x))
  }
}

const X_MAX = 2
const agrees = (v: number, w: number) => Math.abs(v - w) < 0.005 * Math.max(1, Math.abs(w))

export default function TestG() {
  const [gk, setGk] = useState<GKey>('sin')
  const [x, setX] = useState(1)
  const [pick, setPick] = useState<Letter>('D')
  const T = GS[gk]
  const f = (s: number) => Math.exp(T.g(s * s))
  const y = f(x)
  // The curve's own gradient at P, measured numerically — independent of every option.
  const h = 1e-5
  const slope = (f(x + h) - f(x - h)) / (2 * h)
  const vals = Object.fromEntries(LETTERS.map(L => [L, optionValue(L, T, x)])) as Record<Letter, number>
  const pv = vals[pick]
  const ok = agrees(pv, slope)
  const atZero = Math.abs(x) < 0.005
  const atTwo = Math.abs(x - 2) < 0.005
  const x2 = num(x * x, 2)
  const twoX = num(2 * x, 2)

  let notice
  if (atZero) {
    notice = (
      <Notice>
        At <M>x = 0</M> every option gives 0, because every option has the factor <M>2x</M>. A test point where all five agree can&apos;t
        tell them apart: slide <M>x</M> away from 0.
      </Notice>
    )
  } else if (pick === 'C') {
    notice = (
      <Notice tone="good">
        <b>Option C&apos;s line is the tangent</b>: it touches the curve at P with the curve&apos;s own gradient, at every <M>x</M> you try.
        That is the chain rule taking the layers one at a time: the exponential gives back <M>{'e^{g(x^2)}'}</M>, the <M>g</M> layer gives{' '}
        <M>g&apos;</M> evaluated at <M>g</M>&apos;s own input <M>x^2</M>, and the inside gives <M>2x</M>.{' '}
        {gk === 'sin' ? (
          <>Now switch to the other <M>g</M>.</>
        ) : (
          <>
            With this <M>g</M>, <M>{'f(x) = e^{\\log_e(1+x^2)} = 1 + x^2'}</M>, whose gradient is <M>2x</M>, and C simplifies to exactly that.
          </>
        )}
      </Notice>
    )
  } else if (ok) {
    notice = (
      <Notice tone="warn">
        At this <M>x</M>, option {pick} happens to give the right number
        {atTwo && (pick === 'D' || pick === 'E') ? (
          <>
            {' '}because <M>2x</M> and <M>x^2</M> are both 4 here, so reading <M>g&apos;</M> (or <M>g</M>) at the wrong one makes no difference
          </>
        ) : null}
        . One lucky point doesn&apos;t make a formula right: move <M>x</M> a little and watch it fail.
      </Notice>
    )
  } else if (pick === 'D') {
    notice = (
      <Notice tone="warn">
        <b>Option D reads <M>g&apos;</M> at <M>2x = {twoX}</M></b>, but <M>g</M> is being applied to <M>x^2 = {x2}</M>, so that is where its
        rate of change counts:{' '}
        {gk === 'sin' ? (
          <>
            <M>{`\\cos(${x2}) \\approx ${num(Math.cos(x * x), 2)}`}</M>, not <M>{`\\cos(${twoX}) \\approx ${num(Math.cos(2 * x), 2)}`}</M>
          </>
        ) : (
          <>
            <M>{`\\tfrac{1}{1+${x2}} \\approx ${num(1 / (1 + x * x), 2)}`}</M>, not <M>{`\\tfrac{1}{1+${twoX}} \\approx ${num(1 / (1 + 2 * x), 2)}`}</M>
          </>
        )}
        . The <M>2x</M> is how fast the input <M>x^2</M> is changing, and it is already in the answer as its own factor. It never goes
        inside <M>g&apos;</M>.
      </Notice>
    )
  } else if (pick === 'B') {
    notice = (
      <Notice tone="warn">
        <b>Option B uses <M>g(x^2)</M>, the value of <M>g</M></b>, where the chain rule needs <M>g&apos;(x^2)</M>, its rate of change.
        That&apos;s the &ldquo;bring the power down&rdquo; habit from <M>x^n</M>, but <M>{'e^{u}'}</M> isn&apos;t a power of <M>u</M>: its
        derivative is just <M>{'e^{u}'}</M>, and the power stays where it is.
      </Notice>
    )
  } else if (pick === 'A') {
    notice = (
      <Notice tone="warn">
        <b>Option A has no <M>g&apos;</M> factor at all</b>: it differentiates as if <M>g</M> weren&apos;t there (it would be right only if{' '}
        <M>g&apos;</M> were always 1, as for <M>g(u) = u</M>). Every layer contributes a factor: the exponential, then <M>g</M>, then <M>x^2</M>. Leave one out and the line
        misses.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Option E changes the power to <M>g(2x)</M>.</b> But differentiating <M>{'e^{\\text{stuff}}'}</M> gives back{' '}
        <M>{'e^{\\text{stuff}}'}</M> unchanged, so the power stays <M>g(x^2)</M>. The derivative of the inside, <M>2x</M>, belongs in front
        as a factor, never inside another function.
      </Notice>
    )
  }

  const lineColor = pick === 'C' ? C.good : C.bad

  return (
    <div>
      {/* No tick number at y = 1: both curves start at (0, 1), right on top of it. */}
      <Plane x={[0, 2.2]} y={T.y} xStep={0.5} yStep={1} height={300} yLabels={v => (v === 1 ? '' : String(v))}>
        <Plot.OfX y={f} domain={[0, 2.2]} color={C.f} weight={3} />
        <Line.PointSlope point={[x, y]} slope={slope} color={C.good} weight={pick === 'C' ? 5 : 2.5} opacity={pick === 'C' ? 0.45 : 1} />
        {pick !== 'C' && <Line.PointSlope point={[x, y]} slope={pv} color={lineColor} weight={2} style="dashed" />}
        {pick === 'C' && <Line.PointSlope point={[x, y]} slope={pv} color={C.good} weight={2} style="dashed" />}
        <Point x={x} y={y} color={C.f} />
        <Label at={[x, y]} color={C.f} attach="s" gap={10}>P</Label>
        <Label at={[0.25, f(0.25)]} color={C.f} attach="n">f</Label>
      </Plane>
      <Controls>
        <Buttons>
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Test with</span>
          <Toggle label={<Katex tex={GS.sin.tex} />} checked={gk === 'sin'} onChange={() => setGk('sin')} />
          <Toggle label={<Katex tex={GS.log.tex} />} checked={gk === 'log'} onChange={() => setGk('log')} />
        </Buttons>
        <Slider label="x" value={x} onChange={setX} min={0} max={X_MAX} step={0.01} />
        <Readouts>
          <Readout color={C.good} tex={`\\text{gradient of the curve at P} \\approx ${num(slope, 3)}`} />
          <Readout color={lineColor} tex={`\\text{option ${pick}} \\approx ${num(pv, 3)}`} />
        </Readouts>
        <div className="text-[12.5px] text-gray-600 dark:text-gray-300 overflow-x-auto">
          <Katex
            tex={`f'(${num(x, 2)}) = \\underbrace{${T.outer}}_{${num(y, 2)}}\\times\\underbrace{${T.middle}}_{${num(T.gp(x * x), 2)}}\\times\\underbrace{2x}_{${num(2 * x, 2)}} \\approx ${num(vals.C, 2)}`}
          />
        </div>
        <table className="w-full border-collapse text-[12.5px] text-gray-700 dark:text-gray-300">
          <tbody>
            {LETTERS.map(L => {
              const good = agrees(vals[L], slope)
              const sel = L === pick
              return (
                <tr
                  key={L}
                  onClick={() => setPick(L)}
                  className={`cursor-pointer border-t border-gray-100 dark:border-gray-800 ${
                    sel ? 'bg-emerald-50 dark:bg-emerald-950/40' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <td className="w-7 px-1 py-1 font-semibold">{L}</td>
                  <td className="px-1 py-1">
                    <Katex tex={FORMULA[gk][L]} />
                  </td>
                  <td className="w-14 px-1 py-1 text-right tabular-nums">{num(vals[L], 2)}</td>
                  <td className={`w-5 px-1 py-1 text-center font-bold ${good ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                    {good ? '✓' : '✗'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Tap an option to draw its line through P (dashed). The solid green line is the curve&apos;s real tangent, measured from the curve.
          Here <M>{GS[gk].gpTex}</M>.
        </p>
        {notice}
      </Controls>
    </div>
  )
}
