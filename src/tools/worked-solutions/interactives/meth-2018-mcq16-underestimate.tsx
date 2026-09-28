// 2018 Methods Exam 2 MCQ 16 — why Jamie's approximation is a fraction LESS than 1 of the exact
// area. y = 2cos(2x) + 3 falls all the way across [0, π/2], so a right-endpoint rectangle takes its
// height from the lowest point of its strip and sits under the curve; the red slivers are the area
// it misses. Starts on Jamie's three rectangles (heights 4, 2, 1 → 7π/6, ratio 7/9). The n slider
// shows the slivers shrinking and the ratio climbing towards 1; the toggle swaps to left endpoints,
// which overshoot (11π/6, ratio 11/9) — so any fraction above 1 cannot come from Jamie's picture.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle } from './kit'

const f = (x: number) => 2 * Math.cos(2 * x) + 3
const END = Math.PI / 2
const EXACT = (3 * Math.PI) / 2

const piTick = (v: number) => {
  const k = Math.round(v / (Math.PI / 6))
  return ['', 'π/6', 'π/3', 'π/2'][k] ?? ''
}
const hText = (h: number) => (Math.abs(h - Math.round(h)) < 1e-9 ? String(Math.round(h)) : h.toFixed(2))

export default function Underestimate() {
  const [n, setN] = useState(3)
  const [left, setLeft] = useState(false)

  const w = END / n
  const rects = Array.from({ length: n }, (_, k) => {
    const a = k * w
    const b = a + w
    return { a, b, h: f(left ? a : b) }
  })
  const approx = w * rects.reduce((sum, r) => sum + r.h, 0)
  const ratio = approx / EXACT
  const jamie = n === 3 && !left

  const approxTex =
    n === 3
      ? left
        ? '\\text{rectangles} = \\tfrac{\\pi}{6}(5+4+2) = \\tfrac{11\\pi}{6} \\approx 5.760'
        : '\\text{rectangles} = \\tfrac{\\pi}{6}(4+2+1) = \\tfrac{7\\pi}{6} \\approx 3.665'
      : `\\text{rectangles} \\approx ${approx.toFixed(3)}`
  const ratioTex =
    n === 3
      ? left
        ? '\\text{fraction} = \\tfrac{11}{9} \\approx 1.222'
        : '\\text{fraction} = \\tfrac{7}{9} \\approx 0.778'
      : `\\text{fraction} \\approx ${ratio.toFixed(3)}`

  let notice
  if (jamie) {
    notice = (
      <Notice tone="good">
        These are <b>Jamie&apos;s rectangles</b>: width <M>{'\\tfrac{\\pi}{6}'}</M>, and each top-right corner sits on the
        curve, so the heights are <M>{'f\\left(\\tfrac{\\pi}{6}\\right)=4'}</M>, <M>2</M> and <M>1</M>. The curve falls the
        whole way, so each right edge is the <b>lowest</b> point of its strip and every rectangle sits under the curve. The
        red slivers are the area Jamie misses, which is why the fraction, <M>{'\\tfrac79'}</M>, is less than <M>1</M>.
        Slide <M>n</M> up and watch the slivers shrink.
      </Notice>
    )
  } else if (!left) {
    notice = (
      <Notice>
        With <M>{`n = ${n}`}</M> right-endpoint rectangles of width <M>{'\\tfrac{\\pi}{2n}'}</M>, every rectangle is still
        under the falling curve, so the fraction stays below <M>1</M>. It creeps up towards <M>1</M> as the red slivers
        thin out. An option bigger than <M>1</M>, like <M>{'\\tfrac73'}</M>, can never be a right-endpoint
        approximation of this curve. Now try the left-endpoint toggle.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Left endpoints</b> take each height from the <b>highest</b> point of the strip, so every rectangle pokes above
        the curve and the red slivers are extra area that isn&apos;t under the curve at all. Now the fraction is bigger than <M>1</M>
        {n === 3 ? <> (<M>{'\\tfrac{11\\pi}{6} \\div \\tfrac{3\\pi}{2} = \\tfrac{11}{9}'}</M>, which isn&apos;t an option)</> : null}.
        In the question, look at which top corner of each rectangle touches the curve: it&apos;s the right one.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1.7]} y={[0, 6]} xStep={Math.PI / 6} yStep={1} height={300} xLabels={piTick}>
        <Region top={f} bottom={() => 0} from={0} to={END} color={C.f} opacity={0.12} />
        {rects.map((r, i) => (
          <Polygon
            key={`r${i}`}
            points={[[r.a, 0], [r.b, 0], [r.b, r.h], [r.a, r.h]]}
            color={C.g}
            fillOpacity={0.3}
            weight={1.5}
          />
        ))}
        {rects.map((r, i) =>
          left ? (
            <Region key={`s${i}`} top={() => r.h} bottom={f} from={r.a} to={r.b} color={C.bad} opacity={0.45} />
          ) : (
            <Region key={`s${i}`} top={f} bottom={() => r.h} from={r.a} to={r.b} color={C.bad} opacity={0.45} />
          ),
        )}
        <Plot.OfX y={f} domain={[0, END]} color={C.f} weight={3} />
        {n <= 4 &&
          rects.map((r, i) => (
            <Label key={`h${i}`} at={[(r.a + r.b) / 2, Math.min(r.h, f((r.a + r.b) / 2))]} attach="s" color={C.g} gap={8}>
              {hText(r.h)}
            </Label>
          ))}
        <Label at={[0.55, 5.4]} color={C.f} attach="e">y = 2cos(2x) + 3</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={12} step={1} format={v => String(Math.round(v))} />
        <Buttons>
          <Toggle label="Use left endpoints instead" checked={left} onChange={setLeft} />
          <ActionButton
            label="Back to Jamie's 3"
            onClick={() => {
              setN(3)
              setLeft(false)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={approxTex} />
          <Readout color={C.f} tex={'\\text{exact} = \\tfrac{3\\pi}{2} \\approx 4.712'} />
          <Readout color={ratio < 1 ? C.good : C.bad} tex={ratioTex} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
