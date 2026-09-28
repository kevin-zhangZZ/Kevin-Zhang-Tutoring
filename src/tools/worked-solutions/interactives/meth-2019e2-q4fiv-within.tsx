// 2019 Methods Exam 2 Q4f.iv — P̂ = X/36 can only take the values 0, 1/36, 2/36, …, so "within
// one standard deviation of 0.0527" just picks out whole bars of X ~ Bi(36, 0.0527). Each bar is
// labelled with its count X and its proportion P̂. The band 0.0527 ± m·sd(P̂) (sd = 0.03724) is
// shaded; at m = 1 it runs from P̂ = 0.0155 to 0.0899, i.e. 0.557 < X < 3.238, so only X = 1, 2, 3
// are inside: 0.2852 + 0.2777 + 0.1751 ≈ 0.7380. A toggle overlays the normal approximation the
// question forbids: its area within one sd is the familiar 0.6827 (and it even puts 0.08 below
// X = 0). Values checked in scipy.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const N = 36
const P = 0.0527
const SD = Math.sqrt((P * (1 - P)) / N) // sd(P̂) ≈ 0.03724
const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const pmf = (k: number) => choose(N, k) * P ** k * (1 - P) ** (N - k)
const KS = [0, 1, 2, 3, 4, 5, 6] // X ≥ 7 has total probability 0.0024: invisible as bars
const SHIFT = 2 // bar for X = k is centred at x = k + 2, clear of the y-axis
const bx = (k: number) => k + SHIFT
const MEAN_X = N * P // 1.8972
const SD_X = N * SD // 1.3406
const normalPdf = (x: number) => Math.exp(-0.5 * ((x - SHIFT - MEAN_X) / SD_X) ** 2) / (SD_X * Math.sqrt(2 * Math.PI))
function erf(z: number) {
  const s = Math.sign(z)
  const a = Math.abs(z)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const phatText = (k: number) => (k === 0 ? '0' : (k / N).toFixed(3).replace(/^0/, ''))

export default function Within() {
  const [m, setM] = useState(1)
  const [normal, setNormal] = useState(false)

  const loP = P - m * SD
  const hiP = P + m * SD
  const lo = N * loP // in counts
  const hi = N * hiP
  const inside = KS.filter(k => k > lo && k < hi)
  const sum = inside.reduce((s, k) => s + pmf(k), 0)
  const normalArea = erf(m / Math.SQRT2)
  const atOne = Math.abs(m - 1) < 1e-9
  const yTop = 0.33

  let notice
  if (normal) {
    notice = (
      <Notice tone="warn">
        The red normal curve spreads its area smoothly, even putting about <M>0.08</M> below <M>X = 0</M>, which is
        impossible. Its area inside the band is <M>{num(normalArea, 4)}</M>
        {atOne ? <> (the familiar <M>68\%</M>)</> : null}, but the real bars inside add to <M>{num(sum, 4)}</M>. With
        only <M>36</M> butterflies and <M>p</M> this small the distribution is lumpy and skewed, which is why the
        question says not to use the normal approximation.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice tone="good">
        <b>Within one sd:</b> <M>{'0.0155 < \\hat P < 0.0899'}</M>. Multiply by <M>36</M> to get counts:{' '}
        <M>{'0.557 < X < 3.238'}</M>, and the only whole numbers inside are <M>X = 1, 2, 3</M>. Add those three bars:{' '}
        <M>{'0.7380'}</M>. Turn on the normal approximation to see what the question is warning you about.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Widen or narrow the band and watch the total: it only <b>jumps</b> when an edge crosses a bar, because{' '}
        <M>\hat P</M> can only be <M>{'0, \\tfrac{1}{36}, \\tfrac{2}{36}, \\ldots'}</M>. The answer comes from{' '}
        <em>which bars</em> are inside, not from a smooth curve. Set <M>m = 1</M> for the question.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 8.8]} y={[-0.065, yTop]} xStep={20} yStep={0.1} xLabels={false} yLabels={v => (v > 0.05 ? v.toFixed(1) : '')} xLabel="" yLabel="" height={320}>
        <Polygon points={[[bx(0) + lo, 0], [bx(0) + hi, 0], [bx(0) + hi, yTop], [bx(0) + lo, yTop]]} color={C.violet} fillOpacity={0.1} weight={0} />
        <Line.Segment point1={[bx(0) + lo, 0]} point2={[bx(0) + lo, yTop]} color={C.violet} style="dashed" weight={1.5} />
        <Line.Segment point1={[bx(0) + hi, 0]} point2={[bx(0) + hi, yTop]} color={C.violet} style="dashed" weight={1.5} />
        <Line.Segment point1={[bx(0) + MEAN_X, 0]} point2={[bx(0) + MEAN_X, yTop]} color={C.guide} style="dashed" weight={1} />
        <Label at={[bx(0) + MEAN_X, yTop]} attach="s" size={11} gap={3} color={C.violet}>{`0.0527 ± ${atOne ? '' : num(m, 2) + ' '}sd`}</Label>
        {KS.map(k => {
          const on = k > lo && k < hi
          return (
            <Polygon
              key={k}
              points={[[bx(k) - 0.36, 0], [bx(k) + 0.36, 0], [bx(k) + 0.36, pmf(k)], [bx(k) - 0.36, pmf(k)]]}
              color={on ? C.good : C.guide}
              fillOpacity={on ? 0.7 : 0.3}
              weight={on ? 1.5 : 0.5}
            />
          )
        })}
        <Label at={[0.95, 0]} attach="s" size={12} gap={5} italic>X</Label>
        <Label at={[0.95, 0]} attach="s" size={12} gap={24} italic>P̂</Label>
        {KS.map(k => (
          <Label key={`x${k}`} at={[bx(k), 0]} attach="s" size={11} gap={5}>{String(k)}</Label>
        ))}
        {KS.map(k => (
          <Label key={`p${k}`} at={[bx(k), 0]} attach="s" size={10} gap={24} bold={false}>{phatText(k)}</Label>
        ))}
        {normal && (
          <>
            <Region top={normalPdf} bottom={() => 0} from={bx(0) + lo} to={bx(0) + hi} color={C.bad} opacity={0.14} />
            <Plot.OfX y={normalPdf} domain={[0, 8.8]} color={C.bad} weight={2.5} />
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={setM} min={0.25} max={3} step={0.05} />
        <Buttons>
          <Toggle label="Use a normal approximation" checked={normal} onChange={setNormal} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`${loP.toFixed(4)} < \\hat P < ${num(hiP, 4)}`} />
          <Readout color={C.violet} tex={`${lo.toFixed(3)} < X < ${num(hi, 3)}`} />
          <Readout
            color={atOne ? C.good : C.ink}
            tex={
              inside.length === 0
                ? '\\text{no whole } X \\text{ inside: probability } 0'
                : `\\Pr(${inside[0]} \\le X \\le ${inside[inside.length - 1]}) \\approx ${num(sum, 4)}${atOne ? '\\ \\checkmark' : ''}`
            }
          />
          {normal && <Readout color={C.bad} tex={`\\text{normal curve: } ${num(normalArea, 4)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
