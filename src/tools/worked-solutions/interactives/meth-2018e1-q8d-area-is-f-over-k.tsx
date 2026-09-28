// 2018 Methods Exam 1 Q8d — why A = f(2)/k. The strip height f − g = x²e^{kx} + 2xe^{kx}/k is exactly
// f′(x)/k (part a. divided by k), so the area swept from 0 to t is f(t)/k − f(0)/k = f(t)/k. Sweep t and
// the numerically added-up area always matches f(t)/k; at t = 2, move k until A = 16/k, which happens at
// k = log_e(2) because the 1/k cancels and leaves 4e^{2k} = 16. A toggle drops the 1/k (reading the
// integrand as f′ itself) and the readout stops matching the area.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle,
  integrate, num,
} from './kit'

const END = 2.2
const LN2 = Math.log(2)

function niceStep(span: number) {
  for (const s of [2, 5, 10, 20, 50]) if (s >= span / 7) return s
  return 100
}

export default function AreaIsFOverK() {
  const [t, setT] = useState(1.3)
  const [k, setK] = useState(0.5)
  const [noK, setNoK] = useState(false)

  const f = (x: number) => x * x * Math.exp(k * x)
  const g = (x: number) => (-2 * x * Math.exp(k * x)) / k
  const fp = (x: number) => x * Math.exp(k * x) * (k * x + 2)

  const yTop = 1.08 * f(END)
  const yBot = 1.08 * g(END)
  const step = niceStep(yTop - yBot)

  const atEnd = t > 1.995
  const hit = atEnd && Math.abs(k - LN2) < 0.003
  const area = integrate(x => f(x) - g(x), 0, t)
  const A = (4 * Math.exp(2 * k)) / k

  let notice
  if (noK) {
    notice = (
      <Notice tone="warn">
        Without the <M>{'\\tfrac1k'}</M>, <M>f(t)</M> no longer matches the shaded area: it is <M>k</M> times it.{' '}
        <M>{"f'(x) = kx^2e^{kx} + 2xe^{kx}"}</M> has an extra <M>k</M> on its first term, so the strip height is{' '}
        <M>{"\\tfrac1k f'(x)"}</M>, not <M>{"f'(x)"}</M>. Using <M>{'A = f(2)'}</M> leads to <M>{'ke^{2k} = 4'}</M>,
        which can&apos;t be solved exactly by hand.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b><M>{'k = \\log_e(2) \\approx 0.693'}</M>:</b> the area equals <M>{'\\tfrac{16}{k}'}</M>. Check:{' '}
        <M>{'e^{2k} = e^{\\log_e 4} = 4'}</M>, so <M>{'4e^{2k} = 16'}</M>. The <M>{'\\tfrac1k'}</M> on both sides
        cancelled, which is why the answer came out exact.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice>
        At <M>t = 2</M> the whole region is shaded, so <M>{'A = \\tfrac1k f(2) = \\tfrac{4e^{2k}}{k}'}</M>. Now move{' '}
        <M>k</M> until <M>A</M> equals <M>{'\\tfrac{16}{k}'}</M>. Both carry the same <M>{'\\tfrac1k'}</M>, so they
        match exactly when <M>{'f(2) = 4e^{2k} = 16'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Sweep <M>t</M>. The shaded area (the strips from <M>0</M> to <M>t</M> added up) always equals{' '}
        <M>{'\\tfrac1k f(t)'}</M>. Why? Each strip&apos;s height <M>f - g</M> is exactly <M>{"\\tfrac1k f'"}</M>{' '}
        (the top two readouts), so the area grows at rate <M>{"\\tfrac1k f'"}</M> and must be{' '}
        <M>{'\\tfrac1k f'}</M>; <M>f(0) = 0</M>, so nothing is subtracted. Then drag <M>t</M> to <M>2</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, END]} y={[yBot, yTop]} xStep={0.5} yStep={step} height={320}>
        <Region top={f} bottom={g} from={0} to={t} color={C.f} opacity={0.28} />
        <Region top={f} bottom={g} from={t} to={2} color={C.guide} opacity={0.08} />
        <Plot.OfX y={f} domain={[0, END]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[0, END]} color={C.g} weight={3} />
        <Line.Segment point1={[2, g(2)]} point2={[2, f(2)]} color={C.guide} weight={2} />
        {t > 0.02 && <Line.Segment point1={[t, g(t)]} point2={[t, f(t)]} color={C.violet} weight={3} />}
        <Label at={[t, f(t)]} color={C.violet} attach="nw">t</Label>
        <Label at={[1.55, f(1.55)]} color={C.f} attach="nw">f</Label>
        <Label at={[1.55, g(1.55)]} color={C.g} attach="sw">g</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={2} step={0.01} />
        <Slider label="k" value={k} onChange={setK} min={0.3} max={1.2} step={0.001} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label="t = 2" onClick={() => setT(2)} />
          <Toggle label="Forget the 1/k" checked={noK} onChange={setNoK} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`f(t) - g(t) = ${num(f(t) - g(t))}`} />
          <Readout color={C.good} tex={`\\tfrac1k f'(t) = ${num(fp(t) / k)}`} />
          <Readout tex={`\\text{shaded area} \\approx ${num(area)}`} />
          {noK ? (
            <Readout color={C.bad} tex={`f(t) = ${num(f(t))}`} />
          ) : (
            <Readout color={C.good} tex={`\\tfrac1k f(t) = ${num(f(t) / k)}`} />
          )}
          {atEnd && !noK && (
            <>
              <Readout tex={`\\tfrac{4e^{2k}}{k} = ${num(A)}`} />
              <Readout color={hit ? C.good : undefined} tex={`\\tfrac{16}{k} = ${num(16 / k)}${hit ? '\\ \\checkmark' : ''}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
