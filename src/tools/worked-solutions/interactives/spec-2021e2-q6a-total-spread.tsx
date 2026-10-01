// 2021 Specialist Exam 2 Q6a — the lift carries the TOTAL mass W_n = X₁ + … + X_n ~ N(75n, 8²n),
// whose standard deviation 8√n GROWS with n. Step n from 9 to 14: the curve slides right and
// widens, and the tail past the 1000 kg limit (red) jumps from 0.00015 at n = 12 to 0.193 at
// n = 13, so n = 12 is the maximum. A toggle draws the report's common error, sd = 8/√n (the sd
// of a sample MEAN, used for the total): a needle-thin spike that sits wholly below 1000 at
// n = 13 and so wrongly lets a 13th person on. Values checked in scipy.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Polyline, Readout, Readouts, Region, Slider, Toggle } from './kit'

const MU = 75
const SD = 8
const LIMIT = 1000
const X0 = 580
const X1 = 1140
const YTOP = 0.02

// Numerical Recipes erfc (relative error under 1.2e-7), so even the 0.00015 tail is right.
function erfc(x: number) {
  const z = Math.abs(x)
  const t = 1 / (1 + 0.5 * z)
  const r =
    t *
    Math.exp(
      -z * z - 1.26551223 +
        t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    )
  return x >= 0 ? r : 2 - r
}
const over = (m: number, s: number) => 0.5 * erfc((LIMIT - m) / (s * Math.SQRT2)) // Pr(W > 1000)
const pdf = (m: number, s: number) => (x: number) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI))

function probTex(p: number) {
  if (p < 1e-6) return '\\approx 0'
  if (p > 1 - 1e-6) return '\\approx 1'
  if (p < 0.001) return `\\approx ${p.toPrecision(2)}`
  return `\\approx ${p.toFixed(4)}`
}

export default function TotalSpread() {
  const [n, setN] = useState(13)
  const [wrong, setWrong] = useState(false)

  const m = MU * n
  const s = SD * Math.sqrt(n)
  const sWrong = SD / Math.sqrt(n)
  const f = pdf(m, s)
  const fWrong = pdf(m, sWrong)
  const p = over(m, s)
  const pWrong = over(m, sWrong)
  const z = (LIMIT - m) / s
  const peak = f(m)

  // The wrong curve is a spike far taller than the plane; sample it finely and stop just past the top edge.
  const spike: [number, number][] = Array.from({ length: 241 }, (_, i) => {
    const x = m - 6 * sWrong + (12 * sWrong * i) / 240
    return [x, Math.min(fWrong(x), YTOP * 1.09)]
  })

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        With <M>{`\\text{sd} = \\tfrac{8}{\\sqrt{${n}}} \\approx ${sWrong.toFixed(2)}`}</M>, the spread of a sample{' '}
        <em>mean</em>, the curve collapses into a spike.{' '}
        {n === 13 ? (
          <>At <M>n = 13</M> the spike sits wholly below 1000, so this method wrongly lets a 13th person on.</>
        ) : (
          <>Step to <M>n = 13</M>: the spike sits wholly below 1000, so this method wrongly allows 13 people.</>
        )}{' '}
        But the lift carries the <b>total</b>: each extra person adds their own variability,{' '}
        <M>{'\\operatorname{Var}(W_n) = 8^2 n'}</M>, so the true spread (grey) grows like <M>{'8\\sqrt n'}</M>.
      </Notice>
    )
  } else if (n <= 11) {
    notice = (
      <Notice>
        With <M>{`n = ${n}`}</M> the mean total is <M>{`${m}`}</M> kg, about <M>{z.toFixed(1)}</M> standard deviations
        below the limit, so an overload is practically impossible. Step <M>n</M> up and watch the curve slide right and
        get <b>wider</b>, not narrower.
      </Notice>
    )
  } else if (n === 12) {
    notice = (
      <Notice tone="good">
        <b>
          <M>{'n = 12'}</M>: <M>{'\\Pr(W_{12} > 1000) \\approx 0.00015'}</M>, well under 1%.
        </b>{' '}
        The mean is 900 kg and the standard deviation <M>{'8\\sqrt{12} \\approx 27.7'}</M> kg, so 1000 kg is 3.6
        standard deviations away. Now try <M>{'n = 13'}</M>.
      </Notice>
    )
  } else if (n === 13) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>{'n = 13'}</M> is one too many.
        </b>{' '}
        The mean is 975 kg and the spread has grown to <M>{'8\\sqrt{13} \\approx 28.8'}</M> kg, so 1000 kg is only{' '}
        <M>0.87</M> standard deviations above the mean: about a 19% chance of overload. The maximum is{' '}
        <M>{'n = 12'}</M>. Turn on the common error to see how it sneaks 13 through.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        With 14 people the mean total, 1050 kg, is already over the limit, so the lift is overloaded about 95% of the
        time. Step back to <M>{'n = 13'}</M> and <M>{'n = 12'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[X0, X1]}
        y={[0, YTOP]}
        xStep={100}
        yStep={1}
        xLabel="kg"
        yLabel=""
        yLabels={false}
        xLabels={v => (v >= 600 && v <= 1100 ? String(v) : '')}
        height={300}
      >
        {!wrong && <Region top={f} bottom={() => 0} from={LIMIT} to={X1} color={C.bad} opacity={0.45} />}
        <Line.Segment point1={[LIMIT, 0]} point2={[LIMIT, YTOP * 0.97]} color={C.bad} style="dashed" weight={2} />
        <Label at={[LIMIT, YTOP * 0.97]} attach="e" color={C.bad} size={12}>1000 kg limit</Label>
        {wrong ? (
          <>
            <Plot.OfX y={f} domain={[X0, X1]} color={C.guide} weight={2} style="dashed" />
            <Label at={[m - 1.6 * s, f(m - 1.6 * s)]} attach="nw" color={C.guide} size={12}>true total</Label>
            <Polyline points={spike} color={C.bad} weight={2.5} fillOpacity={0} />
            <Label at={[m - 4, YTOP * 0.86]} attach="w" color={C.bad} size={12}>{`sd 8/√${n}`}</Label>
          </>
        ) : (
          <>
            <Line.Segment point1={[m, 0]} point2={[m, peak]} color={C.guide} style="dashed" weight={1.5} />
            <Plot.OfX y={f} domain={[X0, X1]} color={C.f} weight={3} />
            <Label at={[m, peak]} attach="n" color={C.f} size={12}>{`mean ${m}`}</Label>
            <Label at={[m - 1.5 * s, f(m - 1.5 * s)]} attach="nw" color={C.f} size={13}>{`W${'₀₁₂₃₄₅₆₇₈₉'[Math.floor(n / 10)]}${'₀₁₂₃₄₅₆₇₈₉'[n % 10]}`}</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={9} max={14} step={1} format={v => String(Math.round(v))} />
        <Toggle label="Common error: sd = 8/√n" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={`\\mathrm{E}(W_{${n}}) = 75 \\times ${n} = ${m}`} />
          {wrong ? (
            <>
              <Readout color={C.bad} tex={`\\text{sd} = \\tfrac{8}{\\sqrt{${n}}} \\approx ${sWrong.toFixed(2)}\\ \\text{(wrong)}`} />
              <Readout color={C.bad} tex={`\\Pr(W_{${n}} > 1000) ${probTex(pWrong)}\\ \\text{(wrong)}`} />
            </>
          ) : (
            <>
              <Readout color={C.f} tex={`\\mathrm{sd}(W_{${n}}) = 8\\sqrt{${n}} \\approx ${s.toFixed(2)}`} />
              <Readout color={p < 0.01 ? C.good : C.bad} tex={`\\Pr(W_{${n}} > 1000) ${probTex(p)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
