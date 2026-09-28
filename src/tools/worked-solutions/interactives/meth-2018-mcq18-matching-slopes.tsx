// 2018 Methods Exam 2 MCQ 18 — where can f(x) = x^r and g(x) = x^s (r < s) have equal gradients?
// Top plane: both curves, with tangents drawn at a movable x; the green line marks the one point
// c = (r/s)^(1/(s−r)) where the tangents are parallel, always inside (0, 1) (option D true).
// Lower plane: the gradient graphs f′ and g′, which cross exactly once, at c, and never again, so
// beyond x = 1 g is always steeper (option E false). Sliders for r and s (in twelfths, so the
// examples x^(1/3), x^(1/2) for option A and x^(1/2), x^(3/2) for option B are reachable); if r ≥ s
// the question's condition fails and a warning says so. Starts at r = 1/2, s = 2, x = 1.4.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const parts = (v: number) => {
  const k = Math.round(v * 12)
  const g = gcd(k, 12)
  return [k / g, 12 / g] as const
}
const fracTex = (v: number) => {
  const [n, d] = parts(v)
  return d === 1 ? String(n) : `\\tfrac{${n}}{${d}}`
}
const fracText = (v: number) => {
  const [n, d] = parts(v)
  return d === 1 ? String(n) : `${n}/${d}`
}

export default function MatchingSlopes() {
  const [r, setR] = useState(0.5)
  const [s, setS] = useState(2)
  const [x0, setX0] = useState(1.4)

  const f = (x: number) => x ** r
  const g = (x: number) => x ** s
  const df = (x: number) => r * x ** (r - 1)
  const dg = (x: number) => s * x ** (s - 1)
  const valid = r < s - 1e-9
  const c = valid ? (r / s) ** (1 / (s - r)) : NaN
  const atC = valid && Math.abs(x0 - c) < 0.012
  const ratio = dg(x0) / df(x0)

  const xg = Math.min(1.9, 2.6 ** (1 / s))
  const gLabLow = dg(1.9) <= 3.6
  const gLab: [number, number] = gLabLow ? [1.9, dg(1.9)] : [(3.4 / s) ** (1 / (s - 1)), 3.4]

  let notice
  if (!valid) {
    notice = (
      <Notice tone="warn">
        With <M>{'r \\ge s'}</M>, <M>f</M> is no longer the one on top in <M>{'(0,1)'}</M>. The question&apos;s sign
        pattern forces the <b>smaller</b> power onto <M>f</M>: <M>{'r < s'}</M>. Move <M>r</M> below <M>s</M>.
      </Notice>
    )
  } else if (atC) {
    notice = (
      <Notice tone="good">
        At <M>{`x = c \\approx ${c.toFixed(3)}`}</M> the two tangents are <b>parallel</b>: <M>{"f'(c) = g'(c)"}</M>. This
        is the widest point of the gap between the curves: <M>f</M>&apos;s lead stops growing and starts shrinking. It
        lies in <M>{'(0,1)'}</M>, so option D is true. Change <M>r</M> and <M>s</M>: the green line moves, but never past{' '}
        <M>{'x = 1'}</M>.
      </Notice>
    )
  } else if (x0 < c) {
    notice = (
      <Notice>
        Left of <M>c</M>, <b><M>f</M> is steeper</b> (blue tangent steeper than orange), so <M>f</M>&apos;s lead over{' '}
        <M>g</M> is still growing. Slide <M>x</M> right, or press &ldquo;Jump to c&rdquo;, to find where the tangents
        become parallel.
      </Notice>
    )
  } else if (x0 <= 1) {
    notice = (
      <Notice>
        Between <M>c</M> and <M>1</M>, <b><M>g</M> is steeper</b> even though <M>f</M> is still on top: <M>g</M> is catching
        up, and it draws level at <M>{'(1, 1)'}</M>. Being higher doesn&apos;t mean being steeper.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Beyond <M>{'x = 1'}</M>, <M>{"\\frac{g'(x)}{f'(x)} = \\frac{s}{r}\\,x^{s-r}"}</M>. Both factors are bigger than{' '}
        <M>1</M>, since <M>{'s > r'}</M> and <M>{'x > 1'}</M> raised to a positive power, so <b><M>g</M> is always
        steeper</b>. In the lower graph <M>{"g'"}</M> stays above <M>{"f'"}</M> for good. Try other <M>{'r < s'}</M>: the
        tangents never become parallel after <M>1</M>, which is why E must be false.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 2]} y={[0, 3]} xStep={0.5} yStep={1} height={280}>
        <Line.Segment point1={[1, 0]} point2={[1, 3]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[1, 2.8]} color={C.guide} attach="e">x = 1</Label>
        {valid && <Line.Segment point1={[c, 0]} point2={[c, 3]} color={C.good} style="dashed" weight={1.5} />}
        {valid && <Label at={[c, 0]} color={C.good} attach="ne">c</Label>}
        <Plot.OfX y={f} domain={[0, 2]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[0, 2]} color={C.g} weight={3} />
        <Line.PointSlope point={[x0, f(x0)]} slope={df(x0)} color={C.f} weight={1.5} style="dashed" />
        <Line.PointSlope point={[x0, g(x0)]} slope={dg(x0)} color={C.g} weight={1.5} style="dashed" />
        <Point x={x0} y={f(x0)} color={C.f} />
        <Point x={x0} y={g(x0)} color={C.g} />
        <Label at={[1.85, f(1.85)]} color={C.f} attach="se">f</Label>
        <Label at={[xg, g(xg)]} color={C.g} attach="w">g</Label>
      </Plane>
      <div className="mt-4">
      <Plane x={[0, 2]} y={[-0.5, 4]} xStep={0.5} yStep={1} height={190} yLabel="">
        <Line.Segment point1={[1, 0]} point2={[1, 4]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[x0, 0]} point2={[x0, 4]} color={C.ink} style="dashed" weight={1} />
        <Plot.OfX y={df} domain={[0.005, 2]} color={C.f} weight={2.5} />
        <Plot.OfX y={dg} domain={[0.005, 2]} color={C.g} weight={2.5} />
        {valid && <Point x={c} y={df(c)} color={C.good} />}
        <Point x={x0} y={df(x0)} color={C.f} />
        <Point x={x0} y={dg(x0)} color={C.g} />
        <Label at={[1.6, df(1.6)]} color={C.f} attach="n">f′</Label>
        <Label at={[0.12, 3.7]} color={C.ink} attach="e">gradients</Label>
        <Label at={gLab} color={C.g} attach={gLabLow ? 'n' : 'w'}>g′</Label>
      </Plane>
      </div>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={0.05} max={2} step={0.01} />
        <Slider label="r" value={r} onChange={setR} min={1 / 6} max={3} step={1 / 12} format={fracText} />
        <Slider label="s" value={s} onChange={setS} min={1 / 6} max={3} step={1 / 12} format={fracText} />
        <Buttons>
          {valid && <ActionButton label="Jump to c" onClick={() => setX0(c)} />}
          <ActionButton
            label={<>A: <M>{'x^{1/3},\\ x^{1/2}'}</M></>}
            onClick={() => {
              setR(1 / 3)
              setS(1 / 2)
            }}
          />
          <ActionButton
            label={<>B: <M>{'x^{1/2},\\ x^{3/2}'}</M></>}
            onClick={() => {
              setR(1 / 2)
              setS(3 / 2)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`f(x) = x^{${fracTex(r)}},\\ f'(${x0.toFixed(2)}) \\approx ${df(x0).toFixed(3)}`} />
          <Readout color={C.g} tex={`g(x) = x^{${fracTex(s)}},\\ g'(${x0.toFixed(2)}) \\approx ${dg(x0).toFixed(3)}`} />
          <Readout color={atC ? C.good : undefined} tex={`\\frac{g'}{f'} \\approx ${ratio.toFixed(3)}`} />
          {valid && <Readout color={C.good} tex={`c = \\left(\\tfrac{r}{s}\\right)^{\\frac{1}{s-r}} \\approx ${c.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
