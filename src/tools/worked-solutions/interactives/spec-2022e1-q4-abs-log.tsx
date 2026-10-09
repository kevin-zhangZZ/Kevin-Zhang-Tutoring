// 2022 Specialist Exam 1 Q4 — why the answer needs log_e|x|, not log_e(x). The integrand
// (3x² + 4x + 12)/(x(x² + 4)) = 3/x + 4/(x² + 4) has a value at every x ≠ 0, negative x included
// (−1 at x = −2). Slide a point along F(x) = 3 log_e|x| + 2 tan⁻¹(x/2): the line through it whose
// slope is the integrand's value only touches F, on both sides of the y-axis, so F′ = integrand
// everywhere. The toggle drops the absolute value: 3 log_e(x) + 2 tan⁻¹(x/2) has no graph at all
// for x < 0, where the integrand still has values. That missing |x| is a mark the report says
// students lost. On the right, the note that shifting F up or down changes no slope explains + c.
// Opens at x = −2.5; only even x ticks and positive y ticks are numbered, so the steep curve near
// x = 0, the point and the tangent stay clear of the tick numbers on a phone.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Readout, Readouts, Slider, Toggle, clamp, tick } from './kit'

const integrand = (x: number) => (3 * x * x + 4 * x + 12) / (x * (x * x + 4))
const F = (x: number) => 3 * Math.log(Math.abs(x)) + 2 * Math.atan(x / 2)

const LO = -5.5
const HI = 5.5
const GAP = 0.5 // keep the point off the vertical asymptote x = 0
const snap = (v: number) => {
  const x = clamp(v, LO, HI)
  return Math.abs(x) < GAP ? (x < 0 ? -GAP : GAP) : x
}

export default function AbsLog() {
  const [a, setA] = useState(-2.5)
  const [noAbs, setNoAbs] = useState(false)

  const exists = !noAbs || a > 0 // is the candidate antiderivative defined at x = a?
  const slope = integrand(a)
  const measured = (F(a + 1e-5) - F(a - 1e-5)) / 2e-5 // read off the curve, not from any formula
  const fmt = (v: number) => (Math.abs(v) < 0.0005 ? '0' : v.toFixed(3))
  const xa = a.toFixed(2)
  const candTex = noAbs ? '3\\log_e(x)+2\\tan^{-1}\\!\\left(\\tfrac{x}{2}\\right)' : '3\\log_e|x|+2\\tan^{-1}\\!\\left(\\tfrac{x}{2}\\right)'

  let notice
  if (!noAbs && a < 0) {
    notice = (
      <Notice tone="good">
        <b>Left of the y-axis the green line still just touches the curve.</b> Its slope is the integrand&apos;s value
        at <M>{`{x = ${xa}}`}</M>, so <M>{'F\'(x)'}</M> equals the integrand for negative <M>x</M> too. The integrand
        is defined for every <M>{'x \\neq 0'}</M>, so the answer has to work on this side as well. Now turn on
        &ldquo;Drop the absolute value&rdquo;.
      </Notice>
    )
  } else if (!noAbs) {
    notice = (
      <Notice tone="good">
        <b>The green line just touches the curve wherever you put the point</b>, so <M>{'F\'(x)'}</M> is the
        integrand here too. Moving the whole curve up or down wouldn&apos;t change a single slope, so{' '}
        <M>{'F(x) + c'}</M> passes this test for every <M>c</M>. That is why the answer needs the <M>+c</M>. Now
        slide the point left of the y-axis.
      </Notice>
    )
  } else if (a < 0) {
    notice = (
      <Notice tone="warn">
        <b>With <M>{'3\\log_e(x)'}</M> the curve vanishes left of the y-axis</b>, because <M>{'\\log_e(x)'}</M> is
        only defined for <M>{'x > 0'}</M>. But the integrand still has a value here: about <M>{fmt(slope)}</M> at{' '}
        <M>{`{x = ${xa}}`}</M>. Only <M>{'\\log_e|x|'}</M> covers both sides, and the report says some students left
        out these absolute value signs. Slide to the right of the y-axis.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        For <M>{'x > 0'}</M>, <M>{'|x| = x'}</M>, so <M>{'3\\log_e(x)'}</M> draws exactly the same curve here, with
        the same slopes. The difference only shows for negative <M>x</M>. Slide back left of the y-axis.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-6, 6]}
        y={[-4, 9]}
        xStep={1}
        yStep={2}
        height={330}
        xLabels={v => (Math.round(v) % 2 === 0 ? tick(v) : '')}
        yLabels={v => (v < 0 || v > 9 ? '' : tick(v))}
      >
        {!noAbs && <Plot.OfX y={F} domain={[-6, -0.15]} color={C.f} weight={3} />}
        <Plot.OfX y={F} domain={[0.15, 6]} color={C.f} weight={3} />
        <Label at={[4, F(4)]} color={C.f} attach="nw">y = F(x)</Label>
        {!noAbs && (
          <Label at={[-4.5, F(-4.5)]} color={C.f} attach="sw">
            y = F(x)
          </Label>
        )}
        {noAbs && (
          <Label at={[-3, 6.5]} color={C.bad} attach="c">
            no graph for x &lt; 0
          </Label>
        )}
        {exists && <Line.PointSlope point={[a, F(a)]} slope={slope} color={C.good} weight={2.5} />}
        <MovablePoint
          point={[a, exists ? F(a) : 0]}
          color={exists ? C.good : C.bad}
          constrain={p => {
            const x = snap(p[0])
            return [x, !noAbs || x > 0 ? F(x) : 0]
          }}
          onMove={p => setA(snap(p[0]))}
        />
      </Plane>
      <Controls>
        <Slider label="x" value={a} onChange={v => setA(snap(v))} min={LO} max={HI} step={0.05} />
        <Toggle label={<>Drop the absolute value: <M>{'3\\log_e(x)'}</M></>} checked={noAbs} onChange={setNoAbs} />
        <Readouts>
          <Readout color={noAbs ? C.bad : C.f} tex={`F(x) = ${candTex}`} />
          <Readout color={C.good} tex={`\\text{integrand at } x = ${xa}\\text{:}\\quad \\approx ${fmt(slope)}`} />
          {exists ? (
            <Readout color={C.f} tex={`\\text{slope of } F \\text{ (zoomed in):}\\quad \\approx ${fmt(measured)}`} />
          ) : (
            <Readout color={C.bad} tex={`F(${xa}) \\text{ is undefined}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
