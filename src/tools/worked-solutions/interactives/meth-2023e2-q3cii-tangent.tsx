// 2023 Methods Exam 2 Q3c.ii — "the tangent that passes through the origin" means the origin is
// a point ON the tangent line, not the point where it touches the curve. Slide the point of
// tangency (a, g(a)) along g(x) = 2^x + 5 and watch the tangent's y-intercept
// −a·2^a·log_e(2) + 2^a + 5 (the constant from part c.i.) fall to 0 at a ≈ 2.618, giving
// y = 4.255x. A toggle draws the common misreading — the tangent at x = 0 (a = 0),
// y = 0.693x + 6 — which crosses the y-axis at 6 and misses the origin.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const LN2 = Math.LN2
const g = (x: number) => 2 ** x + 5
const slope = (a: number) => 2 ** a * LN2
const intercept = (a: number) => -a * 2 ** a * LN2 + 2 ** a + 5
// The root of intercept(a) = 0 (sympy nsolve). The slider snaps to it from within 0.004, so the
// "through the origin" state shows the true tangent, not a near miss.
const A = 2.617847064562704

export default function TangentThroughOrigin() {
  const [a, setA] = useState(1)
  const [atZero, setAtZero] = useState(false)

  const m = slope(a)
  const c = intercept(a)
  const hit = a === A
  const lineColor = hit ? C.good : C.g

  let notice
  if (atZero) {
    notice = (
      <Notice tone="warn">
        The red line is the tangent <b>at</b> <M>x = 0</M> (what you get by putting <M>a = 0</M>):{' '}
        <M>y = 0.693x + 6</M>. It touches the curve at <M>(0,\ 6)</M>, so it crosses the <span className="whitespace-nowrap"><M>y</M>-axis</span> at 6 and
        misses <M>O</M>. &ldquo;Passes through the origin&rdquo; is about a point on the line,{' '}
        <M>(x,\ y) = (0,\ 0)</M>, so substitute <M>x = 0</M> and <M>y = 0</M> into the tangent from part c.i. and
        solve for <M>a</M>.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b>Through the origin.</b> At <M>a \approx 2.618</M> the <span className="whitespace-nowrap"><M>y</M>-intercept</span>{' '}
        <M>{'-a\\,2^a\\log_e(2) + 2^a + 5'}</M> is 0, so this tangent is <M>y = 4.255x</M>. It touches the curve at{' '}
        <M>(2.618,\ 11.14)</M>, nowhere near <M>O</M>: the line only passes through the origin. If your CAS prints
        the intercept as <M>{'8.14\\mathrm{E}{-10}'}</M>, that is 0.
      </Notice>
    )
  } else if (c > 0) {
    notice = (
      <Notice>
        At <M>{`a = ${a.toFixed(3)}`}</M> the tangent touches the curve at <M>{`(${a.toFixed(2)},\\ ${g(a).toFixed(2)})`}</M>{' '}
        but crosses the <span className="whitespace-nowrap"><M>y</M>-axis</span> at <M>{c.toFixed(2)}</M>, above <M>O</M>. Slide <M>a</M> to the right: the
        tangent gets steeper and its <span className="whitespace-nowrap"><M>y</M>-intercept</span> drops. Find the <M>a</M> that makes it exactly 0.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Too far: at <M>{`a = ${a.toFixed(3)}`}</M> the tangent crosses the <span className="whitespace-nowrap"><M>y</M>-axis</span> at <M>{c.toFixed(2)}</M>,{' '}
        <b>below</b> <M>O</M>. Slide <M>a</M> back to the left until the <span className="whitespace-nowrap"><M>y</M>-intercept</span> is 0.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 4]} y={[-6, 22]} xStep={1} yStep={4} height={320}>
        <Plot.OfX y={g} domain={[-3, 4.2]} color={C.f} weight={3} />
        <Label at={[-2.4, g(-2.4)]} color={C.f} attach="n">g</Label>
        {atZero && (
          <>
            <Line.PointSlope point={[0, 6]} slope={LN2} color={C.bad} weight={2} style="dashed" />
            <Point x={0} y={6} color={C.bad} />
            <Label at={[2.2, 6 + 2.2 * LN2]} color={C.bad} attach="se">tangent at x = 0</Label>
          </>
        )}
        <Line.PointSlope point={[a, g(a)]} slope={m} color={lineColor} weight={2.5} />
        <Point x={0} y={hit ? 0 : c} color={C.violet} />
        {!hit && <Label at={[0, c]} color={C.violet} attach="se">{`(0, ${c.toFixed(2)})`}</Label>}
        <Point x={a} y={g(a)} color={lineColor} />
        <Label at={[a, g(a)]} color={lineColor} attach={a > 0.6 ? 'se' : 'n'}>(a, g(a))</Label>
        <Point x={0} y={0} color={C.ink} />
        <Label at={[0, 0]} attach="sw">O</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={v => setA(Math.abs(v - A) < 0.004 ? A : v)} min={-2} max={3.5} step={0.005} format={v => v.toFixed(3)} />
        <Buttons>
          <Toggle label="What if I use the tangent at x = 0?" checked={atZero} onChange={setAtZero} />
        </Buttons>
        <Readouts>
          <Readout color={lineColor} tex={`\\text{gradient } 2^a\\log_e(2) \\approx ${m.toFixed(3)}`} />
          <Readout color={C.violet} tex={`y\\text{-intercept} ${hit ? '= 0' : `\\approx ${c.toFixed(3)}`}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
