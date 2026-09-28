// 2019 Specialist Exam 2 MCQ 8 — why the substitution u = 2x + 1 brings a factor of ½. The area under
// y = (2x − 1)√(2x + 1) on [1, 5] (≈ 56.29) is morphed into the u-picture: every x slides to 2x + 1, so
// the base [1, 5] stretches to [3, 11] (twice as wide) and, to keep the area, every height is halved —
// the new top is ½(u − 2)√u = ½(u^{3/2} − 2u^{1/2}), option E. In between, with stretch factor w, the map
// (x, y) → (wx + (w − 1), y / w) keeps the area exactly. A violet strip shows one piece: width up,
// height down. A toggle shows option D (multiplying by du/dx = 2): the heights double as well, so the
// area ends up 4 times too big (≈ 225.15).

import { useState } from 'react'
import {
  Buttons, C, Controls, Line, M, Notice, Plane, PlayButton, Plot, Readout, Readouts, Region, Slider, Toggle, integrate, num,
  usePlayer,
} from './kit'

const f = (x: number) => (2 * x - 1) * Math.sqrt(2 * x + 1)
const AREA = integrate(f, 1, 5, 400) // √3/5 + 253√11/15 ≈ 56.29
const X: [number, number] = [0, 12]
const Y: [number, number] = [0, 32]
// Option D doubles the heights instead of halving them, so its curve reaches 2·9√11 ≈ 59.7.
const YD: [number, number] = [0, 64]

export default function Stretch() {
  const [s, setS] = useState(0)
  const [wrongD, setWrongD] = useState(false)
  const player = usePlayer(setS, { min: 0, max: 1, seconds: 4 })

  const w = 1 + s // width factor: 1 in the x-picture, 2 in the u-picture (du/dx = 2)
  const hf = wrongD ? w : 1 / w // height factor: ÷ w keeps the area; option D multiplies instead
  const to = (x: number) => w * x + s // x → 2x + 1 when s = 1
  const top = (X0: number) => f((X0 - s) / w) * hf
  const a = to(1)
  const b = to(5)
  const sa = to(3)
  const sb = to(3.5)
  const area = AREA * w * hf
  const done = s > 0.98
  const color = wrongD ? C.bad : C.f

  let notice
  if (wrongD) {
    notice = (
      <Notice tone="warn">
        Option D multiplies by <M>{'\\tfrac{du}{dx} = 2'}</M> instead of dividing. The base still doubles, but now every
        height doubles too, so the area is <M>2 \times 2 = 4</M> times too big{done ? <> (<M>{`\\approx ${num(area)}`}</M>)</> : ''}.
        Since <M>u</M> moves 8 units while <M>x</M> moves only 4, each <M>dx</M> is half a <M>du</M>:{' '}
        <M>{'dx = \\tfrac12\\,du'}</M>.
      </Notice>
    )
  } else if (s < 0.02) {
    notice = (
      <Notice>
        The shaded area is <M>{'\\int_1^5 (2x-1)\\sqrt{2x+1}\\,dx \\approx 56.29'}</M>. Press Play (or drag the slider) to
        rename every <M>x</M> as <M>u = 2x + 1</M> and watch what that does to the picture.
      </Notice>
    )
  } else if (!done) {
    notice = (
      <Notice>
        Each <M>x</M> is sliding to <M>2x + 1</M>, so the base <M>[1, 5]</M> stretches towards <M>[3, 11]</M>, twice as
        wide. To keep the same area, every height shrinks by the same factor. Watch the violet strip: wider, shorter,
        same area.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Done: the base is now <M>[3, 11]</M> (the new terminals) and every height is halved, so the new curve is{' '}
        <M>{'\\tfrac12(u-2)\\sqrt u = \\tfrac12\\left(u^{3/2} - 2u^{1/2}\\right)'}</M>, option E, with the same area. That
        halving is the <M>{'\\tfrac12'}</M> in <M>{'dx = \\tfrac12\\,du'}</M>. Now try the toggle for option D.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={X} y={wrongD ? YD : Y} xStep={1} yStep={wrongD ? 16 : 8} height={320} xLabels={v => (v < 0.5 || v > 12.5 ? '' : String(v))} xLabel={done ? 'u' : s < 0.02 ? 'x' : ''}>
        {s > 0.02 && <Plot.OfX y={f} domain={[1, 5]} color={C.guide} style="dashed" weight={1.5} />}
        <Region top={top} bottom={() => 0} from={a} to={b} color={color} opacity={0.22} />
        <Region top={top} bottom={() => 0} from={sa} to={sb} color={C.violet} opacity={0.55} />
        <Plot.OfX y={top} domain={[a, b]} color={color} weight={3} />
        <Line.Segment point1={[a, 0]} point2={[a, top(a)]} color={color} style="dashed" weight={1.5} />
        <Line.Segment point1={[b, 0]} point2={[b, top(b)]} color={color} style="dashed" weight={1.5} />
      </Plane>
      <Controls>
        <Slider
          label="\text{from } x \text{ to } u"
          value={s}
          onChange={v => {
            player.stop()
            setS(v)
          }}
          min={0}
          max={1}
          step={0.01}
          format={v => `${Math.round(v * 100)}%`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Change x to u" />
          <Toggle label="Option D: multiply by 2" checked={wrongD} onChange={setWrongD} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{base } [${+a.toFixed(2)}, ${+b.toFixed(2)}],\\ \\text{width} \\times ${num(w)}`} />
          <Readout color={color} tex={`\\text{heights} \\times ${wrongD ? num(hf) : num(hf, 3)}`} />
          <Readout color={C.violet} tex={`\\text{strip width } 0.5 \\to ${num(sb - sa)}`} />
          <Readout color={wrongD ? C.bad : C.good} tex={`\\text{area} \\approx ${num(area)}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Dashed grey: the original curve in x.</p>
        {notice}
      </Controls>
    </div>
  )
}
