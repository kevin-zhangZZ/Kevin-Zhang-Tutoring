// 2019 Methods Exam 2 Q4c — "given that it lives at least a weeks" throws away every butterfly that
// died before week a and measures the rest as a fraction of what is left:
// Pr(X ≥ 4 | X ≥ a) = Pr(X ≥ 4) / Pr(X ≥ a). The density f(x) = 4/625 (5x³ − x⁴) is shaded: the
// ruled-out part grey, the given part sky, the wanted part (X ≥ 4) green. A slider moves a (the
// question's a = 2 gives 821/2853 ≈ 0.2878); a toggle rescales the survivors' curve by 1/Pr(X ≥ a)
// so its total area is 1 again; a second toggle shows the report's misreading Pr(X ≤ 4 | X ≤ 2),
// which is certain (= 1) because X ≤ 2 sits entirely inside X ≤ 4. Values checked in sympy.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const f = (x: number) => (x < 0 || x > 5 ? 0 : (4 / 625) * (5 * x ** 3 - x ** 4))
const F = (x: number) => x ** 4 / 125 - (4 * x ** 5) / 3125
const P4 = 1 - F(4) // 821/3125 = 0.26272

export default function Given() {
  const [a, setA] = useState(2)
  const [rescale, setRescale] = useState(false)
  const [wrong, setWrong] = useState(false)

  const Pa = 1 - F(a)
  const ratio = P4 / Pa
  const g = (x: number) => f(x) / Pa
  const atQuestion = Math.abs(a - 2) < 0.01
  const yTop = rescale && !wrong ? 0.95 : 0.5
  const lineTop = yTop - 0.04
  const aTex = atQuestion ? '2' : num(a, 2)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        This is the misreading <M>{`\\Pr(X \\le 4 \\mid X \\le ${aTex})`}</M>. Every butterfly that died by week{' '}
        <M>{aTex}</M> (orange) has certainly died by week <M>4</M>, so the answer is <M>1</M>, a sure thing, which
        is a hint that something is off. &ldquo;At least&rdquo; means <M>\ge</M>: the regions to the <em>right</em>.
      </Notice>
    )
  } else if (rescale) {
    notice = (
      <Notice tone="good">
        The violet curve is <M>{'\\dfrac{f(x)}{\\Pr(X \\ge a)}'}</M>: the survivors&apos; own density, stretched so its
        total area is <M>1</M> again. Its area from <M>4</M> to <M>5</M> is the conditional probability,{' '}
        <M>{num(ratio, 4)}</M>. Slide <M>a</M> towards <M>3.5</M>: the fewer survivors, the more the curve stretches.
      </Notice>
    )
  } else if (atQuestion) {
    notice = (
      <Notice tone="good">
        <b>The question&apos;s condition, <M>X \ge 2</M>.</b> The grey butterflies died before week <M>2</M>, so they are
        out of the picture. Of the survivors (area <M>0.9130</M>), the green ones reach week <M>4</M> (area{' '}
        <M>0.2627</M>), so the answer is the fraction <M>{'\\tfrac{0.2627}{0.9130} \\approx 0.2878'}</M>. Turn on the
        rescale to see the survivors&apos; own curve.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        {a < 0.05 ? (
          <>With no real condition the answer is just <M>{'\\Pr(X \\ge 4) = 0.2627'}</M>. </>
        ) : (
          <>The later the condition <M>a</M>, the smaller the surviving group, and the bigger the share of it that reaches
            week <M>4</M>. </>
        )}
        The green area never changes; only the area you divide by does. Slide back to <M>a = 2</M> for the question.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 5.4]} y={[0, yTop]} xStep={1} yStep={0.1} yLabels={v => (Math.abs(v * 10 - Math.round(v * 10)) < 1e-6 && Math.round(v * 10) % 2 === 0 && v < yTop - 0.02 ? v.toFixed(1) : '')} height={300}>
        {wrong ? (
          <>
            <Region top={f} bottom={() => 0} from={0} to={4} color={C.good} opacity={0.18} />
            <Region top={f} bottom={() => 0} from={0} to={a} color={C.g} opacity={0.5} />
          </>
        ) : (
          <>
            <Region top={f} bottom={() => 0} from={0} to={a} color={C.guide} opacity={0.3} />
            <Region top={f} bottom={() => 0} from={a} to={4} color={C.f} opacity={0.22} />
            {rescale ? (
              <Region top={g} bottom={() => 0} from={4} to={5} color={C.violet} opacity={0.3} />
            ) : (
              <Region top={f} bottom={() => 0} from={4} to={5} color={C.good} opacity={0.4} />
            )}
          </>
        )}
        <Plot.OfX y={f} domain={[0, 5]} color={C.f} weight={3} />
        {rescale && !wrong && <Plot.OfX y={g} domain={[a, 5]} color={C.violet} weight={2.5} style="dashed" />}
        <Line.Segment point1={[a, 0]} point2={[a, lineTop]} color={wrong ? C.g : C.f} style="dashed" weight={1.5} />
        <Label at={[a, lineTop]} attach="nw" color={wrong ? C.g : C.f} size={12} gap={4}>
          {wrong ? `given X ≤ ${aTex}` : `given X ≥ ${aTex}`}
        </Label>
        <Line.Segment point1={[4, 0]} point2={[4, lineTop]} color={C.good} style="dashed" weight={1.5} />
        <Label at={[4, lineTop]} attach="ne" color={C.good} size={12} gap={4}>{wrong ? 'X ≤ 4' : 'X ≥ 4'}</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={0} max={3.5} step={0.05} />
        <Buttons>
          <Toggle label="Rescale the survivors' curve" checked={rescale} onChange={setRescale} />
          <Toggle label="Read it as X ≤ 4 given X ≤ 2" checked={wrong} onChange={v => { setWrong(v); if (v) setA(2) }} />
        </Buttons>
        <Readouts>
          {wrong ? (
            <Readout color={C.bad} tex={`\\Pr(X \\le 4 \\mid X \\le ${aTex}) = \\dfrac{\\Pr(X \\le ${aTex})}{\\Pr(X \\le ${aTex})} = 1`} />
          ) : (
            <>
              <Readout color={C.good} tex={`\\Pr(X \\ge 4) = ${num(P4, 4)}`} />
              <Readout color={C.f} tex={`\\Pr(X \\ge ${aTex}) = ${num(Pa, 4)}`} />
              <Readout color={atQuestion ? C.good : C.ink} tex={`\\Pr(X \\ge 4 \\mid X \\ge ${aTex}) \\approx ${num(ratio, 4)}${atQuestion ? '\\ \\checkmark' : ''}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
