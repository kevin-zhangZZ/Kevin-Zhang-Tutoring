// 2015 Methods Exam 2 Q5c(i) — V(t) = d·e^(t/3) + (10−d)·e^(−2t/3) has exactly one dip, at
// t* = ln(2(10−d)/d). Drawn over all t (dashed outside the domain, solid on [0, 5]), a slider on d
// slides the dip left and right. The minimum on [0, 5] is at t = 0 exactly when the dip is at or
// left of t = 0, i.e. d ≥ 20/3 — and d = 20/3 itself counts (t* = 0), while d = 10 is ruled out by
// d ∈ (0, 10). That endpoint-inclusion is where 96% of students lost a mark.
// The same component (exported as Dip) drives the c(ii) widget with a small-d range.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const V = (t: number, d: number) => d * Math.exp(t / 3) + (10 - d) * Math.exp((-2 * t) / 3)
const tStar = (d: number) => Math.log((2 * (10 - d)) / d)

export type DipConfig = {
  /** Which endpoint the part asks about. */
  end: 0 | 5
  /** The boundary value of d, and its TeX. */
  dB: number
  dBTex: string
  /** The boundary value as plain text for the slider readout. */
  dBPlain: string
  start: number
  min: number
  max: number
  step: number
  x: [number, number]
  y: [number, number]
  yStep: number
}

export function Dip({ cfg }: { cfg: DipConfig }) {
  const [d, setD] = useState(cfg.start)
  const ts = tStar(d)
  const atB = Math.abs(d - cfg.dB) < 1e-9
  const tMin = Math.min(5, Math.max(0, ts))
  const onEnd = cfg.end === 0 ? ts <= 1e-9 : ts >= 5 - 1e-9
  const tsOnPlane = ts >= cfg.x[0] && ts <= cfg.x[1]
  const yTop = cfg.y[1]
  const where = ts <= 1e-9 ? 't = 0' : ts >= 5 - 1e-9 ? 't = 5' : `t = t^* \\approx ${ts.toFixed(2)}`
  const fmt = (v: number) => (Math.abs(v - cfg.dB) < 1e-9 ? cfg.dBPlain : v.toFixed(cfg.step < 0.01 ? 3 : 2))

  let notice
  if (atB) {
    notice = (
      <Notice tone="good">
        <b>
          At <M>{`d = ${cfg.dBTex}`}</M> the dip sits exactly on <M>{`t = ${cfg.end}`}</M>
        </b>{' '}
        (<M>{`V'(${cfg.end}) = 0`}</M>), and the minimum on <M>[0, 5]</M> is still at <M>{`t = ${cfg.end}`}</M>. So this boundary value
        belongs in the answer: the inequality is <b>{cfg.end === 0 ? <M>{'\\ge'}</M> : <M>{'\\le'}</M>}</b>, not strict.
      </Notice>
    )
  } else if (onEnd) {
    notice =
      cfg.end === 0 ? (
        <Notice tone="good">
          The dip is <b>left of the domain</b>, so <M>V</M> is increasing on all of <M>[0, 5]</M>: the minimum is at <M>t = 0</M>. This
          holds for every <M>d</M> from <M>{cfg.dBTex}</M> up to (but not including) <M>10</M>, because the question only allows{' '}
          <M>{'d \\in (0, 10)'}</M>.
        </Notice>
      ) : (
        <Notice tone="good">
          The dip is <b>right of the domain</b>, so <M>V</M> is decreasing on all of <M>[0, 5]</M>: the minimum is at <M>t = 5</M>. This
          holds for every <M>d</M> above <M>0</M> (excluded, since <M>{'d \\in (0, 10)'}</M>) up to and including <M>{cfg.dBTex}</M>.
        </Notice>
      )
  } else {
    notice = (
      <Notice tone="warn">
        The dip is <b>inside</b> <M>[0, 5]</M>, so the minimum is the turning point at <M>t^*</M>, not an endpoint. Slide <M>d</M>{' '}
        {cfg.end === 0 ? 'up' : 'down'} until <M>t^*</M> reaches <M>{`t = ${cfg.end}`}</M>: that boundary value of <M>d</M> is the one
        students found, but the answer is the whole set of <M>d</M> beyond it.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={cfg.x} y={cfg.y} yStep={cfg.yStep} xLabel="t" yLabel="V" height={300}>
        <Plot.OfX y={t => V(t, d)} domain={[cfg.x[0], 0]} color={C.f} weight={1.5} style="dashed" />
        <Plot.OfX y={t => V(t, d)} domain={[5, cfg.x[1]]} color={C.f} weight={1.5} style="dashed" />
        <Plot.OfX y={t => V(t, d)} domain={[0, 5]} color={C.f} weight={3.5} />
        <Line.Segment point1={[5, 0]} point2={[5, yTop]} color={C.guide} style="dashed" weight={1.5} />
        {tsOnPlane && (
          <>
            <Line.Segment point1={[ts, 0]} point2={[ts, yTop]} color={C.violet} style="dashed" weight={2} />
            <Label at={[ts, yTop * 0.92]} color={C.violet} attach={ts > (cfg.x[0] + cfg.x[1]) / 2 ? 'w' : 'e'}>
              t*
            </Label>
          </>
        )}
        {!tsOnPlane && (
          <Label at={[ts < cfg.x[0] ? cfg.x[0] : cfg.x[1], yTop * 0.92]} color={C.violet} attach={ts < cfg.x[0] ? 'e' : 'w'}>
            {ts < cfg.x[0] ? `← t* ≈ ${ts.toFixed(1)}` : `t* ≈ ${ts.toFixed(1)} →`}
          </Label>
        )}
        <Point x={tMin} y={V(tMin, d)} color={C.good} />
        <Label at={[tMin, V(tMin, d)]} color={C.good} attach={tMin > 2.5 ? 'sw' : 'se'}>
          min on [0, 5]
        </Label>
      </Plane>
      <Controls>
        <Slider
          label="d"
          value={d}
          onChange={v => setD(Math.abs(v - cfg.dB) < cfg.step * 2.5 ? cfg.dB : v)}
          min={cfg.min}
          max={cfg.max}
          step={cfg.step}
          format={fmt}
        />
        <Readouts>
          <Readout color={C.violet} tex={`t^* = \\log_e\\!\\left(\\tfrac{2(10-d)}{d}\\right) \\approx ${ts.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\text{min on } [0,5] \\text{ at } ${where}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}

export default function DipCI() {
  return (
    <Dip
      cfg={{
        end: 0,
        dB: 20 / 3,
        dBTex: '\\tfrac{20}{3}',
        dBPlain: '20/3',
        start: 5,
        min: 1,
        max: 9.9,
        step: 0.01,
        x: [-4, 6],
        y: [0, 20],
        yStep: 4,
      }}
    />
  )
}
