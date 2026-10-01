// 2023 Methods Exam 2 Q5c.ii — the region bounded by g and the inverses of g1 and g2 is
// symmetric about y = x, because the two inverses together are g reflected in y = x. So the area
// is twice the half between y = x and g from P to Q (2 × 2.78 = 5.56). A third view shades the
// report's incorrect ∫(g1⁻¹ − g) dx from P to Q, which misses the sliver left of P (1 ≤ x ≤ 1.27)
// where the region's lower edge is the inverse of g2.

import { useState } from 'react'
import { C, Buttons, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Toggle, integrate } from './kit'

const g = (x: number) => Math.cosh(x - 2) // ½(e^(2−x) + e^(x−2))
const g1inv = (x: number) => 2 + Math.acosh(Math.max(1, x))
const g2inv = (x: number) => 2 - Math.acosh(Math.max(1, x))
const line = (x: number) => x

function root(fn: (x: number) => number, a: number, b: number) {
  let lo = a
  let hi = b
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2
    if (Math.sign(fn(m)) === Math.sign(fn(lo))) lo = m
    else hi = m
  }
  return (lo + hi) / 2
}

const P = root(x => g(x) - x, 0.5, 2)
const Q = root(x => g(x) - x, 2, 6)
const HALF = integrate(x => x - g(x), P, Q, 400)
const WRONG = integrate(x => g1inv(x) - g(x), P, Q, 400)
const SLIVER = integrate(x => g1inv(x) - g2inv(x), 1, P, 800)

const MODES = ['Half below y = x', 'Whole region', 'Report’s incorrect integral'] as const

export default function Halves() {
  const [mode, setMode] = useState(0)

  let notice
  if (mode === 0) {
    notice = (
      <Notice>
        The inverses of <M>g_1</M> and <M>g_2</M> together are <M>g</M> reflected in <M>y=x</M>, so the line cuts the
        region into two mirror-image halves. The shaded half has <M>y=x</M> on top and <M>g</M> underneath, from{' '}
        <M>P</M> to <M>Q</M>: area <M>{`\\approx ${HALF.toFixed(2)}`}</M>. Stopping here is the report&rsquo;s{' '}
        <M>2.78</M> error. Click &ldquo;Whole region&rdquo;.
      </Notice>
    )
  } else if (mode === 1) {
    notice = (
      <Notice tone="good">
        The whole region is the shaded half plus its reflection, so{' '}
        <M>{`A=2\\times${HALF.toFixed(4)}\\ldots\\approx${(2 * HALF).toFixed(2)}`}</M>. One integral of{' '}
        <M>x-g(x)</M> does all the work. Now click the report&rsquo;s incorrect integral to see what it leaves out.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{'\\int_{1.27\\ldots}^{4.09\\ldots}\\left(g_1^{-1}-g(x)\\right)dx'}</M> shades only the red part, about{' '}
        <M>{WRONG.toFixed(2)}</M>. The region pokes out to the <em>left</em> of <M>P</M>, back to <M>x=1</M>, and
        there its lower edge is the inverse of <M>g_2</M>, not <M>g</M>. That purple sliver (about{' '}
        <M>{SLIVER.toFixed(2)}</M>) is missed.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 5]} y={[0, 5]} equalScale height={360}>
        {mode === 0 && <Region top={line} bottom={g} from={P} to={Q} color={C.f} opacity={0.3} />}
        {mode === 1 && (
          <>
            <Region top={g1inv} bottom={g2inv} from={1} to={P} color={C.good} opacity={0.28} samples={240} />
            <Region top={g1inv} bottom={g} from={P} to={Q} color={C.good} opacity={0.28} />
          </>
        )}
        {mode === 2 && (
          <>
            <Region top={g1inv} bottom={g2inv} from={1} to={P} color={C.violet} opacity={0.45} samples={240} />
            <Region top={g1inv} bottom={g} from={P} to={Q} color={C.bad} opacity={0.22} />
          </>
        )}
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={g} domain={[-0.3, 4.4]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [g(t), t]} domain={[2, 4.4]} color={C.g} weight={3} />
        <Plot.Parametric xy={t => [g(t), t]} domain={[-0.3, 2]} color={C.violet} weight={3} />
        <Point x={P} y={P} color={C.ink} />
        <Point x={Q} y={Q} color={C.ink} />
        <Label at={[P, P]} attach="se">P</Label>
        <Label at={[Q, Q]} attach="se">Q</Label>
        <Label at={[0.6, g(0.6)]} color={C.f} attach="e">g</Label>
        <Label at={[g(3.9), 3.9]} color={C.g} attach="w">inverse of g₁</Label>
        <Label at={[g(0.15), 0.15]} color={C.violet} attach="n">inverse of g₂</Label>
        <Label at={[0.7, 0.7]} color={C.guide} attach="se">y = x</Label>
      </Plane>
      <Controls>
        <Buttons>
          {MODES.map((m, i) => (
            <Toggle key={m} label={m} checked={mode === i} onChange={() => setMode(i)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\int_{P}^{Q}\\bigl(x-g(x)\\bigr)dx\\approx${HALF.toFixed(2)}`} />
          {mode === 1 && <Readout color={C.good} tex={`A=2\\times${HALF.toFixed(2)}\\ldots\\approx${(2 * HALF).toFixed(2)}`} />}
          {mode === 2 && <Readout color={C.bad} tex={`\\int_{P}^{Q}\\bigl(g_1^{-1}-g\\bigr)dx\\approx${WRONG.toFixed(2)}`} />}
          {mode === 2 && <Readout color={C.violet} tex={`\\text{sliver}\\approx${SLIVER.toFixed(2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
