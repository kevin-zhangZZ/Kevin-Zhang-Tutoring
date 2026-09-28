// 2017 Methods Exam 2 MCQ 7 — "no real roots" is a picture: the parabola
// y = (p − 1)x² + 4x + (p − 5) never touches the x-axis. Slide p and watch it lift off the axis
// exactly when the discriminant Δ = 16 − 4(p − 1)(p − 5) goes negative. The lower graph plots
// Δ ÷ 4 = −(p² − 6p + 1) against p together with p² − 6p + 1 itself: dividing by −4 reflects the
// graph in the p-axis, so "Δ below the axis" is the same set of p as "p² − 6p + 1 above the axis"
// — that is why the < flips to >. A toggle shades option D's region (p² − 6p + 1 < 0), which is
// exactly where the parabola crosses twice.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, Buttons, tick } from './kit'

const R1 = 3 - 2 * Math.SQRT2 // ≈ 0.172
const R2 = 3 + 2 * Math.SQRT2 // ≈ 5.828
const q = (p: number) => p * p - 6 * p + 1
const d4 = (p: number) => -q(p) // Δ ÷ 4 = 4 − (p − 1)(p − 5)
const zero = () => 0

function coef(v: number, first = false) {
  const s = Math.abs(v) < 0.005 ? '0' : Math.abs(v).toFixed(2).replace(/\.?0+$/, '')
  if (first) {
    const t = Math.abs(Math.abs(v) - 1) < 0.005 ? '' : s // x^2, not 1x^2
    return v < -0.005 ? `-${t}` : t
  }
  return v < -0.005 ? `- ${s}` : `+ ${s}`
}

export default function Discriminant() {
  const [p, setP] = useState(5)
  const [showD, setShowD] = useState(false)

  const a = p - 1
  const c = p - 5
  const linear = Math.abs(a) < 0.005
  const delta = 16 - 4 * a * c
  const touching = !linear && Math.abs(delta) < 0.12
  const roots: number[] = linear
    ? [-c / 4]
    : touching
      ? [-4 / (2 * a)]
      : delta > 0
        ? [(-4 - Math.sqrt(delta)) / (2 * a), (-4 + Math.sqrt(delta)) / (2 * a)]
        : []
  const visible = roots.filter(r => r >= -4 && r <= 4)
  const nRoots = roots.length
  const noRoots = nRoots === 0
  const curve = (x: number) => a * x * x + 4 * x + c

  let notice
  if (linear) {
    notice = (
      <Notice>
        At <M>p = 1</M> the <M>x^2</M> term vanishes and the equation is just <M>4x - 4 = 0</M>: a straight line with one
        root, <M>x = 1</M>. Here <M>p^2 - 6p + 1 = -4</M>, so option B correctly leaves <M>p = 1</M> out.
      </Notice>
    )
  } else if (touching) {
    notice = (
      <Notice>
        <b>Boundary:</b> at <M>{'p = 3 \\pm 2\\sqrt2'}</M> the discriminant is <M>0</M> and the parabola just touches the
        axis (one repeated root). These values are not included: &ldquo;no real roots&rdquo; needs <M>\Delta</M> strictly
        negative, so the answer uses a strict inequality.
      </Notice>
    )
  } else if (showD) {
    notice = (
      <Notice tone="warn">
        <b>Option D (29% chose it)</b> is the red band, where <M>p^2 - 6p + 1 &lt; 0</M>. That is exactly where{' '}
        <M>{'\\Delta > 0'}</M>, the orange curve above the axis. Put <M>p</M> anywhere in the red band (try <M>p = 3</M>):
        the parabola crosses the axis <b>twice</b>. Keeping the &lt; sign after dividing by <M>-4</M> gives the condition
        for two roots, the opposite of what was asked.
      </Notice>
    )
  } else if (noRoots) {
    notice = (
      <Notice tone="good">
        <b>No x-intercepts:</b> <M>{`\\Delta = ${delta.toFixed(2)} < 0`}</M>, the orange curve is below the <M>p</M>-axis.
        At the same <M>p</M> the purple curve <M>p^2 - 6p + 1</M> is <b>above</b> it: dividing by <M>-4</M> reflects the
        graph in the axis, so &ldquo;<M>\Delta &lt; 0</M>&rdquo; becomes &ldquo;<M>{'p^2 - 6p + 1 > 0'}</M>&rdquo;. Now turn on
        option D.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`p = ${p.toFixed(2)}`}</M> the parabola cuts the axis {nRoots === 2 ? 'twice' : 'once'}:{' '}
        <M>{`\\Delta = ${delta.toFixed(2)} > 0`}</M>{nRoots === 2 && visible.length < 2 ? ' (one root is off the screen)' : ''}.
        Drag <M>p</M> right past <M>5.83</M> (or left past <M>0.17</M>) and watch the parabola lift off the axis at the
        moment the orange <M>\Delta</M> curve drops below the <M>p</M>-axis.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-4, 4]} y={[-8, 8]} xStep={1} yStep={2} height={240}>
        <Plot.OfX y={curve} domain={[-4.2, 4.2]} color={C.f} weight={3} />
        {visible.map((r, i) => (
          <Point key={i} x={r} y={0} color={C.good} />
        ))}
      </Plane>
      <div className="mt-2 mb-1 text-[12px] text-gray-500 dark:text-gray-400">
        Below: the discriminant as <i>p</i> changes. Orange is Δ ÷ 4; purple is p² − 6p + 1 (Δ ÷ −4).
      </div>
      <Plane x={[-1, 7]} y={[-9, 9]} xStep={1} yStep={3} height={220} xLabel="p" yLabel="" xLabels={v => (Math.abs(v - 6) < 1e-6 ? '' : tick(v))}>
        <Region top={zero} bottom={d4} from={-1} to={R1} color={C.good} opacity={0.2} />
        <Region top={zero} bottom={d4} from={R2} to={7} color={C.good} opacity={0.2} />
        <Region top={q} bottom={zero} from={-1} to={R1} color={C.good} opacity={0.2} />
        <Region top={q} bottom={zero} from={R2} to={7} color={C.good} opacity={0.2} />
        {showD && <Region top={zero} bottom={q} from={R1} to={R2} color={C.bad} opacity={0.22} />}
        {showD && <Region top={d4} bottom={zero} from={R1} to={R2} color={C.bad} opacity={0.22} />}
        <Plot.OfX y={d4} domain={[-1, 7]} color={C.g} weight={3} />
        <Plot.OfX y={q} domain={[-1, 7]} color={C.violet} weight={3} />
        <Line.Segment point1={[p, -9]} point2={[p, 9]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={R1} y={0} color={C.ink} />
        <Point x={R2} y={0} color={C.ink} />
        <Point x={p} y={d4(p)} color={C.g} />
        <Point x={p} y={q(p)} color={C.violet} />
        <Label at={[6.95, d4(6.95)]} color={C.g} attach="w">Δ ÷ 4</Label>
        <Label at={[6.95, q(6.95)]} color={C.violet} attach="w">p² − 6p + 1</Label>
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={-1} max={7} step={0.01} />
        <Buttons>
          <Toggle label="Show option D's region" checked={showD} onChange={setShowD} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`y = ${linear ? '' : `${coef(a, true)}x^2 + `}4x ${Math.abs(c) < 0.005 ? '' : coef(c)}`} />
          <Readout color={C.g} tex={`\\Delta = 16 - 4(p-1)(p-5) = ${delta.toFixed(2)}`} />
          <Readout color={C.violet} tex={`p^2 - 6p + 1 = ${q(p).toFixed(2)}`} />
          <Readout color={noRoots ? C.good : C.bad} tex={`\\text{real roots: } ${nRoots}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
