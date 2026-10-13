// 2016 Methods Exam 2 Q3e — finding σ from a tail probability. The curve is N(180, σ²); the
// shaded tail is Pr(Y₂ > 190). It starts at σ = 6 (the new-laptop spread), where the tail is only
// 0.0478. Widening the curve pushes more area past 190; the tail reaches 0.12 exactly when
// 190 sits z = 1.17499 standard deviations above the mean, i.e. σ = 10 / 1.17499 = 8.5107.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider } from './kit'

const MU = 180
const Z = 1.1749867920660904
const SIGMA = 10 / Z

function normUpper(z: number) {
  // Pr(Z > z) via the complementary error function (Abramowitz–Stegun 7.1.26).
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const y = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-x * x)
  return z >= 0 ? y / 2 : 1 - y / 2
}

export default function FindSigma() {
  const [s, setS] = useState(6)
  const dens = (x: number) => Math.exp(-(((x - MU) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI))
  const z = 10 / s
  const tail = normUpper(z)
  const hit = Math.abs(s - SIGMA) < 0.03

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b>Tail <M>{'\\approx 0.12'}</M>.</b> Here <M>190</M> sits <M>{`z = ${Z.toFixed(5)}\\ldots`}</M> standard deviations
        above the mean, the <M>z</M> with <M>{'12\\%'}</M> of the standard normal above it. So{' '}
        <M>{`\\sigma = \\tfrac{10}{${Z.toFixed(5)}\\ldots} \\approx ${SIGMA.toFixed(4)}`}</M>. The calculator does in one step
        what the slider does by trial.
      </Notice>
    )
  } else if (tail < 0.12) {
    notice = (
      <Notice>
        Only <M>{`${(tail * 100).toFixed(1)}\\%`}</M> of the curve lies past <M>190</M>, short of the{' '}
        <M>{'12\\%'}</M> the question gives. A wider curve puts more area in the tail: increase <M>{'\\sigma'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now <M>{`${(tail * 100).toFixed(1)}\\%`}</M> lies past <M>190</M>, more than <M>{'12\\%'}</M>: the curve is too
        spread out. Decrease <M>{'\\sigma'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[145, 215]} y={[0, 0.085]} xStep={10} yStep={0.025} height={280} xLabel="y" yLabel="" yLabels={false}
        xLabels={v => (v < 150 || v > 210 ? '' : String(v))}>
        <Region top={dens} bottom={() => 0} from={190} to={215} color={C.g} opacity={0.4} />
        <Plot.OfX y={dens} domain={[145, 215]} color={C.f} weight={2.5} />
        <Line.Segment point1={[MU, 0]} point2={[MU, 0.082]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[MU, 0.082]} attach="w" size={11} color={C.guide}>mean 180</Label>
        <Line.Segment point1={[190, 0]} point2={[190, 0.06]} color={C.g} style="dashed" weight={1.5} />
        <Label at={[190, 0.06]} attach="e" size={11} color={C.g}>190</Label>
      </Plane>
      <Controls>
        <Slider label="\sigma" value={s} onChange={setS} min={5} max={14} step={0.01} />
        <Readouts>
          <Readout tex={`z = \\tfrac{190-180}{\\sigma} = ${z.toFixed(3)}`} />
          <Readout color={hit ? C.good : C.g} tex={`\\Pr(Y_2 > 190) = ${tail.toFixed(4)}${hit ? '\\ \\checkmark' : ''}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
