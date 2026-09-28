// 2019 Specialist Exam 2 Q1a–b — the parametric curve x = sec(t) + 1, y = tan(t), t ∈ [0, π/2)
// traces only ONE piece of the relation y² = x² − 2x (a hyperbola). Drag t: the point starts at
// (2, 0) and runs off to the top right, and the green bars on the axes show the x- and y-values
// reached so far — domain [2, ∞), range [0, ∞). The lower half is never reached because
// y = tan(t) ≥ 0 (part a's positive root). A toggle shows the common wrong domain: solving
// x² − 2x ≥ 0 from the rule alone also gives x ≤ 0, a branch the parameter never gets to.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  num, usePlayer,
} from './kit'

const X = (t: number) => 1 / Math.cos(t) + 1
const Y = (t: number) => Math.tan(t)
const T_MAX = 1.37
const XR: [number, number] = [-3, 7]
const YR: [number, number] = [-3, 5.5]

export default function Traced() {
  const [t, setT] = useState(0.7)
  const [ruleOnly, setRuleOnly] = useState(false)
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 5 })

  const x = X(t)
  const y = Y(t)
  const start = t < 0.04
  const far = t > 1.25

  let notice
  if (ruleOnly) {
    notice = (
      <Notice tone="warn">
        Solving <M>{'x^2 - 2x \\ge 0'}</M> from the rule alone gives <M>{'x \\le 0'}</M> or <M>{'x \\ge 2'}</M>, which
        includes the red branch. But this curve is the one the parameter traces. For <M>{'t \\in [0, \\tfrac{\\pi}{2})'}</M>,{' '}
        <M>{'\\cos t \\in (0, 1]'}</M>, so <M>{'\\sec t \\ge 1'}</M> and <M>{'x = \\sec t + 1 \\ge 2'}</M>. Drag{' '}
        <M>t</M> anywhere: the point never reaches the red branch, so the domain is <M>{'[2, \\infty)'}</M> only.
      </Notice>
    )
  } else if (start) {
    notice = (
      <Notice>
        At <M>t = 0</M>: <M>{'x = \\sec 0 + 1 = 2'}</M> and <M>{'y = \\tan 0 = 0'}</M>. The curve starts at{' '}
        <M>(2, 0)</M>, the smallest <M>x</M> and the smallest <M>y</M> it will ever have. Drag <M>t</M> towards{' '}
        <M>{'\\tfrac{\\pi}{2}'}</M>.
      </Notice>
    )
  } else if (far) {
    notice = (
      <Notice tone="good">
        As <M>{'t \\to \\tfrac{\\pi}{2}^-'}</M>, <M>{'\\cos t \\to 0^+'}</M>, so <M>{'\\sec t'}</M> and{' '}
        <M>{'\\tan t'}</M> both grow without bound and the point runs off to the top right. The green bars fill{' '}
        <M>{'x \\in [2, \\infty)'}</M> and <M>{'y \\in [0, \\infty)'}</M>. Now turn on &ldquo;Domain from the rule
        alone&rdquo; to see the common mistake.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>t</M> increases, <M>{'x = \\sec t + 1'}</M> and <M>{'y = \\tan t'}</M> both increase. The green bars on
        the axes are the <M>x</M>- and <M>y</M>-values reached so far. The point stays on the upper-right piece
        of <M>{'y^2 = x^2 - 2x'}</M>: <M>{'y = \\tan t \\ge 0'}</M> is why part a. takes the positive root.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={XR} y={YR} xStep={1} yStep={1} height={330}>
        {/* the rest of the hyperbola y² = x² − 2x, parametrised as (1 ± cosh u, ± sinh u) */}
        <Plot.Parametric xy={u => [1 + Math.cosh(u), -Math.sinh(u)]} domain={[0, 2.6]} color={C.guide} style="dashed" weight={2} />
        <Plot.Parametric xy={u => [1 - Math.cosh(u), -Math.sinh(u)]} domain={[0, 2.2]} color={C.guide} style="dashed" weight={2} />
        <Plot.Parametric
          xy={u => [1 - Math.cosh(u), Math.sinh(u)]}
          domain={[0, 2.2]}
          color={ruleOnly ? C.bad : C.guide}
          style="dashed"
          weight={ruleOnly ? 3 : 2}
        />
        <Label at={[6.9, -1.6]} attach="w" color={C.guide} size={12}>never reached</Label>
        {ruleOnly && (
          <>
            <Line.Segment point1={[XR[0], 0]} point2={[0, 0]} color={C.bad} weight={6} />
            <Label at={[-2.95, 1.0]} attach="e" color={C.bad} size={12}>rule allows x ≤ 0</Label>
          </>
        )}

        {/* the part of y = √(x² − 2x) that t traces: done so far (solid), still to come (dashed) */}
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[t, 1.45]} color={C.f} style="dashed" weight={2} />
        {t > 0.001 && <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, t]} color={C.f} weight={4} />}

        {/* x- and y-values reached so far */}
        <Line.Segment point1={[2, 0]} point2={[Math.min(x, XR[1]), 0]} color={C.good} weight={6} />
        <Line.Segment point1={[0, 0]} point2={[0, Math.min(y, YR[1])]} color={C.good} weight={6} />
        <Line.Segment point1={[x, y]} point2={[x, 0]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[x, y]} point2={[0, y]} color={C.guide} style="dashed" weight={1.5} />

        <Point x={2} y={0} color={C.good} />
        {t > 0.2 && <Label at={[2, 0]} attach="nw" color={C.good} size={12}>(2, 0)</Label>}
        <Point x={x} y={y} color={C.f} />
        <Label at={[x, y]} attach="nw" color={C.f} size={12}>{`t = ${num(t, 2)}`}</Label>
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={T_MAX}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Run t from 0 towards π/2" />
          <Toggle label="Domain from the rule alone" checked={ruleOnly} onChange={setRuleOnly} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`x = \\sec(${num(t, 2)}) + 1 = ${num(x, 2)}`} />
          <Readout color={C.f} tex={`y = \\tan(${num(t, 2)}) = ${num(y, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
