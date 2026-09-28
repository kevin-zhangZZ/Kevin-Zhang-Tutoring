// 2018 Methods Exam 2 MCQ 11 — which asymptote of y = tan(ax) is x = 3π? Walking right from the
// origin, the graph alternates: intercept 0, asymptote π/(2a), intercept π/a, asymptote 3π/(2a), …
// so "an asymptote at 3π AND exactly one x-intercept in (0, 3π)" forces 3π to be the SECOND
// asymptote: 3π/(2a) = 3π, a = 1/2. Slide a (in twelfths) or press an option. The purple band is
// (0, 3π); the first three asymptotes are numbered; intercepts inside the band are counted (x = 0 is
// grey: the interval is open). Option A (a = 1/6, 38%) makes 3π the FIRST asymptote, so no intercept
// fits inside; option B (a = 1/3, 29%, period 3π) puts an x-intercept, not an asymptote, at 3π.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider } from './kit'

const PI = Math.PI
const X0 = -0.6
const X1 = 4.5 * PI
const YM = 4
const TARGET = 3 * PI

/** a = k/12 for each option. */
const OPTIONS = [
  { letter: 'A', k: 2, text: '1/6' },
  { letter: 'B', k: 4, text: '1/3' },
  { letter: 'C', k: 6, text: '1/2' },
  { letter: 'D', k: 12, text: '1' },
  { letter: 'E', k: 24, text: '2' },
]
const ORD = ['1st', '2nd', '3rd']

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
/** p/q as a plain fraction string. */
const plain = (p: number, q: number) => {
  const g = gcd(p, q)
  return q / g === 1 ? String(p / g) : `${p / g}/${q / g}`
}
/** (p/q)π as TeX. */
const piTex = (p: number, q: number) => {
  const g = gcd(p, q)
  const a = p / g
  const b = q / g
  if (b === 1) return a === 1 ? '\\pi' : `${a}\\pi`
  return `\\tfrac{${a === 1 ? '' : a}\\pi}{${b}}`
}

export default function Asymptotes() {
  const [k, setK] = useState(2) // a = k/12
  const a = k / 12

  // Positive asymptotes: x = (2j − 1)π/(2a) = 6(2j − 1)π/k. 3π is asymptote number j exactly when
  // 6(2j − 1) = 3k, i.e. k = 2(2j − 1).
  const asym: number[] = []
  for (let j = 1; (6 * (2 * j - 1) * PI) / k <= X1 + 1e-9; j++) asym.push((6 * (2 * j - 1) * PI) / k)
  const targetIndex = k % 4 === 2 ? (k / 2 + 1) / 2 : 0 // 1-based, 0 = not an asymptote
  // Intercepts: x = mπ/a = 12mπ/k. Inside (0, 3π) when 0 < 12m < 3k, i.e. 1 ≤ m, 4m < k.
  const inside = Math.floor((k - 1) / 4)
  const interceptAtTarget = k % 4 === 0
  const icepts: number[] = []
  for (let m = 0; (12 * m * PI) / k <= X1 + 1e-9; m++) icepts.push(m)

  // One branch of tan per intercept, cut off where |tan| reaches 6 (beyond the view).
  const d = Math.atan(6) / a
  const branches: [number, number][] = []
  for (let m = -1; (12 * m * PI) / k - d < X1; m++) {
    const c = (12 * m * PI) / k
    const lo = Math.max(X0, c - d)
    const hi = Math.min(X1, c + d)
    if (hi > lo) branches.push([lo, hi])
  }

  const option = OPTIONS.find(o => o.k === k)
  const good = targetIndex === 2
  const interceptColor = good ? C.good : C.g

  let notice
  if (good) {
    notice = (
      <Notice tone="good">
        <b>Option C: <M>{'a = \\tfrac12'}</M>.</b> Now <M>3\pi</M> is the <b>second</b> asymptote. From the origin the
        graph goes: asymptote at <M>\pi</M>, intercept at <M>2\pi</M>, asymptote at <M>3\pi</M>. That is exactly one
        intercept inside the band, so both conditions hold, and this is the only value of <M>a</M> that does it.
      </Notice>
    )
  } else if (targetIndex === 1) {
    notice = (
      <Notice tone="warn">
        {option ? <>Option {option.letter}: </> : null}
        <M>3\pi</M> is the <b>first</b> asymptote, so the graph climbs straight from the origin up to it: there is{' '}
        <b>no</b> intercept inside <M>(0, 3\pi)</M>. The intercept at <M>x = 0</M> doesn&apos;t count, because the
        interval is open. Solving <M>{'\\tfrac{\\pi}{2a} = 3\\pi'}</M> gives this graph. Slide <M>a</M> up to{' '}
        <M>{'\\tfrac12.'}</M>
      </Notice>
    )
  } else if (targetIndex > 0) {
    notice = (
      <Notice tone="warn">
        <M>3\pi</M> is asymptote number <M>{String(targetIndex)}</M>, so <M>{String(inside)}</M> intercepts fit before it
        in <M>(0, 3\pi)</M>: one between each pair of neighbouring asymptotes. Exactly one intercept needs{' '}
        <M>3\pi</M> to be the <b>second</b> asymptote.
      </Notice>
    )
  } else if (k === 4) {
    notice = (
      <Notice tone="warn">
        Option B makes the <b>period</b> <M>{'\\tfrac{\\pi}{a} = 3\\pi'}</M>, but look where the asymptotes are:{' '}
        <M>{'\\tfrac{3\\pi}{2}'}</M> and <M>{'\\tfrac{9\\pi}{2}'}</M>. At <M>x = 3\pi</M> the graph crosses the axis (red
        dot) instead. The period is the <em>gap</em> between asymptotes, not where one of them is.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        {option ? <>Option {option.letter}: </> : null}
        <M>x = 3\pi</M> is <b>not an asymptote</b> for this <M>a</M>
        {interceptAtTarget ? <> (the graph crosses the axis there, red dot)</> : null}. An asymptote lands on{' '}
        <M>3\pi</M> only when <M>{'3\\pi = \\tfrac{(2n+1)\\pi}{2a}'}</M>, i.e. <M>{'a = \\tfrac16, \\tfrac12, \\tfrac56, \\dots'}</M>.
        Try each and count the intercepts in the band.
      </Notice>
    )
  }

  const firstThree = [1, 3, 5].map(o => piTex(6 * o, k))

  return (
    <div>
      <Plane
        x={[X0, X1]}
        y={[-YM, YM]}
        xStep={PI}
        yStep={2}
        height={320}
        xLabels={v => {
          const r = Math.round(v / PI)
          return r === 1 ? 'π' : `${r}π`
        }}
      >
        <Region top={() => YM} bottom={() => -YM} from={0} to={TARGET} color={C.violet} opacity={0.1} />
        {asym.map((x, i) => (
          <Line.Segment
            key={i}
            point1={[x, -YM]}
            point2={[x, YM]}
            color={Math.abs(x - TARGET) < 1e-9 ? (good ? C.good : C.g) : C.guide}
            style="dashed"
            weight={Math.abs(x - TARGET) < 1e-9 ? 3 : 1.5}
          />
        ))}
        {targetIndex === 0 && (
          <Line.Segment point1={[TARGET, -YM]} point2={[TARGET, YM]} color={C.violet} weight={2} />
        )}
        {branches.map(([lo, hi], i) => (
          <Plot.OfX key={`${k}-${i}`} y={x => Math.tan(a * x)} domain={[lo, hi]} color={C.f} weight={3} />
        ))}
        {icepts.map(m => {
          const x = (12 * m * PI) / k
          const inBand = m >= 1 && 4 * m < k
          const atTarget = 4 * m === k
          const col = inBand ? interceptColor : atTarget ? C.bad : C.guide
          return <Point key={m} x={x} y={0} color={col} />
        })}
        {asym.slice(0, 3).map((x, i) => (
          <Label key={i} at={[x, YM]} attach="s" size={12} color={Math.abs(x - TARGET) < 1e-9 ? (good ? C.good : C.g) : C.ink}>
            {ORD[i]}
          </Label>
        ))}
        <Label at={[TARGET, -YM]} attach="ne" color={C.violet} size={12}>
          x = 3π
        </Label>
      </Plane>
      <Controls>
        <Slider label="a" value={k} onChange={setK} min={1} max={24} step={1} format={v => plain(v, 12)} />
        <Buttons>
          {OPTIONS.map(o => (
            <ActionButton key={o.letter} label={`${o.letter}: a = ${o.text}`} onClick={() => setK(o.k)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.guide} tex={`\\text{asymptotes: } x = ${firstThree.join(',\\ ')},\\ \\dots`} />
          <Readout color={interceptColor} tex={`\\text{intercepts in } (0, 3\\pi)\\text{: } ${inside}`} />
          <Readout
            color={targetIndex ? (good ? C.good : C.g) : C.violet}
            tex={
              targetIndex
                ? `x = 3\\pi \\text{ is asymptote no. } ${targetIndex}`
                : interceptAtTarget
                  ? `x = 3\\pi \\text{ is an intercept}`
                  : `x = 3\\pi \\text{ is not an asymptote}`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
