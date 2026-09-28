// 2018 Methods Exam 2 Q3d — the gradient of a line inclined at angle θ is rise/run = tan θ. With
// the run fixed at 1 the rise IS tan θ (the green side on the line x = 1), while θ itself is the
// arc length on the unit circle and sin θ is the height of the point on the circle. Big angles show
// three clearly different lengths; at the bridge's θ = π/90 they all round to 0.035, which is why
// evaluating π/90 or sin(π/90) (the report's slips) looks right here but is the wrong method.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider } from './kit'

const TH0 = Math.PI / 90

export default function GradientTan() {
  const [th, setTh] = useState(Math.PI / 6)
  const t = Math.tan(th)
  const c = Math.cos(th)
  const s = Math.sin(th)
  const small = th < 0.06

  return (
    <div>
      <Plane x={[0, 1.25]} y={[-0.12, 1.05]} xStep={0.25} yStep={0.25} equalScale height={330}>
        <Plot.Parametric xy={u => [Math.cos(u), Math.sin(u)]} domain={[0, Math.PI / 2]} color={C.guide} weight={1.5} style="dashed" />
        <Polygon points={[[0, 0], [1, 0], [1, t]]} color={C.good} fillOpacity={0.12} weight={0} strokeOpacity={0} />
        <Line.Segment point1={[0, 0]} point2={[1.2, 1.2 * t]} color={C.ink} weight={3} />
        <Line.Segment point1={[0, 0]} point2={[1, 0]} color={C.ink} weight={2} />
        <Plot.Parametric xy={u => [Math.cos(u), Math.sin(u)]} domain={[0, th]} color={C.violet} weight={4} />
        <Line.Segment point1={[c, 0]} point2={[c, s]} color={C.g} weight={3} />
        <Line.Segment point1={[1, 0]} point2={[1, t]} color={C.good} weight={4} />
        <Point x={c} y={s} color={C.g} />
        <Point x={1} y={t} color={C.good} />
        {!small && <Label at={[0.62, 0]} attach="n" gap={5}>run = 1</Label>}
        <Label at={small ? [1, t] : [1, t / 2]} attach={small ? 'n' : 'e'} gap={small ? 14 : 7} color={C.good}>{small ? 'rise = tan θ ≈ 0.035' : 'rise = tan θ'}</Label>
        {!small && <Label at={[c, s / 2]} attach="w" color={C.g}>sin θ</Label>}
        {!small && (
          <Label at={[Math.cos(th / 2), Math.sin(th / 2)]} attach="w" color={C.violet} gap={10}>
            θ
          </Label>
        )}
        {!small && <Label at={[1.2, 1.2 * t]} attach={t > 0.8 ? 'w' : 'n'} color={C.ink}>bridge</Label>}
      </Plane>
      <Controls>
        <Slider label="\theta" value={th} onChange={setTh} min={TH0} max={Math.PI / 4} step={0.001} format={v => `${((v * 180) / Math.PI).toFixed(1)}°`} />
        <Buttons>
          <ActionButton label="The bridge: θ = π/90" onClick={() => setTh(TH0)} />
          <ActionButton label="θ = π/6" onClick={() => setTh(Math.PI / 6)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\theta = ${th.toFixed(4)}`} />
          <Readout color={C.g} tex={`\\sin\\theta = ${s.toFixed(4)}`} />
          <Readout color={C.good} tex={`\\text{gradient} = \\tfrac{\\text{rise}}{\\text{run}} = \\tan\\theta = ${t.toFixed(4)}`} />
        </Readouts>
        {small ? (
          <Notice tone="warn">
            At the bridge&apos;s angle <M>{'\\tfrac{\\pi}{90}'}</M> the three lengths are almost equal: <M>\theta</M>,{' '}
            <M>{'\\sin\\theta'}</M> and <M>{'\\tan\\theta'}</M> all round to <M>0.035</M>. That is why evaluating{' '}
            <M>{'\\tfrac{\\pi}{90}'}</M> or <M>{'\\sin\\left(\\tfrac{\\pi}{90}\\right)'}</M> looks right here, but only the
            green rise over a run of <M>1</M> is the gradient. Keep your calculator in radian mode.
          </Notice>
        ) : (
          <Notice>
            Gradient means rise over run. Fix the run at <M>1</M>: the rise is then the green side, and in this right
            triangle <M>{'\\tan\\theta = \\tfrac{\\text{opposite}}{\\text{adjacent}} = \\tfrac{\\text{rise}}{1}'}</M>. The
            angle itself (violet arc) and <M>{'\\sin\\theta'}</M> (orange) are different lengths. Press &ldquo;The bridge&rdquo;
            to see what happens at a tiny angle.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
