// 2022 Methods Exam 1 Q8b — why f(k) = A'(k). The area function A(k) = k sin(k) is given; push the
// right edge from x = k to x = k + h and the extra area is a thin strip that is almost a rectangle
// of height f(k). So (A(k + h) − A(k))/h closes in on f(k) as h shrinks — and that limit is A'(k).
// The ratio is computed from A = k sin(k) alone, never from the derivative, so the agreement is
// real. A toggle shows the common slip A'(k) = k cos(k) (product rule missed) failing: a red
// rectangle of height k cos(k) on the same strip is far too short — short by exactly sin(k), the
// term the product rule supplies.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Region, Slider, Toggle } from './kit'

const A = (k: number) => k * Math.sin(k)
const f = (x: number) => Math.sin(x) + x * Math.cos(x)
const zero = () => 0

export default function Strip() {
  const [k, setK] = useState(Math.PI / 3)
  const [h, setH] = useState(0.4)
  const [slip, setSlip] = useState(false)

  const extra = A(k + h) - A(k)
  const ratio = extra / h
  const fk = f(k)
  const wrong = k * Math.cos(k)
  const small = h <= 0.05

  let notice
  if (slip) {
    notice = (
      <Notice tone="warn">
        As <M>h</M> shrinks, the strip ratio heads to <M>{`f(k) \\approx ${fk.toFixed(2)}`}</M>, but <M>k\cos(k)</M> gives only{' '}
        <M>{`${wrong.toFixed(2)}`}</M>: the red rectangle of that height is far too short to match the strip. Its height falls short of <M>f(k)</M> by exactly{' '}
        <M>{`\\sin(k) \\approx ${Math.sin(k).toFixed(2)}`}</M>, the missing term. Writing <M>{"A'(k) = k\\cos(k)"}</M> treats the first <M>k</M> as a constant,
        yet it changes with <M>k</M> too. <M>k\sin(k)</M> is a product, so use the product rule:{' '}
        <M>{"A'(k) = (1)\\sin(k) + k\\cos(k)"}</M>.
      </Notice>
    )
  } else if (small) {
    notice = (
      <Notice tone="good">
        With <M>h</M> this thin, the orange strip is practically the dashed rectangle, so{' '}
        <M>{'\\bigl(A(k+h)-A(k)\\bigr)/h'}</M> is practically <M>f(k)</M>. That limit is the definition of{' '}
        <M>{"A'(k)"}</M>, so <M>{"f(k) = A'(k)"}</M>: differentiate the area rule to get the curve. Turn on the toggle
        to test the common slip.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Moving the edge from <M>k</M> to <M>k+h</M> adds the orange strip. It is close to a rectangle of height{' '}
        <M>f(k)</M> (dashed), so extra area <M>\approx f(k)\times h</M>. Drag <M>h</M> towards 0 and watch{' '}
        <M>{'\\bigl(A(k+h)-A(k)\\bigr)/h'}</M> close in on <M>f(k)</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 2.2]} y={[0, 1.7]} xStep={0.5} yStep={0.5} height={300}>
        <Region top={f} bottom={zero} from={0} to={k} color={C.f} opacity={0.2} />
        <Region top={f} bottom={zero} from={k} to={k + h} color={C.g} opacity={0.55} />
        <Polygon
          points={[[k, 0], [k + h, 0], [k + h, fk], [k, fk]]}
          color={C.ink}
          fillOpacity={0}
          weight={1.5}
          strokeStyle="dashed"
        />
        {slip && (
          <Polygon
            points={[[k, 0], [k + h, 0], [k + h, wrong], [k, wrong]]}
            color={C.bad}
            fillOpacity={0.15}
            weight={2}
            strokeStyle="dashed"
          />
        )}
        <Plot.OfX y={f} domain={[0, 2]} color={C.f} weight={3} />
        <Line.Segment point1={[k, 0]} point2={[k, fk]} color={C.f} weight={2} />
        <Point x={k} y={fk} color={C.f} />
        {k >= 0.6 && <Label at={[k / 2, 0.3]} color={C.f} attach="c">A(k)</Label>}
        <Label at={[1.75, f(1.75)]} color={C.f} attach="ne">f</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.2} max={1.5} step={0.005} />
        <Slider label="h" value={h} onChange={setH} min={0.005} max={0.5} step={0.005} format={v => v.toFixed(3)} />
        <Toggle label="Try A′(k) = k cos(k)" checked={slip} onChange={setSlip} />
        <Readouts>
          <Readout color={C.g} tex={`A(k+h)-A(k) \\approx ${extra.toFixed(4)}`} />
          <Readout color={C.g} tex={`\\frac{A(k+h)-A(k)}{h} \\approx ${ratio.toFixed(3)}`} />
          <Readout color={C.f} tex={`f(k) = \\sin k + k\\cos k \\approx ${fk.toFixed(3)}`} />
          {slip && <Readout color={C.bad} tex={`k\\cos k \\approx ${wrong.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
