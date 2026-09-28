// 2018 Methods Exam 2 MCQ 5 — "stationary at x = −2" means the tangent at x = −2 is flat. Slide p
// in f(x) = x² + p/x: the tangent at x = −2 has gradient f'(−2) = −4 − p/4, and the turning point
// (where 2x³ = p, i.e. x = ∛(p/2)) slides along the curve. Only p = −16 puts it at x = −2. Option
// buttons show the slips: p = 16 (E, the lost minus sign) puts the turning point at x = +2, the
// mirror image; p = 8 (D) makes x = −2 an x-intercept (f(−2) = 0) instead of a stationary point.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const X0 = -2
const L = 2.2 // half-width of the drawn tangent segment

export default function FlatTangent() {
  const [p, setP] = useState(16)

  const f = (x: number) => x * x + p / x
  const y0 = f(X0)
  const m = -4 - p / 4
  const xs = p === 0 ? null : Math.cbrt(p / 2)
  const flat = p === -16

  let notice
  if (flat) {
    notice = (
      <Notice tone="good">
        <b>The tangent at <M>x = -2</M> is flat:</b> <M>{"f'(-2) = -4 - \\tfrac{-16}{4} = 0"}</M>. The turning point sits
        exactly at <M>x = -2</M>, a local minimum at <M>(-2, 12)</M>. No other value of <M>p</M> does this, because the
        gradient <M>{'-4 - \\tfrac{p}{4}'}</M> is zero for only one <M>p</M>.
      </Notice>
    )
  } else if (p === 16) {
    notice = (
      <Notice tone="warn">
        <b><M>p = 16</M> (option E)</b> puts the turning point at <M>x = +2</M>, the mirror image of where it should be.
        That is what losing the minus sign in <M>{"\\tfrac{d}{dx}\\left(p x^{-1}\\right) = -p x^{-2}"}</M> does. At{' '}
        <M>x = -2</M> the tangent has gradient <M>-8</M>, nowhere near flat. Try option A.
      </Notice>
    )
  } else if (p === 8) {
    notice = (
      <Notice tone="warn">
        <b><M>p = 8</M> (option D)</b> makes the curve <em>cross the x-axis</em> at <M>x = -2</M>:{' '}
        <M>{'f(-2) = 4 + \\tfrac{8}{-2} = 0'}</M>. That is an x-intercept, not a stationary point. The tangent there has
        gradient <M>-6</M>. &ldquo;Stationary&rdquo; is about <M>{"f'"}</M>, not <M>f</M>.
      </Notice>
    )
  } else if (p === 0) {
    notice = (
      <Notice>
        At <M>p = 0</M> the curve is just <M>y = x^2</M> with <M>x \ne 0</M>: its only turning point would be at the
        origin, which is excluded. Move <M>p</M> away from <M>0</M> and a turning point appears.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The dashed tangent at <M>x = -2</M> has gradient <M>{"f'(-2) = -4 - \\tfrac{p}{4}"}</M>. As <M>p</M> changes, the
        green turning point slides along: it is always where <M>{"f'(x) = 0"}</M>, i.e. <M>2x^3 = p</M>. Find the{' '}
        <M>p</M> that makes the tangent at <M>x = -2</M> flat, or try the option buttons.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-6, 5]} y={[-24, 36]} xStep={1} yStep={6} height={340}>
        <Plot.OfX y={f} domain={[-6, -0.04]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[0.04, 5]} color={C.f} weight={3} />
        <Line.Segment point1={[0, -24]} point2={[0, 36]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment
          point1={[X0 - L, y0 - L * m]}
          point2={[X0 + L, y0 + L * m]}
          color={flat ? C.good : C.g}
          style="dashed"
          weight={2.5}
        />
        <Point x={X0} y={y0} color={flat ? C.good : C.g} />
        {Math.abs(y0) < 33 && (
          <Label at={[X0, y0]} color={flat ? C.good : C.g} attach={m > 0 ? 'se' : 'sw'}>x = −2</Label>
        )}
        {xs !== null && !flat && Math.abs(f(xs)) < 34 && (
          <>
            <Point x={xs} y={f(xs)} color={C.good} />
            <Label at={[xs, f(xs)]} color={C.good} attach="s">turning point</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={-30} max={30} step={1} format={v => num(v, 0)} />
        <Buttons>
          <ActionButton label="A: p = −16" onClick={() => setP(-16)} />
          <ActionButton label="B: p = −8" onClick={() => setP(-8)} />
          <ActionButton label="D: p = 8" onClick={() => setP(8)} />
          <ActionButton label="E: p = 16" onClick={() => setP(16)} />
        </Buttons>
        <Readouts>
          <Readout color={flat ? C.good : C.g} tex={`f'(-2) = -4 - \\tfrac{${p}}{4} = ${num(m, 2)}`} />
          <Readout
            color={C.good}
            tex={xs === null ? '\\text{no turning point}' : `\\text{turning point at } x = \\sqrt[3]{\\tfrac{p}{2}} = ${num(xs, 2)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
