// 2015 Specialist Exam 1 Q8d — the area under f(x) = ½arctan(x) is a rectangle minus the region
// beside the y-axis. The rectangle t × f(t) is split by the curve into A (under the curve, asked
// for) and B (between the curve and the y-axis). B is made of horizontal strips of width
// f⁻¹(y) = tan(2y), so B = ∫ tan(2y) dy, which part a. integrates. Slide the right-hand edge t to
// see the subtraction work for any edge (readouts check it against a numerical ∫f dx); the toggle
// shows that ½log_e(2), the report's common wrong answer, is B alone.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle,
  integrate,
} from './kit'

const f = (x: number) => Math.atan(x) / 2
const R3 = Math.sqrt(3)

export default function Rectangle() {
  const [t, setT] = useState(R3)
  const [trap, setTrap] = useState(false)

  const atR3 = Math.abs(t - R3) < 0.006
  const h = f(t)
  const rect = t * h
  const B = 0.5 * Math.log(1 / Math.cos(2 * h))
  const A = rect - B
  const numeric = integrate(f, 0, t, 400)

  // a horizontal strip of B, from the y-axis to the curve, at 65% of the rectangle's height (clear of the ¼ tick)
  const ys = 0.65 * h
  const xs = Math.tan(2 * ys)
  const d = 0.012
  const yB = 0.88 * h

  let notice
  if (trap) {
    notice = (
      <Notice tone="warn">
        <b>The orange region is <M>B</M>, not the area asked for.</b> Its area is{' '}
        <M>{'\\int_0^{\\pi/6}\\tan(2y)\\,dy = \\tfrac12\\log_e(2) \\approx 0.347'}</M>, the report&apos;s common wrong
        answer. The question wants the region under the curve and above the <M>x</M>-axis. Turn the toggle off to
        see it as the rectangle minus <M>B</M>.
      </Notice>
    )
  } else if (atR3) {
    notice = (
      <Notice tone="good">
        <b>Blue <M>A</M> = rectangle − orange <M>B</M>.</b> The solid orange strip runs from the <M>y</M>-axis to the curve,
        so its width is <M>{'x = f^{-1}(y) = \\tan(2y).'}</M> Stacking these strips from <M>y = 0</M> to{' '}
        <M>{'y = \\tfrac\\pi6'}</M> gives <M>{'B = \\int_0^{\\pi/6}\\tan(2y)\\,dy'}</M>, the integral part a. handed
        you. Now drag <M>t</M> to see the subtraction works for any right-hand edge.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        For an edge at <M>x = t</M> the rectangle is <M>t \times f(t)</M> and <M>B</M> runs from <M>y = 0</M> up to{' '}
        <M>y = f(t)</M>. The <M>A</M> readout always matches the numerical <M>{'\\int_0^t f(x)\\,dx'}</M>, so the
        method never depends on knowing an antiderivative of <M>\arctan</M>. Press &ldquo;Back to{' '}
        <M>{'x = \\sqrt3'}</M>&rdquo; for the exam&apos;s numbers.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.25, 4.3]} y={[-0.12, 0.9]} xStep={1} yStep={0.25} height={280} label="Graph of y = arctan(x)/2 with the rectangle from the origin to (t, f(t)) split by the curve into regions A and B">
        {!trap && <Region top={f} bottom={() => 0} from={0} to={t} color={C.f} opacity={0.3} />}
        <Region top={() => h} bottom={f} from={0} to={t} color={C.g} opacity={trap ? 0.45 : 0.25} />
        <Line.Segment point1={[-0.25, Math.PI / 4]} point2={[4.3, Math.PI / 4]} color={C.guide} style="dashed" weight={1} />
        <Label at={[4.3, Math.PI / 4]} color={C.guide} attach="sw" bold={false}>y = π/4</Label>
        <Line.Segment point1={[0, h]} point2={[t, h]} color={C.g} style="dashed" weight={2} />
        <Line.Segment point1={[t, 0]} point2={[t, h]} color={C.ink} weight={2} />
        <Plot.OfX y={f} domain={[-0.25, 4.3]} color={C.f} weight={3} />
        <Polygon points={[[0, ys - d], [xs, ys - d], [xs, ys + d], [0, ys + d]]} color={C.g} fillOpacity={0.9} weight={1} />
        {!trap && t > 0.8 && <Label at={[0.68 * t, 0.3 * f(0.68 * t)]} color={C.f} attach="c">A</Label>}
        {t > 0.8 && <Label at={[0.45 * Math.tan(2 * yB), yB]} color={C.g} attach="c">B</Label>}
        <Label at={[t, h]} color={C.ink} attach="nw" bold={false}>{atR3 ? '(√3, π/6)' : `(${t.toFixed(2)}, ${h.toFixed(2)})`}</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0.3} max={4} step={0.01} />
        <Buttons>
          <ActionButton label={<>Back to <M>{'x = \\sqrt3'}</M></>} onClick={() => setT(R3)} />
          <Toggle label="Show only what ½ logₑ(2) measures" checked={trap} onChange={setTrap} />
        </Buttons>
        <Readouts>
          <Readout tex={atR3 ? `\\text{rectangle} = \\sqrt3\\times\\tfrac\\pi6 \\approx ${rect.toFixed(3)}` : `\\text{rectangle} = t\\,f(t) \\approx ${rect.toFixed(3)}`} />
          <Readout color={C.g} tex={atR3 ? `B = \\tfrac12\\log_e(2) \\approx ${B.toFixed(3)}` : `B \\approx ${B.toFixed(3)}`} />
          <Readout color={C.f} tex={`A = \\text{rectangle} - B \\approx ${A.toFixed(3)}`} />
          <Readout tex={`\\textstyle\\int_0^{${atR3 ? '\\sqrt3' : t.toFixed(2)}} f(x)\\,dx \\approx ${numeric.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
