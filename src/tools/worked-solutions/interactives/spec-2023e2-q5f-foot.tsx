// 2023 Specialist Exam 2 Q5f — D is where the normal line L: r = t(2i − 2j − k) reaches the plane
// ψ: 2x − 2y − z = −18. Side view looking along ψ, so ψ is edge-on and L (its normal) crosses it
// at right angles; the horizontal axis is the parameter t. Walking along L, 2x − 2y − z = 9t, so
// the plane is reached at 9t = −18, t = −2, D(−4, 4, 2), with |OD| = 3|t| = 6 (part e.). A toggle
// shows the wrong-way point 6 units along +n, (4, −4, −2), where 2x − 2y − z = +18, not −18.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, Toggle, Vector, num, tick } from './kit'

const TOP = 1.15

export default function Foot() {
  const [t, setT] = useState(1)
  const [wrong, setWrong] = useState(false)

  const atD = Math.abs(t + 2) < 1e-6
  const val = 9 * t
  const col = atD ? C.good : C.g
  const pt = `(${num(2 * t, 1)},\\ ${num(-2 * t, 1)},\\ ${num(-t, 1)})`

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Going 6 units along <M>{'+\\underset{\\sim}{n}'}</M> gives <M>{'(4,-4,-2)'}</M>, 6 units from O but on the wrong
        side: <M>{'2(4)-2(-4)-(-2)=+18\\neq-18'}</M>. Because the right-hand side of{' '}
        <M>{'2x-2y-z=-18'}</M> is negative, <M>\psi</M> lies on the <M>{'-\\underset{\\sim}{n}'}</M> side of O, so D needs{' '}
        <M>{'t<0'}</M>. Always check your point in the plane&apos;s equation.
      </Notice>
    )
  } else if (atD) {
    notice = (
      <Notice tone="good">
        <b>On <M>\psi</M>: <M>{'9t=-18'}</M> at <M>{'t=-2'}</M></b>, so <M>{'D=(-4,\\ 4,\\ 2)'}</M>. Its distance from O
        is <M>{'3|t|=6'}</M>, the answer to part e. Turn on the toggle to see what goes wrong if you start from that
        distance 6 and step the wrong way.
      </Notice>
    )
  } else if (t > -2) {
    notice = (
      <Notice>
        Substituting L into the left side gives <M>{'2(2t)-2(-2t)-(-t)=9t'}</M>, which is{' '}
        <M>{num(val, 2)}</M> here. The plane needs <M>-18</M>,{' '}
        {t > 0 ? 'and positive t only makes 9t bigger, so slide t the other way.' : 'so keep sliding t down.'}
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{`9t=${num(val, 2)}`}</M> is below <M>-18</M>: P has gone through <M>\psi</M> and out the far side. Slide t
        back up until <M>{'9t=-18'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.2, 3.2]} y={[-0.9, 1.4]} xStep={1} yStep={5} height={240} xLabel="" yLabel="" yLabels={false}
        xLabels={v => (Math.abs(v + 2) < 1e-9 ? '' : tick(v))}>
        <Line.Segment point1={[-2, -0.9]} point2={[-2, TOP]} color={C.violet} weight={4} />
        <Label at={[-2, TOP]} color={C.violet} attach="n">ψ (t = −2)</Label>
        {wrong && (
          <>
            <Line.Segment point1={[2, -0.9]} point2={[2, TOP]} color={C.bad} weight={2} style="dashed" />
            <Label at={[2, TOP]} color={C.bad} attach="n">2x − 2y − z = +18</Label>
            <Point x={2} y={0} color={C.bad} />
            <Label at={[2, -0.6]} color={C.bad} attach="w">(4, −4, −2)</Label>
          </>
        )}
        <Line.Segment point1={[-3.2, 0]} point2={[3.2, 0]} color={C.f} weight={3} />
        <Label at={[-2.6, 0]} color={C.f} attach="n">L</Label>
        <Label at={[3.2, 0]} attach="ne" size={14} italic>t</Label>
        <Vector tail={[0, 0.45]} tip={[1, 0.45]} color={C.ink} />
        <Label at={[0.5, 0.45]} attach="n">n</Label>
        <Point x={0} y={0} color={C.ink} />
        <Label at={[0, 0]} attach="sw">O</Label>
        <Point x={t} y={0} color={col} />
        <Label at={[t, 0]} color={col} attach="n">{atD ? 'D' : 'P'}</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={-3} max={3} step={0.05} />
        <Buttons>
          <Toggle label="Go 6 units along +n instead" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout tex={`P = (2t,\\ -2t,\\ -t) = ${pt}`} />
          <Readout color={col} tex={`2x-2y-z = 9t = ${num(val, 2)}`} />
          <Readout tex={`|\\overrightarrow{OP}| = 3|t| = ${num(3 * Math.abs(t), 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
