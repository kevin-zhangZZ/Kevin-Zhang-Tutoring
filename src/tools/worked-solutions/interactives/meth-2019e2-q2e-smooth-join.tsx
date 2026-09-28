// 2019 Methods Exam 2 Q2e — what "smooth join" pins down. Slide the join point A(a, h(a)) along
// the cable h(x) = 3x(x − 30)²/2000 + 3: the straight section runs from the pole top (0, 10) to A
// with gradient (h(a) − 10)/a, and the curve leaves A with gradient h′(a). They agree (no corner)
// only at a ≈ 11.12, where the tangent at A passes through (0, 10); then A ≈ (11.12, 8.95) and the
// gradient there ≈ −0.09 → −0.1 (part e.iii). Toggles: plot both gradient expressions against a
// (they also cross at a ≈ 26.74, which is why the CAS solve needs 10 ≤ a ≤ 20), and the report's
// f(a) slip — joining to the hill instead, whose "smooth" point a ≈ 14.82 is on the ground.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, tick } from './kit'

const f = (x: number) => (3 * x * (x - 30) ** 2) / 2000
const h = (x: number) => f(x) + 3
const fp = (x: number) => (9 * (x - 30) * (x - 10)) / 2000

/** Roots of g on [lo, hi] by scanning then bisecting. */
function roots(g: (a: number) => number, lo: number, hi: number): number[] {
  const out: number[] = []
  const N = 400
  let prev = g(lo)
  for (let i = 1; i <= N; i++) {
    const x = lo + ((hi - lo) * i) / N
    const cur = g(x)
    if (prev * cur <= 0) {
      let l = x - (hi - lo) / N
      let r = x
      for (let k = 0; k < 50; k++) {
        const mid = (l + r) / 2
        if (g(l) * g(mid) <= 0) r = mid
        else l = mid
      }
      out.push((l + r) / 2)
    }
    prev = cur
  }
  return out
}

/** The line through (x0, y0) with gradient m, from x = 0 to x = x0 + 7, trimmed to y ≤ ymax. */
function tangentLine(x0: number, y0: number, m: number, ymax: number): [[number, number], [number, number]] {
  let xa = 0
  if (y0 + m * (xa - x0) > ymax && m < 0) xa = x0 + (ymax - y0) / m
  const xb = Math.min(30, x0 + 7)
  return [
    [xa, y0 + m * (xa - x0)],
    [xb, y0 + m * (xb - x0)],
  ]
}

const straightH = (a: number) => (h(a) - 10) / a
const straightF = (a: number) => (f(a) - 10) / a
const SMOOTH_H = roots(a => straightH(a) - fp(a), 10, 20)[0] // ≈ 11.1157
const SMOOTH_F = roots(a => straightF(a) - fp(a), 10, 20)[0] // ≈ 14.817
const CROSS_H = roots(a => straightH(a) - fp(a), 3, 30) // ≈ 11.12 and 26.74
const CROSS_F = roots(a => straightF(a) - fp(a), 3, 30)

export default function SmoothJoin() {
  const [a, setA] = useState(16)
  const [wrong, setWrong] = useState(false)
  const [graphs, setGraphs] = useState(false)

  const cur = wrong ? f : h
  const S = wrong ? straightF : straightH
  const b = cur(a)
  const sGrad = S(a)
  const cGrad = fp(a)
  const smooth = Math.abs(sGrad - cGrad) < 0.003
  const [q1, q2] = tangentLine(a, b, cGrad, 14)
  const intercept = b - a * cGrad
  const lineColor = wrong ? C.bad : C.g
  const crosses = wrong ? CROSS_F : CROSS_H

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        This is the report&apos;s <M>{'\\tfrac{f(a)-10}{a}'}</M> slip: the straight section is aimed at the{' '}
        <b>hill</b> instead of the cable. Press the snap button and the &ldquo;smooth join&rdquo; lands at{' '}
        <M>{`a \\approx ${SMOOTH_F.toFixed(2)}`}</M>, on the surface of the hill itself, <M>3</M> m below the real cable: the rider
        would run into the hill. <M>A</M> is on the cable, so its height is <M>{'h(a) = f(a) + 3'}</M>.
      </Notice>
    )
  } else if (smooth) {
    notice = (
      <Notice tone="good">
        <b>Smooth join.</b> The straight section arrives with the same gradient the curve leaves with, so there is no
        corner at <M>A</M>: the tangent at <M>A</M> (now green) lies right along the orange straight section and passes through the pole top{' '}
        <M>(0, 10)</M>. <M>{`A \\approx (${a.toFixed(2)},\\ ${b.toFixed(2)})`}</M>, and the gradient there is{' '}
        <M>{`${cGrad.toFixed(4)} \\approx -0.1`}</M>, which is part e.iii.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`a = ${a.toFixed(2)}`}</M> the straight section comes in with gradient{' '}
        <M>{sGrad.toFixed(3)}</M> but the curve leaves with <M>{cGrad.toFixed(3)}</M>, so the cable has a{' '}
        <b>corner</b> at <M>A</M>. Move <M>a</M> {sGrad > cGrad ? 'left' : 'right'} until the two numbers agree; you
        will see the violet tangent swing round until it passes through the top of the pole.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 30]} y={[0, 14]} xStep={5} yStep={2} height={290} yLabels={v => (Math.abs(v - 10) < 1e-9 ? '' : tick(v))}>
        <Line.Segment point1={[0, 0]} point2={[0, 10]} color={C.ink} weight={4} />
        <Plot.OfX y={f} domain={[0, 30]} color={wrong ? C.f : C.guide} weight={wrong ? 3 : 2} />
        {wrong && <Plot.OfX y={h} domain={[0, 30]} color={C.guide} weight={2} style="dashed" />}
        {!wrong && <Plot.OfX y={h} domain={[a, 30]} color={C.f} weight={3} />}
        <Line.Segment point1={q1} point2={q2} color={smooth ? C.good : C.violet} weight={2} style="dashed" />
        <Line.Segment point1={[0, 10]} point2={[a, b]} color={lineColor} weight={3} />
        <Point x={0} y={10} color={lineColor} />
        {intercept <= 14 && !smooth && <Point x={0} y={intercept} color={C.violet} />}
        <Point x={a} y={b} color={smooth ? C.good : lineColor} />
        <Label at={[0, 10]} attach="ne">(0, 10)</Label>
        <Label at={[a, b]} color={smooth ? C.good : lineColor} attach="ne">A</Label>
        <Label at={[22, f(22)]} color={wrong ? C.f : C.guide} attach="sw">hill</Label>
        <Label at={[26, h(26)]} color={wrong ? C.guide : C.f} attach="ne">cable</Label>
      </Plane>
      {graphs && (
        <div className="mt-3">
        <Plane x={[0, 30]} y={[-1.2, 1.4]} xStep={5} yStep={0.5} height={200} xLabel="a" yLabel="" yLabels={v => (v > 1.3 ? "" : tick(v))}>
          <Region top={() => 1.4} bottom={() => -1.2} from={10} to={20} color={C.good} opacity={0.08} />
          <Plot.OfX y={S} domain={[wrong ? 4.8 : 3.3, 30]} color={lineColor} weight={3} />
          <Plot.OfX y={fp} domain={[0, 30]} color={C.violet} weight={3} />
          <Line.Segment point1={[a, sGrad]} point2={[a, cGrad]} color={C.guide} weight={2} style="dashed" />
          <Point x={a} y={sGrad} color={lineColor} />
          <Point x={a} y={cGrad} color={C.violet} />
          {crosses.map(r => (
            <Point key={r} x={r} y={fp(r)} color={r >= 10 && r <= 20 ? C.good : C.guide} />
          ))}
          <Label at={[3, fp(3)]} color={C.violet} attach="ne">curve h′(a)</Label>
          <Label at={[wrong ? 9 : 6.5, S(wrong ? 9 : 6.5)]} color={lineColor} attach="nw">straight</Label>
          <Label at={[15, 1.2]} color={C.good} attach="c">10 ≤ a ≤ 20</Label>
        </Plane>
        </div>
      )}
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={10} max={20} step={0.01} />
        <Buttons>
          <ActionButton label="Snap to the smooth join" onClick={() => setA(wrong ? SMOOTH_F : SMOOTH_H)} />
          <Toggle label="Graph both gradients against a" checked={graphs} onChange={setGraphs} />
          <Toggle label="Join to the hill, f(a)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={lineColor} tex={`\\text{straight: } \\dfrac{${wrong ? 'f' : 'h'}(a)-10}{a} = ${sGrad.toFixed(3)}`} />
          <Readout color={C.violet} tex={`\\text{curve: } ${wrong ? 'f' : 'h'}'(a) = ${cGrad.toFixed(3)}`} />
          <Readout color={smooth ? C.good : undefined} tex={smooth ? `\\text{no corner}\\ \\checkmark` : `\\text{corner: gradients differ by } ${Math.abs(sGrad - cGrad).toFixed(3)}`} />
        </Readouts>
        {notice}
        {graphs && (
          <Notice>
            The lower graph plots both sides of the e.ii equation against <M>a</M>. They cross at{' '}
            {crosses.map((r, i) => (
              <span key={r}>
                {i > 0 && ' and '}
                <M>{`a \\approx ${r.toFixed(2)}`}</M>
              </span>
            ))}{' '}
            (and at a negative <M>a</M> off the screen), which is why the CAS solve needs{' '}
            <M>{'10 \\le a \\le 20'}</M>: only one crossing lies in the shaded band.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
