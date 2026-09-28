// 2019 Specialist Exam 1 Q4 — colliding means the same place AT THE SAME TIME. Drag t (or play
// the motion) to move both particles along their paths r_A(t) = (t² − 1)i + (a + t/3)j and
// r_B(t) = (t³ − t)i + arccos(t/2)j; drag a to slide A's whole path up or down. The sideways gap
// x_B − x_A = (t − 1)²(t + 1) has no a in it and closes only at t = 1, so t = 1 is the only
// possible collision time; a then has to put A at B's height π/3 there, a = (π − 1)/3. A toggle
// shows the wrong idea ("the paths cross, so they collide"): for every a on the slider the paths
// cross exactly once, but A and B reach the crossing at different times unless a = (π − 1)/3.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts,
  Slider, Toggle, num, tick, usePlayer,
} from './kit'

const A_STAR = (Math.PI - 1) / 3
const xA = (t: number) => t * t - 1
const yA = (t: number, a: number) => a + t / 3
const xB = (t: number) => t ** 3 - t
const yB = (t: number) => Math.acos(t / 2)

/** Where the two paths cross (ignoring time): B's point at time u lies on A's path when
 *  u³ − u = s² − 1 with s = 3(arccos(u/2) − a) in [0, 2]. Returns A's time s and B's time u. */
function crossings(a: number): { s: number; u: number }[] {
  const g = (u: number) => u ** 3 - u + 1 - 9 * (yB(u) - a) ** 2
  const out: { s: number; u: number }[] = []
  const N = 400
  for (let i = 0; i < N; i++) {
    let lo = (2 * i) / N
    let hi = (2 * (i + 1)) / N
    if (g(lo) * g(hi) > 0) continue
    for (let k = 0; k < 60; k++) {
      const mid = (lo + hi) / 2
      if (g(lo) * g(mid) <= 0) hi = mid
      else lo = mid
    }
    const u = (lo + hi) / 2
    const s = 3 * (yB(u) - a)
    if (s >= -1e-9 && s <= 2 + 1e-9 && !out.some(c => Math.abs(c.u - u) < 1e-6)) out.push({ s, u })
  }
  return out
}

export default function Collide() {
  const [t, setT] = useState(1)
  const [a, setA] = useState(0.3)
  const [show, setShow] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 2, seconds: 7 })

  const hit = a === A_STAR
  const at1 = Math.abs(t - 1) < 0.005
  const pA: [number, number] = [xA(t), yA(t, a)]
  const pB: [number, number] = [xB(t), yB(t)]
  const dx = pB[0] - pA[0]
  const dy = pA[1] - pB[1]
  const collide = hit && at1
  // when A and B are close, put the upper one's label above and the lower one's below
  const close = Math.abs(dx) < 0.3 && Math.abs(dy) < 0.2
  const cross = show ? crossings(a) : []
  const c = cross[0]
  const cPt: [number, number] | null = c ? [xB(c.u), yB(c.u)] : null

  let notice
  if (show && c && hit) {
    notice = (
      <Notice tone="good">
        Now the paths cross at <M>{'\\left(0, \\tfrac{\\pi}{3}\\right)'}</M> and <b>both</b> particles get there at{' '}
        <M>t = 1</M>. That is what makes it a collision: the same point <em>at the same time</em>. Turn this off and
        press Play to watch them meet.
      </Notice>
    )
  } else if (show && c) {
    notice = (
      <Notice tone="warn">
        The paths <b>do</b> cross, at about <M>{`(${num(cPt![0])},\\ ${num(cPt![1])}),`}</M> but A passes through it at{' '}
        <M>{`t \\approx ${num(c.s)}`}</M> and B at <M>{`t \\approx ${num(c.u)}`}</M>. Use the two buttons: whenever one
        particle is at the crossing, the other is somewhere else. Every <M>a</M> on this slider gives crossing paths, so
        &ldquo;the paths meet&rdquo; can&apos;t pin down <M>a</M>; only &ldquo;same place at the same <M>t</M>&rdquo; can.
      </Notice>
    )
  } else if (collide) {
    notice = (
      <Notice tone="good">
        <b>Collision.</b> At <M>t = 1</M>, A is at <M>{'\\left(0,\\ a + \\tfrac13\\right) = \\left(0, \\tfrac{\\pi}{3}\\right)'}</M>,
        exactly where B is. Nudge <M>t</M> and they separate sideways; nudge <M>a</M> and A sits above or below B. Now
        turn on &ldquo;Show where the paths cross&rdquo;.
      </Notice>
    )
  } else if (at1) {
    notice = (
      <Notice>
        At <M>t = 1</M> both particles have <M>x = 0</M>, and that is true for <b>every</b> <M>a</M>: changing{' '}
        <M>a</M> only slides A up or down. A is <M>{num(Math.abs(dy))}</M> units {dy < 0 ? 'below' : 'above'} B. Drag{' '}
        <M>a</M> until A&apos;s height <M>{'a + \\tfrac13'}</M> matches B&apos;s height{' '}
        <M>{'\\arccos\\tfrac12 = \\tfrac{\\pi}{3}'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`t = ${num(t)}`}</M>, A is <M>{num(dx, 3)}</M> units to the left of B. That sideways gap,{' '}
        <M>{'(t-1)^2(t+1)'}</M>, has no <M>a</M> in it, and it is zero only at <M>t = 1</M>. So no
        choice of <M>a</M> can make them meet at any other time. Drag <M>t</M> to find the moment the gap closes.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.2, 6.2]} y={[-0.2, 2.05]} xStep={1} yStep={0.5} height={300} yLabels={v => (Math.abs(v - 1) < 1e-9 ? "" : tick(v))}>
        {/* whole paths, faint */}
        <Plot.Parametric xy={s => [xA(s), yA(s, a)]} domain={[0, 2]} color={C.f} weight={2} style="dashed" opacity={0.5} />
        <Plot.Parametric xy={u => [xB(u), yB(u)]} domain={[0, 2]} color={C.g} weight={2} style="dashed" opacity={0.5} />
        {/* the part travelled so far */}
        {t > 0.01 && <Plot.Parametric xy={s => [xA(s), yA(s, a)]} domain={[0, t]} color={C.f} weight={3.5} />}
        {t > 0.01 && <Plot.Parametric xy={u => [xB(u), yB(u)]} domain={[0, t]} color={C.g} weight={3.5} />}
        {cPt && <Point x={cPt[0]} y={cPt[1]} color={C.violet} />}
        {cPt && !hit && (
          <Label at={cPt} color={C.violet} attach={cPt[0] > 1.5 ? 'n' : 'se'} gap={10}>
            paths cross
          </Label>
        )}
        {!collide && Math.abs(dx) < 0.02 && (
          <Line.Segment point1={pA} point2={pB} color={C.bad} style="dashed" weight={2} />
        )}
        {collide ? (
          <>
            <Point x={0} y={Math.PI / 3} color={C.good} />
            <Label at={[0, Math.PI / 3]} color={C.good} attach="e" gap={10}>
              A and B collide
            </Label>
          </>
        ) : (
          <>
            <Point x={pB[0]} y={pB[1]} color={C.g} />
            <Point x={pA[0]} y={pA[1]} color={C.f} />
            <Label at={pA} color={C.f} attach={close && dy < 0 ? "sw" : "nw"} gap={8}>
              A
            </Label>
            <Label at={pB} color={C.g} attach={close && dy >= 0 ? "sw" : "nw"} gap={8}>
              B
            </Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(Math.round(v * 100) / 100)
          }}
          min={0}
          max={2}
          step={0.01}
        />
        <Slider
          label="a"
          value={a}
          onChange={v => setA(Math.abs(v - A_STAR) < 0.0055 ? A_STAR : v)}
          min={0}
          max={1.2}
          step={0.01}
          format={v => (v === A_STAR ? '(π−1)/3' : v.toFixed(2))}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play t from 0 to 2" />
          <Toggle label="Show where the paths cross" checked={show} onChange={setShow} />
          {show && c && !hit && (
            <>
              <ActionButton label="Go to A's time" onClick={() => { player.stop(); setT(c.s) }} />
              <ActionButton label="Go to B's time" onClick={() => { player.stop(); setT(c.u) }} />
            </>
          )}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\underset{\\sim}{r}_A = (${num(pA[0])},\\ ${num(pA[1])})`} />
          <Readout color={C.g} tex={`\\underset{\\sim}{r}_B = (${num(pB[0])},\\ ${num(pB[1])})`} />
          <Readout tex={`x_B - x_A = (t-1)^2(t+1) = ${num(dx, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
