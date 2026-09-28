// 2020 Methods Exam 2 Q1d — two transformations from f to h, played one step at a time. Pick a
// route and press play: the curve (and one tracked point P, starting at (1, f(1)) = (1, 2.25))
// moves through step 1 and then step 2, and turns green only if it lands on h (dashed orange).
// Both of the report's answers work: reflect in the x-axis then up 2 (y = −f(x) + 2), or down 2
// then reflect (y = −(f(x) − 2)). Two wrong routes fail visibly: up 2 then reflect lands on
// y = −f(x) − 2, four units below h (the reflection flips the translation too — the report's
// "not in the correct order"), and reflecting in the y-axis — the report's common incorrect
// answer — leaves the curve exactly where it was, because f is even, so the route ends at f + 2.
// Reflections are animated as a flip (y → cos(πs)·y, or x → cos(πs)·x); translations slide.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, num, tick, usePlayer, type vec } from './kit'

const f = (x: number) => 0.25 * (x * x - 4) ** 2
const h = (x: number) => 2 - f(x)
const X = 2.9

type Move = 'reflectX' | 'reflectY' | 'up2' | 'down2'
type RouteKey = 'A' | 'B' | 'C' | 'D'
const ROUTES: Record<RouteKey, { label: string; moves: [Move, Move]; ok: boolean; rule1: string; rule2: string }> = {
  A: { label: 'Reflect in x-axis → up 2', moves: ['reflectX', 'up2'], ok: true, rule1: 'y = -f(x)', rule2: 'y = -f(x) + 2 = h(x)' },
  B: { label: 'Down 2 → reflect in x-axis', moves: ['down2', 'reflectX'], ok: true, rule1: 'y = f(x) - 2', rule2: 'y = -\\bigl(f(x) - 2\\bigr) = -f(x) + 2 = h(x)' },
  C: { label: 'Up 2 → reflect in x-axis', moves: ['up2', 'reflectX'], ok: false, rule1: 'y = f(x) + 2', rule2: 'y = -\\bigl(f(x) + 2\\bigr) = -f(x) - 2' },
  D: { label: 'Reflect in y-axis → up 2', moves: ['reflectY', 'up2'], ok: false, rule1: 'y = f(-x) = f(x)', rule2: 'y = f(x) + 2' },
}

/** Where the point p has got to, `s` of the way (0 to 1) through the move. */
function apply(move: Move, s: number, [x, y]: vec.Vector2): vec.Vector2 {
  if (move === 'reflectX') return [x, Math.cos(Math.PI * s) * y]
  if (move === 'reflectY') return [Math.cos(Math.PI * s) * x, y]
  return [x, y + (move === 'up2' ? 2 : -2) * s]
}

export default function Routes() {
  const [route, setRoute] = useState<RouteKey>('A')
  const [t, setT] = useState(0)
  const player = usePlayer(setT, { min: 0, max: 2, seconds: 4 })
  const r = ROUTES[route]
  const s1 = Math.min(1, t)
  const s2 = Math.max(0, t - 1)
  const at = (p: vec.Vector2) => apply(r.moves[1], s2, apply(r.moves[0], s1, p))
  const done = t > 1.995
  const P = at([1, f(1)])
  const curveColor = done ? (r.ok ? C.good : C.bad) : C.f
  const pick = (k: RouteKey) => {
    player.stop()
    setRoute(k)
    setT(0)
  }

  let notice
  if (t < 0.005) {
    notice = (
      <Notice>
        The blue curve is <M>f</M>; the dashed orange one is the target, <M>h</M>. Pick a route and press{' '}
        <b>Play</b>. Watch the whole curve, and the point P in particular: it starts at <M>(1,\ 2.25)</M> and has to end
        up on <M>h</M>, at <M>{'(1,\\ h(1)) = (1,\\ -0.25)'}</M>.
      </Notice>
    )
  } else if (!done && route === 'D' && t <= 1) {
    notice = (
      <Notice tone="warn">
        Reflecting in the <M>y</M>-axis sends each point <M>(x, y)</M> to <M>(-x, y)</M>: watch P swing across to{' '}
        <M>x = -1</M>. But the curve lands exactly on itself! <M>f</M> is even (<M>f(-x) = f(x)</M>: its graph is symmetric
        in the <M>y</M>-axis), so this reflection changes nothing at all.
      </Notice>
    )
  } else if (!done && t <= 1) {
    const m = r.moves[0]
    notice = (
      <Notice>
        {m === 'reflectX' ? (
          <>
            Step 1, reflect in the <M>x</M>-axis: every point <M>(x, y)</M> goes to <M>(x, -y)</M>, so every output changes
            sign and the rule becomes <M>y = -f(x)</M>. P heads from height <M>2.25</M> to <M>-2.25</M>.
          </>
        ) : (
          <>
            Step 1, translate <b>{m === 'up2' ? 'up' : 'down'}</b> 2: add <M>{m === 'up2' ? '2' : '-2'}</M> to every{' '}
            <M>y</M>-value, so the rule becomes <M>{r.rule1}</M>.
          </>
        )}
      </Notice>
    )
  } else if (!done) {
    const m = r.moves[1]
    notice = (
      <Notice>
        {m === 'reflectX' ? (
          <>
            Step 2, reflect in the <M>x</M>-axis. This negates <i>everything</i> in the rule, including the{' '}
            <M>{route === 'B' ? '-2' : '+2'}</M> added in step 1. Watch where the curve ends up.
          </>
        ) : (
          <>
            Step 2, translate up 2: add <M>2</M> to every <M>y</M>-value.
          </>
        )}
      </Notice>
    )
  } else if (route === 'A') {
    notice = (
      <Notice tone="good">
        <b>It lands exactly on <M>h</M>.</b> <M>-f(x) + 2 = h(x)</M>, and P ends at <M>(1,\ -0.25)</M>, on <M>h</M>. Look at
        P&apos;s start and finish: <M>2.25</M> and <M>-0.25</M> are the same distance (1.25) from the line <M>y = 1</M>, on
        opposite sides. The two steps together are a reflection in <M>y = 1</M>, which is the key to part e.
      </Notice>
    )
  } else if (route === 'B') {
    notice = (
      <Notice tone="good">
        <b>This order works too</b>, but only because the translation was <i>down</i>: reflecting afterwards turned{' '}
        <M>-2</M> into <M>+2</M>, giving <M>{'-\\bigl(f(x) - 2\\bigr) = -f(x) + 2 = h(x)'}</M>. The report accepts either
        order, as long as the direction matches it.
      </Notice>
    )
  } else if (route === 'C') {
    notice = (
      <Notice tone="warn">
        <b>It misses: the red curve is <M>y = -f(x) - 2</M></b>, four units below <M>h</M>. The reflection in step 2
        negated the <M>+2</M> from step 1 as well, so &ldquo;up 2&rdquo; became &ldquo;down 2&rdquo;. When the translation
        comes first, it has to go the other way (route B). This is the report&apos;s &ldquo;did not have them in the
        correct order&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>It misses: the red curve is <M>y = f(x) + 2</M></b>, the W shape lifted up, not the upside-down shape of{' '}
        <M>h</M>. A reflection in the <M>y</M>-axis replaces <M>x</M> by <M>-x</M> (the <i>inputs</i>), and for this even{' '}
        <M>f</M> that does nothing. <M>h</M> needs the <i>outputs</i> negated: a reflection in the <M>x</M>-axis. This is
        the report&apos;s common incorrect answer.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-7, 7]} xStep={1} yStep={2} height={320} yLabels={v => (Math.abs(v) > 7 ? "" : tick(v))}>
        <Plot.OfX y={h} domain={[-X, X]} color={C.g} weight={2.5} style="dashed" />
        <Label at={[2.75, h(2.75)]} color={C.g} attach="w">h</Label>
        {t > 0.005 && <Plot.OfX y={f} domain={[-X, X]} color={C.guide} weight={1.2} style="dashed" />}
        <Plot.Parametric xy={u => at([u, f(u)])} domain={[-X, X]} color={curveColor} weight={3} />
        <Point x={1} y={h(1)} color={C.g} opacity={0.6} />
        <Point x={P[0]} y={P[1]} color={curveColor} />
        <Label at={P} color={curveColor} attach={P[0] < 0 ? 'w' : 'e'}>P</Label>
      </Plane>
      <Controls>
        <Buttons>
          {(Object.keys(ROUTES) as RouteKey[]).map(k => (
            <Toggle key={k} label={ROUTES[k].label} checked={route === k} onChange={() => pick(k)} />
          ))}
        </Buttons>
        <Slider
          label="\text{step}"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={2}
          step={0.01}
          format={v => `${v.toFixed(1)} of 2`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play" />
        </Buttons>
        <Readouts>
          {t >= 1 && <Readout tex={`\\text{after step 1: } ${r.rule1}`} />}
          {done && <Readout color={r.ok ? C.good : C.bad} tex={`\\text{after step 2: } ${r.rule2}`} />}
          <Readout color={curveColor} tex={`P = (${num(P[0])},\\ ${num(P[1])})`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
