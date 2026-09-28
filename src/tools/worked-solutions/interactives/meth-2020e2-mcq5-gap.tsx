// 2020 Methods Exam 2 MCQ 5 — why the asymptotes of f(x) = (3x + 2)/(5 − x) are x = 5 and y = −3.
// Written as a proper fraction, f(x) = −3 + 17/(5 − x) (checked with sympy's apart), so the curve is
// the line y = −3 plus a gap of 17/(5 − x). The violet segment is that gap at the slider's x, with the
// top 3x + 2 and the bottom 5 − x read out beside it. Near x = 5 the bottom is tiny, so the gap blows
// up: the vertical asymptote. Far away (zoom out to ±400) the gap shrinks towards 0 and the curve
// hugs y = −3; the top and bottom have opposite signs out there (3x against −x), which is why it is
// −3 and not the y = 3 of option D, drawn in red. All values computed from the question's rule.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, num } from './kit'

const f = (x: number) => (3 * x + 2) / (5 - x)
const gap = (x: number) => 17 / (5 - x)

// Tick numbers every 4 (every 200 zoomed out), skipping −4, where the curve runs just under the axis.
const NEAR = { x: [-12, 20] as [number, number], y: [-12, 8] as [number, number], xStep: 2, every: 4, skip: -4 }
const FAR = { x: [-400, 400] as [number, number], y: [-12, 8] as [number, number], xStep: 100, every: 200, skip: NaN }

export default function GapWidget() {
  const [x, setX] = useState(12)
  const [far, setFar] = useState(false)
  const view = far ? FAR : NEAR
  const undefinedHere = Math.abs(x - 5) < 0.01
  const fx = f(x)
  const top = 3 * x + 2
  const bottom = 5 - x
  const inView = !undefinedHere && fx >= view.y[0] && fx <= view.y[1]
  const big = (v: number) => (Math.abs(v) >= 100 ? num(v, 0) : num(v, 2))

  let notice
  if (undefinedHere) {
    notice = (
      <Notice tone="warn">
        At <M>x = 5</M> the bottom <M>5 - x</M> is 0 while the top is 17, and <M>{'\\tfrac{17}{0}'}</M> is undefined: 5 is not in
        the domain. Move <M>x</M> a little either side and watch the curve race off the top or bottom of the picture. That
        is the vertical asymptote <M>x = 5</M>.
      </Notice>
    )
  } else if (Math.abs(x - 5) < 1.5) {
    notice = (
      <Notice>
        Just {x > 5 ? 'right' : 'left'} of 5 the bottom <M>5 - x</M> is a small <b>{x > 5 ? 'negative' : 'positive'}</b> number
        and the top is about 17. Dividing 17 by something tiny gives something huge, so the curve{' '}
        {x > 5 ? 'plunges down' : 'shoots up'} beside the line <M>x = 5</M>, and the gap to <M>y = -3</M> grows without
        limit as <M>x</M> gets closer to 5. A zero on the <b>bottom</b> (with a non-zero top) is what makes a vertical
        asymptote.
      </Notice>
    )
  } else if (Math.abs(x + 2 / 3) < 0.1) {
    notice = (
      <Notice>
        At <M>{'x = -\\tfrac23'}</M> the <b>top</b> <M>3x + 2</M> is zero, so <M>f(x) = 0</M>: the curve crosses the{' '}
        <M>x</M>-axis here. A zero on the top gives an <M>x</M>-intercept, not an asymptote.
      </Notice>
    )
  } else if (Math.abs(x - 5) >= 60) {
    notice = (
      <Notice tone="good">
        <b>Far from the origin, the +2 and the 5 hardly matter:</b> <M>3x + 2 \approx 3x</M> and <M>5 - x \approx -x</M>, so{' '}
        <M>{'f(x) \\approx \\tfrac{3x}{-x} = -3'}</M>. Look at the readouts: top and bottom have <b>opposite signs</b>, so the
        ratio is negative. The gap <M>{'\\tfrac{17}{5-x}'}</M> is now tiny and the curve hugs <M>y = -3</M>, nowhere near the
        red line <M>y = 3</M> (option D), which is what dividing 3 by 1 and forgetting the minus sign in <M>-x</M> gives.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The violet gap between the curve and the line <M>y = -3</M> is always <M>{'\\tfrac{17}{5-x}'}</M>, because{' '}
        <M>{'f(x) = -3 + \\tfrac{17}{5-x}'}</M>. {x > 5 ? 'Right of 5 the gap is negative: the curve is below the line.' : 'Left of 5 the gap is positive: the curve is above the line.'}{' '}
        {far ? (
          <>
            Slide <M>x</M> out towards <M>\pm 400</M>.
          </>
        ) : (
          <>
            Now zoom out and slide <M>x</M> far away: the gap shrinks towards 0, and that is what makes <M>y = -3</M> an
            asymptote.
          </>
        )}
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={view.x}
        y={view.y}
        xStep={view.xStep}
        yStep={2}
        height={300}
        xLabels={v => (Math.abs(v % view.every) < 1e-9 && v !== view.skip ? String(v).replace('-', '−') : '')}
        // Zoomed out, the curve's lower branch runs down the y-axis over the negative tick numbers.
        yLabels={v => (Math.abs(v % 4) < 1e-9 && !(far && v < 0) ? String(v).replace('-', '−') : '')}
      >
        <Line.Segment point1={[view.x[0], 3]} point2={[view.x[1], 3]} color={C.bad} style="dashed" weight={2} />
        <Label at={[view.x[1], 3]} color={C.bad} attach="nw" size={12}>y = 3 (option D)</Label>
        <Line.Segment point1={[5, view.y[0]]} point2={[5, view.y[1]]} color={C.f} style="dashed" weight={2} />
        <Line.Segment point1={[view.x[0], -3]} point2={[view.x[1], -3]} color={C.f} style="dashed" weight={2} />
        {/* Zoomed out, x = 5 is next to the y-axis: drop the label between its 4 and 8 tick numbers. */}
        <Label at={[5, far ? 6 : view.y[1]]} color={C.f} attach="e" size={12}>x = 5</Label>
        <Label at={[view.x[0], -3]} color={C.f} attach="se" size={12}>y = −3</Label>
        <Plot.OfX y={f} domain={[view.x[0], 4.5]} color={C.f} weight={3} minSamplingDepth={10} />
        <Plot.OfX y={f} domain={[5.5, view.x[1]]} color={C.f} weight={3} minSamplingDepth={10} />
        {!undefinedHere && (
          <Line.Segment point1={[x, -3]} point2={[x, clamp(fx, view.y[0] - 5, view.y[1] + 5)]} color={C.violet} weight={4} />
        )}
        {!undefinedHere && <Point x={x} y={-3} color={C.violet} />}
        {inView && <Point x={x} y={fx} color={C.f} />}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x}
          min={view.x[0]}
          max={view.x[1]}
          step={far ? 1 : 0.05}
          format={v => (far ? num(v, 0) : num(v, 2))}
          onChange={setX}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Toggle
            label={far ? 'Zoomed out: x from −400 to 400' : 'Zoom out'}
            checked={far}
            onChange={v => {
              setFar(v)
              setX(xx => (v ? (Math.abs(xx - 5) < 60 ? 300 : xx) : clamp(xx, NEAR.x[0], NEAR.x[1])))
            }}
          />
        </div>
        {/* Not clickable: KaTeX's fraction struts reach up over the buttons above and would
            otherwise swallow taps on them. */}
        <div className="pointer-events-none">
          <Readouts>
            <Readout tex={`\\text{top: } 3x+2 = ${big(top)}`} />
            <Readout tex={`\\text{bottom: } 5-x = ${big(bottom)}`} />
            <Readout color={C.f} tex={undefinedHere ? 'f(5) \\text{ undefined}' : `f(x) \\approx ${num(fx, 3)}`} />
            <Readout color={C.violet} tex={undefinedHere ? '\\text{gap undefined}' : `\\text{gap} = \\tfrac{17}{5-x} \\approx ${num(gap(x), 3)}`} />
          </Readouts>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
