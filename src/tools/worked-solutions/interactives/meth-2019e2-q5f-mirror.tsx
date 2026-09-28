// 2019 Methods Exam 2 Q5f — part f.'s regions are part d.'s regions turned over in the line y = x.
// The flip slider turns the whole part-d picture (f(x) = 1 − x³, its tangent at x = a, the sky lens,
// the orange triangle and the stretch of x-axis that bounds it) over like a page hinged on y = x:
// at 100% the curve is f⁻¹, the tangent is the tangent to f⁻¹, and the axis segment lies on the
// vertical axis, exactly part f.'s three boundaries. Nothing stretches, so the area is still A(a),
// and the contact point (a, 1 − a³) lands at (1 − a³, a): b = 1 − a³, which is 9/10 at part e.'s
// minimising a = 10^(−1/3).

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, PlayButton, Point, Polygon, Polyline, Readout, Readouts, Slider, tick, usePlayer,
} from './kit'

type P2 = [number, number]
const f = (x: number) => 1 - x ** 3
const AMIN = Math.cbrt(0.1)
const area = (a: number) => (20 * a ** 4) / 3 + (2 * a) / 3 - 0.75 + 1 / (6 * a * a)

// Turning the plane over about y = x: the part of a point along the line stays put, the part
// across it shrinks through zero and comes out the other side. s = 0 is the original, s = 1 the
// reflection (x, y) → (y, x).
function flip([x, y]: P2, s: number): P2 {
  const m = (x + y) / 2
  const d = ((x - y) / 2) * Math.cos(Math.PI * s)
  return [m + d, m - d]
}

function picture(a: number) {
  const t = (x: number) => 2 * a ** 3 + 1 - 3 * a * a * x
  const q = (2 * a ** 3 + 1) / (3 * a * a)
  const n = 60
  const curve: P2[] = Array.from({ length: 121 }, (_, i) => {
    const x = -1.37 + (2.74 * i) / 120
    return [x, f(x)]
  })
  const lens: P2[] = []
  for (let i = 0; i <= n; i++) {
    const x = -2 * a + ((1 + 2 * a) * i) / n
    lens.push([x, t(x)])
  }
  for (let i = n; i >= 0; i--) {
    const x = -2 * a + ((1 + 2 * a) * i) / n
    lens.push([x, f(x)])
  }
  const tri: P2[] = [[1, 0], [q, 0], [1, t(1)]]
  const xL = Math.max(-1.6, (t(0) - 3.6) / (3 * a * a)) // keep the drawn tangent inside the view
  const tangent: [P2, P2] = [[xL, t(xL)], [q + 0.35, t(q + 0.35)]]
  return { curve, lens, tri, tangent, axis: [[1, 0], [q, 0]] as [P2, P2], P: [-2 * a, f(-2 * a)] as P2, T: [a, f(a)] as P2, Q: [q, 0] as P2 }
}

export default function Mirror() {
  const [a, setA] = useState(AMIN)
  const [s, setS] = useState(1)
  const player = usePlayer(setS, { min: 0, max: 1, seconds: 3 })
  const pic = picture(a)
  const F = (p: P2) => flip(p, s)
  const done = s > 0.98
  const b = 1 - a ** 3
  const atMin = Math.abs(a - AMIN) < 0.0025

  const layer = (k: number, faint: boolean) => {
    const G = (p: P2) => flip(p, k)
    const o = faint ? 0.35 : 1
    return (
      <>
        <Polygon points={pic.lens.map(G)} color={C.f} fillOpacity={faint ? 0.1 : 0.3} weight={0} strokeOpacity={0} />
        <Polygon points={pic.tri.map(G)} color={C.g} fillOpacity={faint ? 0.1 : 0.35} weight={0} strokeOpacity={0} />
        <Polyline points={pic.curve.map(G)} color={C.f} weight={faint ? 2 : 3} strokeOpacity={o} fillOpacity={0} />
        <Line.Segment point1={G(pic.tangent[0])} point2={G(pic.tangent[1])} color={C.violet} weight={faint ? 1.5 : 2.5} opacity={o} />
        <Line.Segment point1={G(pic.axis[0])} point2={G(pic.axis[1])} color={C.g} weight={faint ? 2 : 4} opacity={o} />
      </>
    )
  }

  let notice
  if (s < 0.02) {
    notice = (
      <Notice>
        This is part d.&apos;s picture for the <M>a</M> on the slider: the curve <M>f</M>, its tangent at <M>x = a</M>, and
        the regions they make with the <b>horizontal</b> axis (the thick orange segment). Press &ldquo;Flip in y = x&rdquo;
        and watch where each piece lands.
      </Notice>
    )
  } else if (!done) {
    notice = (
      <Notice>
        The picture is turning over like a page hinged on the dashed line <M>y = x</M>. Nothing is stretched or squashed,
        so each shaded piece keeps its area.
      </Notice>
    )
  } else if (atMin) {
    notice = (
      <Notice tone="good">
        At part e.&apos;s answer <M>{'a = 10^{-1/3}'}</M>, the contact point <M>{'(a,\\ 1 - a^3) = (0.464,\\ 0.9)'}</M> has
        landed at <M>{'(0.9,\\ 0.464)'}</M>. So the tangent to <M>{'f^{-1}'}</M> touches at <M>{'x = b = \\tfrac{9}{10}'}</M>.
        No other <M>b</M> can do better: a smaller area on this side would flip back to a smaller area in part e.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The curve is now <M>{'f^{-1}'}</M>, the violet line is the tangent to <M>{'f^{-1}'}</M>, and the orange segment
        lies on the <b>vertical</b> axis: exactly the three boundaries in part f. The contact point{' '}
        <M>{'(a,\\ 1 - a^3)'}</M> has landed at <M>{'(1 - a^3,\\ a)'}</M>, so <M>{'b = 1 - a^3'}</M>. Slide <M>a</M> to part
        e.&apos;s answer, <M>0.464</M>.
      </Notice>
    )
  }

  const T = F(pic.T)
  return (
    <div>
      <Plane x={[-1.6, 3.6]} y={[-1.6, 3.6]} xStep={1} yStep={1} equalScale height={420} labels={v => (v < -1.6 || v > 3.6 ? '' : tick(v))}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[3.3, 3.3]} color={C.guide} attach="se">y = x</Label>
        {s > 0.02 && layer(0, true)}
        {layer(s, false)}
        <Point x={T[0]} y={T[1]} color={C.violet} />
        {(done || s < 0.02) && (
          <Label at={T} color={C.violet} attach="ne">
            {done ? 'x = b' : 'x = a'}
          </Label>
        )}
        <Point x={F(pic.P)[0]} y={F(pic.P)[1]} color={C.ink} />
        <Point x={F(pic.Q)[0]} y={F(pic.Q)[1]} color={C.ink} />
        {s < 0.02 && <Label at={[1.25, f(1.25)]} color={C.f} attach="e">f</Label>}
        {done && <Label at={[f(1.25), 1.25]} color={C.f} attach="n">f⁻¹</Label>}
      </Plane>
      <Controls>
        <Slider
          label={'\\text{flip}'}
          value={s}
          onChange={v => {
            player.stop()
            setS(v)
          }}
          min={0}
          max={1}
          step={0.01}
          format={v => `${Math.round(v * 100)}%`}
        />
        <Slider label="a" value={a} onChange={setA} min={0.35} max={0.65} step={0.001} format={v => v.toFixed(3)} />
        <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Flip in y = x" />
        <Readouts>
          <Readout color={C.violet} tex={`\\text{contact point } (${a.toFixed(3)},\\ ${(1 - a ** 3).toFixed(3)}) \\to (${b.toFixed(3)},\\ ${a.toFixed(3)})`} />
          <Readout color={atMin ? C.good : undefined} tex={`b = 1 - a^3 = ${b.toFixed(3)}`} />
          <Readout tex={`\\text{area} = A(a) \\approx ${area(a).toFixed(3)}\\ \\text{(both pictures)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
