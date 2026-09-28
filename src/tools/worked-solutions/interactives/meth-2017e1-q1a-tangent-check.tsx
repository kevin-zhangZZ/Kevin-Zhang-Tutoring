// 2017 Methods Exam 1 Q1a — a derivative formula predicts the slope of the tangent at EVERY point,
// so you can test one by sliding along the curve. For f(x) = x/(x + 2) the quotient-rule answer
// 2/(x + 2)² gives a line that only touches the curve everywhere; the report's "cancelled x + 2"
// answer (1 − x)/(x + 2) and the swapped-numerator answer −2/(x + 2)² give lines that cut across
// it. The cancelled version happens to agree at x = 0 and x = −1, which is why one easy check
// can let it through.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Readout, Readouts, Slider, Toggle, clamp, tick } from './kit'

const f = (x: number) => x / (x + 2)
const fPrime = (x: number) => 2 / (x + 2) ** 2

type Mode = 'right' | 'cancel' | 'swap'
const FORMULA: Record<Mode, { rule: (x: number) => number; tex: string }> = {
  right: { rule: fPrime, tex: '\\frac{2}{(x+2)^2}' },
  cancel: { rule: x => (1 - x) / (x + 2), tex: '\\frac{1-x}{x+2}' },
  swap: { rule: x => -2 / (x + 2) ** 2, tex: '\\frac{-2}{(x+2)^2}' },
}

const LO = -1.5
const HI = 4.5

export default function TangentCheck() {
  const [a, setA] = useState(1)
  const [mode, setMode] = useState<Mode>('right')

  const m = FORMULA[mode].rule(a)
  const mTrue = (f(a + 1e-5) - f(a - 1e-5)) / 2e-5 // measured off the curve, not from any formula
  const ok = Math.abs(m - mTrue) < 0.02
  const lineColor = mode === 'right' ? C.good : ok ? C.good : C.bad
  const fmt = (v: number) => (Math.abs(v) < 0.0005 ? '0' : v.toFixed(3))

  let notice
  if (mode === 'right') {
    notice = (
      <Notice tone="good">
        <b>The green line only touches the curve, wherever you put the point.</b> That is what a correct derivative
        does. Slide towards the asymptote <M>x = -2</M>: <M>{'\\frac{2}{(x+2)^2}'}</M> blows up as the curve plunges.
        Slide right: it shrinks towards <M>0</M> as the curve levels off below <M>y = 1</M>. Since{' '}
        <M>{'(x+2)^2 > 0'}</M>, the slope is positive everywhere, and the curve only ever rises. Now switch to the
        &lsquo;cancelled&rsquo; formula.
      </Notice>
    )
  } else if (mode === 'cancel' && ok) {
    notice = (
      <Notice>
        <b>Here the wrong formula happens to give the right slope.</b> <M>{'\\frac{1-x}{x+2}'}</M> and{' '}
        <M>{'\\frac{2}{(x+2)^2}'}</M> agree only at <M>x = 0</M> and <M>x = -1</M>, so checking one easy point can let
        the mistake through. Slide to <M>x = 2</M>.
      </Notice>
    )
  } else if (mode === 'cancel') {
    notice = (
      <Notice tone="warn">
        <b>The red line cuts across the curve instead of touching it.</b> At <M>{`x = ${a.toFixed(2)}`}</M> the
        cancelled formula gives slope <M>{fmt(m)}</M>, but the curve&apos;s slope is <M>{fmt(mTrue)}</M>. For{' '}
        <M>{'x > 1'}</M> it even predicts a falling line on a curve that only rises. In{' '}
        <M>{'(x+2)\\times 1 - x\\times 1'}</M> the <M>x + 2</M> is a <em>term</em>, not a factor, so it can&apos;t
        cancel with the denominator.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Every slope comes out negative</b>: the red line falls wherever you put the point, but the curve rises
        everywhere. Putting <M>{"u\\,v' - v\\,u'"}</M> on top flips the sign of the whole derivative. The formula
        sheet has <M>{"v\\,u' - u\\,v'"}</M>: the bottom function <M>v</M> goes first.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.5, 5]} y={[-4.3, 2.3]} xStep={1} yStep={1} height={320} xLabels={v => (v < -2.5 ? '' : tick(v))}>
        <Line.Segment point1={[-2, -4.3]} point2={[-2, 2.3]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[-2.5, 1]} point2={[5, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[-2, 2.1]} color={C.guide} attach="e" size={12}>x = −2</Label>
        <Label at={[-2.5, 1]} color={C.guide} attach="ne" size={12}>y = 1</Label>
        <Plot.OfX y={f} domain={[-1.64, 5]} color={C.f} weight={3} />
        <Label at={[-1.5, f(-1.5)]} color={C.f} attach="e">f</Label>
        {mode !== 'right' && !ok && (
          <Line.PointSlope point={[a, f(a)]} slope={mTrue} color={C.guide} style="dashed" weight={1.5} />
        )}
        <Line.PointSlope point={[a, f(a)]} slope={m} color={lineColor} weight={2.5} />
        <MovablePoint
          point={[a, f(a)]}
          color={lineColor}
          constrain={p => {
            const x = clamp(p[0], LO, HI)
            return [x, f(x)]
          }}
          onMove={p => setA(clamp(p[0], LO, HI))}
        />
      </Plane>
      <Controls>
        <Slider label="x" value={a} onChange={setA} min={LO} max={HI} step={0.01} />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] text-gray-600 dark:text-gray-400">Slope from:</span>
          <Toggle label={<M>{FORMULA.right.tex}</M>} checked={mode === 'right'} onChange={() => setMode('right')} />
          <Toggle
            label={
              <>
                <M>{FORMULA.cancel.tex}</M> (&lsquo;cancelled&rsquo;)
              </>
            }
            checked={mode === 'cancel'}
            onChange={() => setMode('cancel')}
          />
          <Toggle
            label={
              <>
                <M>{FORMULA.swap.tex}</M> (order swapped)
              </>
            }
            checked={mode === 'swap'}
            onChange={() => setMode('swap')}
          />
        </div>
        <Readouts>
          <Readout color={lineColor} tex={`\\text{formula: } ${FORMULA[mode].tex} = ${fmt(m)}`} />
          <Readout color={C.f} tex={`\\text{curve's slope (zoomed in)} \\approx ${fmt(mTrue)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
