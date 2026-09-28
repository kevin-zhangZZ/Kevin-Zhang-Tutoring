// 2018 Specialist Exam 2 Q6f — the decision rule is fixed under H₀, but the probability of
// keeping H₀ is worked out in the TRUE world. The dashed blue curve is X̄ under H₀ (μ = 150), whose
// lower 5% gives the cut-off 146.51 from part e. The orange curve is X̄ when the true mean is μ
// (slider, starts at part f's 145). Orange area right of the cut-off = Pr(H₀ kept) = 0.24 at
// μ = 145 (a Type II error); green area left of it = Pr(H₀ rejected). Sliding μ to 150 gives 0.95 —
// the answer you get by forgetting to move the curve. "Take 100 samples" simulates 100 sample
// means from the true world as a strip of dots above the curves.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider } from './kit'

function erf(x: number) {
  // Abramowitz & Stegun 7.1.26, |error| < 1.5e-7.
  const s = Math.sign(x)
  const a = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const SE = 15 / Math.sqrt(50)
const cdf = (x: number, m: number) => 0.5 * (1 + erf((x - m) / (SE * Math.SQRT2)))
const pdf = (x: number, m: number) => Math.exp(-0.5 * ((x - m) / SE) ** 2) / (SE * Math.sqrt(2 * Math.PI))
const CUT = 146.51 // part e's boundary, as used in the working
const X0 = 135
const X1 = 160
const TOP = 0.3

/** One draw from N(m, SE²) by Box–Muller. */
function draw(m: number) {
  const u = 1 - Math.random()
  const v = Math.random()
  return m + SE * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

export default function TwoWorlds() {
  const [mu, setMu] = useState(145)
  const [samples, setSamples] = useState<{ x: number; y: number }[]>([])

  const keep = 1 - cdf(CUT, mu) // Pr(X̄ > 146.51 | μ)
  const kept = samples.filter(s => s.x > CUT).length
  const at145 = Math.abs(mu - 145) < 0.05
  const at150 = Math.abs(mu - 150) < 0.05

  const changeMu = (v: number) => {
    setMu(Math.round(v * 10) / 10)
    setSamples([])
  }
  const takeSamples = () =>
    setSamples(Array.from({ length: 100 }, () => ({ x: draw(mu), y: 0.245 + 0.045 * Math.random() })))

  let notice
  if (at150) {
    notice = (
      <Notice tone="warn">
        Now the truth <em>is</em> <M>150</M>: the two curves coincide and <M>{'\\Pr(H_0 \\text{ kept}) = 0.95'}</M>,
        just <M>1 - 0.05</M>. That is the answer you get if you forget to move the curve. Part f puts you in a world
        where the true mean is <M>145</M>, so slide <M>\mu</M> back there.
      </Notice>
    )
  } else if (at145) {
    notice = (
      <Notice tone="good">
        This is part f&apos;s world. The rule has not changed (keep <M>H_0</M> whenever <M>{'\\overline{x} > 146.51'}</M>),
        but sample means now scatter around <M>145</M>. The orange area right of the line is <M>0.24</M>: about one
        sample in four still looks &ldquo;fine&rdquo;, so a false <M>H_0</M> survives. Press &ldquo;Take 100
        samples&rdquo; and count the orange dots.
      </Notice>
    )
  } else if (mu < 145) {
    notice = (
      <Notice>
        The further the true mean is below <M>150</M>, the less of the orange curve reaches past the line, so the test
        is fooled less often. Slide <M>\mu</M> towards <M>150</M> and watch the orange area grow.
      </Notice>
    )
  } else if (mu < 150) {
    notice = (
      <Notice>
        As the true mean gets closer to <M>150</M>, more of the orange curve lies right of the line: a small shortfall
        is easy to miss, so a Type II error becomes more likely. The line itself never moves, because it was fixed
        using <M>\mu = 150</M> in part e.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Above <M>150</M> the test almost always keeps <M>H_0</M>: it only rejects for sample means that are too{' '}
        <em>low</em>, because <M>{'H_1: \\mu < 150'}</M>. Slide back to <M>145</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, TOP]} xStep={5} yStep={1} yLabels={false} xLabel="" yLabel="" height={320}>
        <Region top={x => pdf(x, mu)} bottom={() => 0} from={X0} to={CUT} color={C.good} opacity={0.28} />
        <Region top={x => pdf(x, mu)} bottom={() => 0} from={CUT} to={X1} color={C.g} opacity={0.4} />
        <Plot.OfX y={x => pdf(x, 150)} domain={[X0, X1]} color={C.f} weight={2} style="dashed" />
        <Plot.OfX y={x => pdf(x, mu)} domain={[X0, X1]} color={C.g} weight={3} />
        <Line.Segment point1={[CUT, 0]} point2={[CUT, 0.205]} color={C.bad} style="dashed" weight={2} />
        <Label at={[CUT, 0.2]} attach="w" color={C.good} size={12}>reject H₀</Label>
        <Label at={[CUT, 0.2]} attach="e" color={C.g} size={12}>keep H₀</Label>
        <Label at={[CUT, 0.205]} attach="n" color={C.bad} size={12} gap={4}>146.51</Label>
        {!at150 && (
          <Label at={[150 + 1.2 * SE, pdf(150 + 1.2 * SE, 150)]} attach="e" color={C.f} size={12}>H₀: μ = 150</Label>
        )}
        <Label at={[mu - 1.2 * SE, pdf(mu - 1.2 * SE, mu)]} attach="w" color={C.g} size={12}>{`true μ = ${mu.toFixed(1)}`}</Label>
        {samples.map((s, i) => (
          <Point key={i} x={s.x} y={s.y} color={s.x > CUT ? C.g : C.good} svgCircleProps={{ r: 3 }} />
        ))}
      </Plane>
      <Controls>
        <Slider label="\mu_{\text{true}}" value={mu} onChange={changeMu} min={140} max={152} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <ActionButton label="Take 100 samples of 50 buffaloes" onClick={takeSamples} />
          <ActionButton label="μ = 145" onClick={() => changeMu(145)} />
          <ActionButton label="μ = 150" onClick={() => changeMu(150)} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\Pr(\\overline{X} > 146.51 \\mid \\mu = ${mu.toFixed(1)}) \\approx ${keep.toFixed(4)}`} />
          <Readout color={C.good} tex={`\\Pr(\\text{reject } H_0) \\approx ${(1 - keep).toFixed(4)}`} />
          {samples.length > 0 && <Readout tex={`H_0 \\text{ kept in } ${kept} \\text{ of } 100 \\text{ samples}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
