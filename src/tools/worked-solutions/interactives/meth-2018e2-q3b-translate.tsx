// 2018 Methods Exam 2 Q3b — replacing x by x − c in h₂ slides Arch 2 c units to the RIGHT:
// y = h₂(x − c) = 5 sin((x − (40 + c))π/30). At c = 35 it lands exactly on Arch 3 (a = 75). The
// toggle tries the "minus means left" idea, h₂(x + c): that moves Arch 2 left, and at c = 35 it lands
// on Arch 1 instead.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Plot, Readout, Readouts, Slider, Toggle } from './kit'

const arch = (start: number) => (x: number) => 5 * Math.sin(((x - start) * Math.PI) / 30)

export default function Translate() {
  const [c, setC] = useState(15)
  const [left, setLeft] = useState(false)
  const start = left ? 40 - c : 40 + c
  const color = left ? C.bad : C.g
  const onArch3 = !left && Math.abs(c - 35) < 0.3
  const onArch1 = left && Math.abs(c - 35) < 0.3

  return (
    <div>
      <Plane x={[0, 110]} y={[0, 6.5]} xStep={10} yStep={1} height={220}>
        <Plot.OfX y={() => 5} domain={[0, 110]} color={C.guide} weight={1.5} />
        <Plot.OfX y={arch(5)} domain={[5, 35]} color={C.guide} weight={2} style="dashed" />
        <Plot.OfX y={arch(40)} domain={[40, 70]} color={C.f} weight={3} />
        <Plot.OfX y={arch(75)} domain={[75, 105]} color={C.guide} weight={2} style="dashed" />
        {c > 0 && <Plot.OfX y={arch(start)} domain={[start, start + 30]} color={onArch3 ? C.good : color} weight={3} />}
        <Label at={[20, 2]} attach="c" color={C.guide}>Arch 1</Label>
        <Label at={[55, 2]} attach="c" color={C.f}>Arch 2</Label>
        <Label at={[90, 2]} attach="c" color={C.guide}>Arch 3</Label>
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={0} max={40} step={0.5} format={v => v.toFixed(1)} />
        <Buttons>
          <Toggle label="Wrong idea: minus inside means move left" checked={left} onChange={setLeft} />
        </Buttons>
        <Readouts>
          <Readout
            color={onArch3 ? C.good : color}
            tex={
              left
                ? `h_2(x + ${c}) = 5\\sin\\left(\\tfrac{(x - ${40 - c})\\pi}{30}\\right)`
                : `h_2(x - ${c}) = 5\\sin\\left(\\tfrac{(x - ${40 + c})\\pi}{30}\\right)`
            }
          />
          <Readout color={onArch3 ? C.good : color} tex={`\\text{starts at } x = ${start}`} />
        </Readouts>
        {onArch3 ? (
          <Notice tone="good">
            At <M>c = 35</M> the orange copy sits exactly on Arch 3: <M>{'h_2(x - 35) = 5\\sin\\left(\\tfrac{(x-75)\\pi}{30}\\right) = h_3(x)'}</M>.
            Every point moved <M>35</M> to the right, so the mapping is <M>{'(x,\\ y) \\to (x + 35,\\ y)'}</M>: a translation
            of <M>35</M> units in the positive <M>x</M> direction.
          </Notice>
        ) : onArch1 ? (
          <Notice tone="warn">
            Replacing <M>x</M> by <M>x + 35</M> moved Arch 2 <b>left</b>, onto Arch 1, not Arch 3. So &ldquo;the bracket
            has <M>-35</M>, so move left&rdquo; is backwards: subtracting inside the bracket moves the graph right.
          </Notice>
        ) : left ? (
          <Notice tone="warn">
            This is <M>h_2(x + c)</M>: adding inside the bracket slides the arch to the <b>left</b>. Take <M>c</M> to{' '}
            <M>35</M> and see where it ends up.
          </Notice>
        ) : (
          <Notice>
            Replacing <M>x</M> by <M>x - c</M> means the arch now starts where <M>x - c = 40</M>, that is at{' '}
            <M>x = 40 + c</M>, so the whole arch moves <M>c</M> to the <b>right</b>. Slide <M>c</M> until the orange arch
            covers Arch 3.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
