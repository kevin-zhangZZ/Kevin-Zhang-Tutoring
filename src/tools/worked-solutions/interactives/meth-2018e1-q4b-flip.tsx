// 2018 Methods Exam 1 Q4b — why b is negative. On the standard normal, the blue upper tail Pr(Z > ½)
// is Pr(X > 7) after standardising (≈ 0.309). The question wants the same area written as a LOWER
// tail, Pr(Z < b). Slide b (or try the answers ½, −¼ and 5): the orange area Pr(Z < b) matches the
// blue one only at b = −½, the mirror image of ½ in the line z = 0. b = ½ gives the complement 0.691;
// b = −¼ (dividing by the variance) gives 0.401; b = 5 (an x-value, not a z-value) shades almost 1.
import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, tick } from './kit'

const LO = -3.5
const HI = 3.5

// Abramowitz & Stegun 7.1.26 (|error| < 1.5e-7) — plenty for 3 d.p. readouts.
function erf(x: number) {
  const s = Math.sign(x)
  const a = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2))
const pdf = (z: number) => Math.exp(-(z * z) / 2) / Math.sqrt(2 * Math.PI)
const TARGET = 1 - Phi(0.5) // Pr(Z > 1/2) = Pr(X > 7)

const near = (a: number, b: number) => Math.abs(a - b) < 0.006
const fmt = (v: number) => (v < 0 ? '-' : '') + Math.abs(v).toFixed(2)

export default function Flip() {
  const [b, setB] = useState(0.5)
  const area = Phi(b)
  const hit = near(b, -0.5)
  const offChart = b > HI
  const bVis = Math.min(b, HI)
  const orange = hit ? C.good : C.g

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b>Match.</b> The green lower tail <M>{'\\Pr\\left(Z < -\\tfrac12\\right)'}</M> is the blue upper tail{' '}
        <M>{'\\Pr\\left(Z > \\tfrac12\\right)'}</M> reflected in the line <M>z = 0</M>, so the areas are equal and{' '}
        <M>{'b = -\\tfrac12'}</M>. In general <M>{'\\Pr(Z > a) = \\Pr(Z < -a)'}</M>: flip the tail, flip the sign.
      </Notice>
    )
  } else if (near(b, 0.5)) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>{'b = \\tfrac12'}</M> keeps the number but not the tail.
        </b>{' '}
        <M>{'\\Pr\\left(Z < \\tfrac12\\right)'}</M> is everything <em>except</em> the blue tail, about{' '}
        <M>{area.toFixed(3)}</M>: the complement, not a match. A lower tail with the same area as the blue one has to
        sit on the other side of <M>0</M>. Drag <M>b</M> left, or press &ldquo;Reflect the blue tail&rdquo;.
      </Notice>
    )
  } else if (near(b, -0.25)) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>{'b = -\\tfrac14'}</M> comes from dividing by the variance
        </b>
        , <M>{'\\frac{7-6}{4}'}</M>. It has the right sign, but <M>{'\\Pr\\left(Z < -\\tfrac14\\right) \\approx'}</M>{' '}
        <M>{area.toFixed(3)}</M>, more than the blue <M>{TARGET.toFixed(3)}</M>. The real tail is thinner, so{' '}
        <M>b</M> must be further left.
      </Notice>
    )
  } else if (offChart) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>b = 5</M> is an <M>x</M>-value, not a <M>z</M>-value.
        </b>{' '}
        It comes from <M>{'\\Pr(X > 7) = \\Pr(X < 5)'}</M> and stopping there. On the <M>Z</M> scale, 5 means five
        standard deviations above the mean, far off this chart: <M>{'\\Pr(Z < 5) \\approx 1.000'}</M>, almost the
        whole curve. Standardise the 5 first: <M>{'\\frac{5-6}{2} = -\\tfrac12'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The orange area <M>{`\\Pr(Z < ${fmt(b)})`}</M> is about <M>{area.toFixed(3)}</M>, which is{' '}
        {area > TARGET ? 'too much' : 'too little'} next to the blue <M>{TARGET.toFixed(3)}</M>. Drag <M>b</M>{' '}
        {area > TARGET ? 'left' : 'right'} until the two areas match. Where must <M>b</M> land, and why?
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[LO, HI]}
        y={[0, 0.45]}
        xStep={0.5}
        yStep={0.1}
        height={270}
        xLabel="z"
        yLabel=""
        yLabels={false}
        xLabels={v => (near(Math.abs(v), 0.5) ? (v < 0 ? '−½' : '½') : Number.isInteger(v) && Math.abs(v) <= 3 ? tick(v) : '')}
      >
        <Region top={pdf} bottom={() => 0} from={LO} to={bVis} color={orange} opacity={0.3} />
        <Region top={pdf} bottom={() => 0} from={0.5} to={HI} color={C.f} opacity={0.35} />
        <Plot.OfX y={pdf} domain={[LO, HI]} color={C.ink} weight={2.5} />
        <Line.Segment point1={[0.5, 0]} point2={[0.5, pdf(0.5)]} color={C.f} weight={2} />
        <Label at={[1.4, 0.032]} color={C.f} attach="c" size={11}>
          {'Pr(Z > ½)'}
        </Label>
        {!offChart && <Line.Segment point1={[b, 0]} point2={[b, pdf(b)]} color={orange} weight={2.5} />}
        {!offChart && (
          <Label at={[b, pdf(b)]} color={orange} attach={b < 0.5 ? 'nw' : 'ne'} size={13}>
            b
          </Label>
        )}
        {offChart && (
          <Label at={[HI, 0.3]} color={orange} attach="w" size={12}>
            b = 5 →
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="b" value={Math.min(b, 3)} onChange={setB} min={-3} max={3} step={0.01} format={v => (offChart ? '5.00' : v.toFixed(2))} />
        <Buttons>
          <ActionButton label="b = ½" onClick={() => setB(0.5)} />
          <ActionButton label="b = −¼" onClick={() => setB(-0.25)} />
          <ActionButton label="b = 5" onClick={() => setB(5)} />
          <ActionButton label="Reflect the blue tail" onClick={() => setB(-0.5)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\Pr\\left(Z > \\tfrac12\\right) \\approx ${TARGET.toFixed(3)}`} />
          <Readout color={orange} tex={`\\Pr(Z < ${offChart ? '5' : fmt(b)}) \\approx ${area.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
