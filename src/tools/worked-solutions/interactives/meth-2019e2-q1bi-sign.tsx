// 2019 Methods Exam 2 Q1b.i — the "nature" of a stationary point is read from the sign of f′ on
// either side of it. Slide a tangent along f(x) = x²e^(−x²): just left of the origin it tilts
// down, just right of it it tilts up (falling then rising → local minimum), while at x = ±1 it
// goes from rising to falling (local maxima). A sign diagram for f′(x) = 2x(1 − x²)e^(−x²)
// lights up the interval the tangent is in.

import { Fragment, useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, usePlayer } from './kit'

const f = (x: number) => x * x * Math.exp(-x * x)
const fp = (x: number) => 2 * x * (1 - x * x) * Math.exp(-x * x)
const HALF = 0.45 // half-width of the drawn tangent segment
const STATIONARY = [-1, 0, 1]

// Snap onto a stationary point when the slider lands close to one, so the flat tangent is exact.
const snap = (v: number) => STATIONARY.find(s => Math.abs(v - s) < 0.015) ?? v

const INTERVALS = [
  { sign: '+', word: 'rising' },
  { sign: '−', word: 'falling' },
  { sign: '+', word: 'rising' },
  { sign: '−', word: 'falling' },
]

function intervalOf(x: number): number {
  if (x < -1) return 0
  if (x < 0) return 1
  if (x < 1) return 2
  return 3
}

export default function GradientSign() {
  const [x0, setX0Raw] = useState(-0.5)
  const setX0 = (v: number) => setX0Raw(snap(v))
  // the animation moves smoothly (no snapping, or it would stick at each stationary point)
  const player = usePlayer(setX0Raw, { min: -2.5, max: 2.5, seconds: 10 })

  const g = fp(x0)
  const y0 = f(x0)
  const at = STATIONARY.find(s => s === x0)
  const flat = at !== undefined
  const tanColor = flat ? C.good : C.g
  const current = flat ? -1 : intervalOf(x0)
  const gTex = Math.abs(g) < 5e-4 ? '0' : g.toFixed(3)

  let notice
  if (at === 0) {
    notice = (
      <Notice tone="good">
        <b>At the origin the tangent is flat</b>: <M>{"f'(0)=0"}</M>. Just left of it the gradient is negative
        (falling); just right of it, positive (rising). Falling then rising is a <b>local minimum</b>, and that word
        is the &ldquo;nature&rdquo;. It can&apos;t be a stationary point of inflection, because that needs the{' '}
        <em>same</em> sign on both sides.
      </Notice>
    )
  } else if (flat) {
    notice = (
      <Notice tone="good">
        At <M>{`x = ${at}`}</M> the tangent is flat again, but here the sign goes <M>+</M> then <M>-</M>: rising, then
        falling. That makes it a <b>local maximum</b>. Both humps at <M>x = \pm1</M> are maxima; the origin is the
        only minimum.
      </Notice>
    )
  } else if (current === 0) {
    notice = (
      <Notice>
        Here <M>{`f'(x) \\approx ${gTex} > 0`}</M>, so the tangent tilts up and <M>f</M> is rising. Slide right to{' '}
        <M>x = -1</M>, where it levels out.
      </Notice>
    )
  } else if (current === 1) {
    notice = (
      <Notice>
        Here <M>{`f'(x) \\approx ${gTex} < 0`}</M>, so the tangent tilts down and <M>f</M> is falling. Keep sliding
        right to the origin and watch the tangent flatten out, then tip the other way.
      </Notice>
    )
  } else if (current === 2) {
    notice = (
      <Notice>
        Here <M>{`f'(x) \\approx ${gTex} > 0`}</M>, so <M>f</M> is rising. Around the origin the gradient went{' '}
        <M>-</M> then <M>+</M>, which means falling then rising, so the origin is a local minimum. Slide back to{' '}
        <M>x = 0</M> to see the flat tangent.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here <M>{`f'(x) \\approx ${gTex} < 0`}</M>, so <M>f</M> is falling, and it keeps falling towards the{' '}
        <M>x</M>-axis. Past <M>x = 1</M> there are no more stationary points.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-2.5, 2.5]}
        y={[-0.12, 0.5]}
        xStep={1}
        yStep={0.1}
        height={290}
        yLabels={v => (Math.round(v * 10) % 2 === 0 ? v.toFixed(1) : '')}
      >
        <Plot.OfX y={f} domain={[-2.8, 2.8]} color={C.f} weight={3} />
        {STATIONARY.map(s => (
          <Point key={s} x={s} y={f(s)} color={C.guide} />
        ))}
        <Line.Segment
          point1={[x0 - HALF, y0 - HALF * g]}
          point2={[x0 + HALF, y0 + HALF * g]}
          color={tanColor}
          weight={3}
        />
        <Point x={x0} y={y0} color={tanColor} />
        <Label at={[2.1, f(2.1)]} color={C.f} attach="n">f</Label>
      </Plane>

      <div className="mt-3 mb-1">
        <div className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
          Sign of <M>{"f'(x) = 2x(1-x^2)e^{-x^2}"}</M>
        </div>
        <div className="flex items-stretch gap-1 text-center select-none">
          {INTERVALS.map((iv, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <div
                  className={`flex flex-col items-center justify-center px-1 text-[12px] font-semibold rounded-md ${
                    at === STATIONARY[i - 1]
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <span>0</span>
                  <span className="text-[11px] font-normal">x={STATIONARY[i - 1]}</span>
                </div>
              )}
              <div
                className={`flex-1 min-w-0 rounded-md border px-1 py-1 ${
                  current === i
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/40 dark:border-sky-400'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div
                  className={`text-[16px] font-bold leading-tight ${
                    iv.sign === '+' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {iv.sign}
                </div>
                <div className="text-[11px] text-gray-600 dark:text-gray-300">{iv.word}</div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={-2.5}
          max={2.5}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Slide the tangent across" />
        </Buttons>
        <Readouts>
          <Readout color={tanColor} tex={`f'(${x0.toFixed(2)}) \\approx ${gTex}`} />
          <Readout tex={flat ? '\\text{stationary: tangent flat}' : g > 0 ? '\\text{rising}' : '\\text{falling}'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
