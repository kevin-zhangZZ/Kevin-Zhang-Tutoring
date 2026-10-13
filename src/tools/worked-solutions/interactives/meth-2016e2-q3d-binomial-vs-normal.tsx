// 2016 Methods Exam 2 Q3d — why "do not use a normal approximation" matters here. The bars are
// X₂ ~ Bi(100, 0.04779), the count behind P̂ = X₂/100. Pr(P̂ ≥ 0.06 | P̂ ≥ 0.05) is the green bars
// (X₂ ≥ 6, 0.3443) as a share of the green + blue bars (X₂ ≥ 5, 0.5234) = 0.658. The toggle overlays
// the normal approximation N(4.779, 2.133²) for the count: its areas above 6 and 5 are 0.2835 and
// 0.4588, ratio 0.618. With a mean under 5 the binomial is lopsided and lumpy, so the smooth curve
// misses the bars just where the question looks.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Toggle } from './kit'

const N = 100
const P = 0.0477903522728147
function choose(n: number, k: number) {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const PMF = Array.from({ length: 16 }, (_, k) => choose(N, k) * P ** k * (1 - P) ** (N - k))
const tail = (k: number) => 1 - PMF.slice(0, k).reduce((a, b) => a + b, 0)
const TOP = tail(6)
const BOTTOM = tail(5)
const MU = N * P
const SD = Math.sqrt(N * P * (1 - P))
const dens = (x: number) => Math.exp(-(((x - MU) / SD) ** 2) / 2) / (SD * Math.sqrt(2 * Math.PI))

function normUpper(z: number) {
  // Pr(Z > z) via the complementary error function (Abramowitz–Stegun 7.1.26).
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const y = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-x * x)
  return z >= 0 ? y / 2 : 1 - y / 2
}
const NTOP = normUpper((6 - MU) / SD)
const NBOTTOM = normUpper((5 - MU) / SD)

export default function BinomialVsNormal() {
  const [normal, setNormal] = useState(false)

  return (
    <div>
      <Plane x={[-1, 14]} y={[0, 0.22]} xStep={1} yStep={0.1} height={300} xLabel="X₂" yLabel="" yLabels={false}
        xLabels={v => (v < 0 || v % 2 !== 0 ? '' : String(v))}>
        {PMF.slice(0, 15).map((pr, k) => (
          <Polygon
            key={k}
            points={[[k - 0.35, 0], [k + 0.35, 0], [k + 0.35, pr], [k - 0.35, pr]]}
            color={k >= 6 ? C.good : k === 5 ? C.f : C.guide}
            fillOpacity={k >= 5 ? 0.55 : 0.2}
            weight={1.5}
          />
        ))}
        <Label at={[5, PMF[5]]} attach="n" size={11} color={C.f}>X₂ = 5</Label>
        <Label at={[9, 0.12]} attach="e" size={12} color={C.good}>X₂ ≥ 6</Label>
        {normal && (
          <>
            <Region top={dens} bottom={() => 0} from={5} to={14} color={C.violet} opacity={0.2} />
            <Plot.OfX y={dens} domain={[-1, 14]} color={C.violet} weight={2.5} />
            <Line.Segment point1={[0, 0]} point2={[0, 0.21]} color={C.bad} style="dashed" weight={1.5} />
            <Label at={[0, 0.21]} attach="e" size={11} color={C.bad}>counts stop at 0</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Overlay the normal approximation" checked={normal} onChange={setNormal} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`\\text{binomial: } \\frac{\\Pr(X_2\\ge6)}{\\Pr(X_2\\ge5)} = \\frac{${TOP.toFixed(4)}}{${BOTTOM.toFixed(4)}} = ${(TOP / BOTTOM).toFixed(3)}\\ \\checkmark`} />
          {normal && <Readout color={C.violet} tex={`\\text{normal: } \\frac{${NTOP.toFixed(4)}}{${NBOTTOM.toFixed(4)}} = ${(NTOP / NBOTTOM).toFixed(3)}`} />}
        </Readouts>
        {normal ? (
          <Notice tone="warn">
            The violet curve has the same mean (<M>{MU.toFixed(2)}</M>) and spread, but it is symmetric, it spills below{' '}
            <M>0</M>, and it smears each bar&apos;s probability across the gaps. Its answer, <M>{(NTOP / NBOTTOM).toFixed(3)}</M>,
            is not the <M>{(TOP / BOTTOM).toFixed(3)}</M> the question wants. That is why it said &ldquo;do not use a normal
            approximation&rdquo;.
          </Notice>
        ) : (
          <Notice>
            Being told <M>{'\\hat P \\ge 0.05'}</M> means only the blue and green bars (<M>{'X_2 \\ge 5'}</M>) are
            possible. The answer is the green share of them. Now overlay the normal approximation that most students used.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
