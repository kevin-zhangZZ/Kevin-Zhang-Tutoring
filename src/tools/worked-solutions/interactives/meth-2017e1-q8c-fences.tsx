// 2017 Methods Exam 1 Q8c — the interval for p has two ends, and each end comes from a different
// fact. Plotted against p: Pr(A ∪ B) = 8p (from part b) and the given ceiling 1/5. The right fence
// is where 8p reaches 1/5, p = 1/40 (included, solid edge). The left fence is p = 0 (excluded,
// dashed edge): 8p ≤ 1/5 is happy there, but Pr(A) = 4p = 0 makes Pr(B | A) = 0/0, which cannot be
// the given 1/4; left of 0, p is a negative probability. Drag the point along the p-axis (snaps to
// 1/800): the readouts and notice test each of the report's common wrong answers (p = 1/40,
// p ≤ 1/40, 0 ≤ p ≤ 1/40).

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, clamp } from './kit'

const STEP = 1 / 800
const TOP = 1 / 40
const XMIN = -0.01
const XMAX = 0.05
const YMIN = -0.1
const YMAX = 0.45

const snap = (v: number) => clamp(Math.round(v / STEP) * STEP, XMIN, XMAX)
const near = (a: number, b: number) => Math.abs(a - b) < 1e-9
const trim = (v: number, dp = 5) => String(parseFloat(v.toFixed(dp)))

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}
/** p as a fraction when its denominator is small (1/40, 1/80, …), else a decimal. */
function asFrac(v: number): [string, string] | null {
  const k = Math.round(v * 800)
  if (k === 0) return null
  const g = gcd(Math.abs(k), 800)
  const n = k / g
  const d = 800 / g
  return d <= 80 ? [String(n), String(d)] : null
}
const pTex = (v: number) => {
  if (near(v, 0)) return '0'
  const f = asFrac(v)
  return f ? `${f[0].startsWith('-') ? '-' : ''}\\tfrac{${f[0].replace('-', '')}}{${f[1]}}` : trim(v)
}
const pPlain = (v: number) => {
  if (near(v, 0)) return '0'
  const f = asFrac(v)
  return f ? `${f[0].replace('-', '−')}/${f[1]}` : trim(v, 5).replace('-', '−')
}

export default function Fences() {
  const [p, setP] = useState(1 / 80)

  const status = p < -1e-9 ? 'neg' : near(p, 0) ? 'zero' : p < TOP - 1e-9 ? 'ok' : near(p, TOP) ? 'top' : 'over'
  const good = status === 'ok' || status === 'top'
  const col = good ? C.good : C.bad

  let notice
  if (status === 'neg') {
    notice = (
      <Notice tone="warn">
        <b>Here <M>{'\\Pr(A\\cap B) = p'}</M> is negative</b>, which no probability can be. Yet{' '}
        <M>{'8p \\le \\tfrac15'}</M> is perfectly happy with it. That is why stopping at <M>{'p \\le \\tfrac1{40}'}</M> is
        not enough: the report lists it as a common wrong answer that allows negative probabilities. Now drag to{' '}
        <M>p = 0</M>.
      </Notice>
    )
  } else if (status === 'zero') {
    notice = (
      <Notice tone="warn">
        <b><M>8p = 0 \le \tfrac15</M> passes, so why is <M>p = 0</M> excluded?</b> Because then{' '}
        <M>{'\\Pr(A) = 4p = 0'}</M> and <M>{'\\Pr(B\\mid A) = \\tfrac{p}{4p}'}</M> becomes <M>{'\\tfrac00'}</M>. It
        cannot equal the <M>\tfrac14</M> the question gives. The dashed left edge means &ldquo;not included&rdquo;, so{' '}
        <M>{'0 \\le p \\le \\tfrac1{40}'}</M> is wrong at one end.
      </Notice>
    )
  } else if (status === 'ok') {
    notice = (
      <Notice tone="good">
        <b>Allowed.</b> Every probability is positive, and <M>{'\\Pr(A\\cup B) = 8p'}</M> sits under the{' '}
        <M>\tfrac15</M> ceiling. Every <M>p</M> in the green strip works, not just <M>\tfrac1{'{40}'}</M>, which is why{' '}
        <M>p = \tfrac1{'{40}'}</M> alone is not the answer. Drag to each end of the strip to see which end is included.
      </Notice>
    )
  } else if (status === 'top') {
    notice = (
      <Notice tone="good">
        <b>The top end is included.</b> Here <M>8p = \tfrac15</M> exactly, and the condition says{' '}
        <M>{'\\le'}</M>, not <M>{'<'}</M>. Check the probabilities: <M>{'\\Pr(A) = \\tfrac1{10}'}</M>,{' '}
        <M>{'\\Pr(B) = \\tfrac18'}</M>, <M>{'\\Pr(A\\cup B) = \\tfrac15'}</M>, all legitimate. Solid edge, square bracket.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Too big:</b> <M>{`\\Pr(A\\cup B) = 8p = ${trim(8 * p)}`}</M>, more than the <M>\tfrac15</M> the question
        allows. The right fence is where the line <M>8p</M> meets <M>\tfrac15</M>, at{' '}
        <M>p = \tfrac1{'{40}'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[XMIN, XMAX]}
        y={[YMIN, YMAX]}
        xStep={0.01}
        yStep={0.1}
        height={320}
        xLabel="p"
        yLabel=""
        xLabels={v => (v > 0.045 ? '' : v.toFixed(2).replace('-', '−'))}
        yLabels={v => (v > 0.45 ? '' : v.toFixed(1).replace('-', '−'))}
      >
        {/* The three bands of p */}
        <Polygon points={[[XMIN, YMIN], [0, YMIN], [0, YMAX], [XMIN, YMAX]]} color={C.bad} fillOpacity={0.08} weight={0} />
        <Polygon points={[[0, YMIN], [TOP, YMIN], [TOP, YMAX], [0, YMAX]]} color={C.good} fillOpacity={0.1} weight={0} />
        <Polygon points={[[TOP, YMIN], [XMAX, YMIN], [XMAX, YMAX], [TOP, YMAX]]} color={C.bad} fillOpacity={0.06} weight={0} />
        <Line.Segment point1={[0, YMIN]} point2={[0, YMAX]} color={C.good} style="dashed" weight={2.5} />
        <Line.Segment point1={[TOP, YMIN]} point2={[TOP, YMAX]} color={C.good} weight={2.5} />
        <Label at={[XMIN / 2, 0.41]} attach="c" color={C.bad} size={12}>
          p ≤ 0
        </Label>
        <Label at={[TOP / 2, 0.41]} attach="c" color={C.good} size={12}>
          allowed
        </Label>
        <Label at={[(TOP + XMAX) / 2, 0.41]} attach="c" color={C.bad} size={12}>
          8p &gt; 1/5
        </Label>

        {/* The ceiling and Pr(A ∪ B) = 8p */}
        <Line.Segment point1={[XMIN, 0.2]} point2={[XMAX, 0.2]} color={C.g} style="dashed" weight={2} />
        <Label at={[XMAX, 0.2]} attach="sw" color={C.g}>
          1/5
        </Label>
        <Plot.OfX y={x => 8 * x} domain={[XMIN, XMAX]} color={C.f} weight={3} />
        <Label at={[0.04, 0.32]} attach="nw" color={C.f}>
          Pr(A ∪ B) = 8p
        </Label>
        <Point x={TOP} y={0.2} color={C.good} />
        <Label at={[TOP, 0.2]} attach="se" color={C.good}>
          (1/40, 1/5)
        </Label>

        {/* The chosen p */}
        <Line.Segment point1={[p, 0]} point2={[p, 8 * p]} color={C.guide} style="dashed" weight={2} />
        <Point x={p} y={8 * p} color={col} />
        <MovablePoint point={[p, 0]} onMove={([x]) => setP(snap(x))} constrain={([x]) => [snap(x), 0]} color={col} />
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={v => setP(snap(v))} min={XMIN} max={XMAX} step={STEP} format={pPlain} />
        <Readouts>
          <Readout color={status === 'neg' ? C.bad : undefined} tex={`\\Pr(A)=4p=${pTex(4 * p)}`} />
          <Readout
            color={status === 'zero' || status === 'neg' ? C.bad : C.violet}
            tex={status === 'zero' ? '\\Pr(B\\mid A)=\\tfrac00\\ \\text{undefined}' : '\\Pr(B\\mid A)=\\tfrac{p}{4p}=\\tfrac14'}
          />
          <Readout color={status === 'over' ? C.bad : C.f} tex={`\\Pr(A\\cup B)=8p=${pTex(8 * p)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
