// 2021 Methods Exam 1 Q6c — the distribution of P̂ = X/5 for a sample of five visitors, X ~ Bi(5, ½).
// Each bar sits at a possible value of P̂ (0, 0.2, …, 1) with its count X underneath; the bars at
// or right of the dashed line P̂ = 0.8 are X = 4 and X = 5, giving 5/32 + 1/32 = 3/16. The two
// buttons for the report's common errors redraw it: p = 0.8 (a population where 80% are under 25,
// Pr = 2304/3125 ≈ 0.737) and n = 4 (P̂ moves in steps of 0.25 and 0.8 is not a possible value;
// only P̂ = 1 qualifies, 1/16). Probabilities checked with sympy.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Toggle } from './kit'

type Model = 'right' | 'p08' | 'n4'

function binom(n: number, k: number) {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}

const MODELS: Record<Model, { n: number; p: number; label: (k: number, pr: number) => string; tick: (v: number) => string }> = {
  right: { n: 5, p: 0.5, label: k => `${binom(5, k)}/32`, tick: v => (v === 0 || v === 1 ? String(v) : v.toFixed(1)) },
  p08: { n: 5, p: 0.8, label: (_k, pr) => pr.toFixed(pr < 0.01 ? 4 : 3), tick: v => (v === 0 || v === 1 ? String(v) : v.toFixed(1)) },
  n4: { n: 4, p: 0.5, label: k => `${binom(4, k)}/16`, tick: v => (v === 0 || v === 1 ? String(v) : v === 0.5 ? '0.5' : v.toFixed(2)) },
}

const HALF = 0.05
// Everything is drawn shifted right by S so the plane's y-axis (x = 0) is out of view and doesn't
// run through the P̂ = 0 bar's labels; no vertical grid lines (xStep 2) — the bars carry their own values.
const S = 0.3
const TOP = 0.56

export default function Phat() {
  const [model, setModel] = useState<Model>('right')
  const { n, p, label, tick } = MODELS[model]
  const bars = Array.from({ length: n + 1 }, (_, k) => {
    const pr = binom(n, k) * p ** k * (1 - p) ** (n - k)
    return { k, v: k / n, pr, inEvent: k / n >= 0.8 - 1e-9 }
  })
  const total = bars.filter(b => b.inEvent).reduce((s, b) => s + b.pr, 0)
  const hit = model === 'right' ? C.good : C.bad

  let notice
  if (model === 'right') {
    notice = (
      <Notice tone="good">
        A sample of five can only give six proportions: <M>{'\\hat P = \\tfrac X5'}</M> is <M>0, 0.2, \ldots, 1</M>, each
        directly above its count <M>X</M>. The bar heights come from <M>{'p = \\tfrac12'}</M>, the proportion of
        <i> all</i> visitors under 25, which is why the picture is symmetric. <M>{'\\hat P \\ge 0.8'}</M> picks out the two
        bars at <M>X = 4</M> and <M>X = 5</M>, including 0.8 itself. Now try the two common errors.
      </Notice>
    )
  } else if (model === 'p08') {
    notice = (
      <Notice tone="warn">
        With <M>p = 0.8</M> every bar changes: this is a site where 80% of visitors are under 25, not this one, so of
        course <M>{'\\hat P \\ge 0.8'}</M> becomes likely. In the question, 0.8 is a <b>value of <M>{'\\hat P'}</M></b>, a
        place on the horizontal axis, not the chance that one visitor is under 25. That chance comes from the population:
        half, so <M>{'p = \\tfrac12'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>n</M> is the number of visitors in the sample: five. With <M>n = 4</M>, <M>{'\\hat P'}</M> moves in steps of
        0.25 and 0.8 isn&apos;t even a possible value, so only <M>{'\\hat P = 1'}</M> would count. The 4 belongs
        somewhere else: <M>0.8 \times 5 = 4</M> is the count <M>X</M>, the step from <M>{'\\hat P \\ge 0.8'}</M> to{' '}
        <M>X \ge 4</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[S - 0.1, S + 1.1]} y={[-0.09, TOP]} xStep={2} yStep={0.125} height={300} labels={false} xLabel="" yLabel="">
        <Line.Segment point1={[S + 0.8, 0]} point2={[S + 0.8, TOP - 0.03]} color={C.violet} style="dashed" weight={2} />
        <Label at={[S + 0.8, TOP - 0.03]} attach="e" color={C.violet} size={12}>P̂ ≥ 0.8 →</Label>
        {bars.map(b => (
          <Polygon
            key={b.k}
            points={[[S + b.v - HALF, 0], [S + b.v + HALF, 0], [S + b.v + HALF, b.pr], [S + b.v - HALF, b.pr]]}
            color={b.inEvent ? hit : C.f}
            fillOpacity={b.inEvent ? 0.6 : 0.25}
            weight={1.5}
          />
        ))}
        {bars.map(b => (
          <Label key={`p${b.k}`} at={[S + b.v, b.pr]} attach="n" size={11} color={b.inEvent ? hit : C.ink}>
            {label(b.k, b.pr)}
          </Label>
        ))}
        {bars.map(b => (
          <Label key={`v${b.k}`} at={[S + b.v, 0]} attach="s" size={12}>
            {tick(b.v)}
          </Label>
        ))}
        {bars.map(b => (
          <Label key={`x${b.k}`} at={[S + b.v, -0.055]} attach="s" size={11} color={C.guide} bold={false}>
            {`X=${b.k}`}
          </Label>
        ))}
        <Label at={[S + 1.1, 0]} attach="e" size={13} italic>p̂</Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label={<>Correct: <M>{'n = 5,\\ p = \\tfrac12'}</M></>} checked={model === 'right'} onChange={() => setModel('right')} />
          <Toggle label={<>Error: <M>p = 0.8</M></>} checked={model === 'p08'} onChange={() => setModel('p08')} />
          <Toggle label={<>Error: <M>n = 4</M></>} checked={model === 'n4'} onChange={() => setModel('n4')} />
        </Buttons>
        <Readouts>
          {model === 'right' && (
            <Readout color={C.good} tex={'\\Pr(\\hat P\\ge0.8) = \\Pr(X\\ge4) = \\tfrac{5}{32}+\\tfrac{1}{32} = \\tfrac{3}{16}\\ \\checkmark'} />
          )}
          {model === 'p08' && (
            <Readout color={C.bad} tex={`\\Pr(X\\ge4) = 0.4096 + 0.32768 = ${total.toFixed(5)}\\ \\text{✗}`} />
          )}
          {model === 'n4' && (
            <Readout color={C.bad} tex={'\\tfrac X4 \\ge 0.8 \\iff X \\ge 3.2 \\iff X = 4:\\ \\tfrac{1}{16}\\ \\text{✗}'} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
