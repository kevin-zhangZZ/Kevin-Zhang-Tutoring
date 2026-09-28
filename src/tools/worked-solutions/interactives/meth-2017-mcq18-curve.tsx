// 2017 Methods Exam 2 MCQ 18 — "mean = sd" ties p to n: np = √(np(1 − p)) forces p = 1/(n + 1).
// The graph is p = 1/(n + 1) against n with the red line p = 0.01. Slide n: the readouts confirm
// that mean and sd really are equal for that p (both equal 1 − p, just under 1), and the point
// shows whether p ≤ 0.01 yet. The zoom toggle switches to the whole numbers n = 94…104, where
// n = 98 (option C) sits just above the line (p = 1/99 ≈ 0.0101) and n = 99 lands exactly on it.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const pOf = (n: number) => 1 / (n + 1)
const Z0 = 94
const Z1 = 104

export default function Curve() {
  const [n, setN] = useState(49)
  const [zoom, setZoom] = useState(false)

  const p = pOf(n)
  const mean = n * p
  const sd = Math.sqrt(n * p * (1 - p))
  const ok = p <= 0.01 + 1e-12
  const dotColor = n === 99 ? C.good : ok ? C.f : C.bad

  const setZoomed = (z: boolean) => {
    setZoom(z)
    if (z && (n < Z0 || n > Z1)) setN(98)
  }

  let notice
  if (n === 98) {
    notice = (
      <Notice tone="warn">
        <M>{'p=\\tfrac1{99}\\approx0.0101'}</M>: just <em>above</em> the red line. The graph is decreasing, so a smaller{' '}
        <M>n</M> is even further above it. 98 trials (option C) is one too few. Step to <M>n=99</M>.
      </Notice>
    )
  } else if (n === 99) {
    notice = (
      <Notice tone="good">
        <M>{'p=\\tfrac1{100}=0.01'}</M> exactly, and <M>{'p\\le0.01'}</M> allows equality, so <M>n=99</M> is the first{' '}
        <M>n</M> that works: option D. Mean and sd are both <M>0.99</M>.
      </Notice>
    )
  } else if (n > 99) {
    notice = (
      <Notice>
        Below the line, so <M>{'p\\le0.01'}</M> holds. But the curve only falls as <M>n</M> grows, so every <M>n</M>{' '}
        past 99 also works; the question wants the <em>smallest</em>. Slide back to where the point first reaches the line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each point is a <M>{'\\mathrm{Bi}(n,p)'}</M> with mean = sd (check the readouts), which forces{' '}
        <M>{'p=\\tfrac1{n+1}'}</M>: more trials, smaller <M>p</M>. Here the point is still above <M>{'p=0.01'}</M>.
        Slide <M>n</M> right, or turn on the zoom.
      </Notice>
    )
  }

  return (
    <div>
      {zoom ? (
        <Plane
          x={[Z0 - 0.5, Z1 + 0.5]}
          y={[0.0094, 0.0107]}
          xStep={2}
          yStep={0.0005}
          height={300}
          xLabel=""
          yLabel=""
          labels={false}
        >
          {/* Both axes are off-screen here (n = 0 and p = 0), so the scale is labelled by hand. */}
          {[94, 96, 98, 100, 102].map(k => (
            <Label key={`t${k}`} at={[k, 0.0094]} attach="s" size={11} gap={3} bold={false}>
              {String(k)}
            </Label>
          ))}
          <Label at={[Z1, 0.0094]} attach="s" size={12} gap={3} italic>n</Label>
          {/* The dots run from top-left to bottom-right, so each p label goes on the clear side. */}
          <Label at={[Z0 - 0.5, 0.0095]} attach="e" size={11} gap={3} bold={false}>0.0095</Label>
          <Label at={[Z1 + 0.5, 0.0105]} attach="w" size={11} gap={3} bold={false}>0.0105</Label>
          <Line.Segment point1={[Z0 - 0.5, 0.01]} point2={[Z1 + 0.5, 0.01]} color={C.bad} style="dashed" weight={2} />
          <Label at={[Z1 + 0.5, 0.01]} attach="nw" color={C.bad} size={12}>p = 0.01</Label>
          {Array.from({ length: Z1 - Z0 + 1 }, (_, i) => Z0 + i).map(k => (
            <Point key={k} x={k} y={pOf(k)} color={pOf(k) <= 0.01 + 1e-12 ? C.f : C.guide} />
          ))}
          <Point x={n} y={p} color={dotColor} />
          <Label at={[n, p]} attach={n > 101 ? 'nw' : 'ne'} color={dotColor} size={12}>
            {`n = ${n}`}
          </Label>
        </Plane>
      ) : (
        <Plane x={[0, 130]} y={[0, 0.05]} xStep={10} yStep={0.01} height={300} xLabel="n" yLabel="p" xLabels={v => (Math.round(v) % 20 === 0 && v < 125 ? String(Math.round(v)) : '')}>
          <Plot.OfX y={pOf} domain={[19, 130]} color={C.f} weight={3} />
          <Line.Segment point1={[14, 0.01]} point2={[130, 0.01]} color={C.bad} style="dashed" weight={2} />
          <Label at={[45, 0.01]} attach="n" color={C.bad} size={12} gap={4}>p = 0.01</Label>
          <Label at={[24, pOf(24)]} attach="ne" color={C.f} size={13}>p = 1/(n + 1)</Label>
          <Point x={n} y={p} color={dotColor} />
          <Label at={[n, p]} attach="ne" color={dotColor} size={12}>
            {`n = ${n}`}
          </Label>
        </Plane>
      )}
      <Controls>
        <Slider
          label="n"
          value={n}
          onChange={setN}
          min={zoom ? Z0 : 20}
          max={zoom ? Z1 : 130}
          step={1}
          format={v => String(v)}
        />
        <Buttons>
          <Toggle label="Zoom in on n = 94 to 104" checked={zoom} onChange={setZoomed} />
        </Buttons>
        <Readouts>
          <Readout color={dotColor} tex={`p=\\tfrac{1}{n+1}=\\tfrac{1}{${n + 1}}\\approx ${p.toFixed(5)}\\ ${ok ? '\\le' : '>'}\\ 0.01`} />
        </Readouts>
        <Readouts>
          <Readout tex={`\\mathrm{E}(X)=np=1-p\\approx ${mean.toFixed(4)}`} />
          <Readout tex={`\\mathrm{sd}(X)=\\sqrt{np(1-p)}\\approx ${sd.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
