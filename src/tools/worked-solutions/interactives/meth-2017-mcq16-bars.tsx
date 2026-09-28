// 2017 Methods Exam 2 MCQ 16 — P̂ is just X/5 with the axis relabelled. The six bars of
// X ~ Bi(5, p) are drawn with both labels underneath (X = 0…5 and P̂ = 0, 0.2, …, 1). The p slider
// shows why Pr(P̂ = 0) = (1 − p)⁵ = 1/243 forces the large value p = 2/3 (sliding to p = 1/3 is the
// p ↔ 1 − p swap, which gives option A). The dashed line sits on P̂ = 0.6, so "> 0.6" takes only
// the two bars past it (0.4609, option C); a toggle reads > as ≥ and picks up the bar on the
// line as well (0.7901, option E).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Toggle } from './kit'

const N = 5
const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const pmf = (p: number, k: number) => choose(N, k) * p ** k * (1 - p) ** (N - k)
const OPTIONS: [number, string][] = [
  [0.0453, 'A'],
  [0.3209, 'B'],
  [0.4609, 'C'],
  [0.539, 'D'],
  [0.7901, 'E'],
]
const W = 0.34 // half-width of a bar
const bx = (k: number) => k + 1 // bars sit right of the y-axis
const pLabel = (v: number) => (Math.abs(v - 2 / 3) < 1e-9 ? '2/3' : Math.abs(v - 1 / 3) < 1e-9 ? '1/3' : v.toFixed(2))

export default function Bars() {
  const [p, setP] = useState(2 / 3)
  const [incl, setIncl] = useState(false)

  const isTwoThirds = Math.abs(p - 2 / 3) < 1e-9
  const isThird = Math.abs(p - 1 / 3) < 1e-9
  const probs = [0, 1, 2, 3, 4, 5].map(k => pmf(p, k))
  const first = incl ? 3 : 4
  const total = probs.slice(first).reduce((s, v) => s + v, 0)
  const opt = OPTIONS.find(([v]) => Math.abs(v - total) < 0.00015)?.[1]
  const barColor = (k: number) => (k < 3 ? C.guide : k === 3 ? (incl ? C.bad : C.guide) : C.f)
  const barOpacity = (k: number) => (k >= first ? 0.75 : 0.25)

  let notice
  if (isThird) {
    notice = (
      <Notice tone="warn">
        With <M>{'p=\\tfrac13'}</M> the left bar is <M>{'(1-\\tfrac13)^5=\\tfrac{32}{243}\\approx0.1317'}</M>, not{' '}
        <M>{'\\tfrac1{243}'}</M>, so this <M>p</M> fails the given fact. It comes from solving <M>{'p^5=\\tfrac1{243}'}</M>,
        which is the chance that <em>all five</em> live in a capital city. The shaded bars now total{' '}
        <M>0.0453</M>, option <b>A</b>. Slide back to <M>{'p=\\tfrac23'}</M>.
      </Notice>
    )
  } else if (!isTwoThirds) {
    notice = (
      <Notice>
        The left bar is <M>{'\\Pr(\\hat P=0)=(1-p)^5'}</M>: nobody in the sample lives in a capital city. For that to be as
        rare as <M>{'\\tfrac1{243}\\approx0.0041'}</M>, most people must live in one, so <M>p</M> must be large. Slide{' '}
        <M>p</M> until the left bar reads <M>0.004</M>.
      </Notice>
    )
  } else if (incl) {
    notice = (
      <Notice tone="warn">
        The red bar is <M>X=3</M>, i.e. <M>{'\\hat P=0.6'}</M> exactly. It sits <em>on</em> the line, so it belongs to{' '}
        <M>{'\\hat P\\ge0.6'}</M> but not to <M>{'\\hat P>0.6'}</M>. Counting it adds <M>{'\\tfrac{80}{243}'}</M> and gives{' '}
        <M>0.7901</M>, option <b>E</b>. Turn the toggle off.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>{'p=\\tfrac23'}</M> makes the left bar <M>{'(\\tfrac13)^5=\\tfrac1{243}'}</M>. The dashed line is{' '}
        <M>{'\\hat P=0.6'}</M>, which is <M>X=3</M>. <M>{'\\hat P>0.6'}</M> takes only the blue bars strictly past it:{' '}
        <M>{'\\tfrac{80}{243}+\\tfrac{32}{243}\\approx0.4609'}</M>. Try the toggle, then slide <M>p</M> to{' '}
        <M>{'\\tfrac13'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-0.2, 6.5]}
        y={[-0.12, 0.45]}
        xStep={1}
        yStep={0.1}
        height={300}
        xLabel=""
        yLabel="Pr"
        xLabels={false}
        yLabels={v => (v < 0 || v > 0.42 ? '' : v.toFixed(1))}
      >
        {probs.map((v, k) => (
          <Polygon
            key={k}
            points={[[bx(k) - W, 0], [bx(k) + W, 0], [bx(k) + W, v], [bx(k) - W, v]]}
            color={barColor(k)}
            fillOpacity={barOpacity(k)}
            weight={1.5}
          />
        ))}
        {probs.map((v, k) => (
          <Label key={`v${k}`} at={[bx(k), v]} attach="n" size={11} gap={4} color={k >= first ? barColor(k) : C.ink} bold={k >= first}>
            {v.toFixed(3)}
          </Label>
        ))}
        {/* Break the line where it crosses the X = 3 bar's value label so the number stays readable. */}
        <Line.Segment point1={[bx(3), 0]} point2={[bx(3), probs[3]]} color={C.bad} style="dashed" weight={2} />
        {probs[3] + 0.05 < 0.41 && (
          <Line.Segment point1={[bx(3), probs[3] + 0.05]} point2={[bx(3), 0.41]} color={C.bad} style="dashed" weight={2} />
        )}
        <Label at={[bx(3), 0.41]} attach="n" color={C.bad} size={12}>P̂ = 0.6</Label>
        <Label at={[0, -0.005]} attach="sw" size={12} gap={4}>X</Label>
        <Label at={[0, -0.065]} attach="sw" size={12} gap={4} color={C.f}>P̂</Label>
        {probs.map((_, k) => (
          <Label key={`x${k}`} at={[bx(k), -0.005]} attach="s" size={12} gap={4}>
            {k}
          </Label>
        ))}
        {probs.map((_, k) => (
          <Label key={`p${k}`} at={[bx(k), -0.065]} attach="s" size={12} gap={4} color={C.f}>
            {String(k / 5)}
          </Label>
        ))}
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={6 / 30} max={24 / 30} step={1 / 30} format={pLabel} />
        <Buttons>
          <Toggle label="Read > as ≥ (include P̂ = 0.6)" checked={incl} onChange={setIncl} />
        </Buttons>
        <Readouts>
          <Readout
            color={isTwoThirds ? C.good : C.bad}
            tex={`\\Pr(\\hat P=0)=(1-p)^5\\approx ${probs[0].toFixed(4)}\\ ${isTwoThirds ? '=\\tfrac1{243}\\ \\checkmark' : '\\ne\\tfrac1{243}'}`}
          />
          <Readout
            color={incl ? C.bad : C.f}
            tex={`\\Pr(\\hat P${incl ? '\\ge' : '>'}0.6)=\\Pr(X\\ge${first})\\approx ${total.toFixed(4)}${opt ? `\\ (\\text{option ${opt}})` : ''}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
