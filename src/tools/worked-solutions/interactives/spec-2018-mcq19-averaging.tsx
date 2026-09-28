// 2018 Specialist Exam 2 MCQ 19 — why the average of five cats is much more likely to exceed 65
// days than one cat is. One cat: X ~ N(66, (4/3)²) (dashed). The mean of n cats:
// X̄ ~ N(66, (4/3)²/n), with the area above 65 shaded. Slide n: at n = 1 the area is 0.7734
// (option C, the report's most popular wrong answer); at n = 5 it is 0.9532 (option E). Averaging
// cancels high and low cats against each other, so the curve squeezes towards 66 and a mean below
// 65 becomes rare. The toggle treats the variance 16/9 as if it were the standard deviation: that
// gives option B at n = 1 and option D at n = 5.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const MU = 66
const SIGMA = 4 / 3
const XR: [number, number] = [61, 71]
const YTOP = 1.1

const pdf = (x: number, mu: number, sd: number) => Math.exp(-0.5 * ((x - mu) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))

/** Standard normal cdf (Abramowitz–Stegun 7.1.26 erf, error below 1.5e-7). */
function phi(z: number): number {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)
  return z >= 0 ? 0.5 * (1 + y) : 0.5 * (1 - y)
}

const OPTIONS: [string, number][] = [['A', 0.5], ['B', 0.7131], ['C', 0.7734], ['D', 0.8958], ['E', 0.9532]]
const optionFor = (p: number) => OPTIONS.find(([, v]) => Math.abs(v - p) < 0.00006)?.[0]

export default function AveragingWidget() {
  const [n, setN] = useState(5)
  const [varAsSd, setVarAsSd] = useState(false)

  const base = varAsSd ? 16 / 9 : SIGMA
  const sd = base / Math.sqrt(n)
  const z = (65 - MU) / sd
  const p = 1 - phi(z)
  const opt = optionFor(p)
  const cap = (y: number) => Math.min(y, YTOP * 1.04)

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (varAsSd) {
    tone = 'warn'
    notice = (
      <>
        Here the spread of one cat is taken as <M>{'\\tfrac{16}{9}'}</M>, but that is the <em>variance</em>: the standard deviation is{' '}
        <M>{'\\sqrt{16/9} = \\tfrac43'}</M>. The curves are too wide, and the area gives{' '}
        {n === 1 ? <>option B at <M>n = 1</M></> : n === 5 ? <>option D at <M>n = 5</M></> : <>a wrong value at every <M>n</M></>}.
        Turn the toggle off.
      </>
    )
  } else if (n === 1) {
    tone = 'warn'
    notice = (
      <>
        <M>n = 1</M> is a single cat: <M>{'\\Pr(X > 65) \\approx 0.7734'}</M>, option C, chosen by 25%. But the question is about the{' '}
        <em>average</em> of five cats. Slide <M>n</M> up to 5 and watch the curve narrow.
      </>
    )
  } else if (n === 5) {
    tone = 'good'
    notice = (
      <>
        Five cats: <M>{'\\operatorname{sd}(\\bar X) = \\tfrac{4/3}{\\sqrt5} \\approx 0.596'}</M>, so 65 is{' '}
        <M>{`${Math.abs(z).toFixed(3)}`}</M> standard deviations below 66 and the shaded area is <M>0.9532</M>, option E. A long
        cat and a short cat in the same sample cancel out, so the average rarely strays as far as one cat does. Slide <M>n</M>{' '}
        back to 1 to compare with a single cat.
      </>
    )
  } else {
    notice = (
      <>
        The variance of one cat is divided by <M>n</M>: <M>{`\\operatorname{Var}(\\bar X) = \\tfrac{16/9}{${n}}`}</M>. The curve
        squeezes towards 66, so less and less of it lies below 65. The question uses <M>n = 5</M>.
      </>
    )
  }

  return (
    <div>
      <Plane x={XR} y={[0, YTOP]} xStep={1} yStep={0.2} height={320} xLabel="" yLabel="" yLabels={false}>
        {/* One cat (or, with the toggle, the wrong one-cat curve). */}
        <Plot.OfX y={x => pdf(x, MU, base)} domain={XR} color={C.guide} weight={1.5} style="dashed" />
        <Label at={[68.9, pdf(68.9, MU, base)]} attach="ne" color={C.guide} size={12} gap={4}>one cat</Label>
        <Region top={x => cap(pdf(x, MU, sd))} bottom={() => 0} from={65} to={XR[1]} color={varAsSd ? C.bad : C.good} opacity={0.28} />
        <Plot.OfX y={x => cap(pdf(x, MU, sd))} domain={XR} color={varAsSd ? C.bad : C.f} weight={2.5} />
        {n > 1 && (
          <Label at={[MU + 1.3 * sd, cap(pdf(MU + 1.3 * sd, MU, sd))]} attach="e" color={varAsSd ? C.bad : C.f} size={12} gap={6}>
            {`mean of ${n}`}
          </Label>
        )}
        <Line.Segment point1={[65, 0]} point2={[65, YTOP]} color={C.ink} style="dashed" weight={1.5} />
        <Label at={[65, YTOP]} attach="w" size={12} gap={5}>65</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={12} step={1} format={v => String(v)} />
        <Readouts>
          <Readout tex={`\\operatorname{sd}(\\bar X) = \\tfrac{${varAsSd ? '16/9' : '4/3'}}{\\sqrt{${n}}} \\approx ${sd.toFixed(3)}`} color={varAsSd ? C.bad : C.f} />
          <Readout tex={`z = \\tfrac{65-66}{${sd.toFixed(3)}} \\approx ${z.toFixed(3)}`} />
          <Readout tex={`\\Pr(\\bar X > 65) \\approx ${p.toFixed(4)}${opt ? `\\ \\ (\\text{${opt}})` : ''}`} color={varAsSd ? C.bad : C.good} />
        </Readouts>
        <Toggle label="Wrong idea: 16/9 is the standard deviation" checked={varAsSd} onChange={setVarAsSd} />
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
