// 2020 Specialist Exam 2 MCQ 2 — the range of f(x) = |b·cos⁻¹(x) − a|, built up by
// transformations as the examiner's report advises, with the range shown as a green band at
// every step: (1) y = cos⁻¹(x), range [0, π]; (2) dilate by factor b from the x-axis, [0, bπ];
// (3) translate down a, [−a, bπ − a] — option A, the range BEFORE the modulus; (4) the modulus
// folds the piece below the x-axis up (animated): (1, −a) rises to (1, a), the crossing point
// (cos(a/b), 0) stays at height 0, so the range is [0, bπ − a] — option B. Not [a, bπ − a]
// (option C): the graph touches 0. Sliders for a and b let the student break the condition
// a < bπ/2 and see what it is for: with bπ/2 < a ≤ bπ the folded piece rises above the top and
// the range becomes [0, a]; with a > bπ the whole graph was below the axis and the range is
// [a − bπ, a] (option E's interval). The band is computed by sampling the curve actually drawn.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Slider,
  StepNav, Vector, num, usePlayer, useSteps,
} from './kit'

const X0 = -1.25
const X1 = 1.25
const Y0 = -3.6
const Y1 = 6.4
const PI = Math.PI

const STEP_TITLES = ['y = cos⁻¹(x)', 'y = b cos⁻¹(x)', 'y = b cos⁻¹(x) − a', 'y = |b cos⁻¹(x) − a|']

/** Smallest and largest value of fn on [−1, 1], sampled finely (plus the given special x's). */
function rangeOf(fn: (x: number) => number, extra: number[]): [number, number] {
  let lo = Infinity
  let hi = -Infinity
  const xs = Array.from({ length: 801 }, (_, i) => -1 + (2 * i) / 800).concat(extra)
  for (const x of xs) {
    const v = fn(x)
    if (v < lo) lo = v
    if (v > hi) hi = v
  }
  return [lo, hi]
}

const close = (u: number, v: number) => Math.abs(u - v) < 1e-6
const tx = (v: number) => num(v).replace('−', '-')

export default function Fold() {
  const steps = useSteps(4)
  const s = steps.step
  const [b, setB] = useState(1.5)
  const [a, setA] = useState(1.5)
  const [fold, setFold] = useState(1)
  const player = usePlayer(setFold, { min: 0, max: 1, seconds: 2.5 })

  const k = Math.cos(PI * fold) // 1 before the fold, −1 after it: multiplies the negative part
  const g0 = (x: number) => Math.acos(x)
  const g1 = (x: number) => b * Math.acos(x)
  const g2 = (x: number) => b * Math.acos(x) - a
  const g3 = (x: number) => {
    const v = g2(x)
    return v >= 0 ? v : k * v
  }
  const curve = [g0, g1, g2, g3][s]
  const ghost = s === 0 ? null : [g0, g1, g2][s - 1]

  const crosses = a <= b * PI // the translated graph reaches the x-axis
  const xZero = crosses ? Math.cos(a / b) : NaN
  const [lo, hi] = rangeOf(curve, crosses ? [xZero] : [])
  const folded = s === 3 && fold > 0.999
  const unfolded = s === 3 && fold < 0.001
  const condition = a < (b * PI) / 2 - 1e-9

  // Which option's interval is the range drawn right now?
  const opts: [string, number, number][] = [
    ['A', -a, b * PI - a],
    ['B', 0, b * PI - a],
    ['C', a, b * PI - a],
    ['D', 0, b * PI + a],
    ['E', a - b * PI, a],
  ]
  const match = s >= 2 && (s === 2 || folded) ? opts.find(([, l, h]) => close(l, lo) && close(h, hi)) : undefined

  let rangeTex: string
  if (s === 0) rangeTex = '[0,\\ \\pi]'
  else if (s === 1) rangeTex = '[0,\\ b\\pi]'
  else if (s === 2 || unfolded) rangeTex = '[-a,\\ b\\pi - a]'
  else if (!folded) rangeTex = ''
  else if (!crosses) rangeTex = '[a - b\\pi,\\ a]'
  else if (condition) rangeTex = '[0,\\ b\\pi - a]'
  else rangeTex = '[0,\\ a]'

  const next = () => {
    if (s === 2) {
      setFold(0)
      player.toggle(0)
    }
    steps.next()
  }
  const back = () => {
    player.stop()
    setFold(1)
    steps.back()
  }

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        Start from the graph you know. <M>{'y = \\cos^{-1}(x)'}</M> runs from <M>(-1, \pi)</M> down to <M>(1, 0)</M>, through{' '}
        <M>{'\\left(0, \\tfrac{\\pi}{2}\\right)'}</M>, so its range is <M>[0, \pi]</M> (the green band: every height the
        graph reaches). The report&apos;s advice is to build <M>f</M> from this by transformations, tracking the range as
        you go. Press <b>Next</b>.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        Multiplying by <M>b</M> is a dilation by factor <M>b</M> from the <M>x</M>-axis: every height is multiplied by{' '}
        <M>b</M>. Since <M>b &gt; 0</M>, the ends of the range go <M>0 \to 0</M> and <M>\pi \to b\pi</M>, giving{' '}
        <M>[0, b\pi]</M>. Drag <M>b</M>: the point <M>(1, 0)</M> never moves, because <M>b \times 0 = 0</M>.
      </Notice>
    )
  } else if (s === 2) {
    notice = crosses ? (
      <Notice>
        Subtracting <M>a</M> translates the whole graph down <M>a</M> units, so every height drops by <M>a</M>: the range is
        now <M>[-a,\ b\pi - a]</M>. Because <M>a &gt; 0</M>, the bottom end <M>(1, -a)</M> is now <b>below</b> the{' '}
        <M>x</M>-axis, and the graph crosses the axis where <M>{'b\\cos^{-1}(x) = a'}</M>. This interval is option{' '}
        <b>A</b>: the range <i>before</i> the modulus. There is one more step. Press <b>Next</b>.
      </Notice>
    ) : (
      <Notice tone="warn">
        With <M>a &gt; b\pi</M> the whole graph has been pushed below the <M>x</M>-axis. The question rules this out:{' '}
        <M>{'a < \\tfrac{b\\pi}{2}'}</M>. Drag <M>a</M> back down below <M>{`\\tfrac{b\\pi}{2} \\approx ${tx((b * PI) / 2)}`}</M>.
      </Notice>
    )
  } else if (!folded) {
    notice = (
      <Notice>
        The modulus leaves every point on or above the <M>x</M>-axis where it is, and reflects every point below it up
        (<M>{'(x, y) \\to (x, -y)'}</M>). Watch the lowest point <M>(1, -a)</M> rise to <M>(1, a)</M>, while the point where the
        graph crossed the axis stays at height 0.
      </Notice>
    )
  } else if (!crosses) {
    notice = (
      <Notice tone="warn">
        Here <M>a &gt; b\pi</M>, so the <i>whole</i> graph was below the axis and all of it flipped: the range is{' '}
        <M>[a - b\pi,\ a]</M>, which is option E&apos;s interval. But that needs <M>a &gt; b\pi</M>, and the question says{' '}
        <M>{'a < \\tfrac{b\\pi}{2}'}</M>. Drag <M>a</M> back down.
      </Notice>
    )
  } else if (!condition) {
    notice = (
      <Notice tone="warn">
        Now <M>{`a \\ge \\tfrac{b\\pi}{2} \\approx ${tx((b * PI) / 2)}`}</M>, which the question rules out. The flipped piece rises to{' '}
        <M>(1, a)</M>, which is now at least as high as the top <M>(-1,\ b\pi - a)</M>, so the range would be{' '}
        <M>[0,\ a]</M>, none of the options. That is what the condition is for:{' '}
        <M>{'a < \\tfrac{b\\pi}{2} \\iff a < b\\pi - a'}</M>, which keeps the flipped piece below the top.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Folded.</b> The top is still <M>(-1,\ b\pi - a)</M>. The flipped piece only reaches height <M>a</M>, which is lower,
        because <M>{'a < \\tfrac{b\\pi}{2}'}</M> means <M>{'a < b\\pi - a'}</M>. The bottom of the range is <b>0</b>, at the green
        point where the graph touches the axis (<M>{'x = \\cos\\left(\\tfrac{a}{b}\\right)'}</M>), not <M>a</M>. So the range is{' '}
        <M>[0,\ b\pi - a]</M>, option <b>B</b>. Now drag <M>a</M> past <M>{'\\tfrac{b\\pi}{2}'}</M> to see why the question
        needs that condition.
      </Notice>
    )
  }

  // Endpoint labels.
  const yRight = curve(1)
  const yLeft = curve(-1)
  const rightLabel =
    s <= 1 ? '(1, 0)' : s === 2 || unfolded ? '(1, −a)' : folded ? '(1, a)' : ''
  const rightAttach = s <= 1 ? 's' : s === 2 || unfolded ? 'sw' : 'nw'
  const leftLabel =
    s === 0 ? '(−1, π)' : s === 1 ? '(−1, bπ)' : crosses || s === 2 || unfolded ? '(−1, bπ − a)' : folded ? '(−1, a − bπ)' : ''
  const midLabel = s === 0 ? '(0, π/2)' : s === 1 ? '(0, bπ/2)' : ''
  // When the previous (dashed) curve runs above this one on the left, it would cut through the
  // left endpoint's label, so that label is dropped; the top of the band carries the value instead.
  const ghostAbove = ghost !== null && ghost(-0.7) > curve(-0.7) + 0.05
  // The top of the range, named at the right-hand end of its dashed line — only while the top is
  // the left endpoint (once the flipped end (1, a) is the top, its own label says so).
  const topLabel =
    s === 0 ? 'π' : s === 1 ? 'bπ' : s === 2 || unfolded || (folded && crosses && condition) ? 'bπ − a' : ''
  // The translation arrow (step 3 of the build): from the dilated curve down to the translated one.
  const xArrow = -0.45

  return (
    <div>
      <p className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
        Step {s + 1}: <span className="font-normal">{STEP_TITLES[s]}</span>
      </p>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={0.5} yStep={1} height={330} labels={false}>
        {/* The range: every height the graph reaches. */}
        {Number.isFinite(lo) && (
          <>
            <Polygon points={[[X0, lo], [X1, lo], [X1, hi], [X0, hi]]} color={C.good} fillOpacity={0.12} weight={0} strokeOpacity={0} />
            <Line.Segment point1={[X0, lo]} point2={[X1, lo]} color={C.good} style="dashed" weight={1.5} />
            <Line.Segment point1={[X0, hi]} point2={[X1, hi]} color={C.good} style="dashed" weight={1.5} />
            {topLabel && <Label at={[X1, hi]} color={C.good} attach="nw" size={12}>{topLabel}</Label>}
          </>
        )}
        {ghost && <Plot.OfX y={ghost} domain={[-1, 1]} color={C.guide} weight={2} style="dashed" />}
        {s === 2 && (
          <>
            <Vector tail={[xArrow, g1(xArrow)]} tip={[xArrow, g2(xArrow)]} color={C.guide} weight={2} />
            <Label at={[xArrow, g1(xArrow) - a / 2]} color={C.guide} attach="e" size={13}>−a</Label>
          </>
        )}
        <Plot.OfX y={curve} domain={[-1, 1]} color={C.f} weight={3} />
        <Point x={-1} y={yLeft} color={C.f} />
        <Point x={1} y={yRight} color={C.f} />
        {/* Above-right: the range's dashed top line runs level with this point, and the curve drops
            away steeply just to its right. */}
        {leftLabel && !ghostAbove && <Label at={[-1, yLeft]} color={C.f} attach="ne" size={12}>{leftLabel}</Label>}
        {rightLabel && <Label at={[1, yRight]} color={C.f} attach={rightAttach} size={12}>{rightLabel}</Label>}
        {midLabel && (
          <>
            <Point x={0} y={curve(0)} color={C.f} />
            <Label at={[0, curve(0)]} color={C.f} attach="sw" size={12}>{midLabel}</Label>
          </>
        )}
        {s >= 2 && crosses && (
          <>
            <Point x={xZero} y={0} color={s === 3 ? C.good : C.f} />
            {folded && <Label at={[xZero, 0]} color={C.good} attach="n" size={12}>0</Label>}
          </>
        )}
      </Plane>
      <Controls>
        <StepNav step={s} count={4} onBack={back} onNext={next} />
        {s >= 1 && (
          <Slider label="b" value={b} onChange={setB} min={0.5} max={2} step={0.05} format={v => num(v)} />
        )}
        {s >= 2 && (
          <Slider label="a" value={a} onChange={setA} min={0.1} max={3.5} step={0.05} format={v => num(v)} />
        )}
        {s === 3 && (
          <>
            <Slider
              label="\text{fold}"
              value={fold}
              onChange={v => {
                player.stop()
                setFold(v)
              }}
              min={0}
              max={1}
              step={0.01}
              format={v => `${Math.round(v * 100)}%`}
            />
            <Buttons>
              <PlayButton playing={player.playing} onClick={() => player.toggle(fold)} label="Fold" />
            </Buttons>
          </>
        )}
        <Readouts>
          <Readout
            color={C.good}
            tex={`\\text{range} ${rangeTex ? `= ${rangeTex}` : ''} \\approx [${tx(lo)},\\ ${tx(hi)}]${match ? `\\ \\text{(option ${match[0]})}` : ''}`}
          />
          {s >= 2 && (
            <Readout
              color={condition ? C.good : C.bad}
              tex={`a = ${tx(a)} ${condition ? '<' : '\\ge'} \\tfrac{b\\pi}{2} \\approx ${tx((b * PI) / 2)}\\ ${condition ? '\\checkmark' : '\\times'}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
