// 2020 Methods Exam 2 MCQ 8 — "more than three" as a set of bars. X ~ Bi(25, 0.056) is drawn as
// bars 0 to 8 (everything past 8 is under 0.00001), with a triangle under the axis at the balance
// point E(X) = np = 1.4, the mean the question gives. Choose which bars an event takes: X > 3 is the
// bars 4, 5, 6, … and totals 1 − Pr(X ≤ 3) ≈ 0.048 (option B). The popular wrong readings are one
// tap away: X ≥ 3 adds the bar at 3, which on its own (0.114) is more than twice the whole answer,
// giving 0.162 (option E, 20%); X = 3 alone is 0.114 (D) and X = 4 alone is 0.037 (A). All values
// computed from the binomial formula here and checked in scipy (0.04850, 0.16217, 0.11368, 0.03709).

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Polygon, Readout, Readouts, Toggle, num } from './kit'

const N = 25
const P = 1.4 / N
const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const PMF = Array.from({ length: N + 1 }, (_, k) => choose(N, k) * P ** k * (1 - P) ** (N - k))
const SHOWN = 9 // bars 0–8

type Ev = 'gt3' | 'ge3' | 'eq3' | 'eq4'
const EVENTS: Record<Ev, { label: string; tex: string; inc: (k: number) => boolean; option: string }> = {
  gt3: { label: 'More than 3', tex: 'X > 3', inc: k => k >= 4, option: 'B' },
  ge3: { label: 'X ≥ 3', tex: 'X \\ge 3', inc: k => k >= 3, option: 'E' },
  eq3: { label: 'X = 3', tex: 'X = 3', inc: k => k === 3, option: 'D' },
  eq4: { label: 'X = 4', tex: 'X = 4', inc: k => k === 4, option: 'A' },
}
const ORDER: Ev[] = ['gt3', 'ge3', 'eq3', 'eq4']

// Bars in plot units: bar k is centred at k + 1 (so the y-axis sits clear of the first bar) and is
// 100 × Pr(X = k) tall — mafs pads the view in plot units, so a 0–1 height would be squashed.
const XK = (k: number) => k + 1
const H = (p: number) => 100 * p

export default function Tail() {
  const [ev, setEv] = useState<Ev>('gt3')
  const E = EVENTS[ev]
  const total = PMF.reduce((s, v, k) => (E.inc(k) ? s + v : s), 0)
  const right = ev === 'gt3'
  const hi = right ? C.good : C.bad

  let notice
  if (ev === 'gt3') {
    notice = (
      <Notice tone="good">
        <b>&ldquo;More than three&rdquo; is the bars 4, 5, 6, …, 25.</b> <M>X</M> counts items, so it only takes whole numbers:{' '}
        <M>X &gt; 3</M> and <M>X \ge 4</M> are the same bars. Adding 22 bars is slow, so take the complement:{' '}
        <M>{'1 - \\Pr(X \\le 3) = 1 - 0.9515\\ldots \\approx 0.048'}</M>, option B. Most of it is the bar at 4 (0.037); the bars from 5
        up add only about 0.011. It&apos;s small because 4 is well above the balance point 1.4: most boxes have 0 to 3 defective items.
        Now tap &ldquo;<M>X \ge 3</M>&rdquo;.
      </Notice>
    )
  } else if (ev === 'ge3') {
    notice = (
      <Notice tone="warn">
        <b>Including 3 adds the bar at 3</b>, and that bar on its own (<M>0.114</M>) is more than twice the whole answer. The total jumps
        to <M>0.162</M>, option E. &ldquo;More than three&rdquo; doesn&apos;t include three; &ldquo;at least three&rdquo; would. On CAS the
        lower bound is 4, not 3: <M>{'\\text{binomCdf}(25, 0.056, 4, 25)'}</M>.
      </Notice>
    )
  } else if (ev === 'eq3') {
    notice = (
      <Notice tone="warn">
        <b>One bar: exactly three.</b> <M>\Pr(X = 3) \approx 0.114</M> is option D, a single binomPdf value. A box with 3 defective items
        doesn&apos;t have <i>more</i> than three, so this bar isn&apos;t in the answer at all.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>One bar: exactly four.</b> <M>\Pr(X = 4) \approx 0.037</M> is option A. It is the biggest piece of the answer, but a box with 5,
        6 or more defective items also has more than three, so every bar from 4 up belongs.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.6, SHOWN + 0.7]} y={[-8, 40]} xStep={1} yStep={10} labels={false} xLabel="" yLabel="" height={270}>
        {Array.from({ length: SHOWN }, (_, k) => (
          <Label key={`x${k}`} at={[XK(k), 0]} attach="s" gap={6} size={12} bold={false}>
            {k}
          </Label>
        ))}
        {[10, 20, 30].map(v => (
          <Label key={`y${v}`} at={[0, v]} attach="w" gap={6} size={11} bold={false}>
            {(v / 100).toFixed(1)}
          </Label>
        ))}
        <Label at={[SHOWN + 0.7, 0]} attach="n" gap={6} size={14} italic>
          x
        </Label>
        {PMF.slice(0, SHOWN).map((v, k) => {
          const on = E.inc(k)
          return (
            <Polygon
              key={k}
              points={[[XK(k) - 0.34, 0], [XK(k) + 0.34, 0], [XK(k) + 0.34, H(v)], [XK(k) - 0.34, H(v)]]}
              color={on ? hi : C.f}
              fillOpacity={on ? 0.8 : 0.3}
              weight={on ? 1.5 : 0}
              strokeOpacity={on ? 1 : 0}
            />
          )
        })}
        {/* Values on bars 0–4 only: the bars from 5 up are too short to carry a label without collisions on a phone. */}
        {PMF.slice(0, 5).map((v, k) => (
          <Label key={k} at={[XK(k), H(v)]} color={E.inc(k) ? hi : C.ink} attach="n" gap={4} size={10.5} bold={E.inc(k)}>
            {num(v, 3)}
          </Label>
        ))}
        {/* The balance point E(X) = np = 1.4, under the axis. */}
        <Polygon
          points={[[XK(1.4), 0], [XK(1.4) - 0.16, -3.2], [XK(1.4) + 0.16, -3.2]]}
          color={C.violet}
          fillOpacity={0.9}
          weight={0}
        />
      </Plane>
      <Controls>
        <Buttons>
          {ORDER.map(k => (
            <Toggle
              key={k}
              label={`${EVENTS[k].label} (${EVENTS[k].option})`}
              checked={ev === k}
              onChange={() => setEv(k)}
            />
          ))}
        </Buttons>
        <Readouts>
          <Readout tex={`{\\color{${C.violet}}\\blacktriangle}\\ \\mathrm{E}(X) = np = 25 \\times 0.056 = 1.4`} />
          <Readout color={hi} tex={`\\Pr(${E.tex}) \\approx ${num(total, 3)} \\ \\text{(option ${E.option})}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
