// 2018 Specialist Exam 1 Q8b — why the "+ c" matters, and how to check an answer against the DE.
// The grey marks are the direction field of dQ/dt = −3Q/(16 + 2t). Drag the start point on the
// Q-axis: the blue curve Q = A/(16 + 2t)^{3/2} with A = 64 Q(0) (since 16^{3/2} = 64) follows every
// mark whatever the start, so the constant is what picks one curve from the family, and
// Q(0) = 0.5 picks A = 32. Two toggles draw a wrong answer in red:
//   - leave out the + c (report: "the arbitrary constant of integration frequently missing"):
//     Q = (16 + 2t)^{-3/2} follows the marks but starts at 1/64 kg, with nothing left to adjust;
//   - forget the ½ from ∫ 1/(16 + 2t) dt: Q = 2048/(16 + 2t)^3 starts at 0.5 but falls twice as
//     steeply as the DE demands everywhere (checked with sympy: its slope ÷ (−3Q/(16+2t)) = 2).

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, num,
} from './kit'

const T_MAX = 30
const curve = (A: number) => (t: number) => A / Math.pow(16 + 2 * t, 1.5)
const noC = curve(1)
const power3 = (t: number) => 2048 / Math.pow(16 + 2 * t, 3)
const slope = (t: number, Q: number) => (-3 * Q) / (16 + 2 * t)

// Direction-field marks, each about 13 px long for a plane ~640 px wide and 320 px high
// (≈ 21 px per minute across, ≈ 500 px per kg up). Narrower screens only shorten them a little.
const SX = 21
const SY = 500
const HALF = 6.5
const FIELD: [[number, number], [number, number]][] = []
for (let t = 3.75; t < T_MAX; t += 2.5) {
  for (let Q = 0.05; Q < 0.58; Q += 0.05) {
    const m = slope(t, Q)
    const dt = HALF / Math.hypot(SX, m * SY)
    FIELD.push([
      [t - dt, Q - m * dt],
      [t + dt, Q + m * dt],
    ])
  }
}

type Wrong = 'none' | 'noC' | 'half'

export default function FamilyWidget() {
  const [q0, setQ0] = useState(0.5)
  const [wrong, setWrong] = useState<Wrong>('none')

  const A = 64 * q0
  const aTex = String(parseFloat(A.toFixed(2)))
  const atHalf = Math.abs(q0 - 0.5) < 0.005
  const setStart = (v: number) => setQ0(Math.round(clamp(v, 0.05, 0.58) * 100) / 100)

  let notice
  if (wrong === 'noC') {
    notice = (
      <Notice tone="warn">
        Leave out the <M>+c</M> and you get <M>{'Q = (16 + 2t)^{-3/2}'}</M>, the red curve. It does follow the grey marks,
        so it solves the DE, but it starts at <M>{'\\tfrac{1}{64} \\approx 0.016'}</M> kg, not 0.5 kg, and there is nothing
        left to adjust. The constant is what lets the curve move up to the right start.
      </Notice>
    )
  } else if (wrong === 'half') {
    notice = (
      <Notice tone="warn">
        Forgetting the <M>{'\\tfrac12'}</M> from the chain rule gives <M>{'Q = \\tfrac{2048}{(16 + 2t)^3}'}</M>, the red
        curve. It starts at the right place, <M>{'\\tfrac{2048}{16^3} = 0.5'}</M>, so checking <M>Q(0)</M> won&apos;t catch
        it. Look at the grey marks instead: the red curve cuts across them, falling twice as steeply as the DE says.
        Check the slope at <M>t = 0</M>: the DE demands <M>{'-\\tfrac{3(0.5)}{16} = -\\tfrac{3}{32}'}</M>, and this curve
        has <M>{'-\\tfrac{3}{16}'}</M>.
      </Notice>
    )
  } else if (atHalf) {
    notice = (
      <Notice tone="good">
        Each grey mark shows the slope <M>{'\\tfrac{dQ}{dt} = -\\tfrac{3Q}{16 + 2t}'}</M> at that point. The blue curve
        follows every one of them, and so would a curve starting anywhere on the <M>Q</M>-axis: that whole family is{' '}
        <M>{'Q = \\tfrac{A}{(16 + 2t)^{3/2}}'}</M>, with <M>A = e^c</M> from the <M>+c</M>. Starting with 0.5 kg picks{' '}
        <M>A = 64 \times 0.5 = 32</M>. Drag the start point, then try the two toggles.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        This curve starts with <M>{num(q0)}</M> kg and still follows every grey mark, so it solves the same DE: only the
        constant has changed, to <M>{`A = 64 \\times ${num(q0)} = ${aTex}`}</M>. The DE alone can&apos;t tell these
        curves apart; the initial condition, 0.5 kg at <M>t = 0</M>, is what picks <M>A = 32</M>. Drag back to 0.5.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.5, T_MAX]} y={[0, 0.62]} xStep={5} yStep={0.1} height={320} xLabel="t" yLabel="Q" yLabels={v => num(v, 1)}>
        {FIELD.map(([p, q], i) =>
          // clear the bottom row of marks under the "no + c" label while it is showing
          wrong === 'noC' && p[1] < 0.08 && p[0] < 17 ? null : (
            <Line.Segment key={i} point1={p} point2={q} color={C.guide} weight={1.5} />
          ),
        )}
        {wrong === 'noC' && (
          <>
            <Plot.OfX y={noC} domain={[0, T_MAX]} color={C.bad} weight={3} style="dashed" />
            <Point x={0} y={1 / 64} color={C.bad} />
            <Label at={[4, 0.03]} color={C.bad} attach="ne">no + c: starts at 1/64</Label>
          </>
        )}
        {wrong === 'half' && (
          <>
            <Plot.OfX y={power3} domain={[0, T_MAX]} color={C.bad} weight={3} style="dashed" />
            <Label at={[7, power3(7)]} color={C.bad} attach="sw">power 3</Label>
          </>
        )}
        <Plot.OfX y={curve(A)} domain={[0, T_MAX]} color={C.f} weight={3} />
        <Label at={[18, curve(A)(18)]} color={C.f} attach="ne">{`A = ${aTex}`}</Label>
        <MovablePoint point={[0, q0]} onMove={([, y]) => setStart(y)} constrain={([, y]) => [0, clamp(y, 0.05, 0.58)]} color={C.f} />
      </Plane>
      <Controls>
        <Slider label="Q(0)" value={q0} onChange={setStart} min={0.05} max={0.58} step={0.01} format={v => `${v.toFixed(2)} kg`} />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] text-gray-500 dark:text-gray-400">Show a wrong answer:</span>
          <Toggle label="Leave out the + c" checked={wrong === 'noC'} onChange={v => setWrong(v ? 'noC' : 'none')} />
          <Toggle label="Forget the ½ (power 3)" checked={wrong === 'half'} onChange={v => setWrong(v ? 'half' : 'none')} />
        </div>
        <Readouts>
          <Readout color={C.f} tex={`Q(0) = \\tfrac{A}{16^{3/2}} = \\tfrac{A}{64} \\Rightarrow A = ${aTex}`} />
          <Readout color={atHalf ? C.good : C.f} tex={`Q = \\dfrac{${aTex}}{(16 + 2t)^{3/2}}${atHalf ? '\\ \\checkmark' : ''}`} />
          <Readout tex={`\\left.\\tfrac{dQ}{dt}\\right|_{t=0} = -\\tfrac{3Q(0)}{16} = ${num(slope(0, q0), 4)}`} />
          {wrong === 'noC' && <Readout color={C.bad} tex={`\\text{no }{+c}:\\ Q(0) = \\tfrac{1}{64} \\approx 0.016`} />}
          {wrong === 'half' && <Readout color={C.bad} tex={`\\text{power 3: slope at } t = 0 \\text{ is } -\\tfrac{3}{16} = -0.1875`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
