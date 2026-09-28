// 2017 Methods Exam 2 MCQ 8 — making x the subject must not move the graph. Every option is a
// rule "x = (something in y)", so each one draws a curve; a correct rearrangement of
// y = a^(b − 4x) + 2 draws exactly the same curve. Pick an option: A sits on top of the given
// graph for every a and b, while each wrong option is a different curve — B is the graph slid
// down 4 (asymptote y = −2, from moving the +2 across with the wrong sign), D is far too flat
// (only b divided by 4), E has its asymptote at y = 0 (the +2 pushed into the exponent), C is
// y = 4a^(b − x) − 2. Drag the point along the given curve: the chosen option sends its y back
// to its x only when the option is right. The asymptote y = 2 is why the log must hold y − 2.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, num,
} from './kit'

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'
const log = (base: number, v: number) => Math.log(v) / Math.log(base)

// Each option as x = g(y), its TeX, and the lowest y where it is defined.
const OPTS: Record<Opt, { g: (y: number, a: number, b: number) => number; tex: string; yMin: number }> = {
  A: { g: (y, a, b) => (b - log(a, y - 2)) / 4, tex: '\\tfrac14\\left(b-\\log_a(y-2)\\right)', yMin: 2 },
  B: { g: (y, a, b) => (b - log(a, y + 2)) / 4, tex: '\\tfrac14\\left(b-\\log_a(y+2)\\right)', yMin: -2 },
  C: { g: (y, a, b) => b - log(a, (y + 2) / 4), tex: 'b-\\log_a\\left(\\tfrac14(y+2)\\right)', yMin: -2 },
  D: { g: (y, a, b) => b / 4 - log(a, y - 2), tex: '\\tfrac{b}{4}-\\log_a(y-2)', yMin: 2 },
  E: { g: (y, a, b) => (b + 2 - log(a, y)) / 4, tex: '\\tfrac14\\left(b+2-\\log_a(y)\\right)', yMin: 0 },
}

const X0 = -1.5
const X1 = 3.5
const Y0 = -3
const Y1 = 11

export default function SameCurve() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(1)
  const [opt, setOpt] = useState<Opt>('B')
  const [x0Raw, setX0] = useState(0.25)

  const f = (x: number) => a ** (b - 4 * x) + 2
  // keep the draggable point on screen: y ≤ 10.5
  const xLo = (b - log(a, 8.5)) / 4
  const x0 = clamp(x0Raw, xLo, 3.3)
  const y0 = f(x0)
  const o = OPTS[opt]
  const xOpt = o.g(y0, a, b)
  const hit = Math.abs(xOpt - x0) < 0.005
  const optColor = opt === 'A' ? C.good : C.g

  let notice
  if (opt === 'A') {
    notice = (
      <Notice tone="good">
        <b>Option A lies exactly on the given curve</b>, whatever <M>a</M> and <M>b</M> are (try the sliders). Every point
        on the graph satisfies <M>{'x = \\tfrac14\\left(b-\\log_a(y-2)\\right)'}</M>, because each step of the rearrangement
        undid one operation without changing the points. It only exists for <M>{'y > 2'}</M>, the graph&apos;s asymptote.
      </Notice>
    )
  } else if (opt === 'B') {
    notice = (
      <Notice tone="warn">
        <b>Option B is the curve <M>{'y = a^{b-4x} - 2'}</M></b>: the given graph slid down 4, with asymptote{' '}
        <M>y = -2</M>. It comes from moving the <M>+2</M> across as <M>+2</M>. Quick check: the given graph never reaches{' '}
        <M>y = 2</M>, so a correct formula for <M>x</M> must break down at <M>y = 2</M>, which means{' '}
        <M>\log_a(y-2)</M>. Now try option A.
      </Notice>
    )
  } else if (opt === 'C') {
    notice = (
      <Notice tone="warn">
        <b>Option C is the curve <M>{'y = 4a^{\\,b-x} - 2'}</M></b>: wrong asymptote and wrong steepness. Both the{' '}
        <M>+2</M> and the <M>\div 4</M> were undone in the wrong place. Drag the point: C sends <M>{'y_0'}</M> to a
        different <M>x</M>.
      </Notice>
    )
  } else if (opt === 'D') {
    notice = (
      <Notice tone="warn">
        <b>Option D is the curve <M>{'y = a^{\\,b/4 - x} + 2'}</M></b>: the right asymptote, but far too flat, because
        only <M>b</M> was divided by 4. From <M>{'4x = b - \\log_a(y-2)'}</M> the whole right side must be divided by 4,
        log term included.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Option E is the curve <M>{'y = a^{\\,b+2-4x}'}</M></b>: the <M>+2</M> has been pushed into the power, as if
        the rule were <M>{'a^{\\,b-4x+2}'}</M>. Its asymptote is <M>y = 0</M>, not <M>y = 2</M>. The <M>+2</M> is added
        after the power, so it has to come off first.
      </Notice>
    )
  }

  const t0 = o.yMin + 1e-4
  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={1} yStep={2} height={320}>
        <Line.Segment point1={[X0, 2]} point2={[X1, 2]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[X1, 2]} color={C.guide} attach="nw">y = 2</Label>
        {o.yMin !== 2 && (
          <>
            <Line.Segment point1={[X0, o.yMin]} point2={[X1, o.yMin]} color={optColor} style="dashed" weight={1.5} />
            <Label at={[X0, o.yMin]} color={optColor} attach="ne">{`y = ${num(o.yMin, 0)}`}</Label>
          </>
        )}
        <Plot.OfX y={f} domain={[X0, X1]} color={C.f} weight={5} />
        <Plot.Parametric
          xy={t => [o.g(t, a, b), t]}
          domain={[t0, Y1 + 1]}
          color={optColor}
          weight={3}
          style={opt === 'A' ? 'dashed' : 'solid'}
        />
        {!hit && Number.isFinite(xOpt) && (
          <>
            <Line.Segment point1={[x0, y0]} point2={[clamp(xOpt, X0 - 1, X1 + 1), y0]} color={C.bad} style="dashed" weight={1.5} />
            <Point x={xOpt} y={y0} color={C.g} />
          </>
        )}
        <MovablePoint
          point={[x0, y0]}
          color={hit ? C.good : C.f}
          constrain={([x]) => {
            const xc = clamp(x, xLo, 3.3)
            return [xc, f(xc)]
          }}
          onMove={([x]) => setX0(clamp(x, xLo, 3.3))}
        />
      </Plane>
      <Controls>
        <Buttons>
          {(['A', 'B', 'C', 'D', 'E'] as Opt[]).map(k => (
            <Toggle key={k} label={`Option ${k}`} checked={opt === k} onChange={() => setOpt(k)} />
          ))}
        </Buttons>
        <Slider label="a" value={a} onChange={v => setA(v)} min={1.2} max={4} step={0.1} format={v => v.toFixed(1)} />
        <Slider label="b" value={b} onChange={v => setB(v)} min={0} max={4} step={0.5} format={v => v.toFixed(1)} />
        <Readouts>
          <Readout color={C.f} tex={`y = ${+a.toFixed(1)}^{\\,${+b.toFixed(1)}-4x}+2`} />
          <Readout color={optColor} tex={`\\text{option ${opt}: } x = ${o.tex}`} />
        </Readouts>
        <Readouts>
          <Readout tex={`\\text{point: } (x_0, y_0) = (${x0.toFixed(2)},\\ ${y0.toFixed(2)})`} />
          <Readout
            color={hit ? C.good : C.bad}
            tex={`\\text{option ${opt} at } y_0\\text{: } x =${Number.isFinite(xOpt) ? xOpt.toFixed(2) : '\\text{undefined}'}${hit ? '\\ \\checkmark' : ''}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
