// 2018 Methods Exam 1 Q5 — the domain of f⁻¹ is the range of f. Drag P along
// f(x) = 1/(x − 2)², x > 2, and its mirror image P′ in y = x traces f⁻¹(x) = 2 + 1/√x. P′ is P
// with its coordinates swapped, so the x-coordinate of P′ is the height of P: the heights of f
// (violet on the y-axis) become the x-values of f⁻¹ (violet on the x-axis), (0, ∞) both times. The
// asymptotes swap too (x = 2 → y = 2, y = 0 → x = 0). A toggle tries the wrong idea "dom f⁻¹ =
// dom f = (2, ∞)" and shows the genuine points of f⁻¹ it would throw away.

import { useState } from 'react'
import {
  C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
  clamp, num,
} from './kit'

const f = (x: number) => 1 / (x - 2) ** 2
const g = (x: number) => 2 + 1 / Math.sqrt(x)
const L = 7.2 // the view runs to 7.2 on both axes
const A_MIN = 2 + 1 / Math.sqrt(7) // P stays on screen: f(a) ≤ 7
const A_MAX = 7

// Candidate positions for P: evenly spaced in x AND evenly spaced in height, so the steep part near
// the asymptote is as easy to grab as the flat tail.
const SAMPLES = [
  ...Array.from({ length: 400 }, (_, i) => A_MIN + ((A_MAX - A_MIN) * i) / 399),
  ...Array.from({ length: 400 }, (_, i) => 2 + 1 / Math.sqrt(0.04 + (6.96 * i) / 399)),
].filter(a => a >= A_MIN && a <= A_MAX)
function nearestOnF([mx, my]: [number, number]): number {
  let best = A_MIN
  let bestD = Infinity
  for (const a of SAMPLES) {
    const d = (a - mx) ** 2 + (f(a) - my) ** 2
    if (d < bestD) {
      bestD = d
      best = a
    }
  }
  return best
}

export default function Mirror() {
  const [a, setA] = useState(2.5)
  const [copyDom, setCopyDom] = useState(false)
  const fa = f(a)
  const nearAsym = fa > 4.5
  const flat = fa < 0.12
  const lost = copyDom && fa <= 2

  let notice
  if (copyDom) {
    notice = (
      <Notice tone="warn">
        If <M>{'f^{-1}'}</M> kept <M>f</M>&apos;s domain <M>{'(2, \\infty)'}</M>, <b>every red point of{' '}
        <M>{'f^{-1}'}</M> would be thrown away</b>, yet each one is the mirror image of a genuine point of <M>f</M>. Drag P
        out past <M>{'x = 2.71'}</M> and watch P&prime; land in the red part: for example <M>{'(3, 1)'}</M> is on{' '}
        <M>f</M>, so <M>{'(1, 3)'}</M> must be on <M>{'f^{-1}'}</M>. The domain of <M>{'f^{-1}'}</M> is built from
        the <em>outputs</em> of <M>f</M>, not its inputs.
      </Notice>
    )
  } else if (nearAsym) {
    notice = (
      <Notice tone="good">
        <b>P is climbing the asymptote <M>{'x = 2'}</M></b>, so its height grows without bound. Its mirror image P&prime;
        runs off to the right along <M>{'y = 2'}</M>: the vertical asymptote of <M>f</M> reflects into the horizontal
        asymptote of <M>{'f^{-1}'}</M>. That is the <M>{'2 +'}</M> in <M>{'2 + \\tfrac{1}{\\sqrt{x}}'}</M>. Now drag P
        far to the right.
      </Notice>
    )
  } else if (flat) {
    notice = (
      <Notice tone="good">
        <b>P is flattening onto the <M>x</M>-axis</b>: its height gets close to <M>0</M> but never reaches it. So P&prime;
        hugs the <M>y</M>-axis, and its <M>x</M>-coordinate is always positive. That is why <M>0</M> is left out:{' '}
        <M>{'\\operatorname{dom} f^{-1} = (0, \\infty)'}</M>, with a round bracket at <M>0</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        P&prime; is P with its coordinates swapped, so <b>the <M>x</M>-coordinate of P&prime; is the height of P</b> (follow
        the violet dashes). As P runs along the branch its heights fill <M>{'(0, \\infty)'}</M> on the <M>y</M>-axis, so
        the <M>x</M>-values of P&prime; fill <M>{'(0, \\infty)'}</M> on the <M>x</M>-axis:{' '}
        <M>{'\\operatorname{dom} f^{-1} = \\operatorname{ran} f'}</M>. Drag P up the asymptote, then out to the right.
      </Notice>
    )
  }

  const gLo = 1 / (L - 2) ** 2 // where f⁻¹ leaves the top of the plane
  const R = 0.12 // open-circle radius at the origin

  return (
    <div>
      <Plane x={[-0.8, L]} y={[-0.8, L]} equalScale height={460}>
        {/* the mirror line */}
        <Line.Segment point1={[-0.8, -0.8]} point2={[L, L]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[6.4, 6.4]} color={C.guide} attach="se" size={12}>
          y = x
        </Label>

        {/* asymptotes: x = 2 for f, y = 2 for f⁻¹ (the axes are the other pair) */}
        <Line.Segment point1={[2, -0.8]} point2={[2, L]} color={C.f} style="dashed" weight={1.5} />
        <Label at={[2, 6.8]} color={C.f} attach="w" size={12}>
          x = 2
        </Label>
        <Line.Segment point1={[-0.8, 2]} point2={[L, 2]} color={C.g} style="dashed" weight={1.5} />
        <Label at={[L - 0.1, 2]} color={C.g} attach="sw" size={12}>
          y = 2
        </Label>

        {/* ran f on the y-axis, dom f⁻¹ on the x-axis */}
        <Line.Segment point1={[0, R]} point2={[0, L]} color={C.violet} weight={6} />
        <Line.Segment point1={[copyDom ? 2 : R, 0]} point2={[L, 0]} color={copyDom ? C.bad : C.violet} weight={6} />
        <Circle center={[0, 0]} radius={R} color={C.violet} fillOpacity={0} weight={2} />
        <Label at={[0, 2.5]} color={C.violet} attach="e" size={12}>
          ran f
        </Label>
        <Label at={copyDom ? [4.6, 0.2] : [0.6, 0]} color={copyDom ? C.bad : C.violet} attach="ne" size={12}>
          dom f⁻¹
        </Label>

        {/* the two curves */}
        <Plot.OfX y={f} domain={[A_MIN - 0.01, L]} color={C.f} weight={3} />
        {copyDom ? (
          <>
            <Plot.OfX y={g} domain={[gLo, 2]} color={C.bad} weight={3} style="dashed" />
            <Plot.OfX y={g} domain={[2, L]} color={C.g} weight={3} />
          </>
        ) : (
          <Plot.OfX y={g} domain={[gLo, L]} color={C.g} weight={3} />
        )}
        <Label at={[3.1, f(3.1)]} color={C.f} attach="ne">
          f
        </Label>
        <Label at={[1, g(1)]} color={copyDom ? C.bad : C.g} attach="ne">
          f⁻¹
        </Label>

        {/* P's height, carried across to P′'s x-coordinate */}
        <Line.Segment point1={[a, fa]} point2={[0, fa]} color={C.violet} style="dashed" weight={1.5} />
        <Line.Segment point1={[fa, a]} point2={[fa, 0]} color={C.violet} style="dashed" weight={1.5} />
        <Point x={0} y={fa} color={C.violet} />
        <Point x={fa} y={0} color={C.violet} />
        <Line.Segment point1={[a, fa]} point2={[fa, a]} color={C.guide} style="dashed" weight={1} />

        <Point x={fa} y={a} color={lost ? C.bad : C.g} />
        <Label at={[fa, a]} color={lost ? C.bad : C.g} attach="ne">
          P′
        </Label>
        <Label at={[a, fa]} color={C.f} attach="ne">
          P
        </Label>
        <MovablePoint point={[a, fa]} onMove={p => setA(clamp(nearestOnF(p), A_MIN, A_MAX))} color={C.f} />
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={2.38} max={A_MAX} step={0.01} />
        <Toggle label="What if dom f⁻¹ = dom f = (2, ∞)?" checked={copyDom} onChange={setCopyDom} />
        <Readouts>
          <Readout color={C.f} tex={`P = \\big(a,\\ f(a)\\big) = (${num(a)},\\ ${num(fa)})`} />
          <Readout color={lost ? C.bad : C.g} tex={`P' = (${num(fa)},\\ ${num(a)})`} />
          <Readout tex={`f^{-1}(${num(fa)}) = 2 + \\tfrac{1}{\\sqrt{${num(fa)}}} = ${num(g(fa))}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
