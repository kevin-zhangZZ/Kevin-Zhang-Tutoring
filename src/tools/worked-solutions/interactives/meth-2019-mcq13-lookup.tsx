// 2019 Methods Exam 2 MCQ 13 — h(x) = f(x/2) + 5 "looks up" f at x/2. Slide x: the blue point
// (x/2, f(x/2)) on f is the value h uses, and the orange point (x, f(x/2) + 5) is where it lands on
// h — twice as far from the y-axis and 5 higher. Only f(−2) = 7 is known, so h is pinned down only
// where x/2 = −2, i.e. at x = −4, giving (−4, 12). Three different sample curves through (−2, 7)
// show the answer doesn't depend on f ("must pass through"); a toggle marks the "halve it" point
// (−1, 12), which misses h for every curve.
import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
} from './kit'

type Sample = {
  name: string
  f: (x: number) => number
  /** where to put the "y = f(x)" and "y = h(x)" labels: [x, attach] */
  fLab: [number, 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw']
  hLab: [number, 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw']
  /** which side of (−2, 7) and of (−4, 12) is clear of the curve */
  pAt: 'ne' | 'nw'
  keyAt: 'ne' | 'nw'
}

// Every sample passes through (−2, 7); u = x + 2.
const SAMPLES: Sample[] = [
  { name: 'A wave', f: x => 7 + 3 * Math.sin(0.8 * (x + 2)), fLab: [4.2, 's'], hLab: [3, 'ne'], pAt: 'nw', keyAt: 'nw' },
  { name: 'A parabola', f: x => 0.2 * (x + 2) ** 2 - 1.2 * (x + 2) + 7, fLab: [2, 's'], hLab: [4, 'n'], pAt: 'ne', keyAt: 'ne' },
  { name: 'A cubic', f: x => 0.04 * (x + 2) ** 3 - 0.8 * (x + 2) + 7, fLab: [-7.2, 'e'], hLab: [-8, 'n'], pAt: 'ne', keyAt: 'ne' },
]

const r1 = (v: number) => Math.round(v * 10) / 10
const fmt = (v: number) => (Math.abs(v) < 1e-9 ? '0' : Number.isInteger(r1(v)) ? r1(v).toFixed(0) : String(r1(v))).replace('-', '−')
const tex = (v: number) => fmt(v).replace('−', '-')

export default function Lookup() {
  const [x, setX] = useState(-1)
  const [which, setWhich] = useState(0)
  const [halve, setHalve] = useState(false)

  const s = SAMPLES[which]
  const f = s.f
  const h = (t: number) => f(t / 2) + 5
  const X = r1(x)
  const u = X / 2
  const fu = f(u)
  const key = Math.abs(X + 4) < 0.05
  const atHalf = Math.abs(X + 1) < 0.05
  const hMinus1 = h(-1)

  let notice
  if (halve) {
    notice = (
      <Notice tone="warn">
        The red point <M>(-1,\ 12)</M> is where you&apos;d land by <b>halving</b> <M>-2</M>. It isn&apos;t on{' '}
        <M>h</M>: at <M>x=-1</M>, <M>h</M> reads <M>f</M> at <M>{'\\tfrac{-1}{2}=-0.5'}</M>, so for this curve{' '}
        <M>{`h(-1)=f(-0.5)+5\\approx ${hMinus1.toFixed(2)}`}</M>. Switch curves: the red point misses every time,
        because nothing is known about <M>f(-0.5)</M>.
      </Notice>
    )
  } else if (key) {
    notice = (
      <Notice tone="good">
        <b>Now <M>{'\\tfrac{x}{2}=-2'}</M></b>, so <M>h</M> reads the one value of <M>f</M> we know:{' '}
        <M>h(-4)=f(-2)+5=7+5=12</M>. Switch between the three curves: every <M>f</M> through <M>(-2,\ 7)</M>{' '}
        gives an <M>h</M> through <M>(-4,\ 12)</M>. That&apos;s what &ldquo;must pass through&rdquo; means.
      </Notice>
    )
  } else if (atHalf) {
    notice = (
      <Notice>
        Halving <M>-2</M> gives <M>x=-1</M>, but look at what <M>h</M> uses there: the blue point,{' '}
        <M>f</M> at <M>{'\\tfrac{x}{2}=-0.5'}</M>. Nothing is known about <M>f(-0.5)</M>. We need the input
        of <M>f</M> to be <M>-2</M>, so slide <M>x</M> until <M>{'\\tfrac{x}{2}=-2'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`x=${tex(X)}`}</M>, <M>h</M> reads <M>f</M> at <M>{`\\tfrac{x}{2}=${tex(u)}`}</M> (blue point),
        moves it out to <b>twice</b> the distance from the <M>y</M>-axis and lifts it <M>5</M> (orange point).
        The only value of <M>f</M> we know is <M>f(-2)=7</M>: which <M>x</M> makes{' '}
        <M>{'\\tfrac{x}{2}=-2'}</M>?
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-10, 6]} y={[0, 18]} xStep={2} yStep={2} height={340}>
        <Plot.OfX y={f} domain={[-10, 6]} color={C.f} weight={3} />
        <Plot.OfX y={h} domain={[-10, 6]} color={C.g} weight={3} />
        <Label at={[s.fLab[0], f(s.fLab[0])]} color={C.f} attach={s.fLab[1]} gap={9}>y = f(x)</Label>
        <Label at={[s.hLab[0], h(s.hLab[0])]} color={C.g} attach={s.hLab[1]} gap={9}>y = h(x)</Label>

        {/* the lookup: (x/2, f(x/2)) → (x, f(x/2)) → (x, f(x/2) + 5) */}
        <Line.Segment point1={[u, fu]} point2={[X, fu]} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={[X, fu]} point2={[X, fu + 5]} color={C.guide} style="dashed" weight={2} />
        {Math.abs(X - u) > 0.6 && (
          <Label at={[(u + X) / 2, fu]} color={C.guide} attach="s" size={12}>×2</Label>
        )}
        <Label at={[X, fu + 2.5]} color={C.guide} attach={X > 4 || (X > -2 && X <= 1) ? 'w' : 'e'} size={12}>+5</Label>

        {/* the known point */}
        <Point x={-2} y={7} color={C.f} />
        {!key && <Label at={[-2, 7]} color={C.f} attach={s.pAt}>(−2, 7)</Label>}

        <Point x={u} y={fu} color={C.f} />
        <Point x={X} y={fu + 5} color={key ? C.good : C.g} />
        {key && <Label at={[-4, 12]} color={C.good} attach={s.keyAt}>(−4, 12)</Label>}

        {halve && (
          <>
            <Point x={-1} y={12} color={C.bad} />
            <Label at={[-1, 12]} color={C.bad} attach={hMinus1 > 12 ? 'se' : 'ne'}>(−1, 12)</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={-9} max={5} step={0.1} format={v => fmt(v)} />
        <Buttons>
          {SAMPLES.map((smp, i) => (
            <ActionButton key={smp.name} label={(i === which ? '● ' : '') + smp.name} onClick={() => setWhich(i)} />
          ))}
          <Toggle label="Halve −2 instead?" checked={halve} onChange={setHalve} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\tfrac{x}{2} = ${tex(u)}`} />
          <Readout
            color={key ? C.good : C.g}
            tex={key ? 'h(-4) = f(-2) + 5 = 12\\ \\checkmark' : `h(${tex(X)}) = f(${tex(u)}) + 5 \\approx ${(fu + 5).toFixed(2)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
