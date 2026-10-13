// 2016 Methods Exam 2 Q4e.i — why only one root of x² + 2kx + 1 = 0 gives X. Slide k: the line
// y = −x meets the hyperbola y = (kx+1)/(x+k) twice, at x = −k ± √(k²−1), but g is only the
// right-hand branch (domain (−k, ∞)). The root −k − √(k²−1) is always left of the asymptote
// x = −k, on the dashed branch that is not part of g. That is the domain trap the report notes.

import { useState } from 'react'
import { C, Controls, tick, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

export default function Branch() {
  const [k, setK] = useState(2)
  const g = (x: number) => (k * x + 1) / (x + k)
  const r = Math.sqrt(k * k - 1)
  const xGood = -k + r
  const xBad = -k - r

  return (
    <div>
      <Plane x={[-7, 2.5]} y={[-2.5, 7]} equalScale height={380} xLabels={v => (v < -7 || v > 2.5 ? '' : tick(v))}>
        <Plot.OfX y={g} domain={[-7, -k - 0.03]} color={C.guide} weight={2} style="dashed" />
        <Plot.OfX y={g} domain={[-k + 0.03, 2.5]} color={C.f} weight={3} />
        <Line.Segment point1={[-k, -2.5]} point2={[-k, 7]} color={C.bad} style="dashed" weight={1.5} />
        <Label at={[-k, -2]} color={C.bad} attach="w">x = −k</Label>
        <Line.Segment point1={[-7, 7]} point2={[2.5, -2.5]} color={C.g} weight={2} />
        <Label at={[1.6, -1.6]} color={C.g} attach="ne">y = −x</Label>
        <Point x={xGood} y={-xGood} color={C.good} />
        <Label at={[xGood, -xGood]} color={C.good} attach="ne">X</Label>
        <Point x={xBad} y={-xBad} color={C.bad} />
        <Label at={[xBad, -xBad]} color={C.bad} attach="e">not on g</Label>
        <Label at={[2, g(2)]} color={C.f} attach="n">g</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={1.05} max={3} step={0.01} />
        <Readouts>
          <Readout color={C.good} tex={`-k+\\sqrt{k^2-1} \\approx ${xGood.toFixed(3)} > -k`} />
          <Readout color={C.bad} tex={`-k-\\sqrt{k^2-1} \\approx ${xBad.toFixed(3)} < -k`} />
        </Readouts>
        <Notice>
          The quadratic has two roots for every <M>{'k>1'}</M>, but <M>g</M> is only the solid branch, right of the asymptote{' '}
          <M>x=-k</M>. The red root is always left of <M>x=-k</M>, where <M>y=-x</M> meets the <b>other branch</b> of the
          hyperbola, so it is outside the domain <M>{'(-k,\\infty)'}</M>. Slide <M>k</M> towards <M>1</M>: the two roots close in on{' '}
          <M>x=-1</M> from either side of the asymptote, but they never swap sides.
        </Notice>
      </Controls>
    </div>
  )
}
