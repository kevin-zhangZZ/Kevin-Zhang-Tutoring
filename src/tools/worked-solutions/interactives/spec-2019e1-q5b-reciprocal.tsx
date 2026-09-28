// 2019 Specialist Exam 1 Q5b — sketching y = 1/f(x) point by point, for
// f(x) = cos²x + cos x + 1. Slide x across [0, 2π]: the blue point is at height f(x), the orange
// one at 1/f(x), and the orange graph is traced out as you go. Big heights become small (3 → 1/3),
// f's lowest points become the new highest (3/4 → 4/3), and height 1 stays put — so the curves
// cross where f = 1 (π/2, π, 3π/2) and (π, 1) is still a turning point, now a minimum. The grid
// matches VCAA's (five lines per unit) so the heights 1/3 and 4/3 can be placed on it. A toggle
// shows the wrong idea "reflect f in y = 1" (y = 2 − f(x)) failing: right crossings, wrong heights,
// and negative at the ends.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  num, usePlayer,
} from './kit'

const PI = Math.PI
const f = (x: number) => Math.cos(x) ** 2 + Math.cos(x) + 1
const g = (x: number) => 1 / f(x)
const TOL = 0.035

/** x-axis tick labels at multiples of π/2 only (gridlines every π/4, as on VCAA's axes). */
const piTick = (v: number) => {
  const k = Math.round(v / (PI / 2))
  if (Math.abs(v - (k * PI) / 2) > 1e-6) return ''
  return ['', 'π/2', 'π', '3π/2', '2π'][k] ?? ''
}
/** y-axis tick labels at whole numbers only (gridlines every 0.2, as on VCAA's axes); 3 and −1
 *  are left off because the endpoint dots sit on top of them, and 1 because the labelled y = 1
 *  line runs through it. */
const intTick = (v: number) => {
  const r = Math.round(v)
  return Math.abs(v - r) < 1e-6 && r !== 3 && r !== -1 && r !== 1 ? String(r) : ''
}

const NAMES: [number, string][] = [
  [0, '0'], [PI / 6, 'π/6'], [PI / 3, 'π/3'], [PI / 2, 'π/2'], [(2 * PI) / 3, '2π/3'], [(5 * PI) / 6, '5π/6'],
  [PI, 'π'], [(7 * PI) / 6, '7π/6'], [(4 * PI) / 3, '4π/3'], [(3 * PI) / 2, '3π/2'], [(5 * PI) / 3, '5π/3'],
  [(11 * PI) / 6, '11π/6'], [2 * PI, '2π'],
]
const angle = (v: number) => NAMES.find(([a]) => Math.abs(a - v) < 1e-6)?.[1] ?? `${(v / PI).toFixed(2)}π`

// Exact heights at the points worth stopping at: [x, f(x), 1/f(x)].
const EXACT: [number, string, string][] = [
  [0, '3', '\\tfrac13'],
  [PI / 2, '1', '1'],
  [(2 * PI) / 3, '\\tfrac34', '\\tfrac43'],
  [PI, '1', '1'],
  [(4 * PI) / 3, '\\tfrac34', '\\tfrac43'],
  [(3 * PI) / 2, '1', '1'],
  [2 * PI, '3', '\\tfrac13'],
]

// Features of the answer, labelled once the trace has reached them.
const FEATURES: { x: number; text: string; attach: 'n' | 's' | 'se' | 'sw'; gap: number }[] = [
  { x: 0, text: '(0, 1/3)', attach: 'se', gap: 8 },
  { x: (2 * PI) / 3, text: '(2π/3, 4/3)', attach: 'n', gap: 10 },
  { x: PI, text: '(π, 1)', attach: 's', gap: 20 },
  { x: (4 * PI) / 3, text: '(4π/3, 4/3)', attach: 'n', gap: 10 },
  { x: 2 * PI, text: '(2π, 1/3)', attach: 'sw', gap: 8 },
]

export default function Reciprocal() {
  const [x0, setX0] = useState((2 * PI) / 3)
  const [reflect, setReflect] = useState(false)
  const player = usePlayer(setX0, { min: 0, max: 2 * PI, seconds: 9 })

  const fx = f(x0)
  const gx = 1 / fx
  const near = (a: number) => Math.abs(x0 - a) < TOL
  const exact = EXACT.find(([a]) => Math.abs(x0 - a) < 1e-6)
  const traced = Math.min(x0 + (x0 > 2 * PI - TOL ? TOL : 0), 2 * PI)
  const falling = Math.sin(x0) * (2 * Math.cos(x0) + 1) > 0 // f' < 0

  let notice
  if (reflect) {
    notice = (
      <Notice tone="warn">
        The red dashed curve is <M>{'y = 2 - f(x)'}</M>, <M>f</M> flipped over <M>{'y = 1'}</M>. It crosses in the right
        places and swaps the maximums and minimums, so it <em>looks</em> plausible — but its heights are wrong:{' '}
        <M>{'2 - \\tfrac34 = \\tfrac54'}</M>, not <M>{'\\tfrac43'}</M>, and at the ends <M>{'2 - 3 = -1'}</M>. A reciprocal
        of a positive number is never negative. Reciprocal means <b>divide</b>: <M>{'3 \\to \\tfrac13'}</M>, not{' '}
        <M>{'3 \\to -1'}</M>.
      </Notice>
    )
  } else if (near(0) || near(2 * PI)) {
    notice = (
      <Notice>
        {near(0) ? 'At the left end' : 'Back at the right end'}, <M>f = 3</M>, so <M>{'\\tfrac1f = \\tfrac13'}</M>: a big
        height becomes a small one. The grid has five lines per unit (each <M>0.2</M>), so{' '}
        <M>{'\\tfrac13 \\approx 0.33'}</M> sits two-thirds of the way from <M>0.2</M> to <M>0.4</M> — the report says this
        height was often misplaced. The domain includes the ends (<M>{'0 \\le x \\le 2\\pi'}</M>), so they are filled
        dots.{near(0) ? ' Press play to trace the whole graph.' : ''}
      </Notice>
    )
  } else if (near(PI / 2) || near((3 * PI) / 2)) {
    notice = (
      <Notice tone="good">
        <M>f = 1</M> here, and <M>{'\\tfrac11 = 1'}</M>, so the two curves <b>cross</b>. They can only meet where{' '}
        <M>{'f = \\tfrac1f'}</M>, i.e. <M>{'f^2 = 1'}</M>, and since <M>{'f > 0'}</M> that means <M>f = 1</M>: at{' '}
        <M>{'x = \\tfrac{\\pi}{2}'}</M>, <M>\pi</M> and <M>{'\\tfrac{3\\pi}{2}'}</M>. A correct sketch passes through all
        three.
      </Notice>
    )
  } else if (near((2 * PI) / 3) || near((4 * PI) / 3)) {
    notice = (
      <Notice tone="good">
        <M>f</M> is at its <b>lowest</b>, <M>{'\\tfrac34'}</M>, so <M>{'\\tfrac1f'}</M> is at its <b>highest</b>,{' '}
        <M>{'\\tfrac43 \\approx 1.33'}</M> — two-thirds of the way from <M>1.2</M> to <M>1.4</M> on this grid. Dividing{' '}
        <M>1</M> by a smaller positive number gives a bigger answer, so a minimum of <M>f</M> becomes a maximum of{' '}
        <M>{'\\tfrac1f'}</M>, at the same <M>x</M>.
      </Notice>
    )
  } else if (near(PI)) {
    notice = (
      <Notice tone="good">
        <M>{'f(\\pi) = 1'}</M>, so this point doesn&apos;t move — but it is <b>still a turning point</b>. Either side,{' '}
        <M>f</M> is a little <em>less</em> than <M>1</M>, so <M>{'\\tfrac1f'}</M> is a little <em>more</em> than{' '}
        <M>1</M>: the small maximum of <M>f</M> becomes a small minimum of <M>{'\\tfrac1f'}</M> at <M>{'(\\pi, 1)'}</M>.
        The report lists forgetting to label it as a common error.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>{'f(x)'}</M> {falling ? 'falls' : 'rises'}, <M>{'\\tfrac{1}{f(x)}'}</M> {falling ? 'rises' : 'falls'}: for
        positive numbers, the bigger the number, the smaller its reciprocal. <M>f</M> never gets near <M>0</M> (its lowest
        value is <M>{'\\tfrac34'}</M>), so <M>{'\\tfrac1f'}</M> never shoots off to an asymptote — it is one smooth wave
        between <M>{'\\tfrac13'}</M> and <M>{'\\tfrac43'}</M>. Turn on the toggle to test the &ldquo;flip it over{' '}
        <M>{'y = 1'}</M>&rdquo; idea.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.3, 2 * PI + 0.3]} y={[-1.1, 3.2]} xStep={PI / 4} yStep={0.2} height={360} xLabels={piTick} yLabels={intTick}>
        <Line.Segment point1={[-0.3, 1]} point2={[2 * PI + 0.3, 1]} color={C.good} style="dashed" weight={1.5} />
        <Label at={[2 * PI - 0.6, 1]} color={C.good} attach="n" gap={5}>y = 1</Label>
        {reflect && <Plot.OfX y={x => 2 - f(x)} domain={[0, 2 * PI]} color={C.bad} style="dashed" weight={2.5} />}
        {reflect && <Point x={0} y={-1} color={C.bad} />}
        {reflect && <Point x={2 * PI} y={-1} color={C.bad} />}
        <Plot.OfX y={f} domain={[0, 2 * PI]} color={C.f} weight={3} />
        <Label at={[0.55, f(0.55)]} color={C.f} attach="e">f</Label>
        <Point x={0} y={3} color={C.f} />
        <Point x={2 * PI} y={3} color={C.f} />
        {traced > 0.01 && <Plot.OfX y={g} domain={[0, traced]} color={C.g} weight={3.5} />}
        <Point x={0} y={1 / 3} color={C.g} />
        {traced >= 2 * PI - 1e-9 && <Point x={2 * PI} y={1 / 3} color={C.g} />}
        {[PI / 2, PI, (3 * PI) / 2].filter(a => traced >= a - TOL).map(a => (
          <Point key={a} x={a} y={1} color={C.good} />
        ))}
        {FEATURES.filter(ft => traced >= ft.x - TOL).map(ft => (
          <Label key={ft.text} at={[ft.x, g(ft.x)]} color={C.g} attach={ft.attach} gap={ft.gap}>{ft.text}</Label>
        ))}
        <Line.Segment point1={[x0, fx]} point2={[x0, gx]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={x0} y={fx} color={C.f} />
        <Point x={x0} y={gx} color={C.g} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={0}
          max={2 * PI}
          step={PI / 120}
          format={angle}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Trace from 0 to 2π" />
          <Toggle label="What if I flip f over y = 1?" checked={reflect} onChange={setReflect} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`f(x) = ${exact ? exact[1] : num(fx)}`} />
          <Readout color={C.g} tex={`\\dfrac{1}{f(x)} = ${exact ? exact[2] : num(gx)}`} />
          {reflect && <Readout color={C.bad} tex={`2 - f(x) = ${num(2 - fx)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
