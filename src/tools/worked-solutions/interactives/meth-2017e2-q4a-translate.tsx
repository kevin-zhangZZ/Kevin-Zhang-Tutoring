// 2017 Methods Exam 2 Q4a — a translation moves every point of y = 2^x by the same vector (c, d).
// Two sliders move the sky copy of y = 2^x: the anchor point (0, 1) goes to (c, 1 + d) and the
// asymptote y = 0 goes to y = d. The copy lands on f(x) = 2^(x+1) − 2 (dashed orange) only at
// c = −1, d = −2, and the rule readout y = 2^(x − c) + d shows why moving LEFT puts +1 inside the
// exponent — the sign slip the examiner's report mentions. Starts with d already matched.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Vector, num } from './kit'

const f = (x: number) => 2 ** (x + 1) - 2

function sgn(v: number, lead = false): string {
  if (Math.abs(v) < 1e-9) return lead ? '0' : ''
  return v < 0 ? `-${num(-v, 1).replace(/\.0$/, '')}` : `${lead ? '' : '+'}${num(v, 1).replace(/\.0$/, '')}`
}

export default function Translate() {
  const [c, setC] = useState(0)
  const [d, setD] = useState(-2)
  const g = (x: number) => 2 ** (x - c) + d
  const matched = Math.abs(c + 1) < 1e-9 && Math.abs(d + 2) < 1e-9
  const slip = Math.abs(c - 1) < 1e-9 && Math.abs(d + 2) < 1e-9
  const inner = Math.abs(c) < 1e-9 ? 'x' : `x${sgn(-c)}`
  const rule = `y = 2^{${inner}}${sgn(d)}`

  let notice
  if (matched) {
    notice = (
      <Notice tone="good">
        <b>It fits.</b> The anchor <M>(0,1)</M> has moved to <M>(-1,-1)</M>, a point on <M>f</M>, and the asymptote
        sits on <M>y=-2</M>. One unit left and two down: <M>c=-1</M>, <M>d=-2</M>. Look at the rule: a move to the{' '}
        <em>left</em> shows up as <M>{'x+1'}</M> inside the power.
      </Notice>
    )
  } else if (slip) {
    notice = (
      <Notice tone="warn">
        This is the sign slip: <M>c=+1</M> because <M>f</M> has <M>{'x+1'}</M> in it. But the copy has moved{' '}
        <em>right</em>, and its rule reads <M>{'2^{x-1}-2'}</M>, not <M>{'2^{x+1}-2'}</M>. Slide <M>c</M> the other way.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every point moves by the same vector <M>(c,d)</M>. The asymptote already matches (<M>d=-2</M>), so now slide{' '}
        <M>c</M> until the purple arrow lands the anchor <M>(0,1)</M> on the dashed curve. Try <M>c=1</M> first, the
        tempting answer, and watch where the copy goes.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-4, 3]} y={[-3, 4]} height={330}>
        <Line.Segment point1={[-4, -2]} point2={[3, -2]} color={C.g} style="dashed" weight={1.5} />
        <Line.Segment point1={[-4, d]} point2={[3, d]} color={C.f} style="dashed" weight={1.5} />
        <Plot.OfX y={x => 2 ** x} domain={[-4, 2.2]} color={C.guide} weight={2} />
        <Plot.OfX y={f} domain={[-4, 1.4]} color={C.g} weight={3} style="dashed" />
        <Plot.OfX y={g} domain={[-4, 3]} color={matched ? C.good : C.f} weight={3} />
        <Vector tail={[0, 1]} tip={[c, 1 + d]} color={C.violet} />
        <Point x={0} y={1} color={C.guide} />
        <Point x={c} y={1 + d} color={matched ? C.good : C.f} />
        <Label at={[1.9, 2 ** 1.9]} color={C.guide} attach="w">y = 2ˣ</Label>
        <Label at={[1.2, f(1.2)]} color={C.g} attach="w">f</Label>
        <Label at={[0, 1]} color={C.guide} attach="nw">(0, 1)</Label>
        <Label at={[3, -2]} color={C.g} attach="sw" size={12}>y = −2</Label>
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={-3} max={3} step={0.5} format={v => num(v, 1)} />
        <Slider label="d" value={d} onChange={setD} min={-3} max={3} step={0.5} format={v => num(v, 1)} />
        <Readouts>
          <Readout color={matched ? C.good : C.f} tex={rule} />
          <Readout tex={`(0,1)\\mapsto(${sgn(c, true)},\\,${sgn(1 + d, true)})`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
