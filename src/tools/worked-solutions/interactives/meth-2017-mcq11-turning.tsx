// 2017 Methods Exam 2 MCQ 11 — f(x) = x³ + ax² + bx on top, its derivative f′(x) = 3x² + 2ax + b
// underneath, with the wanted turning points x = −1 and x = 3 as dashed guides. The turning points of
// f are where the parabola f′ crosses zero, so the two conditions are f′(−1) = 0 and f′(3) = 0, and
// f′ must be 3(x + 1)(x − 3): a = −3, b = −9 (option D). Buttons load each option: A (a = −2, b = −3)
// is what setting f(−1) = f(3) = 0 gives — the graph cuts the axis there but turns elsewhere; C has
// the turning points at −3 and 1 (factor signs flipped); B and E get the maximum at −1 only.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider,
  clamp, num,
} from './kit'

const OPTIONS: { letter: string; a: number; b: number }[] = [
  { letter: 'A', a: -2, b: -3 },
  { letter: 'B', a: 2, b: 1 },
  { letter: 'C', a: 3, b: -9 },
  { letter: 'D', a: -3, b: -9 },
  { letter: 'E', a: -6, b: -15 },
]
const X: [number, number] = [-4, 6]
const FY: [number, number] = [-30, 30]
const DY: [number, number] = [-15, 25]
const inside = (v: number, r: [number, number]) => v >= r[0] && v <= r[1]
const term = (c: number, s: string) => (c === 0 ? '' : `${c < 0 ? '-' : '+'}${Math.abs(c) === 1 && s ? '' : Math.abs(c)}${s}`)

export default function TurningPoints() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(-3)

  const f = (x: number) => x ** 3 + a * x * x + b * x
  const fp = (x: number) => 3 * x * x + 2 * a * x + b
  const disc = 4 * a * a - 12 * b
  const turns = disc > 1e-9
  const r1 = (-2 * a - Math.sqrt(Math.max(disc, 0))) / 6 // f′ goes + to −: local max
  const r2 = (-2 * a + Math.sqrt(Math.max(disc, 0))) / 6 // f′ goes − to +: local min
  const maxOK = turns && Math.abs(r1 + 1) < 1e-9
  const minOK = turns && Math.abs(r2 - 3) < 1e-9
  const is = (A: number, B: number) => a === A && b === B
  // Label f at the right-most place where its graph is comfortably on the grid.
  let fLabelX = 0
  for (let x = 5.6; x > -3.6; x -= 0.1) {
    if (Math.abs(f(x)) < 24) {
      fLabelX = x
      break
    }
  }
  let fpLabelX = 0
  for (let x = 5.6; x > -3.6; x -= 0.1) {
    if (fp(x) > DY[0] + 3 && fp(x) < DY[1] - 3) {
      fpLabelX = x
      break
    }
  }

  let notice
  if (maxOK && minOK) {
    notice = (
      <Notice tone="good">
        <M>{"f'(x) = 3x^2 - 6x - 9 = 3(x+1)(x-3)"}</M> crosses zero exactly on both dashed lines. It goes{' '}
        <b>+ then − then +</b>, so <M>f</M> rises, turns down at <M>x = -1</M> (max) and turns up at <M>x = 3</M> (min).
        That is <M>a = -3</M>, <M>b = -9</M>: option D.
      </Notice>
    )
  } else if (is(-2, -3)) {
    notice = (
      <Notice tone="warn">
        Option A comes from setting <M>f(-1) = 0</M> and <M>f(3) = 0</M>. Look at the blue graph: it <b>cuts the x-axis</b> at{' '}
        <M>-1</M> and <M>3</M>, but its turning points are at <M>x \approx {num(r1)}</M> and <M>x \approx {num(r2)}</M>, where{' '}
        <M>{"f'"}</M> is zero. A turning point is where the gradient is zero, not the height.
      </Notice>
    )
  } else if (is(3, -9)) {
    notice = (
      <Notice tone="warn">
        Option C puts the max at <M>x = -3</M> and the min at <M>x = 1</M> — the mirror image. Its derivative is{' '}
        <M>{"3(x-1)(x+3)"}</M>: the signs inside the factors are flipped. A zero at <M>x = -1</M> needs the factor{' '}
        <M>(x + 1)</M>.
      </Notice>
    )
  } else if (maxOK) {
    notice = (
      <Notice>
        <M>{"f'(-1) = 0"}</M> holds, so the max at <M>x = -1</M> is right, but the min is at <M>x \approx {num(r2)}</M>, not{' '}
        <M>3</M>. One condition gives one equation, and there are two unknowns. Change <M>a</M> and <M>b</M> until the
        orange parabola crosses zero on <b>both</b> dashed lines.
      </Notice>
    )
  } else if (!turns) {
    notice = (
      <Notice>
        Here <M>{"f'(x)"}</M> never goes below zero, so <M>f</M> never turns — no max, no min. Make <M>b</M> more negative to
        pull the parabola down through the axis.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The turning points of <M>f</M> sit directly above the places where the orange parabola <M>{"f'"}</M> crosses zero.
        Move <M>a</M> and <M>b</M> until those crossings land on the dashed lines at <M>x = -1</M> and <M>x = 3</M>.
      </Notice>
    )
  }

  const guides = (range: [number, number]) => (
    <>
      <Line.Segment point1={[-1, range[0]]} point2={[-1, range[1]]} color={C.guide} style="dashed" weight={1.5} />
      <Line.Segment point1={[3, range[0]]} point2={[3, range[1]]} color={C.guide} style="dashed" weight={1.5} />
    </>
  )

  return (
    <div>
      <Plane x={X} y={FY} xStep={1} yStep={10} height={250}>
        {guides(FY)}
        <Label at={[-1, FY[1]]} attach="sw" color={C.guide}>max here</Label>
        <Label at={[3, FY[1]]} attach="sw" color={C.guide}>min here</Label>
        <Plot.OfX y={f} domain={X} color={C.f} weight={3} />
        {turns && inside(f(r1), FY) && (
          <>
            <Point x={r1} y={f(r1)} color={maxOK ? C.good : C.violet} />
            <Label at={[r1, f(r1)]} attach="n" color={maxOK ? C.good : C.violet}>max</Label>
          </>
        )}
        {turns && inside(f(r2), FY) && (
          <>
            <Point x={r2} y={f(r2)} color={minOK ? C.good : C.violet} />
            <Label at={[r2, f(r2)]} attach="s" color={minOK ? C.good : C.violet}>min</Label>
          </>
        )}
        <Label at={[fLabelX, f(fLabelX)]} attach="e" gap={10} color={C.f}>f</Label>
      </Plane>
      <div className="mt-3">
        <Plane x={X} y={DY} xStep={1} yStep={10} height={170} yLabel="">
          <Region top={x => clamp(fp(x), 0, DY[1])} bottom={() => 0} from={X[0]} to={X[1]} color={C.good} opacity={0.15} />
          <Region top={() => 0} bottom={x => clamp(fp(x), DY[0], 0)} from={X[0]} to={X[1]} color={C.bad} opacity={0.15} />
          {guides(DY)}
          <Plot.OfX y={fp} domain={X} color={C.g} weight={3} />
          {turns && <Point x={r1} y={0} color={maxOK ? C.good : C.violet} />}
          {turns && <Point x={r2} y={0} color={minOK ? C.good : C.violet} />}
          <Label at={[fpLabelX, fp(fpLabelX)]} attach="e" gap={10} color={C.g}>f′</Label>
        </Plane>
      </div>
      <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
        Lower graph: <span className="font-semibold text-emerald-600 dark:text-emerald-400">green</span> where f′ &gt; 0
        (f rising), <span className="font-semibold text-red-500 dark:text-red-400">red</span> where f′ &lt; 0 (f falling).
      </p>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-7} max={4} step={1} format={v => String(v)} />
        <Slider label="b" value={b} onChange={setB} min={-16} max={4} step={1} format={v => String(v)} />
        <Buttons>
          {OPTIONS.map(o => (
            <ActionButton
              key={o.letter}
              label={`${o.letter}: ${o.a}, ${o.b}`.replace(/-/g, '−')}
              onClick={() => {
                setA(o.a)
                setB(o.b)
              }}
            />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`f'(x)=3x^2${term(2 * a, 'x')}${term(b, '')}`} />
          <Readout
            color={C.violet}
            tex={turns ? `\\text{max at } x\\approx${num(r1)},\\ \\text{min at } x\\approx${num(r2)}` : '\\text{no turning points}'}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
