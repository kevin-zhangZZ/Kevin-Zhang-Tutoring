// 2019 Specialist Exam 2 Q3a.ii — when is k = (1/(a − b))·log_e(r/s) positive? Drag the two data
// points (a, r) and (b, s); the curve P = Ae^{kt} through them is drawn from the question's own
// formula for k, with A = re^{−ka}. The readouts show the two factors 1/(a − b) and log_e(r/s):
// k > 0 exactly when they have the same sign, and in both cases the picture is the same — the LATER
// point is the HIGHER one. "Swap names" relabels the points (a ↔ b, r ↔ s): the curve and k don't
// change, but both factors flip sign, turning case 1 into case 2. A toggle shows the one-case answer
// (a > b and r > s) the examiner's report says many students gave, failing on a growing curve.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Readout, Readouts, Toggle, clamp,
  num,
} from './kit'

const T: [number, number] = [0, 6]
const Y: [number, number] = [0, 6]
const lo = 0.3
const hi = 5.7

type Pt = [number, number]
const keep = ([t, p]: Pt): Pt => [clamp(t, lo, hi), clamp(p, lo, hi)]

export default function LaterHigher() {
  // (a, r) and (b, s). Start in the case most students missed: a < b and r < s.
  const [ar, setAr] = useState<Pt>([1, 1.2])
  const [bs, setBs] = useState<Pt>([4, 3.6])
  const [firstOnly, setFirstOnly] = useState(false)

  const [a, r] = ar
  const [b, s] = bs
  const sameTime = Math.abs(a - b) < 0.12
  const f1 = sameTime ? NaN : 1 / (a - b)
  const f2 = Math.log(r / s)
  const k = f1 * f2
  const flat = !sameTime && Math.abs(f2) < 0.03
  const growing = !sameTime && !flat && k > 0
  const case1 = a > b && r > s
  const case2 = a < b && r < s
  const A = r * Math.exp(-k * a)
  const P = (t: number) => Math.min(40, A * Math.exp(k * t))

  const sgn = (v: number) => (v > 0 ? '> 0' : '< 0')
  // Put each point's name on the side away from the curve.
  const left = a <= b ? 'ar' : 'bs'
  const attachFor = (which: 'ar' | 'bs') =>
    which === left ? (growing ? 'se' : 'ne') : growing ? 'nw' : 'se'

  let notice
  if (sameTime) {
    notice = (
      <Notice tone="warn">
        <M>a</M> and <M>b</M> are (almost) the same time. One time can&apos;t have two different values of{' '}
        <M>P</M>, so <M>{'\\tfrac{1}{a-b}'}</M> is undefined: the formula assumes <M>{'a \\ne b'}</M>. Pull the points
        apart.
      </Notice>
    )
  } else if (flat) {
    notice = (
      <Notice>
        With <M>r = s</M>, <M>{'\\log_e\\!\\left(\\tfrac{r}{s}\\right) = \\log_e 1 = 0'}</M>, so <M>k = 0</M>:{' '}
        <M>P</M> stays constant, neither growing nor decaying. That&apos;s why the conditions use strict inequalities.
      </Notice>
    )
  } else if (!growing) {
    notice = (
      <Notice>
        The <b>later</b> point is <b>lower</b>, so the curve decays and <M>{'k < 0'}</M>: the two factors have{' '}
        <b>opposite</b> signs. Drag one point so the later point is higher and watch both factors end up with the same
        sign.
      </Notice>
    )
  } else if (firstOnly && case2) {
    notice = (
      <Notice tone="warn">
        The one-case answer tests <M>{'a > b'}</M> and <M>{'r > s'}</M>. Both fail here, so it says &ldquo;not
        growing&rdquo;, yet the curve clearly grows and <M>{`k \\approx ${num(k, 3)} > 0`}</M>. That answer only
        works if you happen to call the <b>later</b> time <M>a</M>. The question never says which time is later.
      </Notice>
    )
  } else if (case1) {
    notice = (
      <Notice tone="good">
        <b>Case 1:</b> <M>{'a > b'}</M> and <M>{'r > s'}</M>, so both factors are positive. <M>a</M> is the later time
        and it has the larger value <M>r</M>: the curve rises. Now press <b>Swap names</b>: the curve and <M>k</M>{' '}
        don&apos;t change, but both factors flip sign.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Case 2:</b> <M>a</M> is the <b>earlier</b> time, so <M>{'\\tfrac{1}{a-b} < 0'}</M>, and <M>{'r < s'}</M>, so{' '}
        <M>{'\\log_e\\!\\left(\\tfrac{r}{s}\\right) < 0'}</M>. Negative × negative: <M>{'k > 0'}</M>. Both cases say
        the same thing: the later point is higher. Turn on the toggle to see the one-case answer miss this.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={T} y={Y} xStep={1} yStep={1} height={300} labels={false} xLabel="t" yLabel="P">
        {!sameTime && <Plot.OfX y={P} domain={T} color={growing ? C.f : C.guide} weight={3} />}
        <Line.Segment point1={[a, 0]} point2={[a, r]} color={C.violet} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, r]} point2={[a, r]} color={C.violet} style="dashed" weight={1.5} />
        <Line.Segment point1={[b, 0]} point2={[b, s]} color={C.g} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, s]} point2={[b, s]} color={C.g} style="dashed" weight={1.5} />
        <Label at={[a, 0]} attach="s" color={C.violet}>a</Label>
        <Label at={[b, 0]} attach="s" color={C.g}>b</Label>
        <Label at={[0, r]} attach="w" color={C.violet}>r</Label>
        <Label at={[0, s]} attach="w" color={C.g}>s</Label>
        <MovablePoint point={ar} onMove={p => setAr(keep(p as Pt))} color={C.violet} />
        <MovablePoint point={bs} onMove={p => setBs(keep(p as Pt))} color={C.g} />
        <Label at={ar} attach={attachFor('ar')} color={C.violet} gap={12}>(a, r)</Label>
        <Label at={bs} attach={attachFor('bs')} color={C.g} gap={12}>(b, s)</Label>
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton
            label="Swap names: a ↔ b, r ↔ s"
            onClick={() => {
              setAr(bs)
              setBs(ar)
            }}
          />
          <Toggle label="Only the first case" checked={firstOnly} onChange={setFirstOnly} />
        </Buttons>
        <Readouts>
          <Readout
            color={C.violet}
            tex={sameTime ? '\\tfrac{1}{a-b}\\ \\text{undefined}' : `\\tfrac{1}{a-b} = \\tfrac{1}{${num(a - b)}} ${sgn(f1)}`}
          />
          <Readout
            color={C.g}
            tex={`\\log_e\\!\\left(\\tfrac{r}{s}\\right) = \\log_e\\!\\left(\\tfrac{${num(r)}}{${num(s)}}\\right) ${flat ? '= 0' : sgn(f2)}`}
          />
          {!sameTime && (
            <Readout color={flat ? C.guide : growing ? C.good : C.bad} tex={`k \\approx ${flat ? '0' : num(k, 3)}`} />
          )}
          {firstOnly ? (
            <Readout
              color={case1 === growing ? C.good : C.bad}
              tex={`a>b \\text{ and } r>s\\,? \\ \\ ${case1 ? '\\text{yes}' : '\\text{no}'}`}
            />
          ) : (
            <Readout
              color={C.guide}
              tex={case1 ? '\\text{case 1 holds}' : case2 ? '\\text{case 2 holds}' : '\\text{neither case}'}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
