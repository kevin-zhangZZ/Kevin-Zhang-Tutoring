// 2021 Specialist Exam 1 Q7b — the particle's displacement x = e^(1 − cos t) is periodic, so its
// maximum e² is reached again and again. Slide t across [0, 6π]: x peaks exactly where the dashed
// cos t curve bottoms out at −1 (t = π, 3π, 5π, …) and drops back to its initial 1 cm wherever
// cos t = 1. The peaks found so far are collected in a readout. A toggle shows the common
// incomplete answer "t = π" and marks the later peaks it misses.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  usePlayer,
} from './kit'

const PI = Math.PI
const T_MAX = 6 * PI
/** The plane runs a little past 6π so the axis name t clears the last tick number. */
const X_END = T_MAX + 0.9
const E2 = Math.exp(2)
const x = (t: number) => Math.exp(1 - Math.cos(t))
const PEAKS = [PI, 3 * PI, 5 * PI]
const PEAK_TEX = ['\\pi', '3\\pi', '5\\pi']
/** Within this of a multiple of π counts as "on" it (the slider lands exactly on multiples; one step is π/60 ≈ 0.052). */
const NEAR = 0.02

/** Tick numbers at multiples of π. */
function piTick(v: number): string {
  const n = Math.round(v / PI)
  if (Math.abs(v - n * PI) > 1e-6) return ''
  return n === 1 ? 'π' : `${n}π`
}

/** The slider's value, written as a multiple of π when it sits on one. */
function tFormat(v: number): string {
  const n = Math.round(v / PI)
  if (Math.abs(v - n * PI) < 1e-6) return n === 0 ? '0' : n === 1 ? 'π' : `${n}π`
  return v.toFixed(2)
}

export default function RepeatingMax() {
  const [t, setT] = useState(PI)
  const [onlyFirst, setOnlyFirst] = useState(false)
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 9 })

  const xt = x(t)
  const cos = Math.abs(Math.cos(t)) < 5e-4 ? 0 : Math.cos(t)
  const n = Math.round(t / PI)
  const onMultiple = Math.abs(t - n * PI) < NEAR
  const atPeak = onMultiple && n % 2 === 1
  const atTrough = onMultiple && n % 2 === 0
  const found = PEAKS.map((p, i) => ({ p, tex: PEAK_TEX[i] })).filter(({ p }) => t >= p - NEAR)
  const pointColor = atPeak ? C.good : C.f

  let notice
  if (onlyFirst) {
    notice = (
      <Notice tone="warn">
        <b>Stopping at <M>t = \pi</M> answers &ldquo;when is the maximum first reached&rdquo;</b>, not &ldquo;the
        times&rdquo;. Because <M>\cos(t)</M> has period <M>2\pi</M>, <M>{'x(t + 2\\pi) = x(t)'}</M>, so the red peaks
        at <M>3\pi</M>, <M>5\pi</M>, … reach <M>e^2</M> too. Solve <M>\cos(t) = -1</M> for <em>every</em>{' '}
        <M>t \ge 0</M>: <M>{'t = (2k+1)\\pi,\\ k \\in \\{0, 1, 2, \\ldots\\}'}</M>.
      </Notice>
    )
  } else if (atPeak) {
    notice = (
      <Notice tone="good">
        <b>Here <M>\cos(t) = -1</M></b>, so the exponent <M>1 - \cos(t)</M> hits its largest value <M>2</M> and{' '}
        <M>{'x = e^2'}</M>. This is maximum number <M>{`${(n + 1) / 2}`}</M>
        {n < 5 ? <>, and it is not the last: keep sliding (or press play) and count how many more there are.</> : <>. The pattern never stops, so the answer must be a general rule in <M>k</M>.</>}
      </Notice>
    )
  } else if (atTrough) {
    notice = (
      <Notice>
        <b>Here <M>\cos(t) = 1</M></b>, so <M>x = e^0 = 1</M>: the particle is back at its starting displacement.{' '}
        <M>{'\\tfrac{dx}{dt} = x\\sin(t)'}</M> is zero here too, but this is the <em>minimum</em>. From here the motion
        repeats exactly, so another peak of <M>e^2</M> is coming.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>x</M> rises while the dashed <M>\cos(t)</M> falls, and falls while it rises: the two move in opposite
        directions because of the minus sign in <M>1 - \cos(t)</M>. Slide to where the dashed curve bottoms out at{' '}
        <M>-1</M> and read <M>x</M> there.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, X_END]}
        y={[-1.8, 8.4]}
        xStep={PI}
        yStep={1}
        height={320}
        xLabel="t"
        yLabel="x"
        xLabels={piTick}
        yLabels={v => (v > 8.5 || v < -1.5 ? '' : `${Math.round(v)}`.replace('-', '−'))}
      >
        <Line.Segment point1={[0, E2]} point2={[X_END, E2]} color={C.good} style="dashed" weight={1.5} />
        <Label at={[2 * PI, E2]} attach="n" color={C.good}>x = e²</Label>
        <Plot.OfX y={Math.cos} domain={[0, X_END]} color={C.g} weight={2} style="dashed" />
        <Label at={[3 * PI, -1]} attach="s" color={C.g}>cos t</Label>
        <Plot.OfX y={x} domain={[0, X_END]} color={C.f} weight={3} />
        {(onlyFirst ? PEAKS : found.map(f => f.p)).map((p, i) => {
          const missed = onlyFirst && i > 0
          const col = missed ? C.bad : C.good
          return (
            <g key={p}>
              <Line.Segment point1={[p, 0]} point2={[p, E2]} color={col} style="dashed" weight={1.5} />
              <Point x={p} y={E2} color={col} />
              {missed && (
                <Label at={[p, E2]} attach="n" color={C.bad}>
                  missed
                </Label>
              )}
            </g>
          )
        })}
        <Line.Segment point1={[t, 0]} point2={[t, xt]} color={C.guide} weight={1} />
        <Point x={t} y={Math.cos(t)} color={C.g} />
        <Point x={t} y={xt} color={pointColor} />
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
          step={PI / 60}
          format={tFormat}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Run t from 0 to 6π" />
          <Toggle label="Only give t = π?" checked={onlyFirst} onChange={setOnlyFirst} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\cos(t) = ${cos.toFixed(3)}`} />
          <Readout tex={`1 - \\cos(t) = ${(1 - cos).toFixed(3)}`} />
          <Readout color={pointColor} tex={`x = e^{1-\\cos(t)} = ${xt.toFixed(3)}${atPeak ? ' = e^2' : ''}`} />
          {!onlyFirst && (
            <Readout
              color={C.good}
              tex={found.length ? `x = e^2 \\text{ at } t = ${found.map(f => f.tex).join(',\\ ')}${t > T_MAX - NEAR ? ',\\ \\ldots' : ''}` : '\\text{no maximum reached yet}'}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
