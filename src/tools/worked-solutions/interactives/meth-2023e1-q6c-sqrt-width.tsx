// 2023 Methods Exam 1 Q6c — the width of an approximate 95% confidence interval goes like 1/√n.
// The question's interval (0.04, 0.16) came from p̂ = 0.1, n = 100, z = 2. Multiply the sample size
// by k (keeping p̂ = 0.1): the new interval, centred on the same p̂, has width 0.12/√k, so k = 4
// (the question's larger sample) halves it. A toggle draws the common wrong answer — dividing the
// width by k, as if there were no square root over n — which gives a quarter of the width at k = 4.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, Toggle, Buttons, num } from './kit'

const P_HAT = 0.1
const N0 = 100
const Z = 2
const margin = (n: number) => Z * Math.sqrt((P_HAT * (1 - P_HAT)) / n)
const W0 = 2 * margin(N0) // 0.12

/** A short decimal for a label: `dp` places with trailing zeros dropped, '≈ ' when that rounds. */
const short = (v: number, dp = 3) => {
  const r = Number(v.toFixed(dp))
  return `${Math.abs(r - v) > 1e-9 ? '≈ ' : ''}${r}`
}
const trim = (v: number) => String(Number(v.toFixed(3)))
/** The same for TeX: '= 0.03' when exact, '\approx 0.085' when rounded. */
const eq = (v: number, dp = 3) => {
  const r = Number(v.toFixed(dp))
  return `${Math.abs(r - v) > 1e-9 ? '\\approx' : '='} ${r}`
}

const ROW_OLD = 2.5
const ROW_NEW = 1.5
const ROW_BAD = 0.5

export default function SqrtWidth() {
  const [k, setK] = useState(4)
  const [noRoot, setNoRoot] = useState(false)

  const n = N0 * k
  const e = margin(n)
  const w = 2 * e
  const root = Math.sqrt(k)
  const square = Number.isInteger(root)
  const wBad = W0 / k

  const factorTex = square ? (root === 1 ? '1' : `\\tfrac{1}{${root}}`) : `\\tfrac{1}{\\sqrt{${k}}} \\approx ${num(1 / root, 3)}`

  let notice
  if (k === 1) {
    notice = (
      <Notice>
        With the same sample size and the same <M>{'\\hat p'}</M>, the interval is the original one,{' '}
        <M>(0.04,\ 0.16)</M>. Slide <M>k</M> to 4 &mdash; the question&apos;s sample, four times as large.
      </Notice>
    )
  } else if (noRoot) {
    notice = (
      <Notice tone="warn">
        The red interval divides the width by <M>{String(k)}</M>, as if <M>n</M> were not under a square root:
        its width is <M>{`0.12 \\div ${k} ${eq(wBad, 4)}`}</M>. The real interval (orange) is only divided
        by <M>{square ? `\\sqrt{${k}} = ${root}` : `\\sqrt{${k}} \\approx ${num(root, 2)}`}</M>.{' '}
        {k === 4 ? (
          <>
            This is the common incorrect answer of <M>{'\\tfrac14'}</M>. Slide to <M>k = 16</M> to see what a quarter of
            the width really costs.
          </>
        ) : (
          <>
            Turn the toggle off and compare <M>k = 4,\ 9,\ 16</M>.
          </>
        )}
      </Notice>
    )
  } else if (k === 4) {
    notice = (
      <Notice tone="good">
        <b>Four times the households, but only half the width</b>: <M>0.12 \to 0.06</M>. In the formula, <M>n</M> sits
        under the square root, so multiplying <M>n</M> by 4 multiplies <M>{'\\sqrt n'}</M> by <M>{'\\sqrt4 = 2'}</M>{' '}
        &mdash; and the width is divided by 2. Turn on the toggle to see the common wrong answer of{' '}
        <M>{'\\tfrac14'}</M>.
      </Notice>
    )
  } else if (k === 16) {
    notice = (
      <Notice tone="good">
        To get a <b>quarter</b> of the width you need <M>\sqrt k = 4</M>, so <M>k = 16</M>: sixteen times the sample,
        width <M>0.12 \to 0.03</M>. That is why <M>{'\\tfrac14'}</M> is the wrong answer for <M>k = 4</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Multiplying <M>n</M> by <M>k</M> divides the width by <M>\sqrt k</M>, so here the width is{' '}
        <M>{`0.12 \\div \\sqrt{${k}} ${eq(w)}`}</M>. Perfect squares give exact factors: try{' '}
        <M>k = 4,\ 9,\ 16</M> for <M>{'\\tfrac12,\\ \\tfrac13,\\ \\tfrac14'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 0.2]} y={[0, 3]} xStep={0.04} yStep={1} height={250} xLabel="p" yLabel="" yLabels={false} xLabels={v => (v > 0.19 ? '' : v.toFixed(2))}>
        <Line.Segment point1={[P_HAT, 0]} point2={[P_HAT, 3]} color={C.guide} style="dashed" weight={1.5} />

        <Line.Segment point1={[P_HAT - W0 / 2, ROW_OLD]} point2={[P_HAT + W0 / 2, ROW_OLD]} color={C.f} weight={5} />
        <Point x={P_HAT - W0 / 2} y={ROW_OLD} color={C.f} />
        <Point x={P_HAT + W0 / 2} y={ROW_OLD} color={C.f} />
        <Label at={[P_HAT, ROW_OLD]} attach="n" color={C.f}>n = 100: width 0.12</Label>

        <Line.Segment point1={[P_HAT - e, ROW_NEW]} point2={[P_HAT + e, ROW_NEW]} color={C.g} weight={5} />
        <Point x={P_HAT - e} y={ROW_NEW} color={C.g} />
        <Point x={P_HAT + e} y={ROW_NEW} color={C.g} />
        <Label at={[P_HAT, ROW_NEW]} attach="n" color={C.g}>{`n = ${n}: width ${short(w)}`}</Label>

        {noRoot && k > 1 && (
          <>
            <Line.Segment point1={[P_HAT - wBad / 2, ROW_BAD]} point2={[P_HAT + wBad / 2, ROW_BAD]} color={C.bad} weight={4} style="dashed" />
            <Label at={[P_HAT, ROW_BAD]} attach="n" color={C.bad}>{`no root: width ${short(wBad, 4)}`}</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={v => setK(Math.round(v))} min={1} max={16} step={1} format={v => `×${Math.round(v)}`} />
        <Buttons>
          <Toggle label="What if there were no square root?" checked={noRoot} onChange={setNoRoot} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`n = 100k = ${n}`} />
          <Readout color={C.g} tex={`\\text{interval} ${Math.abs(Number(trim(e)) - e) > 1e-9 ? '\\approx' : '='} (${trim(P_HAT - e)},\\ ${trim(P_HAT + e)})`} />
          <Readout tex={`\\text{width factor} = ${factorTex}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
