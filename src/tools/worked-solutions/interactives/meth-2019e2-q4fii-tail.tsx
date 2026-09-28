// 2019 Methods Exam 2 Q4f.ii — "n or more" is the whole stack of bars from n upwards. The bars are
// X ~ Bi(36, 0.0527) (zoomed in on the tail, where the action is); the bars from n up are poured
// into one column on the right and compared with the 1% line. n = 6 gives 0.0107, just over the
// line; n = 7 gives 0.0024, under it, so the smallest n is 7. A toggle tests Pr(X > n) instead,
// which leaves bar n out of the stack and lands on the report's common wrong answer n = 6.
// Values checked in scipy: Pr(X ≥ 6) = 0.010659…, Pr(X ≥ 7) = 0.002436….

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Toggle, num } from './kit'

const N = 36
const P = 0.0527
const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const pmf = (k: number) => choose(N, k) * P ** k * (1 - P) ** (N - k)
const KS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const COL = 13.6 // x-position of the stacked tail column
const bx = (k: number) => k + 2 // bar for X = k, clear of the y-axis
const tailFrom = (k0: number) => {
  let s = 0
  for (let k = k0; k <= N; k++) s += pmf(k)
  return s
}

export default function Tail() {
  const [n, setN] = useState(6)
  const [strict, setStrict] = useState(false)
  const [zoom, setZoom] = useState(true)

  const first = strict ? n + 1 : n // first bar in the stack
  const sum = tailFrom(first)
  const passes = sum < 0.01
  const yTop = zoom ? 0.045 : 0.31
  const cap = yTop * 0.985
  const op = strict ? '>' : '\\ge'
  const opText = strict ? '>' : '≥'
  const colColour = passes ? (strict && n === 6 ? C.bad : C.good) : C.bad

  // The stacked column: bar `first` at the bottom, then first + 1, … (only the first few are visible).
  const segs: { k: number; y0: number; y1: number }[] = []
  let acc = 0
  for (let k = first; k <= 12; k++) {
    segs.push({ k, y0: acc, y1: acc + pmf(k) })
    acc += pmf(k)
  }

  let notice
  if (strict) {
    notice = (
      <Notice tone="warn">
        Testing <M>{`\\Pr(X > ${n})`}</M> leaves bar <M>{String(n)}</M> <em>out</em> of the stack, so every value is really{' '}
        <M>{`\\Pr(X \\ge ${n + 1})`}</M>. {n === 6 ? (
          <>That is how <M>n = 6</M>, the report&apos;s common wrong answer, appears to pass: the column is the one for{' '}
            <M>7</M> or more. </>
        ) : null}
        &ldquo;<M>n</M> or more&rdquo; includes <M>n</M> itself. Turn the toggle off.
      </Notice>
    )
  } else if (n === 6) {
    notice = (
      <Notice tone="warn">
        <b><M>{'\\Pr(X \\ge 6) \\approx 0.0107'}</M>, just <em>over</em> the 1% line</b>, so <M>n = 6</M> fails. Careful: bar{' '}
        <M>6</M> on its own is only <M>0.0082</M>, but &ldquo;6 or more&rdquo; is the whole stack from <M>6</M> up. Try{' '}
        <M>n = 7</M>.
      </Notice>
    )
  } else if (n === 7) {
    notice = (
      <Notice tone="good">
        <b><M>{'\\Pr(X \\ge 7) \\approx 0.0024'}</M>, under the 1% line</b>, and <M>n = 6</M> was just over it. So{' '}
        <M>n = 7</M> is the <em>smallest</em> value that works. Your working needs both numbers: one to show <M>6</M>{' '}
        fails, one to show <M>7</M> passes.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>n</M> goes up, bars leave the bottom of the stack, so <M>{'\\Pr(X \\ge n)'}</M> only gets smaller.{' '}
        {n < 6 ? 'Here it is still well over 1%: increase n.' : 'It passes, but so does every n after 7. You want the first one that passes.'}
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 14.6]}
        y={[0, yTop]}
        xStep={20}
        yStep={zoom ? 0.01 : 0.1}
        xLabels={false}
        yLabels={v => (zoom ? v.toFixed(2) : v.toFixed(1))}
        xLabel=""
        yLabel=""
        height={290}
      >
        {KS.map(k => (
          <Label key={`k${k}`} at={[bx(k), 0]} attach="s" size={11} gap={5} bold={false}>{String(k)}</Label>
        ))}
        <Label at={[COL, 0]} attach="s" size={11} gap={5} color={colColour}>{`X ${opText} ${n}`}</Label>
        {KS.map(k => {
          const h = pmf(k)
          const inStack = k >= first
          return (
            <Polygon
              key={k}
              points={[[bx(k) - 0.36, 0], [bx(k) + 0.36, 0], [bx(k) + 0.36, Math.min(h, cap)], [bx(k) - 0.36, Math.min(h, cap)]]}
              color={inStack ? C.violet : k === n && strict ? C.bad : C.f}
              fillOpacity={inStack ? 0.7 : k === n && strict ? 0.5 : 0.25}
              weight={inStack ? 1.5 : 0.5}
            />
          )
        })}
        {zoom && <Label at={[bx(4) + 0.45, cap]} attach="se" size={11} bold={false} color={C.guide}>← tall bars cut off</Label>}
        <Label at={[bx(n), Math.min(pmf(n), cap)]} attach="n" size={11} gap={3} color={strict ? C.bad : C.violet}>{num(pmf(n), 4)}</Label>
        {segs.map((s, i) => (
          <Polygon
            key={`s${s.k}`}
            points={[[COL - 0.5, s.y0], [COL + 0.5, s.y0], [COL + 0.5, Math.min(s.y1, cap)], [COL - 0.5, Math.min(s.y1, cap)]]}
            color={C.violet}
            fillOpacity={i % 2 === 0 ? 0.75 : 0.45}
            weight={0.5}
          />
        ))}
        <Line.Segment point1={[COL - 1.1, 0.01]} point2={[COL + 0.9, 0.01]} color={C.bad} style="dashed" weight={2} />
        <Label at={[COL - 1.1, 0.01]} attach="w" size={11} color={C.bad}>1%</Label>
        <Label at={[COL, Math.min(sum, cap)]} attach="n" size={12} gap={4} color={colColour}>{num(sum, 4)}</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={3} max={9} step={1} format={v => String(v)} />
        <Buttons>
          <Toggle label={`Test Pr(X > n) instead`} checked={strict} onChange={setStrict} />
          <Toggle label="Zoom in on the tail" checked={zoom} onChange={setZoom} />
        </Buttons>
        <Readouts>
          <Readout color={colColour} tex={`\\Pr(X ${op} ${n}) \\approx ${num(sum, 4)} ${passes ? '< 0.01' : '> 0.01'}`} />
          {!strict && n === 7 && <Readout color={C.good} tex={'\\text{smallest } n = 7\\ \\checkmark'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
