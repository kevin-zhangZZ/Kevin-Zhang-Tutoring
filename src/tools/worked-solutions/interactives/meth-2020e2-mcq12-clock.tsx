// 2020 Methods Exam 2 MCQ 12 — why the tip of the minute hand follows 15 + 10cos(πt/30). The clock
// (radius 15, resting on the base, drawn to scale) sits beside a graph of h against t that shares
// its height axis, so the tip's height is carried straight across by a dashed line. As t runs
// from 0 to 60 the hand turns θ = πt/30 clockwise FROM THE VERTICAL; the right triangle at the
// centre shows the tip's height above the centre is the side next to θ, 10cos θ — which is why
// it is a cosine, not the unit-circle habit "height = sin". The trace is one cycle starting at
// the maximum 25 (t = 0), through 15, 5, 15, back to 25 at t = 60. Toggles overlay each option's
// rule: A (20%, the most-chosen distractor) is the true curve 15 minutes late — a hand starting
// at 9 o'clock; B one starting at 3 o'clock; D starts right but has period 2π ÷ (π/60) = 120 min.
// All curves computed from the options' own rules (values at t = 0, 15, 30, 45, 60 checked in
// Python: E gives 25, 15, 5, 15, 25). This site's own explanatory figure; VCAA's clock is cropped
// in the stem.

import { useState, type ReactNode } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, Notice, PlayButton, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle,
  num, usePlayer,
} from './kit'

const CX = -22.5 // clock centre, on the same height scale as the graph
const CY = 15
const R = 15
const HAND = 10
const TS = 0.4 // graph x-units per minute: t = 60 sits at x = 24
const T_MAX = 60
const H = (t: number) => 15 + 10 * Math.cos((Math.PI * t) / 30)

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTIONS: Record<Opt, { tex: string; h: (t: number) => number }> = {
  A: { tex: '15 + 10\\sin\\left(\\tfrac{\\pi t}{30}\\right)', h: t => 15 + 10 * Math.sin((Math.PI * t) / 30) },
  B: { tex: '15 - 10\\sin\\left(\\tfrac{\\pi t}{30}\\right)', h: t => 15 - 10 * Math.sin((Math.PI * t) / 30) },
  C: { tex: '15 + 10\\sin\\left(\\tfrac{\\pi t}{60}\\right)', h: t => 15 + 10 * Math.sin((Math.PI * t) / 60) },
  D: { tex: '15 + 10\\cos\\left(\\tfrac{\\pi t}{60}\\right)', h: t => 15 + 10 * Math.cos((Math.PI * t) / 60) },
  E: { tex: '15 + 10\\cos\\left(\\tfrac{\\pi t}{30}\\right)', h: t => H(t) },
}

/** The option notices: what each wrong model would mean for the clock. */
const OPT_NOTICE: Record<Opt, ReactNode> = {
  A: (
    <Notice tone="warn">
      <b>Option A starts on the midline and goes up</b>: at <M>t = 0</M> it gives 15, the height of a tip pointing at 9
      o&apos;clock. Its dashed curve is the true one 15 minutes late (it peaks at <M>t = 15</M>, not <M>t = 0</M>). Height
      = <M>\sin</M> is the unit-circle habit, where the angle is measured from the <i>horizontal</i>. A clock measures from
      12 o&apos;clock, the vertical, so the height above the centre is the side <i>next to</i> <M>\theta</M>:{' '}
      <M>10\cos\theta</M>.
    </Notice>
  ),
  B: (
    <Notice tone="warn">
      <b>Option B starts on the midline and goes down</b>: the path of a tip that starts at 3 o&apos;clock. At{' '}
      <M>t = 0</M> it gives 15, but at noon the tip is at the top, 25. Check <M>t = 0</M> first: it rules out every sine
      here at once.
    </Notice>
  ),
  C: (
    <Notice tone="warn">
      <b>Option C is wrong twice</b>: it starts on the midline (15, not 25) and its period is{' '}
      <M>{'2\\pi \\div \\tfrac{\\pi}{60} = 120'}</M> minutes, so after one hour it has only done half a cycle.
    </Notice>
  ),
  D: (
    <Notice tone="warn">
      <b>Option D starts correctly at 25, but runs at half speed.</b> Its period is <M>{'2\\pi \\div \\tfrac{\\pi}{60} = 120'}</M>{' '}
      minutes, so at <M>t = 60</M> it is at its minimum, 5: a minute hand that takes two hours to go round. The{' '}
      <M>{'\\tfrac{\\pi}{60}'}</M> is what you get from period <M>{'= \\tfrac{\\pi}{n}'}</M>; the period of{' '}
      <M>\cos(nt)</M> is <M>{'\\tfrac{2\\pi}{n}'}</M>.
    </Notice>
  ),
  E: (
    <Notice tone="good">
      <b>Option E sits on the trace the whole way</b>: 25 at <M>t = 0</M> (<M>\cos 0 = 1</M>), 15 at quarter past, 5 at half
      past, back to 25 at <M>t = 60</M>. Its period is <M>{'2\\pi \\div \\tfrac{\\pi}{30} = 60'}</M> minutes, one turn of
      the minute hand.
    </Notice>
  ),
}

export default function ClockTrace() {
  const [t, setT] = useState(10)
  const [opt, setOpt] = useState<Opt | null>(null)
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 9 })

  const theta = (Math.PI * t) / 30
  const tip: [number, number] = [CX + HAND * Math.sin(theta), CY + HAND * Math.cos(theta)]
  const h = tip[1]
  const up = h - CY // 10cos θ, the tip's height above the centre
  const near = (a: number) => Math.abs(t - a) < 0.3

  let notice
  if (opt) {
    notice = OPT_NOTICE[opt]
  } else if (t < 0.3) {
    notice = (
      <Notice>
        <b>At noon the hand points straight up</b>, so the tip is as high as it can be: <M>h = 15 + 10 = 25</M>. The model
        must <i>start at its maximum</i>. <M>\cos 0 = 1</M> is a maximum, while <M>\sin 0 = 0</M> is the midline, so it is a
        cosine. Press play, or drag <M>t</M>.
      </Notice>
    )
  } else if (near(15) || near(45)) {
    notice = (
      <Notice>
        {near(15) ? 'Quarter past' : 'Quarter to'}: the hand is horizontal, the violet side has shrunk to nothing, and the
        tip is level with the centre, <M>h = 15</M>. That&apos;s the midline, because <M>{'\\cos\\tfrac{\\pi}{2} = 0'}</M>{' '}
        (and <M>{'\\cos\\tfrac{3\\pi}{2} = 0'}</M>).
      </Notice>
    )
  } else if (near(30)) {
    notice = (
      <Notice>
        <b>Half past: the hand points straight down</b>, <M>h = 15 - 10 = 5</M>, the minimum, because{' '}
        <M>\cos\pi = -1</M>. Half a turn in 30 minutes. Keep going to <M>t = 60</M>.
      </Notice>
    )
  } else if (t > T_MAX - 0.3) {
    notice = (
      <Notice tone="good">
        <b>Back at the top after 60 minutes</b>, so the period is 60: <M>{'\\tfrac{2\\pi}{n} = 60'}</M> gives{' '}
        <M>{'n = \\tfrac{\\pi}{30}'}</M>. The trace is one full cycle of a cosine that starts at its maximum, with midline 15
        and amplitude 10: <M>{'h(t) = 15 + 10\\cos\\left(\\tfrac{\\pi t}{30}\\right)'}</M>, option E. Now compare the options.
      </Notice>
    )
  } else if (up > 0) {
    notice = (
      <Notice>
        The hand has turned <M>{'\\theta = \\tfrac{\\pi t}{30}'}</M> from the vertical (a full turn, <M>2\pi</M>, takes 60
        minutes). The tip&apos;s height above the centre is the violet side of the triangle, the side <i>next to</i>{' '}
        <M>\theta</M>, so it is <M>10\cos\theta</M>, and <M>h = 15 + 10\cos\theta</M>. Angle measured from the vertical means
        height goes with cos.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the tip is below the centre: the violet side points <i>down</i>, and <M>10\cos\theta</M> is negative (
        <M>\theta</M> is between <M>{'\\tfrac{\\pi}{2}'}</M> and <M>{'\\tfrac{3\\pi}{2}'}</M>). The same rule{' '}
        <M>h = 15 + 10\cos\theta</M> still gives the height, now below 15.
      </Notice>
    )
  }

  const o = opt ? OPTIONS[opt] : null
  const oColor = opt === 'E' ? C.good : C.g

  return (
    <div>
      <Plane x={[-38, 25]} y={[-2, 32]} xStep={6} yStep={5} equalScale height={340} minHeight={120} labels={false} xLabel="t" yLabel="">
        {/* Blank out the grid behind the clock (far enough left to cover the margin a wide screen
            adds), then redraw the base the clock stands on. */}
        <Polygon points={[[-300, -10], [-1.2, -10], [-1.2, 45], [-300, 45]]} color="var(--mafs-bg)" fillOpacity={1} strokeOpacity={0} weight={0} />
        <Line.Segment point1={[-300, 0]} point2={[0, 0]} color={C.ink} weight={1.4} />
        {/* The h-axis name beside the top of the axis (above it, it is clipped on a phone). */}
        <Label at={[0, 32]} attach="e" size={14} italic>
          h
        </Label>
        {/* The clock face, radius 15, resting on the base. */}
        <Circle center={[CX, CY]} radius={R} color={C.ink} fillOpacity={0} weight={2} />
        {Array.from({ length: 12 }, (_, k) => (k * Math.PI) / 6).map((a, k) => (
          <Line.Segment
            key={`m${k}`}
            point1={[CX + 12.4 * Math.sin(a), CY + 12.4 * Math.cos(a)]}
            point2={[CX + 14.2 * Math.sin(a), CY + 14.2 * Math.cos(a)]}
            color={C.ink}
            weight={2.5}
          />
        ))}
        {/* Midline: the centre's height, carried across from the edge of the clock to the h-axis. */}
        <Line.Segment point1={[CX + R, CY]} point2={[0, CY]} color={C.guide} style="dashed" weight={1} />
        {/* The right triangle: vertical side 10cos θ (violet), horizontal side dashed. */}
        {Math.abs(up) > 0.05 && <Line.Segment point1={[CX, CY]} point2={[CX, h]} color={C.violet} weight={3.5} />}
        <Line.Segment point1={[CX, h]} point2={tip} color={C.guide} style="dashed" weight={1.5} />
        {theta > 0.2 && (
          <Plot.Parametric
            domain={[0, theta]}
            xy={s => [CX + 3 * Math.sin(s), CY + 3 * Math.cos(s)]}
            color={C.ink}
            weight={1.5}
          />
        )}
        {/* The tip's height carried across to the graph. */}
        <Line.Segment point1={tip} point2={[TS * t, h]} color={C.f} style="dashed" weight={1.5} />
        {/* The minute hand. */}
        <Line.Segment point1={[CX, CY]} point2={tip} color={C.f} weight={4} />
        <Point x={CX} y={CY} color={C.ink} svgCircleProps={{ r: 4 }} />
        {/* The graph: the option being compared (dashed), then the trace so far. */}
        {o && <Plot.OfX y={x => o.h(x / TS)} domain={[0, TS * T_MAX]} color={oColor} weight={2.5} style="dashed" />}
        {t > 0.05 && <Plot.OfX y={x => H(x / TS)} domain={[0, TS * t]} color={C.f} weight={3} />}
        <Point x={TS * t} y={h} color={C.f} />
        <Point x={tip[0]} y={tip[1]} color={C.f} />
        {/* Labels. */}
        {theta > 0.35 && (
          <Label at={[CX + 4.6 * Math.sin(theta / 2), CY + 4.6 * Math.cos(theta / 2)]} attach="c" size={13} italic>
            θ
          </Label>
        )}
        {Math.abs(up) > 3 && (
          <Label at={[CX, (CY + h) / 2]} attach={Math.sin(theta) < -1e-6 ? 'e' : 'w'} size={12} color={C.violet}>
            10cos θ
          </Label>
        )}
        {[5, 15, 25].map(v => (
          <Label key={`h${v}`} at={[0, v]} attach="w" gap={5} size={11} bold={false}>
            {v}
          </Label>
        ))}
        {[15, 30, 45, 60].map(m => (
          <Label key={`t${m}`} at={[TS * m, 0]} attach="s" gap={5} size={11} bold={false}>
            {m}
          </Label>
        ))}
        {o && opt && (
          <Label at={[TS * T_MAX, o.h(T_MAX)]} attach="e" size={12} color={oColor}>
            {opt}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={T_MAX}
          step={0.5}
          format={v => `${num(v, 1)} min`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play the hour" />
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Compare with option:</span>
          {(Object.keys(OPTIONS) as Opt[]).map(k => (
            <Toggle key={k} label={k} checked={opt === k} onChange={v => setOpt(v ? k : null)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout tex={`\\theta = \\tfrac{\\pi t}{30} \\approx ${num(theta, 2)}`} />
          <Readout color={C.f} tex={`h = 15 + 10\\cos\\theta \\approx ${num(h, 1)}`} />
          {o && <Readout color={oColor} tex={`\\text{${opt}: } ${o.tex} \\approx ${num(o.h(t), 1)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
