// 2019 Methods Exam 1 Q6b — P̂ is just X/12 in disguise. The distribution of X ~ Bi(12, 1/6), the
// number of faulty pegs in a box, is drawn as bars, and each bar carries two labels: the count X
// and the proportion P̂ = X/12. A cut-off line P̂ = c slides along the axis: P̂ < c picks out the
// bars strictly left of the line, so it only changes when the line crosses a bar. At c = 1/6 the
// line sits exactly on the bar X = 2, and "<" leaves it out, giving Pr(X = 0) + Pr(X = 1) ≈ 0.381.
// Two toggles show the wrong ideas: "≤" wrongly adds the bar on the line (0.296, total 0.677), and
// the sd formula's normal curve (mean 1/6, sd √15/36 ≈ 0.108 — the report's "standard deviation
// formula" error) puts half its area below 1/6, giving 0.5. Values checked in sympy.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle, num,
} from './kit'

const N = 12
const P = 1 / 6
const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const pmf = (k: number) => choose(N, k) * P ** k * (1 - P) ** (N - k)
const KS = [0, 1, 2, 3, 4, 5, 6] // 7 to 12 faulty pegs: about 0.001 in total, invisible as bars
// Bar for X = k is centred at x = k + 1, leaving the y-axis clear on the left.
const bx = (k: number) => k + 1

// sd of P̂ is √(p(1−p)/n) = √15/36; in count units (X = 12P̂) it is 12 times that, √15/3.
const SD_PHAT = Math.sqrt(15) / 36
const SD_X = Math.sqrt(15) / 3
const normalPdf = (x: number) => Math.exp(-0.5 * ((x - bx(2)) / SD_X) ** 2) / (SD_X * Math.sqrt(2 * Math.PI))
// Abramowitz & Stegun 7.1.26, good to about 1e-7 — plenty for a 3 dp readout.
function erf(z: number) {
  const s = Math.sign(z)
  const a = Math.abs(z)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const normalCdfPhat = (c: number) => 0.5 * (1 + erf((c - P) / (SD_PHAT * Math.SQRT2)))

const FRAC: Record<number, string> = { 0: '0', 1: '1/12', 2: '1/6', 3: '1/4', 4: '1/3', 5: '5/12', 6: '1/2' }
const FRAC_TEX: Record<number, string> = {
  0: '0', 1: '\\tfrac{1}{12}', 2: '\\tfrac16', 3: '\\tfrac14', 4: '\\tfrac13', 5: '\\tfrac{5}{12}', 6: '\\tfrac12',
}
const isWhole = (t: number) => Math.abs(t - Math.round(t)) < 1e-9
const trim = (v: number) => String(Number(v.toFixed(3)))

export default function Bars() {
  // t = 12c: the cut-off measured in twelfths, so the bars sit at whole numbers.
  const [t, setT] = useState(2)
  const [le, setLe] = useState(false)
  const [normal, setNormal] = useState(false)

  const whole = isWhole(t)
  const onQuestion = whole && Math.round(t) === 2
  const included = (k: number) => (le ? k <= t + 1e-9 : k < t - 1e-9)
  const sum = KS.reduce((s, k) => s + (included(k) ? pmf(k) : 0), 0)
  const op = le ? '\\le' : '<'
  const cTex = whole ? FRAC_TEX[Math.round(t)] : trim(t / 12)
  const lineText = whole ? (onQuestion ? 'c = 1/6 = 2/12' : `c = ${FRAC[Math.round(t)]}`) : `c ≈ ${(t / 12).toFixed(3)}`

  const gapAt = !normal && whole && Math.round(t) <= 4 ? pmf(Math.round(t)) : null

  const colour = (k: number) => {
    if (!included(k)) return C.guide
    if (onQuestion) return k === 2 ? C.bad : C.good
    return C.f
  }

  let notice
  if (normal) {
    notice = (
      <Notice tone="warn">
        The normal curve uses the sd formula <M>{'\\sqrt{\\tfrac{p(1-p)}{n}} = \\tfrac{\\sqrt{15}}{36} \\approx 0.108'}</M>{' '}
        and is centred at <M>{'\\tfrac16'}</M>, so it puts <b>exactly half</b> its area below <M>{'\\tfrac16'}</M>:{' '}
        <M>0.5</M>. But a box of 12 can only give <M>{'\\hat P = 0, \\tfrac{1}{12}, \\tfrac{2}{12}, \\ldots'}</M>, so the
        probability sits in bars, and a whole bar (<M>0.296</M>) sits right on <M>{'\\tfrac16'}</M>. The curve splits
        it in half; the question&apos;s &ldquo;<M>{'<'}</M>&rdquo; leaves it out completely. Turn the curve off and
        add up the bars.
      </Notice>
    )
  } else if (onQuestion && le) {
    notice = (
      <Notice tone="warn">
        With <M>{'\\le'}</M> the red bar joins in: <M>X = 2</M> gives <M>{'\\hat P = \\tfrac{2}{12} = \\tfrac16'}</M>{' '}
        exactly, which is <b>not</b> less than <M>{'\\tfrac16'}</M>. It adds <M>0.296</M> and the total becomes{' '}
        <M>0.677</M>. The question says <M>{'<'}</M>, so turn &ldquo;<M>{'\\le'}</M>&rdquo; off.
      </Notice>
    )
  } else if (onQuestion) {
    notice = (
      <Notice tone="good">
        The cut-off lands exactly on the bar <M>X = 2</M>, because <M>{'12 \\times \\tfrac16 = 2'}</M>, and{' '}
        &ldquo;<M>{'<'}</M>&rdquo; leaves that bar out. Only the green bars count:{' '}
        <M>{'\\Pr(X=0) + \\Pr(X=1) \\approx 0.112 + 0.269 = 0.381'}</M>. Slide <M>c</M> down to about <M>0.1</M>:
        the answer doesn&apos;t change until the line reaches <M>{'\\tfrac{1}{12}'}</M>.
      </Notice>
    )
  } else if (!whole) {
    notice = (
      <Notice>
        <M>{'\\hat P = \\tfrac{X}{12}'}</M> can only land on multiples of <M>{'\\tfrac{1}{12}'}</M>, so{' '}
        <M>{`\\hat P ${op} c`}</M> is the same event as <M>{`X ${op} 12c = ${trim(t)}`}</M>: the bars left of the
        line. Between two bars nothing changes; the probability only jumps when the line crosses a bar. Slide back to{' '}
        <M>{'c = \\tfrac16'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here the line sits exactly on the bar <M>{`X = ${Math.round(t)}`}</M>.{' '}
        {le ? (
          <>
            With <M>{'\\le'}</M> that bar is included, because <M>{`\\hat P = ${FRAC_TEX[Math.round(t)]}`}</M> is allowed.
          </>
        ) : (
          <>
            With <M>{'<'}</M> that bar is left out, because <M>{`\\hat P = ${FRAC_TEX[Math.round(t)]}`}</M> is not less
            than itself.
          </>
        )}{' '}
        The question&apos;s cut-off is <M>{'c = \\tfrac16'}</M>: slide back to it.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.2, 7.6]} y={[-0.07, 0.4]} xStep={20} yStep={0.1} labels={false} xLabel="" yLabel="" height={300}>
        {[0.1, 0.2, 0.3].map(v => (
          <Label key={v} at={[0, v]} attach="w" size={11} bold={false}>{v.toFixed(1)}</Label>
        ))}
        <Label at={[-0.75, 0]} attach="s" size={12} gap={5} italic>X</Label>
        <Label at={[-0.75, 0]} attach="s" size={12} gap={22} italic>P̂</Label>
        {KS.map(k => (
          <Label key={`x${k}`} at={[bx(k), 0]} attach="s" size={11} gap={5}>{String(k)}</Label>
        ))}
        {KS.map(k => (
          <Label key={`p${k}`} at={[bx(k), 0]} attach="s" size={10.5} gap={22} bold={false} color={k === 2 ? C.violet : C.ink}>
            {k === 0 ? '0' : `${k}/12`}
          </Label>
        ))}
        {KS.map(k => {
          const h = pmf(k)
          const on = included(k)
          return (
            <Polygon
              key={k}
              points={[[bx(k) - 0.35, 0], [bx(k) + 0.35, 0], [bx(k) + 0.35, h], [bx(k) - 0.35, h]]}
              color={colour(k)}
              fillOpacity={on ? 0.7 : 0.3}
              weight={on ? 1.5 : 0.5}
            />
          )
        })}
        {!normal &&
          [0, 1, 2, 3, 4].map(k => (
            <Label key={`v${k}`} at={[bx(k), pmf(k)]} attach="n" size={10.5} gap={3} color={included(k) ? colour(k) : C.ink} bold={false}>
              {num(pmf(k), 3)}
            </Label>
          ))}
        {normal && (
          <>
            <Region top={x => normalPdf(x)} bottom={() => 0} from={0} to={Math.max(0, 1 + t)} color={C.bad} opacity={0.14} />
            <Plot.OfX y={normalPdf} domain={[0, 7.6]} color={C.bad} weight={2.5} />
          </>
        )}
        {/* On a labelled bar, break the line where the bar's value is printed so it stays readable. */}
        {gapAt === null ? (
          <Line.Segment point1={[1 + t, 0]} point2={[1 + t, 0.37]} color={C.violet} style="dashed" weight={2} />
        ) : (
          <>
            <Line.Segment point1={[1 + t, 0]} point2={[1 + t, gapAt]} color={C.violet} style="dashed" weight={2} />
            <Line.Segment point1={[1 + t, gapAt + 0.055]} point2={[1 + t, 0.37]} color={C.violet} style="dashed" weight={2} />
          </>
        )}
        <Label at={[1 + t, 0.37]} attach="n" size={12} gap={4} color={C.violet}>{lineText}</Label>
      </Plane>
      <Controls>
        <Slider
          label="c"
          value={t}
          onChange={setT}
          min={0}
          max={6}
          step={0.125}
          format={v => (isWhole(v) ? FRAC[Math.round(v)] : (v / 12).toFixed(3))}
        />
        <Buttons>
          <Toggle label="Use ≤ instead of <" checked={le} onChange={setLe} />
          <Toggle label="What if I use the sd formula?" checked={normal} onChange={setNormal} />
        </Buttons>
        <Readouts>
          <Readout
            color={onQuestion ? (le ? C.bad : C.good) : C.f}
            tex={`\\Pr(\\hat P ${op} ${cTex}) = \\Pr(X ${op} ${trim(t)}) \\approx ${num(sum, 3)}`}
          />
          {onQuestion && !le && <Readout color={C.good} tex={'\\tfrac{17}{6}\\left(\\tfrac56\\right)^{11} \\approx 0.381\\ \\checkmark'} />}
          {normal && <Readout color={C.bad} tex={`\\text{normal curve: } ${num(normalCdfPhat(t / 12), 3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
