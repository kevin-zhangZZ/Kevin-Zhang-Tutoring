// 2019 Methods Exam 2 MCQ 5 — every antiderivative of f'(x) = 3x² − 2x is y = x³ − x² + c: the same
// curve slid up or down, so f' alone can't say which one is f. A slider moves c; faint copies show
// the rest of the family; the point (4, 0) is the extra fact. The red gap at x = 4 is f(4) = 48 + c,
// and it closes only at c = −48 (option C). c = 0 is option A (misses by 48) and c = 48 is option B,
// the sign slip (misses by 96).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const base = (x: number) => x ** 3 - x ** 2
const FAMILY = [-72, -48, -24, 0, 24, 48, 72]

export default function Family() {
  const [c, setC] = useState(0)
  const f = (x: number) => base(x) + c
  const at4 = 48 + c
  const hit = Math.abs(at4) < 1e-9

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b>
          <M>c = -48</M> is the only member of the family through <M>(4, 0)</M>
        </b>
        , because <M>f(4) = 48 + c = 0</M>. That is option <b>C</b>, <M>{'f(x)=x^3-x^2-48'}</M>. Every other curve
        has exactly the same gradient function, so it is the point, not <M>{"f'"}</M>, that picks this one.
      </Notice>
    )
  } else if (c === 48) {
    notice = (
      <Notice tone="warn">
        This is option <b>B</b>, <M>c = +48</M>. It comes from moving the <M>48</M> across without changing its sign.
        Substitute back: <M>f(4) = 48 + 48 = 96</M>, so the curve passes <M>96</M> above <M>(4, 0)</M>. Slide{' '}
        <M>c</M> down to close the red gap.
      </Notice>
    )
  } else if (c === 0) {
    notice = (
      <Notice>
        This is option <b>A</b>, <M>{'x^3-x^2'}</M> with the <M>+c</M> left out. It has the right derivative, but{' '}
        <M>f(4) = 48</M>: the red gap shows it passing <M>48</M> above <M>(4, 0)</M>. Slide <M>c</M> and watch the whole
        curve move up and down without changing shape. Which <M>c</M> closes the gap?
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Changing <M>c</M> slides the whole curve vertically; its shape (and so its gradient at every <M>x</M>) never
        changes. At <M>x = 4</M> the curve is at <M>48 + c = {num(at4, 0)}</M>, so it misses <M>(4, 0)</M> by the red
        gap. Keep going until the gap is zero.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2, 5]} y={[-80, 120]} xStep={1} yStep={20} height={320}>
        {FAMILY.map(k => (
          <Plot.OfX key={k} y={x => base(x) + k} domain={[-2, 5]} color={C.guide} weight={1} opacity={0.45} />
        ))}
        <Plot.OfX y={f} domain={[-2, 5]} color={C.f} weight={3} />
        {!hit && <Line.Segment point1={[4, 0]} point2={[4, Math.min(at4, 125)]} color={C.bad} weight={2.5} style="dashed" />}
        {!hit && at4 <= 120 && at4 >= -80 && <Point x={4} y={at4} color={C.f} />}
        <Point x={4} y={0} color={C.good} />
        <Label at={[4, 0]} attach="nw" color={C.good}>
          (4, 0)
        </Label>
        {!hit && Math.abs(at4) > 14 && (
          <Label at={[4, Math.max(-80, Math.min(at4, 120)) / 2]} attach={at4 > 0 ? 'e' : 'w'} color={C.bad} size={12}>
            {`gap ${num(at4, 0)}`}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={-72} max={72} step={4} format={v => num(v, 0)} />
        <Readouts>
          <Readout color={C.f} tex={`f(x) = x^3 - x^2${c === 0 ? "" : ` ${c < 0 ? "-" : "+"} ${Math.abs(c)}`}`} />
          <Readout color={hit ? C.good : C.bad} tex={`f(4) = 48 ${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${num(at4, 0)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
