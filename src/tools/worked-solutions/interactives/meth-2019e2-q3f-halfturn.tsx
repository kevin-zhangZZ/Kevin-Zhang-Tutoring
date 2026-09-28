// 2019 Methods Exam 2 Q3f — why the area over one period [0, 12] is TWICE part d.'s 15/π, and what
// the rectangle y = k means. An orange copy of the part d. region is reflected in the line t = 6 and
// then flipped over the t-axis (together a half-turn about (6, 0), which is what f(12 − t) = −f(t)
// says); it lands exactly on f's region over [6, 12]. A toggle then draws the rectangle of width 12
// with the same area, 12k = 30/π, k = 5/(2π), and a second toggle shows the report's common slip of
// not doubling (k = 5/(4π)), whose rectangle holds only half a period's area.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle, usePlayer } from './kit'

const f = (t: number) => Math.sin((Math.PI * t) / 3) + Math.sin((Math.PI * t) / 6)
const HALF = 15 / Math.PI
const K = 5 / (2 * Math.PI)
const K_WRONG = 5 / (4 * Math.PI)

function image(t: number, s: number): [number, number] {
  if (s <= 0.5) return [6 + (t - 6) * (1 - 4 * s), f(t)]
  return [12 - t, f(t) * (1 - 4 * (s - 0.5))]
}

function piece(a: number, b: number, s: number): [number, number][] {
  const pts: [number, number][] = []
  const n = 60
  for (let i = 0; i <= n; i++) pts.push(image(a + ((b - a) * i) / n, s))
  return pts
}

export default function HalfTurnWidget() {
  const [s, setS] = useState(0.5)
  const [rect, setRect] = useState(false)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setS, { min: 0, max: 1, seconds: 4 })

  const k = wrong ? K_WRONG : K
  const landed = s > 0.995

  let notice
  if (rect && wrong) {
    notice = (
      <Notice tone="warn">
        Using only part d.&apos;s area gives <M>{'12k=\\tfrac{15}{\\pi}'}</M>, <M>{'k=\\tfrac{5}{4\\pi}\\approx0.40'}</M>, a slip
        the report says many students made. This rectangle holds only <b>half</b> a period&apos;s area: part d. measured{' '}
        <M>[0, 6]</M>, but the rectangle runs all the way to <M>12</M>.
      </Notice>
    )
  } else if (rect) {
    notice = (
      <Notice tone="good">
        The rectangle is <M>12</M> wide, so it holds the whole period&apos;s area when{' '}
        <M>{'12k=\\tfrac{30}{\\pi}'}</M>, giving <M>{'k=\\tfrac{5}{2\\pi}\\approx0.80'}</M>. Think of <M>k</M> as the
        shaded area melted down into a flat slab: it is the average height of <M>|f|</M> over one period. Try
        &ldquo;Forget to double&rdquo;.
      </Notice>
    )
  } else if (landed) {
    notice = (
      <Notice tone="good">
        <b>It fits exactly.</b> The half-turn carried the part d. region onto the region over <M>[6, 12]</M>, so the
        two halves of the period trap the same area: <M>{'2\\times\\tfrac{15}{\\pi}=\\tfrac{30}{\\pi}'}</M>. Now turn on
        the rectangle.
      </Notice>
    )
  } else if (s > 0.5) {
    notice = (
      <Notice>
        Stage 2: flip the copy over the <M>t</M>-axis. Reflecting in <M>t = 6</M> and then in the axis is a half-turn
        about <M>(6, 0)</M>, which is exactly what <M>{'f(12-t)=-f(t)'}</M> says. Keep going to the end.
      </Notice>
    )
  } else if (Math.abs(s - 0.5) < 0.005) {
    notice = (
      <Notice>
        Stage 1 done: the copy has been reflected in the line <M>t = 6</M>. It is <M>f</M>&apos;s second half{' '}
        <em>upside down</em>: its hump is where <M>f</M> has a deep trough, its dip where <M>f</M> has a small bump. Drag{' '}
        <M>s</M> on to flip it over the axis.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The orange copy is the part d. region, area <M>{'\\tfrac{15}{\\pi}'}</M>. Stage 1 reflects it in the dashed
        line <M>t = 6</M>; press play or drag <M>s</M> to watch.
      </Notice>
    )
  }

  const copyHump = piece(0, 4, s)
  const copyDip = piece(4, 6, s)

  return (
    <div>
      <Plane x={[0, 12.5]} y={[-2.2, 2.2]} xStep={2} yStep={1} height={280} xLabel="t">
        <Region top={t => Math.max(f(t), 0)} bottom={t => Math.min(f(t), 0)} from={0} to={6} color={C.f} opacity={0.25} />
        {rect && (
          <Polygon
            points={[[0, 0], [12, 0], [12, k], [0, k]]}
            color={wrong ? C.bad : C.violet}
            fillOpacity={0.22}
            weight={2}
          />
        )}
        <Line.Segment point1={[6, -2.2]} point2={[6, 2.2]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[0, 12.5]} color={C.f} weight={3} />
        <Polygon points={copyHump} color={C.g} fillOpacity={0.35} weight={2} />
        <Polygon points={copyDip} color={C.g} fillOpacity={0.35} weight={2} />
        <Label at={[2, 0.55]} color={C.f} attach="c">15/π</Label>
        {landed && <Label at={[10, -0.6]} color={C.g} attach="c">15/π</Label>}
        {rect && <Label at={[6, k]} color={wrong ? C.bad : C.violet} attach="n">{`y = k ≈ ${k.toFixed(2)}`}</Label>}
      </Plane>
      <Controls>
        <Slider
          label="s"
          value={s}
          onChange={v => {
            player.stop()
            setS(v)
          }}
          min={0}
          max={1}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Half-turn about (6, 0)" />
          <Toggle label="Show the rectangle" checked={rect} onChange={setRect} />
          {rect && <Toggle label="Forget to double" checked={wrong} onChange={setWrong} />}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{area on }[0,6] = \\tfrac{15}{\\pi} \\approx ${HALF.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\text{one period} = \\tfrac{30}{\\pi} \\approx ${(2 * HALF).toFixed(3)}`} />
          {rect && <Readout color={wrong ? C.bad : C.violet} tex={`12k \\approx ${(12 * k).toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
