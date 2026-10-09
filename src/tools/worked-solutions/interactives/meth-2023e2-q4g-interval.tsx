// 2023 Methods Exam 2 Q4g — a confidence interval is p̂ ± E, so its centre gives p̂ and its
// half-width gives z. Slide the confidence level and watch the interval built from n = 32 and
// p̂ = 0.84375 grow or shrink about its centre: it lines up with the given (0.7382, 0.9493) only at
// 90% (95% is visibly too wide). A toggle centres it at 0.8904 instead (the population probability
// the report says was often used as p̂): then no level makes it line up.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, Toggle } from './kit'

const L_GIVEN = 0.7382
const R_GIVEN = 0.9493
const P_RIGHT = (L_GIVEN + R_GIVEN) / 2 // 0.84375
const P_WRONG = 0.8904
const N = 32
const Y_GIVEN = 1.45
const Y_YOURS = 0.7

/** Standard normal cdf (Abramowitz & Stegun 7.1.26; error below 2 × 10⁻⁷). */
function phi(z: number) {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))))
  const erf = 1 - poly * Math.exp(-x * x)
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf)
}

/** The z with Pr(−z < Z < z) = level, by bisection. */
function zFor(level: number) {
  let lo = 0
  let hi = 5
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (2 * phi(mid) - 1 < level) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

export default function Interval() {
  const [level, setLevel] = useState(95)
  const [wrong, setWrong] = useState(false)

  const p = wrong ? P_WRONG : P_RIGHT
  const z = zFor(level / 100)
  const se = Math.sqrt((p * (1 - p)) / N)
  const e = z * se
  const lo = p - e
  const hi = p + e
  const matches = !wrong && level === 90
  const col = wrong ? C.bad : matches ? C.good : C.f

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>0.8904</M> is <M>{'\\Pr(6.54<D<6.86)'}</M> from the model, not the inspector&apos;s sample. The interval is
        always <M>{'\\hat p \\pm E'}</M>, so changing the level only grows or shrinks it about <M>0.8904</M>: slide the
        level and see that it never lines up with the given ends. Turn the toggle off: <M>{'\\hat p'}</M> must be the
        given interval&apos;s midpoint.
      </Notice>
    )
  } else if (matches) {
    notice = (
      <Notice tone="good">
        <b>Both ends line up at 90%.</b> Here <M>z = 1.6449</M>, and the interval rounds to{' '}
        <M>(0.7382,\ 0.9493)</M>. Working backwards from the given ends gives <M>z = 1.6444</M> (the ends were
        rounded), and <M>{'\\Pr(-1.6444<Z<1.6444) = 0.8999\\ldots'}</M>, so the level is 90%.
      </Notice>
    )
  } else if (level === 95) {
    notice = (
      <Notice>
        At 95%, <M>z = 1.96</M> and the interval is <M>{`(${lo.toFixed(4)},\\ ${hi.toFixed(4)})`}</M>: centred correctly,
        but <b>wider</b> than the given one. A narrower interval means a smaller <M>z</M>, so a lower level. Slide the
        level down until both ends line up.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The centre is right, but at {level}% the interval is {level > 90 ? 'too wide' : 'too narrow'}:{' '}
        <M>{`(${lo.toFixed(4)},\\ ${hi.toFixed(4)})`}</M>. The half-width <M>E</M> is <M>z</M> times{' '}
        <M>{'\\sqrt{\\tfrac{\\hat p(1-\\hat p)}{n}}'}</M>, so {level > 90 ? 'lower' : 'raise'} the level (and with
        it <M>z</M>) until both ends line up.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0.65, 1.07]} y={[0, 2]} xStep={0.1} yStep={10} height={220} xLabel="" yLabels={false} xLabels={v => (v > 1.001 ? '' : v.toFixed(1))}>
        <Line.Segment point1={[L_GIVEN, 0]} point2={[L_GIVEN, Y_GIVEN]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[R_GIVEN, 0]} point2={[R_GIVEN, Y_GIVEN]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[L_GIVEN, Y_GIVEN]} point2={[R_GIVEN, Y_GIVEN]} color={C.guide} weight={6} />
        <Point x={P_RIGHT} y={Y_GIVEN} color={C.guide} />
        <Label at={[L_GIVEN, Y_GIVEN]} attach="n" size={12}>0.7382</Label>
        <Label at={[R_GIVEN, Y_GIVEN]} attach="n" size={12}>0.9493</Label>
        <Label at={[P_RIGHT, Y_GIVEN]} attach="n" size={12} color={C.guide}>given</Label>
        <Line.Segment point1={[lo, Y_YOURS]} point2={[hi, Y_YOURS]} color={col} weight={6} />
        <Point x={p} y={Y_YOURS} color={col} />
        <Label at={[p, Y_YOURS]} attach="s" size={12} color={col}>{wrong ? 'centre 0.8904' : 'centre 0.84375'}</Label>
        <Label at={[lo, Y_YOURS]} attach="n" size={12} color={col}>{lo.toFixed(4)}</Label>
        <Label at={[hi, Y_YOURS]} attach="n" size={12} color={col}>{hi.toFixed(4)}</Label>
      </Plane>
      <Controls>
        <Slider label="\text{level}" value={level} onChange={setLevel} min={80} max={99} step={1} format={v => `${v}%`} />
        <Toggle label="Centre at 0.8904 instead" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={`\\hat p = ${wrong ? '0.8904' : '0.84375'}`} />
          <Readout tex={`z = ${z.toFixed(4)}`} />
          <Readout color={col} tex={`E = z\\sqrt{\\tfrac{\\hat p(1-\\hat p)}{32}} = ${e.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
