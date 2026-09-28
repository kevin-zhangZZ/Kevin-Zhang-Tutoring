// 2018 Specialist Exam 2 MCQ 1 — y = ½tan⁻¹(x) is y = tan⁻¹(x) dilated by factor ½ from the x-axis.
// Slide the factor k: the grey parent curve and its asymptotes y = ±π/2 stay put, purple arrows
// show every height being multiplied by k, and the sky asymptotes y = ±kπ/2 move with the curve —
// at k = ½ they sit at y = ±π/4 (option E). A toggle overlays options A–C (y = ±½, ±¾, ±1): a line
// the curve crosses (A, B), or never comes near (C), is not an asymptote.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, num } from './kit'

const X = 12
const HALF_PI = Math.PI / 2
const OPTIONS: [string, number, string][] = [
  ['A', 0.5, '\\tfrac12'],
  ['B', 0.75, '\\tfrac34'],
  ['C', 1, '1'],
]

/** The asymptote height kπ/2 as text: exact for the two k values that matter. */
function asymText(k: number): string {
  if (Math.abs(k - 0.5) < 1e-9) return 'π/4'
  if (Math.abs(k - 1) < 1e-9) return 'π/2'
  return num(k * HALF_PI, 2)
}

export default function DilateWidget() {
  const [k, setK] = useState(0.5)
  const [opts, setOpts] = useState(false)

  const h = k * HALF_PI
  const isHalf = Math.abs(k - 0.5) < 1e-9
  const isOne = Math.abs(k - 1) < 1e-9
  const kTex = isHalf ? '\\tfrac12' : num(k, 2)
  const edge = k * Math.atan(X)

  let notice
  if (opts) {
    notice = (
      <Notice tone="warn">
        {OPTIONS.map(([L, v, tex]) => (
          <span key={L}>
            <b>{L}</b>{' '}
            {v < h ? (
              <>
                (<M>{`y=${tex}`}</M>) is crossed at <M>{`x=\\tan\\!\\left(${num(v / k, 2)}\\right)\\approx${num(Math.tan(v / k), 1)}`}</M>
                {Math.tan(v / k) > X ? ', just past the edge' : ''}.{' '}
              </>
            ) : (
              <>
                (<M>{`y=${tex}`}</M>) is never reached, but the curve never gets within <M>{num(v - h, 2)}</M> of it either.{' '}
              </>
            )}
          </span>
        ))}
        An asymptote is the one height the curve gets <em>as close as you like</em> to without reaching:{' '}
        <M>{`y=\\pm${isHalf ? '\\tfrac{\\pi}{4}' : num(h, 2)}`}</M>.
      </Notice>
    )
  } else if (isHalf) {
    notice = (
      <Notice tone="good">
        Follow the purple arrows: every height on the grey curve <M>{'y=\\tan^{-1}(x)'}</M> is halved. The grey curve creeps
        towards <M>{'\\tfrac{\\pi}{2}'}</M> forever, so its half creeps towards <M>{'\\tfrac{\\pi}{4}\\approx0.785'}</M>. Slide{' '}
        <M>k</M> to <M>1</M> to see where option D&rsquo;s <M>{'\\pm\\tfrac{\\pi}{2}'}</M> comes from, then turn on the options.
      </Notice>
    )
  } else if (isOne) {
    notice = (
      <Notice tone="warn">
        At <M>{'k=1'}</M> there is no dilation: this is the parent <M>{'y=\\tan^{-1}(x)'}</M>, with asymptotes{' '}
        <M>{'y=\\pm\\tfrac{\\pi}{2}'}</M> — option D. The question&rsquo;s curve has <M>{'k=\\tfrac12'}</M>, so its asymptotes are
        half as high.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Whatever <M>k</M> is, the asymptotes sit at <M>{`k\\times\\tfrac{\\pi}{2}=\\pm${num(h, 2)}`}</M>: a dilation from the{' '}
        <M>x</M>-axis multiplies every height, including the height the curve is heading for. Set <M>k</M> back to{' '}
        <M>{'\\tfrac12'}</M> for the question.
      </Notice>
    )
  }

  const arrowXs = [-6, -2.5, 2.5, 6]

  return (
    <div>
      <Plane x={[-X, X]} y={[-2, 2]} xStep={4} yStep={Math.PI / 4} height={320} yLabels={false}>
        {/* the parent and its asymptotes, in grey */}
        <Line.ThroughPoints point1={[0, HALF_PI]} point2={[1, HALF_PI]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[0, -HALF_PI]} point2={[1, -HALF_PI]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={x => Math.atan(x)} domain={[-X, X]} color={C.guide} weight={2} />
        <Label at={[X, HALF_PI]} attach="nw" color={C.guide} size={12}>y = π/2</Label>
        <Label at={[-X, -HALF_PI]} attach="se" color={C.guide} size={12}>y = −π/2</Label>

        {/* the options, if asked for */}
        {opts &&
          OPTIONS.map(([L, v]) => (
            <g key={L}>
              <Line.ThroughPoints point1={[0, v]} point2={[1, v]} color={C.bad} style="dashed" weight={1.5} />
              <Line.ThroughPoints point1={[0, -v]} point2={[1, -v]} color={C.bad} style="dashed" weight={1.5} />
              <Label at={[-X, v]} attach="e" color={C.bad} size={12} gap={4}>{L}</Label>
            </g>
          ))}

        {/* the dilated curve and its asymptotes */}
        {!opts && (
          <>
            <Line.ThroughPoints point1={[0, h]} point2={[1, h]} color={C.f} style="dashed" weight={2} />
            <Line.ThroughPoints point1={[0, -h]} point2={[1, -h]} color={C.f} style="dashed" weight={2} />
          </>
        )}
        {opts && (
          <>
            <Line.ThroughPoints point1={[0, h]} point2={[1, h]} color={C.good} style="dashed" weight={2} />
            <Line.ThroughPoints point1={[0, -h]} point2={[1, -h]} color={C.good} style="dashed" weight={2} />
          </>
        )}
        {!opts &&
          arrowXs.map(ax =>
            Math.abs((k - 1) * Math.atan(ax)) > 0.12 ? (
              <Vector key={ax} tail={[ax, Math.atan(ax)]} tip={[ax, k * Math.atan(ax)]} color={C.violet} />
            ) : null,
          )}
        <Plot.OfX y={x => k * Math.atan(x)} domain={[-X, X]} color={C.f} weight={3} />
        {opts &&
          OPTIONS.map(([L, v]) =>
            v < h && Math.tan(v / k) <= X ? (
              <g key={`cross-${L}`}>
                <Point x={Math.tan(v / k)} y={v} color={C.bad} />
                <Point x={-Math.tan(v / k)} y={-v} color={C.bad} />
              </g>
            ) : null,
          )}
        <Label at={[X, h]} attach={h > HALF_PI ? 'sw' : 'nw'} color={opts ? C.good : C.f} size={12}>{`y = ${opts ? "±" : ""}${asymText(k)}`}</Label>
        {/* with the options on, the lower label would sit on option lines, so the upper one speaks for both */}
        {!opts && (
          <Label at={[-X, -h]} attach={h > HALF_PI ? 'ne' : 'se'} color={C.f} size={12}>{`y = −${asymText(k)}`}</Label>
        )}
        {!opts && (
          <Label at={[8, k * Math.atan(8)]} attach={k < 1 ? 's' : 'n'} color={C.f} size={12}>
            {isHalf ? 'y = ½ tan⁻¹(x)' : `y = ${num(k, 2)} tan⁻¹(x)`}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={v => setK(Math.round(v * 20) / 20)} min={0.25} max={1.25} step={0.05} format={v => (Math.abs(v - 0.5) < 1e-9 ? '½' : v.toFixed(2))} />
        <Toggle label="Compare with options A–C" checked={opts} onChange={setOpts} />
        <Readouts>
          <Readout color={C.f} tex={`y=${kTex}\\tan^{-1}(x)`} />
          <Readout color={C.guide} tex={'\\text{grey: } y=\\tan^{-1}(x)'} />
          <Readout color={C.f} tex={`\\text{asymptotes: } y=\\pm ${kTex}\\times\\tfrac{\\pi}{2}${isHalf ? '=\\pm\\tfrac{\\pi}{4}' : ''}\\approx\\pm${num(h, 3)}`} />
          <Readout tex={`\\text{at } x=${X}\\!:\\ y\\approx${num(edge, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
