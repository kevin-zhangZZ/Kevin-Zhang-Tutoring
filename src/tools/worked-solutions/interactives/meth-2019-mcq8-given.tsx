// 2019 Methods Exam 2 MCQ 8 — what "given" does to a binomial distribution. The bars of
// X ~ Bi(80, 0.9) for x = 60 to 80; the condition X ≥ c greys out the bars it rules out, and the
// answer is the green x = 74 bar's share of the bars that are left. "Rescale" divides every kept
// bar by Pr(X ≥ c) so they total 1 again, and the green bar grows from 0.1235 to 0.1494 at c = 70.
// The slider moves the condition, and a toggle shows the "at least 74" misreading (option A).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Toggle } from './kit'

const N = 80
const P = 0.9
const TARGET = 74
const OFF = 58 // bar k is drawn at u = k − OFF, so the y-axis (u = 0) sits just left of the bars
const HALF = 0.4

const LN_FACT: number[] = [0]
for (let i = 1; i <= N; i++) LN_FACT.push(LN_FACT[i - 1] + Math.log(i))
const pmf = (k: number) => Math.exp(LN_FACT[N] - LN_FACT[k] - LN_FACT[N - k] + k * Math.log(P) + (N - k) * Math.log(1 - P))
const atLeast = (k: number) => {
  let s = 0
  for (let j = k; j <= N; j++) s += pmf(j)
  return s
}
const KS = Array.from({ length: 21 }, (_, i) => 60 + i)
const P74 = pmf(TARGET)
const P_GE74 = atLeast(TARGET)

export default function Given() {
  const [c, setC] = useState(70)
  const [rescale, setRescale] = useState(false)
  const [tail, setTail] = useState(false)

  const denom = atLeast(c)
  const scale = rescale ? 1 / denom : 1
  const answer = P74 / denom
  const tailAnswer = P_GE74 / denom

  const barColor = (k: number) => {
    if (k < c) return C.guide
    if (k === TARGET) return C.good
    if (tail && k > TARGET) return C.g
    return C.f
  }
  const height = (k: number) => (k < c ? pmf(k) : pmf(k) * scale)
  const u = (k: number) => k - OFF

  let notice
  if (tail) {
    notice = (
      <Notice tone="warn">
        Reading &ldquo;exactly 74&rdquo; as &ldquo;at least 74&rdquo; adds the orange bars <M>75</M> to <M>80</M> to the
        green one: <M>{'\\Pr(X\\ge 74) \\approx 0.3005'}</M>, and{' '}
        <M>{`0.3005 \\div ${denom.toFixed(4)} \\approx ${tailAnswer.toFixed(4)}`}</M>
        {c === 70 ? ', option A' : ''}. The question asks for one bar, not a tail. Turn the toggle off.
      </Notice>
    )
  } else if (c <= 64) {
    notice = (
      <Notice>
        A condition this weak rules out almost nothing: <M>{`\\Pr(X\\ge ${c}) \\approx ${denom.toFixed(4)}`}</M>, so the
        answer is barely different from <M>{'\\Pr(X=74) \\approx 0.1235'}</M>. A &ldquo;given&rdquo; only changes the
        answer when it throws outcomes away. Slide back to <M>70</M>.
      </Notice>
    )
  } else if (c !== 70) {
    notice = (
      <Notice>
        {c > 70 ? 'A stricter' : 'A looser'} condition throws away {c > 70 ? 'more' : 'fewer'} bars, so the green bar is
        a {c > 70 ? 'bigger' : 'smaller'} share of what is left:{' '}
        <M>{`${P74.toFixed(4)} \\div ${denom.toFixed(4)} \\approx ${answer.toFixed(4)}`}</M>. The question&apos;s
        condition is <M>{'X \\ge 70'}</M>; slide back to <M>70</M>.
      </Notice>
    )
  } else if (!rescale) {
    notice = (
      <Notice>
        &ldquo;At least 70&rdquo; rules out the grey bars: those outcomes did not happen. The blue and green bars are
        all that is left, with total probability <M>{'\\Pr(X\\ge 70) \\approx 0.8266'}</M>, and the answer is the green
        bar&apos;s share of that. Turn on <b>Rescale</b> to see the kept bars stretched so they total <M>1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Dividing every kept bar by <M>0.8266</M> makes them total <M>1</M> again: this is the distribution of{' '}
        <M>X</M> once you know <M>{'X \\ge 70'}</M>. The green bar grows from <M>0.1235</M> (dashed line) to{' '}
        <M>0.1494</M>, option C. Try <b>&ldquo;At least 74&rdquo;</b> to see where option A comes from.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 23]}
        y={[0, 0.25]}
        xStep={1}
        yStep={0.05}
        xLabels={v => {
          const k = Math.round(v) + OFF
          return k % 5 === 0 && k !== 75 ? String(k) : ''
        }}
        yLabels={v => v.toFixed(2)}
        yLabel=""
        height={320}
      >
        {KS.map(k => (
          <Polygon
            key={k}
            points={[
              [u(k) - HALF, 0],
              [u(k) + HALF, 0],
              [u(k) + HALF, height(k)],
              [u(k) - HALF, height(k)],
            ]}
            color={barColor(k)}
            fillOpacity={k < c ? 0.15 : k === TARGET ? 0.85 : 0.45}
            weight={1}
          />
        ))}
        {rescale && (
          <Line.Segment point1={[u(TARGET) - 0.6, P74]} point2={[u(TARGET) + 0.6, P74]} color={C.ink} style="dashed" weight={2} />
        )}
        <Line.Segment point1={[u(c) - 0.5, 0]} point2={[u(c) - 0.5, 0.235]} color={C.ink} style="dashed" weight={1.5} />
        <Label at={[u(c) - 0.5, 0.235]} attach="e">{`X ≥ ${c}`}</Label>
        {c > 64 && (
          <Label at={[u(c) - 0.5, 0.235]} attach="w" color={C.guide}>
            ruled out
          </Label>
        )}
        <Label at={[u(TARGET), 0]} attach="s" color={C.good} gap={5}>
          74
        </Label>
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={60} max={71} step={1} format={v => `X ≥ ${v}`} />
        <Buttons>
          <Toggle label="Rescale the kept bars to total 1" checked={rescale} onChange={setRescale} />
          <Toggle label="At least 74 (option A)" checked={tail} onChange={setTail} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`\\Pr(X=74) \\approx ${P74.toFixed(4)}`} />
          <Readout color={C.f} tex={`\\Pr(X\\ge ${c}) \\approx ${denom.toFixed(4)}`} />
          {tail ? (
            <Readout color={C.g} tex={`\\dfrac{\\Pr(X\\ge 74)}{\\Pr(X\\ge ${c})} \\approx ${tailAnswer.toFixed(4)}`} />
          ) : (
            <Readout color={C.good} tex={`\\Pr(X=74 \\mid X\\ge ${c}) \\approx ${answer.toFixed(4)}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
