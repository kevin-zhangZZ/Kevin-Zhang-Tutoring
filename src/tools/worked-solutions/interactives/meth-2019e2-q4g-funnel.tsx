// 2019 Methods Exam 2 Q4g — the confidence interval run backwards. Horizontal axis: proportion;
// vertical axis: sample size n. For each n the approximate 95% CI p̂ ± 1.96√(p̂(1 − p̂)/n) is a
// horizontal slice of a "funnel" that narrows as n grows. It is centred on p̂ = 0.055 (the
// midpoint of the given interval), and its edges meet the given endpoints 0.0234 and 0.0866 at the
// same height, n = 200 (the only n whose interval rounds to (0.0234, 0.0866)). Toggles show the
// report's two slips: centring on Town A's 0.0527 (the edges meet the endpoints at different
// heights, n ≈ 167 and n ≈ 223, so no n fits) and dropping the 1.96 (the funnel is too narrow and
// fits at n ≈ 52). Values checked in Python.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const LO = 0.0234
const HI = 0.0866
const Y1 = 420

export default function Funnel() {
  const [n, setN] = useState(150)
  const [townA, setTownA] = useState(false)
  const [noZ, setNoZ] = useState(false)

  const pc = townA ? 0.0527 : 0.055
  const z = noZ ? 1 : 1.96
  const var1 = pc * (1 - pc)
  const moe = (t: number) => z * Math.sqrt(var1 / t)
  const tMin = Math.ceil(var1 * (z / pc) ** 2) + 1 // below this the left edge goes negative
  const lo = pc - moe(n)
  const hi = pc + moe(n)
  const lo4 = Number(lo.toFixed(4))
  const hi4 = Number(hi.toFixed(4))
  const matched = Math.abs(lo4 - LO) < 1e-9 && Math.abs(hi4 - HI) < 1e-9
  // Where each edge meets its given endpoint.
  const nLeft = var1 * (z / (pc - LO)) ** 2
  const nRight = var1 * (z / (HI - pc)) ** 2
  const correct = !townA && !noZ
  const colour = matched ? (correct ? C.good : C.bad) : C.f

  let notice
  if (townA) {
    notice = (
      <Notice tone="warn">
        Centred on <M>0.0527</M> (Town A&apos;s probability), the funnel is shifted left. Its right edge reaches{' '}
        <M>0.0866</M> at <M>{`n \\approx ${Math.round(nRight)}`}</M>, but its left edge reaches <M>0.0234</M> only at{' '}
        <M>{`n \\approx ${Math.round(nLeft)}`}</M>. No single <M>n</M> fits both ends, because a confidence interval is
        centred on its own <M>\hat p</M>: the midpoint, <M>0.055</M>.
      </Notice>
    )
  } else if (noZ) {
    notice = (
      <Notice tone="warn">
        Without the <M>1.96</M> each interval is only <M>{'\\hat p \\pm 1'}</M> standard deviation (roughly a{' '}
        <M>68\%</M> interval), so the funnel is too narrow and reaches the given width far too early, at{' '}
        <M>{`n \\approx ${Math.round(nLeft)}`}</M>. A <M>95\%</M> interval needs <M>\pm 1.96</M> standard deviations.
      </Notice>
    )
  } else if (matched) {
    notice = (
      <Notice tone="good">
        <b>At <M>n = 200</M> the interval rounds to exactly <M>(0.0234,\ 0.0866)</M></b>, and both edges of the funnel
        hit the given endpoints at the same height. Solving by hand gives <M>{'n \\approx 199.96'}</M> only because the
        endpoints were rounded to four decimal places. Try the two toggles to see the report&apos;s slips.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        {n < 200 ? (
          <>At <M>{`n = ${n}`}</M> the interval is <b>too wide</b>: a smaller sample gives a less precise estimate. </>
        ) : (
          <>At <M>{`n = ${n}`}</M> the interval is <b>too narrow</b>: a bigger sample pins <M>p</M> down more tightly. </>
        )}
        The width shrinks like <M>{'\\tfrac{1}{\\sqrt n}'}</M>, so exactly one sample size gives the given width. Slide{' '}
        <M>n</M> until the slice touches both dashed lines.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 0.13]} y={[0, Y1]} xStep={0.02} yStep={100} xLabels={v => (v < 0.125 ? v.toFixed(2) : "")} xLabel="p̂" yLabel="n" height={320}>
        <Line.Segment point1={[LO, 0]} point2={[LO, Y1]} color={C.violet} style="dashed" weight={2} />
        <Line.Segment point1={[HI, 0]} point2={[HI, Y1]} color={C.violet} style="dashed" weight={2} />
        <Label at={[LO, Y1]} attach="ne" color={C.violet} size={11} gap={4}>0.0234</Label>
        <Label at={[HI, Y1]} attach="ne" color={C.violet} size={11} gap={4}>0.0866</Label>
        <Line.Segment point1={[pc, 0]} point2={[pc, Y1]} color={townA ? C.bad : C.guide} style="dashed" weight={1.5} />
        <Label at={[pc, Y1]} attach="s" color={townA ? C.bad : C.ink} size={11} gap={4}>{`p̂ = ${pc}`}</Label>
        <Plot.Parametric xy={t => [pc - moe(t), t]} domain={[tMin, Y1]} color={C.f} weight={2.5} />
        <Plot.Parametric xy={t => [pc + moe(t), t]} domain={[tMin, Y1]} color={C.f} weight={2.5} />
        <Line.Segment point1={[Math.max(0, lo), n]} point2={[hi, n]} color={colour} weight={5} />
        <Point x={pc} y={n} color={colour} />
        <Label at={[hi, n]} attach="e" color={colour} size={12}>{`n = ${n}`}</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={30} max={400} step={1} format={v => String(Math.round(v))} />
        <Buttons>
          <Toggle label="Centre on Town A's 0.0527" checked={townA} onChange={setTownA} />
          <Toggle label="Leave out the 1.96" checked={noZ} onChange={setNoZ} />
        </Buttons>
        <Readouts>
          <Readout color={colour} tex={`\\text{CI} \\approx (${lo.toFixed(4)},\\ ${hi.toFixed(4)})${matched && correct ? '\\ \\checkmark' : ''}`} />
          <Readout color={C.violet} tex={'\\text{given: } (0.0234,\\ 0.0866)'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
