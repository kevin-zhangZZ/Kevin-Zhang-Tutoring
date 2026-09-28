// 2020 Methods Exam 2 Q3d — "fewer than half of eight" as bars of Bi(8, 0.85). Most of the
// probability sits at 6, 7 and 8 on time (mean 6.8), so the answer, the bars 0 to 3, is far out in
// the left tail: 0.00285… ≈ 0.003. A ×20 magnifier makes those bars visible next to the X = 4 bar,
// which alone is 0.0185, more than six times the answer. Two toggles show the report's errors:
// X ≤ 4 adds that bar (0.021), and p = 0.15 counts late deliveries instead, flipping the picture so
// that 0 to 3 becomes the bulk (0.979), which is the chance of at least 5 on time.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Polygon, Readout, Readouts, Toggle, num } from './kit'

type Pick = 'right' | 'le4' | 'p15'

const N = 8
const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const pmf = (p: number) => Array.from({ length: N + 1 }, (_, k) => choose(N, k) * p ** k * (1 - p) ** (N - k))
const PMF_ON = pmf(0.85) // X = number on time
const PMF_LATE = pmf(0.15) // the same count done with p = 0.15

/** Bar k is centred at XK(k), clear of the vertical axis at 0. */
const XK = (k: number) => k + 0.75
const HALF = 0.34
const TOP = 0.42

export default function Tail() {
  const [pick, setPick] = useState<Pick>('right')
  const [zoom, setZoom] = useState(false)

  const probs = pick === 'p15' ? PMF_LATE : PMF_ON
  const cut = pick === 'le4' ? 4 : 3
  const inc = (k: number) => k <= cut
  const hi = pick === 'right' ? C.g : C.bad
  const top = zoom ? TOP / 20 : TOP
  const sum = probs.slice(0, cut + 1).reduce((s, v) => s + v, 0)
  const yTicks = zoom ? [0.01, 0.02] : [0.2, 0.4] // 0.1 and 0.3 left out: they would crowd the value on bar 0 on a phone

  let notice
  if (pick === 'le4') {
    notice = (
      <Notice tone="warn">
        <M>{'X \\le 4'}</M> adds the red bar at 4, and 4 is <b>half</b> of eight, not fewer than half. That one bar,{' '}
        <M>{'\\Pr(X=4) \\approx 0.0185'}</M>, is most of the report&apos;s common wrong answer, 0.021.{' '}
        {zoom ? '' : 'Magnify to see how it dwarfs the four bars before it. '}Before reaching for <M>{'\\texttt{binomCdf}'}</M>,
        list the whole numbers the words allow: 0, 1, 2, 3.
      </Notice>
    )
  } else if (pick === 'p15') {
    notice = (
      <Notice tone="warn">
        With <M>{'p = 0.15'}</M> the count is of <b>late</b> deliveries, so the picture flips left to right and the bars 0 to 3
        are now the bulk: about 0.979. That is the chance of at most 3 late, which is at least 5 on time, the wrong end. If 85%
        of deliveries are on time, a day with fewer than half on time must be rare. (Counting late ones is fine, but then
        fewer than half on time means <b>5 or more</b> late, the right-hand bars here, which add to the same 0.003.)
      </Notice>
    )
  } else if (zoom) {
    notice = (
      <Notice tone="good">
        Magnified 20 times. The orange bars 0 to 3 add to only <M>{'0.00285\\ldots \\approx 0.003'}</M>, and the bar at 4
        on its own, 0.0185, is more than six times bigger. The bars from 5 up run off the top. So leaving 4 in or out is the
        whole question: press <b>What if X ≤ 4?</b> to see the report&apos;s common wrong answer.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        These are the chances of 0 to 8 on time out of eight. On average <M>{'8 \\times 0.85 = 6.8'}</M> are on time, so the
        probability piles up at 6, 7 and 8. &ldquo;Fewer than half&rdquo; is fewer than 4: the orange bars 0, 1, 2 and 3, far
        out in the left tail and too small to see at this scale. Turn on the magnifier to compare them with the bar at 4.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1, N + 1.75]} y={[-top * 0.12, top]} xStep={1} yStep={zoom ? 0.005 : 0.1} labels={false} xLabel="" yLabel="" height={260}>
        {probs.map((_, k) => (
          <Label key={`x${k}`} at={[XK(k), 0]} attach="s" gap={6} size={12} bold={false}>
            {k}
          </Label>
        ))}
        {yTicks.map(v => (
          <Label key={`y${v}`} at={[0, v]} attach="w" gap={5} size={11} bold={false}>
            {zoom ? v.toFixed(2) : v.toFixed(1)}
          </Label>
        ))}
        <Label at={[N + 1.5, 0]} attach="n" gap={6} size={14} italic>
          x
        </Label>
        {probs.map((v, k) => {
          const on = inc(k)
          const h = Math.min(v, top * 0.985)
          return (
            <Polygon
              key={k}
              points={[[XK(k) - HALF, 0], [XK(k) + HALF, 0], [XK(k) + HALF, h], [XK(k) - HALF, h]]}
              color={on ? hi : C.f}
              fillOpacity={on ? 0.8 : 0.3}
              weight={on ? 1.5 : 0}
              strokeOpacity={on ? 1 : 0}
            />
          )
        })}
        {/* Values: the chosen bars and the bar at 4, when they are big enough to read and still on the scale. */}
        {probs.map((v, k) =>
          (inc(k) || k === 4) && v >= (zoom ? 0.0005 : 0.01) && v < top * 0.95 ? (
            <Label key={`v${k}`} at={[XK(k), v]} color={inc(k) ? hi : C.ink} attach="n" gap={4} size={10.5} bold={inc(k)}>
              {v >= 0.1 ? num(v, 3) : num(v, 4)}
            </Label>
          ) : null,
        )}
        {zoom &&
          probs.map((v, k) =>
            v > top ? (
              <Label key={`o${k}`} at={[XK(k), top * 0.985]} color={C.f} attach="s" gap={3} size={12}>
                ↑
              </Label>
            ) : null,
          )}
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Fewer than half: X ≤ 3" checked={pick === 'right'} onChange={() => setPick('right')} />
          <Toggle label="What if X ≤ 4?" checked={pick === 'le4'} onChange={() => setPick('le4')} />
          <Toggle label="What if p = 0.15?" checked={pick === 'p15'} onChange={() => setPick('p15')} />
          <Toggle label="Magnify ×20" checked={zoom} onChange={setZoom} />
        </Buttons>
        <Readouts>
          <Readout color={hi} tex={`\\Pr(X \\le ${cut}) \\approx ${num(sum, 4)}`} />
          {pick !== 'p15' && <Readout tex={`\\Pr(X = 4) \\approx ${num(PMF_ON[4], 4)}`} />}
          <Readout tex={`p = ${pick === 'p15' ? '0.15' : '0.85'}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
