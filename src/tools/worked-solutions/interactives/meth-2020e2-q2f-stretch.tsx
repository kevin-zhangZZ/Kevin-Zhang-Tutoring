// 2020 Methods Exam 2 Q2f — a dilation by factor k from the x-axis multiplies every height by k, so
// the north bank's HIGH points move up the most: at x = 0 and 200 it rises from 60 to 60k, at
// x = 100 only from 20 to 20k. The river's north–south width kf₁(x) − f₂(x) =
// 20(k − 1)cos(πx/100) + 40k − 30 is therefore widest at the two ends, 60k − 50, and that must be
// under 20: k < 7/6. The red dashed curve y = f₂(x) + 20 is the "20 m limit"; at k = 7/6 the new
// bank touches it at exactly x = 0 and x = 200 (width exactly 20, excluded by "strictly"). A toggle
// shows the report's common wrong approach of testing only at P (x = 50): 40k − 30 < 20 gives k < 5/4,
// and for 7/6 < k < 5/4 the width at P is fine while the ends are already too wide.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, num, tick,
} from './kit'

const f1 = (x: number) => 20 * Math.cos((Math.PI * x) / 100) + 40
const f2 = (x: number) => f1(x) - 10
const limit = (x: number) => f2(x) + 20
const K_STAR = 7 / 6
const BARS = [0, 25, 50, 75, 100, 125, 150, 175, 200]

export default function Stretch() {
  const [k, setK] = useState(1.2)
  const [atP, setAtP] = useState(false)
  const g = (x: number) => k * f1(x)
  const gap = (x: number) => g(x) - f2(x)
  const exact = k === K_STAR
  const tooWide = gap(0) >= 20 - 1e-9
  const ends = 60 * k - 50
  const atFifty = 40 * k - 30
  const middle = 20 * k - 10

  let notice
  if (atP) {
    notice = (
      <Notice tone="warn">
        <b>Checking only at P:</b> the width there is <M>{'kf_1(50) - f_2(50) = 40k - 30'}</M>, and{' '}
        <M>{'40k - 30 < 20'}</M> gives <M>{'k < \\tfrac54'}</M>.{' '}
        {k > K_STAR && k < 1.25 ? (
          <>
            Right now <M>{`k = ${num(k, 3)}`}</M> passes that test (width at P <M>{`\\approx ${num(atFifty, 1)}`}</M>) but
            the ends are already <M>{`${num(ends, 1)}`}</M> m wide. &ldquo;For all parts of the river&rdquo; means the{' '}
            <i>widest</i> part must be under 20, and P is not the widest part.
          </>
        ) : (
          <>
            Set <M>k</M> anywhere between <M>{'\\tfrac76 \\approx 1.167'}</M> and <M>1.25</M>: P&apos;s bar stays green
            while the end bars turn red. &ldquo;For all parts of the river&rdquo; means the <i>widest</i> part must be
            under 20, and P is not the widest part.
          </>
        )}
      </Notice>
    )
  } else if (k === 1) {
    notice = (
      <Notice>
        <b><M>k = 1</M>: nothing has moved.</b> The river is 10 m wide (north–south) everywhere, as in part a. Drag{' '}
        <M>k</M> up and watch which bars grow fastest.
      </Notice>
    )
  } else if (exact) {
    notice = (
      <Notice tone="warn">
        <b>At <M>{'k = \\tfrac76'}</M> the new bank just touches the 20 m limit</b>, at exactly <M>x = 0</M> and{' '}
        <M>x = 200</M>: the width there is <M>{'60 \\cdot \\tfrac76 - 50 = 20'}</M>. The question wants the width{' '}
        <i>strictly</i> less than 20, so <M>{'k = \\tfrac76'}</M> itself fails, but anything smaller works.
      </Notice>
    )
  } else if (!tooWide) {
    notice = (
      <Notice tone="good">
        A dilation from the <M>x</M>-axis multiplies every height by <M>k</M>, so high points move further than low
        ones. At <M>x = 0</M> the bank rises from 60 to <M>60k</M> (up <M>{`${num(60 * (k - 1), 1)}`}</M>); at{' '}
        <M>x = 100</M> only from 20 to <M>20k</M> (up <M>{`${num(20 * (k - 1), 1)}`}</M>). So the river widens most at
        the ends, where the widest gap is <M>{`60k - 50 \\approx ${num(ends, 1)} < 20`}</M>. Keep increasing <M>k</M>{' '}
        until the bank meets the red dashed limit.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Too far: near <M>x = 0</M> and <M>x = 200</M> the river is now over 20 m wide (red), because{' '}
        <span className="whitespace-nowrap"><M>{`60k - 50 \\approx ${num(ends, 1)}`}</M>.</span> Yet at P (<M>x = 50</M>) the width is only{' '}
        <M>{`40k - 30 \\approx ${num(atFifty, 1)}`}</M>
        {k < 1.25 ? ', still under 20' : ''}. Turn on the toggle to see why checking only at P goes wrong.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 200]}
        y={[0, 85]}
        xStep={25}
        yStep={10}
        height={320}
        xLabels={v => (Math.abs(v % 50) < 1e-9 ? tick(v) : '')}
        yLabels={v => (Math.abs(v % 20) < 1e-9 && v !== 60 ? tick(v) : '')}
      >
        <Region top={g} bottom={f2} from={0} to={200} color={C.guide} opacity={0.18} />
        {/* The part of the new river more than 20 m north of the south bank. */}
        <Region top={x => Math.max(g(x), limit(x))} bottom={limit} from={0} to={200} color={C.bad} opacity={0.35} />
        <Plot.OfX y={f1} domain={[0, 200]} color={C.f} weight={1.5} opacity={0.4} style="dashed" />
        <Plot.OfX y={limit} domain={[0, 200]} color={C.bad} weight={2} style="dashed" />
        <Plot.OfX y={f2} domain={[0, 200]} color={C.g} weight={2.5} />
        <Plot.OfX y={g} domain={[0, 200]} color={C.f} weight={3} />
        {BARS.map(x => {
          const w = gap(x)
          const bad = w >= 20 - 1e-9
          const highlight = atP && x === 50
          return (
            <Line.Segment
              key={x}
              point1={[x, f2(x)]}
              point2={[x, g(x)]}
              color={bad ? C.bad : C.good}
              weight={highlight ? 5 : x === 0 || x === 200 ? 4 : 2.5}
            />
          )
        })}
        <Label at={[0, (f2(0) + g(0)) / 2]} attach="e" color={tooWide ? C.bad : C.good} size={12} gap={6}>
          {num(ends, 1)}
        </Label>
        <Label at={[50, f2(50) + 0.3 * gap(50)]} attach="e" color={atFifty >= 20 ? C.bad : C.good} size={12} gap={6}>
          {num(atFifty, 1)}
        </Label>
        <Label at={[100, (f2(100) + g(100)) / 2]} attach="e" color={C.good} size={12} gap={6}>
          {num(middle, 1)}
        </Label>
        <Label at={[150, g(150)]} attach="nw" color={C.f} size={12}>y = kf₁(x)</Label>
        <Label at={[150, f2(150)]} attach="se" color={C.g} size={12}>f₂</Label>
        {atP && <Label at={[50, g(50)]} attach="ne" color={C.ink} size={12} gap={6}>P&apos;s bar</Label>}
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        Faint dashed blue: the north bank now (<i>k</i> = 1). Red dashed: 20 m north of the south bank, the
        limit the new bank must stay below. Bars: the width north across the river.
      </p>
      <Controls>
        <Slider
          label="k"
          value={k}
          onChange={v => setK(Math.abs(v - K_STAR) < 0.004 ? K_STAR : v)}
          min={1}
          max={1.35}
          step={0.005}
          format={v => (v === K_STAR ? '7/6' : v.toFixed(3))}
        />
        <Buttons>
          <Toggle label="What if I only check at P (x = 50)?" checked={atP} onChange={setAtP} />
        </Buttons>
        <Readouts>
          <Readout color={tooWide ? C.bad : C.good} tex={`x = 0, 200:\\ 60k - 50 \\approx ${num(ends, 2)}`} />
          <Readout color={atFifty >= 20 ? C.bad : C.good} tex={`x = 50:\\ 40k - 30 \\approx ${num(atFifty, 2)}`} />
          <Readout color={C.good} tex={`x = 100:\\ 20k - 10 \\approx ${num(middle, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
