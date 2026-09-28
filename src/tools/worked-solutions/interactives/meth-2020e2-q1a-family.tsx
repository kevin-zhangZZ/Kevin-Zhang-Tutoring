// 2020 Methods Exam 2 Q1a — why the y-intercept, not the x-intercepts, fixes a. Slide a: every
// curve y = a(x + 2)²(x − 2)² passes through (−2, 0) and (2, 0) whatever a is (at x = ±2 one of the
// brackets is zero, so the whole product is zero), which is why substituting (±2, 0) only gives
// 0 = 0 — the report notes some students did exactly that. The only labelled point that moves is
// the y-intercept, (0, 16a), and it reaches VCAA's printed (0, 4) at a = 1/4. Faint grey curves are
// other members of the family (a = −0.2, 0.1, 0.45), all through the same two points.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num, tick } from './kit'

const member = (a: number) => (x: number) => a * (x + 2) ** 2 * (x - 2) ** 2
const GHOSTS = [-0.2, 0.1, 0.45]

export default function Family() {
  const [a, setA] = useState(0.1)
  const hit = Math.abs(a - 0.25) < 1e-9
  const flat = Math.abs(a) < 1e-9
  const yInt = 16 * a

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b>
          <M>a = \tfrac14</M>: the curve goes through the printed point <M>(0, 4)</M>.
        </b>{' '}
        That is the whole of part a: substitute <M>x = 0</M> to get <M>{'f(0) = a(2)^2(-2)^2 = 16a'}</M>, set it equal to{' '}
        <M>4</M>, and solve. The <M>y</M>-intercept is the only labelled point on the graph whose height depends on{' '}
        <M>a</M>, so it is the only one that can pin <M>a</M> down.
      </Notice>
    )
  } else if (flat) {
    notice = (
      <Notice>
        With <M>a = 0</M> the whole curve collapses onto the <M>x</M>-axis, and it <i>still</i> passes through{' '}
        <M>(-2, 0)</M> and <M>(2, 0)</M>. Those two points hold for every value of <M>a</M>, so they can&apos;t tell you
        which <M>a</M> you have.
      </Notice>
    )
  } else if (a < 0) {
    notice = (
      <Notice>
        A negative <M>a</M> turns the curve upside down, but it still touches the <M>x</M>-axis at <M>-2</M> and{' '}
        <M>2</M>. The <M>x</M>-intercepts come from the brackets <M>(x+2)^2</M> and <M>(x-2)^2</M>, not from <M>a</M>.
        Only the <M>y</M>-intercept, <M>{`(0,\\ 16a) = (0,\\ ${num(yInt)})`}</M>, moves. Slide <M>a</M> until it reaches{' '}
        <M>(0, 4)</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every curve in this family (the grey ones too) passes through <M>(-2, 0)</M> and <M>(2, 0)</M>: at{' '}
        <M>x = 2</M> the bracket <M>(x - 2)^2</M> is zero, so the whole product is zero whatever <M>a</M> is. That is why
        substituting <M>(2, 0)</M> just gives <M>0 = 0</M>. Watch the <M>y</M>-intercept instead: it is{' '}
        <M>{`16a = ${num(yInt)}`}</M>. Slide <M>a</M> until the curve hits the printed point <M>(0, 4)</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-4, 8]} xStep={1} yStep={2} height={300} xLabels={v => (Math.abs(Math.abs(v) - 2) < 1e-9 ? '' : tick(v))}>
        {GHOSTS.map(g => (
          <Plot.OfX key={g} y={member(g)} domain={[-3.2, 3.2]} color={C.guide} weight={1.2} opacity={0.6} />
        ))}
        <Plot.OfX y={member(a)} domain={[-3.2, 3.2]} color={hit ? C.good : C.f} weight={3} />
        {/* The printed point, as a target. */}
        <Point x={0} y={4} color={hit ? C.good : C.guide} />
        {!hit && <Label at={[0, 4]} color={C.guide} attach="e">(0, 4)</Label>}
        <Point x={0} y={yInt} color={hit ? C.good : C.f} />
        <Label at={[0, yInt]} color={hit ? C.good : C.f} attach={hit ? 'ne' : a < 0 ? 'sw' : 'nw'}>
          {hit ? '(0, 4)' : `(0, ${num(yInt)})`}
        </Label>
        <Point x={-2} y={0} color={C.ink} />
        <Point x={2} y={0} color={C.ink} />
        {/* Below the axis, in place of the tick numbers ±2 (hidden on the plane). */}
        <Label at={[-2, 0]} attach="s" size={12}>(−2, 0)</Label>
        <Label at={[2, 0]} attach="s" size={12}>(2, 0)</Label>
      </Plane>
      <Controls>
        <Slider
          label="a"
          value={a}
          onChange={v => setA(Math.abs(v - 0.25) < 0.006 ? 0.25 : v)}
          min={-0.25}
          max={0.5}
          step={0.005}
          format={v => (Math.abs(v - 0.25) < 1e-9 ? '1/4' : num(v))}
        />
        <Buttons>
          <ActionButton label="Set a = 1/4" onClick={() => setA(0.25)} />
        </Buttons>
        <Readouts>
          <Readout tex={`f(\\pm2) = a \\times 0 = 0 \\text{ always}`} />
          <Readout color={hit ? C.good : C.f} tex={`f(0) = 16a = ${num(yInt)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
