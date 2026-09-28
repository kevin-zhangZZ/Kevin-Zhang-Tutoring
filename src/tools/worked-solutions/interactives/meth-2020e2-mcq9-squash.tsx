// 2020 Methods Exam 2 MCQ 9 — why ∫₀² f(2(x + 2)) dx is half of ∫₄⁸ f(x) dx, whatever f is. The
// question never says what f is, so the widget draws one possible f with area 5 between x = 4 and
// x = 8 (three to choose from, one dipping below the axis) and transforms it into y = f(a(x + b)).
// The a slider squashes the graph towards the y-axis by factor 1/a: every point keeps its height
// (P at x = 6 slides to x = 6/a), every strip's width is divided by a, so the area becomes 5/a. The
// b slider then moves it b units left without changing the area. At a = 2, b = 2 the region sits on
// [0, 2], exactly the question's limits, with area 5/2 (option E) — the report's route, played by
// "Squash, then slide". A toggle shows the popular wrong idea (option B, 17%): if the 2 stretched
// the graph, the region would be y = f(x/2) on [8, 16] with area 10 — not the question's function,
// and not its interval. Every area readout is integrated numerically from the curve drawn (the
// three shapes were checked in scipy: each gives 5, 5/2 and 10).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider,
  Toggle, integrate, num, usePlayer,
} from './kit'

interface Shape {
  f: (x: number) => number
  /** Where this f is drawn (before transforming). */
  dom: [number, number]
  dips: boolean
}
// Each has ∫₄⁸ f(x) dx = 5 exactly: a constant 1.25 plus a whole period of a sine, or a hump.
const SHAPES: Shape[] = [
  { f: x => 1.25 + 0.8 * Math.sin((Math.PI * (x - 4)) / 2), dom: [2.6, 9.4], dips: false },
  { f: x => (15 / 92) * (x - 3) * (9 - x), dom: [3, 9], dips: false },
  { f: x => 1.25 + 2 * Math.sin((Math.PI * (x - 4)) / 2), dom: [2.6, 9.4], dips: true },
]

const X_NEAR: [number, number] = [-1, 10]
const X_WIDE: [number, number] = [-1, 17]
const Y: [number, number] = [-1, 3.5]
const X_P = 6 // the point we follow

/** "2", "1.5", "1.37" (mid-animation) — with a real minus sign. */
const d = (v: number) => {
  const r = Math.round(v * 100) / 100
  return (Object.is(r, -0) ? 0 : r).toString().replace('-', '−')
}
const t = (v: number) => d(v).replace('−', '-')
const is = (v: number, w: number) => Math.abs(v - w) < 1e-6
/** Up to 2 dp without trailing zeros, for TeX ("4", "1.33", "-0.5"); `exact` says no rounding happened. */
const sh = (v: number) => {
  const r = Math.round(v * 100) / 100
  return String(Object.is(r, -0) ? 0 : r)
}
const exact = (v: number) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-6

/** The rule y = f(a(x + b)) as TeX, written the way the question writes it. */
function rule(a: number, b: number): string {
  const inner = is(b, 0) ? 'x' : b > 0 ? `x + ${t(b)}` : `x - ${t(-b)}`
  if (is(a, 1)) return `y = f(${inner})`
  if (is(b, 0)) return `y = f(${t(a)}x)`
  return `y = f\\big(${t(a)}(${inner})\\big)`
}

export default function Squash() {
  const [shape, setShape] = useState(0)
  const [a, setA] = useState(1)
  const [b, setB] = useState(0)
  const [stretch, setStretch] = useState(false)
  // "Squash, then slide": s runs 0 → 2; a goes 1 → 2 over the first half, then b goes 0 → 2.
  const [s, setS] = useState(0)
  const [anim, setAnim] = useState(false)
  const player = usePlayer(setS, { min: 0, max: 2, seconds: 7 })

  const A = anim ? 1 + Math.min(1, s) : a
  const B = anim ? 2 * Math.max(0, s - 1) : b
  const { f, dom, dips } = SHAPES[shape]
  const g = (x: number) => f(A * (x + B)) // the transformed function
  const lo = 4 / A - B
  const hi = 8 / A - B
  const area = integrate(g, lo, hi, 400)
  const xP = X_P / A - B
  const yP = f(X_P)

  const grab = () => {
    player.stop()
    if (anim) {
      setA(Math.round(A * 10) / 10)
      setB(Math.round(B * 10) / 10)
      setAnim(false)
    }
  }
  const play = () => {
    if (!player.playing) {
      // Start from y = f(x) unless resuming a paused run.
      if (!anim || s >= 2 - 1e-9) setS(0)
      setAnim(true)
      setStretch(false)
    }
    player.toggle(0)
  }

  const aIs2 = is(A, 2)
  const done = aIs2 && is(B, 2)
  const X = stretch ? X_WIDE : X_NEAR

  let notice
  if (stretch) {
    notice = (
      <Notice tone="warn">
        <b>If the 2 stretched the graph</b>, the region would spread over <M>[8, 16]</M> and the area would double to 10, option B. That
        red curve is <M>y = f(x/2)</M>, not <M>f(2x)</M>. With <M>f(2x)</M> the input reaches 8 when <M>x</M> is only 4: the 2 makes the
        graph get there <i>sooner</i>, so it is squeezed towards the <M>y</M>-axis. The question&apos;s own limits give it away too:{' '}
        <M>0</M> to <M>2</M> is a window of width 2, not 8.
      </Notice>
    )
  } else if (is(A, 1) && is(B, 0)) {
    notice = (
      <Notice>
        This is <b>one possible</b> graph of <M>y = f(x)</M>. The question never says what <M>f</M> is, only that the area under it from{' '}
        <M>x = 4</M> to <M>x = 8</M> is 5, so the answer can&apos;t depend on the shape. Press &ldquo;Squash, then slide&rdquo;, or drag{' '}
        <M>a</M> towards 2.
      </Notice>
    )
  } else if (done) {
    notice = (
      <Notice tone="good">
        <b><M>{'y = f\\big(2(x + 2)\\big)'}</M>: the region now sits on <M>[0, 2]</M></b>, exactly the limits in the question. Adding 2
        inside moved the squashed graph 2 units left, and moving a region doesn&apos;t change its area, so{' '}
        <M>{'\\int_0^2 f\\big(2(x+2)\\big)dx = \\tfrac52'}</M>. Option E. Press &ldquo;Try another <M>f</M>&rdquo;: any <M>f</M> with area
        5 on <M>[4, 8]</M> gives the same <M>\tfrac52</M>.
      </Notice>
    )
  } else if (aIs2 && is(B, 0)) {
    notice = (
      <Notice>
        <b><M>y = f(2x)</M>.</b> The inputs 4 to 8 are now reached when <M>x</M> is only 2 to 4, so the region has been squashed onto{' '}
        <M>[2, 4]</M>. P kept its height and moved from <M>x = 6</M> to <M>x = 3</M>. Same heights, half the width, so half the area:{' '}
        <M>{'\\int_2^4 f(2x)\\,dx = \\tfrac52'}</M>, the report&apos;s middle line. Now slide <M>b</M> to 2.
      </Notice>
    )
  } else if (aIs2) {
    notice = (
      <Notice>
        Adding <M>{t(B)}</M> inside moves the squashed region {B > 0 ? 'left' : 'right'} to <M>{`[${t(lo)}, ${t(hi)}]`}</M> without changing its
        shape, so its area stays <M>\tfrac52</M> wherever it goes. The question&apos;s integral runs from 0 to 2, and that is where{' '}
        <M>b = 2</M> puts it.
      </Notice>
    )
  } else if (is(B, 0)) {
    notice = (
      <Notice>
        <M>{`y = f(${t(A)}x)`}</M> reaches each input sooner: the input 8 now arrives at <M>{`x = 8 \\div ${t(A)} \\approx ${num(8 / A, 2)}`}</M>.
        Every point slides towards the <M>y</M>-axis and keeps its height (watch P), which is a dilation by factor{' '}
        <M>{`\\tfrac{1}{${t(A)}}`}</M> from the <M>y</M>-axis. Each strip keeps its height and its width is divided by {d(A)}, so the area
        is <M>{`5 \\div ${t(A)} \\approx ${num(5 / A, 2)}`}</M>. The question has a 2 here: slide <M>a</M> to 2.
      </Notice>
    )
  } else if (is(A, 1)) {
    notice = (
      <Notice>
        <M>{rule(1, B)}</M> is <M>y = f(x)</M> moved {Math.abs(B) === 1 ? '1 unit' : `${d(Math.abs(B))} units`}{' '}
        {B > 0 ? 'left' : 'right'}: a <M>+</M> inside moves the graph left. The region is now <M>{`[${t(lo)}, ${t(hi)}]`}</M> and its area
        is still 5. A translation never changes an area; only the squash (from <M>a</M>) can.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Only <M>a</M> changes the area: it is <M>{`5 \\div ${t(A)} \\approx ${num(5 / A, 2)}`}</M> wherever <M>b</M> puts the region. The
        question&apos;s function is <M>{'f\\big(2(x+2)\\big)'}</M>, so set <M>a = 2</M> and <M>b = 2</M>.
      </Notice>
    )
  }

  const gDom: [number, number] = [dom[0] / A - B, dom[1] / A - B]

  return (
    <div>
      {/* No y tick numbers: f is only one possible shape, so its heights mean nothing, and the squashed region sits on the
          y-axis where the numbers would be. */}
      <Plane x={X} y={Y} xStep={1} yStep={1} height={300} yLabels={false} xLabels={v => (v < X[0] || v >= X[1] || (stretch && v % 2 !== 0) ? '' : String(v))}>
        {/* The original region, always in grey, so the new one can be compared with it. */}
        <Region top={f} bottom={() => 0} from={4} to={8} color={C.guide} opacity={0.18} />
        <Plot.OfX y={f} domain={dom} color={C.guide} weight={1.5} style="dashed" />
        {stretch && (
          <>
            <Region top={x => f(x / 2)} bottom={() => 0} from={8} to={16} color={C.bad} opacity={0.18} />
            <Plot.OfX y={x => f(x / 2)} domain={[2 * dom[0], Math.min(2 * dom[1], X_WIDE[1])]} color={C.bad} weight={2.5} />
            <Label at={[14, 2.8]} color={C.bad} attach="c" size={12}>area 10?</Label>
          </>
        )}
        <Region top={g} bottom={() => 0} from={lo} to={hi} color={done ? C.good : C.f} opacity={0.3} />
        <Plot.OfX y={g} domain={gDom} color={done ? C.good : C.f} weight={3} />
        <Line.Segment point1={[lo, 0]} point2={[lo, g(lo)]} color={done ? C.good : C.f} weight={1.5} />
        <Line.Segment point1={[hi, 0]} point2={[hi, g(hi)]} color={done ? C.good : C.f} weight={1.5} />
        {/* P on the original and where it has gone: same height, moved sideways only. */}
        {!is(xP, X_P) && <Line.Segment point1={[X_P, yP]} point2={[xP, yP]} color={C.guide} style="dashed" weight={1.5} />}
        <Point x={X_P} y={yP} color={C.guide} />
        {!is(xP, X_P) && <Label at={[X_P, yP]} color={C.guide} attach="ne" size={12}>P</Label>}
        <Point x={xP} y={yP} color={done ? C.good : C.f} />
        <Label at={[xP, yP]} color={done ? C.good : C.f} attach="ne" size={12}>{is(xP, X_P) ? 'P' : 'P′'}</Label>
      </Plane>
      <Controls>
        <Slider
          label="a"
          value={A}
          onChange={v => {
            grab()
            setStretch(false)
            setA(v)
          }}
          min={1}
          max={3}
          step={0.1}
          format={d}
        />
        <Slider
          label="b"
          value={B}
          onChange={v => {
            grab()
            setStretch(false)
            setB(v)
          }}
          min={-1}
          max={3}
          step={0.1}
          format={d}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={play} label="Squash, then slide" />
          <ActionButton label={<>Try another <M>f</M></>} onClick={() => setShape(k => (k + 1) % SHAPES.length)} />
          <Toggle
            label="What if the 2 stretched it? (B)"
            checked={stretch}
            onChange={v => {
              player.stop()
              setStretch(v)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={done ? C.good : C.f} tex={rule(A, B)} />
          <Readout
            tex={`\\text{interval}\\ ${exact(lo) && exact(hi) ? '' : '\\approx'} [${sh(lo)},\\ ${sh(hi)}],\\ \\text{width}\\ ${exact(hi - lo) ? '' : '\\approx'} ${sh(hi - lo)}`}
          />
          <Readout
            color={done ? C.good : C.f}
            tex={`\\int_{${sh(lo)}}^{${sh(hi)}} y\\,dx \\approx ${num(area, 2)}${is(A, 1) ? '' : ` = 5 \\div ${t(A)}`}`}
          />
          {stretch && (
            <Readout
              color={C.bad}
              tex={`\\int_{8}^{16} f\\left(\\tfrac x2\\right)dx \\approx ${num(integrate(x => f(x / 2), 8, 16, 400), 2)}`}
            />
          )}
        </Readouts>
        {notice}
        {dips && (
          <p className="text-[12px] text-gray-500 dark:text-gray-400">
            This <M>f</M> dips below the axis near <M>x = 7</M>. The integral counts that part as negative, and the squash halves the negative
            part too, so the integral still divides by <M>a</M>.
          </p>
        )}
      </Controls>
    </div>
  )
}
